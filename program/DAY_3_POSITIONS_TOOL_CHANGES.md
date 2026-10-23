# Step 5: the six stakeholder positions in the Territory Builder

**Status: made and tested 2026-10-23,** at the founder's word: "I approve the Territory Builder changes as drafted, including the colours and the two behaviour changes. Make them and test them." **Uncommitted and not pushed.**

> **Tested the same day** on a temporary page on this machine (removed afterwards):
> - The position field starts on "Choose a position", with the six listed. A friction added without one shows no badge, and the Convener and Guardian badges show in teal and rose.
> - Saved work naming the Curator opened as Advisor, in both the friction and the declaration.
> - The six choice cards sit in two rows of three under "My stakeholder position", and the Guardian card turns deep rose when chosen.
> - The summary PDF, caught in the page rather than downloaded, reads "My stakeholder position", lists the Guardian and the Advisor, has no "Curator" or "competitive", and prints the dash for the friction with no position.
> - The polish call was not run. The test data was cleared from the browser.
> - **Lint:** no new problems. The four errors it reports (an effect that loads saved work, and three unescaped quotes on the Day 3 page) are in the committed versions too.

**What this is.** Step 5 of `DAY_3_POSITIONS_SCOPE.md`: the Territory Builder on the Day 3 page and in the Toolbox, plus the prompt that polishes a declaration statement. All of it is code in `intelligence`, committed and unchanged since 2026-10-07. The changes would be made on this machine and **not pushed**: they go live when you push `intelligence`. Two lines elsewhere in the Learning Center that name "five competitive positions" are included, so everything in `intelligence` changes in one go.

## 1. The six positions and their one-line descriptions

The tool shows a one-line description under each choice. These are the one-line versions you approved with the definitions (`DAY_3_POSITIONS_SCOPE.md`):

| Position | Now | New |
|---|---|---|
| Optimizer | Improve speed, reduce cost, and strengthen margins inside an existing system. | Unchanged |
| Producer | Build a new product or service that solves a real friction point others in the industry feel. | Build a new product or service that solves a real friction point, for a market or for the people you serve. |
| Advisor | Provide judgment, direction, and clarity to organisations and leaders navigating AI decisions. | Provide judgment, direction, and trusted intelligence the people who look to you can act on. |
| Educator | Design and deliver learning that builds AI capability in others at scale. | Design and deliver learning that builds AI capability in others, starting with the people you lead. |
| Curator | Research, evaluate, and synthesise AI knowledge into trusted intelligence others can act on. | **Removed** (merged into the Advisor) |
| **Convener** | (new) | Build relationships and community around a friction no single organisation can solve alone. |
| **Guardian** | (new) | Set the standards a whole institution, sector or community can trust AI under. |

In the declaration step, the six choices sit in two rows of three on a wide screen (the five sat as three and two).

## 2. Colours

Each position has a colour on its badge, its choice card and its row in the downloaded PDF. The first four keep theirs. The Curator's grey goes.

| Position | Colour |
|---|---|
| Optimizer | Lavender, dark purple text (unchanged) |
| Producer | Green (unchanged) |
| Advisor | Amber (unchanged) |
| Educator | Blue (unchanged) |
| **Convener** | **Teal**: pale teal `#d1f0ec`, dark teal text `#0f5c55` |
| **Guardian** | **Rose**: pale rose `#fce7ef`, deep rose text `#9d174d` |

Teal and rose are chosen to stand apart from the other four and from the value-zone colours (red, amber, green).

## 3. Wording in the tool and the PDF

| Where | Now | New |
|---|---|---|
| Declaration step, the label above the six choices | My competitive position | My stakeholder position |
| Downloaded PDF, the declaration table | My competitive position | My stakeholder position |

## 4. Two behaviour changes

- **No position chosen in advance for a new friction.** Today every new friction starts as "Optimizer", so a leader who skips the field is tagged Optimizer without choosing it. The field would start empty ("Choose a position"), and stay optional, as the AI Value Map says ("and, where relevant, a position"). A friction with no position shows no badge, and "—" in the PDF.
- **A saved "Curator" becomes "Advisor".** The tool keeps each leader's work in their own browser. Anyone mid-challenge who tagged a friction or chose "Curator" would see it as Advisor, the position it merged into, rather than in the Optimizer's colour, which is what the tool falls back to today. **Certificates and declaration statements already issued are not touched:** they keep the position they were written with, Curator included.

## 5. The polish prompt

The prompt that turns the five inputs into the two-sentence declaration names the positions twice:

| Now | New |
|---|---|
| Position: their competitive role (Optimizer, Producer, Advisor, Educator, or Curator) | Position: their stakeholder position (Optimizer, Producer, Advisor, Educator, Convener, or Guardian) |
| …how the position (AI Optimizer, AI Producer, AI Advisor, AI Educator, or AI Curator) drives the value created. | …how the position (AI Optimizer, AI Producer, AI Advisor, AI Educator, AI Convener, or AI Guardian) drives the value created. |
| My competitive position: [the leader's choice] | My stakeholder position: [the leader's choice] |

Nothing else in the prompt changes: the two sentences, the length, the no-em-dash rule and the once-per-cohort limit stay as they are.

## 6. Two lines elsewhere in the Learning Center

| Where | Now | New |
|---|---|---|
| Day 3 page, above the tool | …so you understand the three value zones and five competitive positions. | …so you understand the three value zones and six stakeholder positions. |
| Toolbox, the AI Value Map's description | The three value zones and five competitive positions in the AI ecosystem. | The three value zones and six stakeholder positions in the AI ecosystem. |

## Once approved

1. **The changes** are made in `intelligence/src/utils/challenge/TerritoryBuilder.jsx`, `src/app/api/challenge/territory-builder/polish/route.js`, the Day 3 page and `src/lib/labs/toolbox.js`, uncommitted.
2. **Checked:** lint, and the tool opened on a temporary page on this machine (removed afterwards). I'd add a friction with no position, choose each of the six, check the colours, and download the PDF. The polish call is not run, as it spends the leader's one use and calls the AI.
3. **Not pushed.** It goes live with your next push of `intelligence`. The AISC site's demo of the tool (`aisc/src/components/sections/Demo.jsx`) does not show positions, so it needs no change.
