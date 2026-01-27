import React from "react";
import { useOpenCohort } from "@/hooks/useOpenCohort";
import { CohortDateBlock } from "./CohortDateBlock";

const DAYS = [
  {
    day: 1,
    title: "Mindset, Meaning & Mechanics",
    subtitle: "Responsibility Before Tools",
    content:
      "You’ll reframe what AI actually is without jargon, and clarify what has changed, what hasn't, and what leadership now requires.",
    outcome: "AI clarity and leadership mandate for your next phase.",
  },
  {
    day: 2,
    title: "Margins",
    subtitle: "Reclaiming Leadership Capacity",
    content:
      "You’ll identify one workflow that drains your attention but does not require your judgment, and redesign it.",
    outcome: "Real, immediate relief. More time for leadership activities.",
  },
  {
    day: 3,
    title: "The Mandate & The Money",
    subtitle: "Focus and Ownership",
    content:
      "You’ll identify where value actually exists in your industry and choose where you will focus, instead of chasing everything.",
    outcome: "A clear territory you are willing to claim.",
  },
];

export const Experience: React.FC<{ id: string }> = ({ id }) => {

  const { cohort, loading } = useOpenCohort("aisc");

  return (
    <section id={id} className="bg-msblue py-24 md:py-32 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-24">
          <h2 className="font-heading text-4xl md:text-6xl mb-12 uppercase tracking-tighter">
            The Experience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Format */}
            <div className="bg-white/5 border border-white/10 p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">🧭</span>
                <h3 className="font-heading text-xl uppercase tracking-widest">
                  Format
                </h3>
              </div>

              <ul className="space-y-4 text-lg font-light opacity-80">
                <li>Live sessions online</li>
                <li>Structured Q&A</li>
                <li>Daily Assignments</li>
              </ul>
            </div>

            {/* Time */}
            <div className="bg-white/5 border border-white/10 p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">⏱️</span>
                <h3 className="font-heading text-xl uppercase tracking-widest">
                  Date
                </h3>
              </div>

              <CohortDateBlock cohort={cohort} loading={loading} />
            </div>

            {/* Effort */}
            <div className="bg-white/5 border border-white/10 p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">🧠</span>
                <h3 className="font-heading text-xl uppercase tracking-widest">
                  Effort
                </h3>
              </div>

              <ul className="space-y-4 text-lg font-light opacity-80">
                <li>60 min uninterrupted focus</li>
                <li>60–90 min post-session work</li>
                <li>2-3 days post challenge project</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {DAYS.map((d, i) => (
            <div
              key={i}
              className="group relative bg-white/5 border border-white/10 p-6 md:p-12 hover:bg-white/10 transition-all rounded-sm overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                <span className="text-8xl md:text-[10rem] font-heading font-bold opacity-5 group-hover:opacity-10 transition-opacity">
                  0{d.day}
                </span>
              </div>

              <div className="relative z-10 max-w-3xl">
                <p className="text-warning font-heading text-2xl mb-2 uppercase tracking-widest">
                  Day {d.day}
                </p>
                <h3 className="text-3xl md:text-5xl font-heading mb-4 uppercase">
                  {d.title}
                </h3>
                <h4 className="text-xl md:text-2xl text-msaccent font-light italic mb-8">
                  {d.subtitle}
                </h4>
                <p className="text-lg md:text-xl opacity-70 mb-8 leading-relaxed">
                  {d.content}
                </p>

                <div className="inline-block py-3 px-6 bg-warning text-white font-bold uppercase tracking-widest text-sm">
                  Outcome: {d.outcome}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
