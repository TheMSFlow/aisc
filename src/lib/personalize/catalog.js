import { PRICING } from "@/lib/pricing";
import {
  COACHING_CALL_LABEL,
  COACHING_CALL_NOTE,
  COACHING_CALL_URL,
} from "@/lib/coaching";

// Single source of truth for everything the recommendation UI and the
// system prompt know about the offers. The model only ever outputs offerIds
// and reasoning text; names, prices, CTA labels, and URLs come from here.

const PAY_BASE = "https://intelligence.michaelsteve.com/pay/challenge/aisc";

export const CATALOG = {
  ga: {
    id: "ga",
    name: "General Admission",
    badge: null,
    priceKind: "fixed",
    price: PRICING.generalAdmission,
    priceNote: null,
    cta: "Secure Your Spot",
    href: `${PAY_BASE}?package=general-admission`,
    buttonVariant: "dark",
    // Prompt-facing description and qualification rules.
    description:
      "The full 7-day challenge. All 4 live sessions (AI Clarity, AI Readiness, AI Value, AI Governance), every resource, the mini apps (Delegation Tool, Readiness Scorecard, Territory Builder, Margin Calculator), the Day 3 Milestone Task, the 6-Month AI Stakeholder Roadmap, the Toolbox, community access, and the Certificate of Declaration.",
    fit: "Open cohort, no seat cap. The complete experience and the default path for any qualified leader. Never framed as basic; it is full access.",
  },
  vip: {
    id: "vip",
    name: "VIP",
    badge: "10 Seats Max",
    priceKind: "fixed",
    price: PRICING.vip,
    priceNote: null,
    cta: "Secure Your VIP Spot",
    href: `${PAY_BASE}?package=vip`,
    buttonVariant: "primary",
    description:
      "Everything in General Admission, plus the facilitator close to your specific situation: written feedback on up to 3 iterations of the milestone task, a 30-minute private strategy session if all 3 are used, a VIP-only live Q&A on Day 5, and a 2-hour Roadmap deep dive on Day 6.",
    fit: "For leaders who want direct guidance on their specific situation during the challenge. Capped at 10 seats because milestone feedback requires a manageable group. Frame as deeper access, never as more content.",
  },
  vvip: {
    id: "vvip",
    name: "VVIP",
    badge: "Private 1:1",
    priceKind: "fixed",
    price: PRICING.vvip,
    priceNote: null,
    // Same name and destination as the home page (founder, 2026-11-20):
    // the 1:1 is booked through the 20-minute Clarity Call, not checkout.
    // Absolute, because the recommendation email reuses this link.
    cta: "Secure 1:1 Access",
    href: "https://aistakeholderchallenge.com/clarity-call",
    buttonVariant: "vvip",
    ctaNote: "It starts with a 20-minute Clarity Call.",
    description:
      "The full challenge delivered privately in three days, one on one, tailored to the participant from the very start and scheduled around their calendar. Direct facilitator access across all three days, and every GA and VIP inclusion. Public cohorts take seven days; the private challenge holds everything in three. The first step is a 20-minute Clarity Call.",
    fit: "For a leader whose situation is specific and needs answers now, who wants the challenge fitted to them rather than to a cohort: often a leader answering in both directions with real issues on their desk. For a direction-setter, it is the private challenge without the coaching months, so it sits beside coaching rather than above it.",
  },
  customCohort: {
    id: "customCohort",
    name: "Private Challenge",
    badge: "For Your Organization",
    priceKind: "custom",
    price: null,
    priceNote: "Custom pricing",
    cta: "Contact Sales",
    href: "https://intelligence.michaelsteve.com/form/inquiry?src=CC",
    buttonVariant: "premium",
    description:
      "The same challenge delivered privately to an organization, leadership team, or high-trust group that wants alignment as a unit. Custom pricing and scheduling.",
    // No seat thresholds are stated to visitors (founder, 2026-11-20: "no
    // need to box anyone"); they stay in SOURCE_OF_TRUTH for inquiries.
    fit: "For a visitor who is clearly deciding for a whole team, organization or group and wants them to go through it together. Never state seat minimums or thresholds; anyone deciding for a group is welcome to talk to us.",
  },
  coaching: {
    id: "coaching",
    name: "AI Stakeholder Coaching",
    badge: "Includes the Challenge",
    priceKind: "plans",
    price: null,
    priceNote: null,
    plans: [
      { label: "Monthly", price: PRICING.coaching.month, note: null },
      { label: "6 Months", price: PRICING.coaching.sixMonths, note: "Save ~17%" },
      { label: "Annual", price: PRICING.coaching.year, note: "Best value" },
    ],
    cta: COACHING_CALL_LABEL,
    href: COACHING_CALL_URL,
    buttonVariant: "dark",
    ctaNote: COACHING_CALL_NOTE,
    description:
      "Opens with the full challenge delivered privately at VVIP level, one-on-one, in three days, at no additional fee. Then live group coaching through the 6-Month Roadmap: three Saturday sessions a month at 7PM WAT, 2 hours each, with recordings, a private group channel, direct facilitator messages, and all of Labs for as long as coaching lasts. Rolling entry, no intake to wait for. Every plan includes everything; only the commitment length and total cost differ. Always mention that the first step is a 15-minute discovery call.",
    fit: "The path for a direction-setter (chief) going all in on becoming an AI stakeholder, who wants coaching support for a faster transformation. Also for any leader who wants a guide alongside them for the months after the challenge. It includes the private VVIP-level challenge, so it is the answer for anyone who wants both private delivery and ongoing support. A natural next step, never a hard close.",
  },
  awakening: {
    id: "awakening",
    name: "The Awakening",
    badge: "Private Briefing",
    priceKind: "subPath",
    price: null,
    priceNote: null,
    description:
      'Briefing 01 of the Private Briefings: "The Awakening: Recognizing AI Fluency as the Non-Negotiable Next Layer of Leadership." A focused, high-trust briefing that introduces an organization or community to the leadership transition AI has started.',
    fit: "Two paths. The briefing path: a leader books a private paid briefing for their organization or community, or to go deeper on the challenge and AI for themselves; fee details are shared on demand, never quote a number. The sponsor path: communities able to convene 50 or more leaders host a private 30-minute Awakening session at no cost.",
    subPaths: {
      briefing: {
        name: "The Awakening: Private Briefing",
        priceKind: "onRequest",
        priceNote: "Priced on request",
        cta: "Request Briefing",
        href: "https://intelligence.michaelsteve.com/pay/vip",
        buttonVariant: "dark",
      },
      sponsor: {
        name: "The Awakening: Community Session",
        priceKind: "free",
        priceNote: "Free for communities of 50+ leaders",
        cta: "Partner with us",
        href: "https://intelligence.michaelsteve.com/community/sponsor",
        buttonVariant: "premium",
      },
    },
  },
};

// Shape one offer for the client. subPath only applies to the awakening.
export function presentOffer(offerId, subPath) {
  const entry = CATALOG[offerId];
  if (!entry) return null;

  if (entry.priceKind === "subPath") {
    const sub = entry.subPaths[subPath] || entry.subPaths.briefing;
    return {
      offerId,
      subPath: subPath || "briefing",
      name: sub.name,
      badge: entry.badge,
      priceKind: sub.priceKind,
      price: null,
      priceNote: sub.priceNote,
      plans: null,
      cta: sub.cta,
      href: sub.href,
      buttonVariant: sub.buttonVariant,
      ctaNote: null,
    };
  }

  return {
    offerId,
    subPath: null,
    name: entry.name,
    badge: entry.badge,
    priceKind: entry.priceKind,
    price: entry.price,
    priceNote: entry.priceNote,
    plans: entry.plans || null,
    cta: entry.cta,
    href: entry.href,
    buttonVariant: entry.buttonVariant,
    ctaNote: entry.ctaNote || null,
  };
}
