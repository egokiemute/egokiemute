import Image from "next/image";
import LenisScroll from "@/components/LenisScroll";
import MobileMenu from "@/components/MobileMenu";
import { absoluteUrl, siteConfig } from "@/lib/site";

const services = [
  "Custom dashboard development",
  "End-to-end web & platform engineering",
  "Developer tools & internal systems",
  "Product design, UX & scalable frontend architecture",
];

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
      "Owned frontend engineering for a supply chain and fintech platform, building scalable interfaces that support business decision-making in a zero-trust ecosystem.",
    impact: [
      "Enabled API-driven financial workflows and real-time data visibility",
      "Improved performance using code-splitting and lazy loading techniques",
      "Collaborated across product, design, and backend to ship scalable features",
    ],
    learnings: [
      "Designing frontend systems for fintech and supply chain products",
      "Working with GraphQL/REST APIs at scale",
      "Advanced state management with Redux and Zustand",
      "Translating business logic into user-facing experiences",
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
    href: "https://www.linkedin.com/in/egokiphovwenokiemute/",
  },
  { label: "GitHub", href: "https://github.com/egokiemute" },
  { label: "Twitter", href: "https://x.com/egokiemute" },
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
      <LenisScroll />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <main className="min-h-screen bg-[#f7f6f2] text-[#121212]">
        <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-5 pb-8 pt-5 sm:px-8 lg:px-10">
          <div className="flex min-h-screen flex-col">
            <header className="flex items-start justify-between gap-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6b63] sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:items-start">
              <a href="#top" className="transition hover:text-[#121212]">
                Okiemute Egokiphovwen
              </a>

              <p className="hidden lg:block">Software developer / Lagos NG</p>

              <nav className="hidden flex-wrap gap-x-4 gap-y-2 sm:flex lg:justify-center">
                <a href="#about" className="transition hover:text-[#121212]">
                  About
                </a>
                <a href="#projects" className="transition hover:text-[#121212]">
                  Projects
                </a>
              </nav>

              <div className="hidden sm:flex justify-start lg:justify-end">
                <a href="#contact" className="transition hover:text-[#121212]">
                  Contact
                </a>
              </div>

              <div className="sm:hidden">
                <MobileMenu />
              </div>
            </header>

            <section
              id="top"
              className="grid flex-1 gap-12 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1.3fr_0.9fr] lg:gap-12 lg:pt-28"
            >
              <div className="flex min-h-[46vh] flex-col justify-end">
                <p className="mb-6 text-[10px] uppercase tracking-[0.32em] text-[#9b978d]">
                  Available for freelance and in-house roles
                </p>

                <h1 className="max-w-[7ch] text-[clamp(4rem,12vw,8.8rem)] font-medium lowercase leading-[0.88] tracking-[-0.08em] text-[#111111]">
                  software
                  <br />
                  developer
                </h1>
              </div>

              <div className="flex flex-col justify-between gap-12 lg:items-end">
                <div className="max-w-[360px] space-y-3 text-sm leading-6 text-[#3e3b35]">
                  {services.map((service, index) => (
                    <div
                      key={service}
                      className="flex items-start gap-3 border-b border-[#e5e0d5] pb-3"
                    >
                      <span className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-[#9b978d]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p>{service}</p>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] uppercase tracking-[0.28em] text-[#a09b90]">
                  Scroll down
                </p>
              </div>
            </section>
          </div>

          <section
            id="about"
            className="grid gap-10 border-t border-[#e2ddd2] py-12 lg:grid-cols-[0.95fr_1.15fr] lg:gap-20 lg:py-20"
          >
            <div className="mx-auto w-full max-w-[320px] lg:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#ded8cc]">
                <Image
                  src="/assets/profile-me.png"
                  alt="Portrait of Okiemute Egokiphovwen"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 320px, 28vw"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-10">
              <div className="max-w-[640px] space-y-5 text-sm leading-7 text-[#272521] sm:text-[15px]">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="grid gap-6 text-[11px] uppercase tracking-[0.24em] text-[#6f6b63] sm:grid-cols-3">
                <div>
                  <p className="mb-2 text-[#a09b90]">Experience</p>
                  <p className="text-[#121212]">7+ years shipping products</p>
                </div>
                <div>
                  <p className="mb-2 text-[#a09b90]">Focus</p>
                  <p className="text-[#121212]">
                    Frontend, UI systems, Backend, & Web apps
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-[#a09b90]">Location</p>
                  <p className="text-[#121212]">Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="projects"
            className="border-t border-[#e2ddd2] py-12 lg:py-20"
          >
            <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium lowercase leading-none tracking-[-0.08em]">
                  selected work
                </h2>
                <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-[#9b978d]">
                  ({String(projects.length).padStart(2, "0")})
                </p>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-[#8a867d]">
                {filters.map((filter, index) => (
                  <span
                    key={filter}
                    className={
                      index === 0
                        ? "text-[#151515]"
                        : "transition hover:text-[#151515]"
                    }
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-[#e2ddd2]">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="grid gap-6 border-b border-[#e2ddd2] py-8 lg:grid-cols-[0.9fr_1.5fr]"
                >
                  <div>
                    <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#9b978d]">
                      {project.category}
                    </p>
                    <h3 className="max-w-[14ch] text-3xl font-medium leading-[1.02] tracking-[-0.05em] text-[#141414] sm:text-[2.25rem]">
                      {project.title}
                    </h3>
                  </div>

                  <div className="max-w-[780px]">
                    <p className="text-sm leading-7 text-[#272521] sm:text-[15px]">
                      {project.description}
                    </p>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                      <div>
                        <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#9b978d]">
                          Impact
                        </p>
                        <ul className="space-y-3 text-sm leading-6 text-[#272521]">
                          {project.impact.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#121212]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#9b978d]">
                          Learnings
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-[#8f8b82]">
                          {project.learnings.map((item) => (
                            <span key={item}>{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-5 text-[11px] uppercase tracking-[0.22em] text-[#111111]">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="border-b border-[#111111] pb-1 transition hover:text-[#6f6b63] hover:border-[#6f6b63]"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="contact"
            className="grid gap-10 border-t border-[#e2ddd2] py-12 lg:grid-cols-[1fr_0.7fr] lg:py-20"
          >
            <div className="max-w-[420px]">
              <h2 className="text-[clamp(2.7rem,6vw,4.75rem)] font-medium lowercase leading-none tracking-[-0.08em]">
                let&apos;s talk
              </h2>
              <p className="mt-6 text-sm leading-7 text-[#272521] sm:text-[15px]">
                I&apos;m always interested in discussing new opportunities,
                collaborations, or ambitious products. If you need a thoughtful
                frontend developer who can help shape and ship the work,
                let&apos;s connect.
              </p>
            </div>

            <div className="flex flex-col gap-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6b63] lg:items-start lg:justify-end">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="transition hover:text-[#111111]"
                >
                  {link.label}
                </a>
              ))}

              <p className="pt-4 text-[#a09b90]">
                Available for remote work worldwide
              </p>
            </div>
          </section>

          <footer className="mt-auto flex flex-col gap-3 border-t border-[#e2ddd2] pt-5 text-[10px] uppercase tracking-[0.22em] text-[#a09b90] sm:flex-row sm:items-center sm:justify-between">
            <p>(c) {new Date().getFullYear()} Okiemute Egokiphovwen</p>
            <p>Site constantly changing.</p>
          </footer>
        </div>
      </main>
    </>
  );
}
