import Link from "next/link";

import { getPostsBySeries } from "@/lib/blog/posts";
import { slugify } from "@/lib/blog/taxonomy";

/** "Part N of <series>" strip shown on posts that belong to a series. */
export default function SeriesNav({
  series,
  currentSlug,
}: {
  series: string;
  currentSlug: string;
}) {
  const posts = getPostsBySeries(series);
  if (posts.length < 2) return null;
  const index = posts.findIndex((post) => post.slug === currentSlug);

  return (
    <div className="my-8 border border-[#121212]/10 bg-[#121212]/[0.02] p-5">
      <p className="text-[10px] uppercase tracking-[0.24em] text-[#121212]/40">
        {index >= 0 ? `Part ${index + 1} of ${posts.length} · ` : ""}
        <Link
          href={`/blog/series/${slugify(series)}`}
          className="underline underline-offset-4 hover:text-[#121212]"
        >
          {series}
        </Link>
      </p>
      <ol className="mt-3 space-y-1.5 text-sm">
        {posts.map((post, i) => (
          <li key={post.slug} className="flex gap-2 text-[#121212]/70">
            <span className="text-[#121212]/40">{i + 1}.</span>
            {post.slug === currentSlug ? (
              <span className="text-[#121212]">{post.frontmatter.title}</span>
            ) : (
              <Link
                href={`/blog/${post.slug}`}
                className="transition hover:text-[#121212]"
              >
                {post.frontmatter.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
