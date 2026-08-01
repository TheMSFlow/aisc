import { PRICING } from "@/lib/pricing";

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
      "The full 7-day challenge. All 4 live sessions (AI Clarity, AI Labs, AI Value, AI Governance), every resource, the mini apps (Delegation Tool, Margin Calculator, Territory Builder), the Day 3 Milestone Task, the 6-Month AI Stakeholder Roadmap, 1 month of AI Labs, community access, and the Certificate of Declaration.",
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
      "Everything in General Admission, plus the facilitator close to your specific situation: written feedback on up to 3 iterations of the milestone task, a 30-minute private strategy session if all 3 are used, a VIP-only live Q&A on Day 5, a 2-hour Roadmap deep dive on Day 6, and 3 months of AI Labs.",
    fit: "For leaders who want direct guidance on their specific situation during the challenge. Capped at 10 seats because milestone feedback requires a manageable group. Frame as deeper access, never as more content.",
  },
  vvip: {
    id: "vvip",
    name: "VVIP",
    badge: "Private 1:1",
    priceKind: "fixed",
    price: PRICING.vvip,
    priceNote: null,
    cta: "Secure 1:1 Access",
    href: `${PAY_BASE}?package=vvip`,
    buttonVariant: "vvip",
    description:
      "The full 7-day experience delivered privately, one on one, scheduled around the participant's calendar. Direct facilitator access across all 7 days, every GA and VIP inclusion, and 6 months of AI Labs.",
    fit: "The natural fit for the most senior leaders who set direction: private, conversational, directional delivery with no cohort schedule to follow.",
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
      "The same 7-day challenge delivered privately to an organization, leadership team, or high-trust group that wants alignment as a unit. Custom pricing and scheduling.",
    fit: "Qualifies one of two ways. Option A: a minimum of 3 VIP seats combined with 5 or more General Admission seats. Option B: a baseline of 10 VIP seats with no upper cap. Only recommend as primary when the visitor is clearly deciding for a whole team or organization at plausible scale; below the thresholds, recommend VIP as primary and mention the thresholds plainly.",
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
    cta: "Start with Coaching",
    href: "https://cal.com/michaelsteve/ai-stakeholder-coaching-discovery-call",
    buttonVariant: "dark",
    ctaNote: "Your first step is a 15-minute discovery call.",
    description:
      "Live group coaching through the 6-Month Roadmap. One facilitated session per week, 180 days of guided execution, and the full challenge included at no additional fee. Always mention that the first step is a 15-minute discovery call.",
    fit: "For leaders who want a guide alongside them for the months after the challenge, or who already know they want ongoing support. A soft, natural next step, never a hard close.",
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
