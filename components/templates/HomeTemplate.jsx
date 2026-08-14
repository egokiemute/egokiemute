import Image from "next/image";
import LenisScroll from "@/components/atoms/LenisScroll";
import ProjectCard from "@/components/molecules/ProjectCard";

export default function HomeTemplate({
  filters,
  projects,
  introParagraphs,
  contactLinks,
}) {
  return (
    <>
      <LenisScroll />

      <main className="min-h-screen bg-[#f7f6f2] text-[#121212]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col px-5 sm:px-8 lg:px-10">
          <section
            id="top"
            className="grid min-h-[calc(100vh-56px)] gap-12 pb-16 pt-10 sm:pt-18 lg:grid-cols-[1.3fr_0.9fr] lg:gap-12 lg:pt-28"
          >
            <div className="flex min-h-[46vh] flex-col justify-end">
              <p className="mb-6 text-[10px] uppercase tracking-[0.32em] text-[#9b978d]">
                Open to full-time remote roles — Europe & US
              </p>

              <h1 className="max-w-[7ch] text-[clamp(4rem,12vw,8.8rem)] font-medium lowercase leading-[0.88] tracking-[-0.08em] text-[#111111]">
                full-stack
                <br />
                engineer
              </h1>
            </div>
          </section>

          <section
            id="about"
            className="grid gap-10 border-t border-[#e2ddd2] py-12 lg:grid-cols-[0.95fr_1.15fr] lg:gap-20 lg:py-20"
          >
            <div className="mx-auto w-full max-w-[320px] lg:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#ded8cc]">
                <Image
                  src="/assets/profile-mee.png"
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
                  <p className="text-[#121212]">4 years shipping products</p>
                </div>
                <div>
                  <p className="mb-2 text-[#a09b90]">Focus</p>
                  <p className="text-[#121212]">
                    Full-stack: Next.js, NestJS, Flutter, PostgreSQL
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-[#a09b90]">Availability</p>
                  <p className="text-[#121212]">
                    Remote worldwide · UTC+1, full CET overlap
                  </p>
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
                <ProjectCard key={project.title} project={project} />
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
                I&apos;m looking for a full-time remote role with a team that
                ships — founding engineer, full-stack, or backend-leaning. If
                you&apos;re early and need someone who can take a product from
                database schema to App Store without waiting to be told how,
                we should talk.
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
                Open to remote roles worldwide · UTC+1
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
