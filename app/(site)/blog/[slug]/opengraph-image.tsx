import { ImageResponse } from "next/og";

import { getPostBySlug } from "@/lib/blog/posts";
import { siteConfig } from "@/lib/site";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { params: Promise<{ slug: string }> };

export default async function OgImage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.frontmatter.title ?? "Blog";
  const description = post?.frontmatter.description ?? siteConfig.description;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f6f2",
          color: "#121212",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(18,18,18,0.5)",
          }}
        >
          {siteConfig.name} — Blog
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            {title}
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: "rgba(18,18,18,0.7)" }}>
            {description.length > 140 ? `${description.slice(0, 140)}…` : description}
          </div>
        </div>
        <div style={{ fontSize: 22, color: "rgba(18,18,18,0.5)" }}>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
      </div>
    ),
    { ...size },
  );
}
