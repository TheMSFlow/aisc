"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, CalendarDays, Map, Sparkles, Wrench } from "lucide-react";
import Section from "@/components/layout/Section";
import SectionModal from "@/components/coaching/SectionModal";

// The challenge a coaching client receives (VVIP level, delivered privately),
// shown as four cards. Each opens the matching home-page section in a
// full-screen pop-up, rendered from the same component, so the detail is
// always identical to the challenge page and the visitor never leaves.
// Sections load only when first opened. The home-page components are used
// untouched; pop-up adjustments live in ModalSections.jsx.
const CurriculumInModal = dynamic(() =>
  import("@/components/coaching/ModalSections").then((m) => m.CurriculumInModal),
);
const ValueInModal = dynamic(() =>
  import("@/components/coaching/ModalSections").then((m) => m.ValueInModal),
);
const DemoInModal = dynamic(() =>
  import("@/components/coaching/ModalSections").then((m) => m.DemoInModal),
);

const CARDS = [
  {
    id: "days",
    title: "Curriculum",
    icon: CalendarDays,
    summary: "Four live sessions, one-on-one, scheduled around your calendar.",
    render: () => <CurriculumInModal />,
  },
  {
    id: "changes",
    title: "Transformation",
    icon: Sparkles,
    summary: "Four changes you leave with: AI clarity, fluency, value and governance.",
    render: () => <ValueInModal />,
  },
  {
    id: "toolbox",
    title: "Toolbox",
    icon: Wrench,
    summary: "The tools and resources you keep using as you build.",
    render: () => <DemoInModal />,
  },
  {
    id: "roadmap",
    title: "Roadmap",
    // Same icon the Toolbox uses for its Roadmap panel.
    icon: Map,
    summary: "Three phases and how to approach each one, unlocked on Day 6.",
    // Toolbox panel 3 of 4 is the Roadmap.
    render: () => <DemoInModal startPanel={2} />,
  },
];

export default function CoachingChallenge() {
  const [openId, setOpenId] = useState(null);
  const card = CARDS.find((c) => c.id === openId);

  return (
    <div className="bg-white">
      <Section
        id="the-challenge"
        spacing="compact"
        className="scroll-mt-20 overflow-x-clip"
      >
        <div className="max-w-3xl">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
            The private challenge
          </p>
          <h2 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-4xl lg:text-5xl">
            Seven days, four live sessions, and nobody else in the room.
          </h2>
        </div>
        <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-dark-blue/65">
          Coaching opens with the AI Stakeholder Challenge at its highest tier,
          delivered privately. It is the same program public cohorts take, with
          every VIP inclusion, and nobody sets the pace but you.
        </p>

        <div className="relative mt-10">
          <div className="pointer-events-none absolute -top-16 right-[8%] h-80 w-140 bg-[radial-gradient(ellipse_at_center,rgba(99,104,218,0.16),transparent_60%)]" />
          <div className="pointer-events-none absolute -bottom-20 left-[4%] h-72 w-120 bg-[radial-gradient(ellipse_at_center,rgba(135,5,113,0.09),transparent_60%)]" />

          <ul className="relative grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {CARDS.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(c.id)}
                  aria-haspopup="dialog"
                  className="group flex h-full w-full flex-col rounded-2xl border border-white/60 bg-white/55 p-4 text-left shadow-[0_1px_2px_rgba(0,3,76,0.06),0_8px_24px_rgba(0,3,76,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(0,3,76,0.08),0_16px_40px_rgba(0,3,76,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msaccent sm:rounded-3xl sm:p-7"
                >
                  {/* Same icon tile as the Toolbox and the Rhythm cards */}
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg gradient-200 shadow-lg inset-ring-1 inset-ring-white/25 sm:mb-5">
                    <c.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                  <span className="font-ptsans text-base font-bold uppercase leading-tight tracking-tight text-dark-blue sm:text-xl">
                    {c.title}
                  </span>
                  <span className="mt-2 text-xs font-light leading-relaxed text-dark-blue/60 sm:mt-3 sm:text-sm">
                    {c.summary}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-msblue sm:pt-6 sm:text-sm">
                    View
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <SectionModal
        open={Boolean(card)}
        onClose={() => setOpenId(null)}
        label={card?.title ?? ""}
      >
        {card?.render()}
      </SectionModal>
    </div>
  );
}
