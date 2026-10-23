// Reads every visitor-facing text field before it is shown or stored. The
// schema only proves the shape of the answer; this proves the words are fit to
// read. A result that fails is retried once, then replaced by the fallback.
//
// Origin: a live result once carried the model's own working notes ("Honest
// framing: ...", "(internal note removed)", "stop. stop. stop.") into the GA
// card, and the schema check passed it.

const LIMITS = {
  headline: { maxChars: 160, maxSentences: 2 },
  reasoning: { maxChars: 900, maxSentences: 5 },
  note: { maxChars: 450, maxSentences: 3 },
};

// Wording that only appears when the model talks about its task instead of
// to the visitor.
const LEAK_PATTERNS = [
  /internal note/i,
  /note to self/i,
  /placeholder/i,
  /honest framing/i,
  /ending clean/i,
  /final answer/i,
  /system prompt/i,
  /voice rules?/i,
  /\b(the|this) (visitor|user)\b/i,
  /\b(offerId|subPath|awakeningNote|customCohort|leader_of_leaders)\b/i,
  /\([^)]*\b(note|removed|internal)\b[^)]*\)/i,
  /[{}<>[\]_]/,
];

// Anything outside letters, digits, and ordinary sentence punctuation is
// debris (bullets, symbols, stray markup).
const ALLOWED_CHARS = /^[\p{L}\p{N} .,;:!?'"“”‘’()%&/+$₦…-]*$/u;

// One-word "sentences" the model uses to sign off its own working.
const SIGN_OFFS = new Set(["ok", "okay", "done", "stop", "final", "end", "fin"]);

function sentencesOf(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function checkText(label, text, { maxChars, maxSentences }) {
  const problems = [];
  if (!text || !text.trim()) return [`${label}: empty`];

  if (text.length > maxChars) problems.push(`${label}: ${text.length} chars`);

  const sentences = sentencesOf(text);
  if (sentences.length > maxSentences) {
    problems.push(`${label}: ${sentences.length} sentences`);
  }

  const leak = LEAK_PATTERNS.find((p) => p.test(text));
  if (leak) problems.push(`${label}: leak ${leak}`);

  if (!ALLOWED_CHARS.test(text)) problems.push(`${label}: unexpected characters`);

  const normalized = sentences.map((s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim());
  if (normalized.some((s) => SIGN_OFFS.has(s))) problems.push(`${label}: sign-off word`);
  if (new Set(normalized).size < normalized.length) problems.push(`${label}: repeated sentence`);

  const words = text.toLowerCase().match(/[a-z0-9']+/g) || [];
  for (let i = 2; i < words.length; i++) {
    if (words[i] === words[i - 1] && words[i] === words[i - 2]) {
      problems.push(`${label}: repeated word "${words[i]}"`);
      break;
    }
  }

  return problems;
}

// Takes the cleaned payload result (what the visitor would see) and returns
// the list of problems; an empty list means it may be shown.
export function qualityProblems(result) {
  const problems = [
    ...checkText("headline", result.headline, LIMITS.headline),
    ...checkText("primary", result.primary.reasoning, LIMITS.reasoning),
    ...checkText("alternate", result.alternate.reasoning, LIMITS.reasoning),
  ];
  if (result.awakeningNote) {
    problems.push(...checkText("awakeningNote", result.awakeningNote.reasoning, LIMITS.note));
  }
  return problems;
}
