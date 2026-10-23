# Day 2: the clarity check of the Readiness Scorecard's 24 statements

**Status: all four suggestions applied 2026-10-23,** at the founder's word: "Apply all four suggestions (S3, D2, D4, P3) to the tool and its Markdown copy." They are in `intelligence/src/utils/challenge/ReadinessScorecard.jsx` (not pushed) and `resources/day-2-ai-readiness/readiness-scorecard.md`, and all 24 statements were checked to read the same in both. The other 20 are unchanged.

**What this is.** The 24 statements in the Readiness Scorecard tool (`intelligence/src/utils/challenge/ReadinessScorecard.jsx`, changed on this machine and not pushed), checked with the test of `WORKING_RULES.md` rule 27. You asked for it this way:

> "I like the simple words used on the 24 statements. So when running the clarity test, add the current simple words and the new one your test will suggest. If I must change what I currently have I must compare properly."

**How the test was applied.** The current simple words are the starting point and stay, unless the statement fails one of two checks:

1. **A word can be read two ways,** so two leaders could rate the same situation differently.
2. **The simple word changed what is measured,** so the statement no longer scores the point the guide teaches for that dimension.

Where a statement fails, the suggestion keeps the current sentence and changes only the word or words at fault. **20 statements pass and stay as they are. 4 have a suggestion.**

## The four suggestions

| | Current (the simple words) | Suggested | Why |
|---|---|---|---|
| **S3** Strategy | In the last 3 months, I set aside time to decide where AI fits in my work. | In the last 3 months, I set aside time to decide where AI fits in my **priorities**. | **Changed what is measured.** Strategy asks whether AI has a place in your priorities (the guide: "It has no place in how you set your priorities"). "Where AI fits in my work" is the Processes question, and anyone already using AI could rate it high. |
| **D2** Data Governance | For each one, I know who makes sure it is correct. | For each one, I know who **is responsible for it**. | **Changed what is measured.** The guide and the Audit Worksheet ask who answers for the data: its owner. The guide's tip for "Nobody answers for it" is "Give it an owner. One person, by name". The person who checks the data is often someone else, such as whoever types it in. "Responsible" is also the Audit Worksheet's own column heading. |
| **D4** Data Governance | I have marked which of my information is private, so I know what I am allowed to share. | I have marked which of my information is **personal or confidential**, so I know what I am allowed to share. | **Read two ways.** "Private" is often read as personal life only, so business-confidential information, such as prices, contracts and client terms, would be left out. The guide's tests and tips use "personal or confidential". |
| **P3** Processes | When I use AI, I use it the same way each time, not differently every time. (If you do not use AI yet, choose 1.) | When I use AI **for a task I do often**, I use it the same way each time, not differently every time. (If you do not use AI yet, choose 1.) | **Read two ways.** As written it can mean using AI the same way for everything, which no one should do. The point is a settled way of using it for a task you repeat (your deck, slide 11: "What works, you repeat the same way"). |

## The twenty that stay

| | Current, unchanged |
|---|---|
| S1 | I can name the problems in my work that AI could help with, and say which matters most. |
| S2 | I have written down why I want to use AI and how it links to my goals. |
| S4 | I can explain in one sentence why I want to use AI. |
| D1 | I can list the information my decisions depend on (for example, client lists, budgets, sales figures) and where each one is kept. |
| D3 | For my most important records, I know which copy is the right one to use. |
| T1 | I can explain in simple words what AI can and cannot do in my kind of work. |
| T2 | In the last 6 months, I have had some training on how AI can help my work. |
| T3 | I know which AI skills I am missing, and for each one, whether I will learn it, hire someone or work with a partner. |
| T4 | I know my work well enough to say where AI would help and where it would not. |
| P1 | The main tasks I do again and again are written down step by step, not just kept in my head. |
| P2 | For those tasks, I know which steps AI could do, which it could help with, and which I must do myself. |
| P4 | When I try a new way of working, I decide at the end whether to stop it, change it or keep it. |
| I1 | Before I change how I do a task, I write down what a good result would look like. |
| I2 | I know how much time, money or mistakes my main tasks cost me today, so I would notice if a change helped. |
| I3 | When I look at a new way of working, I think about what could go wrong, not only what I gain. |
| I4 | I check my results on a date I set in advance, not only when something goes wrong. |
| C1 | When I think about AI, I ask for ideas from someone whose work is different from mine. |
| C2 | I talk early to the people in charge of the rules I must follow (such as legal or HR), not only at the end. |
| C3 | I can admit openly when something I tried did not work. |
| C4 | In the last 3 months, I told someone what I learned about AI, including what did not work. |

## If you approve any of the four

- **Where it changes:** the tool, and its Markdown copy `resources/day-2-ai-readiness/readiness-scorecard.md`. Nothing else quotes these four statements, so no Google Doc or slide changes.
- **Saved answers carry over.** Each statement keeps its ID, and the change makes the point clearer without asking something new.
- **Still not pushed.** The tool goes live only when you push `intelligence`, and the Scorecard Worksheet's held sentence goes into your Google Doc when it does.
