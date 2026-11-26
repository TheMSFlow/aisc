# Intelligence Center: what a signed-in person sees today, and a plan for one simple dashboard

*Review made 2026-11-26 from the code in `intelligence/` as it stands (uncommitted work included). Nothing was changed. This is the input for step 6 of the Office Sprint plan ("the leader and VIP homepages", `OFFICE_SPRINT_PLAN.md`), widened to every status.*

Scope: everything a person meets after signing in at intelligence.michaelsteve.com, up to the door of each learning area. Inside the AISC Learning Center, Labs and the Sprint learning center is out of scope; the admin area is out of scope; the AI Career Apprentice is out of scope because its participants sign in separately (email and phone digits, no account).

---

## 1. How someone lands

1. They sign in at `/login`. `src/proxy.js` reads their row in `users`.
2. Blocked: back to `/login?blocked=1`. Under review: `/review`. No status: `/login`.
3. Otherwise they go to the one home for their status, and **can open only that home**:

| Status | Home | Who has it |
|---|---|---|
| leader | `/leader` | Approved leaders, AISC challengers, Office Sprint staff |
| sponsor | `/sponsor` | Communities hosting a sponsored Awakening |
| vip | `/vip` | VIP briefing seats, Office Sprint contacts |
| vvip | `/vvip` | Priority Access (invited by hand) |
| chief | `/chief` | AICC clients |
| principal | `/admin` | The admin email only |

4. From any home, three areas open to every signed-in person whatever their status: `/challenge` (AISC Learning Center), `/labs`, `/sprint`. Each checks for itself whether the person belongs there.

So a person's home is chosen by **one** status, but what they actually have (a challenge seat, a sprint, a VIP briefing, Labs access, a sponsorship) is held in separate tables and can be any mix. That gap is the root of the scatter.

---

## 2. Every touchpoint, and when it shows

There are three places information appears: the **header** (always on screen), the **menu** (behind the three-line button) and the **page body**.

### 2.1 Header

| Piece | Leader | Sponsor | VIP | VVIP | Chief | When it shows |
|---|---|---|---|---|---|---|
| Logo "Intelligence Center" (goes to `/`, which sends them home) | ✓ | ✓ | ✓ | ✓ | ✓ | Always |
| **Labs** button | ✓ | ✓ | ✓ | hidden in code | ✓ | Only where Labs is live (not in production yet). On click the server decides: go into Labs, or a pop-up saying when Labs opens / starts, or the AISC offer with prices |
| **Challenge Access** button | ✓ | ✓ | ✓ | hidden in code | hidden in code | Always drawn. On click: a challenge seat → into the Learning Center; no seat → pop-up with AISC pricing. A pulsing dot and a "This is where you access…" note show the first time a challenger has not yet gone in |
| Three-line menu | ✓ | ✓ | ✓ | ✓ | ✓ | Always, except sprint-only people |
| "Hello, name" / Sign out | inside the menu | **nowhere** | **nowhere** | **nowhere** | inside the menu | Sprint-only people see it in the header instead of everything else |

### 2.2 Menu (the three-line button)

The same button opens something different for each status:

| Status | What the menu opens |
|---|---|
| Leader | A full-screen panel: "Join the top 1% governing AI in their Industry", an **AICC** advert linking to aiclarityforchiefs.com, and sign-out at the foot |
| Sponsor | The whole **Sponsor Dashboard** (see 2.4), no sign-out |
| VIP | The whole **VIP Dashboard** (see 2.4), no sign-out |
| VVIP | The whole **VVIP Dashboard**: three offers with prices and the priority phone line (see 2.4), no sign-out |
| Chief | The same AICC advert the leader sees, a **"Your VIP Briefing"** card if they hold a VIP seat (opens the briefing full-screen), sign-out at the foot |
| (the `/article` page) | A different panel again: an **AISC** advert, sign-out at the foot |

### 2.3 Page body (the home itself)

Top to bottom, in the order drawn:

**Leader `/leader`**
1. Office Sprint card for staff (`SprintStaffCard`) if they are registered in a sprint. Fetched in the browser after the page loads.
2. "EXECUTIVE BRIEFING 01 · The Awakening: AI and the Next Layer of Leadership", with **Read The Article** and **Request A Private Briefing**.
- *Sprint-only* (a sprint, and no challenge seat or VIP seat): the staff card alone, header reduced to logo and sign-out.

**Sponsor `/sponsor`**
1. Staff sprint card (if registered).
2. The same Awakening block, with **Read The Article** and **Sponsor Briefing**.
3. A note: "Click the Menu button to access your dashboard and resources".

**VIP `/vip`**
1. Staff sprint card (if registered).
2. Contact's Office Sprint card (`OfficeSprintCard`) if they are the contact for a sprint: three steps, link, code, Go to Sprint.
3. The Awakening block, with **Read The Article** and **Request A Private Briefing**.
4. The same "Click the Menu button…" note.
- *Sprint-only*: the contact's card alone, header reduced to logo and sign-out.

**VVIP `/vvip`**
1. Staff sprint card, then contact sprint card (if any).
2. The Awakening block with **Read The Article** only (a different article, `/article-vvip`).
3. "Click the Menu button to access your VVIP privileges".

**Chief `/chief`**
1. Staff sprint card, then contact sprint card (if any).
2. "Welcome Chief! Your onboarding will begin shortly." Nothing else, at any time.

### 2.4 The dashboards inside the menus

**Sponsor Dashboard** (loads in the browser from `sponsor_groups`, `sponsees`, `challenge_groups`, `challengers`, `aisc_payments`)
- No sponsorship found: "No Active Sponsorship", then the VIP briefing block if they hold a VIP seat.
- Otherwise: name and logo; **A** the Awakening briefing (date, time, venue; "not scheduled" / upcoming / past); **B** attendance (registered, seats left, limit), only once a date is set; **C** onboarding checklist (read The Awakening, read the Convener Brief), ticked as read; **D** partnership: an "Activate Partnership" button if not opted in, otherwise payment link, cohort figures, revenue share progress to 20 paid, earning tiers; then the VIP briefing block if they hold a seat.

**VIP Dashboard** (from `/api/vip/briefings`, plus `challengers` and `challenge_backdoor` in the browser)
- No briefing: "Your private briefing is not yet scheduled", Read The Awakening, Briefing Readiness.
- Otherwise, per briefing: date, time, venue; participants; checklist (The Awakening, Briefing Readiness). **D "AISC Registrations"** (slots, filled, by package, masked names) only for someone who sponsored a backdoor cohort.

**VVIP Dashboard** (all fixed text): how access works; A Private Briefing; B AISC in three days, $1,099 / ₦1,350,000; C AICC with Full Program, Council and VVIP Mastermind prices; the priority line (phone and email); then the VIP briefing block if they hold a seat.

### 2.5 The doors out, and the ways back

| Area | Reached from | Way back home |
|---|---|---|
| AISC Learning Center `/challenge` | Challenge Access button only | Profile icon in the Learning Center |
| Labs `/labs` | Labs button only (when live) | Home icon in the Labs top bar |
| Sprint `/sprint` | Sprint cards on the home body | "Dashboard" link |
| The Awakening article `/article` | Home body, Sponsor and VIP checklists (opens a new tab) | Logo. The page carries a **different** header and menu from the person's own (AISC advert, Challenge Access) |

---

## 3. What is wrong with it

1. **Sponsors, VIPs and VVIPs cannot sign out.** Their menu shows a dashboard and has no "Hello / Sign out". Leaders and Chiefs can, but only at the foot of the full-screen menu.
2. **The dashboard is hidden behind the menu button.** For Sponsor, VIP and VVIP the real content (their briefing, their figures, their offers) is in the menu, and the home page has to tell them, in a note, to click the menu to find it. The page they land on is the least useful part.
3. **The menu means four different things**: an AICC advert (leader, chief), an AISC advert (article page), a full dashboard (sponsor, VIP, VVIP), and a briefing launcher (chief). Nobody can learn what the button does.
4. **The home page body is the same Awakening block for nearly everyone**, with a different button each time (Request A Private Briefing, Sponsor Briefing, none). The founder decided on 2026-11-22 that the private briefing comes off the homepages, leader to chief (Office Sprint step 6). Not done yet.
5. **What a person has is spread across three places.** Example: a sponsor who is also an AISC challenger and a sprint participant gets the sprint as a card on the page, the challenge as a header button, and the sponsorship in the menu. Nothing on screen says "here is everything you have with us".
6. **The header buttons look the same for people with and without access.** Challenge Access is drawn for everyone; for someone with no seat it opens a pricing pop-up. The Labs button will do the same when Labs goes live. People with a seat and people without see the same thing until they click.
7. **VVIP and Chief cannot reach the Learning Center from home.** Both buttons are commented out for VVIP, and Challenge Access for Chief. A VVIP leader runs the AISC in three days in the Learning Center, so they have to know the address.
8. **The leader's menu advertises AICC.** Leader-facing work has pointed to AISC since 2026-11-02, and AICC is not the focus. The Chief's menu also advertises AICC to people who are already AICC clients.
9. **The VIP briefing appears in four different frames**: its own dashboard (VIP), a section at the foot of the Sponsor and VVIP dashboards, and a full-screen overlay launched from the Chief's menu.
10. **The Chief home is a placeholder** ("Your onboarding will begin shortly") with nothing behind it.
11. **The page builds itself piece by piece.** Each card and button fetches its own data in the browser after load (sprint card, Labs check, briefings, sponsor data), so cards appear late and the layout jumps.
12. **Words differ for the same thing.** "Dashboard" is the menu panel on VIP but the home page in the Sprint's back link; the header says "Intelligence Center", the Learning Center "AISC Learning Center", Labs "AISC Labs".

**Found on the way, outside the redesign** (to log separately, not part of this plan):
- `/article-vvip` is not in the `proxy.js` matcher, so no sign-in is checked for it (`/article` is checked). Anyone with the address can read the VVIP article.
- "Activate Partnership" on the Sponsor Dashboard waits two seconds for show and then writes the opt-in straight from the browser.
- Prices are typed into the VVIP and Sponsor dashboards. They match `SOURCE_OF_TRUTH.md` today, but they will not follow a price change on their own.

---

## 4. Proposed: one dashboard for everyone, built from what the person has

**The idea in one line:** every status lands on the same dashboard layout, and what fills it is decided by what the person actually has, not by their status alone.

```
┌───────────────────────────────────────────────────────────────┐
│ [logo] Intelligence Center                    Hello, Ada  ▾   │  ← one header for all; ▾ = Profile, Sign out
├───────────────────────────────────────────────────────────────┤
│ Good morning, Ada                                             │
│                                                               │
│ RIGHT NOW  (only when something is due)                       │
│ ┌───────────────────────────────────────────────────────────┐ │
│ │ Your Office Sprint session is live          [Join now →]  │ │
│ └───────────────────────────────────────────────────────────┘ │
│                                                               │
│ YOUR PROGRAMS  (a card only for what they have)               │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│ │ Office Sprint│ │ AI Stakehold-│ │ Labs         │            │
│ │ Acme Ltd     │ │ er Challenge │ │ Toolbox open │            │
│ │ Starts Mon   │ │ Day 3 today  │ │              │            │
│ │ [Go to Sprint│ │ [Learning    │ │ [Open Labs]  │            │
│ └──────────────┘ │  Center]     │ └──────────────┘            │
│                  └──────────────┘                             │
│ ┌──────────────┐ ┌──────────────┐                             │
│ │ VIP Briefing │ │ Sponsorship  │   …and AICC for a Chief     │
│ │ 4 Dec, Lagos │ │ 32 registered│                             │
│ │ [Open]       │ │ [Open]       │                             │
│ └──────────────┘ └──────────────┘                             │
│                                                               │
│ YOUR NEXT STEP  (one offer, never for sprint-only people)     │
│ ┌───────────────────────────────────────────────────────────┐ │
│ │ Join the next AI Stakeholder Challenge cohort   [See more]│ │
│ └───────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

### 4.1 The parts

1. **One header for every status.** Logo, and "Hello, name" opening Sign out (no Profile for now, founder 2026-11-26). No Challenge Access or Labs buttons and no three-line menu: their jobs move into the cards. This fixes 1, 3, 6 and 7.
2. **Right now.** One line, shown only when something is time-bound: a live session, a sprint starting, a briefing this week, Labs opening. Picked by the server from the cards below.
3. **Your programs.** One card per thing the person has, each with a status line and one button:
   - **Office Sprint**: staff card or contact card (the two existing cards, in the same frame).
   - **AI Stakeholder Challenge**: shown when they have a seat; the day they are on and **Go to Learning Center** (replaces Challenge Access, so VVIP and Chief get it too).
   - **Labs**: shown when Labs is live and they have Labs, or it is due to open; "opens on …" when it has not yet.
   - **VIP Briefing**: date, venue, readiness checklist; opens the existing briefing view as its own page.
   - **Sponsorship**: date, registrations, partnership; opens the existing Sponsor Dashboard as its own page.
   - **AICC** (Chief): their engagement; for now the existing "onboarding will begin shortly" line, until there is more to show. For VIP and VVIP who are not Chiefs, AICC is shown as an offer, not a card of theirs (decision 3).
   - **The Awakening**: a small resource card, Read The Article, for everyone except sprint-only people (decision 1).
   - **VVIP Priority Access**: the priority line card (phone, email); the full VVIP offers page opens from it, whole, as it is today (decision 4).
4. **Your next step.** One offer, chosen by a small table the founder signs off (see 5.2). Never drawn for sprint-only people, so their page stays the sprint alone, as decided on 2026-11-25.
5. **Nothing behind a menu.** The Sponsor, VIP and VVIP dashboards keep their content and become pages opened from their card, with a back link to the dashboard.

### 4.2 What it takes, technically

- **No database changes.** Every fact a card needs is already read somewhere: `getStaffSprint`, `getContactSprint`, `sprintOnly`, the challenge seat check, `labsDoor`, `/api/vip/briefings`, the sponsor group read. They are gathered once on the server for the page, so it arrives complete instead of filling in.
- **The status homes stay where they are** (`/leader`, `/vip` …), so `proxy.js`, sign-in routing and every link in emails keep working. Each home renders the same dashboard.
- **The old headers and menus** (`components/header/*`, `components/menu/*`) are moved to `src/deprecated/` once nothing uses them, not deleted.
- The Learning Center, Labs and Sprint keep their own frames; their "back home" links already go to `/`.

### 4.3 Build order, one reviewable step at a time

1. One shared header with "Hello, name" → Sign out, on every home. (Fixes the missing sign-out at once, and nothing else moves.)
   **Built 2026-11-26** (approved: "Yes, build step 1"): "Hello, name" with Log out sits in the header of all six headers (Leader, Sponsor, VIP, VVIP, Chief, the article page), and the sign-out strip left the foot of the Leader, Chief and article menus. On a phone the greeting shrinks to the profile icon (`UserMenu compact`), with a hidden label for screen readers. Checked in the browser at 375 px and on desktop, with a menu open; lint and build pass. Not checked signed in: no test account was used.
2. The server-side summary of "what this person has", and the dashboard drawn from it on `/leader`, with the Sprint and Challenge cards.
   **Built 2026-11-26** (approved: "Yes, build step 2"): `/leader` is now the dashboard. `lib/home/getHomeSummary.js` reads, on the server, the first name, the staff sprint and the challenge seat (active seat, else the latest, as `/api/challenge/activate` picks it). `components/home/HomeDashboard.jsx` draws Welcome, Right now (a confirmed sprint's session live, with a pulsing dot, or due today), Your programs (the Office Sprint staff card, now handed its data, and the new Challenge card: "Starts [date]", "Your challenge is under way.", "Your challenge has finished. Your work is still there.", with Go to Learning Center), Read (The Awakening as a small card) and Your next step ("Join the next AI Stakeholder Challenge cohort", See options opening the existing AISC pricing, only for a leader with no seat). The Leader header shows the logo and sign-out only (`LeaderHeader dashboard`). Sprint-only leaders still see their card alone. The old `LeaderHome.jsx` moved to `src/deprecated/leader-home-2026-11-26.jsx`. Checked with sample data on desktop and at 375 px (leader alone, challenger before, during and after, sprint staff, live session, challenger plus sprint); lint and build pass. Not checked signed in: no test account was used.
3. The same dashboard on `/vip`, `/vvip`, `/chief`, `/sponsor`, adding the VIP Briefing, Sponsorship, AICC and Priority Access cards. The Awakening block and the private briefing come off the homepages (Office Sprint step 6).
   **Built 2026-11-26** (approved: "Keep it, build step 3": the Sponsor keeps "Sponsor another briefing"). Every home now uses one header (`components/header/HomeHeader.jsx`: logo and "Hello, name" with Log out) and one frame (`components/home/HomePage.jsx`). Each home passes its own card first: VIP Briefing on `/vip` (even before a briefing is set), Priority Access on `/vvip` (phone and email on the card, "See your privileges" opening the VVIP Dashboard whole), AI Clarity for Chiefs on `/chief` ("Welcome, Chief. Your onboarding will begin shortly."), Sponsorship on `/sponsor` ("Open sponsorship" and "Sponsor another briefing"). The existing dashboards open whole in a full-screen panel (`components/home/Panel.jsx`), as the Chief's VIP briefing did; turning them into pages is step 4. Shared cards follow: the Office Sprint staff card, the Challenge card, a VIP Briefing for a seat holder on other homes, and the Office Sprint contact card (whole width) on VIP and higher. Half-width cards pair up and an odd one takes the whole row. AICC is a quiet row on `/vip` only (the VVIP has it among their privileges, the Chief is a client). Next steps: join as a VIP (`/vip`, no seat), activate the partnership (`/sponsor`, not opted in). The VVIP's Awakening card opens `/article-vvip`. If a read fails, a home's own card still shows and opens its dashboard. The VIP briefing read moved to `lib/vip/readVipBriefings.js`, shared with `/api/vip/briefings`, which answers as before. The Leader, Sponsor, VIP and Chief headers and menus moved to `src/deprecated/home-headers-menus-2026-11-26/`; `VvipHeader`/`VvipMenu` stay for `/article-vvip`, `Header`/`Menu` for `/article`. Checked with sample data on desktop and at 375 px (VIP with and without a briefing, VIP contact, sprint-only, VVIP with a seat and a challenge, Chief with a VIP seat, Sponsor with and without a sponsorship, failed reads), each panel opened and closed; lint on the changed files and the build pass. Not checked signed in: no test account was used.
4. The Sponsor, VIP and VVIP dashboards become pages opened from their cards; the menus are retired.
   **Built 2026-11-26** (approved: "Yes, build step 4"). The dashboards have their own pages in `components/home/DetailPage.jsx` (shared header, Back to dashboard): `/briefing` (VIP Dashboard; added to `AUTH_ONLY_ROUTES` and the matcher in `proxy.js`, because a VIP seat can be held by any status; it shows only the signed-in person's own seats), `/sponsor/sponsorship` (Sponsor Dashboard) and `/vvip/privileges` (VVIP Dashboard). The cards link to them, and the Sponsor's next step opens `/sponsor/sponsorship#partnership`, which scrolls to Partnership once the data has loaded. The VIP section at the foot of the Sponsor and VVIP Dashboards was removed, since a VIP seat has its own card and page (`VipBriefingModule` is now unused). `Panel.jsx` moved to `src/deprecated/home-headers-menus-2026-11-26/`. Checked: signed out, `/briefing`, `/sponsor/sponsorship` and `/vvip/privileges` go to `/login`, as `/challenge`, `/sprint` and `/leader` do; the page frame scrolls once, with the VVIP page ending at the priority line; lint on the changed files shows no new problems (the Sponsor Dashboard's four were there before); the build passes. Not checked: signed in, and so the Partnership scroll with real data.
5. The Labs card, checked under `npm run dev` where Labs is live.
   **Built 2026-11-26** (approved: "Yes, build step 5"). The Labs check moved from `/api/labs/door` into `lib/labs/readLabsDoor.js`, shared by that route (same answers: signed out, `{"live":true,"door":{"kind":"signin"}}`, checked before and after) and the summary. Where Labs is live, the shared cards add a Labs card (`components/home/LabsCard.jsx`) on every home: "Your Toolbox is open." / "AI Labs and your Toolbox are open." / "AISC+, AI Labs and your Toolbox are open." / "All of Labs is open to you, live calls included." with **Open Labs**; "Opens [date]: Labs opens the day after Day 7 of your challenge."; "Opens [date]: Your Labs access begins that day." No card for someone who never had Labs. The Leader and VIP next step follows `lib/home/nextStep.js`: join the AISC without a seat; "Take your work further in Labs" (**See plans**, `/labs/plans`) after Day 7 with the Toolbox only. Where Labs is not live (production until `LABS_LIVE=1`), nothing is read and nothing changes. Checked with sample standings; lint on the changed files and the build pass. Not checked signed in.
6. Check every combination in the browser (leader alone, challenger, sprint staff, sprint-only, sponsor + challenger, VIP + contact, VVIP challenger, Chief with VIP seat) and show the screenshots before anything is pushed.

Each step is shown in full (what changes, files, what a user will notice, what could break) and approved before it is built.

---

## 5. Decisions (founder, 2026-11-26)

**The principle he set:** "Every status has its mission and the new design has to respect it." The dashboard is shared in layout only; what each status sees still serves that status's purpose, and nobody loses anything they see today ("so far nothing is lost and everyone still sees what they need to see").

1. **The Awakening stays as a small card** ("It can stay as a small card"). Read The Article, on every home except sprint-only. The private briefing buttons (Request A Private Briefing, Sponsor Briefing) still come off, as decided on 2026-11-22.
2. **The next-step table is accepted as proposed:**

   | Who | Next step shown |
   |---|---|
   | Leader, no challenge seat | Join the next AISC cohort |
   | Challenger, during the challenge | None (the Challenge card is the focus) |
   | Challenger, after Day 7 | Labs plans (once Labs is live); until then none |
   | Sponsor | None, or the partnership if not opted in |
   | VIP | Join the next AISC cohort as VIP |
   | VVIP | None (the priority line card is their offer) |
   | Chief | None |
   | Sprint-only | None, by the 2026-11-25 rule |

3. **AICC is shown to VIP and higher, for now** ("Yes, to VIP and higher for now"): VIP, VVIP and Chief. Not to leaders or sponsors, so the AICC advert leaves the leader's menu.
4. **The full VVIP offer stays,** whole, on the page behind the Priority Access card.
5. **Sign out only for now** ("Just sign out for now"). No profile page.


---

## 6. The redesign (2026-11-26)

After seeing every status with every product on, the founder rejected the stacked white cards: "it doesn't look coherent ... We need something that looks like the blue background is the dashboard itself, and different interesting cards are well positioned around the background." A mockup was agreed before any code (`aisc/screenshots/home/mockup/`), with one refinement: the footer with sign-out "should be at the base always", at the bottom of a short page and after a long one ("Yes, build it").

**What was built** (`intelligence/src/components/home/`):
- **The frame** (`HomeShell.jsx`, `home.css`): the navy canvas with soft pools of the accent and plum and a faint grid, full width up to 1680px; the Labs and Challenge Access buttons back in the top bar as they were ("I loved them the way they were"); a footer, "Signed in as [name]" with Sign out, always at the base. The app does not scroll the document, so the frame is its own scroller and its inner column is at least a screen tall.
- **The greeting** (`Greeting.jsx`): good morning, afternoon or evening by the visitor's clock, and a line naming the home's purpose; the Right now pill beside it.
- **The main panel per status** (`MissionPanels.jsx`): the priority line (VVIP), the VIP Briefing with its prep ticks, days left, seats and organiser (VIP), the Sponsorship with seats registered and its checklist (Sponsor), AI Clarity for Chiefs (Chief), the challenge with its day bar, sessions held and next live session (Leader), Start here (a leader with nothing yet).
- **Related things together** (`SidePanels.jsx`, `SprintPanels.jsx`): Your learning (challenge and Labs), a VIP seat, the sprint they take part in, and the sprint they run as one whole-width panel with every part of the old contact card (steps, dates and local time, registration and deadline, code, link and message to copy, Go to Sprint). A contact who is also a participant gets one panel, not two.
- **Recommended for you** (`Recommended.jsx`), below everything, each tile tagged: the next AISC cohort for anyone without a seat (Leader, Sponsor; VIP and VVIP get the VIP seat; not Chiefs, not sprint-only), its date from the cohort open for sign-up (none open: "Dates for the next cohort are coming soon") and its price from `lib/aisc/prices.js`; AI Clarity for Chiefs for VIP and VVIP; the revenue-share partnership for a sponsor not opted in; Labs plans for a challenger after Day 7 with the Toolbox only, where Labs is live; The Awakening for everyone.
- **Who sees what** is in one place, `StatusHome.jsx`; each status page reads its summary and hands it over.
- **The dashboard pages** (`/briefing`, `/sponsor/sponsorship`, `/vvip/privileges`) sit in the same frame, the existing white dashboard on the canvas.
- **Prices:** the AISC prices moved from `api/paystack/aisc/init/route.js` into `lib/aisc/prices.js`, which the route now reads; the numbers did not change. *Close when tested: an AISC General Admission and a VIP checkout charge $199 / ₦220,000 and $399 / ₦520,000 (payment test round).*
- The step 2 to 5 cards moved to `src/deprecated/home-cards-2026-11-26/`.

Checked with sample data for every status on desktop and phone (`aisc/screenshots/home/built/`), compared with the mockup; lint and build pass. Not checked signed in.

**Checked signed in, 2026-11-26**, with one test account (a VIP), without changing its status in the database: its real `/vip` home and data, routing (`/briefing`, Labs, the plans and the Sprint open; the VVIP and Sponsor pages send it back to `/vip`), the Labs and Challenge Access buttons, the briefing page and Back to dashboard, the Learning Center link, Sign out. The other four statuses were drawn with the same account's real data through a temporary page on this machine, since removed. Fixed during it: the cohort date carried "WAT" twice, the tile title repeated the cohort name, and a list in the grid lacked keys.

**Founder, the same day:** the line under the greeting ("Your VIP briefing" and the like) and "Offers chosen for you" above the offers are "not needed", and both were removed; the next cohort offer shows **only a cohort whose start is ahead** ("Show only a cohort whose start is ahead"), otherwise "Dates for the next cohort are coming soon."
