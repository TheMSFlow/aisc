import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { parseFrontmatter } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "awakening");
const WORDS_PER_MINUTE = 225;

let cache = null;

function loadPosts() {
  // In dev, re-read every call so new/edited .mdx files appear without a
  // server restart (content files are not watched modules). In prod builds
  // content is immutable, so the module-level cache stands.
  if (process.env.NODE_ENV === "development") cache = null;
  if (cache) return cache;

  if (!fs.existsSync(CONTENT_DIR)) {
    cache = [];
    return cache;
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = parseFrontmatter(data, filename);

    const slug = frontmatter.slug ?? filename.replace(/\.mdx?$/, "");
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));

    return { ...frontmatter, slug, content, wordCount, readingTime };
  });

  const seen = new Set();
  for (const post of posts) {
    if (seen.has(post.slug)) {
      throw new Error(`Duplicate post slug: "${post.slug}"`);
    }
    seen.add(post.slug);
  }

  cache = posts
    .filter((p) => !p.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return cache;
}

export function getAllPosts() {
  return loadPosts();
}

export function getPostBySlug(slug) {
  return loadPosts().find((p) => p.slug === slug) ?? null;
}

const SINGULAR_DIMENSIONS = new Set(["theme", "type"]);

/**
 * @param {"industries"|"audiences"|"theme"|"type"} dimension
 */
export function getPostsByTaxonomy(dimension, id) {
  return loadPosts().filter((p) =>
    SINGULAR_DIMENSIONS.has(dimension) ? p[dimension] === id : p[dimension].includes(id)
  );
}

export function getFeaturedPost() {
  const posts = loadPosts();
  return posts.find((p) => p.featured) ?? posts[0] ?? null;
}

export function getRelatedPosts(post, limit = 3) {
  const others = loadPosts().filter((p) => p.slug !== post.slug);

  const manual = (post.related ?? [])
    .map((slug) => others.find((p) => p.slug === slug))
    .filter(Boolean);
  if (manual.length >= limit) return manual.slice(0, limit);

  const remaining = others
    .filter((p) => !manual.includes(p))
    .map((p) => {
      let score = 0;
      score += p.audiences.filter((a) => post.audiences.includes(a)).length * 3;
      score += p.industries.filter((i) => post.industries.includes(i)).length * 2;
      score += p.tags.filter((t) => post.tags.includes(t)).length;
      if (p.theme === post.theme) score += 1;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1))
    .map((entry) => entry.post);

  return [...manual, ...remaining].slice(0, limit);
}
