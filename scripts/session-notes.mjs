/**
 * session-notes.mjs — long-form video session notes builder (YouTube)
 *
 * Usage:
 *   node scripts/session-notes.mjs <slug> <spec.json>
 *   node scripts/deck-preview.mjs <the .pptx>     <- then look at it
 *
 * Builds a 16:9 PowerPoint deck for recording a long-form video from a
 * published briefing. Two layers in one file:
 *
 *   - The SLIDE is what viewers see. Sparse, audience-facing, no cues.
 *   - The SPEAKER NOTES are private, visible only in presenter view. They
 *     carry the expansion prompt, the repeated line, and the timing.
 *
 * DESIGN SYSTEM: the AISC Day 1-3 session notes decks, reproduced. Two slide
 * families, and the split is the whole system:
 *
 *   - DARK slides (title, part dividers, close): deep navy ground, thin
 *     periwinkle bands top and bottom, everything centred.
 *   - LIGHT slides (content): white ground, thin navy rule at the top,
 *     eyebrow, headline, a short thick accent rule beneath it, the body,
 *     the speakable-line strip, then a grey foot bar with a right-aligned
 *     label.
 *
 * Body rows follow the Day 1 "AI Turns Data Into Intelligence" treatment: a
 * numeral chip stepping down an indigo ramp, then a grey panel holding a bold
 * label and a muted sub-line.
 *
 * The per-theme accent used by the covers and infographics is deliberately
 * NOT used here. This template is navy and periwinkle only, and the theme
 * survives in the foot label instead.
 *
 * Spec file shape:
 *   {
 *     "parts": [ { "name": "Denial", "subtitle": "..." }, ... ],
 *     "slides": [
 *       { "type": "title",   "notes": "..." },
 *       { "type": "divider", "part": 1, "notes": "..." },
 *       { "type": "content", "part": 1, "headline": "...", "standfirst": "...",
 *         "rows": [ { "label": "...", "body": "..." } ],
 *         "quote": "...", "notes": "..." },
 *       { "type": "close",   "line": "...", "notes": "..." }
 *     ]
 *   }
 *
 * Output: content/session-notes/<date>_<cover>_<slug>.pptx  (gitignored)
 * Staging only. It goes to Drive after Michael confirms it, never before.
 * See agent-guides/blog/SOCIAL_GUIDE.md.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
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

const [, , slug, specPath] = process.argv;

if (!slug || !specPath) {
  console.error("Usage: node scripts/session-notes.mjs <slug> <spec.json>");
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
 * COPY_GUIDE bans the em-dash everywhere, and SOCIAL_GUIDE extends every voice
 * rule to each word that leaves this system. Speaker notes are read by exactly
 * one person, but the slides are not, and a spec is easy to write in a hurry.
 * Fail the build rather than ship one.
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

const parts = (spec.parts ?? []).map((p) =>
  typeof p === "string" ? { name: p, subtitle: "" } : p
);
const FOOT = `THE AWAKENING · ${(cover.label ?? fm.theme).toUpperCase()}`;

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "AISC16x9", width: W, height: H });
pptx.layout = "AISC16x9";
pptx.author = "Michael Steve Clarity Studio";
pptx.title = fm.title;

/**
 * pptxgenjs 4.0.1 drops the entire note when the string contains "\n": the
 * notesSlide is written with only its slide-number placeholder and no error
 * is raised. Verified against CR, CRLF, VT, U+2028 and U+2029; only a bare
 * CR survives serialization. Do not pass "\n" to addNotes directly.
 */
function addNotes(slide, notes) {
  if (!notes) return;
  slide.addNotes(notes.replace(/\r?\n/g, "\r"));
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

/** The speakable line, in the pale strip the Day 1-3 decks put it in. */
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

function titleSlide(s) {
  const slide = pptx.addSlide();
  darkChrome(slide);

  slide.addText("THE AWAKENING", {
    x: 0,
    y: 0.75,
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
    y: 1.35,
    w: W * 0.78,
    h: 1.7,
    align: "center",
    fontFace: FACE,
    fontSize: 34,
    bold: true,
    color: WHITE,
    lineSpacingMultiple: 1.1,
    valign: "middle",
  });

  slide.addText("Session Notes", {
    x: 0,
    y: 3.12,
    w: W,
    h: 0.5,
    align: "center",
    fontFace: FACE,
    fontSize: 22,
    italic: true,
    color: PERI_SOFT,
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: W / 2 - 2.2,
    y: 3.86,
    w: 4.4,
    h: 0.045,
    fill: { color: PERI },
  });

  const gap = 0.26;
  const cardW = (CW - gap * (parts.length - 1)) / parts.length;
  parts.forEach((p, i) => {
    const x = M + i * (cardW + gap);
    slide.addShape(pptx.ShapeType.rect, {
      x,
      y: 4.28,
      w: cardW,
      h: 1.72,
      fill: { color: PERI, transparency: 72 },
      line: { color: PERI, width: 0.75 },
    });
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: x + 0.3,
      y: 4.5,
      w: cardW - 0.6,
      h: 0.28,
      fontFace: FACE,
      fontSize: 10,
      bold: true,
      color: PERI_SOFT,
    });
    slide.addText(p.name, {
      x: x + 0.3,
      y: 4.83,
      w: cardW - 0.6,
      h: 0.42,
      fontFace: FACE,
      fontSize: 19,
      bold: true,
      color: WHITE,
    });
    if (p.subtitle) {
      slide.addText(p.subtitle, {
        x: x + 0.3,
        y: 5.32,
        w: cardW - 0.6,
        h: 0.6,
        fontFace: FACE,
        fontSize: 10,
        color: PERI_SOFT,
        lineSpacingMultiple: 1.25,
        valign: "top",
      });
    }
  });

  addNotes(slide, s.notes);
}

function dividerSlide(s) {
  const slide = pptx.addSlide();
  const p = parts[s.part - 1] ?? { name: "", subtitle: "" };
  darkChrome(slide);

  slide.addText(`PART ${s.part} OF ${parts.length}`, {
    x: 0,
    y: 0.95,
    w: W,
    h: 0.3,
    align: "center",
    fontFace: FACE,
    fontSize: 10,
    bold: true,
    charSpacing: 3,
    color: PERI_SOFT,
  });

  slide.addText(p.name, {
    x: 0,
    y: 3.05,
    w: W,
    h: 1.1,
    align: "center",
    fontFace: FACE,
    fontSize: 48,
    bold: true,
    color: WHITE,
  });

  if (p.subtitle) {
    slide.addText(p.subtitle, {
      x: W * 0.15,
      y: 4.2,
      w: W * 0.7,
      h: 0.5,
      align: "center",
      fontFace: FACE,
      fontSize: 16,
      color: PERI_SOFT,
    });
  }

  addNotes(slide, s.notes);
}

function contentSlide(s) {
  const slide = pptx.addSlide();
  const p = parts[s.part - 1] ?? { name: "" };
  lightChrome(slide);

  slide.addText(p.name.toUpperCase(), {
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

  slide.addText(s.headline, {
    x: M,
    y: 0.68,
    w: CW * 0.92,
    h: 0.72,
    fontFace: FACE,
    fontSize: 28,
    bold: true,
    color: INK,
    valign: "top",
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: M,
    y: 1.5,
    w: 1.35,
    h: 0.075,
    fill: { color: PERI_SOFT },
  });

  let y = 1.86;

  if (s.standfirst) {
    slide.addText(s.standfirst, {
      x: M,
      y,
      w: CW * 0.86,
      h: 0.34,
      fontFace: FACE,
      fontSize: 14,
      bold: true,
      color: INK,
    });
    y += 0.52;
  }

  // The numeral ramp steps from deepest to lightest across the rows, the way
  // the Day 1 deck does it. Two rows or five, the ends stay fixed.
  const rows = s.rows ?? [];
  const rowH = rows.length >= 4 ? 0.78 : 0.92;
  const rowGap = 0.16;
  const chipW = 0.72;

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
    slide.addText(r.label, {
      x: M + chipW + 0.42,
      y: ry + (r.body ? 0.11 : 0),
      w: CW - chipW - 0.85,
      h: r.body ? 0.32 : rowH,
      fontFace: FACE,
      fontSize: 15,
      bold: true,
      color: INK,
      valign: r.body ? "top" : "middle",
    });
    if (r.body) {
      slide.addText(r.body, {
        x: M + chipW + 0.42,
        y: ry + 0.42,
        w: CW - chipW - 0.85,
        h: rowH - 0.5,
        fontFace: FACE,
        fontSize: 12.5,
        color: BODY_INK,
        valign: "top",
      });
    }
  });

  if (s.quote) quoteStrip(slide, s.quote);
  addNotes(slide, s.notes);
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

  addNotes(slide, s.notes);
}

const BUILDERS = {
  title: titleSlide,
  divider: dividerSlide,
  content: contentSlide,
  close: closeSlide,
};

for (const s of spec.slides ?? []) {
  const build = BUILDERS[s.type];
  if (!build) {
    console.error(`Unknown slide type "${s.type}"`);
    process.exit(1);
  }
  build(s);
}

const outDir = path.join(ROOT, "content", "session-notes");
fs.mkdirSync(outDir, { recursive: true });
// <date>_<TYPE>_<cover>_<slug>. The type token was added 2026-08-01, when Drive
// moved to one folder per post: every asset for a briefing now sits together,
// so the filename has to say which asset it is.
const stem = `${fm.date}_SESSION-NOTES_${fm.cover}_${slug}`;
const outPath = path.join(outDir, `${stem}.pptx`);

await pptx.writeFile({ fileName: outPath });

/**
 * The PDF is the clean slide deck and nothing else: one page per slide, no
 * notes. It is what gets shown, so the private layer must not be in it.
 *
 * LibreOffice can append a notes page per slide via ExportNotesPages, and that
 * was the first cut, but it doubles the file and repeats every slide. The
 * speaker notes live in the pptx alone, read from presenter view.
 */
const SOFFICE = [
  "C:/Program Files/LibreOffice/program/soffice.exe",
  "C:/Program Files (x86)/LibreOffice/program/soffice.exe",
  "soffice",
].find((p) => p === "soffice" || fs.existsSync(p));

let pdfMade = false;
if (SOFFICE) {
  try {
    execFileSync(
      SOFFICE,
      [
        "--headless",
        "--convert-to",
        "pdf",
        "--outdir",
        outDir,
        outPath,
      ],
      { stdio: "ignore" }
    );
    pdfMade = fs.existsSync(path.join(outDir, `${stem}.pdf`));
  } catch {
    pdfMade = false;
  }
}

const slides = spec.slides ?? [];
const noteCount = slides.filter((s) => s.notes).length;
console.log(`Wrote content/session-notes/${stem}.pptx`);
if (pdfMade) {
  console.log(`      content/session-notes/${stem}.pdf  (slides only, no notes)`);
} else {
  console.log(`  WARNING: no PDF. LibreOffice missing or the deck is open elsewhere.`);
}
console.log(`  ${slides.length} slides, ${noteCount} with speaker notes`);
if (noteCount < slides.length) {
  console.log(`  WARNING: ${slides.length - noteCount} slide(s) carry no notes`);
}
console.log(`  Now look at it: node scripts/deck-preview.mjs "${outPath}"`);
