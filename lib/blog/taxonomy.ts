/** URL-safe slug for a series/tag label (e.g. for `/blog/series/:slug`). */
export function slugify(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
