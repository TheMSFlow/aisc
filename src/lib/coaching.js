// AI Stakeholder Coaching: one source for the facts every surface repeats.
// Used by /coaching, the home Coaching section, and the personalize catalog,
// so cadence, plans and the booking link cannot drift apart again.
// Prices stay in pricing.js; this file only points at them.
import { PRICING } from "@/lib/pricing";

// Cal.com only. There must never be a calendly.com coaching link.
export const COACHING_CALL_URL =
  "https://cal.com/michaelsteve/ai-stakeholder-coaching-discovery-call";

export const COACHING_CALL_NOTE =
  "Your first step is a 15-minute call to confirm coaching is the right fit.";

// Confirmed by the founder 2026-09-28. The last week of each month belongs to
// the public monthly challenge, which is why it is three Saturdays, not four.
export const COACHING_SESSION = {
  perMonth: 3,
  day: "Saturday",
  time: "7PM WAT",
  hours: 2,
};

// The at-a-glance facts (reads 3, 2, 1). Shared by the /coaching hero strip
// and the home Coaching section. Never add a plan length (plans run 1, 6 or
// 12 months) or a currency figure (the page shows ₦ or $ by location).
export const COACHING_FACTS = [
  { value: `${COACHING_SESSION.perMonth}`, label: "sessions a month" },
  { value: `${COACHING_SESSION.hours}`, label: "hrs live" },
  { value: "1", label: "private 7-day challenge included" },
];

export const COACHING_PLANS = [
  {
    id: "month",
    period: "Monthly",
    months: 1,
    price: PRICING.coaching.month,
    note: null,
  },
  {
    id: "sixMonths",
    period: "6 Months",
    months: 6,
    price: PRICING.coaching.sixMonths,
    note: "Save ~17% vs monthly",
  },
  {
    id: "year",
    period: "Annual",
    months: 12,
    price: PRICING.coaching.year,
    note: "Best value, save ~30%",
  },
];

// Per-month equivalent of a plan, derived so no figure is typed twice.
export function perMonth(plan) {
  return {
    usd: Math.round(plan.price.usd / plan.months),
    ngn: Math.round(plan.price.ngn / plan.months),
  };
}
