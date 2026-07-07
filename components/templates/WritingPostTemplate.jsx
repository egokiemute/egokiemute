import Link from "next/link";
import LenisScroll from "@/components/atoms/LenisScroll";
import PostMeta from "@/components/molecules/PostMeta";
import RichText from "@/components/molecules/RichText";

export default function WritingPostTemplate({ post, related }) {
  return (
    <>
      <LenisScroll />
      <main className="min-h-screen bg-[#f7f6f2] text-[#121212] pt-12">
        <div className="mx-auto w-full max-w-[1240px] px-5 pb-20 pt-12 sm:px-8 lg:px-10">
          <Link
            href="/writings"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#121212]/50 transition hover:text-[#121212]"
          >
            <span aria-hidden="true">←</span>
            Back to writing
          </Link>

          <header className="mt-10 border-b border-[#121212]/10 pb-10 max-w-full">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#121212]/50">
              {post.category}
            </p>
            <h1 className="mt-4 max-w-[18ch] text-[clamp(2.2rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.05em]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-[840px] text-sm leading-7 text-[#121212]/70 sm:text-[15px]">
              {post.excerpt}
            </p>
            <PostMeta
              date={post.date}
              readTime={post.readTime}
              className="mt-6 flex items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-[#121212]/50"
            />
          </header>

          <section className="mt-12 space-y-12">
            {post.sections.map((section) => (
              <article key={section.heading} className="space-y-3">
                <h2 className="text-2xl font-medium tracking-[-0.03em]">
                  {section.heading}
                </h2>
                <RichText value={section.body} className="max-w-[840px] space-y-4" />
              </article>
            ))}
          </section>

          <section className="mt-16 border-t border-[#121212]/10 pt-10">
            <h3 className="text-[11px] uppercase tracking-[0.24em] text-[#121212]/50">
              Keep reading
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/writings/${item.slug}`}
                  className="group border-t border-[#121212]/10 pt-5"
                >
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#121212]/50">
                    {item.category}
                  </p>
                  <h4 className="mt-3 text-xl font-medium tracking-[-0.03em] transition group-hover:text-[#121212]/60">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-[#121212]/70">
                    {item.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
