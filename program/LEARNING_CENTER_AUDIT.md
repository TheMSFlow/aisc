# Learning Center audit

> **Started 2026-10-09.** The founder's audit of the Learning Center, page by page in menu order. For each page: what is on it, where it departs from the new design, what the founder decided, and what was changed. On Days 1 to 7 the founder shares his documents and decks for refinement against the Markdown references.
> **The new design** is recorded in `DAY_2_AI_READINESS_SCOPE.md`, `DAY_7_AI_GOVERNANCE_SCOPE.md`, `LABS_BLUEPRINT.md` and `WORKING_RULES.md` (rules 14 and 15).
> Nothing here is committed or pushed by an agent.

## Checked on every page

- **Content:** it matches what the day now teaches, with nothing pointing at material that moved.
- **Day pattern:** one insight, one resource, a worksheet for each task, named "Prerequisite Task" and "Primary Task".
- **Names:** the menu, the page title, the schedule and the home focus card agree.
- **Links:** every document opens the current version.
- **Behaviour:** when it opens and locks, its replay and its feedback form.
- **Copy rules:** no emojis or exclamation points, second person. Em dashes are out, except where the founder allows them (see Home).
- **Layout:** desktop and phone.

## Order and state

| # | Page | State |
|---|---|---|
| 1 | Home | Audited and changed, 2026-10-09. Its header read "Dashboard" until 2026-10-10 (see page 8) |
| 2 | Onboarding: Welcome | Audited and changed, 2026-10-09 |
| 3 | Onboarding: Brief | Audited and changed, 2026-10-09 |
| 4 | Onboarding: Expectations | Audited and changed, 2026-10-10. The lock on the day pages was decided and applied the same day |
| 5 | Onboarding: Profile | Audited and changed, 2026-10-10 |
| 6 | Day 0: Overview | Audited and changed, 2026-10-10 |
| 7 | Day 0: Setup | Audited and changed, 2026-10-10 |
| 8 | Day 0: Ready | Audited and changed, 2026-10-10 |
| 9 | Day 1, AI Clarity | Audited and changed, 2026-10-10. The deck is done. The five documents wait for the founder to paste 44 small edits: `DAY_1_DOCUMENT_REVIEW.md` |
| 10 | Day 2, AI Readiness | **Rebuilt 2026-10-10** on the founder's notes and his six dimensions. The documents, the deck and the tool are with him to review. He gives the four links once he is satisfied: `DAY_2_DOCUMENT_REVIEW.md` |
| 11 | Day 3, AI Value | Audited and changed, 2026-10-10. Two documents wait for the founder to paste 23 small edits: `DAY_3_DOCUMENT_REVIEW.md`. The article and the deck need none |
| 12 | Peer Reflection, or Milestone Review by tier | Audited and changed, 2026-10-10 |
| 13 | Day 6, Roadmap | **Closed, 2026-10-11.** Page audited and changed, documents sorted by the founder (A to H), our references in step. Only the video is still to come, on his word |
| 14 | Day 7, AI Governance | **Done, 2026-10-11.** Two documents with their links, the guide whole, no insight; the end-of-challenge feedback at the top of the page; session notes rebuilt with Diligence moved in from Day 1. The founder has made the document adjustments in his Google Docs |
| 15 | Next Steps | **Audited and rebuilt, 2026-10-11,** over two rounds of the founder's decisions: one hub with tabs, the coaching card as the Roadmap card with its animation, every link in a new tab, the two email buttons to the inquiry form (`CC` and `CPB`). Waiting on him: a look at the page |
| 16 | Profile (foot of the menu) | **Audited and changed, 2026-10-11,** over two rounds of the founder's decisions. Seen in a headless browser. Not tried signed in, so the one changed route has not read the real database. Waiting on him: a look at the page |
| 17 | Labs: home and four tiers (foot of the menu) | **Not audited: rebuilt.** On 2026-10-11 the founder had Labs designed afresh, with Claude Academy as the reference, and it was built as a structure preview with placeholder content and no gates. The record is `LABS_BLUEPRINT.md`, "The structure". Waiting on him: a walk through it. Its opening is unchanged: a day after Day 7 opens, with Next Steps and the Profile (section 14) |

## 1. Home

Audited from the code. Not seen signed in.

**On it:** the "Dashboard" header, a status card (Progress, Challenge Phase, Access Level), the Current Focus card with the day's feedback form on Days 1 to 3, the session link cards, the upgrade offer, and the welcome pop-ups after an upgrade.

**Founder's decisions (2026-10-09)**

1. **Focus card:** the review card on Days 4 and 5, a Day 6 card for the Roadmap, a Day 7 card for AI Governance, then Next Steps. The review pages stay in the menu throughout.
2. **Names:** the focus titles carry the menu's names, and **the em dash is allowed in these names**: "Day 1 — AI Clarity".
3. **Phase row:** Day 7 reads as a live day, and "Completed" shows only after it ends. **Day 5 has a VIP session.**
4. **"Assignment" stays on Home,** as the existing cards say it. The day pages keep "Prerequisite Task" and "Primary Task".
5. **Session links** show on every session day the way they do on Day 1.

**Changed** (`intelligence/src/lib/challenge/`)

- `time/resolveCurrentFocus.js`: the review card now ends when the Roadmap opens on Day 6. A "Day 6 — Roadmap" card runs until the Day 7 page opens, then "Day 7 — AI Governance" runs to the end of the challenge. Day 1 reads "AI Clarity" and Day 3 "AI Value". The old Roadmap card could never appear, because the review card covered its days.
- `resolveStatus.js`: Days 4 and 5 read "Review Window", Day 6 "Roadmap", Day 7 "Live Session + Assignment", and "Completed" only after Day 7 ends. For VIP, VVIP and Private Viewing, Day 5 reads "VIP Session + Review Window" and Day 6 "VIP Session + Roadmap".
- `time/sessionTimeHelpers.js`: the general link card shows on Days 1, 2, 3 and 7. The VIP and Private Viewing cards show on those days and on Days 5 and 6. Each shows from five hours before the session to two hours after it starts, at the start date's time of day.

**Assumed, for the founder to confirm**

- The Day 6 deep dive is a VIP session day like Day 5. The founder named Day 5; the schedule and the brief name both.
- Every session, the Day 5 Q&A and the Day 6 deep dive included, starts at the same time of day as Day 1's.
- The focus card moves to a day when that day's page opens, two hours after its session starts, as it already did for Days 1 to 3. So on the morning of Day 7 it still shows Day 6.

**Left open**

- A Day 7 feedback form. It needs a new database column.

**Checked by** walking a made-up cohort through its week for General Admission, VIP and Private Viewing (focus card, phase row and link cards at 19 moments), and lint.

## 2. Onboarding: Welcome

Audited from the code. Not seen signed in.

**On it:** the label "Learning Center", a heading, one paragraph of welcome, a "Start Onboarding" button that marks the page complete and opens Brief, and the Back, Mark as Complete and Next footer.

**Found:** the heading, "Welcome, Challenger!", had an exclamation point, and "Challenger" is a word participants meet almost nowhere else. The paragraph matches the brand voice guide's own example of onboarding copy. The page names no day, session or document.

**Founder's decisions (2026-10-09):** no exclamation point, and the participant is a "Leader" here.

**Changed:** the heading reads "Welcome, Leader" (`intelligence/src/app/(protected)/challenge/onboarding/welcome/page.jsx`).

**Noted for later:** the Private Viewing offer still says "VIP challengers" (`components/challenge/PrivateViewingUpgrade.jsx`).

## 3. Onboarding: Brief

Audited from the code. Not seen signed in.

**On it:** the label "Learning Center", a heading, and four paragraphs: the moment the leader is standing in, the calling to shepherd their people, clarity leading to territory, and the challenge as a call to become a positioned stakeholder. Then the Back, Mark as Complete and Next footer.

**Found:** "revolutionary", which is on the forbidden list, in a sentence that also read awkwardly ("being the first at a revolutionary vehicle"). An em dash in the heading. Readiness, the new Day 2, is the one part of the week the Brief does not touch. It names no day, session or document, and it anchors AI fluency with the four words.

**Founder's decisions (2026-10-09):** take the recommended first sentence. Remove the em dash from the heading: the allowance made on Home is for the day names, not this. Leave the Brief without a line on readiness.

**Changed** (`intelligence/src/app/(protected)/challenge/onboarding/brief/page.jsx`): the heading reads "AI Stakeholder Challenge Brief", and the first sentence ends "...of being first to a new vehicle for change, prosperity and growth."

## 4. Onboarding: Expectations

Audited from the code. Not seen signed in.

**On it:** an opening line, a time commitment box that changes by tier, the schedule from Day 1 to "Beyond Day 7", a playback line, a box on Peer Reflection or Milestone Review, three principles under "How to Approach the Challenge", and a closing line.

**Found:** Day 7 listed no assignment. Day 6 promised General Admission an "Instructional Video" that the Day 6 page did not have. The playback line promised recordings that exist for Days 1 to 3 only. A General Admission participant with the VIP review upgrade was shown the whole VIP schedule. Two names differed from the menu. Four session titles use an em dash. A few wording slips.

**Founder's decisions (2026-10-10)**

1. Day 7 shows "Day 7 Assignment".
2. A video will be uploaded shortly: make a space for it on Day 6.
3. **Day 7 has replays too,** front end and back end.
4. **An upgrade adds exactly what it names.** The VIP review upgrade is a VIP review of the participant's work and no other VIP perk. Private Viewing is listening in on the VIP calls and no other VIP perk.
5. The names follow the menu: "Roadmap", "Peer Reflection".
6. The em dash stays in the session titles.
7. The wording slips are tidied.

**Changed** (`intelligence/src/`)

- `components/challenge/CurriculumSchedule.jsx`: Day 7 lists its assignment. Day 6 is subtitled "Roadmap". Days 4 and 5 say "Peer Reflection". The schedule now tells three things apart: VIP and VVIP (every VIP perk), the Milestone Review (VIP, or the review upgrade), and listening in (Private Viewing). A review upgrade on General Admission sees the General Admission schedule with Milestone Review in place of Peer Reflection, labelled "General Admission with VIP Review". The time line reads "Days 1 to 3 and 7", "Day 5", "1 hr", "2 hr". "Anonymised" twice.
- `components/challenge/ReplayLink.jsx`: the VIP replay is shown to VIP and VVIP only. It was also shown to the review upgrade.
- `components/challenge/RoadmapVideo.jsx` and `lib/challenge/day6Video.js` (new), placed at the top of the Day 6 page: a video frame that shows "The video will appear here shortly" until the video's embed address is set in `day6Video.js`. Everyone sees it, VIP included.

**Day 7 replays. Applied 2026-10-10,** after the founder added the three columns (`challenge_groups.session_replay_d7`, `challengers.vip_replay_d7`, `challengers.pv_replay_d7`).

- `lib/challenge/getChallenge.js` and `resolveActiveChallenger.js` read the new columns. If one is missing they answer as before, the way the declaration route does for a column that came later, so a missing column cannot take the challenge pages down.
- `lib/challenge/context/buildChallengeContext.js` passes the three links to the pages.
- `app/api/admin/challenge/cohorts/links/route.js` and `components/layout/admin/CohortLinks.jsx`: a "Day 7 Replay" row in each of the three groups, loaded and saved as Days 1 to 3 are.
- `app/(protected)/challenge/day-7/page.jsx`: the replay button, as on the other days.
- **Not added to Next Steps,** and not needed: the Day 7 page now stays open for as long as its replay does (the lock, below).

**The lock on the day pages. Decided and applied 2026-10-10.**

The founder's decisions, after the critique:

1. **Days 1, 2, 3 and 7 lock together,** and no longer at the end of Day 7. They still open in order, so a participant meets one day at a time. Onboarding and Day 0 still lock when the challenge closes.
2. **The moment is a full 48 hours after the challenge closes,** and the replays stop at the same moment. Before, the replays stopped at 8pm two days after Day 7, four hours earlier, and the pages that held them had already been locked for 44 hours.
3. **The Roadmap (Day 6) never locks.** It is built after the challenge, its documents are linked only from that page, and the Toolbox's Roadmap tile, which lives in the Profile, opens it. This replaces "all seven days lock, the Roadmap included" (2026-10-09).

What still ends when the challenge closes: the review window, the upgrade offers, onboarding and Day 0. Home moves to Next Steps and the phase row reads "Completed" at that moment, as before.

After the lock, four things stay open: Home, the Roadmap, Next Steps and the Profile.

Changed (`intelligence/src/`):

- `lib/challenge/time/timelineConfig.js`: `DAYS_LOCK_HOURS_AFTER_CLOSE: 48` replaces the two replay settings.
- `lib/challenge/time/normalizeChallengeTimeline.js`: a new moment, `daysLock`, 48 hours after `reviewClose`. `replayExpiry` is the same moment, so there is one clock for both.
- `lib/challenge/time/challengeAccess.js`: Days 1, 2, 3 and 7 are open from their unlock until `daysLock`. The Roadmap line is unchanged.

Checked with a walk of two made-up cohorts (one ending on a Monday, one on a Sunday) past the end of the challenge: 40 checks pass. No server route under the challenge refuses a save by date, so a task finished inside the 48 hours is saved as usual. The declaration can be saved once and the certificate locks it, so an open Day 3 page cannot change an issued certificate.

**The Milestone Review offer ends when the challenge closes** (founder, 2026-10-10). Found while checking the Roadmap page, which never locks: the offer on it showed whenever the participant's `upgrade_available` flag was on, and the payment route checked no date, so a review could be offered, and paid for, after the review window had shut. Now `components/challenge/MilestoneReviewUpgrade.jsx` shows only at the stage `vip_active`, as the same offer on Home already did, and `app/api/paystack/aisc/upgrade/vip-review/route.js` refuses once the challenge has closed. Checked in the walk: open on Day 6 and at the close, shut a moment after, shut for VIP and for anyone who already has the review.

**The offer stays as built** (founder, 2026-10-10). He first asked for it to end 48 hours after Day 7, when the days lock, and withdrew that the same day: the Milestone Review page shuts when the challenge closes, so for those 48 hours a participant could have paid for a review with nowhere to submit the work.

**Where the days go after the lock** (founder, 2026-10-10). **Only Day 3 reopens in AI Labs** (founder, 2026-10-10): it holds the Milestone Task, and many will come back to it. The other days do not reopen as they are. They become deeper dives in AISC+. **The Toolbox also appears in Labs,** so every day's resources, and more, stay within reach. Details come later: Labs is not properly configured yet. Until then every day's documents are still reached through the Toolbox, which sits in the Profile and never locks.

**One thing to know: a challenge whose Day 7 is a Sunday closes on Monday night** (an existing rule, for the review deadline). The 48 hours count from the close, so that cohort's days lock on Wednesday night, the same as a cohort whose Day 7 is the Monday.

**The Day 6 video will be on Cloudflare** (founder, 2026-10-10). `lib/challenge/day6Video.js` takes the host's embed address.

**Noted for later**

- After the lock the menu shows "Day 6" as the one day still open. Its superscript, "Roadmap", says why. Whether it should then read differently is the founder's to say.
- The Day 6 instructional video stays watchable for good, because its page does. The session replays do not.
- The Milestone Review payment route (`api/paystack/aisc/upgrade/vip-review`) takes the participant's id from the request, not from the sign-in. Someone who knew another participant's id could start a payment in their name, which would then block that participant from starting their own. Not changed.
- Next Steps still says "reclaimed capacity" in its opening line.
- `ReplayLink.jsx` has four lint findings, and `CohortLinks.jsx` one, on lines not touched here.

## 5. Onboarding: Profile

Audited from the code, 2026-10-10, then decided and changed the same day. The form was seen on screen through a temporary signed-out preview, since removed. The onboarding page itself was not seen signed in.

**On it:** the label "Learning Center", the heading "Complete Your Profile", two lines of introduction, then a form: photo, first and last name, role, organisation, years of experience, and "Your Biggest AI Leadership Challenge" in up to 300 characters. "Save & Continue" saves and moves to the next page. Once saved, the form is gone and the page reads "Your Profile Is Complete".

**Where the answers go:** the name is written to the account, and the account's name is the one printed on the certificate. The role, organisation and years are written to the account too, replacing what was given at sign-up. The challenge answer is listed for the facilitator in admin, and is shown back on the Profile card with a question about what has changed. The Territory Builder on Day 3 does not open without a profile.

**Already in place:** the footer will not move on until a profile exists. The photo is checked on the server: images only, 5 MB at most. The challenge answer stops at 300 characters. Day 3 and the Profile page each offer the form again to anyone who skipped it.

**Found**

1. **Nothing checks the form.** The page says every field is needed, but an empty form saves, on the page and on the server. An empty save blanks the name, role and organisation on the account, and the certificate then prints no name.
2. **The page never says the name goes on the certificate.**
3. **No way to correct it.** The participant fills the form once. No screen lets them change it afterwards, so a typing mistake in a name stays on the certificate unless the founder fixes the record.
4. **A refused photo is refused silently.** A file over 5 MB, or one that is not an image, is dropped with no message.
5. **Spelling:** "Organization" and "organizational". The placeholder reads "Organization and/or Industry you operate in".
6. **The form exists twice.** `components/challenge/ProfileForm.jsx` is a second copy, used on Day 3 and the Profile page, with the question worded differently and a "Save Profile" button.
7. **If the check for an existing profile fails, the empty form comes back,** and saving it replaces the profile and the photo. The check also filters by cohort only and relies on the database's rules to return this person's row alone.
8. **Smaller:** years of experience accepts any number, negatives included. The labels are not tied to their fields. The errors a participant can see are technical ("Failed to save challenger profile").

Nothing on the page points at material that moved. No em dashes, emojis or exclamation points in the copy. It locks with the rest of onboarding, when the challenge closes.

**Founder's decisions (2026-10-10)**

1. Every field is required, on the page and on the server. The photo stays optional.
2. A line says the name appears on the certificate exactly as entered.
3. **Fill once.** Corrections come to the founder.
4. "Organisation", with the placeholder "Your organisation or industry".
5. A refused photo says why.
6. **Both forms carry the onboarding page's wording** (decided the same day, once the question was put plainly). `components/challenge/ProfileForm.jsx` now reads word for word as the onboarding page does. The two buttons still differ, on purpose: one saves and moves on, the other saves in place.

**Changed** (`intelligence/src/`)

- `lib/challenge/profileChecks.js` (new): the rules, in one place, used by both forms and by the save route, so the three cannot disagree. A name needs a letter and cannot be a link or an address. Years of experience is a whole number from 0 to 70. The challenge answer stops at 300 characters. It reuses the checks in `lib/forms/guards.js`.
- `app/api/challenge/profile/save/route.js`: runs the rules before anything is uploaded or written, and refuses with a message for each field. Values are trimmed. 0 years is now kept as 0; before, it was saved as nothing.
- `app/(protected)/challenge/onboarding/profile/page.jsx` and `components/challenge/ProfileForm.jsx`: a message under each field that fails, cleared as the field is typed in. The line "Your name appears on your certificate exactly as you enter it here." under the name. "Organisation" and "organisational". Both copies of the form received the same edits. Their different wording of the question, and their different buttons, are untouched.
- `components/challenge/ProfileImageUpload.jsx`: "That file is not an image. Choose a PNG, JPG or WEBP." and "That photo is over 5 MB. Choose a smaller one."

Checked: 30 checks on the rules pass, lint is clean, and on screen an empty form showed six messages and sent nothing, the two photo messages appeared, and the form fits a phone with no sideways scroll.

**The form on Day 3 stays** (founder, 2026-10-10). It opens there, as designed, for a participant who reaches Day 3 with no profile: a "Profile required" card stands in for the Territory Builder, and its button opens the form in place. A participant with a profile never sees it. Its copy now matches onboarding word for word: the card reads "Complete Your Profile" with onboarding's two opening lines (`app/(protected)/challenge/day-3/page.jsx`), and the form's button reads "Save & Continue" (`components/challenge/CompleteProfileCard.jsx`, through a `submitLabel` on `ProfileForm.jsx`). The same form on the Profile page keeps "Save Profile", and that card keeps its own two lines. Seen on screen in a temporary signed-out preview, since removed.

**Still open**

- **Profiles saved before today are not checked.** A participant who saved a blank or partial profile keeps it, because nothing in the Learning Center offers the form a second time. Worth a look in the database for empty names in the cohorts still running.
- If the check for an existing profile fails, the empty form comes back and the server accepts a second save (finding 7). Fill once is kept by the page, not by the server.
- The labels are not tied to their fields. The messages for server failures are technical.

## 6. Day 0: Overview

Audited from the code, 2026-10-10, then decided and changed the same day. Not seen signed in.

**On it:** the label "Learning Center", the heading "Day 0 — Preparation", one opening sentence, a list of four things under "What you'll do today", the line "Once Day 0 is complete, you should feel ready.", and a "Start Day 0" button that marks the page done and opens Setup.

**Already in place:** the four things listed are the four checks on the Setup page, in the same order. The page opens with onboarding and locks when the challenge closes. The day pattern does not apply here: Day 0 is preparation, with no session, no resource and no worksheet, and the program reference confirms no documents exist for it.

**Found**

1. **The first item may no longer be true of the week.** The page lists "Confirm your primary AI access", and Setup then says a paid plan is needed: "Free tiers are designed for casual use and are not sufficient for this challenge." The program reference gives the reason as "so Day 2 is not spent on access problems". That Day 2, the hands-on one, has moved to Labs. In the pages and Markdown references for Days 1, 2, 3 and 7, no task was found that needs the participant's own paid plan: Day 1 teaches prompting but sets no task in an AI tool, Day 2 is the Readiness Scorecard, the Territory Builder on Day 3 makes its own AI calls, and Day 7 is written by hand. The live sessions were not checked and may use one.
2. **Day 0 has three names.** This page says "Day 0 — Preparation". The Setup page says "Pre-Challenge Setup". Home says "Day 0 — Setup" on one focus card and "Complete Day 0 Preparation" on another.
3. **An em dash in the heading.** It is a day name, which is where the founder allowed the dash on Home. He removed it from the Brief heading, which is not a day name. His call which this is.
4. **"Friction" is used in two senses.** The opening sentence says the steps "prevent avoidable friction during the live sessions". Two lines later "capturing friction" means the friction log, a term the participant meets here for the first time and uses on Day 3.
5. **The opening sentence starts mid-thought:** "Each step exists to prevent..." No step has been mentioned yet.
6. **The fourth item says more than Setup asks.** "Take inventory of all your recurring tasks" against Setup's "start a list of tasks you do often".

No emojis or exclamation points. Second person throughout.

**Founder's decisions (2026-10-10)**

1. **No AI tool is needed during the seven days.** Participants are told they will need one straight after the challenge, so they have time to plan.
2. The day is named "Preparation". Setup is a page inside it.
3. The em dash stays in "Day 0 — Preparation". It is a day name.
4. The recommended opening sentence.
5. The recommended wording for the task list.

**Changed** (`intelligence/src/`)

- `app/(protected)/challenge/day-0/overview/page.jsx`: opens "Day 0 is three short steps. Each one removes an avoidable delay from the live sessions and keeps your attention on the decisions that matter." The list has three items: the folder, the friction log, and "Start a list of the tasks that repeat in your daily work". A note under it: "You will not need an AI tool during the challenge. You will need one as soon as it ends, so use this week to plan for it. The next page lists the options."
- `app/(protected)/challenge/day-0/setup/page.jsx`: the first check, "Primary AI Access", is no longer a check. It is a note after the checks, "After the Challenge: AI Access", naming Claude Pro (recommended) or ChatGPT (Go, Plus, or Pro) with the same two links. Three checks remain, and the line under the button says "Tick all 3 checkboxes to continue."
- `lib/challenge/time/resolveCurrentFocus.js`: the Home card reads "Day 0 — Preparation". Two slips tidied on the Day 0 cards: "set up" as a verb, and "Day 0" for "Day-0".

**A step on documentation: left out** (founder, 2026-10-10). He had proposed that participants "start thinking about how they document processes and activities in their personal work life, business or workplace", and asked for a critique. The critique: it would fill a real gap, since Day 0 prepares Day 1 and Day 3 and nothing for Day 2, but as worded it leaves nothing behind, speaks of processes where Day 2 audits data, and names one setting too many. Day 0 stays at three steps.

**Now out of step, not changed:** `PROGRAM_REFERENCE.md` still gives paid AI access as a Day 0 check and objective. The AISC site copy may say the same, and is last.

## 7. Day 0: Setup

Audited from the code, 2026-10-10, after its AI check became a note (page 6), then decided and changed the same day. Not seen signed in.

**On it:** a note asking for a computer or laptop, three checks (Focus Folder, Friction Log, Recurring Tasks) each with its own tick, the note on AI access after the challenge, and "Save & Continue".

**Already in place:** the page cannot be passed until every box is ticked, by the button or by the footer. Each check says what to produce. The page spells out how the friction log and the task list differ.

**Found**

1. **The heading is "Pre-Challenge Setup".** The menu says "Setup" and the day is now "Preparation".
2. **The note at the top speaks of "the AI related tasks".** No task in the week needs the participant's own AI tool now.
3. **The folder line** says "in your computer", and its quotation marks do not match. The worksheets are Google Docs that participants copy, so their work sits in Google Drive, not in a folder on the computer.
4. **The ticks are not kept.** A participant who comes back to the page finds the boxes empty and the button greyed out, though the page is already marked done.
5. **Neither list says where to keep it,** and neither says which day uses it. The friction log "will be useful later in the challenge". It is Day 3. The task list is Day 1.

No emojis, exclamation points or em dashes. Second person throughout.

**Founder's decisions (2026-10-10)**

1. The heading stays "Pre-Challenge Setup".
2. The note at the top takes the proposed wording.
3. **The folder line stays exactly as it is.** "In your computer" is the wording the founder wants, and the folder is on the computer, not in Drive.
4. The ticks show as done once the page is complete, on one condition: no backend change. None was needed.
5. Each list names the day that uses it. "Keep it in your folder" is not added: the folder line already says "All challenge work will live here."

**Changed** (`intelligence/src/app/(protected)/challenge/day-0/setup/page.jsx`)

- The note at the top ends "A phone makes the writing and the tools harder to use than they need to be."
- The friction log ends "You will use your friction log on Day 3." The task list gains "You will use this list on Day 1."
- A participant who returns to a completed page sees the three boxes ticked. This reads the completion the challenge already records (`progress.day0_setup`). The ticks themselves are still not stored, so two ticks out of three are lost if the page is left before it is completed.

**Left as it is:** the folder line's closing quotation mark is straight where its opening one is curly. It is the page's one lint finding, and older than this audit. One character to fix, on the founder's word.

## 8. Day 0: Ready

Audited from the code, 2026-10-10, then decided and changed the same day. Not seen signed in.

**On it:** the heading "You're Ready", two lines ("Over the next seven days, this challenge will ask you to make deliberate choices." and "You will be asked to decide:"), three decisions (what deserves your attention, what no longer does, where you will direct your leadership energy), and one button.

**Already in place:** the button marks the page done, then opens Day 1 if Day 1 is open and Home if it is not, with its label changing to match. "Seven days" is right. The three decisions are a triad, as the brand voice asks of a closing line. No emojis, exclamation points or em dashes.

**Found**

1. **The button says "Go to Dashboard".** The menu calls that page "Home". The page's own header says "Dashboard". Two names for one page.
2. **The three decisions are Day 1 and Day 3.** Readiness and governance, the two new days, are not among them. The Brief was left without a line on readiness for the same reason: it frames the week, it does not list it.

**Founder's decisions (2026-10-10)**

1. **One name for the page: "Home".**
2. The three decisions stay as they are.

**Changed** (`intelligence/src/`)

- `app/(protected)/challenge/day-0/ready/page.jsx`: the button reads "Go to Home".
- `app/(protected)/challenge/page.jsx`: the page's header reads "Home". It read "Dashboard".
- `components/challenge/PrivateViewWelcomeModal.jsx`: "Your private viewing link will be available on your Home page before the session starts." It said "in the dashboard".

**Left as they are:** two emails. One has a button "Login to Your Dashboard" (`lib/emails/sendIndividualBackdoorEmail.js`). The other speaks of the "Milestone Review dashboard", which is a different page.

## 9. Day 1, AI Clarity

The page was audited from the code, 2026-10-10, then decided and changed the same day. Not seen signed in. The four documents are compared with their Markdown references once the founder shares them.

**On it:** the eyebrow "Day 1", the title "AI Clarity & Leadership", two opening paragraphs, the replay button and the feedback form. Then the Primary Task card (Delegation Audit, three steps, 30 minutes, the worksheet), three sections (A, My Task List; B, Michael Steve's Delegation Matrix, with the tool; C, My Action Plan), a completion check, one resource (Task Delegation Guide) and one insight (The Real Constraint: Judgment, Not Time).

**Already in place:** this is the pattern the other days follow: a Primary Task with its worksheet, one resource, one insight. It has no Prerequisite Task, and Day 0's task list does that work. The session notes are not offered to participants. The page opens two hours after the session starts and locks with the other days. The action plan asks for moves over the next 30 days, which fits participants needing an AI tool only after the challenge. No em dashes, emojis or exclamation points in the copy.

**Found**

1. **The title is "AI Clarity & Leadership".** The menu, the Home card and the schedule all say "AI Clarity".
2. **The Toolbox opens older copies of two documents.** The page opens "AISC_TASK DELEGATION GUIDE v2" and "AISC_DELEGATION WORKSHEET v2", both made on 27 May 2026, and both the source of the Markdown references. The Toolbox opens the first versions, made on 23 March 2026. The first worksheet still has five sections, among them plotting tasks on the matrix by hand and workflow mapping, which the Delegation Matrix tool replaced. Checked by reading each document's title and dates, without opening or changing any of them. This is finding 16 of `PROGRAM_REFERENCE.md`, now with the two copies told apart.
3. **The Toolbox lists an "Automation Exercise Template" under Day 1.** It belongs to an automation exercise that was removed from Day 1 (finding 6 of the reference). No page links to it.
4. **Day 1 never mentions the list from Day 0.** Day 0 now says "You will use this list on Day 1." Section A says "take a moment to think through the tasks you want to evaluate", as if starting fresh.
5. **One slip:** "you are done with Day 1 task".
6. **Day 1's links are written in two places,** the page and the Toolbox, which is how finding 2 came about. Day 2 and Day 7 each keep theirs in one file.

**To raise when the documents arrive** (from the Markdown references)

- The guide's opening: "designed for people who are completely new to this, so do not worry if some of this is new territory. We will take it step by step." The brand voice rules out reassurance of this kind and speaking to a beginner, and "step by step" is on the forbidden list.
- The session notes: "We will go deeper on D1 and D2 today. D3 and D4 in upcoming sessions." Discernment went to Labs with the old Day 2, and no later session of the week names either.
- Em dashes in the article and the session notes.

**Founder's decisions (2026-10-10)**

1. **The title stays "AI Clarity & Leadership".** A page may say more than the name on the Home card. The two need not match. The same holds for the other days.
2. **The Toolbox opens the fuller editions on purpose.** For some documents the founder keeps a shorter edition, cut to what the day needs so it does not overwhelm, and that is the "v2" the day page links. The fuller edition sits in the Toolbox for after the challenge. Finding 2 above was not a fault. Recorded as part of rule 16 in `WORKING_RULES.md`.
3. The "Automation Exercise Template" leaves the Toolbox.
4. **The recurring tasks from Day 0 are the first tasks run through the matrix.**
5. The slip is fixed.
6. **Section C still suggests using AI, and that belongs to AI Labs.** No AI tool is needed during the seven days.
7. **Of the 4Ds, the challenge takes Delegation and Diligence. Description and Discernment belong to AI Labs.** The Day 1 session should touch the first two.

**Changed** (`intelligence/src/`)

- `utils/challenge/ToolBox.jsx`: the Automation Exercise Template is gone from Day 1. A note above the Day 1 group says its two editions are deliberate, so no later hand points them at the day versions.
- `app/(protected)/challenge/day-1/page.jsx`: Section A opens "Start with the recurring tasks you listed on Day 0. They are the first tasks you run through the matrix. Then add any others you do daily, weekly, or monthly." The completion check ends "you are done with the Day 1 task."

**Section C of the page, changed 2026-10-10** on the founder's approval (decision 6). His words: "All we have to do is defer every AI related work to AI Labs. But it's important they know what to expect." A new paragraph says none of the moves needs an AI tool yet, that work with AI begins in AI Labs on Day 7, and that there they learn to brief AI on a task and to judge what it returns. The AUTOMATE and AUGMENT prompts now ask which task goes to AI Labs first. STREAMLINE and OWN are unchanged. The Insight card titles the article "Judgment, not Time", as the article does.

**The documents. Reviewed, approved and applied 2026-10-10.** The founder uploaded six files: the guide and the worksheet in both editions, the article and the session deck. The four day files matched the Markdown references word for word. The two fuller editions had no reference and were added to `resources/day-1/` (`task-delegation-guide.md`, `delegation-worksheet.md`). He approved every proposed edit, kept "Leadership margins" in the article, and pointed to his 4D material (the AI Fluency course files, outside this project), which confirmed the three parts of Diligence.

- **The five documents: 44 small edits, for the founder to paste** into his existing Google Docs, so no link changes. They are listed, find and replace, in `DAY_1_DOCUMENT_REVIEW.md`. The Markdown references already carry them. Until he pastes, the references are ahead of the Google Docs.
- **The deck: done.** `resources/day-1/day-1-session-notes.pptx` is his own deck with 36 pieces of text changed and nothing else. Slide 9's line now says the challenge goes deeper on Delegation and Diligence. Slide 11 is "D4: Diligence" (Creation, Transparency, Deployment), where it was "D2: Description". Slide 12's Mechanics cell follows. The sixteen em dashes are gone, as in the decks for Days 2, 3 and 7. Checked: the file passes the structure check, the three changed slides were looked at as rendered, and the deck's words match the updated notes.
- **Open, for the founder:** the 4D framework is published under a licence that asks for credit and is for non-commercial use (it says so on his own copy of the Diligence summary). The deck names no source. Raised with him, nothing changed for it.
- **For the Day 7 audit:** Day 7's deck says "On Day 1 you met four Ds. Diligence is the fourth". Day 1 now goes deeper on Diligence, so that slide can build on it.

**Changed again on 2026-10-11:** Diligence left Day 1's session notes for Day 7's, so that Day 1 can focus on Delegation (founder). Day 1's deck has 11 slides. See section 14.

## 10. Day 2, AI Readiness

The page, the Readiness Scorecard tool and the six files in `resources/day-2-ai-readiness/` were audited from the code and the Markdown, 2026-10-10, then decided and changed the same day. The page was not seen signed in. The rebuilt documents and deck were looked at as rendered. The detail, with every proposed change set out as it reads now and as proposed, is in `DAY_2_DOCUMENT_REVIEW.md`.

**On the page:** the eyebrow "Day 2", the title "AI Readiness", the opening, the replay and the feedback form. Then a Prerequisite Task card (Readiness Scorecard, 20 minutes, its worksheet), a Primary Task card (Data Readiness Audit, four steps, 30 minutes of writing, its worksheet), three sections (A, My Readiness Scores, with the tool; B, My Three Readiness Moves; C, My Data Readiness Audit), a completion check, one resource and one insight.

**Already in place:** the day pattern in full. The names agree everywhere. The Primary Task already says "nothing is put into an AI tool" in all four places it appears. The tool's 24 statements match the reference word for word, and it suggests no moves. No em dashes or exclamation points, British spelling throughout.

**Found**

1. **Several "first moves" tell participants to use AI this week.** They were written on 2026-10-08, before the decision that the seven days need no AI tool. Confidence opens with "Use AI today", Practice with three slots of AI work this week, and the "Keep going" lines of Understanding and Judgment use AI too. The moves are chosen in the Prerequisite Task, so this reaches the guide, slide 15 of the deck, one line of the article, the worksheet's Section B and the page's Section B. The guide also ends by saying first experiments with AI begin in Labs, which its own first moves contradict.
2. **Proposed:** a move for this week needs no AI tool. Where a dimension's natural first move is to use AI, this week's move is the preparation, and the use is named under a new label, "In AI Labs". Vision and Responsibility need no change. The Data Readiness Audit and its documents need none.
3. **A slip:** "you are done with Day 2 task", as Day 1 had.
4. **Statement P2** of the scorecard assumed Day 0 asked for a tool. Recommended to keep: it measures where a leader stands.
5. **Still open from before:** the four documents have no links, so their buttons read "(not yet available)", and the two time estimates on the page are the agent's.

**Founder's decisions (2026-10-10)**

1. **The rule is approved, and made stricter.** His words: "any AI related task is pushed to AI Labs." A move for this week involves no work with AI at all. He turned down the first proposal for Confidence, to ask a colleague to show you how they use AI, because it is still an AI task. The new Practice move was approved as proposed.
2. Statement P2 of the scorecard stays.
3. No sentence joining Responsibility to Day 1's Diligence.
4. The two time estimates on the page stay.
5. **He gives the four document links once he is satisfied with the documents.**

**Changed.** Everything is listed, as it was and as it is, in `DAY_2_DOCUMENT_REVIEW.md`.

- **The guide:** a line at the top of Part 1 saying no first move asks for work with AI. New first moves for Confidence ("Tell one person on your team what you do not yet know about AI, and that you are about to start. Say it plainly."), Practice and Judgment. "Keep going" became "In AI Labs" for Confidence, Understanding, Practice and Judgment. Four lines of the strengths table and one sentence of "What gets in the way". Still 12 pages.
- **The deck, slide 15:** the line under the title, and the moves for Confidence, Practice and Judgment.
- **The article:** its three examples of a small move, and one sentence saying work with AI begins in AI Labs on Day 7.
- **The scorecard worksheet and the page, Section B:** one sentence each. The page's slip is fixed.
- **Rebuilt from the Markdown:** `ai-readiness-guide.docx`, `readiness-scorecard-worksheet.docx`, `the-leader-goes-first.docx` and `day-2-session-notes.pptx`. The audit worksheet is unchanged.

**Applied by the same rule, beyond the two moves the founder was asked about,** and flagged to him as the places to look first: the Judgment first move (it was to check an AI output, and is now to check an ordinary document, with the AI check under "In AI Labs"), the four lines of the strengths table that involved AI, the article's examples, and the sentence added to "What gets in the way".

**Still open:** the four documents have no links. Their buttons read "(not yet available)" until the founder posts them and the links go into `intelligence/src/lib/challenge/day2Resources.js`.

**Reopened 2026-10-10: the founder's own notes.** Before concluding Day 2 he shared four pages of his handwritten notes on AI readiness, saying "What I wrote about being ready for AI resonates more than what I'm getting from you." They are transcribed in `resources/day-2-ai-readiness/founder-readiness-notes.md`.

- **What the notes are:** readiness of the organisation a leader leads. What being ready means (five things, under processes, structure, culture and data), a maturity assessment in six dimensions, enablers and barriers, how to read an assessment, preparing without over-technicalising, data, culture and change, pilots, return, governance, and a final readiness checklist in eight parts.
- **Why Day 2 does not sound like them:** on 2026-10-08 the scope read "about the leader personally" as the leader's own habits with AI, set the organisational material aside as not fitting "a leader scoring themselves", and built six personal dimensions from academic literacy scales. Little of the founder's material survived beyond "a snapshot, not a test", reading the differences and not the total, and the data audit.
- **Made worse on 2026-10-10:** three of the six personal dimensions (Confidence, Practice, Judgment) measure the leader's use of AI, which the challenge now defers to AI Labs. Their moves for this week had to be rewritten as stand-ins. Every part of the founder's material can be assessed and acted on this week with no work in AI.
- **Put to the founder:** (1) keep the scorecard and bring his words into the guide, deck and article; (2) rebuild the scorecard on his notes, as the readiness of what the leader leads, each statement an act of the leader's own, keeping the tool's shape, the two tasks and the data audit; recommended; (3) with either, send the rest of his notes to the days they belong to: return to Day 3, pilots and change to the Roadmap and Labs, governance and responsible AI to Day 7. **Awaiting his direction. Nothing rebuilt.**
- **A caution recorded with the transcription:** the notes follow a course he studied, and name one model as Gartner's. Lines printed for participants are his own or rewritten, and a named model is credited or left out.

**Rebuilt 2026-10-10, on the founder's answers.**

1. "About the leader personally" means **the leader assessing what they lead.**
2. **Rebuild everything,** on what is now known and on the original resource, with his notes as the guide.
3. **The six dimensions are his own:** Strategy, Data Governance, Talent, Processes, Impact Evaluation, Collaboration.
4. **What cannot fit into Day 2 is kept for AISC+.**

What was rebuilt, all from the Markdown: the scorecard's 24 statements (`readiness-scorecard.md`) and the tool that carries them, the guide, the scorecard worksheet, the article, 12 of the deck's 17 slides, and the wording of the Day 2 page. The Data Readiness Audit and its worksheet are unchanged. The guide's opening is now the founder's: what readiness is, the five things being ready means, and "what matters is vision, focus and a strategy that advances in stages". Every move for this week still involves no work with AI.

Checked: the tool's statements and questions match the reference word for word. The page and its resource list pass lint. The tool has one older finding, on a line not touched. The guide, the worksheet, the article and the deck were rebuilt and looked at as rendered. The guide is 12 pages, as before, after three passes of tightening to keep boxes from spilling onto empty pages. Not seen signed in: the page and the tool.

For the founder to look at first, and still open, see `DAY_2_DOCUMENT_REVIEW.md`. The four documents have no links yet.

**Put in the leader's own person, 2026-10-10.** The founder, on the first pass of the rebuild: "We are getting close. What I want you to do is always refer to the leader and not their team or their organization. That's what I meant by make it personal." His example was the Data Governance move: "Ask yourself where the latest version of your most important record is, and count the answers."

- The 24 statements now say "I" and "my", and none says "we", "my team" or "my organisation". The scale's first step reads "Not true of me" again.
- The guide, the worksheet, the article, the deck and the page were rewritten to match, and all four documents and the deck were rebuilt. A sweep of every Day 2 file found no line left that speaks to a team or an organisation. The audit's example now reads "my client list".
- Three of his six dimensions needed more than a change of pronoun to face the leader: Talent, Collaboration and Strategy. They are set out in `DAY_2_DOCUMENT_REVIEW.md` as the places for him to look at first.
- Recorded as rule 17 in `WORKING_RULES.md`, with the two wrong readings it replaces.
- Checked: the tool's statements match the reference word for word. The page and its resource list pass lint, and the tool has the one older finding. The guide is 12 pages. The changed pages and slides were looked at as rendered.

**The rating scale and the scoring, 2026-10-10.** The founder found that "Rarely true", "Sometimes true" and "Consistently true" did not sound right and did not work with the statements. Four scales were put to him, and he chose "yes or no, with evidence": **1 No · 2 Not yet, but planned · 3 Partly · 4 Yes · 5 Yes, and I could show it.** He also asked for whole numbers: "Decimals are confusing for most."

- **A dimension's score is now the sum of its four answers, out of 20.** 4 to 9 is a gap, 10 to 13 is developing, 14 to 20 is a strength: the old bands, multiplied by four.
- Changed in the tool, the scorecard reference, the guide's table, the worksheet, slide 11 of the deck and the page's hint. The guide, the worksheet and the deck were rebuilt.
- **The tool was run on screen** in a temporary signed-out preview, since removed: the new scale showed on the first screen, all 24 statements were answered, and the profile came out as 16, 8, 12, 12, 9 and 16, each read correctly as a strength, a gap or developing, with the tie between two dimensions offered for the leader to settle. The downloaded summary was not opened.
- The tool's storage keys were renamed again, so answers given under the old scale are not read under the new one.

## 11. Day 3, AI Value

The page, the Territory Builder and the four Markdown references in `resources/day-3/` were audited from the code and the Markdown, 2026-10-10. Not seen signed in. **Awaiting the founder's decisions. Nothing changed.** The founder has not uploaded the Day 3 documents, so the references were not compared with his Google Docs.

**On the page:** the eyebrow "Day 3", the title "Ownership & Value Control", the opening, the replay and the feedback form. Then a Prerequisite Task card (AI Value Map, 30 minutes, its document), the Milestone Task card (Territory Declaration, 15 minutes, its template, and a line saying Peer Reflection or Milestone Review), two sections (A, Industry Friction & Territory, with the Territory Builder; B, Transfer to Declaration Template), a completion check and one insight (Seeing Where Money Actually Lives).

**Already in place**

- The Mandate card and the Mandate and Agency slides left Day 3 on 2026-10-09. The deck is 15 slides in two parts, Money and Map.
- **The page and the Toolbox open the same three documents.** No second edition here.
- **The three participant documents ask for no work with AI,** and none points at material that moved.
- The article and the deck have no em dashes. No exclamation points or emojis in the documents.
- The declaration is saved once and becomes the certificate, so the page staying open cannot change one that has been issued.
- The title may say more than the menu's "AI Value" (founder, at Day 1).

**Found**

1. **A participant with the VIP review upgrade is told "peer reflection".** The page decides between "Milestone Review" and "Peer Reflection" on the package alone, so a General Admission participant who bought the review reads "for peer reflection" on the task card and "Peer Reflection Optional" under it. The menu and the schedule treat the same person as having the Milestone Review, as the founder ruled at Expectations.
2. **Day 3 never mentions the friction log from Day 0.** Day 0 now says "You will use your friction log on Day 3." Section A says "add between 3 and 10 friction points from your industry", as if starting fresh. The same gap Day 1 had with the task list.
3. **The Territory Builder writes the declaration with AI.** The participant enters five things, presses once, and a model writes the two sentences that go on the certificate. It can be done once per participant (founder, 2026-10-06). The participant needs no AI tool and writes no prompt. Whether this counts as "a task that involves AI" under the rule of 2026-10-10 is the founder's to say.
4. **The main task is labelled "Milestone Task".** Days 1, 2 and 7 say "Primary Task". The founder calls it the Milestone Task himself, so this may be right as it stands.
5. **Em dashes in two documents:** four in the AI Value Map and ten in the Territory Declaration template, mostly in headings such as "Section A — Industry Friction List". Small edits, to come back as parts to replace.
6. **"Optimizer" is spelt the American way.** It is the name of one of the five positions, and it stands in the Value Map, the template, the tool and the instruction the model follows when it writes a declaration.
7. **Three older lint findings on the page,** on lines not touched.

**Founder's decisions (2026-10-10)**

1. Fix the review label, so the VIP review upgrade reads "Milestone Review".
2. Open Section A with the friction log from Day 0, **written so that a participant who has none can make one there.**
3. **The declaration written by AI stays.** "This is done for them." The rule that sends AI tasks to AI Labs is about work the participant does with AI, not work the tool does for them.
4. "Milestone Task" stays as the label.
5. He shares his documents before any edits to them are prepared.
6. "Optimizer" stays as it is spelt.

**Changed** (`intelligence/src/app/(protected)/challenge/day-3/page.jsx`)

- The task card and the line under it now read "Milestone Review" for VIP, VVIP and the VIP review upgrade, and "Peer Reflection" for everyone else. The page had looked at the package alone.
- Section A opens: "Start with the friction log you began on Day 0. If you do not have one, make it now: write down the repeated problems in your industry that cost time, money, or control. Then use the tool below to add between 3 and 10 of them."

**The documents.** The founder uploaded five files: the AI Value Map, the Territory Declaration, the article, the Mandate & Ethics Guide and the deck. All four documents match the Markdown references word for word, and the deck is identical to the original the 15-slide version was cut from. What needs to change is in `DAY_3_DOCUMENT_REVIEW.md`: seven small edits to the Value Map and sixteen to the template, none to the article or the deck, and the Mandate guide left for the Day 7 audit. Three things there are his to decide: the number of friction points (the Value Map says ten, everything else says at least three), Part 3 of the Value Map repeating the Milestone Task, and the template's own name. **Awaiting his approval.**

**The documents: approved 2026-10-10.** The founder's answers: at least three friction points; he adds the sentence at Part 3 of the Value Map himself; the template's name he reports as already done; the zones are written out in full. He named no edit to drop, so the em dashes, the friction log line and the two slips are taken as approved with the rest. The 23 edits are in `DAY_3_DOCUMENT_REVIEW.md`, as the words to find and the words to put in their place, and the two Markdown references already carry them. The Mandate & Ethics Guide is left for the Day 7 audit.

## 12. Peer Reflection, or Milestone Review by tier

Both pages and their two workspaces (`PeerReflection.jsx`, `ProjectReview.jsx`) were audited from the code, 2026-10-10. Not seen signed in. **Awaiting the founder's decisions. Nothing changed.** Neither page has documents of its own.

**Peer Reflection, on the page:** the eyebrow "Optional Practice", the title, a line on what peer reflection is for, an agreement to accept before starting, the workspace (share the Territory Declaration without a name, reflect on three others against three prompts, then receive reflections on one's own), a card on how to use it well, and the upgrade offer.

**Milestone Review, on the page:** the eyebrow "VIP Access", the title "Milestone Review & Strategic Feedback", the workspace (submit a view-only link to the Territory Declaration, up to three drafts, with the facilitator's feedback), a card for booking the 30-minute session, and a timeline of the window.

**Already in place:** both open on Day 4 and shut when the challenge closes. Peer Reflection is marked optional everywhere. Reflections are anonymous, and a participant reflects on three before reading their own. The Milestone Review workspace calls the work the "Territory Declaration". Neither page asks for work with AI. The offer on the Peer Reflection page ends with the review window.

**Found**

1. **The work has two names.** It is the Territory Declaration, and the Milestone Review workspace says so. Peer Reflection calls it a "project" eleven times ("Submit Project Link", "Open Project Document", "View Project"), the Milestone Review timeline says "Submit project", and the offer, the welcome notice after an upgrade and the Profile say "project" too.
2. **Copy slips in Peer Reflection:** two exclamation points ("Reflections complete!", "Your reflections are on the way!"), "thoughful" for "thoughtful", "anonymized" three times where the schedule now says "anonymised", "peer-reflection" with a hyphen once, and a missing comma in the opening line.
3. **"VIP Access" heads the Milestone Review page.** A General Admission participant who bought the review sees it too, and by the founder's ruling they are not VIP.
4. **The booking line** reads "The AISC engagement ends on [date]. Endeavour to book a session before [date and time]", with no full stop at its end.
5. **The session hours have no time zone:** "11am - 6pm". The booked time below it shows in the participant's own time zone.
6. **The offer says the 30-minute session is "to refine your roadmap and strategic direction".** The Roadmap is built after the challenge, and the session is held before it closes.

**Founder's decisions on page 12 (2026-10-10)**

1. **"Project" stays, and it is deliberate.** His words: "It is a project. The project is about territory declaration. Peer Reflection calls it project because no facilitator gets involved so they need to take it seriously. For the VIPs there are reviews so there's interaction." Do not change "project" to "declaration" on these pages, in the offer or on the Profile.
2. Tidy all the copy slips.
3. "VIP Access" becomes "VIP Review".
4. The booking line as proposed.
5. Add "WAT" to the session hours.
6. The offer says the session is "to refine your territory and strategic direction".

**Changed** (`intelligence/src/`)

- `components/challenge/PeerReflection.jsx`: "Reflections complete." and "Your reflections are on the way." without exclamation points, "thoughtful", "anonymised" three times, and "peer reflection" without its hyphen.
- `app/(protected)/challenge/peer-reflection/page.jsx`: a comma, "to sharpen your thinking, not to evaluate others".
- `app/(protected)/challenge/milestone-review/page.jsx`: "VIP Review" heads the page. The booking line reads "The challenge closes on [date]. Book your session before [date and time]." The hours read "11am - 6pm WAT".
- `components/challenge/MilestoneReviewUpgrade.jsx`: "to refine your territory and strategic direction".

Lint: nothing new. `PeerReflection.jsx` has twelve older findings on lines not touched.

## 13. Day 6, Roadmap

The page and the five Markdown references in `resources/6-month-roadmap/` were audited from the code and the Markdown, 2026-10-10. Not seen signed in. **Awaiting the founder's decisions. Nothing changed.** He has not uploaded the Day 6 documents, so the references were not compared with his Google Docs.

**On the page:** the eyebrow "Roadmap", the title "6-Month AI Stakeholder Roadmap", two opening paragraphs, the space for the instructional video, three things to complete before building (the Capability Gap Audit, the AI Stakeholder Identifier, and the Personal AI Policy, which is written on Day 7), the Roadmap card with its document, the five sections of the Roadmap each with a hint, a completion check, the Milestone Review offer, and the post-challenge guide, The Power of Super Connections.

**Already in place**

- **It is built after the challenge,** and the page says so in four places (founder, 2026-10-09). It never locks.
- **It keeps to the rules of 2026-10-10.** Section 2, Proof of Leverage, sends the work with AI to Labs: the AUGMENT task from Day 1 goes through the Description-Discernment Loop there.
- The Personal AI Policy card says it is written on Day 7 and has no button.
- The Milestone Review offer on this page now ends when the challenge closes.
- The voice is the leader's. No exclamation points.

**Found**

1. **The eyebrow reads "Roadmap".** Days 1, 2, 3 and 7 read "Day 1", "Day 2" and so on, and the menu says "Day 6".
2. **Three em dashes on the page,** in the names of the phases: "Phase 1 — Clarity & Labs", "Phase 2 — Implementation & Relationships", "Phase 3 — Governance & Mandate".
3. **The video's place is still empty.** It reads "The video will appear here shortly" until the Cloudflare address is set in `intelligence/src/lib/challenge/day6Video.js`.
4. **The documents carry 74 em dashes between them,** by our copies: 24 in the Roadmap, 35 in the Super Connections guide, 8 in the Capability Audit, 5 in the Stakeholder Identifier and 2 in the Personal AI Policy.
5. **The Roadmap's Section 2 was rewritten in our copy on 2026-10-09** and not yet in the founder's Google Doc. It is the one edit there that changes meaning.
6. **The Personal AI Policy exists twice:** as "Roadmap Resource #3" among these five, and as the Day 7 document built on 2026-10-09. To settle at the Day 7 audit.
7. **Fourteen older lint findings on the page,** on lines not touched.

**Founder's decisions on page 13 (2026-10-10)**

1. **The eyebrow stays "Roadmap".** "Same thing with VIP REVIEW. Leave as is." An eyebrow names the thing the page is, and not every page carries a day number.
2. **The phase names keep their em dashes.**
3. The video comes later.
4. **Em dashes are his to adjust, by hand.** "I'll adjust em dashes manually. Don't add them in the edits." Added to rule 16 of `WORKING_RULES.md`. The Day 3 paste sheet was rewritten without its fourteen em dash edits and now lists nine. The Day 1 sheet, which may already be in use, carries a note at its top to skip them.
5. **The Personal AI Policy goes to Day 7, so it is not on the Roadmap page at all.** This replaces the decision of 2026-10-09, which kept its card there pointing to Day 7.

**Changed** (`intelligence/src/app/(protected)/challenge/roadmap/page.jsx`): the Personal AI Policy card is removed. "Complete Before Building Your Roadmap" now holds two things, the Capability Gap Audit and the AI Stakeholder Identifier.

**Checked in our copy of the Roadmap document (2026-10-10), to confirm against the founder's when it arrives:** it does not list the policy as a pre-requisite, but it names it twice. Section 1, the Executive Summary, "feeds from" the "Personal AI Policy & Your own reflection", and the policy is one of the "Connects To" options in Section 5. Both still hold with the policy on Day 7, as long as the leader finishes the Executive Summary after Day 7. **Earlier wording of this note:** whether the Roadmap document itself still lists the Personal AI Policy as something to complete first. Our copy of the page said it "feeds into your Executive Summary".

**The Day 6 documents (2026-10-11).** The founder uploaded four: the Roadmap, the Capability Gap Audit, the AI Stakeholder Identifier and The Power of Super Connections. All four match our Markdown references word for word, apart from the Roadmap's Section 2, which our copy rewrote on 2026-10-09. The review, with 27 proposed edits written as parts to paste, is `DAY_6_DOCUMENT_REVIEW.md`. Nothing is changed until he approves (rule 16).

- **Changes meaning:** the Roadmap's Section 2, Proof of Leverage, which says the proof was made on Days 1 and 2. Seven edits move it to AI Labs.
- **Older names:** "Value Map Template" four times across three documents, for the Roadmap's "Territory Declaration Template". "AI Stakeholder Map" twice, for the Identifier.
- **"You have spent three days"** in the Super Connections guide, against the seven-day decision of 2026-07-17.
- **Eleven slips:** a stray # in four of the Audit's headings, three wrong references in the Identifier, four missing spaces in the guide.
- **For him to settle:** what "Value Play" is, in the Roadmap's "Connects To" options; two optional sentences saying what is built in AI Labs; the 90-day review against Phase 1 ending on Day 60; and one look at the Identifier's Priority Matrix page, whose upright label overlapped the boxes in the rendering made here.
- **For Day 7:** the Personal AI Policy's existing Google Doc link is the one its card carried on the Roadmap page at the last commit, before the card was removed. It is recoverable from there (`git show HEAD:` on the Roadmap page) when Day 7's links are settled.

## 14. Day 7, AI Governance

**Audited 2026-10-10.** The page (`intelligence/src/app/(protected)/challenge/day-7/page.jsx`), its list of documents (`src/lib/challenge/day7Resources.js`), its Home card and schedule entry, and the four documents in `resources/day-7-ai-governance/`.

**What already conforms**

- It follows the Day 1 and Day 2 pages: Prerequisite Task, Primary Task, three sections, a completion check, one resource, one insight.
- It opens on Day 7 and locks 48 hours after the challenge closes, with Days 1 to 3. It has a replay since the founder added the three Day 7 columns.
- Its documents are listed once, and the Toolbox's Day 7 group reads the same list. A document with no link shows as not yet available, so an empty link cannot be mistaken for a real one.
- No task on the page needs an AI tool. The policy is written by hand, in the leader's own words.
- The voice is the leader's throughout: "This is not your organisation's policy. It is yours."
- No em dash on the page. The Home card's title has one, where the founder allows it.

**Tidied on the page:** "you are done with Day 7 task" now reads "you are done with the Day 7 tasks", as Day 2 has it.

**Findings**

1. **The Guide and the Policy differ little from the Google Docs the founder already has.** Compared line by line with the references they were cut from:
   - *The Mandate & Ethics Guide* (existing Google Doc, the Day 3 resource): the label "Day 3 Resource" becomes "Day 7 Resource"; "Part One" and "Part Two" become "Part 1" and "Part 2"; one sentence is new under Diligence; two sections come out, "Governance and Quality of Life" and "Why Ethics Becomes a Competitive Advantage", which are now the Day 7 article; and the sentence that opens the self-assessment points to the policy, where it pointed to Day 3's territory work. Six edits, two of them deletions.
   - *My Personal AI Policy* (existing Google Doc, "Roadmap Resource #3"): the label alone. One edit.
   - Under rule 16 these are small enough to go into the existing documents, which keeps both links. The decision of 2026-10-09 was the opposite: new documents, new links. The comment in `day7Resources.js` still says so.
   - The Roadmap Resource #3 reference has not been checked against the founder's own file yet. It is one of the five Day 6 documents still to come.
2. **The article is a new document.** "Who Writes the Rules" is still a working title, and it runs to about 420 words against 670 to 1,150 for the other insights. It needs the founder's title, then a link.
3. **Diligence is taught on Day 1 now, in three parts, and Day 7 does not pick them up.** Day 1's deck has Creation, Transparency and Deployment Diligence. Day 7's slide 4 lists the four Ds again and gives four general practices. The Guide's new sentence says only that Diligence is "the fourth of the four Ds you met on Day 1". The policy's standards already answer the three parts: Data Governance and the tools register are Creation Diligence, Disclosure and Transparency is Transparency Diligence, Output Quality is Deployment Diligence, and Task Delegation is Day 1's other D. Nothing says so.
4. **Three lines are spoken on Day 1 and again on Day 7.** They came from the Day 7 material when Day 1's Diligence slide was written on 2026-10-10: "Until a policy exists, your behaviour is the standard", "This is not about blame. It is about ownership", and "AI does not transfer responsibility. It only executes it."
5. **The Approved Tools Register assumes the leader already uses AI tools.** Step 2 on the page is "Fill in your Approved Tools Register", and the document says "List the AI tools you use regularly". A leader who uses none has nothing to enter, and nothing tells them so. AI Labs, where tools come in, opens the same day.
6. **Section C asks for something the document does not have.** The page says "set your review dates at 30, 90 and 180 days". The document has one date to set, the next review, and three fixed reviews with a question each. Step 4 and the completion check have it right.
7. **No feedback form.** Days 1 to 3 have one. Day 7 would need a `day_7` column on `challenger_feedback`, which the founder runs as SQL, and one line in the feedback route.
8. **The Guide and the Policy speak of "your team" and "your organisation" in places** ("Building the diligence habit into your team's culture", "With my team, my transparency standard is..."). They are the founder's own words, they address the leader, and the mandate's third dimension is the leader's duty to other people. Rule 17 is noted against them and nothing is proposed.
9. **"The discernment step"** appears in the policy's example of a delegation standard. Discernment is now AI Labs' subject and Day 1 only names it. Left alone: it is an example, and the word has been met.

**Left as built, unless the founder says otherwise:** the labels "Prerequisite Task" and "Primary Task"; the times, 15 and 45 minutes; the schedule's subtitle "The Mandate", which follows Mindset, Meaning, Mechanics, Measure and Money; the Home card's wording.

**Awaiting the founder:** where the Guide and the Policy edits go (finding 1), the article's title (2), whether Day 7 picks up the three parts of Diligence (3), the echoed lines (4), the line for a leader with no tools yet (5), Section C's wording (6), and the feedback form (7). No document is changed before he approves (rule 16).

**The founder's decision on the documents (2026-10-11)**

> "I don't want the ethics guide split to produce an insight. Let's have everything as it was before in the ethics guide. So we have only 2 documents that day."

He uploaded his own two files the same day. This answers findings 1 and 2 above and replaces the decision of 2026-10-09.

- **Day 7 has two documents:** the Mandate & Ethics Guide, whole, and My Personal AI Policy. Both are his existing Google Docs. There is no Day 7 insight, and "Who Writes the Rules" is not used.
- **His uploads match the originals we hold, word for word.** His files now open with a cover page. The guide carries no "Day 3 Resource" label, and the policy's page header no longer says "Capstone Resource 03".
- **Our two Markdown copies are put back to his wording** and match his uploads with no difference. The drafts built on 2026-10-09, the article among them, are set aside in `resources/day-7-ai-governance/superseded/`. Nothing was deleted.
- **Adjustments proposed to him, in `DAY_7_DOCUMENT_REVIEW.md`:** in the guide, the sentence that opens the self-assessment ("the territory and value work of today") and the page header, which says "Framework"; in the policy, the label "#3 ROADMAP RESOURCE", and one optional sentence at the tools register for a leader who uses no AI tool yet (finding 5).
- **No sentence about Diligence is added to the guide.** Finding 3 is now a question for the session notes alone.

**Changed** (`intelligence`, uncommitted): `src/lib/challenge/day7Resources.js` lists two documents, so the Toolbox's Day 7 group does too. On `day-7/page.jsx` the Day 7 Insight card is removed and the resource card says "Part One" and "Part Two", as his document does.

**Recorded as a rule:** a note under rule 15 of `WORKING_RULES.md`. The day pattern does not outrank a document he wants kept whole.

**Still open:** whether the two existing links are the ones to use; Section C's wording (finding 6); the feedback form (7); slide 4 and Day 1's three parts of Diligence (3); the three lines spoken on both days (4).

**The founder's answers (2026-10-11, later the same day)**

1. **The links: "Yes they are."** The two uploads are the Google Docs the Learning Center linked before. Their links are in `day7Resources.js`: the guide's from the Toolbox's old Day 3 group, the policy's from the Roadmap page, both read from the last commit.
2. **Section C: approved.** "Sign it, date it, and set your next review date, 30 days from today. You return to it at 30, 90 and 180 days."
3. **The feedback form: he asked why leaving it out was recommended.** Three reasons, found in the code. Days 1 to 3 ask one question before the day's task: "What has changed in how you see yourself and your future after this session?" The end of the challenge already has its own form, three questions and the testimonial consent, on Next Steps and on Home, and Next Steps opens on Day 7. Its first question asks nearly the same thing. So a Day 7 form would be a second reflection on the same day. It would also hold back the Day 7 task until it was filled, on the day the certificate and Next Steps are waiting. And it needs a new column in the database, which only he can add. Against that: without it, nothing records what the Day 7 session itself changed. His decision.
4. **Diligence: "Yes. Elaboration will be great. Actually, the Diligence in Day 1 session notes should be in Day 7 so that Day 1 can focus on Delegation."** This replaces the arrangement of 2026-10-10, when Day 1's "D2: Description" slide became "D4: Diligence".
   - *Day 1's deck:* the Diligence slide is out, so it has 11 slides. Slide 9's line and the wrap-up's Mechanics cell now say Diligence is Day 7.
   - *Day 7's deck:* 11 slides. Slide 4 is Day 1's Diligence slide in one of the seven designs: the three parts, each with a question and a line. That design holds one question a part where Day 1's slide had three, so all nine are kept for the facilitator in `resources/day-7-ai-governance/diligence-slide-from-day-1.md`. Slide 10 is new, "From Diligence to Standard": Delegation and the three parts on one side, the standard each becomes on the other, with the other two standards named as the leader's own.
5. **The lines spoken on both days: "Give Day 7 fresh ones."** The three lines were on Day 1's Diligence slide, which is gone, so none is spoken on both days now. Day 7 keeps its own, which are sentences of the guide. The two slides new to Day 7 carry lines used nowhere else in the deck: "Know when to slow down, even when the pressure is to move fast" (the guide) and "A standard you have written is a standard you can uphold" (the policy's closing line). **This is a reading of his answer:** if he meant the guide's three lines to be replaced in Day 7's deck as well, that is still to do.

**Changed** (uncommitted): `intelligence/src/lib/challenge/day7Resources.js` (the two links), `day-7/page.jsx` (Section C). In `aisc/program/resources`: `day-1/day-1-session-notes.md` and `.pptx`, `day-7-ai-governance/day-7-session-notes.md` and `.pptx`. The decks they replace are kept in each day's `superseded` folder.

**Still with the founder:** the four adjustments in `DAY_7_DOCUMENT_REVIEW.md` to paste; the feedback form; and the credit for the 4D framework, raised on 2026-10-10. Its three names for Diligence now sit on Day 7's slides.

**The founder's further word (2026-10-11, third message)**

- **"The diligence as seen in the screenshot is not yet in the Day 7 session notes."** He sent a picture of Day 1's Diligence slide. The slide 4 built earlier that day had recast it in another design, with one question a part. **Corrected:** slide 4 is now Day 1's slide word for word, in the same arrangement: the banner, three numbered rows, and in each row the name, the line, three questions and the quote. The deck builder had no design for it, so `aisc/scripts/program-deck.mjs` has an eighth, "numbered rows", put together from the deck's own shapes so it sits with its neighbours. In the render all nine questions sit inside their boxes.
- **"Give Day 7 fresh ones", read again.** With slide 4's three quotes now in Day 7, slides 3 and 7 said the same lines. Slide 3's first column, and slide 7's quote strip, first card and two of its questions, now carry other words of the guide. This replaces the reading recorded above, which kept them.
- **The 4D framework: "Don't worry about the credit for the 4D Framework. I'm allowed to use it."** Closed. Not to be raised again.
- **The feedback form: "Do we move the feedback in next steps to Day 7 instead? The participants just finished the session and are more likely to fill it out as they check the task of the day."** Answered yes, with a plan put to him and nothing built: the end-of-challenge form (three questions and the testimonial consent) at the top of the Day 7 page, where Days 1 to 3 have theirs. It needs no database change. Two things are his to settle: whether Next Steps still shows it to a leader who has not filled it, and whether Home stops offering it from the evening of Day 5, which is two days before the session it would now follow.

**Recorded as a rule:** rule 18 of `WORKING_RULES.md`. What he asks to move or keep goes whole, as it is.

**Changed** (uncommitted): `aisc/scripts/program-deck.mjs` (the eighth design), `resources/day-7-ai-governance/day-7-session-notes.md` and `.pptx`.

**The feedback form moves to Day 7 (founder, 2026-10-11, fourth message)**

His two answers: Next Steps keeps the form as a fallback ("We can keep it as a fallback"), and Home's timing changes ("Yes, it has to open with day 7").

- **Day 7 page:** the end-of-challenge form, three questions and then the testimonial consent, is at the top right, where Days 1 to 3 have their daily form. It holds nothing back. Once filled, the leader sees their own answers there.
- **It opens with Day 7, everywhere.** `finalFeedbackUnlock` is now the moment the Day 7 page opens. It was the evening of Day 5. The two settings that placed it there are gone from `timelineConfig.js`.
- **Next Steps keeps it for a leader who has not finished it, and only once Day 7 is open.** This second condition was added while building: Next Steps opens at 08:00 on the Day 7 date, and the Day 7 page opens that evening, after the session. Without it the fallback would have shown the form twelve hours before the session it is meant to follow.
- **No database change.** The form's columns already exist.
- **Not changed:** the form's own words. Its consent step says "Thank you for completing the challenge", which a leader now reads at the top of the Day 7 page before doing the day's task. Home still offers the form only to a leader who gave the Day 3 feedback. The Day 7 page offers it to everyone.

**Checked:** two made-up cohorts, one ending on a Monday and one on a Sunday: the form is shut on the evening of Day 5 and one minute before Day 7 opens, and open one minute after. The page was looked at signed out, through a temporary preview since removed, in a headless browser at desktop and phone width: the empty form, the consent step and the finished state all sit in the header's second column, with no sideways scroll and no page error. The in-app browser would not open localhost this time.

**Changed** (`intelligence`, uncommitted): `day-7/page.jsx`, `next-steps/page.jsx`, `lib/challenge/time/normalizeChallengeTimeline.js`, `timelineConfig.js`, `resolveCurrentFocus.js` (a comment).

**For the Next Steps audit (page 15):** Next Steps, with its "You've Finished the AI Stakeholder Challenge" heading and its confetti, opens at 08:00 on the Day 7 date. The Day 7 session and page come that evening. Under the old week Day 7 was a light day. Now it is a full one, and the congratulations arrive before it.

**Next Steps opens after Day 7 (founder, 2026-10-11, fifth message)**

> "Let next steps open after day 7 not before. I actually prefer Next Steps opening 24hrs after Day 7 opens. That way it aligns."

- **Next Steps opens 24 hours after Day 7 opens.** It was 08:00 on the Day 7 date, hours before the session. One setting, `NEXT_STEPS_HOURS_AFTER_DAY_7`, in `timelineConfig.js`.
- **The Profile opens with it, as before.** So the Certificate of Declaration and the Toolbox are also a day later than they were. Labs still opens on Day 7.
- **Home's card stays on Day 7 until Next Steps opens.** It used to turn to Next Steps when the challenge closed, at the end of the Day 7 date. Left so, it would have named a locked page for most of a day, and the layout sends a locked page back to the card's own link.
- **The status line reads "Completed" from the moment Next Steps opens,** where it turned at the challenge's close, so it and the card change together.
- **The schedule's Next Steps line** under Day 7 reads "Opens the next day", where it read "Self-paced".
- **Not changed:** when the challenge closes, the review window, the upgrade offers and the 48-hour lock. For a cohort whose last day is a Sunday the close moves to Monday night, so Next Steps opens about four hours before it.

**"Thank you for completing the challenge." no longer works** (founder). The consent step of the form now says "Thank you for your reflections." The heading over a leader's finished answers read "Your Post Challenge Reflections", which is wrong for the same reason on the Day 7 page, and now reads "Your Final Reflections". Both wordings are proposals in place, his to change.

**The Day 7 documents: "I have manually made the adjustments."** Our two Markdown copies took the three necessary ones. Whether the optional sentence at the tools register went in is not confirmed, so it is not in our copy.

**Checked:** two made-up cohorts walked from the morning of Day 7 to after the lock, as General Admission and as VIP. At every moment Next Steps and the Profile open together, Home's card links to a page that is open, and the status changes with the card. The earlier check of the feedback form's opening still passes.

**Changed** (`intelligence`, uncommitted): `lib/challenge/time/timelineConfig.js`, `normalizeChallengeTimeline.js`, `resolveCurrentFocus.js`, `challengeAccess.js` (comments), `lib/challenge/resolveStatus.js`, `components/challenge/CurriculumSchedule.jsx`, `components/challenge/FinalFeedback.jsx`, `next-steps/page.jsx` (a comment).

**For the Next Steps audit (page 15):** the note above about its early opening is settled by this. Still to look at there: its heading and opening lines now that it comes a day after Day 7, and Home's card for it, which says "access your certificate of declaration".

**Labs, Next Steps and the Profile open together, a day after Day 7 (founder, 2026-10-11, sixth message)**

> "I think it's wise to allow day 7 breathe with the AI governance. Day 8 is a good time for profile, labs and next steps to open."

- **Labs opens at the moment Next Steps and the Profile do, 24 hours after the Day 7 page opens.** It opened at the first minute of the Day 7 date. The rule is still one function, `labsOpensAt` in `lib/labs/access.js`, now worked out with the challenge's own settings, and the free months count from that moment.
- **The pages say "the day after Day 7".** He said "Day 8". The challenge is seven days by his decision of 2026-07-17, so no page prints an eighth day. Changed: the Labs pages, the Labs door beside the profile button, the Toolbox's AI Labs tile ("Opens after Day 7"), and Day 1's Section C ("AI Labs, which opens the day after Day 7").
- **Three lines of the Day 2 documents said work with AI begins "on Day 7".** They are our own documents, still waiting for his review, so they were changed and the two Word files rebuilt: the guide is still 12 pages and the article 4.
- **Nothing on Day 7 now but AI Governance:** the session, the General Q&A, the two tasks and the end-of-challenge feedback.

**Checked:** three made-up cohorts, as General Admission, VIP and VVIP. Labs opens at the very moment Next Steps does, and is shut on Day 7 itself and one minute before.

**Changed** (`intelligence`, uncommitted): `lib/labs/access.js`, `components/labs/LabsViews.jsx`, `components/challenge/ChallengeUserIcon.jsx`, `utils/challenge/ToolBox.jsx`, `day-1/page.jsx`, and comments in `LabsOpenNotice.jsx`, `CurriculumSchedule.jsx`, `buildChallengeContext.js` and `labs/page.jsx`. In `aisc/program/resources/day-2-ai-readiness`: `ai-readiness-guide` and `the-leader-goes-first`, `.md` and `.docx`.

**Day 6 documents (same message).** "I have already done A-D": our four references now carry those edits. E: "Value Play" comes out, and the reference has it out. He asked what "Phase 1 Milestone" is, and for F, G and H in detail. Those answers were given in the conversation, and F and G wait on him. The Roadmap page's hint beside Section 2 says "In AI Labs" where it said "In Labs".

**Closing notes on Days 6 and 7 (founder, 2026-10-11, seventh message)**

- **Day 6: "All day 6 issues have been sorted from A - H."** Our references have A to E. For F and G our copies wait until he says which way he went, or uploads the four files for a word-by-word check.
- **Day 7 policy: the sentence at the Approved Tools Register is in.** He quoted the paragraph as it stands: "List the AI tools you use regularly and the boundaries you have confirmed for each. This is your personal reference. Update it as your tool use evolves. If you use no AI tool yet, leave it empty and begin it in AI Labs." Our copy has it. **Step 2 on the Day 7 page now carries the same sentence,** so the page and the document say one thing (finding 5 of this section).

## 15. Next Steps

**Audited 2026-10-11.** The page (`intelligence/src/app/(protected)/challenge/next-steps/page.jsx`), its coaching card (`components/challenge/CoachingProgram.jsx`), Home's card for it, and the facts in `SOURCE_OF_TRUTH.md`.

**Settled earlier the same day:** it opens 24 hours after Day 7 opens, with the Profile and Labs; the end-of-challenge feedback shows here only for a leader who has not finished it; Home's card and the status line turn to it at that moment.

**What already conforms**

- The coaching card's facts match the standard: three Saturdays a month at 7PM WAT for two hours, the fourth week left to the monthly challenge, AI Labs for as long as coaching lasts, the Cal.com call as the one way in, and the three prices, which match `aisc/src/lib/pricing.js`.
- The second line of "What You've Earned" is already the new Day 2: "A clear view of your readiness and your data".
- No em dash on the page. The voice is second person.

**Findings**

1. **The page says nothing of Labs.** Labs opens at this very moment, with the leader's first month, three or six free by tier. Every "In AI Labs" line in the Day 1, Day 2 and Roadmap documents points there, and Day 1's page promises it. Next Steps, the page about what follows, has no card for it. The one prompt is a small notice in the frame that shows once.
2. **It does not send the leader to the Roadmap.** The Roadmap is built after the challenge, in about two focused days, starting with the Capability Gap Audit and the Stakeholder Identifier. That is the leader's own next piece of work, and this page has no line or button for it.
3. **It lists the Roadmap as something earned.** "What You've Earned" has "6-month AI stakeholder roadmap". At this point the leader has the Roadmap's frame and what feeds it, not a written Roadmap. The coaching card says the same twice: "You have your 6-Month AI Stakeholder Roadmap" and "the Roadmap you already have".
4. **The Personal AI Policy is missing from what was earned.** It is Day 7's Primary Task, written and signed the day before.
5. **"Reclaimed capacity"** in the opening lines belongs to the old Day 2, Margins. The seven days no longer reclaim capacity: that is AI Labs' work.
6. **The Certificate of Declaration is not named on the page.** Home's card for Next Steps promises it ("access your certificate of declaration"), and the page's one button says only "Go to my profile".
7. **"Host The Awakening" sends an email.** The standing route for a free session for a community that can convene 50 or more is the form at `/community/sponsor` (`SOURCE_OF_TRUTH.md`). The page also calls the session 30 minutes, and the canonical file gives no length for it.
8. **Slips.** "Congratulations!" has an exclamation point, which the brand voice rules out. Four American spellings in what the leader reads ("organizations", "recognized", "organization" twice) and two more in the email drafts the buttons open. The article's title has a small "is" where the article itself has "Is". Home's card writes "certificate of declaration" without capitals.
9. **Dead code.** The page still imports the advisory options and keeps a switch for them, but nothing on the page turns the switch on.

**Left for when the public site's copy is done, on the founder's word:** the site and the brief say the Certificate of Declaration and Next Steps come on Day 7. The certificate is still dated Day 7. It is now reached a day later, with the Profile.

**Awaiting the founder:** a Labs card (1), a line and button for the Roadmap (2), the wording of what was earned and of the coaching card's two Roadmap lines (3, 4), the opening lines (5), the certificate line (6), where "Host The Awakening" goes and how long that session is (7), the slips (8), and whether the dead code goes (9).

**Founder's decisions on page 15 (2026-10-11)**

> "This next steps is a very important part of the marketing journey. As much as I need to lead them to the next phase, I also need to upsell and show them the possibilities should they be interested."

1. **Every link on the page opens in a new tab,** "so that the user can still be on this page".
2. **One information hub, with tabs.** "The stakeholder status and labs card are in one component and user use tabs to move through them."
3. **The order of what was earned:** a clear view of your readiness and your data; a declared position in your industry; 6-month AI stakeholder roadmap. **"The roadmap earned there means a map, not that they have finished it. It's worth mentioning."** The Personal AI Policy is not added to the list.
4. **No Roadmap card.** "There's already one and that's the AI Stakeholder Coaching upsell." To make it more interesting, borrow from the Roadmap in the Toolbox section of the public site: "The animation would work great there and help sell it better." So the coaching card's two lines about the Roadmap stand as they are (finding 3).
5. **"The reclaimed capacity line no longer works ... so work on the delivery."**
6. **"Explore group rollout" goes to `/form/inquiry`,** keeps its message, and preselects Custom Cohort and Organization.
7. **"Host The Awakening" does the same,** and preselects Private Briefing and Community.
8. **The slips are handled. The dead code stays for now.**
9. **The site copy is the last thing done, on his word.**

Not answered, so not done: a line naming the Certificate of Declaration on the page (finding 6), and how long the hosted session is. The page still says 30 minutes, and its message was kept as he asked.

**Built** (`intelligence`, uncommitted)

- **The hub** (`components/challenge/NextStepsHub.jsx`, new). The lilac card that was "What You've Earned" has two tabs. *AI Stakeholder Status* is that card, with the list in his order and one new sentence under it: "The roadmap you have earned is the map, not the journey completed. You build it out and follow it over the next six months." *Labs* says what opens now: where the work with AI begins, the three shelves a leader can open, and the free months by tier in the canonical form ("AI Labs is by subscription, and your first 3 months are free with VIP"). A challenge with no Labs has no tabs. The tabs answer the arrow keys.
- **The opening lines:** "You moved from uncertainty to direction. You clarified what is yours to do, claimed where you will stand, and set the standard you will hold."
- **The roadmap strip** (`components/challenge/RoadmapStrip.jsx`, new, inside `CoachingProgram.jsx`). Three phases over 180 days, on the dark blue of the Roadmap page's own card. It moves once, when it comes into view: the phases rise in turn and a point then travels the days. At phone width the phases stand down a rail. Reduced motion turns the movement off. The idea and the motion are the public site's (`aisc`: `components/sections/Demo.jsx`); the phase names and lines are the Roadmap page's. Styles in `challenge.css`.
- **New tabs for every link.** Seven links: the profile, Labs, the coaching call, the coaching page, the group rollout, the article, The Awakening. `components/global/Button.jsx` now passes `target` to a link inside the app, which it gave only to outside links before. Nothing else that uses the button changes.
- **The inquiry form** (`app/(open)/form/inquiry/InquiryPage.jsx`) has two more tags, written as its `CC` and `PB` are: `NSCC` (Custom Cohort, Organization) and `NSPB` (Private Briefing, Community), each with the message its email had. `CC` and `PB` are untouched.
- **The slips:** "Congratulations" without its exclamation point; "organisations", "recognised" and "organisation" where the leader reads them and in the two messages; "Is" in the article's title; "Certificate of Declaration" on Home's card.

**Checked:** signed out, through a temporary preview since removed, in a headless browser at desktop and phone width. Both tabs, the arrow keys, the strip waiting and then playing, no page error, no sideways scroll, and the six links on screen with the first tab open all opening in a new tab. The seventh, the Labs button on the second tab, is the same button with the same setting as the profile's. The two new tags preselect the right buttons and fill the right message, and `CC` and `PB` still do what they did. Lint is clean on the two new components. The run over the changed files reported three findings of one kind: two older ones in the inquiry form and in this page's confetti, and one in the new strip, which was fixed.

**For the founder to know:** inquiries from the two new buttons are stored with the source `UNKNOWN`, as inquiries from the public site's `CC` links already are, because the inquiry route keeps only four tags. The purpose and who it is for are stored as chosen, so nothing is lost but the label. Adding the tags to the route is one line, once it is known that the table's source column accepts them.

**Founder's second round on page 15 (2026-10-11)**

1. **"There's no need for NSCC when we already have CC in the form."** "Explore group rollout" now goes to `/form/inquiry?src=CC`, the tag the public site uses, and so carries that tag's message. The `NSCC` tag is gone from the form.
2. **"Change the NSPB to CPB."** Done: "Host The Awakening" goes to `/form/inquiry?src=CPB`, Private Briefing for a Community.
3. **"The hosted Awakening is 1hour."** The page and the `CPB` message both say 1 hour, where they said 30 minutes.
4. **The sentence about the roadmap being a map "is not necessary. Remove it."** Removed. The list stands in his order with nothing added under it.
5. **The Labs tab is worded from his "About Labs".** His text is kept word for word in `LABS_BLUEPRINT.md`. The tab opens with his account of what Labs is, then gives the four tiers in his order, each with what it is and who may open it: Platform (free forever for AI Stakeholders), AI Labs (a premium tier, by monthly subscription), AISC+ (a VIP tier, by monthly subscription), AI Stakeholder Labs (open only to leaders in AISC group coaching). The line about the leader's own free months is unchanged, and the sentence that said AISC+ is open for the same time is gone, because his text makes AISC+ a tier of its own and does not say what the free months open.

**His text differs from Labs as built** in the first tier's name, the order, AISC+ having its own subscription, and what AI Stakeholder Labs includes. Nothing in Labs was changed. The differences are listed in the blueprint for the Labs audit (page 17). Until then the tab says "Platform" and the Labs page it opens says "Platform Awareness".

**Checked** as before, in a headless browser at both widths: the tab reads as above, the two links carry `CC` and `CPB`, each preselects the right buttons, and the retired `NSCC` now opens the plain form. Lint is clean on the hub.

**The tiers of Labs stand alone (founder, 2026-10-11)**

> "Platform, AI Labs, AISC+ and AI Stakeholder Labs are now all different stand alone tiers. When we get to Labs and other places we will update the information."

Recorded in `SOURCE_OF_TRUTH.md` and `LABS_BLUEPRINT.md`. Nothing built is changed until Labs is worked on. **What this leaves to update then, and in "other places":** every line that says "In AI Labs" for work with AI in general. That label was decided on 2026-10-10, when AI Labs access opened AISC+ as well. It is on Day 1's page and worksheet, in the Day 2 guide and article, in the Roadmap's Section 2 and on the Roadmap page, in the Day 7 policy and on the Day 7 page, and on the Toolbox's tile. Whether each of those should name Labs, AI Labs or AISC+ depends on where the Loop, Margins, Agency and the rest are placed among the four tiers.

**Day 6, F and G again.** He asked to see them once more to finish. F's two sentences were given with "Labs" in place of "AI Labs", for the reason above. G was written out as three edits. Both are in `DAY_6_DOCUMENT_REVIEW.md`.

**The inquiry form's tags.** He asked which four the server keeps: `AISC`, `AICC`, `MS` and `PB` (`api/inquiry/route.js`). Any other, `CC` and `CPB` included, is stored as `UNKNOWN`.

**Day 6 closed (founder, 2026-10-11): "Close issues with Day 6!"**

All eight document questions are sorted by him in his Google Docs. Our references now carry F and G as they were last shown to him: the two sentences that name Labs, and the 90-day review made to look at Phase 2 and Phase 3. He did not say which of F and G he pasted, so our copies take it that he pasted both, and each says so in its header. Left for later, on his word: the Day 6 video.

**The inquiry form keeps two more tags (founder, 2026-10-11): "We need to add CC and CPB as well."**

He gave the table's definition. Its rule `inquiries_source_check` allows only AISC, AICC, MS, PB and UNKNOWN, so a new tag sent to it would have been refused and the inquiry lost. That is why the route had been left alone.

- **The route** (`intelligence/src/app/api/inquiry/route.js`) now keeps `CC` and `CPB` as well. If the table refuses a tag, because its rule has not been widened yet, the inquiry is saved under `UNKNOWN` and not dropped. So the order in which the SQL is run and the code goes live does not matter.
- **The SQL, for the founder to run.** It widens the rule to the six tags and UNKNOWN, in one transaction. It was handed to him in the conversation. Until it is run, `CC` and `CPB` inquiries go on being stored as `UNKNOWN`.
- **Not done:** older inquiries from the public site's `CC` links stay labelled `UNKNOWN`.

**The Labs tab is a summary (founder, 2026-10-11)**

> "The copy in AI Labs should be summarized. I didn't mean add the tiers and their meanings there. It's too much information. I only shared my notes so you have better context."

The four tiers and their meanings are out of the tab. It now reads: "Labs is where you practise what the challenge taught. You experiment inside real AI environments, on tasks, workflows and projects, using AI Fluency, AI Agents, frameworks and methodologies." Then the leader's own line, "AI Labs is by subscription, and your first 3 months are free with VIP", and the "Open Labs" button. His notes stay in `LABS_BLUEPRINT.md` as context. The component parses; it was not looked at in a browser again after this cut.

**The coaching card's opening paragraph is shorter (founder, 2026-10-11).** He had this cut from it: ": Clarity & Labs, Implementation & Relationships, then Governance & Mandate. It picks up from the Roadmap you already have." It now reads: "You have your 6-Month AI Stakeholder Roadmap. Coaching is how you work through it with a facilitator beside you, phase by phase." The roadmap strip under it shows the three phases. This also removes the second of the two lines noted in finding 3.

**One more line off the coaching card (founder, 2026-10-11).** Removed: "Every plan includes everything. Only the length of your commitment and what you pay change." It is still true, and still the rule in `SOURCE_OF_TRUTH.md` and on the public coaching page. It is only no longer said on this card.

**The coaching card no longer links to the public coaching page (founder, 2026-10-11).** He asked for a critique of "See the full details" and for the link to go if the critique agreed. It did. The public page is written for someone who has not taken the challenge: its largest section sells the private seven-day challenge that opens coaching, its headline figures count that challenge as included, and the one answer for a leader who has already done it sits last in its FAQ. A leader on Next Steps finished the challenge the day before, so the page mostly sells them what they have, and raises a question it cannot settle: what the same price buys without the private challenge. That is the discovery call's to answer. The card keeps its one action, the call. Against removing it: at these prices some leaders want to read before they book. The page is public and the call is fifteen minutes, so little is lost. The card now has six links on the page in all, each in a new tab.

**Final critique of page 15, at the founder's asking (2026-10-11). Nothing changed by it.**

The page was read again as it stands and looked at whole, at desktop and phone width. It holds together: one hub, one card for each of three offers, every link in a new tab, and one moving thing.

*What would still be changed, most important first:*

1. **Labs is behind the second tab, and nothing draws the eye to it.** It is what opens today and the leader's next phase, and it is the one thing on the page that costs nothing. The first button a leader sees is "Go to my profile". A small mark on the Labs tab until it is opened would do it, within the one-hub decision.
2. **The certificate is still not named.** Home's card promises it and the page's first button says only "Go to my profile". Raised twice before and not answered.
3. **The "Labs are open" notice in the frame opens Labs in the same tab.** It first shows at the very moment this page opens, so it is the one link a leader can follow from here that takes them off the page.
4. **The Awakening card puts its offer in the small print.** "50 or more" and "at no cost" are under the buttons, and the paragraph above says only that a session may be hosted.
5. **The third thing earned is written unlike the other two.** "6-month AI stakeholder roadmap" has no "A" and no capitals; the coaching card below it writes "6-Month AI Stakeholder Roadmap".
6. **A leader who does not take coaching has no way to the Roadmap from here** but the menu. The coaching card says they have it and does not link to it. His decision of the same day was no Roadmap card.
7. **Nothing says a link opens a new tab.**
8. **"Start with Coaching" books a fifteen-minute call.** It is the public site's label, so it was left.

*Known and waiting:* the coaching card says "AI Labs for as long as you are in coaching", and the Labs tab says "AI Labs is by subscription". Both are for when Labs and its four tiers are worked on. The dead code stays, as he said.

*Checked on the way:* the roadmap strip plays when it is already in view as the page loads, and waits when it is below the fold. One capture showed it empty; that was the capture resizing the page, which restarts the entrance. On a real screen the same thing happens when the window is resized across the strip's narrow and wide forms: the phases rise in again, and are never left hidden.

**The founder's answers to the final critique of page 15 (2026-10-11), and what was done**

1. **A mark on the Labs tab: "Good idea."** A small pink dot sits beside "Labs" until that tab is opened. He added that the Labs icon is also beside the profile button and in the profile, "so the user can't miss it".
2. **Say where the certificate is: "That's a good idea ... This is also why the profile is the most important next step, not AI Labs. The profile contains everything."** A line above the profile button: "Your profile holds everything from here: your Certificate of Declaration, your tools and resources, and the feedback you received."
3. **The notice in the frame: left as it is.** He answered that "the open Labs button already opens a new window", which is the button in the hub. The point raised was the small "Labs are open" notice in the corner of the frame, and the Labs icon beside the profile: both go to Labs in the same tab, and neither was changed. Said to him again, plainly, once.
4. **The Awakening card: agreed.** Its paragraph now says who may host, for how long and at what cost: "If you can convene 50 or more professionals, you may host a private 1-hour Awakening session to introduce your organisation or network to this leadership transition, at no cost." The small print under the buttons is gone.
5. **"Put the A":** "A 6-month AI stakeholder roadmap". The capitals stay as he has them.
6. **No way to the Roadmap from here: "Profile is where they need to go."** Nothing added.
7. **Links say they open a new tab: agreed.** Each of the page's link buttons carries a small arrow, and the words "(opens in a new tab)" for a screen reader.
8. **The coaching button: agreed.** "Book the 15-minute call", where it said "Start with Coaching". The public coaching page keeps its own label.

**Also, at his word:** the Labs tab no longer says anything to a leader whose free months are over. "Better to remove this part ... The labs page will clarify all details." That leader sees what Labs is and the button, and nothing between.

**Checked** in a headless browser, at desktop and phone width: the dot is there and goes when the tab is opened; the certificate line; the Labs tab with free months running, and without; every link with its arrow and its words; the Awakening card with one line about the 50, in the paragraph. The first preview of the "without" case was a stale build of the preview page and showed the old line; under a fresh address it showed the hub as it now is. Lint reports one finding in these files, the older one in this page's confetti.

## 16. Profile

**Audited 2026-10-11.** The page (`intelligence/src/app/(protected)/challenge/profile/page.jsx`) and what it is made of: the Toolbox (`utils/challenge/ToolBox.jsx`), the profile card (`components/challenge/ProfileCard.jsx`), the certificate card (`DeclarationCertificate.jsx`, with `api/challenge/profile/certificate`), and the review card (`ProfileProjectInfo.jsx`, which shows `ProjectReview.jsx` or `PeerReflection.jsx`).

The founder, the same day: "the profile is the most important next step ... The profile contains everything."

**What already conforms**

- It opens with Next Steps and Labs, 24 hours after Day 7 opens.
- **The name on the certificate is the name typed in the profile form.** The form's save writes it to both places the certificate could read it from, so the line on the form, "Your name appears on your certificate exactly as you enter it here", is true.
- **The certificate carries the Day 3 declaration.** The Territory Builder's "Save Declaration" and this card write the same record, so what a leader saved on Day 3 is waiting here. Once the certificate is made the declaration is locked, and a dialog says so first.
- The Toolbox holds every tool, the new Readiness Scorecard among them, the Day 7 documents with their links, and the Labs Resources.
- No em dash in a sentence, no exclamation point, "programme" spelt the British way.

**Findings**

1. **A leader who bought the Milestone Review upgrade is shown the wrong card.** The page asks only whether the package is VIP or VVIP. A General Admission leader with the review upgrade gets Peer Reflection, or the line "You did not opt in for peer reflection", where their drafts and the facilitator's feedback should be. Day 3 had the same miss, fixed on 2026-10-10.
2. **The review cards here still take new work after the challenge has closed.** The Milestone Review card shows its form and "Submit new draft", and the server has no closing date, so a leader with drafts left can submit weeks later. Peer Reflection has no closing check either. The page's opening lines call this "the feedback you received".
3. **With no declaration saved on Day 3, the certificate card asks for it under another name, and with other limits.** Its label is "6-Month Leadership Declaration" and its prompt begins "Over the next 6 months, my responsibility as a leader in an AI-enabled environment is to...". Day 3's Territory Builder calls the field "Your Territory Declaration" and prompts "Over the next 6 months, my responsibility as an AI leader…". *(Corrected 2026-10-11, at the founder's word: "make sure it is corrected". This finding first said Day 3's statement was "I am a [position] who helps [who] solve [friction] by [how], so that [outcome]." That sentence is the Roadmap's. Day 3 does not use it.)* **The limits differ:** Day 3 takes 20 to 365 characters; this card takes 250 to 365, and its server allows 400. A Day 3 declaration of 150 characters makes a certificate as it is, but cannot be edited here without being stretched to 250.
4. **Two names for the certificate in one card:** "Certificate of Declaration" in its heading, "your official AI Stakeholder Certificate" in the note under it.
5. **The name cannot be corrected, and the last dialog does not show it.** The profile is filled once and the page has no way to edit it. The dialog before the certificate is made warns about the declaration alone.
6. **The certificate is dated Day 7,** the challenge's final date, whenever it is made. It can now be made a day later at the earliest.
7. **Resources has no group for Day 6.** Days 1, 2, 3 and 7 and the Labs Resources are listed. The Roadmap, the Capability Gap Audit, the Stakeholder Identifier and The Power of Super Connections are reached only through the Roadmap tile.
8. **"You did not opt in for peer reflection" is shown to a leader who did opt in** but submitted no project.
9. **Leftovers:** an empty quarter-width column beside the review card, kept for a note that reads "Add all the resources shared", and a block of the page that is commented out.

**Waiting, and already known:** the Day 2 group in Resources shows four documents as not yet available, until the founder gives their links. The Toolbox's tile says "AI Labs" and opens Labs as a whole; that is for the Labs work.

**Left as they are, unless the founder says otherwise:** "Executive Profile" on the profile card, the question under the leader's biggest challenge, which has nowhere to be answered, and the Roadmap and Labs tiles opening in the same tab.

**Awaiting the founder:** the review card for upgrade buyers (1), whether the review cards close (2), the certificate card's wording and limits (3, 4), the name in the dialog and how a name is corrected (5), the certificate's date (6), a Day 6 group (7), the opt-in line (8), and the leftovers (9).

**Founder's decisions on page 16 (2026-10-11), and what was done**

1. **"A review upgrade buyer should see the milestone review card."** Done: the page now asks whether the leader has the review (VIP, VVIP or the upgrade), as Day 3 does.
2. **"The review card should stop accepting work immediately the challenge ends. Peer Reflection should do the same."** Done, in the page and on the server.
   - *The rule,* written once in `lib/challenge/reviewClosed.js`: review work stops at `reviewClose`, the end of the final date, or of the Monday after when that date is a Sunday. Review work is a Milestone Review draft, and in Peer Reflection opting in, sharing a project, being given one to reflect on, and writing a reflection.
   - *The routes* refuse it from that moment: `project/submit`, `reflection/opt-in`, `reflection/submit-project`, `reflection/submit` and `reflection/assign`, through `lib/challenge/reviewWindowServer.js`. Until now none of them looked at the date. A cohort that cannot be read counts as open, so a failed lookup never shuts a leader out mid-challenge.
   - *The Milestone Review card,* once closed, shows the drafts and their feedback and the line "The review window closed with the challenge. Your drafts and the feedback on them stay here." Its link field and its button are gone.
   - *The Peer Reflection card,* once closed, asks for no project and shows no form. A leader who finished their three reflections sees what they saw before. One who did not was first told "You completed 1 of 3 reflections, so the reflections on your project were not unlocked." That line is gone: see the second round, below.
   - For a cohort whose last day is a Sunday, the Profile opens about four hours before the close, and the cards take work for those hours.
3. **The certificate card takes Day 3's label, prompt and limits: agreed.** **A correction to the finding,** since made in the finding itself: Day 3's tool does not use the sentence "I am a [position] who helps...". That form is the Roadmap's. The Territory Builder labels the field "Your Territory Declaration" and prompts "Over the next 6 months, my responsibility as an AI leader…", which is close to what this card already said. So the label and the prompt are now the Territory Builder's own, and the real change is the limit: 20 to 365 characters, as on Day 3, where this card demanded 250. The server's limits match, where it allowed 400.
4. **One name: agreed.** "This declaration will appear on your Certificate of Declaration."
5. **"Let the dialog also warn about the name. It's by design that the profile can't be re-edited."** The dialog is headed "Are your name and your declaration accurate?" and says: "Your certificate will be issued to Ada Obi, exactly as written here. Your name cannot be edited. Once your certificate is generated, your declaration will be locked and cannot be changed. Make sure both are right."
6. **The certificate stays dated Day 7: agreed.** Nothing changed.
7. **A Day 6 group in Resources: agreed.** The four Roadmap documents are listed between Day 3 and Day 7. Their links are now written once, in `lib/challenge/day6Resources.js`, and the Roadmap page reads them from there too.
8. **The line for no peer reflections: agreed.** "No peer reflections on record", and under it: "Peer reflection was optional during the challenge. There are no peer reflections on record for your project."
9. **The leftovers: he asked what they hold.** Shown to him. Removed in the second round, below.

**Checked:** every changed file parses. Lint reports nothing in the new files or the routes. In the three older components it reports what it reported before: state set in an effect, quotation marks, and an image tag. The closing rule was run for two made-up cohorts: open a second before the close, closed a second after. **Not checked in a browser in this round:** the dev server on port 3001 stopped answering just after the temporary preview was first loaded, and was not restarted here, because it is the founder's. It was back for the second round, and the page was seen then.

**Changed** (`intelligence`, uncommitted): `profile/page.jsx`, `components/challenge/ProfileProjectInfo.jsx`, `ProjectReview.jsx`, `PeerReflection.jsx`, `DeclarationCertificate.jsx`, `utils/challenge/ToolBox.jsx`, `roadmap/page.jsx` (its four links, read from one place), `api/challenge/profile/certificate/route.js`, the five review routes, and three new files in `lib/challenge`: `reviewClosed.js`, `reviewWindowServer.js`, `day6Resources.js`.

**Second round (founder, 2026-10-11), and what was done**

1. **"For peer reflections, let's be kind and show them their reflections after the challenge even if they weren't able to do up to three. It's possible that there were not enough participants to reflect on."**
   - *The rule now:* during the challenge a leader still reflects on three before reading their own. From the moment the challenge closes, a leader who shared a project may read what was written on it, whatever their own count. It is added to the rule in `lib/challenge/reviewClosed.js`.
   - *The route* `api/challenge/reflection/received` decided the lock, so no database change was needed. A leader who has not finished three is now answered when the cohort has closed and they shared a project. That reading is made with the service client, for the leader's own project alone, taken from their own row, in case the tables' own rules allow it only to a leader who finished. A cohort that cannot be read stays locked.
   - *The card,* once closed: a leader with reflections on their project sees the same view a finished leader sees, "Your Peer Reflections Are Ready", the link to their project and the reflections. A leader who shared a project on which nothing was written sees "Peer reflection closed with the challenge." and "No reflections were written on your project before the challenge closed." A leader who shared no project sees the first line alone. The count of reflections a leader wrote is no longer mentioned.
   - *On the Peer Reflection page,* the block under the card that sets out "Reflect Before You Receive" and "Complete 3 reflections" is no longer shown once the challenge has closed, since it is no longer the rule. It is shown as before while the challenge runs.
   - *One thing left as it was:* a leader who finished three, and on whose project nothing was written, still sees the heading "Your Peer Reflections Are Ready". Behind "Reveal reflections" the line is now "No reflections were written on your project before the challenge closed.", where it said they were on the way.
2. **"Remove the dead code and the switched off block."** Both are out of `profile/page.jsx`: the switched-off "Why This Matters" card, and the empty quarter-width column with its note. The review card now has the width of the two cards above it, where it had three quarters. The dead code on Next Steps (`AdvisoryOptions`) is a different matter and stays, at his earlier word.
3. **"The correction in the certificate using Day 3, make sure it is corrected."** Checked against the Territory Builder, line for line: the label "Your Territory Declaration", the prompt "Over the next 6 months, my responsibility as an AI leader…", and 20 to 365 characters, in the card and in its route. The wrong sentence in finding 3 above is corrected in place.

**Checked** in a headless browser, through a temporary signed-out page that fed the card made-up answers, since moved out of the repo: seven cases. Closed with one of three written and two received (the reflections show, at desktop and phone width, with no sideways scroll); closed with nothing written on the project; closed with no project shared; closed and finished with nothing written; open with one of three written (the card still asks for the next project and does not ask for the reflections); and the Peer Reflection page closed and open. No page errors. The review card measures the same width as the pair above it. Lint reports only what it reported before in these files. The route answers a signed-out request with 401. **Not checked:** the route signed in, against the real tables. It was not possible to sign in here.

**Changed in the second round** (`intelligence`, uncommitted): `api/challenge/reflection/received/route.js`, `components/challenge/PeerReflection.jsx`, `lib/challenge/reviewClosed.js` (its note), `profile/page.jsx`.
