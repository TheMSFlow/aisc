"use client";

import { useEffect, useState } from "react";
import { Globe2 } from "lucide-react";
import Section from "@/components/layout/Section";
import {
  OFFICE_SPRINT_DAYS as DAYS,
  OFFICE_SPRINT_SLOTS as SLOTS,
} from "@/lib/officeSprint";
import { INTELLIGENCE_API_BASE } from "@/lib/sites";
import { Contours, DEEP_BAND } from "./Backdrops";

// The signature element: the sprint week drawn as it runs. Columns are the
// days, rows are the three slots, and Thursday holds the advisory call.
//
// Visitors outside WAT see each slot in their own time first, with its days as
// they fall there: Slot 1 is Sunday to Tuesday in Los Angeles (founder,
// 2026-11-23: "we have to highlight it properly"). WAT stays beside it. Before
// the browser reports its zone the card shows WAT alone.

function nextMondayAt(utcHour, utcMinute, now = new Date()) {
  const d = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      utcHour,
      utcMinute,
    ),
  );
  const ahead = (1 - d.getUTCDay() + 7) % 7;
  d.setUTCDate(d.getUTCDate() + ahead);
  if (d <= now) d.setUTCDate(d.getUTCDate() + 7);
  return d;
}

const SESSION_MS = 45 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

// "10:15 to 11:00 PM", or "11:30 PM to 12:15 AM" across a change of period.
function timeRange(start, end, zone) {
  const fmt = (d) =>
    new Intl.DateTimeFormat("en-US", {
      timeZone: zone,
      hour: "numeric",
      minute: "2-digit",
    })
      .format(d)
      .replace(/\s/g, " ");
  const a = fmt(start);
  const b = fmt(end);
  return a.slice(-2) === b.slice(-2)
    ? `${a.slice(0, -3)} to ${b}`
    : `${a} to ${b}`;
}

function useLocalSlots() {
  const [local, setLocal] = useState(null);

  useEffect(() => {
    // Read once the browser is ready, so the server's render and the first
    // paint agree (WAT until then).
    const t = setTimeout(() => {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const out = {};
        let differs = false;
        for (const s of SLOTS) {
          const at = nextMondayAt(s.utcHour, s.utcMinute);
          const fmt = (opts, zone, date = at) =>
            new Intl.DateTimeFormat("en-US", {
              timeZone: zone,
              ...opts,
            }).format(date);
          const time = fmt({ hour: "numeric", minute: "2-digit" }, tz);
          const day = fmt({ weekday: "short" }, tz);
          const lastDay = fmt(
            { weekday: "short" },
            tz,
            new Date(at.getTime() + 2 * DAY_MS),
          );
          const wat = fmt(
            { hour: "numeric", minute: "2-digit" },
            "Africa/Lagos",
          );
          if (time !== wat || day !== "Mon") differs = true;
          out[s.key] = {
            range: timeRange(at, new Date(at.getTime() + SESSION_MS), tz),
            days: `${day} to ${lastDay}`,
          };
        }
        const place = tz.split("/").pop().replace(/_/g, " ");
        setLocal(differs ? { place, slots: out } : null);
      } catch {
        setLocal(null);
      }
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return local;
}

// Live places left per upcoming week, from Intelligence (founder approved,
// 2026-11-22). Counts only, never who holds a slot. If the read fails, or
// there is nothing to show, the section renders exactly as before.
// Local reads local, live reads live (founder, 2026-11-22): under npm run dev
// the page asks the Intelligence dev server, wherever NEXT_PUBLIC_API_BASE
// points (the same rule as every link, in lib/sites.js).
const AVAILABILITY_PATH = "/api/office-sprint/availability";

function availabilityUrl() {
  const base = INTELLIGENCE_API_BASE;
  return base ? `${base}${AVAILABILITY_PATH}` : null;
}

function useAvailability() {
  const [weeks, setWeeks] = useState(null);

  useEffect(() => {
    const url = availabilityUrl();
    if (!url) return undefined;
    const ctrl = new AbortController();
    fetch(url, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const list = Array.isArray(data?.weeks)
          ? data.weeks.filter(
              (w) =>
                /^\d{4}-\d{2}-\d{2}$/.test(w?.week) &&
                Number.isInteger(w?.left) &&
                Number.isInteger(w?.total) &&
                Array.isArray(w?.held),
            )
          : [];
        if (list.length) setWeeks(list);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  return weeks;
}

// The sprint days, Monday to Wednesday, so a visitor can check them against
// their calendar (founder, 2026-11-22): "Mon 30 Nov – Wed 2 Dec".
function weekLabel(iso) {
  const fmt = (d) =>
    new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    })
      .format(d)
      .replace(",", "");
  const mon = new Date(`${iso}T00:00:00Z`);
  const wed = new Date(mon);
  wed.setUTCDate(wed.getUTCDate() + 2);
  return `${fmt(mon)} – ${fmt(wed)}`;
}

// Intelligence names the slots with underscores ("evening_1"), this site with
// hyphens ("evening-1").
const apiSlotKey = (key) => key.replace("-", "_");

// Morning or evening, from the slot's hour in WAT (UTC+1).
const partOfDay = (s) => (s.utcHour + 1 < 12 ? "Morning" : "Evening");

// Registration closes at 11:59 PM WAT on the Saturday before the sprint
// (founder, 2026-11-26). The same rule as registrationDeadline() in Intelligence.
function closesLabel(iso) {
  const d = new Date(`${iso}T22:59:00Z`);
  d.setUTCDate(d.getUTCDate() - 2);
  const day = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Africa/Lagos",
  })
    .format(d)
    .replace(",", "");
  return `${day}, 11:59 PM WAT`;
}

function Chevron() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none bg-dark-blue/[0.06] text-dark-blue/60 transition-colors duration-200 group-open:bg-dark-blue group-open:text-white">
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
      >
        <path
          d="M4 6l4 4 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// Below the week card: each upcoming week, opened to show which of its three
// slots are still open (founder, 2026-11-22: one accordion per week, open and
// closed clearly different). Called "slots" throughout the page, never
// "times" or "places", and never "free", which on this page means no cost.
function AvailableTimes({ weeks, local }) {
  if (!weeks) return null;
  return (
    <div className="os-fade-in mt-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-14">
      <div>
        <p className="mb-4 text-[13px] font-semibold tracking-normal text-[#2c37c4]">
          Available slots
        </p>
        <p className="max-w-md text-base font-light leading-relaxed text-dark-blue/60">
          Open a week to see which slots are still open. A slot is held for one
          organization for all three sprints. To claim your slot, registration
          must be complete by 11:59 PM WAT on the Saturday before your sprint.
        </p>
      </div>

      <ul className="space-y-3">
        {weeks.map((w) => {
          const held = new Set(w.held);
          return (
            <li key={w.week}>
              <details className="group rounded-none border border-dark-blue/10 bg-white transition-[border-color,background-color] duration-200 hover:border-dark-blue/25 open:border-dark-blue/60 open:bg-dark-blue/[0.04]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="block text-base text-dark-blue/75 group-open:font-semibold group-open:text-dark-blue">
                      {weekLabel(w.week)}
                    </span>
                    <span className="mt-0.5 block text-xs text-dark-blue/45">
                      {w.left === 0
                        ? "No slots left this week"
                        : `${w.left} of ${w.total} slots open`}
                    </span>
                  </span>
                  <Chevron />
                </summary>

                <div className="mx-5 border-t border-dark-blue/10 pb-5 pt-4">
                  <p className="mb-3 text-xs text-dark-blue/50">
                    Registration deadline: {closesLabel(w.week)}.
                  </p>
                  <ul className="space-y-2">
                    {SLOTS.map((s) => {
                      const taken = held.has(apiSlotKey(s.key));
                      const mine = local?.slots[s.key];
                      return (
                        <li
                          key={s.key}
                          className={
                            taken
                              ? "flex items-center justify-between gap-4 rounded-none border border-dashed border-dark-blue/15 px-4 py-3"
                              : "flex items-center justify-between gap-4 rounded-none border border-dark-blue/10 bg-white px-4 py-3"
                          }
                        >
                          <span
                            className={
                              taken ? "text-dark-blue/35" : "text-dark-blue"
                            }
                          >
                            <span className="block text-sm">
                              {mine ? (
                                <>
                                  <span className="font-semibold">
                                    {mine.range}
                                  </span>
                                  {", "}
                                  {mine.days}
                                </>
                              ) : (
                                <>
                                  <span className="font-semibold">
                                    {partOfDay(s)}
                                  </span>
                                  {" · "}
                                  {s.wat}
                                </>
                              )}
                            </span>
                            <span
                              className={
                                taken
                                  ? "mt-0.5 block text-xs text-dark-blue/30"
                                  : "mt-0.5 block text-xs text-dark-blue/45"
                              }
                            >
                              {mine
                                ? `${s.name}, ${s.wat} WAT`
                                : `${s.name}, Monday to Wednesday`}
                            </span>
                          </span>
                          <span
                            className={
                              taken
                                ? "shrink-0 text-xs text-dark-blue/35"
                                : "shrink-0 rounded-none bg-dark-blue px-3 py-1 text-xs font-semibold text-white"
                            }
                          >
                            {taken ? "Taken" : "Available"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </details>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SessionCell({ sprint }) {
  return (
    <div className="flex h-full min-h-14 items-center rounded-none border border-white/10 bg-white/[0.06] px-4">
      <span className="text-sm text-white/80">Sprint {sprint} · 45 min</span>
    </div>
  );
}

export default function OfficeSprintWeek() {
  const local = useLocalSlots();
  const availability = useAvailability();

  return (
    <div className="bg-white">
      <Section id="the-week" spacing="compact" className="scroll-mt-20">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-[13px] font-semibold tracking-normal text-[#2c37c4]">
            The schedule
          </p>
          <h2 className="os-serif text-3xl font-medium leading-[1.05] tracking-[-0.01em] text-dark-blue sm:text-4xl lg:text-5xl">
            One time slot is yours, Monday to Wednesday.
          </h2>
          <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-dark-blue/60">
            {local
              ? "The sprints run outside normal working hours in West Africa. "
              : "The sprints run outside normal working hours, so your business doesn\u2019t stop. "}
            Each slot belongs to one organization for the week, so there are
            only three slots a week.
            {!local && " All times are West Africa Time (WAT)."}
          </p>
          {local && (
            <p className="mt-5 inline-flex items-center gap-2.5 rounded-none bg-[#e6e8ef] px-4 py-2 text-sm font-semibold text-dark-blue">
              <Globe2
                className="h-4 w-4 shrink-0 text-msblue"
                aria-hidden="true"
              />
              Showing your time in {local.place}
            </p>
          )}
        </div>

        <div
          className={`relative overflow-hidden ${DEEP_BAND} p-6 text-white sm:p-8 lg:p-10`}
        >
          {/* Softened so the lines sit behind the copy (founder, 2026-11-27:
              "too strong… competing with the copy"). Not both: no glass
              on the cards as well (founder, same day). */}
          <Contours className="opacity-40" />

          {/* Desktop and tablet: the week as a grid */}
          <div className="relative hidden md:block">
            <div className="grid grid-cols-[10rem_repeat(3,minmax(0,1fr))_minmax(0,1.15fr)] gap-3">
              <div />
              {DAYS.map((d) => (
                <div key={d.day} className="pb-3">
                  <p className="os-serif text-lg font-medium tracking-[-0.01em]">
                    {d.day}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-lilac/70">
                    {d.short}
                  </p>
                </div>
              ))}
              <div className="pb-3">
                <p className="os-serif text-lg font-medium tracking-[-0.01em]">
                  Thursday
                </p>
                <p className="mt-1 text-xs leading-snug text-lilac/70">
                  Your leadership
                </p>
              </div>

              {/* The slots down the side; each sprint once per day, since an
                  organization has one slot (founder, 2026-11-22). */}
              {SLOTS.map((s, i) => (
                <div key={s.key} className="contents">
                  <div className="flex flex-col justify-center py-3 pr-2">
                    {local ? (
                      <>
                        <p className="text-sm font-semibold text-white">
                          {local.slots[s.key].range}
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-lilac">
                          {local.slots[s.key].days}, your time
                        </p>
                        <p className="mt-1 text-[11px] leading-snug text-white/45">
                          {s.name}, {s.wat} WAT
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-white">
                          {s.wat}
                        </p>
                        <p className="mt-0.5 text-xs text-white/45">{s.name}</p>
                      </>
                    )}
                  </div>
                  {i === 0 && (
                    <>
                      {DAYS.map((d) => (
                        <div
                          key={d.day}
                          data-motion
                          style={{ "--os-delay": `${(d.sprint - 1) * 110}ms` }}
                          className="row-span-3 flex flex-col justify-center rounded-none border border-white/10 bg-white/[0.06] px-5"
                        >
                          <p className="os-serif text-2xl font-medium tracking-[-0.01em] text-white">
                            Sprint {d.sprint}
                          </p>
                          <p className="mt-1 text-sm text-white/70">
                            Live, 45 min
                          </p>
                        </div>
                      ))}
                      <div
                        data-motion
                        style={{ "--os-delay": "330ms" }}
                        className="row-span-3 flex flex-col justify-center rounded-none border border-lilac/25 bg-lilac/[0.08] p-5"
                      >
                        <p className="os-serif text-base font-medium tracking-[-0.01em] text-white">
                          Advisory call
                        </p>
                        <p className="mt-2 text-sm font-light leading-relaxed text-white/70">
                          Thirty minutes with your leadership: we share your
                          report and what it means for your organization.
                        </p>
                        <p className="mt-3 text-xs text-white/50">
                          The time is arranged with you.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {/* the team's task after each sprint */}
              <div className="flex items-center pr-2 pt-2">
                <p className="text-xs text-white/45">After sprint</p>
              </div>
              {DAYS.map((d) => (
                <p
                  key={d.day}
                  className="pt-2 text-xs leading-snug text-white/60"
                >
                  <span className="font-semibold text-white/85">
                    Your team&rsquo;s task · {d.taskMinutes} min
                  </span>
                </p>
              ))}
              <div />
            </div>
          </div>

          {/* Phones: the week as a list */}
          <div className="relative md:hidden">
            <p className="text-[13px] font-semibold tracking-normal text-white/40">
              Your slot, one of three
            </p>
            <ul className="mt-3 space-y-2">
              {SLOTS.map((s) => (
                <li
                  key={s.key}
                  className="flex items-baseline justify-between gap-3 rounded-none border border-white/10 bg-white/[0.06] px-4 py-3"
                >
                  {local ? (
                    <>
                      <span>
                        <span className="block text-sm font-semibold">
                          {local.slots[s.key].range}
                        </span>
                        <span className="mt-0.5 block text-xs font-medium text-lilac">
                          {local.slots[s.key].days}, your time
                        </span>
                      </span>
                      <span className="text-right text-xs leading-snug text-white/45">
                        {s.name}
                        <br />
                        {s.wat} WAT
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-semibold">{s.wat}</span>
                      <span className="text-right text-xs text-white/45">
                        {s.name}
                      </span>
                    </>
                  )}
                </li>
              ))}
            </ul>

            <ol className="mt-6 space-y-5 border-l border-white/15 pl-5">
              {DAYS.map((d) => (
                <li key={d.day}>
                  <p className="os-serif text-base font-medium tracking-[-0.01em]">
                    {d.day}
                  </p>
                  <p className="text-sm text-lilac/75">{d.short}</p>
                  <p className="mt-1 text-xs text-white/55">
                    Sprint {d.sprint}, live, 45 min. Then your team&rsquo;s
                    task, {d.taskMinutes} min.
                  </p>
                </li>
              ))}
              <li>
                <p className="os-serif text-base font-medium tracking-[-0.01em]">
                  Thursday
                </p>
                <p className="text-sm text-lilac/75">
                  Advisory call with your leadership
                </p>
                <p className="mt-1 text-xs text-white/55">
                  Thirty minutes: we share your report and what it means for
                  your organization. The time is arranged with you.
                </p>
              </li>
            </ol>
          </div>
        </div>

        <AvailableTimes weeks={availability} local={local} />
      </Section>
    </div>
  );
}
