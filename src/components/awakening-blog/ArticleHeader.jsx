import Link from "next/link";
import { formatDate } from "@/lib/blog/format";
import { getTheme } from "@/lib/blog/taxonomy";

export default function ArticleHeader({ post }) {
  const theme = getTheme(post.theme);

  return (
    <header>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-dark-blue/40">
          <li>
            <Link href="/" className="transition-colors hover:text-dark-blue">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-msaccent">/</li>
          <li>
            <Link
              href="/awakening"
              className="transition-colors hover:text-dark-blue"
            >
              The Awakening
            </Link>
          </li>
          <li aria-hidden="true" className="text-msaccent">/</li>
          <li aria-current="page" className="text-dark-blue/60">
            {theme.shortLabel}
          </li>
        </ol>
      </nav>

      <h1 className="mt-8 font-ptsans text-4xl font-bold uppercase leading-[1.05] tracking-tight text-dark-blue sm:text-5xl">
        {post.title}
      </h1>

      <p className="mt-6 max-w-2xl text-xl font-light leading-relaxed text-dark-blue/60">
        {post.description}
      </p>

      <div className="mt-8 border-y border-dark-blue/10 py-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-dark-blue/50">
          By Michael Steve &middot; {formatDate(post.date)}
          {post.updated && <> &middot; Updated {formatDate(post.updated)}</>}
          &nbsp;&middot; {post.readingTime} min read
        </p>
      </div>

      <figure className="mt-8 overflow-hidden border border-dark-blue/10">
        <img
          src={post.image}
          alt={post.imageAlt}
          className="aspect-video w-full object-cover"
        />
      </figure>
    </header>
  );
}
