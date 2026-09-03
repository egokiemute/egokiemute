import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";

import { mdxComponents } from "@/lib/blog/mdx-components";

const prettyCodeOptions: PrettyCodeOptions = {
  // Dual theme -> Shiki emits CSS vars for both; blog.css activates the dark set
  // under `prefers-color-scheme: dark`.
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
  defaultLang: { block: "text" },
};

/**
 * Server-only MDX renderer. Posts are trusted repo content, so full MDX
 * expression support is enabled (`blockJS: false`).
 */
export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        parseFrontmatter: false,
        blockJS: false,
        blockDangerousJS: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
            rehypeKatex,
            [rehypePrettyCode, prettyCodeOptions],
          ],
        },
      }}
    />
  );
}
