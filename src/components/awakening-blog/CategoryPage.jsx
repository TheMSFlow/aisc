import Link from "next/link";
import Section from "@/components/layout/Section";
import PostGrid from "./PostGrid";
import TaxonomyNav from "./TaxonomyNav";
import { breadcrumbJsonLd, collectionJsonLd, JsonLd } from "@/lib/blog/jsonld";

/**
 * Shared layout for taxonomy landing pages (/awakening/industry|for|theme/[id]).
 */
export default function CategoryPage({ entry, dimension, path, eyebrow, posts }) {
  return (
    <>
      <JsonLd
        data={collectionJsonLd({
          name: entry.seo.title,
          description: entry.seo.description,
          path,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "The Awakening", path: "/awakening" },
          { name: entry.label, path },
        ])}
      />

      <Section width="wide" spacing="compact" className="border-b border-dark-blue/10">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-dark-blue/40">
            <li>
              <Link href="/awakening" className="transition-colors hover:text-dark-blue">
                The Awakening
              </Link>
            </li>
            <li aria-hidden="true" className="text-msaccent">/</li>
            <li aria-current="page" className="text-dark-blue/60">
              {entry.label}
            </li>
          </ol>
        </nav>
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-ptsans text-4xl font-bold uppercase leading-tight tracking-tight text-dark-blue sm:text-5xl">
          {entry.label}
        </h1>
        <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-dark-blue/60">
          {entry.blurb}
        </p>
        <div className="mt-10">
          <TaxonomyNav active={{ dimension, id: entry.id }} />
        </div>
      </Section>

      <Section width="wide" spacing="default">
        <PostGrid posts={posts} />
      </Section>
    </>
  );
}
