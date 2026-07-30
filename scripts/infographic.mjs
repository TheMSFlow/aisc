/**
 * infographic.mjs — social infographic builder (LinkedIn)
 *
 * Usage:
 *   node scripts/infographic.mjs <slug> <spec.json>
 *
 * Renders at 1080x1350, the same frame as the covers, so a briefing's cover
 * and infographic read as siblings in a feed.
 *
 * DESIGN SYSTEM (settled 2026-07-30, extends two existing languages):
 *
 *   - The covers, for frame, chrome placement, Inter, and the per-theme
 *     accent. A Governance infographic uses gradient-100 exactly as its
 *     cover does.
 *   - The article SVGs in public/awakening, for the geometry: a flat msblue
 *     field, quiet lilac marks at low opacity, and the accent reserved for
 *     the few elements that carry meaning. No icons, no decoration.
 *
 * Unlike covers, the ground is drawn here rather than supplied as art, and
 * is the same msblue field for all eight themes. Only the accent changes.
 * A dark ground also stops the scroll in a mostly-white LinkedIn feed.
 *
 * Spec file shape:
 *   {
 *     "type": "list" | "matrix",
 *     "title": "The four questions real governance answers",
 *     "standfirst": "optional one-liner",
 *     "items": [ { "label": "...", "body": "..." } ],   // list: 3-5
 *     "axes": { "x": "...", "y": "..." }                // matrix only
 *   }
 *
 * Output: content/infographics/<date>_<cover>_<slug>.jpg  (gitignored)
 * See agent-guides/blog/SOCIAL_GUIDE.md.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer";
import { COVERS } from "../src/lib/blog/taxonomy.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const WIDTH = 1080;
const HEIGHT = 1350;
const JPEG_QUALITY = 100;

// Brand tokens, globals.css. dark-blue is the ground for every theme:
// DESIGN_GUIDE reserves it for "maximum authority", which is the right
// register here, and it sits deeper than msblue so the accent lifts further.
const DARK_BLUE = "rgb(0, 3, 76)";
const LILAC = "233, 234, 255";

// Studio mark, inlined so an update to the file is picked up on next render.
const MS_ICON = fs.readFileSync(
  path.join(__dirname, "..", "public", "ms-icon.svg"),
  "utf8"
);

// Per-theme accent, matching each cover. The two paper covers carry a real
// gradient; the rest take the brand periwinkle so every theme still has an
// accent without inventing colours that are not in the system.
const ACCENTS = {
  "gradient-100": ["#c2249f", "#8f7dff"], // governance, lifted for a dark ground
  "gradient-200": ["#4a63d8", "#9aa4ff"], // leadership, lifted for a dark ground
  light: ["#6368da", "#9aa4ff"],
  card: ["#6368da", "#9aa4ff"],
};

const [, , slug, specPath] = process.argv;

if (!slug || !specPath) {
  console.error("Usage: node scripts/infographic.mjs <slug> <spec.json>");
  process.exit(1);
}

const mdxPath = path.join(ROOT, "content", "awakening", `${slug}.mdx`);
if (!fs.existsSync(mdxPath)) {
  console.error(`No such briefing: content/awakening/${slug}.mdx`);
  process.exit(1);
}
if (!fs.existsSync(specPath)) {
  console.error(`No such spec: ${specPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(mdxPath, "utf8");
const coverId = raw.match(/^cover: (.+)$/m)?.[1].trim();
const entry = COVERS[coverId];
if (!entry) {
  console.error(`Briefing has no valid cover: "${coverId}"`);
  process.exit(1);
}

const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const [accentA, accentB] = ACCENTS[entry.headline] ?? ACCENTS.light;
const accentGrad = `linear-gradient(135deg, ${accentA}, ${accentB})`;

const pubDate = raw.match(/^date: "(.+)"$/m)?.[1] ?? "undated";
const assetName = `${pubDate}_${coverId}_${slug}.jpg`;

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Quiet dot field, the article-SVG motif. Low opacity so it never competes
// with the content sitting on top of it.
function dotField() {
  const dots = [];
  for (let y = 0; y < 9; y += 1) {
    for (let x = 0; x < 7; x += 1) {
      dots.push(
        `<circle cx="${74 + x * 162}" cy="${104 + y * 158}" r="3.5" fill="rgba(${LILAC},0.05)"/>`
      );
    }
  }
  return `<svg class="motif" width="${WIDTH}" height="${HEIGHT}">${dots.join("")}</svg>`;
}

function listBody() {
  return spec.items
    .map(
      (it, i) => `
      <li>
        <span class="num">${String(i + 1).padStart(2, "0")}</span>
        <div class="itxt">
          <p class="ilabel">${esc(it.label)}</p>
          ${it.body ? `<p class="ibody">${esc(it.body)}</p>` : ""}
        </div>
      </li>`
    )
    .join("");
}

function matrixBody() {
  const cells = spec.items
    .slice(0, 4)
    .map(
      (it) => `
      <div class="cell">
        <p class="clabel">${esc(it.label)}</p>
        ${it.body ? `<p class="cbody">${esc(it.body)}</p>` : ""}
      </div>`
    )
    .join("");
  const axes = spec.axes
    ? `<p class="axis axis-x">${esc(spec.axes.x)}</p>
       <p class="axis axis-y"><span>${esc(spec.axes.y)}</span></p>`
    : "";
  return `<div class="grid">${cells}</div>${axes}`;
}

const isMatrix = spec.type === "matrix";

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { width:${WIDTH}px; height:${HEIGHT}px; overflow:hidden; }
  body {
    background:${DARK_BLUE};
    font-family:Inter, sans-serif;
    position:relative;
    -webkit-font-smoothing:antialiased;
  }
  .motif { position:absolute; inset:0; }
  .frame {
    position:absolute; inset:0;
    padding:74px 96px 78px;
    display:flex; flex-direction:column;
  }

  /* chrome */
  .wordmark {
    display:flex; align-items:center; justify-content:center; gap:18px;
  }
  .wordmark svg { width:38px; height:38px; display:block; }
  .wordmark span {
    font-size:17px; font-weight:600;
    letter-spacing:0.34em; text-transform:uppercase;
    color:rgba(${LILAC},0.62);
    /* optical: the tracking adds trailing space on the last letter */
    margin-right:-0.34em;
  }
  .themelabel {
    margin-top:auto; padding-top:34px;
    text-align:center;
    font-size:20px; font-weight:700;
    letter-spacing:0.28em; text-transform:uppercase;
    background-image:${accentGrad};
    -webkit-background-clip:text; background-clip:text; color:transparent;
    padding-bottom:0.14em;
  }

  /* head */
  .head { margin-top:78px; }
  h1 {
    font-size:${isMatrix ? 60 : 64}px; font-weight:800;
    line-height:1.08; letter-spacing:-0.025em;
    color:#fff;
    max-width:${isMatrix ? 840 : 800}px;
    padding-bottom:0.1em;
  }
  .standfirst {
    margin-top:22px;
    font-size:25px; font-weight:400; line-height:1.45;
    color:rgba(${LILAC},0.60);
    max-width:770px;
  }
  .rule {
    margin-top:40px; height:4px; width:132px;
    background-image:${accentGrad};
  }

  /* list archetype */
  ul { list-style:none; margin-top:46px; }
  li {
    display:flex; gap:34px; align-items:flex-start;
    padding:26px 0;
    border-top:1px solid rgba(${LILAC},0.13);
  }
  li:last-child { border-bottom:1px solid rgba(${LILAC},0.13); }
  .num {
    flex:0 0 auto; width:74px;
    font-size:44px; font-weight:800; line-height:1;
    letter-spacing:-0.03em;
    background-image:${accentGrad};
    -webkit-background-clip:text; background-clip:text; color:transparent;
  }
  .ilabel { font-size:33px; font-weight:700; line-height:1.2; color:#fff; letter-spacing:-0.01em; }
  .ibody  { margin-top:9px; font-size:23px; font-weight:400; line-height:1.42; color:rgba(${LILAC},0.58); }

  /* matrix archetype */
  .grid {
    /* flex:1 so the quadrants stretch to fill the frame. A matrix that
       stops halfway down leaves the same dead band the covers avoid. */
    flex:1;
    margin-top:52px;
    display:grid; grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr; gap:3px;
    background:rgba(${LILAC},0.14);
    border:1px solid rgba(${LILAC},0.14);
  }
  .cell { background:${DARK_BLUE}; padding:40px 36px; display:flex; flex-direction:column; justify-content:center; }
  .clabel { font-size:29px; font-weight:700; color:#fff; line-height:1.2; }
  .cbody  { margin-top:11px; font-size:21px; line-height:1.4; color:rgba(${LILAC},0.58); }
  .axis {
    /* 0.55 not 0.40: at 15px this is normal-size text and needs 4.5:1.
       0.40 measured 3.17:1 and failed. 0.55 gives 5.13:1. */
    font-size:15px; font-weight:600; letter-spacing:0.22em;
    text-transform:uppercase; color:rgba(${LILAC},0.55);
  }
  .axis-x { margin-top:24px; text-align:center; }
  .axis-y { position:absolute; left:34px; top:58%; transform:rotate(-90deg) translateX(-50%); transform-origin:left center; }
</style></head>
<body>
  ${dotField()}
  <div class="frame">
    <div class="wordmark">${MS_ICON}<span>Michael Steve Clarity Studio</span></div>
    <div class="head">
      <h1>${esc(spec.title)}</h1>
      ${spec.standfirst ? `<p class="standfirst">${esc(spec.standfirst)}</p>` : ""}
      <div class="rule"></div>
    </div>
    ${isMatrix ? matrixBody() : `<ul>${listBody()}</ul>`}
    <p class="themelabel">${esc(entry.label)}</p>
  </div>
</body></html>`;

const outDir = path.join(ROOT, "content", "infographics");
fs.mkdirSync(outDir, { recursive: true });
const tmpHtml = path.join(outDir, `.${slug}.html`);
fs.writeFileSync(tmpHtml, html, "utf8");
const outPath = path.join(outDir, assetName);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(tmpHtml).href, { waitUntil: "networkidle0", timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(() => {
    const f = document.querySelector(".frame");
    return f.scrollHeight - f.clientHeight;
  });

  // WCAG AA audit. Text sits on a known flat ground, so every ratio is
  // computable rather than a matter of taste. Gradient-filled text is
  // checked at both stops, since the worst case is whichever is darker.
  const contrast = await page.evaluate(
    ({ bg, stops }) => {
      const lum = ([r, g, b]) => {
        const f = (v) => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const ratio = (c) => {
        const [hi, lo] = [lum(c), lum(bg)].sort((a, b) => b - a);
        return (hi + 0.05) / (lo + 0.05);
      };
      const parse = (s) => {
        const m = s.match(/rgba?\(([^)]+)\)/);
        if (!m) return null;
        const p = m[1].split(",").map((n) => parseFloat(n));
        const a = p.length > 3 ? p[3] : 1;
        if (a === 0) return null; // gradient-filled, handled separately
        return [0, 1, 2].map((i) => a * p[i] + (1 - a) * bg[i]);
      };
      // WCAG large text: >=24px, or >=18.66px when bold.
      const need = (px, w) => (px >= 24 || (w >= 700 && px >= 18.66) ? 3 : 4.5);

      const out = [];
      document.querySelectorAll("h1,p,span,div,li").forEach((el) => {
        if (!el.textContent.trim() || el.children.length) return;
        const cs = getComputedStyle(el);
        const px = parseFloat(cs.fontSize);
        const w = parseInt(cs.fontWeight, 10);
        const cls = el.className || el.tagName.toLowerCase();
        const gradient = cs.backgroundImage.includes("gradient");
        if (gradient) {
          stops.forEach((s) =>
            out.push({ el: cls, px, r: ratio(s), n: need(px, w) })
          );
          return;
        }
        const rgb = parse(cs.color);
        if (rgb) out.push({ el: cls, px, r: ratio(rgb), n: need(px, w) });
      });
      return out.filter((o) => o.r < o.n);
    },
    {
      bg: [0, 3, 76],
      stops: [accentA, accentB].map((h) =>
        [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
      ),
    }
  );
  await page.screenshot({ path: outPath, type: "jpeg", quality: JPEG_QUALITY });
  console.log(`theme:      ${entry.label} (${entry.headline})`);
  console.log(`archetype:  ${spec.type}`);
  console.log(
    overflow > 0
      ? `OVERFLOW:   content exceeds the frame by ${overflow}px. Cut copy.`
      : `fit:        ok, ${Math.abs(overflow)}px of slack`
  );
  if (contrast.length) {
    console.log(`CONTRAST:   ${contrast.length} element(s) below WCAG AA`);
    contrast.forEach((c) =>
      console.log(
        `            .${c.el} @${c.px}px  ${c.r.toFixed(2)}:1  needs ${c.n}:1`
      )
    );
  } else {
    console.log("contrast:   all text passes WCAG AA");
  }
  console.log(`saved:      content/infographics/${assetName}`);
  console.log(`drive:      SOCIAL MEDIA/infographics/${assetName}`);
} finally {
  await browser.close();
  fs.rmSync(tmpHtml, { force: true });
}
