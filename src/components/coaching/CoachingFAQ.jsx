import Section from "@/components/layout/Section";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { SessionTime } from "@/components/coaching/useSessionTime";

const QUESTIONS = [
  {
    q: "Is coaching one-on-one?",
    a: "The challenge that opens it is. You take the full AI Stakeholder Challenge privately, at VVIP level, with direct facilitator access for all seven days. The coaching that follows is a group. Your questions and your situation still get direct attention, alongside leaders working through the same phases of their own Roadmaps.",
  },
  {
    q: "Do I need any AI experience?",
    a: "No. Your private challenge opens with AI Clarity on Day 1, built to work from any starting point. You do not need to have used AI tools or formed a view on AI. Coaching builds your fluency from wherever the challenge leaves you.",
  },
  {
    q: "When do the sessions run?",
    a: (
      <>
        Three Saturdays a month at <SessionTime />, live, 2 hours each.
        There is no session in the fourth week.
      </>
    ),
  },
  {
    q: "Where do the sessions happen?",
    a: "Live and online, so you join from wherever you are.",
  },
  {
    q: "What if I miss a Saturday?",
    a: "Every session is recorded, so you still have the whole conversation. Between sessions you have a direct line to your facilitator and the private group channel.",
  },
  {
    q: "When can I start?",
    a: "Whenever you are ready. There is no intake to wait for. After the discovery call, your private challenge is scheduled around your calendar, and when it ends you join the next coaching Saturday.",
  },
  {
    q: "What is the difference between the plans?",
    a: "Only the length of your commitment and what you pay. Every plan includes the private challenge, the live sessions, direct facilitator access, recordings, the group channel and AI Labs for as long as you are in coaching. Six months takes you through one full Roadmap. A year gives you a steadier pace through it, for leaders whose calendar will not fit it into six months.",
  },
  {
    q: "I have already done the challenge. Can I join?",
    a: "Yes, on the same plans and at the same prices. Coaching picks up from the Roadmap you already have, and the discovery call covers where you start.",
  },
];

export default function CoachingFAQ() {
  return (
    <div className="bg-white">
      <Section id="faq" spacing="compact" width="narrow" className="scroll-mt-20">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
          Questions
        </p>
        <h2 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-4xl">
          Before you book the call.
        </h2>
        <FAQAccordion items={QUESTIONS} />
      </Section>
    </div>
  );
}
