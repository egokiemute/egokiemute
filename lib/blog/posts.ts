import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import matter from "gray-matter";

import { parseFrontmatter, type PostFrontmatter } from "@/lib/blog/schema";
import { slugify } from "@/lib/blog/taxonomy";

const BLOG_DIR = join(process.cwd(), "content", "blog");

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingMinutes: number;
};

function readingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function listSlugs(): string[] {
  if (!existsSync(BLOG_DIR)) return [];
  return readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

/** All post slugs on disk, drafts included. Used by `generateStaticParams`. */
export function getAllSlugs(): string[] {
  return listSlugs();
}

const loadPost = cache((slug: string): Post | null => {
  const file = join(BLOG_DIR, `${slug}.mdx`);
  if (!existsSync(file)) return null;
  const raw = readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = parseFrontmatter(data, slug); // throws -> build fails loudly
  return { slug, frontmatter, content, readingMinutes: readingMinutes(content) };
});

export function getPostBySlug(slug: string): Post | null {
  return loadPost(slug);
}

function isVisible(post: Post): boolean {
  return !post.frontmatter.draft || process.env.NODE_ENV !== "production";
}

function byNewest(a: Post, b: Post): number {
  return b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt);
}

/** Visible posts, newest first. Drafts are excluded in production only. */
export const getAllPosts = cache((): Post[] => {
  return listSlugs()
    .map((slug) => loadPost(slug))
    .filter((post): post is Post => post !== null)
    .filter(isVisible)
    .sort(byNewest);
});

export function getPostsBySeries(series: string): Post[] {
  return getAllPosts()
    .filter((post) => post.frontmatter.series === series)
    .sort((a, b) => {
      const ao = a.frontmatter.seriesOrder ?? Number.MAX_SAFE_INTEGER;
      const bo = b.frontmatter.seriesOrder ?? Number.MAX_SAFE_INTEGER;
      return ao - bo || byNewest(a, b) * -1;
    });
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) =>
    post.frontmatter.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
  );
}

export function getAllSeries(): string[] {
  return Array.from(
    new Set(
      getAllPosts()
        .map((post) => post.frontmatter.series)
        .filter((s): s is string => Boolean(s)),
    ),
  );
}

export function getAllTags(): string[] {
  return Array.from(
    new Set(getAllPosts().flatMap((post) => post.frontmatter.tags)),
  ).sort((a, b) => a.localeCompare(b));
}

/** Resolve a `/blog/series/:slug` URL segment back to the series' display name. */
export function getSeriesBySlug(slug: string): string | null {
  return getAllSeries().find((series) => slugify(series) === slug) ?? null;
}

/** Resolve a `/blog/tag/:slug` URL segment back to the tag's display name. */
export function getTagBySlug(slug: string): string | null {
  return getAllTags().find((tag) => slugify(tag) === slug) ?? null;
}

/**
 * Previous / next relative to a post: within the same series by `seriesOrder`
 * when `series` is set, otherwise chronological across all posts.
 */
export function getAdjacentPosts(post: Post): { prev: Post | null; next: Post | null } {
  const list = post.frontmatter.series
    ? getPostsBySeries(post.frontmatter.series)
    : [...getAllPosts()].reverse(); // oldest -> newest for natural prev/next
  const index = list.findIndex((p) => p.slug === post.slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? list[index - 1] : null,
    next: index < list.length - 1 ? list[index + 1] : null,
  };
}
