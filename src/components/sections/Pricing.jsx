"use client";

import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";
import { useCohort } from "@/context/CohortContext";
import { formatPricingDate } from "@/utils/cohortFormat";
import Section from "@/components/layout/Section";
import Button from "@/components/global/Button";
import CurrencyToggle from "@/components/global/CurrencyToggle";
import CurrencyPrice from "@/components/global/CurrencyPrice";
import { PRICING } from "@/lib/pricing";

const TIERS = [
  {
    id: "ga",
    name: "General Admission",
    badge: null,
    price: PRICING.generalAdmission,
    description: "Full 7-day experience.",
    features: [
      {
        label: "All 4 live sessions",
        info: "Four live facilitated sessions: AI Clarity (Day 1), AI Labs (Day 2), AI Value (Day 3), and AI Governance (Day 7). Each runs 2 hours. Day 7's session includes a live Q&A within that time.",
      },
      {
        label: "Session resources",
        info: "Every guide, framework, and insight from the live sessions. Organized by day, downloadable anytime, and updated as the program evolves.",
      },
      {
        label: "Mini apps",
        info: "Tools in the Toolbox: the Delegation Tool for rating tasks on AI fit and human judgment, the Margin Calculator for tracking real time saved, and the Territory Builder for mapping and declaring your AI territory. All three are reusable after the challenge ends.",
      },
      {
        label: "All Assignments and Milestone Task",
        info: "Post-session assignments for Days 1, 2, and 3, plus the Day 3 Milestone Task that produces your territory declaration and feeds into your 6-Month AI Stakeholder Roadmap.",
      },
      {
        label: "6-Month AI Stakeholder Roadmap",
        info: "Turns the territory you declared on Day 3 into a 180-day plan across three phases, built around your capability gaps, the relationships you need, and your own standards for using AI. Unlocked on Day 6.",
      },
      {
        label: "AI Labs (1 month free access)",
        info: "A dedicated platform with leadership-focused instruction on setting up AI, directing it, and applying it across your domain. 1 month of free access that starts when the challenge ends. VIP extends this to 3 months and VVIP to 6.",
      },
      {
        label: "Peer-to-peer reflection (optional)",
        info: "Peer reflection helps participants sharpen their own thinking by observing clarity in others. It is not a review mechanism. Participation is optional and feedback is anonymized.",
      },
      {
        label: "Community access",
        info: "Private group access for reflection, awareness and networking.",
      },
      {
        label: "Certificate of Declaration",
        info: "Issued on Day 7. Recognizes your declared AI territory and marks your transition from participant to AI Stakeholder.",
      },
    ],
    cta: "Secure Your Spot",
    href: "https://intelligence.michaelsteve.com/pay/challenge/aisc?package=general-admission",
    highlight: false,
  },
  {
    id: "vip",
    name: "VIP",
    badge: "10 Seats Max",
    price: PRICING.vip,
    description:
      "Everything in GA, plus direct facilitator access at the moments that matter most.",
    features: [
      {
        label: "Everything in General Admission",
        info: "Includes the full General Admission experience.",
      },
      {
        label: "AI Labs (3 months free access)",
        info: "Extends AI Labs free access to 3 months from the end of the challenge, up from 1 month with General Admission.",
      },
      {
        label: "Strategic facilitator feedback on milestone task",
        info: "Submit up to 3 iterations of your Day 3 Milestone Task and receive private, written feedback from the facilitator on each, specific to your situation.",
      },
      {
        label: "30-minute private strategy session",
        info: "If you've used all 3 milestone task iterations and still want more clarity, get 30 minutes of direct, 1:1 time with the facilitator to work through your territory and direction.",
      },
      {
        label: "Day 5: 1-hour live Q&A session",
        info: "A 1-hour live session with the facilitator, exclusive to VIP participants. Bring your specific decisions, context, and next steps.",
      },
      {
        label: "Day 6: 2-hour Roadmap deep dive + Q&A",
        info: "A 2-hour facilitated session on your 6-Month Roadmap on Day 6. Includes a Q&A to sharpen your plan before the Day 7 Governance session.",
      },
    ],
    cta: "Secure Your VIP Spot",
    href: "https://intelligence.michaelsteve.com/pay/challenge/aisc?package=vip",
    highlight: true,
  },
  {
    id: "vvip",
    name: "VVIP",
    badge: "Private 1:1",
    price: PRICING.vvip,
    description:
      "The full 7-day experience delivered privately, one-on-one, with direct facilitator access throughout.",
    features: [
      {
        label: "Private, one-on-one delivery",
        info: "The full 7-day challenge delivered to you alone. No cohort, no shared sessions. Scheduled around your availability.",
      },
      {
        label: "Direct facilitator access for all 7 days",
        info: "The facilitator is present and available throughout all seven days, not just at key milestone moments.",
      },
      {
        label: "Customized schedule and pacing",
        info: "Delivery is structured around your calendar, not a fixed cohort timeline.",
      },
      {
        label: "All GA + VIP inclusions",
        info: "Every instrument, resource, output, and access point from General Admission and VIP, delivered in a fully private setting.",
      },
      {
        label: "AI Labs (6 months free access)",
        info: "The longest AI Labs access of any tier: 6 months free from the end of the challenge.",
      },
    ],
    cta: "Secure 1:1 Access",
    href: "https://intelligence.michaelsteve.com/pay/challenge/aisc?package=vvip",
    highlight: false,
    buttonVariant: "vvip",
  },
];

function FeatureItem({ feature, highlight }) {
  const [open, setOpen] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (itemRef.current && !itemRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <li
      ref={itemRef}
      className="relative flex items-start gap-2.5 text-sm leading-relaxed"
    >
      <span
        className={`mt-0.5 shrink-0 font-semibold ${
          highlight ? "text-warning" : "text-dark-blue/30"
        }`}
      >
        ·
      </span>
      <span className={highlight ? "text-white/65" : "text-dark-blue/65"}>
        {feature.label}
      </span>
      {feature.info && (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={`More about ${feature.label}`}
            className="peer/info mt-0.5 shrink-0 cursor-help"
          >
            <Info
              className={`h-3 w-3 ${
                highlight ? "text-white/25" : "text-dark-blue/20"
              }`}
            />
          </button>
          <div
            role="tooltip"
            className={`absolute bottom-full left-0 right-0 z-30 mb-2 rounded-lg p-3 text-xs leading-relaxed transition-opacity duration-150 ${
              highlight
                ? "bg-white text-dark-blue/80 shadow-xl ring-1 ring-dark-blue/10"
                : "bg-dark-blue text-white/80 shadow-lg"
            } ${
              open
                ? "opacity-100"
                : "pointer-events-none opacity-0 peer-hover/info:opacity-100"
            }`}
          >
            {feature.info}
          </div>
        </>
      )}
    </li>
  );
}

export default function Pricing() {
  const { openCohort } = useCohort();

  const targetDate = openCohort
    ? formatPricingDate(new Date(openCohort.start_date))
    : null;

  return (
    <Section id="pricing" spacing="loose" className="overflow-x-clip">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
            Join the Challenge
          </p>
          <h2 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-4xl lg:text-5xl">
            Choose your path.
          </h2>
          {targetDate && (
            <p className="mt-3 text-sm text-dark-blue/50">
              Cohort starts{" "}
              <span className="font-medium text-dark-blue/80">
                {targetDate}
              </span>
            </p>
          )}
        </div>
        {/* <CurrencyToggle dark={false} /> */}
      </div>

      <div className="relative mt-10">
        {/* ambient color for the glass to refract */}
        <div className="pointer-events-none absolute -top-28 right-[10%] h-95 w-145 bg-[radial-gradient(ellipse_at_center,rgba(99,104,218,0.16),transparent_60%)]" />
        <div className="pointer-events-none absolute -bottom-24 left-[2%] h-80 w-120 bg-[radial-gradient(ellipse_at_center,rgba(135,5,113,0.09),transparent_60%)]" />

        <div className="relative grid gap-6 lg:grid-cols-3">
        {TIERS.map((t) => (
          <div
            key={t.id}
            className={`relative flex flex-col gap-7 overflow-hidden rounded-3xl p-8 lg:p-10 ${
              t.highlight
                ? "bg-dark-blue text-white shadow-[0_2px_4px_rgba(0,3,76,0.15),0_16px_40px_rgba(0,3,76,0.25)]"
                : "border border-white/60 bg-white/60 text-dark-blue shadow-[0_1px_2px_rgba(0,3,76,0.06),0_8px_24px_rgba(0,3,76,0.08)] backdrop-blur-xl"
            }`}
          >
            {t.highlight && (
              <div className="pointer-events-none absolute -top-24 -right-20 h-80 w-110 bg-[radial-gradient(ellipse_at_center,rgba(99,104,218,0.28),transparent_60%)]" />
            )}
            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <h3
                  className={`font-ptsans text-xl font-bold uppercase tracking-tight ${
                    t.highlight ? "text-white" : "text-dark-blue"
                  }`}
                >
                  {t.name}
                </h3>
                {t.badge && (
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest ${
                      t.highlight
                        ? "border-white/20 text-white/45"
                        : "border-dark-blue/15 text-dark-blue/45"
                    }`}
                  >
                    {t.badge}
                  </span>
                )}
              </div>

              <div className="mt-5">
                <CurrencyPrice
                  {...t.price}
                  className={`font-ptsans text-4xl font-bold leading-none ${
                    t.highlight ? "text-white" : "text-dark-blue"
                  }`}
                />
              </div>

              <p
                className={`mt-3 text-sm leading-relaxed ${
                  t.highlight ? "text-white/55" : "text-dark-blue/55"
                }`}
              >
                {t.description}
              </p>
            </div>

            <ul className="relative flex flex-1 flex-col gap-3">
              {t.features.map((f, i) => (
                <FeatureItem key={i} feature={f} highlight={t.highlight} />
              ))}
            </ul>

            <Button
              href={t.href}
              variant={t.buttonVariant || (t.highlight ? "primary" : "dark")}
              className="relative w-full justify-center py-3"
            >
              {t.cta}
            </Button>
          </div>
        ))}
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-msaccent/10 p-8 lg:p-10">
        <div className="flex flex-col gap-8">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
              Request A Private Challenge
            </p>
            <h3 className="font-ptsans text-xl font-bold uppercase tracking-tight text-dark-blue">
              Run the challenge with your own group.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-dark-blue/55">
              Designed for enterprises, organizations, leadership teams, and
              high-trust groups who want alignment, clarity, and decision
              confidence around AI, together. This is not a scaled version of
              the public challenge. It is the same foundational experience,
              delivered privately to support alignment as a unit and build
              collective confidence without external noise.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/60 bg-white p-6 shadow-[0_1px_2px_rgba(0,3,76,0.05),0_6px_16px_rgba(0,3,76,0.06)]">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-dark-blue/40">
                Option A
              </p>
              <p className="mt-1 font-ptsans text-sm font-bold uppercase tracking-tight text-dark-blue">
                Multi-Tier Hybrid
              </p>
              <p className="mt-2 text-sm leading-relaxed text-dark-blue/55">
                <strong>
                  A minimum of 3 VIP Seats combined with 5+ General Admission
                  seats
                </strong>
                . Suited for teams where select members need deeper facilitator
                access and the broader group participates at General Admission
                level.
              </p>
            </div>
            <div className="rounded-2xl border border-white/60 bg-white p-6 shadow-[0_1px_2px_rgba(0,3,76,0.05),0_6px_16px_rgba(0,3,76,0.06)]">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-dark-blue/40">
                Option B
              </p>
              <p className="mt-1 font-ptsans text-sm font-bold uppercase tracking-tight text-dark-blue">
                VIP Intensive
              </p>
              <p className="mt-2 text-sm leading-relaxed text-dark-blue/55">
                <strong>
                  A baseline of 10 VIP Seats with no upper cap on enrollment
                </strong>
                . Every participant receives direct facilitator access and the
                full VIP experience from start to finish.
              </p>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-dark-blue/40">
            If your organization or high-trust group meets either condition,
            the challenge is delivered as a private, synchronized experience
            focused on your unique strategic goals.
          </p>
          <Button
            href="https://intelligence.michaelsteve.com/form/inquiry?src=CC"
            variant="premium"
            className="w-full mx-auto justify-center py-3"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </Section>
  );
}
