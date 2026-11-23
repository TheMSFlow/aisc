// A simulated AI Stakeholder Office Sprint, used to show (not tell) what the
// report looks like on /office-sprint (founder, 2026-11-22). The organization
// is fictional (Alder Lane Co.) and is shown as its report, without a "Sample" label. The numbers are internally
// consistent, and they keep the promises the page makes: group totals only,
// no team under 5 people, themes and counts rather than anyone's words.
//
// When the real report is built (learning center), it should produce exactly
// these views from `sprint_work`.

export const SAMPLE_ORG = {
  // Fictional (founder, 2026-11-22: "Use any fictitious company name").
  name: "Alder Lane Co.",
  about:
    "Delivers packaged food and household goods from one warehouse to more than 300 shops and supermarkets. 48 people work there; 16 of them, from three teams, joined the sprint.",
  workforce: 48,
  description: "A distribution company: 16 people in three teams",
  people: 16,
  teams: [
    { key: "ops", name: "Operations and Warehouse", people: 6 },
    { key: "sales", name: "Sales and Customer Care", people: 5 },
    { key: "finance", name: "Finance and Admin", people: 5 },
  ],
};

// How the people responded: registered, and finished each sprint's task.
export const SAMPLE_PARTICIPATION = {
  registered: 16,
  finished: [16, 15, 14],
};

// Sprint 1: the tasks people listed, placed by the Delegation Tool.
// Quadrant order and colours are fixed (validated for colour-blind readers).
export const QUADRANTS = [
  { key: "automate", label: "Automate", note: "AI can own it", color: "#2e9e5b" },
  { key: "augment", label: "Augment", note: "People and AI together", color: "#6368da" },
  { key: "streamline", label: "Streamline", note: "Question the task first", color: "#16999c" },
  { key: "own", label: "Own", note: "People lead it", color: "#bf7410" },
];

export const SAMPLE_TASKS = [
  { team: "ops", automate: 9, augment: 8, streamline: 11, own: 13 },
  { team: "sales", automate: 7, augment: 12, streamline: 5, own: 12 },
  { team: "finance", automate: 12, augment: 8, streamline: 6, own: 9 },
];

// The tasks most often placed in Automate, as themes.
export const SAMPLE_TOP_TASKS = [
  "Matching payments to invoices",
  "The weekly stock report",
  "Order confirmations to customers",
];

// Sprint 2: the six readiness areas, average score out of 20 (whole numbers, founder 2026-11-22), in the order to
// work on them (lowest first), as the readiness report does.
export const SAMPLE_READINESS = {
  outOf: 20,
  areas: [
    { name: "Data Governance", score: 7, tag: "Start here" },
    { name: "Impact Evaluation", score: 8 },
    { name: "Strategy", score: 9 },
    { name: "Processes", score: 10 },
    { name: "Talent", score: 12 },
    { name: "Collaboration", score: 14, tag: "Strongest" },
  ],
};

// Sprint 2: the data audit, every set of information people described.
export const DATA_STATUS = [
  { key: "ready", label: "Ready", color: "#1f8a4c" },
  { key: "nearly", label: "Nearly ready", color: "#c98a12" },
  { key: "not", label: "Not ready", color: "#b4321f" },
];

export const SAMPLE_DATA = {
  sets: 31,
  status: { ready: 6, nearly: 11, not: 14 },
  nobodyOwns: 9,
  // Of the sets nobody answers for, how many sit in each status.
  nobodyOwnsByStatus: { ready: 0, nearly: 2, not: 7 },
  keptIn: [
    { place: "Shared spreadsheets", sets: 12 },
    { place: "WhatsApp chats", sets: 7 },
    { place: "Email inboxes", sets: 5 },
    { place: "Paper files", sets: 4 },
    { place: "Accounting software", sets: 3 },
  ],
};

// Sprint 3: what slows the work down, as themes, with how many people named it
// and how many chose it as the problem most worth solving.
export const SAMPLE_PROBLEMS = [
  { theme: "Re-typing orders sent on WhatsApp", named: 9, chosen: 5 },
  { theme: "Chasing late payments", named: 7, chosen: 4 },
  { theme: "Counting stock by hand", named: 6, chosen: 3 },
  { theme: "Putting together month-end reports", named: 5, chosen: 1 },
  { theme: "Answering the same customer questions", named: 5, chosen: 1 },
];

// Sprint 3: the rules people wrote into their own AI policies, as themes, out
// of the 14 who submitted one.
export const SAMPLE_RULES = {
  submitted: 14,
  rules: [
    { rule: "Never put customer details into a public AI tool", people: 13 },
    { rule: "Check every figure before anything is sent", people: 12 },
    { rule: "Ask a manager when unsure what is allowed", people: 10 },
    { rule: "Never use AI to judge a colleague's work", people: 9 },
    { rule: "Tell customers when AI drafted a message", people: 6 },
  ],
};

// What it means: the moves the advisory call turns the findings into.
export const SAMPLE_MOVES = [
  {
    title: "Give every set of data an owner",
    body: "Before any AI tool touches it, name who answers for the 9 sets nobody owns, starting with the customer list.",
  },
  {
    title: "Write your AI policy together",
    // Not only their rules: theirs plus one the findings call for, named
    // (founder, 2026-11-22). 13 of 14 ban public AI tools for customer details,
    // yet nobody said which tools are allowed, and the first project (WhatsApp
    // orders) will need one. The added rule closes that gap.
    body: "Start from the four rules most of your people already keep, and add one they did not write: only AI tools the company has approved may be used for work.",
  },
  {
    // Adoption does not follow the sprint directly: training, then a few
    // pilots, then adoption (founder, 2026-11-22).
    title: "Train, then pilot",
    body: "Train the people who will lead it, then test AI on one small pilot. Re-typing WhatsApp orders is the strongest candidate: 9 people named it and 5 want it solved first.",
  },
];
