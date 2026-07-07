import { PortableText } from "@portabletext/react";
import Link from "next/link";

const linkClassName =
  "underline underline-offset-4 decoration-[#121212]/30 transition hover:decoration-[#121212]";

function BodyLink({ value, children }) {
  const href = value?.href;
  if (!href) {
    return children;
  }

  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClassName}>
      {children}
    </Link>
  );
}

const components = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm leading-7 text-[#121212]/70 sm:text-[15px]">
        {children}
      </p>
    ),
  },
  marks: {
    link: BodyLink,
    strong: ({ children }) => (
      <strong className="font-medium text-[#121212]">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
  },
};

// `sections.body` is Portable Text going forward, but older/local fallback
// content may still be a plain string — render either shape.
export default function RichText({ value, className }) {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return (
      <div className={className}>
        {value.split(/\n\s*\n/).map((paragraph, index) => (
          <p
            key={index}
            className="text-sm leading-7 text-[#121212]/70 sm:text-[15px]"
          >
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
