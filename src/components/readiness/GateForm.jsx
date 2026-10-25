"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/global/Button";

// The gate: first name and best email before the check, and two optional
// checkboxes, both unticked: the WhatsApp community invite, and permission to
// email later. Their wording comes from intelligence, which stores the exact
// words ticked in `leads`. The honeypot and the time on the form are the
// intelligence form guards' own (lib/forms/guards.js there): a bot gets a
// success-shaped reply and nothing is saved.

const HONEYPOT_FIELD = "fax_extension";

function OptIn({ text, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 px-4 py-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-msaccent"
      />
      <span className="text-sm leading-relaxed text-dark-blue/75">{text}</span>
    </label>
  );
}

export default function GateForm({ whatsappOptInText, emailOptInText, onStarted }) {
  const openedAt = useRef(0);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappOptIn, setWhatsappOptIn] = useState(false);
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  // Time on the form starts when it appears in the browser.
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    const local = {};
    if (!firstName.trim()) local.firstName = "Enter your first name";
    if (!email.trim()) local.email = "Enter your email address";
    if (Object.keys(local).length) {
      setErrors(local);
      return;
    }

    setSending(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const attribution = {};
      for (const key of ["src", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
        const v = params.get(key);
        if (v) attribution[key] = v;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/public/aisc/readiness/start`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            firstName: firstName.trim(),
            email: email.trim(),
            whatsappOptIn,
            emailOptIn,
            attribution,
            referrer: document.referrer || undefined,
            [HONEYPOT_FIELD]: trap,
            form_ms: Date.now() - openedAt.current,
          }),
        },
      );
      const data = await res.json().catch(() => null);

      if (res.ok && data?.ok && data.id) {
        onStarted({
          id: data.id,
          firstName: firstName.trim(),
          email: email.trim(),
          whatsappOptIn,
          emailOptIn,
        });
        return;
      }
      if (data?.error === "fields" && data.errors) {
        setErrors(data.errors);
      } else if (res.status === 429) {
        setMessage("Too many tries from this connection. Please try again in an hour.");
      } else {
        setMessage("That did not go through. Check your connection and try again.");
      }
    } catch {
      setMessage("That did not go through. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const field =
    "w-full rounded-lg border border-dark-blue/15 bg-white px-4 py-3 text-base text-dark-blue placeholder:text-dark-blue/35 focus:border-msaccent focus:outline-none focus:ring-2 focus:ring-msaccent/25";

  return (
    <form onSubmit={submit} noValidate className="mt-10 flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-dark-blue">First name</span>
          <input
            type="text"
            name="firstName"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            maxLength={60}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className={field}
          />
          {errors.firstName && (
            <span id="firstName-error" className="text-sm text-warning">
              {errors.firstName}
            </span>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-dark-blue">Best email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={field}
          />
          {errors.email && (
            <span id="email-error" className="text-sm text-warning">
              {errors.email}
            </span>
          )}
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

      {(whatsappOptInText || emailOptInText) && (
        <div className="divide-y divide-dark-blue/10 rounded-lg border border-dark-blue/10 bg-white">
          {whatsappOptInText && (
            <OptIn text={whatsappOptInText} checked={whatsappOptIn} onChange={setWhatsappOptIn} />
          )}
          {emailOptInText && (
            <OptIn text={emailOptInText} checked={emailOptIn} onChange={setEmailOptIn} />
          )}
        </div>
      )}

      <p className="text-xs leading-relaxed text-dark-blue/50">
        We will email your report to this address, and nothing else unless you ask for it above.{" "}
        <Link
          href="/policy/ai-readiness-check"
          className="underline underline-offset-2 hover:text-dark-blue"
        >
          AI Readiness Check policy
        </Link>
      </p>

      {message && (
        <p role="alert" className="text-sm text-warning">
          {message}
        </p>
      )}

      <div>
        <Button type="submit" variant="dark" className="px-10 py-3" loading={sending} disabled={sending}>
          Start the readiness check
        </Button>
      </div>
    </form>
  );
}
