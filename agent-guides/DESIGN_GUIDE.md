# AISC Design & Frontend Agent Guide
> Read `AISC_BRIEF.md` first. Then `COPY_GUIDE.md` before writing any rendered text.
> Do NOT pull design patterns or copy from v1. V1 is reference only for Pricing structure and FAQ content. Everything else is a fresh direction.

---

## v2 Visual Direction

**Register:** Premium, editorial, C-suite.

The aesthetic should feel like the intersection of a strategy firm's annual report and a high-conviction product launch — authority through restraint, not decoration.

Reference points: McKinsey Quarterly, Stripe marketing, WSJ magazine, Monocle.

**Not:** AI startup, coaching bootcamp, productivity influencer, SaaS landing page.

**Three guiding words:** Restrained. Deliberate. Heavy.

---

## Color System

The palette carries over from v1 but is applied with more intention in v2. Less saturation, more contrast. More white space.

| Token | Value | v2 Usage |
|-------|-------|----------|
| `dark-blue` | `rgb(0, 3, 76)` | Full-bleed hero, high-gravity sections, closing CTA — use where maximum authority is needed |
| `msblue` | `rgb(1, 5, 121)` | Primary brand color — CTAs, key highlights, navigation |
| `warning` | `rgb(135, 5, 113)` | Scarcity signals (VIP seats), outcome callouts, a single accent word in hero — use sparingly, once per section max |
| `msaccent` | `rgb(99, 104, 218)` | Supporting backgrounds, hover states, card fills |
| `lilac` | `rgb(233, 234, 255)` | Soft section backgrounds, breathing room |
| White | `#fff` | Use generously — more whitespace than v1. A white section beside a dark section creates the premium contrast. |

**Key principle:** In v1, color is applied uniformly across every section. In v2, sections earn their color. A single amber word on a dark field lands harder than three amber elements competing for attention.

**Section background freedom:** The frontend-design skill has explicit permission to use any palette token as a section background color. `msaccent` (`rgb(99, 104, 218)`) can serve as a full-bleed section background. `lilac` at varying opacities (12–40%) creates structured light sections with more warmth than white. `warning` at low opacity (4–10%) adds subtle energy to light sections. `msblue` is the right choice for dark sections where `dark-blue` is too heavy. The goal is that no two consecutive dark sections share the exact same background. A page where dark sections alternate between `dark-blue` and `msblue` reads more alive than one that uses `dark-blue` exclusively. Do not default to `dark-blue/white` as the only rhythm.

---

## Typography

| Element | Direction |
|---------|-----------|
| Section headlines | All-caps, tight tracking, `font-heading` (PT Sans Narrow). Large — fill the space. |
| Body copy | Light weight, relaxed leading. Do not increase weight. The contrast with headlines is structural. |
| Pull quotes / callouts | Italic, mixed case, display scale. These are the voice moments — use them to break rhythm. |
| Label text | Small-caps, wide tracking (e.g., `DAY 1 / LIVE SESSION`, `PRIMARY AUDIENCE`). Navigational chrome only. |
| Numbers as proof | Set large, bold, inline with body text. They interrupt scanning in the right way. |

**New in v2:**
- **Oversized pull quotes** — single lines set at display scale as visual anchors between sections
- **Typographic contrast sections** — a section where type IS the design, no imagery needed
- **Tighter tracking on all-caps** than v1 — more editorial, less loud

---

## Layout Principles

**Whitespace is not empty space.** A headline with room around it communicates more than a section packed with elements. v2 should breathe.

**Structure over decoration.** Grids, typographic scale, and borders do the design work. Remove decorative blur effects and gradients that don't serve meaning.

**Full-bleed commitment.** If a section is dark, it is dark edge to edge. No partial treatments.

**Asymmetry reads premium.** Layouts where content is intentionally unbalanced (a headline consuming 70% width, a stat in the other 30%) feel more considered than symmetric grids.

**No more than 4 elements competing for attention in a single viewport.** Editorial design removes, not adds.

---

## Page Architecture — 9 Sections

The landing page has 9 sections in narrative order. Each entry below states the section's **job** and its **non-negotiable content requirements**. Layout, visual execution, and design choices are left to the frontend-design creative process — these notes are a brief, not a specification.

---

### Section 1 — Hero
**Job:** Set the stakes, establish the reframe, drive one action.

**Must include:**
- A headline that names the tension or the recognition moment — not the program name (that's the logo's job)
- A credibility signal: the key numbers (7 days, 4 live sessions, specific outputs)
- One primary CTA: "Secure Your Spot"
- One secondary link to pricing or curriculum

**Must feel:** Heavy and authoritative. A leader landing here should feel recognized — like someone finally named what they've been carrying.

**Brand constraint:** Dark-blue background. This is the only section with a mandated background color.

---

### Section 2 — Value
**Job:** Name the four things a participant leaves with — clearly, directly — before the program structure is explained. This is the section currently missing from the page.

**Must include:**
- All four value points in priority order: AI Clarity → AI Fluency (Time Redemption lives inside it) → AI Value + Territory → AI Governance *(Governance added 2026-09-28)*
- Under Fluency: the authority shift — the leader becomes the AI-clear voice their people turn to
- Under Time: a specific number of hours recovered (not "improved efficiency")
- Under Territory: the connection to the 6-Month Roadmap — declared on Day 3, built over 6 months

**Must feel:** Cumulative. Each value point lands on the previous. By the time the reader reaches Territory, they understand why it's the prize and not the pitch.

**Note:** "The 4 Value Points" and "What You Leave With" are internal labels — the displayed section should open with the reader's reality, not an outline.

---

### Section 3 — Audience
**Job:** Three profiles. The reader sees themselves clearly or self-selects out.

**Must include:**
- One block per audience tier: Chief, Leader of Leaders, Emerging Leader
- Each block names the situation (not job titles) and what they specifically leave with
- Chief block carries visual priority — primary audience
- Emerging Leader block must name the career and positioning shift explicitly

**Must feel:** Recognition, not classification. A reader shouldn't have to search for themselves.

---

### Section 4 — Curriculum
**Job:** Show the full 7-day structure and build confidence that this is deliberate, not improvised.

**Must include:**
- All 7 days with clear distinction between live sessions and self-paced work
- The 4 live sessions named with their outputs: AI Clarity → AI Labs → AI Value → AI Governance
- Day 7 / The Mandate weighted as a capstone — not just another session
- VIP differentiation on Days 5 and 6: visible but not dominant

**Must feel:** Structured and earned. Every day should feel like it produces something real.

---

### Section 5 — Demo
**Job:** Make the Toolbox's resources and tools tangible — show what participants actually access and what they leave with.

**Structure:** Full-viewport-height section with a fixed header strip and four horizontally-sliding full-height panels. Arrow navigation (left/right) with a panel counter (01/04) in the header. Dot indicators at the bottom.

**Header (persistent across all panels):**
- Label: "THE TOOLBOX"
- H2: "The challenge ends on Day 7. The Toolbox doesn't."
- Counter + prev/next arrows top right

**Panel 01 — Guides, Frameworks & Templates (Resource)**
- Headline: "The sessions give you direction. These make sure your team gets it too."
- Visual: Three cascading screenshots (Day 1, 2, 3 from the learning center) in a Stripe-style layered stack
- Screenshots in `public/demo/`: `day-1.png`, `day-2.png`, `day-3.png`

**Panel 02 — Mini Apps (Tools)**
- Headline: "Rate every task. Recover every hour. Declare your territory."
- Visual: Three cascading tool screenshots (Delegation Tool, Margin Calculator, Territory Builder)
- Screenshots in `public/demo/`: `delegation-matrix.png`, `margin-calculator.png`, `territory.png`

**Panel 03 — Roadmap (Resource)**
- Headline: "Day 6 unlocks it. The next six months run on it."
- Visual: Single roadmap screenshot filling the full right-column height (object-cover, object-top)
- Screenshot in `public/demo/`: `roadmap.png`

**Panel 04 — AI Labs (Resource)**
- Headline: "Built for leaders who direct AI. Not engineers who build it."
- Visual: Editorial card filling the full right-column height — large typographic anchor, module list, tiered-access footer (AI Labs free access: 1 month GA / 3 months VIP / 6 months VVIP — never a single blanket duration)
- No screenshot available; use the card treatment

**Screenshot arrangement (cascade panels):**
- Three screenshots stacked diagonally: width 82%, offsets top: 2/15/28%, left: 0/9/18%
- Each has `border border-white/[0.09] rounded-xl shadow-2xl`

**Must feel:** A controlled product demonstration. The header persists as a frame; each panel is its own moment of proof.

---

### Section 6 — Proof
**Job:** One or two transformations, not a wall of five-star reviews.

**Must include:**
- Testimonials that name a shift — what the person didn't have before and has now
- At least one testimonial speaking to the authority shift: how their people see them differently after AISC
- Attribution: name, role, and the world they operate in (faith, business, creator economy, etc.)

**Must feel:** Quiet and credible. Confirms rather than oversells.

---

### Section 7 — Pricing
**Job:** Convert. Three tiers, clearly differentiated, with confidence — not apology.

**Must include:**
- Three public tiers: GA / VIP / VVIP
- VIP scarcity (10 seats) presented as an editorial fact, not a pressure tactic
- Private / Enterprise block — same foundational content, private delivery
- Currency toggle (USD / NGN)
- CTA: "Secure Your Spot" per public tier, "Contact Sales" for enterprise
- No "Sign Up" or "Register" language anywhere

**Must feel:** Calm and certain. The price is what it is.

---

### Section 8 — FAQ
**Job:** Remove the final objections a serious leader carries before committing.

**Must include:**
- "What do I actually leave with?" — answered clearly, answered first
- "Do I need to know anything about AI already?" — answered clearly
- A question about Coaching and whether it's included — sets up section 9 naturally
- A contact link for unanswered questions

**Must feel:** Certain, not defensive. These are questions from someone who is almost decided.

---

### Section 9 — Coaching
**Job:** Premium close. The final section — for leaders who already know they want more than the challenge alone.

**Must include:**
- The continuation framing: the Roadmap tells you where to go; Coaching walks with you as you get there
- What coaching delivers: the challenge delivered privately first (VVIP level), then live group coaching three Saturdays a month, facilitated Roadmap execution as fluency grows. Coaching is a group setting, not 1:1 — questions still get answered directly, alongside leaders executing their own Roadmaps
- The key fact: Coaching includes AISC at no additional fee
- All three pricing plans (monthly, 6-month, annual) in USD and NGN
- CTA: "Start with Coaching"
- A "See how coaching works" link to `/coaching`

**Must feel:** Unhurried and confident. No pressure. The leader who belongs here will recognize themselves without being sold to.

---

## `/coaching` page (added 2026-09-28)

A dedicated sales page for AI Stakeholder Coaching, with its own `CoachingHeader` (wordmark "AI STAKEHOLDER **COACHING**", in-page links Roadmap → `#the-roadmap`, Plans → `#plans` and FAQ → `#faq` only; no "Guide me", no Coaching link, no cohort countdown; hamburger menu below `lg`, wordmark always on one line; no eyebrow label in the hero, since the header already names the offer; founder, 2026-09-28) and the global `Footer` with `showBriefings={false}` (no blog zone on a single-offer sales page; founder, 2026-09-28). The nav and footer "Coaching" links point here. The home Coaching section stays and links to it. Sections live in `src/components/coaching/`; facts, plans and the booking URL come from `src/lib/coaching.js`.

Order: Hero (dark-blue, aurora; a three-fact strip flush under the header, then a single-column headline) → The process (label only, no H2; four real steps) → The private challenge (`#the-challenge`, four cards, 2×2 on phones; each opens the matching home-page section in a full-screen pop-up, `SectionModal.jsx`: Curriculum → `Curriculum`, Transformation → `Value`, Toolbox → `Demo`, Roadmap → `Demo` opened on its Roadmap panel; each card carries an icon in the Toolbox tile style (calendar, sparkles, wrench, map). The pop-up renders the real component so it never drifts from the home page; the visitor never leaves `/coaching`. The pop-up uses a floating round X, top right *(founder preferred it to a top bar, 2026-09-28)*, so every section shown in it must start low enough to clear the X, the way Curriculum does; **Home-page section components are never edited for `/coaching`** *(founder, 2026-09-28)*: every pop-up adjustment lives in `src/components/coaching/ModalSections.jsx` as wrapper overrides (compact spacing for Curriculum; top padding and a taller phone height for the Toolbox so the pop-up scrolls instead of clipping; the Roadmap start panel by pressing the Toolbox's own Next control on open). If a home section changes shape, fix the override there. X, Escape and the back button all close it) → **the 180-day track** (`#the-roadmap`) → The rhythm (a month drawn as four Saturday cards, three live, plus four glass "between Saturdays" cards) → Why a group (italic display pull quote, "Coaching is not" row) → Plans (`#plans`, three cards, 6 Months is the dark anchor, "In every plan" list) → Coaching FAQ → Footer. No closing CTA band after the FAQ (removed by the founder, 2026-09-28).

**Signature element, the 180-day track:** a dark aurora card showing the Roadmap's three overlapping phases to scale on a 180-day axis (1–60, 31–120, 91–180), dashed guides at the 30/90/180 review days, and one tick per coaching Saturday (18 in six months). It is data, not decoration. Keep it true to AISC_BRIEF if the phases or the cadence change. **On phones the session ticks and review guides are hidden** (they cannot read at that width) and replaced by one sentence; phase labels stack.

Mobile rules for this page: four-up grids become 2×2 (the month of Saturdays, the challenge tabs); never use "1:1" as a standalone fact (readers take the whole program to be one-on-one).

**Section spacing:** every section on `/coaching` uses `Section spacing="compact"` (hero bottom padding matches), so the gap between any two sections is the same: 96px on phones, 128px on desktop *(founder, 2026-09-28: consistent and not too wide)*. Do not mix spacings on this page.

No proof section until real coaching testimonials exist. Never add placeholder quotes.

---

## Navigation

- Sticky, minimal
- Logo left, single CTA right: "Secure Your Spot"
- On scroll: subtle backdrop blur or border — does not expand into a full nav
- Links in nav (optional): Curriculum, Pricing, FAQ only
- No hamburger on desktop

---

## Footer — "Dusk" close (v2.1, July 2026)

The footer is a two-zone descent, not a dark slab:

1. **Light zone (Briefings):** the three newest published briefings as floating white rounded-2xl cards (image, gradient numeral kicker `01 / TYPE`, title, date · read time), pulled live via `getAllPosts()`. Background is a **pure 180° vertical fade** from the FAQ's tone (`#f4f5ff`) down to lilac (`#e9eaff`) so the FAQ→footer seam is invisible.
2. **Horizon ribbon:** a 2px full-bleed line, `linear-gradient(90deg, #6368da, #e9eaff, #860471)` — the literal boundary where day meets night. It must glow against both neighbors; never use a gradient whose end matches the dark zone.
3. **Dark zone:** `dark-blue`, opened by aurora glows (see Surface Language below), then brand block, Program/Explore link columns (msaccent underline slides in on hover), legal bar.

### Blog footer (`BriefingsFooter`) — mirrors the global footer's two zones

`BriefingsFooter` follows the same Dusk structure as the landing footer: **Zone 1** is the white→lilac fade (`bg-linear-to-b from-[#f4f5ff] to-[#e9eaff]`) carrying the CTA, then the **horizon ribbon**, then **Zone 2** is `dark-blue` with aurora glows holding the link columns (white text, msaccent hover-underline) and legal. The CTA (`ArticleCta`) is a **white card** (dark text, `dark` + `secondary-light` buttons) resting on the fade — not a dark card.

### Blog hub (`/awakening`) — masthead + card on light

- **Masthead** is flat `dark-blue` (no aurora), so it flows seamlessly out of the `dark-blue` sticky header. It holds only the eyebrow, "The Awakening", and the intro (one word gets a gradient accent). The featured post is NOT in here.
- **Featured post** is lifted out into `FeaturedArticle`: a self-contained **dark aurora card** (`rounded-3xl`, msaccent + warning glows, deep shadow) resting on the white hub background. This "dark feature card on white" is the reusable pattern — same as `ArticleCta`.
- **Everything below the masthead is white** (the `main` bg). Featured card, then taxonomy, then grid, in ONE section with a single rhythm. Never split taxonomy and grid into two padded sections — that stacks padding into a dead gap. A `border-t` divider with a "All briefings / N briefings" row carries into the grid.
- **Filter chips** (`TaxonomyNav`) are pills: inactive `bg-white/50` + border; active `gradient-200` fill.
- **`ArticleCard`** (hub AND all category pages) is `rounded-2xl`, soft two-layer shadow, hover lift + image `scale-[1.03]`, gradient type label. No hairline borders.

**Dev note:** the `[slug]` route uses `generateStaticParams`; rapid mid-edit HMR can wedge its worker ("Jest worker … retry limit"). It is a dev-only transient — confirm correctness with `npm run build` and restart `npm run dev` to clear.

---

## Surface Language v2.1 (July 2026) — supersedes conflicting notes above

Michael approved this vocabulary from the footer/Audience/Pricing work; extend it to other sections when asked.

| Element | Rule |
|---------|------|
| **Buttons** | Always pills. `rounded-full` is baked into `global/Button.jsx` base styles — use the Button component, never hand-roll square buttons. Badges/chips are also `rounded-full`. |
| **Cards** | `rounded-3xl` for section cards, `rounded-2xl` for nested/small cards. **No sharp edges anywhere.** No `gap-px` hairline mosaics — cards float independently with `gap-6`. |
| **Glass** | On light sections: `border border-white/60 bg-white/55 backdrop-blur-xl` + layered shadow. Glass needs ambient color BEHIND it to refract — place 1–2 large radial glows (msaccent ~0.15–0.22, warning ~0.09–0.14) behind the card grid, `pointer-events-none`. |
| **Dark feature/anchor card** | Dark cards are `bg-dark-blue` (flat) made dimensional by an internal **aurora**: absolute radial glows (msaccent ~0.24–0.28, warning ~0.13–0.16), `overflow-hidden`, content wrapped in `relative`. The aurora is what keeps flat navy from reading cheap — do NOT use a blue→plum gradient fill (tried, rejected as ugly). One card per grid is the dark anchor (Chief card, VIP tier, blog featured card). |
| **Text is never gradient** | HARD RULE: never clip a gradient to text (`bg-clip-text text-transparent`, `.text-gradient-*`). Gradients are for backgrounds, fills, borders, and the horizon ribbon only. For emphasis inside a heading use a solid token: `text-lilac` on dark, `text-msblue`/`text-msaccent` on light. The `.text-gradient-*` utilities have been removed. |
| **Aurora (dark zones)** | Dark sections open with 1–2 huge radial gradients bleeding from the top edge: msaccent at ~0.16–0.2 and warning at ~0.11–0.14, both fading to transparent by 60%. Makes navy luminous instead of flat. |
| **Light backgrounds** | Ice family only: `#f4f5ff` base, `#e9eaff` (lilac) deep end. **Fades on light sections are vertical (180°) only — never lateral or radial tints on a light section background** (radial glows are for behind glass cards and on dark zones, not as light-zone washes). |
| **Shadows** | Two-layer: rest `0_1px_2px_rgba(0,3,76,0.06), 0_8px_24px_rgba(0,3,76,0.08)`; hover deepens + `-translate-y-1`. Dark cards: `0_2px_4px_rgba(0,3,76,0.15), 0_16px_40px_rgba(0,3,76,0.25)`. |
| **Gradient budget** | Gradient appears as jewelry, not paint: the horizon ribbon and `gradient-200` accent fills (e.g. active taxonomy chips). Never on text (see rule above), never as a card fill. |
| **Motion** | 200–300ms ease-out, transform/opacity only. Card hover lift, image `scale-[1.03]`, arrow `translate-x-1`, underline width slide. No parallax, no scroll-jacking. |
| **Tailwind note** | Use canonical v4 classes: `bg-linear-to-b` (not `bg-gradient-to-b`), spacing-scale sizes (`h-130` not `h-[520px]`). |

---

## Tech Notes

- Framework: Next.js (see `AGENTS.md` for version-specific guidance — read `node_modules/next/dist/docs/` before writing code)
- Styling: Tailwind CSS v4
- Color tokens live in `src/app/globals.css` as CSS custom properties — use the tokens, never inline hex
- Check `src/components/` for existing components before creating new ones
- Fonts: Inter (`--font-inter`) for body; PT Sans Narrow (`--font-ptsans`) for headings
