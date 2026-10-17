# Labs access: the table

> **Named "the record of access" until 2026-10-16,** when the founder settled on two terms: challenge access, and Labs access (`LABS_BLUEPRINT.md`, "Two kinds of access"). The SQL below keeps its first comment as it was run.

> **What this is:** the proposal for tracker step 24, written 2026-10-16 for the founder to review, at his word: "Approved. Start step 24: propose the record of access as SQL for me to review and run, tested on a throwaway database first." **Approved the same day,** after his answers to its two questions: "Table approved. I'll run the SQL in Supabase and tell you when it's done." He runs the SQL at the foot of this file in the Supabase SQL editor.
> **Goes with:** `LABS_TRACKER.md` (the steps), `LABS_BLUEPRINT.md` (the decisions) and `LABS_LIBRARY_TABLE.md` (the library, the first table).

## In short

One new table, `labs_access`. Each row says: this person holds this tier, for this reason, from this date until that one, or until it is ended by hand. It is for everything the challenge cannot tell Labs: coaching, the AICC Full Program and the Council, subscriptions when they come, and access given by hand.

Labs will give each person the higher of two things: what their challenge opens (built in access part 1) and the highest tier they hold in this record that day. Nothing else in the database changes, and nothing reads the table until the next step is approved.

## What was checked first

- **The live database, read on 2026-10-16.** It has 27 tables, and `labs_items` is the only one for Labs. No table is called `labs_access`. No record of coaching exists anywhere: coaching is sold through the discovery call, with no payment route.
- **Everyone who would hold access already has an account** in the `users` table. Leaders get one when they pay for the challenge. Coaching clients take the challenge first, privately at VVIP. AICC clients become "chief" when their invoice is paid. So each row points to an account, the way `challengers` does.
- **His answers so far:**
  - Coaching opens all of Labs for as long as coaching lasts.
  - The AICC Full Program and the Council open everything for six months, from the day the engagement starts (his answer to this proposal, below).
  - The Strategic Briefing opens nothing.
  - Premium ($20) opens AI Labs, and VIP ($97) opens AISC+.
  - An upgrade restarts the subscription from the day of the upgrade, and each tier opens the ones below it.
  - A higher tier bought during the free months starts at once.
  - AI Labs is not sold during the free months, "except we want to collect subscriptions ahead of time".

## What one row holds

| Column | What it is |
|---|---|
| `user_id` | Whose access it is: their account |
| `tier` | The tier it opens, and with it every tier below: `platforms`, `ai-labs`, `aisc-plus` or `stakeholder-labs`, the same names the library uses |
| `source` | Why they hold it: `subscription`, `coaching`, `aicc`, or `grant` (by hand) |
| `starts_at` | When it opens. It can be a later date |
| `ends_at` | When it ends. Empty: until it is ended by hand |
| `reference` | The payment or invoice it came from, when there is one |
| `note` | A line for the admin, such as "Council seat 2 of 3" |
| `created_at`, `updated_at` | When the row was made and last changed |

## How each case is written

| Case | Tier | Source | Starts | Ends | Reference |
|---|---|---|---|---|---|
| A coaching client: one row for each paid term | AI Stakeholder Labs | coaching | the first day of the term; a renewal starts where the last term ended | the end of the term | — |
| AICC Full Program | AI Stakeholder Labs | aicc | the day the four-week engagement starts | six months later | the AICC invoice |
| The Council | three rows, one per seat | aicc | as above | as above | the same invoice on all three |
| Premium, when subscriptions exist (step 44) | AI Labs | subscription | the day paid | a month later | the Paystack payment |
| Upgrading to VIP part-way through a month | a new AISC+ row | subscription | the day of the upgrade | a month later | the new payment |
| AI Labs collected ahead of the free months' end, if he chooses | AI Labs | subscription | the day the free months end | a month after that | the payment |
| Access given by hand | any tier | grant | any day | any day, or none | — |

**Ending access by hand** sets its end to that moment. The row stays, so there is a record of what was held and when. A row put in by mistake can be deleted.

A person can hold several rows at once, and the highest tier open that day wins. After an upgrade the Premium row can simply run out.

## What the database makes sure of

1. A tier is one of the four. The Toolbox cannot be granted on its own, because it comes with every tier.
2. A source is one of the four.
3. Every row belongs to an account that exists. Deleting an account deletes its access, and nobody else's.
4. An end comes after its start.
5. **One payment gives one person access only once.** Paystack can send the same notice more than once, and a second copy is refused. The Council's three seats can share one invoice, because each seat is a different person.
6. **Only the server reads and writes the table,** like `labs_items` and `aica_submissions`. A browser cannot read anyone's access, its own included, or write any.

## What stays in code, and what is not here

- **The ladder,** and which source may open which tier: coaching and AICC open AI Stakeholder Labs, subscriptions AI Labs or AISC+, and by hand any tier. The admin page will hold that rule, where it is easy to change.
- **Payment details.** Subscription codes, cards and amounts belong with the payments, the way `aisc_payments` and `aicc_payments` hold theirs. When subscriptions are built (step 44), each paid month writes a row here. This table holds access only.
- **The challenge's free months** stay worked out from the challenge, as they are today. They are not copied into this table.
- **The On Demand seat** (steps 56 and 59): "An on demand user gets AI labs for free from day 1 of purchase." When the seat is built, its free AI Labs can be written here as a row from the day of purchase. That would need one more allowed source, a single line of SQL at that time.

## His answers to this proposal (2026-10-16)

Two questions were put to him. Neither changed the SQL.

1. **When AICC's six months start:** "AICC's six month starts as their 1 month engagement starts. This is so that they can use the resources in labs for further learning as they go through their well paced learning structure." So an AICC row starts on the day the engagement starts and ends six months later. That day may not be known when the invoice is paid, so the row is given in admin once the start is set, not at payment.
   - **Not settled by this:** the AICC site's FAQ answers "What happens after the 4 weeks?" with "6 months of extended access to our Learning Center" (`aicc/src/components/sections/Faq.jsx:106`). If that Learning Center is Labs, the site puts the six months after the engagement and his answer puts them from its start. Logged for him as `DISCREPANCY_LOG.md` #30. Nothing on the site was changed.
2. **Coaching:** "I'm guessing one row per paid term. In handling payments and subscriptions you are an expert so I'd love industry standard practices." So there is one row for each paid term, the same shape subscriptions will use. The usual practices follow.

## Paid terms: the usual practice, applied here

These are the norms of subscription billing, and they shape steps 44 to 47. None of them changes the SQL.

1. **What was paid is kept apart from what it opens.** The payment side lives with the payments, built in step 44: Paystack's codes, the amounts and the state of each subscription. This table says only who may open what, and until when. That is the usual design, and it lets coaching and access given by hand share one table of Labs access with paid subscriptions.
2. **Terms run back to back.** A renewal starts where the last term ended, not at the moment its payment arrives. A late notice leaves no gap, and paying early loses no days.
3. **Nothing has to run at midnight.** Labs works out access from these dates on every page, so a term that ends closes by itself, with no scheduled job.
4. **Only Paystack's notice opens a term, and it is checked.** A term opens when Paystack's own notice arrives and its signature is verified, as the app's Paystack route already does for one-off payments (`intelligence/src/app/api/paystack/webhook/route.js`). It never opens because a browser says a payment went through. A notice that arrives twice changes nothing (rule 5 above).
5. **Cancelling stops the next renewal, not the current term.** The leader keeps what they paid for until the term ends.
6. **A failed renewal gets a short grace period.** The leader is asked to update their card for a few days. If the renewal still fails, Labs falls back to what their challenge gives them: Platform Awareness and the Toolbox. How many days is his to set with step 46.
7. **History is not rewritten.** Ending a term early, or a refund, sets an end date. The row stays. Only a row put in by mistake is deleted.
8. **Coaching, paid outside Paystack, takes the same shape,** a row per paid term, given in admin, which ends by itself. So that a renewal is not forgotten, the admin page will list the terms ending in the next seven days (step 47).
9. **Upgrades follow his rule:** a new term from the day of the upgrade (step 43). Many services also credit the unused part of the lower tier. Whether to do that is already the open question on step 44.

## Checked

- **Run on a throwaway Postgres 17 database on this machine,** made for the check and deleted afterwards. It had stand-ins for the `users` table and for Supabase's browser and server roles. The table was made, and running the SQL a second time changed nothing.
- **Ten rows went in, one for each case above:**
  - a coaching client;
  - an AICC Full Program client and the three Council seats on one invoice;
  - a Premium month with a VIP upgrade part-way through;
  - a month bought ahead;
  - Platform Awareness given by hand;
  - a grant ended by hand.

  The highest tier each person held was read on five dates. Each was right:
  - coaching open throughout;
  - AICC shut before its start, open for its months, and shut on its last day;
  - AISC+ from the day of the upgrade until that month ended;
  - the month bought ahead shut until it began;
  - the ended grant shut.
- **Eleven wrong rows were refused,** each by the rule meant to catch it. They were the Toolbox as a tier, a tier written by its display name, no tier, an unknown source, no source, access ending the moment it starts, access ending before it starts, no account, an account that does not exist, one payment twice for one person, and access ended by hand before it began.
- **The browser's roles, signed in and signed out, saw no rows and could write none.** The server's role saw all of them.
- **Deleting an account removed that account's access and no one else's.**
- **Not checked:** running it on the live database. That is his.

## What happens next

- **The founder:** review this, and if he approves, run the SQL below in the Supabase SQL editor. It makes an empty table. The live site and this machine share one database, so the table exists in production at once, but nothing reads it until the step after.
- **Then the agent, each part put to him before it starts:**
  - **Labs reads the record.**
    - A person's tier becomes the higher of their challenge's and the record's.
    - Someone with no challenge but a current row, such as an AICC client, is let into Labs.
    - Labs Home shows the tier they hold and until when.
    - Their document links are sent too. Today they are held back from anyone without a challenge.
    - "View as" is unchanged.
  - **Giving and ending access by hand in admin** (the "by hand" part of step 47): find a person by email, give a tier with its dates and a note, end it, see who holds what, and see the terms ending in the next seven days. A coaching renewal starts where the last term ended. Times are typed in Lagos time, as sessions are. **Built 2026-10-16** as the Labs Manager's Access route, `/admin/labs/access` (tracker step 47). Days are whole Lagos days: access opens at the start of its first day, and its end is stored as the start of the day after its last day.

## The SQL

```sql
-- The Labs record of access: what opens a tier of Labs beyond the challenge.
-- One row per grant: a subscription, coaching, AICC, or a grant by hand.
-- Run once in the Supabase SQL editor. Safe to re-run.
create table if not exists public.labs_access (
  id uuid primary key default gen_random_uuid(),
  -- Whose access it is. If the account is deleted, its access goes with it.
  user_id uuid not null
    references public.users (id) on delete cascade,
  -- The tier it opens, and with it every tier below (the ladder is in code).
  -- The Toolbox is not here: it comes with every tier.
  tier text not null
    constraint labs_access_tier_check
    check (tier in ('platforms','ai-labs','aisc-plus','stakeholder-labs')),
  -- Why the person holds it.
  source text not null
    constraint labs_access_source_check
    check (source in ('subscription','coaching','aicc','grant')),
  -- When it opens, and when it ends. No end: until it is ended by hand.
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  -- The payment or invoice it came from, when there is one.
  reference text,
  -- A line for the admin, such as "Council seat 2 of 3".
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint labs_access_dates_check
    check (ends_at is null or ends_at > starts_at)
);

-- Labs looks a person up by their account on every page.
create index if not exists labs_access_user_idx
  on public.labs_access (user_id);

-- One payment gives one person access once, however often its notice arrives.
create unique index if not exists labs_access_reference_key
  on public.labs_access (user_id, reference) where reference is not null;

-- Read and written by the server only, which decides what each leader is sent.
alter table public.labs_access enable row level security;
```
