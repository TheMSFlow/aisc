import { Flag } from "lucide-react";

// ─────────────────────────────────────────────
// The programme, as four full-screen stages.
//
// Each stage fills the viewport in its own colour: the two
// phases of Sprint 1, then Sprint 2, then Sprint 3. There is
// no separate Sprint 1 container — its checkpoint lives on
// AI Career Labs, which is where that checkpoint is actually
// earned.
//
// Type scales up with the viewport so a stage fills its
// screen on a desktop, and back down so it still fits a
// 360px phone. Sizes are measured, not guessed.
//
// A cohort is the package, Sprint 1 and Sprint 2 together
// (founder, 2026-10-17), so Sprint 1 reads "Included" and the
// price sits on Sprint 2. The full fee is $1,000, brought down
// to $100 by sponsorship from the AI Stakeholder Challenge:
// always "sponsors", never was/now (SOURCE_OF_TRUTH.md, Money).
// Dollars only on this page; naira is shown at checkout.
//
// The CTA points at the free application form while a free
// cohort is open, and moves to /pay/aica ("Claim Your Seat")
// when paid cohorts begin. BETA_NOTE goes with it.
//
// PARKED COPY — organisation-facing sponsorship. Kept off this
// page, which speaks to participants (2026-09-01; reworded for
// the package 2026-10-17):
//
//   "The full fee is $1,000, brought down to $100 by
//    sponsorship from the AI Stakeholder Challenge.
//    Organisations can cover that $100 to put someone through
//    at no cost to them, or bring a whole cohort of their own.
//    Write to careers@michaelsteve.com."
//
// Also recorded in SOURCE_OF_TRUTH.md.
// ─────────────────────────────────────────────

const APPLY_URL =
  "https://intelligence.michaelsteve.com/form/opportunity/ai-apprentice";
const APPLY_LABEL = "Apply Now";

// Shown beside the bottom button while the CTA points at the free form.
const BETA_NOTE = "Applications are open for the beta cohort, which is free.";

const stages = [
  {
    id: "the-awakening",
    name: "Sprint 1",
    tag: "Phase 1 · 2 days",
    badge: "Included",
    title: "The Awakening",
    desc: "Two days on the one thing that decides everything after it: how you think. You see today's realities clearly, you see AI for what it actually is, and you look honestly at what you are already worth, then write that down as a one-page value summary. Tools get replaced and skills need updating. The mindset you set here does not expire, and it is what keeps you productive and pointed in the right direction.",
    gate: "Submit your value summary. Once it is approved, you move into AI Career Labs.",
    cta: true,
    variant: "accent",
  },
  {
    id: "ai-career-labs",
    name: "Sprint 1",
    tag: "Phase 2 · 3 days",
    badge: "Included",
    title: "AI Career Labs",
    desc: "Three days turning that value summary into a personal website recruiters and employers can visit. The website is what you walk away with, but it is not the skill. The skill is doing real work through AI: directing it, seeing where it helps and where it quietly gets things wrong, and applying strategy, design and marketing while you build. You finish able to build with AI, not just use it.",
    gate: "A skill you can earn from, and proof to anyone hiring that you can build something real.",
    checkpointLabel: "Checkpoint · end of Sprint 1",
    checkpoint:
      "Put your own website online, built the way you were taught here, using your value summary as the starting point. You keep improving it through the mentorship.",
    variant: "magenta",
  },
  {
    id: "the-mentorship",
    name: "Sprint 2",
    tag: "26 weeks",
    badgeStrike: "$1,000",
    badge: "$100",
    title: "The Mentorship",
    desc: "Twenty-six weeks of group mentorship with an AI executive educator. Each week brings a session of mentorship teaching, an AI Lab, tasks and a live group call, moving from foundations and character through visibility, relationships and leadership to career readiness and graduation. The early AI Labs build your basic AI fluency. The aim is not to make you good at one job. It is to make you productive in any room you walk into, able to read a new environment, find where the value sits, and start delivering without being told how. You close the gaps in the website you started in AI Career Labs until it is the best representation of your value, and finish with an AI-optimised CV and a portfolio of high-impact work.",
    checkpointLabel: "Checkpoint · to graduate",
    checkpoint:
      "At least 70% attendance, 19 of the 26 weeks, and every task finished. Meet both and you graduate with a certificate.",
    variant: "dark",
  },
  {
    id: "the-apprenticeship",
    name: "Sprint 3",
    tag: "6–12 months",
    badgeAlt: "Stipend",
    badge: "By invitation",
    title: "The Apprenticeship",
    desc: "A paid apprenticeship of six to twelve months, and the last part of the journey. It opens with the AI Stakeholder Challenge, the programme that leaders pay up to $1,099 to join, and you get extended access because you are inside the studio. From there it is real work: serious projects where you take full ownership, work with a team, and run things that matter. It is rigorous and intensive, on purpose. What comes out the other side is someone the best organizations would be lucky to have.",
    checkpointLabel: "How places are offered",
    checkpoint:
      "Sprint 2 graduates qualify whenever there is an opening. Selections are based on merit: the difference you have made, what you have contributed, and the leadership you have shown. This is not usually open, and terms differ with every opening.",
    variant: "green",
  },
];

const whoFor = [
  "Recent graduates who feel ready but lack direction",
  "Job seekers tired of submitting CVs into silence",
  "Aspiring leaders who want to be trusted with more, sooner",
  "People curious about AI and serious about building a future with it",
  "Those who are coachable, self-driven, and willing to back themselves",
  "Professionals feeling stuck or looking to pivot into a career with real momentum",
];

const whatYouGain = [
  {
    label: "Sprint 1 · Five days",
    items: [
      "Real AI fluency. Practical, not theoretical",
      "A website that shows recruiters and employers what you are worth, instead of just telling them",
      "A skill you can earn from, and proof to anyone hiring that you can build something real",
    ],
  },
  {
    label: "Sprint 2 · The Mentorship",
    items: [
      "26 weeks of mentorship from an AI executive educator, with an AI Lab every week",
      "Your website finished into real proof, with an AI-optimised CV and a portfolio behind it",
      "Job readiness for the roles that now expect AI skill, which is most of them",
      "A certificate when you graduate",
    ],
  },
  {
    label: "Sprint 3 · The Apprenticeship",
    items: [
      "A place on the AI Stakeholder Challenge",
      "Work on real projects, with real responsibility",
      "A stipend for as long as the apprenticeship runs",
    ],
  },
];

const needs = [
  {
    label: "Qualification",
    value: "A degree or equivalent in any field.",
    note: "Your subject does not matter. Your mindset does.",
  },
  {
    label: "Access",
    value: "A smartphone or computer.",
    note: "And a reliable internet connection to participate remotely.",
  },
  {
    label: "Commitment",
    value: "Five days, then one session a week.",
    note: "Sprint 1 takes five days. The mentorship is a session and a group call each week for 26 weeks.",
  },
];

// Under What You Will Need. The founder will send the link for a third
// line, "Not ready to join? The programme's videos are free to watch on
// YouTube." (2026-10-17); it is added here once the link exists.
const notes = [
  "Scholarships covering the full fee are awarded privately.",
  "The programme is a bridge to your next step, not a place to stay. You can join at most two cohorts.",
];

// Text colour is set per background, not shared. msaccent is a mid-tone and
// only near-pure white clears AA on it (white/75 measures 3.36:1); the other
// three are dark enough to carry softened body copy.
const TONES = {
  accent: {
    bg: "bg-msaccent",
    style: undefined,
    tag: "text-white",
    name: "text-white/70",
    body: "text-white",
    meta: "text-white/85",
    rule: "border-white/25",
    badge: "bg-white text-msaccent",
    cta: "bg-white text-msaccent hover:bg-lilac",
    badgeAlt: "bg-white/25 text-white",
    label: "text-white",
  },
  magenta: {
    bg: "bg-warning",
    style: undefined,
    tag: "text-lilac",
    name: "text-white/50",
    body: "text-white/85",
    meta: "text-white/70",
    rule: "border-white/20",
    badge: "bg-white text-warning",
    cta: "bg-white text-warning hover:bg-lilac",
    badgeAlt: "bg-white/20 text-white",
    label: "text-lilac",
  },
  dark: {
    bg: "bg-dark-blue",
    style: undefined,
    tag: "text-lilac",
    name: "text-white/40",
    body: "text-white/80",
    meta: "text-white/65",
    rule: "border-white/15",
    badge: "bg-lilac text-dark-blue",
    cta: "bg-lilac text-dark-blue hover:bg-lilac-hover",
    badgeAlt: "bg-white/15 text-lilac",
    label: "text-msaccent",
  },
  green: {
    bg: "",
    style: { backgroundColor: "#1A5C45" },
    tag: "text-lilac",
    name: "text-white/50",
    body: "text-white/80",
    meta: "text-white/65",
    rule: "border-white/15",
    badge: "bg-emerald-100 text-emerald-900",
    cta: "bg-emerald-100 text-emerald-900 hover:bg-white",
    badgeAlt: "bg-white/15 text-white",
    label: "text-lilac",
  },
};

function StageScreen({ s }) {
  const t = TONES[s.variant];

  return (
    <section
      id={s.id}
      style={t.style}
      className={`flex min-h-dvh scroll-mt-0 items-center px-5 py-10 sm:px-8 sm:py-16 ${t.bg}`}
    >
      <div className="mx-auto w-full max-w-4xl space-y-5 sm:space-y-7 lg:space-y-9">
        {/* header. Order shuffles below sm: name and badges take the first
            line, duration drops to its own line underneath. Three elements on
            one row is too many for a 360px screen. */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <span
            className={`order-1 font-ptsans text-2xl font-bold sm:text-4xl lg:text-5xl 2xl:text-6xl uppercase ${t.name}`}
          >
            {s.name}
          </span>
          <span
            className={`order-3 w-full text-[11px] font-semibold uppercase tracking-[0.15em] sm:order-2 sm:w-auto sm:text-xs lg:text-sm ${t.tag}`}
          >
            {s.tag}
          </span>
          <span className="order-2 ml-auto flex shrink-0 items-center gap-2 sm:order-3">
            {s.badgeAlt && (
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest sm:text-xs ${t.badgeAlt}`}
              >
                {s.badgeAlt}
              </span>
            )}
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest sm:text-xs ${t.badge}`}
            >
              {s.badgeStrike && (
                <span className="mr-1.5 font-normal line-through opacity-60">
                  {s.badgeStrike}
                </span>
              )}
              {s.badge}
            </span>
          </span>
        </div>

        <h3 className="font-semibold leading-tight text-white text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl">
          {s.title}
        </h3>

        <p
          className={`font-inter font-light leading-relaxed text-[15px] sm:text-lg lg:text-xl 2xl:text-2xl ${t.body}`}
        >
          {s.desc}
        </p>

        {s.gate && (
          <p
            className={`font-inter font-light italic text-[13px] sm:text-base ${t.meta}`}
          >
            {s.gate}
          </p>
        )}

        {s.cta && (
          <a
            href={APPLY_URL}
            className={`inline-flex w-full items-center justify-center rounded-lg px-8 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto sm:text-base ${t.cta}`}
          >
            {APPLY_LABEL}
          </a>
        )}

        {s.checkpoint && (
          <div className={`border-t pt-4 sm:pt-5 ${t.rule}`}>
            <p
              className={`mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs ${t.label}`}
            >
              <Flag className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {s.checkpointLabel}
            </p>
            <p
              className={`font-inter font-light italic text-[13px] sm:text-base ${t.meta}`}
            >
              {s.checkpoint}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ApplyButton({ className = "" }) {
  return (
    <a
      href={APPLY_URL}
      className={`gradient-200 inline-flex w-full items-center justify-center rounded-lg py-3 px-8 font-semibold text-white transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msaccent focus-visible:ring-offset-2 sm:w-auto ${className}`}
    >
      {APPLY_LABEL}
    </a>
  );
}

// Four screens need something to orient them, so the heading is the index:
// what each stage is, how long, what it costs, and a jump into it.
const INDEX_ACCENT = {
  accent: "text-msaccent",
  magenta: "text-warning",
  dark: "text-dark-blue",
  green: "text-[#1A5C45]",
};

function SprintIndex() {
  return (
    <div className="w-full max-w-4xl space-y-8">
      <h2 className="font-ptsans text-3xl font-bold uppercase leading-tight tracking-tight text-dark-blue sm:text-4xl lg:text-5xl">
        3 Sprints of Transformation
      </h2>

      <ul>
        {stages.map((s) => {
          const accent = INDEX_ACCENT[s.variant];
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group block border-t border-dark-blue/15 py-4 transition-colors hover:bg-lilac/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msaccent"
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className={`text-xs font-semibold tracking-[0.15em] uppercase ${accent}`}
                  >
                    {s.name}
                  </span>
                  <span
                    className={`ml-auto text-xs font-semibold tracking-widest uppercase ${accent}`}
                  >
                    {s.badgeStrike && (
                      <span className="mr-1.5 font-normal line-through opacity-60">
                        {s.badgeStrike}
                      </span>
                    )}
                    {s.badge}
                  </span>
                </div>
                <p className="mt-1 font-semibold text-lg text-dark-blue">
                  {s.title}
                </p>
              </a>
            </li>
          );
        })}
      </ul>

      <p className="border-t border-dark-blue/15 pt-4 font-inter text-sm font-light text-dark-blue/80 sm:text-base">
        One payment covers Sprints 1 and 2. The full fee is $1,000, brought
        down to $100 by sponsorship from the AI Stakeholder Challenge.
      </p>
    </div>
  );
}

export default function ApprenticeProgramme() {
  return (
    <div className="text-dark-blue text-base">
      {/* INDEX — one screen */}
      <section className="flex min-h-dvh items-center justify-center px-5 sm:px-8 py-10 sm:py-16">
        <SprintIndex />
      </section>

      {/* FOUR STAGES — one full-bleed screen each, in its own colour */}
      {stages.map((s) => (
        <StageScreen key={s.id} s={s} />
      ))}

      <div className="flex justify-center items-start py-10 md:py-20 px-5 sm:px-8">
        <article className="max-w-4xl w-full space-y-16">
          {/* WHO THIS IS FOR */}
          <section className="space-y-6">
            <h2 className="text-2xl xs:text-3xl font-bold leading-snug">
              Who This Is For
            </h2>
            <div className="bg-dark-blue text-white p-6 rounded-lg">
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm font-light">
                {whoFor.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-msaccent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* WHAT YOU WILL GAIN — grouped by sprint */}
          <section className="space-y-6">
            <h2 className="text-2xl xs:text-3xl font-bold leading-snug">
              What You Will Gain
            </h2>
            <div className="border border-dark-blue/20 rounded-lg p-6 space-y-5">
              {whatYouGain.map((group, i) => (
                <div
                  key={group.label}
                  className={
                    i === 0
                      ? "space-y-2"
                      : "space-y-2 border-t border-dark-blue/10 pt-5"
                  }
                >
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-msaccent">
                    {group.label}
                  </p>
                  <ul className="space-y-2 text-sm font-light">
                    {group.items.map((item, j) => (
                      <li key={j} className="flex gap-2 items-start">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-msaccent shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* WHAT YOU NEED */}
          <section className="space-y-6">
            <h2 className="text-2xl xs:text-3xl font-bold leading-snug">
              What You Will Need
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {needs.map((item, i) => (
                <div key={i} className="bg-lilac rounded-lg p-5 space-y-1">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-msaccent">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-dark-blue">
                    {item.value}
                  </p>
                  <p className="text-xs text-dark-blue/70 font-light">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
            <ul className="space-y-2 text-sm font-light text-dark-blue/80">
              {notes.map((note) => (
                <li key={note} className="flex gap-2 items-start">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-msaccent shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <ApplyButton />
              <p className="font-inter text-sm font-light text-dark-blue/70">
                {BETA_NOTE}
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
