import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { requestSchema, resultSchema } from "@/lib/personalize/validate";
import { buildSystemPrompt, buildUserMessage } from "@/lib/personalize/prompt";
import { fallbackResult, UPSELL_ALTERNATES } from "@/lib/personalize/fallback";
import { allowRequest, clientIp } from "@/lib/personalize/rateLimit";
import { presentOffer } from "@/lib/personalize/catalog";

const MAX_BODY_BYTES = 8192;
const MODEL = "claude-sonnet-5";

// Built once per instance; contains no per-visitor content.
const SYSTEM_PROMPT = buildSystemPrompt();

const FORBIDDEN_PHRASES = [
  "master ai",
  "stay relevant",
  "stay ahead of the curve",
  "learn ai",
  "sign up",
  "register",
  "leverage ai",
  "game-changing",
  "revolutionary",
  "transform your business",
  "unlock the power of ai",
  "gain access to",
  "step-by-step",
  "ai-powered",
];

function cleanText(text) {
  let t = text.replaceAll("—", ", ").replaceAll("–", "-").trim();
  // The model occasionally appends a stray underscore token after the final
  // sentence (e.g. ".reasoning_end_placeholder_removed"). Strip until stable.
  let prev;
  do {
    prev = t;
    t = t.replace(/([.!?]) ?[a-z0-9]*_[a-z0-9_.]*$/i, "$1");
  } while (t !== prev);
  return t;
}

// The four core packages form a commitment ladder. The alternate must sit
// above the primary on it; customCohort and awakening are context solutions
// outside the ladder and exempt.
const CORE_RANK = { ga: 1, vip: 2, vvip: 3, coaching: 4 };

function enforceUpsell(result) {
  const primaryRank = CORE_RANK[result.primary.offerId];
  const alternateRank = CORE_RANK[result.alternate.offerId];
  if (primaryRank && alternateRank && alternateRank <= primaryRank) {
    console.warn(
      "[personalize] downsold alternate corrected:",
      `${result.primary.offerId} -> ${result.alternate.offerId}`
    );
    return { ...result, alternate: UPSELL_ALTERNATES[result.primary.offerId] };
  }
  return result;
}

function scanVoice(raw) {
  const all = JSON.stringify(raw).toLowerCase();
  const found = FORBIDDEN_PHRASES.filter((p) => all.includes(p));
  if (found.length) {
    console.warn("[personalize] forbidden phrases in output:", found);
  }
}

function toPayload(raw, fallbackUsed) {
  const strip = (pick) => ({
    reasoning: cleanText(pick.reasoning),
    offer: presentOffer(pick.offerId, pick.subPath),
  });

  return {
    ok: true,
    fallbackUsed,
    result: {
      headline: cleanText(raw.headline),
      confidence: raw.confidence,
      primary: strip(raw.primary),
      alternate: strip(raw.alternate),
      awakeningNote: raw.awakeningNote
        ? {
            reasoning: cleanText(raw.awakeningNote.reasoning),
            offer: presentOffer("awakening", raw.awakeningNote.subPath),
          }
        : null,
    },
  };
}

// Best-effort: store the completion in intelligence (Endpoint A) and attach the
// returned id to the payload so the browser can show the email button. Bounded
// by a short timeout and fully swallowed on failure; this must never block or
// break the recommendation. Skipped on the honeypot path (see POST).
async function attachId(payload, input, request) {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;
  const key = process.env.ECOSYSTEM_INTERNAL_KEY;
  if (!apiBase || !key) return payload;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2000);
  try {
    const res = await fetch(`${apiBase}/api/public/aisc/personalize`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-ecosystem-key": key,
      },
      body: JSON.stringify({
        seat: input.seat,
        currency: input.currency,
        answers: {
          leads: input.leads,
          pressing: input.pressing,
          picture: input.picture,
        },
        fallbackUsed: payload.fallbackUsed,
        recommendation: payload.result,
        clientIp: clientIp(request),
        userAgent: request.headers.get("user-agent") || "",
      }),
      signal: controller.signal,
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.ok && data?.id) payload.id = data.id;
    }
  } catch {
    // Storage unavailable: return the recommendation without an id.
  } finally {
    clearTimeout(timer);
  }
  return payload;
}

function sameOriginOk(request) {
  if (process.env.NODE_ENV !== "production") return true;
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (!site) return true;
  const source = request.headers.get("origin") || request.headers.get("referer");
  if (!source) return true;
  try {
    return new URL(source).host === new URL(site).host;
  } catch {
    return false;
  }
}

export async function POST(request) {
  let body;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!sameOriginOk(request)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const input = parsed.data;

  // Honeypot: plausible-looking success without spending anything.
  if (input.company) {
    return NextResponse.json(toPayload(fallbackResult(input.seat), false));
  }

  if (!allowRequest(clientIp(request))) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn("[personalize] ANTHROPIC_API_KEY not set; serving fallback");
    return NextResponse.json(await attachId(toPayload(fallbackResult(input.seat), true), input, request));
  }

  try {
    const client = new Anthropic({ apiKey, timeout: 30_000, maxRetries: 1 });

    const response = await client.messages.parse({
      model: MODEL,
      max_tokens: 1500,
      thinking: { type: "disabled" },
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: buildUserMessage(input) }],
      output_config: { format: zodOutputFormat(resultSchema) },
    });

    const raw = response.parsed_output;
    if (!raw) throw new Error("unparsed output");

    const checked = resultSchema.safeParse(raw);
    if (!checked.success) throw new Error("schema mismatch");

    if (checked.data.primary.offerId === checked.data.alternate.offerId) {
      throw new Error("primary equals alternate");
    }

    const enforced = enforceUpsell(checked.data);

    scanVoice(enforced);
    return NextResponse.json(await attachId(toPayload(enforced, false), input, request));
  } catch (err) {
    console.error("[personalize] recommendation failed:", err?.message || err);
    return NextResponse.json(await attachId(toPayload(fallbackResult(input.seat), true), input, request));
  }
}
