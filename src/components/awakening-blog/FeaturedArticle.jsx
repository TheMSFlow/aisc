import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/blog/format";
import { getTheme } from "@/lib/blog/taxonomy";

/**
 * Hub feature, rendered as a self-contained dark card that rests on the light
 * hub background.
 */
export default function FeaturedArticle({ post }) {
  const theme = getTheme(post.theme);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-dark-blue text-white shadow-[0_2px_4px_rgba(0,3,76,0.12),0_24px_60px_rgba(0,3,76,0.22)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-[4%] h-95 w-145 bg-[radial-gradient(ellipse_at_center,rgba(99,104,218,0.24),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-[2%] h-80 w-120 bg-[radial-gradient(ellipse_at_center,rgba(135,5,113,0.13),transparent_60%)]"
      />

      <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[7fr_5fr] lg:p-12">
        <div className="flex flex-col">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
            Featured <span className="text-white/25">/</span> {theme.label}
          </p>
          <Link href={`/awakening/${post.slug}`} className="group mt-4 block">
            <h2 className="font-ptsans text-3xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-white/60">
              {post.description}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-lilac transition-colors group-hover:text-white">
              Read the briefing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </p>
          </Link>
          <p className="mt-auto pt-8 text-[11px] uppercase tracking-[0.2em] text-white/40">
            {formatDate(post.date)} &middot; {post.readingTime} min read
          </p>
        </div>
        <Link
          href={`/awakening/${post.slug}`}
          className="group hidden overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/5 lg:block"
        >
          <img
            src={post.image}
            alt={post.imageAlt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>
      </div>
    </div>
  );
}
