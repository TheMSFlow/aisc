# The Awakening — Topic Ledger
> Read `agent-guides/blog/BLOG_BRIEF.md` first.
> This is the single source of truth for what has been written, what is reserved, and how briefings link to each other. **No briefing gets drafted without a row here first.** The ledger exists to prevent the two failure modes that kill blogs at scale: duplicate topics and orphaned posts.

---

## Rules

1. **Reserve before writing.** Before drafting, add a row to the Pipeline table with the primary query and angle. If the primary query overlaps an existing row (published or reserved), stop: strengthen the existing piece or find a genuinely different query. Two briefings must never target the same primary query.
2. **Confirm at publish.** When a post ships (`draft: false`), move its row from Pipeline to Published and fill every column.
3. **The link graph is derived, never hand-maintained.** Run `node scripts/blog-links-report.mjs` to see actual internal links, inbound counts, and orphans; `--write` refreshes the generated section at the bottom of this file. Do not edit that section by hand.
4. **Primary query = the search a specific leader types.** Not a keyword soup. "AI policy for churches" is a primary query; "AI faith leadership" is not.
5. **Demand check at brief time.** Before reserving, spend five minutes validating the query family exists: web search the phrasing, check autocomplete variants, check the SERP for what currently ranks and whether the AISC seat-angle beats it. Note the strongest variant in the row.

## Linking Strategy (hub and spoke)

The category pages are the hubs; briefings are the spokes. Google ranks hubs that spokes point into, and spokes that hubs legitimize.

| Rule | Requirement |
|------|-------------|
| Sibling links | Every briefing links to **2+ sibling briefings** in-body, on natural anchor text |
| Reciprocity | When post B links to post A, check whether A should link back on the next refresh. Aim for pairs, not one-way chains |
| Orphan rule | **No briefing with zero inbound links.** The links report flags orphans; fixing them is part of publishing the next post (every new post should link to at least one under-linked sibling, not just the popular ones) |
| Hub anchors | Taxonomy chips and breadcrumbs handle hub linking automatically; in-body links to category pages are welcome where they read naturally |
| Anchor text | Descriptive of the destination ("the governance briefing"), never "click here" or a bare URL |
| Depth | Every briefing reachable within 2 clicks of `/awakening` (hub → category → post). Currently guaranteed by the taxonomy pages |

## Published

| Slug | Primary query | Angle (one line) | Theme | Cover | Audiences | Industries | Date |
|------|---------------|------------------|-------|-------|-----------|------------|------|
| `the-briefing-your-board-expects-you-to-have-had` | executive AI position for the board | An opinion is not a position; the board assumes you have the latter | AI Leadership | The Chief's Briefing | chiefs | business, finance | 2026-07-11 |
| `ai-governance-the-risk-is-already-inside` | employees using AI without approval | Ungoverned AI is already inside; the question is direction vs. drift | AI Governance | AI Governance | chiefs, leaders-of-leaders | business, government, healthcare | 2026-07-11 |
| `territory-not-tools-the-ai-opportunity-for-leaders` | how should a leader get started with AI | Start with the territory question, not the tool question: a 5-day first week | AI Value | AI Value | chiefs, emerging-leaders | business, creators, nonprofit | 2026-07-11 |
| `your-congregation-is-already-asking-about-ai` | AI for church leaders / pastors | The congregation's AI questions will be answered by someone; shepherd or stranger | AI Leadership | AI Leadership | chiefs | faith | 2026-07-11 |
| `your-students-adopted-ai-before-your-policy-did` | AI policy for schools | Students adopted AI first; how the middle seat closes the gap | AI Governance | AI Governance | leaders-of-leaders | education | 2026-07-11 |
| `the-service-you-could-not-afford-to-offer-last-year` | make money with AI small business / new AI service offers | AI moved services from unaffordable to offerable; three logs to find yours | AI Value | AI Value | chiefs, leaders-of-leaders | business, nonprofit | 2026-07-11 |
| `what-to-delegate-to-ai-and-what-to-never` | what should leaders delegate to AI | The delegation judgment: pattern work goes, judgment stays; a working discipline | AI Fluency | AI Fluency | chiefs, leaders-of-leaders | business, healthcare | 2026-07-12 |
| `what-ai-actually-is-for-the-seat-where-decisions-stop` | what is AI explained for leaders | Day 1 clarity in public: an honest, plain-language picture built for decision seats | AI Clarity | AI Clarity | chiefs | business | 2026-07-13 |
| `why-your-ai-pilot-went-nowhere` | why AI pilots fail | Pilots die of no owner, no territory, no standard; the tool was never the problem | AI Leadership | AI Leadership | chiefs, leaders-of-leaders | business | 2026-07-15 |
| `the-hours-you-lose-every-week-to-work-ai-could-handle` | how much time does AI save leaders | Run the margin audit: most leaders find 10 to 20 hours on paper, larger than expected | AI Value | AI Value | chiefs, leaders-of-leaders | business, finance | 2026-07-17 |
| `the-cfos-ai-question-is-a-capital-question` | CFO AI strategy | AI is an allocation problem: where margin moves, what gets funded, what gets stopped | AI Value | AI Value | chiefs | finance, business | 2026-07-28 |

## Pipeline (reserved)

Topics reserved from the current source material. Reserving is cheap; only genuinely intended topics belong here. Delete rows that stop making sense.

| Working slug | Primary query | Angle (one line) | Theme | Cover | Audiences | Industries | Status |
|--------------|---------------|------------------|-------|-------|-----------|------------|--------|
| `five-positions-a-leader-can-take-on-ai` | AI strategy positions for leaders | Optimizer, Producer, Advisor, Educator, Curator: which position fits your seat | AI Leadership | AI Leadership | chiefs, emerging-leaders | business, creators | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `become-the-ai-authority-at-work-without-the-title` | become the AI person at work | Influence before title: the emerging leader's route to being the one the room asks | AI Clarity | Emerging Leader | emerging-leaders | business, education | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `ai-fiduciary-duty-what-boards-now-expect` | AI fiduciary duty boards | AI moved from innovation agenda to fiduciary agenda; what oversight now means | AI Governance | The Chief's Briefing | chiefs | finance, business | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `ai-in-public-office-lead-the-agenda-or-answer-to-it` | AI policy for public officials | The official who gets clear first sets the agenda; the one who waits responds to someone else's | AI Leadership | AI Leadership | chiefs, leaders-of-leaders | government | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `the-trusted-voice-premium-ai-and-your-audience` | monetize AI as a creator / creator trust AI | AI made content abundant and trust scarce; the trusted-voice position pays | AI Value | AI Value | chiefs, emerging-leaders | creators | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `digital-ministry-reach-without-losing-the-shepherd` | AI digital ministry | Reach further with less friction without automating the sacred: the ministry value map | AI Value | AI Value | chiefs, leaders-of-leaders | faith | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `ai-in-the-clinic-what-stays-human` | AI clinical governance for healthcare executives | The lines that stay human in care, and how clinical leaders draw them early | AI Governance | AI Governance | chiefs, leaders-of-leaders | healthcare | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `the-nonprofit-leverage-moment` | AI for nonprofit leaders capacity | Abundance of intelligence is the first real leverage the sector has been offered | AI Value | AI Value | chiefs, leaders-of-leaders | nonprofit | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `what-to-tell-your-team-about-ai-and-their-jobs` | what to tell employees about AI and their jobs | The conversation leaders keep postponing; honesty as the only durable script | AI Leadership | AI Leadership | chiefs, leaders-of-leaders | business | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `the-data-line-what-never-goes-into-an-ai-tool` | what data is safe to put into AI tools | Task delegation has a data twin: the always-on line for sensitive information | AI Governance | AI Governance | chiefs, leaders-of-leaders | business, healthcare, finance | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `brief-ai-like-you-brief-your-team` | how to give AI instructions as a leader | Briefing is a leadership skill leaders already have: role, context, deliverable | AI Fluency | AI Fluency | leaders-of-leaders, chiefs | business | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `ai-agents-before-you-hand-over-the-keys` | what are AI agents for business leaders | Automate, Augment, Agency: what the third mode requires before it is safe | AI Governance | AI Governance | chiefs, leaders-of-leaders | business, finance | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `the-discernment-checklist-before-you-trust-an-ai-output` | how to verify AI output before using it | Four questions after every output; confidence is not a signal of correctness | AI Fluency | AI Fluency | leaders-of-leaders, emerging-leaders | business, finance | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `before-you-sign-a-leaders-ai-vendor-questions` | how to evaluate AI vendors as a leader | Diligence for non-technical buyers: the questions that expose weak AI products | AI Governance | AI Governance | chiefs, leaders-of-leaders | business, healthcare | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `the-school-leaders-ai-position-beyond-the-cheating-debate` | AI strategy for school leaders | The cheating frame shrinks the question; the school leader's real AI position | AI Leadership | AI Leadership | chiefs, leaders-of-leaders | education | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `the-care-hours-buried-in-healthcare-paperwork` | reduce administrative burden in healthcare with AI | Healthcare's margin audit: patterned admin absorbs care hours; reclaiming them deliberately | AI Value | AI Value | leaders-of-leaders, chiefs | healthcare | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `write-your-personal-ai-policy-before-someone-writes-it-for-you` | personal AI policy for leaders | Org policies say what is forbidden; your standard says what you refuse even unwatched | AI Governance | AI Governance | chiefs, emerging-leaders | business, education | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `you-cannot-keep-up-with-ai-stop-trying` | how to keep up with AI overwhelmed | Currency is a losing race; clarity is the durable asset; the curator's discipline | AI Clarity | AI Clarity | chiefs, emerging-leaders | business, creators | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `your-organizations-ai-gap-is-a-literacy-gap` | AI literacy training for teams | Capability, not tools, is the gap; the leader's playbook for building it deliberately | AI Fluency | AI Fluency | leaders-of-leaders | business, education | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `reactive-leadership-is-a-margin-problem` | how to stop being a reactive leader | Firefighting is collapsed margins, not character; the AI-era route back to deliberate | AI Value | The Second Seat | leaders-of-leaders | business | banked (draft written 2026-07-12, awaiting review + staggered publish) |
| `relationships-beat-reach-in-the-ai-ecosystem` | networking in the AI era for leaders | Access went abundant; judgment exchange is what relationships now trade on | AI Leadership | AI Leadership | chiefs, emerging-leaders | business, creators | banked (draft written 2026-07-12, awaiting review + staggered publish) |

## Retired / redirected

| Slug | What happened | Where it points now |
|------|---------------|---------------------|
| (none yet) | | |

<!-- LINKS-REPORT:START — generated by scripts/blog-links-report.mjs, do not edit -->

## Link graph (generated)

Posts scanned: 32  (generated 2026-07-28)

| Post | Out → siblings | Out → categories | In ← siblings | Flags |
|------|----------------|------------------|---------------|-------|
| `ai-agents-before-you-hand-over-the-keys` | `what-to-delegate-to-ai-and-what-to-never`, `ai-governance-the-risk-is-already-inside` | — | 0 | draft |
| `ai-fiduciary-duty-what-boards-now-expect` | `ai-governance-the-risk-is-already-inside`, `the-briefing-your-board-expects-you-to-have-had` | — | 0 | draft |
| `ai-governance-the-risk-is-already-inside` | `your-students-adopted-ai-before-your-policy-did`, `your-congregation-is-already-asking-about-ai`, `the-briefing-your-board-expects-you-to-have-had` | — | 23 | OK |
| `ai-in-public-office-lead-the-agenda-or-answer-to-it` | `ai-governance-the-risk-is-already-inside`, `your-students-adopted-ai-before-your-policy-did` | — | 0 | draft |
| `ai-in-the-clinic-what-stays-human` | `what-to-delegate-to-ai-and-what-to-never`, `ai-governance-the-risk-is-already-inside` | — | 0 | draft |
| `become-the-ai-authority-at-work-without-the-title` | `territory-not-tools-the-ai-opportunity-for-leaders`, `ai-governance-the-risk-is-already-inside`, `your-students-adopted-ai-before-your-policy-did` | — | 0 | draft |
| `before-you-sign-a-leaders-ai-vendor-questions` | `ai-governance-the-risk-is-already-inside`, `what-to-delegate-to-ai-and-what-to-never` | — | 0 | draft |
| `brief-ai-like-you-brief-your-team` | `what-to-delegate-to-ai-and-what-to-never`, `ai-governance-the-risk-is-already-inside` | — | 0 | draft |
| `digital-ministry-reach-without-losing-the-shepherd` | `what-to-delegate-to-ai-and-what-to-never`, `your-congregation-is-already-asking-about-ai` | — | 0 | draft |
| `five-positions-a-leader-can-take-on-ai` | `territory-not-tools-the-ai-opportunity-for-leaders`, `the-briefing-your-board-expects-you-to-have-had` | — | 0 | draft |
| `reactive-leadership-is-a-margin-problem` | `what-to-delegate-to-ai-and-what-to-never`, `ai-governance-the-risk-is-already-inside` | — | 0 | draft |
| `relationships-beat-reach-in-the-ai-ecosystem` | `your-congregation-is-already-asking-about-ai`, `territory-not-tools-the-ai-opportunity-for-leaders` | — | 0 | draft |
| `territory-not-tools-the-ai-opportunity-for-leaders` | `what-ai-actually-is-for-the-seat-where-decisions-stop`, `the-briefing-your-board-expects-you-to-have-had`, `what-to-delegate-to-ai-and-what-to-never`, `the-service-you-could-not-afford-to-offer-last-year`, `why-your-ai-pilot-went-nowhere`, `ai-governance-the-risk-is-already-inside` | — | 12 | OK |
| `the-briefing-your-board-expects-you-to-have-had` | `ai-governance-the-risk-is-already-inside`, `the-cfos-ai-question-is-a-capital-question`, `territory-not-tools-the-ai-opportunity-for-leaders` | — | 8 | OK |
| `the-care-hours-buried-in-healthcare-paperwork` | `what-to-delegate-to-ai-and-what-to-never`, `ai-governance-the-risk-is-already-inside` | — | 0 | draft |
| `the-cfos-ai-question-is-a-capital-question` | `the-hours-you-lose-every-week-to-work-ai-could-handle`, `territory-not-tools-the-ai-opportunity-for-leaders`, `ai-governance-the-risk-is-already-inside`, `the-briefing-your-board-expects-you-to-have-had` | — | 1 | OK |
| `the-data-line-what-never-goes-into-an-ai-tool` | `ai-governance-the-risk-is-already-inside`, `what-to-delegate-to-ai-and-what-to-never` | — | 0 | draft |
| `the-discernment-checklist-before-you-trust-an-ai-output` | `the-briefing-your-board-expects-you-to-have-had`, `what-to-delegate-to-ai-and-what-to-never` | — | 0 | draft |
| `the-hours-you-lose-every-week-to-work-ai-could-handle` | `what-to-delegate-to-ai-and-what-to-never`, `territory-not-tools-the-ai-opportunity-for-leaders`, `the-service-you-could-not-afford-to-offer-last-year` | — | 2 | OK |
| `the-nonprofit-leverage-moment` | `what-to-delegate-to-ai-and-what-to-never`, `the-service-you-could-not-afford-to-offer-last-year`, `territory-not-tools-the-ai-opportunity-for-leaders` | — | 0 | draft |
| `the-school-leaders-ai-position-beyond-the-cheating-debate` | `your-students-adopted-ai-before-your-policy-did`, `what-to-delegate-to-ai-and-what-to-never`, `ai-governance-the-risk-is-already-inside` | — | 0 | draft |
| `the-service-you-could-not-afford-to-offer-last-year` | `ai-governance-the-risk-is-already-inside`, `territory-not-tools-the-ai-opportunity-for-leaders` | — | 5 | OK |
| `the-trusted-voice-premium-ai-and-your-audience` | `territory-not-tools-the-ai-opportunity-for-leaders`, `your-congregation-is-already-asking-about-ai` | — | 0 | draft |
| `what-ai-actually-is-for-the-seat-where-decisions-stop` | `what-to-delegate-to-ai-and-what-to-never`, `ai-governance-the-risk-is-already-inside`, `the-briefing-your-board-expects-you-to-have-had` | — | 1 | OK |
| `what-to-delegate-to-ai-and-what-to-never` | `ai-governance-the-risk-is-already-inside`, `the-hours-you-lose-every-week-to-work-ai-could-handle`, `territory-not-tools-the-ai-opportunity-for-leaders`, `the-service-you-could-not-afford-to-offer-last-year` | — | 18 | OK |
| `what-to-tell-your-team-about-ai-and-their-jobs` | `what-to-delegate-to-ai-and-what-to-never`, `ai-governance-the-risk-is-already-inside` | — | 0 | draft |
| `why-your-ai-pilot-went-nowhere` | `territory-not-tools-the-ai-opportunity-for-leaders`, `the-service-you-could-not-afford-to-offer-last-year`, `ai-governance-the-risk-is-already-inside` | — | 1 | OK |
| `write-your-personal-ai-policy-before-someone-writes-it-for-you` | `ai-governance-the-risk-is-already-inside`, `what-to-delegate-to-ai-and-what-to-never` | — | 0 | draft |
| `you-cannot-keep-up-with-ai-stop-trying` | `what-to-delegate-to-ai-and-what-to-never`, `your-congregation-is-already-asking-about-ai` | — | 0 | draft |
| `your-congregation-is-already-asking-about-ai` | `ai-governance-the-risk-is-already-inside`, `the-briefing-your-board-expects-you-to-have-had` | — | 5 | OK |
| `your-organizations-ai-gap-is-a-literacy-gap` | `what-to-delegate-to-ai-and-what-to-never`, `ai-governance-the-risk-is-already-inside` | — | 0 | draft |
| `your-students-adopted-ai-before-your-policy-did` | `ai-governance-the-risk-is-already-inside`, `territory-not-tools-the-ai-opportunity-for-leaders` | — | 4 | OK |

✓ All posts clean.

<!-- LINKS-REPORT:END -->
