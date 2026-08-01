import Link from "next/link";
import { getAudience, getIndustry } from "@/lib/blog/taxonomy";

function MetaChip({ href, children }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-dark-blue/15 bg-white/50 px-3.5 py-1.5 text-xs text-dark-blue/70 transition-all hover:border-dark-blue/40 hover:bg-white hover:text-dark-blue"
    >
      {children}
    </Link>
  );
}

/**
 * The article's taxonomy chips, placed at the end of the read rather than in
 * the header: before the body they interrupt a reader who has just committed,
 * after it they answer the "more like this" question the piece has earned.
 * These are also the only in-article links into the category hubs, which is
 * what makes those pages rank (see agent-guides/blog/SEO_GUIDE.md).
 */
export default function ArticleTaxonomy({ post }) {
  const audiences = (post.audiences ?? []).map(getAudience).filter(Boolean);
  const industries = (post.industries ?? []).map(getIndustry).filter(Boolean);

  if (!audiences.length && !industries.length) return null;

  return (
    <nav
      aria-label="Related categories"
      className="mt-12 border-t border-dark-blue/10 pt-8"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
        Filed under
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {audiences.map((audience) => (
          <MetaChip key={audience.id} href={`/awakening/for/${audience.id}`}>
            For {audience.shortLabel}
          </MetaChip>
        ))}
        {industries.map((industry) => (
          <MetaChip key={industry.id} href={`/awakening/industry/${industry.id}`}>
            {industry.shortLabel}
          </MetaChip>
        ))}
      </div>
    </nav>
  );
}
