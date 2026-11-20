import Section from "@/components/layout/Section";
import Button from "@/components/global/Button";
import GuideMeButton from "@/components/personalize/GuideMeButton";

const AUDIENCES = [
  {
    tier: "Chief",
    qualifier: "Responsibility · Influence · Resources",
    who: "You are ready to get hands-on, beyond the tools, in how AI is understood, adopted and governed in the world you lead. Your market, congregation, constituency or following trusts you and acts on your word. You have the resources and the partnerships to take whatever you start to any scale. What you need is a clear position on AI and the mandate to lead your people through it safely, into prosperity.",
    cta: { label: "Go All In with Coaching", href: "/coaching" },
    dark: true,
    accent: false,
  },
  {
    tier: "Leader of Leaders",
    qualifier: "Responsibility · Influence · Access to resources",
    who: "You are accountable in both directions. Above you, someone expects results. Below you, a team or a department looks to you for direction, often already using AI without structure from you. The problems on your desk are specific and need answers now. Taken privately, the challenge is fitted to your calendar and your situation, so you leave with a position you can defend upward and a framework for how AI is used below you.",
    cta: { label: "Secure 1:1 Access", href: "/clarity-call" },
    dark: false,
    accent: true,
  },
  {
    tier: "Emerging Leader",
    qualifier: "Responsibility · Building toward influence",
    who: "You are ambitious, and this challenge is your move. You do the work, and you often see what others above you are missing about AI. AISC teaches you to speak the language of senior leadership on AI, and gives you the foundation to grow your influence fast, long before anyone hands you the title.",
    cta: { label: "Join the Next Cohort", href: "#pricing" },
    dark: false,
    accent: false,
  },
];

export default function Audience() {
  return (
    <div className="bg-offwhite">
      <Section id="audience" spacing="compact" className="overflow-x-clip">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
          This challenge is for
        </p>
        <h2 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-4xl lg:text-5xl">
          Leaders with responsibility,
          <br />
          influence, and access to resources.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-dark-blue/55">
          Responsibility means you have initiative and accountability. Influence
          means you have people who listen to you. Resources — or access to
          them, directly or indirectly — means you have the wherewithal to act
          on the highest level of value this challenge provides.
        </p>

        <div className="relative mt-12">
          {/* ambient color for the glass to refract */}
          <div className="pointer-events-none absolute -top-24 left-1/4 h-95 w-145 bg-[radial-gradient(ellipse_at_center,rgba(99,104,218,0.22),transparent_30%)]" />
          <div className="pointer-events-none absolute -bottom-20 right-[5%] h-80 w-120 bg-[radial-gradient(ellipse_at_center,rgba(135,5,113,0.12),transparent_30%)]" />

          <div className="relative grid gap-6 lg:grid-cols-3">
          {AUDIENCES.map((a) => (
            <div
              key={a.tier}
              className={`relative flex flex-col gap-7 overflow-hidden rounded-3xl p-8 transition-shadow duration-300 lg:p-10 ${
                a.dark
                  ? "bg-dark-blue shadow-[0_2px_4px_rgba(0,3,76,0.15),0_16px_40px_rgba(0,3,76,0.25)]"
                  : a.accent
                    ? "border border-white/60 bg-lilac/40 shadow-[0_1px_2px_rgba(0,3,76,0.06),0_8px_24px_rgba(0,3,76,0.08)] backdrop-blur-xl"
                    : "border border-white/60 bg-white/55 shadow-[0_1px_2px_rgba(0,3,76,0.06),0_8px_24px_rgba(0,3,76,0.08)] backdrop-blur-xl"
              }`}
            >
              {a.dark && (
                <div className="pointer-events-none absolute -top-20 -right-16 h-72 w-96 bg-[radial-gradient(ellipse_at_center,rgba(99,104,218,0.3),transparent_60%)]" />
              )}
              <div className="relative">
                <p
                  className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${
                    a.dark ? "text-white/35" : "text-dark-blue/35"
                  }`}
                >
                  {a.qualifier}
                </p>
                <h3
                  className={`mt-3 font-ptsans text-2xl font-bold uppercase tracking-tight ${
                    a.dark ? "text-white" : "text-dark-blue"
                  }`}
                >
                  {a.tier}
                </h3>
              </div>

              <p
                className={`relative text-sm leading-relaxed ${
                  a.dark ? "text-white/55" : "text-dark-blue/55"
                }`}
              >
                {a.who}
              </p>

              <Button
                href={a.cta.href}
                variant={a.dark ? "secondary" : "secondary-light"}
                className="relative mt-auto w-full justify-center py-3 font-semibold"
              >
                {a.cta.label}
              </Button>
            </div>
          ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-5 text-center">
          <GuideMeButton variant="premium" className="px-8 py-3 w-full" />
          <p className="max-w-md text-xs leading-relaxed text-dark-blue/55">
            Not sure which seat is yours? Answer a few questions and we will
            point you to the right path.
          </p>
        </div>
      </Section>
    </div>
  );
}
