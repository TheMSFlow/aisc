import Link from "next/link";
import { formatDate } from "@/lib/blog/format";
import { getIndustry, getTheme } from "@/lib/blog/taxonomy";

export default function ArticleCard({ post }) {
  const theme = getTheme(post.theme);
  const industries = post.industries
    .map((id) => getIndustry(id)?.shortLabel)
    .filter(Boolean);

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,3,76,0.06),0_8px_24px_rgba(0,3,76,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(0,3,76,0.08),0_16px_40px_rgba(0,3,76,0.14)]">
      <Link href={`/awakening/${post.slug}`} className="flex h-full flex-col">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
            <span className="font-bold text-msblue">{theme.shortLabel}</span>
            <span className="text-dark-blue/25"> / </span>
            {industries.join(", ")}
          </p>
          <h3 className="mt-4 font-ptsans text-xl font-bold uppercase leading-tight tracking-tight text-dark-blue sm:text-2xl">
            {post.title}
          </h3>
          <p className="mb-6 mt-3 text-sm font-light leading-relaxed text-dark-blue/60">
            {post.description}
          </p>
          <p className="mt-auto border-t border-dark-blue/10 pt-4 text-[11px] uppercase tracking-[0.2em] text-dark-blue/40">
            {formatDate(post.date)} &middot; {post.readingTime} min read
          </p>
        </div>
      </Link>
    </article>
  );
}
