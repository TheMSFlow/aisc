import Section from "@/components/layout/Section";
import { COACHING_SESSION } from "@/lib/coaching";

// The Roadmap's three phases overlap by design (AISC_BRIEF, "The Three
// Phases"). Drawn to scale on a 180-day axis.
const PHASES = [
  {
    name: "Clarity & Labs",
    start: 1,
    end: 60,
    focus: "Direction is locked, assumptions are tested, the foundation is built.",
  },
  {
    name: "Implementation & Relationships",
    start: 31,
    end: 120,
    focus: "Leverage is applied at scale, your first AI agent is piloted, relationships are built deliberately.",
  },
  {
    name: "Governance & Mandate",
    start: 91,
    end: 180,
    focus: "Authority is proven through results, and your mandate extends outward through mentoring.",
  },
];

// The Roadmap's own review cadence. Labels anchor so they stay in the card.
const REVIEWS = [
  { day: 30, align: "-translate-x-1/2" },
  { day: 90, align: "-translate-x-1/2" },
  { day: 180, align: "-translate-x-full" },
];

// Three sessions in each four-week month, six months long.
const SESSIONS = Array.from({ length: 6 }, (_, m) =>
  [0, 1, 2].map((w) => m * 30 + w * 7.5 + 3.75),
).flat();

const pct = (day) => `${(day / 180) * 100}%`;

// The tick axis and review guides only read at tablet width and up. On a
// phone they collapse into one plain sentence under the phases.
export default function CoachingTrack() {
  return (
    <div className="bg-white">
      <Section id="the-roadmap" spacing="compact" className="scroll-mt-20">
        <div className="relative overflow-hidden rounded-3xl bg-dark-blue p-6 text-white shadow-[0_2px_4px_rgba(0,3,76,0.15),0_16px_40px_rgba(0,3,76,0.25)] sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -top-32 -left-20 h-100 w-160 bg-[radial-gradient(ellipse_at_center,rgba(99,104,218,0.26),transparent_60%)]" />
          <div className="pointer-events-none absolute -bottom-40 right-0 h-100 w-140 bg-[radial-gradient(ellipse_at_center,rgba(135,5,113,0.14),transparent_60%)]" />

          <div className="relative">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 className="font-ptsans text-2xl font-bold uppercase leading-none tracking-tight sm:text-3xl">
                Three phases. A facilitator in every one.
              </h2>
              <p className="text-sm text-white/45">
                Phases overlap. Progress matters more than the calendar.
              </p>
            </div>

            <div className="relative mt-10 flex flex-col gap-8">
              {REVIEWS.map((r) => (
                <span
                  key={r.day}
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-2 -bottom-2 hidden border-l border-dashed border-white/10 md:block"
                  style={{ left: pct(r.day) }}
                />
              ))}
              {PHASES.map((p, i) => (
                <div key={p.name} className="relative">
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
                    <p className="font-ptsans text-lg font-bold uppercase leading-tight tracking-tight">
                      <span className="block text-sm text-white/40 md:mr-3 md:inline md:text-lg md:text-white/35">
                        Phase {i + 1}
                      </span>
                      {p.name}
                    </p>
                    <p className="text-xs tabular-nums text-white/45">
                      Days {p.start}–{p.end}
                    </p>
                  </div>
                  <div className="relative mt-3 h-3 rounded-full bg-white/6">
                    <div
                      className="absolute inset-y-0 rounded-full bg-msaccent"
                      style={{
                        left: pct(p.start - 1),
                        width: pct(p.end - p.start + 1),
                      }}
                    />
                  </div>
                  <p className="mt-2 max-w-xl text-sm font-light leading-relaxed text-white/55">
                    {p.focus}
                  </p>
                </div>
              ))}
            </div>

            {/* phone: plain summary */}
            <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/55 md:hidden">
              {COACHING_SESSION.perMonth} live coaching Saturdays a month,
              eighteen in six months. Reviews at day 30, 90 and 180.
            </p>

            {/* tablet and up: session ticks + review markers on the axis */}
            <div className="mt-10 hidden border-t border-white/10 pt-6 md:block">
              <div className="relative h-10">
                {SESSIONS.map((d) => (
                  <span
                    key={d}
                    className="absolute top-0 h-4 w-0.75 -translate-x-1/2 rounded-full bg-lilac/70"
                    style={{ left: pct(d) }}
                  />
                ))}
                {REVIEWS.map((r) => (
                  <span
                    key={r.day}
                    className={`absolute top-6 whitespace-nowrap text-[11px] tabular-nums text-white/45 ${r.align}`}
                    style={{ left: pct(r.day) }}
                  >
                    Day {r.day} review
                  </span>
                ))}
              </div>
              <p className="mt-3 flex items-center gap-2 text-xs text-white/45">
                <span className="inline-block h-3 w-0.75 rounded-full bg-lilac/70" />
                Each mark is a live coaching Saturday. Eighteen in six months.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
