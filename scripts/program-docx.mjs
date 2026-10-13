/**
 * program-docx.mjs — build the designed document for a program resource.
 *
 *   node scripts/program-docx.mjs program/resources/<folder>/<slug>.md [out.docx]
 *
 * Reads   program/resources/<folder>/<slug>.md    (the reference, edited by hand)
 * Writes  program/resources/<folder>/<slug>.docx  (gitignored, like its source)
 *
 * WHY THIS EXISTS. The Markdown is the reference for what a resource says, and
 * it is what an agent reads. It is not what Michael reviews: he reads the
 * designed document (founder, 2026-10-08). program-convert.mjs goes Office to
 * Markdown, once. This goes Markdown to Office, as often as the Markdown
 * changes, so a resource written here gets the same look as the ones it sits
 * beside. The .docx is upload-ready for Drive, which opens it as a Google Doc.
 *
 * It never touches website-context/ or the participants' Google Docs.
 *
 * DESIGN: the Day 2 and Roadmap documents, reproduced. Measured from
 * AISC_AI SAFETY GUIDELINES.docx and The Capability Audit.docx: a cover page
 * with the "DAY 2 RESOURCE" label, a centred title page carrying the
 * confidentiality footer, then content pages with a running header and a page
 * number. Navy section bands, pale callouts with a navy left rule, tables with
 * a navy header row and striped body rows.
 *
 * WHAT THE MARKDOWN MEANS. The same conventions program-convert.mjs writes:
 *
 *   everything above the first `---`   file notes. Left out, except the
 *                                      "Page header / footer" line if present.
 *   # Title                            the document title
 *   **Day 2 Resource**                 first bold-only line: the cover label
 *   *One line.*                        first italic-only line: the subtitle
 *   ## Section 1: Name                 "Label N: Name" becomes a navy band
 *   ## Name                            any other H2 is a large heading
 *   ### Name                           a small navy heading
 *   #### Name                          a smaller heading inside it
 *   > **Title:** / > text              a callout box
 *   > **A bold line.** (and only that)  a pull quote, between two rules
 *   **Day 2 Insight**                  a cover label with "Insight" in it makes
 *                                      the document an article: no title page,
 *                                      the title opens the text, smaller heads
 *   **Rating scale:** ... *note.*      directly above a table: its legend row
 *   | 1 | 2 | 3 | 4 | 5 |              single-digit columns are score columns
 *   | **Label**<br>*hint* |            header cells with <br>: answer boxes
 *   | **Name** | **Date** | + one      a single empty row under its headers:
 *     empty row                        answer boxes too
 *   | □ |                              a column of tick boxes is kept narrow
 *   | --- | ------ |                   uneven dashes are relative column widths
 *   **Question**<br>*hint* in a cell   the hint is set small and grey
 *   <!-- tall -->  or  <!-- tall 1100 -->   the next table's empty rows are
 *                                      tall, for writing in (height in
 *                                      twentieths of a point, default 1300)
 *   <!-- pagebreak -->                 a page break
 *   <!-- docx:stop -->                 nothing below this line is built
 *
 * The OOXML is written by hand and zipped with jszip (it ships with
 * pptxgenjs), the same way program-convert.mjs reads it. No LibreOffice.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import JSZip from "jszip";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const [, , input, output] = process.argv;
if (!input) {
  console.error("Usage: node scripts/program-docx.mjs program/resources/<folder>/<slug>.md [out.docx]");
  process.exit(1);
}
const SRC = path.resolve(process.cwd(), input);
if (!fs.existsSync(SRC)) {
  console.error(`Not found: ${input}`);
  process.exit(1);
}
const OUT = output ? path.resolve(process.cwd(), output) : SRC.replace(/\.md$/i, ".docx");

/* --------------------------------------------------------------- design -- */

const C = {
  navy: "0d1464", // bands, table headers, labels
  heading: "01067a", // large headings
  body: "1a1a2e",
  grey: "5d6d7e",
  pale: "eaecf8", // callouts, striped rows
  legend: "cbd1f0", // legend rows, band labels
  score: "f3f4fb", // score cells on a striped row
  rule: "cccccc",
  headerLeft: "2e2f86",
  headerRight: "8e90c9",
  footer: "6368da",
};
const PAGE_W = 9360; // text width in twentieths of a point: Letter, 1in margins
const SCORE_W = 480;
const CONFIDENTIAL =
  "This document is strictly confidential and intended solely for registered participants of the AISC Challenge. Unauthorized sharing, reproduction, or distribution to any third party is strictly prohibited.";

/* ------------------------------------------------------------- Markdown -- */

const isBoldOnly = (s) => /^\*\*[^*]+\*\*$/.test(s);
const isItalicOnly = (s) => /^\*[^*]+\*$/.test(s);
const splitRow = (line) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

function parse(md) {
  let lines = md.replace(/\r\n/g, "\n").split("\n");
  const rule = lines.indexOf("---");
  if (rule !== -1 && rule < 20) lines = lines.slice(rule + 1);

  const blocks = [];
  let para = [];
  let tall = 0;
  const flush = () => {
    if (para.length) blocks.push({ type: "p", text: para.join(" ") });
    para = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const t = line.trim();

    if (t === "<!-- docx:stop -->") break;
    if (t === "<!-- pagebreak -->") {
      flush();
      blocks.push({ type: "break" });
    } else if (/^<!-- tall( \d+)? -->$/.test(t)) {
      flush();
      tall = Number(t.match(/\d+/)?.[0] ?? 1300);
    } else if (t.startsWith("<!--")) {
      while (!lines[i].includes("-->") && i < lines.length - 1) i++;
    } else if (t === "") {
      flush();
    } else if (/^#{1,4} /.test(t)) {
      flush();
      const level = t.indexOf(" ");
      blocks.push({ type: `h${level}`, text: t.slice(level + 1).trim() });
    } else if (t.startsWith(">")) {
      flush();
      const inner = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        inner.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      i--;
      // A callout holds paragraphs and bullet lists, separated by blank lines.
      const parts = inner
        .join("\n")
        .split(/\n\s*\n/)
        .map((chunk) => chunk.split("\n").map((l) => l.trim()).filter(Boolean))
        .filter((ls) => ls.length)
        .map((ls) => (ls.every((l) => l.startsWith("- ")) ? { list: ls.map((l) => l.slice(2)) } : { text: ls.join(" ") }));
      blocks.push({ type: "callout", parts });
    } else if (t.startsWith("|")) {
      flush();
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      i--;
      // Uneven dash counts in the separator row are relative column widths.
      const dashes = rows[1].map((c) => c.replace(/[^-]/g, "").length);
      const table = {
        type: "table",
        head: rows[0],
        rows: rows.slice(2),
        weights: new Set(dashes).size > 1 ? dashes : null,
        tall,
      };
      tall = 0;
      const prev = blocks[blocks.length - 1];
      if (prev?.type === "p" && prev.text.startsWith("**Rating scale:**")) {
        table.legend = blocks.pop().text;
      }
      blocks.push(table);
    } else if (/^(-|\d+\.) /.test(t)) {
      flush();
      const ordered = /^\d+\./.test(t);
      const items = [];
      while (i < lines.length && lines[i].trim() !== "") {
        const s = lines[i].trim();
        if (/^(-|\d+\.) /.test(s)) items.push(s.replace(/^(-|\d+\.) /, ""));
        else items[items.length - 1] += ` ${s}`;
        i++;
      }
      i--;
      blocks.push({ type: "list", ordered, items });
    } else if (t.startsWith("```")) {
      flush();
      const code = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) code.push(lines[i++]);
      blocks.push({ type: "code", lines: code });
    } else {
      para.push(t);
    }
  }
  flush();
  return blocks;
}

/* ---------------------------------------------------------------- OOXML -- */

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function run(text, f = {}) {
  const props =
    (f.font ? `<w:rFonts w:ascii="${f.font}" w:hAnsi="${f.font}" w:cs="${f.font}"/>` : "") +
    (f.b ? "<w:b/><w:bCs/>" : "") +
    (f.i ? "<w:i/><w:iCs/>" : "") +
    (f.smallCaps ? "<w:smallCaps/>" : "") +
    (f.color ? `<w:color w:val="${f.color}"/>` : "") +
    (f.sz ? `<w:sz w:val="${f.sz}"/><w:szCs w:val="${f.sz}"/>` : "");
  return `<w:r>${props ? `<w:rPr>${props}</w:rPr>` : ""}<w:t xml:space="preserve">${esc(text)}</w:t></w:r>`;
}

// **bold**, *italic* and ***both*** inside a line of text.
function inline(text, base = {}) {
  return text
    .split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/)
    .filter(Boolean)
    .map((part) => {
      const stars = part.match(/^\*+/)?.[0].length ?? 0;
      if (!stars || !part.endsWith("*".repeat(stars))) return run(part, base);
      return run(part.slice(stars, -stars), {
        ...base,
        b: base.b || stars >= 2,
        i: base.i || stars !== 2,
        color: stars >= 2 && base.boldColor ? base.boldColor : base.color,
      });
    })
    .join("");
}

function p(runs, o = {}) {
  const spacing =
    o.before !== undefined || o.after !== undefined || o.line
      ? `<w:spacing${o.before !== undefined ? ` w:before="${o.before}"` : ""}${
          o.after !== undefined ? ` w:after="${o.after}"` : ""
        }${o.line ? ` w:line="${o.line}" w:lineRule="auto"` : ""}/>`
      : "";
  const props =
    (o.style ? `<w:pStyle w:val="${o.style}"/>` : "") +
    (o.keepNext ? "<w:keepNext/>" : "") +
    (o.num ? `<w:numPr><w:ilvl w:val="0"/><w:numId w:val="${o.num}"/></w:numPr>` : "") +
    spacing +
    (o.jc ? `<w:jc w:val="${o.jc}"/>` : "") +
    (o.sect ?? "");
  return `<w:p>${props ? `<w:pPr>${props}</w:pPr>` : ""}${runs}</w:p>`;
}

const blank = () => p("", { line: 240 });
// A page break is a paragraph of its own, set one point high. At full height
// a page that was already full pushed it onto the next one, which left that
// page blank.
const pageBreak = () =>
  '<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="20" w:lineRule="exact"/></w:pPr>' +
  '<w:r><w:rPr><w:sz w:val="2"/><w:szCs w:val="2"/></w:rPr><w:br w:type="page"/></w:r></w:p>';

function cell(content, o = {}) {
  const side = (name, b) =>
    b ? `<w:${name} w:val="single" w:sz="${b.sz}" w:space="0" w:color="${b.color}"/>` : `<w:${name} w:val="nil"/>`;
  const all = o.border === undefined ? { sz: 4, color: C.rule } : o.border;
  const b = { top: all, left: all, bottom: all, right: all, ...o.borders };
  const [mt, ml, mb, mr] = o.mar ?? [100, 150, 100, 150];
  return (
    `<w:tc><w:tcPr><w:tcW w:w="${o.w}" w:type="dxa"/>` +
    (o.span > 1 ? `<w:gridSpan w:val="${o.span}"/>` : "") +
    `<w:tcBorders>${side("top", b.top)}${side("left", b.left)}${side("bottom", b.bottom)}${side("right", b.right)}</w:tcBorders>` +
    `<w:shd w:val="clear" w:color="auto" w:fill="${o.fill ?? "ffffff"}"/>` +
    `<w:tcMar><w:top w:w="${mt}" w:type="dxa"/><w:left w:w="${ml}" w:type="dxa"/><w:bottom w:w="${mb}" w:type="dxa"/><w:right w:w="${mr}" w:type="dxa"/></w:tcMar>` +
    (o.vAlign ? `<w:vAlign w:val="${o.vAlign}"/>` : "") +
    `</w:tcPr>${content}</w:tc>`
  );
}

const row = (cells, o = {}) =>
  `<w:tr><w:trPr><w:cantSplit/>${
    o.height ? `<w:trHeight w:val="${o.height}" w:hRule="atLeast"/>` : ""
  }${o.header ? "<w:tblHeader/>" : ""}</w:trPr>${cells}</w:tr>`;

const tbl = (grid, rows) =>
  `<w:tbl><w:tblPr><w:tblW w:w="${grid.reduce((a, b) => a + b, 0)}" w:type="dxa"/><w:tblLayout w:type="fixed"/></w:tblPr>` +
  `<w:tblGrid>${grid.map((w) => `<w:gridCol w:w="${w}"/>`).join("")}</w:tblGrid>${rows.join("")}</w:tbl>`;

/* --------------------------------------------------------------- blocks -- */

// "Section 1: Name" and "Dimension 3: Name" are bands. "Before You Start: Name" is not.
const bandParts = (text) => text.match(/^([A-Za-z]+ (?:\d+|[A-Z])):\s+(.+)$/);

// One numbering definition per list, so every numbered list starts at 1.
const lists = [];
function listItems(items, ordered, lastAfter = 150) {
  lists.push(ordered);
  const num = lists.length;
  return items
    .map((item, n) => p(inline(item, { color: C.body }), { num, after: n === items.length - 1 ? lastAfter : 80, line: 240 }))
    .join("");
}

function band(label, title) {
  const content =
    p(run(label.toUpperCase(), { b: true, color: C.legend, sz: 17 }), { after: 40, line: 240, keepNext: true }) +
    p(run(title, { b: true, color: "ffffff", sz: 28 }), { style: "Heading1", before: 0, after: 0, line: 240, keepNext: true });
  return tbl([PAGE_W], [row(cell(content, { w: PAGE_W, fill: C.navy, border: null, mar: [220, 280, 220, 280] }))]);
}

function callout(parts) {
  const content = parts
    .map((part, i) => {
      const after = i === parts.length - 1 ? 0 : 150;
      if (part.list) return listItems(part.list, false, after);
      // A bold line on its own is a title: of the callout, or of what follows it.
      return isBoldOnly(part.text)
        ? p(run(part.text.slice(2, -2), { b: true, color: C.navy }), { after: 60, line: 240 })
        : p(inline(part.text, { color: C.body }), { after, line: 240 });
    })
    .join("");
  return tbl(
    [PAGE_W],
    [
      row(
        cell(content, {
          w: PAGE_W,
          fill: C.pale,
          border: null,
          borders: { left: { sz: 24, color: C.navy } },
          mar: [220, 280, 220, 280],
        })
      ),
    ]
  );
}

// A blockquote of bold lines and nothing else is a pull quote: centred, bold
// italic, between two navy rules, as in the insight articles.
const isPullQuote = (parts) => parts.every((part) => part.text && /^\*{2,3}[^*]+\*{2,3}$/.test(part.text));
function pullQuote(parts) {
  const content = parts
    .map((part, i) =>
      p(run(part.text.replace(/\*/g, ""), { b: true, i: true, color: C.navy, sz: 24 }), {
        jc: "center",
        after: i === parts.length - 1 ? 0 : 80,
        line: 240,
      })
    )
    .join("");
  const rule = { sz: 12, color: C.navy };
  return tbl(
    [PAGE_W],
    [row(cell(content, { w: PAGE_W, border: null, borders: { top: rule, bottom: rule }, mar: [280, 340, 280, 340] }))]
  );
}

// Header cells written as **Label**<br>*hint*, or a single empty row under
// its headers: a row of labelled answer boxes.
function answerBoxes(t) {
  const n = t.head.length;
  const grid = Array(n).fill(Math.floor(PAGE_W / n));
  grid[n - 1] += PAGE_W - grid[0] * n;
  const head = row(
    t.head
      .map((h, i) => {
        const [label, hint] = h.split(/<br\s*\/?>/);
        return cell(
          p(run(label.replace(/\*/g, ""), { b: true, color: C.navy, sz: 19 }), { after: 30, line: 240 }) +
            (hint ? p(run(hint.replace(/\*/g, ""), { i: true, color: C.grey, sz: 17 }), { line: 240 }) : ""),
          { w: grid[i], fill: C.pale, mar: [160, 200, 160, 200] }
        );
      })
      .join("")
  );
  const body = t.rows.map((r) =>
    row(r.map((text, i) => cell(p(inline(text, { sz: 20 }), { line: 240 }), { w: grid[i], mar: [160, 200, 160, 200] })).join(""), {
      height: 700,
    })
  );
  return tbl(grid, [head, ...body]);
}

function table(t) {
  const blankRow = t.rows.length === 1 && t.rows[0].every((c) => c === "");
  if (t.head.some((h) => /<br\s*\/?>/.test(h)) || blankRow) return answerBoxes(t);

  const n = t.head.length;
  // Imported tables write their headers in bold ("**#**", "**Confident**").
  // The tests below read the words, not the asterisks.
  const head = t.head.map((h) => h.replace(/\*/g, "").trim());
  const isScore = head.map((h) => /^\d$/.test(h));
  const isIndex = head.map((h) => h === "#");
  const scoreCount = isScore.filter(Boolean).length;
  const textCols = t.head.map((_, i) => i).filter((i) => !isScore[i] && !isIndex[i]);

  // Widths: fixed for score and index columns, the rest shared out. A first
  // column of short labels gets a narrow share.
  const fixed = scoreCount * SCORE_W + isIndex.filter(Boolean).length * 660;
  const free = PAGE_W - fixed;
  const longest = (i) => Math.max(...t.rows.map((r) => (r[i] ?? "").replace(/\*/g, "").length), head[i].length);
  const narrowFirst = textCols.length > 1 && longest(textCols[0]) <= 40;
  // A column that only ever holds a tick box or a mark is kept narrow.
  const isTick = head.map(
    (h, i) => i !== textCols[0] && textCols.includes(i) && h.length <= 12 && t.rows.every((r) => /^.{1,3}$/.test(r[i] ?? ""))
  );
  const TICK_W = 900;
  const shared = free - isTick.filter(Boolean).length * TICK_W;
  const sharing = textCols.filter((i) => !isTick[i]);
  const weightSum = t.weights ? sharing.reduce((a, i) => a + t.weights[i], 0) : 0;
  const grid = t.head.map((_, i) => {
    if (isScore[i]) return SCORE_W;
    if (isIndex[i]) return 660;
    if (isTick[i]) return TICK_W;
    if (sharing.length === 1) return shared;
    if (t.weights) return Math.round((shared * t.weights[i]) / weightSum);
    if (narrowFirst) {
      return i === sharing[0] ? Math.round(shared * 0.3) : Math.round((shared * 0.7) / (sharing.length - 1));
    }
    return Math.round(shared / sharing.length);
  });
  grid[sharing[sharing.length - 1]] += PAGE_W - grid.reduce((a, b) => a + b, 0);

  const centred = (i) => isScore[i] || isIndex[i] || isTick[i];
  const rows = [];

  // A table imported from an original with no header row arrives with an
  // empty one, because Markdown needs it. It is left out, not drawn as an
  // empty navy band.
  const hasHeader = t.head.some((h) => h.replace(/\*/g, "").trim() !== "");

  if (hasHeader) {
    rows.push(
      row(
        t.head
          .map((h, i) =>
            cell(p(run(h.replace(/\*/g, ""), { b: true, color: "ffffff", sz: 19 }), { jc: centred(i) ? "center" : undefined, line: 240 }), {
              w: grid[i],
              fill: C.navy,
              vAlign: "center",
            })
          )
          .join(""),
        { header: true }
      )
    );
  }

  if (t.legend && scoreCount) {
    // "**Rating scale:** 1 = ... 5 = ... *Circle your score.*" split at the italic note.
    const m = t.legend.match(/^\*\*Rating scale:\*\*\s*(.*?)\s*(?:\*([^*]+)\*.*)?$/);
    // Each "N = label" pair is held together with no-break spaces, so the
    // scale wraps between pairs and never inside one.
    const scale = m[1]
      .replace(/\.$/, "")
      .split(/\s*·\s*/)
      .map((pair) => pair.replace(/ /g, "\u00a0"))
      .join("    ");
    const note = (m[2] ?? "").replace(/\.$/, "");
    const first = isScore.indexOf(true);
    const left = grid.slice(0, first).reduce((a, b) => a + b, 0);
    const right = grid.slice(first).reduce((a, b) => a + b, 0);
    rows.push(
      row(
        cell(
          p(run("Rating scale:  ", { b: true, color: C.navy, sz: 18 }) + run(scale, { color: C.body, sz: 18 }), { line: 240 }),
          { w: left, span: first, fill: C.legend }
        ) +
          cell(p(run(note, { i: true, color: C.body, sz: 18 }), { jc: "center", line: 240 }), {
            w: right,
            span: n - first,
            fill: C.legend,
            vAlign: "center",
          })
      )
    );
  }

  t.rows.forEach((r, ri) => {
    const striped = ri % 2 === 0;
    const open = r.every((text, i) => i === textCols[0] || isIndex[i] || text === "");
    rows.push(
      row(
        t.head
          .map((_, i) => {
            const text = r[i] ?? "";
            if (isScore[i]) {
              return cell(p(run(text, { color: C.navy, sz: 20 }), { jc: "center", line: 240 }), {
                w: grid[i],
                fill: striped ? C.score : "ffffff",
                vAlign: "center",
                mar: [80, 60, 80, 60],
              });
            }
            // A first column of short labels is set bold. A first column of prose is not.
            const label = isIndex[i] || (i === textCols[0] && narrowFirst);
            const lines = text.split(/<br\s*\/?>/);
            return cell(
              lines
                .map((line, li) =>
                  p(
                    // An italic line under another line is a hint, set small and grey.
                    li > 0 && isItalicOnly(line)
                      ? run(line.slice(1, -1), { i: true, color: C.grey, sz: 17 })
                      : inline(line, label ? { b: true, color: C.navy, sz: 20 } : { color: C.body, sz: 19, boldColor: C.navy }),
                    {
                      jc: centred(i) ? "center" : undefined,
                      after: li < lines.length - 1 ? 60 : undefined,
                      line: 240,
                    }
                  )
                )
                .join(""),
              {
                w: grid[i],
                fill: striped ? C.pale : "ffffff",
                vAlign: centred(i) && !(open && t.tall) ? "center" : undefined,
                mar: [140, 180, 140, 180],
              }
            );
          })
          .join(""),
        { height: open ? t.tall || 560 : undefined }
      )
    );
  });

  return tbl(grid, rows);
}

/* ------------------------------------------------------------- document -- */

const NS =
  'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';
const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
const PAGE = '<w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>';
const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

function build(blocks) {
  const title = blocks.find((b) => b.type === "h1")?.text ?? path.basename(SRC, ".md");
  const firstH2 = blocks.findIndex((b) => b.type === "h2");
  const front = blocks.slice(0, firstH2 === -1 ? blocks.length : firstH2).filter((b) => b.type !== "h1");
  const isLine = (b, test) => b.type === "p" && test(b.text);
  const label = front.find((b) => isLine(b, isBoldOnly));
  const subtitle = front.find((b) => isLine(b, isItalicOnly));
  // Above the first section, a short bold line stays on the title page.
  // Anything else is an introduction and opens the first content page.
  const extra = front.filter((b) => b !== label && b !== subtitle && isLine(b, isBoldOnly));
  const intro = front.filter((b) => b !== label && b !== subtitle && !extra.includes(b));
  const body = [...intro, ...(firstH2 === -1 ? [] : blocks.slice(firstH2))];
  const areas = body.map((b) => b.type === "h2" && bandParts(b.text)?.[2]).filter(Boolean);

  const out = [];
  const labelText = label?.text.slice(2, -2) ?? "AISC Resource";
  // An insight article has no title page. Its title opens the first page of
  // text, under a small label, and its headings are set smaller.
  const article = /insight/i.test(labelText);

  // Cover page: the label alone, in a section of its own, as in the originals.
  out.push(
    p(run(article ? labelText : labelText.toUpperCase(), { b: true, color: article ? C.heading : C.navy, sz: article ? 44 : 60 }), {
      style: "Title",
      jc: "left",
      before: 0,
      after: 0,
      sect: `<w:sectPr>${PAGE}<w:pgNumType w:start="1"/></w:sectPr>`,
    })
  );

  const gap = () => p(run(" "), { before: 240, after: 240 });
  if (article) {
    out.push(p(run(labelText, { color: C.headerRight, sz: 18 }), { after: 40, line: 240 }));
    out.push(p(run(title, { b: true, color: C.heading, sz: 44 }), { style: "Title", jc: "left", before: 0, after: 80, line: 240 }));
    if (subtitle) out.push(p(run(subtitle.text.slice(1, -1), { i: true, color: C.grey }), { after: 120, line: 240 }));
  } else {
    // Title page.
    out.push(gap(), gap(), gap());
    out.push(p(run(title.toUpperCase()), { style: "Title" }));
    if (subtitle) {
      out.push(p(run(subtitle.text.slice(1, -1), { i: true, color: C.body, sz: 30 }), { jc: "center", before: 240, after: 100 }));
    }
    out.push(gap(), gap());
    for (const b of extra) out.push(p(inline(b.text, { color: C.grey }), { jc: "center", before: 240, after: 60 }));
    if (areas.length > 1) {
      out.push(
        p(run(`This document covers ${NUMBER_WORDS[areas.length] ?? areas.length} areas:`, { color: C.grey }), {
          jc: "center",
          before: 240,
          after: 60,
        })
      );
      for (const a of areas) out.push(p(run(a, { b: true, color: C.navy }), { jc: "center", before: 240, after: 60 }));
    }
    out.push(pageBreak());
  }

  // Tables and callouts sit in a gap: one blank line above when text comes
  // before them, one below unless the page ends there.
  body.forEach((b, i) => {
    const prev = body[i - 1];
    const next = body[i + 1];
    const gapBefore = ["p", "list"].includes(prev?.type) ? blank() : "";
    const gapAfter = next?.type === "break" ? "" : blank();
    if (b.type === "h2") {
      const parts = bandParts(b.text);
      if (parts) out.push(gapBefore, band(parts[1], parts[2]), blank());
      else if (article) out.push(p(run(b.text, { b: true, color: C.navy, sz: 30 }), { style: "Heading1", before: 360, after: 100, keepNext: true }));
      else out.push(p(run(b.text, { b: true, color: C.heading, sz: 46 }), { style: "Heading1", before: 240, after: 120, keepNext: true }));
    } else if (b.type === "h3") {
      out.push(p(run(b.text, { b: true, color: C.navy, sz: 22 }), { style: "Heading2", before: 160, after: 80, keepNext: true }));
    } else if (b.type === "h4") {
      // A heading inside a ### section, as the imported originals have them.
      out.push(p(run(b.text, { b: true, color: C.body, sz: 21 }), { before: 140, after: 70, keepNext: true }));
    } else if (b.type === "p") {
      out.push(
        isItalicOnly(b.text)
          ? p(run(b.text.slice(1, -1), { i: true, color: C.grey }), { after: 150, line: 240, keepNext: next?.type === "table" })
          : p(inline(b.text, { color: C.body }), { after: 150, line: 240 })
      );
    } else if (b.type === "callout") {
      out.push(gapBefore, isPullQuote(b.parts) ? pullQuote(b.parts) : callout(b.parts), gapAfter);
    } else if (b.type === "table") {
      out.push(table(b), gapAfter);
    } else if (b.type === "list") {
      out.push(listItems(b.items, b.ordered));
    } else if (b.type === "code") {
      const content = b.lines.map((l) => p(run(l || " ", { font: "Courier New", color: C.body, sz: 18 }), { line: 240 })).join("");
      out.push(gapBefore, tbl([PAGE_W], [row(cell(content, { w: PAGE_W, fill: C.score, mar: [200, 240, 200, 240] }))]), gapAfter);
    } else if (b.type === "break") {
      out.push(pageBreak());
    }
  });

  const document =
    `${XML}<w:document ${NS}><w:body>${out.join("")}` +
    `<w:sectPr><w:headerReference w:type="default" r:id="rId3"/>` +
    `<w:footerReference w:type="default" r:id="rId4"/><w:footerReference w:type="first" r:id="rId5"/>` +
    `<w:type w:val="nextPage"/>${PAGE}<w:pgNumType w:start="0"/><w:titlePg/></w:sectPr></w:body></w:document>`;

  return { title, document, lists };
}

/* -------------------------------------------------------------- package -- */

const heading = (id, name, level, sz, before, after) =>
  `<w:style w:type="paragraph" w:styleId="${id}"><w:name w:val="${name}"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/>` +
  `<w:pPr><w:keepNext/><w:keepLines/><w:spacing w:before="${before}" w:after="${after}"/><w:outlineLvl w:val="${level}"/></w:pPr>` +
  `<w:rPr><w:sz w:val="${sz}"/><w:szCs w:val="${sz}"/></w:rPr></w:style>`;

const styles = () =>
  `${XML}<w:styles ${NS}><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:eastAsia="Arial" w:cs="Arial"/>` +
  `<w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="en"/></w:rPr></w:rPrDefault>` +
  `<w:pPrDefault><w:pPr><w:spacing w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>` +
  `<w:style w:type="paragraph" w:styleId="Normal" w:default="1"><w:name w:val="Normal"/></w:style>` +
  `<w:style w:type="table" w:styleId="TableNormal" w:default="1"><w:name w:val="Normal Table"/><w:tblPr><w:tblCellMar>` +
  `<w:top w:w="100" w:type="dxa"/><w:left w:w="100" w:type="dxa"/><w:bottom w:w="100" w:type="dxa"/><w:right w:w="100" w:type="dxa"/>` +
  `</w:tblCellMar></w:tblPr></w:style>` +
  heading("Heading1", "heading 1", 0, 40, 400, 120) +
  heading("Heading2", "heading 2", 1, 32, 360, 120) +
  `<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/>` +
  `<w:pPr><w:keepNext/><w:keepLines/><w:spacing w:before="240" w:after="80"/><w:jc w:val="center"/></w:pPr>` +
  `<w:rPr><w:b/><w:bCs/><w:color w:val="${C.navy}"/><w:sz w:val="60"/><w:szCs w:val="60"/></w:rPr></w:style></w:styles>`;

// One numbering definition per list, so every numbered list starts at 1.
const numbering = (lists) =>
  `${XML}<w:numbering ${NS}>` +
  lists
    .map(
      (ordered, i) =>
        `<w:abstractNum w:abstractNumId="${i}"><w:multiLevelType w:val="hybridMultilevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/>` +
        `<w:numFmt w:val="${ordered ? "decimal" : "bullet"}"/><w:lvlText w:val="${ordered ? "%1." : "•"}"/><w:lvlJc w:val="left"/>` +
        `<w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>`
    )
    .join("") +
  lists.map((_, i) => `<w:num w:numId="${i + 1}"><w:abstractNumId w:val="${i}"/></w:num>`).join("") +
  `</w:numbering>`;

// Running header: the program on the left, the document on the right.
const header = (title) => {
  const side = (content, w) => cell(content, { w, border: null, mar: [0, 0, 0, 0] });
  return (
    `${XML}<w:hdr ${NS}>` +
    tbl(
      [6500, 2860],
      [
        row(
          side(p(run("AI STAKEHOLDER CHALLENGE", { b: true, smallCaps: true, color: C.headerLeft, sz: 16 }), { line: 240 }), 6500) +
            side(p(run(title, { color: C.headerRight, sz: 16 }), { jc: "right", line: 240 }), 2860)
        ),
      ]
    ) +
    `${p("")}</w:hdr>`
  );
};

const pageNumber = () =>
  `${XML}<w:ftr ${NS}><w:p><w:pPr><w:jc w:val="right"/></w:pPr><w:r><w:rPr><w:color w:val="${C.footer}"/><w:sz w:val="18"/></w:rPr>` +
  `<w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:color w:val="${C.footer}"/><w:sz w:val="18"/></w:rPr><w:instrText xml:space="preserve">PAGE</w:instrText></w:r>` +
  `<w:r><w:rPr><w:color w:val="${C.footer}"/><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>`;

const REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml";

async function pack({ title, document, lists }) {
  const parts = [
    ["document", "document.main", document],
    ["styles", "styles", styles()],
    ["numbering", "numbering", numbering(lists)],
    ["header1", "header", header(title)],
    ["footer1", "footer", pageNumber()],
    ["footer2", "footer", `${XML}<w:ftr ${NS}>${p(run(CONFIDENTIAL, { color: C.footer, sz: 18 }), { jc: "center" })}</w:ftr>`],
  ];
  const zip = new JSZip();
  zip.file(
    "[Content_Types].xml",
    `${XML}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
      `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>` +
      parts.map(([name, type]) => `<Override PartName="/word/${name}.xml" ContentType="${TYPE}.${type}+xml"/>`).join("") +
      `</Types>`
  );
  zip.file(
    "_rels/.rels",
    `${XML}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
      `<Relationship Id="rId1" Type="${REL}/officeDocument" Target="word/document.xml"/></Relationships>`
  );
  // rId1 styles, rId2 numbering, rId3 the header, rId4 and rId5 the footers, in the order above.
  // The title page has no header of its own: titlePg with no "first" header leaves it empty.
  zip.file(
    "word/_rels/document.xml.rels",
    `${XML}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
      parts
        .slice(1)
        .map(([name, type], i) => `<Relationship Id="rId${i + 1}" Type="${REL}/${type}" Target="${name}.xml"/>`)
        .join("") +
      `</Relationships>`
  );
  for (const [name, , xml] of parts) zip.file(`word/${name}.xml`, xml);
  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE", compressionOptions: { level: 9 } });
}

/* ------------------------------------------------------------------ run -- */

const blocks = parse(fs.readFileSync(SRC, "utf8"));
const built = build(blocks);
const buf = await pack(built);
try {
  fs.writeFileSync(OUT, buf);
} catch (err) {
  if (err.code !== "EBUSY" && err.code !== "EPERM") throw err;
  console.error(`${path.basename(OUT)} is open in Word. Close it and run this again. Nothing was written.`);
  process.exit(1);
}

const count = (type) => blocks.filter((b) => b.type === type).length;
console.log(`${built.title}`);
console.log(`  ${count("h2")} sections, ${count("table")} tables, ${count("callout")} callouts`);
console.log(`  ${path.relative(ROOT, OUT).split(path.sep).join("/")}  (${(buf.length / 1024).toFixed(1)} KB)`);
