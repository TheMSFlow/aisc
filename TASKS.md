# Setup Tasks — The Awakening blog + pending features

> Single source of truth for what remains before the blog system (and personalize) is fully operational.
> Maintained by the `tasks` agent. Tasks are in **exact execution order** — do the first unchecked one.
> Owner key: **[You]** = only Michael can do it · **[Claude]** = ask Claude to do it · **[You→Claude]** = you provide something, then Claude builds.
>
> Last updated: 2026-08-05

## Phase 0 — This week (time-sensitive or blocking everything else)

- [x] 3. **[You→Claude] Merge `dev` → `main` and deploy.** *(done — confirmed 2026-07-24)*
  The blog is live in production.

- [x] 6. **[You] Google Search Console.** *(done — confirmed 2026-07-24)*
  Domain verified, sitemap submitted. Query data now accumulating.

## Phase 1 — Foundations for leads (next 2–3 weeks)

- [x] 7. **[You→Claude] Finish personalize email with Resend.** *(built 2026-07-24)*
  intelligence owns the send + data (not aisc), reusing its Resend. Optional "Email me this recommendation" button after the on-page result. Every real completion is stored in Supabase `aisc_personalize`; email enriches the row. Built both sides: intelligence endpoints A (insert) + B (send), libs in `src/lib/aisc/personalize/`; aisc route posts the completion and the results view offers the email. **Before it works, you must:** run the `aisc_personalize` SQL in Supabase, `npm install` in intelligence (adds `zod`), and set `ECOSYSTEM_INTERNAL_KEY` (both repos) + `PERSONALIZE_IP_SALT` (intelligence). Then run the end-to-end verification.

- [ ] 8. **[You→Claude] Blog email capture — the "briefing list".** *(after #7, reuses Resend)*
  A subscribe block on the blog (footer and/or end of articles). A first-time SEO visitor rarely buys a $99–$1,099 program on that visit; the list is where unconverted readers go instead of vanishing.

- [ ] 9a. **[You→Claude] Social production: YouTube + LinkedIn + Instagram.** *(split from the old #9 on 2026-07-28; runs independently of 9b)*
  **Claude's scope is the video cover (Instagram), the infographic (LinkedIn, only where the piece has structure worth visualizing), and the session notes deck (YouTube).** Michael produces the video, writes the post, and posts manually.
  **YouTube added 2026-08-01.** Every published briefing gets a 15-minute-plus long-form video, recorded from a session notes deck (`node scripts/session-notes.mjs`, spec in `SOCIAL_GUIDE.md` § Session Notes). Instagram and LinkedIn get summaries and excerpts cut down from it, by Michael. The video title tracks the ledger's primary query, which is the opposite of what a cover headline does. `utm_source=youtube` is now part of the convention.
  **Drive restructured 2026-08-01:** one folder per briefing at `SOCIAL MEDIA\<date>_<cover>_<slug>\`, holding every asset for that post, with an asset-type token in each filename. The old per-type folders are gone. Videos stay local, not in Drive.
  **First session notes shipped 2026-08-01:** row 1, `ai-governance-the-risk-is-already-inside`. Deck plus notes-pages PDF, both verified in Drive. Posting Mon/Wed/Fri, working the **published** backlog least-recent-first, tiebroken by inbound links. Carousels join later once the routine holds.
  Post spec settled 2026-07-28: standalone value not a teaser, ~900–1,300 characters, hook must survive the ~200-character "see more" fold, and **the link always goes in the first comment, never the post body**.
  **Taxonomy landed 2026-07-28:** every post now carries `theme` (5, user-facing on the blog) and `cover` (8, social-only, picks the video-cover background). See `agent-guides/blog/BLOG_BRIEF.md` § Themes and § Covers.
  **Settled 2026-07-28:** the 8 cover backgrounds are in `content/backgrounds/` (gitignored, filename = cover id), the design spec is in `agent-guides/blog/SOCIAL_GUIDE.md`, and the UTM convention is fixed (`utm_source` linkedin/instagram · `utm_medium` social · `utm_campaign` briefing-&lt;slug&gt; · `utm_content` video/infographic/carousel).
  The queue and manifest are stubbed at `agent-guides/blog/DISTRIBUTION_LOG.md` (11 published briefings in production order, no assets made yet).
  **Still open, to settle on the first test run:** where finished assets are stored, the infographic-vs-pull-quote fallback rule, and the cover typeface.

- [ ] 9b. **[You→Claude] Email the list per published briefing.** *(blocked on #8 — there is no list yet)*
  Each published piece becomes one email. For months 1–6, owned channels — not SEO — are where visitors come from.

## Phase 2 — Production run (ongoing from now)

- [ ] 10. **[Claude] Publish the banked pipeline at 3/week (Mon/Wed/Fri).**
  Drafting DONE 2026-07-12: all briefings banked as `draft: true`. Drip ran Mon 2026-07-13 `what-ai-actually-is-for-the-seat-where-decisions-stop`, Wed 2026-07-15 `why-your-ai-pilot-went-nowhere`, Fri 2026-07-17 `the-hours-you-lose-every-week-to-work-ai-could-handle`.
  **Drip STALLED after 07-17: slots Mon 07-20, Wed 07-22, Fri 07-24 missed.** No public/SEO cost — all remaining were still `draft: true`, so nothing shipped-then-vanished. Do NOT backdate and do NOT bulk-publish to "catch up" (breaks the one-post-one-push rule in #9).
  **RESTARTED 2026-07-28** with `the-cfos-ai-question-is-a-capital-question`. The Mon 07-27 slot slipped a day; published Tue 07-28 dated 07-28 (not backdated) → **11 published + 21 banked = 32 in ledger**. Two link fixes shipped with it: its "margin audit" anchor was re-pointed from `what-to-delegate…` to `the-hours-you-lose…` (the draft predated that piece), and `the-briefing-your-board-expects-you-to-have-had` now links in, clearing the orphan flag.
  Per-post routine: Michael reviews → flip `draft: false` → set `date` to actual publish day → ledger row to Published → clean `npm run blog:links --write` → distribute per #9.
  **Published Thu 2026-07-30:** `ai-fiduciary-duty-what-boards-now-expect`. The Wed 07-29 slot slipped a day; published 07-30 dated 07-30, **not backdated**, which #10 already allowed for ("spacing to Thu 07-30 is fine if the two chief/finance pieces feel stacked"). Landed the day the Jul 30 – Aug 5 cohort opened. → **12 published + 20 banked = 32 in ledger.** It would have shipped as an orphan, so the CFO piece gained an inbound link on its board-question close; graph clean.
  **Published Fri 2026-07-31:** `ai-agents-before-you-hand-over-the-keys`, on slot, dated 07-31. → **13 published + 19 banked = 32 in ledger.** Shipped with three edits: the opener's capability claim now carries the "as of mid-2026" date anchor the research guide requires; a paragraph was added naming what an agent boundary document actually contains (the draft asserted boundary-writing was the leadership work without ever saying what a boundary holds); and it gained an outbound to the fiduciary piece, which was on 1 inbound. Its own inbound came from `what-to-delegate-to-ai-and-what-to-never` (the standards-you-write-here sentence in the pattern-work section), making that pair reciprocal. Graph clean.
  **Published Mon 2026-08-03:** `reactive-leadership-is-a-margin-problem`, on slot, dated 08-03. → **14 published + 18 banked = 32 in ledger.** First `second-seat` cover in the social queue (row 14). Shipped with three edits: its "one-question audit" reference now links to `the-hours-you-lose-every-week-to-work-ai-could-handle` (the draft predated that piece and reproduced its audit without crediting it), that piece links back on its "not a personality flaw" line, which cleared the orphan and made the pair reciprocal; and a paragraph was added on protecting margin *upward*, because the draft told a middle-seat reader to calendar immovable blocks without ever acknowledging they do not fully own their calendar. Body moved from ~1,000 words (at the `insight` floor) to ~1,100. Graph clean.
  **Published Wed 2026-08-05:** `brief-ai-like-you-brief-your-team`, on slot, dated 08-05. → **15 published + 17 banked = 32 in ledger.** Second `ai-fluency` cover in the social queue (row 15). Shipped with four edits: the body was **1,000 words, under the 1,200 floor `BLOG_BRIEF` sets for `guide`**, so two sections of real substance were added rather than padding — a full worked brief written out end to end (the guide described role/context/deliverable in fragments but never showed one complete brief a reader could copy the shape of), and a "where the analogy breaks" paragraph, because the piece's own capable-new-hire metaphor invites the assumption that AI accumulates context the way a hire does, carrying the "as of mid-2026" date anchor on the memory-features claim. Body now ~1,540 words. It also gained an outbound to `what-ai-actually-is-for-the-seat-where-decisions-stop` (was on 1 inbound, now 2). Its own inbound came from the reactive piece's "what AI absorbs under direction" sentence as planned, and it links back on its one-task close, making the pair reciprocal. Graph clean.
  **Next slots:** Fri 08-07, suggested `what-to-tell-your-team-about-ai-and-their-jobs` (**zero inbound — add the inbound at publish**; the two natural sources are the reactive piece's "narrate it" line in the push-the-discipline-downward move, and `what-to-delegate-to-ai-and-what-to-never`, where the pattern-work/judgment split is exactly what a worried team is really asking about). Reasoning: `ai-leadership` has not had an outing since 07-15, five publishes ago, and the piece follows the fluency briefing naturally, since the leader who starts directing AI is the leader whose team starts asking what it means for them. **Industry breadth is the gap to fix next week:** everything published since 07-28 has been business/finance, and faith, education, government, healthcare, nonprofit, and creators have had nothing since 07-11. Mon 08-10 should go to one of those. Optional: a temporary 4th day/week for ~2 weeks to seed pieces around the Jul 30–Aug 5 cohort. Bank lasts ~6 weeks; refill comes from cohort exhaust (#14) and Search Console (#12), never invented topics.

- [ ] 11. **[You] Log the Jul 30 – Aug 5 cohort into the capture doc.** *(uses #1)*
  Every live session. Repeat for every future cohort — this becomes standing practice, not a one-off.

## Phase 3 — Data-informed expansion (at ~40 published briefings)

- [ ] 12. **[You→Claude] Data checkpoint + keyword-research agent.**
  With months of Search Console + GA conversion data, ask Claude to build the keyword-research agent guide (`agent-guides/blog/KEYWORD_GUIDE.md` + workflow): mine Search Console queries, find winnable long-tail seat/world intents, feed the ledger pipeline.

- [ ] 13. **[Claude] Expand toward 100 — data picks the topics.**
  Next ~60 briefings chosen from what converts and what Search Console shows, not from guesswork. Refresh cycle begins: ~30% of effort updates proven pieces (`updated` field) instead of writing new ones.

## Phase 4 — The river (never run out)

- [ ] 14. **[You→Claude] Cohort-exhaust production.**
  The capture doc (accumulating since #1) becomes a briefing source: anonymized questions, objections, and stories from real cohorts — 5–10 unique briefing seeds per cohort that no competitor can copy.

- [ ] 15. **[You] Backlink/authority push.**
  Podcast appearances, guest pieces, and cohort alumni sharing briefings. A young domain needs inbound links for the SEO flywheel to spin; content alone doesn't move domain authority.

---

## Done

- [x] Conversion events wired and verified end-to-end: `cta_click` (placement, destination), `personalize_start`, `personalize_complete` (seat); helper at `src/lib/analytics.js` — 2026-07-12
- [x] GA4 property created, `NEXT_PUBLIC_GA_ID` set — 2026-07-12
- [x] Production env vars confirmed (`NEXT_PUBLIC_SITE_URL`, `ANTHROPIC_API_KEY`) — 2026-07-12
- [x] Cohort-exhaust capture doc created in Google Drive: "AISC Cohort Exhaust — Capture Doc" (section per live session for the Jul 30 – Aug 5 cohort; Claude can read it via the Drive connector) — 2026-07-12
- [x] Blog system at /awakening (routes, MDX engine, taxonomy, SEO layer, RSS, sitemap) — 2026-07-11
- [x] Agent guide set at `agent-guides/blog/` (BLOG_BRIEF, CONTENT_GUIDE, RESEARCH_GUIDE, SEO_GUIDE) — 2026-07-11
- [x] 6 published briefings; every category page has content — 2026-07-11
- [x] Formats = pillars (insight/guide/value), `article` retired — 2026-07-11
- [x] Briefings footer + footer entry card; CTA removed from post bodies — 2026-07-11
- [x] TOPIC_LEDGER + link-graph script (`npm run blog:links`), graph clean — 2026-07-11
- [x] GA4 scaffold (env-gated) in root layout — 2026-07-11
