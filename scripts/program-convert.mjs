/**
 * program-convert.mjs — import the AISC program resources as Markdown.
 *
 *   node scripts/program-convert.mjs            import files not yet imported
 *   node scripts/program-convert.mjs --force    re-import everything, DISCARDING edits
 *
 * Reads   website-context/aisc_resources/**     (.docx .pptx .xlsx, gitignored)
 * Writes  program/resources/<folder>/<slug>.md  (gitignored, like its source)
 *         program/resources/<folder>/assets/    images lifted out of the docs
 *         program/resources/MANIFEST.md         source -> Markdown, with checks
 *
 * WHY THIS EXISTS. The program lived in Word, PowerPoint and Excel files that
 * an agent cannot open directly, so every question about a day's content used
 * to mean guessing from the brief. Since 2026-10-08 the Markdown files ARE the
 * reference for program content, and the Office files are the frozen original.
 * So this is an importer, not a sync: it runs once per source file, and after
 * that the Markdown is edited by hand. website-context/ is never touched.
 *
 * There is no pandoc and no python-docx on this machine. The Office formats
 * are zip files of XML, so this reads them with jszip (it ships with
 * pptxgenjs, a direct dependency) and a small XML reader below.
 *
 * AN EXISTING FILE IS NEVER OVERWRITTEN. If the Markdown is already there it
 * is kept, edited or not, and only new source files are imported. --force is
 * the one way to re-import, and it throws away every edit made since. The
 * hashes in .convert-state.json let the manifest say which files have been
 * edited since import. Nothing is ever deleted: a file whose source has gone
 * is listed as having no source and left alone.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import JSZip from "jszip";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "website-context", "aisc_resources");
const OUT = path.join(ROOT, "program", "resources");
const STATE = path.join(OUT, ".convert-state.json");
const FORCE = process.argv.includes("--force");

const posix = (p) => p.split(path.sep).join("/");
const sha = (buf) => crypto.createHash("sha256").update(buf).digest("hex");
const alnum = (s) => (s.match(/[\p{L}\p{N}]/gu) || []).length;

const slug = (name) =>
  name
    .replace(/^AISC_\s*/i, "")
    .normalize("NFKD")
    .replace(/&/g, " and ")
    .replace(/\bday(\d)/gi, "day-$1")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

/* ------------------------------------------------------------------ XML -- */

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) =>
    e[0] === "#"
      ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : +e.slice(1))
      : (ENT[e] ?? m)
  );

function parseXml(src) {
  const root = { tag: "#root", attrs: {}, kids: [] };
  const stack = [root];
  const re = /<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<(\/?)([^\s>\/]+)([^>]*?)(\/?)>|([^<]+)/g;
  let m;
  while ((m = re.exec(src))) {
    if (m[5] !== undefined) {
      stack.at(-1).kids.push({ text: decode(m[5]), kids: [] });
    } else if (!m[2]) {
      continue;
    } else if (m[1]) {
      stack.pop();
    } else {
      const attrs = {};
      for (const a of m[3].matchAll(/([^\s=]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
        attrs[a[1]] = decode(a[2] ?? a[3]);
      }
      const node = { tag: m[2], attrs, kids: [] };
      stack.at(-1).kids.push(node);
      if (!m[4]) stack.push(node);
    }
  }
  return root;
}

const kid = (n, tag) => n?.kids.find((k) => k.tag === tag);
const kids = (n, tag) => (n ? n.kids.filter((k) => k.tag === tag) : []);
const text = (n) => n.kids.map((k) => k.text ?? "").join("");

// Word wraps anything newer than 2007 in AlternateContent with a legacy
// Fallback twin. Reading both would print every text box twice.
function* walk(n) {
  for (const k of n.kids) {
    if (!k.tag || k.tag === "mc:Fallback") continue;
    yield k;
    yield* walk(k);
  }
}
const deep = (n, tag) => [...walk(n)].filter((k) => k.tag === tag);

const readXml = async (zip, name) => {
  const f = zip.file(name);
  return f ? parseXml(await f.async("string")) : null;
};

async function relsOf(zip, name) {
  const x = await readXml(zip, name);
  const out = {};
  if (x) for (const r of deep(x, "Relationship")) out[r.attrs.Id] = r.attrs.Target;
  return out;
}

/* ------------------------------------------------------------- Markdown -- */

const cellEsc = (s) => s.replace(/\|/g, "\\|").replace(/\s*\n\s*/g, "<br>");

function gfm(rows) {
  const width = Math.max(...rows.map((r) => r.length));
  const line = (r) => "| " + Array.from({ length: width }, (_, i) => r[i] ?? "").join(" | ") + " |";
  return [line(rows[0]), line(Array(width).fill("---")), ...rows.slice(1).map(line)].join("\n");
}

const quote = (blocks) =>
  blocks
    .map((b) => b.split("\n").map((l) => (l ? "> " + l : ">")).join("\n"))
    .join("\n>\n");

// Merge neighbouring runs that share formatting, then wrap each in markers,
// keeping whitespace outside the markers so `** word**` never happens.
function emphasise(segs) {
  const merged = [];
  for (const s of segs) {
    if (!s.t) continue;
    const last = merged.at(-1);
    const plain = !s.t.trim();
    if (last && s.t !== "\n" && last.t !== "\n" && (plain || (last.b === s.b && last.i === s.i))) last.t += s.t;
    else merged.push({ ...s });
  }
  return merged
    .map((s) => {
      const mark = s.b && s.i ? "***" : s.b ? "**" : s.i ? "*" : "";
      if (!mark || !s.t.trim()) return s.t;
      const [, lead, core, trail] = s.t.match(/^(\s*)([\s\S]*?)(\s*)$/);
      return lead + mark + core + mark + trail;
    })
    .join("");
}

/* ----------------------------------------------------------------- DOCX -- */

const on = (rPr, tag) => {
  const n = kid(rPr, tag);
  return !!n && !["0", "false"].includes(n.attrs["w:val"]);
};

const HEADING = { Title: 1, Heading1: 2, Heading2: 3, Heading3: 4, Heading4: 5, Subtitle: 0 };
const INLINE_WRAPPERS = ["w:hyperlink", "w:ins", "w:smartTag", "w:sdt", "w:sdtContent", "w:fldSimple"];

async function numbering(zip) {
  const x = await readXml(zip, "word/numbering.xml");
  const fmt = {};
  if (!x) return fmt;
  const abs = {};
  for (const a of deep(x, "w:abstractNum")) {
    abs[a.attrs["w:abstractNumId"]] = Object.fromEntries(
      kids(a, "w:lvl").map((l) => [l.attrs["w:ilvl"], kid(l, "w:numFmt")?.attrs["w:val"] ?? "bullet"])
    );
  }
  for (const n of kids(kid(x, "w:numbering"), "w:num")) {
    fmt[n.attrs["w:numId"]] = abs[kid(n, "w:abstractNumId")?.attrs["w:val"]] ?? {};
  }
  return fmt;
}

function docxRenderer(ctx) {
  const counters = {};

  function drawing(node) {
    const out = [];
    for (const blip of deep(node, "a:blip")) {
      const target = ctx.rels[blip.attrs["r:embed"]];
      if (!target) continue;
      const n = (ctx.images.findIndex((i) => i.target === target) + 1) || ctx.images.push({ target });
      const file = `${ctx.slug}-image-${n}${path.extname(target)}`;
      ctx.images[n - 1].file = file;
      out.push(`![${ctx.slug} image ${n}](assets/${file})`);
    }
    for (const box of deep(node, "w:txbxContent")) {
      const inner = blocks(box.kids);
      if (inner.length) out.push(quote(inner));
    }
    return out;
  }

  // -> { segs, extras }: the paragraph's own text, plus anything anchored to
  // it (pictures, text boxes) that has to become a block of its own.
  function inline(p) {
    const segs = [];
    const extras = [];
    const run = (r) => {
      const rPr = kid(r, "w:rPr");
      const fmt = { b: !!rPr && on(rPr, "w:b"), i: !!rPr && on(rPr, "w:i") };
      const sz = +(kid(rPr, "w:sz")?.attrs["w:val"] ?? 0);
      for (const k of r.kids) {
        if (k.tag === "w:t") segs.push({ t: text(k), ...fmt, sz });
        else if (k.tag === "w:br" || k.tag === "w:cr") segs.push({ t: "\n" });
        else if (k.tag === "w:tab") segs.push({ t: " " });
        else if (k.tag === "w:noBreakHyphen") segs.push({ t: "-", ...fmt });
        else if (k.tag === "w:drawing" || k.tag === "mc:AlternateContent") extras.push(...drawing(k));
      }
    };
    const visit = (node) => {
      for (const k of node.kids) {
        if (k.tag === "w:r") run(k);
        else if (INLINE_WRAPPERS.includes(k.tag)) visit(k);
      }
    };
    visit(p);
    return { segs, extras };
  }

  function para(p) {
    const pPr = kid(p, "w:pPr");
    const style = kid(pPr, "w:pStyle")?.attrs["w:val"];
    const numPr = kid(pPr, "w:numPr");
    const { segs, extras } = inline(p);
    const plain = segs.map((s) => s.t).join("").replace(/\s+/g, " ").trim();
    let item = null;

    if (!plain) {
      item = null;
    } else if (style in HEADING) {
      const first = style === "Title" && !ctx.titled;
      if (style === "Title") ctx.titled = true;
      // A doc has one title. A second Title-styled line is its subtitle.
      item =
        style === "Title" && !first
          ? { type: "p", text: `**${plain}**` }
          : HEADING[style]
            ? { type: "h", text: "#".repeat(HEADING[style]) + " " + plain }
            : { type: "p", text: `*${plain}*` };
    } else if (numPr) {
      const id = kid(numPr, "w:numId")?.attrs["w:val"];
      const lvl = +(kid(numPr, "w:ilvl")?.attrs["w:val"] ?? 0);
      const ordered = (ctx.lists[id]?.[lvl] ?? "bullet") !== "bullet";
      const c = (counters[id] ??= []);
      c.length = lvl + 1;
      c[lvl] = (c[lvl] ?? 0) + 1;
      item = { type: "li", text: "  ".repeat(lvl) + (ordered ? `${c[lvl]}. ` : "- ") + emphasise(segs).trim() };
    } else {
      const body = segs.filter((s) => s.t.trim());
      const size = Math.max(0, ...body.map((s) => s.sz || 0));
      const bold = body.length > 0 && body.every((s) => s.b);
      item = { type: "p", text: emphasise(segs).trim(), plain, size, bold };
    }
    return { item, extras };
  }

  function cell(tc) {
    const parts = [];
    for (const k of tc.kids) {
      if (k.tag === "w:p") {
        const { item, extras } = para(k);
        if (item) parts.push(item.type === "h" ? `**${item.text.replace(/^#+ /, "")}**` : item.text.trim());
        // A text box anchored in a cell (an axis label, say) arrives quoted.
        parts.push(...extras.map((e) => e.replace(/^>\s?/gm, "").trim()));
      } else if (k.tag === "w:tbl") {
        for (const tr of kids(k, "w:tr")) {
          parts.push(kids(tr, "w:tc").map(cell).filter(Boolean).join(" · "));
        }
      }
    }
    return cellEsc(parts.filter(Boolean).join("\n"));
  }

  function table(tbl) {
    ctx.tables++;
    const rows = kids(tbl, "w:tr").map((tr) => kids(tr, "w:tc"));
    const span = (tc) => +(kid(kid(tc, "w:tcPr"), "w:gridSpan")?.attrs["w:val"] ?? 1);
    const width = Math.max(0, ...rows.map((r) => r.reduce((n, tc) => n + span(tc), 0)));
    if (!width) return [];

    // One column is never data. Google Docs uses it to draw a shaded box, so
    // it becomes a blockquote and keeps its inner structure.
    if (width === 1) {
      const inner = rows.flatMap((r) => blocks(r[0].kids));
      return inner.length ? [quote(inner)] : [];
    }
    const grid = rows.map((r) => r.flatMap((tc) => [cell(tc), ...Array(span(tc) - 1).fill("")]));
    return [gfm(grid)];
  }

  function blocks(nodes) {
    const out = [];
    let list = null;
    const flush = () => {
      if (list) out.push(list.join("\n"));
      list = null;
    };
    for (const n of nodes) {
      if (n.tag === "w:p") {
        const { item, extras } = para(n);
        if (item?.type === "li") (list ??= []).push(item.text);
        else if (item) {
          flush();
          out.push(item.text);
          if (item.type === "h") ctx.headings++;
          else ctx.paras.push({ at: out.length - 1, out, ...item });
        }
        if (extras.length) {
          flush();
          out.push(...extras);
        }
      } else if (n.tag === "w:tbl") {
        flush();
        out.push(...table(n));
      } else if (n.tag === "w:sdt") {
        flush();
        out.push(...blocks(kid(n, "w:sdtContent")?.kids ?? []));
      }
    }
    flush();
    return out;
  }

  return { blocks };
}

async function docx(zip, ctx) {
  const doc = await readXml(zip, "word/document.xml");
  ctx.rels = await relsOf(zip, "word/_rels/document.xml.rels");
  ctx.lists = await numbering(zip);
  Object.assign(ctx, { images: [], paras: [], tables: 0, headings: 0, titled: false });

  const body = deep(doc, "w:body")[0];
  const out = docxRenderer(ctx).blocks(body.kids);

  // Some docs never use heading styles: a section head is just a short bold
  // line set larger than the body. Promote those, top level only, and only
  // where real headings are missing, so styled docs are left exactly as built.
  if (ctx.headings < 3) {
    const sizes = {};
    for (const p of ctx.paras) if (p.size) sizes[p.size] = (sizes[p.size] ?? 0) + p.plain.length;
    const bodySize = +(Object.entries(sizes).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0);
    let promoted = 0;
    for (const p of ctx.paras) {
      if (p.out !== out || !p.bold || p.size <= bodySize || p.plain.length > 90) continue;
      out[p.at] = "## " + p.plain;
      promoted++;
    }
    if (promoted) ctx.notes.push(`${promoted} headings inferred from bold type`);
  }

  for (const img of ctx.images) {
    img.data = await zip.file("word/" + img.target.replace(/^\//, "")).async("nodebuffer");
  }

  // Page furniture, read once and reported in the header, not in the body.
  const furniture = new Set();
  for (const name of Object.keys(zip.files).filter((n) => /^word\/(header|footer)\d*\.xml$/.test(n))) {
    const x = await readXml(zip, name);
    const t = deep(x, "w:p").map((p) => deep(p, "w:t").map(text).join("")).join(" ").replace(/\s+/g, " ").trim();
    if (t) furniture.add(t);
  }

  ctx.sourceChars = alnum(deep(body, "w:t").map(text).join(""));
  ctx.notes.push(`${ctx.tables} tables`, ...(ctx.images.length ? [`${ctx.images.length} images`] : []));
  return { blocks: out, furniture: [...furniture] };
}

/* ----------------------------------------------------------------- PPTX -- */

function slideShapes(tree, acc = []) {
  for (const k of tree.kids) {
    if (k.tag === "p:grpSp") slideShapes(k, acc);
    else if (k.tag === "p:sp" || k.tag === "p:graphicFrame" || k.tag === "p:pic") {
      const off = deep(k, "a:off")[0]?.attrs ?? {};
      const ext = deep(k, "a:ext")[0]?.attrs ?? {};
      const shape = { x: +off.x || 0, y: +off.y || 0, w: +ext.cx || 0, h: +ext.cy || 0, paras: [] };
      shape.ph = deep(k, "p:ph")[0]?.attrs.type ?? null;
      if (k.tag === "p:pic") shape.pic = deep(k, "p:cNvPr")[0]?.attrs.descr || "picture";
      const tbl = deep(k, "a:tbl")[0];
      if (tbl) {
        shape.table = kids(tbl, "a:tr").map((tr) =>
          kids(tr, "a:tc").map((tc) => cellEsc(deep(tc, "a:p").map(slidePara).map((p) => p.text).filter(Boolean).join("\n")))
        );
      } else {
        shape.paras = deep(k, "a:p").map(slidePara).filter((p) => p.text.trim());
      }
      if (shape.paras.length || shape.table || shape.pic) acc.push(shape);
    }
  }
  return acc;
}

// Shapes are stored in stacking order, which says nothing about how a slide is
// read. Recursive XY-cut: split into horizontal bands where there is clear air
// between them, then split each band into columns, and so on. A row of three
// cards then reads card by card instead of interleaving their lines.
function readingOrder(shapes, tryRows = true, stuck = false) {
  if (shapes.length < 2) return shapes;
  const [pos, len] = tryRows ? ["y", "h"] : ["x", "w"];
  const sorted = [...shapes].sort((a, b) => a[pos] - b[pos]);
  const groups = [];
  let end = -Infinity;
  for (const s of sorted) {
    if (s[pos] >= end) groups.push([]);
    groups.at(-1).push(s);
    end = Math.max(end, s[pos] + s[len]);
  }
  if (groups.length > 1) return tryRows ? gridRuns(groups) : groups.flatMap((g) => readingOrder(g, true));
  if (stuck) return [...shapes].sort((a, b) => a.y - b.y || a.x - b.x);
  return readingOrder(shapes, !tryRows, true);
}

// Two or more stacked bands that share the same columns are a table drawn out
// of loose text boxes (a comparison, a schedule). Keep them as a table: it is
// the one rendering that is right whether the slide reads by row or by column.
function gridRuns(bands) {
  const overlap = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w;
  const cells = (band) => {
    const row = [...band].sort((a, b) => a.x - b.x);
    const clean = row.length > 1 && row.every((s, i) => s.paras.length && (!i || s.x >= row[i - 1].x + row[i - 1].w));
    return clean ? row : null;
  };
  const out = [];
  let run = [];
  const flush = () => {
    if (run.length > 1) out.push({ grid: run });
    else out.push(...run.flat());
    run = [];
  };
  for (const band of bands) {
    const row = cells(band);
    const fits = row && run.length && row.length === run[0].length && row.every((s, i) => overlap(s, run.at(-1)[i]));
    if (row && (fits || !run.length)) run.push(row);
    else {
      flush();
      if (row) run.push(row);
      else out.push(...readingOrder(band, false));
    }
  }
  flush();
  return out;
}

function slidePara(p) {
  const segs = [];
  for (const k of p.kids) {
    if (k.tag === "a:r" || k.tag === "a:fld") {
      const rPr = kid(k, "a:rPr")?.attrs ?? {};
      segs.push({ t: kids(k, "a:t").map(text).join(""), b: rPr.b === "1", i: rPr.i === "1", sz: +rPr.sz || 0 });
    } else if (k.tag === "a:br") segs.push({ t: "\n" });
  }
  const pPr = kid(p, "a:pPr");
  return {
    text: segs.map((s) => s.t).join(""),
    md: emphasise(segs).trim(),
    lvl: +(pPr?.attrs.lvl ?? 0),
    bullet: !!pPr && (!!kid(pPr, "a:buChar") || !!kid(pPr, "a:buAutoNum")),
    sz: Math.max(0, ...segs.map((s) => s.sz || 0)),
    bold: segs.filter((s) => s.t.trim()).every((s) => s.b),
  };
}

async function pptx(zip, ctx) {
  const pres = await readXml(zip, "ppt/presentation.xml");
  const rels = await relsOf(zip, "ppt/_rels/presentation.xml.rels");
  const order = deep(pres, "p:sldId").map((s) => "ppt/" + rels[s.attrs["r:id"]]);
  const height = +(deep(pres, "p:sldSz")[0]?.attrs.cy ?? 6858000);
  const out = [];
  let chars = 0;

  for (const [i, name] of order.entries()) {
    const slide = await readXml(zip, name);
    const shapes = slideShapes(deep(slide, "p:spTree")[0]);
    chars += alnum(deep(slide, "a:t").map(text).join(""));


    // The title is the largest real phrase in the top third. Largest overall
    // is wrong: card numerals and icons are set bigger than any heading.
    const texts = shapes.filter((s) => s.paras.length);
    const pick = (pool, min) => {
      const c = pool.flatMap((s) => s.paras.map((p) => ({ s, p }))).filter(({ p }) => alnum(p.text) >= min);
      return c.sort((a, b) => b.p.sz - a.p.sz)[0];
    };
    const found =
      texts.filter((s) => s.ph === "title" || s.ph === "ctrTitle").map((s) => ({ s, p: s.paras[0] }))[0] ??
      pick(texts.filter((s) => s.y < height * 0.33), 6) ??
      pick(texts, 4);
    const titleShape = found?.s;
    const title = found?.p.text.replace(/\s+/g, " ").trim();

    out.push(`## Slide ${i + 1}${title ? ": " + title : ""}`);
    const cellMd = (s) => cellEsc(s.paras.map((p) => p.md).join("\n"));
    for (const s of readingOrder(shapes.filter((s) => s !== titleShape || s.paras.length > 1))) {
      if (s.grid) out.push(gfm(s.grid.map((row) => row.map(cellMd))));
      else if (s.pic) out.push(`*[${s.pic}]*`);
      else if (s.table) out.push(gfm(s.table));
      else {
        const lines = s.paras
          .filter((p) => !(s === titleShape && p.text.replace(/\s+/g, " ").trim() === title))
          .map((p) => (p.bullet ? "  ".repeat(p.lvl) + "- " + p.md : p.md).replace(/\n/g, "  \n"));
        if (!lines.length) continue;
        out.push(lines.every((l) => /^\s*- /.test(l)) ? lines.join("\n") : lines.join("\n\n"));
      }
    }

    const noteRel = Object.values(await relsOf(zip, name.replace("slides/", "slides/_rels/") + ".rels")).find((t) => /notesSlide/.test(t));
    if (noteRel) {
      const notes = await readXml(zip, path.posix.normalize(path.posix.join("ppt/slides", noteRel)));
      const body = notes && deep(notes, "p:sp").find((sp) => deep(sp, "p:ph")[0]?.attrs.type === "body");
      const t = body ? deep(body, "a:p").map(slidePara).map((p) => p.md).filter(Boolean) : [];
      if (t.length) {
        chars += alnum(t.join(""));
        out.push("**Speaker notes**", quote([t.join("\n\n")]));
        ctx.speakerNotes = (ctx.speakerNotes ?? 0) + 1;
      }
    }
  }
  ctx.sourceChars = chars;
  ctx.notes.push(`${order.length} slides`, `${ctx.speakerNotes ?? 0} with speaker notes`);
  return { blocks: [`# ${ctx.title}`, ...out], furniture: [] };
}

/* ----------------------------------------------------------------- XLSX -- */

const colNum = (ref) => [...ref.replace(/\d+/g, "")].reduce((n, c) => n * 26 + c.charCodeAt(0) - 64, 0);
const colName = (n) => (n > 26 ? colName(Math.floor((n - 1) / 26)) : "") + String.fromCharCode(65 + ((n - 1) % 26));

async function xlsx(zip, ctx) {
  const wb = await readXml(zip, "xl/workbook.xml");
  const rels = await relsOf(zip, "xl/_rels/workbook.xml.rels");
  const sst = await readXml(zip, "xl/sharedStrings.xml");
  const shared = sst ? deep(sst, "si").map((si) => deep(si, "t").map(text).join("")) : [];
  const out = [`# ${ctx.title}`];
  let chars = 0;
  let formulas = 0;

  for (const sh of deep(wb, "sheet")) {
    const sheet = await readXml(zip, "xl/" + rels[sh.attrs["r:id"]].replace(/^\/xl\//, ""));
    const rows = new Map();
    const masters = {};
    for (const c of deep(sheet, "c")) {
      const f = kid(c, "f");
      const v = kid(c, "v");
      let value = v ? text(v) : deep(c, "t").map(text).join("");
      if (c.attrs.t === "s") value = shared[+value] ?? "";
      else if (/^-?\d+\.0$/.test(value)) value = value.slice(0, -2);
      // A shared formula stores its text once, on the first cell of its range.
      // The cells that reuse it carry only the index, so point back at the owner.
      if (f?.attrs.si && text(f)) masters[f.attrs.si] = c.attrs.r;
      const formula = f ? (text(f) ? "=" + text(f) : `(as ${masters[f.attrs.si] ?? "above"}, shifted)`) : "";
      if (!value.trim() && !formula) continue;
      if (formula) formulas++;
      chars += alnum(value);
      const r = +c.attrs.r.replace(/\D/g, "");
      if (!rows.has(r)) rows.set(r, new Map());
      rows.get(r).set(colNum(c.attrs.r), formula ? `\`${formula}\`${value.trim() ? " → " + value : ""}` : value);
    }
    out.push(`## Sheet: ${sh.attrs.name}`);
    if (!rows.size) {
      out.push("*(empty)*");
      continue;
    }
    const cols = [...new Set([...rows.values()].flatMap((r) => [...r.keys()]))].sort((a, b) => a - b);
    const grid = [["Row", ...cols.map(colName)]];
    // Blank input rows differ only by their counter, so twenty of them say
    // nothing the first does not. Fold a run of them into one line.
    const shape = (cells) => cells.map((c) => (/^-?[\d.]+$/.test(c) ? "#" : c)).join("|");
    let fold = null;
    for (const r of [...rows.keys()].sort((a, b) => a - b)) {
      const cells = cols.map((c) => cellEsc(rows.get(r).get(c) ?? ""));
      if (fold && fold.shape === shape(cells) && r === fold.last + 1) {
        fold.last = r;
        fold.row[0] = `${fold.first}–${r}`;
        fold.cells.forEach((c, i) => /^-?[\d.]+$/.test(c) && c !== cells[i] && (fold.row[i + 1] = `${c}…${cells[i]}`));
        continue;
      }
      const row = [String(r), ...cells];
      fold = { shape: shape(cells), first: r, last: r, row, cells };
      grid.push(row);
    }
    out.push(gfm(grid));
  }
  ctx.sourceChars = chars;
  ctx.notes.push(`${deep(wb, "sheet").length} sheets`, `${formulas} formula cells`);
  return { blocks: out, furniture: [] };
}

/* ----------------------------------------------------------------- main -- */

const CONVERT = { ".docx": docx, ".pptx": pptx, ".xlsx": xlsx };

const listFiles = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? listFiles(p) : [p];
  });

const state = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, "utf8")) : {};
const report = { written: [], unchanged: [], skipped: [] };

// The Markdown is the reference once it exists, so an import never replaces it.
function emit(rel, content) {
  const abs = path.join(OUT, rel);
  const next = sha(content);
  if (fs.existsSync(abs) && !FORCE) {
    const cur = sha(fs.readFileSync(abs));
    if (cur === next) return report.unchanged.push(rel), (state[rel] = next), "as imported";
    return report.skipped.push(rel), cur === state[rel] ? "kept (source changed since import)" : "kept (edited since import)";
  }
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
  state[rel] = next;
  report.written.push(rel);
  return "written";
}

if (!fs.existsSync(SRC)) {
  console.error(`Source folder not found: ${posix(path.relative(ROOT, SRC))}`);
  process.exit(1);
}

const rowsOut = [];
for (const file of listFiles(SRC).sort()) {
  const ext = path.extname(file).toLowerCase();
  const srcRel = posix(path.relative(ROOT, file));
  if (!CONVERT[ext]) {
    rowsOut.push({ srcRel, mirror: "(not converted)", status: "unsupported type", notes: [] });
    continue;
  }
  const folder = slug(path.basename(path.dirname(file)));
  const name = slug(path.basename(file, ext));
  const rel = `${folder}/${name}.md`;
  const buf = fs.readFileSync(file);
  const stat = fs.statSync(file);
  const ctx = { slug: name, title: path.basename(file, ext).replace(/^AISC_\s*/i, "").replace(/_/g, " "), notes: [] };

  const { blocks, furniture } = await CONVERT[ext](await JSZip.loadAsync(buf), ctx);
  const body = blocks.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();

  const head = [
    `<!-- Imported by scripts/program-convert.mjs. This file is now the reference for this resource: edit it here. -->`,
    ``,
    `> **Imported from:** \`${srcRel}\``,
    `> **Original dated:** ${stat.mtime.toISOString().slice(0, 10)} · **SHA-256:** \`${sha(buf).slice(0, 12)}\``,
    ...(furniture.length ? [`> **Page header / footer:** ${furniture.join(" · ")}`] : []),
    ``,
    `---`,
    ``,
  ].join("\n");

  for (const img of ctx.images ?? []) {
    const imgRel = `${folder}/assets/${img.file}`;
    const abs = path.join(OUT, imgRel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    if (!fs.existsSync(abs) || sha(fs.readFileSync(abs)) !== sha(img.data)) fs.writeFileSync(abs, img.data);
  }

  // Letters and digits only, so Markdown punctuation cannot hide a loss. The
  // mirror may run slightly over (list numbers, image labels), never under.
  const got = alnum(body.replace(/<br>/g, " ").replace(/!\[[^\]]*\]\([^)]*\)/g, ""));
  const check = got >= ctx.sourceChars ? "ok" : `SHORT by ${ctx.sourceChars - got} chars`;
  const status = emit(rel, head + body + "\n");
  rowsOut.push({ srcRel, mirror: rel, status, notes: ctx.notes, check, size: buf.length, mtime: stat.mtime, hash: sha(buf).slice(0, 12) });
  console.log(`${status.padEnd(22)} ${rel}  [${check}]`);
}

const mirrored = new Set(rowsOut.map((r) => r.mirror));
const orphans = listFiles(OUT)
  .map((f) => posix(path.relative(OUT, f)))
  .filter((f) => f.endsWith(".md") && f !== "MANIFEST.md" && !mirrored.has(f));

const manifest = [
  `# Program resources: manifest`,
  ``,
  `Generated by \`scripts/program-convert.mjs\` on ${new Date().toISOString().slice(0, 10)}. Do not edit: it is rewritten on every run.`,
  ``,
  `Every file under \`website-context/aisc_resources/\` and the Markdown imported from it. **Import check** compares the letters and digits in the original against a fresh conversion, so \`ok\` means the importer drops nothing. **State** says whether the Markdown still matches what was imported or has been edited since.`,
  ``,
  gfm([
    ["Original", "Markdown", "Original dated", "Size", "SHA-256", "Contents", "Import check", "State"],
    ...rowsOut.map((r) => [
      `\`${r.srcRel.replace("website-context/aisc_resources/", "")}\``,
      r.mirror.endsWith(".md") ? `[${r.mirror}](${encodeURI(r.mirror)})` : r.mirror,
      r.mtime?.toISOString().slice(0, 10) ?? "",
      r.size ? `${Math.round(r.size / 1024)} KB` : "",
      r.hash ? `\`${r.hash}\`` : "",
      r.notes.join(", "),
      r.check ?? "",
      r.status,
    ]),
  ]),
  ``,
  ...(orphans.length
    ? [`## No original`, ``, `Markdown files with no Office original: written here directly, or the original was renamed or removed. Expected for anything new.`, ``, ...orphans.map((o) => `- \`${o}\``), ``]
    : []),
].join("\n");

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "MANIFEST.md"), manifest);
fs.writeFileSync(STATE, JSON.stringify(state, null, 2) + "\n");

console.log(`\n${report.written.length} imported, ${report.unchanged.length} as imported, ${report.skipped.length} kept`);
if (report.skipped.length) console.log(`Kept as they are (--force re-imports and discards edits):\n  ${report.skipped.join("\n  ")}`);
if (orphans.length) console.log(`No original:\n  ${orphans.join("\n  ")}`);
