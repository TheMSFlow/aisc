// The built-in copy of the optional "email me later" box's wording, shown when
// intelligence's api/public/leads/opt-ins cannot be read, so the box never
// disappears (founder, 2026-10-25). Intelligence stores its own copy with each
// lead (intelligence/src/lib/leads/optIns.js), so the two must say the same
// thing word for word: intelligence's scripts/check-readiness-wording.mjs fails
// if they differ. Change both together.

export const EMAIL_OPT_IN_TEXT =
  "Email me practical notes on AI for leaders, and news of the studio's programs. I can stop them at any time.";
