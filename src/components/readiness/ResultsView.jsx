"use client";

import { useState } from "react";
import { AlertCircle, Check, ChevronDown, Loader2 } from "lucide-react";
import Button from "@/components/global/Button";
import { movesFor, readingOf } from "@/lib/readiness/profile";

// The last screen of the free AI readiness check (founder, 2026-11-19). The
// report is emailed as soon as the last statement is rated, so this screen
// says where it went and shows the results: every dimension in order of
// priority, as an accordion that opens to its move and the four answers behind
// its score. Then one invitation: the WhatsApp community, where the founder
// guides leaders through their readiness (live Q&As and set times for
// questions), offered to everyone whatever their scores (founder, 2026-11-19;
// its link comes from intelligence once the report is sent), and a way to take
// the check again. The Awakening is not shown here, so nothing competes with
// it: it belongs to the blog section (founder, 2026-11-19). No sales sections, no total, and no changing answers once sent.

function SendStatus({ status, email, error, onRetry, onRestart }) {
  if (status === "sending") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-dark-blue/10 bg-white px-5 py-4 text-sm text-dark-blue/70">
        <Loader2 className="h-4 w-4 shrink-0 animate-spin text-msaccent" />
        Sending your report to {email}…
      </div>
    );
  }
  if (status === "error") {
    return (
      <div
        role="alert"
        className="flex flex-col gap-3 rounded-xl border border-warning/30 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="flex items-start gap-3 text-sm text-dark-blue/80">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          {error.message}
        </p>
        <Button
          variant="dark"
          className="w-fit shrink-0 px-6 py-2.5"
          onClick={error.restart ? onRestart : onRetry}
        >
          {error.restart ? "Start again" : "Try again"}
        </Button>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3 rounded-xl border border-dark-blue/10 bg-white px-5 py-4 text-sm leading-relaxed text-dark-blue/70">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-msaccent">
        <Check className="h-3 w-3 text-white" strokeWidth={3} />
      </span>
      <p>
        <span className="font-medium text-dark-blue">
          Your report is on its way to {email}.
        </span>{" "}
        If it is not in your inbox in a few minutes, check your spam folder.
      </p>
    </div>
  );
}

const MARK = {
  start: { label: "Start here", className: "bg-warning/10 text-warning" },
  strongest: { label: "Strongest", className: "bg-msaccent/10 text-msaccent" },
};

function Dimension({
  d,
  rank,
  outOf,
  scale,
  ratings,
  evidence,
  open,
  onToggle,
}) {
  const panelId = `dimension-${d.key}`;
  const moves = movesFor(d, ratings);
  const mark = d.mark ? MARK[d.mark] : null;
  return (
    <li className="rounded-2xl border border-dark-blue/10 bg-white">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="grid w-full cursor-pointer grid-cols-[auto_1fr_auto_auto] items-center gap-x-4 gap-y-2 rounded-2xl px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msaccent/50 sm:px-6"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lilac text-sm font-semibold tabular-nums text-dark-blue">
            {rank}
          </span>
          <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-ptsans text-xl font-bold uppercase leading-tight tracking-tight text-dark-blue">
              {d.name}
            </span>
            {mark && (
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${mark.className}`}
              >
                {mark.label}
              </span>
            )}
          </span>
          <span className="shrink-0 text-right">
            <span className="font-ptsans text-2xl font-bold tabular-nums text-dark-blue">
              {d.score}
            </span>
            <span className="text-sm text-dark-blue/45"> / {outOf}</span>
          </span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-dark-blue/40 transition-transform ${open ? "rotate-180" : ""}`}
          />
          <span className="col-span-3 col-start-2 flex items-center gap-3">
            <span
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-lilac"
              role="img"
              aria-label={`${d.score} out of ${outOf}, ${readingOf(d.score).toLowerCase()}`}
            >
              <span
                className="block h-full rounded-full bg-msaccent"
                style={{ width: `${(d.score / outOf) * 100}%` }}
              />
            </span>
            <span className="w-20 shrink-0 text-right text-xs text-dark-blue/55">
              {readingOf(d.score)}
            </span>
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        hidden={!open}
        className="border-t border-dark-blue/10 px-5 pb-6 pt-5 sm:px-6"
      >
        <p className="text-sm italic text-dark-blue/55">{d.question}</p>

        <div className="mt-4 flex flex-col gap-4 rounded-xl bg-lilac/60 px-5 py-4">
          {[
            ["Your next move", moves.move],
            ["Build on your strength", moves.strengthMove],
          ]
            .filter(([, text]) => text)
            .map(([label, text]) => (
              <div key={label}>
                <p className="text-sm font-semibold text-msaccent">{label}</p>
                <p className="mt-2 text-base leading-relaxed text-dark-blue">
                  {text}
                </p>
              </div>
            ))}
        </div>

        <p className="mt-6 text-sm font-semibold text-dark-blue/55">
          Your answers
        </p>
        <ul className="mt-2 flex flex-col">
          {d.statements.map((s) => {
            const n = ratings[s.id];
            const label = scale.find((x) => x.value === n)?.label;
            return (
              <li
                key={s.id}
                className="flex gap-4 border-t border-dark-blue/5 py-3 first:border-t-0"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums ${
                    n <= 2
                      ? "border border-dark-blue/15 bg-white text-dark-blue/60"
                      : n === 3
                        ? "bg-lilac text-dark-blue"
                        : "bg-msaccent text-white"
                  }`}
                  title={label}
                >
                  {n}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm leading-relaxed text-dark-blue">
                    {s.text}
                  </span>
                  <span className="text-xs text-dark-blue/45">{label}</span>
                  {n === 5 && evidence[s.id]?.trim() && (
                    <span className="text-xs text-dark-blue/60">
                      What you could show: {evidence[s.id].trim()}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

// Plain words for level scores (founder, 2026-11-19): the report email and PDF
// say the same (intelligence lib/readiness/scorecard.js, sameScoreNote).
function listNames(names) {
  return names.length < 2
    ? names.join("")
    : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

function sameScoreNoteFor(dims) {
  if (dims.length > 1 && dims.every((d) => d.score === dims[0].score)) {
    return "All six of your scores are the same. Start with the one that matters most to you now.";
  }
  const starts = dims.filter((d) => d.mark === "start");
  if (starts.length < 2) return null;
  return `${listNames(starts.map((d) => d.name))} have the same score. Start with the one that matters most to you now.`;
}

export default function ResultsView({
  dims,
  outOf,
  scale,
  ratings,
  evidence,
  email,
  status,
  error,
  inviteUrl,
  onRetry,
  onRestart,
}) {
  // The first in priority opens on arrival; the leader opens the rest.
  const [open, setOpen] = useState(
    () => new Set(dims.length ? [dims[0].key] : []),
  );
  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const sameScoreNote = sameScoreNoteFor(dims);

  return (
    <div>
      <SendStatus
        status={status}
        email={email}
        error={error}
        onRetry={onRetry}
        onRestart={onRestart}
      />

      <h1 className="mt-12 font-ptsans text-4xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-5xl">
        Your readiness profile
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-dark-blue/60">
        Six scores, each out of {outOf}, in the order to work on them. Start
        with number 1. Open each one to see what to do.
      </p>
      <p className="mt-2 text-sm text-dark-blue/45">
        4 to 9 is a gap. 10 to 13 is developing. 14 to 20 is a strength.
      </p>
      {sameScoreNote && (
        <p className="mt-4 max-w-xl text-sm text-dark-blue/65">
          {sameScoreNote}
        </p>
      )}

      <ol className="mt-8 flex flex-col gap-3">
        {dims.map((d, i) => (
          <Dimension
            key={d.key}
            d={d}
            rank={i + 1}
            outOf={outOf}
            scale={scale}
            ratings={ratings}
            evidence={evidence}
            open={open.has(d.key)}
            onToggle={() => toggle(d.key)}
          />
        ))}
      </ol>

      {inviteUrl && (
        <div className="relative mt-12 overflow-hidden rounded-3xl bg-dark-blue px-6 py-8 sm:px-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 80% at 15% 0%, rgba(99,104,218,0.26), transparent 60%), radial-gradient(50% 70% at 90% 0%, rgba(135,5,113,0.14), transparent 60%)",
            }}
          />
          <div className="relative">
            <p className="font-ptsans text-2xl font-bold uppercase leading-tight tracking-tight text-white">
              Work on your readiness with me
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/65">
              I guide you through your readiness in a private WhatsApp
              community, with live Q&amp;As and set times for your questions,
              alongside other leaders preparing to adopt AI.
            </p>
            <div className="mt-5">
              <Button
                href={inviteUrl}
                variant="primary"
                className="w-fit px-8 py-3"
              >
                Join the community
              </Button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onRestart}
        className="mt-10 cursor-pointer text-sm text-dark-blue/50 underline-offset-2 hover:text-dark-blue hover:underline"
      >
        Take the check again
      </button>
    </div>
  );
}
