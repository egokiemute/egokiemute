import WritingsTemplate from "@/components/templates/WritingsTemplate";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const revalidate = 60;

export const metadata = {
  title: "Writing",
  description:
    "Writing on product, design, engineering, delivery, and building software with care.",
  keywords: [...siteConfig.keywords, "software engineering blog", "product blog"],
  alternates: {
    canonical: "/writings",
  },
  openGraph: {
    title: `Writing | ${siteConfig.name}`,
    description:
      "Essays and field notes on engineering, product thinking, design systems, and delivery.",
    url: absoluteUrl("/writings"),
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 1200,
        alt: `${siteConfig.name} writing preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Writing | ${siteConfig.name}`,
    description:
      "Essays and field notes on engineering, product thinking, design systems, and delivery.",
    images: [siteConfig.ogImage],
  },
};

export default async function WritingsPage() {
  const posts = await getAllPosts();
  const writingsJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": absoluteUrl("/writings#blog"),
        url: absoluteUrl("/writings"),
        name: `${siteConfig.name} Writing`,
        description: metadata.description,
        inLanguage: "en",
        publisher: {
          "@id": absoluteUrl("/#person"),
        },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: absoluteUrl(`/writings/${post.slug}`),
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
            name: "Writing",
            item: absoluteUrl("/writings"),
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(writingsJsonLd) }}
      />
      <WritingsTemplate posts={posts} />
    </>
  );
}
