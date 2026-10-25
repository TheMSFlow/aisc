"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/global/Button";
import { trackEvent } from "@/lib/analytics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HONEYPOT_FIELD = "fax_extension";

// Optional lead capture on the results screen. Rendered only when the wizard
// returned an id (meaning intelligence stored the session). Submits the id, a
// first name and an email to intelligence Endpoint B, which sends the
// recommendation built from the stored session and records the person in
// `leads` (WORKING_RULES.md rule 29). The optional box's wording comes from
// intelligence, which stores the exact words ticked. The honeypot and the time
// on the form are the intelligence form guards' own. Voice: second person, no
// exclamations.
export default function EmailRecommendation({ id, seat, emailOptInText }) {
  const openedAt = useRef(0);
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | rate
  const [phase, setPhase] = useState("live"); // live | leaving | gone

  // Time on the form starts when it opens.
  useEffect(() => {
    if (open) openedAt.current = Date.now();
  }, [open]);

  // Once the email is on its way, this section has done its job. Hold the
  // confirmation briefly so it is read, fade it, then remove it entirely.
  useEffect(() => {
    if (status !== "sent") return;
    const fade = setTimeout(() => setPhase("leaving"), 3500);
    const drop = setTimeout(() => setPhase("gone"), 4000);
    return () => {
      clearTimeout(fade);
      clearTimeout(drop);
    };
  }, [status]);

  if (!id || phase === "gone") return null;

  const valid = firstName.trim().length > 0 && EMAIL_RE.test(email.trim());

  const submit = async (e) => {
    e.preventDefault();
    if (!valid || status === "sending") return;
    setStatus("sending");
    setErrors({});
    try {
      const params = new URLSearchParams(window.location.search);
      const attribution = {};
      for (const key of ["src", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
        const v = params.get(key);
        if (v) attribution[key] = v;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/public/aisc/personalize/email`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            id,
            firstName: firstName.trim(),
            email: email.trim(),
            emailOptIn,
            attribution,
            referrer: document.referrer || undefined,
            [HONEYPOT_FIELD]: trap,
            form_ms: Date.now() - openedAt.current,
          }),
        },
      );
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setStatus("sent");
        trackEvent("personalize_email_request", { seat, email_opt_in: emailOptIn });
        return;
      }
      if (data?.error === "fields" && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      setStatus(res.status === 429 ? "rate" : "error");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-[8px] border border-dark-blue/15 bg-white p-4 text-base text-dark-blue placeholder:text-dark-blue/30 focus:border-msaccent focus:outline-none focus:ring-2 focus:ring-msaccent/30";

  return (
    <div
      className={`mt-10 border-t border-dark-blue/10 pt-8 transition-opacity duration-500 ${
        phase === "leaving" ? "opacity-0" : "opacity-100"
      }`}
    >
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
        Keep this
      </p>

      {status === "sent" ? (
        <p className="text-sm leading-relaxed text-dark-blue/65">
          Sent. It is on its way to your inbox.
        </p>
      ) : !open ? (
        <Button
          variant="dark"
          className="px-8 py-3"
          onClick={() => setOpen(true)}
        >
          Email me this recommendation
        </Button>
      ) : (
        <form onSubmit={submit} noValidate className="max-w-xl">
          <p className="mb-4 text-sm leading-relaxed text-dark-blue/55">
            Enter your first name and email, and this recommendation lands in your inbox.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="sr-only">Your first name</span>
              <input
                type="text"
                name="firstName"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                maxLength={60}
                autoFocus
                aria-invalid={Boolean(errors.firstName)}
                className={field}
              />
              {errors.firstName && (
                <span className="text-sm text-warning">{errors.firstName}</span>
              )}
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="sr-only">Your email address</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                maxLength={254}
                aria-invalid={Boolean(errors.email)}
                className={field}
              />
              {errors.email && <span className="text-sm text-warning">{errors.email}</span>}
            </label>
          </div>

          {/* Hidden from people; a bot fills it. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Fax extension
              <input
                type="text"
                name={HONEYPOT_FIELD}
                tabIndex={-1}
                autoComplete="off"
                value={trap}
                onChange={(e) => setTrap(e.target.value)}
              />
            </label>
          </div>

          {emailOptInText && (
            <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-[8px] border border-dark-blue/10 bg-white px-4 py-4">
              <input
                type="checkbox"
                checked={emailOptIn}
                onChange={(e) => setEmailOptIn(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-msaccent"
              />
              <span className="text-sm leading-relaxed text-dark-blue/75">{emailOptInText}</span>
            </label>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button
              variant="dark"
              type="submit"
              className="shrink-0 px-8 py-3"
              disabled={!valid || status === "sending"}
              loading={status === "sending"}
            >
              Send it
            </Button>
            <p className="text-xs leading-relaxed text-dark-blue/50">
              We will email your recommendation to this address, and nothing else unless you ask
              for it above.{" "}
              <Link
                href="/policy/find-your-path"
                className="underline underline-offset-2 hover:text-dark-blue"
              >
                Find your path policy
              </Link>
            </p>
          </div>

          {status === "error" && (
            <p className="mt-3 text-sm text-warning">
              That did not send. Try again in a moment.
            </p>
          )}
          {status === "rate" && (
            <p className="mt-3 text-sm text-warning">
              Too many tries from this connection. Please try again in an hour.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
