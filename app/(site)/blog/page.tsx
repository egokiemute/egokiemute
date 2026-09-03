import type { Metadata } from "next";
import Link from "next/link";

import LenisScroll from "@/components/atoms/LenisScroll";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts, getAllTags } from "@/lib/blog/posts";
import { slugify } from "@/lib/blog/taxonomy";
import { absoluteUrl, siteConfig } from "@/lib/site";

const description =
  "Technical essays on engineering, the mathematics behind everyday code, and building software with care.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  keywords: [...siteConfig.keywords, "engineering blog", "mathematics behind the code"],
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": absoluteUrl("/blog/rss.xml") },
  },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description,
    url: absoluteUrl("/blog"),
    type: "website",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 1200, alt: `${siteConfig.name} blog` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${siteConfig.name}`,
    description,
    images: [siteConfig.ogImage],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": absoluteUrl("/blog#blog"),
        url: absoluteUrl("/blog"),
        name: `${siteConfig.name} Blog`,
        description,
        inLanguage: "en",
        publisher: { "@id": absoluteUrl("/#person") },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.frontmatter.title,
          url: absoluteUrl(`/blog/${post.slug}`),
          datePublished: post.frontmatter.publishedAt,
          dateModified: post.frontmatter.updatedAt ?? post.frontmatter.publishedAt,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LenisScroll />
      <main className="min-h-screen bg-[#f7f6f2] text-[#121212]">
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-10">
          <section className="flex flex-col gap-6 pb-12 pt-12 lg:flex-row lg:items-end lg:justify-between lg:pt-20">
            <div>
              <h1 className="text-[clamp(2.7rem,7vw,5.5rem)] font-medium lowercase leading-none tracking-[-0.08em]">
                blog
              </h1>
              <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-[#121212]/50">
                ({String(posts.length).padStart(2, "0")})
              </p>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#121212]/70 sm:text-[15px]">
              {description}
            </p>
          </section>

          {tags.length > 0 ? (
            <section className="flex flex-wrap gap-x-4 gap-y-2 border-t border-[#121212]/10 pt-6 text-[11px] uppercase tracking-[0.24em] text-[#121212]/50">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${slugify(tag)}`}
                  className="transition hover:text-[#121212]"
                >
                  #{tag}
                </Link>
              ))}
            </section>
          ) : null}

          <section className="grid grid-cols-1 gap-x-8 gap-y-14 border-t border-[#121212]/10 pt-12 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
            {posts.length === 0 ? (
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#121212]/50">
                No posts published yet.
              </p>
            ) : null}
          </section>
        </div>
      </main>
    </>
  );
}
