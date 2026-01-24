import React, { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "What exactly will I leave with after the 3 days?",
    answer:
      "You will leave with a 6-Month AI Stakeholder Roadmap. A clear decision document that guides what you focus on, what you delegate, what you stop doing, and where AI actually fits into your leadership. This is not a certificate or a set of notes. It is a roadmap you can use immediately and reuse every 6 months.",
  },
  {
    question: "Is this a technical course on how to use AI tools?",
    answer:
      "No. This is not a technical or tools-based course. The challenge focuses on leadership judgment, how decisions are made, how work is delegated, and how AI is directed as leverage. You do not need coding skills or technical knowledge to participate.",
  },
  {
    question: "Do I need prior AI experience to follow along?",
    answer:
      "No. This challenge is designed for leaders, not technologists. AI is only treated as leverage. What matters is your experience, your decision authority, and your willingness to think clearly about how you work.",
  },
  {
    question: "I'm already overwhelmed by AI news. Why should I join this?",
    answer:
      "Most AI content adds to the noise. This challenge is designed to reduce it. The focus is not on trends or hype, but on identifying one or two areas where AI can immediately remove friction and reclaim your leadership capacity.",
  },
  {
    question: "What is the daily time commitment?",
    answer:
      "Each live session runs for 60 minutes — 40 minutes of guided teaching and 20 minutes of structured Q&A. Post-session tasks take approximately 60–90 minutes per day and are designed to integrate into your real work, not add busywork. VIP participants get 1 hour of strategic Q&A before the general sessions.",
  },
  {
    question: "What is the quick win? This sounds long-term.",
    answer:
      "Within 3–7 days, most participants identify and redesign one workflow that no longer needs their direct involvement. The immediate win is relief. Fewer decisions chasing you and more space to think clearly. Momentum follows clarity.",
  },
  {
    question: "How is this different from a webinar or YouTube content?",
    answer:
      "A webinar is for consumption. This challenge is for production. By the end of Day 3, you will have completed core work that feeds directly into a personal roadmap. This experience is designed around output, not information.",
  },
  {
    question: "Will my project be reviewed?",
    answer:
      "Submission confirms completion, not validation. Formal feedback is included only for participants with VIP access or participants who pay an extra add-on fee ($100 / N100,000 for Private Briefing and $200 / N200,000 for General Admission). Other participants may opt into structured peer reflection, which is anonymized and focused on sharpening clarity, not judgment.",
  },
  {
    question: "What is peer reflection, and will others critique my work?",
    answer:
      "Peer reflection is optional and anonymized. Participants review up to three submissions using reflective words to improve their own clarity. It is not advice-giving, scoring, or critique.",
  },
  {
    question: "What’s the difference between General Admission and VIP?",
    answer:
      "All participants receive the same core content and assignments. VIP access affords you direct feedback and decision confirmation. VIP is about confidence in direction, not additional material.",
  },
  {
    question: "Who is this challenge best suited for?",
    answer:
      "This challenge is designed for leaders, operators, founders, consultants, and managers with real decision responsibility and over 10 years of work experience. If you influence outcomes and want clarity rather than tools, this is a strong fit.",
  },
  {
    question: "Who should not join this challenge?",
    answer:
      "This is not a fit if you are looking for step-by-step tool tutorials, shortcuts, or passive learning. The challenge rewards focus, honesty, and execution.",
  },
  {
    question: "What happens if I don’t complete the work?",
    answer:
      "The value of the challenge depends on engagement. The structure is designed to support clarity, but it cannot replace commitment. This challenge does not chase participation.",
  },
];

export const Faq = ({ id }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id={id}
      className="bg-white py-24 md:py-32 border-t border-slate-100"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h4 className="font-heading text-lg tracking-[0.3em] text-msblue mb-4 uppercase">
            Clarification
          </h4>
          <h2 className="text-4xl md:text-6xl font-heading text-dark-blue uppercase">
            Frequently Asked{" "}
            <span className="text-gradient-200">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="border border-slate-200 rounded-sm overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full text-left p-6 md:p-8 flex justify-between items-center bg-slate-50 hover:bg-msaccent/20 transition-colors"
              >
                <span className="font-heading md:text-xl text-dark-blue uppercase tracking-relaxed">
                  {item.question}
                </span>
                <span
                  className={`text-2xl text-msblue transition-transform duration-300 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden bg-white`}
              >
                <div className="p-6 md:p-8 text-lg text-slate-600 leading-relaxed border-t border-slate-100">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 bg-dark-blue text-white text-center rounded-sm">
          <p className="text-xl font-light italic mb-6">
            Still have questions?
          </p>
          <a
            href="mailto:sales@michaelsteve.com"
            className="text-msaccent font-bold uppercase tracking-widest hover:underline"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
};
