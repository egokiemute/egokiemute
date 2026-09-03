import { cloudinaryUrl, isCloudinaryConfigured } from "@/lib/cloudinary";

const WIDTHS = [420, 640, 840, 1080, 1280, 1600];

/**
 * The only sanctioned way to put an image in a post. Takes a Cloudinary public
 * ID (never a URL) and server-renders a responsive `<img>` whose candidates are
 * `f_auto,q_auto` Cloudinary transforms at a range of widths. No client JS.
 */
export default function CloudinaryImage({
  publicId,
  alt,
  caption,
  width,
  height,
  sizes = "(min-width: 840px) 840px, 100vw",
  priority = false,
}: {
  publicId: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
}) {
  if (!isCloudinaryConfigured) {
    return (
      <span className="my-8 flex aspect-[16/9] items-center justify-center bg-[#121212]/5 px-4 text-center text-[11px] uppercase tracking-[0.24em] text-[#121212]/40">
        image unavailable — set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      </span>
    );
  }

  const srcSet = WIDTHS.map(
    (w) => `${cloudinaryUrl(publicId, { width: w })} ${w}w`,
  ).join(", ");

  const img = (
    <img
      src={cloudinaryUrl(publicId, { width: 1080 })}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      // eslint-disable-next-line @next/next/no-img-element
      className="h-auto w-full bg-[#121212]/5"
    />
  );

  if (!caption) {
    return <span className="my-8 block overflow-hidden">{img}</span>;
  }

  return (
    <figure className="my-8">
      <span className="block overflow-hidden">{img}</span>
      <figcaption className="mt-3 text-[11px] uppercase tracking-[0.24em] text-[#121212]/45">
        {caption}
      </figcaption>
    </figure>
  );
}
