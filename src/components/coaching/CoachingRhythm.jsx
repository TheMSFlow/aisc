"use client";

import { FlaskConical, MessageCircle, PlayCircle, Users } from "lucide-react";
import Section from "@/components/layout/Section";
import { COACHING_SESSION } from "@/lib/coaching";
import { SessionTime, useSessionTime } from "@/components/coaching/useSessionTime";

const WEEKS = [
  { week: "Week 1", live: true },
  { week: "Week 2", live: true },
  { week: "Week 3", live: true },
  { week: "Week 4", live: false },
];

// Facilitator first: the coaching is the product, the group an added benefit.
const BETWEEN = [
  {
    icon: MessageCircle,
    title: "A direct line to your facilitator",
    body: "Message your facilitator between sessions when a decision cannot wait for Saturday.",
  },
  {
    icon: PlayCircle,
    title: "Every session recorded",
    body: "Miss a Saturday and you still have the whole conversation, questions included.",
  },
  {
    icon: FlaskConical,
    title: "AI Labs, for as long as you coach",
    body: "Leadership-focused AI instruction stays open for the whole of your coaching, not a fixed window.",
  },
  {
    icon: Users,
    title: "A private group channel",
    body: "Stay in contact with the other leaders in coaching between sessions.",
  },
];

export default function CoachingRhythm() {
  // Visitor's own day and time (WAT until the browser reports its zone).
  const t = useSessionTime();

  return (
    <div className="bg-linear-to-b from-white to-offwhite">
      <Section id="rhythm" spacing="compact" className="overflow-x-clip">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
              The rhythm
            </p>
            <h2 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-4xl lg:text-5xl">
              {/* Always Saturday: the session day is anchored to WAT. */}
              Three Saturdays a month.
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-dark-blue/65">
              Each session runs live for {COACHING_SESSION.hours} hours at{" "}
              <SessionTime />. You bring the decisions in front of you
              that week, and your facilitator helps you leave with a direction
              on each. There is no session in the fourth week.
            </p>
          </div>

          {/* a month, drawn */}
          <div className="grid grid-cols-2 gap-3 self-end sm:grid-cols-4 sm:gap-4">
            {WEEKS.map((w) => (
              <div
                key={w.week}
                className={`flex aspect-[4/3] flex-col justify-between rounded-2xl p-4 sm:aspect-[3/4] sm:p-5 ${
                  w.live
                    ? "bg-dark-blue text-white shadow-[0_2px_4px_rgba(0,3,76,0.15),0_16px_40px_rgba(0,3,76,0.25)]"
                    : "border border-dashed border-dark-blue/15 text-dark-blue/35"
                }`}
              >
                <p className="text-[11px] sm:text-xs">{w.week}</p>
                <div>
                  <p className="font-ptsans text-2xl font-bold uppercase leading-none">
                    {t.isWAT ? "Sat" : t.dayShort}
                  </p>
                  {!w.live ? (
                    <p className="mt-1.5 text-xs leading-snug">
                      Challenge week
                    </p>
                  ) : t.isWAT ? (
                    <p className="mt-1.5 text-xs leading-snug text-white/55">
                      {COACHING_SESSION.time}
                    </p>
                  ) : (
                    <>
                      <p className="mt-1.5 text-xs leading-snug text-white/85">
                        {t.time} your time
                      </p>
                      <p className="mt-0.5 text-[11px] leading-snug text-white/45">
                        {t.dayChanged ? "Sat " : ""}
                        {COACHING_SESSION.time}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-14 sm:mt-20">
          <div className="pointer-events-none absolute -top-20 left-[20%] h-80 w-140 bg-[radial-gradient(ellipse_at_center,rgba(99,104,218,0.16),transparent_60%)]" />
          <div className="pointer-events-none absolute -bottom-16 right-[5%] h-70 w-120 bg-[radial-gradient(ellipse_at_center,rgba(135,5,113,0.1),transparent_60%)]" />

          <h3 className="relative font-ptsans text-xl font-bold uppercase tracking-tight text-dark-blue">
            Between Saturdays
          </h3>
          <div className="relative mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {BETWEEN.map((b) => (
              <div
                key={b.title}
                className="rounded-3xl border border-white/60 bg-white/55 p-6 sm:p-7 shadow-[0_1px_2px_rgba(0,3,76,0.06),0_8px_24px_rgba(0,3,76,0.08)] backdrop-blur-xl"
              >
                {/* Same icon tile as the Toolbox (Demo.jsx). Beside the
                    title on phones, above it from sm up. */}
                <div className="flex items-center gap-3 sm:block">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg gradient-200 shadow-lg inset-ring-1 inset-ring-white/25 sm:mb-5">
                    <b.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                  <p className="font-ptsans text-lg font-bold uppercase leading-tight tracking-tight text-dark-blue">
                    {b.title}
                  </p>
                </div>
                <p className="mt-2 text-sm font-light leading-relaxed text-dark-blue/60 sm:mt-3">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
