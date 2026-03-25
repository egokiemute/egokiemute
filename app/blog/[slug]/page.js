import LenisScroll from "@/components/LenisScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { blogPosts, getAllPostSlugs, getPostBySlug } from "../blogData";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export const generateStaticParams = () =>
  getAllPostSlugs().map((slug) => ({ slug }));

export const generateMetadata = ({ params }) => {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Post not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...siteConfig.keywords, ...post.tags, post.category],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      url: absoluteUrl(`/blog/${post.slug}`),
      type: "article",
      publishedTime: post.date,
      authors: [siteConfig.name],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 1200,
          alt: `${post.title} by ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      images: [siteConfig.ogImage],
    },
  };
};

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": absoluteUrl(`/blog/${post.slug}#article`),
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        articleSection: post.category,
        keywords: post.tags.join(", "),
        url: absoluteUrl(`/blog/${post.slug}`),
        mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        image: siteConfig.ogImage,
        author: {
          "@id": absoluteUrl("/#person"),
        },
        publisher: {
          "@id": absoluteUrl("/#person"),
        },
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
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: absoluteUrl(`/blog/${post.slug}`),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <main className="w-11/12 max-w-5xl mx-auto pt-28 pb-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500"
        >
          <span aria-hidden="true">←</span>
          Back to blog
        </Link>

        <header className="mt-8 border-b border-gray-200 pb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
            {post.category}
          </p>
          <h1 className="font-Ovo text-4xl sm:text-5xl mt-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <section className="mt-10 space-y-10">
          {post.sections.map((section) => (
            <article key={section.heading} className="space-y-3">
              <h2 className="font-Ovo text-2xl">{section.heading}</h2>
              <p className="text-gray-600 leading-7">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-14 rounded-[28px] border border-gray-200 bg-white p-8 sm:p-10">
          <h3 className="font-Ovo text-2xl">Keep reading</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="rounded-[22px] border border-gray-200 p-6 hover:shadow-md transition"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  {item.category}
                </p>
                <h4 className="font-Ovo text-xl mt-3">{item.title}</h4>
                <p className="text-gray-600 mt-3">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
