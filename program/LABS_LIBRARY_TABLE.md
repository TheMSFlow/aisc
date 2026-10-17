# Labs: the library table

> **What this is:** the proposal for tracker step 9, written 2026-10-16 for the founder to review. **Approved the same day:** "Table approved." He runs the SQL at the foot of this file in the Supabase SQL editor (step 10).
> **Goes with:** `LABS_TRACKER.md` (the steps) and `LABS_BLUEPRINT.md` (the decisions).

## In short

One new table, `labs_items`. Every platform, course, module, topic, video, deep dive and session in Labs is one row, and so is anything the Toolbox holds that is managed from admin. Each row points to the row it sits inside. Nothing else in the database changes, and nothing reads the table until step 11.

**Changed the same day, before any SQL was run.** The founder told us, 2026-10-16: "The AISC Resources page will later hold videos for each day. The idea behind this is that there will be a on demand seat before General Admission. This on demand seat will not have to wait for a cohort. They'll be able to start as soon as they pay." The page is renamed "AISC". So the Toolbox will hold videos too, and those should be added from admin like everything else. The table now takes the Toolbox as well as the four tiers, which the first proposal left for later. That change is two words, `toolbox` and `group`, and the rest of the table already fits a day: one video, its task and its documents, or, for a day with several videos, a module holding them in order.

## What was checked first

- **The live database, read on 2026-10-16.** It has 26 tables, none of them for Labs, and none with a name the new one would clash with. The new table follows the existing ones: the database makes each row's id, dates carry their time zone, lists are kept as JSON, and the allowed values are written into the table itself, as in `aica_submissions`.
- **His answers of 2026-10-16.** Nothing opens outside its tier, a tier opens all at once, and AICC clients see the same library as everyone else. So a row carries no access setting and no release date of its own. Its tier decides who may open it.

## What one row holds

| Column | What it is |
|---|---|
| `tier` | One of the four tiers, `platforms`, `ai-labs`, `aisc-plus` and `stakeholder-labs`, or `toolbox`, which sits beside them |
| `kind` | `platform`, `course`, `module`, `topic`, `group` (a Toolbox group, such as AISC), `video` (a video that stands alone), `lesson` (a page inside something), or `session` |
| `parent_id` | The row it sits inside. Empty for something that stands alone in its tier |
| `slug` | The last part of its address, as in `/labs/ai-labs/build-a-website` |
| `position` | Its place among the rows beside it |
| `title`, `summary` | Its name, and one plain sentence about it |
| `minutes` | Its length. Later taken from Cloudflare (step 22) |
| `video_id` | The video on Cloudflare. For a session, its recording, added after the call |
| `outcomes` | What the leader will be able to do, as a list. Used by lessons and courses |
| `task` | The task: a title and its steps |
| `resources` | The documents that go with it. Each is a title and a link, or a pointer to a document the Toolbox already lists, so that a challenge document's link stays in one place (step 13) |
| `starts_at`, `join_url`, `special` | For a session: when it starts, the joining link, and whether it is a special event |
| `status`, `published_at` | Draft or published, and when it was first published. "What's new" on Labs Home is drawn from that date |
| `created_at`, `updated_at` | When the row was made and last changed |

**How the tree looks, using today's placeholder content:**

```
AI Labs
  Build a website with AI              course
    Plan the site                      module
      Who it is for                    lesson
      The pages you need               lesson
    Words and design                   module
      ...
  One idea, five formats               module, standing alone
    The source piece                   lesson
    ...
  Research you can check               video, standing alone

AI Stakeholder Labs
  A guest leader on AI governance      session, special event

Toolbox
  AISC                                 group
    Day 1                              lesson: its video, task and documents
    Day 2                              module, if a day has several videos
      The session                      lesson
      The task                         lesson
```

The days of the AISC group are an example of what it could hold once its videos exist. Nothing of the Toolbox moves into the table until then.

## What the database makes sure of

1. A tier and a kind are always one of the allowed values.
2. A lesson always sits inside something. A module may stand alone or sit inside a platform, course, topic or Toolbox group. Everything else stands alone in its tier.
3. Whatever sits inside something is in the same tier as it.
4. Live sessions belong to AI Stakeholder Labs.
5. No two things share an address. Two platforms may each have a lesson called "The workspace", since their addresses differ.
6. Something that still holds anything cannot be deleted. Its contents are removed or moved first, so nothing disappears by accident.
7. An address is lowercase words joined by hyphens, a title is never blank, and a length is more than zero.
8. **Only the server reads and writes the table.** A leader's browser cannot read it directly. So a video, a task or a joining link reaches a leader only when the server has decided they may open it (step 25). This is how `aica_submissions` works too.

## What the admin page will see to (step 14)

- Which kinds go in each tier: platforms in Platform Awareness; courses, modules and videos in AI Labs; topics in AISC+; sessions in AI Stakeholder Labs; groups in the Toolbox. Kept in code, where it is easy to change.
- Making an address from a title, with a number added when one is taken. It also stops two lessons in different modules of one course from sharing an address, which is the one case the database cannot see.
- Something is shown to leaders only when it, and everything it sits inside, are published.
- Setting `published_at` and `updated_at`.

## Not in this table

- **Who may open what:** Labs access (step 24, `LABS_ACCESS_TABLE.md`).
- **What a leader has watched:** step 30.
- **The tiers themselves,** their names, order and ladder, and who may open the Toolbox. They are fixed, and stay in code.
- **What the Toolbox holds today.** Its documents, mini apps and Roadmap stay in code, because the same lists feed the challenge's pages that participants use now. The table is ready for the AISC group's day videos, and for the Roadmap walkthrough and the Margins guides, when they exist.
- **The On Demand seat itself:** what it costs, what it opens and how its participant moves through the days. Those belong to Labs access and to the redesign of the AISC page, not to this table. Whether a day opens only once the one before it is done would come from progress (step 30) and the days' order, which the table already holds.
- **Card pictures,** which come from Cloudflare (step 22).

## Checked

- **Run on a throwaway Postgres 17 database on this machine,** made for the check and deleted afterwards. Supabase runs on Postgres too. The table was made, and running the SQL a second time changed nothing. Fifteen sample rows went in: a course with a module and its lessons, a module standing alone, a single video, a session, two platforms that each had a lesson called "The workspace", and a Toolbox group, AISC, holding one day as a lesson and another as a module with two videos. Sixteen wrong rows were refused, each by the rule meant to catch it. Among them were a lesson with nothing to sit in, a lesson put in a different tier from its course, a Toolbox day put under an AI Labs course, two items with one address, a session in AI Labs, and deleting a course that still held a module. *Run again after the Toolbox was added, the same day.*
- **Every item in today's preview fits.** All 125 of them (4 platforms, 3 courses, 21 modules, 5 topics, 4 videos, 80 lessons, 8 sessions) were turned into rows and checked against the same rules, and none broke one.
- **Not checked:** running it on the live database. That is step 10, and it is his.

## What happens next

- **Step 10, the founder:** run the SQL below in the Supabase SQL editor. It makes an empty table. The live site and this machine share one database, so the table exists in production at once, but nothing reads it until step 11.
- **Step 11, the agent:** Labs reads the published rows. The SQL is then also kept in `intelligence/src/lib/labs/`, beside the code that reads the table, as the other tables' SQL is.

## The SQL

```sql
-- The Labs library: everything Labs holds, one row per item.
-- Run once in the Supabase SQL editor. Safe to re-run.
create table if not exists public.labs_items (
  id uuid primary key default gen_random_uuid(),
  -- The four tiers, and the Toolbox, which sits beside them and is kept the
  -- same way. The ladder and who may open each are in code, not here.
  tier text not null
    check (tier in ('platforms','ai-labs','aisc-plus','stakeholder-labs','toolbox')),
  kind text not null
    check (kind in ('platform','course','module','topic','group','video','lesson','session')),
  parent_id uuid,
  slug text not null
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  position integer not null default 0,
  title text not null
    check (length(btrim(title)) > 0),
  summary text,
  minutes integer
    check (minutes is null or minutes > 0),
  video_id text,
  outcomes jsonb not null default '[]'::jsonb
    check (jsonb_typeof(outcomes) = 'array'),
  task jsonb
    check (task is null or jsonb_typeof(task) = 'object'),
  resources jsonb not null default '[]'::jsonb
    check (jsonb_typeof(resources) = 'array'),
  starts_at timestamptz,
  join_url text,
  special boolean not null default false,
  status text not null default 'draft'
    check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- A child sits in its parent's tier: the pair (parent, tier) must exist.
  constraint labs_items_id_tier_key unique (id, tier),
  constraint labs_items_parent_fkey
    foreign key (parent_id, tier) references public.labs_items (id, tier)
    on delete restrict,

  -- A lesson always sits inside something. A module may stand alone or sit
  -- inside a platform, course, topic or Toolbox group. Everything else
  -- stands alone.
  constraint labs_items_place_check check (
    case kind
      when 'lesson' then parent_id is not null
      when 'module' then true
      else parent_id is null
    end
  ),

  -- Live sessions belong to AI Stakeholder Labs.
  constraint labs_items_session_check
    check (kind <> 'session' or tier = 'stakeholder-labs')
);

-- No two things share an address: /labs/<tier>/<item> and /labs/<tier>/<item>/<lesson>.
create unique index if not exists labs_items_top_slug_key
  on public.labs_items (tier, slug) where parent_id is null;
create unique index if not exists labs_items_child_slug_key
  on public.labs_items (parent_id, slug) where parent_id is not null;

-- Read and written by the server only, which decides what each leader is sent.
alter table public.labs_items enable row level security;
```
