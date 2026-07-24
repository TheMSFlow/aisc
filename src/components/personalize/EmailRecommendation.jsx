"use client";

import { useEffect, useState } from "react";
import Button from "@/components/global/Button";
import { trackEvent } from "@/lib/analytics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Optional lead capture on the results screen. Rendered only when the wizard
// returned an id (meaning intelligence stored the completion). Submits
// { id, email } to intelligence Endpoint B, which sends the recommendation
// built from the stored row. Voice: second person, no exclamations.
export default function EmailRecommendation({ id, seat }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [phase, setPhase] = useState("live"); // live | leaving | gone

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

  const valid = EMAIL_RE.test(email.trim());

  const submit = async (e) => {
    e.preventDefault();
    if (!valid || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/public/aisc/personalize/email`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id, email: email.trim() }),
        },
      );
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setStatus("sent");
        trackEvent("personalize_email_request", { seat });
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

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
        <form onSubmit={submit} className="max-w-md">
          <p className="mb-4 text-sm leading-relaxed text-dark-blue/55">
            Enter your email and this recommendation lands in your inbox.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoFocus
              aria-label="Your email address"
              className="w-full rounded-[8px] border border-dark-blue/15 bg-white p-4 text-base text-dark-blue placeholder:text-dark-blue/30 focus:border-msaccent focus:outline-none focus:ring-2 focus:ring-msaccent/30"
            />
            <Button
              variant="dark"
              type="submit"
              className="shrink-0 px-8 py-3"
              disabled={!valid || status === "sending"}
              loading={status === "sending"}
            >
              Send it
            </Button>
          </div>
          {status === "error" && (
            <p className="mt-3 text-sm text-warning">
              That did not send. Try again in a moment.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
