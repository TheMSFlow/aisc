#!/usr/bin/env node
/**
 * dashboard.mjs -- the local content control room for The Awakening.
 *
 *     npm run dashboard        then open http://localhost:3010
 *
 * Reads   agent-guides/blog/TOPIC_LEDGER.md      published + pipeline rows
 *         agent-guides/blog/DISTRIBUTION_LOG.md  queue, asset state, cover headlines
 *         content/awakening/*.mdx                frontmatter, body, internal links
 *         content/sources/<slug>/                editorial sources on disk
 *         content/social/<folder>/               built deliverables on disk
 *
 * Writes  agent-guides/blog/DISTRIBUTION_LOG.md  ONLY the platform cells of the
 *                                                queue table, when you tick a post.
 *
 * The markdown stays the source of truth. Nothing is cached: every request
 * re-reads from disk, so the page is current the moment a file changes.
 *
 * LOCAL ONLY. No network calls, no external assets, no CDN, nothing uploaded.
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.DASHBOARD_PORT || 3010);

const LEDGER = path.join(ROOT, "agent-guides/blog/TOPIC_LEDGER.md");
const DISTLOG = path.join(ROOT, "agent-guides/blog/DISTRIBUTION_LOG.md");
const POSTS_DIR = path.join(ROOT, "content/awakening");
const SOURCES_DIR = path.join(ROOT, "content/sources");
const SOCIAL_DIR = path.join(ROOT, "content/social");

const PLATFORMS = [
  { key: "LinkedIn", short: "LI", label: "LinkedIn" },
  { key: "Instagram", short: "IG", label: "Instagram" },
  { key: "YouTube", short: "YT", label: "YouTube" },
];

const THEME_LABEL = {
  "ai-clarity": "AI Clarity",
  "ai-fluency": "AI Fluency",
  "ai-value": "AI Value",
  "ai-governance": "AI Governance",
  "ai-leadership": "AI Leadership",
};

const INDUSTRY_LABEL = {
  business: "Business",
  faith: "Faith",
  government: "Government",
  creators: "Creators",
  healthcare: "Healthcare",
  education: "Education",
  nonprofit: "Nonprofit",
  finance: "Finance",
};

const AUDIENCE_LABEL = {
  chiefs: "Chiefs",
  "leaders-of-leaders": "Leaders of Leaders",
  "emerging-leaders": "Emerging Leaders",
};

/* ------------------------------------------------------------------ utils */

const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "");
const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const today = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

const daysBetween = (a, b) =>
  Math.round((new Date(b) - new Date(a)) / 86400000);

/** Split a markdown table row into trimmed cells. */
const cells = (line) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

const isDivider = (line) => /^\|[\s|:-]+\|$/.test(line.trim());
const unTick = (s) => String(s).replace(/`/g, "").trim();

/** Every markdown table under a `## Heading`, as arrays of raw lines. */
function tablesUnder(md, heading) {
  const lines = md.split("\n");
  const start = lines.findIndex(
    (l) => l.trim().toLowerCase() === `## ${heading}`.toLowerCase(),
  );
  if (start === -1) return [];
  const out = [];
  let buf = [];
  for (let i = start + 1; i < lines.length; i++) {
    const l = lines[i];
    if (/^##\s/.test(l)) break;
    if (l.trim().startsWith("|")) {
      buf.push({ line: l, index: i });
    } else if (buf.length) {
      out.push(buf);
      buf = [];
    }
  }
  if (buf.length) out.push(buf);
  return out.filter((t) => t.length >= 2);
}

/** Turn a raw table into { header, rows: [{cells, index}] }. */
function parseTable(raw) {
  if (!raw || !raw.length) return null;
  const header = cells(raw[0].line);
  const rows = raw
    .slice(1)
    .filter((r) => !isDivider(r.line))
    .map((r) => ({ cells: cells(r.line), index: r.index }));
  return { header, rows, firstIndex: raw[0].index };
}

/* ------------------------------------------------- one-time log migration */

/**
 * The queue table shipped with LinkedIn and Instagram columns only. Tracking
 * YouTube posts needs a column to write into, so add one if it is missing.
 * Idempotent: runs at boot, does nothing once the column exists.
 */
function ensureYouTubeColumn() {
  const md = read(DISTLOG);
  if (!md) return false;
  const raw = tablesUnder(md, "Queue")[0];
  const table = parseTable(raw);
  if (!table || table.header.includes("YouTube")) return false;

  const lines = md.split("\n");
  for (const r of raw) {
    const line = lines[r.index];
    if (isDivider(line)) {
      lines[r.index] = line.replace(/\|\s*$/, "|------|");
    } else if (r.index === raw[0].index) {
      lines[r.index] = line.replace(/\|\s*$/, "| YouTube |");
    } else {
      lines[r.index] = line.replace(/\|\s*$/, "| — |");
    }
  }
  fs.writeFileSync(DISTLOG, lines.join("\n"), "utf8");
  return true;
}

/* ---------------------------------------------------------------- loaders */

function loadPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const { data, content } = matter(read(path.join(POSTS_DIR, file)));
      const links = [
        ...new Set(
          [...content.matchAll(/\]\(\/awakening\/([a-z0-9-]+)\)/g)].map(
            (m) => m[1],
          ),
        ),
      ].filter((s) => s !== slug);
      return {
        slug: data.slug || slug,
        file,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "",
        updated: data.updated || "",
        theme: data.theme || "",
        cover: data.cover || "",
        type: data.type || "",
        audiences: data.audiences || [],
        industries: data.industries || [],
        tags: data.tags || [],
        featured: !!data.featured,
        draft: data.draft !== false,
        words: content.trim().split(/\s+/).filter(Boolean).length,
        outbound: links,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function loadLedger() {
  const md = read(LEDGER);
  const pub = parseTable(tablesUnder(md, "Published")[0]);
  const pipe = parseTable(tablesUnder(md, "Pipeline (reserved)")[0]);
  const map = {};
  const take = (table, status) => {
    if (!table) return;
    for (const r of table.rows) {
      const slug = unTick(r.cells[0]);
      if (!slug) continue;
      map[slug] = {
        query: r.cells[1] || "",
        angle: r.cells[2] || "",
        ledgerStatus: status,
        banked: status === "pipeline" ? r.cells[7] || "" : "",
      };
    }
  };
  take(pub, "published");
  take(pipe, "pipeline");
  return map;
}

function loadQueue() {
  const md = read(DISTLOG);
  const table = parseTable(tablesUnder(md, "Queue")[0]);
  if (!table) return { header: [], rows: [] };
  const col = (name) => table.header.indexOf(name);
  const rows = table.rows
    .filter((r) => /^\d+$/.test(r.cells[0]))
    .map((r) => {
      const get = (name) => {
        const i = col(name);
        return i === -1 ? "—" : r.cells[i] || "—";
      };
      const posts = {};
      for (const p of PLATFORMS) posts[p.key] = get(p.key);
      return {
        n: Number(r.cells[0]),
        slug: unTick(r.cells[col("Briefing")]),
        cover: get("Cover"),
        script: get("Script"),
        notes: get("Session notes"),
        video: get("Video"),
        coverImg: get("Cover img"),
        infographic: get("Infographic"),
        posts,
        lineIndex: r.index,
      };
    });
  return { header: table.header, rows };
}

function loadHeadlines() {
  const md = read(DISTLOG);
  const table = parseTable(tablesUnder(md, "Cover headlines")[0]);
  const map = {};
  if (!table) return map;
  for (const r of table.rows) {
    const slug = unTick(r.cells[1]);
    if (!slug) continue;
    map[slug] = {
      headline: r.cells[2] || "",
      subhead: r.cells[3] && r.cells[3] !== "none" ? r.cells[3] : "",
    };
  }
  return map;
}

/** What actually exists on disk, per slug. */
function loadDisk(posts) {
  const sources = {};
  const social = {};
  if (fs.existsSync(SOURCES_DIR)) {
    for (const dir of fs.readdirSync(SOURCES_DIR)) {
      const p = path.join(SOURCES_DIR, dir);
      if (fs.statSync(p).isDirectory()) sources[dir] = listFiles(p);
    }
  }
  const byFolder = {};
  if (fs.existsSync(SOCIAL_DIR)) {
    for (const dir of fs.readdirSync(SOCIAL_DIR)) {
      const p = path.join(SOCIAL_DIR, dir);
      if (dir.startsWith("_")) continue;
      if (fs.statSync(p).isDirectory()) byFolder[dir] = listFiles(p);
    }
  }
  for (const post of posts) {
    const folder = Object.keys(byFolder).find((d) => d.endsWith(`_${post.slug}`));
    const files = folder ? byFolder[folder] : [];
    social[post.slug] = {
      folder: folder || null,
      files,
      has: {
        cover: files.some((f) => f.includes("_COVER_")),
        script: files.some((f) => f.includes("_SCRIPT_")),
        infographic: files.some((f) => f.includes("_INFOGRAPHIC_")),
        notes: files.some((f) => f.includes("_SESSION-NOTES_")),
      },
    };
  }
  return { sources, social };
}


/* ----------------------------------------------------------------- assets */

/** Real files only: Word and PowerPoint leave ~$ lock files behind. */
function listFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => !f.startsWith("~$") && !f.startsWith("."));
}

function socialFolder(slug) {
  if (!fs.existsSync(SOCIAL_DIR)) return null;
  return (
    fs
      .readdirSync(SOCIAL_DIR)
      .find((d) => !d.startsWith("_") && d.endsWith(`_${slug}`)) || null
  );
}

const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
};

const ASSET_KIND = (name) =>
  name.includes("_COVER_")
    ? "cover"
    : name.includes("_INFOGRAPHIC_")
      ? "infographic"
      : name.includes("_SCRIPT_")
        ? "script"
        : name.includes("_SESSION-NOTES_")
          ? "notes"
          : "other";

/** Resolve a request to a real file inside content/social/<folder>/. */
function resolveAsset(slug, name) {
  const folder = socialFolder(slug);
  if (!folder) return null;
  const safe = path.basename(String(name));
  const full = path.join(SOCIAL_DIR, folder, safe);
  const base = path.join(SOCIAL_DIR, folder);
  if (!full.startsWith(base) || !fs.existsSync(full)) return null;
  return full;
}

/** Everything the drawer needs for one briefing. */
function assetsFor(slug) {
  const folder = socialFolder(slug);
  const files = folder
    ? listFiles(path.join(SOCIAL_DIR, folder)).map((name) => {
        const full = path.join(SOCIAL_DIR, folder, name);
        return {
          name,
          kind: ASSET_KIND(name),
          ext: path.extname(name).toLowerCase(),
          size: fs.statSync(full).size,
        };
      })
    : [];
  const srcDir = path.join(SOURCES_DIR, slug);
  const readJSON = (f) => {
    try {
      const raw = read(path.join(srcDir, f));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  return {
    slug,
    folder,
    files,
    script: read(path.join(srcDir, "script.md")) || null,
    notes: readJSON("session-notes.json"),
    infographic: readJSON("infographic.json"),
  };
}

/* -------------------------------------------------------------- derivation */

const isDone = (cell) => /^✓/.test(String(cell).trim());
const isNA = (cell) => String(cell).trim().toLowerCase() === "n/a";
const isPosted = (cell) => /\d{4}-\d{2}-\d{2}/.test(String(cell));

/**
 * The six production gates, in the order SOCIAL_GUIDE fixes them.
 *
 * Video is deliberately NOT here. It is Michael's recording step, not part of
 * the asset chain the two gates govern, and a briefing can go to LinkedIn on
 * its infographic alone. Treating it as a gate marked every row blocked and
 * disabled every tick, which is the opposite of what this tool is for.
 */
function spine(row, post, headline) {
  return [
    { key: "published", label: "Published", done: post ? !post.draft : false },
    { key: "headline", label: "Headline", done: !!headline },
    { key: "cover", label: "Cover", done: isDone(row.coverImg) },
    { key: "script", label: "Script", done: isDone(row.script) },
    {
      key: "infographic",
      label: "Infographic",
      done: isDone(row.infographic) || isNA(row.infographic),
      na: isNA(row.infographic),
    },
    { key: "notes", label: "Session notes", done: isDone(row.notes) },
  ];
}

/** Mon / Wed / Fri slots between two dates, exclusive of the start. */
function slotsBetween(from, to) {
  const out = [];
  const d = new Date(from);
  const end = new Date(to);
  d.setDate(d.getDate() + 1);
  while (d <= end) {
    const day = d.getDay();
    if (day === 1 || day === 3 || day === 5) {
      out.push(d.toISOString().slice(0, 10));
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

function build() {
  const posts = loadPosts();
  const ledger = loadLedger();
  const queue = loadQueue();
  const headlines = loadHeadlines();
  const disk = loadDisk(posts);
  const now = today();

  const bySlug = Object.fromEntries(posts.map((p) => [p.slug, p]));
  const published = posts.filter((p) => !p.draft);
  const banked = posts.filter((p) => p.draft);

  // inbound link counts, computed from the posts themselves
  const inbound = {};
  for (const p of posts) inbound[p.slug] = [];
  for (const p of posts) {
    for (const t of p.outbound) if (inbound[t]) inbound[t].push(p.slug);
  }

  // staleness: days since a theme / industry / audience last shipped
  const lastOut = { theme: {}, industry: {}, audience: {}, cover: {} };
  for (const p of published) {
    const put = (bucket, key) => {
      if (!key) return;
      if (!lastOut[bucket][key] || lastOut[bucket][key] < p.date)
        lastOut[bucket][key] = p.date;
    };
    put("theme", p.theme);
    put("cover", p.cover);
    for (const i of p.industries) put("industry", i);
    for (const a of p.audiences) put("audience", a);
  }

  // drip health
  const lastPublish = published.length ? published[0].date : null;
  const missed = lastPublish ? slotsBetween(lastPublish, now) : [];

  // per-row assembly
  const rows = queue.rows.map((row) => {
    const post = bySlug[row.slug];
    const head = headlines[row.slug];
    const seg = spine(row, post, head);
    const blockedAt = seg.findIndex((s) => !s.done);
    const postedOn = PLATFORMS.filter((p) => isPosted(row.posts[p.key]));
    return {
      ...row,
      post,
      headline: head || null,
      ledger: ledger[row.slug] || {},
      spine: seg,
      blockedAt,
      complete: blockedAt === -1,
      postedCount: postedOn.length,
      disk: disk.social[row.slug] || { folder: null, files: [], has: {} },
      inbound: (inbound[row.slug] || []).length,
    };
  });

  // drift: what the log claims versus what is on disk, plus rule violations
  const drift = [];
  const flag = (level, title, detail) => drift.push({ level, title, detail });

  for (const r of rows) {
    if (!r.post) {
      flag("high", `Queue row ${r.n} has no briefing`, `No MDX file for \`${r.slug}\`.`);
      continue;
    }
    if (r.post.draft) {
      flag(
        "high",
        `Row ${r.n} is in the queue but still a draft`,
        `\`${r.slug}\` has draft: true. Rule 1: never distribute a draft, the link is a 404.`,
      );
    }
    const pairs = [
      ["cover", r.coverImg, "Cover img"],
      ["script", r.script, "Script"],
      ["infographic", r.infographic, "Infographic"],
      ["notes", r.notes, "Session notes"],
    ];
    for (const [key, cell, label] of pairs) {
      if (isNA(cell)) continue;
      const onDisk = !!r.disk.has[key];
      if (isDone(cell) && !onDisk) {
        flag(
          "high",
          `Row ${r.n}: ${label} marked built, file missing`,
          `The log says \`${cell}\` but no matching file is in ${r.disk.folder ? `content/social/${r.disk.folder}/` : "any content/social folder"}.`,
        );
      } else if (!isDone(cell) && onDisk) {
        flag(
          "low",
          `Row ${r.n}: ${label} exists on disk, log says ${cell}`,
          `The file is built. The log has not caught up.`,
        );
      }
    }
    if (isDone(r.coverImg) && !r.headline) {
      flag(
        "med",
        `Row ${r.n}: cover built, headline not recorded`,
        `Rule 7: the headline lives nowhere but inside the JPEG unless it is written down.`,
      );
    }
    for (const p of PLATFORMS) {
      if (isPosted(r.posts[p.key]) && r.post.draft) {
        flag(
          "high",
          `Row ${r.n} posted to ${p.label} while unpublished`,
          `That link is a 404.`,
        );
      }
    }
  }
  for (const p of published) {
    if (!rows.some((r) => r.slug === p.slug)) {
      flag(
        "med",
        `${p.slug} is published but not in the queue`,
        `Rule 4: a new publish appends a row the same day.`,
      );
    }
    if ((inbound[p.slug] || []).length === 0) {
      flag(
        "med",
        `${p.slug} is an orphan`,
        `Zero inbound links. The orphan rule says every briefing needs at least one.`,
      );
    }
    if (p.outbound.length < 2) {
      flag(
        "low",
        `${p.slug} has ${p.outbound.length} outbound link${p.outbound.length === 1 ? "" : "s"}`,
        `Every briefing should link to 2 or more siblings.`,
      );
    }
  }

  const order = { high: 0, med: 1, low: 2 };
  drift.sort((a, b) => order[a.level] - order[b.level]);

  // what to do next: the first row that is blocked, in queue order
  const blocked = rows.filter((r) => !r.complete);
  const readyToPost = rows.filter(
    (r) => r.complete && r.postedCount < PLATFORMS.length,
  );

  // next to publish: banked drafts scored on how stale their ground is
  const staleScore = (p) => {
    const age = (bucket, key) => {
      const d = lastOut[bucket][key];
      return d ? daysBetween(d, now) : 999;
    };
    const ind = Math.max(...p.industries.map((i) => age("industry", i)), 0);
    return age("theme", p.theme) + ind;
  };
  const nextUp = [...banked]
    .map((p) => ({
      post: p,
      score: staleScore(p),
      inbound: (inbound[p.slug] || []).length,
      themeAge: lastOut.theme[p.theme]
        ? daysBetween(lastOut.theme[p.theme], now)
        : null,
      industryAge: Math.max(
        ...p.industries.map((i) =>
          lastOut.industry[i] ? daysBetween(lastOut.industry[i], now) : 999,
        ),
      ),
    }))
    .sort((a, b) => b.score - a.score);

  return {
    now,
    posts,
    published,
    banked,
    rows,
    inbound,
    lastOut,
    lastPublish,
    missed,
    drift,
    blocked,
    readyToPost,
    nextUp,
    ledger,
    headlines,
    disk,
    queueHeader: queue.header,
  };
}

/* ----------------------------------------------------------- write-back */

/**
 * Write one platform cell of the queue table. Everything else in the file is
 * preserved byte for byte: only the target line is rebuilt.
 */
function writeQueueCell({ n, platform, date, url, clear }) {
  const md = read(DISTLOG);
  const raw = tablesUnder(md, "Queue")[0];
  const table = parseTable(raw);
  if (!table) throw new Error("Queue table not found in DISTRIBUTION_LOG.md");

  const colIndex = table.header.indexOf(platform);
  if (colIndex === -1) throw new Error(`No "${platform}" column in the queue table`);

  const row = table.rows.find((r) => Number(r.cells[0]) === Number(n));
  if (!row) throw new Error(`No queue row ${n}`);

  const value = clear
    ? "—"
    : url
      ? `${date} · ${url}`
      : String(date);

  const next = [...row.cells];
  next[colIndex] = value;

  const lines = md.split("\n");
  lines[row.index] = `| ${next.join(" | ")} |`;
  const out = lines.join("\n");

  // verify before committing: same row count, and the cell reads back
  const check = parseTable(tablesUnder(out, "Queue")[0]);
  if (!check || check.rows.length !== table.rows.length) {
    throw new Error("Refusing to write: the queue table would change shape");
  }
  const checkRow = check.rows.find((r) => Number(r.cells[0]) === Number(n));
  if (!checkRow || checkRow.cells[colIndex] !== value) {
    throw new Error("Refusing to write: verification read-back failed");
  }

  fs.writeFileSync(DISTLOG, out, "utf8");
  return value;
}

/* ------------------------------------------------------------------ view */

const LEVEL_LABEL = { high: "Blocking", med: "Check", low: "Tidy" };

function chip(text, kind = "") {
  return `<span class="chip ${kind}">${esc(text)}</span>`;
}

function spineHTML(r) {
  const parts = r.spine.map((s, i) => {
    const blocked = i === r.blockedAt;
    const after = r.blockedAt !== -1 && i > r.blockedAt;
    const cls = [
      "seg",
      s.done ? "on" : "off",
      s.na ? "na" : "",
      blocked ? "blocked" : "",
      after ? "after" : "",
    ]
      .filter(Boolean)
      .join(" ");
    return `<i class="${cls}" title="${esc(s.label)}${s.na ? " (n/a)" : s.done ? " — done" : blocked ? " — blocked here" : ""}"></i>`;
  });
  const vid = `<b class="pip vid ${isDone(r.video) ? "on" : ""}" title="Video: ${esc(r.video)}">VID</b>`;
  const pips = PLATFORMS.map((p) => {
    const v = r.posts[p.key];
    return `<b class="pip ${isPosted(v) ? "on" : ""}" title="${esc(p.label)}: ${esc(v)}">${p.short}</b>`;
  });
  return `<span class="spine">${parts.join("")}<em class="spine-gap"></em>${vid}${pips.join("")}</span>`;
}

/** All three platforms in one cell: three pills, filled once posted. */
function platsCell(r) {
  const pills = PLATFORMS.map((p) => {
    const v = String(r.posts[p.key]);
    const posted = isPosted(v);
    const [rawDate, ...rest] = v.split("·");
    const date = posted ? rawDate.trim() : "";
    const url = posted ? rest.join("·").trim() : "";
    const tip = posted
      ? `${p.label} · ${date}${url ? " · " + url : ""}`
      : `Mark ${p.label} posted`;
    return `<button class="plat${posted ? " on" : ""}${r.complete ? "" : " early"}"
      data-row="${r.n}" data-platform="${esc(p.key)}"
      data-date="${esc(date)}" data-url="${esc(url)}"
      data-posted="${posted ? "1" : ""}" data-slug="${esc(r.slug)}"
      title="${esc(tip)}">${p.short}</button>`;
  }).join("");

  const done = PLATFORMS.filter((p) => isPosted(r.posts[p.key])).map((p) => {
    const d = String(r.posts[p.key]).split("·")[0].trim().slice(5);
    return `${p.short} ${d}`;
  });

  return `<div class="plats">${pills}</div>${
    done.length ? `<div class="plat-dates">${esc(done.join("  ·  "))}</div>` : ""
  }`;
}

/** The cover thumbnail that sits beside the headline. */
function thumbHTML(r) {
  const file = r.disk.files.find((f) => f.includes("_COVER_"));
  if (!file) return `<span class="thumb empty" title="No cover built"></span>`;
  const src = `/asset/${encodeURIComponent(r.slug)}/${encodeURIComponent(file)}`;
  return `<img class="thumb" src="${src}" alt="" loading="lazy" decoding="async"
    data-assets="${esc(r.slug)}" title="Open the asset set">`;
}

function overview(s) {
  const firstBlocked = s.blocked[0];
  const nextPost = s.readyToPost[0];
  const nextWrite = s.nextUp[0];

  const action = nextPost
    ? {
        eyebrow: "Post next",
        title: nextPost.slug,
        body: `Row ${nextPost.n}. Every asset is built. ${PLATFORMS.filter((p) => !isPosted(nextPost.posts[p.key])).map((p) => p.label).join(", ")} still to go.`,
        cta: "Open the queue",
      }
    : firstBlocked
      ? {
          eyebrow: "Unblock",
          title: firstBlocked.slug,
          body: `Row ${firstBlocked.n} stops at ${firstBlocked.spine[firstBlocked.blockedAt].label}. Nothing downstream can be built until it clears.`,
          cta: "Open the queue",
        }
      : {
          eyebrow: "Publish next",
          title: nextWrite ? nextWrite.post.slug : "nothing banked",
          body: nextWrite
            ? `${THEME_LABEL[nextWrite.post.theme] || nextWrite.post.theme} has been quiet ${nextWrite.themeAge ?? "—"} days.`
            : "The bank is empty.",
          cta: "Open the pipeline",
        };

  const dripState =
    s.missed.length === 0
      ? { cls: "ok", text: "On cadence" }
      : s.missed.length <= 2
        ? { cls: "warn", text: `${s.missed.length} slot${s.missed.length === 1 ? "" : "s"} missed` }
        : { cls: "bad", text: `${s.missed.length} slots missed` };

  const posted = s.rows.reduce((a, r) => a + r.postedCount, 0);

  return `
  <section class="view" id="view-overview">
    <div class="lede">
      <p class="eyebrow">${esc(action.eyebrow)}</p>
      <h2 class="lede-title">${esc(action.title)}</h2>
      <p class="lede-body">${esc(action.body)}</p>
      <a class="lede-cta" href="#${nextWrite && !nextPost && !firstBlocked ? "pipeline" : "distribution"}">${esc(action.cta)} →</a>
    </div>

    <div class="stats">
      <div class="stat"><b>${s.published.length}</b><span>Published</span></div>
      <div class="stat"><b>${s.banked.length}</b><span>Banked</span></div>
      <div class="stat"><b>${s.rows.filter((r) => r.complete).length}</b><span>Asset sets done</span></div>
      <div class="stat ${posted === 0 ? "zero" : ""}"><b>${posted}</b><span>Posts live</span></div>
      <div class="stat ${dripState.cls}"><b>${s.missed.length}</b><span>Slots missed</span></div>
    </div>

    <div class="cols">
      <div class="panel">
        <h3 class="panel-h">Where the queue stops</h3>
        <p class="panel-sub">Every row, in production order. The ring marks the gate it is waiting on.</p>
        <div class="mini">
          ${s.rows
            .map(
              (r) => `<a class="mini-row" href="#distribution" data-jump="${r.n}">
                <span class="mini-n">${r.n}</span>
                ${spineHTML(r)}
                <span class="mini-slug">${esc(r.slug)}</span>
              </a>`,
            )
            .join("")}
        </div>
      </div>

      <div class="panel">
        <h3 class="panel-h">Drift <span class="count ${s.drift.length ? "" : "clear"}">${s.drift.length}</span></h3>
        <p class="panel-sub">Where the manifest and the disk disagree, and where a rule is bending.</p>
        ${
          s.drift.length === 0
            ? `<p class="empty">Nothing out of place. The log matches what is on disk.</p>`
            : `<ul class="drift">${s.drift
                .map(
                  (d) => `<li class="d-${d.level}">
                    <span class="d-level">${LEVEL_LABEL[d.level]}</span>
                    <strong>${esc(d.title)}</strong>
                    <span class="d-detail">${esc(d.detail)}</span>
                  </li>`,
                )
                .join("")}</ul>`
        }
      </div>
    </div>

    <div class="panel">
      <h3 class="panel-h">Drip</h3>
      <p class="panel-sub">Last publish ${esc(s.lastPublish || "—")}${
        s.lastPublish ? `, ${daysBetween(s.lastPublish, s.now)} days ago` : ""
      }. Cadence is Monday, Wednesday, Friday.</p>
      ${
        s.missed.length
          ? `<p class="slots">Missed since: ${s.missed.map((d) => `<code>${esc(d)}</code>`).join(" ")}</p>`
          : `<p class="empty">No slots missed.</p>`
      }
    </div>
  </section>`;
}

function distribution(s) {
  return `
  <section class="view" id="view-distribution">
    <div class="view-head">
      <h2>Distribution queue</h2>
      <p>Row order is production order. Ticking a post writes the date and link straight into <code>DISTRIBUTION_LOG.md</code>.</p>
    </div>
    <div class="tablewrap">
      <table class="q">
        <thead>
          <tr>
            <th class="c-n">#</th>
            <th class="c-brief">Briefing</th>
            <th class="c-spine">Gates</th>
            <th class="c-head">Cover</th>
            <th class="c-plats">Posted</th>
          </tr>
        </thead>
        <tbody>
          ${s.rows
            .map(
              (r) => `<tr id="row-${r.n}" data-search="${esc(
                [r.slug, r.cover, r.headline?.headline, r.ledger.query].join(" ").toLowerCase(),
              )}" class="${r.complete ? "" : "is-blocked"}">
              <td class="c-n">${r.n}</td>
              <td class="c-brief">
                <button class="slug slug-btn" data-assets="${esc(r.slug)}" ${
                  r.disk.files.length ? "" : "disabled"
                } title="${r.disk.files.length ? "Open the asset set" : "No assets built yet"}">${esc(r.slug)}</button>
                <span class="meta">${chip(r.cover)}${
                  r.post ? chip(r.post.date) : chip("no file", "bad")
                }${r.inbound === 0 && r.post && !r.post.draft ? chip("orphan", "bad") : ""}${
                  r.disk.files.length
                    ? `<span class="chip files">${r.disk.files.length} files</span>`
                    : ""
                }</span>
              </td>
              <td class="c-spine">${spineHTML(r)}${
                r.complete
                  ? ""
                  : `<span class="blocked-at">${esc(r.spine[r.blockedAt].label)}</span>`
              }</td>
              <td class="c-head">
                <div class="coverwrap">
                  ${thumbHTML(r)}
                  <div class="headtext">${
                    r.headline
                      ? `<span class="headline">${esc(r.headline.headline)}</span>${
                          r.headline.subhead
                            ? `<span class="subhead">${esc(r.headline.subhead)}</span>`
                            : ""
                        }`
                      : `<span class="none">not approved</span>`
                  }</div>
                </div>
              </td>
              <td class="c-plats">${platsCell(r)}</td>
            </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </div>
    <p class="legend">
      <span class="spine"><i class="seg on"></i></span> built
      <span class="spine"><i class="seg off"></i></span> not started
      <span class="spine"><i class="seg na"></i></span> n/a
      <span class="spine"><i class="seg off blocked"></i></span> blocked here
      &nbsp;· gates in order: ${s.rows[0] ? s.rows[0].spine.map((x) => x.label).join(" · ") : ""}
    </p>
  </section>`;
}

function pipeline(s) {
  const row = (p, extra = "") => `
    <tr data-search="${esc([p.slug, p.title, p.theme, ...p.industries, ...p.audiences].join(" ").toLowerCase())}">
      <td class="c-brief">
        <span class="slug">${esc(p.slug)}</span>
        <span class="title">${esc(p.title)}</span>
      </td>
      <td>${chip(THEME_LABEL[p.theme] || p.theme)}</td>
      <td class="c-tax">${p.industries.map((i) => chip(INDUSTRY_LABEL[i] || i)).join("")}</td>
      <td class="c-tax">${p.audiences.map((a) => chip(AUDIENCE_LABEL[a] || a)).join("")}</td>
      <td class="c-num ${p.words < 1000 ? "bad" : ""}">${p.words}</td>
      <td class="c-num ${(s.inbound[p.slug] || []).length === 0 && !p.draft ? "bad" : ""}">${(s.inbound[p.slug] || []).length}</td>
      <td class="c-num">${p.outbound.length}</td>
      <td class="c-date">${esc(p.date)}</td>
      ${extra}
    </tr>`;

  return `
  <section class="view" id="view-pipeline">
    <div class="view-head">
      <h2>Pipeline</h2>
      <p>${s.published.length} published, ${s.banked.length} banked. Word counts under 1,000 and zero-inbound briefings are flagged.</p>
    </div>

    <h3 class="sub">Published</h3>
    <div class="tablewrap">
      <table class="q">
        <thead><tr>
          <th class="c-brief">Briefing</th><th>Theme</th><th>Industries</th><th>Audiences</th>
          <th class="c-num">Words</th><th class="c-num">In</th><th class="c-num">Out</th><th class="c-date">Date</th>
        </tr></thead>
        <tbody>${s.published.map((p) => row(p)).join("")}</tbody>
      </table>
    </div>

    <h3 class="sub">Banked, ordered by how stale their ground is</h3>
    <p class="panel-sub">Score combines days since the theme last shipped and days since the industry last shipped. Highest first.</p>
    <div class="tablewrap">
      <table class="q">
        <thead><tr>
          <th class="c-brief">Briefing</th><th>Theme</th><th>Industries</th><th>Audiences</th>
          <th class="c-num">Words</th><th class="c-num">In</th><th class="c-num">Out</th><th class="c-date">Drafted</th>
          <th class="c-num">Stale</th>
        </tr></thead>
        <tbody>${s.nextUp
          .map((n) =>
            row(
              n.post,
              `<td class="c-num strong">${n.score >= 900 ? "never" : n.score}</td>`,
            ),
          )
          .join("")}</tbody>
      </table>
    </div>
  </section>`;
}

function coverage(s) {
  const bar = (bucket, keyMap) => {
    const keys = Object.keys(keyMap);
    const counts = {};
    for (const k of keys) counts[k] = 0;
    for (const p of s.published) {
      const list =
        bucket === "theme" ? [p.theme] : bucket === "industry" ? p.industries : p.audiences;
      for (const k of list) if (k in counts) counts[k]++;
    }
    const max = Math.max(1, ...Object.values(counts));
    return keys
      .map((k) => {
        const last = s.lastOut[bucket][k];
        const age = last ? daysBetween(last, s.now) : null;
        const stale = age === null || age > 28;
        return `<div class="bar ${stale ? "stale" : ""}">
          <span class="bar-k">${esc(keyMap[k])}</span>
          <span class="bar-t"><i style="width:${(counts[k] / max) * 100}%"></i></span>
          <span class="bar-n">${counts[k]}</span>
          <span class="bar-age">${age === null ? "never" : `${age}d`}</span>
        </div>`;
      })
      .join("");
  };

  return `
  <section class="view" id="view-coverage">
    <div class="view-head">
      <h2>Coverage</h2>
      <p>What has actually shipped, and how long since each corner of the taxonomy last had an outing. Anything quiet for more than four weeks is marked.</p>
    </div>
    <div class="cols3">
      <div class="panel"><h3 class="panel-h">Theme</h3>${bar("theme", THEME_LABEL)}</div>
      <div class="panel"><h3 class="panel-h">Industry</h3>${bar("industry", INDUSTRY_LABEL)}</div>
      <div class="panel"><h3 class="panel-h">Audience</h3>${bar("audience", AUDIENCE_LABEL)}</div>
    </div>
  </section>`;
}

function page(s) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Control · The Awakening</title>
<style>
:root{
  --ink:rgb(0,3,76);
  --blue:rgb(1,5,121);
  --accent:rgb(99,104,218);
  --lilac:rgb(233,234,255);
  --offwhite:rgb(244,245,255);
  --warn:rgb(135,5,113);
  --paper:#fff;
  --line:rgba(0,3,76,.12);
  --line-soft:rgba(0,3,76,.07);
  --dim:rgba(0,3,76,.55);
  --display:"Bahnschrift","DIN Alternate","Segoe UI",system-ui,sans-serif;
  --body:"Segoe UI Variable Text","Segoe UI",system-ui,-apple-system,sans-serif;
  --mono:"Cascadia Mono","Consolas",ui-monospace,monospace;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{
  background:var(--offwhite);color:var(--ink);
  font-family:var(--body);font-size:14px;line-height:1.5;
  -webkit-font-smoothing:antialiased;
}
code{font-family:var(--mono);font-size:.92em}
a{color:var(--blue)}

/* ---- rail ---- */
.shell{display:grid;grid-template-columns:212px 1fr;min-height:100vh}
.rail{
  background:var(--ink);color:#fff;padding:22px 0 18px;
  position:sticky;top:0;height:100vh;display:flex;flex-direction:column;
}
.mast{padding:0 20px 22px;border-bottom:1px solid rgba(255,255,255,.14)}
.mast b{
  display:block;font-family:var(--display);font-variation-settings:"wdth" 75;
  font-size:19px;letter-spacing:.14em;text-transform:uppercase;line-height:1.1;
}
.mast span{
  display:block;margin-top:5px;font-size:10px;letter-spacing:.22em;
  text-transform:uppercase;color:rgba(255,255,255,.5);
}
.railstats{padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.14)}
.rs{display:flex;justify-content:space-between;align-items:baseline;padding:3px 0}
.rs b{font-family:var(--mono);font-size:15px}
.rs span{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.55)}
.rs.alert b{color:#ff9ce8}
nav{padding:14px 12px;display:flex;flex-direction:column;gap:2px}
nav a{
  display:flex;justify-content:space-between;align-items:center;
  padding:9px 12px;border-radius:6px;color:rgba(255,255,255,.72);
  text-decoration:none;font-size:12px;letter-spacing:.1em;text-transform:uppercase;
  font-family:var(--display);font-variation-settings:"wdth" 87;
}
nav a:hover{background:rgba(255,255,255,.08);color:#fff}
nav a.on{background:var(--blue);color:#fff}
nav a i{font-style:normal;font-family:var(--mono);font-size:11px;opacity:.6}
.railfoot{margin-top:auto;padding:0 20px;font-size:10px;color:rgba(255,255,255,.4);line-height:1.6}

/* ---- main ---- */
main{padding:26px 30px 60px;max-width:1500px}
.topbar{display:flex;gap:14px;align-items:center;margin-bottom:24px}
.search{
  flex:1;max-width:380px;padding:9px 13px;border:1px solid var(--line);
  border-radius:7px;background:var(--paper);font:inherit;color:var(--ink);
}
.search:focus{outline:2px solid var(--accent);outline-offset:1px;border-color:transparent}
.stamp{font-family:var(--mono);font-size:11px;color:var(--dim)}
.view{display:none}
.view.on{display:block}
.view-head{margin-bottom:20px}
.view-head h2{
  font-family:var(--display);font-variation-settings:"wdth" 75;
  font-size:30px;letter-spacing:.04em;text-transform:uppercase;margin:0 0 6px;
}
.view-head p{margin:0;color:var(--dim);max-width:70ch}
h3.sub{
  font-family:var(--display);font-variation-settings:"wdth" 87;
  font-size:13px;letter-spacing:.18em;text-transform:uppercase;
  margin:30px 0 10px;color:var(--dim);
}

/* ---- lede ---- */
.lede{
  background:var(--ink);color:#fff;padding:30px 34px;border-radius:12px;
  margin-bottom:18px;
}
.eyebrow{
  margin:0 0 10px;font-size:10px;letter-spacing:.26em;text-transform:uppercase;
  color:#9ea3ff;font-family:var(--display);font-variation-settings:"wdth" 87;
}
.lede-title{
  margin:0 0 10px;font-family:var(--mono);font-size:25px;font-weight:600;
  letter-spacing:-.01em;word-break:break-word;
}
.lede-body{margin:0 0 18px;color:rgba(255,255,255,.72);max-width:62ch}
.lede-cta{
  display:inline-block;color:#fff;text-decoration:none;font-size:12px;
  letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,.4);
  padding-bottom:2px;font-family:var(--display);font-variation-settings:"wdth" 87;
}
.lede-cta:hover{border-color:#fff}

/* ---- stats ---- */
.stats{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:18px}
.stat{background:var(--paper);border:1px solid var(--line-soft);border-radius:10px;padding:16px 18px}
.stat b{display:block;font-family:var(--mono);font-size:30px;line-height:1;font-weight:600}
.stat span{
  display:block;margin-top:7px;font-size:10px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--dim);
}
.stat.zero b,.stat.bad b{color:var(--warn)}
.stat.warn b{color:var(--accent)}

/* ---- panels ---- */
.cols{display:grid;grid-template-columns:1.15fr 1fr;gap:14px;margin-bottom:14px}
.cols3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.panel{background:var(--paper);border:1px solid var(--line-soft);border-radius:10px;padding:18px 20px;margin-bottom:14px}
.panel-h{
  margin:0 0 4px;font-family:var(--display);font-variation-settings:"wdth" 87;
  font-size:12px;letter-spacing:.2em;text-transform:uppercase;
  display:flex;align-items:center;gap:8px;
}
.panel-sub{margin:0 0 14px;font-size:12px;color:var(--dim)}
.count{
  font-family:var(--mono);background:var(--warn);color:#fff;border-radius:20px;
  padding:1px 8px;font-size:11px;letter-spacing:0;
}
.count.clear{background:var(--lilac);color:var(--blue)}
.empty{margin:0;color:var(--dim);font-size:12px}

/* ---- the spine: the gate track ---- */
.spine{display:inline-flex;align-items:center;gap:3px;vertical-align:middle}
.seg{
  width:15px;height:8px;border-radius:2px;background:var(--blue);
  display:inline-block;transition:none;
}
.seg.off{background:var(--lilac)}
.seg.na{background:repeating-linear-gradient(45deg,var(--lilac),var(--lilac) 2px,#fff 2px,#fff 4px)}
.seg.blocked{
  background:#fff;box-shadow:0 0 0 2px var(--warn) inset;
}
.seg.after{opacity:.22}
.spine-gap{width:9px;display:inline-block}
.pip{
  font-family:var(--mono);font-size:9px;font-weight:600;letter-spacing:.02em;
  border:1px solid var(--line);border-radius:3px;padding:1px 3px;
  color:rgba(0,3,76,.35);background:#fff;
}
.pip.on{background:var(--blue);border-color:var(--blue);color:#fff}
.pip.vid{margin-right:5px}
.pip.vid.on{background:var(--accent);border-color:var(--accent)}

/* ---- mini queue ---- */
.mini{display:flex;flex-direction:column;gap:1px}
.mini-row{
  display:grid;grid-template-columns:26px auto 1fr;gap:12px;align-items:center;
  padding:6px 8px;border-radius:5px;text-decoration:none;color:inherit;
}
.mini-row:hover{background:var(--offwhite)}
.mini-n{font-family:var(--mono);font-size:11px;color:var(--dim);text-align:right}
.mini-slug{
  font-family:var(--mono);font-size:11px;color:var(--dim);
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
}

/* ---- drift ---- */
ul.drift{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:9px}
ul.drift li{padding-left:11px;border-left:2px solid var(--lilac)}
ul.drift li.d-high{border-color:var(--warn)}
ul.drift li.d-med{border-color:var(--accent)}
.d-level{
  display:block;font-size:9px;letter-spacing:.2em;text-transform:uppercase;
  color:var(--dim);margin-bottom:2px;
}
ul.drift strong{display:block;font-size:13px;font-weight:600}
.d-detail{display:block;font-size:12px;color:var(--dim);margin-top:1px}
.slots{margin:0;font-size:12px}
.slots code{background:var(--lilac);padding:2px 6px;border-radius:4px;margin-right:4px}

/* ---- tables ---- */
.tablewrap{overflow-x:auto;background:var(--paper);border:1px solid var(--line-soft);border-radius:10px}
table.q{width:100%;border-collapse:collapse;font-size:13px}
table.q th{
  text-align:left;padding:11px 12px;font-family:var(--display);
  font-variation-settings:"wdth" 87;font-size:10px;letter-spacing:.18em;
  text-transform:uppercase;color:var(--dim);border-bottom:1px solid var(--line);
  white-space:nowrap;font-weight:400;
}
table.q td{padding:11px 12px;border-bottom:1px solid var(--line-soft);vertical-align:middle}
table.q tr:last-child td{border-bottom:0}
table.q tbody tr:hover{background:var(--offwhite)}
table.q tr.is-blocked .c-brief .slug{color:var(--dim)}
table.q tr:target{background:var(--lilac)}
.c-n{width:34px;font-family:var(--mono);color:var(--dim);text-align:right}
/* the widest flexible column: it absorbs the slack so slugs stay on one line */
.c-brief{min-width:250px;width:38%}
.c-brief .slug{display:block;font-family:var(--mono);font-size:12px;font-weight:600}
.c-brief .title{display:block;font-size:12px;color:var(--dim);margin-top:2px}
.c-brief .meta{display:flex;gap:4px;margin-top:5px;flex-wrap:wrap}
.c-spine{white-space:nowrap;width:1px}
.blocked-at{
  display:block;margin-top:4px;font-size:10px;letter-spacing:.12em;
  text-transform:uppercase;color:var(--warn);
}
.c-head{max-width:300px}
.coverwrap{display:flex;gap:11px;align-items:flex-start}
.headtext{min-width:0}
.thumb{
  width:44px;height:55px;flex:none;object-fit:cover;border-radius:4px;
  border:1px solid var(--line);background:var(--lilac);cursor:pointer;display:block;
}
.thumb:hover{border-color:var(--blue)}
.thumb.empty{background:repeating-linear-gradient(45deg,var(--lilac),var(--lilac) 3px,#fff 3px,#fff 6px);cursor:default}
.headline{display:block;font-size:12px;font-weight:600;line-height:1.35}
.subhead{display:block;font-size:11px;color:var(--dim);margin-top:2px}
.none{font-size:11px;color:var(--dim);font-style:italic}

/* one column for all three platforms: the old three cost about 380px of width */
.c-plats{width:132px}
.plats{display:flex;gap:5px}
.plat{
  width:34px;height:26px;border:1px solid var(--line);border-radius:6px;
  background:#fff;color:rgba(0,3,76,.42);font-family:var(--mono);
  font-size:10px;font-weight:600;letter-spacing:.02em;padding:0;
}
.plat:hover{border-color:var(--blue);color:var(--blue)}
.plat.on{background:var(--blue);border-color:var(--blue);color:#fff}
.plat.early{border-style:dashed}
.plat:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.plat-dates{
  margin-top:5px;font-family:var(--mono);font-size:10px;color:var(--dim);
  white-space:nowrap;
}
.c-num{text-align:right;font-family:var(--mono);width:56px}
.c-num.bad{color:var(--warn);font-weight:600}
.c-num.strong{font-weight:600}
.c-date{font-family:var(--mono);font-size:12px;color:var(--dim);white-space:nowrap}
.c-tax{white-space:normal}

.chip{
  display:inline-block;background:var(--lilac);color:var(--blue);
  border-radius:4px;padding:2px 6px;font-size:10px;letter-spacing:.04em;
  margin-right:3px;white-space:nowrap;
}
.chip.bad{background:rgba(135,5,113,.1);color:var(--warn)}

/* ---- tick controls ---- */
button{font:inherit;cursor:pointer}
.tick{
  background:var(--paper);border:1px solid var(--line);border-radius:6px;
  padding:6px 10px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;
  color:var(--blue);font-family:var(--display);font-variation-settings:"wdth" 87;
  white-space:nowrap;
}
.tick:hover:not(:disabled){background:var(--blue);border-color:var(--blue);color:#fff}
.tick:disabled{opacity:.32;cursor:not-allowed}
nav a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.posted{display:flex;align-items:center;gap:7px}
.posted-date{font-family:var(--mono);font-size:12px;font-weight:600}
.posted-link{font-size:11px}
.undo{
  background:none;border:0;color:var(--dim);font-size:10px;
  text-transform:uppercase;letter-spacing:.1em;padding:2px;
}
.undo:hover{color:var(--warn)}

/* ---- coverage bars ---- */
.bar{display:grid;grid-template-columns:1fr 70px 24px 34px;gap:8px;align-items:center;padding:5px 0;font-size:12px}
.bar-k{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bar-t{background:var(--lilac);height:6px;border-radius:3px;overflow:hidden}
.bar-t i{display:block;height:100%;background:var(--blue)}
.bar-n{font-family:var(--mono);text-align:right}
.bar-age{font-family:var(--mono);font-size:11px;color:var(--dim);text-align:right}
.bar.stale .bar-age{color:var(--warn);font-weight:600}
.bar.stale .bar-t i{background:var(--accent)}

.legend{
  margin:12px 2px 0;font-size:11px;color:var(--dim);
  display:flex;gap:7px;align-items:center;flex-wrap:wrap;
}
.legend .spine{margin-left:6px}

/* ---- dialog ---- */
dialog{
  border:0;border-radius:12px;padding:0;max-width:460px;width:92vw;
  box-shadow:0 24px 60px rgba(0,3,76,.28);
}
dialog::backdrop{background:rgba(0,3,76,.42)}
.dlg{padding:24px 26px}
.dlg h3{
  margin:0 0 3px;font-family:var(--display);font-variation-settings:"wdth" 75;
  font-size:20px;letter-spacing:.04em;text-transform:uppercase;
}
.dlg p{margin:0 0 18px;font-size:12px;color:var(--dim)}
.dlg label{display:block;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--dim);margin:0 0 5px}
.dlg input{
  width:100%;padding:9px 11px;border:1px solid var(--line);border-radius:7px;
  font:inherit;margin-bottom:14px;color:var(--ink);
}
.dlg input:focus{outline:2px solid var(--accent);outline-offset:1px;border-color:transparent}
.dlg .row{display:flex;gap:10px;justify-content:flex-end;margin-top:4px}
.btn{
  border:1px solid var(--line);background:#fff;border-radius:7px;padding:9px 16px;
  font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink);
  font-family:var(--display);font-variation-settings:"wdth" 87;
}
.btn.go{background:var(--blue);border-color:var(--blue);color:#fff}
.btn.danger{color:var(--warn);border-color:rgba(135,5,113,.35);margin-right:auto}
.btn[hidden]{display:none!important}
#dlg-view{font-size:12px;display:block;margin:-4px 0 14px}
#dlg-view[hidden]{display:none!important}
.btn:hover{filter:brightness(1.08)}
.err{color:var(--warn);font-size:12px;margin:0 0 10px;display:none}

/* ---- asset drawer ---- */
/* class rules below set display, which outranks the UA [hidden] rule */
.drawer[hidden],.scrim[hidden],.lightbox[hidden]{display:none!important}
.scrim{position:fixed;inset:0;background:rgba(0,3,76,.42);z-index:50}
.drawer{
  position:fixed;top:0;right:0;bottom:0;width:min(780px,94vw);z-index:51;
  background:var(--paper);display:flex;flex-direction:column;
  box-shadow:-18px 0 50px rgba(0,3,76,.22);
}
.dr-head{
  display:flex;justify-content:space-between;align-items:flex-start;gap:16px;
  padding:22px 26px 16px;background:var(--ink);color:#fff;
}
.dr-eyebrow{
  margin:0 0 5px;font-size:10px;letter-spacing:.24em;text-transform:uppercase;
  color:#9ea3ff;font-family:var(--display);font-variation-settings:"wdth" 87;
}
.dr-title{margin:0;font-family:var(--mono);font-size:17px;font-weight:600;word-break:break-word}
.dr-close{
  background:none;border:0;color:rgba(255,255,255,.7);font-size:26px;
  line-height:1;padding:0 4px;
}
.dr-close:hover{color:#fff}
.dr-tabs{
  /* the global nav rule sets flex-direction:column; this element is a nav too */
  display:flex;flex-direction:row;gap:2px;padding:10px 18px;
  border-bottom:1px solid var(--line);background:var(--offwhite);flex-wrap:wrap;
}
.dr-tabs button{
  border:0;background:none;padding:7px 12px;border-radius:6px;color:var(--dim);
  font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  font-family:var(--display);font-variation-settings:"wdth" 87;
}
.dr-tabs button:hover{background:var(--lilac);color:var(--blue)}
.dr-tabs button.on{background:var(--blue);color:#fff}
.dr-body{overflow-y:auto;padding:24px 26px 46px;flex:1}
.dr-pane{display:none}
.dr-pane.on{display:block}
.dr-img{
  /* Covers are 1080x1350. Fitting to width alone makes them taller than the
     pane, so bound the height too and let the whole image be seen at once. */
  display:block;margin:0 auto;
  max-width:100%;width:auto;
  max-height:calc(100vh - 230px);
  object-fit:contain;
  border:1px solid var(--line);border-radius:9px;
  cursor:zoom-in;background:var(--offwhite);
}
.dr-note{text-align:center}
.dr-note{font-size:12px;color:var(--dim);margin:10px 0 0}
.files+.dr-note,.dr-pane .files~.dr-note{text-align:left}
.dr-empty{color:var(--dim);font-size:13px;padding:22px 0}

/* script, rendered from its markdown source */
.doc h3{
  font-family:var(--display);font-variation-settings:"wdth" 87;
  font-size:12px;letter-spacing:.2em;text-transform:uppercase;
  margin:22px 0 6px;color:var(--blue);
}
.doc h4{font-size:13px;margin:16px 0 4px}
.doc p{margin:0 0 10px;max-width:64ch;line-height:1.62}
.doc ul{margin:0 0 12px;padding-left:18px}
.doc li{margin-bottom:5px;max-width:62ch}
.doc hr{border:0;border-top:1px solid var(--line);margin:18px 0}
.doc strong{font-weight:600}
.doc code{background:var(--lilac);padding:1px 5px;border-radius:4px}

/* session notes, rendered from the deck spec */
.deck-sections{
  display:flex;flex-wrap:wrap;gap:6px;margin:0 0 20px;padding:0;list-style:none;
}
.deck-sections li{
  background:var(--lilac);color:var(--blue);border-radius:5px;
  padding:5px 9px;font-size:11px;
}
.deck-sections b{font-weight:600}
.slide{
  border:1px solid var(--line);border-radius:9px;padding:16px 18px;margin-bottom:11px;
}
.slide.title-slide,.slide.close-slide{background:var(--ink);color:#fff;border-color:var(--ink)}
.slide-n{
  font-family:var(--mono);font-size:10px;color:var(--dim);
  letter-spacing:.1em;text-transform:uppercase;
}
.slide.title-slide .slide-n,.slide.close-slide .slide-n{color:rgba(255,255,255,.5)}
.slide h4{margin:5px 0 5px;font-size:15px;line-height:1.3}
.slide .stand{margin:0 0 12px;font-size:13px;color:var(--dim);line-height:1.55}
.slide.close-slide .stand,.slide.close-slide h4{color:#fff}
.slide-row{border-top:1px solid var(--line-soft);padding:9px 0 0;margin-top:9px}
.slide-row b{display:block;font-size:12px;font-weight:600;margin-bottom:2px}
.slide-row span{display:block;font-size:12px;color:var(--dim);line-height:1.55}

/* file list */
.files{list-style:none;margin:0;padding:0}
.files li{
  display:flex;align-items:center;gap:12px;padding:11px 0;
  border-bottom:1px solid var(--line-soft);
}
.files li:last-child{border-bottom:0}
.f-kind{
  font-family:var(--mono);font-size:9px;letter-spacing:.08em;text-transform:uppercase;
  background:var(--lilac);color:var(--blue);border-radius:4px;padding:3px 6px;min-width:52px;
  text-align:center;
}
.f-name{flex:1;font-family:var(--mono);font-size:11px;word-break:break-all}
.f-size{font-family:var(--mono);font-size:11px;color:var(--dim);white-space:nowrap}
.f-open{
  border:1px solid var(--line);background:#fff;border-radius:6px;padding:5px 11px;
  font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--blue);
  font-family:var(--display);font-variation-settings:"wdth" 87;white-space:nowrap;
}
.f-open:hover{background:var(--blue);border-color:var(--blue);color:#fff}

.lightbox{
  position:fixed;inset:0;z-index:60;background:rgba(0,3,76,.9);
  display:flex;align-items:center;justify-content:center;padding:34px;cursor:zoom-out;
}
.lightbox img{max-width:100%;max-height:100%;border-radius:6px}

.slug-btn{
  background:none;border:0;padding:0;text-align:left;color:var(--ink);
  font-family:var(--mono);font-size:12px;font-weight:600;
  border-bottom:1px dotted rgba(0,3,76,.35);
}
.slug-btn:hover:not(:disabled){color:var(--blue);border-bottom-style:solid}
.slug-btn:disabled{border-bottom:0;cursor:default;color:var(--dim)}
.chip.files{background:rgba(99,104,218,.14);color:var(--blue)}

/* ---- toast ---- */
.toast{
  position:fixed;left:50%;bottom:26px;transform:translateX(-50%);
  background:var(--ink);color:#fff;padding:11px 18px;border-radius:8px;
  font-size:12px;box-shadow:0 12px 30px rgba(0,3,76,.3);z-index:99;
}
.toast.bad{background:var(--warn)}

@media (max-width:1180px){
  .cols,.cols3{grid-template-columns:1fr}
  .stats{grid-template-columns:repeat(3,1fr)}
}
@media (max-width:820px){
  .shell{grid-template-columns:1fr}
  .rail{position:static;height:auto;flex-direction:row;flex-wrap:wrap;align-items:center;gap:10px;padding:14px}
  .mast,.railstats{border:0;padding:0 10px}
  .railfoot{display:none}
  nav{flex-direction:row;flex-wrap:wrap;padding:0}
  main{padding:18px 14px 50px}
  .stats{grid-template-columns:repeat(2,1fr)}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
</style>
</head>
<body>
<div class="shell">
  <aside class="rail">
    <div class="mast"><b>The Awakening</b><span>Control</span></div>
    <div class="railstats">
      <div class="rs"><span>Published</span><b>${s.published.length}</b></div>
      <div class="rs"><span>Banked</span><b>${s.banked.length}</b></div>
      <div class="rs"><span>Queue</span><b>${s.rows.length}</b></div>
      <div class="rs ${s.rows.reduce((a, r) => a + r.postedCount, 0) === 0 ? "alert" : ""}"><span>Posts live</span><b>${s.rows.reduce((a, r) => a + r.postedCount, 0)}</b></div>
      <div class="rs ${s.drift.length ? "alert" : ""}"><span>Drift</span><b>${s.drift.length}</b></div>
    </div>
    <nav>
      <a href="#overview" data-view="overview"><span>Overview</span><i>1</i></a>
      <a href="#distribution" data-view="distribution"><span>Queue</span><i>2</i></a>
      <a href="#pipeline" data-view="pipeline"><span>Pipeline</span><i>3</i></a>
      <a href="#coverage" data-view="coverage"><span>Coverage</span><i>4</i></a>
    </nav>
    <div class="railfoot">
      Reads and writes the markdown in<br><code>agent-guides/blog/</code>.<br>
      Local only. Nothing leaves this machine.
    </div>
  </aside>

  <main>
    <div class="topbar">
      <input class="search" id="q" type="search" placeholder="Filter by slug, theme, headline…  ( / )" aria-label="Filter rows">
      <span class="stamp">${esc(s.now)}</span>
    </div>
    ${overview(s)}
    ${distribution(s)}
    ${pipeline(s)}
    ${coverage(s)}
  </main>
</div>

<div class="scrim" id="scrim" hidden></div>
<aside class="drawer" id="drawer" hidden aria-label="Asset set">
  <header class="dr-head">
    <div>
      <p class="dr-eyebrow" id="dr-eyebrow">Assets</p>
      <h2 class="dr-title" id="dr-title"></h2>
    </div>
    <button class="dr-close" id="dr-close" aria-label="Close">&times;</button>
  </header>
  <nav class="dr-tabs" id="dr-tabs"></nav>
  <div class="dr-body" id="dr-body"></div>
</aside>

<div class="lightbox" id="lightbox" hidden><img id="lb-img" alt=""></div>

<dialog id="dlg">
  <form method="dialog" class="dlg">
    <h3 id="dlg-title">Mark posted</h3>
    <p id="dlg-sub"></p>
    <p class="err" id="dlg-err"></p>
    <a id="dlg-view" href="#" target="_blank" rel="noreferrer" hidden>View the live post &rarr;</a>
    <label for="dlg-date">Date posted</label>
    <input id="dlg-date" type="date" required>
    <label for="dlg-url">Live URL <span style="text-transform:none;letter-spacing:0">(optional)</span></label>
    <input id="dlg-url" type="url" placeholder="https://www.linkedin.com/posts/…">
    <div class="row">
      <button class="btn danger" id="dlg-clear" type="button" hidden>Clear</button>
      <button class="btn" value="cancel" type="submit">Cancel</button>
      <button class="btn go" id="dlg-save" value="save" type="button">Save to log</button>
    </div>
  </form>
</dialog>

<script>
const VIEWS=["overview","distribution","pipeline","coverage"];
function show(v){
  if(!VIEWS.includes(v))v="overview";
  for(const x of VIEWS){
    document.getElementById("view-"+x).classList.toggle("on",x===v);
  }
  for(const a of document.querySelectorAll("nav a")){
    a.classList.toggle("on",a.dataset.view===v);
  }
}
function current(){return (location.hash||"#overview").slice(1).split("?")[0];}
show(current());
addEventListener("hashchange",()=>show(current()));

document.addEventListener("keydown",e=>{
  if(e.target.matches("input,textarea"))return;
  if(e.key==="/"){e.preventDefault();document.getElementById("q").focus();return;}
  const i=["1","2","3","4"].indexOf(e.key);
  if(i>-1)location.hash="#"+VIEWS[i];
});

// live filter across whichever view is showing
document.getElementById("q").addEventListener("input",e=>{
  const t=e.target.value.trim().toLowerCase();
  for(const tr of document.querySelectorAll("table.q tbody tr")){
    const hay=(tr.dataset.search||tr.textContent).toLowerCase();
    tr.style.display=!t||hay.includes(t)?"":"none";
  }
});

// jump from the overview mini-queue into the queue row
for(const a of document.querySelectorAll("[data-jump]")){
  a.addEventListener("click",()=>{
    const n=a.dataset.jump;
    setTimeout(()=>{
      const el=document.getElementById("row-"+n);
      if(el)el.scrollIntoView({block:"center"});
    },30);
  });
}

const dlg=document.getElementById("dlg");
let pending=null;

function toast(msg,bad){
  const t=document.createElement("div");
  t.className="toast"+(bad?" bad":"");
  t.textContent=msg;
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),3600);
}

async function send(body){
  const res=await fetch("/api/post",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify(body)
  });
  const out=await res.json();
  if(!res.ok||!out.ok)throw new Error(out.error||"Write failed");
  return out;
}

function reloadWith(msg){
  sessionStorage.setItem("toast",msg);
  sessionStorage.setItem("scroll",String(scrollY));
  location.reload();
}

document.addEventListener("click",e=>{
  const pill=e.target.closest(".plat");
  if(!pill)return;
  const posted=pill.dataset.posted==="1";
  pending={n:Number(pill.dataset.row),platform:pill.dataset.platform};
  document.getElementById("dlg-title").textContent=
    (posted?"Edit ":"Posted to ")+pending.platform;
  document.getElementById("dlg-sub").textContent=
    "Row "+pending.n+" · "+pill.dataset.slug;
  document.getElementById("dlg-date").value=
    posted&&pill.dataset.date?pill.dataset.date:${JSON.stringify(s.now)};
  document.getElementById("dlg-url").value=pill.dataset.url||"";
  document.getElementById("dlg-err").style.display="none";
  document.getElementById("dlg-clear").hidden=!posted;
  const view=document.getElementById("dlg-view");
  view.hidden=!(posted&&pill.dataset.url);
  if(!view.hidden)view.href=pill.dataset.url;
  dlg.showModal();
});

document.getElementById("dlg-save").addEventListener("click",async()=>{
  const date=document.getElementById("dlg-date").value;
  const url=document.getElementById("dlg-url").value.trim();
  const err=document.getElementById("dlg-err");
  if(!date){err.textContent="Pick the date it went out.";err.style.display="block";return;}
  try{
    await send({...pending,date,url});
    dlg.close();
    reloadWith("Posted. Written to DISTRIBUTION_LOG.md.");
  }catch(e){err.textContent=e.message;err.style.display="block";}
});

document.getElementById("dlg-clear").addEventListener("click",async()=>{
  const err=document.getElementById("dlg-err");
  try{
    await send({...pending,clear:true});
    dlg.close();
    reloadWith("Cleared. DISTRIBUTION_LOG.md updated.");
  }catch(e){err.textContent=e.message;err.style.display="block";}
});

const t=sessionStorage.getItem("toast");
if(t){toast(t);sessionStorage.removeItem("toast");}
const sc=sessionStorage.getItem("scroll");
if(sc){scrollTo(0,Number(sc));sessionStorage.removeItem("scroll");}
</script>
<script src="/dashboard.js"></script>
</body>
</html>`;
}

/* ---------------------------------------------------------------- server */

function json(res, code, body) {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/post") {
    let body = "";
    req.on("data", (c) => {
      body += c;
      if (body.length > 1e6) req.destroy();
    });
    req.on("end", () => {
      try {
        const { n, platform, date, url, clear } = JSON.parse(body || "{}");
        if (!PLATFORMS.some((p) => p.key === platform)) {
          return json(res, 400, { ok: false, error: `Unknown platform ${platform}` });
        }
        if (!clear && !/^\d{4}-\d{2}-\d{2}$/.test(String(date))) {
          return json(res, 400, { ok: false, error: "Date must be YYYY-MM-DD" });
        }
        const value = writeQueueCell({ n, platform, date, url, clear });
        console.log(`  wrote row ${n} · ${platform} = ${value}`);
        json(res, 200, { ok: true, value });
      } catch (e) {
        json(res, 400, { ok: false, error: e.message });
      }
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/open") {
    let body = "";
    req.on("data", (c) => {
      body += c;
      if (body.length > 1e5) req.destroy();
    });
    req.on("end", () => {
      try {
        const { slug, name } = JSON.parse(body || "{}");
        const full = resolveAsset(slug, name);
        if (!full) return json(res, 404, { ok: false, error: "File not found" });
        // Local tool, opening the user's own file in its native app.
        if (process.platform === "win32") {
          spawn("cmd", ["/c", "start", "", full], { detached: true }).unref();
        } else {
          spawn(process.platform === "darwin" ? "open" : "xdg-open", [full], {
            detached: true,
          }).unref();
        }
        json(res, 200, { ok: true });
      } catch (e) {
        json(res, 400, { ok: false, error: e.message });
      }
    });
    return;
  }

  if (req.url.startsWith("/api/assets")) {
    const slug = new URL(req.url, "http://localhost").searchParams.get("slug");
    if (!slug) return json(res, 400, { ok: false, error: "slug required" });
    return json(res, 200, assetsFor(slug));
  }

  if (req.url.startsWith("/asset/")) {
    const parts = req.url.slice("/asset/".length).split("/");
    const slug = decodeURIComponent(parts[0] || "");
    const name = decodeURIComponent(parts.slice(1).join("/") || "");
    const full = resolveAsset(slug, name);
    if (!full) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Asset not found");
    }
    const type = MIME[path.extname(full).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": type,
      "Content-Length": fs.statSync(full).size,
      "Cache-Control": "no-cache",
    });
    return fs.createReadStream(full).pipe(res);
  }

  if (req.url === "/dashboard.js") {
    const js = read(path.join(ROOT, "scripts/dashboard.client.js"));
    res.writeHead(200, {
      "Content-Type": "text/javascript; charset=utf-8",
      "Cache-Control": "no-cache",
    });
    return res.end(js);
  }

  if (req.url === "/api/state") {
    return json(res, 200, build());
  }

  if (req.url === "/" || req.url.startsWith("/#")) {
    try {
      const html = page(build());
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(html);
    } catch (e) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(`Dashboard failed to build:\n\n${e.stack}`);
    }
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
});

const migrated = ensureYouTubeColumn();
server.listen(PORT, "127.0.0.1", () => {
  console.log(`\n  The Awakening · control room`);
  if (migrated) console.log(`  Added a YouTube column to the queue table.`);
  console.log(`  http://localhost:${PORT}\n`);
  console.log(`  Reads TOPIC_LEDGER.md, DISTRIBUTION_LOG.md, content/.`);
  console.log(`  Ticking a post writes back to DISTRIBUTION_LOG.md.`);
  console.log(`  Ctrl+C to stop.\n`);
});
