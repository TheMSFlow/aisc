# program/

The reference for what the AI Stakeholder Challenge teaches, day by day, in a form that can be read, searched, quoted and edited quickly.

Created 2026-10-08, ahead of a round of major edits to the program. Before this folder existed the program lived only in Word, PowerPoint and Excel files that could not be opened directly, so questions about a day's content were answered from the brief rather than from the material.

## What is here

| Path | What it is | Made by |
|---|---|---|
| `PROGRAM_REFERENCE.md` | The day-by-day report: theme, format, objectives, what is taught, tasks, outputs and resources for Day 0 through Day 7 and the Roadmap, plus the inconsistencies found while compiling it. **Start here.** | Hand-written |
| `resources/` | **The program resources, one Markdown file each, in a folder per day. These are the reference: edit them here.** | Imported once by `scripts/program-convert.mjs`, edited by hand after |
| `resources/MANIFEST.md` | Every original file, the Markdown imported from it, and whether that Markdown has been edited since. | The script, rewritten each run |
| `resources/<day>/assets/` | Pictures lifted out of the original documents. | The script |
| `resources/.convert-state.json` | Hashes of what was imported. This is how the manifest knows what has been edited. Leave it alone. | The script |

## Where the truth lives

**Decided by the founder, 2026-10-08: the Markdown files in `resources/` are the reference for program content.** Edits and moves happen here first.

That makes the other places what they are:

1. **`website-context/aisc_resources/`** holds the originals (`.docx`, `.pptx`, `.xlsx`), exported on 2026-06-19 from the Google Docs participants receive. They are now a **frozen archive**: the record of what the program said before editing began. Read-only, as everything in `website-context/` is.
2. **The Google Docs participants are sent to** are the **published output**. They are linked from the live learning center and are what a participant actually opens. **They are left exactly as they are (founder, 2026-10-08): agents never edit, replace, move or re-share them, even when a Drive connection is available.** So a change made in `resources/` does not reach a participant, and the two will differ from the first edit onward. Publishing is a separate decision the founder has not yet made.
3. **`intelligence/src/app/(protected)/challenge/`** (sibling repo) is the live learning center: the schedule, the unlock rules, the task instructions on each day's page, and those Google Doc links. Not imported here; `PROGRAM_REFERENCE.md` reads it and cites it. `website-context/learning center/` is an older snapshot of it and has drifted.
4. **`agent-guides/AISC_BRIEF.md`** holds the program facts used for copy.

## What Markdown can and cannot be the reference for

It is the reference for **what a resource says**: the wording, the structure, the questions, the tables, the order.

It is not the deliverable. Three kinds of resource keep a working file somewhere else:

- **Worksheets and templates** are filled in by participants in Google Docs. The Markdown holds the questions and the empty tables.
- **Session notes** are slides. The Markdown holds what each slide says, not how it looks.
- **The Margin Calculator** is a working spreadsheet. The Markdown documents its sheets and formulas; it cannot calculate.

## Designed documents

```
node scripts/program-docx.mjs program/resources/<folder>/<slug>.md
```

The Markdown is the working reference. These resources reach participants as designed documents, so that is how the founder reviews them (2026-10-08): every resource written or edited here is also built as a `.docx` in the look of the existing Day 2 and Roadmap documents. This applies to content that ends up as a Word file or a Google Doc. Files that are finished as Markdown, such as this README, the scope and the program reference, are reviewed as Markdown. The file lands beside its Markdown and is gitignored with it.

- **The Markdown stays the reference.** Edit the `.md`, then rebuild. Never edit the `.docx` by hand: the next build overwrites it.
- **The script reads the same conventions the importer writes:** `## Section 1: Name` is a navy band, a blockquote is a callout, a `**Rating scale:**` line above a table is its legend row, single-digit columns are score columns. `<!-- pagebreak -->` breaks the page and `<!-- docx:stop -->` ends the document, so build notes can sit below it. Worksheets add a few more: a single empty row under its headers becomes answer boxes, `<!-- tall -->` above a table makes its empty rows tall enough to write in, and uneven dashes in a table's separator row set relative column widths. The full list is at the top of the script.
- **It writes new files only.** It never touches `website-context/` or the Google Docs participants are sent to.
- **A document open in Word cannot be rebuilt.** The script says so and writes nothing. Close the file and run it again.
- **Resources written here have no Office original**, so the manifest lists them under "No original". Day 2 AI Readiness lives in `resources/day-2-ai-readiness/`; see `DAY_2_AI_READINESS_SCOPE.md`.

### Session notes

```
node scripts/program-deck.mjs program/resources/<folder>/<slug>.md
node scripts/deck-preview.mjs program/resources/<folder>/<slug>.pptx
```

Session notes are slides, so their designed document is a deck. The script opens the original Day 2 deck in `website-context/` (read only), copies the slide whose design matches each slide in the Markdown, and swaps the text. Nothing is redrawn, so the look is the original's own.

- **A slide holds what its design holds.** There are seven designs: title, part, two boxes of four lines, three numbered columns, six numbered items, a banner with three cards, and the wrap-up. The script stops with a message when a slide fits none of them. The shapes are listed at the top of the script.
- **Type is never shrunk to fit.** Text much longer than the original's will run out of its box. Render the deck with `deck-preview.mjs` and look.

## Importing new originals

```
node scripts/program-convert.mjs
```

Drop a new `.docx`, `.pptx` or `.xlsx` into `website-context/aisc_resources/` and run it. It needs no install: the Office formats are zip files of XML, read with `jszip`, which already ships with `pptxgenjs`.

- **An existing Markdown file is never overwritten**, edited or not. Only originals with no Markdown yet are imported.
- **`--force` re-imports everything and discards every edit made since.** There is no undo while `resources/` is outside git. Do not run it without the founder's word.
- **Nothing is deleted.** A Markdown file with no original (written here directly, or its original was renamed) is listed under "No original" in the manifest and left in place.
- **Check the manifest after an import.** "Import check" compares letters and digits in the original against a fresh conversion. Anything other than `ok` means text went missing.

## What the import kept and lost

Kept: all text, headings, lists, tables, bold and italic, slide order, spreadsheet formulas alongside their values, embedded pictures.

Changed on purpose:
- A one-column table in the Word files is a shaded callout box, so it became a blockquote.
- Docs that never used heading styles got headings inferred from short bold lines set larger than the body. The manifest says which.
- Slides are read top to bottom, then left to right. Text boxes laid out as a grid became a table.
- Runs of blank input rows in the spreadsheet were folded into one line.

Lost: colours, fonts, page layout, and the page header and footer (reported once at the top of each file instead).

## The clean-up pass (2026-10-08)

The import was faithful, not tidy, so all 21 files were then cleaned up. Each one says so in its header. **Layout only: no sentence was reworded and nothing moved between days.** What changed:

- **Titles.** The real title is the top heading, with the label ("Day 2 Resource") on a line beneath. A title that appeared twice appears once.
- **Section bands.** "SECTION 1", "PART 2" and similar sat in callout boxes above a heading. They are now part of a real heading, so every file has a usable outline.
- **Lists.** Bullets and numbers that were typed as characters are real lists.
- **Layout tables.** Tables that existed only to position text (one numbered technique per table, a whole quadrant in one cell) became headings, paragraphs and lists. Tables that hold data or blank answer rows stayed tables.
- **Legends.** A key that was squeezed into a merged table row (rating scales, position codes, "Milestone rule") sits on its own line beside the table.
- **Slides.** The banner, footer and page number that repeated on every slide were removed and are recorded once in the file header. Cards whose titles and bodies had been read apart were put back together.
- **Grids.** The Delegation Matrix and the Priority Matrix drew their axes with dashes; they now use row and column labels.
- **The Margin Calculator** was regrouped from a cell-by-cell dump into columns, totals and dashboard sections, with cell addresses kept.

Removed on purpose, as repeats: slide furniture; a second copy of a title; a band that only repeated the heading under it (AI Safety Guidelines); labels repeated inside every table cell once a column or row header carries them ("Ask yourself", "AI", "You", "Example"); and the column headers of the three-zones table in *Seeing Where Money Actually Lives* ("Zone", "What to Look For"), whose rows became sections.

The inconsistencies listed in `PROGRAM_REFERENCE.md` were **not** fixed. They are content decisions.

One picture carries content that exists nowhere in the text: `resources/day-1/assets/task-delegation-guide-v2-image-1.png`, "How to rate your tasks on the matrix". It gives the scoring thresholds for the Delegation Matrix: AI Fit 4 to 5 with Human Demand 1 to 2 is AUTOMATE, 4 to 5 with 3 to 5 is AUGMENT, 1 to 3 with 1 to 2 is STREAMLINE, 1 to 3 with 3 to 5 is OWN.

## Not in git, and what that costs

`resources/` is gitignored, for the same reason `website-context/` is: it is paid program material, marked confidential in every page footer.

The cost is new as of 2026-10-08: **the reference copy of the program now has no version history and no backup.** An edit cannot be diffed or undone, and the folder exists on one machine. `README.md` and `PROGRAM_REFERENCE.md` are not ignored; whether they belong in the repository is the founder's call at commit time.
