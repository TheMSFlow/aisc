import FeaturedArticle from "@/components/awakening-blog/FeaturedArticle";
import PostGrid from "@/components/awakening-blog/PostGrid";
import TaxonomyNav from "@/components/awakening-blog/TaxonomyNav";
import { getAllPosts, getFeaturedPost } from "@/lib/blog/posts";
import { blogJsonLd, JsonLd } from "@/lib/blog/jsonld";

export const metadata = {
  title: "The Awakening | AI Leadership Briefings",
  description:
    "Briefings, guides, and insights on AI leadership: clarity for Chiefs, frameworks for Leaders of Leaders, and a head start for Emerging Leaders.",
  alternates: {
    canonical: "/awakening",
  },
  openGraph: {
    title: "The Awakening | AI Leadership Briefings",
    description:
      "Briefings, guides, and insights on AI leadership for Chiefs, Leaders of Leaders, and Emerging Leaders.",
    url: "/awakening",
    type: "website",
    // Declaring openGraph here replaces the parent's wholesale, so the root
    // generated card must be named again or the hub shares with no image.
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function AwakeningHub() {
  const posts = getAllPosts();
  const featured = getFeaturedPost();
  const rest = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;

  return (
    <>
      <JsonLd data={blogJsonLd(posts)} />

      {/* Masthead — flat dark-blue, flows seamlessly out of the header */}
      <section className="bg-dark-blue">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 md:py-20 lg:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
            Briefings for the AI era
          </p>
          <h1 className="mt-4 font-ptsans text-5xl font-bold uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
            The Awakening
          </h1>
          <p className="mt-5 max-w-xl text-lg font-light leading-relaxed text-white/60">
            AI made intelligence abundant, but also made judgment{" "}
            <span className="font-normal text-white">scarce</span>. These
            briefings exist so the leaders who need to make informed decisions see clearly,
            govern early, and claim territory first.
          </p>
        </div>
      </section>

      {/* Featured card + grid — resting on white */}
      <section className="w-full px-5 py-14 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          {featured && <FeaturedArticle post={featured} />}

          <div className="mt-16">
            <TaxonomyNav />
          </div>

          <div className="mt-12 flex items-baseline justify-between gap-4 border-t border-dark-blue/10 pt-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-dark-blue/40">
              All briefings
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-dark-blue/30">
              {posts.length} briefings
            </p>
          </div>

          <div className="mt-8">
            <PostGrid posts={rest.length ? rest : posts} />
          </div>
        </div>
      </section>
    </>
  );
}
