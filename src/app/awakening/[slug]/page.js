import { notFound } from "next/navigation";
import Section from "@/components/layout/Section";
import ArticleHeader from "@/components/awakening-blog/ArticleHeader";
import ArticleTaxonomy from "@/components/awakening-blog/ArticleTaxonomy";
import AuthorBlock from "@/components/awakening-blog/AuthorBlock";
import RelatedPosts from "@/components/awakening-blog/RelatedPosts";
import { renderPostBody } from "@/lib/blog/mdx";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog/posts";
import { articleJsonLd, breadcrumbJsonLd, JsonLd } from "@/lib/blog/jsonld";

// dynamicParams stays at its default (true): known slugs are prerendered via
// generateStaticParams, unknown slugs fall through to notFound() below. A
// strict `false` here would pin the slug list to the last route compile and
// 404 newly added .mdx files in dev until a server restart.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.description;

  return {
    title,
    description,
    alternates: {
      canonical: post.seo?.canonical ?? `/awakening/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/awakening/${slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: ["Michael Steve"],
      ...(post.ogImage && { images: [{ url: post.ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(post.ogImage && { images: [post.ogImage] }),
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "The Awakening", path: "/awakening" },
          { name: post.title, path: `/awakening/${post.slug}` },
        ])}
      />

      <Section as="article" width="narrow" spacing="default">
        <ArticleHeader post={post} />
        <div className="awakening-prose mt-10">{renderPostBody(post.content)}</div>
        <AuthorBlock />
        <ArticleTaxonomy post={post} />
      </Section>

      {related.length > 0 && (
        <Section width="wide" spacing="compact" className="border-t border-dark-blue/10">
          <RelatedPosts posts={related} />
        </Section>
      )}
    </>
  );
}
