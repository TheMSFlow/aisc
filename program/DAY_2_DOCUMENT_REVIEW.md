# Day 2, rebuilt on the founder's notes

> **Rebuilt 2026-10-10, on the founder's instruction, in two passes.** This file replaces those written earlier that day.
> Day 2's documents were written here and are not on Google Docs yet, so the Markdown was rewritten and the designed documents and the deck were rebuilt from it (rule 14). **The founder reviews the documents, and gives their four links once he is satisfied.**
> Nothing here is committed or pushed by an agent.

## What happened

1. **2026-10-08.** The founder shared `AI Readiness ENG.pdf` and said Day 2 is "about the leader personally". That was read as the leader's own habits with AI. The resource's dimensions were set aside, and six others were built from academic literacy scales: Vision, Confidence, Understanding, Practice, Judgment, Responsibility.
2. **2026-10-10, morning.** The founder ruled that any task involving AI is pushed to AI Labs. Three of those six dimensions measured the leader's use of AI, so their moves for this week had to be rewritten as stand-ins.
3. **2026-10-10, afternoon.** He shared four pages of his own notes: "What I wrote about being ready for AI resonates more than what I'm getting from you." They are transcribed in `resources/day-2-ai-readiness/founder-readiness-notes.md`.
4. **First pass.** Day 2 was rebuilt on his six dimensions, as the leader assessing what they lead: "your team", "your organisation", "we".
5. **Second pass, the same day.** He corrected the voice: "always refer to the leader and not their team or their organization. That's what I meant by make it personal."

## The founder's decisions (2026-10-10)

1. **Rebuild everything,** on what is now known and on the original resource, with his notes as the guide.
2. **The six dimensions are those of his own maturity assessment:** Strategy, Data Governance, Talent, Processes, Impact Evaluation, Collaboration.
3. **Every line speaks to the leader, never to their team or their organisation.** His example: not "Ask your team where the latest version of your most important record is", but "Ask yourself where the latest version of your most important record is, and count the answers." A leader already knows to put the question to their team where it applies.
4. **Anything that cannot fit into Day 2 is kept for AISC+.**

What still stands from before: a Prerequisite Task (the Readiness Scorecard) and a Primary Task (the Data Readiness Audit), each with its worksheet. One resource and one insight. Six scores, no total and no overall level. The session in three parts: Mirror, Measure, Moves. No work with AI this week, and what comes after is marked "In AI Labs". Session notes for the facilitator only.

## What Day 2 says now

**Readiness, in the founder's terms.** "The real impact of AI is not the technology. It is how well AI is built into the way you already work." Being ready means five things: naming real opportunities in your work, putting first those with high impact and low risk, data that is reliable and within reach, the skills and structures to carry a result, and informed, ethical and responsible decisions. "It is not about having a large budget. What matters is vision, focus and a strategy that advances in stages."

**The six dimensions, each put to the leader**

| Dimension | The question it answers | First move, this week | In AI Labs |
|---|---|---|---|
| **Strategy** | Do I have a plan for AI, tied to where I am going? | Write one page. Name the three problems in your work where AI would matter most, and what each is costing you now. Put first the one with high impact and low risk. | Choosing your first use case, and keeping AI tied to your objectives. |
| **Data Governance** | Is my data within reach, of good quality and well managed? | Ask yourself where the latest version of your most important record is, and count the answers. | Getting your data ready: what to put in order first. |
| **Talent** | Do I have the understanding of AI and the knowledge of my work that I need, and do I know what I lack? | Write two short lists: what you already understand about AI, and what you do not. Beside each gap, note how you will close it. | The skills that carry AI further, and training that fits your role. |
| **Processes** | Is AI part of how my work gets done, or still an experiment at the edge? | Take one process you run every week and write its steps in order. Mark each: AI could take it, could support it, or should leave it to you. | Your first pilot: scoping it, running it, deciding what next. |
| **Impact Evaluation** | Do I measure results, risks and consequences? | For the problem you put first, write how you would know AI had helped: one measure of time or money, one of quality, one risk. | Measuring return, direct and indirect. |
| **Collaboration** | Do I work on AI with others, or alone? | Name the people you would want beside you when you start with AI, and what each one sees that you do not. | A habit of testing, learning and trust, and leading yourself through the change. |

*Two set the direction: Strategy and Impact Evaluation. Two are the foundation: Data Governance and Talent. Two are how the work moves: Processes and Collaboration.*

**The 24 statements** are in `resources/day-2-ai-readiness/readiness-scorecard.md`. Each says "I" or "my", and describes something that exists or was done, several within a stated period. None says "we", "my team" or "my organisation".

**The rating scale** (founder, 2026-10-10, chosen from four): **1 No · 2 Not yet, but planned · 3 Partly · 4 Yes · 5 Yes, and I could show it.** The first scale ("Rarely true", "Sometimes true", "Consistently true") measured how often, and did not fit statements that say something exists or does not. The new one fits all 24 as written, and builds in the rule that a plan is not yet readiness: a plan earns a 2, and a 5 needs something that could be shown.

**Scores are whole numbers** (founder, 2026-10-10: "Decimals are confusing for most"). A dimension's score is the sum of its four answers, out of 20. It was their average, out of 5. **4 to 9 is a gap, 10 to 13 is developing, 14 to 20 is a strength.** These are the old bands exactly, multiplied by four, and nothing is rounded.

**From his notes, in his words or close to them:** "Diagnosis is not judgement. It is a tool for deciding." "Without data, there is no AI." "An actionable plan beats a perfect one." His enablers and barriers, as "What helps and what blocks", turned to the leader: "Your own time and attention" against "Your own resistance to change".

**Process P1** asks whether the leader's main processes are written down as steps. That gives a home to the founder's wish, at the Day 0 audit, that participants look at how they document their work.

## Where his notes had to be turned

His notes, and the resource they follow, put their questions to an organisation. Three of the six needed more than a change of pronoun to face the leader. **These are the places to look at first.**

| Dimension | His notes ask | The leader is asked |
|---|---|---|
| **Talent** | Are there internal technical capabilities and business domain knowledge? | Do I have the understanding of AI and the knowledge of my work that I need, and do I know what I lack? |
| **Collaboration** | Do business, data, technology and legal teams work in a coordinated way? | Do I work on AI with others, or alone? |
| **Strategy** | Is there an AI plan aligned with the company's overall strategy? | Do I have a plan for AI, tied to where I am going? |

Two of his notes' points on reading an assessment are left out for the same reason: "Do it as a team, not alone" and assessing "as a team". Retaking it every six months is kept.

## What was rebuilt

| What | File | State |
|---|---|---|
| The wording of the scorecard | `resources/day-2-ai-readiness/readiness-scorecard.md` | Rewritten |
| The scorecard tool | `intelligence/src/utils/challenge/ReadinessScorecard.jsx` | Six new dimensions and 24 statements, written into it from the reference. Its shape is unchanged |
| The guide | `ai-readiness-guide.md` and `.docx` | Rewritten. Part 2, the audit, keeps its five steps and gains the founder's opening on data |
| The scorecard worksheet | `readiness-scorecard-worksheet.md` and `.docx` | The six names, and "answer for yourself" |
| The article | `the-leader-goes-first.md` and `.docx` | Rewritten: readiness is strategic, not technical, which makes it the leader's own |
| The deck | `day-2-session-notes.md` and `.pptx` | 17 slides: 12 rewritten, and one line changed on the data audit slide. The title slide and the three part slides are as they were |
| The audit worksheet | `data-readiness-audit-worksheet.md` and `.docx` | One word: its example now reads "my client list" |
| The Day 2 page | `intelligence/src/app/(protected)/challenge/day-2/page.jsx` | Its wording follows: "how ready you are", "what is true of you today" |

**The tool keeps no answers from the first scorecard.** Its storage keys were renamed, so ratings left in a browser from the old statements are not read as answers to the new ones.

## Kept for AISC+

From the founder's notes and the original resource, not in Day 2:

- The five maturity levels (a model named as Gartner's).
- The principles of responsible AI.
- The roles for scaling AI, and interdisciplinary teams.
- A culture of experimentation, learning and trust, and change management.
- Pilots and small-scale use cases, iteration and the evaluation of results, and scaling without losing control.
- Measuring return: direct, indirect and cultural, what to define from the start, and what to keep measuring.
- Governance frameworks and responsibilities, and alignment with business objectives.
- The final readiness checklist, the worked cases, and the common mistakes.

Day 2 names six of these in one line each, under "In AI Labs". **Those six lines tell participants what AI Labs will hold,** so they are commitments to keep when AISC+ is built.

## Also for the founder to know

1. **Six months.** The first version said to take the scorecard again after a month in Labs. His notes say every 6 to 12 months.
2. **The wording is original.** His notes follow the resource he studied. Nothing printed for participants is copied from it, and the maturity levels, which are another firm's model, stay out.
3. **The audit still tells the leader whom to ask** ("Ask the person who enters it, not the person who manages them"). That is how an answer is found, and the leader is still the one addressed.

## Still open

- ~~The four documents have no links.~~ **Settled:** all four are posted, and `intelligence/src/lib/challenge/day2Resources.js` links each one with a `/copy` link (checked 2026-10-23).
- **The article's title,** "The Leader Goes First", is still a working title.

## Plain words, first moves in the tool, and a correct-data test (2026-10-23)

**Why.** The founder studied an organisation-level readiness assessment (kept as `program/AI_READINESS_TEMPLATE.md`) and asked for its lessons to improve Day 2 without changing its direction. He also found some scorecard statements unclear: "Ensure you are clear in a way any non technical person can understand and use simple words." And: "do not reference" the source anywhere, "we are only using insights from their work to improve ours."

**What did not change.** Day 2's aim, the six dimensions and their names, the 24 statements' meaning, the scoring (out of 20, the three bands, no total and no overall level), the prerequisite and primary tasks, and the founder's own move for Data Governance, kept word for word.

| What | Change |
| --- | --- |
| The 24 statements and six dimension questions | Rewritten in everyday words. "Sets of data" is "information", "processes" is "the main tasks I do again and again", "one copy I treat as the true one" is "which copy is the right one to use", periods are in months. P3 tells someone who does not use AI yet to choose 1 |
| The rating scale | 2 = "Not yet, but I plan to"; 5 = "Yes, and I can show it" |
| The tool's results | Shows the first move for "Start here" and for the next lowest (the participant settles a tie), each with the statements rated 1 or 2 in it. The third move, from the strongest dimension, stays the leader's own |
| The tool's rating screen | A 5 opens an optional line: "What could you show?" |
| The downloaded summary | Adds "My First Moves" and, beside any 5, what the leader said they could show |
| The guide, Part 1 | The first moves and the low and high tables in the same plain words |
| The guide, Part 2 | The first test is now "Complete and correct: is everything you need there, and is it right?", with a first step for data that has mistakes. Still four tests and the same marks |
| The scorecard worksheet | Section B says the summary suggests the first two moves |
| The audit worksheet | "Responsible" asks who makes sure the data is correct |
| The deck | Plain words on slides 8 to 11, 16 and 17, and a new slide 6, "What Most Readiness Tests Miss", in Mirror. It names no tool. 18 slides |

**Rebuilt:** `ai-readiness-guide.docx`, `readiness-scorecard-worksheet.docx`, `data-readiness-audit-worksheet.docx`, `day-2-session-notes.pptx`. The tool, `intelligence/src/utils/challenge/ReadinessScorecard.jsx`, was checked in a browser on desktop and phone, and its PDF was downloaded and read. Saved answers carry over: the meaning of each statement did not change, so the storage keys did not either.

**Data Governance's first move, put in plain words at the founder's approval (2026-10-23).** It was his sentence, "Ask yourself where the latest version of your most important record is, and count the answers." It now reads, in the guide and the tool: "Pick the record you rely on most, such as your client list or your budget. Write down every place a copy of it is kept. If there is more than one, you do not yet know which one is right." The slide carries a shorter form: "Pick the record you rely on most. Write down every place a copy is kept. More than one means you do not yet know which is right." His original stays quoted in rule 17 of `WORKING_RULES.md` as the example of speaking to the leader.

**The Google Docs and the Google Slides deck are not yet in line with this section** (checked 2026-10-23, `DOCUMENT_CHECK_2026-10-23.md`): the four documents and "Day2_Session_Notes" have the wording of 2026-10-10. Whether the plain-words rewrite goes to participants is the founder's decision. One factual line was corrected regardless, directly in his AI Readiness Guide at his approval (`WORKING_RULES.md` rule 26): its closing box said "Labs opens on Day 7." and now says "Labs opens the day after Day 7."

**The rewrite was narrowed the same day** (founder, 2026-10-23; `WORKING_RULES.md` rules 27 and 28). Shown the full list of changes for his Google files, he said: "Words like "high impact" should remain because of the kind of importance it commands... Only adjust places where the sentence isn't clear with ambiguous words." And: "When addressing work in Labs, say Labs not AI Labs." The narrowed list is `DAY_2_PLAIN_WORDS_CHANGES.md`. **Applied the same day at his word**, directly in his four Google Docs (three changed; the Audit Worksheet keeps "Who answers for it") and in "Day2_Session_Notes", which now has 18 slides with slide 6, "What Most Readiness Tests Miss". Each file was read back and the deck was exported and looked at. **Our copies were then brought back to his files:** the five Markdown files, the four `.docx` files, the local deck, and the Readiness Scorecard tool's six questions and six first moves. So the table above overstates the change: "information" for "sets of data", "tasks" for "processes", "the right copy" and "who makes sure it is correct" were all taken back out. What stayed of the plain words is in `DAY_2_PLAIN_WORDS_CHANGES.md`.

**Still open:**
- ~~The tool's 24 statements~~ **Settled the same day.** The founder likes their simple words. Tested as they stood, 20 stay and four were changed at his word after he compared them side by side: S3 "priorities", D2 "who is responsible for it", D4 "personal or confidential", P3 "for a task I do often" (`DAY_2_SCORECARD_STATEMENTS_CHECK.md`). The tool is ready to push as far as its wording goes.
- **The Scorecard Worksheet's Section B sentence** ("Your scorecard summary already suggests the first two moves…") is in our Markdown only. It goes into his document when the tool that makes the suggestions is live.
- **Ready to push with the tool** (made 2026-10-23 at his word, uncommitted): the Day 2 page says "such as the last 3 months" (the statements no longer give 90 days) and "what waits for Labs"; the AISC site's Scorecard demo (`aisc/src/components/sections/Demo.jsx`) carries the tool's new scale labels and its new S2 and S4. **Push `intelligence` and `aisc` together**, or the site demo and the live tool will disagree.
- **Day 2 and the Roadmap:** the Roadmap's Capability Audit asks for its own readiness rating and never mentions the Day 2 profile, and Day 2's "take it again in six months" has no place in the Roadmap's 180-day review. Not wrong, but the two never meet. For the founder to decide when Day 6 is next opened.
