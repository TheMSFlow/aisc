const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const AUTHOR = {
  "@type": "Person",
  name: "Michael Steve",
  jobTitle: "AI Clarity Consultant",
  url: SITE_URL,
};

const PUBLISHER = {
  "@type": "Organization",
  name: "Michael Steve Clarity Studio",
  url: SITE_URL,
};

export function articleJsonLd(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}/awakening/${post.slug}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: AUTHOR,
    publisher: PUBLISHER,
    wordCount: post.wordCount,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/awakening/${post.slug}`,
    },
    isPartOf: {
      "@type": "Blog",
      name: "The Awakening",
      "@id": `${SITE_URL}/awakening`,
    },
  };
}

/**
 * @param {{ name: string, path: string }[]} items ordered from root to leaf
 */
export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function collectionJsonLd({ name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: {
      "@type": "Blog",
      name: "The Awakening",
      "@id": `${SITE_URL}/awakening`,
    },
  };
}

export function blogJsonLd(posts) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/awakening`,
    name: "The Awakening",
    description:
      "Briefings, guides, and insights on AI leadership for Chiefs, Leaders of Leaders, and Emerging Leaders.",
    url: `${SITE_URL}/awakening`,
    publisher: PUBLISHER,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/awakening/${post.slug}`,
      datePublished: post.date,
      author: AUTHOR,
    })),
  };
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
