import { notFound } from "next/navigation";
import WritingPostTemplate from "@/components/templates/WritingPostTemplate";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const revalidate = 60;

export const generateStaticParams = async () => {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const postImage = post.image ? absoluteUrl(post.image) : siteConfig.ogImage;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...siteConfig.keywords, ...post.tags, post.category],
    alternates: {
      canonical: `/writings/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      url: absoluteUrl(`/writings/${post.slug}`),
      type: "article",
      publishedTime: post.date,
      authors: [siteConfig.name],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: `${post.title} by ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      images: [postImage],
    },
  };
};

export default async function WritingPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const posts = await getAllPosts();
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const postImage = post.image ? absoluteUrl(post.image) : siteConfig.ogImage;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": absoluteUrl(`/writings/${post.slug}#article`),
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        articleSection: post.category,
        keywords: post.tags.join(", "),
        url: absoluteUrl(`/writings/${post.slug}`),
        mainEntityOfPage: absoluteUrl(`/writings/${post.slug}`),
        image: postImage,
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
            name: "Writing",
            item: absoluteUrl("/writings"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: absoluteUrl(`/writings/${post.slug}`),
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <WritingPostTemplate post={post} related={related} />
    </>
  );
}
