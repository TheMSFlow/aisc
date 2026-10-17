# Labs: the Learning Center's words about it (tracker step 40)

> **What this is:** step 40 set out for the founder's review, 2026-10-16, at his word: "Set out step 40 for my review: the Learning Center's words about Labs, with the exact wording before anything changes." **Nothing has been changed.** **Not approved, the same day:** "I do not appprove. I don't see this as relevant at this time." Kept for when he raises it again. Each proposed line is mine, for him to approve, change or refuse.
> **Measured against:** `SOURCE_OF_TRUTH.md` (Labs: "Say 'Labs' for the whole", AI Labs is "Recorded Sessions" to a leader, "say the first months are free and that AI Labs is by subscription", "the day after Day 7, not Day 8", and what stays open for good: Platform Awareness and the Toolbox) and `LABS_BLUEPRINT.md` ("Two kinds of access").

## In short

Most of what the Learning Center says about Labs already matches. Four places do not quite:

1. The Toolbox tile is labelled "AI Labs" but opens the whole of Labs.
2. The notice says "Labs are open" where everything else says "Labs is", and "Your first 3 months are free" does not say of what.
3. The schedule's "Beyond Day 7" names AI Labs alone, and never what stays open for good.
4. The Labs tab on Next Steps never says what stays open for good either.

## The changes proposed

### 1. The Toolbox's Labs tile
`intelligence/src/utils/challenge/ToolBox.jsx:211`. In the Learning Center's Toolbox, beside Resources, Roadmap, Mini Apps and Margins.

| | Now | Proposed |
|---|---|---|
| Label | AI Labs | **Labs** |
| Hint while shut | Opens after Day 7 | **Opens the day after Day 7** |
| Hint where the challenge has no Labs | Coming soon | Coming soon (unchanged) |

**Why:** the tile opens Labs as a whole (`/labs`), not the AI Labs tier. "Say 'Labs' for the whole." The source of truth says "the day after Day 7", and Labs opens then, not on Day 7.

### 2. The notice when Labs opens
`intelligence/src/components/challenge/LabsOpenNotice.jsx:82` and `:68`. It shows once, from the day after Day 7, while the free months run.

| | Now | Proposed |
|---|---|---|
| Title | Labs are open | **Labs is open** |
| Line | Your first 3 months are free. | **Your first 3 months of AI Labs are free.** |
| Link | Open Labs | Open Labs (unchanged) |

The month count follows the seat: "Your first month of AI Labs is free." for General Admission, 3 for VIP, 6 for VVIP.

**Why:** "Labs" is one place: the Next Steps tab says "Labs is where you practise". The free months open AI Labs alone ("Free months are for AI Labs alone"), so the line names it. *If "Labs are open" was his own phrase, it stays.*

### 3. The schedule's "Beyond Day 7"
`intelligence/src/components/challenge/CurriculumSchedule.jsx:128`. The last block of the curriculum schedule.

| Now | | Proposed | |
|---|---|---|---|
| **Beyond Day 7** · AI Labs | | **Beyond Day 7** · **Labs** | |
| Recorded Sessions | By subscription | **Platform Awareness and the Toolbox** | **Free, for good** |
| Your first 3 months | Free | **AI Labs: Recorded Sessions** | By subscription |
| | | **AI Labs, your first 3 months** | Free |

The month count follows the seat, as now.

**Why:** what opens the day after Day 7 is Labs, not AI Labs alone. The source of truth's summary of Labs names what stays open for good, and the schedule is where a leader looks for what comes after the seven days. "Recorded Sessions" is kept, as the agreed name for AI Labs to a leader.

### 4. The Labs tab on Next Steps
`intelligence/src/components/challenge/NextStepsHub.jsx:109`. The tab stays a summary, as he asked on 2026-10-11, without the ladder.

| | Now | Proposed |
|---|---|---|
| Paragraph | Labs is where you practise what the challenge taught. You experiment inside real AI environments, on tasks, workflows and projects, using AI Fluency, AI Agents, frameworks and methodologies. | Unchanged |
| While the free months run | AI Labs is by subscription, and your first 3 months are free with VIP. | AI Labs is by subscription, and your first 3 months are free with VIP. **Platform Awareness and the Toolbox stay open to you for good.** |
| After the free months | (nothing) | (nothing, unchanged) |
| Before Labs opens (preview only) | Labs opens the day after Day 7. | Unchanged |

**Why:** it adds the one fact the summary is missing, in one sentence. **His to decide:** whether the same sentence also shows once the free months are over. On 2026-10-11 he chose to say nothing then ("The labs page will clarify all details"), so it is proposed only while the months run.

## Checked, and left as they are

- **The Labs icon beside the profile button** (`ChallengeUserIcon.jsx:91`): "Labs", and "Labs opens the day after Day 7" while shut. It already matches.
- **The coaching card** (`CoachingProgram.jsx:110`): "...and all of Labs for as long as you are in coaching." Changed at his word on 2026-10-13 (tracker step 49). It already matches.
- **Day 1, Day 2, Day 7 and the Roadmap** speak of the work with AI beginning "in AI Labs, which opens the day after Day 7" (for example `day-1/page.jsx:220`). This is accurate: every seat's free months open AI Labs. The wording in the challenge's own documents is step 48, separate from this one.
- **"Phase 1 — Clarity & Labs"** on the Roadmap is a phase name, not a description of Labs.

## If he approves

The four changes are in four files. They touch words only, never when anything shows or what it opens. They will be checked in a browser at a wide screen and a phone, in each state: shut, free months running, and months over.
