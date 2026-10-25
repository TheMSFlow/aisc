"use client";

import Button from "@/components/global/Button";
import { lowStatements, readingOf } from "@/lib/readiness/profile";

// The profile, as on Day 2: six scores side by side with no total, the
// strongest and where to start (the leader settles any tie), and the first
// moves. The shape is the point: "Read the shape before you read the size."

function TiePicker({ tied, selected, onSelect }) {
  return (
    <div className="mt-3 flex flex-col gap-2">
      <p className="text-sm text-dark-blue/60">
        These are level. Choose the one that matters more to you now.
      </p>
      <div className="flex flex-wrap gap-2">
        {tied.map((d) => {
          const isSelected = selected === d.key;
          return (
            <button
              key={d.key}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(d.key)}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msaccent/50 ${
                isSelected
                  ? "bg-msaccent text-white"
                  : "border border-dark-blue/15 bg-white text-dark-blue/65 hover:border-msaccent/60 hover:text-msaccent"
              }`}
            >
              {d.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Shape({ profile, outOf, onEdit }) {
  const { scores, strongest, start } = profile;
  return (
    <ul className="flex flex-col gap-5">
      {scores.map((d) => {
        const mark =
          strongest?.key === d.key ? "Strongest" : start?.key === d.key ? "Start here" : null;
        return (
          <li key={d.key} className="grid grid-cols-[1fr_auto] items-end gap-x-4 gap-y-2">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-ptsans text-xl font-bold uppercase tracking-tight text-dark-blue">
                {d.name}
              </span>
              {mark && (
                <span
                  className={`text-sm font-semibold ${
                    mark === "Strongest" ? "text-msaccent" : "text-warning"
                  }`}
                >
                  {mark}
                </span>
              )}
            </div>
            <div className="text-right">
              <span className="font-ptsans text-2xl font-bold tabular-nums text-dark-blue">
                {d.score}
              </span>
              <span className="text-sm text-dark-blue/45"> / {outOf}</span>
            </div>
            <div className="col-span-2 flex items-center gap-4">
              <div
                className="h-2.5 flex-1 overflow-hidden rounded-full bg-lilac"
                role="img"
                aria-label={`${d.name}: ${d.score} out of ${outOf}, ${readingOf(d.score).toLowerCase()}`}
              >
                <div
                  className="h-full rounded-full bg-msaccent"
                  style={{ width: `${(d.score / outOf) * 100}%` }}
                />
              </div>
              <span className="w-24 text-sm text-dark-blue/55">{readingOf(d.score)}</span>
            </div>
            <button
              type="button"
              onClick={() => onEdit(d.key)}
              className="col-span-2 w-fit cursor-pointer text-xs text-dark-blue/45 underline-offset-2 hover:text-dark-blue hover:underline"
            >
              Change my answers for {d.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function ProfileView({
  profile,
  ratings,
  outOf,
  choice,
  onChoose,
  onEdit,
  email,
  sending,
  sendError,
  onSend,
}) {
  const { strongestTied, startTied, nextTied, strongest, start, nextUp, settled } = profile;

  return (
    <div>
      <h1 className="font-ptsans text-4xl font-bold uppercase leading-none tracking-tight text-dark-blue sm:text-5xl lg:text-6xl">
        Your readiness profile
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-dark-blue/60">
        Six scores, side by side, each out of {outOf}. There is no total: the gaps between them
        say more than any single number. Read the shape before you read the size.
      </p>

      <div className="mt-12">
        <Shape profile={profile} outOf={outOf} onEdit={onEdit} />
      </div>

      <p className="mt-6 text-sm text-dark-blue/50">
        4 to 9 is a gap. 10 to 13 is developing. 14 to 20 is a strength.
      </p>

      {(strongestTied.length > 1 || startTied.length > 1 || (start && nextTied.length > 1)) && (
        <div className="mt-10 flex flex-col gap-6 border-t border-dark-blue/10 pt-8">
          {strongestTied.length > 1 && (
            <div>
              <p className="font-medium text-dark-blue">Your strongest</p>
              <TiePicker
                tied={strongestTied}
                selected={choice.strongest}
                onSelect={(k) => onChoose("strongest", k)}
              />
            </div>
          )}
          {startTied.length > 1 && (
            <div>
              <p className="font-medium text-dark-blue">Where you start</p>
              <TiePicker
                tied={startTied}
                selected={choice.start}
                onSelect={(k) => onChoose("start", k)}
              />
            </div>
          )}
          {start && nextTied.length > 1 && (
            <div>
              <p className="font-medium text-dark-blue">Your next lowest</p>
              <TiePicker
                tied={nextTied}
                selected={choice.next}
                onSelect={(k) => onChoose("next", k)}
              />
            </div>
          )}
        </div>
      )}

      {settled && (
        <div className="mt-12 border-t border-dark-blue/10 pt-10">
          <h2 className="font-ptsans text-3xl font-bold uppercase leading-none tracking-tight text-dark-blue">
            Your first moves
          </h2>
          <p className="mt-3 text-sm text-dark-blue/55">
            One move for this week in each, small enough to do, on a real day.
          </p>
          {[
            ["Where you start", start],
            ["Your next lowest", nextUp],
          ].map(([label, d]) => (
            <div key={d.key} className="mt-8">
              <p className="text-sm font-semibold text-msaccent">
                {label}: {d.name}
              </p>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-dark-blue">{d.firstMove}</p>
              {lowStatements(d, ratings).length > 0 && (
                <ul className="mt-3 flex flex-col gap-1.5">
                  {lowStatements(d, ratings).map((s) => (
                    <li key={s.id} className="text-sm leading-relaxed text-dark-blue/55">
                      {s.text} <span className="whitespace-nowrap">(you rated it {ratings[s.id]})</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <p className="mt-8 max-w-2xl text-base italic text-dark-blue/70">
            Your third move is your own: one that uses your strongest dimension, {strongest.name}.
          </p>
        </div>
      )}

      <div className="mt-14 rounded-2xl bg-dark-blue px-6 py-8 sm:px-10 sm:py-10">
        <p className="font-ptsans text-2xl font-bold uppercase leading-tight tracking-tight text-white sm:text-3xl">
          Get your full report by email
        </p>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/65">
          Every rating, your six scores and your first moves, as a PDF, sent to {email}.
        </p>
        <div className="mt-6">
          <Button
            variant="primary"
            className="px-8 py-3"
            onClick={onSend}
            loading={sending}
            disabled={!settled || sending}
          >
            Email me my report
          </Button>
        </div>
        {!settled && (
          <p className="mt-3 text-sm text-white/60">Choose between the level dimensions above first.</p>
        )}
        {sendError && (
          <p role="alert" className="mt-3 text-sm text-lilac">
            {sendError}
          </p>
        )}
      </div>
    </div>
  );
}
