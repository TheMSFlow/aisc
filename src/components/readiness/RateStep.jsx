"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/components/global/Button";
import { isComplete } from "@/lib/readiness/profile";

// One dimension: its question and its four statements, each rated 1 to 5. A 5
// asks what the leader could show, as on Day 2. Optional, and it goes only
// into their own report.

function RatingRow({ statement, scale, value, onChange, evidence, onEvidence }) {
  const chosen = scale.find((s) => s.value === value);
  return (
    <li className="flex flex-col gap-4 border-t border-dark-blue/10 py-6 first:border-t-0 first:pt-0">
      <p className="text-base leading-relaxed text-dark-blue">{statement.text}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div
          role="radiogroup"
          aria-label={statement.text}
          className="flex items-center gap-2"
        >
          {scale.map(({ value: n, label }) => {
            const isSelected = value === n;
            return (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={`${n}: ${label}`}
                title={label}
                onClick={() => onChange(n)}
                className={`h-10 w-10 cursor-pointer rounded-full text-sm font-semibold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msaccent/50 focus-visible:ring-offset-2 ${
                  isSelected
                    ? "bg-msaccent text-white"
                    : "border border-dark-blue/15 bg-white text-dark-blue/55 hover:border-msaccent/60 hover:text-msaccent"
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
        <span className="min-h-5 text-sm italic text-dark-blue/50">{chosen?.label ?? ""}</span>
      </div>
      {value === 5 && (
        <input
          type="text"
          value={evidence ?? ""}
          onChange={(e) => onEvidence(e.target.value)}
          maxLength={200}
          placeholder="What could you show? (optional)"
          aria-label="What could you show? Optional"
          className="w-full rounded-lg border border-dark-blue/15 bg-white px-4 py-2.5 text-sm text-dark-blue placeholder:text-dark-blue/35 focus:border-msaccent focus:outline-none focus:ring-2 focus:ring-msaccent/25"
        />
      )}
    </li>
  );
}

export default function RateStep({
  dimension,
  index,
  total,
  scale,
  ratings,
  evidence,
  onRate,
  onEvidence,
  onBack,
  onNext,
  nextLabel,
}) {
  const done = isComplete(dimension, ratings);

  return (
    <div>
      <p className="text-sm text-dark-blue/50">
        Dimension {index + 1} of {total}
      </p>
      <h2 className="mt-2 font-ptsans text-4xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-5xl">
        {dimension.name}
      </h2>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-dark-blue/70">
        {dimension.question}
      </p>

      <ul className="mt-10 flex flex-col">
        {dimension.statements.map((s) => (
          <RatingRow
            key={s.id}
            statement={s}
            scale={scale}
            value={ratings[s.id]}
            onChange={(n) => onRate(s.id, n)}
            evidence={evidence[s.id]}
            onEvidence={(text) => onEvidence(s.id, text)}
          />
        ))}
      </ul>

      <div className="mt-10 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex cursor-pointer items-center gap-2 text-sm text-dark-blue/55 transition-colors hover:text-dark-blue"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <Button
          variant="dark"
          className="px-8 py-3"
          onClick={onNext}
          disabled={!done}
          iconRight={ArrowRight}
        >
          {nextLabel}
        </Button>
      </div>
      {!done && (
        <p className="mt-3 text-right text-xs text-dark-blue/45">
          Rate all four to go on.
        </p>
      )}
    </div>
  );
}
