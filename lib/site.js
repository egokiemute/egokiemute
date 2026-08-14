const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://okiemute.cv";

export const siteConfig = {
  name: "Okiemute Egokiphovwen",
  shortName: "Okiemute",
  title: "Okiemute Egokiphovwen | Full-Stack Engineer",
  description:
    "Full-stack engineer building complete products end to end — Next.js, NestJS, Flutter, PostgreSQL. Based in Nigeria, working UTC+1. Open to remote roles in Europe and the US.",
  url: siteUrl,
  ogImage: `${siteUrl}/assets/profile-me.png`,
  email: "contact@okiemute.cv",
  role: "Full-Stack Engineer",
  location: "Nigeria",
  locale: "en_NG",
  keywords: [
    "full-stack engineer",
    "NestJS developer",
    "Next.js developer",
    "Flutter developer",
    "TypeScript engineer",
    "founding engineer",
    "remote software engineer",
    "fintech engineer",
    "product engineer",
  ],
  sameAs: [
    "https://github.com/egokiemute",
    "https://www.linkedin.com/in/egokiemute/",
    "https://x.com/okiemute_ego",
  ],
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
