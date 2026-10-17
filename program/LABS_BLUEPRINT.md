# Labs: the blueprint

> **Status:** a structure preview, built 2026-10-11 on the founder's answers that day: five kinds of page, placeholder content, no gates. **The founder signed off the structure on 2026-10-16** ("His answers of 2026-10-16", near the foot). It replaced the scaffold of 2026-10-08. Labs is not open to participants: a switch keeps it shut in production (`LABS_LIVE`, see "Settled after his first look"). **Read "The structure" at the foot of this file first.** Where it disagrees with a section above it, it is the later word.
> **Goes with:** `DAY_2_AI_READINESS_SCOPE.md`, which moved Margins, the Loop, Agency, Proof of Leverage and the AI Safety Guidelines out of the 7-day challenge. This file says where they land.
> **In code:** `intelligence/src/lib/labs/` (the catalogue and the access rule) and `intelligence/src/app/(protected)/labs/` (the pages).

## What Labs is

Labs is where a leader goes after the challenge to put the seven days into practice. It is one place with four shelves.

**"Labs" is the name of the place.** The four shelves each have their own name. Say "Labs" for the whole, and the shelf's name for a part.

## Founder decisions (2026-10-08)

- **The whole place is "Labs".** Its header reads **"AISC Labs"**.
- **Labs carries the design of the AISC Learning Center:** the same frame, sidebar and dark content panel, with Home and Profile at the foot of the sidebar.
- **Platform Awareness** keeps its name, and is **"Platforms"** for short. Always available to any signed-in leader.
- **AISC+** is the name for the challenge deep dives. It needs AI Labs access from the beginning.
- **The 4Ds are split between the challenge and AI Labs** (founder, 2026-10-10). The challenge takes Delegation, on Day 1, and Diligence, on Day 7. Description and Discernment belong to AI Labs. **No AI tool is needed during the seven days:** work with AI begins in AI Labs, and Day 0 tells participants to plan for a tool by then. Made stricter the same day, at the Day 2 review: **any task that involves AI is pushed to AI Labs**, watching a colleague use it included. In the challenge's documents that work sits under the label "In AI Labs", so participants know what to expect. **The rule is about work the participant does with AI, not work a tool does for them:** the Territory Builder on Day 3 still writes the declaration with AI, once, because "this is done for them" (founder, 2026-10-10).
- **What does not fit into Day 2 is kept for AISC+** (founder, 2026-10-10). From his readiness notes and the resource they follow: the maturity levels, the principles of responsible AI, the roles for scaling AI and interdisciplinary teams, a culture of testing, learning and trust, change management, pilots, iteration and scaling, measuring return, governance frameworks and alignment with business objectives, the final readiness checklist, the worked cases and the common mistakes. **Day 2's guide already names six of these to participants, one under each dimension, as what AI Labs holds:** choosing a first use case; getting data ready; roles and training; a first pilot; measuring return; and a culture of testing, learning and trust. Those six are commitments to keep when AISC+ is built. The list is in `DAY_2_DOCUMENT_REVIEW.md`.
- **AI Labs, with AISC+ under it, is recorded sessions only** (2026-10-09). To a leader, what AI Labs offers is called "Recorded Sessions".
- **Say what is free and what is paid** (2026-10-09). A bare "3 months" confuses. Wherever a leader's months are shown, say that the first months are free and that AI Labs is by subscription.
- **AI Labs** is the paid shelf, by subscription. The free months are the way in: **1 month for General Admission, 3 for VIP, 6 for VVIP.**
- **Labs opens a day after Day 7 opens, with Next Steps and the Profile, and the free months count from then** (founder, 2026-10-11): "I think it's wise to allow day 7 breathe with the AI governance. Day 8 is a good time for profile, labs and next steps to open." The three open at the same moment, 24 hours after the Day 7 page does. The pages say "the day after Day 7" and not "Day 8", because the challenge is seven days. This replaces the rule of 2026-10-09, under which Labs opened on Day 7 itself. The start date is Day 1. In the schedule Labs is still the entry after Day 7, "Beyond Day 7".
- **AI Stakeholder Labs** is live sessions for participants in group coaching, and only for them (2026-10-09). This replaces what the name meant before (the whole post-challenge resource).
- **Private Viewing is an add-on, not a tier.** It does not change anyone's free months.
- **No upgrade bought inside the challenge changes the free months in any way** (2026-10-09). Only the package the leader joined on counts. A General Admission leader who buys the VIP review still has one free month.
- **Taking the challenge again resets everything.** The free months start again from Day 7 of the latest challenge.
- **Everything in the Toolbox also appears in AI Labs.** When a subscription ends, the tools and resources are still in the person's profile. **The Toolbox stays in the Profile even once Labs is configured** (founder, 2026-10-10): it is in both places.
- **The old Day 2 documents stay in the Toolbox as "Labs Resources".** The resources part of the Toolbox has that group (added 2026-10-09), so the documents are still there after a subscription ends.
- **The Leadership Brief:** two copies exist. The Toolbox's copy is the fuller document and the one to use (2026-10-09). The catalogue links it.
- **The old Day 2 page is kept as it was** (2026-10-09), in `intelligence/src/deprecated/challenge-day2-page.jsx`. Labs may use it in that exact format.
- **Days 1, 2, 3 and 7 lock together 48 hours after the challenge closes, when their replays stop** (2026-10-10). Onboarding and Day 0 lock when the challenge closes. **The Roadmap (Day 6) never locks:** it is built after the challenge, and the Toolbox's Roadmap tile opens it. After the lock, Home, the Roadmap, Next Steps and the Profile stay open. This replaces the line of 2026-10-09, that all seven days lock when the challenge ends, the Roadmap included. **Only Day 3 reopens in AI Labs** (founder, 2026-10-10): it holds the Milestone Task, and many will come back to it. The other days do not reopen as they are. They become deeper dives in AISC+. **The Toolbox also appears in Labs,** so every day's resources, and more, stay within reach. Details come later: Labs is not properly configured yet. *The lock was built 2026-10-10. Nothing of the reopening is built.* **Day 3 does not reopen** (founder, 2026-10-16): "Day 3 resources is already available in AISC resources in the toolbox." See "His answers of 2026-10-16".
- **Content is added by the founder from admin.** Not built yet.
- **Price:** left for later.

## Four shelves, three keys

| Shelf | Short name | Holds | Opens with |
|---|---|---|---|
| Platform Awareness | Platforms | AI tools and how to use them | Being signed in |
| AISC+ | | The challenge deep dives: the old Day 2, Agency, Proof of Leverage, AI Safety | AI Labs access |
| AI Labs | | Recorded sessions of premium learning and practice, plus everything in the Toolbox | AI Labs access |
| AI Stakeholder Labs | | Live sessions for the coaching group | Being a coaching client |

Three keys open four shelves: being signed in, AI Labs access, and being a coaching client.

**AI Labs access today** comes only from the free months. It runs from Day 7 of the leader's latest challenge (six days after the cohort's start date, from the first minute of that day) for 1, 3 or 6 months, to the end of the last day, by the package on their challenge row. A subscription, when it is built, becomes a second way to hold the same key.

## One catalogue

Shelves hold tracks. Tracks hold items. An item is a video, a live session, a document or a tool.

In the scaffold the catalogue is one data file, `intelligence/src/lib/labs/catalog.js`, shaped as the later tables will be (`labs_tracks`, `labs_items`), so moving it into admin later is a copy, not a redesign. An item with no link yet is shown as "not yet available".

## Where the old Day 2 goes

Everything below lands in **AISC+**. The documents are linked where they already live. No Google Doc is moved, edited or re-shared.

| Track | Holds |
|---|---|
| Margins | Protecting Your Margins, the Margin Calculator (the tool and the spreadsheet), and the "Redeem Your Time" task |
| The Loop | The Augmentation Toolkit, the Augmentation Sprint Template and The Leadership Brief. Discernment (D3) is taught here if needed |
| The Multiplier and Proof of Leverage | The Multiplier part of the old session, and Roadmap Section 2, completed from Labs experiments |
| Working Safely | AI Safety Guidelines, whole |
| Agency | Agency: The Next Frontier, and the old Day 3 slides 18 and 19 |

The old Day 2 session notes (Margins, Method, Multiplier) are facilitator material. In Labs they become the source for the recorded sessions of the first three tracks.

**In the Toolbox**, a "Labs Resources" group holds the old Day 2 documents and Agency: The Next Frontier (done 2026-10-09). The links are written once, in the catalogue, and the Toolbox reads the same list, so no link is kept in two places. The Margin Calculator stays among the Toolbox's tools, beside the new Readiness Scorecard.

## What the scaffold is

- A Labs home at `/labs` and a page for each shelf, behind sign-in, in the Learning Center's frame (`components/labs/LabsShell.jsx`). The sidebar lists Labs Home and the four shelves, with a lock on each one the leader cannot open. A locked shelf can still be opened to see its tracks.
- Home goes to `/`. Profile is the challenge profile, so a leader with no active challenge sees Home only.
- One access rule, read from what already exists: the leader's challenge rows and each cohort's start date.
- The catalogue above, with the old Day 2 documents linked and every recorded-session slot marked "not yet available". AISC+ and AI Labs list no live session.
- No new table, no payment, no admin, no video player.
- **The door is a Labs icon beside the profile button** in the Learning Center (founder, 2026-10-09). It is disabled until Day 7 of the leader's cohort. From Day 7 a small notice, "Labs are open", shows once, the first time the leader is in the Learning Center while their free months run. Seen-or-not is kept in the browser. Only AI Stakeholder Challenge cohorts get the icon. It is pink (founder, 2026-10-09), so it is not taken for the Home button beside it: open, a filled chip running from a deep pink into fuchsia with a white flask; shut, a pink tint, set separately for the pale sidebar on a wide screen and the dark menu on a phone. **The Toolbox's AI Labs tile follows the same Day 7 rule and wears the same pink** (founder, 2026-10-09).

## Left for later, each reviewed before it starts

1. **Labs Manager in admin**, with the tables `labs_tracks`, `labs_items` and `labs_access`. The schema goes to the founder as SQL to approve and run.
2. **Gated video and live sessions**, with replays.
3. **The AI Labs subscription**, once a price is set, enforced on the server.
4. **AI Stakeholder Labs** for the coaching group.
5. **Opening Labs to participants, then the Day 2 switch.** At the switch the Toolbox's resources change in one go: the Day 2 group takes the new Day 2 documents and "Labs Resources" takes the old ones.

## Small details, noted and not decided

- **"Labs are open" after Day 7.** The founder asked for the notice on Day 7 (2026-10-09). Since 2026-10-11 Labs opens a day after Day 7 does, so the notice first shows then. A leader who is not in the Learning Center that day sees it on their next visit, as long as their free months are still running.
- **When the free months end.** The scaffold says the access has ended and that subscription is not open yet. What a leader is offered at that moment waits for the price.
- **A retake on a lower tier.** "Resets everything" is followed exactly: the latest challenge to reach Day 7 sets the months. A leader with months left from a VVIP challenge who retakes as General Admission would be reset to 1 month. Rare, and worth a decision before Labs opens.
- **During a retake.** Until Labs opens in the new challenge, the months from the earlier challenge still count. They restart on the day it opens there, the day after the new challenge's Day 7.
- **Only the AI Stakeholder Challenge counts.** A row for another challenge (AIGC) opens nothing in Labs.
- **Profile during a challenge.** The challenge keeps the profile locked until Next Steps opens. Next Steps opens 24 hours after Day 7 opens (founder, 2026-10-11), so the Profile, the certificate and the Toolbox do too, a day after Labs opens. A leader who clicks View Profile from Labs before then is sent to their current challenge page. The Learning Center shows a locked button in that case and Labs does not.
- **Platform Awareness has no content yet.** The shelf shows its description until the founder supplies the first items.
- **Coaching's live sessions are three Saturdays a month, 7PM WAT, two hours** (`SOURCE_OF_TRUTH.md`). The placeholder sessions in the structure preview are an hour long and fall on any day. They are placeholders, not a change to that.

## The founder's description of Labs (2026-10-11)

Given as a guide for wording the Labs tab on Next Steps: "We haven't started working on labs yet but use this as a guide to word the labs tab better." Kept here word for word, because it is the fullest account of Labs in his own words and the place to start when Labs is worked on.

> **About Labs**
>
> Labs, also referred to as AISC Labs is a platform where the theoretical AI Stakeholder learnings are practiced. It's a platform for experiments with AI environments working on tasks, workflows and projects using AI Fluency, AI Agents, frameworks and methodologies.
>
> These are the tiers in Labs
>
> 1. Platform - This focuses on platform awareness. Knowing what a platform offers and its strengths. Learning its features, capabilities and models. This tier is free forever for AI Stakeholders. On the platform, each AI environment represents an archive, each segment is a module and each feature is a video.
>
> 2. AI Labs - This is a more result oriented approach in AI environments where problems are solved using unique skillsets. In AI Labs, use cases like website design, content creation and more. This is a premium tier, paid monthly and open to stakeholders who have a subscription. On the platform, these can be one off videos, a module consisting of several videos, or when it's a huge topic displayed as a course.
>
> 3. AISC+ - This is a deeper dive into AISC materials and learnings. It covers in depth more concepts concerning how to lead with AI, Adoption, Change management, Fluency, Value, Governance and much more. This is a VIP tier, paid monthly and open to stakeholders who have a subscription. On the platform, these take the shape of the day pages in the challenge.
>
> 4. AI Stakeholder Labs - This includes everything in AI Labs and AISC+ plus live group calls 3x monthly to answer any questions or engage in live demos concerning what you are building. Highly practical and result oriented. A subscription is not available on this tier. It is accessed only by participants in the AISC group coaching. On the platform, these are videos of past recordings and links to the next session or a special event.

**Confirmed the same day:** "Platform, AI Labs, AISC+ and AI Stakeholder Labs are now all different stand alone tiers. When we get to Labs and other places we will update the information." The four are separate tiers, each with its own way in. The build still has four shelves and three keys, and stays so until Labs is worked on.

**Where it differs from what is built and recorded above.** Nothing in Labs was changed on the strength of this text. These are to be worked through when Labs is.

- **The first tier's name.** He writes "Platform". The shelf is built as "Platform Awareness", with "Platforms" for short.
- **The order.** His: Platform, AI Labs, AISC+, AI Stakeholder Labs. Built: Platform Awareness, AISC+, AI Labs, AI Stakeholder Labs.
- **AISC+ has its own subscription, at a higher tier.** He calls AI Labs "a premium tier" and AISC+ "a VIP tier", each "paid monthly". As built, there is one key, AI Labs access, and it opens both. So it is not yet said which the free months after the challenge open: AI Labs alone, or both, as they do today.
- **AI Stakeholder Labs includes everything in AI Labs and AISC+.** As built, the coaching shelf is its own, and coaching is recorded as giving "AI Labs for as long as coaching lasts".
- **How each tier is laid out** (archives, modules and videos; one-off videos, modules or a course; pages shaped like the challenge's day pages; past recordings and the link to the next session) is new, and is the brief for the Labs pages when they are built.

**Used so far, and how:** as context for the Labs tab of the hub on Next Steps (`intelligence/src/components/challenge/NextStepsHub.jsx`). The tab first listed the four tiers and what each means, and he had it cut back the same day: "The copy in AI Labs should be summarized. I didn't mean add the tiers and their meanings there. It's too much information. I only shared my notes so you have better context." The tab now says what Labs is, in two sentences drawn from his opening lines, then the leader's free months, then the way in. **These notes are context for whoever writes about Labs. They are not copy to put in front of a leader.**

## The structure (founder, 2026-10-11)

He asked for Labs to be designed with Claude Academy as the reference for its structure: "Let's use all the information available to design an intuitive and easy to navigate Labs. Ask clarifying questions." The report on the Academy, with its visual pass, is `PENDING_TASK_labs-academy-reference.md` at the ecosystem root. Eleven questions were put to him. His answers are below in his own words, then what was built on them.

### His answers

1. **The ladder.** "Platform is free forever for all AI Stakeholders (Anyone with challenge access). AI Labs is the premium tier. AISC + is the VIP tier. VIP members get access to premium. AI Stakeholder Labs gets access to Premium and VIP. The challenge promises work in AI Labs because general admision, vip and vvip all get free AI Labs subscriptions to start with."
   - So each tier opens everything before it: Platform Awareness (free), AI Labs (Premium), AISC+ (VIP), AI Stakeholder Labs (group coaching).
   - The free months after the challenge are a free AI Labs subscription. **They do not open AISC+.**
   - This replaces "four shelves, three keys", and the line that AISC+ "needs AI Labs access from the beginning". The order is his: Platform Awareness, AI Labs, AISC+, AI Stakeholder Labs.
2. **Who Platform Awareness is free for.** "Any user with challenge access."
3. **Gates and subscriptions: not yet.** "We are not adding gates and subscriptions yet. Let's first get the structure with placeholder dummy data where necessary. Let's be sure the structure is solid first before we continue."
4. **Two ways in, by tier and across everything: agreed.** "The search bar should be very intuitive. I like how Claude academy handled theirs."
5. **A leader sees what they cannot open.** "Yes they should. How else will they be motivated to upgrade?"
6. **The first tier's name.** "Platform Awareness, but platform for short in places like menus."
7. **One order for every video page** (what you will be able to do, the video, a short summary, a task to try, resources, previous and next): "I like the suggestions, but no transcripts for now."
8. **Progress.** "Agreed. It's important they can tract their progress. But i don't want too much tables in my backend so let's be smart about this. Also this comes later. Let's handle structure first. I want to be able to see the site transformed and navigate through all the pages to see what it's like."
9. **Content.** "Nothing is ready yet, but I'm going to use Cloudflare to host the videos. Content and links will be handled my the admin."
10. **A wider page than the Learning Center's 800px, in its colours and type.** "Let's see what your recommendations look like."
11. **What goes where.** "Anything that was in the challenge coming to labs goes to AISC+ and is going to be expanded into smaller bits through video contents and more resources and tasks. AI Labs and AISC+ are mostly recorded. There's no plan at the moment for live sessions. Live sessions belong to AI Stakeholder Labs."

### What was built: a structure preview

Uncommitted, in `intelligence`. The content is placeholder and nothing is gated. A bar at the top of every page says so.

**One tree,** in `src/lib/labs/library.js`:

| Level | What it is | To a leader |
|---|---|---|
| Tier | The four, on a ladder | Platform Awareness, AI Labs, AISC+, AI Stakeholder Labs |
| Collection | What a tier holds | A platform, a course, a module, a topic |
| Module | A named group of lessons inside a collection | "Module 1: Getting started" |
| Lesson | One page | A video. In AISC+, a deep dive |
| Single video | A lesson that stands alone, in AI Labs | A video |
| Session | A live call, in AI Stakeholder Labs | Coming up, or its recording |

It follows his own account of each tier: a platform is an archive, each part of it a module and each feature a video; AI Labs holds one-off videos, modules and courses; AISC+ takes the shape of the day pages; AI Stakeholder Labs holds past recordings and the link to the next session or a special event.

**Five kinds of page,** each with one address:

| Page | Address | From the Academy |
|---|---|---|
| Labs Home | `/labs` | Home: what it is, a way to begin or continue, the tiers, what is new |
| Browse all | `/labs/browse` | The catalog: filters kept in the address, so every "View all" is a link to it |
| A tier | `/labs/[tier]` | The product hub |
| A collection | `/labs/[tier]/[item]` | The course page: what it is, how much, how long, Start, and everything in it |
| A lesson | `/labs/[tier]/[item]/[lesson]` | The lesson page, with the outline beside it. A single video and a session are this page too |

**On every page:** a frame in the Learning Center's shape (a bar on top, a sidebar on the left with Home and Profile at its foot, a slide-out menu on a phone), with the content at the full width beside the sidebar; a menu of Labs Home, Browse all and the four tiers, where the tier being looked at opens to show what is in it; search from the top bar or Ctrl K, which reaches down to the single lesson; and a way back above every title.

**Every card ends with one line** saying what it is, how much is in it and how long it takes: "Course · 4 modules · 14 videos · 1 hr 58 min". There are two card forms, three across and full width.

**The colours** were redone the same day, at his word. See "The colours" below.

**A lesson page, in order:** its title, its place ("Video 2 of 11") and length; "In this video", with what the leader will be able to do; the video; a summary; a task; resources; previous and next. An AISC+ deep dive is the same page with the names a challenge day uses: Part One for the session, Part Two for the task, Documents for the resources.

**Locked things are shown, not hidden.** A locked card says what opens it ("Premium", "VIP", "Group coaching"). A locked lesson keeps its title, its outcomes and its summary, and holds back the video, the task and the resources.

**Two stand-ins, both in the browser only** (`src/components/labs/labsPreviewStore.js`), so the structure can be walked as it will be. Neither reaches the server, and both go when the real thing is built:

- *"View as",* in the bar at the top: Challenge access, Premium, VIP, Group coaching. It decides only what is drawn as locked. It starts at Group coaching, which is everything open, because nothing is gated yet.
- *"Mark as watched",* which gives the ticks in an outline, "3 of 11 watched" on a card, and "Continue where you stopped" on Labs Home.

**The placeholder content:** five platforms (one with nothing in it yet, to show that state; **four since 2026-10-13**, when NotebookLM, the empty one, was taken out at his word, leaving Claude, ChatGPT, Gemini and Microsoft Copilot), two courses, two modules and four single videos in AI Labs, six topics in AISC+, three sessions coming up and five recordings. What is real in it: the tiers, the names of the five AISC+ topics that left the challenge and of their documents, and a sixth topic holding the six subjects the Day 2 guide tells participants Labs covers. No link in it is real. The documents' links stay in `catalog.js`, which the Toolbox reads.

**What became of the first scaffold.** `catalog.js` stays, because the Toolbox reads its Labs Resources. `access.js` (since 2026-10-16 `labsAccess.js`) stays unchanged: the rule for the free months is still used by Next Steps, the schedule and the Labs icon, and will be the start of real access. The two components and two pages it replaced are kept in `intelligence/src/deprecated/labs-scaffold-2026-10-08/`. The folder in the address is still named `[shelf]`.

**Checked** in a headless browser, through a temporary signed-out page since moved out of the repo: 19 views with no page error, no dead link and no sideways scroll, four of them again at phone width; marking a video watched and finding it on Labs Home; the locks at each of the four views; search (opening, typing, arrows, nothing found, closing); and the Browse filters. Lint reports nothing. **Not checked:** the five real pages under `/labs` opened signed in. Signed out, each one sends to the login page, as it should.

### The colours (founder, 2026-10-11)

The structure was first built with each tier's colour used large: as the block at the head of a card, and as a tint behind a page's title. He saw it and said: "For the colors, consider maintaining one dark theme and a lighter shade of the dark theme just like Claude Academy. Then we can retain the colors for each tier as an accent. The current color blends are not working. Use the front end skill and screen shots to observe and compare."

**What the Academy does, measured from its pages:** the page, the top bar and the side rail are one near-black (`#151515`). Cards, boxes and the band behind a home page's title are one step lighter (`#20201f`). What is chosen or hovered is a step lighter again (`#262626`). Lines are hairlines.

**What Labs does now,** in `intelligence/src/components/labs/labs.css`:

| Tone | Value | Used for |
|---|---|---|
| Page | `#0b0e2c` | The page, the top bar, the sidebar |
| Card | `#14183d` | Cards, boxes, the band behind a page's title, the search box |
| Raised | `#1d2250` | What is chosen or hovered, the task on a lesson, and the slot where a card's picture will go |
| Line | lilac at 10% | Every border |

It keeps the Academy's spacing between tones and takes the app's own dark, a navy, in place of a neutral black. The saturated dark-blue of the first build is gone from Labs.

**A tier's colour is now only a small mark:** the dot beside its name in the menu and on a card, the square that holds its icon, and the icon in a card's picture slot. Never a field, never a tint.

| Tier | Colour |
|---|---|
| Platform Awareness | Lilac, `#e9eaff` |
| AI Labs | Pink, the Labs icon's, `#f0489c` |
| AISC+ | Periwinkle, `#8187f2` |
| AI Stakeholder Labs | Gold, `#e3b54f` |

**These are the founder's own assignment** (2026-10-11, after seeing the first set): "Platform Awareness should be Lilac / AI Labs - Pink / AISC+ - Periwinkle / AI Stakeholder Labs - Gold". The first set had periwinkle for Platform Awareness, lilac for AISC+ and blue for AI Stakeholder Labs. He named the colours and not their values: lilac and periwinkle are the Learning Center's own, the periwinkle lifted a little to be read on the dark, and the gold was chosen to sit with them.

**The frame is dark too.** With the new tones, the Learning Center's white bar and lilac surround were tried against a bar and sidebar on the one dark. Side by side, the pale surround made the content a dark box in a light frame, and the dark frame made Labs one place, as the Academy is. It was built both ways and set to dark. One word in `LabsShell.jsx` (`FRAME`) changes it back. The frame's shape, his decision of 2026-10-08, is unchanged. **This is a choice made for him to confirm,** since he had not asked for the frame to change in so many words.

**Also changed for the same reason:** the task on a lesson page was a pale block with dark text and is now a box in the raised tone; the second button on a page is quiet, in the raised tone, where it had a heavy outline.

**Checked** the same way as the structure: every view and every interaction again, in a headless browser, with no page error, no dead link and no sideways scroll; lint reports nothing. Screenshots were compared with the Academy's at each of three rounds.

### Settled after his first look (founder, 2026-10-11)

- **The word "tier" stays, for a leader too.** He first found it "a bit off" in the front end, and was offered "areas", "spaces", "levels" and "labs". His answer: "TIER sounds better than all four. Maybe we keep it." Nothing was changed. If it is raised again, those four have been considered.
- **The menu's first line reads "Home",** where it read "Labs Home".
- **The menu never lists content.** As first built, opening a tier listed every platform, course, module and topic in it, with no limit. He asked: "Is that sustainable? How about when there are many topics or videos? Will they all appear in the drop down?" They would have. The plan put to him, and approved ("Your plan is approved"):
  - the menu is six lines for good: Home, Browse all and the four tiers;
  - under the tier a leader is in, one line marks where they are (inside Claude, "Claude" under Platform), and nothing else. **That line was taken out on 2026-10-13, at his word:** "I noticed dropdowns in the Menus in the Tier section. That area should not show and child links or sub titles anymore... when I click on Claude, I don't want to see 'claude' pop up under Platform in the menu". So nothing is ever drawn beneath a tier, on the sidebar or in the phone's slide-out menu. The tier's own line stays lit while a leader is anywhere inside it, and the trail above the page's title says the rest. The Toolbox's four lines are lines of the menu, not lines beneath one, and are unchanged;
  - the lists are on the tier's page, which shows a few of each kind (six cards, or five rows) with "View all" opening Browse already filtered;
  - search reaches the rest.
  A short "Recent" list, capped, is a later option once progress is saved.
- **Labs is shut in production until it has real content.** He paused the Labs work to push the rest: "I want it visible in dev/local but not in prod." The rule is one function, `labsLive()` in `intelligence/src/lib/labs/live.js`:
  - live under `npm run dev` on this machine, and on a preview deployment (the `dev` branch);
  - shut in production, and shut wherever the host does not say which kind of deployment it is, so it fails shut;
  - **opened in production by setting the environment variable `LABS_LIVE` to 1 there,** with no change to the code. Setting it to 0 shuts Labs anywhere.

  Shut, every page under `/labs` answers "not found" (`app/(protected)/labs/layout.jsx`), and `buildChallengeContext.js` tells the Learning Center the challenge has no Labs. Each door already knew what to do then: the Labs icon and the "Labs are open" notice are not drawn, Next Steps has no Labs tab, and the Toolbox's AI Labs tile is shut, with "Coming soon" when pointed at. No new words were written for a leader.

  **What the switch does not touch:** the challenge's own sentences about Labs. Day 1 says work with AI "begins in AI Labs, which opens the day after Day 7", and the schedule's last entry is AI Labs, opening the next day. Days 2 and 7, the Roadmap and the coaching card name AI Labs without a date. And the free months still count from the day after Day 7 while Labs is shut. Both are in `LABS_TRACKER.md`, steps 27 and 40.

### The Toolbox (founder, 2026-10-12)

His words: "The toolbox will always be available to users with challenge access. Just like TIERS we will also have TOOLBOX. We have the following in toolbox.
1. AISC resources - All AISC Day 1,2,3 & 7 resources. (Including The leadership Brief and Saftey Guidelines)
2. Roadmap + walk through Video (Not yet ready)
3. Mini Apps (All Mini Apps from AISC)
4. Margins (How to calculate margins, How to use the results to win the board over etc)"

- So the Toolbox is its own part of Labs, beside the four tiers and not inside one of them. It opens with challenge access, as Platform Awareness does, and never closes.
- This settles the first half of "The Toolbox in AI Labs, and Day 3 reopening" below: the Toolbox is not in AI Labs. Day 3 reopening is still open.
- His list of every document and its link is the Google Doc "AISC RESOURCE LINKS" in his Drive. Its Toolbox table gives the resources as Days 1, 2, 3 and 7, The Leadership Brief, The Augmentation Toolkit, the AI Safety Guidelines, the Margin Calculator spreadsheet and Protecting Your Margins, and the mini apps as the Delegation Matrix, the Readiness Scorecard, the Territory Builder and the Margin Calculator. It puts Agency: The Next Frontier under "AI Labs - Agents", and marks the Augmentation Sprint Template as deprecated.
- The Day 2 links were added from that list the same day (`intelligence/src/lib/challenge/day2Resources.js`).

**Five questions were put to him the same day. His answers:**

1. The Margin Calculator app is shown in both Mini Apps and Margins: "Agreed".
2. The Augmentation Toolkit: "I want to merge the document with the 'Advanced_Diligence_Delegation_Loop' to create a more balanced resource on the 4D's and the 2 loops." That second document is a Google Doc in his Drive. **The merge is not started.** The merged document took the Toolkit's place the same day: see "The merged document" below.
3. The Augmentation Sprint Template is removed from the app, and Agency: The Next Frontier leaves the Toolbox for AI Labs: "Yes".
4. The four Day 6 documents go in the Roadmap group: "Agreed".
5. Where it sits: "I mean Toolbox gets its own space like Tiers. Home, Browse all, Tiers, Toolbox".

**What was built** (2026-10-12, uncommitted, in `intelligence`):

- **One list,** `src/lib/labs/toolbox.js`, holding the four groups. It writes no link of its own except Days 1 and 3, which have no list elsewhere: Days 2, 6 and 7 come from their own files, and the old Day 2 documents from `catalog.js`, by id.
- **The Toolbox's own page,** `/labs/toolbox` (`components/labs/LabsToolbox.jsx`). The four groups down the page, with a line of four links at the top to jump to each. A document is taken as a copy, a mini app opens over the page, the Roadmap opens its page, and what does not exist yet says "Not yet available": the walkthrough video, and the two Margins subjects in his words.
- **The menu** reads Home, Browse all, Tiers (the four), then Toolbox with its four groups under it. First built as one line under a rule. He saw it and said: "What you did is okay, but also do the four lines under the Toolbox heading like Tier." So the four are lines of the menu, each opening a page of its own, `/labs/toolbox/[group]`, and the heading "Toolbox" opens the whole of it. The Toolbox is not on the ladder, so "View as" never locks it. Labs Home has a card for it under the tiers. The groups' names are in `src/lib/labs/toolboxSections.js`, which holds no link, because the menu is drawn on every Labs page.
- **Unlike the tiers, this page holds real links.** So one rule is kept on the server: a signed-in user with no challenge is sent the groups with every link held back.
- **The Profile's Toolbox card reads the same list.** Its tiles are unchanged. Its Resources list is now Days 1, 2, 3 and 7, "Working with AI" (the Brief, the Safety Guidelines, and the Toolkit, since replaced by The 4Ds and the Two Loops), Roadmap and Margins. "Labs Resources" is gone, and with it the Sprint Template and Agency.
- **The set name "Working with AI"** holds the three documents that belong to no one day. His word on it: "Working with AI is a good name for now."

**Checked:** lint reports nothing, every changed file parses, and the list was printed as the pages read it (21 documents, 4 mini apps). **Not checked:** any of these pages opened in a browser, signed in.

**Left as it was:** the Toolbox is not in Browse or in search.

**Agency** (founder, 2026-10-12): "Agency is under AI Agents in AI Labs." In the preview it was an AISC+ topic. It is now a module, with its document, inside a course named "AI Agents" in AI Labs (`src/lib/labs/library.js`). So AISC+ holds four topics that left the challenge, not five, and the table "Where the old Day 2 goes" above is out of date on that line.

**The merged document** (2026-10-12, at his word: "You can start the merge"). A draft is in his Drive as a new Google Doc, "AISC_THE 4Ds AND THE TWO LOOPS (DRAFT)", in My Drive, unshared. Neither source was changed. What it is:

- An opening that names the 4Ds and pairs them into the two loops. The four one-line definitions are new.
- Loop 1, Description-Discernment: The Augmentation Toolkit, whole (six techniques, four questions, when to stop).
- Loop 2, Diligence-Delegation: "Advanced_Diligence_Delegation_Loop", whole (the principle, five stages, the worked example, the template).
- A quick reference for both.
- **Written new, and marked so in the draft:** a short worked example and a template for Loop 1, so the two loops have the same parts.
- **Taken out:** the "trilogy" and its third model, Description-Prompt, since he asked for the two loops; every "Day 1 / Day 2 / Day 3" and "this programme", which describe the challenge as it was; and the dashes, for plain sentences.
- **Approved, then designed** (founder, 2026-10-12): "The merged document is good. Just format it properly and use the design mental model from the othr resources. Once all is done and the switch is made, I'll tag the two documents deprecated." So it was rewritten as a programme resource, `program/resources/toolbox/the-4ds-and-the-two-loops.md`, and built with `scripts/program-docx.mjs` into the designed document beside it (`.docx`, 22 pages: cover, title page, navy bands for Loop 1 and Loop 2, callouts, striped tables, and templates with room to write). The build was rendered through Word and every page looked at. The page breaks were set from that.
- **Not done, and why:** the designed document is not in his Drive. The Drive connection can make a document from text, not upload a Word file, and it cannot set "anyone with the link". He uploads the `.docx` and shares it, as with the Day 2 documents. The first draft in his Drive was renamed "(FIRST DRAFT, SUPERSEDED BY THE DESIGNED DOCUMENT)" so the two are not confused. It is plain, and is not the one to link.
- **The switch is made** (2026-10-12). He uploaded the designed document as "AISC_THE 4Ds AND THE TWO LOOPS", shared so anyone with the link can view. The Toolbox now links it in place of The Augmentation Toolkit: one item in `intelligence/src/lib/labs/catalog.js`, read by `toolbox.js`. The Loop topic in the AISC+ preview names it too. He tags The Augmentation Toolkit and "Advanced_Diligence_Delegation_Loop" deprecated himself.

### His answers of 2026-10-16: the structure signed off

He answered the open questions by their numbers in `LABS_TRACKER.md`. His words, and what each settles:

- **The walk (step 1).** "If you mean checks for responsiveness on mobile and desktop, I have checked." He reported nothing to fix.
- **What AISC+ holds (step 3).** "AISC+ are essentially deep dives." The preview already calls each AISC+ page a deep dive. "Topic", for a group of deep dives, stays until he says otherwise.
- **The six subjects of the Day 2 guide (step 4).** "Anything that explains further what was taught in AISC goes to AISC+. The AISC resources are already in the toolbox in labs, free for everyone." So the six stay in AISC+, as built. A leader on free months cannot open them, and need not: the challenge's own resources are in the Toolbox. The guide's line that AI Labs holds the six changes when the documents are next touched (tracker step 48).
- **Description and Discernment (step 5).** "AI Labs." As the challenge's documents say, and as the preview has them. The Loop's documents from the old Day 2 stay an AISC+ topic, by the rule in step 4.
- **Day 3 reopening (step 6).** "Day 3 resources is already available in AISC resources in the toolbox." So no day reopens as a page. The Toolbox half of the question was settled on 2026-10-12.
- **The house button (step 8).** "Keep it."
- **AICC's six months (step 23).** "Only the participant who bought the full program gains access." A Strategic Briefing buyer does not.
- **No challenge access (step 26).** "A signed-in user with no challenge access does not have access into Labs." So the gates shut Labs to them entirely, not tier by tier. An AICC full-program client, who may never have taken the challenge, comes in through Labs access.
- **When the free months end (step 27).** "Leaders are prompted to subscribe to keep enjoying the benefits. All tiers are presented with their benefits."
- **Upgrading (step 43).** "Upgrading part-way through a month restarts your subscription from the date of upgrade. An upgrade will usually mean the lower tiers are available." The second sentence is the ladder of answer 1: each tier opens the ones below it.

**Later the same day, a second set:**

- **Mark as watched (step 7).** "Let mark as watched be a button." He did not know what "the dark frame" and "the gold" meant. They were explained to him (tracker step 7).
- **Cloudflare (steps 18 and 19).** "will come later."
- **AICC (step 23).** "Yes, Live calls are included and the Council counts as a full program. AICC full program participants get everything AISC has to offer in labs." So the same library serves AICC, with every tier open.
- **The retake rule (step 27).** "Yes it does." The rule stays.
- **Prices (step 42).** "Premium (AI Labs) - $20 ; VIP (AISC+) - $97". Monthly. No naira prices yet.
- **During the free months (step 43).** "A user can't subscribe for AI Labs during the free period except we want to collect subscriptions ahead of time. If a user subscribes to something higher than AI Labs during the free period, that's okay because it means they need a higher tier immediately."

### Open, for the founder

Each is a step in `LABS_TRACKER.md`.

- **Video (steps 18 and 19):** "later".
- **The grace period after a failed renewal (step 46):** how many days.
- **Prices (step 42):** in naira.
- **Upgrades (step 44):** whether the unused part of a lower tier counts towards an upgrade. To be put to him when the payment step starts.

### Before the library table (2026-10-16)

He asked: "Do we have enough clarity on how the program runs before we propose a library table?" The table holds what Labs contains. Who may open it is a separate record (tracker step 24), and most of his answers of 2026-10-16 belong to that record, not to the table.

**Settled for the table:** the four tiers; what a tier holds (platforms, courses, modules, topics, single videos, sessions); a lesson's fields and their order; a session's date, joining link, special event or not, and its recording afterwards; draft or published; one library for everyone, AICC included.

**Not needed for the table:** who holds which tier, the prices and subscriptions, how a video reaches Cloudflare (the table keeps one video ID per lesson either way), and the challenge's own changes to Days 2 and 7, which decide what goes into AISC+ and not the table's shape.

**Two questions that change the table's shape, put to him the same day:**

- **A. Does anything ever open outside its tier?** For example a special event open to more than the coaching group, or a free taster video in AI Labs that a Platform Awareness leader can watch. If nothing does, the tier decides everything. If something does, an item needs its own setting.
- **B. Does a tier open all at once, or over time?** All at once is how the Academy works and how the preview runs. Over time, for example a course's modules a week apart, means each item carries a release rule, counted from the leader's own start.

**His answers, the same day:** "A. Nothing opens outside it's tier. B. A tier opens all at once. We don't want to restrict a paid subscriber." So the tier decides who may open an item, and no item carries a setting of its own for access or release. Also confirmed: "The dark frame and the gold looks good."

**Decided without him, for him to see in the proposal:** what the Toolbox holds today stays in code, because the same lists feed the challenge's pages that participants use now. A resource on a Labs item can point to a document the Toolbox already lists, so no challenge document's link is written twice.

**The proposal** (2026-10-16): `LABS_LIBRARY_TABLE.md`. One table, `labs_items`, with what each column holds, the rules the database enforces, what is left to the admin page, and the SQL, tested on a throwaway local database. The live database was read first: 26 tables, none for Labs.

### The AISC page and the On Demand seat (founder, 2026-10-16)

He raised it before the table's SQL was run: "The AISC Resources page will later hold videos for each day. The idea behind this is that there will be a on demand seat before General Admission. This on demand seat will not have to wait for a cohort. They'll be able to start as soon as they pay. This also means that the AISC (Renamed from AISC Resources to AISC) page might need some redesign sooner or later." He asked: "Bringing this up now before we run any sql. Do we need to make adjustments to the table?"

- **The table:** yes, one adjustment, made the same day. It now takes the Toolbox beside the four tiers (`toolbox`) and a Toolbox group as a kind (`group`), so the day videos are added from admin like everything else, with no second SQL later. A day fits as a lesson (its video, task and documents), or as a module when it has several videos. Re-tested.
- **Not the table's:** the seat's price, what it opens in Labs, and how its participant moves through the days. Labs' free months count from Day 7 of a cohort, and an On Demand participant has none. These are tracker steps 55 to 58.
- **The name:** "The AISC change is only for the menu section in labs." So the Labs menu reads "AISC", and the group's own page and the Profile's Toolbox card keep "AISC Resources". Done the same day (step 55).
- **Not yet in `SOURCE_OF_TRUTH.md`:** the On Demand seat is a new offer, recorded there when its price is set.

**His answers, later the same day,** when he approved the table ("Table approved"):

- **Labs for On Demand.** "An on demand user gets AI labs for free from day 1 of purchase." How long it lasts is not yet said.
- **The days.** "All the days are available at the same time. It's left for the user to follow the days from 1 - 7." So no day waits on another, and no release rule is needed.
- **Review.** "There's no peer reflection with this tier but the user can book (Milestone review) for a session to look at their day 3 work. Same cost applies." Read here as the VIP review upgrade's price.

### Labs reads the table (tracker steps 10 to 12, 2026-10-16)

He ran the SQL ("I've run the SQL in Supabase") and asked for the next step: "Start step 11, keeping the placeholder content until the table has published items."

- **One library per request.** Each Labs page reads the published rows on the server (`intelligence/src/lib/labs/getLibrary.js`) and hands them to its view, which puts them where every part of the page reads them, the search in the frame included (`components/labs/LabsLibrary.jsx`). `lib/labs/libraryFromRows.js` gives the rows the shape the placeholder already had, so no page had to be redrawn. Search and Browse read the same library.
- **The placeholder stays until there is something to show.** If no published item a leader could see is in the table, or the table is missing, the library is the placeholder, as before. Any other failure to read the table is shown as an error, never covered with placeholder content.
- **Only what can be reached is shown.** A lesson appears only when it and everything it sits in are published. The Toolbox's rows are not read: the Toolbox stays in code until its day videos exist.
- **Never read: the video and the joining link.** They wait for the player and for the server deciding who may watch or join (tracker steps 20, 21 and 25).
- **Real content gets no stand-in copy.** The placeholder fills an empty task or resources list with its own lines ("Try it", "Notes for this video"). Real content that leaves a part empty simply does not draw it, an empty summary included.
- **Small changes a leader could see, all inside Labs:** the bar at the top reads "Preview. The content is from admin" once the content is real; "Start here" on Labs Home takes the first thing in each of the first three tiers when the placeholder's own three are not there.

### The Labs Manager (tracker steps 14 and 15, 2026-10-16)

He approved it in these words: "Start the Labs Manager in admin with steps 14 and 15: the list by tier, and adding, editing, reordering, publishing and removing items with a lesson's fields."

- **Where:** "Labs Manager" in the admin menu, after Challenge Manager, at `/admin/labs`. Admin only, like every admin page and API.
- **What goes where** (`intelligence/src/lib/labs/itemRules.js`): platforms stand alone in Platform Awareness; courses, modules and single videos in AI Labs; topics in AISC+. A platform, course or topic holds modules and lessons; a module holds lessons and never another module. These follow what each tier's page in Labs draws, and are kept in code, where they are easy to change.
- **One rule the database cannot check alone:** within one platform, course or topic, no two lessons share an address, whatever module each is in, since a lesson's address leaves its module out.
- **A new item is a draft,** goes after everything beside it, and takes its address from its title (with -2, -3 when taken). The address can be changed later, with a warning that old links break.
- **Publishing:** an item shows in Labs only once it and everything it sits in are published. The page marks a published item held back by a draft above it, and says whether Labs is showing the placeholder or what is published. The first publishing date is kept, for "New in Labs".
- **Removing** asks for a second click and is refused while anything is inside. There is no undo.
- **Not here yet:** moving an item into another course, and the Toolbox.

**See it as a leader** (tracker step 17, the same day). He asked first: "Is step 17 safe?" Two versions were set out: letting his admin account through the production switch, or previewing only where Labs is already live. He chose the second: "Build the safer version of step 17: Open as a leader with drafts for my admin account, only where Labs is already live. Leave the production switch untouched."

- An eye on each item in the Labs Manager opens its page in Labs, drafts shown and marked "Draft". On the live site, where Labs is shut, the manager says so instead and points to a preview deployment or this machine, which read the same content.
- Drafts reach the admin's account alone, confirmed on the server by the admin email check; asking by address or cookie does nothing for anyone else. The production switch, the Labs gate and the Learning Center are untouched.
- When Labs opens in production (`LABS_LIVE=1`), the eye works there too, with no change.

**One home for the document links** (tracker step 13, the same day: "Start step 13: real links for a lesson's resources in Labs, and picking a Toolbox document in the drawer, with a check that the Toolbox page and Profile card are unchanged."):

- A resource is a name and a link, or a document the Toolbox already holds, picked from "Add from the Toolbox" in the drawer. A pick keeps no link of its own: in Labs it opens the Toolbox's link, so each challenge document's link is written once, where the Toolbox reads it.
- Each Toolbox document is known by a fixed name made from its title. A retitled document leaves earlier picks with their old title and no link until chosen again.
- Links in Labs follow the Toolbox page's rule: held back from a signed-in user with no challenge.
- The Toolbox page and the Profile's Toolbox card were checked unchanged, byte for byte, before and after.

**Sessions** (tracker step 16, the same day: "Start step 16: sessions in the Labs Manager, with date and time, length, summary, joining link, special event, and the recording afterwards."):

- An AI Stakeholder Labs tab, listing sessions by date, coming up then past. Sessions have no up and down.
- Each has a title, summary, date and time, length, special event or not, joining link and, after the call, its recording's Cloudflare video ID. The time is typed and shown as West Africa Time (Lagos). A new one starts on the next Saturday at 7 pm, for two hours, the coaching rhythm, and is changed where a call differs.
- The joining link is stored but not shown in Labs until Labs checks who may open what (step 25).
- Labs now shows a session's time with its date ("7:00 pm WAT"). The placeholder showed the day alone.

### Access, part 1: the ladder enforced (tracker steps 23, 25, 26, 28, 29, 2026-10-16)

He asked which category should come next and in what order the project should finish; the sequence is at the top of `LABS_TRACKER.md`. Then: "Agreed. Add the sequence to the tracker and start access part 1 (steps 23, 25, 26, 28, 29), with View as for my admin account building pages server-side at each tier." He had also asked: "In dev mode I still need to be able to see what's available and locked out based on the tiers."

- **The rung, worked out on the server** (`resolveLabsLevel()` in `intelligence/src/lib/labs/labsAccess.js`, named `access.js` until the renames, added beside the existing rule, which the Learning Center reads and which was not changed):
  - 0, no Labs: no challenge, or Labs still to open in theirs (it opens the day after Day 7).
  - 1, Platform Awareness and the Toolbox, from the day Labs opens in a challenge of theirs, for good.
  - 2, AI Labs as well, inside the free months.
  - 3 (AISC+) and 4 (AI Stakeholder Labs) come with Labs access, part 2. Nobody holds them yet, except the admin looking from them.
  - Taking the challenge again does not shut Labs while the new one runs.
- **What a page sends** (`libraryForLevel()` in `library.js`): anything above the rung arrives with its title, summary and outcomes, and without its task, documents or links. It stays listed, locked: "A leader sees what they cannot open." It is cut on the server, so it never reaches the browser.
- **Who is sent away** (`labsEntry()`): someone not signed in, to sign in; someone with no challenge, to their own home; someone whose Labs is still to open, to their challenge. The admin is always let in.
- **A leader's own access** on Labs Home: "Your access: AI Labs, free until 12 January 2027." or "Your access: Platform Awareness and the Toolbox." with when the free months ended. My wording, for him to change.
- **View as, for the admin alone:** the bar is his only. Choosing a rung sets a cookie that the server honours for the admin email alone, and the server builds the page for that rung, as a leader on it receives it. Without a choice he sees everything. A leader never sees the bar.
- **Every Labs page goes through one loader,** `lib/labs/loadLabsPage.js`, and one sign-in lookup, shared by the rung and the admin's previews.
- **Found while building it:** `proxy.js` sends the admin account to `/admin` from every other address, before its rule for `/labs`. So the admin cannot reach Labs at all, and "Open as a leader" (step 17) and "View as" do not yet work for him. The walks did not show it, because they open a temporary page that `proxy.js` does not guard. **Closed the same day:** "Approved. Add the one-line exception in proxy.js so my admin account can reach /labs, and check that everyone else is unaffected." The admin account may now open `/labs` as well as `/admin`. Run before and after for every kind of account on every address `proxy.js` watches, only the admin's Labs addresses changed. Production still hides Labs from everyone through `live.js`.

### Access, part 2: Labs access (tracker step 24, 2026-10-16)

"Approved. Start step 24: propose the record of access as SQL for me to review and run, tested on a throwaway database first." The proposal and its SQL are in `LABS_ACCESS_TABLE.md`. Approved the same day: "Table approved. I'll run the SQL in Supabase and tell you when it's done." Not yet run.

- **One table, `labs_access`:** a person's account, a tier, why they hold it (subscription, coaching, AICC, by hand), when it starts, and when it ends, or no end until it is ended by hand. A row can start later, so a month bought ahead waits.
- **Labs will give the higher of two:** the challenge's rung, as built in part 1, and the highest tier in the record that day. Someone with no challenge but a current row, such as an AICC client, is let in.
- **Payment details stay with the payments.** Each paid month writes a row here when subscriptions come (step 44). The free months stay worked out from the challenge.
- **His answers, the same day:** "AICC's six month starts as their 1 month engagement starts. This is so that they can use the resources in labs for further learning as they go through their well paced learning structure." And for coaching: "I'm guessing one row per paid term. In handling payments and subscriptions you are an expert so I'd love industry standard practices." So there is a row for each paid term, and the usual practice for paid terms is set out in `LABS_ACCESS_TABLE.md`: terms back to back, access worked out from the dates with no scheduled job, Paystack's checked notice as the only way a payment opens a term, cancelling keeps the current term, a short grace period after a failed renewal, and history kept. Neither answer changed the SQL.
- **Run and read, the same day.** "SQL run, Start it." Labs now gives each leader the higher of the rung their challenge access gives and the one their Labs access gives. Someone with Labs access is let in with their links, even with no challenge. Labs Home names the Labs access tier and its end ("Your access: AI Stakeholder Labs, until 1 May 2027."). If the record cannot be read, Labs carries on from the challenge alone. No row is written yet: giving access in admin comes next.
- **Giving and ending it by hand, built the same day** ("Start the admin page for giving and ending Labs access"): the Access route of the Labs Manager, `/admin/labs/access`. The Labs Manager has two routes, at his word: "It can be in one place and we'll have the CMS and access as major routes." Content is at `/admin/labs/content` and Access at `/admin/labs/access`, under one header with a tab for each (`admin/labs/layout.jsx`); `/admin/labs` opens Content, and the admin menu keeps its one "Labs Manager" line. Find a person by email, then give AICC (six months from the engagement's first day), a coaching term (one month, six months or a year, each new term starting the moment the last ends), or access by hand (any tier, with or without a last day). Terms ending within seven days with nothing after them are listed first. Ending keeps the row as a record; access still to come is removed instead. Days are whole Lagos days, and Labs Home names the last day held.
- **Chiefs (his idea, the same day):** "For chiefs I can create a custom challenge for them and backdate it 7days so they have access to everything in Labs." A challenge opens at most AI Labs, through the free months, never AISC+ or the live calls, and it makes the chief a challenge participant. So a chief's access goes in the record: one row, AI Stakeholder Labs, from the engagement's start, for six months.

### Two kinds of access (founder, 2026-10-16)

He asked to think it through before moving on: "The labs originally should only be accessible to users with challenge access. Also remember the on-demand plan, when it's built, will have immediate access to labs but not the learning center... I think one clear thing I can see is challenge access gives access to AISC and labs, while Labs Access gives access to only AISC Labs. This way, AICC clients do not need challenge access, only labs access." A critique and a plan were put to him, and he answered point by point.

- **Challenge access** is a seat in a cohort. It opens the Learning Center for that challenge, and Labs from the day after Day 7: Platform Awareness and the Toolbox for good, and AI Labs for the free months.
- **Labs access** is a row in `labs_access`. It opens Labs only, at its tier, for its dates, from its first day. It never opens the Learning Center. AICC clients, On Demand participants, coaching, and subscriptions are held this way. The words "record of access" are dropped for it.
- **Labs opens with either one.** With neither, there is no Labs.
- **Platform Awareness and the Toolbox, for good** (founder, 2026-10-17): open to everyone with Labs access, and kept once any Labs access has begun, ended or not. For challenge access this was already so. Built in `resolveLabsAccessLevel()` (`labsAccess.js`): a person whose rows have all ended stands at level 1.
- **Who may subscribe:** first "Only users with challenge access have access to buy subscription plans," then, the same day, "Anyone who has access to labs can subscribe before or after their free months expire." So anyone who has or has had Labs may subscribe, through either kind of access, AICC clients included. A stranger cannot. The Toolbox, the AISC page included, comes with any Labs access without a gate of its own.
  - **During the free months:** a subscription to AI Labs starts when the free months end, so no paid day overlaps a free one, as the paid terms run back to back. A higher tier starts at once (step 43).
  - **The Labs icon's pop-up** (step 60), as read here and to confirm when it is built: someone who has had Labs is offered a subscription. Someone with challenge access whose Labs has not opened yet is told the day it opens. Someone who has never had Labs is shown the way in: the challenge, and On Demand once it exists.
- **On Demand:** "For on-demand, they'll pay the current general admission cost (Meaning general admission costs will increase once on demand is ready) to gain access to labs... Then subscriptions continue after the first month of free AI Labs." So it costs today's General Admission price ($99 or ₦120,000) and General Admission rises when it launches. It gives one month of AI Labs free, then a subscription. With point 2, agreed, it also keeps Platform Awareness and the Toolbox for good, as a cohort participant does.
- **AICC** (point 2, agreed): the six months end, and with them Labs. *(Changed 2026-10-17, founder: "Please note that Platform Awareness and the Toolbox is available to every one with labs access," and, asked whether that holds once Labs access ends: "Yes, for good". So when the six months end, AISC+ and the rest close, and Platform Awareness and the Toolbox stay open.)*
- **Settings, not a second profile:** "Let's use a settings icon beside the profile icon instead that takes them to subscriptions and other useful settings." The Profile icon stays the challenge profile, for those who have one.
- **A Labs icon on every dashboard:** "In the dashboard of every leader (leader, sponsor, vip etc) There will now be a labs icon beside the challenge access. It'll give access to those with lab access but open a pop up for subscription for those without. Similar behavior like the challenge access button." The challenge access button checks on the server and either goes to the challenge or opens its offer (`ChallengeAccessButton.jsx`, in the leader, sponsor, VIP and VVIP headers; commented out in the chief's).
- **The Labs icon, built the same day** (tracker step 60): beside Challenge Access on every leader's dashboard, hidden where Labs is shut. It goes into Labs for whoever may enter. Otherwise it opens a pop-up: the day Labs opens, for challenge access before then; the plans and "Subscribing opens here soon", for Labs access that has ended; or Labs and the challenge offer, for someone who has never had Labs. No prices until the naira prices are set. *(Since 2026-10-17, ended Labs access keeps Platform Awareness and the Toolbox, so it goes into Labs. The ended-access pop-up was replaced the same day, at his word ("Approved. Build the pop-up change with the wording as set out"), by one for Labs access still to begin: "Labs opens to you on [first day]", and what it opens until when. Wording in `LABS_SUBSCRIPTIONS_PLAN.md`.)*
- **Names** (point 5, agreed): "challenge access" and "Labs access" only, with the Labs files and functions renamed to match.
- **On Demand and the facilitator:** "On demand does not come with any form of interaction with a facilitator. If they want a review/strategy session they can pay for it. We have this setup for the challenge so we can use that as a template. If they pay, the same milestone review components become available in labs. This also means each day would have their dedicated page in labs so that everthing is properly arranged."

### Progress: the table (tracker step 30, proposed 2026-10-16)

"Approved. Start progress (steps 30 and 31): propose how to save what each leader has watched, as SQL for me to review first." The proposal and its SQL are in `LABS_PROGRESS_TABLE.md`. Approved and run by him the same day: "The progress table is approved and I've ran the SQL."

- **One small table, `labs_progress`:** a row per leader per lesson opened, with when it was last opened and when it was marked watched ("Let mark as watched be a button"). It is the only table progress needs, in keeping with "I don't want too much tables in my backend".
- **Set aside:** the Learning Center's `challenge_page_progress`, whose rows need a challenge enrolment that AICC and On Demand participants lack; and a column on `users`, where marks from two devices could overwrite each other and marks on removed lessons would linger.
- **Step 31, built the same day:** saves the button's marks and each opening (the page changes at once; a failed save goes back with a message), counts ticks, "3 of 11" and the next lesson from them, and keeps "Continue where you stopped" as the lesson opened last. Only what a leader's rung opens is saved, never a draft. The placeholder keeps its marks in the browser until it is removed (step 38). Tested live on his admin account with a temporary draft, deleted afterwards.
- **What step 31 was to do:** save the button's marks and each opening, count ticks and "3 of 11" from them, keep "Continue where you stopped" as the lesson opened last, let only what a leader may open be marked, and send each lesson's id to the page so a changed address keeps its marks. The browser-only stand-in goes.

### Subscriptions (tracker steps 44 to 47 and 61, built 2026-10-17)

Planned, approved and built the same day: "I've run the subscriptions SQL in Supabase. Start building the subscriptions in the order you set out." The plan, his five decisions, what was built and what is still open are in `LABS_SUBSCRIPTIONS_PLAN.md`.

- **Two plans, monthly:** Premium opens AI Labs ($20 or ₦25,000); VIP opens AISC+ and AI Labs ($97 or ₦120,000). AI Stakeholder Labs stays with coaching. Currency follows where the leader is; the server sets the price. Cards only.
- **How a plan runs:** the first month is a one-off payment at Paystack's checkout; Labs then creates a Paystack subscription that renews when that month ends. Every paid month is one row of Labs access (source `subscription`), back to back. The payment side is one table, `labs_subscriptions`.
- **When it begins:** at once; or, for Premium bought inside the free months or while a higher tier is held, the day what they hold ends. VIP begins at once even in the free months. Changing plan stops the old one renewing, with no credit.
- **When it stops:** cancelling keeps the month paid for. A failed renewal keeps Labs open 24 hours and emails the link to update the card. Resend holds the "ended" email until the 24 hours run out, and Labs calls it off if they pay, restart or cancel first (his choice, 2026-10-17: "Go with Resend's scheduled send for the ended email").
- **Where it is:** the plans at `/labs/plans`, "See the plans" on every locked panel, Labs settings behind a settings icon beside Home and the Profile, and a read-only "Subscriptions" list on the Labs Manager's Access tab.
- **Still open:** live plans and the Vercel variables, and the round of real test payments.

### What comes after his walk through it, each reviewed before it starts

*The walk is done, and the structure was signed off on 2026-10-16. The next step is 2 below: tracker step 9.*

**The full list, step by step, is now `LABS_TRACKER.md`** (2026-10-11, at his word: "let's have a list we can track"). The six lines below are its outline.

1. Changes from his walk, until he says the structure is solid.
2. **One table for the library, and the admin to fill it.** The tree is shaped to be one table of items that point to their parent, so there is one list to manage and not one per tier. Progress can be one small table, or one column on a row a leader already has. "I don't want too much tables in my backend." The schema goes to him as SQL.
3. The video player, on Cloudflare, with a link a leader cannot pass on.
4. Real access: the ladder, decided on the server, with the free months as a free AI Labs subscription.
5. Saved progress.
6. Subscriptions and their prices.
