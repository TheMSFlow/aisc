# Labs: what is left

> **What this is:** the list of everything between Labs as it stands and Labs working for leaders. Asked for by the founder on 2026-10-11: "What are all the remaining things we need to do in labs to get it functional, let's have a list we can track."
> **How to use it:** tick a box when a step is done and put the date beside it. Add a step where one is missing. Refer to a step by its number.
> **Goes with:** `LABS_BLUEPRINT.md`, which holds the decisions and what is built. This file holds only what is left.
> **Who:** **F** is the founder. **A** is the agent. Every step of A's that touches the database comes to F as SQL to run, and every step is reviewed before it starts.

## To pick this up again

The work paused on 2026-10-11, at a checkpoint the founder chose: "I'd like to save my work now and continue the labs project later."

- **Where Labs is:** `/labs` in `intelligence`. It is live on this machine and on a preview deployment, and shut in production (step 37).
- **What was decided and built:** `LABS_BLUEPRINT.md`, from "The structure" down.
- **The next step:** step 1, the founder's walk through it signed in. Then his decisions, steps 3 to 8.
- **Snapshots and checks:** `aisc/screenshots/labs/`, which git ignores. Its README says what each is.

## Two finish lines

1. **Open to leaders** (steps 1 to 41). Platform Awareness is free, AI Labs opens on the free months after the challenge, and nothing is sold yet. Labs is useful from here.
2. **Subscriptions** (steps 42 to 47). Premium and VIP can be bought, renewed and cancelled.

Content (steps 32 to 36) is the founder's, and runs alongside everything else. It is the longest piece.

## Done

- [x] The structure, as a preview with placeholder content: five kinds of page, the menu, search, Browse, locked states (2026-10-11)
- [x] The colours: one dark, a lighter shade, each tier's colour as a small mark (2026-10-11)
- [x] The menu at six lines, with one line to mark where a leader is (2026-10-11)
- [x] Step 37, the switch that keeps Labs shut in production (2026-10-11)

## A. Sign off the structure

- [ ] **1. F** Walk the preview signed in, on a wide screen and a phone. It has only been seen through a signed-out test page.
- [ ] **2. A** Fix what the walk finds.
- [ ] **3. F** Name what AISC+ holds. "Topic" and "deep dive" are working words.
- [ ] **4. F** The six subjects the Day 2 guide says AI Labs holds: do they sit in AI Labs, or in AISC+ with the guide reworded? The free months open AI Labs and not AISC+.
- [ ] **5. F** Description and Discernment: taught in AI Labs, as the challenge's documents say, or in AISC+ with the Loop's documents?
- [ ] **6. F** The Toolbox inside Labs, and Day 3 reopening: still wanted, and in which tier?
- [ ] **7. F** Confirm the dark frame, the gold, and whether "Mark as watched" is a button or happens when a video ends.
- [ ] **8. F** The house button at the foot of the menu is also "Home", and leaves Labs. Keep, rename or repoint.

## B. The library in the database

Today everything Labs shows comes from one file of placeholder content. Nothing can be added without editing code.

- [ ] **9. A** Read the live schema, then propose the table: one list of items that point to their parent (tier, kind, order, title, summary, minutes, video, outcomes, task, resources, draft or published, and for a session its date and joining link). One table, not one per tier.
- [ ] **10. F** Run the SQL.
- [ ] **11. A** Labs reads from the table, published items only. The pages do not change.
- [ ] **12. A** Search and Browse read from the table.
- [ ] **13. A** One home for the document links. Today the old Day 2 links live in `catalog.js` for the Toolbox, and Labs shows the documents' names only.

## C. Labs Manager, in admin

"Content and links will be handled by the admin." There is no Labs page in admin yet.

- [ ] **14. A** A Labs page in admin: everything by tier, with add, edit, reorder and remove for platforms, courses, modules, topics, lessons and single videos.
- [ ] **15. A** A lesson's fields: title, summary, minutes, what the leader will be able to do, the task and its steps, resources, the video. Draft until published.
- [ ] **16. A** Sessions: date and time, joining link, special event or not, and afterwards the recording.
- [ ] **17. A** "See it as a leader" from admin, before publishing.

## D. Video, on Cloudflare

The app plays YouTube today, in the apprentice's Learning Center. Cloudflare is new to it.

- [ ] **18. F** A Cloudflare Stream account, and its keys given as environment variables. Names only go in any document.
- [ ] **19. F** How a video gets in: uploaded in Cloudflare with its ID pasted into admin (simplest), or uploaded from admin.
- [ ] **20. A** The player on the lesson page.
- [ ] **21. A** Playback a leader cannot pass on: the server signs each viewing, and only for a leader who may watch.
- [ ] **22. A** Each card's picture and each video's length taken from Cloudflare.

## E. Access: the ladder, enforced

Nothing is gated today. The "View as" bar only draws the locks.

- [ ] **23. A** The server works out a leader's level: challenge access opens Platform Awareness, the free months open AI Labs (that rule is built), VIP opens AISC+, group coaching opens everything. *(Added 2026-10-13, founder: "AICC participants get access to all tiers in AISC Labs for 6 months." Not built. Still his to say: when the six months start, whether a Strategic Briefing buyer counts, and whether the live calls of AI Stakeholder Labs are included.)*
- [ ] **24. A** One record of access for what cannot be worked out from the challenge: a subscription, coaching, a grant by hand. One table, as SQL. No coaching record exists anywhere yet.
- [ ] **25. A** The server decides what is sent. A locked lesson gets its title, outcomes and summary, and no video, task or links.
- [ ] **26. F** A signed-in user with no challenge access can reach `/labs` today. What should they see?
- [ ] **27. F** When the free months end: what is the leader offered? And a retake on a lower tier resets a leader with months left to fewer: keep that rule? **And the months count from the day after Day 7 whether or not Labs is live.** A cohort that finishes while Labs is shut in production uses up its free months without having had them. Do theirs start when Labs opens? *(On that last question, founder, 2026-10-13, deciding how the AISC site describes Labs: "The idea is to act as though Labs is active. It will be before any participant get's there." So the site is written as though Labs is open and the months rule stays as it is. It makes steps 32 to 38 and the opening of Labs in production due before the first cohort on the new program reaches the day after Day 7. The first two questions in this step are still open.)*
- [ ] **28. A** A leader is shown their own access: which tier they hold, and until when.
- [ ] **29. A** The "View as" bar goes, or stays for admin only.

## F. Progress

"It's important they can track their progress. But I don't want too much tables in my backend."

- [ ] **30. A** Save what a leader has watched: one small table, or one column on a row they already have. As SQL.
- [ ] **31. A** The pages read it: Continue on Home, ticks in an outline, "3 of 11" on a card. The browser-only stand-in goes.

## G. Content (founder), alongside everything else

- [ ] **32. F** Platform Awareness: which platforms first, and their videos recorded. *(Answered in part, founder, 2026-10-13: "For the platform awareness, I'll have to focus on Claude alone for now, so in Labs others can be locked for now." So Claude is first and alone. **For A, when Labs work resumes:** show the other platforms in the preview as locked. Today it shows five open, one of them empty.)*
- [ ] **33. F** AI Labs: the first videos, modules or course.
- [ ] **34. F** AISC+: the deep dives made from what left the challenge. Their documents exist.
- [ ] **35. F** For each video: title, one-line summary, what the leader will be able to do, the task.
- [ ] **36. F** AI Stakeholder Labs: session dates and joining links. Coaching runs three Saturdays a month, 7PM WAT, two hours.

## H. Before a leader sees it

- [x] **37. A** A switch that keeps Labs shut until there is real content. **Done 2026-10-11,** at his word: "I want it visible in dev/local but not in prod." Labs is live on this machine and on a preview deployment, and shut in production. Shut, every page under `/labs` answers "not found", and the Learning Center treats the challenge as having no Labs: no Labs icon, no "Labs are open" notice, no Labs tab on Next Steps, and the Toolbox's AI Labs tile shut. **To open Labs in production, set the environment variable `LABS_LIVE` to 1 there.** The rule is in `intelligence/src/lib/labs/live.js`.
- [ ] **38. A** Remove the placeholder library once real content is in.
- [ ] **39. A, F** Every page tried signed in: wide screen, phone, keyboard only, an empty tier, an address that does not exist.
- [ ] **40. A** The Learning Center's own words about Labs made to match: the Labs tab on Next Steps, the Toolbox's "AI Labs" tile, the "Labs are open" notice, "Beyond Day 7: AI Labs" in the schedule, the coaching card.
- [ ] **41. F** Commit and push.

**Here Labs is open to leaders.**

## I. Subscriptions

The app takes one-off payments only. Nothing recurring exists.

- [ ] **42. F** The monthly prices for Premium and VIP, in dollars and naira.
- [ ] **43. F** The rules: moving from Premium to VIP part-way through a month, and a subscription bought while free months are still running.
- [ ] **44. A** Recurring payment through Paystack: start, confirm, and the notice Paystack sends on each renewal, each writing to the record of access. Prices enforced on the server.
- [ ] **45. A** Subscribe from any locked page, a page of the plans, and a way to cancel.
- [ ] **46. A** What happens when a renewal fails, a leader cancels, or a period ends, with the emails for each.
- [ ] **47. A** In admin: who subscribes, and granting or ending access by hand.

**Here Labs is complete.**

## J. The rest of the ecosystem, at the founder's word

"The site copy is the last thing we'll do and I'll let you know when."

- [ ] **48.** The challenge's documents: the "In AI Labs" label, and the Day 2 guide's six subjects, following step 4.
- [x] **49.** Coaching's promise: "AI Labs for as long as coaching lasts" is now AI Labs and AISC+. **Done 2026-10-13,** in wording he approved: the coaching page, the wizard's catalogue and the Learning Center's coaching card say "all of Labs". Uncommitted. The agent guides still carry the old line.
- [x] **50.** The public site and `AISC_BRIEF.md`: the tiers, their names, the free months. **Done 2026-10-13,** uncommitted: the site gives a summary and not the ladder, at his word, and `AISC_BRIEF.md` and the other three guides say the same.
- [ ] **51.** The records: `SOURCE_OF_TRUTH.md`, `LINK_MAP.md`, `ARCHITECTURE.md`, and a Labs section in `intelligence/CLAUDE.md`. *(The first three were brought up to date on 2026-10-13. The Labs section in `intelligence/CLAUDE.md` is not written.)*

## K. Tidying

- [ ] **52. A** The folder `[shelf]` renamed `[tier]`; `catalog.js` removed once nothing reads it; the first scaffold removed from `deprecated/` when the founder says.
- [ ] **53. A** The Academy report given a permanent home, and `PENDING_TASK_labs-academy-reference.md` deleted. Its snapshots are safe in `aisc/screenshots/labs/academy/` since 2026-10-11.
- [ ] **54. A** The check that walks every Labs page and link given a proper home in the repo. It is kept in `aisc/screenshots/labs/tools/` since 2026-10-11, and needs a temporary page to run.

## Later, not needed for either finish line

- A short "Recent" list in the menu, capped, once progress is saved.
- Transcripts. "No transcripts for now."
- A quiz, a hand-in or a badge at the end of a course.
- Telling leaders by email about a new session or new videos.
