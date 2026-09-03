import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import "katex/dist/katex.min.css";
import "../blog.css";

import LenisScroll from "@/components/atoms/LenisScroll";
import PrevNext from "@/components/blog/PrevNext";
import Prose from "@/components/blog/Prose";
import SeriesNav from "@/components/blog/SeriesNav";
import Toc from "@/components/blog/Toc";
import { Mdx } from "@/lib/blog/mdx";
import { extractToc } from "@/lib/blog/toc";
import {
  getAdjacentPosts,
  getAllSlugs,
  getPostBySlug,
} from "@/lib/blog/posts";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { slugify } from "@/lib/blog/taxonomy";
import { formatDate } from "@/lib/format";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const revalidate = 300;
export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/** Cover-derived OG image, or `null` to let the generated opengraph-image route serve it. */
function coverOgImage(cover?: string): string | null {
  return cover ? cloudinaryUrl(cover, { width: 1200, height: 630, crop: "fill" }) : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: false } };
  }

  const { frontmatter } = post;
  const url = absoluteUrl(`/blog/${slug}`);
  const cover = coverOgImage(frontmatter.cover);
  // When there is no cover, omit `images` entirely so Next attaches the
  // generated `opengraph-image` route automatically.
  const images = cover
    ? [{ url: cover, width: 1200, height: 630, alt: frontmatter.title }]
    : undefined;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: [...siteConfig.keywords, ...frontmatter.tags],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${frontmatter.title} | ${siteConfig.name}`,
      description: frontmatter.description,
      url,
      type: "article",
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt ?? frontmatter.publishedAt,
      authors: [siteConfig.name],
      tags: frontmatter.tags,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${frontmatter.title} | ${siteConfig.name}`,
      description: frontmatter.description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || (post.frontmatter.draft && process.env.NODE_ENV === "production")) {
    notFound();
  }

  const { frontmatter, content, readingMinutes } = post;
  const toc = extractToc(content);
  const { prev, next } = getAdjacentPosts(post);
  const url = absoluteUrl(`/blog/${slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: frontmatter.title,
        description: frontmatter.description,
        datePublished: frontmatter.publishedAt,
        dateModified: frontmatter.updatedAt ?? frontmatter.publishedAt,
        keywords: frontmatter.tags.join(", "),
        url,
        mainEntityOfPage: url,
        image: coverOgImage(frontmatter.cover) ?? siteConfig.ogImage,
        author: { "@id": absoluteUrl("/#person") },
        publisher: { "@id": absoluteUrl("/#person") },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: frontmatter.title, item: url },
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
      <main className="min-h-screen bg-[#f7f6f2] text-[#121212] pt-12">
        <div className="mx-auto w-full max-w-[1240px] px-5 pb-20 pt-12 sm:px-8 lg:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#121212]/50 transition hover:text-[#121212]"
          >
            <span aria-hidden="true">←</span>
            Back to blog
          </Link>

          <article className="mt-10">
            <header className="border-b border-[#121212]/10 pb-10">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.24em] text-[#121212]/50">
                <span>{formatDate(frontmatter.publishedAt)}</span>
                <span aria-hidden="true">·</span>
                <span>{readingMinutes} min read</span>
                {frontmatter.updatedAt ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Updated {formatDate(frontmatter.updatedAt)}</span>
                  </>
                ) : null}
              </div>
              <h1 className="mt-4 max-w-[20ch] text-[clamp(2.2rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.05em]">
                {frontmatter.title}
              </h1>
              <p className="mt-5 max-w-[840px] text-sm leading-7 text-[#121212]/70 sm:text-[15px]">
                {frontmatter.description}
              </p>
              {frontmatter.tags.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.24em] text-[#121212]/50">
                  {frontmatter.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${slugify(tag)}`}
                      className="transition hover:text-[#121212]"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              ) : null}
            </header>

            <div className="mt-12 grid grid-cols-1 gap-x-16 lg:grid-cols-[minmax(0,1fr)_13rem]">
              {/* DOM order puts the collapsible mobile TOC above the article;
                  grid placement moves the rail to the right column on desktop. */}
              <aside className="lg:col-start-2 lg:row-start-1">
                <Toc entries={toc} />
              </aside>

              <div className="min-w-0 lg:col-start-1 lg:row-start-1">
                {frontmatter.series ? (
                  <SeriesNav series={frontmatter.series} currentSlug={slug} />
                ) : null}
                <Prose>
                  <Mdx source={content} />
                </Prose>
                <PrevNext prev={prev} next={next} />
              </div>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
