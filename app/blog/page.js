import LenisScroll from "@/components/LenisScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { blogPosts } from "./blogData";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export const metadata = {
  title: "Blog",
  description:
    "Writing on product, design, engineering, delivery, and building software with care.",
  keywords: [...siteConfig.keywords, "software engineering blog", "product blog"],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description:
      "Essays and field notes on engineering, product thinking, design systems, and delivery.",
    url: absoluteUrl("/blog"),
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 1200,
        alt: `${siteConfig.name} blog preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${siteConfig.name}`,
    description:
      "Essays and field notes on engineering, product thinking, design systems, and delivery.",
    images: [siteConfig.ogImage],
  },
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": absoluteUrl("/blog#blog"),
        url: absoluteUrl("/blog"),
        name: `${siteConfig.name} Blog`,
        description: metadata.description,
        inLanguage: "en",
        publisher: {
          "@id": absoluteUrl("/#person"),
        },
        blogPost: blogPosts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: absoluteUrl(`/blog/${post.slug}`),
          datePublished: post.date,
          articleSection: post.category,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: absoluteUrl("/blog"),
          },
        ],
      },
    ],
  };

  return (
    <>
      <LenisScroll />
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <main className="w-11/12 max-w-6xl mx-auto pt-28 pb-20">
        <section className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 border-b border-gray-200 pb-10">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Journal
            </p>
            <h1 className="font-Ovo text-4xl sm:text-6xl leading-tight mt-4">
              Notes on building products with care and momentum.
            </h1>
          </div>
          <p className="max-w-md text-gray-600">
            Short essays and field notes on design, engineering, and the work of
            shipping.
          </p>
        </section>

        {featured ? (
          <section className="mt-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
            <div className="rounded-[32px] border border-gray-200 bg-white p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Featured
                </p>
                <h2 className="font-Ovo text-3xl sm:text-4xl mt-4">
                  {featured.title}
                </h2>
                <p className="text-gray-600 mt-4">{featured.excerpt}</p>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
                <span>{formatDate(featured.date)}</span>
                <span>•</span>
                <span>{featured.readTime}</span>
              </div>
              <Link
                href={`/blog/${featured.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium"
              >
                Read article
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="rounded-[32px] border border-gray-200 bg-gradient-to-br from-[#f7f1ff] via-white to-[#f6f2e8] p-10 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Topic
                </p>
                <h3 className="font-Ovo text-2xl sm:text-3xl mt-4">
                  {featured.category}
                </h3>
              </div>
              <div className="mt-10 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs uppercase tracking-[0.3em] border border-gray-300 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-[28px] border border-gray-200 bg-white p-6 sm:p-8 flex flex-col gap-6 hover:shadow-md transition"
            >
              <div className="h-36 rounded-[22px] bg-gradient-to-br from-[#111111] via-[#222222] to-[#3c3c3c] text-white p-6 flex flex-col justify-end">
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                  {post.category}
                </p>
                <h3 className="font-Ovo text-2xl mt-2">{post.title}</h3>
              </div>
              <p className="text-gray-600">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>{formatDate(post.date)}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={`${post.slug}-${tag}`}
                    className="text-xs uppercase tracking-[0.3em] border border-gray-300 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
          {rest.length === 0 && featured ? (
            <div className="rounded-[28px] border border-dashed border-gray-300 p-8 text-gray-500">
              More posts coming soon.
            </div>
          ) : null}
          {rest.length === 0 && !featured ? (
            <div className="rounded-[28px] border border-dashed border-gray-300 p-8 text-gray-500">
              No posts published yet.
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </>
  );
}
