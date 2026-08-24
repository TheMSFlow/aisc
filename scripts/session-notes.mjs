/**
 * session-notes.mjs — long-form video session notes builder (YouTube)
 *
 * Usage:
 *   node scripts/session-notes.mjs <slug> [spec.json]
 *   node scripts/deck-preview.mjs <the .pptx>     <- then look at it
 *
 * Builds a 16:9 PowerPoint deck from a published briefing. The deck is a
 * DETAILED SUMMARY OF THE BRIEFING, and nothing else.
 *
 * REBUILT 2026-08-14. The previous version was a two-layer artifact: sparse
 * audience-facing slides over a private speaker-notes layer carrying locked
 * passages, expansion prompts, re-hooks and embeds. Michael does not read the
 * notes layer, so in practice the deck was a stack of one-line labels with the
 * substance in a place nobody opened. Three things went with that model:
 *
 *   - NO SPEAKER NOTES. Everything the deck has to say is on the slide.
 *   - NO PDF. The pptx is the only output.
 *   - NO FILM ARC. The old OPEN/PART/CLOSE structure reorganized the briefing,
 *     so no slide corresponded to anything findable in the post. Slides now
 *     follow the briefing's own sections, in the briefing's own order.
 *
 * The job of a slide is: read it once, understand the point, expand on it on
 * camera in your own words. That means a row carries a claim AND the reasoning
 * under it, not a cryptic phrase that only means something to someone who
 * already holds the argument.
 *
 * DESIGN SYSTEM: unchanged. The AISC Day 1-3 session notes decks, reproduced.
 * Two slide families, and the split is the whole system:
 *
 *   - DARK slides (title, close): deep navy ground, thin periwinkle bands top
 *     and bottom, everything centred.
 *   - LIGHT slides (content): white ground, thin navy rule at the top,
 *     eyebrow, headline, a short thick accent rule beneath it, the body,
 *     an optional quote strip, then a grey foot bar with a right-aligned label.
 *
 * Body rows follow the Day 1 "AI Turns Data Into Intelligence" treatment: a
 * numeral chip stepping down an indigo ramp, then a grey panel holding a bold
 * label and the explanation under it.
 *
 * The per-theme accent used by the covers and infographics is deliberately
 * NOT used here. This template is navy and periwinkle only, and the theme
 * survives in the foot label instead.
 *
 * Spec file shape:
 *   {
 *     "sections": [ { "name": "The premise", "subtitle": "..." }, ... ],
 *     "slides": [
 *       { "type": "title" },
 *       { "type": "content", "section": 1, "headline": "...",
 *         "standfirst": "...",
 *         "rows": [ { "label": "...", "body": "..." } ],
 *         "quote": "..." },
 *       { "type": "close", "line": "..." }
 *     ]
 *   }
 *
 * Output: content/social/<date>_<cover>_<slug>/<date>_SESSION-NOTES_...pptx
 * Staging only. Michael moves the folder to Drive himself.
 * See agent-guides/blog/SOCIAL_GUIDE.md.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import PptxGenJS from "pptxgenjs";
import { COVERS } from "../src/lib/blog/taxonomy.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// Sampled from content/session-notes-template (the Day 1 deck).
const INK = "1A237E"; // headlines, filled boxes, deepest numeral chip
const INK_DEEP = "0D0A47"; // dark slide ground
const PERI = "6368DA"; // frame bands, rules, lightest numeral chip

const PERI_SOFT = "9AA0E4"; // the short rule under a headline
const FOOT_DIM = "6E74B5"; // foot label on dark slides
const PANEL = "E8E9EC"; // content row panels
const QUOTE_BG = "F0F0FA";
const QUOTE_BORDER = "C9CBEF";
const FOOT_BAR = "F1F1F4";
const MUTED = "8A90C4"; // eyebrow on light, sub-lines
const BODY_INK = "3A3F63"; // panel sub-line text
const WHITE = "FFFFFF";

// Inter is installed on this machine and is already the house social face.
// The Day 1-3 decks were built in Google Slides and their exact face is not
// identifiable from a screenshot, so this is a deliberate, documented choice.
const FACE = "Inter";

// Standard PowerPoint widescreen. pptxgenjs LAYOUT_16x9 is 10 x 5.625in, which
// is NOT this, so the layout is defined explicitly rather than named.
const W = 13.333;
const H = 7.5;
const M = 0.62; // left and right margin
const CW = W - M * 2; // content width

const [, , slug, specArg] = process.argv;

if (!slug) {
  console.error("Usage: node scripts/session-notes.mjs <slug> [spec.json]");
  process.exit(1);
}

// The spec is tracked source and has a canonical home, so the path argument
// is optional. Pass one only to build from a draft spec somewhere else.
const specPath =
  specArg ?? path.join(ROOT, "content", "sources", slug, "session-notes.json");
if (!fs.existsSync(path.resolve(specPath))) {
  console.error(`No spec: ${path.relative(ROOT, path.resolve(specPath))}`);
  process.exit(1);
}

const mdxPath = path.join(ROOT, "content", "awakening", `${slug}.mdx`);
if (!fs.existsSync(mdxPath)) {
  console.error(`No such briefing: content/awakening/${slug}.mdx`);
  process.exit(1);
}

const { data: fm } = matter(fs.readFileSync(mdxPath, "utf8"));

if (fm.draft) {
  console.error(
    `${slug} is still a draft. Only published briefings get session notes.`
  );
  process.exit(1);
}

const cover = COVERS[fm.cover];
if (!cover) {
  console.error(`Unknown cover id "${fm.cover}" in ${slug}.mdx`);
  process.exit(1);
}

const spec = JSON.parse(fs.readFileSync(path.resolve(specPath), "utf8"));

/**
 * The retired arc format used `parts`, `divider` slides and a `notes` field on
 * every slide. A spec written against it would still parse here and quietly
 * build a deck missing most of its content, so say so instead.
 */
{
  const legacy = [];
  if (spec.parts) legacy.push("`parts` (now `sections`)");
  const slidesIn = spec.slides ?? [];
  if (slidesIn.some((s) => s.type === "divider"))
    legacy.push("`divider` slides (removed, sections carry the structure)");
  if (slidesIn.some((s) => s.notes))
    legacy.push("`notes` (removed, the slide carries everything)");
  if (legacy.length) {
    console.error(
      "This spec is written against the retired arc format. Found:"
    );
    legacy.forEach((l) => console.error(`  ${l}`));
    console.error(
      "Rewrite it as a section-by-section summary of the briefing. See the"
    );
    console.error("spec shape at the top of this file.");
    process.exit(1);
  }
}

/**
 * COPY_GUIDE bans the em-dash everywhere, and SOCIAL_GUIDE extends every voice
 * rule to each word that leaves this system. Fail the build rather than ship
 * one: a spec is easy to write in a hurry and this deck is now all slide.
 */
{
  const offenders = [];
  const walk = (value, trail) => {
    if (typeof value === "string") {
      if (value.includes("—")) offenders.push(trail);
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => walk(v, `${trail}[${i}]`));
    } else if (value && typeof value === "object") {
      for (const [k, v] of Object.entries(value)) walk(v, `${trail}.${k}`);
    }
  };
  walk(spec, "spec");
  if (offenders.length) {
    console.error("Em-dash found. COPY_GUIDE bans it everywhere. Fix these:");
    offenders.forEach((o) => console.error(`  ${o}`));
    process.exit(1);
  }
}

const sections = (spec.sections ?? []).map((s) =>
  typeof s === "string" ? { name: s, subtitle: "" } : s
);
const FOOT = `THE AWAKENING · ${(cover.label ?? fm.theme).toUpperCase()}`;

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "AISC16x9", width: W, height: H });
pptx.layout = "AISC16x9";
pptx.author = "Michael Steve Clarity Studio";
pptx.title = fm.title;

/**
 * TEXT MEASUREMENT. pptxgenjs cannot measure, and a detailed summary is the
 * one thing the old sparse format never had to worry about: four rows of real
 * explanation will overflow a fixed row height every time.
 *
 * Inter's average advance width sits near 0.52em for mixed-case prose. That is
 * an estimate, not a metric read from the font, so every fit is checked with a
 * 5% safety margin and the deck is still looked at with deck-preview.mjs.
 */
const CHAR_EM = 0.52;
const LINE = 1.22; // line-height multiple used across the template

const lineH = (pt) => (pt / 72) * LINE;

function estLines(text, pt, widthIn) {
  if (!text) return 0;
  const charW = (pt / 72) * CHAR_EM;
  const perLine = Math.max(1, Math.floor((widthIn * 0.95) / charW));
  return Math.max(1, Math.ceil(text.length / perLine));
}

/** Linear ramp between two hex colours, so every numeral chip differs. */
function ramp(from, to, i, n) {
  if (n <= 1) return from;
  const t = i / (n - 1);
  const ch = (hex, o) => parseInt(hex.slice(o, o + 2), 16);
  const mix = (o) =>
    Math.round(ch(from, o) + (ch(to, o) - ch(from, o)) * t)
      .toString(16)
      .padStart(2, "0");
  return `${mix(0)}${mix(2)}${mix(4)}`.toUpperCase();
}

/** The speech bubble the Day 1-3 decks set beside a speakable line. */
function speechBubble(slide, x, y) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w: 0.2,
    h: 0.15,
    rectRadius: 0.05,
    fill: { color: PERI },
  });
  slide.addShape(pptx.ShapeType.triangle, {
    x: x + 0.03,
    y: y + 0.14,
    w: 0.07,
    h: 0.07,
    fill: { color: PERI },
    rotate: 180,
  });
}

/** Dark family: navy ground with periwinkle bands top and bottom. */
function darkChrome(slide, footed = true) {
  // Drawn as a full-bleed shape rather than slide.background: LibreOffice
  // renders a background fill unevenly under other shapes on export.
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: W,
    h: H,
    fill: { color: INK_DEEP },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: W,
    h: 0.11,
    fill: { color: PERI },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: H - 0.11,
    w: W,
    h: 0.11,
    fill: { color: PERI },
  });
  if (footed) {
    slide.addText(FOOT, {
      x: M,
      y: H - 0.46,
      w: CW,
      h: 0.28,
      align: "right",
      fontFace: FACE,
      fontSize: 8,
      bold: true,
      charSpacing: 1,
      // Solid, pre-dimmed rather than PERI_SOFT at transparency: a text
      // transparency on this run loses its alignment on export and the label
      // overflows the slide edge.
      color: FOOT_DIM,
      valign: "middle",
    });
  }
}

/** Light family: navy hairline at the top, grey foot bar with the label. */
function lightChrome(slide) {
  slide.background = { color: WHITE };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: W,
    h: 0.1,
    fill: { color: INK },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: H - 0.34,
    w: W,
    h: 0.34,
    fill: { color: FOOT_BAR },
  });
  slide.addText(FOOT, {
    x: M,
    y: H - 0.31,
    w: CW,
    h: 0.28,
    align: "right",
    fontFace: FACE,
    fontSize: 8,
    bold: true,
    charSpacing: 1.2,
    color: MUTED,
    valign: "middle",
  });
}

/** The briefing's own line, in the pale strip the Day 1-3 decks put it in. */
function quoteStrip(slide, quote) {
  const y = H - 1.28;
  slide.addShape(pptx.ShapeType.rect, {
    x: M,
    y,
    w: CW,
    h: 0.62,
    fill: { color: QUOTE_BG },
    line: { color: QUOTE_BORDER, width: 0.75 },
  });
  speechBubble(slide, M + 0.24, y + 0.2);
  slide.addText(`"${quote}"`, {
    x: M + 0.55,
    y,
    w: CW - 0.85,
    h: 0.62,
    fontFace: FACE,
    fontSize: 12.5,
    italic: true,
    color: INK,
    valign: "middle",
  });
}

/**
 * TITLE SLIDE. The old version carried a card per part, which worked at three
 * and breaks at six: a briefing has as many sections as it has, and six cards
 * across a 12in measure leaves 1.8in each.
 *
 * It is now a contents list, which is also the more honest object. This deck
 * is a summary of a written piece, so its opening slide is a table of contents
 * and the numerals encode the briefing's reading order.
 */
function titleSlide() {
  const slide = pptx.addSlide();
  darkChrome(slide);

  slide.addText("THE AWAKENING", {
    x: 0,
    y: 0.62,
    w: W,
    h: 0.3,
    align: "center",
    fontFace: FACE,
    fontSize: 10,
    bold: true,
    charSpacing: 3,
    color: PERI_SOFT,
  });

  slide.addText(fm.title, {
    x: W * 0.11,
    y: 1.12,
    w: W * 0.78,
    h: 1.5,
    align: "center",
    fontFace: FACE,
    fontSize: 32,
    bold: true,
    color: WHITE,
    lineSpacingMultiple: 1.1,
    valign: "middle",
  });

  slide.addText("Session Notes", {
    x: 0,
    y: 2.72,
    w: W,
    h: 0.44,
    align: "center",
    fontFace: FACE,
    fontSize: 20,
    italic: true,
    color: PERI_SOFT,
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: W / 2 - 2.2,
    y: 3.36,
    w: 4.4,
    h: 0.045,
    fill: { color: PERI },
  });

  // The list is a centred block with left-aligned rows: centred text would
  // make the numerals ragged and they are the thing carrying the order.
  //
  // Its width is measured from the longest row rather than fixed. A fixed
  // width centres the BOX, not the ink, so a list of short section names sat
  // visibly left of centre with dead space down the right.
  const NUM_W = 0.62;
  const textW = (t, pt) => (t ? t.length * (pt / 72) * CHAR_EM : 0);
  const listW = Math.min(
    CW,
    Math.max(
      ...sections.map(
        (s) => NUM_W + textW(s.name, 15) + textW(`   ${s.subtitle}`, 12)
      ),
      4
    ) + 0.1
  );
  const listX = (W - listW) / 2;
  const rowH = Math.min(0.5, (6.55 - 3.85) / Math.max(sections.length, 1));
  const top = 3.85 + (6.55 - 3.85 - rowH * sections.length) / 2;

  sections.forEach((s, i) => {
    const y = top + i * rowH;
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: listX,
      y,
      w: 0.62,
      h: rowH,
      fontFace: FACE,
      fontSize: 12,
      bold: true,
      color: PERI,
      valign: "middle",
    });
    slide.addText(
      [
        { text: s.name, options: { bold: true, color: WHITE, fontSize: 15 } },
        ...(s.subtitle
          ? [
              {
                text: `   ${s.subtitle}`,
                options: { color: PERI_SOFT, fontSize: 12 },
              },
            ]
          : []),
      ],
      {
        x: listX + 0.62,
        y,
        w: listW - 0.62,
        h: rowH,
        fontFace: FACE,
        valign: "middle",
      }
    );
  });
}

/**
 * CONTENT SLIDE. One per briefing section. Everything the section argues is
 * on this slide, because there is nowhere else for it to be.
 */
function contentSlide(s, index) {
  const slide = pptx.addSlide();
  const section = sections[s.section - 1] ?? { name: "" };
  lightChrome(slide);

  slide.addText(section.name.toUpperCase(), {
    x: M,
    y: 0.36,
    w: CW,
    h: 0.26,
    fontFace: FACE,
    fontSize: 9.5,
    bold: true,
    charSpacing: 2,
    color: MUTED,
  });

  const headW = CW * 0.92;
  const headLines = estLines(s.headline, 26, headW);
  slide.addText(s.headline, {
    x: M,
    y: 0.68,
    w: headW,
    h: Math.max(0.5, headLines * lineH(26)),
    fontFace: FACE,
    fontSize: 26,
    bold: true,
    color: INK,
    valign: "top",
  });

  let y = 0.68 + Math.max(0.5, headLines * lineH(26)) + 0.12;

  slide.addShape(pptx.ShapeType.rect, {
    x: M,
    y,
    w: 1.35,
    h: 0.075,
    fill: { color: PERI_SOFT },
  });
  y += 0.32;

  // The standfirst is the section's thesis in one sentence. It wraps often at
  // this length, so its height is measured rather than assumed: the old fixed
  // 0.52in advance put a two-line standfirst under the first row.
  if (s.standfirst) {
    const sfW = CW * 0.88;
    const sfH = estLines(s.standfirst, 14, sfW) * lineH(14);
    slide.addText(s.standfirst, {
      x: M,
      y,
      w: sfW,
      h: sfH,
      fontFace: FACE,
      fontSize: 14,
      bold: true,
      color: INK,
      lineSpacingMultiple: LINE,
      valign: "top",
    });
    y += sfH + 0.26;
  }

  const rows = s.rows ?? [];
  const rowGap = 0.14;
  const chipW = 0.72;
  const padX = 0.42; // panel text inset
  const padY = 0.2; // total vertical padding inside a panel

  const rowsBottom = (s.quote ? H - 1.28 : H - 0.82) - 0.12;
  const rowH =
    rows.length > 0
      ? (rowsBottom - y - (rows.length - 1) * rowGap) / rows.length
      : 0;
  const textW = CW - chipW - 0.1 - padX * 2;

  /**
   * BODY TYPE AUTO-FITS. The label stays at 15pt because it is the scan layer;
   * the explanation gives ground first. Same principle as the cover's headline
   * fitter: find the largest size that does not overflow, and say what it was.
   */
  const needed = (bodyPt) =>
    Math.max(
      ...rows.map(
        (r) =>
          estLines(r.label, 15, textW) * lineH(15) +
          (r.body ? 0.06 + estLines(r.body, bodyPt, textW) * lineH(bodyPt) : 0) +
          padY
      )
    );

  const SIZES = [12.5, 12, 11.5, 11, 10.5, 10];
  let bodyPt = SIZES[SIZES.length - 1];
  let fits = false;
  if (rows.length) {
    for (const pt of SIZES) {
      if (needed(pt) <= rowH) {
        bodyPt = pt;
        fits = true;
        break;
      }
    }
  } else {
    fits = true;
  }

  const fill = rows.length ? Math.round((needed(bodyPt) / rowH) * 100) : 0;
  const label = `slide ${index}  "${s.headline}"`;
  if (!fits) {
    console.log(
      `  OVERFLOW  ${label}: ${rows.length} rows do not fit at ${bodyPt}pt. Cut copy or split the slide.`
    );
  } else {
    console.log(
      `  ok        ${label}: ${rows.length} rows, body ${bodyPt}pt, ${fill}% of the row box`
    );
  }

  // The numeral ramp steps from deepest to lightest across the rows, the way
  // the Day 1 deck does it. Two rows or five, the ends stay fixed.
  rows.forEach((r, i) => {
    const ry = y + i * (rowH + rowGap);
    const shade = ramp(INK, PERI, i, rows.length);

    slide.addShape(pptx.ShapeType.rect, {
      x: M,
      y: ry,
      w: chipW,
      h: rowH,
      fill: { color: shade },
    });
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: M,
      y: ry,
      w: chipW,
      h: rowH,
      align: "center",
      valign: "middle",
      fontFace: FACE,
      fontSize: 12.5,
      bold: true,
      color: WHITE,
    });

    slide.addShape(pptx.ShapeType.rect, {
      x: M + chipW + 0.1,
      y: ry,
      w: CW - chipW - 0.1,
      h: rowH,
      fill: { color: PANEL },
    });
    /**
     * Label and explanation are ONE vertically centred block, not two boxes at
     * fixed offsets from the top: top-anchored text leaves a pool of empty
     * panel underneath it and the row reads unfinished.
     */
    slide.addText(
      [
        {
          text: r.label,
          options: {
            fontSize: 15,
            bold: true,
            color: INK,
            breakLine: Boolean(r.body),
            paraSpaceAfter: r.body ? 4 : 0,
          },
        },
        ...(r.body
          ? [
              {
                text: r.body,
                options: { fontSize: bodyPt, color: BODY_INK },
              },
            ]
          : []),
      ],
      {
        x: M + chipW + 0.1 + padX,
        y: ry,
        w: textW,
        h: rowH,
        fontFace: FACE,
        lineSpacingMultiple: LINE,
        valign: "middle",
      }
    );
  });

  if (s.quote) quoteStrip(slide, s.quote);
}

function closeSlide(s) {
  const slide = pptx.addSlide();
  darkChrome(slide);

  slide.addText(s.line, {
    x: W * 0.15,
    y: 2.1,
    w: W * 0.7,
    h: 3.0,
    align: "center",
    fontFace: FACE,
    fontSize: 25,
    bold: true,
    color: WHITE,
    lineSpacingMultiple: 1.25,
    valign: "middle",
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: W / 2 - 1.1,
    y: 5.42,
    w: 2.2,
    h: 0.045,
    fill: { color: PERI },
  });
}

const slides = spec.slides ?? [];
slides.forEach((s, i) => {
  const n = i + 1;
  if (s.type === "title") titleSlide();
  else if (s.type === "content") contentSlide(s, n);
  else if (s.type === "close") closeSlide(s);
  else {
    console.error(`Unknown slide type "${s.type}" at slide ${n}`);
    process.exit(1);
  }
});

// One folder per briefing, named exactly as its Drive folder. See cover.mjs.
const briefingDir = `${fm.date}_${fm.cover}_${slug}`;
const outDir = path.join(ROOT, "content", "social", briefingDir);
fs.mkdirSync(outDir, { recursive: true });
// <date>_<TYPE>_<cover>_<slug>. The type token was added 2026-08-01, when Drive
// moved to one folder per post: every asset for a briefing now sits together,
// so the filename has to say which asset it is.
const stem = `${fm.date}_SESSION-NOTES_${fm.cover}_${slug}`;
const outPath = path.join(outDir, `${stem}.pptx`);

await pptx.writeFile({ fileName: outPath });

console.log(`Wrote content/social/${briefingDir}/${stem}.pptx`);
console.log(`  ${slides.length} slides, ${sections.length} sections`);
console.log(`  Now look at it: node scripts/deck-preview.mjs "${outPath}"`);
