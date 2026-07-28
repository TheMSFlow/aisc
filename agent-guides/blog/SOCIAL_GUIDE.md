# Social Production Guide — LinkedIn & Instagram

> Read `agent-guides/blog/BLOG_BRIEF.md` first for the theme and cover taxonomy.
> The voice rules in `agent-guides/COPY_GUIDE.md` apply to every word that leaves this system, including cover headlines and captions. Forbidden Phrases table and the em-dash ban included. No exceptions for social.

This guide covers the assets made **from** published briefings. It does not govern the blog itself.

---

## The Pipeline

One published briefing produces, on request and one at a time:

| Asset | Platform | Made by |
|-------|----------|---------|
| **Video cover** | Instagram | **Claude** |
| **Infographic** | LinkedIn | **Claude**, only where the briefing has structure worth visualizing |
| Video | Instagram, LinkedIn | Michael. Claude supplies **key points** on request, never a script |
| Post copy | Both | Michael, written to the spec below |
| Posting, scheduling, first comment | Both | Michael, manually |
| Carousel | LinkedIn | Later, once the routine holds. Template pending |

**Claude's job is the cover image and the infographic.** Everything else is Michael's, handled manually. Offer the rest only when asked.

**Assets are never produced in batch.** Each is built when Michael asks for it, against the queue below.

## The Queue

**The queue lives in `agent-guides/blog/DISTRIBUTION_LOG.md`.** Read it before producing anything and update it after. Row order is production order.

Work the **published** backlog least-recent-first. Drafts are never distributed: a social post pointing at an unpublished slug is a 404 and burns the piece's launch.

Ties inside a publish date break by inbound link count from `node scripts/blog-links-report.mjs` (the pillar pieces everything links into go first), then slug alphabetical.

Posting runs Monday, Wednesday, Friday.

---

## Cover Anatomy

Portrait, one headline, one label. Every cover in the set shares the same four zones, top to bottom:

1. **Wordmark.** Logo mark plus `MICHAEL STEVE CLARITY STUDIO`, centered at the top, small uppercase with wide letterspacing. Identical on all eight.
2. **Headline.** The dominant element, upper-middle, left-aligned, bold, tight leading, generous left margin. Set from the briefing's title or a sharpened variant of it.
3. **Subhead** *(optional)*. One short line directly under the headline, small, sentence case, e.g. "For Leaders, It Is a Leadership Shift" or "A Definition Leaders Can Use". Omit where the headline already carries the whole thought.
4. **Label.** Small icon plus the cover `label`, centered at the foot, uppercase with wide letterspacing.

### The three families

Which family a cover belongs to is stored as `headline` on its `COVERS` entry in `src/lib/blog/taxonomy.js`.

| Family | `headline` | Covers | Treatment |
|--------|-----------|--------|-----------|
| **Field** | `light` | AI Value, AI Fluency, AI Clarity | White headline set directly on a solid colour ground. No panel, no gradient |
| **Paper** | `gradient-100` / `gradient-200` | AI Governance, AI Leadership | Off-white paper ground, headline set in the gradient, halftone dot motif lower right |
| **Card** | `card` | The Chief's Briefing, The Second Seat, Emerging Leader | Fluted vertical-stripe ground, white headline inside a translucent rounded panel with generous internal padding |

### Headline colour — fixed, not a judgment call

| Cover | Headline treatment |
|-------|--------------------|
| **AI Leadership** | `gradient-200` — `linear-gradient(90deg, #041986, #6368da)` |
| **AI Governance** | `gradient-100` — `linear-gradient(90deg, #860471, #6368da)` |

Both utilities are defined in `src/app/globals.css` under `@layer utilities`. Use the tokens, never hand-typed hex, so a brand change propagates.

The Field and Card families set the headline in white.

## Backgrounds

Source art lives in `content/backgrounds/`, which is **gitignored**. The files are large local-only design inputs; they are never read at build time and nothing on the site consumes them, so a fresh clone will not have them and does not need them. Keep a backup copy off the machine, because git is not holding one.

**Filename always equals the cover id**, so the pipeline resolves art with no lookup table:

| Cover id | File |
|----------|------|
| `ai-clarity` | `ai-clarity.jpg` |
| `ai-fluency` | `ai-fluency.jpg` |
| `ai-value` | `ai-value.jpg` |
| `ai-governance` | `ai-governance.jpg` |
| `ai-leadership` | `ai-leadership.jpg` |
| `chiefs-briefing` | `chiefs-briefing.jpg` |
| `second-seat` | `second-seat.jpg` |
| `emerging-leader` | `emerging-leader.jpg` |

Never introduce a filename with an apostrophe, a space, or capitals: it breaks shell globs and any path that later becomes a URL.

`content/backgrounds/themes.jpg` is the reference sheet showing all eight designs side by side. It is a design reference, not an input.

## Link Tracking (UTM)

**Settled 2026-07-28. Every link that leaves this system carries these, spelled exactly this way.** GA4 treats `linkedin` and `LinkedIn` as two different sources, and a link posted without UTMs is untracked permanently. There is no backfill.

```
https://aistakeholderchallenge.com/awakening/<slug>?utm_source=<platform>&utm_medium=social&utm_campaign=briefing-<slug>&utm_content=<asset>
```

| Parameter | Value | Notes |
|-----------|-------|-------|
| `utm_source` | `linkedin` \| `instagram` | Lowercase always. One token per platform, never abbreviated |
| `utm_medium` | `social` | Constant |
| `utm_campaign` | `briefing-<slug>` | The post's own slug, so every briefing is its own campaign |
| `utm_content` | `video` \| `infographic` \| `carousel` | Which asset earned the click. This is what tells us whether infographics are worth making |

Worked example, for the CFO briefing as a LinkedIn infographic:

```
https://aistakeholderchallenge.com/awakening/the-cfos-ai-question-is-a-capital-question?utm_source=linkedin&utm_medium=social&utm_campaign=briefing-the-cfos-ai-question-is-a-capital-question&utm_content=infographic
```

**Instagram has no clickable link in captions.** The bio link carries the UTMs instead, and it is updated per post. Same parameters, `utm_source=instagram`.

Never invent a fifth parameter, never reuse a campaign name across two briefings, and never post a bare URL.

## Infographics — only where they fit

An infographic needs **extractable structure**: a list, a sequence, a matrix, a set of questions, a real number. Many briefings are built on a single reframe and have none.

- Structure present → infographic.
- No structure → do not force one. A forced infographic is a quote card wearing a costume, and it reads as filler.

The fallback for structureless pieces is **still open** (see below). Until it is settled, say so rather than shipping a weak infographic.

## The Post

### Link goes in the first comment

**Settled 2026-07-28.** LinkedIn suppresses reach on posts carrying an outbound link in the body, so the link never goes in the post.

1. Publish the post with no link in it.
2. Immediately add the first comment containing the UTM link and nothing else that competes with it.
3. The post body signs off by pointing there: "Full briefing in the first comment."

Apply this to **every** post without exception. Inconsistency here does not just cost reach, it corrupts the comparison: a post with an in-body link and a post with a comment link are not measuring the same thing, and the UTM data cannot tell them apart afterwards.

### Structure

The post is **standalone value, not a trailer.** A reader who never clicks should still have gotten something worth their attention. Teasers train an audience to scroll.

| Part | What it does |
|------|--------------|
| **Hook** (1–2 lines) | Opens on the reader's situation, not the article. No windup, no "I wrote a new piece about…" |
| **Body** | The single sharpest reframe from the briefing, delivered in full. Give it away |
| **Close** | The question the reframe leaves open, or the decision it puts in front of the reader |
| **Sign-off** | One line pointing to the first comment |

**Mind the fold.** LinkedIn truncates behind "see more" after roughly 200 characters. Those first two or three lines are the only copy most people will ever see, and they are the entire job of the hook. Never spend them on setup.

**Length:** roughly 900–1,300 characters. Long enough to deliver the reframe, short enough to read standing up.

**Hashtags:** three at most, or none. They are not a growth lever at this altitude and a stack of them reads junior.

### Instagram

Same reframe, adapted to the caption. Captions carry no clickable link, so the bio link carries the UTMs and is updated per post (`utm_source=instagram`).

`michaelsteve.com/links` already exists as a Linktree-style page and is the natural bio destination rather than swapping a raw URL each time.

## Video Key Points

Michael speaks off the top of his head, following a sequence. **Deliver key points, never a script.** A written script produces a read-aloud performance, which is the opposite of what the video is for.

The format, on request:

- **Opening line.** One sentence, the way the video should start. This is the only thing written to be said close to verbatim.
- **3 to 5 beats**, in order. Each beat is one idea in a phrase, not a sentence to recite. Enough to hold in the head while talking.
- **Closing thought.** Where to land, not the words to land it with.

Beats come from the briefing's own argument structure, in the order it makes them. Keep the whole thing to something scannable at a glance before recording, and never exceed seven items total.

## Copy Rules for Social

Everything in `COPY_GUIDE.md` applies. The ones broken most often on social:

- No em-dashes, no emoji, no exclamation points.
- Never "read our blog post" or "visit The Awakening". The blog is **Briefings**; each piece is **a briefing** (`BLOG_BRIEF.md` § How to refer to the blog).
- The cover names **The Chief's Briefing**, **The Second Seat**, and **Emerging Leader** are social-only. On the site those audiences are Chiefs, Leaders of Leaders, and Emerging Leaders. Never cross the two.
- Chiefs first in framing and examples, then Leaders of Leaders, then Emerging Leaders.
- AISC has no years-of-experience gate. The 10-year minimum belongs to AICC only.

---

## Open Decisions

These are unsettled. Do not invent an answer; ask. All three of the first are expected to settle on the first test run.

| Decision | Status |
|----------|--------|
| **Asset storage** | Where finished videos, covers, and infographics live, and how the log records their location. Not the git repo: it deploys from git and video would bloat it. Note `content/backgrounds/` is already gitignored, so source art needs a backup home regardless |
| **Infographic fallback** | What LinkedIn gets when a briefing has no structure to visualize. Pull-quote card, or video only that day |
| **Cover typeface** | The template set's headline face is not yet confirmed against the site's `ptsans`. Confirm before the first cover is built |
| **Carousel template** | Michael supplies later |
