import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import Link from "next/link";

import Callout from "@/components/blog/Callout";
import CloudinaryImage from "@/components/blog/CloudinaryImage";
import Figure from "@/components/blog/Figure";
import Wide from "@/components/blog/Wide";

/**
 * The single component map handed to every post. Add a component here and it is
 * usable in any `.mdx` file with no import. Element overrides below style raw
 * Markdown to match the site.
 */

function A({ href = "", children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const className =
    "underline underline-offset-4 decoration-[#121212]/30 transition hover:decoration-[#121212]";
  const isExternal = /^https?:\/\//.test(href);
  const isAnchor = href.startsWith("#");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
        {children}
      </a>
    );
  }
  if (isAnchor) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

const H = (Tag: "h2" | "h3" | "h4", classes: string) => {
  function Heading({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return (
      <Tag
        className={`group scroll-mt-24 font-medium text-[#121212] ${classes} ${className ?? ""}`}
        {...props}
      />
    );
  }
  Heading.displayName = `Mdx${Tag.toUpperCase()}`;
  return Heading;
};

export const mdxComponents = {
  Callout,
  CloudinaryImage,
  Figure,
  Wide,

  h2: H("h2", "mt-14 mb-4 text-[1.6rem] leading-tight tracking-[-0.03em]"),
  h3: H("h3", "mt-10 mb-3 text-[1.25rem] leading-tight tracking-[-0.02em]"),
  h4: H("h4", "mt-8 mb-2 text-[1.05rem] leading-tight"),

  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-5" {...props} />
  ),

  a: A,

  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-5 list-disc space-y-2 pl-6 marker:text-[#121212]/40" {...props} />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-5 list-decimal space-y-2 pl-6 marker:text-[#121212]/40" {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => <li className="leading-7" {...props} />,

  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-2 border-[#121212]/20 pl-5 text-[#121212]/70 italic"
      {...props}
    />
  ),

  hr: () => <hr className="my-12 border-t border-[#121212]/10" />,

  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto border border-[#121212]/10 py-4 text-[13px] leading-6"
      {...props}
    />
  ),

  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-[#121212]/[0.06] px-1.5 py-0.5 text-[0.9em]"
      {...props}
    />
  ),

  table: (props: HTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b border-[#121212]/20" {...props} />
  ),
  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-3 py-2 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-[#121212]/60"
      {...props}
    />
  ),
  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-b border-[#121212]/10 px-3 py-2 align-top" {...props} />
  ),

  img: (props: HTMLAttributes<HTMLImageElement>) => (
    // Posts should use <CloudinaryImage/>. This keeps a stray Markdown image
    // from breaking layout.
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img className="my-8 h-auto w-full" {...props} />
  ),
};

export type MdxComponents = typeof mdxComponents;
