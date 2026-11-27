# AI Stakeholder Office Sprint: Plan

Drafted 2026-11-21 from the founder's brief and his answers the same day. Nothing is built yet.

## 1. How the AI Stakeholder offers are grouped

| Group | What is in it | Notes |
|---|---|---|
| **AI Stakeholder Challenge** | The monthly cohorts (General Admission, VIP) and the private 1:1 (VVIP) | Later: more challenges (the Guardian Challenge is already planned). The Teens Challenge is **not recorded yet**, at his word. |
| **AI Stakeholder Coaching** | Group coaching, opened by the private 1:1 | The private 1:1 is **one product with two uses**: sold on its own under Challenge, and the first step of Coaching (as today). |
| **AI Stakeholder Office Sprint** | The new 3-day program for organisations | This plan. |

The Awakening, Labs, On Demand, AICC and the AI Career Apprentice stay **outside** these three groups, as they are.

**Name:** AI Stakeholder Office Sprint. "Sprint" is also used in the AI Career Apprentice (Sprint 1, Sprint 2), so copy always says "Office Sprint", never "the Sprint" alone where the two could meet.

## 2. What the Office Sprint is

A free 3-day sprint for businesses, organisations and enterprises. It gives their staff the essential training they need **before** they learn AI tools or run AI pilots. It shows the organisation how ready it is and where the gaps are, and tests how its people respond, while they learn AI leadership principles from the AI Stakeholder Challenge.

- **Who takes part:** all staff, at any level. The material is worded so a junior staff member and a manager both follow it.
- **Who qualifies:** an organisation with **at least 5 staff registered**, up to **50**. A larger organisation goes to the paid option.
- **One free sprint per organisation, ever.** Later sprints are paid.
- **Online, on Zoom.** Each session lasts 45 minutes (never more than an hour), with an exercise afterwards.

### The three days

| Day | Topic | Tool | Exercise |
|---|---|---|---|
| Monday | AI Clarity and Task Delegation | Delegation Tool | Each person sorts their own tasks |
| Tuesday | AI Readiness and Data Audit | Readiness Scorecard | The Data Audit: **what** information exists and where it is kept, never the information itself |
| Wednesday | AI Value Creation and Governance | **A focused Territory Builder**, then **the AI policy** | Name and score frictions, then claim one. **No declaration**, so no AI call and no Certificate of Declaration. Not the Margin Calculator ("We don't want to overwhelm during the sprint"). For governance, every person creates and submits their own AI policy (founder, 2026-11-21); the report draws them together as the starting point for the organization's own policy. |

Each day's exercise is due **before the next day's session**. Day 3's is due before the Thursday closing meeting.

### The week

| When (WAT) | What |
|---|---|
| Mon to Wed, 6:15am to 7:00am | Morning slot: one organisation |
| Mon to Wed, 5:15pm to 6:00pm | Evening slot 1: one organisation |
| Mon to Wed, 6:15pm to 7:00pm | Evening slot 2: one organisation |
| **Thursday** at 9am, 10am, 11am or 2pm | **Closing meeting**, 30 minutes, with **the organisation's leadership only**. The contact picks the time in their organisation view, first come, first served. This is where the report is gone through and the next step is decided. |
| 48 hours after Day 3 ends | **The sprint closes.** Until then everything stays open: the tools, the results, the replays. |

- **One organisation per slot**, so at most three organisations a week.
- **It runs every week**, the cohort week included. In the cohort week the Thursday closings (9am to 2pm) finish well before AISC Day 1 at 7PM.
- **All the engagements end on Wednesday.** Thursday morning is for the closing meetings only.

### What staff and organisations get

- **Staff:** their own results, and the session replays while the sprint is open. Every piece of their work is also saved in Intelligence, so the studio can run analysis and reports without waiting for anyone to send things in.
- **The organisation:** a report of **group totals only**. It never shows one person's answers. The report is a PDF, gone through in the closing meeting.
- **The next step:** decided per organisation in the closing meeting, from what the report shows.
- **Outside the free times:** any other arrangement (another time, more people, more days) goes to **Contact Sales** and is priced case by case.

## 3. How people get in

1. **The organisation applies** on a form in Intelligence, reached from a new page on the AISC site. The form asks for: organisation name, sector, number of staff, contact name, role, email and phone, the preferred slot, and the preferred week.
2. **The admin approves** in a new admin page. Approving sets the week and slot, creates the organisation's **registration code**, and emails the contact an invitation with the code and the details (week, slot, Zoom link, what to tell staff).
3. **Each staff member registers with the code.** They sign in the usual way (email code), give their name and role, and are added as a user with the status **leader** and **sprint-only access**.
4. **The contact person gets the organisation view** (his "VIP"): they take the sprint like everyone else, and also see how many staff have registered, who has finished each day's exercise (names and ticks, not answers), the group totals, and the Thursday booking. **This is not an AISC VIP seat**, and it is not the `vip` status used for briefings.
5. **Sprint-only access** opens the sprint pages and nothing else: no Learning Center days, no Toolbox, no Labs.

**The slot is confirmed once 5 staff have registered.** Proposed cut-off: Friday 6pm WAT before the sprint week (open item 1).

## 4. What already exists, and what has to change

| Already there | Use in the sprint | Change needed |
|---|---|---|
| Sponsor groups and sponsee codes (`sponsor_groups`, `api/sponsee/apply`) | The model for "a group, a code, seats, people join with the code" | New sprint tables follow the same pattern. The sponsor tables themselves are not touched. |
| Email sign-in, `users`, status hierarchy | Staff accounts | **The 10-year rule (`lib/auth/accessRules.js`) would block most staff.** Sprint registration must give `leader` directly and never pass through `evaluateAccess`. The challenge's rule is unchanged. |
| Delegation Tool, Readiness Scorecard, Territory Builder (`src/utils/challenge/`) | The three days' tools | **They save only in the browser today.** The sprint needs their work saved in Intelligence. Plan: give each tool optional settings (where to save, sprint mode) whose default is today's behaviour, so the challenge never changes. The Territory Builder's sprint mode hides the declaration. |
| Public form protection (`lib/forms/guards.js`) | The application form | Used as is. |
| Admin guard (`requireAdminApi`) | The new admin routes | Every new admin route starts with it. |
| Emails (Resend, `emailTheme.js`) | The invitation and welcome emails | Two new senders. |
| The readiness PDF (`lib/readiness/buildReadinessPdf.js`) | A pattern for the organisation report | Phase 2. |

**The Day 2 Scorecard's wording is held to the challenge** by `scripts/check-readiness-wording.mjs`. The sprint uses the same statements. If they need rewording for staff at any level, that is a sprint copy, kept apart, as the public check does.

## 5. Data (the founder runs the SQL)

Three new tables. RLS on, no policies, service role only, like `labs_access`. The full SQL goes in the build step.

- **`sprint_orgs`**: one row per organisation application. Name, sector, staff count, contact details, preferred and given slot (`morning`, `evening_1`, `evening_2`), week start (a Monday), status (`applied`, `approved`, `confirmed`, `closed`, `declined`), registration code, seat limit (50), closing slot (Thursday 9, 10, 11 or 14), a replay link for each day, timestamps.
- **`sprint_members`**: one row per person per organisation. `org_id`, `user_id`, role (`contact` or `staff`), name, job title, registered at.
- **`sprint_work`**: one row per person per day's tool. `member_id`, day (1 to 3), tool (`delegation`, `readiness`, `data_audit`, `territory`), the answers (`jsonb`), saved and finished times.

**Zoom:** three standing links, one per slot, kept as environment variables (names: `SPRINT_ZOOM_MORNING`, `SPRINT_ZOOM_EVENING_1`, `SPRINT_ZOOM_EVENING_2`). Nothing is connected to Zoom.

**One free sprint per organisation:** the admin page warns when a new application matches an earlier one by name or email domain. The admin decides.

## 6. Build: the MVP for Monday, then what follows

The founder's aim: an MVP in one full day, then improve it with feedback from the first businesses. **No organisation is lined up yet**, so on Monday the page and the application go live and outreach begins. The first sprint runs in the first week an organisation is approved and has 5 staff registered.

### Must be ready on Monday (the MVP)

1. **SQL** for the three tables, run by the founder.
2. **Application form** at `intelligence.michaelsteve.com/form/office-sprint`, with the form guards and a confirmation email.
3. **Admin page** `/admin/sprint`: list applications, approve (set week and slot; the code is created; the invitation is emailed), decline, see members and their progress, add replay links, and **export all work as CSV** for the founder's analysis.
4. **The AISC page** `aistakeholderchallenge.com/office-sprint`: what it is, the three days, the times, who qualifies, what the organisation gets, the Apply button, and Contact Sales for anything else (`/form/inquiry` with a new `src=SPRINT`). Plus a policy page at `/policy/office-sprint`, saying that the organisation sees group totals only and the studio sees each person's work.

### Must be ready before the first sprint's Monday

5. **Join with the code** at `/sprint/join`: sign in, name and role, member row, seat check (50), sprint-only status.
6. **The sprint home** `/sprint`: the week, their slot's Zoom link, Day 1 to 3 pages opening on their day, each day's exercise and due time, and replays when added. It closes 48 hours after Day 3 ends.
7. **The three tools in sprint mode**, saving to `sprint_work`.
8. **Sprint-only access** in `proxy.js` and the status homes, so a sprint user lands on `/sprint` and nowhere else.
9. **The organisation view** for the contact: registrations, who has finished each day, and the Thursday booking.

### Can follow during the first sprints (phase 2)

10. Group totals in the organisation view, and the **organisation report PDF** built automatically. Until then the founder builds it from the CSV.
11. Reminder emails: the day before, an hour before, and an exercise due.
12. A certificate of completion, if feedback asks for it.
13. Adding the Office Sprint to the michael-steve front door and to Partner Desk outreach, if he wants it there later.

### The material

The 45-minute decks and the exercise sheets are cut down from AISC Days 1 to 3, worded for staff at any level (rule 25, rule 27). Drafted by the studio's agent, reviewed by the founder as designed documents (rule 14). Day 3 is drafted from the Territory Builder's frictions and positions, without the declaration.

## 7. Open items

1. **The 5-staff cut-off:** by when must 5 staff be registered? Proposed: Friday 6pm WAT before the sprint week.
2. **The application deadline:** how many days before a Monday can an organisation still apply? Proposed: the Wednesday before.
3. **The Monday evening clash in the cohort week:** what time does the free Awakening run? If it is 7PM WAT, the 6:15pm slot ends right as it begins.
4. **Replays:** who records each session, and where the recording is hosted (Zoom cloud, or Cloudflare like Labs)?
5. **Staff wording:** do the Scorecard's 24 statements read well for a junior staff member, or do they need a sprint copy?
6. **Where the next step points:** decided per organisation. Do we want a short list of the usual next steps for the closing meeting (AISC cohort seats for its leaders, VVIP, a custom cohort, coaching for the head, a paid Office Sprint for more staff)?

## 8. Records to update once built

- `SOURCE_OF_TRUTH.md`: the three groups, the Office Sprint section (format, times, rules, free and paid), and the AISC Challenge line about future challenges.
- `ARCHITECTURE.md`: the new tables, routes, environment variable names and the sprint-only access.
- `LINK_MAP.md`: the AISC page, the application form, `/sprint`, `/admin/sprint`, the policy page.
- `aisc/agent-guides/AISC_BRIEF.md` and `COPY_GUIDE.md`: the Office Sprint, and the "Office Sprint", never "the Sprint" rule.
- `.env.example` in `intelligence`: the three Zoom names.

## 9. Progress, step by step (founder, 2026-11-21: "break this project into steps and tackle each step as they come")

The working order, kept flexible: 1 landing page and policy, 2 interest form and admin list, 3 the call and scheduling, 4 the material, 5 the learning center, 6 the leader and VIP homepages, 7 checks before the first sprint. Where this section and the sections above differ, this section is current.

1. **Landing page: built 2026-11-21, uncommitted** (`aisc`): `/office-sprint`, linked from the footer, `/links`, the custom cohort card in Pricing and the sitemap. Leads with the problems and what the sprint does about them; the hero names the full picture; "Your whole workforce, at any size", with 5 to 50 only as the free condition, never as a lead; each day's work takes about 30 minutes with a mini app and a PDF; Wednesday adds the AI policy, written from a template (not a tool); the sprint is the AI Stakeholder Challenge's resources and work compressed into three days.
2. **Interest form and admin list: built 2026-11-22, uncommitted** (`intelligence`, plus `/policy/office-sprint` in `aisc`):
   - `/form/office-sprint`: organization, industry (businesses only, so no sector list), staff taking part, contact, preferred slot and **one of the next four Mondays**. What they pick is their intent only: the week is confirmed once staff registration is complete. The discovery call is for getting to know each other and gathering important company information, not for agreeing the week (founder, 2026-11-22).
   - `POST /api/office-sprint/request` with the shared public-form guards; table `sprint_orgs` (SQL in `intelligence/src/lib/officeSprint/schema.js`, copied from the admin page's banner; also widens `inquiries_source_check` with `OS`).
   - **The discovery call is a 20-minute video call the contact books on Cal.com** (founder, 2026-11-22: "It's nice to start getting familiar fast. They would also be curious to who is on the other side"): `https://cal.com/michaelsteve/ai-office-sprint-discovery-call` (`DISCOVERY_CALL_URL` in `intelligence/src/lib/officeSprint/requests.js`, name and email prefilled). The booking button is on the success screen and in the contact's confirmation email, which asks them to bring whoever will sit in the Thursday meeting. The studio's email says the link was sent and to message the contact on WhatsApp if no booking comes in a day or two. On the AISC page, step 2 of "How it starts" is "Book your discovery call".
   - Emails: the details to sales@; a confirmation to the contact with the booking button, describing the call (their organization and current needs, what they want from the sprint, what they have tried).
   - `/admin/sprint` ("Office Sprint" in the admin menu): requests, call notes, statuses shown as New / Call done / Declined, and a flag when a request looks like an earlier one.
3. **The call and scheduling: built 2026-11-22, uncommitted** (`intelligence`; SQL `SPRINT_SCHEDULE_SQL` in `src/lib/officeSprint/schema.js`, shown on `/admin/sprint` until run). Founder's decisions, 2026-11-22:
   - **"Set up VIP account" is its own button and one function**, pressed on the discovery call once it goes well (`lib/officeSprint/contactAccount.js`, `api/admin/office-sprint/account`). It works like Priority Access: an account, a `users` row with status `vip` (a VIP, VVIP, chief or above keeps their status; **a sponsor stays a sponsor, so the attempt fails and the admin sees the clash in the drawer**, founder 2026-11-22: "This would rarely happen though"), a sign-in code and a welcome email.
   - **The contact signs in during the call and fills the questionnaire on their VIP homepage** (the Office Sprint card, `components/officeSprint/OfficeSprintCard.jsx`). The nine approved questions are in `lib/officeSprint/schedule.js` (`QUESTIONNAIRE`).
   - **"Schedule"** (`api/admin/office-sprint/schedule`) sets the week, the slot (a slot another organization holds that week is refused), the number of staff and a registration code, then emails the contact the link and code.
   - **Staff register** at `/form/office-sprint/join?code=…` with full name, email, role or job title, and department or team, **up to the stated number** (table `sprint_members`). Each gets a "you're registered" email.
   - **The week is confirmed automatically once the stated number have registered**; the contact and sales@ are emailed.
   - **If not complete by Friday 6 PM WAT before the week, the organization does not have the spot yet** and another may claim it; the founder follows up. Worked out when read (`sprintStage()`, "Spot released"), so no timed job.
   - **The private briefing comes off the homepages, leader to chief** (founder, 2026-11-22). That is done in step 6, with the homepage redesign. The sprint card opens on the VIP and higher homes, `/vip`, `/vvip` and `/chief` (founder, 2026-11-22: "The card should be able to open on vip and higher roles").
   - **Tested end to end on 2026-11-22** with a test request: request, VIP account (status `vip`), Schedule, two staff registrations, automatic confirmation at the stated number, registration closed.
4. **Next: the material** (decks, exercises, the closing meeting and report template), then the learning center (step 5).
5. **For the learning center (step 5), founder 2026-11-22:** "for every staff signup, they get registered as leader and can see the card that will take them to the Office Sprint Learning center in their dashboard." So each staff registration becomes an account with the status **leader**, without the 10-year rule, and the leader homepage shows a card that opens the Office Sprint Learning Center. Not built yet: today a registration is a `sprint_members` row only.

### The learning center: decisions (founder, 2026-11-22)

- **Name, for now: "AI Office Sprint"** (he is still settling the name). Kept in one place in the code so it can change.
- **A staff member's leader account is created at registration**, with a sign-in email straight away, so they can see the card and a countdown to Monday.
- **Each day's page opens at the start of its session**, so nobody works ahead of the teaching. Each exercise is due before the next session; everything closes 48 hours after Wednesday's session, and each person's own results stay.
- **Staff who already hold a higher status keep it** and see the sprint card on their own homepage.
- Lives at `/sprint` (sign-in only), built like a small sibling of the challenge Learning Center: one server-side context decides what is open, and every page follows it.
- Build order: (1) staff accounts, the homepage card, the `/sprint` frame and Home with the Zoom button; (2) the three day pages with the mini apps saving to `sprint_work`; (3) the contact's view and the Thursday booking; (4) the admin view: progress, replays, CSV; (5) the organization report.

### Learning center chunk 1: built 2026-11-22, uncommitted (`intelligence`)

- SQL `SPRINT_LEARNING_SQL` (`src/lib/officeSprint/schema.js`; banner on `/admin/sprint`): `sprint_members.user_id` and the table `sprint_work` (one row per person per tool).
- Each staff registration now gets an account (`lib/officeSprint/staffAccount.js`): new people become `leader` without the 10-year rule; anyone with an approved status keeps it; blocked or waiting-for-review accounts become `leader`. Their "you're registered" email has a Sign In button to `/login`.
- `SprintStaffCard` on all five homepages (leader, sponsor, VIP, VVIP, chief) opens `/sprint`, read through `/api/office-sprint/me`.
- `/sprint` (sign-in only, in `proxy.js`): the frame (`SprintShell`), Home (the week, the next session, the join button live from 15 minutes before) and the three day pages, each refused until its session starts. The clock is `lib/officeSprint/timeline.js`; the session links are the env vars `SPRINT_ZOOM_MORNING`, `SPRINT_ZOOM_EVENING_1`, `SPRINT_ZOOM_EVENING_2`, given only to members of a confirmed sprint.
- **Tested 2026-11-22:** staff registrations created linked leader accounts; the founder signed in as a registered staff member and confirmed the card and `/sprint` look right. A contact who also registers keeps VIP and sees both cards.
- **A confirmed sprint can be edited** (founder, 2026-11-22): it stays confirmed while the staff number is no more than those registered; a higher number reopens registration. The contact is emailed if the week or slot moves. Edits stop at the registration deadline.
- Next, chunk 2: each day's work with its mini app saving to `sprint_work`, and the PDF.

### Learning center chunk 2: built 2026-11-22, uncommitted (`intelligence`)

Founder's decisions, 2026-11-22: **My AI Policy is four standards plus the commitment** (Task Delegation; Data; Disclosure and Quality; My Ethical Lines; My Commitment), written from the Personal AI Policy template, which is a template, not a tool. **The Data Audit takes one to three sets of data.** **The Delegation Tool ends with a PDF and does not reset.** **The Territory Builder stops at Claim.**

- The three mini apps take an optional `sprint` setting (`initial`, `onChange`, `onPdf`). Without it they behave exactly as in the challenge; the Readiness Scorecard's wording check still passes. Their eight lint errors were there before and are unchanged.
- New: `SprintDataAudit` and `SprintAiPolicy` (`components/officeSprint/`), the rules in `lib/officeSprint/work.js`, the PDFs in `lib/officeSprint/sprintPdfs.js` (the Scorecard keeps its own).
- Work saves as people go (`useSprintSave`, `POST /api/office-sprint/work`): one `sprint_work` row per person per tool, refused before its day opens and after the sprint closes. Finishing marks it Done; editing afterwards clears Done until finished again.
- Checked on a temporary preview page (removed): the tools in sprint mode, the "not saved" message, the four PDFs built and read.
- Next, chunk 3: the contact's view (who finished each day, the Thursday booking), then chunk 4: the admin view (progress, replays, CSV).

### Paused 2026-11-22: what an organization sees before its sprint starts

Founder, 2026-11-22: "Monday 23rd won't work because I've not even started promoting the offer. I'll start this monday." So the focus is everything an organization sees before its sprint starts, made solid in design, flow and copy, and the process proven end to end with real emails. Chunks 3 and 4 (the contact's view during the sprint, the admin view) wait.

The list, in the order an organization meets it, is kept in the founder's review (see the session of 2026-11-22). Gaps found while listing it: no email when a spot is released; no reminder before Monday; the leader and VIP homepages still carry the private briefing (step 6); two names in use ("AI Stakeholder Office Sprint" for the offer, "AI Office Sprint" for the learning center); the sign-in code email is Supabase's own template.

### Review #1, the landing page (2026-11-22)

- **The free offer is now up to 20 of an organization's staff, with at least 5 taking part** (founder, 2026-11-22, after a critique: 50 free was too much of his time and gave away the paid sprint; under 5, group totals would reveal individuals). Any size of organization is welcome; staff beyond 20 are priced. This replaces "5 to 50" everywhere above. Built on the page (a line under the hero buttons, Who it is for, the FAQ, the Contact Sales band) and in Intelligence (`FREE_MAX_STAFF = 20`, the success screen, the emails, the admin labels).
- A Request Your Sprint button in the sticky header ("Request" on phones).
- Seven fixes: "work" not "exercise"; "your report" not "readiness report"; the Friday-before deadline in How it starts; clearer free wording; "which teams took part most"; darker day-card text; a tighter gap above the FAQ.
- **One name everywhere: "AI Stakeholder Office Sprint"** (founder, 2026-11-22). It replaces "AI Office Sprint" in the learning center (`SPRINT_NAME`), the homepage card, the PDFs (`AI-Stakeholder-Office-Sprint_*.pdf`), the emails, the forms, the policy page, the footer, `/links`, Pricing and the admin.
- **The facts strip says "3 sprints, Monday to Wednesday"** (founder: "It is important they know it's a sprint and it will be fast").
- **The sticky header holds only the wordmark and Request Your Sprint**: the in-page links were removed at his word.
- **The hero (founder, 2026-11-22):** "Three live sprints train your staff on AI Leadership." The follow-up now pays it off and ends on strategy, not adoption: "While your staff train, your leadership gathers what no consultant can hand you: where AI fits in your daily work, what stands in the way, how ready your people really are, and the rules they would keep. By Thursday you hold the strategic information to build a winning AI strategy, drawn from your own people." Under the buttons, the risk-free facts: "Free for 5 to 20 of your workforce. Online, nothing to install, no AI tools needed, and no company data shared."
- **"Free for 5 to 20 of your workforce"** is the wording of the free offer (any size of organization; up to 20 of its people free). The facts strip is 3 sprints / 45 min live each day / Free.
- **No "30 minutes" anywhere** (founder: most work won't take 30 minutes; only Wednesday does). Said as "a short piece of work, guided by a mini app" on the page, in the learning center and in the staff email.
- **The free offer is worded "Free for a team of 5 to 20"** (strip) and **"a team of 5 to 20 from your workforce"** where there is room (the hero note, Who it is for, the FAQ, the success screen, the email). It replaces "for 5 to 20 of your workforce", which read awkwardly (founder, 2026-11-22).
- **The risk-free note under the hero buttons sits in a soft lilac container with an info icon**, so it stands out without competing with the buttons (founder, 2026-11-22).

### Protecting your people (founder, 2026-11-22)

"Staff" is no longer used anywhere people read: "your people", "team" or "people" instead (founder: "So far, i like 'teams' and 'your people' usage"). The FAQ explains why a team needs at least 5 people (anonymity), and that a team under 5, or over 20, can be arranged as a paid sprint; under 5, everyone agrees beforehand how their work is shared.

Six protections, now promised on the page ("How your people are protected", in the report section), in the FAQ and in the policy. **Each is a promise to build before the first sprint's report or contact view:**
1. **No small groups:** any team or department under 5 is folded into "Other" in every view of the report.
2. **Themes, never quotes:** frictions, findings and policies are reported as themes and counts, never anyone's own words.
3. **Completion as counts:** the contact sees how many registered and how many finished each day, not who (chunk 3's contact view and the report card "How your people responded").
4. **Replaced (founder, 2026-11-25):** no sample report is shown to participants. "Each person can download their own results. The report goes to your leadership first, and then they share with the team." Only leadership receives the report, on Thursday; participants download their own results; leadership shares Thursday's findings with the team themselves.
5. **Leadership's promise:** agreed on the discovery call (founder, 2026-11-25: "On the call"), the last item of the checklist's Agree part, held by the recording; the studio refuses such requests.
6. **Dropped (founder, 2026-11-22):** names removed 30 days after the closing meeting. See "No timed deletion" below. Five protections remain.
- **The second section (founder, 2026-11-22)** is now Today / After the sprint, under the title "From AI decided at the top to AI your whole workforce stands behind." It sits at section size so it does not compete with the hero: the hero says what they get, this says why it matters. Six rows, buy-in first: unused tools → buy-in; fear of replacement → understanding, a part in deciding, and seeing how to thrive alongside AI; ungoverned use → every person's AI policy, the rules the workforce will keep; where AI saves time or money → the task map; value creation (cost-cutting only → frictions worth solving, new value); readiness → scores and where to start.
- **Naming:** the full name for titles, headers, buttons and first mentions; "Office Sprint" is fine in running sentences, used with discretion (founder, 2026-11-22).
- **One title style** (founder, 2026-11-22): every section title uses the same small tracked label and the same large title (`LABEL` and `H2` in `OfficeSprintSections.jsx`). The second section now has the label "What changes".
- **Rows 1 to 3 refined** (founder, 2026-11-22): row 1 is buy-in for the organization ("Your people help decide where AI goes, so what you bring in answers needs they named themselves, with their buy-in from day one."); row 2 is confidence for each person ("They see AI as something they direct, not something done to them, and they learn what makes them more valuable alongside it. Uncertainty gives way to clarity."); row 3 adds that they understand the risks of using AI without approval.
- **The three sprints section (founder, 2026-11-22):** label "The three sprints"; heading "Each sprint teaches one idea, then captures what your people know."; each card numbered (Sprint 1 · Monday) with three lines: **In the sprint** (what it teaches), **After it** (the work and its tool), **You gain** (what the leadership gets). The intro says "a mini app or a template", since the Data Audit is a guided form and the AI policy a template. **The "In the sprint" lines are a commitment for the session material (step 4):** Monday, what AI is and is not, and what work is worth handing to it; Tuesday, what being ready for AI takes, and why it starts with information; Wednesday, where AI creates new value, and the risks of using it without rules.
- **The three sprints, refined (founder, 2026-11-22):** heading "Each sprint trains your people, then turns what they know into evidence you can act on." (each sprint teaches two things, so "one idea" was dropped); intro shortened to "Built from the AI Stakeholder Challenge. After each sprint, your people do a short, guided task using what they already know about their job."; each card opens with what it teaches (no label), then **Your team's task** (soft lilac box, chosen over "Then your team" and "Sprint 1 activity", in plain words with no tool names or AISC terms, since no one knows them yet) and **What you get** (deep blue box, the result).
- **Refined again (founder, 2026-11-22):** heading back to the earlier form, corrected: "Each sprint teaches one theme, then captures what your people know."; intro in his words: "Built from resources in the AI Stakeholder Challenge, your team's transformation is delivered in just three sprints. After each sprint, your people do a short, guided task using what they already know about their job."; Tuesday gives "a map of your data". The lilac box reads "Your team's task".
- **The week, refined (founder, 2026-11-22):** the slots are named by working hours ("Before work" 6:15 AM, "After work" 5:15 and 6:15 PM) with "The sprints run outside normal working hours, so your business doesn't stop" (a selling point: no lost working hours); the cells read "Sprint 1/2/3 · 45 min"; the row under them reads "Then: Your team's task, before the next sprint"; "sprint" replaces "session" everywhere on the page; the footer reads "Their work, their PDFs and the replays of each sprint stay open for 48 hours after Wednesday's sprint." **Two promises on this card must be built before the first sprint:** the contact picks the Thursday closing time (chunk 3), and each sprint is recorded and its replay added for 48 hours (chunk 4, and who records it is still open).
- **The week, refined again (founder, 2026-11-22):** on desktop each sprint appears once per day (one tall cell spanning the three slots: "Sprint 1 · Live, 45 min · In your slot"). **Thursday is an advisory call**, not a closing meeting with set times: "Thirty minutes with your leadership: we share your report and what it means for your organization. The time is arranged with you." This replaces the 9, 10, 11 AM and 2 PM picks everywhere above, and **chunk 3 no longer needs a booking for it**: the time is arranged with the contact (to record in admin when built). "Advisory call" now replaces "closing meeting" on the page, the policy, the FAQ, the learning center, the questionnaire and the request form and email. **Task durations:** Sprint 1, 10 min; Sprint 2, 20 min; Sprint 3, 30 min, shown on the week card, the three sprint cards ("Your team's task · 10 min"), and the learning center's Home and day pages.
- **The morning slot is 7:15 to 8:00 AM WAT** (founder, 2026-11-22), not 6:15 to 7:00 AM. This replaces 6:15 AM everywhere above. Changed on the page, the request form and the learning center clock.
- **The slots are named "Slot 1", "Slot 2", "Slot 3"** (founder, 2026-11-22), on the page and in the request form and admin; the row under the sprints reads "After sprint". The intro still says the sprints run outside normal working hours.
- **The 48-hour line is off the week card** (founder, 2026-11-22: not necessary). The page no longer promises replays; the learning center still keeps the 48 hours.

### The report section: show, not tell (founder, 2026-11-22)

The four text cards were replaced by **a sample report from a simulated sprint**, shown as seven sliding pages (like the Toolbox on the home page; swipe on phones): At a glance, Where AI fits, Readiness, Your data, Where value is, Governance (the rules they would keep), What it means (the advisory call's three moves). Each page pairs the finding, in one sentence, with a page of the report: stacked bars by team for the task quadrants (colours validated for colour-blind readers), the six readiness areas in the order to work on them with Start here and Strongest, data readiness and where it is kept, problems named versus chosen, the share of policies holding each rule (a split rule flagged to settle together), and numbered moves. The sample is labelled "Sample" and is fictional: a distribution company of 16 people in three teams (`aisc/src/lib/officeSprintSample.js`). It keeps the protections (no team under 5, themes and counts, group totals). "How your people are protected" follows it.

**This sample is the specification for the real report** (learning center, later): the same pages, produced from `sprint_work`.
- **"How your people are protected" moved into the FAQ** (founder, 2026-11-22) as "How are our people protected?", replacing "Who sees each person's answers and AI policy?" (a shorter version of the same promises). The six points live once, in `OFFICE_SPRINT_PROTECTIONS` (`aisc/src/lib/officeSprint.js`). The report section now ends with the sample report.
- **The report is shown as one report window, not a labelled sample** (founder, 2026-11-22: "Just show a sample company… show the slides the way we would have presented them. Look at how Stripe.com does theirs"). No "Sample" chip and no explanatory paragraphs. The section is the label "Your report", the title "What the week finds.", and a white window for the fictional **Alder Lane Distribution** (Week of 30 November): its seven pages as numbered tabs down the side (a sideways row on phones), each page showing its source in small type, the finding as the headline, the chart, and "n / 7" with previous and next. The "Your data" page lost its closing line, which repeated the headline.
- **The report window, second pass** (founder, 2026-11-22: "make it more interesting with charts"). The company is **Alder Lane Co.**, with no week shown. The section title is "After the sprint, a full report and advice on your next steps." (his wording). Each page now has a chart of its own:
  - **At a glance:** what the company does (a distributor; 48 people, 16 from three teams joined), its teams as dots, a column chart of how many finished each sprint's task, then four tiles.
  - **Where AI fits:** a ring of all 112 tasks (50% could go to AI) beside the bars by team, with the most automated tasks as chips.
  - **Readiness:** a hexagon of the six areas beside the ranked list. It is hidden on phones, where it is too small to read.
  - **Your data:** one square per data set, coloured by readiness, with a white dot on the 9 nobody answers for.
  - **Where value is:** two labelled columns, "Named it as a problem" and "Want it solved first" ("9 of 14", "5 of 14"), replacing "9 named · 5 chose". The headline now reads "9 people named re-typing WhatsApp orders. 5 want it solved first."
  - **Governance:** a ring for the 14 of 16 who wrote a policy.
  - **What it means:** the three moves on a four-week plan, reordered to the order they happen (data owners, policy, first project).
  - Teams appear only where all 16 took part (Sprint 1), so no view shows a group under 5.
- **Report wording and numbers** (founder, 2026-11-22):
  - The At a glance tile reads "DATA GOVERNANCE is where to start" (first "Readiness: start here", then "Start with").
  - Readiness scores are whole numbers: 7, 8, 9, 10, 12, 14 out of 20.
  - **The AI policy is not limited to what the people wrote.** It mixes their rules with what leadership and the advisor recommend. The move is now "Write your AI policy together": start from the four rules most people already keep, add what leadership and our advice say the business needs, and settle the one they are split on. The real advisory call and report follow the same principle.
  - **The added rule is named, not described** (founder, 2026-11-22): the move names one policy the findings call for, which is not necessarily one they chose. For Alder Lane Co. that is "only AI tools the company has approved may be used for work": 13 of 14 ban public tools for customer details, but no one said which tools are allowed, and the first project (WhatsApp orders) will need one. A data-owner rule was tried first and dropped, because move 1 already covers owners. The real advisory call does the same: one named rule, drawn from the results.
- **Report section heading** (founder, 2026-11-22): label "After the sprint", title "A full report and advisory on next steps."

### Who it is for, How it starts, the paid band (founder, 2026-11-22)

- **Who it is for:** "Any organization. A team from every level." Choose 5 to 20 people across teams and levels; the wider the mix, the more the report shows. **A team of 1 to 4 is allowed, as a paid sprint**, like more than 20.
- **How it starts:** 1 Request your sprint (choose your week and slot, two minutes); 2 Book your discovery call; 3 **Onboarding**: the contact shares the code, each person registers with their own email, and **onboarding must be complete at least 48 hours before the start to claim the week.**
- **The deadline moved in Intelligence** from Friday 6 PM WAT to **Saturday 7:15 AM WAT**, exactly 48 hours before Slot 1 and more for Slots 2 and 3 (`registrationDeadline()` in `intelligence/src/lib/officeSprint/schedule.js`). The VIP card, the join page, the admin and the schedule email all read it, so they show the new time without other changes.
- **The paid band:** "A smaller or bigger team, or another time?" Fewer than 5 or more than 20 people, other times or more days, as a paid sprint. **Contact Sales opens the inquiry form as an Office Sprint inquiry** (`/form/inquiry?src=OS`): the new purpose "Office Sprint" (`office_sprint`) is selected, "Organization" is selected, and the message starts from a template (people taking part, preferred week and times, number of days, anything else). The FAQ's "Is it really free?" names 1 to 4 too.
- **Not yet tested by sending.** If the `inquiries` table has a rule on its type column that does not list `office_sprint`, `api/inquiry` saves the inquiry as Enterprise rather than losing it. The founder sends one test inquiry and checks how it is labelled in the admin Inquiries tab.
- **Second pass** (founder, 2026-11-22):
  - Who it is for: "Startups, businesses and enterprises." The text names the kinds of organization first, then how to choose the 5 to 20 people.
  - The discovery call step names no one.
  - The band is now "Need something custom?", with the text "The free sprint is for 5 to 20 people at the three set times. For a team of 1 to 4 or more than 20, another time, or more days, we design a paid sprint with you."
  - **Contact Sales points to the live intelligence.michaelsteve.com**, so its presets appear only once Intelligence is pushed. Locally they show at `localhost:3001/form/inquiry?src=OS`.
- **Why over 20 is paid** (founder, 2026-11-22): a sprint is a focused group of up to 20 key people, chosen from the leadership down through each team. Anything larger needs a different design (several groups, more sprints, a report for each), planned with the organization as a paid sprint. New FAQ "Why is it free only up to 20 people?" after the minimum-of-5 question. "Who it is for" now reads "Choose 5 to 20 key people, from your leadership down through each team", so the two say the same thing. The reason is the live format and a sharp report, never anonymity, which only sets the minimum.
- **"Need something custom?" text** (founder's wording, 2026-11-22): "For a team of fewer than 5 or more than 20, we design a paid sprint with you. Only sprints in the three time slots are free. A time of your own requires a paid sprint."

### The FAQ (founder, 2026-11-22)

- **Order:** Is it really free? · How are our people protected? (moved up) · at least 5 · up to 20 · three days · missed sprint (new) · knowing AI · AI tools · after the sprint.
- **Is it really free?** "Yes, once, for a team of 5 to 20 in one of the three time slots. A team of fewer than 5 or more than 20, or a time of your own, is a paid sprint we design with you."
- **Three days:** now opens with the load: a 45-minute live sprint each day, then a guided task of 10, 20 or 30 minutes.
- **What if someone misses a live sprint?** "They can still do the day's task. Every task stays open until 48 hours after Wednesday's sprint." **No replays are promised.**
- **"Nothing to install" means no AI tools.** The question is now "Do we need to install or buy any AI tools?". **How people join the live sprints is never named on the page** (the founder's choice of connection is not public); the answer says it is covered on the discovery call.
- **After the sprint:** "On Thursday, in a 30-minute advisory call, we share the report…"

### Whole-page review: synergy and conversion (founder, 2026-11-22: "All 7 are valid. Apply them", with the smaller points)

1. **The proof comes first.** On wide screens the hero shows a still first page of Alder Lane Co.'s report beside the promise (`ReportPreview` in `OfficeSprintReport.jsx`), linking down to the full report: "A report like this, by Thursday."
2. **A button under the report**, where desire peaks: "Request Your Sprint", with "Your own report, from your own people, by Thursday."
3. **"Key people" everywhere:** the headline is "From AI decided at the top to AI your people stand behind." The page description says "for 5 to 20 key people in your organization".
4. **No jargon or overpromise:** "frictions" is now "problems"; "your team's transformation is delivered in just three sprints" is now "the essentials are delivered in three sprints".
5. **Who runs it:** a strip after the report: Michael Steve Clarity Studio, the studio behind the AI Stakeholder Challenge, the 7-day AI leadership program, whose resources and tools build the sprint. Links to the AISC home page. Facts only, no testimonials.
6. **New FAQ, "What does it take from us as leaders?":** a 20-minute discovery call, a short questionnaire, sharing the code, and the 30-minute advisory call on Thursday.
7. **Why it is free:** "We run it free so organizations can see our work before deciding anything bigger." (in "Is it really free?").

**Smaller points:**
- The hero box drops the free line (the facts strip carries it) and reads "Online, no AI tools needed, and no company data shared."
- The hero claims are plainer: "what only they can tell you" and "the information to build your AI strategy", in place of "what no consultant can hand you" and "a winning AI strategy".
- The week says "only three places a week".
- **Live slot availability: built 2026-11-22, uncommitted** (founder approved showing it). Intelligence has a public, read-only `GET /api/office-sprint/availability`: for the weeks the request form offers (`upcomingMondays()`), less any past its registration deadline, it returns each week's held slot keys and places left, using `holdsSlot()` and `registrationDeadline()` from `lib/officeSprint/schedule.js`. It reads only `scheduled_week, scheduled_slot, status` with the service role and returns no organization data; cached 60 seconds; CORS for aistakeholderchallenge.com and localhost. The AISC week section (`OfficeSprintWeek.jsx`) reads it in the browser and shows **"Available times"** below the blue week card (founder, 2026-11-22: renamed from "Places left" and moved there, with more detail): a short explanation on the left (no heading: "Choose your week and time." was removed because visitors cannot choose there; a time is held for one organization for all three sprints; onboarding complete 48 hours before the first sprint), and one accordion per week on the right. Each week is named by its sprint dates, Monday to Wednesday, so visitors can check them against their calendar, for example "Mon 30 Nov – Wed 2 Dec · 2 of 3 times available". Opened, it shows when onboarding closes (the Saturday before, 7:15 AM WAT) and the three slots as Morning or Evening with their WAT times (and the visitor's own time outside WAT), each marked Available or Taken. Open and closed look clearly different (founder, 2026-11-22): an open week is tinted, with a dark border, a bold date and a dark chevron; a closed one is white with a grey chevron. **Local reads local, live reads live** (founder, 2026-11-22): on localhost the section asks the Intelligence dev server (`http://localhost:3001`) whatever `NEXT_PUBLIC_API_BASE` says; everywhere else it uses `NEXT_PUBLIC_API_BASE`. Only this section does this; the site's other reads from Intelligence are unchanged. If the read fails, nothing extra is shown. **Push Intelligence before AISC.**
- **"Who runs it", rewritten** (founder, 2026-11-22: the sentence was long and unclear; explain what AISC is). The title is "Michael Steve Clarity Studio.", with the positioning line "A clarity studio for strategic, executive and institutional leaders." Two short paragraphs follow. The first says what the AI Stakeholder Challenge is: seven days in which senior leaders move from knowing about AI to leading with it on purpose, starting with judgment rather than tools (what AI really is, how to get ready for it, where it creates value, how to govern it; founder's wording). The second says the Office Sprint brings that program's resources, guided tools and reporting to your people, in three sprints (founder's wording). A link to the AISC home page follows.
- **Hero line** (founder, 2026-11-22, second pass): "As your people train, they also show you where AI fits in their daily work, how ready they really are, what stands in the way, and the rules they would keep. By Thursday you hold the information to build your AI strategy, drawn from your own people." Speak to the reader as "you", not "your leadership": the reader is the person deciding (an owner, an executive, or a team or HR lead making the request), so naming "your leadership" spoke about them as someone else and left out leads below the top. "Their daily work" (the subject is the people), "also" (the information comes with the training), and the findings in the order of the week.
- **Final review fixes** (founder, 2026-11-22; the date dash stays):
  - **"Free" means no cost only.** The availability block now says slots are "open", not "free".
  - **One name: "slots".** The week says "only three slots a week"; the block is "Available slots", reading "2 of 3 slots open" or "No slots left this week".
  - **One wording for the deadline:** "at least 48 hours before your first sprint" in both the availability block and "How it starts" ("…to claim your slot").
  - **"Your people", not "your workforce"**, in the Governance row and the Sprint 3 card.
- **Hero promise** (founder, 2026-11-22, option 2): "By Thursday you know where to adopt AI, where it creates value and how to govern it, all drawn from your own people." It replaces "the information to build your AI strategy", which promised more than the report gives; the new line matches the report's pages. It relies on the advisory call staying on Thursday.

### Review #2, the policy page (founder, 2026-11-22: "Yes, apply all")

`/policy/office-sprint` (`src/app/policy/office-sprint/page.js`), brought in line with today's decisions and with what Intelligence actually collects:

1. **Spaces** after "Your organization", "We" and "Each person" are now explicit, so the bold names never run into the next word.
2. **No replays.** "To run the sprint" reads "the live sprints, the guided tools and each person's PDFs."
3. **The data contact goes to the general inquiry form** (`/form/inquiry`, no `?src=OS`), because the Office Sprint preset would open a sales template for a privacy request.
4. **Department or team** is listed with each person's name, email and role (registration asks for it).
5. **The contact's questionnaire** is listed under "When you request a sprint".
6. **Paid sprints under 5 people:** how each person's work is shared is agreed with all of them before it starts, so the "never a group under 5" promise holds.
7. **"Frictions they name and score"** is now "problems they name and rank".
8. **"Session" is now "live sprint"** (attendance, and the video call service, still unnamed).
9. **A link back to the sprint page** sits above the title: "← Back to the AI Stakeholder Office Sprint". `PolicyPage` takes an optional `back` prop for this; the other policies are unchanged.

Not reviewed by a lawyer; worth doing before a large organization relies on it.

**List wording** (founder, 2026-11-22): each list opens "We collect the following:" (or "…gives us the following:"), and each item is a bold noun label, then a colon: Organization information, Contact person, Sprint details, Questionnaire answers, Consent; for the people, Personal details, Sprint work, Attendance.

### Local links to local (founder, 2026-11-22: "localhost links are sending to the production")

Under `npm run dev`, every link on the sprint path opens the other site's dev server; any build links to the live sites, so production is unchanged.

- AISC: `src/lib/sites.js` (`INTELLIGENCE_URL`, `IS_DEV`). Used by `lib/officeSprint.js` (Request Your Sprint, Contact Sales), the policy page's contact link, and the availability read in `OfficeSprintWeek.jsx`.
- Intelligence: `src/lib/sites/aiscUrl.js` (`AISC_URL`). Used by the request form (back link, policy link) and the registration page's policy link.
- **Whole AISC site** (founder, 2026-11-22: "Yes, whole site"): every link to Intelligence (footer, pricing, FAQ, personalize, /links, /ai-apprentice, all three policies) uses `INTELLIGENCE_URL`, and every read of Intelligence's public API (readiness check, personalize, cohorts, availability) uses `INTELLIGENCE_API_BASE`, which is the local server under `npm run dev` and `NEXT_PUBLIC_API_BASE` in any build. Locally, the Intelligence dev server must be running for those reads.
- Emails keep their live links, even when sent while testing locally (founder, 2026-11-22: "For emails let's leave as is").

### Review #3, the request form (founder, 2026-11-22: "Yes, apply all")

`intelligence/src/app/(open)/form/office-sprint/` and `lib/officeSprint/requests.js`:

1. **Only weeks that can still be taken.** `openWeeks()` drops any week whose onboarding has closed (Saturday 7:15 AM WAT before it); the request API refuses such a week too.
2. **Taken slots are marked.** The form reads `/api/office-sprint/availability` (the same read as the AISC page): a slot another organization holds that week shows "Taken that week" and cannot be chosen; a week with no slot left is not offered. Week comes first, then slot. If the read fails, every open week and slot is offered.
3. **The thank-you screen names no one:** "A 20-minute video call about [organization]: …"
4. **Price lines match the page:** over 20 and under 5 both read "we design a paid sprint with you. We go through it on the call."; "from your people", not "from your workforce".
5. **People count:** "Number of key people taking part", hint "5 to 20 is free. Fewer or more is a paid sprint, designed with you."
6. **The deadline in the page's words:** "To claim your slot, onboarding must be complete at least 48 hours before your first sprint." (form and thank-you screen).
7. **Weeks named by their sprint days:** "Mon 30 Nov – Wed 2 Dec" (`formatSprintDates()`); the section is "Your preferred week and slot".
8. **Subtitle:** "…so we get to know your organization and what it needs."
9. **Names:** the tab reads "Request Your AI Stakeholder Office Sprint"; the consent box links to the "AI Stakeholder Office Sprint policy".
10. **A back link** above the title: "Back to the AI Stakeholder Office Sprint".

The thank-you screen was not sent for real (it writes a request and emails); its text is checked in code. The request email still says "Your week is confirmed once your team's registration is complete": that is touchpoint #4.

### The form is an application (founder, 2026-11-22)

1. **Application, not request.** Visitors now read "Apply for a Sprint" (page buttons), "Apply for the AI Stakeholder Office Sprint" (form title and tab), "Submit Application" and "Your application is in." on the form, and "apply" on the policy page. Code names and the table stay as they are. The request emails are reworded at touchpoint #4.
2. **No back link on the form or thank-you screen**, because the form opens in a new browser tab.
3. **Labels, his words:** "Choose your preferred date" and "Pick a time slot". The section is "Your date and time slot".
4. **"Another date"** sits beside the dates, "We agree it on the call". `preferred_week` is a required date, so the reserved date `ANOTHER_DATE` (2099-12-31) stands for it, with no database change. `formatWeek` and `formatSprintDates` show it as "Another date".

### Application form wording (founder, 2026-11-22)

- **Subtitle** (his direction, refined after critique): "Complete this form to apply. Then book a 20-minute discovery call, where we get to know your organization and guide you through onboarding."
- **His labels:** "Organization", "Contact Person", "Number of Participants", "Another slot", and "Decided on the discovery call" under both "Another date" and "Another slot".
- **"Another slot" keeps the stored value `any`**, which the table's check requires. The admin can still schedule only Slots 1, 2 and 3, so a time outside them cannot be entered there yet.

### "Another slot" is a paid sprint (founder, 2026-11-22: "Custom time slots will be a paid sprint, so we have to allow it")

- Choosing "Another slot" shows "A time of your own requires a paid sprint." The thank-you screen, the contact's email, the admin's email and the admin's request details all say so.
- **Built (founder, 2026-11-22: "Yes, build it"):** the admin's Schedule panel has a "Custom time" option with a start time (7:15 AM to 9:15 PM WAT, so the 48-hour rule holds) and the sprint's own video call link.
- **How it is stored:** `scheduled_slot` holds `custom:HH:MM`, so the clock, emails, registration page, homepage cards and sprint page all follow it. The link is in `sprint_orgs.session_url`.
- **No double booking:** a custom time cannot overlap another organization's session, and a set slot it overlaps shows as taken on the form and the AISC page.
- **The founder runs one SQL** (`SPRINT_CUSTOM_TIME_SQL`, shown as a Copy SQL banner on /admin/sprint). Tested twice on a throwaway Postgres: existing rows unchanged, bad values refused. Until it runs, Slots 1 to 3 work as before and a custom time is refused with a message.
- **Not exercised end to end:** a real custom sprint saved, emailed and joined. Include it in the final test round.

### The sprint is the first step, not adoption (founder, 2026-11-22: "Yes apply all and don't undersell the sprint")

The sprint shows an organization what we can do and how its people respond while they learn. **Adoption cannot follow it directly.** The path is the sprint, then proper training through the fitting vehicle (AICC, AISC or Labs), then a few pilots, then adoption.

- **Headline:** "Three live sprints introduce your people to AI Leadership." (also on the quick links).
- **Hero:** "By Thursday you know what your organization needs before it adopts AI, all drawn from your own people."
- **Sample report:** "could go to AI" is now "they would hand to AI", since these are the views of people still learning. The last page is "Three moves before your first pilot", its third move "Train, then pilot", with no week bars.
- **FAQ, after the sprint:** states the sprint, deeper training, small pilots, then adopting what works.
- **Public copy names no program as the next step** (founder, 2026-11-23: "Don't mention any program yet. The results and diagnosis will determine the training and other steps required"). The FAQ says: "Your results determine the training and other steps we recommend on the call." "Who runs it" still names AISC, as the program the sprint is built on.
- **Do not undersell it:** keep the concrete promises (how your people respond, what stands in the way, what to fix first). The real report and advisory call follow the same rule.

### The booking window (founder, 2026-11-22)

"Let's use a 4 week limit instead. It's free and the idea is to take advantage of it while it still is. Anyone wanting to book 5weeks or more into the calendar will pay a separate fee to lock down the date and slot. They'll still pay if the slot and date is not the default available. I like how on the landing page only 3 weeks are shown."

- **Shown:** the landing page and form show the next **three** open weeks (`WEEKS_SHOWN`). Without the cap they would show four from Monday to Saturday morning.
- **Free window:** the next **four** weeks still open to book (`WEEKS_OFFERED`, `isFreeWeek()`). A week whose onboarding has closed does not use up the window.
- **The fourth week stays free** (founder, 2026-11-22): "The 3 weeks being shown forces them to choose from it first. So the ones who ask for a fourth week really couldn't schedule around what was available." "Another date" reads "Date to agree" in the admin until it is scheduled.
- **No fee talk in writing** (founder, 2026-11-22): "We don't discuss fees anywhere. That kind of talk is for discovery calls or other in person conversations." No page, form, thank-you screen or email mentions a fee or amount. The admin alone marks a later week as carrying one.
- **Further ahead:** the admin can book up to 12 weeks ahead (`WEEKS_BOOKABLE`, our working limit), marked "date-hold fee". Every sprint is still Monday to Wednesday with the advisory call on Thursday.
- **Marked as paid:** `sprintIsPaid()` flags size, a custom time or a date beyond the window, on the admin list and in the Schedule panel. What was booked decides, judged on the day it was booked.
- **Open:** the amount of the date-hold fee. The system does not charge it; it is agreed on the discovery call and collected by hand.

### The screen after applying (founder, 2026-11-22)

Redesigned so each kind of information stands apart (`ApplicationReceived.jsx`): the confirmation, then "Your preferred date" and "Your preferred slot" with the 48-hour line in a band that stands out, then "Book your discovery call", then any note about a paid sprint. Never "You asked". A custom date or slot reads "Will be agreed on the call". The contact's email uses the same wording from the same helpers (`preferredDate`, `preferredSlot`, `sprintNotes`), and its old line about price is gone. The rest of that email is reviewed at touchpoint #4.

### The discovery call (founder, 2026-11-22)

- **What it covers, everywhere:** "Why your organization needs this sprint now", "What you want to achieve from it", "What you have tried so far" (`DISCOVERY_CALL_TOPICS`: the screen after applying, the email, the admin checklist).
- **The admin has a call checklist** (founder: "all i need is a checklist of what to ask in the admin. The call will be recorded so I can get all the info i need"): Open, Ask, Learn, Agree. Learn carries what the questionnaire asked, so nothing is lost if it goes. Ticks are not saved.
- **The questionnaire is scrapped** (founder, 2026-11-25, Checkpoint 2 step 1: "Scrap it"). The call checklist covers all nine questions. It is gone from the welcome email, the admin's VIP account text and the policy; the contact's dashboard card follows in step 2. Its code (`QUESTIONNAIRE`, `api/office-sprint/questionnaire`) and any saved answers stay, unused, and the admin still shows answers already saved. Nothing in the database changes.
- **Recording is in the policy** (founder, 2026-11-22: "Yes, add it"). The checklist opens with telling them the call is recorded and getting their OK. The policy lists the recording, says why, offers notes instead if they would rather not be recorded, and says it stays with us and is not shared with their people.

### No timed deletion (founder, 2026-11-22)

"Let's remove the deletion of any data in 30 days because that's harder to fulfill. So it's better we leave it out than to put it there and default."

- The landing page's protections and the policy no longer promise removal on a schedule, for people's work or for call recordings. **Never promise a deletion date we are not set up to keep.**
- The policy now reads: "We keep your data for as long as we need it to run your sprint and improve our programs, or until you ask us to delete it."
- Deleting on request stays, with a reply within 30 days. That is a reply time, not a timed deletion.

### Review #4, the confirmation email (founder, 2026-11-22: "Yes, apply all")

1. **Subject:** "Your application is in: book your discovery call".
2. **Opening:** "We have [organization]'s application for the AI Stakeholder Office Sprint. Your next step is to book your discovery call."
3. **The booking button comes straight after the opening**, because the email exists to get the call booked.
4. **The three call topics are a list**, the same as the screen after applying.
5. **The real deadline** follows the 48-hour line: "For these dates, that is by Saturday 12 December, 7:15 AM WAT." Left out when the date is to be agreed.
6. **A way to reach us:** "Can't find a time that works? Send us a message", to the inquiry form, since the inbox is not monitored.
7. **The studio's notification** says "application", shows the sprint dates, and has one "Sprint type" line: Free, Paid (team size, custom time) or Date to agree.

Rendered for each case without sending. A real send is part of the final test round.

### Hero buttons (founder, 2026-11-22)

The second hero button is "See details", so it does not compete with "Apply for a Sprint". It jumps to "What changes", the section right below the hero. Two buttons stay: cold visitors need a way to look before they apply.

### Review #5, Cal.com (founder, 2026-11-22: "Yes, make them")

The event is "AI Stakeholder Office Sprint Discovery Call". Changed on this event only: the title, bookings limited to 28 calendar days ahead, and the phone and notes questions hidden. Already in place when the settings were opened: the description, Monday to Wednesday ending at 4:00 PM (clear of Slots 2 and 3), and 30-minute buffers before and after each call.

- **Left alone:** the availability schedule is the account's shared Default, so editing it affects every booking link.
- **Left alone:** the location stays Zoom, because that integration creates each call's link. A plain link would need one fixed meeting link, so the page still shows "Zoom Video".
- **Blocked (founder, 2026-11-22: "Yes, block them"):** 25 and 26 December are unavailable on the Default schedule, so on every booking link.

### The three checkpoints (founder, 2026-11-22)

1. **Up to the booked discovery call** (tonight). Page, policy, form, confirmation email, Cal.com and Contact Sales, then the founder's launch steps: delete the test organization, push Intelligence then AISC, send one real application, book a test call, confirm the call records.
2. **Onboarding** (2026-11-23): from the call to people registered, signed in and seeing what to get ready.
3. **Fulfilment:** the whole sprint through the Thursday meeting with leadership.

### Review #13, Contact Sales (founder, 2026-11-22: "Yes, apply all")

For Office Sprint visitors only (`?src=OS`); other inquiry types are unchanged. The heading is "Tell us about the sprint you need" / "We design it with you."; purpose and representation are preset and hidden; the starter message asks for participants, preferred date and time slot, with no "number of days"; the policy is linked; the screen after sending confirms the reply address and offers the discovery call; the studio's subject is "Office Sprint inquiry: [organization]". The FAQ now reads "The person who applies..." and no longer mentions the questionnaire.

### The schedule section (founder, 2026-11-23)

Label "The Schedule", heading "One time slot is yours, Monday to Wednesday."

### "What changes" (founder, 2026-11-23)

The section now also speaks to organizations that do not know what to do next, not only to AI pushed from the top. Heading: "From unsure about AI to a clear next step your people support." Five rows, in a leader's order: what to do next, where AI would help most, fear of replacement, tools that sit unused, company information in public AI tools. The two rows on saving and creating value were merged.

### The main audience (founder, 2026-11-23)

**Organizations that know AI matters and do not know what to do next.** Every line on the page answers to them.

- **Hero:** "Know your next step with AI in one week." The founder's earlier headline now opens the paragraph.
- **The sprints:** "Three sprints to find where AI fits, how ready you are and what to solve first." Each card carries its question: "Where could AI help us?", "Are we ready?", "What should we solve first, and under what rules?" (Not "answers one question": that implied an agreed list.)
- **Who it is for:** "For organizations that know AI matters, but not what to do next." No plan or experience needed.
- **FAQ:** opens with "We don't have an AI plan yet. Is this for us?"
- **Link previews and quick links** open with the audience.
- **Honest wording:** people "chose" or "agree on" rules and "would" keep them. Writing a rule does not prove anyone keeps it.

### "What changes" wording (founder, 2026-11-23)

His lines: "You have a map of the work your teams would hand to AI and the problems they want solved the most, including where AI could create new value." and "They learn what AI can and cannot do, and what makes them more valuable alongside it, so they move from uncertainty to clarity."

The Available slots list appears only when the page can read live availability from Intelligence. If Intelligence is down, the section is hidden.

### The three sprints, redesigned (founder, 2026-11-23)

The three separate cards ("it currently looks scattered") are now one panel read Monday to Wednesday. Each day's question is the large text, with the program title beneath it. "What they learn", "Your team's task" and "What you get" sit on the same lines across the days, and the results form one navy band along the bottom. On phones the days stack.

Reading aids (founder, 2026-11-23): "Sprint 1" is now a large, faint "1". A thin top line deepens from Monday to Wednesday to mark each sprint, and the parts step from white through lilac to the navy result. On phones and tablets each day is its own card.

"What you get", in simple language everyone can understand (founder, 2026-11-23). Monday: "The tasks your people would give to AI, and the ones they would handle." Tuesday: "How ready your organization is for AI, and how well your information is kept." Wednesday stays: "The problems worth solving first, and the rules your people would keep."

### "Who runs it" (founder, 2026-11-23)

This section answers who is behind the sprint; it does not sell AISC. "The sprint is built on the studio's flagship program, the AI Stakeholder Challenge. Over seven days, it prepares senior leaders to take a clear position on AI and safely lead their people from uncertainty to clarity and prosperity. The Office Sprint brings its resources, guided tools and reporting to your people, in three sprints."

### Task deadlines (founder, 2026-11-23)

"I'm sticking to Thursday. The tasks should be simple enough to finish same day. By Thursday morning I create the report. So they have all of Wednesday to finish. It's a sprint and it should be treated as such. That's why there are no replays."

- **Each task is due the same day, by 11:59 PM WAT.** Everything closes **Wednesday at 11:59 PM WAT for every slot**, and the server refuses work after that. This replaces "48 hours after Wednesday's sprint".
- **Thursday:** the founder creates the report in the morning from the work that is in, then holds the advisory call with leadership. The call needs a time after the report is ready.
- **To build with the report (checkpoint 3):** it shows how many took part, and any part with fewer than 5 responses says there were not enough to show it.

### Visitors in other time zones (founder, 2026-11-23: "we have to highlight it properly")

The schedule shows "Showing your time in [place]". Each slot leads with the visitor's own time and days, with the slot and WAT beside it. The days are worked out for them: Slot 1 is Sunday to Tuesday in Los Angeles. For these visitors the "outside normal working hours" line says "in West Africa", because that is not true everywhere. Visitors in WAT see the page as before.

The application form and the screen after it also show the visitor's own time (founder, 2026-11-23: "Yes, add it"), with exact local dates once a week is chosen. It is display only: the saved slot does not change. Emails stay in WAT, because the server does not know the applicant's time zone.

### Checkpoint 1 test fixes (founder, 2026-11-24)

The live test passed and all the emails arrived. Three fixes followed:
- The form's consent error names the "AI Stakeholder Office Sprint policy".
- The admin shows the number of people and "Paid sprint", for any reason a sprint is paid.
- **"Paid" is said only once.** Applicants get one note however many reasons apply: "For 25 people at a time of your own, we design a paid sprint with you." ("Saying it twice feels like we are soo interested in the money.")

Noted, not changed: the first server version of the admin page leaves out the phone menu button, and React rebuilds the page in the browser. It is admin only and affects no data.

### Checkpoint 1 live test (2026-11-24)

Landing page, policy, free and paid applications, Contact Sales, the emails and the admin records passed. **The discovery call now runs on Google Meet** (founder switched from Zoom on Cal.com), and his test of the link and recording passed. All test calls are cancelled and the test records deleted. The final fixes are live (commit `1490ea2`). **Checkpoint 1 is closed (2026-11-24): the sprint can be promoted.** Steer first organizations to a week when Checkpoints 2 and 3 are ready.

### Motion on the landing page (founder, 2026-11-24: "subtle but effective and efficient")

One small script (`SprintMotion.jsx`) and one stylesheet, with no library. Opacity and transform only, each part plays once, nothing loops, and it is off for visitors who prefer reduced motion. The headline and hero text never wait on an animation. The moments: the hero report assembles; each "After" arrives just after its "Today"; the three sprints appear in order as the top line draws; the schedule's days and the "How it starts" steps follow in order; report charts grow when a page opens. Only content below the fold is held back, so the page is complete without JavaScript.

The report demo moves slower than the rest (founder, 2026-11-24: "The demo motion is too fast. Every other thing looks good"): its bars grow over about 1.2 seconds, side-by-side pieces follow one another, and the hero report card settles over about 1 second.

Motion, taken up a notch (founder, 2026-11-24: "Build all three"): each report chart draws in its own way (rings trace round, the readiness shape opens from the centre, data squares fill in one by one); key numbers count up once when first on screen (the "At a glance" tiles, "50%", and the policies written); in "What changes", each "Today" steps back a little once its answer is in. Still once only, and off for reduced motion. The hero report preview does not count up, so its numbers never flash.

### Checkpoint 2, step 1: the call and account setup (founder, 2026-11-25: "Yes, apply all")

Every step of Checkpoint 2 is reviewed with screenshots of all its screens (founder: "For every step I have to see all the screens too to confirm the design"); they are kept in `screenshots/office-sprint/checkpoint2/`.

- **Welcome email** ("Your AI Stakeholder Office Sprint dashboard"): "Your dashboard for [organization]'s AI Stakeholder Office Sprint is ready. Once your date and time slot are set, we'll email you, and your dashboard will show the link and code your people use to register." No questionnaire.
- **The admin drawer follows the call:** contact buttons, the checklist, call notes, their application, then VIP account, Schedule, registration and Status.
- **Admin wording follows "application":** "Organizations applying for a sprint", "Applied [date]", "Their application", "Preferred date", list column "Date", "Preferred: [date]".
- **Policy:** "Questionnaire answers" removed; sprint details read "your preferred date and time slot".
- **The sign-in code page stays as it is** (founder, 2026-11-25): it is shared by every program.

### Checkpoint 2, step 2: the contact's homepage (founder, 2026-11-25: "Sprint only", "Yes, build it")

- **The card** (`components/officeSprint/OfficeSprintCard.jsx`) shows where the sprint stands in three steps: "Date and time slot set", "Your people register", "Sprint week", with a status label (Date to be set, Registration open, Confirmed, Spot released, Finished). Before scheduling: "We set your date and time slot after the discovery call, then email you. The link and code for your people will appear here." Scheduled: Dates (Mon 7 Dec – Wed 9 Dec), Time slot (with the contact's own time and days when abroad), "Registered 5 of 12", "Registration closes …", the code shown large, and **Copy the link** and **Copy the code**. Confirmed: "Your sprint is confirmed. Your people sign in with the email they registered with." (the old "sign-in details before Monday" promise was not true). The questionnaire form is gone.
- **Sprint-only homepage:** on `/vip`, someone whose only business with us is the sprint (no VIP briefing seat, no AISC challenge seat: `sprintOnly()` in `lib/officeSprint/contactSprint.js`) sees the card alone, with the logo and "Hello, [name]" (sign out) in the header: no Awakening block, Challenge Access, Labs or menu. Everyone else, and the VVIP and Chief homes, are unchanged.
- **The card is white on the blue homepage** (founder, 2026-11-25: "The card background can't be in blue"): dark blue text, purple accents, the code on a soft lilac panel.
- **"Go to Sprint"** (founder's words) on the card once the date is set (registration open or confirmed), to `/sprint`. **A contact who has not registered sees the sprint view-only** (founder's choice): the days, times and what each day's work is, with "You're viewing your organization's sprint. To join the sessions and do the work, register with your code [code] like everyone else." No session link and no work of their own (`getContactViewSprint()` in `lib/officeSprint/staffSprint.js`; a registered member still sees their own sprint first). Saving work still checks membership, so a viewer cannot save. The sprint home's drawing moved to `components/officeSprint/SprintHomeView.jsx` so it can be checked with sample data.

### Checkpoint 2, step 3: scheduling and the "date is set" email (founder, 2026-11-25: "Apply")

- **"Participants", not "people taking part"** (founder: "People taking part should simply be 'participants'"): the emails' details box, the admin's Schedule box, the application details, "Participants registered: N of M" and "12 participants · Free".
- **Dates read "Mon 7 Dec – Wed 9 Dec"** in the emails' details box (with "Time slot: 5:15 to 6:00 PM WAT"), the admin's date picker ("Date"), the registration box and the list. The shared details box is used by the scheduled, registered, confirmed and date-changed emails.
- **The scheduled email:** subject "Your AI Stakeholder Office Sprint is scheduled: Mon 7 Dec – Wed 9 Dec"; heading "Your date is set, [name]"; "Share the link and code with your people… Your sprint is confirmed once N people have registered… your date is opened to other organizations"; it ends with "Sign in to your dashboard to see how many people have registered."
- **"Forward to all participants"** (founder's heading): a ready-made message in the email, and **Copy the message** on the contact's card, built by one function (`lib/officeSprint/forwardMessage.js`): "Our organization is taking part in the AI Stakeholder Office Sprint: three live sessions of 45 minutes, Monday to Wednesday, each followed by a short piece of work the same day." then Dates, Time, Register here (link), Code, and "Please register by [deadline]."
- Admin: "Edit the week" is "Edit the date".

### Checkpoint 2, step 4: registration and "You're registered" (founder, 2026-11-25: "Yes apply them")

- **The registration form** opens with what the sprint is ("Three live sessions of 45 minutes, Monday to Wednesday, each followed by a short piece of work the same day."), then Dates and Time slot (with the participant's own time and days when abroad), then "Register by [deadline]." The email field says "You'll sign in with this email."
- **The screen after registering, redesigned** (founder: "There's too much text and it's hard to read"): "You're registered, [first name]", the Dates and Time slot box, "What's next" in two numbered steps ("Sign in with [email]", "Open your sprint from your dashboard"), a **Sign In** button, and "We've emailed you a copy."
- **The "You're registered" email** leaves out the participant count (it is the organization's) and says "three live sessions".

### Checkpoint 2, step 5: the participant's homepage and the sprint home before Monday (founder, 2026-11-25: "Yes, apply")

- **The sample-report promise is replaced** (founder: "Only leadership sees reports by Thursday. Participants do the sprint and download their individual results. If leadership decides to share Thursdays finding with the team, they do that themselves."). The FAQ protection and the policy now read: "Each person can download their own results. The report goes to your leadership first, and then they share with the team."
- **Leadership's agreement is made on the call:** the checklist's Agree part ends with "Leadership never asks for anyone's individual answers" before "Set up their account".
- **Participant homepage, sprint-only** (same rule as the contact's): on `/leader`, a participant whose only business with us is the sprint sees the sprint card and sign-out alone. The participant card (`SprintStaffCard.jsx`, on every homepage) is white with **Go to Sprint**. `/leader/page.jsx` is now a server page that decides; the old homepage is `LeaderHome.jsx`.
- **Sprint home:** header "AI Stakeholder Office Sprint" (not capitals); top line "Mon 7 Dec – Wed 9 Dec · 5:15 to 6:00 PM WAT" with the participant's own time when abroad; "three live sessions"; day cards say "Your task". A white **Before Monday** box, shown until the first session (approved word for word): keep 45 minutes free for each session and time for the work (about 10, 20 and 30 minutes); a laptop or phone with a steady connection, the link appears 15 minutes before; think about the tasks that fill your week, Monday starts there; answers seen only as group totals, and leadership has agreed never to ask for anyone's individual answers.

### Checkpoint 2, step 6: confirmed and dates-changed emails (founder, 2026-11-25)

- **Nothing is booked ahead for now** (founder: "Let's leave out anything that'll need us to book ahead. Any information can be sent to the VIP then they tell their people. For now. Later we can set it up when a more robust infrastructure is in place"). So no reminder before Monday and no spot-released email yet; participants hear through the contact. Date changes go to the contact only.
- **"Confirmed", to the contact:** subject "…is confirmed: Mon 7 Dec – Wed 9 Dec"; heading "Your sprint is confirmed"; "All N participants have registered…"; "Your participants sign in with the email they registered with. Their sprint home shows what to get ready and, 15 minutes before each session, the link to join."; "On Thursday, your leadership joins the 30-minute advisory call. We'll arrange the time with you."; a **Forward to all participants** message (the dates, time, sign-in link and the first three Before Monday points, `confirmedMessage()`); **Go to Your Dashboard**. The untrue "Before Monday, your people receive their sign-in details and the session link" is gone.
- **The contact's confirmed card** offers **Copy the message** with the same text.
- **"Confirmed", to sales@:** new date format, "participants", the contact's name, email and phone, and **Open in Admin**.
- **"Dates changed", to the contact:** subject "Your AI Stakeholder Office Sprint dates have changed: …"; heading "Your sprint dates have changed"; "Please let your participants know…"; and a Forward to all participants message with the new dates and time (`changedMessage()`).
- The Before Monday points live once, in `lib/officeSprint/beforeMonday.js`, for the sprint home and the confirmed message.

**Checkpoint 2 is reviewed end to end** (2026-11-25): steps 1 to 6 done, uncommitted, in both repos.

### Registration deadline moved (founder, 2026-11-26, during the Checkpoint 2 live test)

- **Registration closes at 11:59 PM WAT on the Saturday before the sprint**, for every slot (founder: "Registration can't close 7:15 AM WAT. That's awkward. It should close 11:59pm of saturday"). `registrationDeadline()` in `lib/officeSprint/schedule.js` and `closesLabel()` in the landing page's `OfficeSprintWeek.jsx` both use 22:59 UTC. The spot is released after it, and a week leaves the form and the availability once it passes.
- **The 48-hour line is replaced everywhere** (landing page twice, the application form, the thank-you screen and the application email) with: "To claim your slot, registration must be complete by 11:59 PM WAT on the Saturday before your sprint." (`CLAIM_SLOT_LINE`).
- **"Registration deadline:", never "Register by"** (founder): the registration form, the forwarded message ("Registration deadline: Saturday 5 December, 11:59 PM WAT"), the contact's card and the admin's Schedule box.
- **The card's second step is "Registration"**, not "Your people register" (founder).
- Test note: themichaelsteve@gmail.com has an AISC challenge seat, so its homepage keeps the Awakening block by design (sprint-only applies only to people with nothing else with us).

### The contact can take part, registered from the admin (founder, 2026-11-26: "Yes, build it")

Founder: "During VIP account creation, I should be able to register the VIP as a participant automatically if they say they will be part of the sprint during the discovery call. That's easier and less stressful for the VIP."

- **The checklist's last item:** "Will they take part in the sprint themselves? If yes, which department or team?"
- **The VIP account box:** before setup, a tick box "They take part in the sprint" shows their role (from the application) and their department or team; **Set up VIP account** then also registers them. Once the account exists and they are not registered, the box offers **Register them as a participant** with the same fields.
- **What it does** (`lib/officeSprint/contactParticipant.js`): the same registration a participant makes with the code, linked to the contact's account. They count as one of the participants; once a number is set, it is refused when every place is taken; the sprint is confirmed if their registration completes it. No "You're registered" email to them; the "date is set" email adds "You're registered as one of the participants."
- If the account is set up but the registration is refused, the account stands and the box says why.

### Checkpoint 2 live test passed (2026-11-26)

On the live sites, with themichaelsteve@gmail.com as the contact and itschinedum@gmail.com as a participant: application, VIP account and welcome email, the contact's card, scheduling and the "date is set" email with its forward message, registration and the "You're registered" screen and email, the participant's sprint-only homepage and sprint home with Before Monday, the contact registered from the admin (2 of 2, confirmed, "confirmed" emails to the contact and sales@), and a slot change with the "dates changed" email. Test records to be deleted by the founder.

## Checkpoint 3: running the sprint (started 2026-11-26)

Nine steps (founder: "That's 9 steps. For every step we need to be detailed especially the parts where the sprints happen, participants use the tools, we gather and synthesize the data and present to leadership"): 1 the learning center redesign, 2 session links, 3 the participant's days and the five tools, 4 results after closing, 5 attendance, 6 what leadership sees during the week, 7 the admin during the week, 8 the report (gather, synthesize, present to leadership), 9 the Thursday advisory call.

### Step 1: the learning center redesigned on the AICA model (founder: "Look at the AI career apprentice platform for a mental model"; "Yes, build it")

- **Frame** (`components/officeSprint/SprintShell.jsx`, menu from `lib/officeSprint/sprintNav.js`): top bar "Office Sprint · Learning Center", the organization's name and Refresh (also every minute); left menu (a slide-out on phones): Overview; "The sprint" with Monday, Tuesday, Wednesday (title under each, a lock and the opening time until it opens, a tick when its work is done, "Live" during the session) and Thursday · Advisory call · your leadership (shown, not a page); Your results. Bottom left: **Back to dashboard** only (founder's choice).
- **Its own look** (founder: "Its own colour"): `components/officeSprint/sprint.css`, the Labs/AICA rule (one dark, a lighter card, a raised step, hairlines, colour as a small mark). **Slate** (founder, 2026-11-26: "Slate", chosen over aubergine): near-black with the landing page's purple.
- **Overview** (`SprintOverview.jsx`, replaces the old Home): Welcome, the dates and time slot (own time abroad); **one next step** that follows the clock (Before Monday points; Live now with Join the session; Today's work with Go to [day]; work still open after its due time, until everything closes; Done for today with the next opening; all done; closed with See your results); **Your week** (Monday to Wednesday with a tick when the work is done, then Thursday's advisory call); **Your work** (the five tools with Done / In progress / Not started / Opens [day], "N of 5 done").
- **Day page** (`SprintDayView.jsx`): "Day N of 3 · [weekday]" with Live now / Open / Done; the title; the landing page's question; the live session strip with Join the session; **What today covers** (the landing page's words) and **You leave with**; Today's work with "Part N of M" for each tool; links to the other open days. No playback (no replays).
- **Your results** (`/sprint/results`, `SprintResults.jsx`): the five results with **Download PDF** once each is done, during the week and after the sprint closes (closes the gap where results disappeared at closing). The Readiness Scorecard's PDF is rebuilt from saved work by `readinessPdfFromSaved()` in `utils/challenge/ReadinessScorecard.jsx` (an added export; the tool itself is unchanged). Day pages after closing point to Your results.
- Each day's question, teaching and "you leave with" are in `SPRINT_DAYS` (`lib/officeSprint/timeline.js`).

### Step 2: session links set in the admin (founder, 2026-11-26: "Yes, build it")

- **Found:** the set slots read their links from hosting settings named `SPRINT_ZOOM_MORNING`, `SPRINT_ZOOM_EVENING_1` and `SPRINT_ZOOM_EVENING_2`, while the local settings file had `SPRINT_ZOOM_MORNING_1`, `_EVENING_2` and `_EVENING_3`, all empty. No set slot would have shown a link; participants would have read "The link is on its way."
- **Now every sprint carries its own video call link** (`sprint_orgs.session_url`, which the custom time SQL already added), set in the admin's Schedule box: "Video call link (Google Meet), optional until Monday" for a set slot, required for a custom time. A scheduled or confirmed sprint without one shows "No video call link yet" in the drawer and the list. The learning center reads only that link (`lib/officeSprint/staffSprint.js`); the `SPRINT_ZOOM_*` settings are no longer used and can be removed from the hosting.
- Adding or changing only the link sends no email; the contact still hears when the sprint is first scheduled or its date, time or number changes.
- The link shows to registered participants of a confirmed sprint, from 15 minutes before each session until it ends. Google Meet from a personal account asks each person to be admitted; from Google Workspace, Quick access lets them straight in.

### Step 3: the participant's days and the five tools (founder, 2026-11-26)

- **Territory Builder is "Value Creation" in the sprint** (founder: "Territory builder should be Value creation in the sprint"), worded for an organization's people; the AI Stakeholder Challenge keeps its own wording, since the tools share code (sprint mode only). Steps "What gets in the way" and "Choose one"; "What is happening to this work?" with "AI already does it faster", "Changing", "New work AI makes possible"; the position dropdown hidden; the sliders "How much does it cost you?" (hint: "Time, money, mistakes, rework or stress." — founder: speed is not the only pain point), "How well placed are you to help fix it?" and "How clear is the path to the fix?" (founder's wording); "Which one is worth solving first?"; the list reads "Cost · Well placed · Path"; the PDF is titled "Value Creation". The saved data is unchanged, so the report reads it the same way.
- **Readiness Scorecard** (sprint mode): no Readiness Scorecard Worksheet (the sprint has none): "Give each of your three moves a day." and "Keep it to compare with when you take the scorecard again."; the button reads **Download PDF**.
- **Delegation Tool** (sprint mode): the table reads "AI fit" and "Human judgment" instead of "AI" and "HI".
- **Times stay 10, 20 and 30 minutes** (founder's choice), because participants prepare during onboarding.
- **An Onboarding page** (`/sprint/onboarding`, in the menu after Overview; founder: "There will be an onboarding page for this. It'll address participants preparation all in one video"): one video for every sprint (`ONBOARDING_VIDEO` in `lib/officeSprint/onboarding.js`, a YouTube id, empty until recorded, showing "The onboarding video will appear here."), then "Prepare two lists" (the tasks you do again and again, for Monday; what gets in the way of your work, for Wednesday), then the Before Monday points. The Overview's Before Monday card has **Go to onboarding**.
- **Value Creation, refined** (founder, 2026-11-26): "A pain point in your workflow" (not "What gets in the way"); the first step is "Pain points". "What is happening to this work?" starts with nothing chosen ("Choose one (optional)") and offers "Not sure"; left unchosen, a pain point is saved as Unsure and shows "Not sure".
- **The join button has no line under it** (founder: the "Opens 15 minutes before" line is not necessary); its opening time is in its tooltip.
- **The Data Audit, redesigned** (founder: "Yes, apply all", after the critique): "Information 1, 2, 3" instead of "Set A"; a firm warning at the top ("Describe the information. Never type names, phone numbers, amounts or customer details."); per piece of information: **The information** (what it is and what it is used for), then three quick choices the report can count, each with an optional line of detail: **How is it collected?** (Mostly by hand · Partly by hand · Automatically · Not sure), **Where is it kept?** (On paper · Spreadsheets or files on a computer · A shared drive or the cloud · A business system · In people's heads, chats or email · Not sure), **Who looks after it?** (A named person · A team · Nobody · Not sure); **Is it ready for AI?** (Ready · Nearly ready · Not ready · Not sure; "Ready means accurate, in one place, and someone looks after it."); **First step**. Required: the name, the three choices, readiness and the first step. "What I still need to find out" stays optional. The PDF lists each choice, then its detail. Definitions in `lib/officeSprint/work.js` (`AUDIT_CHOICES`).

### Step 5: attendance dropped, completion only (founder, 2026-11-26)

Founder: "what if they all take it together or in chunks in the office, what now happens? Perhaps it's better to drop it from the policy and record only those who finished the tasks." Joining a live session is not recorded: a click on "Join the session" cannot tell who was in the room when people join together. The policy's "Attendance: whether they joined each live sprint and finished each day's work" is now "**Completion**: whether they finished each day's work." Completion is `sprint_work.completed_at`, per person per tool. Who sees it (founder: "You see names, leadership counts"): the admin shows who finished; the contact and the report show only how many finished each day, never who. No database change.

### Step 6: the contact's view during the week (founder, 2026-11-26: "If all is accurate, build it")

Founder: "Each organization know how to mobilize its people. So leave the internal comms to them. When you say leadership view, it's actually the VIP contact's view. Leadership get a presentation on Thursday." So nothing is sent or copied for the contact to remind people.
- **Contact's home panel** (`components/home/SprintPanels.jsx`), from the first session on: a **This week** column in place of the code: "Monday · 14 of 16 finished", "Tuesday · 9 of 16 finished so far" (until its due time), "Wednesday · opens Wed 9 Dec, 5:15 pm WAT", The label reads "Under way", then "Finished"; the status line "Your sprint is under way.", then "Your sprint week has finished. Your leadership hears what it found at Thursday's advisory call." Before Monday it stays as it was.
- **The contact's view-only Overview** in the learning center: each opened day in Your week adds "N of M finished their work"; the next-session card no longer mentions a join link (the contact has none).
- A person has **finished a day** when every tool of that day is complete (`lib/officeSprint/progress.js`, `dayCompletion()`, from `sprint_work.completed_at`). Worked out on the server (`getContactSprint()` adds `week`; `getContactViewSprint()` adds `progress`), so the panel never reads the clock while drawing.
- **Three day tiles at the very top** (founder, 2026-11-26: "a dashboard style of 3 components at the very top so no one can miss it"): from Monday's first session, the contact's home opens with one tile per day (weekday, title, "14 of 16 finished" with a bar, and "Live now", "Due today, 11:59 pm WAT", "Closed" or "Opens [time]"), the current day's tile outlined (`SprintWeekTiles` in `components/home/SprintPanels.jsx`, placed by `StatusHome.jsx`). The sprint panel below no longer carries a week column. The contact's view-only Overview in the learning center opens with the same three tiles (`SprintDayTiles.jsx`). No reassuring footnotes such as "Counts only, never names" (founder: "It explains the obvious and is not relevant").
- **Under the day tiles, two tiles instead of one panel** (founder, 2026-11-26: "consider making the component under the 3 tiles into 2 tiles"): during the week the contact's sprint panel splits into **the sprint** (organization, Under way / Finished, the three steps, the status line, Go to Sprint) and **its week** (dates and time slot, "16 registered", "Thursday · Advisory call with your leadership"). Before Monday it stays one panel.

### Step 7: your admin during the week (founder, 2026-11-26: "Yes build it. Also consider each organization sprint opening as a full page, then other information in side panels")

- **Each sprint opens as its own page**, `/admin/sprint/[id]` (`SprintOrgPage.jsx`), in place of the drawer: a back link to All sprints, the header (organization, applied, dates and slot, stage, participants), a main column that follows the stage, and side panels. Before scheduling the main column is the call checklist and Schedule; once scheduled, Schedule and registration; from Monday's first session, **This week**, with Registration and Edit the date folded. The side holds the Contact (WhatsApp, Call, Copy email), the VIP account, the discovery call (checklist folded once scheduled) and its notes, their application and the status buttons. The panels are the list's own, exported from `SprintRequests.jsx`.
- **This week**: each day's "N of M finished", the current day outlined, and a table of names and departments with Mon · Tue · Wed as Done, Started, Not started or a dash before the day opens (`memberProgress()` in `lib/officeSprint/progress.js`; `adminWeek()` in `lib/officeSprint/adminWeek.js`). Names are for the admin only.
- **Download all work** (`/api/admin/office-sprint/work-export?id=`, admin only, `lib/officeSprint/workExport.js` with exceljs): one workbook per sprint with sheets People (each tool's status), Delegation Tool (one row per task), Readiness Scorecard (the six area scores out of 20, strongest, start here), Data Audit (one row per piece of information, choices and detail), Value Creation (one row per pain point, the chosen one marked), My AI Policy (one row per person). Unfinished work is included and marked.
- **The list** shows "Mon 3 · Tue 2 · Wed –" for a sprint under way, and opens each sprint's page. The registration box says "Confirmed: [date]" instead of "Deadline: Confirmed …".

### Step 8: the report — plan agreed (founder, 2026-11-26: "The plan is good")

Founder's choices: themes are **suggested by AI, then edited by the founder** (answers sent without names; the policy adds one line saying so); leadership gets a **presentation on Thursday, then a PDF**; the contact finds the report **on their dashboard once released**; and "don't limit what you can do to the sample report… If there's something worth reporting or an insight worth extracting, add it".

**The discovery call brief** (founder: "extract the company objectives and needs from the discovery call so we can also align the strategic next steps to it"): on the sprint's admin page the founder **pastes or uploads the call transcript** (.txt, .docx or .vtt from Google Meet); an agent extracts a brief (why now, objectives, what they want to achieve, what they tried, teams, AI use today, constraints, who joins Thursday, how they will judge success); the founder edits and saves it. **Only the brief is kept**; the transcript is read once and not stored. The brief opens the report as **"Discovery highlights"** (founder, 2026-11-26: 'Instead of "What you told us", "Discovery highlights"'), findings point back to the objectives they serve, and the three moves are framed against them.

**The report's pages:** Discovery highlights · At a glance · Where AI fits (plus tasks named in more than one team) · Readiness (plus where people disagree, and the statements most rated 1 or 2) · Your data (plus collected by hand, and the riskiest information) · Where value is (plus what people think is happening to their work, "Not sure" share) · Governance (plus the rules nobody wrote) · Pilot candidates (pain points chosen first that match tasks to hand to AI, with ready or nearly ready information) · What it means (three moves). Protections on every page: teams under 5 fold into "Other"; themes and counts only; "from N of M" on each page; under 5 answers shows "Too few answers to show".

**Built in parts:** 8a the call brief (and the one database change for the brief, the report and its release); 8b the numbers; 8c the themes; 8d the three moves; 8e the presentation and PDF; 8f release to the contact and the report on their dashboard.

#### 8a built (2026-11-27): Discovery highlights

- **On the sprint's admin page**, a "Discovery highlights" panel in the main column (after the call checklist before scheduling; after registration once scheduled; under This week during the sprint). Before any brief: paste the transcript or upload a .txt, .vtt or .srt file, then **Draft the highlights**, or **Write them by hand**. A Word or Google document is copied and pasted (no Word reader was added). The draft opens for editing with "A draft. Check each part against the call, then save."; once saved it reads as a short list with **Edit**.
- **Ten parts:** Why now · Their objectives (one per line) · What they want from the sprint (one per line) · How they use AI today · What they have tried · Teams taking part · Constraints and sensitivities · How they will judge success · Who joins Thursday · Anything else. Rules in `intelligence/src/lib/officeSprint/callBrief.js`.
- **The draft** is written by Claude (`claude-opus-5-5`, through the official Anthropic SDK, added to intelligence's `package.json`) in `lib/officeSprint/extractBrief.js`. It writes only what the call says, leaves a part empty if it was not discussed, uses roles instead of staff names, and leaves out phone numbers, emails, amounts and the sprint's own logistics. Tested on a made-up call: about 8 seconds; the head of finance's name and the phone number were left out. Key: `OFFICE_SPRINT_ANTHROPIC_API_KEY` if set, else the existing `TERRITORY_BUILDER_ANTHROPIC_API_KEY`.
- **The transcript is never stored**: it goes to the AI service for that one request; only the brief is saved (`call_brief`, `call_brief_at`). API: `POST /api/admin/office-sprint/brief` drafts, `PATCH` saves; admin only.
- **Database change, run by the founder:** `SPRINT_REPORT_SQL` in `lib/officeSprint/schema.js` adds `call_brief`, `call_brief_at`, `report`, `report_built_at`, `report_released_at` to `sprint_orgs`. Until it runs, the sprint page shows a Copy SQL banner and no panel.
- **The policy** (`aisc/src/app/policy/office-sprint/page.js`, approved 2026-11-27, last updated 27 November 2026) names Anthropic under "Who else handles your data": its AI service drafts a summary of the discovery call from its transcript and groups people's answers into themes for the report; it receives answers without names, and everything it drafts is checked and edited.
- Screens: `aisc/screenshots/office-sprint/checkpoint3/brief-*.png`, `policy-anthropic-line.png`.

#### 8b built (2026-11-27): the numbers

- **Everything on the report that can be counted**, worked out from `sprint_work` in `intelligence/src/lib/officeSprint/reportNumbers.js` (pure, checked with stand-in sprints) and read on the server by `reportData.js`. Only **finished** work counts.
- **At a glance:** share of tasks that could go to AI, where readiness should start, pieces of information nobody looks after; registered, finished each day, all three days. (The shared pain point waits for the themes, 8c.)
- **Where AI fits:** tasks per quadrant (Automate, Augment, Streamline, Own), tasks per person, share that could go to AI, and the same by team.
- **Readiness:** the six areas out of 20, lowest first, "Start here" and "Strongest" (ties settled on the exact averages); the three statements most often answered "No" or "Not yet"; up to three where people disagree (at least two on each side); where each team should start.
- **Your data:** pieces described; ready, nearly ready, not ready, not sure; nobody looks after; collected wholly or partly by hand; not ready with no one known to look after it; where it is kept.
- **Where value is:** pain points and per person; what is happening to the work, for every pain point and for the one each person chose first; the "Not sure" share; the chosen ones' average cost, well placed and path to the fix.
- **Governance:** how many wrote their own policy (the rules, and the rules nobody wrote, are themes: 8c). **Pilot candidates** need the themes too.
- **The protections, applied in the numbers themselves:** fewer than 5 answers on a page shows "Too few answers to show"; every page says "from N of M"; teams under 5 people fold into "Other", and if "Other" is still under 5 the smallest team joins it; **team rows show only when every team has 5 or more answers on that page**, because otherwise a small team's figures could be found by taking the others from the total.
- **On the sprint's admin page** from Monday, under This week: "The report so far" during the week, "The report" once it closes. **Restyled the same day** (founder: "The report is hard to read. The design should be properly displayed for comprehension and the styling needs to resemble that of the sample report on the sprint landing page. White background"): the organization's own report in the landing sample's design, `intelligence/src/components/officeSprint/report/SprintReport.jsx`. One white window, its pages as tabs (Discovery highlights when a brief is saved, At a glance, Where AI fits, Readiness, Your data, Where value is, Governance, Pilot candidates, What it means), each page a source line ("Sprint 2 · from 19 of 19"), one finding as its headline, and the sample's charts: team dots and finished bars, the quadrant ring and team bars, the readiness hexagon and ranked list, a square per piece of information, the zone bars. Added beyond the sample: the readiness statements most answered "No" or "Not yet" and where people disagree; what people think is happening to their work; the chosen pain points' averages. Pages that need the themes or the moves say so. "Who joins Thursday" stays out of the report. The same component will serve the presentation (8e) and the contact's dashboard (8f). The readiness statements moved into `utils/challenge/readinessDimensions.js` (the Readiness Scorecard reads them from there; nothing changed for participants).
- Screens: `aisc/screenshots/office-sprint/checkpoint3/report-*.png` (each page, too few answers, phone).

#### 8c built (2026-11-27): the themes

- **What is grouped:** the tasks (Monday), the information (Tuesday), the pain points and the rules in people's own AI policies (Wednesday), from finished work only.
- **How:** each answer becomes an item with an id and its text, with no name, role or email, and with obvious emails and phone numbers taken out (`intelligence/src/lib/officeSprint/themeItems.js`). Claude (`claude-opus-5-5`, `lib/officeSprint/draftThemes.js`) only sorts ids into themes and names each theme, four calls at once, and suggests up to three **rules nobody wrote**. (Pilot candidates were drafted here at first; on 2026-11-27 they moved into the opportunities, 8d.) **Every count is worked out from the ids, never by the AI.** Tested on a made-up sprint of 16 (236 answers): about 30 seconds.
- **The founder edits** in a **Themes** panel on the sprint's admin page, above the report: rename, **merge into** another theme, remove, open the answers behind each theme, edit the rules nobody wrote. A theme with fewer than **2 people** shows "not shown" and stays out of the report. **Draft again** starts over. Saved in `sprint_orgs.report.themes` (`POST` drafts, `PATCH` saves: `/api/admin/office-sprint/themes`, admin only).
- **In the report:** At a glance gains "N of M want the same problem solved first"; Where AI fits gains the tasks most often placed in Automate and those named in more than one team (only when teams are shown); Your data gains the riskiest information (not ready, or no owner known); Where value is gains the sample's table of pain points (named it, want it solved first, "Top pick") and its headline names the top one; Governance gains the rules with their share and "Split: worth settling together" under half, and the rules nobody wrote.
- Screens: `aisc/screenshots/office-sprint/checkpoint3/themes-*.png`.

#### 8d built (2026-11-27): the next steps, in two sets

How it got here, the same day:
1. First built as three moves.
2. Founder: "The draft shouldn't always follow the order of work. It should have the freedom to recommend what really is the next step... Imagine if the company needs an internal tool to help them manage their data better... They miss out on that because of my order of work." And: "3 is a bit too small. Maybe narrowed to the best three, but the initial solutions should be substantial." So the draft became free, with 8 to 10 substantial options.
3. Founder: "If there are more than 3 valuable solutions, leadership should know about them. A next step like training will be non negotiable... the results are of two parts. True next steps that if not taken can harm adoption and make it fail. Then value creation solutions." Critiqued, then "Build it".

What was built:
- **Foundations (2 to 4):** the steps adoption depends on. The test: skip it and adoption stalls or fails. **Training is always one**, shaped by what the findings show people are missing; the others come only from the evidence. Each has what to do and how to start, **the finding behind it** (with the count), and **what fails if it is skipped**, so "non-negotiable" is earned by the evidence and does not read as a sales pitch.
- **Opportunities (up to 8, strongest first):** solutions that create value, of any kind (internal tool, process, data, pilot, customer, people, partner), ranked by the evidence (how many named the problem, how many want it solved first, how ready the information is, the objectives). Each says what to do, the value with the counts and how to start, its kind, the objective it serves, and **what it needs first**: "Ready to start" or "After Foundation N". All valuable ones are shown; the founder can hide any.
- **Pilot candidates folded into Opportunities**: every pilot is an opportunity. The separate pilot step left the themes (8c) and its report page went.
- **The report now ends:** 8 Foundations ("3 steps your adoption depends on.", dark blue cards with "Why" and "If it is skipped") and 9 Opportunities ("7 opportunities, strongest first.", numbered, with kind, "Ready to start" or "After Foundation N", and "Serves").
- **A "Next steps" panel** on the sprint's admin page, under Themes, in two parts: edit, reorder, add or remove foundations; edit, reorder, hide, add or remove opportunities, choose what each needs first and the objective it serves. Removing a foundation frees the opportunities that needed it. **Draft again** starts over. Saved in `sprint_orgs.report.next` (`POST` drafts, `PATCH` saves: `/api/admin/office-sprint/moves`, admin only). Rules in `intelligence/src/lib/officeSprint/moveRules.js`, the draft in `draftMoves.js` (Claude `claude-opus-5-5`), the panel in `NextStepsPanel.jsx`.
- **What the draft reads and never writes:** it reads the report's counts and themes and the call brief, never anyone's answers, never "Who joins Thursday". It never writes prices, fees, dates, durations, a person's name, or a product or vendor recommended by name (the organization's own tools, like WhatsApp, may be named). An objective must match the brief word for word or it is left empty.
- **Tested** on the made-up sprint, about 33 seconds: three foundations (training to split tasks for AI; one shared AI policy, with client data kept in the country as the bank contracts require; owners for client, contract and payment information) and seven opportunities (the WhatsApp bookings pilot, payment matching, a month-end and board pack routine, a dispatch training guide as an internal tool, the tracking software as the single source, client delivery updates, one owned record of client rates).
- **Foundations are general challenges, and AI Fluency is full training** (founder, 2026-11-27: "The foundational training can't still repeat what we did in the sprint. It has to be a full AI Fluency training. I'll be the judge is it will involve the AISC full program, AICC for C-suite or something else. It's important to note that the office sprint cannot transfer the full knowledge to staff to conclude that they have been trained. They still need AI Fluency, platform awareness and hands-on experience in AI environments. Also, we can't name tasks as foundational activities. We have to name the general challenge... AI Fluency... AI Governance... Data Audit."):
  - A foundation is named as the general challenge, chosen from AI Fluency, AI Governance, Data Audit, AI Readiness, Leadership Alignment, Change Management and Process Clarity (the panel suggests these and allows another). Its text says what addressing the challenge involves, in general terms, never a list of tasks.
  - **AI Fluency is always first** and is described as full training: using AI effectively, efficiently, ethically and safely, awareness of the platforms that fit their work, and hands-on experience in AI environments. The draft says the sprint trained no one and never names a programme for it: which one is the founder's call.
- **The AI Stakeholder Challenge is recommended when it addresses 2 or more foundations** (founder: "You don't have to recommend AISC, but when there are at least 2 issues in the foundations that AISC solves, I recommend that"). Worked out by code, not by the AI: AISC addresses **AI Fluency** (Day 1, then hands-on in Labs after Day 7), **AI Readiness** (Day 2), **Data Audit** (Day 2's Data Readiness Audit) and **AI Governance** (Day 7), from `aisc/agent-guides/AISC_BRIEF.md`; the founder may correct this list (`FOUNDATIONS` in `moveRules.js`). The Foundations page then ends with "Recommended: The AI Stakeholder Challenge. It addresses 3 of these foundations: AI Fluency, AI Governance and Data Audit." The panel can switch it off; with fewer than 2 it says why it is not recommended. No fees anywhere.
- Tested again the same day, about 36 seconds: AI Fluency, AI Governance, Data Audit and Process Clarity; AISC recommended for three of them; seven opportunities.
- **Still to do:** the landing page's sample report (aisc, `OfficeSprintReport.jsx`, `lib/officeSprintSample.js`) still ends in "three moves"; it should show Foundations and Opportunities so the promise matches what organizations receive.
- Screens: `aisc/screenshots/office-sprint/checkpoint3/next-*.png`.

#### 8e built (2026-11-27): the presentation and the PDF

- **Present** (on the sprint's admin page, beside the report) opens `/admin/sprint/[id]/report`: the report as slides for Thursday's call, one at a time, 16:9, scaled to the screen, above the admin frame. Arrow keys, Page Up and Down, Home and End move between slides; **Full screen** (or the F key); **Back to the sprint**.
- **The slides** are the report's own pages in the same design, with a cover (the organization, "The report and advisory", the sprint dates, Michael Steve Clarity Studio). Long pages are split so nothing scrolls: Discovery highlights (what you want; what we heard), Readiness (the scores; the statements behind them), Your data (the squares and where it is kept; the riskiest information), Where value is (the pain points; what people think AI is changing), Governance (their rules; the rules nobody wrote), **one foundation per slide**, then the AISC recommendation on its own slide ("One programme addresses 3 of your foundations."), and **two opportunities per slide**. The made-up sprint gives 22 slides, none overflowing (checked by measuring every slide).
- **Download PDF** (on the admin page, or in the presentation) prints the same slides through the browser's Save as PDF, one slide per page at the slide's own size, with the file named `[Organization]_Office-Sprint-Report`. The design, the charts and the colours stay exactly as on screen, and the text can be selected and searched. No new software: chosen over redrawing every chart in the PDF library, which would drift from the design.
- **In the report, the brief speaks to them:** "Your objectives", "What you want from the sprint", "How you use AI today", "What you have tried", "How you will judge success" (the admin panel keeps the brief's own labels).
- Code: `intelligence/src/components/officeSprint/report/SprintDeck.jsx` (the presentation and print), `reportSlides()` in `SprintReport.jsx` (the slides, from the same pages), `app/(principal)/admin/sprint/[id]/report/page.jsx`.
- Screens: `aisc/screenshots/office-sprint/checkpoint3/deck/slide-*.png` and the sample `Harbourline-Logistics_Office-Sprint-Report.pdf` beside them.

#### Decisions for 8f and after (founder, 2026-11-27)

- **No automatic emails for reports.** "There will be no automatic emails for reports. I send them myself when I'm very sure and definitely after the Thursday meeting. Leadership sees it first on the call." So 8f releases nothing by email: the founder sends the PDF himself, and anything shown on the contact's dashboard appears only when he releases it, after Thursday.
- **Title font: Newsreader, in sentence case** (founder, 2026-11-27: "This doesn't befit an executive briefing. The title fonts don't work and we might have to extend that site wide if the change works"). Researched first: executive publications set headlines in a serif with character, in normal case, over a quiet sans (McKinsey's own serif Bower against a clean sans; the FT's Financier Display). Eight options were shown on the same report slide (`aisc/screenshots/office-sprint/checkpoint3/fonts/`); the founder chose Newsreader, which his series already uses in italics. Applied to the report and the slides only (titles, cover, big numbers; body text unchanged), loaded in `intelligence/src/app/layout` as `--font-newsreader` (class `font-newsreader`). **Site wide comes later**, once it has proven itself here.
- **The executive-report look** (founder, 2026-11-27: "we need to make the report look like a McKinsey report. Better background etc. Do your research."). Researched: no official McKinsey slide guide is public; their identity is deep blue against clean white with brighter blue used sparingly for key insights, and consulting-training sources agree on action titles, exhibits with a plain title and unit, a source line at the foot, sharp corners, hairlines and white space. Applied in our own brand colours, not theirs:
  - **Slides:** a small section tracker at the top (the page name, in blue, with the organization on the right); the finding as the action title in Newsreader; **"Exhibit N"** with the chart's plain title and unit above every chart; a **source line** at the foot ("Source: AI Stakeholder Office Sprint, [organization]. Sprint 2 · from 16 of 16.") with Michael Steve Clarity Studio and the page number.
  - **Cover:** deep blue with fine line art (faint arcs), the organization in Newsreader, a short rule, "The report and advisory", the dates.
  - **Data:** one blue scale in brand tones (deep `#00034c`, strong `#2c37c4`, mid `#7f86e3`, light `#c6c9f3`, grey for "not sure"); the deepest blue marks the point a chart makes (for example "Not ready"). Sharp corners on every card, bar and chip; hairline rules; panels in a neutral light grey.
  - **Foundations:** open numbered sections under a thick deep-blue rule, with "Why" and "If it is left unaddressed" side by side; the AISC recommendation as a panel with a deep-blue left edge.
- **8f built: releasing the report** (founder: "Releasing the report has to be made by admin at a time suitable (Mostly after the Thursday leadership call)"):
  - On the sprint's admin page, above the report: **"Release to [contact]"** once the sprint week has closed (before then it says it can be released once the week has closed). It asks to confirm, says no email is sent, and needs the contact's VIP account. Once released: "Released to [contact] on [date]" and **Withdraw**. `POST /api/admin/office-sprint/release`, admin only, sets `report_released_at`.
  - **No email**, ever, for reports.
  - **The contact's dashboard**: after release the sprint card reads "Your report is ready: the same slides your leadership saw at the advisory call." with **Open your report**, which opens `/sprint/report`: the same slides, with Download PDF and "Back to your dashboard". Only the organization's contact can open it, and only once released; participants do not see it (their leadership shares it).
  - The report is shown live from the saved work, themes and next steps, so an edit after release shows at once; withdraw first if a change needs care.
  - To check in the live test: the signed-in contact opening `/sprint/report`.
- Screens: `aisc/screenshots/office-sprint/checkpoint3/deck/` (restyled slides and PDF) and `release-*.png`.
### Step 9 built (2026-11-27): Thursday's advisory call

Founder's choices (2026-11-27): the contact learns the time **on their dashboard only, no email**; their card offers **Add to calendar** to forward to their leadership; the founder **pastes the call link**; after the call he marks it **held, with private notes**. No database change: the call is kept in `sprint_orgs.report.advisory` (`intelligence/src/lib/officeSprint/advisory.js`).

- **Admin, "Thursday advisory call" panel** on the sprint's page (from scheduling on; during the week right under This week): the time in WAT (it starts on the sprint's Thursday at 10:00 until saved; "Not set yet. Agree the time with the contact, then record it here"), the call link, **Save the call**; **who from leadership is joining** (the questionnaire's answer and the discovery highlights); **Present**; after the call **Mark as held** (Undo) and **Notes from the call (private)**. `PATCH /api/admin/office-sprint/advisory`, admin only; only `https://` links.
- **The sprints list** shows "Advisory call Thu 26 Nov, 10:00 am WAT" (and "· held") under the dates, or "Advisory call not set" in amber for a sprint under way.
- **The contact's week tile**: "Advisory call with your leadership, 30 minutes", the time in their own time when abroad (for example "4:00 AM in New York") with WAT beneath, **Join the call** and **Add to calendar** (a calendar file: 30 minutes, "AI Stakeholder Office Sprint: advisory call", the link). Before a time is set it keeps "Thursday · Advisory call with your leadership". Once held, it reads "Advisory call, held", and the card says "Your advisory call is done. Your report appears here once it is released." The founder's notes never reach the contact.
- Participants still see only "Thursday · Advisory call · your leadership" in their menu.
- Screens: `aisc/screenshots/office-sprint/checkpoint3/advisory-*.png`.
- **Checkpoint 3 is built (steps 1 to 9).** Next: the live test of checkpoint 3, then the founder pushes (Intelligence first). The founder ran the report SQL on 2026-11-27. Still owed before the live test: the ONBOARDING_VIDEO id.

### The landing page's sample report updated (2026-11-27)

The sample report on `/office-sprint` (Alder Lane Co.) now ends as the real report does: **"What it means" (three moves) is replaced by two pages**, built from the sample's own figures (`aisc/src/lib/officeSprintSample.js`, `src/components/office-sprint/OfficeSprintReport.jsx`):
- **Foundations**: "Three foundations your adoption depends on." AI Fluency (full training: "Three days of sprints train no one"), AI Governance (13 of 14 rule out customer details, yet nobody said which tools are allowed) and Data Audit (9 of 31 data sets have nobody answering for them; Data Governance 7 of 20), each with "Why" and "If it is left unaddressed"; then "Recommended: the AI Stakeholder Challenge. It addresses all three foundations: AI Fluency, AI Governance and Data Audit." Not numbered, because they are not a sequence.
- **Opportunities**: "Four opportunities, strongest first." The WhatsApp orders pilot (after AI Governance), matching payments to invoices (after Data Audit), one shared stock record (an internal tool, ready to start), and confirming orders to customers (after AI Governance).
- The sample keeps the landing page's own look (PT Sans Narrow titles): the site-wide font change waits until Newsreader has proven itself in the report. Screens: `aisc/screenshots/office-sprint/checkpoint3/landing-*.png`.

### The landing page rebuilt in the report's style (2026-11-27)

Founder: "Remove the recommended part in the report in the landing page sample report and rebuild the landing page and report in the new Mckinsey style we adopted for the report."
- **The AISC recommendation is gone from the sample report** (the real report still recommends AISC by its rule).
- **The whole `/office-sprint` page and its sample report** now follow the report's look:
  - **Titles:** Newsreader in sentence case, loaded on this page only (`src/app/office-sprint/page.js`, class `os-serif` in `sprintMotion.css`).
  - **Labels:** short, in strong blue `#2c37c4` and sentence case, in place of the spaced-out capitals.
  - **Shape:** square corners on every card, panel, chip and button (`!rounded-none` on the shared Button here only), and thin rules instead of shadows on the day cards.
  - **Colour:** the radial glows are gone; the hero takes the report cover's faint arcs (`Arcs`). The Days section is light grey instead of lilac. The sample's data moved to the blue scale (Automate deep to Own light; "Not ready" deep).
  - **Sample report:** a source line at the foot of each page ("Source: AI Stakeholder Office Sprint, Alder Lane Co. Sprint 1 · 112 tasks.").
- **Left as they were:** the header wordmark (its button is now square too), all copy, and the page's motion.
- **Site wide:** the rest of aistakeholderchallenge.com keeps PT Sans Narrow until the founder decides.
- Screens: `aisc/screenshots/office-sprint/checkpoint3/landing-page-*.png` (desktop) and `landing-page-phone-*.png`, and `landing-*.png` for the sample report's pages.

### The landing page redesigned, second pass (2026-11-27)

Founder: "One thing is sure, all the former headlines and titles with the condensed fonts have to go. The font shouldn't be displayed anywhere. We will gradually roll this out AISC wide. Also use your experience to redesign based on the new mental model. I want to see more interesting backgrounds in the Mckinsey style."
- **No narrow font anywhere on `/office-sprint`:** the header wordmark is now "AI Stakeholder **Office Sprint**" in Newsreader; a page rule (`.os-page`) sets every h1 to h4 and summary in Newsreader over the site's PT Sans Narrow rule; the shared `FAQAccordion` takes a `questionClassName` (the other pages keep their default until the site-wide rollout). Checked by reading the computed font of every text element: none left.
- **Backgrounds** (`src/components/office-sprint/Backdrops.jsx`): faint **arcs** from a corner (hero, the custom strip), flowing **contour lines** (hero, the sprint-week panel, the report band), a fine **dot grid** on the light-grey sections (the three sprints, who it is for), and a **deep-to-strong blue gradient** (`DEEP_BAND`) under the dark bands. No glows.
- **Rhythm:** deep hero → white "What changes" → grey with dots "The three sprints" → white schedule with the deep week panel → deep report band → white "Who runs it" (a deep rule beside the name) → grey with dots "Who it is for" → a deep "Need something custom?" band with arcs and a white button → white FAQ.
- **Details:** the pale 1, 2, 3 numerals are gone; each day card reads "Sprint 1, Monday" over a deep top rule. "What changes" has a deep rule over the table, "Today" in grey and "After the sprint" in strong blue, and the problems in Newsreader. The steps in "How it starts" are deep squares. The header button is white and square.
- Screens: `aisc/screenshots/office-sprint/checkpoint3/landing-page-*.png` and `landing-page-phone-*.png`.
- **Next for the site:** roll the same look out across aistakeholderchallenge.com, page by page, when the founder says.
- **The live test of checkpoint 3 is postponed** (founder, 2026-11-27: "We need to postpone this test for later"). Open when it resumes: 5 participants with Gmail + addresses so the report shows real numbers, or 2 for the flows only; a custom-time week so no public slot is taken.

- **Wording comes later.** "Later we'll work on the right wordings for the report content header, titles and other areas."
