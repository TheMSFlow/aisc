import Section from "@/components/layout/Section";
import Button from "@/components/global/Button";
import CurrencyPrice from "@/components/global/CurrencyPrice";
import {
  COACHING_CALL_NOTE,
  COACHING_CALL_URL,
  COACHING_PLANS,
  COACHING_SESSION,
  perMonth,
} from "@/lib/coaching";

// Plan-specific lines. Everything else is identical across plans.
const PLAN_COPY = {
  month: {
    term: "Month to month",
    line: "Paid a month at a time. The same program, at the highest cost over time.",
  },
  sixMonths: {
    term: "One full Roadmap",
    line: "Coached through all three phases of your 6-Month Roadmap, start to finish.",
  },
  year: {
    term: "A steadier pace",
    line: "Twelve months to work through the Roadmap with room to breathe. For leaders whose calendar will not fit it into six.",
  },
};

const ANCHOR = "sixMonths";

const INCLUDED = [
  "The AI Stakeholder Challenge, delivered privately at VVIP level",
  "Direct facilitator access for all seven challenge days",
  "The Toolbox, with its guides and tools",
  "The 6-Month Roadmap: three phases and how to approach each one",
  "Certificate of Declaration",
  `${COACHING_SESSION.perMonth} live ${COACHING_SESSION.day} sessions a month, ${COACHING_SESSION.hours} hours each`,
  "Direct messages with your facilitator",
  "Recordings of every session",
  "The private coaching group channel",
  "AI Labs for as long as you are in coaching",
];

export default function CoachingPlans() {
  return (
    <div className="bg-linear-to-b from-offwhite to-white">
      <Section id="plans" spacing="compact" className="scroll-mt-20 overflow-x-clip">
        <div>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
            Plans
          </p>
          <h2 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-4xl lg:text-5xl">
            Choose your plan
          </h2>
        </div>

        <div className="relative mt-12">
          <div className="pointer-events-none absolute -top-28 right-[10%] h-95 w-145 bg-[radial-gradient(ellipse_at_center,rgba(99,104,218,0.16),transparent_60%)]" />
          <div className="pointer-events-none absolute -bottom-24 left-[2%] h-80 w-120 bg-[radial-gradient(ellipse_at_center,rgba(135,5,113,0.09),transparent_60%)]" />

          <div className="relative grid gap-6 lg:grid-cols-3">
            {COACHING_PLANS.map((p) => {
              const dark = p.id === ANCHOR;
              const copy = PLAN_COPY[p.id];
              return (
                <div
                  key={p.id}
                  className={`relative flex flex-col overflow-hidden rounded-3xl p-8 lg:p-10 ${
                    dark
                      ? "bg-dark-blue text-white shadow-[0_2px_4px_rgba(0,3,76,0.15),0_16px_40px_rgba(0,3,76,0.25)]"
                      : "border border-white/60 bg-white/60 text-dark-blue shadow-[0_1px_2px_rgba(0,3,76,0.06),0_8px_24px_rgba(0,3,76,0.08)] backdrop-blur-xl"
                  }`}
                >
                  {dark && (
                    <>
                      <div className="pointer-events-none absolute -top-24 -right-20 h-80 w-110 bg-[radial-gradient(ellipse_at_center,rgba(99,104,218,0.28),transparent_60%)]" />
                      <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-100 bg-[radial-gradient(ellipse_at_center,rgba(135,5,113,0.15),transparent_60%)]" />
                    </>
                  )}

                  <div className="relative flex flex-1 flex-col">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-ptsans text-xl font-bold uppercase tracking-tight">
                        {p.period}
                      </h3>
                      {p.note && (
                        <span
                          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${
                            dark
                              ? "border-white/20 text-white/60"
                              : "border-dark-blue/15 text-dark-blue/55"
                          }`}
                        >
                          {p.note}
                        </span>
                      )}
                    </div>

                    <CurrencyPrice
                      {...p.price}
                      className="mt-6 block font-ptsans text-5xl font-bold leading-none"
                    />
                    <p
                      className={`mt-2 text-sm ${
                        dark ? "text-white/50" : "text-dark-blue/50"
                      }`}
                    >
                      {p.months > 1 ? (
                        <>
                          About <CurrencyPrice {...perMonth(p)} /> a month
                        </>
                      ) : (
                        "Per month"
                      )}
                    </p>

                    <div
                      className={`mt-8 border-t pt-6 ${
                        dark ? "border-white/10" : "border-dark-blue/10"
                      }`}
                    >
                      <p className="font-ptsans text-base font-bold uppercase tracking-tight">
                        {copy.term}
                      </p>
                      <p
                        className={`mt-2 text-sm font-light leading-relaxed ${
                          dark ? "text-white/60" : "text-dark-blue/60"
                        }`}
                      >
                        {copy.line}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* One CTA for all three plans: the plan is settled on the call. */}
        <div className="mt-10 flex flex-col items-center">
          <Button
            href={COACHING_CALL_URL}
            variant="dark"
            className="px-8 py-3 font-semibold"
          >
            Start with Coaching
          </Button>
          <p className="mt-4 text-center text-xs text-dark-blue/45">
            {COACHING_CALL_NOTE}
          </p>
        </div>

        <div className="mt-16 rounded-3xl bg-msaccent/10 p-8 lg:p-10">
          <h3 className="font-ptsans text-xl font-bold uppercase tracking-tight text-dark-blue">
            In every plan
          </h3>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-dark-blue/70"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-msaccent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}
