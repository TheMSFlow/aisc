// Scoring for the free AI readiness check's on-screen profile.
//
// The statements themselves are never kept here: they come from intelligence
// (GET /api/public/aisc/readiness/scorecard), which also works the scores out
// again before it builds and emails the report, so the browser's sums decide
// nothing. This file only draws the profile the leader sees before sending.
// Same rules as the Learning Center's Day 2 scorecard: a dimension's score is
// the sum of its four ratings out of 20, no total, ties settled by the leader.

export function isComplete(dimension, ratings) {
  return dimension.statements.every((s) => ratings[s.id]);
}

export function scoreOf(dimension, ratings) {
  return dimension.statements.reduce((n, s) => n + ratings[s.id], 0);
}

export function readingOf(score) {
  if (score < 10) return "A gap";
  if (score < 14) return "Developing";
  return "A strength";
}

export function lowStatements(dimension, ratings) {
  return dimension.statements.filter((s) => ratings[s.id] <= 2);
}

function settle(tied, chosen) {
  return tied.length === 1
    ? tied[0]
    : (tied.find((d) => d.key === chosen) ?? null);
}

export function profileFor(dimensions, ratings, choice = {}) {
  const scores = dimensions.map((d) => ({ ...d, score: scoreOf(d, ratings) }));
  const highest = Math.max(...scores.map((d) => d.score));
  const lowest = Math.min(...scores.map((d) => d.score));
  const strongestTied = scores.filter((d) => d.score === highest);
  const startTied = scores.filter((d) => d.score === lowest);
  const strongest = settle(strongestTied, choice.strongest);
  const start = settle(startTied, choice.start);
  const rest = start ? scores.filter((d) => d.key !== start.key) : [];
  const nextLow = Math.min(...rest.map((d) => d.score));
  const nextTied = rest.filter((d) => d.score === nextLow);
  const nextUp = settle(nextTied, choice.next);
  return {
    scores,
    strongestTied,
    startTied,
    nextTied,
    strongest,
    start,
    nextUp,
    settled: Boolean(strongest && start && nextUp),
  };
}
