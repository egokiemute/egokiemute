export default function ProjectCard({ project }) {
  return (
    <article className="grid gap-6 border-b border-[#e2ddd2] py-8 lg:grid-cols-[0.9fr_1.5fr]">
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
  );
}
