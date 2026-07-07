import { sanityClient } from "@/lib/sanity";
import { blogPosts as localPosts } from "@/app/(site)/writings/blogData";

const postProjection = `{
  "slug": slug.current,
  title,
  "date": coalesce(date, _createdAt),
  readTime,
  category,
  excerpt,
  "tags": coalesce(tags, []),
  "image": image.asset->url,
  sections[]{ heading, body }
}`;

// Local blogData remains the fallback until the Sanity dataset has published posts.
export async function getAllPosts() {
  if (!sanityClient) {
    return localPosts;
  }

  try {
    const posts = await sanityClient.fetch(
      `*[_type == "post" && defined(slug.current)] | order(date desc) ${postProjection}`,
    );
    return posts.length > 0 ? posts : localPosts;
  } catch (error) {
    console.error("Failed to fetch posts from Sanity:", error.message);
    return localPosts;
  }
}

export async function getPostBySlug(slug) {
  if (sanityClient) {
    try {
      const post = await sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug][0] ${postProjection}`,
        { slug },
      );
      if (post) {
        return post;
      }
    } catch (error) {
      console.error("Failed to fetch post from Sanity:", error.message);
    }
  }

  return localPosts.find((post) => post.slug === slug) ?? null;
}
