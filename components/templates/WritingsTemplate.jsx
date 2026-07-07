import LenisScroll from "@/components/atoms/LenisScroll";
import WritingCard from "@/components/molecules/WritingCard";

export default function WritingsTemplate({ posts }) {
  return (
    <>
      <LenisScroll />
      <main className="min-h-screen bg-[#f7f6f2] text-[#121212]">
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-10">
          <section className="flex flex-col gap-6 pb-12 pt-12 lg:flex-row lg:items-end lg:justify-between lg:pt-20">
            <div>
              <h1 className="text-[clamp(2.7rem,7vw,5.5rem)] font-medium lowercase leading-none tracking-[-0.08em]">
                writing
              </h1>
              <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-[#121212]/50">
                ({String(posts.length).padStart(2, "0")})
              </p>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#121212]/70 sm:text-[15px]">
              Short essays and field notes on design, engineering, and the work
              of shipping.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-x-8 gap-y-14 border-t border-[#121212]/10 pt-12 md:grid-cols-2">
            {posts.map((post) => (
              <WritingCard key={post.slug} post={post} />
            ))}
            {posts.length === 0 ? (
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#121212]/50">
                No posts published yet.
              </p>
            ) : null}
          </section>
        </div>
      </main>
    </>
  );
}
