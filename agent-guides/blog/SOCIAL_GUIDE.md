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

## Building a Cover

```
node scripts/cover.mjs <slug> "Headline" ["Subhead"]
```

The script reads the briefing's `cover` from its frontmatter, resolves the background art and headline treatment from `COVERS` in `src/lib/blog/taxonomy.js`, and writes `content/covers/<slug>.png` at the art's native **1080×1350**. Output is gitignored and rebuildable.

**The art is a finished frame.** It already carries the wordmark, the texture, the halftone floor, and the theme label in the right colour. The script adds the headline block and nothing else. Never re-draw those elements.

**A dedicated `cover` agent carries these rules.** See `.claude/agents/cover.md`. Ask it for a cover rather than rebuilding the reasoning each time.

### Layout rules

Reverse-engineered from the eight templates in `content/backgrounds/themes.jpg` and implemented in the script:

1. **Type auto-fits.** The script binary-searches the largest size where no word overflows the 660px measure and the block fits the 790px zone. Headlines are meant to be big. **A cover with small type and dead space beneath it is a failed cover.**
2. **The block is vertically centred in the zone, never top-anchored.** This is why the six-line template starts high and the two-line template starts low. Both stay balanced.
3. **A short headline does not stretch to fill.** It centres at its width-limited maximum and the background motif carries the rest of the frame. Necessary empty space only.
4. **The measure is 830px** in a 1080px frame. Narrower than the frame so the headline stacks, but wide enough that ordinary word pairs stay together. It was 660px at first, which put nearly every word on its own row and read as ragged rather than stacked.
5. **No arrow.** The templates carry a "→" but it reads as a swipe affordance. A cover is a **video poster**, so an arrow tells the viewer the wrong thing. Dropped 2026-07-29.

Reading the fitted size the script reports: the **56px floor** means the headline is too long, so rewrite it. The **156px ceiling** is normal and usually means the measure is the real limit. Single-word lines mean the measure is fighting the type.

**Descenders and `background-clip: text`.** The gradient paints only inside the element box, and a sub-1 line-height pushes descenders past it, where they get no background and vanish. The `y` in "Policy" rendered clipped until `padding-bottom: 0.13em` extended the box under them. Never remove that padding.

### Storage

Covers are written to `content/covers/` (gitignored) as a **staging area only**, then uploaded to Google Drive once Michael confirms them.

**Format is JPEG at quality 100**, produced directly by the script. Never ship a cover as PNG, and never lower the quality: covers are the poster frame for a video and go out at full quality. For reference, the same cover is about 505KB at q100, 205KB at q92, and 605KB as PNG.

Filename, identical in both places:

```
<publish-date>_<cover-id>_<slug>.jpg
2026-07-11_ai-governance_ai-governance-the-risk-is-already-inside.jpg
```

Date first so a plain name sort in Drive reproduces production order, oldest published first. Cover id second so themes group. Slug last so the piece stays identifiable and searchable.

**Upload route: the Drive for Desktop mount, not the API.** `G:\My Drive` is live-synced, so uploading is a file copy. The MCP Drive API takes base64, which for a cover means about 788KB of encoded text per upload and is not worth it.

```
G:\My Drive\SOCIAL MEDIA\covers\
G:\My Drive\SOCIAL MEDIA\infographics\
G:\My Drive\SOCIAL MEDIA\videos\
```

**After every upload, delete the project copy.** Standing rule, set 2026-07-29. `content/` is a staging area, never an asset library; Drive is the only home for finished assets.

**But confirm the file actually reached the cloud before deleting anything.** Copying onto the mount only queues an upload. Verify with `md5sum` on both paths *and* confirm the file is visible through the Drive API (`search_files` on its title). If either check fails, keep the project copy and say so.

> **Known failure, 2026-07-29: Drive for Desktop paused.** `G:` mounts and lists files normally, writes appear to succeed, and nothing moves in either direction. Root cause was a 0-byte `user-paused` marker in `%LOCALAPPDATA%\Google\DriveFS\`, dated months earlier. The tray-level Resume did not clear it.
>
> **Tell-tale symptom:** the mount is a *stale snapshot*. Folders that exist in the cloud are missing from `G:` entirely, and the ones present all predate the marker's date. Compare `ls "/g/My Drive/"` against a `search_files` listing; if they disagree, sync is not running.
>
> **Fix:** stop `GoogleDriveFS`, rename the marker to `user-paused.bak`, relaunch `GoogleDriveFS.exe` from `C:\Program Files\Google\Drive File Stream\<version>\`. The mount repopulates and queued uploads go up on their own.
>
> Not the account: verify by comparing the folder name under `%LOCALAPPDATA%\Google\DriveFS\` with the `ouid` in any `viewUrl` the API returns.

### Type

- **Headline face is Inter 800.** Not the site's PT Sans Narrow, which is condensed and does not match the templates.
- **Line height is 1.08, unitless**, so the leading scales with whatever size the auto-fit lands on. Tight enough to read as a stacked block, loose enough that a descender never crowds the cap height of the line beneath it. It was 0.95 at first and the lines touched.
- **The subhead gap does not scale the same way.** Leading is proportional because it sits between lines of one element; the subhead is a separate element sitting below an `h1` that already carries descender padding. Stacking a proportional margin on top of that threw it far down the frame. It is `max(12px, 0.08 × size)`, near-constant, so the subhead reads as attached to the headline at every fitted size.
- **The gradient runs on the diagonal**, 135deg, not the 90deg of the CSS token. Same two stops. On a tall stack the diagonal makes the colour progress down the block the way the templates do; a horizontal fill leaves short lines flat in a single colour.

### Headlines are the whole cover

Briefing titles are built for search: long, query-first, and they name the topic. The theme label already sits at the foot of the art, so **the headline never has to name the topic.** Mine the briefing's own argument instead; its pull quote is usually better raw material than its title.

Every headline passes all three checks in `COPY_GUIDE.md` § Headline Rules: visualizable, falsifiable, distinctive.

Worked example from the first cover: `"AI Governance: The Risk Is Already Inside Your Organization"` shortened to `"The Risk Is Already Inside"` still fails the distinctiveness check, since any consultancy could run it. The piece's real argument, that staff usage has already become de facto policy, gives **"Your Staff Already Wrote Your AI Policy"** with the subhead **"You Just Have Not Read It Yet"**.

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

### Building one

```
node scripts/infographic.mjs <slug> <spec.json>
```

Output is `content/infographics/<date>_<cover-id>_<slug>.jpg`, same 1080×1350 frame and same filename convention as covers, JPEG quality 100, gitignored. The script reports fit; **`OVERFLOW` means cut copy, never shrink the type.**

Spec file:

```json
{
  "type": "list",
  "title": "What AI Governance Actually Answers",
  "standfirst": "One optional line.",
  "items": [{ "label": "...", "body": "..." }],
  "axes": { "x": "...", "y": "..." }
}
```

### The style, settled 2026-07-30

An infographic is a **sibling of the cover**, not a new species: same frame, same wordmark at top and theme label at foot, same Inter, same per-theme accent. A Governance infographic carries `gradient-100` exactly as its cover does.

It extends two existing languages:

- **The covers** give it the frame, chrome placement, and accent.
- **The article SVGs in `public/awakening`** give it the geometry. Those are a flat `msblue` field, quiet `lilac` marks at low opacity, and `warning` reserved for the few elements that carry meaning. No icons, no decoration, one motif.

| Decision | Rule |
|---|---|
| Ground | Flat **`dark-blue` `rgb(0,3,76)`** for **all eight themes**. Drawn, not supplied art. Only the accent changes. `DESIGN_GUIDE` reserves dark-blue for maximum authority, which is the right register, and it sits deeper than `msblue` so the accent lifts further. A dark ground also stops the scroll in a mostly-white LinkedIn feed |
| Mark | `public/ms-icon.svg`, the studio mark, inlined at render so a change to the file is picked up automatically. It pairs with the wordmark at top and is built for dark grounds |
| Motif | The article-SVG dot field at 5% lilac. Texture, never pattern. If you can read it as wallpaper it is too strong |
| Accent | Per theme, lifted for legibility on the dark ground. Carries the numerals, the rule under the standfirst, and the foot label. Nothing else |
| Type | Inter. Title 800, item labels 700 white, body 400 lilac at 58% |
| Fill | The content fills the frame. A matrix uses `flex:1` so quadrants stretch; a grid that stops halfway leaves the same dead band the covers avoid |

**Archetypes:** `list` (3–5 numbered items, the common case) and `matrix` (2×2, already native to the material via the Delegation Matrix).

### More archetypes, as briefings call for them

Add one when a real briefing needs it, never speculatively. Each new archetype is a permanent maintenance cost and a chance for the system to drift. Likely candidates, in order of how often the corpus seems to want them:

| Archetype | For | Seen in |
|---|---|---|
| `comparison` | Two-column before/after, human vs AI | Day 1 material, `what-to-tell-your-team-about-ai-and-their-jobs` |
| `sequence` | Ordered steps or a timeline where order carries meaning | `territory-not-tools`, the 6-month roadmap phases |
| `stat` | One number set large with its context | `the-hours-you-lose-every-week`, the margin audit |

### Icons — allowed, with conditions

Icons are welcome **where they carry meaning**, not as decoration on every item.

The tension to respect: the article-SVG language this system inherits uses no icons at all. Its restraint is what makes it read as premium rather than as a template. A generic icon set would undo that faster than any other single change. So:

- **Draw them in the house geometry**, not from a library. Single-weight strokes, brand tokens, the same vocabulary as the article SVGs: circles, rules, dashed boundaries, simple containers.
- **One visual idea per icon**, drawn from the item's actual content, the way each article SVG takes one motif from its briefing.
- **All or none within a graphic.** Icons on three of four items looks unfinished.
- **Never on the `matrix`.** Quadrants are defined by their axes; an icon competes with that reading.
- **Skip the icon if it only restates the label.** A padlock next to "Who is accountable?" adds nothing and costs restraint.

When icons land, they get their own contrast pass: stroke colour against `dark-blue` at the same AA thresholds as text.

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
