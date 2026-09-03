import type { ReactNode } from "react";

/** Captioned wrapper for non-image content: diagrams, embeds, demos, tables. */
export default function Figure({
  caption,
  children,
}: {
  caption?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto border border-[#121212]/10 bg-[#121212]/[0.02] p-4">
        {children}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-[11px] uppercase tracking-[0.24em] text-[#121212]/45">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
