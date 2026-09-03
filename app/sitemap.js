import { getAllPosts } from "@/lib/posts";
import {
  getAllPosts as getAllBlogPosts,
  getAllSeries,
  getAllTags,
} from "@/lib/blog/posts";
import { slugify } from "@/lib/blog/taxonomy";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap() {
  const blogPosts = await getAllPosts();
  const mdxPosts = getAllBlogPosts();

  const staticRoutes = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/writings"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const postRoutes = blogPosts.map((post) => ({
    url: absoluteUrl(`/writings/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const mdxPostRoutes = mdxPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(
      post.frontmatter.updatedAt ?? post.frontmatter.publishedAt,
    ),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const seriesRoutes = getAllSeries().map((series) => ({
    url: absoluteUrl(`/blog/series/${slugify(series)}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  const tagRoutes = getAllTags().map((tag) => ({
    url: absoluteUrl(`/blog/tag/${slugify(tag)}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.3,
  }));

  return [
    ...staticRoutes,
    ...postRoutes,
    ...mdxPostRoutes,
    ...seriesRoutes,
    ...tagRoutes,
  ];
}
