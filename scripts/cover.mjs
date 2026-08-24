/**
 * cover.mjs — social video-cover builder
 *
 * Usage:
 *   node scripts/cover.mjs <slug> "Headline" ["Subhead"]
 *
 * Reads the briefing's `cover` from its MDX frontmatter, looks up the
 * background art and headline treatment in src/lib/blog/taxonomy.js, and
 * typesets the headline onto the art at its native 1080x1350.
 *
 * The background art already carries the wordmark, the texture, the motif,
 * and the theme label. This script adds the headline block and nothing else.
 *
 * LAYOUT RULE (reverse-engineered from the eight templates in
 * content/backgrounds/themes.jpg):
 *
 *   1. Type auto-fits. Binary search the largest size where no word
 *      overflows the measure AND the block fits the zone height. Headlines
 *      are meant to be big; a fixed size wastes the frame.
 *   2. The block is vertically CENTRED in the zone, never top-anchored.
 *      This is why the 6-line template starts high and the 2-line template
 *      starts low: both stay balanced.
 *   3. A short headline does not stretch to fill. It centres at its
 *      width-limited maximum and the background motif carries the rest.
 *
 * Output: content/covers/<slug>.png  (gitignored)
 * See agent-guides/blog/SOCIAL_GUIDE.md for the full spec.
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

// The field the headline may occupy: below the wordmark, above the motif
// and the theme label baked into the art.
const ZONE_TOP = 205;
const ZONE_BOTTOM = 995;
const MARGIN_X = 96;
// Headline measure. Narrower than the frame, but wide enough that ordinary
// word pairs stay on one line: too narrow and every word lands on its own
// row, which reads as ragged rather than stacked.
const MEASURE = 830;

const FONT_MIN = 56;
const FONT_MAX = 156;

// Unitless, so leading scales with the fitted size automatically. Tight
// enough to read as a stacked block, loose enough that a descender on one
// line never crowds the cap height of the next.
const LINE_HEIGHT = 1.08;

// Brand tokens are defined at 90deg in globals.css. On a cover the headline
// is a tall narrow stack, so the fill runs on the diagonal instead: that is
// what makes the colour progress down the block the way the templates do.
const GRADIENTS = {
  "gradient-100": "linear-gradient(135deg, #860471, #6368da)",
  "gradient-200": "linear-gradient(135deg, #041986, #6368da)",
};

const [, , slug, headline, subhead = ""] = process.argv;

if (!slug || !headline) {
  console.error('Usage: node scripts/cover.mjs <slug> "Headline" ["Subhead"]');
  process.exit(1);
}

const mdxPath = path.join(ROOT, "content", "awakening", `${slug}.mdx`);
if (!fs.existsSync(mdxPath)) {
  console.error(`No such briefing: content/awakening/${slug}.mdx`);
  process.exit(1);
}

const raw = fs.readFileSync(mdxPath, "utf8");
const coverId = raw.match(/^cover: (.+)$/m)?.[1].trim();
const entry = COVERS[coverId];
if (!entry) {
  console.error(`Briefing has no valid cover: "${coverId}"`);
  process.exit(1);
}

const bgPath = path.join(ROOT, "content", "backgrounds", entry.background);
if (!fs.existsSync(bgPath)) {
  console.error(`Missing background art: content/backgrounds/${entry.background}`);
  console.error("That folder is gitignored. Restore it from your backup.");
  process.exit(1);
}

const isCard = entry.headline === "card";
const isLight = entry.headline === "light";

let headlineCss;
if (isLight || isCard) {
  headlineCss = "color: #ffffff;";
} else {
  headlineCss = `
    background-image: ${GRADIENTS[entry.headline]};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  `;
}

/**
 * THE CARD FAMILY SITS INSIDE THE FOLDER THAT IS ALREADY IN THE ART.
 *
 * Fixed 2026-08-13. The script used to draw its own translucent panel sized
 * to the text, on top of art that already contains a folder graphic. Two
 * overlapping rounded rectangles, and on any headline over two lines the
 * drawn panel grew past the folder, so the headline read as sitting outside
 * the thing it is supposed to be written on. It also broke the standing rule
 * that the art is a finished frame and the script adds the headline block
 * and nothing else.
 *
 * These bounds are measured off chiefs-briefing.jpg. The folder body runs
 * x 180 to 905, y 383 to 968, with a tab notch across the upper left that
 * the text has to clear. All three card backgrounds share the geometry.
 */
const CARD_PAD_X = 54;
const CARD_PAD_Y = 50;
const CARD_LEFT = 180 + CARD_PAD_X;
const CARD_ZONE_TOP = 470;
const CARD_ZONE_BOTTOM = 968 - CARD_PAD_Y;
const CARD_MEASURE = 905 - 180 - CARD_PAD_X * 2;

const measure = isCard ? CARD_MEASURE : MEASURE;
const zoneTop = isCard ? CARD_ZONE_TOP : ZONE_TOP;
const zoneBottom = isCard ? CARD_ZONE_BOTTOM : ZONE_BOTTOM;
const zoneHeight = zoneBottom - zoneTop;

const subheadColor = isCard || isLight ? "rgba(255,255,255,0.78)" : "#2a2f52";

// Asset name: date first so a plain name sort in Drive reproduces production
// order (oldest published first), cover id second so themes group, slug last
// so the piece is identifiable and searchable.
// JPEG, not PNG. These are photographic-looking posters on textured grounds,
// where PNG lands around 600KB and a quality-92 JPEG lands near a tenth of
// that with no visible loss. Smaller files upload and sync far faster.
const pubDate = raw.match(/^date: "(.+)"$/m)?.[1] ?? "undated";
// <date>_<TYPE>_<cover>_<slug>. The type token was added 2026-08-01, when Drive
// moved to one folder per post: every asset for a briefing now sits together,
// so the filename has to say which asset it is.
const assetName = `${pubDate}_COVER_${coverId}_${slug}.jpg`;
const JPEG_QUALITY = 100;

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; }
  body {
    background-image: url("${pathToFileURL(bgPath).href}");
    background-size: ${WIDTH}px ${HEIGHT}px;
    background-repeat: no-repeat;
    font-family: Inter, sans-serif;
    position: relative;
  }
  #stage {
    position: absolute;
    left: ${isCard ? CARD_LEFT : MARGIN_X}px;
    top: ${zoneTop}px;
    width: ${measure}px;
    height: ${zoneHeight}px;
    display: flex;
    flex-direction: column;
    justify-content: center;   /* rule 2: centre in the zone */
  }
  /* No panel is drawn. The folder in the art is the panel. */
  #card {}
  h1 {
    width: ${measure}px;
    font-weight: 800;
    line-height: ${LINE_HEIGHT};
    letter-spacing: -0.03em;
    /* background-clip:text paints only inside the element box. A sub-1
       line-height pushes descenders past that box, where they get no
       background and render invisible. This padding keeps the box under
       them. Harmless for the solid-colour families. */
    padding-bottom: 0.13em;
    text-wrap: balance;
    ${headlineCss}
  }
  #sub {
    width: ${measure}px;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: 0.005em;
    color: ${subheadColor};
  }
</style></head>
<body>
  <div id="stage"><div id="card">
    <h1 id="h">${esc(headline)}</h1>
    ${subhead ? `<div id="sub">${esc(subhead)}</div>` : ""}
  </div></div>
</body></html>`;

// One folder per briefing, named exactly as its Drive folder, so the whole
// set for a post is built in one sitting and moved across in one drag.
// Changed 2026-08-13 from the old per-asset-type staging dirs.
const briefingDir = `${pubDate}_${coverId}_${slug}`;
const tmpDir = path.join(ROOT, "content", "social", briefingDir);
fs.mkdirSync(tmpDir, { recursive: true });
const tmpHtml = path.join(tmpDir, `.${slug}.html`);
fs.writeFileSync(tmpHtml, html, "utf8");

const outPath = path.join(tmpDir, assetName);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(tmpHtml).href, { waitUntil: "networkidle0", timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);

  // Rule 1: binary search the largest type that fits both measure and zone.
  const fitted = await page.evaluate(
    ({ zoneHeight, fontMin, fontMax, lineHeight, hasSub }) => {
      const h = document.getElementById("h");
      const sub = document.getElementById("sub");
      const card = document.getElementById("card");

      const fits = (size) => {
        h.style.fontSize = size + "px";
        if (hasSub) {
          sub.style.fontSize = Math.max(19, Math.round(size * 0.21)) + "px";
          // The gap deliberately does NOT scale with the headline the way
          // leading does. At 156px a proportional margin threw the subhead
          // far down the frame, and the h1 already carries descender padding
          // above it. Keep it tight and near-constant so the subhead reads
          // as attached to the headline at every fitted size.
          sub.style.marginTop = Math.max(12, Math.round(size * 0.08)) + "px";
        }
        // A word wider than the measure overflows: reject.
        if (h.scrollWidth > h.clientWidth + 1) return false;
        return card.scrollHeight <= zoneHeight;
      };

      let lo = fontMin;
      let hi = fontMax;
      let best = fontMin;
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (fits(mid)) {
          best = mid;
          lo = mid + 1;
        } else {
          hi = mid - 1;
        }
      }
      fits(best);

      /**
       * Measure the real line boxes, not the element box. The h1 is always
       * exactly the measure wide, so scrollWidth tells you nothing about how
       * much of that width the type is actually using. A Range over the text
       * node returns one client rect per rendered line, which is the only way
       * to see that a headline is stacking narrow and leaving the right side
       * of the frame empty.
       */
      const range = document.createRange();
      range.selectNodeContents(h);
      const lineWidths = Array.from(range.getClientRects())
        .map((r) => Math.round(r.width))
        .filter((w) => w > 1);

      return {
        fontSize: best,
        lines: Math.round(h.scrollHeight / (best * lineHeight)),
        blockHeight: card.scrollHeight,
        lineWidths,
        widest: lineWidths.length ? Math.max(...lineWidths) : 0,
      };
    },
    {
      zoneHeight,
      fontMin: FONT_MIN,
      fontMax: FONT_MAX,
      lineHeight: LINE_HEIGHT,
      hasSub: Boolean(subhead),
    }
  );

  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: outPath, type: "jpeg", quality: JPEG_QUALITY });

  console.log(`cover:      ${entry.label} (${entry.headline})`);
  console.log(`background: ${entry.background}`);
  console.log(
    `type:       ${fitted.fontSize}px, ~${fitted.lines} lines, block ${fitted.blockHeight}px of ${zoneHeight}px zone`
  );
  const fill = Math.round((fitted.widest / measure) * 100);
  console.log(
    `width:      widest line ${fitted.widest}px of ${measure}px measure (${fill}%)  [${fitted.lineWidths.join(", ")}]`
  );
  if (fill < 85) {
    console.log(
      `  WARNING: the headline is stacking narrow and leaving the right side empty.`
    );
    console.log(
      `  Fix it in the words, not the type size: this is already the largest size that fits.`
    );
    console.log(
      `  Longer words, or fewer of them, pack wider at the same height.`
    );
  }
  /**
   * The flat set at content/social/_covers/ holds a copy of every cover, for
   * the reader-path work in TASKS.md #16 that will want them together.
   *
   * This used to be a manual step and it was missed twice in two days (row 15
   * on 2026-08-14, and the four headline rebuilds the same day), while
   * SOCIAL_GUIDE.md claimed every build dropped a copy here. A step that is
   * documented as automatic has to actually be automatic.
   */
  const flatDir = path.join(ROOT, "content", "social", "_covers");
  fs.mkdirSync(flatDir, { recursive: true });
  fs.copyFileSync(
    path.join(tmpDir, assetName),
    path.join(flatDir, assetName)
  );

  console.log(`saved:      content/social/${briefingDir}/${assetName}`);
  console.log(`            content/social/_covers/${assetName}`);
  console.log(`drive:      SOCIAL MEDIA/${briefingDir}/${assetName}`);
} finally {
  await browser.close();
  fs.rmSync(tmpHtml, { force: true });
}
