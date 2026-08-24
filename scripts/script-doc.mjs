/**
 * script-doc.mjs — turn an Instagram script into a .docx for shooting.
 *
 *   node scripts/script-doc.mjs <slug>
 *
 * Reads   content/sources/<slug>/script.md          (tracked, the source)
 * Writes  content/social/<date>_<cover>_<slug>/
 *           <date>_SCRIPT_<cover>_<slug>.docx       (gitignored, ships)
 *
 * The split is deliberate and settled 2026-08-13: sources live in version
 * control so a fresh clone still has them, deliverables live in the briefing
 * folder Michael drags to Drive. Markdown is not a shooting format, and a
 * phone or teleprompter app will not render it, so the docx is what he reads.
 *
 * Route is HTML then LibreOffice, the same converter session-notes.mjs uses
 * for its PDF. There is no pandoc and no python-docx on this machine.
 *
 * TYPE SIZES ARE THE POINT. This is a document that gets read while a camera
 * runs, so spoken copy is set large and everything that is not spoken is set
 * small and grey. If the two ever look alike, the document has failed.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const SOFFICE = [
  "C:/Program Files/LibreOffice/program/soffice.exe",
  "C:/Program Files (x86)/LibreOffice/program/soffice.exe",
  "soffice",
].find((p) => p === "soffice" || fs.existsSync(p));

const [, , slug] = process.argv;
if (!slug) {
  console.error("Usage: node scripts/script-doc.mjs <slug>");
  process.exit(1);
}
if (!SOFFICE) {
  console.error("LibreOffice not found. It is what converts the HTML to docx.");
  process.exit(1);
}

const mdxPath = path.join(ROOT, "content", "awakening", `${slug}.mdx`);
if (!fs.existsSync(mdxPath)) {
  console.error(`No such briefing: content/awakening/${slug}.mdx`);
  process.exit(1);
}
const fm = fs.readFileSync(mdxPath, "utf8");
const pubDate = fm.match(/^date: "?(.+?)"?$/m)?.[1].trim();
const coverId = fm.match(/^cover: (.+)$/m)?.[1].trim();
if (!pubDate || !coverId) {
  console.error(`Briefing is missing date or cover in frontmatter.`);
  process.exit(1);
}

const mdPath = path.join(ROOT, "content", "sources", slug, "script.md");
if (!fs.existsSync(mdPath)) {
  console.error(`No script source: content/sources/${slug}/script.md`);
  process.exit(1);
}

const src = fs.readFileSync(mdPath, "utf8");

// COPY_GUIDE bans the em-dash everywhere. A script is spoken copy, so an
// em-dash here is a beat nobody can perform. Fail rather than ship one.
if (src.includes("\u2014")) {
  console.error("Em-dash found in the script. COPY_GUIDE bans it. Fix it first.");
  process.exit(1);
}

const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Inline markdown: bold and backtick code, which is all these files use. */
const inline = (s) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/`(.+?)`/g, '<span class="mono">$1</span>');

/**
 * A deliberately small markdown subset: h1, h2, hr, unordered lists, and
 * paragraphs. Script files are written to one shape by SCRIPT_GUIDE, so a
 * general parser would be more surface for no gain.
 *
 * The "Production notes" heading flips a mode flag: everything after it is
 * crew copy, never spoken, and gets the small grey treatment.
 */
const lines = src.split(/\r?\n/);
const out = [];
let inList = false;
let notesMode = false;
// Everything above the first beat heading is front matter and delivery
// instruction, none of it spoken. Same treatment as the production notes.
let beforeFirstBeat = true;

const closeList = () => {
  if (inList) {
    out.push("</ul>");
    inList = false;
  }
};

for (const raw of lines) {
  const line = raw.trim();

  if (!line) {
    closeList();
    continue;
  }
  if (line === "---") {
    closeList();
    out.push('<p class="rule"></p>');
    continue;
  }
  if (line.startsWith("# ")) {
    closeList();
    out.push(`<h1>${inline(line.slice(2))}</h1>`);
    continue;
  }
  if (line.startsWith("## ")) {
    closeList();
    const text = line.slice(3);
    beforeFirstBeat = false;
    if (/production notes/i.test(text)) notesMode = true;
    out.push(`<h2>${inline(text)}</h2>`);
    continue;
  }
  const spoken = !notesMode && !beforeFirstBeat;

  if (line.startsWith("- ")) {
    if (!inList) {
      out.push(`<ul class="${spoken ? "say" : "small"}">`);
      inList = true;
    }
    out.push(`<li>${inline(line.slice(2))}</li>`);
    continue;
  }
  closeList();
  out.push(`<p class="${spoken ? "say" : "small"}">${inline(line)}</p>`);
}
closeList();

const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${esc(
  path.basename(mdPath, ".md")
)}</title>
<style>
  body { font-family: Calibri, Arial, sans-serif; color: #1a1a1a; }
  h1 { font-size: 20pt; color: #00034C; margin: 0 0 14pt 0; }
  h2 { font-size: 12pt; color: #6368DA; letter-spacing: 1pt;
       text-transform: uppercase; margin: 20pt 0 6pt 0; }
  p.say, ul.say li { font-size: 15pt; line-height: 1.5; margin: 0 0 10pt 0; }
  p.small, ul.small li { font-size: 10pt; color: #555555; line-height: 1.4;
                         margin: 0 0 6pt 0; }
  p.rule { border-top: 1pt solid #cccccc; margin: 16pt 0; height: 0; }
  .mono { font-family: Consolas, monospace; font-size: 9pt; }
</style></head><body>
${out.join("\n")}
</body></html>`;

const outDir = path.join(
  ROOT,
  "content",
  "social",
  `${pubDate}_${coverId}_${slug}`
);
fs.mkdirSync(outDir, { recursive: true });
const stem = `${pubDate}_SCRIPT_${coverId}_${slug}`;

/**
 * Convert in a scratch dir, not in place. Two reasons, both learned the hard
 * way: soffice refuses a dot-prefixed input file, and it names its output
 * after the input, so converting inside the briefing folder litters it with
 * intermediates that would then ship to Drive.
 */
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "aisc-script-"));
const tmpHtml = path.join(tmpDir, `${stem}.html`);
fs.writeFileSync(tmpHtml, html, "utf8");

const finalPath = path.join(outDir, `${stem}.docx`);
try {
  execFileSync(
    SOFFICE,
    [
      "--headless",
      "--convert-to",
      "docx:MS Word 2007 XML",
      "--outdir",
      tmpDir,
      tmpHtml,
    ],
    { stdio: "ignore" }
  );
  const produced = path.join(tmpDir, `${stem}.docx`);
  if (!fs.existsSync(produced)) {
    console.error("Conversion produced nothing. Is LibreOffice already running?");
    process.exit(1);
  }
  fs.copyFileSync(produced, finalPath);
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

const words = src
  .split(/^## /m)
  .slice(1)
  .filter((s) => !/^production notes/i.test(s))
  .join(" ")
  .replace(/^[^\n]*\n/gm, (m) => (/·/.test(m) ? "" : m))
  .split(/\s+/)
  .filter(Boolean).length;

console.log(`source: ${path.relative(ROOT, mdPath)}`);
console.log(`Wrote   ${path.relative(ROOT, finalPath)}`);
console.log(`  spoken copy set at 15pt, everything else 10pt grey`);
console.log(`  ~${words} words in the spoken beats`);
