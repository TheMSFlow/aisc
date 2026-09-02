import { getAllPosts } from "@/lib/blog/posts";
import {
  ALL_AUDIENCE_IDS,
  ALL_INDUSTRY_IDS,
  ALL_THEME_IDS,
} from "@/lib/blog/taxonomy";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function sitemap() {
  const posts = getAllPosts();

  const staticEntries = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/personalize`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/awakening`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-apprentice`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Add entries as these surfaces ship:
    // `${baseUrl}/coaching`
  ];

  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/awakening/${post.slug}`,
    lastModified: new Date(`${post.updated ?? post.date}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryEntries = [
    ...ALL_INDUSTRY_IDS.map((id) => `${baseUrl}/awakening/industry/${id}`),
    ...ALL_AUDIENCE_IDS.map((id) => `${baseUrl}/awakening/for/${id}`),
    ...ALL_THEME_IDS.map((id) => `${baseUrl}/awakening/theme/${id}`),
  ].map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticEntries, ...postEntries, ...categoryEntries];
}
