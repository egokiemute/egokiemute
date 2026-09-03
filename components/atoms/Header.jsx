import MobileMenu from "@/components/molecules/MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[#f7f6f2]">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-5 pb-4 pt-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6b00] sm:grid sm:grid-cols-2 sm:gap-6 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr] lg:items-start lg:px-10">
        <a href="/" className="transition hover:text-[#121212]">
          Okiemute Egokiphovwen
        </a>

        <nav className="hidden flex-wrap gap-x-4 gap-y-2 sm:flex lg:justify-center">
          <a href="/#about" className="transition hover:text-[#121212]">
            About
          </a>
          <a href="/writings" className="transition hover:text-[#121212]">
            Writing
          </a>
          <a href="/blog" className="transition hover:text-[#121212]">
            Blog
          </a>
          <a href="/#projects" className="transition hover:text-[#121212]">
            Projects
          </a>
        </nav>

        <div className="hidden sm:flex justify-start lg:justify-end">
          <a href="/#contact" className="transition hover:text-[#121212]">
            Contact
          </a>
        </div>

        <div className="sm:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
