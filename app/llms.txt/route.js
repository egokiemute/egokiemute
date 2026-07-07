import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

// llms.txt convention (https://llmstxt.org): a plain-text summary that lets
// AI agents understand and navigate the site without parsing rendered HTML.
export const revalidate = 60;

export async function GET() {
  const posts = await getAllPosts();

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## Pages",
    `- [Home](${absoluteUrl("/")}): Portfolio, selected work, and background for ${siteConfig.name}, a ${siteConfig.role} based in ${siteConfig.location}.`,
    `- [Writing](${absoluteUrl("/writings")}): Essays on product, engineering, and building marketplaces.`,
    "",
    "## Writing",
    ...posts.map(
      (post) =>
        `- [${post.title}](${absoluteUrl(`/writings/${post.slug}`)}): ${post.excerpt}`,
    ),
    "",
    "## Contact",
    `- Email: ${siteConfig.email}`,
    ...siteConfig.sameAs.map((url) => `- ${url}`),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
