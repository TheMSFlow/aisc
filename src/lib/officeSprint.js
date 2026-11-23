// The AI Stakeholder Office Sprint: one place for its facts and links, so the
// page, the footer, /links and the Pricing card never drift apart.
// Plan and decisions: program/OFFICE_SPRINT_PLAN.md (founder, 2026-11-21).

import { INTELLIGENCE_URL } from "@/lib/sites";

// The request form lives in Intelligence; local dev links to the local one.
export const OFFICE_SPRINT_REQUEST_URL = `${INTELLIGENCE_URL}/form/office-sprint`;
export const OFFICE_SPRINT_REQUEST_LABEL = "Apply for a Sprint";

// Anything outside the free times: priced case by case.
// `src=OS` opens the inquiry form as an Office Sprint request.
export const OFFICE_SPRINT_SALES_URL = `${INTELLIGENCE_URL}/form/inquiry?src=OS`;

export const OFFICE_SPRINT_FACTS = [
  // "Sprints", so they know it is fast (founder, 2026-11-22).
  { value: "3 sprints", label: "Monday to Wednesday" },
  { value: "45 min", label: "live each day" },
  { value: "Free", label: "for a team of 5 to 20" },
];

// Each sprint: what it teaches, the work after it, and what the leadership
// gains (founder approved, 2026-11-22). The "taught" lines are a commitment
// for the session material (step 4).
export const OFFICE_SPRINT_DAYS = [
  {
    sprint: 1,
    // How long the team's task takes (founder, 2026-11-22).
    taskMinutes: 10,
    day: "Monday",
    title: "AI Clarity and Task Delegation",
    short: "Clarity and Delegation",
    taught: "What AI is and what it isn't, in plain words, and what work is worth handing to it.",
    after:
      "Each person lists the tasks they do again and again, and a simple guided tool sorts which ones AI could help with.",
    gain: "A map of the work your teams would hand to AI.",
  },
  {
    sprint: 2,
    taskMinutes: 20,
    day: "Tuesday",
    title: "AI Readiness and Data Audit",
    short: "Readiness and Data Audit",
    taught: "What being ready for AI takes, and why it starts with your information.",
    after:
      "Each person rates how ready they are, then lists the information their work depends on, where it is kept and who looks after it. Nobody shares the information itself.",
    gain: "Your readiness across six areas, and a map of your data.",
  },
  {
    sprint: 3,
    taskMinutes: 30,
    day: "Wednesday",
    title: "AI Value Creation and Governance",
    short: "Value and Governance",
    taught: "Where AI creates new value, and the risks of using it without rules.",
    after:
      "Each person lists what slows their work down, ranks it, and picks the problem most worth solving. Then they write their own rules for using AI at work.",
    gain: "The problems worth solving first, and the rules your people will keep.",
  },
];

// The three free slots, Monday to Wednesday. Lagos is UTC+1 all year, so each
// slot is a fixed instant and the browser can show it in the visitor's zone.
export const OFFICE_SPRINT_SLOTS = [
  { key: "morning", name: "Slot 1", wat: "7:15 to 8:00 AM", utcHour: 6, utcMinute: 15 },
  { key: "evening-1", name: "Slot 2", wat: "5:15 to 6:00 PM", utcHour: 16, utcMinute: 15 },
  { key: "evening-2", name: "Slot 3", wat: "6:15 to 7:00 PM", utcHour: 17, utcMinute: 15 },
];

// Thursday's advisory call has no set times: a time is arranged with the
// organization (founder, 2026-11-22). Kept for reference only.
export const OFFICE_SPRINT_CLOSING_TIMES = ["9 AM", "10 AM", "11 AM", "2 PM"];

// How the people who take part are protected (founder, 2026-11-22). Each line
// is a promise: keep it true as the report and the contact's view are built.
// Shown in the FAQ.
export const OFFICE_SPRINT_PROTECTIONS = [
  "Group totals only, and no group under 5 people is ever shown on its own.",
  "Themes and counts, never anyone's own words.",
  "Your leadership sees how many finished each day, not who.",
  "Before they start, your people see a sample of the report, so they know exactly what goes up the line.",
  "Your leadership agrees never to ask for anyone's individual answers.",
];
