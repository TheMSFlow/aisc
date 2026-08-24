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
| **Instagram script** | Instagram | **Claude.** 2 to 3 minute portrait video. Spec in `SCRIPT_GUIDE.md` |
| **Session notes** | YouTube | **Claude.** The deck Michael records the long-form video from. **Paused, see below** |
| Video | Instagram | Michael records vertical from the Instagram script |
| Post copy | Both | Michael, written to the spec below |
| Posting, scheduling, first comment | Both | Michael, manually |
| YouTube thumbnail | YouTube | Later, with the long-form video. Rules pending, Michael supplies |
| Carousel | LinkedIn | Later, once the routine holds. Template pending |

**Claude's job is the cover image, the infographic, the Instagram script, and the session notes.** Everything else is Michael's, handled manually. Offer the rest only when asked.

### YouTube is paused on equipment, 2026-08-13

The 15-minute long-form video needs shooting equipment Michael does not have yet. Until he does:

- **The Instagram vertical is the primary video asset, not a cut-down.** The old model had Michael cutting Instagram and LinkedIn shorts out of the YouTube recording. With no recording to cut from, the vertical is originated: written to its own script, straight from the briefing.
- **Do not build session notes for new briefings.** The deck exists to be recorded from, and nothing is being recorded. Row 1 already has one, built 2026-08-01, before the pause.
- **The Instagram script derives from the briefing, not from the session notes.** Deriving a 3-minute script from a 15-minute deck that will never be shot is work for nobody.
- `utm_source=youtube` stays in the convention but goes unused until the channel restarts.

When the equipment lands, session notes resume and the two videos coexist: the vertical stays originated rather than reverting to a cut-down, because a 3-minute clip carved out of a 15-minute talking head reads as an offcut in a vertical feed.

**One briefing at a time, all of its assets together.** Revised 2026-08-13. The full set for one queue row is produced in a single sitting, off one reading of the briefing, into `content/social/<publish-date>_<cover-id>_<slug>/`. Michael moves that folder to Drive himself; **no agent touches Drive and no agent deletes what it produced.**

Working several rows at once is still forbidden. The rule was always about not mass-producing across the queue, never about splitting one post's set across sittings.

## The Pattern

**Settled 2026-08-14. This is the standing order of operations for every briefing from here on.** Two gates, and nothing downstream of a gate gets built until it clears.

| # | Step | Who |
|---|---|---|
| 1 | Briefing produced, then read in full | Claude writes, **Michael accepts or refines** |
| 2 | **GATE 1.** Only once accepted, publish it: `draft: false`, real date, link graph clean, ledger confirmed | Claude |
| 3 | Headline proposed **as text**, against the rules below | Claude proposes, **Michael approves** |
| 4 | **GATE 2.** Cover rendered to the approved words, Michael confirms the render | Claude builds |
| 5 | Script, infographic and session notes, one sitting, all against the approved headline | Claude |
| 6 | Record, post, log the live URLs in the queue | Michael |

**Why the gates sit exactly there.**

**Gate 1 is the 404 rule.** An asset pointing at an unpublished slug is a dead link, so nothing is produced for a briefing that has not shipped. This is rule 1 in `DISTRIBUTION_LOG.md` and it has never moved.

**Gate 2 is the headline, and it is the expensive one.** Every downstream asset inherits it: the script's STOP line answers it (`SCRIPT_GUIDE.md` § STOP), the infographic reads off the same reframe, the deck is built from the same argument. Changing a headline after the set exists means rebuilding the set. On 2026-08-14 four covers were rewritten on review and row 8's script had to be rewritten with its cover, which is the exact cost this gate exists to avoid.

**Approve the words, not the picture.** The gate is on the headline as text. Rendering is a single command and the render is a confirmation step, not the decision. A cover approved as an image is a headline approved after the fact.

**Within step 5, order still matters:** script first, because its opening is the line most tightly bound to the headline, then the infographic if the piece has structure, then the session notes.

## The Queue

**The queue lives in `agent-guides/blog/DISTRIBUTION_LOG.md`.** Read it before producing anything and update it after. Row order is production order.

Work the **published** backlog least-recent-first. Drafts are never distributed: a social post pointing at an unpublished slug is a 404 and burns the piece's launch.

Ties inside a publish date break by inbound link count from `node scripts/blog-links-report.mjs` (the pillar pieces everything links into go first), then slug alphabetical.

**Posting starts Monday 2026-08-17, one briefing per day.** Changed 2026-08-14 from Mon/Wed/Fri. Two facts to hold alongside it, neither of which blocks the decision:

- **The bank is 17 drafts, which is 17 days at this rate.** Refills come from the resources Michael is gathering, from cohort exhaust (`TASKS.md` #14) and from Search Console (#12). None is producing yet, so the refill has to start well before day 17.
- **Distribution has never actually run.** As of 2026-08-14 all fifteen rows carry complete asset sets and zero posts. The 17th is the first real test of the last mile, and until one row has gone out end to end, the true cost of a posting day is a guess.

---

## Cover Anatomy

Portrait, one headline, one label. Every cover in the set shares the same four zones, top to bottom:

1. **Wordmark.** Logo mark plus `MICHAEL STEVE CLARITY STUDIO`, centered at the top, small uppercase with wide letterspacing. Identical on all eight.
2. **Headline.** The dominant element, upper-middle, left-aligned, bold, tight leading, generous left margin. Set from the briefing's title or a sharpened variant of it.
3. **Subhead** *(optional, and the default is to omit it)*. Tightened 2026-08-13, after seven covers shipped with one and most did not need it.

   **The test: cover the subhead. If the headline still lands, delete the subhead.** A subhead earns its place only when the headline is genuinely incomplete without it, usually because it sets up a turn the headline pays off. "Your Staff Already Wrote Your AI Policy" plus "You Just Have Not Read It Yet" passes: the second line delivers the sting the first only implies. "Time Is Spent. Judgment Is Invested." plus "You Have Been Spending the Wrong One" fails: the headline is a complete aphorism and the subhead adds words without adding weight.

   A weak subhead is worse than none. It dilutes a strong headline and it costs the frame the breathing room the motif is designed to fill.
4. **Label.** Small icon plus the cover `label`, centered at the foot, uppercase with wide letterspacing.

### The three families

Which family a cover belongs to is stored as `headline` on its `COVERS` entry in `src/lib/blog/taxonomy.js`.

| Family | `headline` | Covers | Treatment |
|--------|-----------|--------|-----------|
| **Field** | `light` | AI Value, AI Fluency, AI Clarity | White headline set directly on a solid colour ground. No panel, no gradient |
| **Paper** | `gradient-100` / `gradient-200` | AI Governance, AI Leadership | Off-white paper ground, headline set in the gradient, halftone dot motif lower right |
| **Card** | `card` | The Chief's Briefing, The Second Seat, Emerging Leader | Fluted vertical-stripe ground, white headline set **inside the folder already drawn in the art** |

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

**The Card family has its own zone, and it is much tighter. Fixed 2026-08-13.** The three card backgrounds carry a folder graphic, and the headline is the title written on that folder. The script used to draw a *second* translucent panel sized to the text, which on any headline over two lines grew past the folder and left the title floating outside the object it belongs to. It also broke the standing rule that the art is a finished frame.

The script now sets the block inside the folder itself: left 234, top 470 to clear the tab notch, bottom 918, measure 617px. That is a **448px zone against 790px for the other two families**, so card headlines have roughly half the room.

**And card headlines must be LONG, which is the opposite of what it looks like.** Corrected 2026-08-14 after measuring instead of guessing.

A 33-character headline on the card filled 62% of the measure and left the right side of the folder empty. The instinct is to blame the type size. The type size was already maxed: 100px, block 445px of the 448px zone, one step from overflowing. The variable was the words.

| Headline | Chars | Fitted | Fill |
|---|---|---|---|
| Your AI Opinion Is Not a Position | 33 | 100px | 62% |
| Your Board Wants an AI Position, Not an Opinion | 47 | **100px** | **96%** |
| Boards Can Tell an AI Opinion From an AI Position | 48 | 97px | 100% |

Same type size, completely different frame. Four lines at 100px across a 617px measure holds roughly twelve characters per line, so **a card headline wants 44 to 50 characters.** Below about 40 it stacks into a narrow left-hand column with dead space beside it. Above about 50 the fitter drops the size to squeeze in a fifth line and the type goes weak.

**The script now measures this and says so.** It reports the real line-box widths and warns below 85% fill. That number is the check, not the eye:

```
width:      widest line 594px of 617px measure (96%)  [513, 556, 594, 501]
```

The Field and Paper families rarely trip this, because an 830px measure and a 790px zone let a normal headline reach 95% or better without trying. It is a card-specific trap and it will catch `second-seat` and `emerging-leader` too.

**Descenders and `background-clip: text`.** The gradient paints only inside the element box, and a sub-1 line-height pushes descenders past it, where they get no background and vanish. The `y` in "Policy" rendered clipped until `padding-bottom: 0.13em` extended the box under them. Never remove that padding.

### Storage

Covers are written into the briefing's own folder at `content/social/<publish-date>_<cover-id>_<slug>/` (gitignored), alongside every other asset for that post. **Michael moves the folder to Drive himself. Agents do not upload and do not delete.**

**Format is JPEG at quality 100**, produced directly by the script. Never ship a cover as PNG, and never lower the quality: covers are the poster frame for a video and go out at full quality. For reference, the same cover is about 505KB at q100, 205KB at q92, and 605KB as PNG.

Filename, identical in both places:

```
<publish-date>_<TYPE>_<cover-id>_<slug>.<ext>
2026-07-11_COVER_ai-governance_ai-governance-the-risk-is-already-inside.jpg
```

Date first so a plain name sort reproduces production order, oldest published first. `TYPE` second, one of `COVER`, `SCRIPT`, `INFOGRAPHIC`, `SESSION-NOTES`. Cover id third so themes group. Slug last so the piece stays identifiable and searchable. The builder scripts emit these names; never rename by hand.

**One folder per briefing. Restructured 2026-08-01**, because a post now carries several documents and filing by asset type scattered them. **The local build folder carries the same name**, added 2026-08-13, so the move is a drag with no rename:

```
content/social\<publish-date>_<cover-id>_<slug>\            built here
G:\My Drive\SOCIAL MEDIA\<publish-date>_<cover-id>_<slug>\  moved here by Michael
```

Everything for one briefing lives in that folder: cover, script, infographic and the session notes deck. The folder name is the asset stem without the type token, so sorting folders by name still reproduces the queue order. The old `covers\`, `infographics\` and `videos\` folders are gone.

**Videos are not in Drive.** They stay on Michael's machine because of their size.

**Agents do not upload and do not delete. Changed 2026-08-13.** The copy-and-verify-and-delete routine set on 2026-07-29 existed because assets shipped one at a time; a whole set built in one sitting moves in a single drag, and Michael doing the move is its own verification. Leave the folder where it is and tell him it is ready.

This retires the standing "delete the project copy" rule for social assets, and with it the risk that a script, which no command can regenerate, gets deleted on the strength of a sync that had not actually happened.

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

### The stranger test, added 2026-08-13

**A headline must be fully intelligible to someone who has never heard of AISC, has not read the briefing, and is not looking for it.** They are mid-scroll. They get one pass.

This does not contradict the rule above about not naming the topic. The theme label at the foot supplies the *subject area*; the headline must supply its own *subject and claim*. Concretely:

- **No unresolved referents.** "They Learned It in a Weekend" fails: a stranger cannot tell who "they" are or what "it" is, so the sentence has no content until you already know the answer. "Your Staff Already Wrote Your AI Policy" passes: it names who, what, and the claim.
- **Every pronoun must have its antecedent inside the headline**, or in the reader's own life ("your board", "your staff", "your week").
- **No coined vocabulary.** Terms this system invented, like "the middle seat" or "territory", are insider language on a cover. Use them in the body once earned, never as the hook.

### Three ways a headline lies, all found on the first seven

**Added 2026-08-13.** Each of these shipped at least once. A headline is read alone, without the briefing underneath it, so what it asserts standing on its own is the only thing that counts.

**1. The claim the compression made by accident.** "Your Students Learned AI in a Weekend" asserts that AI can be learned in a weekend. It cannot, it compounds as clarity grows, and the assertion quietly undercuts the premise of a seven-day program. The briefing said students *adopted* it, which is a different verb doing different work. **Read the headline as a stranger would and ask what it claims, not what you meant.**

**2. Convicting the reader.** "You Are Handing AI the Wrong Work" tells a chief they have already failed at something we have no way of knowing they did. To a senior reader that is presumption, not provocation, and it costs more trust than the sharpness buys. **Make the claim about the world, the pattern, or the situation.** "There Is Work You Should Never Hand to AI" says the same thing and accuses nobody. Hedging with "you might be" is not the fix: it turns a headline into a shrug.

**3. Presupposing the reader has the thing.** "Your AI Policy Is Two Years Behind Your Students" only works if you have an AI policy, and most schools do not. A headline that assumes a policy, a committee, a budget line, or a team excludes everyone without one, which here was most of the audience. **Name what is true whether or not they have it.** "Every Classroom Is Making Its Own AI Rules" is true either way, which is exactly why it cannot be argued with.

Rewriting the original failed example, "They Learned It in a Weekend" became **"Every Classroom Is Making Its Own AI Rules"**: a named subject, a complete claim, no borrowed vocabulary, nothing presupposed, and nothing asserted that is not true.

### Four more ways a headline fails, found on review 2026-08-14

The three above are about what a headline *asserts*. These four are about whether it does its job at all. Each was caught by Michael on a shipped cover, and each cost a rebuild.

**1. A jab where the job was substance.** "Nobody Has Explained AI to You Without Selling Something" was the AI Clarity cover. It is true, and it is about vendors rather than about AI, so a cover whose entire purpose is clarity spent itself on a swipe at other people. **The theme names the job.** A Clarity cover explains something. A Value cover puts a number on something. If the headline could be moved to a different theme without changing, it is not doing that theme's work. The replacement, "AI Is a Pattern Engine, Not a Mind", delivers the clarity the label promises.

**2. A vague verb carrying the payoff.** "Ten to Twenty Hours of Your Week Could Go to AI" has the right number and then loses it: *go to AI* leaves the reader assembling what that means. Say what happens. "AI Could Take Ten to Twenty Hours Off Your Week" is the same claim with the verb doing the work. This is the cover version of the plain-language rule in `SCRIPT_GUIDE.md`.

**3. A word the reader has to stop and parse.** "AI Left the Innovation Agenda for the Fiduciary One" asks for *fiduciary* mid-scroll. Precision is not the standard here, being understood at speed is. Every word on a cover should be one the reader already owns. The replacement carries the same idea through "debt", which every director owns.

**4. Abstraction with nothing to picture.** "An AI Agent Is Your Judgment, Running Unattended" is a fine sentence inside the briefing, where a thousand words have earned it. Alone on a cover it is a riddle. **A headline gets no run-up.** Name the concrete thing that happens: "An AI Agent Acts Under Your Name Without Asking You".

The common thread is that all four read well to someone who already knows the argument. That is exactly the reader a cover never has.

### Approval gate: the headline is signed off before the rest of the set

**Added 2026-08-13.** The cover headline is the spine of the whole set: the script's opening line answers to it, and the infographic and deck are built off the same reframe. Getting it wrong late means rebuilding four assets.

So: **propose the headline and subhead, wait for Michael's yes, then build everything else.** Do not render the cover, write the script, or build the deck against an unapproved headline.

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
| `utm_source` | `linkedin` \| `instagram` \| `youtube` | Lowercase always. One token per platform, never abbreviated. `youtube` added 2026-08-01 with the long-form video |
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

### It is built for someone who has not read the briefing

**Added 2026-08-13.** An infographic is a standalone LinkedIn asset. Most people who see it will never open the briefing, and nothing in it may depend on having done so.

- **The standfirst informs, it does not tease.** "Two questions sort every task you do" is a trailer for content the graphic then fails to supply. If the two questions are the point, the graphic says what they are.
- **No forward references.** Nothing that points at material the graphic does not contain.
- **No coined vocabulary in the title.** "Closing the Gap From the Middle Seat" uses a term this system invented. A stranger reads it as jargon. Name the actual situation instead.
- **Every item is intelligible cold.** An item whose meaning depends on the three above it has not been written yet.

The test is the same as the cover's: hand it to someone who has never heard of AISC and see whether they get something out of it.

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

**Archetypes:** `list` (numbered items, the common case) and `matrix` (2×2, already native to the material via the Delegation Matrix).

**What actually fills a `list` frame, learned 2026-08-13.** Fill is driven by total text height, not item count, and `fit: ok, 0px of slack` only means the content did not overflow. It says nothing about a dead band underneath. Two shapes are known to fill:

| Items | Bodies |
|---|---|
| 4 | Two lines each, roughly 95 to 105 characters |
| 5 | One line each, roughly 55 to 70 characters |

Three items will not fill at any body length: a 3-item list left a quarter of the frame empty on the board briefing before it was reworked to four. If a briefing genuinely yields only three, find a fourth that belongs to the same question rather than padding the three, or say the piece has no infographic in it.

**The standfirst measure is about 60 characters.** Longer and it wraps, usually orphaning one or two words onto a second line, which reads as a mistake rather than a break.

### More archetypes, as briefings call for them

Add one when a real briefing needs it, never speculatively. Each new archetype is a permanent maintenance cost and a chance for the system to drift. Likely candidates, in order of how often the corpus seems to want them:

| Archetype | For | Seen in |
|---|---|---|
| `comparison` | Two-column before/after, human vs AI | Day 1 material, `what-to-tell-your-team-about-ai-and-their-jobs` |
| `sequence` | Ordered steps or a timeline where order carries meaning | `territory-not-tools`, the 6-month roadmap phases |
| `stat` | One number set large with its context | `the-hours-you-lose-every-week`, the margin audit |

**Designing one is main-session work, not agent work. Settled 2026-07-31.** A new archetype is a one-off design act, so it gets the `frontend-design` skill and a stated design plan before any code. The `infographic` agent deliberately does not carry that skill: it builds against an archetype already specified here, and a template series gains nothing from per-build novelty. Specify the archetype in this section first, then let the agent produce against it.

One question worth answering while designing: the `list` archetype numbers its items, and numbering should encode something true about the content. Where the items are a set rather than a sequence, consider whether the numerals are earning their place.

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

## Session Notes

**Rebuilt 2026-08-14, replacing the two-layer arc format settled 2026-08-01.** Approved on the row 1 test the same day.

One published briefing becomes one deck, and **the deck is a detailed summary of that briefing, section by section.** It is what Michael reads while recording the long-form YouTube video. Nobody else ever sees it.

```
node scripts/session-notes.mjs <slug>         # spec defaults to the tracked source
node scripts/deck-preview.mjs <the .pptx>     # then actually look at it
```

The spec lives at `content/sources/<slug>/session-notes.json`, tracked in git: it is the editorial source of the deck and no command can regenerate it. Pass an explicit path as a second argument only to build from a draft spec elsewhere.

**Output is the `.pptx` and nothing else**, written to `content/social/<publish-date>_<cover-id>_<slug>/` for Michael to move to Drive.

### Why the old format was scrapped

It was two layers: sparse audience-facing slides over a private speaker-notes layer carrying the expansion prompts, the six locked passages, the seam re-hooks and the two native embeds. The design rested on an assumption that turned out to be false, that Michael would read the notes layer while recording. He does not. So in practice the deck was a stack of cryptic one-line labels with all of its substance in a place nobody opened.

The arc was the second problem. OPEN / PART 1 / PART 2 / PART 3 / CLOSE reorganized the briefing on film-pacing logic, so no slide corresponded to anything findable in the published piece.

Three things went with it, and none of them are coming back without a new reason:

- **No speaker notes.** Everything the deck has to say is on the slide.
- **No PDF.** There is no audience to show a clean copy to, so the second file was pure overhead.
- **No arc.** Slides follow the briefing's own sections, in the briefing's own order.

### The shape

| Slide | Family | Carries |
|---|---|---|
| **Title** | dark | The briefing title, then a contents list: the briefing's sections numbered in reading order |
| **One per section** | light | That section, summarized in full |
| **Close** | dark | The briefing's own closing line |

No dividers. The eyebrow on each content slide names the section, which is all the orientation a reader needs.

### A content slide

Four things, and the slide is built so the first two can be read alone:

1. **Eyebrow**, the section name. It matches the contents list and the heading in the post.
2. **Headline**, the section's point stated as a claim.
3. **Standfirst**, the section's thesis in one sentence.
4. **Rows**, one per point the section makes: a bold label carrying the claim, then two to three sentences of the briefing's actual reasoning underneath.

Optionally a **quote strip**, for a line worth saying close to verbatim. The briefing's pull quote and its callout are the usual candidates.

**Scanning is the design goal, confirmed on the row 1 test.** Michael reads the labels to find his place and drops into the body only where he needs the context. That sets the standard for both: **a label has to carry its claim with nothing under it**, and the body exists for the moments the label alone does not land. A label that only makes sense once you have read the body has not been written yet.

### Fit is measured, and it is the real constraint

Detailed bodies overflow a fixed row height every time, which is why the old format never had to think about this and the new one does. The builder estimates text height, **auto-fits the body between 12.5pt and 10pt**, and reports per slide:

```
ok        slide 3  "What ungoverned AI actually costs": 4 rows, body 11.5pt, 90% of the row box
OVERFLOW  slide 5  "What real governance answers": 4 rows do not fit at 10pt. Cut copy or split the slide.
```

**`OVERFLOW` means cut copy or split the slide. Never shrink the type further**, same rule as the infographic. The label stays at 15pt in every case: it is the scan layer, so the explanation gives ground first.

What row 1 taught, and it is worth not relearning:

| Shape | Body length that fits |
|---|---|
| 3 rows | roughly 280 to 330 characters each |
| 4 rows | roughly 210 to 240 characters each |
| 4 rows **plus** a quote strip | roughly 120 to 150 characters each |

**Four rows, a quote strip, and two-line bodies do not coexist.** Pick two. On the costs slide the four costs mattered more than the pull quote, so the quote went.

**The standfirst wants 95 characters or fewer.** Past that it wraps, and a wrapped standfirst almost always orphans one word on the second line, which reads as a mistake. Three of row 1's six needed cutting for exactly this.

Fill below about 70% is not automatically wrong here. Rows are equal height and their text is vertically centred, so a slide whose longest row sets a generous height still looks deliberate. This is unlike the infographic, where a short frame reads as a dead band.

### Hard rules

- Only published briefings, same rule as covers.
- The builder **fails the build** on an em-dash anywhere in the spec, and names the field.
- The builder **fails the build** on a spec written against the retired arc format, naming what it found: `parts`, `divider` slides, or a `notes` field. Such a spec would otherwise parse cleanly and produce a deck missing most of its content.
- **Look at it.** `deck-preview.mjs` renders every slide to PNG. A deck that has not been looked at has not been checked, and the fit report is an estimate, not a measurement taken from the font.

### The title asymmetry, which is easy to get backwards

A **cover headline** never names the topic, because the theme label at the foot already does. A **YouTube title** must do the opposite and front-load the phrase people search, tracking the briefing's primary query from `TOPIC_LEDGER.md`. Two different jobs on the same briefing.

**The title is written before the deck, not after.** The first content slide has to confirm the expectation the title set, so a deck built before its title has nothing to confirm. Lock the title at spec time and write the premise section against it.

**The thumbnail does not block the deck.** Title locked, thumbnail loose is the correct order. Thumbnail design is an iterative back-and-forth, and waiting on it to start writing stalls the only part that has to happen. It gets dialled in later, against a script that already exists.

### Design

The deck reproduces the AISC Day 1-3 session notes template, screenshots in `content/session-notes-template/`. Two slide families:

- **Dark** (title and close): deep navy ground `#0D0A47`, periwinkle `#6368DA` bands top and bottom, everything centred.
- **Light** (content): white ground, navy hairline at the top, eyebrow, indigo `#1A237E` headline, a short thick rule under it, numbered rows on an indigo-to-periwinkle ramp, an optional quote strip in pale `#F0F0FA` with a speech bubble, then a grey foot bar with a right-aligned label.

The per-theme accent the covers and infographics use is deliberately **not** used here: this template is navy and periwinkle only, and the theme survives in the foot label. Type is Inter.

**Do not put `transparency` on a text run.** It loses its alignment on export and the text overflows the slide edge. Use a pre-dimmed solid colour.

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
| ~~Instagram script spec~~ | **Settled 2026-08-13.** Full spec in `SCRIPT_GUIDE.md`. It is a true word-for-word script, a deliberate break from the never-a-script rule that governs session notes, justified by runtime. One reframe, 340 to 400 words, six beats. The agent that builds against it is not written yet |
| **YouTube thumbnail** | Deferred until the channel restarts. Michael supplies a new set of rules then. Do not spec it before that. Known constraint: covers render onto finished 1080×1350 art in `content/backgrounds/`, and no 16:9 equivalent exists, so a thumbnail is drawn like the infographic rather than composited like a cover. It also inherits the YouTube side of the title asymmetry, front-loading the primary query, not the cover side |
| **Infographic fallback** | What LinkedIn gets when a briefing has no structure to visualize. Pull-quote card, or video only that day |
| ~~Session-notes spec files~~ | **Settled 2026-08-13: tracked.** Specs and script markdown live in `content/sources/<slug>/`, in version control. Deliverables stay gitignored in `content/social/`. Not `content/awakening/`, because the post loader reads `.md` there and would treat a script as a briefing |
| **Carousel template** | Michael supplies later |
