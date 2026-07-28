import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/blog/posts";
import { getTheme } from "@/lib/blog/taxonomy";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "The Awakening | AI leadership briefing";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const theme = post ? getTheme(post.theme) : null;
  const eyebrow = theme
    ? `The Awakening / ${theme.shortLabel}`
    : "The Awakening";
  const title = post?.title ?? "AI leadership briefings";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "rgb(0, 3, 76)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.08,
              textTransform: "uppercase",
              letterSpacing: -1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: 28,
            fontSize: 24,
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.6)" }}>
            AI Stakeholder Challenge
          </div>
          <div style={{ color: "rgb(99, 104, 218)" }}>Michael Steve</div>
        </div>
      </div>
    ),
    size
  );
}
