import { formatDate } from "@/lib/format";

export default function PostMeta({ date, readTime, className }) {
  return (
    <div
      className={
        className ??
        "flex items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-[#121212]/50"
      }
    >
      <span>{formatDate(date)}</span>
      <span>•</span>
      <span>{readTime}</span>
    </div>
  );
}
