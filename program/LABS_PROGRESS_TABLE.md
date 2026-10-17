# Labs progress: the table

> **What this is:** the proposal for tracker step 30, written 2026-10-16 for the founder to review, at his word: "Approved. Start progress (steps 30 and 31): propose how to save what each leader has watched, as SQL for me to review first." **Approved and run the same day:** "The progress table is approved and I've ran the SQL." The live table matches the SQL at the foot of this file.
> **Goes with:** `LABS_TRACKER.md` (the steps), `LABS_BLUEPRINT.md` (the decisions), `LABS_LIBRARY_TABLE.md` (the library) and `LABS_ACCESS_TABLE.md` (Labs access).

## In short

One small table, `labs_progress`: a row for each lesson or video a leader has opened, holding when they last opened it and when they marked it watched. It saves what Labs keeps today in the browser alone, so a leader's ticks, their "3 of 11" and "Continue where you stopped" follow them to any device. Nothing else in the database changes, and nothing reads the table until step 31.

## What he asked for

- "It's important they can track their progress. But I don't want too much tables in my backend." The tracker offered two shapes: one small table, or one column on a row a leader already has.
- "Let mark as watched be a button" (step 7). A lesson counts as watched when the leader presses it, not when a video ends.

## Three ways it could be kept, and the one proposed

1. **The Learning Center's progress table, `challenge_page_progress`.** No new table. But every row there must belong to a challenge enrolment and a cohort. People with Labs access only, such as AICC clients and On Demand participants, have neither. A retake would also split a leader's progress in two. Bending it would change a table the Learning Center depends on. **Set aside.**
2. **One column on their account, in `users`.** No new table either: a list of marks inside each leader's row. But each mark rewrites the whole list, so a mark made on a phone and one made on a laptop can overwrite each other. Marks on a lesson removed from Labs would stay in the list for good. And `users` is read on every page, for the sign-in check, so it is best left as it is. **Not recommended.**
3. **One small table, `labs_progress`. Proposed.** Each mark is its own small write, so nothing is lost between devices. A lesson removed from Labs takes its marks with it. Later, "who has watched what" is a single question to the database, if he wants it in admin. It is the only table progress needs.

## What one row holds

| Column | What it is |
|---|---|
| `user_id` | Whose progress it is: their account |
| `item_id` | The lesson, video or day in the library (`labs_items`) |
| `opened_at` | When they last opened it. "Continue where you stopped" is the one opened last, as today |
| `done_at` | When they marked it watched. Empty until they press the button, and emptied again if they take the mark off |

There is one row per leader per lesson, so a lesson opened many times is still one row.

## How Labs will use it (step 31, put to him before it starts)

- **"Mark as watched"** sets `done_at`. Taking the mark off empties it.
- **Opening a lesson** sets `opened_at`. Labs Home's "Continue where you stopped" is the lesson opened last.
- **Ticks in an outline, and "3 of 11" on a card,** count the marked lessons of each course, module or topic.
- **Only what a leader may open can be marked.** The server checks the rung before it writes.
- **Each lesson's database id goes to the page.** Today only its address does, and the Labs Manager can change an address. The marks follow the lesson, not its address.
- **The browser-only stand-in goes.** Marks made before in a browser were made on the preview's placeholder content, so they are not carried over.
- **Progress is kept when access ends.** A leader who comes back finds their marks where they left them.

## What the database makes sure of

1. One row per leader per lesson. A double click cannot make two.
2. Every row belongs to an account and a library item that exist.
3. Deleting an account deletes its progress. Removing an item from Labs removes the marks on it, and nobody else's.
4. **Only the server reads and writes it,** like the other Labs tables. A browser cannot read anyone's progress, its own included, or write any.

## Not in this table

- **A history of every visit.** Only the last opening of each lesson is kept, which is all "Continue" needs.
- **The Learning Center's progress,** which stays in `challenge_page_progress`, untouched.
- **Percentages, streaks or certificates.** They can be worked out from these rows if he ever wants them, without another table.

## Checked

- **Run on a throwaway Postgres 17 database on this machine,** made for the check and deleted afterwards. It had stand-ins for `users`, for the library table as it was run, and for Supabase's browser and server roles. The table was made, and running the SQL a second time changed nothing.
- **The writes Labs will make, as the database client sends them.** One leader opened three lessons and a single video, and marked two lessons and the video watched, one lesson twice with a double click. She opened a lesson again, which kept its mark, and took the mark off the video. A second leader marked a lesson without an opening recorded first. The rows came out right: a double click made one row, reopening kept the mark, and taking a mark off kept the row as opened.
- **What the pages will ask:** the ticks for a module's four lessons (the two marked), its card ("2 of 4"), and "Continue where you stopped" (the lesson opened last).
- **Five wrong rows were refused,** each by the rule meant to catch it: an item not in the library, an account that does not exist, the same lesson twice as two rows, no lesson, and no account.
- **The browser's roles, signed in and signed out, saw no rows and could write none.** The server's role saw all of them.
- **Removing a lesson from the library removed the marks on it, and nobody else's. Deleting an account removed its progress, and nobody else's.**
- **Not checked:** running it on the live database. That is his.

## What happens next

- **The founder:** review this, and if he approves, run the SQL below in the Supabase SQL editor. It makes an empty table. The live site and this machine share one database, so the table exists in production at once, but nothing reads it until step 31.
- **Then the agent, put to him first:** step 31, the pages reading and writing it, as set out above.

## The SQL

```sql
-- Labs progress: what each leader has opened, and marked watched.
-- One row per leader per lesson or video they have opened.
-- Run once in the Supabase SQL editor. Safe to re-run.
create table if not exists public.labs_progress (
  -- Whose progress it is. If the account is deleted, its progress goes too.
  user_id uuid not null
    references public.users (id) on delete cascade,
  -- The lesson, video or day in the library. If it is removed from Labs,
  -- the marks on it go with it.
  item_id uuid not null
    references public.labs_items (id) on delete cascade,
  -- When they last opened it: "Continue where you stopped" on Labs Home.
  opened_at timestamptz not null default now(),
  -- When they marked it watched, with the button. Empty until then, and
  -- emptied again if they take the mark off.
  done_at timestamptz,
  primary key (user_id, item_id)
);

-- Removing an item from Labs finds its marks at once.
create index if not exists labs_progress_item_idx
  on public.labs_progress (item_id);

-- Read and written by the server only, for the leader who is signed in.
alter table public.labs_progress enable row level security;
```
