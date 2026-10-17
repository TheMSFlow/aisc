# Labs subscriptions: the plan

> **What this is:** the plan for tracker steps 44 to 47 and 61, written 2026-10-17 for the founder's approval, at his word: "Start the subscriptions work (steps 44 to 47 and 61). I'll give you the naira prices for Premium (N25,000) and VIP (N120,000)." One table was needed, as SQL at the foot of this file, tested on a throwaway database. **Approved, run and built the same day:** see "Built" below. Uncommitted.
> **Goes with:** `LABS_TRACKER.md` (the steps), `LABS_BLUEPRINT.md` ("Two kinds of access"), `LABS_ACCESS_TABLE.md` (Labs access, and "Paid terms: the usual practice").
> **Sources:** Paystack's own documentation, read 2026-10-17 (Subscriptions, and the Subscription API), and the app's existing Paystack code.

## In short

Two plans, each monthly: **Premium** opens AI Labs, at $20 or ₦25,000. **VIP** opens AISC+ and AI Labs, at $97 or ₦120,000. Group coaching, which opens AI Stakeholder Labs, stays sold as coaching.

A leader chooses a plan in Labs and pays once at Paystack's checkout, and Paystack charges the same card each month after. Each paid month opens one more month of Labs access, back to back. A leader can cancel and keep the month they paid for, can change plan, and is given a few days if a renewal fails. One small table, `labs_subscriptions`, holds what Paystack needs. The access itself goes where Labs already reads it, in `labs_access`.

## Who may subscribe

"Anyone who has access to labs can subscribe before or after their free months expire" (2026-10-16). So anyone who has or has had Labs may subscribe: a leader with challenge access once Labs has opened for them, an On Demand participant, an AICC client. A stranger cannot.

## How it works, for a leader

1. **Choosing a plan.** A page of plans in Labs shows every tier with what it offers ("All tiers are presented with their benefits"). Premium and VIP can be bought there. AI Stakeholder Labs points to coaching's discovery call. The plans page is reached from any locked page ("Subscribe"), from Labs settings (the settings icon, step 61), and from the Labs icon's "access ended" pop-up, where "Subscribing opens here soon" becomes a button. *(Overtaken 2026-10-17: with Platform Awareness and the Toolbox kept for good, ended access goes into Labs, and that pop-up was replaced by one for Labs access still to begin. See "The Labs icon's pop-up for Labs access still to come".)*
2. **Paying.** Paystack's checkout, with cards only, because Paystack renews subscriptions from a saved card. Prices follow where the leader is, as elsewhere: naira in Nigeria, dollars everywhere else. The server sets the price, never the browser.
3. **When the paid month begins.**
   - **VIP:** at once, even inside the free months ("If a user subscribes to something higher than AI Labs during the free period, that's okay").
   - **Premium after the free months:** at once.
   - **Premium during the free months:** paid now, but the paid month begins the day the free months end, so no paid day overlaps a free one.
4. **Each month after.** Paystack charges the card on the same date each month, and each payment opens the next month, starting where the last ended. A month that begins on the 29th, 30th or 31st renews on the 28th: that is Paystack's rule.
5. **Cancelling,** from Labs settings. The subscription stops renewing. The leader keeps what they paid for until that month ends, and is not charged again.
6. **A failed renewal.** Paystack does not try the card again until the next month. So Labs gives a short grace period (his number, below) and emails the leader a link to Paystack's own page for updating their card. They can also restart at once from the plans page. Labs then stops the failing subscription so they are never charged twice. When the grace ends with no payment, Labs falls back to what their challenge gives them, and Platform Awareness and the Toolbox stay open to them in any case. *(Corrected 2026-10-17, founder: "Please note that Platform Awareness and the Toolbox is available to every one with labs access." Asked whether that holds once their Labs access has ended: "Yes, for good". This line first said "or to nothing for someone who held Labs access only".)*
7. **Changing plan.**
   - **Premium to VIP:** VIP begins at once, as he decided ("Upgrading part-way through a month restarts your subscription from the date of upgrade"). Premium stops renewing.
   - **VIP to Premium:** Premium is paid now and begins when the VIP month ends. VIP stops renewing.

## How it works underneath

- **One small table, `labs_subscriptions`:** one row for each subscription a leader starts. It holds the plan, currency and price; the checkout's reference; when the first paid month begins; and, once paid, Paystack's customer and subscription codes and the token Paystack asks for to cancel. Each paid month is also written to `labs_access` (source `subscription`), with the Paystack payment as its reference. That table is already read by Labs and already refuses one payment twice.
- **The first month is a one-off payment.** Then Labs creates the subscription at Paystack with its first renewal set one month after the paid month begins (Paystack's `start_date`, made "for situations where you'd like to give a customer a free period before you start charging them, or when you want to switch a customer to a different plan"). That one path covers starting now, starting after the free months, and changing plan, with months always back to back.
- **Paystack's notices** arrive at the app's existing webhook, whose signature check stays as it is:
  - `charge.success`: the first payment, and each renewal;
  - `invoice.payment_failed`: a renewal failed;
  - `subscription.not_renew` and `subscription.disable`: cancelled, and then over.

  A new Labs handler takes only Labs payments. The AISC, AICC and VIP handlers, and the order they run in, do not change.
- **Prices are enforced on the server** (rule 2), in a table of the four prices kept in one place.
- **Where Labs is shut, as in production today,** none of this is shown and the APIs refuse.

## Emails (step 46)

The app's own email sender (Resend), in the look of its other emails. Paystack sends its own receipts. My wording, for him to see before they go:
- **Started:** the plan, what it opens, and the next payment date.
- **A renewal failed:** the link to update the card, and the last day of the grace period.
- **Cancelled:** the last day of the plan.
- **Ended after a failed renewal:** that the plan has ended, and the link to the plans page.

## Labs settings (step 61) and admin (step 47)

- **Labs settings,** behind a settings icon beside the Profile icon at the foot of the Labs menu, for everyone in Labs:
  - what they hold and until when;
  - their plan, its next payment date or last day, and its status;
  - "Update card", which opens Paystack's page;
  - "Cancel plan";
  - "Change plan";
  - and, with no plan, the plans.
- **Admin,** in the Labs Manager's Access tab: a "Subscriptions" list of who subscribes, to what, in which currency, its status and its next payment date. Giving and ending access by hand is already there.

## His decisions (2026-10-17)

He answered the five below by number: "1. Not more than 24hours 2. None. 3. Create them. 4. Yes, Cards Only. 5. Agreed". So:
1. **Grace after a failed renewal: 24 hours,** not the 3 days recommended.
2. **No credit** for unused Premium days on an upgrade.
3. **The four Paystack plans are created by the agent,** through Paystack's API.
4. **Cards only** at the subscription checkout.
5. **The four emails** as listed.

**The four plans were created the same day,** through Paystack's API with the account's key, which is a **test** key: "AISC Labs Premium (NGN)" ₦25,000, "AISC Labs Premium (USD)" $20, "AISC Labs VIP (NGN)" ₦120,000 and "AISC Labs VIP (USD)" $97, all monthly. Read back from Paystack afterwards: all four there. Their codes are in `intelligence/.env.local` as `LABS_PLAN_PREMIUM_NGN`, `LABS_PLAN_PREMIUM_USD`, `LABS_PLAN_VIP_NGN` and `LABS_PLAN_VIP_USD`, which git ignores. **Still to do, before payments go live:** the same four variables on Vercel for preview deployments (the test codes), and four live plans made with the live key, their codes set for production.

## Decisions put to him

1. **Grace after a failed renewal.** How many days of access after a renewal fails. **I recommend 3 days.** Paystack will not retry until next month, and the leader can restart at once from the plans page.
2. **Upgrading: credit for the unused part of Premium?** **I recommend no credit.** Paystack has no proration, so a credit would mean refunds by hand. His rule already says an upgrade restarts from the day it is bought.
3. **Paystack plans.** Paystack needs four monthly plans: Premium in naira (₦25,000), Premium in dollars ($20), VIP in naira (₦120,000) and VIP in dollars ($97). **I recommend he creates them in his Paystack dashboard,** in test mode first and then live, and gives me their codes. They go into the environment variables `LABS_PLAN_PREMIUM_NGN`, `LABS_PLAN_PREMIUM_USD`, `LABS_PLAN_VIP_NGN` and `LABS_PLAN_VIP_USD`, and only those names appear in any document. I can create them through Paystack's API instead, but only at his word, since they are made on his account.
4. **Cards only** at the subscription checkout, because renewals need a saved card. Bank transfer and USSD cannot renew.
5. **The emails** above: these four, or fewer.

## What he does

1. Approve this plan, with the decisions above.
2. Run the SQL below in the Supabase SQL editor.
3. Create the four plans in Paystack, test mode first, and send me their codes.

## How it will be checked

- The rules (prices, who may subscribe, when a month begins, changes of plan, grace) in memory, as before.
- Paystack's notices simulated locally with correctly signed test payloads, through the real webhook, so the first payment, renewals, a failure, cancelling and a change of plan are all exercised without money.
- The pages walked in a headless browser, wide and on a phone.
- **Real payments in Paystack's test mode at the end, in one round,** as he prefers for payment flows, with nothing charged.

## Built (2026-10-17)

At his word: "I've run the subscriptions SQL in Supabase. Start building the subscriptions in the order you set out." The live table has every column. Uncommitted, all in `intelligence`.

- **The rules,** with no database: `src/lib/labs/labsPlans.js` (the two plans, their four prices, the 24 hours' grace) and `src/lib/labs/subscriptionRules.js` (who may buy which plan, when its first month begins, which plan it takes over from).
- **The steps,** against a store and a Paystack that can be stood in for: `src/lib/labs/manageSubscriptions.js`. Starting a checkout, the first payment, each renewal, a failed renewal, cancelling, the card link, confirming on return, and what settings shows. The database is `subscriptionStore.js`, Paystack is `paystackClient.js`, the four emails are `src/lib/emails/sendLabsPlanEmail.js`.
- **The APIs:** `/api/labs/subscribe` (start a checkout) and `/api/labs/subscription` (cancel, update card, confirm). Both refuse where Labs is shut.
- **Paystack's notices:** `src/app/api/paystack/handlers/labs.js`, run first in the existing webhook. It looks a payment up only when its reference begins `LABS-`, which every Labs checkout's does, or when it is a renewal on one of the four Labs plans. Every other payment goes on to the AISC, AICC and VIP handlers as before, without a Labs read. The signature check is unchanged.
- **The pages:** the plans at `/labs/plans`; Labs settings at `/labs/settings`, behind a settings icon beside Home and the Profile at the foot of the Labs menu; "See the plans" on every locked panel.
- **Admin:** a "Subscriptions" list under the Labs access list, on the Labs Manager's Access tab. Read only. A checkout not yet paid is left out.
- **Platform Awareness and the Toolbox for good,** his rule the same day: anyone whose Labs access has ever begun keeps them, ended or not, AICC clients after six months included (`resolveLabsAccessLevel()` in `labsAccess.js`).

**Found and fixed while checking:** on a change of plan, the first build marked the new subscription active before stopping the old one. The table allows one renewing subscription per leader, so the live database would have refused it, and Paystack's retry could have set up the monthly charge twice. The old plan now stops first, and the pending row is taken in one guarded write, so a notice and the leader's return arriving together set up renewals once.

## Still open

1. **The "ended" email.** It is sent when the 24 hours' grace runs out with no payment. The app has no scheduled job. **Chosen 2026-10-17:** "Go with Resend's scheduled send for the ended email. Set out the SQL and the code change for my review first." Proposed below, in "The ended email, by Resend's scheduled send". **Approved, with the cancelled-email fix and the live check, and built the same day:** "Approved, including the cancelled-email fix and the live Resend check. I've run the SQL in Supabase." All four emails are now built.
2. **The Labs icon's pop-up for ended access.** With Platform Awareness and the Toolbox kept for good, anyone whose Labs access has begun now goes straight into Labs. The pop-up "Your Labs access has ended… Subscribing opens here soon" can only be reached by someone whose Labs access has not started yet, and says the wrong thing to them. **Put to him before any change,** since leaders see it. He asked the same day: "Set out the fix for the Labs icon's 'access ended' pop-up for my review, with the exact wording, before changing anything." Proposed below, in "The Labs icon's pop-up for Labs access still to come". **Approved and built the same day:** "Approved. Build the pop-up change with the wording as set out."
3. **Before payments go live:** the four `LABS_PLAN_*` variables on Vercel for preview deployments (the test codes), and four live plans made with the live key, their codes set for production.
4. **Real payments in Paystack's test mode,** in one round at the end, as he prefers.

## The ended email, by Resend's scheduled send (approved and built 2026-10-17)

He asked how the other emails are sent, said he is on Vercel's free plan and uses Resend, and chose: "Go with Resend's scheduled send for the ended email. Set out the SQL and the code change for my review first." **Approved the same day,** with the cancelled-email fix and the live check: "Approved, including the cancelled-email fix and the live Resend check. I've run the SQL in Supabase." The live table has the column. **Built the same day, as set out below,** uncommitted.

**The problem.** Every email in the app goes through Resend the moment something happens. The "ended" email has no such moment: it is due when 24 hours pass with no payment. Its wording is already written (`ended` in `sendLabsPlanEmail.js`); nothing sends it.

**The change, in short.**
- **When a renewal fails,** Labs sends the "failed" email at once, as now. It also hands Resend the "ended" email with a send time of the grace's last moment. Resend holds it and sends it then: emails "can be scheduled up to 30 days in advance" (Resend's documentation), and the installed Resend library supports it.
- **Labs keeps the held email's id** on the subscription, in one new column.
- **If the leader pays in time** (Paystack charges the updated card), **restarts from the plans page**, or **cancels**, Labs calls the held email off and clears the id.
- **A repeated notice from Paystack** for the same failed payment changes nothing. Today it would send the "failed" email twice. The grace row, now written last, marks the notice as handled.

**Who notices.** Only a leader whose renewal fails. If they do nothing, the "ended" email arrives as their access closes. If they pay, restart or cancel within the 24 hours, it does not arrive. Pages, prices, the webhook's narrowness, and the started, failed and cancelled emails are unchanged.

### The SQL

Tested on a throwaway Postgres 17, made for the check and deleted afterwards:
- rows already there are untouched, with the new column empty;
- Labs can write an id and clear it;
- the one-renewing rule still refuses a second plan;
- browsers still see nothing;
- running it again changes nothing.

```sql
-- Labs subscriptions: remember the "plan ended" email Resend is holding.
-- When a renewal fails, Labs asks Resend to send the "ended" email when the
-- 24 hours' grace runs out, and keeps the email's id here, so it can call
-- that email off if the leader pays, restarts or cancels in time.
-- Empty when no such email is waiting. Run once in the Supabase SQL editor.
-- Safe to re-run.
alter table public.labs_subscriptions
  add column if not exists ended_email_id text;
```

### The code (all in `intelligence`)

1. **`src/lib/emails/sendLabsPlanEmail.js`**
   - `send()` takes an optional send time and returns the email's id from Resend.
   - `ended()` takes `sendAt` (the grace's last moment) and returns `{ ok, id }`. Its wording is unchanged.
   - New `callOff(id)`: `resend.emails.cancel(id)`. Like every mail here, it never throws; a failure is logged.
2. **`src/lib/labs/manageSubscriptions.js`**
   - **`failedRenewal()`**, in this order:
     - if the grace row for this invoice already exists, return (a repeated notice);
     - call off any held email left from before;
     - hand Resend the new "ended" email for the grace's end;
     - save `attention` with the email's id; if that save fails, call the email off before failing, so Paystack's retry starts clean;
     - write the grace row;
     - send the "failed" email.
   - **`renewal()`** (a payment in time): calls off the held email and clears the id when it sets the plan back to active.
   - **`stopRenewing()`** (a cancel, or a new plan taking over): calls off the held email and clears the id in the same save.
   - `renewal()` and `stopRenewing()` are now given the mail, so `handleEvent()`, `firstPayment()` and `cancelPlan()` pass it on.
3. **The checks** (scratchpad `access/subscriptions.test.mjs`), with a stand-in mail that records what is held and called off:
   - a failure holds one email, for the grace's end, and keeps its id;
   - the same notice twice holds one and sends one "failed";
   - paying in time, restarting from the plans page, and cancelling each call it off and clear the id;
   - a second failure a month later replaces the old id;
   - Resend refusing to hold it leaves the rest working;
   - a failed save calls the held email off.
4. **Records:** this file, the tracker's step 46, and `intelligence/CLAUDE.md`.

### What could go wrong

- **The order matters.** The SQL is run first. Code that writes `ended_email_id` before the column exists would make failed-renewal notices answer 500. The column is added before the code is used. The live app today never reads it.
- **If Resend refuses to hold the email,** no "ended" email goes. The leader is still told, because the "failed" email names when access stops ("stays open to you until …").
- **If calling it off fails** at the moment a leader pays (Resend unreachable for that one call), they could still receive "ended" after paying. It is logged. It is rare, and their access is right either way, since access comes from the payment, not the email.
- **Calling off an email already sent** (a held email from an earlier month) is refused by Resend and logged, with no effect.
- **A held email counts as one email** on the Resend plan, like any other.

### Found while reading, and fixed with his approval

**The cancelled email during the 24 hours.** If a leader cancelled inside the grace, the "cancelled" email said "You keep AI Labs until [the last day you paid for]". That day was already past, since the grace began after it, and after this change it is their only email in that case. **Fixed:** for a plan in that state, `cancelPlan()` passes the grace's end, and the email says "You keep AI Labs until [date], [time] WAT."

### The live check, done 2026-10-17

One "ended" email was held on his Resend account, through the real sender, addressed to the admin email, for an hour ahead. Resend reported it `scheduled`. It was then called off through the real `callOff()`, and Resend reported it `canceled`. Nothing arrives. Both calls work with his key.

## The Labs icon's pop-up for Labs access still to come (approved and built 2026-10-17)

At his word: "Set out the fix for the Labs icon's 'access ended' pop-up for my review, with the exact wording, before changing anything." **Approved the same day:** "Approved. Build the pop-up change with the wording as set out." **Built the same day, as set out below,** uncommitted. Checked: the door rule (`door.test.mjs`, with `nextLabsAccess()`), the other Labs checks, the Labs icon walk (37 checks, every tier's wording word for word, a wide screen and a phone), lint and a production build.

**The problem.** The Labs icon asks the server what to do (`labsDoor()` in `labsAccess.js`). One answer is "subscribe", meant for someone whose Labs access had ended. It opens a pop-up headed "Your Labs access has ended", with the three paid tiers and "Subscribing opens here soon". Since Platform Awareness and the Toolbox are kept for good, anyone whose Labs access has begun goes straight into Labs. So the pop-up is now reached only by someone whose Labs access **has not begun yet**: an AICC client given their six months ahead of the engagement's first day, or a coaching client whose first term starts later. It tells them their access has ended, which is wrong. Its "Subscribing opens here soon" is out of date too, and they could not subscribe anyway: plans are for people already in Labs.

**Who sees it today:** nobody. The live `labs_access` table has no rows, and Labs is shut in production, where the icon is not drawn.

**The change.** "Subscribe" goes. In its place, a door for Labs access still to come: the pop-up says the day Labs opens to them and what it opens. The tier and its end come from the same rule Labs uses once that day arrives (`resolveLabsAccessLevel()` worked out for that day), so the pop-up and Labs cannot disagree. If they also have a challenge whose Labs is still to open, whichever opens first is shown. Everything else stays as it is: the icon itself, going into Labs, "Labs opens on [date]" for a challenge, and "Labs opens with the AI Stakeholder Challenge" for someone who has never had Labs.

### The exact wording

**Heading:** Labs opens to you on [first day]

**Then one paragraph,** by the tier that opens that day:

| Tier that opens | Paragraph |
|---|---|
| AI Stakeholder Labs | From that day, all of Labs is open to you until [last day], live calls included. Platform Awareness and the Toolbox stay yours for good. |
| AISC+ | From that day, AISC+ and AI Labs are open to you until [last day]. Platform Awareness and the Toolbox come with them, and stay yours for good. |
| AI Labs | From that day, AI Labs is open to you until [last day]. Platform Awareness and the Toolbox come with it, and stay yours for good. |
| Platform Awareness | From that day, Platform Awareness and the Toolbox are yours for good. |

With no end set, "until [last day]" is left out. The last day is the last day held, as Labs Home shows it.

**Button:** Close.

**For example,** an AICC client given six months from 3 November 2026 would see: "Labs opens to you on 3 November 2026", then "From that day, all of Labs is open to you until 2 May 2027, live calls included. Platform Awareness and the Toolbox stay yours for good."

**Taken out:** "Your Labs access has ended", "To keep working in Labs, choose a plan. Each one opens the tiers below it.", the list of the three paid tiers, and "Subscribing opens here soon."

### The code (all in `intelligence`)

1. **`src/lib/labs/labsAccess.js`**
   - New `nextLabsAccess({ rows, now })`: the earliest Labs access still to begin, with the tier and end it gives on that day, or none.
   - `labsDoor()` gives `{ kind: "starts", startsAt, tier, until }` in place of "subscribe", or "opens" if the challenge's Labs opens first. Its notes are updated.
2. **`src/app/api/labs/door/route.js`:** reads the person's Labs access rows (`readLabsAccess()`, already used on every Labs page) in place of `hasHadLabsAccess()`. As now, this happens only for a signed-in leader who cannot enter Labs.
3. **`src/lib/labs/readLabsAccess.js`:** `hasHadLabsAccess()` is removed, as nothing else uses it.
4. **`src/components/actions/LabsPromo.jsx`:** the "subscribe" pop-up is replaced by the one above, in the same frame and style as "Labs opens on [date]".
5. **Checks:**
   - the door rule in the scratchpad `door.test.mjs`: each tier, with and without an end, a challenge opening first, Labs access opening first, and the cases that do not change;
   - the Labs icon walk (`labs-door-walk.mjs` and its page) with the new pop-up on a wide screen and a phone;
   - lint and a production build.
6. **Records:** `intelligence/CLAUDE.md` (the Labs icon), the tracker's step 60, the blueprint, and this file.

### What could go wrong

- **If the Labs access rows cannot be read** at that moment, the door falls back to "Labs opens with the AI Stakeholder Challenge" (or the challenge's own date). That is the same fallback as today.
- **Nothing else reads "subscribe" or `hasHadLabsAccess()`** (checked across the app), so removing them touches nothing else.

## Checked so far

- **The SQL, on a throwaway Postgres 17 database,** made for the check and deleted afterwards. It covered a checkout never paid, a Premium in naira, a VIP in dollars, an upgrade replacing Premium, a failed renewal and a cancellation. Ten wrong rows were refused, each by its rule: a plan that does not exist, a currency not charged, nothing to charge, an unknown status, the same checkout twice, one Paystack subscription on two rows, a second renewing subscription for one leader, an account that does not exist, no first month, and deleting an account that still subscribes. The browser's roles could neither read nor write. Running the SQL again changed nothing.
- **The build, 2026-10-17:**
  - **The rules and steps, in memory,** against stand-ins for the table, Paystack and the mail (`subscriptions` check, all passing). They cover:
    - prices and who may buy;
    - a first payment, a short payment refused, and the same notice twice;
    - renewals back to back, a failed renewal with its 24 hours, and cancelling;
    - Premium to VIP with the table's one-renewing rule enforced;
    - a notice and a return at the same moment;
    - the challenge's, AICC's and VIP's payments passing by untouched.
  - **The earlier access, door, grant and progress checks,** all passing, with the "for good" rule.
  - **The real webhook on this machine,** with correctly signed notices that nothing acts on:
    - a wrong signature refused, as before;
    - a transfer acknowledged, as before;
    - a subscription and a failed invoice Labs does not know, read and left.
    - No payment was sent and nothing was written.
  - **The pages walked in a headless browser,** through a temporary page with Paystack stood in for (47 checks, all passing):
    - prices by location (naira in Nigeria, dollars elsewhere);
    - choosing, a refused checkout, the free months, a plan held, AICC;
    - settings with no plan, Premium, a failed payment, cancelled, a plan still to begin, and back from Paystack;
    - updating the card, cancelling with a second click, a phone.
  - **The admin list** with sample rows.
  - **The earlier Labs walks again** (70 and 41 checks, all passing).
  - **Lint and production builds,** the last after the change-of-plan fix.
- **The ended email, 2026-10-17:**
  - **The column,** on a throwaway Postgres 17 before he ran it, then read back from the live table.
  - **Eight more cases in the in-memory checks,** all passing:
    - a failure holds one email for the grace's last moment and keeps its id;
    - the same notice twice holds one email and sends one "failed";
    - paying in time, cancelling and restarting from the plans page each call it off and clear the id;
    - the cancelled email names the grace's end inside it, and nothing outside it;
    - a second failure a month later lets the old id go;
    - Resend refusing to hold it leaves the rest working;
    - a failed save calls the held email off, so Paystack's retry starts clean.
  - **The earlier checks, all passing.**
  - **Lint and a production build.**
  - **The live check above.**
- **Not checked:** a real payment, Paystack's real notices, or the pages signed in. Nothing has been written to the live tables.

## The SQL

```sql
-- Labs subscriptions: the payment side of Premium and VIP.
-- One row per subscription a leader starts. What it opens, month by month,
-- is written to labs_access; this table holds what Paystack needs.
-- Run once in the Supabase SQL editor. Safe to re-run.
create table if not exists public.labs_subscriptions (
  id uuid primary key default gen_random_uuid(),
  -- Whose it is. An account with a subscription cannot be deleted until the
  -- subscription is ended, so nobody keeps being charged unseen.
  user_id uuid not null
    references public.users (id) on delete restrict,
  -- Premium opens AI Labs; VIP opens AISC+ and AI Labs.
  plan text not null
    constraint labs_subscriptions_plan_check
    check (plan in ('premium','vip')),
  -- Charged in the currency of where they are: naira in Nigeria, dollars elsewhere.
  currency text not null
    constraint labs_subscriptions_currency_check
    check (currency in ('NGN','USD')),
  -- The monthly price charged, as the server set it.
  amount numeric not null
    constraint labs_subscriptions_amount_check
    check (amount > 0),
  -- pending: checkout started, not paid. active: paid, renewing monthly.
  -- non-renewing: cancelled, running to the end of the paid month.
  -- attention: a renewal failed. cancelled, completed: over.
  -- abandoned: a checkout never paid.
  status text not null default 'pending'
    constraint labs_subscriptions_status_check
    check (status in ('pending','active','non-renewing','attention','cancelled','completed','abandoned')),
  -- The first payment, at checkout. Paystack's notice finds the row by it.
  reference text not null
    constraint labs_subscriptions_reference_key unique,
  -- When the first paid month begins: now, or the day the free months end.
  starts_at timestamptz not null,
  -- From Paystack, once paid: the customer, the subscription, and the token
  -- Paystack asks for to cancel it.
  paystack_customer_code text,
  subscription_code text
    constraint labs_subscriptions_subscription_code_key unique,
  email_token text,
  next_payment_date timestamptz,
  -- A change of plan: the subscription this one takes over from.
  replaces uuid
    references public.labs_subscriptions (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Labs looks a leader's subscriptions up by their account.
create index if not exists labs_subscriptions_user_idx
  on public.labs_subscriptions (user_id);

-- One renewing subscription per leader at a time.
create unique index if not exists labs_subscriptions_one_renewing_key
  on public.labs_subscriptions (user_id) where status in ('active','attention');

-- Read and written by the server only.
alter table public.labs_subscriptions enable row level security;
```
