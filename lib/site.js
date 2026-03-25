const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://okiemute.cv";

export const siteConfig = {
  name: "Okiemute Egokiphovwen",
  shortName: "Okiemute",
  title: "Okiemute Egokiphovwen | Software Developer & Builder",
  description:
    "Software developer and builder based in Lagos, Nigeria, crafting scalable web applications, product experiences, and frontend systems.",
  url: siteUrl,
  ogImage: `${siteUrl}/assets/profile-me.png`,
  email: "contact@okiemute.cv",
  role: "Software Developer",
  location: "Lagos, Nigeria",
  locale: "en_NG",
  keywords: [
    "Okiemute Egokiphovwen",
    "software developer Nigeria",
    "frontend developer Lagos",
    "Next.js developer",
    "React developer",
    "product engineer",
    "web application developer",
    "portfolio",
  ],
  sameAs: [
    "https://github.com/egokiemute",
    "https://www.linkedin.com/in/egokiphovwenokiemute/",
    "https://x.com/egokiemute",
  ],
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
