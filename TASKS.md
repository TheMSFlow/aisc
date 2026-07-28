# Setup Tasks — The Awakening blog + pending features

> Single source of truth for what remains before the blog system (and personalize) is fully operational.
> Maintained by the `tasks` agent. Tasks are in **exact execution order** — do the first unchecked one.
> Owner key: **[You]** = only Michael can do it · **[Claude]** = ask Claude to do it · **[You→Claude]** = you provide something, then Claude builds.
>
> Last updated: 2026-07-28

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

- [ ] 9. **[You] Establish the distribution habit.**
  Decide the per-briefing routine: each published piece becomes at least one LinkedIn post from Michael + one email to the list. For months 1–6, owned channels — not SEO — are where visitors come from.

## Phase 2 — Production run (ongoing from now)

- [ ] 10. **[Claude] Publish the banked pipeline at 3/week (Mon/Wed/Fri).**
  Drafting DONE 2026-07-12: all briefings banked as `draft: true`. Drip ran Mon 2026-07-13 `what-ai-actually-is-for-the-seat-where-decisions-stop`, Wed 2026-07-15 `why-your-ai-pilot-went-nowhere`, Fri 2026-07-17 `the-hours-you-lose-every-week-to-work-ai-could-handle`.
  **Drip STALLED after 07-17: slots Mon 07-20, Wed 07-22, Fri 07-24 missed.** No public/SEO cost — all remaining were still `draft: true`, so nothing shipped-then-vanished. Do NOT backdate and do NOT bulk-publish to "catch up" (breaks the one-post-one-push rule in #9).
  **RESTARTED 2026-07-28** with `the-cfos-ai-question-is-a-capital-question`. The Mon 07-27 slot slipped a day; published Tue 07-28 dated 07-28 (not backdated) → **11 published + 21 banked = 32 in ledger**. Two link fixes shipped with it: its "margin audit" anchor was re-pointed from `what-to-delegate…` to `the-hours-you-lose…` (the draft predated that piece), and `the-briefing-your-board-expects-you-to-have-had` now links in, clearing the orphan flag.
  Per-post routine: Michael reviews → flip `draft: false` → set `date` to actual publish day → ledger row to Published → clean `npm run blog:links --write` → distribute per #9.
  **Next slots:** Wed 07-29 `ai-fiduciary-duty-what-boards-now-expect` · Fri 07-31 `ai-agents-before-you-hand-over-the-keys`. Note 07-29 lands one day after the CFO piece; spacing to Thu 07-30 is fine if the two chief/finance pieces feel stacked. Optional: a temporary 4th day/week for ~2 weeks to seed pieces around the Jul 30–Aug 5 cohort. Bank lasts ~7 weeks; refill comes from cohort exhaust (#14) and Search Console (#12), never invented topics.

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
