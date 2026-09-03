import Link from "next/link";

import type { Post } from "@/lib/blog/posts";

function Item({ post, direction }: { post: Post; direction: "prev" | "next" }) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col gap-2 border-t border-[#121212]/10 pt-5 ${
        isPrev ? "items-start text-left" : "items-end text-right"
      }`}
    >
      <span className="text-[10px] uppercase tracking-[0.24em] text-[#121212]/40">
        {isPrev ? "← Previous" : "Next →"}
      </span>
      <span className="text-lg font-medium leading-tight tracking-[-0.02em] transition group-hover:text-[#121212]/60">
        {post.frontmatter.title}
      </span>
    </Link>
  );
}

export default function PrevNext({
  prev,
  next,
}: {
  prev: Post | null;
  next: Post | null;
}) {
  if (!prev && !next) return null;
  return (
    <nav className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {prev ? <Item post={prev} direction="prev" /> : <span />}
      {next ? <Item post={next} direction="next" /> : <span />}
    </nav>
  );
}
