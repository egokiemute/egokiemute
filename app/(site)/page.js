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
    category: "Full-Stack Engineer · 2025 – Present",
    title: "Encirco",
    description:
      "AI-assisted business registration and compliance platform. I'm the only engineer on it, across the entire stack.",
    impact: [
      "Over 600 businesses registered through the platform to date",
      "Built a WhatsApp AI intake agent that captures registration details conversationally and routes them into a human-in-the-loop operations queue",
      "Built the internal backoffice operators use to process registrations, generate documents, and track application state",
      "Removed weeks of waiting from a process founders would otherwise navigate manually",
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL", "TypeScript", "WhatsApp Cloud API"],
    links: [{ label: "Visit site", href: "https://encir.co" }],
  },
  {
    category: "Frontend Engineer · 2026 (Contract)",
    title: "Payva Payment",
    description:
      "I work as a Frontend Engineer on Payva’s web application (backoffice and landing page), contributing to the development of secure, scalable, and user-friendly financial products.",
    impact: [
      "Build and maintain core frontend features for Payva’s web application using modern JavaScript frameworks",
      "Built and maintain the merchant and agent dashboards with features for onboarding, transaction monitoring, and customer support",
      "Collaborate closely with product managers and backend engineers to integrate APIs and deliver seamless user experiences",
      "Contribute to technical decisions on architecture, performance optimization, and frontend best practices",
    ],
    stack: ["Next.js", "React/Vite", "TailwindCSS", "TypeScript"],
    links: [{ label: "Visit site", href: "https://www.payvapayment.com/" }],
  },
  {
    category: "Full-Stack Engineer (Contract) · 2026 – Present",
    title: "ValueLoop",
    description:
      "Fintech rewards and loyalty platform. Sole engineer across mobile, web, and backend.",
    impact: [
      "Building the full product solo: Flutter mobile app, Next.js admin backoffice, NestJS API",
      "Designed the transaction ledger to fintech standards — integer-only currency storage, atomic transaction records, row-level locking on debits, idempotency via reference deduplication",
      "Integrating Paystack subaccounts for merchant settlement and VTPass for bill payments",
    ],
    stack: ["Flutter", "Next.js", "NestJS", "PostgreSQL", "Paystack"],
    links: [{ label: "Visit site", href: "https://valueloop.ng" }],
  },
  {
    category: "Software Engineer II · 2025 – 2026",
    title: "AnfaniFI",
    description:
      "Supply-chain and merchant fintech platform connecting buyers and sellers with non-traditional financial services.",
    impact: [
      "Built the customer ordering system enabling food merchants to sell directly to their customers",
      "Led development of the Kitchen Display System in React Native",
      "Co-developed the merchant portal's QR generation and management system",
      "Maintained and extended the merchant portal across successive product cycles",
    ],
    stack: ["Next.js", "React Native", "TypeScript", "GraphQL", "REST", "Redux"],
    links: [{ label: "Visit site", href: "https://anfanifi.com" }],
  },
  {
    category: "Cofounder & Engineering Lead · 2024 – Present",
    title: "Flextable",
    description:
      "Two-sided marketplace connecting people to co-working and event spaces across Nigeria.",
    impact: [
      "Cofounded and built the entire platform — frontend, backend, deployment",
      "Shipped booking, listing, and host-onboarding flows used by real hosts and renters",
      "Owned every engineering and architecture decision from zero",
      "Still in operation; active development concluded",
    ],
    stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL"],
    links: [{ label: "Visit site", href: "https://flextable.co" }],
  },
  {
    category: "Cofounder & Engineer · 2022 – 2023",
    title: "Justdeal",
    description:
      "Peer-to-peer marketplace for buying and selling secondhand goods, built with my brother.",
    impact: [
      "Cofounded and built a consumer marketplace from scratch",
      "Rebuilt the production frontend without disrupting live functionality, improving performance by over 20%",
      "First product I took from idea to real users",
    ],
    stack: ["Next.js", "React Query", "Tailwind CSS", "Jest"],
    links: [{ label: "Visit site", href: "http://justdeal.ng" }],
  },
];

const introParagraphs = [
  "I build complete products alone. Next.js and Flutter on the front, NestJS and PostgreSQL behind them, and everything in between.",
  "Right now that means Encirco, an AI-assisted business registration platform that has taken over 600 companies through incorporation, and ValueLoop, a fintech rewards platform I'm building end to end — mobile app, admin backoffice, and API.",
  "Before that I was Software Engineer II at AnfaniFI, building merchant ordering systems for a supply-chain fintech. I've also cofounded two marketplaces, Flextable and Justdeal, and shipped both to real users.",
  "I work from Nigeria on UTC+1 — a full working day of overlap with every European team.",
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
  description: siteConfig.description,
  keywords: [
    ...siteConfig.keywords,
    "founding engineer portfolio",
    "full-stack engineer portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description:
      "Selected work from a full-stack engineer who ships whole products alone — mobile, web, and backend.",
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
      "Selected work from a full-stack engineer who ships whole products alone — mobile, web, and backend.",
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
