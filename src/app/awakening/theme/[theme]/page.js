import { notFound } from "next/navigation";
import CategoryPage from "@/components/awakening-blog/CategoryPage";
import { getPostsByTaxonomy } from "@/lib/blog/posts";
import { ALL_THEME_IDS, getTheme } from "@/lib/blog/taxonomy";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_THEME_IDS.map((theme) => ({ theme }));
}

export async function generateMetadata({ params }) {
  const { theme } = await params;
  const entry = getTheme(theme);
  if (!entry) return {};

  return {
    title: entry.seo.title,
    description: entry.seo.description,
    alternates: {
      canonical: `/awakening/theme/${theme}`,
    },
    openGraph: {
      title: entry.seo.title,
      description: entry.seo.description,
      url: `/awakening/theme/${theme}`,
      type: "website",
    },
  };
}

export default async function ThemePage({ params }) {
  const { theme } = await params;
  const entry = getTheme(theme);
  if (!entry) notFound();

  return (
    <CategoryPage
      entry={entry}
      dimension="theme"
      path={`/awakening/theme/${theme}`}
      eyebrow="Briefings by theme"
      posts={getPostsByTaxonomy("theme", theme)}
    />
  );
}
