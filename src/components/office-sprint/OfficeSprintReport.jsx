"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Section from "@/components/layout/Section";
import Button from "@/components/global/Button";
import {
  OFFICE_SPRINT_REQUEST_LABEL as REQUEST_LABEL,
  OFFICE_SPRINT_REQUEST_URL as REQUEST_URL,
} from "@/lib/officeSprint";
import {
  DATA_STATUS,
  QUADRANTS,
  SAMPLE_DATA,
  SAMPLE_MOVES,
  SAMPLE_ORG,
  SAMPLE_PARTICIPATION,
  SAMPLE_PROBLEMS,
  SAMPLE_READINESS,
  SAMPLE_RULES,
  SAMPLE_TASKS,
  SAMPLE_TOP_TASKS,
} from "@/lib/officeSprintSample";

// "Your report": show, not tell (founder, 2026-11-22). The report presented as
// an organization would see it, in one window with its pages as tabs (after
// Stripe's product sections), for a fictional company. The numbers live in
// lib/officeSprintSample.js.


const teamName = (key) => SAMPLE_ORG.teams.find((t) => t.key === key)?.name || key;
const pct = (n, d) => Math.round((n / d) * 100);

// ── Report page frame ─────────────────────────

// The window draws the frame, the page name and its source; a page only
// draws its chart.
function Page({ children }) {
  return <div className="h-full">{children}</div>;
}

function Legend({ items }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
      {items.map((q) => (
        <li key={q.key} className="flex items-center gap-1.5 text-xs text-dark-blue/70">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: q.color }} aria-hidden="true" />
          {q.label}
        </li>
      ))}
    </ul>
  );
}

// ── The pages ─────────────────────────────────

const SOFT = "bg-[#f4f5ff]";

function Caption({ children }) {
  return <p className="text-xs font-semibold text-dark-blue/55">{children}</p>;
}

// A ring of segments with a 2px gap between them, drawn in SVG.
function Donut({ parts, size = 168, stroke = 22, children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const total = parts.reduce((n, p) => n + p.value, 0);
  const starts = parts.map((_, i) =>
    parts.slice(0, i).reduce((n, p) => n + (p.value / total) * c, 0),
  );
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        {parts.map((p, i) => {
          const len = (p.value / total) * c;
          return (
            <circle
              key={p.key}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={p.color}
              strokeWidth={stroke}
              strokeDasharray={`${Math.max(len - 2, 0)} ${c}`}
              strokeDashoffset={-starts[i]}
            >
              <title>{`${p.label}: ${p.value}`}</title>
            </circle>
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

function AtAGlance() {
  const tasks = SAMPLE_TASKS.reduce((n, t) => n + t.automate + t.augment + t.streamline + t.own, 0);
  const aiTasks = SAMPLE_TASKS.reduce((n, t) => n + t.automate + t.augment, 0);
  const start = SAMPLE_READINESS.areas.find((a) => a.tag === "Start here");
  const top = SAMPLE_PROBLEMS[0];
  const { registered, finished } = SAMPLE_PARTICIPATION;
  const tiles = [
    { value: `${pct(aiTasks, tasks)}%`, label: "of their tasks they would hand to AI" },
    { value: `${SAMPLE_DATA.nobodyOwns}`, label: "data sets nobody answers for" },
    { value: `${top.chosen} of ${finished[2]}`, label: "want the same problem solved first" },
  ];
  return (
    <Page>
      <div className="flex h-full flex-col gap-4">
        <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          {/* The company and who joined */}
          <div className={`rounded-2xl ${SOFT} p-4`}>
            <Caption>About {SAMPLE_ORG.name}</Caption>
            <p className="mt-1.5 text-sm leading-relaxed text-dark-blue/75">{SAMPLE_ORG.about}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
              {SAMPLE_ORG.teams.map((t) => (
                <div key={t.key}>
                  <div className="flex gap-1" aria-hidden="true">
                    {Array.from({ length: t.people }).map((_, i) => (
                      <span key={i} className="h-3 w-3 rounded-full bg-msaccent" />
                    ))}
                  </div>
                  <p className="mt-1.5 text-[11px] text-dark-blue/60">
                    {t.name} · {t.people}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Who finished each sprint */}
          <div className={`flex flex-col rounded-2xl ${SOFT} p-4`}>
            <Caption>Finished each sprint&rsquo;s task</Caption>
            <div className="mt-3 grid flex-1 grid-cols-3 items-end gap-3" role="img" aria-label={finished.map((n, i) => `Sprint ${i + 1}: ${n} of ${registered}`).join(", ")}>
              {finished.map((n, i) => (
                <div key={i} className="flex h-full flex-col justify-end">
                  <p className="font-ptsans text-xl font-bold tabular-nums leading-none">
                    {n}
                    <span className="text-xs font-normal text-dark-blue/40"> /{registered}</span>
                  </p>
                  <div className="mt-1.5 flex h-24 items-end rounded-t-md bg-white">
                    <div className="w-full rounded-t-md bg-msblue" style={{ height: `${(n / registered) * 100}%` }} />
                  </div>
                  <p className="mt-1.5 text-[11px] text-dark-blue/55">Sprint {i + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-2xl border border-dark-blue/8 p-3.5">
              <p className="font-ptsans text-3xl font-bold leading-none tracking-tight">{t.value}</p>
              <p className="mt-1.5 text-xs leading-snug text-dark-blue/60">{t.label}</p>
            </div>
          ))}
          <div className="flex flex-col rounded-2xl bg-msblue p-3.5 text-white">
            <p className="font-ptsans text-lg font-bold uppercase leading-tight tracking-tight">
              {start.name}
            </p>
            <p className="mt-1.5 text-xs text-lilac">is where to start</p>
          </div>
        </div>
      </div>
    </Page>
  );
}

function WhereAiFits() {
  const totals = QUADRANTS.map((q) => ({
    key: q.key,
    label: q.label,
    color: q.color,
    value: SAMPLE_TASKS.reduce((n, t) => n + t[q.key], 0),
  }));
  const all = totals.reduce((n, p) => n + p.value, 0);
  const toAi = totals[0].value + totals[1].value;
  return (
    <Page>
      <div className="flex h-full flex-col">
        <Legend items={QUADRANTS} />
        <div className="mt-5 flex flex-1 flex-col items-center gap-6 sm:flex-row sm:items-center">
          <Donut parts={totals}>
            <p className="font-ptsans text-3xl font-bold leading-none">{pct(toAi, all)}%</p>
            <p className="mt-1 max-w-20 text-[11px] leading-tight text-dark-blue/55">
              of {all} tasks they would hand to AI
            </p>
          </Donut>
          <ul className="flex w-full flex-1 flex-col gap-4">
            {SAMPLE_TASKS.map((t) => {
              const total = t.automate + t.augment + t.streamline + t.own;
              return (
                <li key={t.team}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm font-semibold">{teamName(t.team)}</p>
                    <p className="shrink-0 text-xs text-dark-blue/50">
                      {pct(t.automate + t.augment, total)}% to AI
                    </p>
                  </div>
                  <div className="mt-1.5 flex h-7 gap-[2px] overflow-hidden rounded-md" role="img" aria-label={`${teamName(t.team)}: ${QUADRANTS.map((q) => `${t[q.key]} ${q.label}`).join(", ")}`}>
                    {QUADRANTS.map((q) => (
                      <div
                        key={q.key}
                        title={`${q.label}: ${t[q.key]} tasks`}
                        className="flex items-center justify-center text-[11px] font-semibold text-white"
                        style={{ width: `${(t[q.key] / total) * 100}%`, background: q.color }}
                      >
                        {t[q.key]}
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-dark-blue/8 pt-3">
          <span className="text-xs text-dark-blue/55">Most often placed in Automate:</span>
          {SAMPLE_TOP_TASKS.map((t) => (
            <span key={t} className="rounded-full bg-[#e6f4ec] px-2.5 py-1 text-[11px] font-medium text-[#1d6b3f]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Page>
  );
}

// Six areas on a hexagon: the shape shows where the organization is strong
// and where it is thin. The ranked list beside it carries the numbers.
function Radar({ areas, outOf }) {
  const W = 420, H = 290, cx = W / 2, cy = H / 2, R = 108;
  const at = (i, v) => {
    const a = ((i * 60 - 90) * Math.PI) / 180;
    return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v];
  };
  const ring = (v) => areas.map((_, i) => at(i, v).join(",")).join(" ");
  const shape = areas.map((a, i) => at(i, a.score / outOf).join(",")).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[28rem]" role="img" aria-label={areas.map((a) => `${a.name} ${a.score} of ${outOf}`).join(", ")}>
      {[0.25, 0.5, 0.75, 1].map((v) => (
        <polygon key={v} points={ring(v)} fill="none" stroke="#00034c" strokeOpacity="0.08" />
      ))}
      {areas.map((_, i) => {
        const [x, y] = at(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#00034c" strokeOpacity="0.08" />;
      })}
      <polygon points={shape} fill="#6368da" fillOpacity="0.18" stroke="#6368da" strokeWidth="2" strokeLinejoin="round" />
      {areas.map((a, i) => {
        const [x, y] = at(i, a.score / outOf);
        const start = a.tag === "Start here";
        return <circle key={a.name} cx={x} cy={y} r={start ? 5 : 4} fill={start ? "#00034c" : "#6368da"} stroke="white" strokeWidth="2" />;
      })}
      {areas.map((a, i) => {
        const [x, y] = at(i, 1.12);
        const cos = Math.cos(((i * 60 - 90) * Math.PI) / 180);
        const anchor = Math.abs(cos) < 0.1 ? "middle" : cos > 0 ? "start" : "end";
        return (
          <text key={a.name} x={x} y={y} textAnchor={anchor} dominantBaseline="middle" fontSize="11" fill="#00034c" fillOpacity={a.tag === "Start here" ? 1 : 0.6} fontWeight={a.tag === "Start here" ? 700 : 400}>
            {a.name}
          </text>
        );
      })}
    </svg>
  );
}

function Readiness() {
  const { areas, outOf } = SAMPLE_READINESS;
  // The hexagon reads clockwise in a fixed order, strongest to weakest is
  // the list's job.
  const ring = ["Strategy", "Data Governance", "Processes", "Talent", "Collaboration", "Impact Evaluation"]
    .map((n) => areas.find((a) => a.name === n));
  return (
    <Page>
      <div className="grid h-full items-center gap-6 md:grid-cols-[1.1fr_1fr]">
        {/* Too small to read on phones; the list carries the numbers there */}
        <div className="hidden justify-center sm:flex">
          <Radar areas={ring} outOf={outOf} />
        </div>
        <ol className="flex flex-col gap-3">
          {areas.map((a, i) => (
            <li key={a.name} className="grid grid-cols-[1.25rem_1fr_auto] items-center gap-x-3">
              <span className="text-[11px] font-semibold tabular-nums text-dark-blue/40">{i + 1}</span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">{a.name}</p>
                  {a.tag && (
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${a.tag === "Start here" ? "bg-msblue text-white" : "bg-lilac text-msblue"}`}>
                      {a.tag}
                    </span>
                  )}
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-lilac" title={`${a.name}: ${a.score} of ${outOf}`}>
                  <div className="h-full rounded-full bg-msaccent" style={{ width: `${(a.score / outOf) * 100}%` }} />
                </div>
              </div>
              <p className="font-ptsans text-lg font-bold tabular-nums">
                {a.score}
                <span className="text-xs font-normal text-dark-blue/40"> /{outOf}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Page>
  );
}

// Every data set as one square, coloured by how ready it is; a hollow centre
// marks a set nobody answers for.
function YourData() {
  const { sets, status, keptIn, nobodyOwnsByStatus } = SAMPLE_DATA;
  const max = Math.max(...keptIn.map((k) => k.sets));
  const cells = DATA_STATUS.flatMap((s) =>
    Array.from({ length: status[s.key] }, (_, i) => ({
      color: s.color,
      label: s.label,
      // the unowned sets sit at the end of their status
      noOwner: i >= status[s.key] - (nobodyOwnsByStatus[s.key] || 0),
    })),
  );
  return (
    <Page>
      <div className="grid h-full items-center gap-6 md:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col">
          <Caption>All {sets} data sets, by how ready they are for AI</Caption>
          <div className="mt-3 grid max-w-[25rem] grid-cols-8 gap-2" role="img" aria-label={`${DATA_STATUS.map((s) => `${status[s.key]} ${s.label}`).join(", ")}; ${SAMPLE_DATA.nobodyOwns} with nobody answering for them`}>
            {cells.map((c, i) => (
              <span key={i} title={`${c.label}${c.noOwner ? ", nobody answers for it" : ""}`} className="relative aspect-square rounded-[5px]" style={{ background: c.color }}>
                {c.noOwner && <span className="absolute inset-[30%] rounded-full bg-white" />}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <Legend items={DATA_STATUS} />
            <span className="flex items-center gap-1.5 text-xs text-dark-blue/70">
              <span className="relative h-2.5 w-2.5 rounded-sm bg-dark-blue/40" aria-hidden="true">
                <span className="absolute inset-[28%] rounded-full bg-white" />
              </span>
              Nobody answers for it
            </span>
          </div>
        </div>
        <div>
          <Caption>Where it is kept</Caption>
          <ul className="mt-3 space-y-3">
            {keptIn.map((k) => (
              <li key={k.place} className="grid grid-cols-[8.5rem_1fr_1.5rem] items-center gap-3 text-xs">
                <span className="text-dark-blue/75">{k.place}</span>
                <span className="h-2.5 overflow-hidden rounded-full bg-lilac" title={`${k.place}: ${k.sets} sets`}>
                  <span className="block h-full rounded-full bg-msaccent" style={{ width: `${(k.sets / max) * 100}%` }} />
                </span>
                <span className="text-right font-semibold tabular-nums">{k.sets}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  );
}

// Two plain counts per problem, each with its own bar and words, so nobody
// has to decode "named" and "chose".
function WhereValueIs() {
  const of = SAMPLE_PARTICIPATION.finished[2];
  return (
    <Page>
      <div className="flex h-full flex-col">
        <div className="hidden grid-cols-[1fr_9rem_9rem] gap-4 border-b border-dark-blue/8 pb-2 text-[11px] font-semibold text-dark-blue/50 sm:grid">
          <span>What slows the work down</span>
          <span>Named it as a problem</span>
          <span>Want it solved first</span>
        </div>
        <ul className="flex flex-1 flex-col justify-center divide-y divide-dark-blue/6">
          {SAMPLE_PROBLEMS.map((p, i) => (
            <li key={p.theme} className="grid grid-cols-2 gap-x-4 gap-y-1.5 py-2.5 sm:grid-cols-[1fr_9rem_9rem] sm:items-center">
              <p className="col-span-2 flex items-center gap-2 text-sm font-semibold sm:col-span-1">
                {p.theme}
                {i === 0 && (
                  <span className="rounded-full bg-msblue px-2 py-0.5 text-[10px] font-semibold text-white">Top pick</span>
                )}
              </p>
              <div title={`${p.named} of ${of} named it`}>
                <p className="text-xs text-dark-blue/70">
                  <span className="font-semibold tabular-nums text-dark-blue">{p.named}</span>
                  <span className="sm:hidden"> named it</span>
                  <span className="hidden sm:inline"> of {of}</span>
                </p>
                <div className="mt-1 h-1.5 rounded-full bg-[#eef0fb]">
                  <div className="h-full rounded-full bg-[#9da1ea]" style={{ width: `${(p.named / of) * 100}%` }} />
                </div>
              </div>
              <div title={`${p.chosen} of ${of} want it solved first`}>
                <p className="text-xs text-dark-blue/70">
                  <span className="font-semibold tabular-nums text-dark-blue">{p.chosen}</span>
                  <span className="sm:hidden"> want it first</span>
                  <span className="hidden sm:inline"> of {of}</span>
                </p>
                <div className="mt-1 h-1.5 rounded-full bg-[#eef0fb]">
                  <div className="h-full rounded-full bg-msblue" style={{ width: `${(p.chosen / of) * 100}%` }} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}

function TheirRules() {
  const { submitted, rules } = SAMPLE_RULES;
  const people = SAMPLE_PARTICIPATION.registered;
  return (
    <Page>
      <div className="grid h-full items-center gap-6 md:grid-cols-[auto_1fr]">
        <div className="flex flex-row items-center gap-4 md:flex-col md:text-center">
          <Donut
            size={132}
            stroke={16}
            parts={[
              { key: "wrote", label: "Wrote a policy", value: submitted, color: "#6368da" },
              { key: "not", label: "Did not", value: people - submitted, color: "#e4e5f7" },
            ]}
          >
            <p className="font-ptsans text-2xl font-bold leading-none">
              {submitted}
              <span className="text-sm font-normal text-dark-blue/40">/{people}</span>
            </p>
          </Donut>
          <p className="max-w-36 text-xs leading-snug text-dark-blue/60">
            wrote their own AI policy in Sprint 3
          </p>
        </div>
        <ul className="flex flex-col gap-3.5">
          {rules.map((r) => {
            const share = pct(r.people, submitted);
            const split = share < 50;
            return (
              <li key={r.rule}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold">{r.rule}</p>
                  <p className="shrink-0 font-ptsans text-lg font-bold tabular-nums">{share}%</p>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-lilac" title={`${r.people} of ${submitted}`}>
                  <div className={`h-full rounded-full ${split ? "bg-[#c98a12]" : "bg-msaccent"}`} style={{ width: `${share}%` }} />
                </div>
                {split && (
                  <p className="mt-1 text-xs font-medium text-[#8a5a00]">Split: worth settling together.</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Page>
  );
}

// The three moves toward a first pilot, in order. No calendar: how long the
// training takes depends on the organization (founder, 2026-11-22).
function WhatItMeans() {
  return (
    <Page>
      <div className="flex h-full flex-col justify-center">
        <ol className="flex flex-col gap-3">
          {SAMPLE_MOVES.map((m, i) => (
            <li key={m.title} className={`flex gap-3.5 rounded-2xl ${SOFT} p-4 sm:p-5`}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-msblue font-ptsans text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <p className="font-ptsans text-base font-bold uppercase leading-tight tracking-tight">{m.title}</p>
                <p className="mt-1 max-w-2xl text-xs leading-relaxed text-dark-blue/65 sm:text-sm">{m.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Page>
  );
}

// ── The report, presented as the organization sees it ──

const PANELS = [
  {
    id: "glance",
    name: "At a glance",
    source: "All three sprints",
    finding: "All 16 took part. 14 finished all three sprints.",
    page: <AtAGlance />,
  },
  {
    id: "fits",
    name: "Where AI fits",
    source: "Sprint 1 · 112 tasks",
    finding: "Your people would hand half the work they listed to AI.",
    page: <WhereAiFits />,
  },
  {
    id: "readiness",
    name: "Readiness",
    source: "Sprint 2 · average of 15",
    finding: "Your people work well together. Your data is where to start.",
    page: <Readiness />,
  },
  {
    id: "data",
    name: "Your data",
    source: "Sprint 2 · 31 sets",
    finding: "9 of 31 data sets have nobody answering for them.",
    page: <YourData />,
  },
  {
    id: "value",
    name: "Where value is",
    source: "Sprint 3 · themes",
    finding: "9 people named re-typing WhatsApp orders. 5 want it solved first.",
    page: <WhereValueIs />,
  },
  {
    id: "rules",
    name: "Governance",
    source: "Sprint 3 · 14 policies",
    finding: "13 of 14 already keep the rule that matters most.",
    page: <TheirRules />,
  },
  {
    id: "means",
    name: "What it means",
    source: "The advisory call",
    finding: "Three moves before your first pilot.",
    page: <WhatItMeans />,
  },
];

export default function OfficeSprintReport() {
  const [active, setActive] = useState(0);
  const tabs = useRef(null);
  const panel = PANELS[active];

  // Keep the chosen tab in view on phones, where the tabs scroll sideways.
  useEffect(() => {
    const tab = tabs.current?.querySelector(`[data-tab="${active}"]`);
    const row = tabs.current;
    if (tab && row.scrollWidth > row.clientWidth) {
      const left =
        tab.getBoundingClientRect().left - row.getBoundingClientRect().left + row.scrollLeft - 8;
      row.scrollTo({ left, behavior: "smooth" });
    }
  }, [active]);

  const go = (i) => setActive(Math.max(0, Math.min(PANELS.length - 1, i)));
  const onKey = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") go(active + 1);
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(active - 1);
  };

  return (
    <section id="your-report" className="relative scroll-mt-20 overflow-hidden bg-dark-blue text-white">
      <div className="pointer-events-none absolute -top-40 left-[-10%] h-150 w-225 bg-[radial-gradient(ellipse_at_center,rgba(99,104,218,0.22),transparent_60%)]" />
      <div className="pointer-events-none absolute -bottom-40 right-[-10%] h-150 w-225 bg-[radial-gradient(ellipse_at_center,rgba(135,5,113,0.13),transparent_60%)]" />

      <Section spacing="none" className="relative pb-16 pt-16 md:pb-20 md:pt-20">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-lilac/60">
          After the sprint
        </p>
        <h2 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl">
          A full report and advisory on next steps.
        </h2>

        {/* The report window */}
        <div className="mt-10 overflow-hidden rounded-3xl bg-white text-dark-blue shadow-[0_2px_4px_rgba(0,3,76,0.2),0_30px_80px_rgba(0,3,76,0.55)]">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-dark-blue/8 px-5 py-3.5 sm:px-6">
            <p className="text-sm font-semibold">{SAMPLE_ORG.name}</p>
            <p className="text-xs text-dark-blue/45">
              <span className="hidden sm:inline">AI Stakeholder Office Sprint report</span>
            </p>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[13rem_minmax(0,1fr)]">
            {/* Pages: a column on wider screens, a sideways row on phones */}
            <div
              ref={tabs}
              role="tablist"
              aria-label="Report pages"
              onKeyDown={onKey}
              className="flex gap-1 overflow-x-auto border-b border-dark-blue/8 bg-[#f7f7fd] p-2 [scrollbar-width:none] md:flex-col md:overflow-visible md:border-b-0 md:border-r md:p-3 [&::-webkit-scrollbar]:hidden"
            >
              {PANELS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  data-tab={i}
                  id={`report-tab-${p.id}`}
                  aria-selected={i === active}
                  aria-controls="report-page"
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`flex shrink-0 cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msaccent ${
                    i === active
                      ? "bg-white font-semibold text-dark-blue shadow-sm"
                      : "text-dark-blue/55 hover:text-dark-blue"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold tabular-nums ${
                      i === active ? "bg-msblue text-white" : "bg-dark-blue/8 text-dark-blue/50"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {p.name}
                </button>
              ))}
            </div>

            <div
              id="report-page"
              role="tabpanel"
              aria-labelledby={`report-tab-${panel.id}`}
              className="flex flex-col p-5 sm:p-8 md:min-h-[36rem]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dark-blue/40">
                {panel.source}
              </p>
              <p className="mt-2 max-w-2xl font-ptsans text-2xl font-bold uppercase leading-[1.05] tracking-tight sm:text-3xl">
                {panel.finding}
              </p>
              <div key={panel.id} className="mt-6 min-h-0 flex-1">
                {panel.page}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-dark-blue/8 pt-4">
                <span className="text-xs tabular-nums text-dark-blue/40">
                  {active + 1} / {PANELS.length}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(active - 1)}
                    disabled={active === 0}
                    aria-label="Previous page"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-dark-blue/15 text-dark-blue/60 hover:border-dark-blue/40 hover:text-dark-blue disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(active + 1)}
                    disabled={active === PANELS.length - 1}
                    aria-label="Next page"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-dark-blue/15 text-dark-blue/60 hover:border-dark-blue/40 hover:text-dark-blue disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The moment the reader most wants it (founder, 2026-11-22). */}
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <Button href={REQUEST_URL} variant="primary" className="justify-center px-8 py-3 font-semibold">
            {REQUEST_LABEL}
          </Button>
          <p className="text-sm text-white/55">Your own report, from your own people, by Thursday.</p>
        </div>
      </Section>
    </section>
  );
}

// A still first page of the report for the hero, so the promise "by Thursday
// you hold…" has its proof beside it (founder, 2026-11-22). Wider screens
// only; it links down to the full report.
export function ReportPreview() {
  const tasks = SAMPLE_TASKS.reduce((n, t) => n + t.automate + t.augment + t.streamline + t.own, 0);
  const aiTasks = SAMPLE_TASKS.reduce((n, t) => n + t.automate + t.augment, 0);
  const start = SAMPLE_READINESS.areas.find((a) => a.tag === "Start here");
  const { registered, finished } = SAMPLE_PARTICIPATION;
  const totals = QUADRANTS.map((q) => ({
    ...q,
    value: SAMPLE_TASKS.reduce((n, t) => n + t[q.key], 0),
  }));
  return (
    <a
      href="#your-report"
      className="group block w-full max-w-[30rem] focus-visible:outline-none"
      aria-label="Go to the full report"
    >
      <div className="overflow-hidden rounded-2xl bg-white text-dark-blue shadow-[0_2px_4px_rgba(0,3,76,0.25),0_30px_70px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-lilac">
        <div className="flex items-center justify-between border-b border-dark-blue/8 px-4 py-2.5">
          <p className="text-xs font-semibold">{SAMPLE_ORG.name}</p>
          <p className="text-[10px] text-dark-blue/45">AI Stakeholder Office Sprint report</p>
        </div>
        <div className="flex gap-1 border-b border-dark-blue/8 bg-[#f7f7fd] px-3 py-1.5 text-[10px]">
          {["At a glance", "Where AI fits", "Readiness", "Your data"].map((t, i) => (
            <span key={t} className={`rounded-md px-2 py-1 ${i === 0 ? "bg-white font-semibold shadow-sm" : "text-dark-blue/50"}`}>
              {t}
            </span>
          ))}
        </div>
        <div className="p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-dark-blue/40">All three sprints</p>
          <p className="mt-1 font-ptsans text-lg font-bold uppercase leading-tight tracking-tight">
            All 16 took part. 14 finished all three sprints.
          </p>
          <div className="mt-3 grid grid-cols-[1fr_8.5rem] gap-2.5">
            <div className="rounded-xl bg-[#f4f5ff] p-3">
              <p className="text-[10px] font-semibold text-dark-blue/55">Where AI fits · {tasks} tasks</p>
              <div className="mt-2 flex h-4 gap-[2px] overflow-hidden rounded" aria-hidden="true">
                {totals.map((q) => (
                  <span key={q.key} style={{ width: `${(q.value / tasks) * 100}%`, background: q.color }} />
                ))}
              </div>
              <p className="mt-2 font-ptsans text-2xl font-bold leading-none">{pct(aiTasks, tasks)}%</p>
              <p className="mt-0.5 text-[10px] text-dark-blue/55">they would hand to AI</p>
            </div>
            <div className="flex flex-col rounded-xl bg-[#f4f5ff] p-3">
              <p className="text-[10px] font-semibold text-dark-blue/55">Finished</p>
              <div className="mt-2 grid flex-1 grid-cols-3 items-end gap-1.5" aria-hidden="true">
                {finished.map((n, i) => (
                  <div key={i} className="flex h-full flex-col justify-end">
                    <div className="rounded-t bg-msblue" style={{ height: `${(n / registered) * 100}%`, minHeight: 8 }} />
                    <p className="mt-1 text-center text-[9px] text-dark-blue/50">S{i + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-2.5">
            <div className="rounded-xl border border-dark-blue/8 p-2.5">
              <p className="font-ptsans text-xl font-bold leading-none">{SAMPLE_DATA.nobodyOwns}</p>
              <p className="mt-1 text-[10px] leading-snug text-dark-blue/55">data sets nobody answers for</p>
            </div>
            <div className="rounded-xl border border-dark-blue/8 p-2.5">
              <p className="font-ptsans text-xl font-bold leading-none">{SAMPLE_PROBLEMS[0].chosen} of {finished[2]}</p>
              <p className="mt-1 text-[10px] leading-snug text-dark-blue/55">want the same problem solved first</p>
            </div>
            <div className="rounded-xl bg-msblue p-2.5 text-white">
              <p className="font-ptsans text-sm font-bold uppercase leading-tight">{start.name}</p>
              <p className="mt-1 text-[10px] text-lilac">is where to start</p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-white/55 transition-colors group-hover:text-white">
        A report like this, by Thursday. See it in full &darr;
      </p>
    </a>
  );
}
