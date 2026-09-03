import Link from "next/link";

import CloudinaryImage from "@/components/blog/CloudinaryImage";
import type { Post } from "@/lib/blog/posts";
import { formatDate } from "@/lib/format";

export default function PostCard({ post }: { post: Post }) {
  const { slug, frontmatter, readingMinutes } = post;

  return (
    <Link href={`/blog/${slug}`} className="group flex flex-col gap-5">
      <div className="relative aspect-[2/1] overflow-hidden bg-[#121212]/5">
        {frontmatter.cover ? (
          <CloudinaryImage
            publicId={frontmatter.cover}
            alt={frontmatter.title}
            width={900}
            height={450}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        {frontmatter.draft ? (
          <span className="w-fit border border-[#8a5a00]/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.24em] text-[#8a5a00]">
            Draft
          </span>
        ) : null}
        <h3 className="max-w-[24ch] text-2xl font-medium leading-[1.05] tracking-[-0.04em] text-[#121212] sm:text-3xl">
          {frontmatter.title}
        </h3>
        <p className="max-w-[46ch] text-sm leading-7 text-[#121212]/70">
          {frontmatter.description}
        </p>
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em]">
          <span className="text-[#121212]/50">
            {formatDate(frontmatter.publishedAt)} · {readingMinutes} min
          </span>
          <span className="border-b border-[#121212] pb-1 text-[#121212] transition group-hover:border-[#121212]/60 group-hover:text-[#121212]/60">
            Read now
          </span>
        </div>
      </div>
    </Link>
  );
}
