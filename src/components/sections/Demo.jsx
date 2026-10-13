"use client";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Blocks,
  Bot,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Download,
  FolderKanban,
  Gauge,
  ListChecks,
  Lock,
  Map,
  Maximize2,
  Scale,
  ScrollText,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";

const PANELS = [
  {
    id: "guides",
    name: "Guides, Frameworks & Templates",
    body: "Not everything lands fully in a live session. The guides let you revisit each session at your own pace and go deeper. As you execute your roadmap, you'll return to the frameworks and templates again and again. And when your team needs direction, you'll have something concrete to point them to.",
    type: "docs",
    docs: [
      { name: "Task Delegation Guide", icon: ClipboardCheck },
      { name: "AI Readiness Guide", icon: Gauge },
      { name: "AI Value Map", icon: Map },
      { name: "The Mandate & Ethics Guide", icon: Scale },
      { name: "My Personal AI Policy", icon: ScrollText },
      { name: "AI Safety Guidelines", icon: ShieldCheck },
    ],
  },
  {
    id: "mini-apps",
    name: "Mini Apps",
    body: "The Delegation Tool sorts your tasks into what needs your judgement, what AI can handle, and where you work together. The Readiness Scorecard shows how ready you are, one dimension at a time. The Territory Builder finds the problem in your ecosystem you are best placed to solve. The Margin Calculator shows how much time AI is saving you, so you can decide where to reinvest it.",
    type: "apps",
  },
  {
    id: "roadmap",
    name: "Roadmap",
    body: "The 6-Month AI Stakeholder Roadmap moves you through three phases: proving you can execute, building leverage and allies, then extending your authority. Along the way it names your capability gaps, maps who you need in your corner, and sets the personal standards you'll hold yourself to.",
    type: "roadmap",
    phases: [
      {
        num: "01",
        days: "Days 1–60",
        name: "Clarity & Labs",
        line: "Direction locked, assumptions tested, momentum built.",
      },
      {
        num: "02",
        days: "Days 31–120",
        name: "Implementation & Relationships",
        line: "Leverage applied, value exchanged, position emerging.",
      },
      {
        num: "03",
        days: "Days 91–180",
        name: "Governance & Mandate",
        line: "Authority proven, direction extended responsibly.",
      },
    ],
  },
  {
    id: "ai-labs",
    name: "Labs",
    body: "Labs is where you practise what the challenge taught, inside real AI environments. AI Labs is by subscription, and your first months are free: one with General Admission, three with VIP, six with VVIP. The platform guides and your Toolbox stay open for good.",
    type: "tools",
    // Claude is the platform Labs opens with (founder, 2026-10-13). The other
    // five tiles are kinds of work done there, not tools.
    tools: [
      { name: "Claude", src: "/demo/tools/claude.svg" },
      { name: "Tasks", icon: ListChecks },
      { name: "Workflows", icon: Workflow },
      { name: "Projects", icon: FolderKanban },
      { name: "AI Agents", icon: Bot },
      { name: "Frameworks", icon: Blocks },
    ],
  },
];

export default function Demo() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(PANELS.length - 1, i + 1));

  return (
    <section
      id="demo"
      className="relative flex flex-col bg-dark-blue overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* ── Header ── */}
      <div className="shrink-0 px-6 sm:px-10 lg:px-14 pt-5 sm:pt-10 lg:pt-14 pb-3 sm:pb-5 lg:pb-7 short:sm:pt-3! short:sm:pb-2! border-b border-white/6">
        <div className="flex items-center justify-between gap-4 mb-1.5 sm:mb-2.5 short:sm:mb-1!">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/35">
            The Toolbox
          </p>

          {/* Counter + arrows */}
          <div className="shrink-0 flex items-center gap-3 sm:gap-4">
            <span className="text-[10px] sm:text-[11px] font-semibold tabular-nums tracking-widest text-white/30">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(PANELS.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={active === 0}
                aria-label="Previous panel"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-150"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                disabled={active === PANELS.length - 1}
                aria-label="Next panel"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-150"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <h2 className="font-ptsans text-3xl sm:text-4xl lg:text-5xl font-bold uppercase leading-none tracking-tight text-white">
          <span className=" pr-1 md:pl-0 ">The challenge ends on Day 7.</span>{" "}
          <br className="hidden sm:block" />
          Your support doesn't.
        </h2>
      </div>

      {/* ── Panel track ── */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {PANELS.map((panel, idx) => (
            <div
              key={panel.id}
              className="w-full shrink-0 h-full flex flex-col lg:flex-row "
            >
              {/* Left — copy */}
              <div className="lg:w-[40%] shrink-0 flex flex-col justify-center px-6 sm:px-10 lg:px-14 pt-4 sm:pt-6 lg:pt-0 pb-3 sm:pb-6 lg:pb-14 short:sm:pt-1! short:sm:pb-1!">
                <h3 className="font-ptsans text-[1.25rem] sm:text-2xl font-bold uppercase tracking-widest text-white/35 mb-2 sm:mb-3 short:sm:mb-1!">
                  {panel.name}
                </h3>

                <p className="text-[13px] leading-snug sm:text-sm sm:leading-relaxed short:sm:leading-normal! lg:text-[0.9rem] text-white/55 max-w-md short:sm:max-w-2xl! mb-4 lg:mb-0 short:sm:mb-1!">
                  {panel.body}
                </p>
              </div>

              {/* Right — visual */}
              <div className="relative flex-1 min-w-0 min-h-0 overflow-hidden flex items-center pl-6 sm:pl-10 lg:pl-0 pr-6 sm:pr-10 lg:pr-14 pb-0 md:pb-10 lg:pb-14 short:pb-4! short:pl-6! short:pr-6! short:sm:pl-10! short:sm:pr-10!">
                {/* Full visual — hidden on short viewports */}
                <div className="w-full h-full min-h-0 flex items-center short:hidden!">
                  <PanelVisual panel={panel} isActive={active === idx} />
                </div>

                {/* Short viewports: collapsed bar — hint + expand icon */}
                <button
                  onClick={() => setExpanded(true)}
                  aria-label="Expand visual"
                  className="hidden short:flex! w-full max-w-2xl items-center justify-between gap-3 rounded-xl border border-white/12 bg-white/6 backdrop-blur-xl shadow-2xl px-4 py-2 text-left"
                >
                  <span className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40">
                    Tap to see more
                  </span>
                  <span className="shrink-0 w-7 h-7 rounded-lg border border-white/20 flex items-center justify-center text-white/60">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dot indicator ── */}
      <div
        className="hidden sm:flex short:hidden! shrink-0 items-center justify-center gap-2 pb-5 lg:pb-6 pt-3"
        aria-hidden
      >
        {PANELS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-white/60" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* ── Expanded sheet (short viewports) ── */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end bg-dark-blue/80 backdrop-blur-sm"
          onClick={() => setExpanded(false)}
        >
          <div
            className="demo-sheet relative h-[92dvh] rounded-t-2xl border-t border-x border-white/15 bg-dark-blue shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shrink-0 flex items-center justify-between gap-4 px-5 py-3 border-b border-white/10">
              <p className="font-ptsans text-base font-bold uppercase tracking-widest text-white/70">
                {PANELS[active].name}
              </p>
              <button
                onClick={() => setExpanded(false)}
                aria-label="Close"
                className="shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors duration-150"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="h-full min-h-110 px-4 pt-3 flex">
                <PanelVisual panel={PANELS[active]} isActive />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function PanelVisual({ panel, isActive }) {
  if (panel.type === "docs")
    return <DocLibrary docs={panel.docs} isActive={isActive} />;
  if (panel.type === "apps") return <MiniAppsDemo isActive={isActive} />;
  if (panel.type === "roadmap")
    return <RoadmapDiagram phases={panel.phases} isActive={isActive} />;
  if (panel.type === "tools")
    return <ToolsLibrary tools={panel.tools} isActive={isActive} />;
  return null;
}

/* ── Visual sub-components ── */

function DocLibrary({ docs, isActive }) {
  return (
    <div
      className={`relative w-full max-w-2xl mx-auto h-full lg:h-auto lg:my-auto ${
        isActive ? "demo-anim" : ""
      }`}
    >
      {/* Ambient glows — give the glass something to refract */}
      <div
        aria-hidden
        className="absolute top-0 left-4 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-msaccent/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-4 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-msblue/50 blur-3xl"
      />

      {/* Glass card */}
      <div className="relative h-full rounded-t-2xl md:rounded-2xl border border-white/12 bg-white/6 backdrop-blur-xl shadow-2xl p-4 sm:p-6 lg:p-8 flex flex-col">
        <div className="shrink-0 flex items-center justify-between mb-3 sm:mb-5">
          <p className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40">
            Reference Library
          </p>
          <p className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
            <span className="hidden sm:inline">The Essentials · </span>More
            Inside
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-2 sm:gap-3">
          {docs.map((doc, i) => (
            <div
              key={doc.name}
              className="demo-tile rounded-xl border border-white/8 bg-white/4 p-2.5 sm:p-4 flex items-center sm:flex-col sm:items-start gap-2.5 sm:gap-4"
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}
            >
              <span className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg gradient-200 inset-ring-1 inset-ring-white/25 shadow-lg flex items-center justify-center">
                <doc.icon
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white"
                  strokeWidth={1.75}
                />
              </span>
              <span className="text-[11px] sm:text-xs font-medium leading-snug text-white/75">
                {doc.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mini Apps demo (slide 2) — scripted simulations ── */

const SIM_TASKS = [
  {
    name: "Send a summary of meeting notes as a powerpoint document to the internal comms",
    ai: 4,
    hi: 2,
    quad: "AUTOMATE",
  },
  {
    name: "Create content for a campaign from the last social media briefing",
    ai: 4,
    hi: 4,
    quad: "AUGMENT",
  },
  {
    name: "Perform a competitor analysis to understand the market landscape",
    ai: 4,
    hi: 3,
    quad: "AUGMENT",
  },
];

const QUAD_STYLES = {
  AUTOMATE: "bg-green-100 text-green-700",
  AUGMENT: "bg-indigo-100 text-indigo-700",
  STREAMLINE: "bg-gray-100 text-gray-500",
  OWN: "bg-amber-100 text-amber-700",
};

function MiniAppsDemo({ isActive }) {
  const [tab, setTab] = useState("delegation");
  const TABS = [
    { id: "delegation", label: "Delegation" },
    { id: "readiness", label: "Readiness" },
    { id: "margin", label: "Margin" },
    { id: "territory", label: "Territory", locked: true },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto h-full lg:h-auto lg:my-auto">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="absolute top-0 left-4 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-msaccent/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-4 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-msblue/50 blur-3xl"
      />

      {/* Glass card */}
      <div className="relative h-full lg:h-auto rounded-t-2xl md:rounded-2xl border border-white/12 bg-white/6 backdrop-blur-xl shadow-2xl p-4 sm:p-6 flex flex-col">
        <div className="shrink-0 flex items-center justify-between gap-3 mb-3 sm:mb-4">
          {/* Four tabs do not fit a phone at the desktop size. Below md they
              share the row equally, in a tighter setting. */}
          <div className="flex min-w-0 flex-1 md:flex-none items-center gap-0.5 md:gap-1 rounded-full border border-white/10 bg-white/4 p-0.5">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex flex-1 md:flex-none items-center justify-center gap-0.5 md:gap-1 whitespace-nowrap rounded-full px-0.5 md:px-3.5 py-1 text-[8px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.02em] sm:tracking-[0.1em] md:tracking-[0.15em] transition-colors duration-150 ${
                  tab === t.id
                    ? "bg-white/15 text-white/90"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {t.locked && (
                  <Lock
                    className="w-2 h-2 md:w-2.5 md:h-2.5 shrink-0"
                    strokeWidth={2}
                  />
                )}
                {t.label}
              </button>
            ))}
          </div>
          <p className="hidden sm:block whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
            Live Demo
          </p>
        </div>

        <div className="flex-1 min-h-0 lg:h-75 flex items-stretch *:w-full">
          {tab === "delegation" && (
            <DelegationSim running={isActive && tab === "delegation"} />
          )}
          {/* Keyed on the panel being in view, so it starts from the top
              each time the panel comes back. */}
          {tab === "readiness" && (
            <ReadinessSim key={isActive ? "on" : "off"} running={isActive} />
          )}
          {tab === "margin" && (
            <MarginSim running={isActive && tab === "margin"} />
          )}
          {tab === "territory" && <TerritoryTeaser />}
        </div>
      </div>
    </div>
  );
}

const SIM_PHASES = ["t1", "t2", "t3", "rate", "rated", "results"];
const SIM_DUR = {
  t1: 1000,
  t2: 1000,
  t3: 1300,
  rate: 1500,
  rated: 1800,
  results: 4500,
};

function DelegationSim({ running }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!running) {
      setI(0);
      return;
    }
    const t = setTimeout(
      () => setI((p) => (p + 1) % SIM_PHASES.length),
      SIM_DUR[SIM_PHASES[i]],
    );
    return () => clearTimeout(t);
  }, [i, running]);

  const step = SIM_PHASES[i];
  const stage = step === "results" ? 2 : step.startsWith("rate") ? 1 : 0;
  const visibleTasks = step === "t1" ? 1 : step === "t2" ? 2 : 3;

  return (
    <div className="min-h-0 rounded-lg sm:rounded-xl bg-white text-slate-700 shadow-2xl overflow-hidden flex flex-col">
      <SimStepper
        labels={["Add Tasks", "Rate Tasks", "Results"]}
        stage={stage}
      />

      {/* Body */}
      <div className="flex-1 min-h-0 p-3 sm:p-4 overflow-hidden">
        {stage === 0 && (
          <div className="h-full flex flex-col">
            <div className="flex gap-1.5 mb-2.5">
              <div className="flex-1 rounded-md border border-indigo-200 px-2.5 py-1.5 text-[9px] sm:text-[10px] text-slate-400">
                Describe the task...
              </div>
              <div className="rounded-md bg-indigo-50 text-indigo-600 px-2.5 py-1.5 text-[9px] sm:text-[10px] font-semibold">
                + Add
              </div>
            </div>
            <div className="space-y-1.5">
              {SIM_TASKS.map((task, idx) => (
                <div
                  key={idx}
                  className={`rounded-md border border-slate-200 px-2.5 py-1.5 sm:py-2 flex items-baseline gap-2 transition-all duration-500 ${
                    idx < visibleTasks
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                >
                  <span className="shrink-0 text-[8px] text-slate-300 tabular-nums">
                    {idx + 1}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-700 line-clamp-1">
                    {task.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between gap-2 pt-2">
              <div className="flex-1 flex gap-0.5 max-w-[45%]">
                {Array.from({ length: 10 }).map((_, s) => (
                  <span
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                      s < visibleTasks ? "bg-indigo-500" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
              <div
                className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[9px] sm:text-[10px] font-semibold transition-colors duration-500 ${
                  visibleTasks === 3
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-50 text-indigo-400"
                }`}
              >
                Rate my tasks <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </div>
          </div>
        )}

        {stage === 1 && (
          <div className="h-full flex flex-col">
            <p className="text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-0.5">
              Task 2 of 3
            </p>
            <p className="text-[10px] sm:text-xs font-bold text-slate-800 mb-2.5 line-clamp-1">
              {SIM_TASKS[1].name}
            </p>
            <SimSlider
              label="AI Capability Fit"
              hint="How structured and repeatable is this task?"
            />
            <SimSlider
              label="Human Intelligence Demand"
              hint="How much empathy, judgment, or trust is required?"
            />
            <div className="mt-auto grid grid-cols-2 gap-px rounded-md overflow-hidden border border-slate-200 text-[7px] sm:text-[8px] font-semibold">
              {["AUTOMATE", "AUGMENT", "STREAMLINE", "OWN"].map((q) => (
                <div
                  key={q}
                  className={`px-2 py-1.5 sm:py-2 transition-colors duration-500 ${
                    q === "AUGMENT" && step === "rated"
                      ? "bg-indigo-700 text-white"
                      : "bg-slate-50 text-slate-400"
                  }`}
                >
                  {q}
                </div>
              ))}
            </div>
          </div>
        )}

        {stage === 2 && (
          <div className="h-full flex flex-col">
            <div className="space-y-1.5 mb-2.5">
              {SIM_TASKS.map((task, idx) => (
                <div
                  key={idx}
                  className="sim-rise rounded-md border border-slate-200 px-2.5 py-1.5 flex items-center gap-2"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <span className="flex-1 text-[9px] sm:text-[10px] text-slate-700 line-clamp-1">
                    {task.name}
                  </span>
                  <span className="shrink-0 hidden sm:block text-[8px] tabular-nums text-slate-400">
                    AI {task.ai} · HI {task.hi}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-1.5 py-0.5 text-[7px] sm:text-[8px] font-bold ${QUAD_STYLES[task.quad]}`}
                  >
                    {task.quad}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                ["AUTOMATE", 1],
                ["AUGMENT", 2],
                ["STREAMLINE", 0],
                ["OWN", 0],
              ].map(([q, n], idx) => (
                <div
                  key={q}
                  className={`sim-rise rounded-md px-1.5 py-1.5 sm:py-2 ${QUAD_STYLES[q]}`}
                  style={{ animationDelay: `${0.5 + idx * 0.12}s` }}
                >
                  <p className="text-[6px] sm:text-[7px] font-bold tracking-wide">
                    {q}
                  </p>
                  <p className="text-sm sm:text-base font-bold leading-none mt-0.5">
                    {n}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="sim-rise mt-auto flex items-center gap-1.5 self-start rounded-md bg-indigo-950 text-white px-2.5 py-1.5 text-[9px] sm:text-[10px] font-semibold"
              style={{ animationDelay: "1s" }}
            >
              <Download className="w-2.5 h-2.5" /> Download Summary
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SimStepper({ labels, stage }) {
  return (
    <div className="shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-slate-50 border-b border-slate-200">
      {labels.map((label, s) => (
        <div key={label} className="flex items-center gap-1.5 sm:gap-2">
          {s > 0 && <ChevronRight className="w-2.5 h-2.5 text-slate-300" />}
          <span
            className={`flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full text-[7px] sm:text-[8px] font-bold transition-colors duration-300 ${
              stage >= s
                ? "bg-indigo-600 text-white"
                : "bg-slate-200 text-slate-400"
            }`}
          >
            {s + 1}
          </span>
          <span
            className={`text-[8px] sm:text-[9px] font-semibold transition-colors duration-300 ${
              stage === s ? "text-slate-800" : "text-slate-400"
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function SimSlider({ label, hint }) {
  const [slid, setSlid] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setSlid(true)),
    );
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="mb-2.5">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[9px] sm:text-[10px] font-bold text-slate-800">
          {label}
        </p>
        <span className="text-xs sm:text-sm font-bold text-indigo-600 tabular-nums">
          {slid ? 4 : 2}
        </span>
      </div>
      <p className="text-[7px] sm:text-[8px] text-slate-400 mb-1.5">{hint}</p>
      <div className="relative h-1 rounded-full bg-indigo-100">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-indigo-500 transition-all duration-700 ease-out"
          style={{ width: slid ? "75%" : "25%" }}
        />
        <span
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-indigo-500 shadow transition-all duration-700 ease-out"
          style={{ left: slid ? "75%" : "25%" }}
        />
      </div>
    </div>
  );
}

/* Readiness Scorecard. The dimension, its question, the two statements and
   the scale are the real tool's own words (intelligence,
   utils/challenge/ReadinessScorecard.jsx). The scores are made up. */

const READY_SCALE = [
  "No",
  "Not yet, but planned",
  "Partly",
  "Yes",
  "Yes, and I could show it",
];

const READY_STATEMENTS = [
  {
    text: "My reasons for using AI are written down and tied to my goals.",
    value: 4,
  },
  { text: "I can say, in one sentence, why I am turning to AI.", value: 2 },
];

// Each score is out of 20, as in the tool. There is no total.
const READY_SCORES = [
  { name: "Strategy", score: 17, mark: "Strongest" },
  { name: "Data Governance", score: 9 },
  { name: "Talent", score: 14 },
  { name: "Processes", score: 12 },
  { name: "Impact Evaluation", score: 7, mark: "Start here" },
  { name: "Collaboration", score: 13 },
];

const READY_PHASES = ["open", "one", "two", "profile"];
const READY_DUR = { open: 1200, one: 1400, two: 1900, profile: 5200 };

function ReadinessSim({ running }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(
      () => setI((p) => (p + 1) % READY_PHASES.length),
      READY_DUR[READY_PHASES[i]],
    );
    return () => clearTimeout(t);
  }, [i, running]);

  const step = READY_PHASES[i];
  const rated = step === "open" ? 0 : step === "one" ? 1 : 2;

  return (
    <div className="min-h-0 rounded-lg sm:rounded-xl bg-white text-slate-700 shadow-2xl overflow-hidden flex flex-col">
      <SimStepper
        labels={["How to Rate", "Rate", "My Profile"]}
        stage={step === "profile" ? 2 : 1}
      />

      <div className="flex-1 min-h-0 p-3 sm:p-4 overflow-hidden">
        {step !== "profile" && (
          <div className="h-full flex flex-col">
            <p className="text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-0.5">
              Dimension 1 of 6
            </p>
            <p className="text-[10px] sm:text-xs font-bold text-slate-800">
              Strategy
            </p>
            <p className="text-[8px] sm:text-[9px] italic text-slate-400 mb-2">
              Do I have a plan for AI, tied to where I am going?
            </p>
            <div className="space-y-1.5">
              {READY_STATEMENTS.map((s, idx) => {
                const done = idx < rated;
                return (
                  <div
                    key={s.text}
                    className="rounded-md border border-slate-200 px-2.5 py-1.5 sm:py-2"
                  >
                    <p className="text-[9px] sm:text-[10px] leading-snug text-slate-700 mb-1.5">
                      {s.text}
                    </p>
                    <div className="flex items-center gap-1">
                      {READY_SCALE.map((label, v) => (
                        <span
                          key={label}
                          className={`flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded text-[7px] sm:text-[8px] font-bold tabular-nums transition-colors duration-300 ${
                            done && v + 1 === s.value
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {v + 1}
                        </span>
                      ))}
                      <span
                        className={`ml-1.5 text-[7px] sm:text-[8px] font-semibold text-indigo-600 transition-opacity duration-300 ${
                          done ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {READY_SCALE[s.value - 1]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-auto flex items-center justify-between gap-2 pt-2">
              <div className="flex-1 flex gap-0.5 max-w-[45%]">
                {READY_SCORES.map((d, s) => (
                  <span
                    key={d.name}
                    className={`h-1 flex-1 rounded-full ${
                      s === 0 ? "bg-indigo-500" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
              <div
                className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[9px] sm:text-[10px] font-semibold transition-colors duration-500 ${
                  rated === 2
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-50 text-indigo-400"
                }`}
              >
                Next dimension <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </div>
          </div>
        )}

        {step === "profile" && <ReadinessProfile />}
      </div>
    </div>
  );
}

function ReadinessProfile() {
  // Bars start empty and grow once the view is on screen.
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setGrown(true)),
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <p className="text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
        Six scores, side by side. No total.
      </p>
      <div className="mb-2.5 space-y-1.5 sm:space-y-3">
        {READY_SCORES.map((d, idx) => (
          <div
            key={d.name}
            className="sim-rise grid grid-cols-[5.25rem_1fr_4.5rem] sm:grid-cols-[7rem_1fr_5.5rem] items-center gap-2"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <span className="truncate text-[8px] sm:text-[9px] font-semibold text-slate-700">
              {d.name}
            </span>
            <span className="h-1.5 rounded-full bg-indigo-100 overflow-hidden">
              <span
                className="block h-full rounded-full bg-indigo-500 transition-all duration-700 ease-out"
                style={{ width: grown ? `${(d.score / 20) * 100}%` : "0%" }}
              />
            </span>
            <span className="flex items-center justify-end gap-1.5">
              {d.mark && (
                <span className="whitespace-nowrap rounded-full bg-indigo-100 px-1.5 py-0.5 text-[6px] sm:text-[7px] font-bold text-indigo-700">
                  {d.mark}
                </span>
              )}
              <span className="w-3 text-right text-[9px] sm:text-[10px] font-bold tabular-nums text-slate-700">
                {d.score}
              </span>
            </span>
          </div>
        ))}
      </div>
      <div
        className="sim-rise mt-auto flex items-center gap-1.5 self-start rounded-md bg-indigo-950 text-white px-2.5 py-1.5 text-[9px] sm:text-[10px] font-semibold"
        style={{ animationDelay: "0.9s" }}
      >
        <Download className="w-2.5 h-2.5" /> Download Summary
      </div>
    </div>
  );
}

function MarginField({ label, children, delay }) {
  return (
    <div>
      <p className="text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-0.5">
        {label}
      </p>
      <div
        className="sim-rise rounded-md border border-slate-200 px-2 py-1.5 text-[9px] sm:text-[10px] text-slate-700"
        style={{ animationDelay: delay }}
      >
        {children}
      </div>
    </div>
  );
}

function MarginSim({ running }) {
  // Two-beat loop: fill the entry form, then reveal the computed summary
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!running) {
      setPhase(0);
      return;
    }
    const t = setTimeout(
      () => setPhase((p) => (p + 1) % 2),
      phase === 0 ? 4200 : 5200,
    );
    return () => clearTimeout(t);
  }, [phase, running]);

  const [weeks, setWeeks] = useState(0);
  useEffect(() => {
    if (!running || phase !== 1) {
      setWeeks(0);
      return;
    }
    let raf;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      setWeeks(10.9 * e);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, phase]);

  const rows = [
    ["Margin / Session", "3 hrs 40 mins"],
    ["Weekly Margin", "7 hrs 20 mins"],
    ["Annual Margin", "381 hrs 20 mins"],
    ["Working Days Saved / Year", "47.7 days"],
  ];

  return (
    <div className="min-h-0 rounded-lg sm:rounded-xl bg-white text-slate-700 shadow-2xl overflow-hidden flex flex-col">
      <div className="shrink-0 px-3 sm:px-4 py-2 bg-slate-50 border-b border-slate-200">
        <p className="text-[9px] sm:text-[10px] font-bold text-slate-800">
          Margin Calculator
        </p>
        <p className="text-[7px] sm:text-[8px] italic text-slate-400">
          Based on 8-hr working days and 40-hr working weeks.
        </p>
      </div>

      {phase === 0 && (
        <div className="flex-1 min-h-0 p-3 sm:p-4 flex flex-col gap-1.5 sm:gap-2 overflow-hidden">
          <MarginField label="Task / Activity" delay="0s">
            <span className="line-clamp-1">{SIM_TASKS[0].name}</span>
          </MarginField>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <MarginField label="Mode" delay="0.4s">
              Automation
            </MarginField>
            <MarginField label="Frequency" delay="0.4s">
              2× per Week
            </MarginField>
          </div>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <MarginField label="Time Without AI" delay="1s">
              <span className="font-bold tabular-nums">4</span>
              <span className="text-slate-400"> hrs </span>
              <span className="font-bold tabular-nums">0</span>
              <span className="text-slate-400"> mins</span>
            </MarginField>
            <MarginField label="Time With AI" delay="1.8s">
              <span className="font-bold tabular-nums">0</span>
              <span className="text-slate-400"> hrs </span>
              <span className="font-bold tabular-nums">20</span>
              <span className="text-slate-400"> mins</span>
            </MarginField>
          </div>
          <div
            className="sim-rise mt-auto self-start rounded-md bg-indigo-600 text-white px-2.5 py-1.5 text-[9px] sm:text-[10px] font-semibold"
            style={{ animationDelay: "2.8s" }}
          >
            + Add to Summary
          </div>
        </div>
      )}

      {phase === 1 && (
        <div className="flex-1 min-h-0 p-3 sm:p-4 flex flex-col overflow-hidden">
          <div className="sim-rise rounded-md border border-slate-200 px-2.5 py-1.5 sm:py-2 flex items-center gap-2 mb-2.5">
            <span className="flex-1 text-[9px] sm:text-[10px] text-slate-700 line-clamp-1">
              {SIM_TASKS[0].name}
            </span>
            <span className="shrink-0 rounded-full bg-green-100 text-green-700 px-1.5 py-0.5 text-[7px] sm:text-[8px] font-bold">
              Automation
            </span>
            <span className="shrink-0 hidden sm:block text-[8px] tabular-nums text-slate-400">
              4 hrs → 20 mins
            </span>
          </div>
          <div className="space-y-1">
            {rows.map(([label, value], idx) => (
              <div
                key={label}
                className="sim-rise flex items-center justify-between gap-2 rounded-md bg-slate-50 px-2.5 py-1.5"
                style={{ animationDelay: `${0.2 + idx * 0.12}s` }}
              >
                <span className="text-[8px] sm:text-[9px] text-slate-400">
                  {label}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 tabular-nums">
                  {value}
                </span>
              </div>
            ))}
          </div>
          <div
            className="sim-rise mt-auto rounded-md bg-indigo-50 px-2.5 sm:px-3 py-2 sm:py-2.5 flex items-end justify-between gap-2"
            style={{ animationDelay: "0.75s" }}
          >
            <div>
              <p className="text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                Working Weeks Reclaimed Annually
              </p>
              <p className="text-lg sm:text-2xl font-bold text-indigo-600 tabular-nums leading-tight">
                {weeks.toFixed(1)} wks
              </p>
            </div>
            <p className="text-[7px] sm:text-[8px] text-slate-400 text-right">
              435 hrs 22 mins
              <br />
              54.4 days
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function TerritoryTeaser() {
  return (
    <div className="min-h-0 rounded-lg sm:rounded-xl border border-white/8 bg-white/3 flex flex-col items-center justify-center text-center px-6 py-8 gap-3">
      <span className="w-10 h-10 rounded-lg gradient-200 inset-ring-1 inset-ring-white/25 shadow-lg flex items-center justify-center">
        <Lock className="w-4 h-4 text-white" strokeWidth={1.75} />
      </span>
      <p className="font-ptsans text-base sm:text-lg font-bold uppercase tracking-widest text-white/85">
        Territory Builder
      </p>

      <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/35">
        Full access on Day 3
      </p>
    </div>
  );
}

function PhaseCard({ phase, delay }) {
  return (
    <div
      className="rm-card h-full rounded-xl border border-white/8 bg-white/5 backdrop-blur-md p-2.5 sm:p-4"
      style={{ animationDelay: delay }}
    >
      <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1 sm:mb-2">
        <span className="whitespace-nowrap">Phase {phase.num}</span>
        <span className="w-px h-2.5 bg-white/15 shrink-0" aria-hidden />
        <span className="whitespace-nowrap tabular-nums text-white/30">
          {phase.days}
        </span>
      </p>
      <h4 className="font-ptsans text-sm sm:text-base font-bold uppercase tracking-wide leading-tight text-white/90 mb-0.5 sm:mb-1.5">
        {phase.name}
      </h4>
      <p className="text-[11px] sm:text-xs leading-snug text-white/55">
        {phase.line}
      </p>
    </div>
  );
}

function RoadmapDiagram({ phases, isActive }) {
  const TICKS = [
    { at: 0, label: "Day 1" },
    { at: 33.3, label: "Day 60" },
    { at: 66.7, label: "Day 120" },
    { at: 100, label: "Day 180" },
  ];
  return (
    <div className="relative w-full max-w-2xl lg:max-w-3xl mx-auto h-full">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="absolute top-0 right-8 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-msaccent/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-8 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-msblue/50 blur-3xl"
      />

      {/* Glass card */}
      <div
        className={`relative h-full rounded-t-2xl md:rounded-2xl border border-white/12 bg-white/6 backdrop-blur-xl shadow-2xl p-3 sm:p-6 lg:p-8 flex flex-col ${
          isActive ? "roadmap-anim" : ""
        }`}
      >
        <div className="shrink-0 flex items-center justify-between mb-2 sm:mb-5">
          <p className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40">
            The 6-Month Roadmap
          </p>
          <p className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
            180 Days
          </p>
        </div>

        {/* Desktop — phase cards in a row over a 180-day axis */}
        <div className="hidden lg:flex flex-1 min-h-0 flex-col justify-center gap-10">
          <div className="grid grid-cols-3 gap-4 items-stretch">
            {phases.map((phase, i) => (
              <PhaseCard
                key={phase.num}
                phase={phase}
                delay={`${0.15 + i * 0.3}s`}
              />
            ))}
          </div>

          <div className="shrink-0">
            {/* Day axis */}
            <div className="relative h-px bg-white/15">
              {TICKS.map((tick) => (
                <span
                  key={tick.at}
                  aria-hidden
                  className="absolute top-0 w-px h-1.5 bg-white/25"
                  style={{ left: `${tick.at}%` }}
                />
              ))}
              <span
                aria-hidden
                className="rm-axis-pulse absolute top-[-3.5px] w-2 h-2 rounded-full bg-[#b7bbff] shadow-[0_0_8px_2px_rgba(153,158,255,0.5)]"
              />
            </div>
            <div className="relative mt-2.5 h-3">
              {TICKS.map((tick, i) => (
                <span
                  key={tick.at}
                  className={`absolute top-0 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.15em] tabular-nums text-white/30 ${
                    i === 0
                      ? ""
                      : i === TICKS.length - 1
                        ? "-translate-x-full"
                        : "-translate-x-1/2"
                  }`}
                  style={{ left: `${tick.at}%` }}
                >
                  {tick.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile — vertical rail */}
        <div className="lg:hidden flex-1 relative min-h-0 pl-7">
          <div
            aria-hidden
            className="rm-rail absolute left-3 top-1 bottom-1 w-px bg-linear-to-b from-msaccent/70 via-white/25 to-white/50"
          />
          <div
            aria-hidden
            className="rm-rail-pulse absolute left-[8.5px] w-2 h-2 rounded-full bg-[#b7bbff] shadow-[0_0_8px_2px_rgba(153,158,255,0.5)]"
          />
          <div className="h-full flex flex-col justify-between gap-1.5 py-1">
            {phases.map((phase, i) => (
              <div key={phase.num} className="relative">
                <span
                  aria-hidden
                  className="absolute left-[-19.5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-msaccent ring-4 ring-msaccent/20"
                />
                <PhaseCard phase={phase} delay={`${0.15 + i * 0.3}s`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolsLibrary({ tools, isActive }) {
  return (
    <div
      className={`relative w-full max-w-2xl mx-auto h-full lg:h-auto lg:my-auto ${
        isActive ? "demo-anim" : ""
      }`}
    >
      {/* Ambient glows — give the glass something to refract */}
      <div
        aria-hidden
        className="absolute top-0 right-4 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-msaccent/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-4 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-msblue/50 blur-3xl"
      />

      {/* Glass card */}
      <div className="relative h-full rounded-t-2xl md:rounded-2xl border border-white/12 bg-white/6 backdrop-blur-xl shadow-2xl p-4 sm:p-6 lg:p-8 flex flex-col">
        <div className="shrink-0 flex items-center justify-between mb-3 sm:mb-5">
          <p className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40">
            Inside Labs
          </p>
          <p className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
            <span className="hidden sm:inline">The Essentials · </span>More
            Inside
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-2 sm:gap-3">
          {tools.map((tool, i) => (
            <div
              key={tool.name}
              className="demo-tile rounded-xl border border-white/8 bg-white/4 p-2.5 sm:p-4 flex items-center sm:flex-col sm:items-start gap-2.5 sm:gap-4"
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}
            >
              {tool.icon ? (
                <span className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg gradient-200 inset-ring-1 inset-ring-white/25 shadow-lg flex items-center justify-center">
                  <tool.icon
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white"
                    strokeWidth={1.75}
                  />
                </span>
              ) : (
                <span className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white inset-ring-1 inset-ring-white/25 shadow-lg flex items-center justify-center p-1.5 sm:p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tool.src}
                    alt={tool.name}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </span>
              )}
              <span className="text-[11px] sm:text-xs font-medium leading-snug text-white/75">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
