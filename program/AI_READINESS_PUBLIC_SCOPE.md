# The free AI readiness check at /ai-readiness: scope of work

**Written 2026-10-24, revised the same day (no email list for now; the checkbox is an optional invite to a private WhatsApp Community), approved the same day and built the same day.** His words: "Go with the WhatsApp Community setup as recommended. The scope is approved: start the build, and I'll run the SQL and set up the Community." Not pushed, and the SQL is not run yet: section 11 says where the build stands. **Revised again before the SQL was run:** the check writes to a shared `leads` table, and the gate gains an optional box asking whether we may email people later (sections 5 and 12, approved and built the same day: "Approved. Move the readiness check onto the leads table as set out in section 12."). Rule 21 (`WORKING_RULES.md`): what changes, where, what a user notices and what could break are set out below, and nothing is built until he approves. Rule 22: one new table, and why it is needed, is in section 5.

**Why now.** The social series *Becoming an AI Stakeholder* (`_content/Becoming-an-AI-Stakeholder/`) sends viewers here from Day 5, which first posts on **Friday 6 November 2026**.

---

## 1. Founder decisions, 2026-10-24

| | Decision | His words |
|---|---|---|
| Where | **aistakeholderchallenge.com/ai-readiness**, outside the Learning Center | "It will live in AISC website '/ai-readiness'" |
| Gate | **First name and best email before the check** | "users will access it only after providing their name and best email" |
| The check | **As in the Learning Center**: the 24 statements, six scores, no total, strongest and where to start, first moves | "The Readiness check will perform as usual" |
| The PDF | **Emailed, not shown or downloaded** | "there will be no pdf to view, instead the pdf is going to be sent to their email" |
| After | **The success page is also a sales page** for the challenge | "the success page will also double as a sales page for the AISC program" |
| The checkbox | **Optional.** Ticking it asks for an invite to a **private WhatsApp group of leaders planning to adopt AI in the next 30 days**. Those who tick get the invite on the success page and in their report email | "we don't have to make the checkbox compulsory. People can check if they want access to an exclusive group of people looking at adopting AI within the next 30 days. If they tick it, they get an invite to a private whatsapp group both in the email they receive about the readiness results and the success page" |
| The list | **No email list for now.** Emails are collected to send the report, and for no marketing | "That way we can bypass the email list for now" |
| Leads (later the same day) | **Every capture outside a program writes to `leads`**, which says where a person came from, what they received and whether we may email them later. The gate gains an **optional second box** asking that permission. No email is sent on it until he decides | "All email captures or phone number capture that is not directly tied to a program will be collected in leads" (section 5) |
| Privacy | **A privacy notice is drafted** for his review. **Since 2026-10-25 it is the AI Readiness Check policy** at `/policy/ai-readiness-check`, drafted in `AI_READINESS_CHECK_POLICY.md`, with no retention section (section 13) | "Draft one for review" |

---

## 2. Resend, checked against its official pricing page (2026-10-24)

| | Free plan | What it means here |
|---|---|---|
| **Transactional** (the report email) | **3,000 emails a month, capped at 100 a day** | **The one thing to check.** The report email is transactional, and the cap belongs to the whole Resend account, shared with every email the ecosystem sends: payment confirmations, access emails, cohort emails. If the account is on the free transactional plan, one busy day of readiness reports could use up the 100 and stop those emails until the next day |
| **Marketing** (a future daily email) | **1,000 contacts.** "Marketing plans are not limited by the number of emails sent — only by the number of contacts." 3 segments, 3 domains | **Not used for now.** Kept here because the founder asked: it works on free until the list passes 1,000 contacts |

*Dropped by the founder on 2026-10-25 (section 13): "I'm no longer involving resend so let's drop that task. I now use whatsapp community group." The report email itself is still sent through Resend, on the same account as every other ecosystem email.*

**Before launch, check the account's transactional plan** in the Resend dashboard. If it is on free, Transactional Pro (stated at $20 a month for 50,000 emails, with no daily cap) removes the risk. Source: [resend.com/pricing](https://resend.com/pricing.md); [Resend's account quotas](https://resend.com/docs/knowledge-base/account-quotas-and-limits).

---

## 3. What a visitor sees

1. **The gate.** A short page: what the check is (a snapshot, not a test; six scores, no total; about ten minutes), then first name, best email, and one **optional** checkbox, unticked:
   > ☐ I'm planning to adopt AI in the next 30 days. Invite me to a private WhatsApp community of leaders doing the same.

   > ☐ Email me practical notes on AI for leaders, and news of the studio's programs. I can stop them at any time.

   *(The second box was added on 2026-10-24 with the `leads` table, section 12.)*

   Below them: "We will email your report to this address, and nothing else unless you ask for it above." with the link to the AI Readiness Check policy (`/policy/ai-readiness-check`). Button: **Start the readiness check.**
2. **The check, as in the Learning Center.** How to rate, the 24 statements one dimension at a time, the note for a 5 ("what I could show"), then the profile: six scores side by side, the strongest, where to start, the tie pickers, the first moves. Answers are kept in the browser, as now, so a refresh loses nothing.
3. **The report.** Where the Learning Center has "Download PDF", this has **Email me my report**. The PDF is the same summary the Learning Center makes, headed for the public check rather than "Day 2".
4. **The success page, which is also the sales page.**
   - "Your report is on its way to *their email*." Their strongest dimension and where they start, in a line each.
   - The bridge: on Day 2 of the challenge you do this live, on your own situation, then audit the data your work runs on, and nothing goes into an AI tool.
   - The four things the seven days deliver (the site's Value section, reused).
   - The next cohort's date and the seats (the site's Pricing section, reused, with **Secure Your Spot**).
   - The next free Awakening, which runs the Monday before each cohort. **Shown only once `THE_AWAKENING_WHATSAPP_INVITE_URL` is set** on the AISC project, so it never points at a link that does not exist yet. Its button joins The Awakening's WhatsApp group (section 13).
   - **For those who ticked the box:** an invite card with the link to the private WhatsApp Community. The same invite is in their report email. Those who did not tick see neither.

**What does not change for anyone:** the Learning Center's Day 2 Readiness Scorecard. **Its file is not edited at all** (founder, 2026-10-24: "This readiness tool should not affect how Day 2's readiness mini app works"). The public check is built beside it, from its own copy (section 6).

---

## 4. How it works behind the page

**The AISC site stores and sends nothing,** as now. The page calls intelligence directly, the way `/personalize` already does (`components/personalize/EmailRecommendation.jsx` posting to `api/public/aisc/personalize/email`).

| Step | Where | What happens |
|---|---|---|
| The statements | `GET /api/public/aisc/readiness/scorecard` (intelligence) | Returns the six dimensions, their statements, the scale and the first moves from the public check's own copy, so the AISC site and the report email use the same wording. The AISC page reads it on the server and refreshes it hourly; if that read fails, the browser asks again |
| The gate | `POST /api/public/aisc/readiness/start` (intelligence) | Checks the name and the email, notes which boxes were ticked, and checks a hidden honeypot field. Stores a row in `leads` and returns its `id`. Rate-limited per visitor |
| The report | `POST /api/public/aisc/readiness/report` (intelligence) | Takes the `id` and the 24 ratings, works out the scores **on the server** (the browser's sums are never trusted), builds the PDF, emails it with the PDF attached, and records that it was sent. Sending twice is refused. Rate-limited. **Returns the WhatsApp invite link only for a row that ticked the box**, so the link never sits in the page's code for anyone to find |

Both posting endpoints follow the personalize email endpoint's protections: an allowlist of AISC origins, zod validation, a per-IP rate limit, and the `id` as the only key to a row.

---

## 5. The one new table: `leads`

**Revised 2026-10-24, before the SQL was run.** The founder replaced the check's own table with one for every capture of this kind: "For any workflow that collects leads we need to have a 'leads' table instead that will say where the user is from, what they got, if we can email them subsequently and any other useful data we might need. All email captures or phone number capture that is not directly tied to a program will be collected in leads." `aisc_readiness` is never created. His standing rule is `WORKING_RULES.md` rule 29.

**His choices, the same day**
- **The name stays `leads`.** It is the plain word for someone who gave their details and is not in a program yet. `prospects` is taken by the AICC table, `subscribers` would be wrong because most people will not have agreed to emails, and `contacts` reads like the contact form.
- **The readiness gate asks, in a second optional box, whether we may email them later.** It records permission only. No email goes out until he decides to send one.
- **The readiness check uses `leads` from the start. The `/personalize` email moves over next**, as its own fix, shown to him first, because it is a working, tested flow on the live site. Inquiries keep their own table, being conversations with their own admin screen.

**Why a table is needed** (rule 22). The report step needs the row the gate created, to know whom to email and whether to include the invite, and the founder needs a record of who gave their details, from where, what they received and what they agreed to. It follows `aisc_personalize`: RLS on, no policies, read and written by the server only.

**One row per capture, not per person.** Someone who takes the check twice has two rows, each with what they received and the exact wording they agreed to that time. A person is found by email (the index below). This keeps every write a single insert, with no merging.

```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Who
  name text,
  email text,
  phone text,

  -- Where they are from
  source text not null,
  site text not null,
  page text,
  attribution jsonb,
  referrer text,
  country text,

  -- What they got
  delivered text,
  delivered_at timestamptz,
  details jsonb,

  -- What they agreed to
  email_opt_in boolean not null default false,
  email_opt_in_text text,
  email_opt_in_at timestamptz,
  whatsapp_opt_in boolean not null default false,
  whatsapp_opt_in_text text,
  whatsapp_opt_in_at timestamptz,
  opted_out_at timestamptz,

  -- Abuse checks only
  ip_hash text,
  user_agent text,

  constraint leads_has_contact check (email is not null or phone is not null)
);

alter table public.leads enable row level security;
-- No policies: read and written only by the server with the service role, like aisc_personalize.

create index if not exists leads_email_idx on public.leads (lower(email));
create index if not exists leads_source_idx on public.leads (source, created_at desc);
```

**What each part holds**

| Column | For the readiness check | In general |
|---|---|---|
| `name`, `email`, `phone` | First name and email. No phone | At least one of email or phone, enforced by the table. Phone numbers are stored in international form (+234...) when a form first asks for one |
| `source` | `aisc_readiness` | Which capture it was. One fixed name per form, listed in `src/lib/leads/` |
| `site`, `page` | `aisc`, `/ai-readiness` | Which property and page |
| `attribution` | The `src` and `utm_*` they arrived with, as `aisc_payments` keeps them | So the series' posts can be counted |
| `referrer` | The site that sent them, host only, such as `l.instagram.com` | Catches visits that arrive without a tagged link |
| `country` | Two letters, such as `NG`, from the connection (Vercel's country header). Nobody is asked | Where they are |
| `delivered`, `delivered_at` | `readiness_report`, and when it was sent. Sending twice is refused | What they received, and when |
| `details` | Ratings, six scores, strongest, where they start, next lowest | The capture's own data. The notes written beside a 5 are never stored |
| `email_opt_in` and its `_text`, `_at` | The second box, with its exact wording and when it was ticked | May we email them later |
| `whatsapp_opt_in` and its `_text`, `_at` | The first box | The Community invite |
| `opted_out_at` | Empty | Set on all of a person's rows when they ask us to stop |
| `ip_hash`, `user_agent` | As now | Abuse checks only |

**May we email this person?** Only if one of their rows has `email_opt_in` ticked and none has `opted_out_at`. Before the first broadcast, every email must carry a way to stop them that sets `opted_out_at`. That is not built yet, and nothing is sent until it is.

**Left out on purpose** (rule 22): a status or notes column, and a column for "later joined a program". Who went on to pay can be found by matching emails with `aisc_payments` when an admin view of leads is built. None is needed to collect leads well.

**The founder runs the SQL himself,** as with the Labs tables.

---

## 6. Files

**intelligence**

| File | New or changed | What |
|---|---|---|
| `src/lib/readiness/scorecard.js` | New | **A copy** of the dimensions, statements, scale and scoring, taken word for word from `ReadinessScorecard.jsx`, for the public check only |
| `src/lib/readiness/buildReadinessPdf.js` | New | **A copy** of the Learning Center's PDF layout, built on the server, headed for the public check rather than "Day 2" |
| `src/utils/challenge/ReadinessScorecard.jsx` | **Not touched** | The Day 2 mini app stays exactly as it is, file and behaviour |
| `scripts/check-readiness-wording.mjs` | New | Compares the public copy's 24 statements, scale and first moves with the Day 2 file, and lists any difference. Run whenever the wording changes |
| `src/app/api/public/aisc/readiness/scorecard/route.js` | New | The statements, for the AISC page |
| `src/app/api/public/aisc/readiness/start/route.js` | New | The gate |
| `src/app/api/public/aisc/readiness/report/route.js` | New | The report |
| `src/lib/aisc/readiness/schema.js` | New | Validation |
| `src/lib/leads/leads.js` | New | The shared helper for `leads` (section 12): every capture outside a program writes through it |
| `src/lib/emails/sendReadinessReportEmail.js` | New | The report email, in the shared email design (`emailTheme.js`), with the PDF attached, and the WhatsApp invite for those who ticked |

Reused as they are: `lib/aisc/personalize/clientIp.js`, `ipHash.js` and `rateLimit.js`.

**aisc**

| File | New or changed | What |
|---|---|---|
| `src/app/ai-readiness/page.js` | New | The page, its title and description. Passes the site's Value and Pricing sections and the footer into the check, for the success page |
| `src/lib/readiness/profile.js` | New | The scoring, for showing the profile on the page only. The report, the email and the saved scores are worked out again on intelligence, which never trusts the browser's sums |
| `src/components/readiness/*` | New | The gate, the check (the Learning Center's flow, in the AISC site's own design), the success and sales page |
| `src/app/policy/ai-readiness-check/page.js` | New | The AI Readiness Check policy, from `program/AI_READINESS_CHECK_POLICY.md`. Two values to confirm sit at the top of the file. It was built at `src/app/privacy/page.js` first and moved on 2026-10-25, before it was ever published |
| `src/app/sitemap.js` | Changed | Adds `/ai-readiness` and `/policy/ai-readiness-check` |
| `src/components/links/QuickLinks.jsx` | Changed | A card for the free check on `/links`, the bio link the series points to |

The AISC build follows `aisc/AGENTS.md` in full: the frontend design skill first, `DESIGN_GUIDE.md`, a stated design plan, and the screenshot comparison loop at `localhost:3003`.

**Environment variable names** (values set by the founder, never written here):
- `READINESS_WHATSAPP_INVITE_URL`, intelligence, new: the Community's invite link. Held on the server and sent only to those who tick the box. While it is unset, nobody sees an invite, and the check still works.
- `THE_AWAKENING_WHATSAPP_INVITE_URL`, aisc, new and optional: The Awakening's WhatsApp group invite (renamed from `NEXT_PUBLIC_AWAKENING_URL` on 2026-10-25, section 13). Read on the server by `app/ai-readiness/page.js`. While it is unset, the success page leaves the Awakening out.
- Existing and reused: `RESEND_API_KEY`, `PERSONALIZE_IP_SALT`, and the AISC site's `NEXT_PUBLIC_API_BASE`.

---

## 7. What could break, and why it should not

| Risk | Why it should not happen | How it is checked |
|---|---|---|
| **The Learning Center's scorecard** is affected | Its file is never opened for editing. The public check lives in new files only | The Day 2 file is unchanged in `git diff`, and the Day 2 scorecard is run through to its PDF once the build is done |
| **The two copies drift**, so the public check's wording falls out of step with Day 2 | When the founder changes a statement, both copies (and `readiness-scorecard.md`, the reference) are changed together | `check-readiness-wording.mjs` lists any statement, scale label or first move that differs |
| **The email cap** stops other emails | Not a code risk. It depends on the Resend plan (section 2) | The founder checks the plan before launch |
| **Abuse**: the form used to send reports to strangers' addresses | Origin allowlist, honeypot, per-IP rate limit, one report per row | Tested by posting from outside the allowlist, and twice for the same row |
| **Personal data** | Evidence notes are never stored; the table is closed to everyone but the server | Read back after the first test row |
| **The invite link travels** beyond the people who ticked | It is only ever sent to them, but anyone can forward a WhatsApp link. If it spreads, the founder resets the link in WhatsApp and updates the setting | Not a code check |
| **Phone numbers in the group** | In an ordinary WhatsApp group every member sees every member's number. A WhatsApp Community hides members' numbers from the wider Community. For senior leaders, that may matter | Settled: a Community (founder, 2026-10-24). **Corrected 2026-10-25:** the group he set up shows members' numbers to each other, and the policy now says so plainly (section 13) |
| **The Community fills** | WhatsApp sets how many members a Community holds. Check the current limit in WhatsApp as it grows | Watched as it grows |

**Payments are not touched.**

---

## 8. What the founder does

1. ~~Approve this scope.~~ Done, 2026-10-24.
2. **Run the SQL** in section 5 (the `leads` table), once section 12 is approved and built.
3. **Create the WhatsApp Community** as set out in section 10, and put its invite link in `READINESS_WHATSAPP_INVITE_URL` on the intelligence project. ~~In Resend, check the transactional plan (section 2).~~ Dropped by the founder, 2026-10-25. **Invite link confirmed** on the intelligence project, 2026-10-25.
4. **Review the AI Readiness Check policy** (`AI_READINESS_CHECK_POLICY.md`), with a legal adviser if he wishes, and confirm the two values at the top of `src/app/policy/ai-readiness-check/page.js`: the reply time (30 days proposed) and the date. The retention section was removed at his word on 2026-10-25. Requests go through the inquiry form, because the site's pages show no raw email address.
5. **Review the success page's copy** before it goes live.
6. **Push both repos,** intelligence first.

**Testing:** run on this machine with both apps, sending the report only to the founder's own address, with his go-ahead for each test send. Both paths are tested: with the box ticked, and without.

---

## 9. Timing

| By | What |
|---|---|
| On approval | intelligence: shared files, endpoints, email. Then the AISC page and the success page |
| Fri 30 Oct | Ready for his review on this machine |
| Tue 3 Nov | Pushed and live, with three days in hand |
| Fri 6 Nov | Day 5 of the series sends viewers to it |

---

## 10. The private group: a setup that protects leaders' privacy

*Proposed 2026-10-24, after the founder asked whether WhatsApp works for leaders and how to protect their privacy. Approved the same day: "Go with the WhatsApp Community setup as recommended."*

**WhatsApp fits this audience.** It is where these leaders already talk, the challenge already runs a private WhatsApp group for each cohort, and the MSME KSS Awakening was delivered in a WhatsApp community channel. What needs care is the kind of group.

| Option | Who can see a member's phone number | Two-way? | Fit |
|---|---|---|---|
| Ordinary group | **Every member** | Yes, everyone posts | Poor for senior leaders: a stranger can see a CEO's number |
| **Community, with its announcement group** | **Admins, and members of any sub-group they share.** Hidden from the rest of the Community | The founder posts; members react, answer polls and reply to him directly; discussion sub-groups can be added and joined by choice | **Recommended.** Private by default, his voice first |
| Channel | **No one**, not even the admins | No, one-way | Most private, but a Channel can be found and followed by anyone, so it is not exclusive |

**Recommended setup**
1. **A WhatsApp Community** with its announcement group as the main room, run from a **studio business number**, not his personal one.
2. **Membership approval switched on**, so a join through the invite link waits for his approval. He can check the name against the readiness sign-ups, and a leaked link lets no one in.
3. **House rules pinned on day one:** the group's purpose (leaders adopting AI in the next 30 days); how often he posts; no promotion; no contacting members without their permission; nothing shared outside the group; leave at any time.
4. **A steady rhythm**, not a flood: a few posts a week, polls to hear from members, and The Awakening each month as the live moment.
5. **Discussion sub-groups only when members ask**, each joined by choice, and the Community says plainly that a sub-group shows numbers to its members.
6. **Nobody is ever added by hand,** and members' numbers are never copied into another list. The site never asks for a phone number: people join with their own number, by their own choice.

**What changes in the build:** nothing. The invite link is whatever he creates. The privacy notice and the checkbox say "community".

---

## 11. Built, 2026-10-24: where it stands

**Not pushed. The SQL is not run yet**, and no report can be sent. *(Written while the table was still `aisc_readiness`. Section 12 moves the check to `leads`.)*

**Checked on this machine**
- Both apps lint clean and build. The Day 2 file shows no change in `git diff`, and `check-readiness-wording.mjs` reports that the public check and Day 2 agree (24 statements, 5 scale labels, 6 dimensions).
- The endpoints, without writing anything: the statements come back (6 dimensions, 24 statements, the checkbox wording); a request from another site is refused; a bot (the hidden field filled, or the form sent too fast) gets a success-shaped reply and nothing is saved; empty or bad fields are refused with a message per field; incomplete ratings are refused; a report for a missing table fails cleanly and saves nothing.
- The page, in the browser at desktop and phone widths, with a dummy session held only in the browser: the gate and its field messages, how to rate, a dimension with the note box for a 5, the profile with a tie to settle, the first moves, the send button's failure message, the success page with the invite card, the Value and Pricing sections and the footer, and "Take the check again". Also `/privacy`, the `/links` card and the sitemap. Screenshots: `aisc/screenshots/screenshot-1` to `-5`.

**Not yet checked, because they need the table:** the gate saving a row, a report sent to the founder's own address (with his go-ahead for each send), sending twice for the same row, both paths (box ticked and not), and the row read back to confirm no notes are stored. The Awakening block needs `NEXT_PUBLIC_AWAKENING_URL`.

**To run it locally against local intelligence:** the root `.claude/launch.json` has `aisc-local-api`, which starts the AISC site with `NEXT_PUBLIC_API_BASE` pointed at `localhost:3001`. Local intelligence uses the live database.

---

## 12. Moving the check to `leads`: what changes

*Set out 2026-10-24 under rule 21, approved the same day ("Approved. Move the readiness check onto the leads table as set out in section 12.") and built the same day. Not pushed. Where testing stands is at the end of this section.*

**What changes, and where**

| Repo | File | Change |
|---|---|---|
| intelligence | `src/lib/leads/leads.js` | **New.** The one place that writes and reads `leads`: create a row, read one, claim the delivery, release it if the email fails, save the details. Also reads the country header and trims a referrer to its host. Every later capture uses it |
| intelligence | `src/app/api/public/aisc/readiness/start/route.js` | Writes to `leads` through the helper, with the second box, the referrer and the country |
| intelligence | `src/app/api/public/aisc/readiness/report/route.js` | Reads the row from `leads` (it must be an `aisc_readiness` row), claims `delivered_at`, and saves the ratings and scores in `details` |
| intelligence | `src/lib/aisc/readiness/schema.js` | Accepts the second box and the referrer |
| intelligence | `src/lib/readiness/scorecard.js`, `scorecard/route.js` | Holds and returns both boxes' wording, so the page and the record use the same words |
| aisc | `src/components/readiness/GateForm.jsx` | The second box, and the referrer sent with the form |
| aisc | `src/components/readiness/ReadinessCheck.jsx` | Passes both wordings to the gate |
| aisc | `src/app/privacy/page.js` and `program/PRIVACY_NOTICE_DRAFT.md` | Say that we note the country from the connection, and that we email notes and news only to those who tick the second box, who can stop them at any time |
| root | `ARCHITECTURE.md`, `LINK_MAP.md` | The new table and helper, at the next `/ecosystem-sync` |

**What a visitor notices:** one more optional box on the gate, unticked, and the privacy notice's new lines. The check, the report and the success page are unchanged.

**What could break, and why it should not:** nothing that is live. The readiness check is not pushed, and no table exists yet, so there is nothing to migrate. `aisc_personalize`, `inquiries` and every program table are not touched. Both apps are linted, built and walked through again in the browser before this is reported done.

**Left alone on purpose:** the `/personalize` email (next, as its own fix), inquiries, every program form, and the Partner Desk, which keeps its own records on this machine. Nothing is ever sent on the strength of the second box until there is a way to stop the emails.


**Where it stands (2026-10-24)**
- **Built and checked on this machine; not pushed.** Both apps lint clean and build.
- **The SQL in section 5 was run on a throwaway Postgres 17 database**, which was then deleted. It had stand-ins for Supabase's browser roles. Running it twice changed nothing. Every column the helper reads and writes exists. A row with neither email nor phone is refused, a phone-only row is accepted, the delivery claim works once only, and the browser roles can neither read nor write.
- **Against local intelligence** (no table yet, so nothing could be saved): the statements return both boxes' wording; bots and bad fields are refused as before; the gate and the report both reach `leads` and fail cleanly on the missing table, saving nothing.
- **In the browser** (a production build pointed at local intelligence, on port 3013, because the dev server on 3003 was the founder's own): the gate shows both boxes in one card at desktop and phone widths, both tick, and a submission passes every check and reaches the save. `/privacy` shows the new lines. Screenshots `aisc/screenshots/screenshot-6` and `-7`.
- **Still to check once the founder has run the SQL:** a row saved with the right source, country, referrer and both opt-ins; one report sent to his own address, with his go-ahead; sending twice refused; `details` filled after sending; and no notes stored.

**End-to-end test, 2026-10-24 (after the founder ran the `leads` SQL and set `READINESS_WHATSAPP_INVITE_URL`).** At his word: "Send one test report to my address with both boxes ticked." Run in the browser against local intelligence, which uses the live database, on a production build of the AISC site at port 3013.
- **The gate** saved one row: source `aisc_readiness`, site `aisc`, page `/ai-readiness`, attribution `src=test`, both opt-ins with their exact wording and time, nothing delivered yet. Country is empty on this machine; Vercel's header fills it live. The referrer read `localhost`, as expected for a local run.
- **One report was sent to the founder's own address**, with a test note beside a 5. The row was marked delivered (`readiness_report`), and `details` holds the 24 ratings, the six scores, strongest (Strategy), where to start (Processes) and the next lowest (Impact Evaluation). **The note is not stored.**
- **The success page** showed the WhatsApp invite (a `chat.whatsapp.com` link, opening in a new tab), the Value and Pricing sections and the footer.
- **Asking again for the same report was refused** (`already`), and no second email was sent.
- **A bug was found and fixed during the run:** ratings given in very quick succession kept only the last one, because each click built the answers from a stale copy. The rating, note and tie-picker handlers now build on the latest answers. Checked again: four quick ratings all count.
- **The test row stays in `leads`** (id `5444bfe7-aa40-4cab-a3b8-98b7a4ff0d80`, `attribution.src = test`), for the founder to keep or delete.
- **The founder checked the email the same day:** "The email looks right: the PDF, the invite and the links all work."

---

## 13. Changes on 2026-10-25, before launch

The founder, after the end-to-end test:

1. **The policy.** "The group i created in whatsapp cannot prevent people from seeing other member numbers. This is not policy, this is ai readiness policy and it should be under a policy page as in 'policy/ai-readiness-check'. Remove the 'How long we keep it' part."
   - The page moved from `/privacy` to **`/policy/ai-readiness-check`**, titled "AI Readiness Check policy". It was never published at `/privacy`, so nothing redirects. The gate's link and the sitemap point to the new address. The draft is now `program/AI_READINESS_CHECK_POLICY.md`, which replaced `PRIVACY_NOTICE_DRAFT.md`.
   - **The WhatsApp section now says that other members can see a member's phone number**, as in any WhatsApp group, so a leader can decide before joining. The success page and the report email are unchanged: they say each request to join is approved by hand, which he signed off with the email.
   - **"How long we keep it" is removed**, with its constant. Two values are left to confirm: the reply time and the date.
2. **Resend.** "I'm no longer involving resend so let's drop that task. I now use whatsapp community group." The plan check is dropped. The report email itself is still sent through Resend, on the same account as every other ecosystem email, so the free plan's 100 a day is shared with them.
3. **Invite link confirmed** on the intelligence project.
4. **"Not available" on his machine.** His dev server on 3003 reads the live intelligence, which answered "not found" for the statements because nothing is pushed yet. It clears once intelligence is pushed and deployed. No code change.
5. **Next: `/personalize` moves into `leads`**, "once the readiness tasks are complete and verified", so that he can delete the `aisc_personalize` table. The plan is set out for his approval first (rule 21). One point it has to settle: today every finished wizard is saved, with or without an email, while `leads` holds only people who gave their contact details.
6. **The Awakening link is a WhatsApp group invite.** "This awakening url should now be a whatsapp group link. Anyone who signs up for the awakening or wants to attend the session has to join the group first. So change the name to 'THE_AWAKENING_WHATSAPP_INVITE_URL'."
   - The setting is now `THE_AWAKENING_WHATSAPP_INVITE_URL` on the AISC project. A browser page can only read settings named `NEXT_PUBLIC_...`, so `app/ai-readiness/page.js` reads it on the server and passes it to the success page. It is a public join link: anyone who opens the page's code can find it, which suits a group everyone who attends must join. The readiness community's link stays with intelligence and goes only to those who tick the box.
   - The block now reads: "A free live session, every month, on the Monday before each new cohort begins. The session link and everything else you need are shared in its WhatsApp group." The button says **Join the WhatsApp group** (it said "Secure your place"). A first wording, "To attend, join The Awakening's WhatsApp group first", was changed the same day because it read as a condition (founder: "You can say the link for the session and other important info will be shared in a designated whatsapp group").
   - On Vercel, a new setting reaches the page at the next deployment.
   - Both example settings files list the names: `aisc/.env.example` (`THE_AWAKENING_WHATSAPP_INVITE_URL`) and `intelligence/.env.example` (`READINESS_WHATSAPP_INVITE_URL`).
7. **Viewing it locally.** The founder's dev server on 3003, restarted that morning, answered 404 for every page but the home page (`/links` and `/coaching` too), so the fault was the dev server's saved build files, not the new pages. Agents may not stop his dev server, so a separate copy was served on port 3013 (`aisc-build-local-api` in the root `.claude/launch.json`, a production build pointed at local intelligence on 3001). To fix his own: stop it, delete `aisc/.next/dev`, and start it again.

8. **No footer and no briefings on the readiness pages.** "I don't want the briefings and footer in the AI readiness pages." The site footer, whose top part lists the latest Awakening briefings, is gone from `/ai-readiness` (the success page now ends with the seats, or the Awakening block when its link is set) and from `/policy/ai-readiness-check`. The check no longer passes a footer through.
9. **The policy does not mention phone numbers.** "We don't need to add this 'Other members of the community can see your phone number,' Saying it's a private whatsapp group is good enough." The line added under item 1 is taken out. The WhatsApp section keeps that joining is a choice, that we never add a number, and that WhatsApp runs the community under its own terms. It must never say that numbers are hidden.


---

## 14. Push checklist, 2026-10-25

The founder, the same day: "The check and policy are done. Give me the final push checklist." Before it was written, both apps were linted and built with their normal settings, the wording check against Day 2 passed, and the Day 2 file showed no change.

**Settings on Vercel**
- intelligence: `READINESS_WHATSAPP_INVITE_URL` (confirmed by the founder).
- aisc: `THE_AWAKENING_WHATSAPP_INVITE_URL`. It was first put in `intelligence/.env.local` by mistake; the AISC site reads only its own settings.
- The `leads` table exists in Supabase (run by the founder).

**The policy goes live as written:** reply within 30 days, last updated 25 October 2026.

**Order:** push intelligence and let it deploy, then push aisc. Until intelligence is live, the AISC page says "not available".

**intelligence, the readiness files only**
- Changed: `.env.example`
- New: `scripts/check-readiness-wording.mjs`, `src/app/api/public/aisc/readiness/` (`scorecard`, `start`, `report`), `src/lib/aisc/readiness/` (`cors.js`, `schema.js`), `src/lib/emails/sendReadinessReportEmail.js`, `src/lib/leads/leads.js`, `src/lib/readiness/` (`scorecard.js`, `buildReadinessPdf.js`)

**aisc, the readiness files only**
- Changed: `.env.example`, `src/app/sitemap.js`, `src/components/links/QuickLinks.jsx`
- New: `src/app/ai-readiness/page.js`, `src/app/policy/ai-readiness-check/page.js`, `src/components/readiness/` (five files), `src/lib/readiness/profile.js`, `program/AI_READINESS_PUBLIC_SCOPE.md`, `program/AI_READINESS_CHECK_POLICY.md`

**Not part of this work** (earlier changes in the same repos, for the founder to review on their own): intelligence `challenge/day-1`, `day-7` and `roadmap` pages and `utils/challenge/ToolBox.jsx`; aisc `program/DAY_2_PLAIN_WORDS_CHANGES.md`, `DOCUMENT_CHECK_2026-10-23.md`, `LABS_BLUEPRINT.md`, `PROGRAM_REFERENCE.md` and `LABS_DOCUMENTS_DAY_FIXES.md`.

**After both are live**
1. `https://intelligence.michaelsteve.com/api/public/aisc/readiness/scorecard` answers with the statements.
2. `aistakeholderchallenge.com/ai-readiness` shows the gate with both boxes; the policy link opens `/policy/ai-readiness-check`; `/links` shows the Free Check card.
3. One live run with `?src=test`, with the founder's go-ahead: the row in `leads` carries a country and a referrer, and the report arrives.
4. Then the `/personalize` move into `leads` (section 13, item 5), so that `aisc_personalize` can be deleted.

---

## 15. Live, 2026-10-25

Both repos pushed (`934d2fa` intelligence, `85274b3` aisc, on `main` and `dev`) and deployed. At the founder's word: "Run the live checks and one test with ?src=test to my address."

**Working live**
- intelligence returns the 24 statements and both box wordings; a request from another site is refused (403); the site's own address (`www.aistakeholderchallenge.com`, which the plain domain redirects to) is allowed.
- `aistakeholderchallenge.com/ai-readiness` shows the gate with both boxes and the policy link; `/policy/ai-readiness-check` loads; `/privacy` is gone; the sitemap lists both pages; `/links` shows the Free Check card.
- **One live test**, both boxes ticked, `?src=test`, to the founder's own address: the row was saved with **country `NG`** (Vercel's header, which could not be tested on this machine), the test tag, both opt-ins and the page. The report was sent; `details` holds the 24 ratings and six scores; no note stored. Asking again was refused (`already`).
- The success page showed the Value and Pricing sections and the Awakening block with its WhatsApp button and date; no footer and no briefings.
- The referrer read `www.aistakeholderchallenge.com` because the page was reloaded before the test. A visitor arriving from another site records that site.

**Not working: the readiness community invite.** The live report came back with no invite although the box was ticked, so neither the success page nor the email carried it. The code returns the invite only when `READINESS_WHATSAPP_INVITE_URL` is set in the live intelligence deployment. To check on Vercel: the intelligence project's environment variables, set for **Production**, then a **redeploy** (a variable added or changed after a deployment does not reach it).

**A stale 404, cleared by itself.** For a while after the deploy, Vercel's cache still served a 404 from before the deploy at the plain `/api/public/aisc/readiness/scorecard` address. Visitors were not affected, because the page receives the statements on the server. By the end of the checks the address answered normally.

**The test row stays in `leads`** (id `3bd0ac5a-9624-4422-b1e5-35fbbae01e35`, `attribution.src = test`), for the founder to keep or delete.

## 16. After going live, 2026-10-25

**Where each invite setting goes.** The founder: "Please be very clear where what goes." Each one lives in exactly one project:

| Setting | Project | Local file | Read by |
|---|---|---|---|
| `READINESS_WHATSAPP_INVITE_URL` | **intelligence only** | `intelligence/.env.local` | `api/public/aisc/readiness/report`, which returns it only to a lead who ticked the box and puts it in the report email |
| `THE_AWAKENING_WHATSAPP_INVITE_URL` | **AISC only** | `aisc/.env.local` | `app/ai-readiness/page.js`, for the Awakening block on the success page |

A copy in the other project does nothing. The missing community invite in the live test (section 15) came from the readiness setting being absent from the live intelligence deployment.

**The site footer's Explore column** now reads Find your path, Career Apprentice, **AI Readiness Check** (`/ai-readiness`), Partner with us. The check replaced "AI Clarity for Chiefs" at the founder's word: "add the AI Readiness Check as a link in the footer. Replace the 'AI Clarity For Chiefs' link with it." The blog's own footer (`BriefingsFooter.jsx`) still links to aiclarityforchiefs.com, so the AICC site keeps an inbound link (`LINK_MAP.md` updated).

**Emails dark on mobile.** Every ecosystem email is drawn by `intelligence/src/lib/emails/emailTheme.js`: a light grey canvas with dark text and dark cards, and no instruction to mail apps about dark mode. Phone mail apps in dark mode recolour such emails themselves; desktop Gmail does not, which is why desktop looks right. A fix was proposed under rule 21 and approved the same day: "Approved. Make both email steps, then send one test report to my address so I can check it on my phone."
- **Step 1, every email:** the shell is now a full email page that tells mail apps the design is light only (`color-scheme` and `supported-color-schemes`). Apple Mail and Outlook keep it as on desktop.
- **Step 2, for the Gmail apps, which recolour anyway:** body text `#585b86` to `#45486f` and muted text `#8b8dab` to `#6b6e8f`, so they stay readable when flipped; the logo (dark ink on a transparent image, which vanished on a dark background) sits on a white backing that Gmail does not recolour, because it is drawn as a background image. In the readiness email, the "Your profile at a glance" label is less faint.
- **Checked:** all 22 senders pass the shell straight to Resend, so none breaks; lint and build pass; renders of the readiness email old and new, in light and in Chrome's forced dark mode (`scratchpad` previews, not kept). One test report was sent to the founder's own address through local intelligence (row `1d4a57e8-7a06-4a98-9054-b90dda9bab1f`, `src=test`), with the community invite, for him to check on his phone.
- **Not covered:** the `/personalize` recommendation email has its own design and is left until it moves into `leads`. Files: `intelligence/src/lib/emails/emailTheme.js` and `sendReadinessReportEmail.js`. Not pushed.
