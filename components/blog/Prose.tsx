import type { ReactNode } from "react";

/**
 * The reading column. Kept narrow for line length; `<Wide>` inside a post
 * deliberately escapes it.
 */
export default function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mdx-prose max-w-[840px] text-[15px] leading-7 text-[#121212]/80 sm:text-base">
      {children}
    </div>
  );
}
