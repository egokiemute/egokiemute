import { z } from "zod";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const isoDate = z
  .string()
  .regex(DATE_RE, "must be a YYYY-MM-DD date")
  .refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00Z`)), {
    message: "is not a real calendar date",
  });

export const frontmatterSchema = z
  .object({
    title: z.string().min(1, "is required"),
    description: z.string().min(1, "is required"),
    publishedAt: isoDate,
    updatedAt: isoDate.optional(),
    series: z.string().min(1).optional(),
    seriesOrder: z.number().int().nonnegative().optional(),
    tags: z.array(z.string().min(1)).default([]),
    cover: z
      .string()
      .min(1)
      .refine((value) => !/^https?:\/\//i.test(value) && !value.includes("res.cloudinary.com"), {
        message:
          "must be a Cloudinary public ID, not a URL (e.g. `blog/pigeonhole/cover`)",
      })
      .optional(),
    draft: z.boolean().default(false),
  })
  .strict();

export type PostFrontmatter = z.infer<typeof frontmatterSchema>;

/**
 * Validate raw frontmatter for a post. Throws a descriptive error so that a bad
 * post fails `next build` loudly with the offending file named.
 */
export function parseFrontmatter(raw: unknown, slug: string): PostFrontmatter {
  const result = frontmatterSchema.safeParse(raw);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"} ${issue.message}`)
      .join("\n");
    throw new Error(
      `Invalid frontmatter in content/blog/${slug}.mdx:\n${details}`,
    );
  }
  return result.data;
}
