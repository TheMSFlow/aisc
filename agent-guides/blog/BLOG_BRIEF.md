# The Awakening — Blog Brief
> Read `agent-guides/AISC_BRIEF.md` first. This guide assumes that context.
> This is the foundation document for all blog work. Read it before any blog task: writing, research, SEO, or UI.

---

## What The Awakening Is

The Awakening is the public thought-leadership arm of the AI Stakeholder Challenge, published at `/awakening`. It exists to reach leaders across industries who have not yet found AISC, wake them up to what AI means for their seat, and move them toward the challenge.

Its three content pillars, in order:

1. **AI awareness and getting started.** The honest first conversation about AI for leaders who have heard everything and decided nothing.
2. **The danger of ungoverned AI.** What it costs an organization, congregation, constituency, or audience when AI adoption happens without leadership direction or governance.
3. **The rare opportunity.** The territory AI has opened in every leader's world, and why it goes to whoever claims it deliberately first.

**Distribution model:** SEO first. Every article is written to be found by a leader searching for answers, then to earn enough trust to bring them to AISC.

## Naming: do not conflate these

"The Awakening" names two different things in this project. Never mix them up:

| Surface | What it is | Where |
|---------|-----------|-------|
| The Awakening (blog) | Public article hub, this system | `/awakening`, content in `content/awakening/` |
| The Awakening (briefing) | 13-slide executive briefing slideshow, plus a private briefing offer in the personalize catalog | Homepage hero, `src/components/awakening/`, `src/lib/personalize/catalog.js` |

Blog work never modifies the slideshow or the catalog offer. Articles may link to the homepage but never claim to BE the executive briefing.

**How to refer to the blog:** "The Awakening" is the masthead name; it appears on the blog hub itself and as an eyebrow label. Everywhere else (buttons, CTAs, the global footer, nav, links from other pages, social copy) the blog is referred to as **"Briefings"** and each post is **"a briefing"**. Write "Read the briefing", "All briefings", "Briefings for the AI era". Never "read our blog post" or "visit The Awakening" in a button.

## Audience Priority

Same as the rest of the site: **Chiefs first**, Leaders of Leaders second, Emerging Leaders third. Every article names at least one audience in frontmatter. When an article serves several audiences, its framing and examples lead with the most senior audience it targets. See `COPY_GUIDE.md` § Audience-Specific Copy Angles for the full profiles and internal monologues.

## Taxonomy

The canonical machine-readable taxonomy lives in `src/lib/blog/taxonomy.js`. This table mirrors it for convenience; **the code file is the source of truth**. If they ever disagree, the code wins and this table must be corrected.

### Audiences (`audiences` in frontmatter)

| ID | Label | URL |
|----|-------|-----|
| `chiefs` | Chiefs | `/awakening/for/chiefs` |
| `leaders-of-leaders` | Leaders of Leaders | `/awakening/for/leaders-of-leaders` |
| `emerging-leaders` | Emerging Leaders | `/awakening/for/emerging-leaders` |

### Industries (`industries` in frontmatter)

| ID | Label | URL |
|----|-------|-----|
| `business` | Business & Corporate | `/awakening/industry/business` |
| `faith` | Faith & Ministry | `/awakening/industry/faith` |
| `government` | Government & Politics | `/awakening/industry/government` |
| `creators` | Creator Economy & Media | `/awakening/industry/creators` |
| `healthcare` | Healthcare | `/awakening/industry/healthcare` |
| `education` | Education | `/awakening/industry/education` |
| `nonprofit` | Nonprofit | `/awakening/industry/nonprofit` |
| `finance` | Finance | `/awakening/industry/finance` |

### Themes (`theme` in frontmatter)

**The user-facing browse dimension.** Exactly one per post. Themes replaced formats in July 2026, because three formats left governance and leadership without a home.

| ID | Label | What belongs here | URL |
|----|-------|-------------------|-----|
| `ai-clarity` | AI Clarity | Explains AI itself: what it is, what it is not, what the moment asks | `/awakening/theme/ai-clarity` |
| `ai-fluency` | AI Fluency | Working with AI deliberately: directing, delegating, verifying, briefing | `/awakening/theme/ai-fluency` |
| `ai-value` | AI Value | Margin, revenue, new offers, territory: the money AI opens in the reader's world | `/awakening/theme/ai-value` |
| `ai-governance` | AI Governance | Risk, data lines, policy, vendor diligence, oversight | `/awakening/theme/ai-governance` |
| `ai-leadership` | AI Leadership | The position the leader takes and the direction they set | `/awakening/theme/ai-leadership` |

**The Clarity/Leadership line:** Clarity helps the reader *see* AI. Leadership helps them *stand on it*. A piece telling a leader to take a position is Leadership even when it opens by explaining something.

### Covers (`cover` in frontmatter)

**Social media only.** Picks the video-cover background for LinkedIn and Instagram assets. Never rendered on the site, never a URL. Exactly one per post.

Five mirror the themes (`ai-clarity`, `ai-fluency`, `ai-value`, `ai-governance`, `ai-leadership`) and are the default: `cover` usually equals `theme`.

Three are the audience-dedicated lines, used **only when the piece's subject is that seat itself**, not merely when it targets that audience:

| ID | Cover reads | For pieces about |
|----|-------------|------------------|
| `chiefs-briefing` | The Chief's Briefing | The chief's own accountability: the board, fiduciary duty, the seat where the decision stops |
| `second-seat` | The Second Seat | The Leader of Leaders' squeeze: accountable upward, directing downward |
| `emerging-leader` | Emerging Leader | The emerging leader's problem: influence before mandate |

**These three names are social-only.** On the blog these audiences stay **Chiefs**, **Leaders of Leaders**, and **Emerging Leaders**, under `audiences` and `/awakening/for/*`. Never use the cover names in site copy.

### Formats (`type` in frontmatter) — internal only

Formats were retired from the user-facing surface in July 2026: no routes, no chips, no OG eyebrow. The field is still required and still validated, retained for historical continuity and nothing else. The old `/awakening/type/*` pages permanently redirect (308) to their pillar themes. Length guidance still keyed to format:

| ID | Was | Length guidance |
|----|-----|-----------------|
| `insight` | AI Clarity | 1,000–1,800 words |
| `guide` | AI Fluency | 1,200–2,500 words |
| `value` | AI Value | 1,200–2,000 words |

The `article` format was retired earlier in July 2026 and folded into `insight`. Never use it in frontmatter; the build rejects it.

## URL Map

| Page | URL | Generated from |
|------|-----|----------------|
| Hub | `/awakening` | `src/app/awakening/page.js` |
| Article | `/awakening/<slug>` | `content/awakening/<slug>.mdx` |
| Industry page | `/awakening/industry/<id>` | taxonomy |
| Audience page | `/awakening/for/<id>` | taxonomy |
| Theme page | `/awakening/theme/<id>` | taxonomy |
| RSS feed | `/awakening/feed.xml` | all published posts |

Retired July 2026: `/awakening/type/insight|guide|value` → 308 permanent redirect to `/awakening/theme/ai-clarity|ai-fluency|ai-value` (`next.config.mjs`).

Article slugs must never be `industry`, `for`, `theme`, `type`, or `feed` (reserved route segments; the frontmatter validator enforces this).

## What The Awakening Is NOT

- **Not a tool review site.** Never rank AI products, compare vendors, or publish "10 best AI tools" content.
- **Not a news desk.** Do not chase model releases or industry announcements. Write about what a development means for leadership, or do not write about it.
- **Not hype.** No breathless futurism, no doom-bait. The register is the trusted advisor from `COPY_GUIDE.md` § Brand Voice.
- **Not a technical publication.** No jargon: no "LLMs," "prompting," "tokens," or "fine-tuning" without plain-language grounding. Same rule as site copy.
- **Not a content mill.** One strong article beats three thin ones. Thin content damages the domain that AISC conversion depends on.

## The Blog Agent Workflow

Every blog task starts here, then reads the guide for its role:

| Task | Read |
|------|------|
| Planning or briefing an article | This file + `TOPIC_LEDGER.md` + `SEO_GUIDE.md` |
| Researching a topic or verifying claims | `RESEARCH_GUIDE.md` |
| Writing or editing an article | `CONTENT_GUIDE.md` + `COPY_GUIDE.md` |
| Titles, descriptions, internal links, metadata | `SEO_GUIDE.md` + `TOPIC_LEDGER.md` |
| Blog UI or route work | `DESIGN_GUIDE.md` + this file |

**Hard rule:** no briefing is drafted without a reserved row in `TOPIC_LEDGER.md` (topic dedupe + demand check happen there), and no briefing ships without a clean run of `node scripts/blog-links-report.mjs` (no orphans, no broken links, 2+ sibling links).
