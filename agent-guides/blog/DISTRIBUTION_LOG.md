# Distribution Log — LinkedIn & Instagram

> Read `agent-guides/blog/SOCIAL_GUIDE.md` first for the cover spec, the infographic-fit rule, and the UTM convention.
> This file is the manifest: what has been produced, what has shipped, and where the queue stands. It exists so the state of distribution lives here rather than in anyone's head.

**Stubbed 2026-07-28.** First cover built the same day (row 1, `ai-governance`), which settled the cover build process. See `SOCIAL_GUIDE.md` § Building a Cover.

---

## Rules

0. **Two gates, in this order. Settled 2026-08-14.** Briefing accepted by Michael, then published, then the **headline approved as text**, then the cover rendered and confirmed, then every other asset in one sitting. Full table in `SOCIAL_GUIDE.md` § The Pattern. Nothing downstream of a gate gets built until it clears, because a headline changed late costs the whole set.
1. **Never distribute a draft.** Only briefings with `draft: false` enter this log. A social post pointing at an unpublished slug is a 404 and burns the piece's launch.
2. **Work top-down.** Row order *is* production order: published least-recent-first, ties inside a publish date broken by inbound link count (descending), then slug alphabetical. Inbound counts come from `node scripts/blog-links-report.mjs`.
3. **One post, one push.** A briefing is distributed once per platform. No bulk catch-up, no re-posting the same asset to fill a gap.
3a. **One briefing at a time, but all of its assets together.** Changed 2026-08-13. Producing every asset for one row in a single sitting is not batching: the set gets built off one reading of the briefing and stays consistent, and it moves to Drive in one drag. What is still forbidden is working several rows at once.
4. **A new publish appends a row.** When a briefing flips to `draft: false` (per `TASKS.md` #10), add it to the bottom of the queue the same day.
5. **Every link carries UTMs, and lives in the first comment.** Never in the post body. Exact spelling per `SOCIAL_GUIDE.md` § Link Tracking. A link posted bare is untracked permanently; a link in the body costs reach and breaks the comparison between posts.
6. **Infographic is conditional.** Mark `n/a` where the briefing has no extractable structure. That is a legitimate outcome, not a gap.
7. **Record the cover headline.** Every built cover gets a row in § Cover headlines the same session. The script that follows it depends on that text, and it is not recoverable from the JPEG.
8. **Session notes: the pause is under review.** It was set 2026-08-13 because there is no shooting equipment for the 15-minute long-form, and the deck existed only to be recorded from. **That reasoning weakened when the format changed on 2026-08-14**, because a detailed summary of the briefing is useful to read whether or not anything is ever filmed. Row 15 was built on request the same day, so the queue currently has a deck for every published briefing. **Whether row 16 gets one automatically is Michael's call and is not yet settled.** Until it is, ask rather than assume. The Script column still carries the active video asset either way.

## The dashboard

**Added 2026-09-03.** `npm run dashboard` serves a local control room at `http://localhost:3010` that reads this file, `TOPIC_LEDGER.md` and `content/`, and shows the queue, the publish pipeline, taxonomy coverage, and drift between what this log claims and what is actually on disk.

**It writes back.** Ticking a post writes the date and live URL into the platform cell of the queue table below, and only that cell. This file stays the source of truth; the dashboard is a view onto it with one write path. Nothing else in the file is touched, and the write is verified by reading it back before it commits.

**A YouTube column was added to the queue table the same day**, because the dashboard tracks all three platforms and a tick needs a cell to write into. Every existing row was padded with `—`. The column stays empty while the channel is paused.

**It shows the assets, not just their status.** Clicking a briefing opens a drawer with the cover and infographic as images (click to enlarge), the script rendered from its markdown source, and the session-notes deck rendered slide by slide from its spec, so a deck can be read without opening PowerPoint. A Files tab lists what is in the folder with sizes, and Open launches any file in its own application. Deep link: `#assets/<slug>` opens a drawer, `#assets/<slug>/script` opens it on a given tab.

The browser half lives in `scripts/dashboard.client.js` and is served at `/dashboard.js`. It is a separate file on purpose: inlined in a template literal, every backslash was silently eaten, which turned one regex into a block comment.

The dashboard is local only. It binds to 127.0.0.1, makes no network calls, and nothing it renders leaves the machine.

## Legend

`—` not started · `WIP` in progress · `✓ local` built and finished, living in `content/social/` · `n/a` not applicable

`✓ Drive` is retired as of 2026-08-14. Nothing moves to Drive any more, so `✓ local` is the terminal state.

Asset columns record production. Platform columns record the actual post: date and live URL.

---

## Queue

| # | Briefing | Cover | Script | Session notes | Video | Cover img | Infographic | LinkedIn | Instagram | YouTube |
|---|----------|-------|--------|---------------|-------|-----------|-------------|----------|-----------|------|
| 1 | `ai-governance-the-risk-is-already-inside` | ai-governance | ✓ local (docx, v2) | ✓ local (pptx, v3 summary format) | — | ✓ local | ✓ local (list) | 2026-09-04 · https://lnkd.in/p/et6ezjif | — | — |
| 2 | `territory-not-tools-the-ai-opportunity-for-leaders` | ai-value | ✓ local (docx, v2) | ✓ local (pptx, v3 summary format) | — | ✓ local | ✓ local (list) | — | — | — |
| 3 | `the-briefing-your-board-expects-you-to-have-had` | chiefs-briefing | ✓ local (docx, v2) | ✓ local (pptx, v3 summary format) | — | ✓ local | ✓ local (list) | — | — | — |
| 4 | `the-service-you-could-not-afford-to-offer-last-year` | ai-value | ✓ local (docx, v2) | ✓ local (pptx, v3 summary format) | — | ✓ local | ✓ local (list) | — | — | — |
| 5 | `your-congregation-is-already-asking-about-ai` | ai-leadership | ✓ local (docx, v2) | ✓ local (pptx, v3 summary format) | — | ✓ local | ✓ local (list) | — | — | — |
| 6 | `your-students-adopted-ai-before-your-policy-did` | ai-governance | ✓ local (docx, v2) | ✓ local (pptx, v3 summary format) | — | ✓ local | ✓ local (list) | — | — | — |
| 7 | `what-to-delegate-to-ai-and-what-to-never` | ai-fluency | ✓ local (docx, v2) | ✓ local (pptx, v3 summary format) | — | ✓ local | ✓ local (matrix, rebuilt) | — | — | — |
| 8 | `what-ai-actually-is-for-the-seat-where-decisions-stop` | ai-clarity | ✓ local (docx) | ✓ local (pptx, v3 summary format) | — | ✓ local | ✓ local (list) | — | — | — |
| 9 | `why-your-ai-pilot-went-nowhere` | ai-leadership | ✓ local (docx) | ✓ local (pptx, v3 summary format) | — | ✓ local | ✓ local (list) | — | — | — |
| 10 | `the-hours-you-lose-every-week-to-work-ai-could-handle` | ai-value | ✓ local (docx) | ✓ local (pptx, v3 summary format) | — | ✓ local | ✓ local (list) | — | — | — |
| 11 | `the-cfos-ai-question-is-a-capital-question` | ai-value | ✓ local (docx) | ✓ local (pptx, v3 summary format) | — | ✓ local | ✓ local (list) | — | — | — |
| 12 | `ai-fiduciary-duty-what-boards-now-expect` | chiefs-briefing | ✓ local (docx) | ✓ local (pptx, v3 summary format) | — | ✓ local | ✓ local (list) | — | — | — |
| 13 | `ai-agents-before-you-hand-over-the-keys` | ai-governance | ✓ local (docx) | ✓ local (pptx, v3 summary format) | — | ✓ local | ✓ local (list) | — | — | — |
| 14 | `reactive-leadership-is-a-margin-problem` | second-seat | ✓ local (docx) | ✓ local (pptx, v3 summary format) | — | ✓ local | ✓ local (list) | — | — | — |
| 15 | `brief-ai-like-you-brief-your-team` | ai-fluency | ✓ local (docx) | ✓ local (pptx, v3 summary format) | — | ✓ local | ✓ local (list) | — | — | — |
| 16 | `what-to-tell-your-team-about-ai-and-their-jobs` | ai-leadership | — | — | — | — | — | — | — | — |
| 17 | `ai-in-the-clinic-what-stays-human` | ai-governance | — | — | — | — | — | — | — | — |

17 published briefings as of 2026-09-03. The 15 banked drafts join this table as they publish.

**Row 16 added 2026-08-24 on publish, per rule 4. No asset built yet.** It is the first row where gate 1 (published) has cleared and gate 2 (headline approved as text) has not, so nothing downstream starts until Michael approves a cover headline. **Its Session notes cell is `—` deliberately:** rule 8's open question ("whether row 16 gets one automatically is Michael's call") is now live rather than hypothetical, and it is still unanswered, so the deck was not assumed.

**Row 17 added 2026-09-03 on publish, per rule 4. No asset built yet.** Same state as row 16: gate 1 cleared, gate 2 open, nothing downstream started, Session notes left `—` pending rule 8's unanswered question. **Two rows now sit waiting on the same thing**, which is a cover headline approved as text. Rule 2 puts row 16 first in production order regardless, since it published earlier. It is the first row whose cover is `ai-governance` since row 13, so the background will have had a rest by the time it is built.

## Asset locations

**Settled 2026-07-29: Google Drive. Restructured 2026-08-01 to one folder per briefing**, because a post now carries several documents and filing by asset type scattered them.

```
content\sources\<slug>\                               editorial source, TRACKED
  script.md
  session-notes.json
  infographic.json
content\social\<publish-date>_<cover-id>_<slug>\      deliverables, gitignored, LOCAL ONLY
```

**Drive is retired as the destination. Changed 2026-08-14.** Briefing folders stay where they are built. They are not moved to Drive and, for now, they are not pushed to GitHub either: `content/social/` stays gitignored. There is no longer a "move it across" step at the end of a build, and `✓ local` is the terminal state for an asset rather than a waiting room.

> **This leaves the deliverables with no backup at all.** 23MB of finished assets in `content/social/` and 9.1MB of irreplaceable cover art in `content/backgrounds/` now exist in exactly one place, on one machine, with Drive removed and git not holding them. The art is the sharper loss, because nothing regenerates it. A periodic copy to any second location would close this, and it is worth doing before a launch rather than after an incident.

**Covers are also collected in one place.** `content/social/_covers/` holds a copy of every cover built, flat, same filenames. Added 2026-08-13 because the covers will be needed as a set for the reader-path work in `TASKS.md` #16, and hunting them out of fifteen briefing folders later is wasted effort. **`scripts/cover.mjs` writes both copies itself as of 2026-08-14.** It was a manual step before that and was missed twice in two days while this file claimed it happened automatically, so `_covers/` silently held superseded art. Never copy one by hand; rebuild the cover.

**Sources are not deliverables. Split 2026-08-13.** The script markdown and the deck spec are editorial work no command can regenerate, so they are tracked in git and never go to Drive. Only the built files move: cover, script docx, infographic, deck.

**Agents have not touched Drive since 2026-08-13, and as of 2026-08-14 nobody does.** The full asset set for one briefing is built in a single sitting into its folder and stays there. No mount copy, no upload, no deletion after production.

The folder naming convention is kept even though Drive is gone: it sorts briefings into queue order in any file browser, which is the property that made it useful in the first place.

Cover, script, infographic, and session notes for one briefing all live in its folder. Files inside carry an asset-type token, `<publish-date>_<TYPE>_<cover-id>_<slug>.<ext>` where `TYPE` is `COVER`, `SCRIPT`, `INFOGRAPHIC`, or `SESSION-NOTES`. Sorting folders by name still reproduces this queue's order. Covers ship as JPEG quality 100; the script ships as `.docx`, because markdown is not a shooting format.

**Videos are not in Drive.** They stay on Michael's machine because of their size.

A row marked `✓ local` means the asset is built and finished. It is not waiting for anything.

## Cover headlines

**Added 2026-08-13.** The headline that shipped on a cover exists nowhere but inside the JPEG, which is on Drive and unreadable as text. The Instagram script needs it: the STOP line answers to the cover headline, because the cover is that video's poster frame (`SCRIPT_GUIDE.md` § STOP).

So the cover agent records it here on delivery, and the script agent reads it here. One row per built cover.

**All seven rewritten and approved 2026-08-13** against the stranger test and the three ways a headline lies. Only row 1 survived the pass unchanged, and only row 1 kept a subhead.

| # | Slug | Headline | Subhead |
|---|------|----------|---------|
| 1 | `ai-governance-the-risk-is-already-inside` | Your Staff Already Wrote Your AI Policy | You Just Have Not Read It Yet |
| 2 | `territory-not-tools-the-ai-opportunity-for-leaders` | Your AI Subscriptions Are Not a Strategy | none |
| 3 | `the-briefing-your-board-expects-you-to-have-had` | Your Board Wants an AI Position, Not an Opinion | none |
| 4 | `the-service-you-could-not-afford-to-offer-last-year` | AI Just Made the Work You Turn Down Profitable | none |
| 5 | `your-congregation-is-already-asking-about-ai` | Your Congregation Asked Someone Else About AI | none |
| 6 | `your-students-adopted-ai-before-your-policy-did` | Every Classroom Is Making Its Own AI Rules | none |
| 7 | `what-to-delegate-to-ai-and-what-to-never` | There Is Work You Should Never Hand to AI | none |
| 8 | `what-ai-actually-is-for-the-seat-where-decisions-stop` | AI Is a Pattern Engine, Not a Mind | none |
| 9 | `why-your-ai-pilot-went-nowhere` | Three Things Kill AI Pilots. Technology Is Not One. | none |
| 10 | `the-hours-you-lose-every-week-to-work-ai-could-handle` | AI Could Take Ten to Twenty Hours Off Your Week | none |
| 11 | `the-cfos-ai-question-is-a-capital-question` | Every AI Proposal Is a Capital Decision in Disguise | none |
| 12 | `ai-fiduciary-duty-what-boards-now-expect` | Boards Must Govern AI the Way They Govern Debt | none |
| 13 | `ai-agents-before-you-hand-over-the-keys` | An AI Agent Acts Under Your Name Without Asking You | none |
| 14 | `reactive-leadership-is-a-margin-problem` | Firefighting Is Not a Personality. It Is a Symptom. | none |
| 15 | `brief-ai-like-you-brief-your-team` | AI Is Not a Search Box. It Is a New Hire. | none |

**Rows 8, 10, 12 and 13 rewritten 2026-08-14** on Michael's review, each for a different fault, all four now recorded in `SOCIAL_GUIDE.md` § Four more ways a headline fails. Their covers were rebuilt against the new text and the flat set updated. Superseded: "Nobody Has Explained AI to You Without Selling Something" (a jab where clarity was the job), "Ten to Twenty Hours of Your Week Could Go to AI" (vague about what AI does with them), "AI Left the Innovation Agenda for the Fiduciary One" (a word the reader has to stop and parse), "An AI Agent Is Your Judgment, Running Unattended" (abstract, nothing to picture).

Superseded headlines, kept as worked examples of the three faults: "They Learned It in a Weekend" (unresolved referent), "Your Students Learned AI in a Weekend" (asserts something untrue), "You Are Handing AI the Wrong Work" (convicts the reader), "Your AI Policy Is Two Years Behind Your Students" (presupposes a policy exists).

Where a script is written before its cover, the script agent adds the row with the headline it implies, and the cover agent builds to it. Either order is fine. What is not fine is the two disagreeing.

## Notes

- **Session notes changed format 2026-08-14. Tested on row 1, approved, now the rule** (`SOCIAL_GUIDE.md` § Session Notes, rewritten). The deck is a detailed summary of the briefing, section by section, with everything on the slide: no speaker notes, no PDF, no film arc. Michael does not read a private notes layer, so the old two-layer design put the substance where nobody opened it and left the slides as one-line labels. Row 1's deck and PDF from 08-13 are superseded; the PDF is deleted and its replacement in Drive is the pptx alone.
  **Rows 2 to 14 rebuilt 2026-08-14**, the same day, once the format was approved. Every spec rewritten as a section-by-section summary, every deck rebuilt, and all thirteen superseded PDFs deleted. No slide overflowed and every body sits at the full 12.5pt. **Row 15 has no deck and correctly stays `—`**: it published after the 08-13 equipment pause, and rule 8 still holds for anything new.
  **Row 15 followed on request**, overriding the equipment pause for that row. See rule 8, which is now open rather than settled. At 7 sections and 9 slides it is the largest deck in the set, and the only one where the fitter stepped body type down, to 12pt on the mental-model slide.
  **Two shapes were proven in this pass that row 1 never exercised.** A 5-row slide works and looks deliberate, used for the question lists on rows 12 and 13. And a 4-row slide carrying a quote strip does not fit at any body length worth reading, which is the constraint already written into `SOCIAL_GUIDE.md`.
- **Row 15 built 2026-08-14**, cover plus script plus infographic, no session notes (paused). Its cover had been rendered earlier the same day but never logged and never copied to `_covers/`, so the headline was recovered by reading the JPEG and the set was completed around it. Two conventions moved with it, both reversible:
  - **Infographic specs are now tracked**, at `content/sources/<slug>/infographic.json`. The builder had written row 15's spec as a bare `.spec.json` *inside* the deliverables folder, which would have ridden along to Drive. Rows 1 to 14 kept no spec at all, so those graphics are not rebuildable from source. Same argument that made the script markdown and the deck spec tracked applies here: it is editorial work no command regenerates.
  - **Scripts do not use contractions, and `SCRIPT_GUIDE.md` says they should.** Measured across all fifteen: near zero in every one, row 15 included. The guide's line "contractions are correct here" has never been followed. Not fixed on row 15 alone, because that would make one script read differently from the other fourteen. Decide it once and either apply it to the corpus or drop the rule.
- **Row 1 rebuilt from scratch 2026-08-13**, the first full set produced in one sitting under the new workflow. Supersedes the assets uploaded 2026-07-28 and 08-01, which Michael should replace in Drive rather than sit alongside. Its spec and script markdown are tracked at `content/sources/ai-governance-the-risk-is-already-inside/`, so both are rebuildable and neither is stranded in gitignored staging. The old `content/session-notes/*.spec.json` is superseded and can be deleted. **The deck from that rebuild has since been superseded again**, by the 08-14 format change above.
- **Row 7's infographic was rebuilt 2026-08-13**, superseding the Delegation Matrix uploaded 2026-07-30 under the old workflow. Same archetype and same argument, rebuilt so the whole set is consistent and lives in one folder. Replace it in Drive rather than keeping both. It remains the only `matrix` in the corpus.
- **Cover coverage in the current queue:** ai-value ×4, ai-governance ×3, ai-fluency ×2, ai-leadership ×2, chiefs-briefing ×2, ai-clarity ×1, second-seat ×1. `second-seat` entered the queue at row 14 on 2026-08-03. `emerging-leader` still has no outing; its only briefing, `become-the-ai-authority-at-work-without-the-title`, is still a draft.
- Row 3 is the first to need a background other than a theme cover (`chiefs-briefing`), and row 8 is the only `ai-clarity` outing in the backlog.
