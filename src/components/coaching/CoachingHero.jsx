import Section from "@/components/layout/Section";
import Button from "@/components/global/Button";
import {
  COACHING_CALL_NOTE,
  COACHING_CALL_URL,
  COACHING_FACTS as FACTS,
} from "@/lib/coaching";

// FACTS: the at-a-glance strip directly under the header (see lib/coaching).

export default function CoachingHero() {
  return (
    <div className="relative overflow-hidden bg-dark-blue text-white">
      {/* aurora */}
      <div className="pointer-events-none absolute -top-40 left-[-10%] h-150 w-225 bg-[radial-gradient(ellipse_at_center,rgba(99,104,218,0.2),transparent_60%)]" />
      <div className="pointer-events-none absolute -top-32 right-[-15%] h-130 w-190 bg-[radial-gradient(ellipse_at_center,rgba(135,5,113,0.13),transparent_60%)]" />

      {/* facts strip */}
      <div className="relative border-b border-white/8 bg-white/[0.03] px-5 sm:px-6 lg:px-8">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-white/10">
          {FACTS.map((f) => (
            <div
              key={f.label}
              className="flex min-w-0 flex-col gap-0.5 px-3 py-4 first:pl-0 last:pr-0 sm:px-6 md:flex-row md:items-baseline md:gap-2 md:py-5"
            >
              <dt className="sr-only">{`${f.value} ${f.label}`}</dt>
              <dd className="font-ptsans text-lg font-bold leading-tight text-white sm:text-xl">
                {f.value}
              </dd>
              <dd className="text-xs text-white/55 sm:text-sm">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Section spacing="none" className="relative pt-12 pb-12 md:pt-16 md:pb-16">
        <div className="max-w-4xl">
          <h1 className="font-ptsans text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-7xl">
            Find where AI pays off in the world you lead.
            <span className="mt-2 block text-lilac">
              Then build it with a coach.
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-white/65 sm:text-lg">
            {/* Written for a visitor who has never heard of the challenge:
                what this is, who it is for, and how the two parts connect. */}
            AI Stakeholder Coaching is live group coaching for leaders. It
            starts with the AI Stakeholder Challenge: seven days, delivered to
            you privately, where you get clear on AI and choose the one place
            it can make the biggest difference in your world. Then, three times
            a month, a facilitator helps you turn that into results.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              href={COACHING_CALL_URL}
              variant="primary"
              className="justify-center px-7 py-3 font-semibold"
            >
              Start with Coaching
            </Button>
            <Button
              href="#plans"
              variant="secondary"
              className="justify-center px-7 py-3"
            >
              See the plans
            </Button>
          </div>
          <p className="mt-4 text-xs text-white/40">{COACHING_CALL_NOTE}</p>
        </div>
      </Section>
    </div>
  );
}
