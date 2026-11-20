// Scoring for the free AI readiness check's on-screen results.
//
// The statements themselves are never kept here: they come from intelligence
// (GET /api/public/aisc/readiness/scorecard), which also works the scores out
// again before it builds and emails the report, so the browser's sums decide
// nothing. This file only draws the results the leader sees. Same rules as the
// Learning Center's Day 2 scorecard: a dimension's score is the sum of its four
// ratings out of 20, and there is no total.
//
// Since 2026-11-19 (founder) the results list every dimension in order of
// priority, lowest score first, each with its own move. Level scores keep the
// scorecard's order and carry the same mark: which to take first is the
// leader's call, so there is no tie picker any more. intelligence orders the
// report the same way (lib/readiness/scorecard.js there).

export function isComplete(dimension, ratings) {
  return dimension.statements.every((s) => ratings[s.id]);
}

export function scoreOf(dimension, ratings) {
  return dimension.statements.reduce((n, s) => n + ratings[s.id], 0);
}

// The moves a dimension shows (founder, 2026-11-19: "In every dimension, we
// start with the lowest score in that dimension and give a recommendation for
// it"): the move for its lowest-rated statement (the first in the list when
// several share it), unless all four answers are 4 or 5; and, for a strength
// (14 to 20), its strength move. The wording comes from intelligence, which
// applies the same rule in the report email and PDF (lib/readiness/
// scorecard.js there, movesFor). If intelligence still sends the older
// scorecard, with one firstMove per dimension, that move is shown instead.
export function movesFor(dimension, ratings) {
  const hasMoves = dimension.statements.every((s) => s.move);
  if (!hasMoves) return { move: dimension.firstMove ?? null, strengthMove: null };
  const lowest = Math.min(...dimension.statements.map((s) => ratings[s.id]));
  const target = lowest <= 3 ? dimension.statements.find((s) => ratings[s.id] === lowest) : null;
  return {
    move: target ? target.move : null,
    strengthMove: scoreOf(dimension, ratings) >= 14 ? (dimension.strengthMove ?? null) : null,
  };
}

export function readingOf(score) {
  if (score < 10) return "A gap";
  if (score < 14) return "Developing";
  return "A strength";
}

// Every dimension with its score, lowest first. Each one is marked "start"
// when it shares the lowest score and "strongest" when it shares the highest;
// when all six are level, neither mark means anything, so none is given.
export function prioritised(dimensions, ratings) {
  const scores = dimensions.map((d, order) => ({ ...d, order, score: scoreOf(d, ratings) }));
  const lowest = Math.min(...scores.map((d) => d.score));
  const highest = Math.max(...scores.map((d) => d.score));
  const level = lowest === highest;
  return scores
    .sort((a, b) => a.score - b.score || a.order - b.order)
    .map((d) => ({
      ...d,
      mark: level ? null : d.score === lowest ? "start" : d.score === highest ? "strongest" : null,
    }));
}
