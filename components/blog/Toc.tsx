"use client";

import { useEffect, useState } from "react";

import type { TocEntry } from "@/lib/blog/toc";

export default function Toc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (entries.length === 0) return;
    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 2) return null;

  const list = (
    <ul className="space-y-2 text-[13px] leading-snug">
      {entries.map((entry) => (
        <li key={entry.id} className={entry.depth === 3 ? "pl-3" : ""}>
          <a
            href={`#${entry.id}`}
            className={`transition hover:text-[#121212] ${
              activeId === entry.id ? "text-[#121212]" : "text-[#121212]/50"
            }`}
          >
            {entry.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile: collapsed */}
      <details className="mb-10 border-y border-[#121212]/10 py-3 lg:hidden">
        <summary className="cursor-pointer text-[11px] uppercase tracking-[0.24em] text-[#121212]/50">
          Contents
        </summary>
        <nav className="mt-4">{list}</nav>
      </details>

      {/* Desktop: sticky rail */}
      <nav className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block">
        <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#121212]/40">
          Contents
        </p>
        {list}
      </nav>
    </>
  );
}
