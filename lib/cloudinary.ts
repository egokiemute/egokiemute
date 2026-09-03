const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

type CloudinaryOptions = {
  width?: number;
  height?: number;
  /** Crop mode. `limit` never upscales; `fill` crops to an exact box. */
  crop?: "limit" | "fill" | "fit";
  quality?: string;
};

/**
 * Build a Cloudinary delivery URL from a public ID. Always applies `f_auto`
 * (format negotiation) and `q_auto` (quality). Post source only ever references
 * public IDs — raw `res.cloudinary.com` URLs never appear in MDX.
 */
export function cloudinaryUrl(publicId: string, options: CloudinaryOptions = {}): string {
  const { width, height, crop = "limit", quality = "auto" } = options;
  if (!CLOUD_NAME) {
    // Misconfiguration: surface the public ID rather than a broken host.
    return `/_cloudinary-not-configured/${publicId}`;
  }
  const transforms = [`f_auto`, `q_${quality}`, `c_${crop}`];
  if (width) transforms.push(`w_${Math.round(width)}`);
  if (height) transforms.push(`h_${Math.round(height)}`);
  const clean = publicId.replace(/^\/+/, "");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(",")}/${clean}`;
}

export const isCloudinaryConfigured = Boolean(CLOUD_NAME);
