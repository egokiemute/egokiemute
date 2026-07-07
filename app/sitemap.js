import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap() {
  const blogPosts = await getAllPosts();
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
  ];

  const postRoutes = blogPosts.map((post) => ({
    url: absoluteUrl(`/writings/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
