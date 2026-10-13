/**
 * program-deck.mjs — build the session notes deck for a program day.
 *
 *   node scripts/program-deck.mjs program/resources/<folder>/<slug>.md [out.pptx]
 *   node scripts/deck-preview.mjs <the .pptx>      <- then look at it
 *
 * Reads   program/resources/<folder>/<slug>.md    (the reference, edited by hand)
 *         website-context/aisc_resources/AISC_DAY 2/Day2_Session_Notes.pptx
 *                                                 (the design, read only)
 * Writes  program/resources/<folder>/<slug>.pptx  (gitignored, like its source)
 *
 * WHY THIS EXISTS. Session notes are slides, so the designed document Michael
 * reviews is a deck, not a Word file (program-docx.mjs builds those). The
 * Markdown holds what each slide says. This puts it back into the look of the
 * Day 1 to 3 decks.
 *
 * HOW. The original decks are regular: every piece of text is its own shape,
 * and the same seven slide designs repeat. So nothing is redrawn. Each new
 * slide is a copy of the original slide with the same design, with the text
 * of each shape swapped. Colours, fonts, positions and sizes are the
 * original's own. The original file is opened, never written.
 *
 * AN EIGHTH DESIGN, "numbered rows", is not in the original deck. It is the
 * Day 1 deck's slide for one of the four Ds (a banner, then three numbered
 * rows, each with a name, a line, three questions and a quote beside it),
 * wanted in the Day 7 deck (founder, 2026-10-11). It is put together here
 * from this deck's own shapes: every shape on it is a copy of one on the
 * banner-and-cards slide, moved and resized. See numberedRowsSlide().
 *
 * That also sets the limit: A SLIDE HOLDS WHAT ITS DESIGN HOLDS. A two-box
 * slide has four lines a side, the numbered grid has six items. The build
 * stops with a message when a slide does not fit a design, and it does not
 * shrink type to make room, so text much longer than the original's will
 * overflow. Look at the render.
 *
 * THE SEVEN DESIGNS, and the Markdown shape that selects each one. These are
 * the shapes program-convert.mjs writes when it imports a deck:
 *
 *   title          a table headed **01** | **02** | **03**, part names, lines
 *   part           a **PART 1 OF 3** line and one line under it
 *   two boxes      a two-column table with four rows
 *   three columns  a table headed **1** | **2** | **3**, names, then bodies
 *   six items      a numbered list of six: 1. **Name:** text
 *   banner, cards  a ***"question"*** line, then a three-column table of
 *                  card titles, ***questions*** and bodies
 *   wrap-up        a three-column table headed emoji **Name**, and a
 *                  **Closing Reflection:** line
 *   numbered rows  three sections headed ### 1. Name, each with an *italic
 *                  line*, three "- " questions and a 💬 quote. The second
 *                  bold line of the slide is the banner. No standfirst
 *
 * On content slides the first bold line is the section label, the first
 * italic line is the standfirst, and the line starting 💬 is the quote strip.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import JSZip from "jszip";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const TEMPLATE = path.join(ROOT, "website-context", "aisc_resources", "AISC_DAY 2", "Day2_Session_Notes.pptx");

const [, , input, output] = process.argv;
if (!input) {
  console.error("Usage: node scripts/program-deck.mjs program/resources/<folder>/<slug>.md [out.pptx]");
  process.exit(1);
}
const SRC = path.resolve(process.cwd(), input);
for (const [file, what] of [
  [SRC, input],
  [TEMPLATE, "the original Day 2 deck this copies its design from"],
]) {
  if (!fs.existsSync(file)) {
    console.error(`Not found: ${what}`);
    process.exit(1);
  }
}
const OUT = output ? path.resolve(process.cwd(), output) : SRC.replace(/\.md$/i, ".pptx");

/* -------------------------------------------------------------- designs -- */

// `from` is the slide of the original deck that carries the design. Every
// number after it is the position of a shape on that slide, counting from 0.
const DESIGNS = {
  title: { from: 1, day: 1, kind: 2, parts: [[3, 4, 5], [6, 7, 8], [9, 10, 11]] },
  part: { from: 2, label: 0, name: 1, line: 2 },
  twoBox: { from: 3, heads: [5, 11], lines: [[6, 7, 8, 9], [12, 13, 14, 15]], quote: 17, page: 19 },
  threeCols: { from: 4, cols: [[5, 6, 7], [9, 10, 11], [13, 14, 15]], quote: 17, page: 19 },
  bannerCards: { from: 6, bannerLabel: 5, banner: 6, label: 7, line: 8, cards: [[10, 11, 12], [14, 15, 16], [18, 19, 20]], quote: 22, page: 24 },
  sixItems: { from: 10, items: [[5, 6, 7], [9, 10, 11], [13, 14, 15], [17, 18, 19], [21, 22, 23], [25, 26, 27]], quote: 29, page: 31 },
  wrapUp: { from: 16, label: 0, heading: 1, items: [[2, 3, 4], [5, 6, 7], [8, 9, 10]], closing: 12 },
  // Not a slide of the original: numberedRowsSlide() makes it. Each row is
  // [number, name, line, questions, quote].
  numberedRows: { from: "rows", banner: 4, rows: [[6, 8, 9, 10, 12], [14, 16, 17, 18, 20], [22, 24, 25, 26, 28]], page: 30 },
};
// On every content slide: section label, headline, standfirst.
const SECTION = 1;
const HEADLINE = 2;
const STANDFIRST = 3;

/* ------------------------------------------------------------- Markdown -- */

const plain = (s) => s.replace(/\*+/g, "").trim();
const cells = (line) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

function parse(md) {
  let lines = md.replace(/\r\n/g, "\n").split("\n");
  const rule = lines.indexOf("---");
  if (rule !== -1 && rule < 20) lines = lines.slice(rule + 1);

  const slides = [];
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    const head = t.match(/^## Slide \d+: (.+)$/);
    if (head) {
      slides.push({ title: head[1], bold: [], italic: [], strong: [], text: [], table: null, list: [], rows: [] });
      continue;
    }
    const s = slides[slides.length - 1];
    if (!s || !t || t.startsWith("<!--")) continue;

    // A numbered row, and what belongs to it until the next one.
    const rowHead = t.match(/^### \d+\. (.+)$/);
    if (rowHead) {
      s.rows.push({ name: plain(rowHead[1]), line: "", bullets: [], quote: "" });
      continue;
    }
    const row = s.rows[s.rows.length - 1];
    if (row) {
      if (t.startsWith("- ")) row.bullets.push(plain(t.slice(2)));
      else if (plain(t).startsWith("💬")) row.quote = plain(t).replace("💬", "").trim();
      else if (/^\*[^*]+\*$/.test(t)) row.line = plain(t);
      else s.text.push(plain(t));
      continue;
    }

    if (t.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(cells(lines[i++]));
      i--;
      s.table = { head: rows[0], rows: rows.slice(2) };
    } else if (/^\d+\. /.test(t)) {
      const m = t.replace(/^\d+\. /, "").match(/^\*\*(.+?):\*\*\s*(.+)$/);
      s.list.push(m ? { name: m[1], body: m[2] } : { name: "", body: plain(t) });
    } else if (t.startsWith("💬")) {
      s.quote = plain(t.replace("💬", ""));
    } else if (/^\*\*Closing Reflection:\*\*/.test(t)) {
      s.closing = plain(t.replace(/^\*\*Closing Reflection:\*\*/, ""));
    } else if (/^\*\*\*[^*]+\*\*\*$/.test(t)) {
      s.strong.push(plain(t));
    } else if (/^\*\*[^*]+\*\*$/.test(t)) {
      s.bold.push(plain(t));
    } else if (/^\*[^*]+\*$/.test(t)) {
      s.italic.push(plain(t));
    } else {
      s.text.push(plain(t));
    }
  }
  return slides;
}

// Which design a slide is written for, and the text for each of its shapes.
function plan(s, n) {
  const fail = (why) => {
    console.error(`Slide ${n}, "${s.title}": ${why}`);
    process.exit(1);
  };
  const t = s.table;
  const out = []; // [shape, text, run]
  const put = (shape, text, runIndex = 0) => out.push([shape, text ?? "", runIndex]);
  const common = (d) => {
    put(SECTION, s.bold[0]);
    put(HEADLINE, s.title);
    put(STANDFIRST, s.italic[0]);
    put(d.quote, s.quote, 1);
    put(d.page, String(n));
  };

  let name;
  if (t && t.head.every((h) => /^\*\*0\d\*\*$/.test(h))) {
    name = "title";
    const d = DESIGNS.title;
    put(d.day, s.bold[0]);
    put(d.kind, s.text[0]);
    d.parts.forEach(([num, label, line], i) => {
      put(num, plain(t.head[i]));
      put(label, plain(t.rows[0][i]));
      put(line, plain(t.rows[1][i]));
    });
  } else if (s.bold.some((b) => /^PART \d OF \d$/.test(b))) {
    name = "part";
    const d = DESIGNS.part;
    put(d.label, s.bold[0]);
    put(d.name, s.title);
    put(d.line, s.text[0]);
  } else if (s.closing) {
    name = "wrapUp";
    const d = DESIGNS.wrapUp;
    if (!t || t.head.length !== 3) fail("a wrap-up needs a three-column table");
    put(d.label, s.bold[0]);
    put(d.heading, s.title);
    d.items.forEach(([icon, label, body], i) => {
      const m = t.head[i].match(/^(.*?)\s*\*\*(.+)\*\*$/);
      put(icon, m ? m[1] : "");
      put(label, m ? m[2] : plain(t.head[i]));
      put(body, plain(t.rows[0][i]));
    });
    put(d.closing, s.closing, 1);
  } else if (s.rows.length) {
    name = "numberedRows";
    const d = DESIGNS.numberedRows;
    if (s.rows.length !== 3) fail(`this design holds three numbered rows, this has ${s.rows.length}`);
    put(SECTION, s.bold[0]);
    put(HEADLINE, s.title);
    put(d.banner, s.bold[1]);
    d.rows.forEach(([num, label, line, questions, quote], i) => {
      const r = s.rows[i];
      if (r.bullets.length !== 3) fail(`each row holds three questions, row ${i + 1} has ${r.bullets.length}`);
      put(num, String(i + 1));
      put(label, r.name);
      put(line, r.line);
      // Typed bullets, as in the two boxes.
      r.bullets.forEach((b, k) => put(questions, `•  ${b}`, k));
      put(quote, r.quote, 1);
    });
    put(d.page, String(n));
  } else if (s.list.length) {
    name = "sixItems";
    const d = DESIGNS.sixItems;
    if (s.list.length !== 6) fail(`the numbered grid holds six items, this has ${s.list.length}`);
    common(d);
    d.items.forEach(([, label, body], i) => {
      put(label, s.list[i].name);
      put(body, s.list[i].body);
    });
  } else if (t && t.head.length === 3 && s.strong.length) {
    name = "bannerCards";
    const d = DESIGNS.bannerCards;
    common(d);
    put(d.bannerLabel, s.bold[1]);
    put(d.banner, s.strong[0]);
    put(d.label, s.bold[2]);
    put(d.line, s.italic[1]);
    d.cards.forEach(([label, question, body], i) => {
      put(label, plain(t.head[i]));
      put(question, plain(t.rows[0][i]));
      put(body, plain(t.rows[1][i]));
    });
  } else if (t && t.head.length === 3 && t.head.every((h, i) => plain(h) === String(i + 1))) {
    name = "threeCols";
    const d = DESIGNS.threeCols;
    common(d);
    d.cols.forEach(([, label, body], i) => {
      put(label, plain(t.rows[0][i]));
      put(body, plain(t.rows[1][i]));
    });
  } else if (t && t.head.length === 2) {
    name = "twoBox";
    const d = DESIGNS.twoBox;
    if (t.rows.length !== 4) fail(`each box holds four lines, this has ${t.rows.length}`);
    common(d);
    d.heads.forEach((shape, i) => put(shape, plain(t.head[i])));
    // The original sets its bullets as a typed character, so this does too.
    d.lines.forEach((shapes, i) => shapes.forEach((shape, r) => put(shape, `•  ${plain(t.rows[r][i])}`)));
  } else {
    fail("this is not written in any of the eight designs. See the top of scripts/program-deck.mjs");
  }
  return { name, from: DESIGNS[name].from, fills: out };
}

/* ---------------------------------------------------------------- build -- */

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Swap the text of one run in one shape. Everything else in the shape stays.
function fill(xml, fills) {
  const parts = xml.split(/(<p:sp>[\s\S]*?<\/p:sp>)/);
  for (const [shape, text, runIndex] of fills) {
    const at = shape * 2 + 1;
    if (parts[at] === undefined) throw new Error(`the original slide has no shape ${shape}`);
    let seen = -1;
    parts[at] = parts[at].replace(/<a:t>[\s\S]*?<\/a:t>|<a:t\/>/g, (m) => (++seen === runIndex ? `<a:t>${esc(text)}</a:t>` : m));
    if (seen < runIndex) throw new Error(`shape ${shape} of the original slide has no text to replace`);
  }
  return parts.join("");
}

// The numbered rows slide, put together from the banner-and-cards slide of
// the original. Nothing is drawn: each shape is a copy of one of that
// slide's shapes, with its place, its size and sometimes its type size
// changed. The copied shapes keep the original's colours and font.
//
//   0 1 2      top line, section label, headline        (as they are)
//   3 4        the banner and its text                  (4 and 6: banner, its question)
//   per row    number block, number                     (4 and 5: banner, its label)
//              box, name, line, three questions         (9, 11, 8, 12: card, question, line, body)
//              quote box, quote                         (21 and 22: the quote strip)
//   29 30      footer, page number                      (as they are)
function numberedRowsSlide(src) {
  const parts = src.split(/(<p:sp>[\s\S]*?<\/p:sp>)/);
  const shape = (i) => parts[i * 2 + 1];
  let id = 300;
  const copy = (i, o = {}) => {
    id += 1;
    let s = shape(i).replace(/<p:cNvPr id="\d+" name="[^"]*"\/>/, `<p:cNvPr id="${id}" name="Google Shape;${id};p8"/>`);
    if (o.at) {
      const [x, y, w, h] = o.at;
      s = s.replace(/<a:off x="\d+" y="\d+"\/><a:ext cx="\d+" cy="\d+"\/>/, `<a:off x="${x}" y="${y}"/><a:ext cx="${w}" cy="${h}"/>`);
    }
    if (o.size) s = s.replace(/ sz="\d+"/g, ` sz="${o.size}"`).replace(/<a:buSzPts val="\d+"\/>/g, `<a:buSzPts val="${o.size}"/>`);
    if (o.centre) s = s.replace(/ algn="l"/g, ' algn="ctr"');
    if (o.upright) s = s.replace(/ i="1"/g, ' i="0"');
    if (o.paragraphs) s = s.replace(/<a:p>[\s\S]*?<\/a:p>/, (p) => p.repeat(o.paragraphs));
    return s;
  };

  // Places, in the units the file uses (914400 to the inch).
  const LEFT = 548640;
  const WIDE = 11064240;
  const NUM_W = 594360;
  const BOX_X = LEFT + NUM_W + 45720;
  const BOX_W = 6400800;
  const TEXT_X = BOX_X + 182880;
  const TEXT_W = BOX_W - 365760;
  const QUOTE_X = BOX_X + BOX_W + 137160;
  const QUOTE_W = LEFT + WIDE - QUOTE_X;
  const BANNER_Y = 1828800;
  const BANNER_H = 548640;
  const ROW_Y = 2514600;
  const ROW_H = 1203960;
  const ROW_GAP = 137160;

  const out = [shape(0), shape(1), shape(2)];
  out.push(copy(4, { at: [LEFT, BANNER_Y, WIDE, BANNER_H] }));
  out.push(copy(6, { at: [LEFT + 228600, BANNER_Y, WIDE - 457200, BANNER_H], size: 1800, centre: true, upright: true }));
  for (let r = 0; r < 3; r++) {
    const y = ROW_Y + r * (ROW_H + ROW_GAP);
    out.push(copy(4, { at: [LEFT, y, NUM_W, ROW_H] }));
    out.push(copy(5, { at: [LEFT, y, NUM_W, ROW_H], size: 2800, centre: true }));
    out.push(copy(9, { at: [BOX_X, y, BOX_W, ROW_H] }));
    out.push(copy(11, { at: [TEXT_X, y + 82296, TEXT_W, 265176], size: 1600, upright: true }));
    out.push(copy(8, { at: [TEXT_X, y + 356616, TEXT_W, 228600] }));
    out.push(copy(12, { at: [TEXT_X, y + 612648, TEXT_W, 530352], size: 1200, paragraphs: 3 }));
    out.push(copy(21, { at: [QUOTE_X, y, QUOTE_W, ROW_H] }));
    out.push(copy(22, { at: [QUOTE_X + 182880, y, QUOTE_W - 365760, ROW_H] }));
  }
  out.push(shape(23), shape(24));
  return parts[0] + out.join("") + parts[parts.length - 1];
}

const slides = parse(fs.readFileSync(SRC, "utf8"));
if (!slides.length) {
  console.error('No slides found. Each one starts with a line like "## Slide 1: Title".');
  process.exit(1);
}
const plans = slides.map((s, i) => plan(s, i + 1));
const day = slides[0].bold[0] ?? "Day 2"; // "Day 2", from the title slide

const zip = await JSZip.loadAsync(fs.readFileSync(TEMPLATE));
const original = {};
for (const name of Object.keys(zip.files)) {
  const m = name.match(/^ppt\/slides\/slide(\d+)\.xml$/);
  if (m) original[m[1]] = await zip.file(name).async("string");
}
original.rows = numberedRowsSlide(original[DESIGNS.bannerCards.from]);

// Out go the original's slides and their empty notes pages. The master, the
// one layout and the theme stay exactly as they are.
for (const name of Object.keys(zip.files)) {
  if (/^ppt\/(slides|notesSlides)\//.test(name)) zip.remove(name);
}

const REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
plans.forEach((p, i) => {
  const xml = fill(original[p.from], p.fills).replaceAll("DAY 2", day.toUpperCase()).replaceAll("Day 2", day);
  zip.file(`ppt/slides/slide${i + 1}.xml`, xml);
  zip.file(
    `ppt/slides/_rels/slide${i + 1}.xml.rels`,
    `${XML}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
      `<Relationship Id="rId1" Type="${REL}/slideLayout" Target="../slideLayouts/slideLayout1.xml"/></Relationships>`
  );
});

const edit = async (name, fn) => zip.file(name, fn(await zip.file(name).async("string")));

await edit("[Content_Types].xml", (x) =>
  x
    .replace(/<Override[^>]*PartName="\/ppt\/(slides|notesSlides)\/[^>]*\/>/g, "")
    .replace(
      "</Types>",
      plans
        .map(
          (_, i) =>
            `<Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`
        )
        .join("") + "</Types>"
    )
);
await edit("ppt/_rels/presentation.xml.rels", (x) =>
  x
    .replace(/<Relationship [^>]*Type="[^"]*\/slide"[^>]*\/>/g, "")
    .replace(
      "</Relationships>",
      plans.map((_, i) => `<Relationship Id="rId${100 + i}" Type="${REL}/slide" Target="slides/slide${i + 1}.xml"/>`).join("") +
        "</Relationships>"
    )
);
await edit("ppt/presentation.xml", (x) =>
  x.replace(
    /<p:sldIdLst>[\s\S]*?<\/p:sldIdLst>/,
    `<p:sldIdLst>${plans.map((_, i) => `<p:sldId id="${256 + i}" r:id="rId${100 + i}"/>`).join("")}</p:sldIdLst>`
  )
);
if (zip.file("docProps/app.xml")) {
  await edit("docProps/app.xml", (x) =>
    x.replace(/<Slides>\d+<\/Slides>/, `<Slides>${plans.length}</Slides>`).replace(/<Notes>\d+<\/Notes>/, "<Notes>0</Notes>")
  );
}

const buf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE", compressionOptions: { level: 9 } });
try {
  fs.writeFileSync(OUT, buf);
} catch (err) {
  if (err.code !== "EBUSY" && err.code !== "EPERM") throw err;
  console.error(`${path.basename(OUT)} is open in PowerPoint. Close it and run this again. Nothing was written.`);
  process.exit(1);
}

const tally = {};
for (const p of plans) tally[p.name] = (tally[p.name] ?? 0) + 1;
console.log(`${day} session notes: ${plans.length} slides`);
console.log(`  ${Object.entries(tally).map(([k, v]) => `${v} ${k}`).join(", ")}`);
console.log(`  ${path.relative(ROOT, OUT).split(path.sep).join("/")}  (${(buf.length / 1024).toFixed(1)} KB)`);
