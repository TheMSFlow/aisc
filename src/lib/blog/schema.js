import { z } from "zod";
import {
  ALL_AUDIENCE_IDS,
  ALL_COVER_IDS,
  ALL_INDUSTRY_IDS,
  ALL_THEME_IDS,
  ALL_TYPE_IDS,
} from "./taxonomy";

// Slugs that collide with static route segments under /awakening
export const RESERVED_SLUGS = [
  "industry",
  "for",
  "theme",
  "type",
  "feed",
  "feed.xml",
];

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const frontmatterSchema = z.object({
  title: z.string().min(1).max(70),
  description: z.string().min(70).max(160),
  slug: z
    .string()
    .regex(SLUG_PATTERN, "slug must be lowercase kebab-case")
    .refine((s) => !RESERVED_SLUGS.includes(s), {
      message: `slug cannot be one of: ${RESERVED_SLUGS.join(", ")}`,
    })
    .optional(),
  date: z.string().regex(DATE_PATTERN, "date must be YYYY-MM-DD"),
  updated: z.string().regex(DATE_PATTERN, "updated must be YYYY-MM-DD").optional(),
  author: z.string().default("michael-steve"),
  // The user-facing browse dimension. Exactly one per post.
  theme: z.enum(ALL_THEME_IDS),
  // Social video-cover background. Never rendered on the site.
  cover: z.enum(ALL_COVER_IDS),
  // Internal only since July 2026: no routes, no chips. Kept for the
  // related-post signal and historical continuity.
  type: z.enum(ALL_TYPE_IDS),
  industries: z.array(z.enum(ALL_INDUSTRY_IDS)).min(1),
  audiences: z.array(z.enum(ALL_AUDIENCE_IDS)).min(1),
  tags: z.array(z.string()).default([]),
  image: z
    .string()
    .regex(/^\//, "image must be a site-relative path under /public"),
  imageAlt: z.string().min(1),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  seo: z
    .object({
      title: z.string().max(70).optional(),
      description: z.string().max(160).optional(),
      canonical: z.string().optional(),
    })
    .optional(),
  ogImage: z.string().optional(),
  related: z.array(z.string()).optional(),
});

/**
 * Validate frontmatter for one post. Throws with the filename in the message
 * so a bad agent-authored file fails the build loudly and traceably.
 */
export function parseFrontmatter(data, filename) {
  const result = frontmatterSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid frontmatter in ${filename}: ${issues}`);
  }
  return result.data;
}
