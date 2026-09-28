import Section from "@/components/layout/Section";

const VALUES = [
  {
    number: "01",
    name: "AI Clarity",
    tag: "An honest, unbiased picture of what AI actually is",
    body: "Many leaders have heard about AI from everyone with something to sell or something to prove. What very few have had is an honest, unbiased picture of what AI actually is. That is what this challenge produces.",
    accent:
      "You cannot give clarity you don't have. The moment a leader has a clear, honest view of AI, the questions stop feeling threatening and become an opportunity for a great conversation. The people around them stop looking elsewhere for answers.",
  },
  {
    number: "02",
    name: "AI Fluency",
    tag: "Interacting with AI effectively, efficiently, ethically, and safely",
    body: "Fluency is knowing how to work with AI as a leader. That means directing it, delegating to it, and knowing where it does not belong. The first thing fluency returns to a leader is time: real hours, on paper, that were being lost to work AI can handle. Most leaders find the number larger than they expected.",
    accent:
      "The leaders who are fluent in AI become the voice their world turns to. The people they lead start coming to them for direction, not just information.",
  },
  {
    number: "03",
    name: "AI Value",
    tag: "Profit and growth from AI, in the specific domain you lead",
    body: "Every leader sits on top of problems their world has accepted as normal. Bottlenecks that have gone unsolved because no one had the tools or the clarity to solve them. AI changes that. This challenge gives you the framework to identify which of those problems is yours to lead, or which new opportunity AI has made possible that no one has discovered yet. You leave with this discovery and a roadmap to help you get there.",
    accent:
      "For leaders with responsibility, influence and resources, exploiting AI Value is a rewarding experience. It's no more about how much you know, but how much you can leverage from the access you get in the AI stakeholder ecosystem. ",
  },
  {
    number: "04",
    name: "AI Governance",
    tag: "The mandate to decide how AI operates in the world you lead",
    body: "Once AI is at work in your world, someone has to set the rules: what it is trusted with, what information it sees, what gets disclosed, and where it is never allowed to go. Most organizations leave that to chance, or to whoever adopted the tool first. This challenge gives you the standards to govern it yourself, starting with your own use of AI, and a mandate you can extend to the people you lead.",
    accent:
      "Anyone can use AI. A stakeholder decides how it is used. The leader who sets clear standards early becomes the one their world trusts when the harder questions arrive.",
  },
];

export default function Value() {
  return (
    <Section id="value" spacing="compact">
      <div className="border-b border-dark-blue/10 pb-12">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
          What you leave with
        </p>
        <h2 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-4xl lg:text-5xl">
          Transformation,
          <br />
          from AI consumer to AI leader.
        </h2>
      </div>

      {VALUES.map((v) => (
        <div
          key={v.number}
          className="grid gap-6 border-b border-dark-blue/10 py-10 lg:grid-cols-[100px_1fr] lg:gap-10"
        >
          <div className="hidden lg:block">
            <span className="font-ptsans text-7xl font-bold leading-none text-dark-blue/8 select-none">
              {v.number}
            </span>
          </div>
          <div>
            <div className="flex flex-col gap-1 md:flex-row sm:items-baseline lg:gap-5">
              <h3 className="font-ptsans text-2xl font-bold uppercase tracking-tight text-dark-blue sm:text-3xl">
                {v.name}
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-dark-blue/35">
                {v.tag}
              </span>
            </div>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-dark-blue/60">
              {v.body}
            </p>
            {v.accent && (
              <p className="mt-5 max-w-2xl border-l-2 border-warning/40 pl-5 text-sm italic leading-relaxed text-dark-blue/75">
                {v.accent}
              </p>
            )}
          </div>
        </div>
      ))}
    </Section>
  );
}
