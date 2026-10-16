# Labs: the blueprint

> **Status:** a structure preview, built 2026-10-11 on the founder's answers that day: five kinds of page, placeholder content, no gates. It replaced the scaffold of 2026-10-08. Labs is not open to participants: a switch keeps it shut in production (`LABS_LIVE`, see "Settled after his first look"). **Read "The structure" at the foot of this file first.** Where it disagrees with a section above it, it is the later word.
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
- **Days 1, 2, 3 and 7 lock together 48 hours after the challenge closes, when their replays stop** (2026-10-10). Onboarding and Day 0 lock when the challenge closes. **The Roadmap (Day 6) never locks:** it is built after the challenge, and the Toolbox's Roadmap tile opens it. After the lock, Home, the Roadmap, Next Steps and the Profile stay open. This replaces the line of 2026-10-09, that all seven days lock when the challenge ends, the Roadmap included. **Only Day 3 reopens in AI Labs** (founder, 2026-10-10): it holds the Milestone Task, and many will come back to it. The other days do not reopen as they are. They become deeper dives in AISC+. **The Toolbox also appears in Labs,** so every day's resources, and more, stay within reach. Details come later: Labs is not properly configured yet. *The lock was built 2026-10-10. Nothing of the reopening is built.*
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

**What became of the first scaffold.** `catalog.js` stays, because the Toolbox reads its Labs Resources. `access.js` stays unchanged: the rule for the free months is still used by Next Steps, the schedule and the Labs icon, and will be the start of real access. The two components and two pages it replaced are kept in `intelligence/src/deprecated/labs-scaffold-2026-10-08/`. The folder in the address is still named `[shelf]`.

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

### Open, for the founder


- **The words "Topic" and "deep dive"** for what AISC+ holds are working words. He was asked what one AISC+ page is called and has not said.
- **The six subjects the Day 2 guide names as what AI Labs holds** are filed under AISC+, by his answer 11. The free months open AI Labs and not AISC+. So a leader on free months is sent by the guide to something they cannot open. Either the six sit in AI Labs, or the guide's wording changes when the documents are next touched.
- **Description and Discernment** are "the work of AI Labs" in the challenge's documents, and the preview has a placeholder course for them there. The Loop's own documents, from the old Day 2, go to AISC+ by answer 11. Worth one decision on where that teaching lives.
- **The Toolbox in AI Labs, and Day 3 reopening.** Both were decided for AI Labs before the tiers were a ladder. Neither is in the preview. By answer 11, Day 3 would reopen in AISC+.
- **A signed-in user with no challenge access** can still reach `/labs`. What they are shown is part of the gates, later.
- **Coaching's promise** reads "AI Labs for as long as coaching lasts". It is now AI Labs and AISC+. Site copy, for when he says.

### What comes after his walk through it, each reviewed before it starts

**The full list, step by step, is now `LABS_TRACKER.md`** (2026-10-11, at his word: "let's have a list we can track"). The six lines below are its outline.

1. Changes from his walk, until he says the structure is solid.
2. **One table for the library, and the admin to fill it.** The tree is shaped to be one table of items that point to their parent, so there is one list to manage and not one per tier. Progress can be one small table, or one column on a row a leader already has. "I don't want too much tables in my backend." The schema goes to him as SQL.
3. The video player, on Cloudflare, with a link a leader cannot pass on.
4. Real access: the ladder, decided on the server, with the free months as a free AI Labs subscription.
5. Saved progress.
6. Subscriptions and their prices.
