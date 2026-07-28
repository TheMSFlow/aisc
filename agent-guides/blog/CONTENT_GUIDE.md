# The Awakening — Content Creation Guide
> Read `agent-guides/AISC_BRIEF.md` and `agent-guides/blog/BLOG_BRIEF.md` first.
> The voice rules in `agent-guides/COPY_GUIDE.md` apply to every sentence of every article, verbatim. That includes the full Forbidden Phrases table and the em-dash ban. No exceptions for "editorial" content.

---

## Where Articles Live

One article = one MDX file at `content/awakening/<slug>.mdx`. The filename (without extension) becomes the URL slug unless `slug` is set in frontmatter. Lowercase kebab-case only.

## Frontmatter Template

Copy this exactly and fill it in. The build validates every field and fails loudly on violations (`src/lib/blog/schema.js`).

```yaml
---
title: "Your headline, 70 characters or fewer"
description: "The SERP and card description. Between 70 and 160 characters. Written as copy, not summary."
date: "2026-07-11"
theme: ai-governance
cover: ai-governance
type: insight
audiences:
  - chiefs
industries:
  - business
tags:
  - ai-governance
image: "/awakening/your-featured-image.svg"
imageAlt: "Plain-language description of what the image shows"
draft: true
---
```

Optional fields:

```yaml
updated: "2026-08-01"        # set when meaningfully revising a published piece
featured: true               # exactly one post should carry this; it leads the hub
slug: custom-slug            # only if it must differ from the filename
seo:                         # overrides; use only when SEO_GUIDE says to
  title: "Different SERP title"
  description: "Different SERP description"
  canonical: "/awakening/original-slug"   # only for republished content
ogImage: "/og/custom.png"    # only if a custom image exists; default is auto-generated
related:                     # manual override; otherwise related posts are scored automatically
  - another-post-slug
```

### Field rules

| Field | Rule |
|-------|------|
| `title` | Must pass all three Headline Rules from `COPY_GUIDE.md`: visualizable, falsifiable, distinctive |
| `description` | 70–160 characters. This is sales copy for the click, not an abstract |
| `date` | Publication date, `YYYY-MM-DD`. Never postdate |
| `theme` | Exactly one of the five themes. The user-facing browse dimension: it sets the hub the piece lives on, the card and breadcrumb chip, and the OG image eyebrow. See BLOG_BRIEF § Themes |
| `cover` | Exactly one of the eight covers. Social media only: it picks the video-cover background. Never rendered on the site. Usually the same id as `theme`; use `chiefs-briefing`, `second-seat`, or `emerging-leader` when the piece's subject is that seat itself |
| `type` | **Internal only since July 2026.** No routes, no chips, no eyebrow. Still required and still one of `insight` / `guide` / `value`; retained for historical continuity. Never referenced in copy or UI |
| `audiences` | 1–2 entries. Who is this piece written for, not who might tolerate it |
| `industries` | 1–3 entries. Only worlds the piece genuinely speaks to |
| `tags` | Free-form kebab-case, used for related-post scoring. Reuse existing tags before inventing new ones |
| `image` | Required. Featured image, site-relative path under `public/` (convention: `/awakening/briefing-<slug-hint>.svg`). Shows on the article page, blog cards, and the hub feature. House style is abstract editorial art in brand tokens (dark-blue or msblue field, lilac and msaccent geometry, warning sparingly), 16:9, one motif drawn from the article's core metaphor. Never stock photos, never AI-slop illustrations |
| `imageAlt` | Required. Plain-language description of the image for screen readers and SEO |
| `draft` | `true` hides the post from production, sitemap, and feed. Start every article as a draft |

## Structure Rules

- **No h1 in the body.** The title renders as the h1. Body headings start at `##` (h2), nest to `###` (h3), never deeper.
- **Open with the reader's reality.** The first paragraph names something the reader recognizes from their own week. Never open with a trend, a statistic, or "AI is changing everything."
- **No CTA components in the body.** The challenge CTA renders in the blog footer on every page; posts must not embed `<ArticleCta />` (the component is not available in MDX and the build fails if used). Mentioning the challenge in prose near the close, where it genuinely answers the question raised, is still right.
- **`<Callout label="...">` for asides**: a definition, a number worth sitting with, a caution. At most two per article.
- **Standard markdown otherwise.** Tables render styled. Blockquotes render as editorial pull quotes; use them for the one line you want remembered.
- **Length:** per type, see `BLOG_BRIEF.md`. Under 1,000 words is too thin to rank or to respect the reader; over 2,500 means it should be two pieces.

## Voice: Blog-Specific Deltas

Everything in `COPY_GUIDE.md` holds. On top of it:

| Rule | Why |
|------|-----|
| Write to one reader in one seat | An article for everyone converts no one. Frontmatter `audiences` is a writing commitment, not metadata |
| Teach before you sell | The reader owes you nothing. The piece must be independently worth their time even if AISC did not exist |
| Claims need sources or restraint | See `RESEARCH_GUIDE.md`. A leader-audience blog dies on one fabricated statistic |
| Name the program sparingly | AISC appears where it genuinely answers the question raised, usually near the CTA and in the closing. Not every section |
| End with direction, not summary | Close on what the reader should now see, decide, or do. Never "In conclusion" |

## Publish Workflow

1. **Reserve the topic** in `TOPIC_LEDGER.md` (Pipeline table): primary query, angle, taxonomy. If the query collides with an existing row, stop and rework.
2. Write the article with `draft: true`. It renders in local dev only.
3. Self-check against this guide, `SEO_GUIDE.md`, and the Forbidden Phrases table.
4. Run `node scripts/blog-links-report.mjs`: fix any BROKEN or LOW-OUTBOUND flags on your post, and link to at least one under-linked sibling so nothing goes ORPHAN.
5. Flip `draft: false`, confirm `npm run build` passes.
6. **Confirm in the ledger**: move the row from Pipeline to Published, then rerun the links report with `--write`.
7. On any later substantive edit, set `updated`.
