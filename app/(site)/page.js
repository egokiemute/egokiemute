import HomeTemplate from "@/components/templates/HomeTemplate";
import { absoluteUrl, siteConfig } from "@/lib/site";

const filters = [
  "All Projects",
  "Engineering",
  "Product Builds",
  "Web Applications",
  "Platforms",
];

const projects = [
  {
    category: "Software Engineer II",
    title: "Anfanifi",
    description:
      "Built and maintained merchant-facing systems that enable food merchants to sell directly to their customers, including a kitchen display system and in-built QR management tools.",
    impact: [
      "Built the customer ordering system for merchants to sell food directly to their customers",
      "Co-developed an in-built QR Management system for the merchant portal with the lead engineer",
      "Led the development of the Kitchen Display System using React Native",
      "Maintained and improved the merchant portal across product cycles",
    ],
    learnings: [
      "Building end-to-end ordering and fulfilment flows",
      "QR code generation and management systems",
      "React Native development for kitchen-facing display applications",
      "Cross-functional collaboration with product and management teams",
    ],
    links: [{ label: "Visit site", href: "https://anfanifi.com" }],
  },
  {
    category: "Engineering Lead",
    title: "Flextable",
    description:
      "Led engineering for a platform connecting people to co-working and event spaces, delivering a full-stack product from idea to execution.",
    impact: [
      "Led engineering decisions across frontend, backend, and deployment",
      "Shipped a real-world marketplace product used for bookings and listings",
      "Worked directly with product direction and execution strategy",
    ],
    learnings: [
      "Leading engineering teams and making product-driven decisions",
      "Building marketplace platforms from scratch",
      "Balancing speed, scalability, and real-world usability",
    ],
    links: [{ label: "Visit site", href: "https://flextable.co" }],
  },
  {
    category: "Product Build",
    title: "Vimerge",
    description:
      "Built a conversion-focused e-commerce experience for a gospel fashion brand, combining storytelling with modern product design.",
    impact: [
      "Delivered a clean, high-conversion shopping experience",
      "Strengthened brand storytelling through UI and layout decisions",
    ],
    learnings: [
      "Designing for conversion and user psychology",
      "Building structured content systems with CMS tools",
      "Creating scalable UI systems for commerce",
    ],
    links: [{ label: "Visit site", href: "https://vimerge.shop" }],
  },
  {
    category: "Web Application",
    title: "Halocore",
    description:
      "Designed and developed a seamless booking experience that helps users move from discovery to reservation with minimal friction.",
    impact: [
      "Simplified booking flows and reduced user friction",
      "Integrated external APIs to power dynamic availability and reservations",
    ],
    learnings: [
      "Designing intuitive user journeys for transactional products",
      "Handling API integrations in real-world applications",
      "Building responsive, mobile-first interfaces",
    ],
    links: [{ label: "Visit site", href: "https://halocore.co" }],
  },
  {
    category: "Frontend Engineering",
    title: "Justdeal",
    description:
      "Rebuilt the frontend of a live platform from scratch to significantly improve performance and user experience.",
    impact: [
      "Improved platform performance by over 20%",
      "Delivered a faster and more responsive user experience",
    ],
    learnings: [
      "Re-architecting existing products without breaking functionality",
      "Performance optimization in production environments",
      "Working in collaboration with backend teams on live systems",
    ],
    links: [{ label: "Visit site", href: "http://justdeal.ng" }],
  },
  {
    category: "Portfolio Platform",
    title: "Coach Kemi",
    description:
      "Engineered a personal brand platform with integrated booking, helping convert audience trust into action.",
    impact: [
      "Created a clear conversion flow from landing to booking",
      "Improved credibility through structured brand presentation",
    ],
    learnings: [
      "Designing for personal brands and trust-building",
      "Structuring content for clarity and engagement",
    ],
    links: [{ label: "Visit site", href: "https://www.iamcoachkemi.com/" }],
  },
];

const introParagraphs = [
  "I'm a software developer and builder based in Lagos, Nigeria. I enjoy designing thoughtful interfaces and turning ideas into reliable digital products that feel fast, clear, and easy to use.",
  "Across startups and growing teams, I've worked on frontend systems, full web applications, and product experiences for users across Africa, the UK, and the US. I care deeply about usability, performance, and clean execution.",
  "If you're looking for someone who can translate product direction into polished, scalable software, let's connect.",
];

const contactLinks = [
  { label: "Email", href: "mailto:contact@okiemute.cv" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/egokiemute/",
  },
  { label: "GitHub", href: "https://github.com/egokiemute" },
  { label: "Twitter", href: "https://x.com/okiemute_ego" },
];

export const metadata = {
  title: siteConfig.title,
  description:
    "Portfolio of Okiemute Egokiphovwen, a Lagos-based software developer building scalable web applications, frontend systems, and product experiences.",
  keywords: [
    ...siteConfig.keywords,
    "software engineer portfolio",
    "frontend engineering portfolio",
    "Lagos software developer portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description:
      "Explore selected work, product case studies, and engineering experience from Okiemute Egokiphovwen.",
    url: absoluteUrl("/"),
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 1200,
        alt: `${siteConfig.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description:
      "Explore selected work, product case studies, and engineering experience from Okiemute Egokiphovwen.",
    images: [siteConfig.ogImage],
  },
};

export default function Page() {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: siteConfig.name,
        url: absoluteUrl("/"),
        image: siteConfig.ogImage,
        jobTitle: siteConfig.role,
        description: siteConfig.description,
        email: `mailto:${siteConfig.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lagos",
          addressCountry: "NG",
        },
        sameAs: siteConfig.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": absoluteUrl("/#webpage"),
        url: absoluteUrl("/"),
        name: siteConfig.title,
        description: metadata.description,
        isPartOf: {
          "@id": absoluteUrl("/#website"),
        },
        about: {
          "@id": absoluteUrl("/#person"),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HomeTemplate
        filters={filters}
        projects={projects}
        introParagraphs={introParagraphs}
        contactLinks={contactLinks}
      />
    </>
  );
}
