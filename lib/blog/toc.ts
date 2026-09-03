import GithubSlugger from "github-slugger";

export type TocEntry = {
  depth: 2 | 3;
  text: string;
  id: string;
};

const HEADING_RE = /^(#{2,3})\s+(.+?)\s*#*\s*$/;

/**
 * Pull `##` / `###` headings out of raw MDX for the table of contents. Fenced
 * code blocks are skipped, and ids are generated with the same slugger
 * (`github-slugger`) that `rehype-slug` uses, so anchors line up.
 */
export function extractToc(source: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inFence = false;

  for (const line of source.split("\n")) {
    const fence = line.match(/^\s*(```|~~~)/);
    if (fence) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = line.match(HEADING_RE);
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    // Strip inline markdown/MDX noise (`code`, **bold**, _em_, links, math).
    const text = match[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/(\*|_)([^*_]+)\1/g, "$2")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/\$([^$]+)\$/g, "$1")
      .trim();

    entries.push({ depth, text, id: slugger.slug(text) });
  }

  return entries;
}
