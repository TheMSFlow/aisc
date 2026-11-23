import Link from "next/link";
import { Info } from "lucide-react";
import Section from "@/components/layout/Section";
import Button from "@/components/global/Button";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { ReportPreview } from "@/components/office-sprint/OfficeSprintReport";
import {
  OFFICE_SPRINT_DAYS as DAYS,
  OFFICE_SPRINT_FACTS as FACTS,
  OFFICE_SPRINT_REQUEST_LABEL as REQUEST_LABEL,
  OFFICE_SPRINT_REQUEST_URL as REQUEST_URL,
  OFFICE_SPRINT_PROTECTIONS as PROTECTIONS,
  OFFICE_SPRINT_SALES_URL as SALES_URL,
} from "@/lib/officeSprint";

// Copy approved by the founder, 2026-11-21. Headline in his words.

const LABEL =
  "mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40";
const H2 =
  "font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-4xl lg:text-5xl";

export function OfficeSprintHero() {
  return (
    <div className="relative overflow-hidden bg-dark-blue text-white">
      {/* aurora */}
      <div className="pointer-events-none absolute -top-40 left-[-10%] h-150 w-225 bg-[radial-gradient(ellipse_at_center,rgba(99,104,218,0.2),transparent_60%)]" />
      <div className="pointer-events-none absolute -top-32 right-[-15%] h-130 w-190 bg-[radial-gradient(ellipse_at_center,rgba(135,5,113,0.13),transparent_60%)]" />

      {/* facts strip */}
      <div className="relative border-b border-white/8 bg-white/[0.03] px-5 sm:px-6 lg:px-8">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-white/10">
          {FACTS.map((f) => (
            <div
              key={f.label}
              className="flex min-w-0 flex-col gap-0.5 px-3 py-4 first:pl-0 last:pr-0 sm:px-6 md:flex-row md:items-baseline md:gap-2 md:py-5"
            >
              <dt className="sr-only">{`${f.value} ${f.label}`}</dt>
              <dd className="font-ptsans text-lg font-bold leading-tight text-white sm:text-xl">
                {f.value}
              </dd>
              <dd className="text-xs text-white/55 sm:text-sm">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Section spacing="none" className="relative pt-12 pb-12 md:pt-16 md:pb-16">
        {/* The report preview sits beside the promise on wide screens
            (founder, 2026-11-22). */}
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_28rem] xl:grid-cols-[minmax(0,1fr)_30rem]">
        <div className="max-w-4xl">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.35em] text-lilac/60">
            For organizations
          </p>
          <h1 className="font-ptsans text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl xl:text-6xl">
            Know your next step with AI in one week.
          </h1>
          <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-white/70 sm:text-lg">
            Three live sprints introduce your people to AI Leadership. As they
            learn, they also show you where AI could fit in their daily work,
            how ready they really are, what stands in the way, and the rules
            they would keep. By Thursday you know what your organization needs
            before it adopts AI, all drawn from your own people.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              href={REQUEST_URL}
              variant="primary"
              className="justify-center px-7 py-3 font-semibold"
            >
              {REQUEST_LABEL}
            </Button>
            <Button
              href="#what-changes"
              variant="secondary"
              className="justify-center px-7 py-3"
            >
              See details
            </Button>
          </div>
          {/* The risk-free facts, set apart so they stand out without
              competing with the buttons (founder, 2026-11-22). */}
          <div className="mt-8 flex w-fit max-w-2xl items-start gap-3 rounded-2xl border border-lilac/20 bg-lilac/[0.08] px-4 py-3.5 sm:px-5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-lilac" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-white/85">
              Online, no AI tools needed, and no company data shared.
            </p>
          </div>
        </div>
        <div className="hidden justify-center lg:flex">
          <ReportPreview />
        </div>
        </div>
      </Section>
    </div>
  );
}

// Where organizations are with AI today, and where they are after the sprint
// (founder, 2026-11-23). It opens on what most organizations feel, not knowing
// what to do next, then follows a leader's questions: what do we do, where
// does it help, will my people accept it, is it safe? Each "after" is backed
// by a real output of the sprint; nothing promises adoption or hands-on skill.
const PAINS = [
  {
    pain: "You know AI matters, but not what to do next.",
    answer:
      "You see how ready your organization is across six areas, what stands in the way, and where to start.",
  },
  {
    pain: "Nobody can say where AI would help most.",
    answer:
      "You have a map of the work your teams would hand to AI and the problems they want solved the most, including where AI could create new value.",
  },
  {
    pain: "Your people fear AI will replace them, so they quietly resist it.",
    answer:
      "They learn what AI can and cannot do, and what makes them more valuable alongside it, so they move from uncertainty to clarity.",
  },
  {
    pain: "AI tools get bought, then sit unused.",
    answer:
      "Your people show you where they want help from AI, so any tool you choose later solves a problem they already care about.",
  },
  {
    pain: "Your people may already be putting company information into public AI tools.",
    answer:
      "They learn the risks and each writes their own AI policy, so you can see the rules they would keep and build your governance from there.",
  },
];

export function OfficeSprintPains() {
  return (
    <div className="bg-white">
      <Section id="what-changes" spacing="compact" className="scroll-mt-20">
        <p className={LABEL}>What changes</p>
        <h2 className={`${H2} max-w-4xl`}>
          From unsure about AI to a clear next step your people support.
        </h2>

        {/* Column heads on wider screens; on phones each row labels itself */}
        <div className="mt-10 hidden grid-cols-2 gap-12 pb-3 md:grid">
          <p className="text-xs font-semibold text-warning">Today</p>
          <p className="text-xs font-semibold text-msblue">After the sprint</p>
        </div>

        <ul className="border-t border-dark-blue/10 max-md:mt-8">
          {PAINS.map((p) => (
            <li
              key={p.pain}
              className="grid gap-4 border-b border-dark-blue/10 py-7 md:grid-cols-2 md:gap-12"
            >
              <div>
                <p className="mb-1 text-xs font-semibold text-warning md:hidden">
                  Today
                </p>
                <p className="text-lg font-semibold leading-snug text-dark-blue">
                  {p.pain}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold text-msblue md:hidden">
                  After the sprint
                </p>
                <p className="text-base font-light leading-relaxed text-dark-blue/75">
                  {p.answer}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

// The line above each sprint deepens from Monday to Wednesday.
const SPRINT_LINE = ["border-t-msaccent/35", "border-t-msaccent/65", "border-t-msaccent"];

export function OfficeSprintDays() {
  return (
    <div className="bg-linear-to-b from-[#f4f5ff] to-lilac">
      <Section id="the-days" spacing="compact" className="scroll-mt-20">
        <p className={LABEL}>The three sprints</p>
        <h2 className={`${H2} max-w-4xl`}>
          Three sprints to find where AI fits, how ready you are and what to solve first.
        </h2>
        <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-dark-blue/70">
          Built from resources in the AI Stakeholder Challenge, the essentials
          are delivered in three sprints. After each sprint, your people do a
          short, guided task the same day, using what they already know about
          their job.
        </p>

        {/* One panel read left to right, Monday to Wednesday (founder,
            2026-11-23: the separate cards looked scattered). Subgrid keeps
            each kind of information on the same line across the three days.
            Reading aids, kept quiet: a large faint number and a top line that
            deepens day by day mark the sprint; each part steps from white
            through lilac to the navy result. On smaller screens each day is
            its own card. */}
        <ol className="mt-12 grid gap-5 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_auto] lg:gap-0 lg:overflow-hidden lg:rounded-3xl lg:shadow-[0_1px_2px_rgba(0,3,76,0.06),0_16px_40px_rgba(0,3,76,0.1)]">
          {DAYS.map((d, i) => (
            <li
              key={d.day}
              className="grid overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(0,3,76,0.06),0_12px_30px_rgba(0,3,76,0.08)] lg:row-span-4 lg:grid-rows-subgrid lg:rounded-none lg:shadow-none lg:[&:not(:first-child)>*]:border-l"
            >
              <div className={`border-t-[3px] border-l-dark-blue/10 px-6 pb-6 pt-6 lg:px-8 ${SPRINT_LINE[i]}`}>
                <div className="flex items-start justify-between gap-3">
                  <p className="pt-1 text-base font-semibold text-dark-blue">{d.day}</p>
                  <p className="font-ptsans text-7xl font-bold leading-[0.8] text-msaccent/25">
                    <span className="sr-only">Sprint </span>
                    {d.sprint}
                  </p>
                </div>
                <h3 className="mt-4 font-ptsans text-3xl font-bold leading-[1.05] tracking-tight text-dark-blue">
                  {d.question}
                </h3>
                <p className="mt-3 text-sm font-medium text-dark-blue/60">{d.title}</p>
              </div>
              <div className="border-dark-blue/10 bg-lilac/30 px-6 py-5 lg:px-8">
                <p className="text-xs font-semibold text-msblue">What they learn</p>
                <p className="mt-1.5 text-sm leading-relaxed text-dark-blue/75">{d.taught}</p>
              </div>
              <div className="border-dark-blue/10 bg-lilac/70 px-6 py-5 lg:px-8">
                <p className="text-xs font-semibold text-msblue">
                  Your team&rsquo;s task, {d.taskMinutes} min
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-dark-blue/80">{d.after}</p>
              </div>
              <div className="border-white/15 bg-dark-blue px-6 py-6 text-white lg:px-8">
                <p className="text-xs font-semibold text-lilac">What you get</p>
                <p className="mt-1.5 text-base font-medium leading-snug">{d.gain}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

const STEPS = [
  { title: "Apply for a sprint", body: "Choose your date and time slot. It takes two minutes." },
  {
    title: "Book your discovery call",
    body: "A 20-minute video call about why you need the sprint, what you want to achieve and what you have tried so far. If that's nothing yet, that's fine.",
  },
  {
    // "Onboarding", complete at least 48 hours before the start to claim the
    // week (founder, 2026-11-22).
    title: "Onboarding",
    body: "You share your organization's code and each person registers with their own email. Onboarding must be complete at least 48 hours before your first sprint to claim your slot.",
  },
];

// Who runs it (founder, 2026-11-22): a leader handing their people's time to
// a free program asks who is behind it. Facts only, no testimonials.
export function OfficeSprintBehind() {
  return (
    <div className="border-b border-dark-blue/8 bg-white">
      <Section spacing="none" className="py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <div>
            <p className={LABEL}>Who runs it</p>
            <h2 className="font-ptsans text-2xl font-bold uppercase leading-tight tracking-tight text-dark-blue sm:text-3xl">
              Michael Steve Clarity Studio.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-dark-blue/60">
              A clarity studio for strategic, executive and institutional
              leaders.
            </p>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-dark-blue/75">
            <p>
              The sprint is built on the studio&rsquo;s flagship program, the{" "}
              <span className="font-semibold text-dark-blue">AI Stakeholder Challenge</span>.
              Over seven days, it prepares senior leaders to take a clear
              position on AI and safely lead their people from uncertainty to
              clarity and prosperity.
            </p>
            <p>
              The Office Sprint brings its resources, guided tools and reporting
              to your people, in three sprints.
            </p>
            <Link
              href="/"
              className="inline-block pt-1 text-sm font-semibold text-msblue underline underline-offset-4 hover:text-dark-blue"
            >
              About the AI Stakeholder Challenge
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

export function OfficeSprintFit() {
  return (
    <div className="bg-white">
      <Section spacing="compact">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className={LABEL}>Who it is for</p>
            <h2 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-4xl">
              For organizations that know AI matters, but not what to do next.
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-dark-blue/65">
              You don&rsquo;t need an AI plan or any AI experience to start.
              Whether you are a young startup, a growing business or a team
              inside an enterprise, choose 5 to 20 key people, from your
              leadership down through each team. The wider the mix, the more
              your report shows.
            </p>
          </div>

          <div>
            <p className={LABEL}>How it starts</p>
            <ol className="space-y-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lilac font-ptsans text-base font-bold text-dark-blue">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-ptsans text-lg font-bold uppercase tracking-tight text-dark-blue">
                      {s.title}
                    </p>
                    <p className="mt-1 text-sm font-light leading-relaxed text-dark-blue/65">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <Button
              href={REQUEST_URL}
              variant="dark"
              className="mt-10 w-full px-7 py-3 font-semibold sm:w-fit"
            >
              {REQUEST_LABEL}
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}

export function OfficeSprintOutside() {
  return (
    <div className="bg-white">
      <Section spacing="none" className="pb-4 md:pb-6">
        <div className="flex flex-col gap-6 rounded-3xl bg-msaccent/10 p-8 md:flex-row md:items-center md:justify-between lg:p-10">
          <div>
            <h2 className="font-ptsans text-xl font-bold uppercase tracking-tight text-dark-blue">
              Need something custom?
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-dark-blue/60">
              For a team of fewer than 5 or more than 20, we design a paid sprint
              with you. Only sprints in the three time slots are free. A time of
              your own requires a paid sprint.
            </p>
          </div>
          <Button
            href={SALES_URL}
            variant="secondary-light"
            className="shrink-0 justify-center px-7 py-3 font-semibold"
          >
            Contact Sales
          </Button>
        </div>
      </Section>
    </div>
  );
}

const QUESTIONS = [
  {
    // The main audience's first worry (founder, 2026-11-23).
    q: "We don't have an AI plan yet. Is this for us?",
    a: "Yes. This is who it's built for. You need no plan, no tools and no AI experience. By Thursday you know where your organization stands and what to do next.",
  },
  {
    q: "Is it really free?",
    a: "Yes, once, for a team of 5 to 20 in one of the three time slots. We run it free so organizations can see our work before deciding anything bigger. A team of fewer than 5 or more than 20, or a time of your own, is a paid sprint we design with you.",
  },
  {
    // What the sprint asks of the person deciding (founder, 2026-11-22).
    q: "What does it take from us as leaders?",
    a: "Very little time. The person who applies books a 20-minute discovery call and shares your code with the team. On Thursday, your leadership joins the 30-minute advisory call.",
  },
  {
    q: "How are our people protected?",
    a: (
      <>
        Each person sees their own work. We see it too, so we can build your
        report. Your organization sees only what the report shows:
        <ul className="mt-3 space-y-2">
          {PROTECTIONS.map((line) => (
            <li key={line} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-msaccent" />
              {line}
            </li>
          ))}
        </ul>
        <span className="mt-3 block">
          The{" "}
          <a
            href="/policy/office-sprint"
            className="font-medium text-msblue underline underline-offset-2"
          >
            AI Stakeholder Office Sprint policy
          </a>{" "}
          has the detail.
        </span>
      </>
    ),
  },
  {
    q: "Why does the team need at least 5 people?",
    a: "To protect your people. Your report shows group totals, and with fewer than 5 people a total can point back to one person's answers. A team under 5 can be arranged as a paid sprint, where everyone agrees beforehand how their work is shared.",
  },
  {
    // Founder, 2026-11-22: a sprint is for key people chosen from the top
    // down; anything larger is planned differently.
    q: "Why is it free only up to 20 people?",
    a: "A sprint works best as a focused group: up to 20 key people, chosen from your leadership down through each team. That keeps every live sprint interactive and your report sharp enough to act on. A larger group needs a different design, with several groups, more sprints and a report for each, so we plan it with you as a paid sprint.",
  },
  {
    q: "Can our people really do all this in three days?",
    a: "Yes. Each day is a 45-minute live sprint, then a guided task of 10, 20 or 30 minutes. The resources and work come from the AI Stakeholder Challenge, compressed into three days with only the most important parts kept. A mini app built for each day guides the work and produces a PDF, so nobody starts from a blank page. Your people bring what they already know about their job, and their attention.",
  },
  {
    // It is a sprint: no replays, and every task closes at the end of
    // Wednesday, so the report is ready for Thursday (founder, 2026-11-23).
    q: "What if someone misses a live sprint?",
    a: "There is no replay, but they can still do the day's task until Wednesday at 11:59 PM WAT. Your report is built from the work that is in by then.",
  },
  {
    q: "Do our people need to know anything about AI?",
    a: "No. Monday starts from what AI is, in plain words. The sprint is built for people who have not used AI tools yet, and it works just as well for those who have.",
  },
  {
    // "Nothing to install" means no AI tools (founder, 2026-11-22). How the
    // live sprints are joined is not public: it is covered on the discovery
    // call.
    q: "Do we need to install or buy any AI tools?",
    a: "No. The sprints are live and online, and the guided tasks open in a browser on a phone or a computer. How your people join the live sprints is covered on your discovery call. Each person needs their own email address.",
  },
  {
    q: "What happens after the sprint?",
    a: "On Thursday, in a 30-minute advisory call, we share the report with your leadership and explain what it means for your organization. The sprint is the first step, and it shows you how your people respond, what stands in the way and what to fix first. Next comes deeper training, then a few small pilots, then adopting what works. Your results determine the training and other steps we recommend on the call.",
  },
];

export function OfficeSprintFAQ() {
  return (
    <div className="bg-white">
      <Section id="faq" spacing="compact" width="narrow" className="scroll-mt-20">
        <p className={LABEL}>Questions</p>
        <h2 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-4xl">
          Before you apply for a sprint.
        </h2>
        <FAQAccordion items={QUESTIONS} />

        <div className="mt-12 flex flex-col items-center">
          <Button href={REQUEST_URL} variant="dark" className="px-8 py-3 font-semibold">
            {REQUEST_LABEL}
          </Button>
        </div>
      </Section>
    </div>
  );
}
