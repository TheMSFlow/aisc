/**
 * deck-preview.mjs — render a session-notes deck to PNGs so it can be judged
 *
 * Usage:
 *   node scripts/deck-preview.mjs <path-to.pptx> [outDir]
 *
 * A deck that has not been looked at has not been checked. This is the same
 * discipline the cover builder uses: render, read the image back, compare
 * against intent, fix, render again.
 *
 * Pipeline: LibreOffice converts the pptx to PDF, then pdf-to-img rasterizes
 * every page. LibreOffice cannot export one PNG per slide directly (the png
 * filter only ever writes the first slide), and its HTML export carries no
 * slide images at all, so the PDF hop is not avoidable.
 *
 * Speaker notes are NOT in these renders. They are private, and the PDF export
 * shows slides only. Verify notes separately, straight out of the pptx.
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pdf } from "pdf-to-img";

const SOFFICE_CANDIDATES = [
  "C:/Program Files/LibreOffice/program/soffice.exe",
  "C:/Program Files (x86)/LibreOffice/program/soffice.exe",
  "soffice",
];

const [, , deckArg, outArg] = process.argv;

if (!deckArg) {
  console.error("Usage: node scripts/deck-preview.mjs <path-to.pptx> [outDir]");
  process.exit(1);
}

const deckPath = path.resolve(deckArg);
if (!fs.existsSync(deckPath)) {
  console.error(`No such deck: ${deckPath}`);
  process.exit(1);
}

const soffice = SOFFICE_CANDIDATES.find(
  (p) => p === "soffice" || fs.existsSync(p)
);
if (!soffice) {
  console.error(
    "LibreOffice not found. Install it (winget install TheDocumentFoundation.LibreOffice)."
  );
  process.exit(1);
}

const outDir = path.resolve(
  outArg ?? path.join(path.dirname(deckPath), "preview")
);
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

execFileSync(
  soffice,
  ["--headless", "--convert-to", "pdf", "--outdir", outDir, deckPath],
  { stdio: "ignore" }
);

const pdfPath = path.join(
  outDir,
  `${path.basename(deckPath, path.extname(deckPath))}.pdf`
);
if (!fs.existsSync(pdfPath)) {
  console.error("LibreOffice produced no PDF. Is the deck open in another app?");
  process.exit(1);
}

const doc = await pdf(pdfPath, { scale: 1.5 });
let n = 0;
for await (const page of doc) {
  n += 1;
  fs.writeFileSync(
    path.join(outDir, `slide-${String(n).padStart(2, "0")}.png`),
    page
  );
}

console.log(`Rendered ${n} slides to ${path.relative(process.cwd(), outDir)}`);
