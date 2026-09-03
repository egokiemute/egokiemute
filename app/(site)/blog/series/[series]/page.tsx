import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import LenisScroll from "@/components/atoms/LenisScroll";
import PostCard from "@/components/blog/PostCard";
import { getAllSeries, getPostsBySeries, getSeriesBySlug } from "@/lib/blog/posts";
import { slugify } from "@/lib/blog/taxonomy";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const revalidate = 300;
export const dynamicParams = false;

type Params = { params: Promise<{ series: string }> };

export function generateStaticParams() {
  return getAllSeries().map((series) => ({ series: slugify(series) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { series: slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) return { title: "Series not found", robots: { index: false } };
  const posts = getPostsBySeries(series);

  return {
    title: series,
    description: `The "${series}" series — ${posts.length} post${posts.length === 1 ? "" : "s"}.`,
    alternates: { canonical: `/blog/series/${slug}` },
    openGraph: {
      title: `${series} | ${siteConfig.name}`,
      description: `The "${series}" series.`,
      url: absoluteUrl(`/blog/series/${slug}`),
      type: "website",
    },
  };
}

export default async function SeriesPage({ params }: Params) {
  const { series: slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) notFound();
  const posts = getPostsBySeries(series);

  return (
    <>
      <LenisScroll />
      <main className="min-h-screen bg-[#f7f6f2] text-[#121212]">
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-10">
          <section className="flex flex-col gap-4 pb-12 pt-12 lg:pt-20">
            <Link
              href="/blog"
              className="text-[11px] uppercase tracking-[0.24em] text-[#121212]/50 transition hover:text-[#121212]"
            >
              ← Blog
            </Link>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#121212]/50">Series</p>
            <h1 className="max-w-[20ch] text-[clamp(2.2rem,6vw,4.5rem)] font-medium leading-none tracking-[-0.06em]">
              {series}
            </h1>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#121212]/50">
              ({String(posts.length).padStart(2, "0")})
            </p>
          </section>

          <section className="grid grid-cols-1 gap-x-8 gap-y-14 border-t border-[#121212]/10 pt-12 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
