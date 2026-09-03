import { buildRssFeed } from "@/lib/blog/rss";

export const revalidate = 3600;

export function GET() {
  return new Response(buildRssFeed(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
