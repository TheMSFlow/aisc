# Distribution Log — LinkedIn & Instagram

> Read `agent-guides/blog/SOCIAL_GUIDE.md` first for the cover spec, the infographic-fit rule, and the UTM convention.
> This file is the manifest: what has been produced, what has shipped, and where the queue stands. It exists so the state of distribution lives here rather than in anyone's head.

**Stubbed 2026-07-28. No assets produced yet.**

---

## Rules

1. **Never distribute a draft.** Only briefings with `draft: false` enter this log. A social post pointing at an unpublished slug is a 404 and burns the piece's launch.
2. **Work top-down.** Row order *is* production order: published least-recent-first, ties inside a publish date broken by inbound link count (descending), then slug alphabetical. Inbound counts come from `node scripts/blog-links-report.mjs`.
3. **One post, one push.** A briefing is distributed once per platform. No bulk catch-up, no re-posting the same asset to fill a gap.
4. **A new publish appends a row.** When a briefing flips to `draft: false` (per `TASKS.md` #10), add it to the bottom of the queue the same day.
5. **Every link carries UTMs, and lives in the first comment.** Never in the post body. Exact spelling per `SOCIAL_GUIDE.md` § Link Tracking. A link posted bare is untracked permanently; a link in the body costs reach and breaks the comparison between posts.
6. **Infographic is conditional.** Mark `n/a` where the briefing has no extractable structure. That is a legitimate outcome, not a gap.

## Legend

`—` not started · `WIP` in progress · `✓` done · `n/a` not applicable

Asset columns record production. Platform columns record the actual post: date and live URL.

---

## Queue

| # | Briefing | Cover | Video | Cover img | Infographic | LinkedIn | Instagram |
|---|----------|-------|-------|-----------|-------------|----------|-----------|
| 1 | `ai-governance-the-risk-is-already-inside` | ai-governance | — | — | — | — | — |
| 2 | `territory-not-tools-the-ai-opportunity-for-leaders` | ai-value | — | — | — | — | — |
| 3 | `the-briefing-your-board-expects-you-to-have-had` | chiefs-briefing | — | — | — | — | — |
| 4 | `the-service-you-could-not-afford-to-offer-last-year` | ai-value | — | — | — | — | — |
| 5 | `your-congregation-is-already-asking-about-ai` | ai-leadership | — | — | — | — | — |
| 6 | `your-students-adopted-ai-before-your-policy-did` | ai-governance | — | — | — | — | — |
| 7 | `what-to-delegate-to-ai-and-what-to-never` | ai-fluency | — | — | — | — | — |
| 8 | `what-ai-actually-is-for-the-seat-where-decisions-stop` | ai-clarity | — | — | — | — | — |
| 9 | `why-your-ai-pilot-went-nowhere` | ai-leadership | — | — | — | — | — |
| 10 | `the-hours-you-lose-every-week-to-work-ai-could-handle` | ai-value | — | — | — | — | — |
| 11 | `the-cfos-ai-question-is-a-capital-question` | ai-value | — | — | — | — | — |

11 published briefings as of 2026-07-28. The 21 banked drafts join this table as they publish.

## Asset locations

**Not yet decided.** Finished videos, covers, and infographics do not belong in this repo: it deploys from git, and video would bloat history permanently (the same reason `content/backgrounds/` is gitignored). Record the chosen home here once settled, and put the per-asset path or link in the row.

## Notes

- **Cover coverage in the current queue:** ai-value ×4, ai-governance ×2, ai-leadership ×2, ai-clarity ×1, ai-fluency ×1, chiefs-briefing ×1. `second-seat` and `emerging-leader` do not appear — their only briefings are still drafts, so those two cover designs get no outing until `reactive-leadership-is-a-margin-problem` and `become-the-ai-authority-at-work-without-the-title` publish.
- Row 3 is the first to need a background other than a theme cover (`chiefs-briefing`), and row 8 is the only `ai-clarity` outing in the backlog.
