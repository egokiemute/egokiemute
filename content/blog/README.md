# The blog (`/blog`)

Every post is one `.mdx` file in this directory. There is no CMS and no database
for post content — a post ships when its file is committed. This is separate from
the Sanity-backed `/writings` section.

## Add a post

1. Create `content/blog/<slug>.mdx`. The filename (minus `.mdx`) is the URL slug:
   `content/blog/hello-world.mdx` → `/blog/hello-world`.
2. Add frontmatter (see the contract below). A malformed frontmatter block
   **fails `next build`** with the file name and the specific problem.
3. Write the body in Markdown + MDX. Use the components below with no import.
4. `npm run dev` and open `/blog/<slug>`.

Drafts (`draft: true`) render in `dev` but are excluded from the production
listing, `generateStaticParams`, the sitemap, and the RSS feed.

## Frontmatter contract

```yaml
---
title: "Post title"                 # required
description: "One or two sentences." # required — used for <meta>, OG, RSS
publishedAt: "2026-08-20"           # required — YYYY-MM-DD
updatedAt: "2026-09-01"            # optional — YYYY-MM-DD
series: "Mathematics Behind the Code" # optional
seriesOrder: 1                      # optional — integer, orders the series
tags: ["mathematics", "typescript"] # optional — string array, defaults to []
cover: "blog/hello/cover"          # optional — Cloudinary PUBLIC ID, never a URL
draft: false                       # optional — defaults to false
---
```

Unknown keys are rejected (the schema is strict). `cover` must be a Cloudinary
public ID — a value containing `http` or `res.cloudinary.com` is rejected.

## MDX components (no import needed)

| Component | Purpose |
| --- | --- |
| `<Callout type="note" \| "warning" \| "aside">…</Callout>` | Highlighted note. Optional `title` prop. |
| `<CloudinaryImage publicId="…" alt="…" width={1600} height={900} caption="…" />` | The only sanctioned image. `publicId` is a Cloudinary public ID; the component applies `f_auto,q_auto` and responsive widths. `caption` optional. |
| `<Figure caption="…">…</Figure>` | Captioned wrapper for non-image content (diagrams, embeds). |
| `<Wide>…</Wide>` | Breaks out of the reading column to full width — for wide code blocks, tables, diagrams. |

Standard Markdown elements (`##`–`####`, `a`, `pre`/`code`, `table`,
`blockquote`, lists, `hr`) are styled automatically — see
`lib/blog/mdx-components.tsx`. To add a component, drop it into `mdxComponents`
in that file; it is immediately usable in every post.

### Math

Inline math is `$…$`, block math is `$$…$$` (KaTeX). The KaTeX stylesheet is
loaded on post pages only.

### Code

Fenced code blocks are highlighted by `rehype-pretty-code` (Shiki) with a dual
light/dark theme. Add a language after the fence. Titles and line highlighting
use the standard `rehype-pretty-code` meta syntax:

````md
```ts title="birthday.ts" {3-4}
// ...
```
````

### Images

Upload the image to Cloudinary yourself, then reference it by public ID:

```mdx
<CloudinaryImage publicId="blog/my-post/diagram" alt="…" width={1600} height={900} />
```

Set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in the environment. Raw
`res.cloudinary.com` URLs must never appear in post source.

## Moderating a comment

Comments are hidden (`status: "pending"`) until approved. There is no dashboard.

When a comment is submitted, the server logs two URLs to the console:

```
[comment] approve: https://<site>/api/blog/comments/moderate?token=<MODERATION_SECRET>&id=<id>&action=approve
[comment] spam:    https://<site>/api/blog/comments/moderate?token=<MODERATION_SECRET>&id=<id>&action=spam
```

Open the relevant URL to act on it. If `RESEND_API_KEY` and
`MODERATION_NOTIFY_EMAIL` are set, the same links are emailed to you instead of
only logged. The `token` is compared against `MODERATION_SECRET` with a
timing-safe comparison.

Run `npm run ensure-indexes` once against your database to create the Mongo
indexes for likes and comments.
