import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";

export default function WritingCard({ post }) {
  return (
    <Link href={`/writings/${post.slug}`} className="group flex flex-col gap-5">
      <div className="relative aspect-[2/1] overflow-hidden bg-[#121212]/5">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="max-w-[24ch] text-2xl font-medium leading-[1.05] tracking-[-0.04em] text-[#121212] sm:text-3xl">
          {post.title}
        </h3>

        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em]">
          <span className="text-[#121212]/50">{formatDate(post.date)}</span>
          <span className="border-b border-[#121212] pb-1 text-[#121212] transition group-hover:text-[#121212]/60 group-hover:border-[#121212]/60">
            Read now
          </span>
        </div>
      </div>
    </Link>
  );
}
