"use client";

import { useEffect } from "react";
import Image from "next/image";

// The 20-minute AISC VVIP clarity call (founder, 2026-11-02; 20 minutes
// since 2026-11-04; its own Cal.com slug since 2026-11-05). Cal.com, as
// it has no backend write: see "Booking" in SOURCE_OF_TRUTH.md.
export const BOOKING_URL =
  "https://cal.com/michaelsteve/aisc-clarity-call";

// How long to wait for gtag before leaving anyway. The visit itself is the
// page_view; the event only marks that the hop completed.
const MAX_WAIT_MS = 1500;

export default function ClarityCallRedirect() {
  useEffect(() => {
    let left = false;
    const go = () => {
      if (left) return;
      left = true;
      window.location.replace(BOOKING_URL);
    };

    const fallback = setTimeout(go, MAX_WAIT_MS);
    const poll = setInterval(() => {
      if (typeof window.gtag !== "function") return;
      clearInterval(poll);
      window.gtag("event", "cta_click", {
        placement: "clarity_call",
        destination: "vvip_call",
        event_callback: go,
      });
    }, 100);

    return () => {
      clearTimeout(fallback);
      clearInterval(poll);
    };
  }, []);

  // Dark blue to match the founder's banner, so the hop reads as the same
  // moment as the card that was tapped. The button carries the VVIP gradient
  // used on the pricing card (`gradient-100`).
  return (
    <main className="relative min-h-dvh overflow-hidden bg-dark-blue text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(99,104,218,0.35),transparent_60%)]"
      />

      <div className="relative mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-8 px-4 text-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border-2 border-white/10 border-t-lilac animate-spin motion-reduce:animate-none"
          />
          <Image
            src="/aisc_favicon.svg"
            width={44}
            height={44}
            alt="AI Stakeholder Challenge"
          />
        </div>

        <div className="space-y-3" role="status" aria-live="polite">
          <h1 className="font-ptsans text-2xl font-bold leading-tight sm:text-3xl">
            Opening Michael Steve&rsquo;s calendar
          </h1>
          <p className="text-sm font-light leading-relaxed text-white/65">
            Your 20-minute clarity call for the AI Stakeholder Challenge,
            privately 1:1. Pick a time that suits you.
          </p>
        </div>

        <a
          href={BOOKING_URL}
          className="gradient-100 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-warning/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac focus-visible:ring-offset-2 focus-visible:ring-offset-dark-blue"
        >
          Open the Calendar Now
        </a>
      </div>
    </main>
  );
}
