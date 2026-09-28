// Deterministic recommendation used when the AI call is unavailable or fails.
// Keyed off the one structured answer (the seat). Reasoning is hand-written
// in brand voice: no dashes, no jargon, no forbidden phrases.

const FALLBACKS = {
  chief: {
    headline: "Clarity, delivered on your calendar",
    primary: {
      offerId: "vvip",
      subPath: null,
      reasoning:
        "You set direction, and your time is the scarcest resource in the room. The full 7-day experience delivered privately, one on one, scheduled around your calendar, is the path built for the seat you hold.",
    },
    alternate: {
      offerId: "coaching",
      subPath: null,
      reasoning:
        "If you want a guide alongside you for the months that follow, coaching walks with you through the full 6-month plan and includes the complete challenge, delivered to you privately, at no additional fee. It starts with a 15-minute discovery call.",
    },
    awakeningNote: null,
    confidence: "low",
  },
  leader_of_leaders: {
    headline: "A framework you can stand on in both directions",
    primary: {
      offerId: "vip",
      subPath: null,
      reasoning:
        "You answer upward for results and downward for direction. VIP keeps the facilitator close to your specific situation at the moments that matter most, with written feedback on your milestone work. It is capped at 10 seats for exactly that reason.",
    },
    alternate: {
      offerId: "vvip",
      subPath: null,
      reasoning:
        "If you would rather have the full 7-day experience delivered privately, one on one and scheduled around your calendar, VVIP removes the cohort schedule entirely and keeps the facilitator with you across all 7 days.",
    },
    awakeningNote: null,
    confidence: "low",
  },
  emerging: {
    headline: "The position you build before anyone asks for it",
    primary: {
      offerId: "ga",
      subPath: null,
      reasoning:
        "You carry real responsibility and you are building your influence. General Admission gives you the complete 7-day experience and a declared AI position, the kind of clarity that earns trust before anyone above you has thought to look for it.",
    },
    alternate: {
      offerId: "vip",
      subPath: null,
      reasoning:
        "If you want the facilitator's eyes on your specific work, VIP adds direct written feedback on your milestone task and two extra live sessions. Ten seats, no more.",
    },
    awakeningNote: null,
    confidence: "low",
  },
  individual: {
    headline: "Start where the full experience starts",
    primary: {
      offerId: "ga",
      subPath: null,
      reasoning:
        "The open cohort is where you start. General Admission is the complete 7-day experience, and nothing about it is reduced. You leave with clarity on where you stand with AI and a plan for the six months that follow.",
    },
    alternate: {
      offerId: "vip",
      subPath: null,
      reasoning:
        "If you want direct guidance on your own situation during the week, VIP puts the facilitator's feedback on your work. It is capped at 10 seats.",
    },
    awakeningNote: null,
    confidence: "low",
  },
};

export function fallbackResult(seat) {
  return FALLBACKS[seat] || FALLBACKS.individual;
}

// Canned compliant alternates, keyed by the primary offer. Used by the API
// route when the model returns an alternate below the primary on the
// commitment ladder (ga < vip < vvip < coaching): the personalized primary
// is kept and the downsold alternate is replaced with the next step up.
export const UPSELL_ALTERNATES = {
  ga: {
    offerId: "vip",
    subPath: null,
    reasoning:
      "If you want the facilitator's eyes on your specific work during the week, VIP adds direct written feedback on your milestone task and two extra live sessions. Ten seats, no more.",
  },
  vip: {
    offerId: "vvip",
    subPath: null,
    reasoning:
      "If you would rather have the full 7-day experience delivered privately, one on one and scheduled around your calendar, VVIP keeps the facilitator with you across all 7 days.",
  },
  vvip: {
    offerId: "coaching",
    subPath: null,
    reasoning:
      "If you want a guide alongside you for the months that follow, coaching walks with you through the full 6-month plan and includes the complete challenge, delivered to you privately, at no additional fee. It starts with a 15-minute discovery call.",
  },
  coaching: {
    offerId: "awakening",
    subPath: "briefing",
    reasoning:
      "If you would rather begin with a single focused conversation, The Awakening is a private briefing that introduces the leadership shift AI has started, for you or the people who look to you.",
  },
};
