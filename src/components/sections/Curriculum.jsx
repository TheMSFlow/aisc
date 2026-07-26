import Section from "@/components/layout/Section";

const DAYS = [
  {
    day: "Day 0",
    name: "Pre-Challenge Setup",
    subtitle: null,
    type: "self-paced",
    duration: null,
    description:
      "Get access to the AISC Learning Center, finish onboarding, and prepare for Day 1.",
    output: null,
    vipNote: null,
    milestone: false,
  },
  {
    day: "Day 1",
    name: "AI Clarity",
    subtitle: "Mindset, Meaning & Mechanics",
    type: "live",
    duration: "2 hrs",
    description:
      "You build an honest, unbiased picture of what AI actually is, not a summary from someone with something to sell. You learn what AI Fluency actually requires at your level, and leave with Michael Steve's Delegation Matrix: a new framework for deciding what to delegate and what to keep.",
    output: null,
    vipNote: null,
    milestone: false,
  },
  {
    day: "Day 2",
    name: "AI Labs",
    subtitle: "Margins",
    type: "live",
    duration: "2 hrs",
    description:
      "You stop wondering and start experiencing. Live demos on real leadership problems show what AI can actually do.  See exactly how much time can be reclaimed, then put it to work yourself, using AI directly on a real task.",
    output: null,
    vipNote: null,
    milestone: false,
  },
  {
    day: "Day 3",
    name: "AI Value",
    subtitle: "Money",
    type: "live",
    duration: "2 hrs",
    description:
      "You stop applying AI everywhere and start seeing where it actually moves the needle in your ecosystem. Map the real value, then declare the specific territory you will own. So AI becomes a strategic and profitable choice, not a trend you're chasing.",
    output: null,
    vipNote: null,
    milestone: true,
  },
  {
    day: "Days 4–5",
    name: "Milestone Review",
    subtitle: null,
    type: "self-paced",
    duration: null,
    description:
      "You check your thinking against peers working through the same challenge. VIP and VVIP receive direct strategic facilitator feedback on their milestone task. So you move into the second half knowing your foundations are solid.",
    output: null,
    vipNote: "Day 5: 1-hour live Q&A with facilitator",
    milestone: false,
  },
  {
    day: "Day 6",
    name: "6-Month Roadmap",
    subtitle: null,
    type: "self-paced",
    duration: null,
    description:
      "Your 6-Month AI Stakeholder Roadmap is unlocked with an instructional video guide. It turns the territory you declared on Day 3 into a 180-day plan across three phases, built around your specific capability gaps, the people you need in your corner, and the standards you set for how you'll use AI.",
    output: null,
    vipNote: "2-hour Roadmap deep dive + follow-up Q&A",
    milestone: false,
  },
  {
    day: "Day 7",
    name: "AI Governance",
    subtitle: "Ethics & Mandate",
    type: "live",
    duration: "2 hrs",
    description:
      "You close with the question most people avoid: what does it mean to lead responsibly in an AI environment? AI Governance, ethics, and the mandate of your position. You leave not just informed, but positioned.",
    output: null,
    vipNote: null,
    milestone: false,
  },
];

export default function Curriculum() {
  return (
    <div className="bg-dark-blue text-white">
      <Section id="curriculum" spacing="loose">
        <div className="mb-12">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
            The 7 Days
          </p>
          <h2 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-white sm:text-4xl lg:text-5xl">
            Four live sessions.
            <br />
            Seven days of decisions.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/45">
            Each day builds on the last. Every assignment produces something
            you keep. No passive content. Only work that moves you forward.
          </p>
        </div>

        <div className="border-t border-white/10">
          {DAYS.map((d, i) => (
            <div
              key={i}
              className={`grid gap-3 border-b py-6 lg:grid-cols-[160px_1fr_120px] lg:gap-8 ${
                d.milestone
                  ? "border-white/15 bg-white/4"
                  : "border-white/8"
              }`}
            >
              {/* Day + live badge */}
              <div className="flex flex-row items-start gap-3 lg:flex-col lg:gap-3 lg:pt-0.5">
                <span
                  className={`font-ptsans text-sm font-bold uppercase tracking-wider ${
                    d.milestone ? "text-white" : "text-white/50"
                  }`}
                >
                  {d.day}
                </span>
                {d.type === "live" ? (
                  <span className="inline-flex items-center gap-1.5 border border-warning/35 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-warning">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-warning" />
                    Live
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 border border-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-white/40">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/30" />
                    Self-paced
                  </span>
                )}
                {d.milestone && (
                  <span className="inline-flex items-center gap-1.5 border border-msaccent/35 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-msaccent/70">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-msaccent/50" />
                    Milestone Task
                  </span>
                )}
              </div>

              {/* Content */}
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3
                    className={`font-ptsans text-lg font-bold uppercase tracking-tight ${
                      d.milestone ? "text-white" : "text-white/90"
                    }`}
                  >
                    {d.name}
                  </h3>
                  {d.subtitle && (
                    <span className="text-xs text-white/30">{d.subtitle}</span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/45">
                  {d.description}
                </p>
                {d.output && (
                  <p className="mt-3 text-xs text-white/35">
                    <span className="font-semibold uppercase tracking-wider text-white/25">
                      Produces:{" "}
                    </span>
                    {d.output}
                  </p>
                )}
                {d.vipNote && (
                  <p className="mt-2 text-xs text-msaccent/60">
                    <span className="font-semibold uppercase tracking-wider">
                      VIP:{" "}
                    </span>
                    {d.vipNote}
                  </p>
                )}
              </div>

              {/* Duration */}
              <div className="hidden text-right lg:block">
                {d.duration && (
                  <span className="text-xs uppercase tracking-[0.15em] text-white/25">
                    {d.duration}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-warning" />
            <span className="text-xs text-white/35">Live session</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-msaccent/50">VIP</span>
            <span className="text-xs text-white/35">Additional access for VIP &amp; VVIP</span>
          </div>
        </div>
      </Section>
    </div>
  );
}
