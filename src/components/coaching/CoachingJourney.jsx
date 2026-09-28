import Section from "@/components/layout/Section";

const STEPS = [
  {
    n: "01",
    title: "The discovery call",
    body: "Fifteen minutes to confirm coaching fits where you are and what you lead. No preparation needed.",
  },
  {
    n: "02",
    title: "Your private challenge",
    body: "The full AI Stakeholder Challenge, delivered to you alone at VVIP level: all four live sessions one-on-one, your territory declared, your Roadmap unlocked. Included at no additional fee.",
    link: { href: "#the-challenge", label: "See curriculum" },
  },
  {
    n: "03",
    title: "Coaching begins",
    body: "There is no intake to wait for. When your private challenge ends, your first coaching session is the next Saturday.",
  },
  {
    n: "04",
    title: "The Roadmap, guided",
    body: "Three times a month, your facilitator takes you through the Roadmap's three phases: Clarity & Labs, Implementation & Relationships, then Governance & Mandate.",
    link: { href: "#the-roadmap", label: "View roadmap" },
  },
];

export default function CoachingJourney() {
  return (
    <div className="bg-linear-to-b from-offwhite to-white">
      <Section id="how-it-runs" spacing="compact">
        {/* The hero already makes the promise; this section only labels
            the steps, so the label is the heading. */}
        <h2>
          {/* span: the global h2 font rule is unlayered and beats utilities */}
          <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
            The process
          </span>
        </h2>

        {/* Phones: number beside the title to keep four steps compact. */}
        <ol className="mt-8 grid gap-7 sm:mt-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="grid grid-cols-[auto_1fr] gap-x-4 border-t-2 border-dark-blue/10 pt-5 sm:block sm:pt-6"
            >
              <p className="row-span-3 font-ptsans text-3xl font-bold leading-none text-msaccent sm:text-4xl">
                {s.n}
              </p>
              <h3 className="mt-1 font-ptsans text-lg font-bold uppercase tracking-tight text-dark-blue sm:mt-4">
                {s.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-dark-blue/65">
                {s.body}
              </p>
              {s.link && (
                <a
                  href={s.link.href}
                  className="mt-3 justify-self-start sm:mt-4 inline-block text-sm font-medium text-msblue underline decoration-msaccent/40 underline-offset-4 transition-colors hover:decoration-msblue"
                >
                  {s.link.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
