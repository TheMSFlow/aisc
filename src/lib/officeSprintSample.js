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
// Quadrant order is fixed. Colours: the report's blue scale (2026-11-27), deep
// for the work that could go to AI, lighter as people keep more of it.
export const QUADRANTS = [
  {
    key: "automate",
    label: "Automate",
    note: "AI can own it",
    color: "#00034c",
  },
  {
    key: "augment",
    label: "Augment",
    note: "People and AI together",
    color: "#2c37c4",
  },
  {
    key: "streamline",
    label: "Streamline",
    note: "Question the task first",
    color: "#7f86e3",
  },
  { key: "own", label: "Own", note: "People lead it", color: "#c6c9f3" },
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
  { key: "ready", label: "Ready", color: "#7f86e3" },
  { key: "nearly", label: "Nearly ready", color: "#c6c9f3" },
  { key: "not", label: "Not ready", color: "#00034c" },
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

// The report ends in two sets, as the real report does (founder, 2026-11-27:
// "True next steps that if not taken can harm adoption and make it fail. Then
// value creation solutions"). Foundations are named as the general challenge,
// never a task; AI Fluency is always one, and it means full training, not more
// of the sprint. Every figure below comes from the sample above.
export const SAMPLE_FOUNDATIONS = [
  {
    title: "AI Fluency",
    body: "The sprints train your people, but three days cannot give them all they need. Full AI Fluency adds using AI effectively, efficiently, ethically and safely, knowing the platforms that suit their work, and hands-on practice.",
    why: "They would hand half the work they listed to AI, and have yet to work with it.",
    risk: "People avoid AI or use it carelessly, and no pilot delivers.",
  },
  {
    title: "AI Governance",
    body: "One AI policy the company adopts, built from the rules your people already agree on, with the ones nobody wrote.",
    why: "13 of 14 rule out customer details in public AI tools, yet nobody said which tools are allowed.",
    risk: "Fourteen personal rulebooks collide, and one slip exposes customer data.",
  },
  {
    title: "Data Audit",
    body: "Every set of data the work depends on needs an owner, one agreed home and a clear status before AI touches it.",
    why: "9 of 31 data sets have nobody answering for them, and Data Governance scores 7 of 20.",
    risk: "AI works from wrong figures faster than anyone can catch them.",
  },
];

// Opportunities, strongest first; `needs` names the foundation to put in place
// first, or nothing when it can start now.
export const SAMPLE_OPPORTUNITIES = [
  {
    kind: "Pilot",
    title: "Turn WhatsApp orders into bookings without re-typing",
    body: "9 people named it and 5 want it solved first. Orders arrive in chats and are typed in again by hand.",
    needs: "AI Governance",
  },
  {
    kind: "Pilot",
    title: "Match payments to invoices automatically",
    body: "7 people named chasing late payments and 4 want it solved first. Matching payments is the task most often placed in Automate.",
    needs: "Data Audit",
  },
  {
    kind: "Internal tool",
    title: "Keep one shared stock record",
    body: "6 people count stock by hand, and the weekly stock report is among the tasks most often placed in Automate.",
    needs: "",
  },
  {
    kind: "Customer",
    title: "Confirm orders to customers as they come in",
    body: "Order confirmations are among the tasks most often placed in Automate, and 5 people answer the same customer questions.",
    needs: "AI Governance",
  },
];
