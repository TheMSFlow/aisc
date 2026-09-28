import Section from "@/components/layout/Section";
import FAQAccordion from "@/components/ui/FAQAccordion";

const QUESTIONS = [
  {
    q: "What do I actually leave with after 7 days?",
    a: "Four things change, and you leave with something to show for each one. AI Clarity: an honest picture of what AI means for your world, which you build yourself on Day 1. AI Fluency: you know how to direct AI and what to hand over to it, and the Margin Calculator shows how many hours a week you get back. AI Value: one specific problem or opportunity in your world where AI can pay off, found with the Territory Builder and declared on Day 3. AI Governance: your own written rules for how you use AI, and the mandate to set them for the people you lead. The 6-Month AI Stakeholder Roadmap, unlocked on Day 6, turns all of this into a plan for the next 180 days: the gaps you need to close, the relationships you need to build, and the standards you will hold yourself to. You keep your Toolbox in your challenger profile. AI Labs, a platform where your AI fluency keeps growing, is free after the challenge ends: one month with General Admission, three months with VIP, and six months with VVIP. You receive a Certificate of Declaration on Day 7.",
  },
  {
    q: "Do I need to know anything about AI before I join?",
    a: "No. Day 1 is specifically designed to work regardless of your current level of AI familiarity. You do not need to have used any AI tools, formed an opinion about AI, or read anything about it in advance. AI Clarity is the first thing the challenge produces. You show up as you are. The challenge meets you there.",
  },
  {
    q: "What is the daily time commitment?",
    a: "The four live sessions run 2 hours each. Day 7's session includes a live Q&A within that time. Between sessions, post-session assignments are designed around your actual work situation, not case studies, and take roughly 60 to 90 minutes of focused effort per day. There is no passive content to watch. The challenge is structured around decision-making and real output, not screen time.",
  },
  {
    q: "Is this only for corporate executives?",
    a: "No. The three audiences are defined by what you hold: responsibility, influence, and access to resources. Not by your job title or industry. Previous participants include business founders, senior pastors, content creators, politicians, and organizational department heads. If you lead people and are accountable for direction, this challenge is built for you.",
  },
  {
    q: "What happens after the 7 days?",
    a: "You leave with the 6-Month AI Stakeholder Roadmap, which turns the territory you declared on Day 3 into a 180-day plan across three phases: proving you can execute, applying your leverage and building key relationships, then extending your authority. It names your capability gaps and sets the personal standards you'll hold yourself to as you go. It is designed to be reused every 6 months. Your Toolbox access remains in your challenger profile. AI Labs, a dedicated platform where your AI fluency keeps developing as you execute the roadmap, is included free after the challenge ends: one month with General Admission, three months with VIP, and six months with VVIP. For leaders who want guided execution through that roadmap, the AI Stakeholder Coaching Program provides live group coaching three Saturdays a month.",
  },
  {
    q: "Is Coaching separate from the challenge?",
    a: "Yes, and it includes the challenge at no additional fee. The AI Stakeholder Coaching Program is a separate engagement for leaders who want a facilitator alongside them through the 6-Month Roadmap. It opens with the challenge delivered to you privately, one-on-one, at VVIP level. Then you join live group sessions three Saturdays a month at 7PM WAT, where your questions and your situation get direct attention alongside leaders working through the same phases. Coaching is not a cheaper entry point into the challenge. It is the full program, delivered privately, plus months of guided execution. If you already know you want ongoing support, starting with Coaching is the more complete path.",
  },
  {
    q: "What makes this different from an AI course or webinar?",
    a: "AISC is not a course and not a webinar. There are no passive videos to watch at your own pace and quietly forget. Every live session builds on the last. Every assignment produces an output you keep. The Delegation Tool, the Margin Calculator, and the Territory Builder are tools you use on your own real situation, not case studies you observe. By Day 3, you have made three real decisions. A webinar gives you information. AISC gives you a decision.",
  },
  {
    q: "How many people are in each cohort?",
    a: "General Admission is open to the full cohort. VIP is capped at 10 seats. This is a real constraint, not manufactured scarcity. The limit exists because facilitator feedback at the milestone stage requires a manageable group. VVIP is delivered privately, one-on-one. Coaching runs as facilitated group sessions three Saturdays a month.",
  },
  {
    q: "Who should not join this challenge?",
    a: "This challenge is not a fit if you are looking for tool tutorials, step-by-step AI instructions, or passive content to consume at your own pace. It is also not a shortcut. The territory you declare on Day 3 requires judgment, leadership, and real commitment over the six months that follow. The challenge rewards focus, honesty, and execution. It does not chase participation.",
  },
  {
    q: "What happens if I don't complete the work?",
    a: "The value of the challenge depends on engagement. The structure is designed to support clarity, but it cannot replace commitment. This challenge does not chase participation.",
  },
];

export default function FAQ() {
  return (
    <div className="bg-offwhite">
      <Section id="faq" spacing="compact">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
          Still curious?
        </p>
        <h2 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-4xl lg:text-5xl">
          Frequently Asked Questions.
        </h2>

        <FAQAccordion items={QUESTIONS} />

        <div className="mt-10 border border-dark-blue/10 p-6">
          <p className="text-sm text-dark-blue/55">
            Still have a question?{" "}
            <a
              href="https://intelligence.michaelsteve.com/form/inquiry?src=AISC"
              className="text-msblue underline underline-offset-2 transition-colors hover:text-dark-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact us directly.
            </a>
          </p>
        </div>
      </Section>
    </div>
  );
}
