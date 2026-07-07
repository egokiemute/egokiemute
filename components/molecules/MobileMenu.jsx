"use client";

import { useEffect, useState } from "react";

const navigationLinks = [
  { label: "About", href: "/#about" },
  { label: "Writing", href: "/writings" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

function getLagosTime() {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Africa/Lagos",
  }).format(new Date());
}

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(getLagosTime);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setInterval(() => {
      setTime(getLagosTime());
    }, 1000);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearInterval(timer);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="justify-self-end text-[#121212] uppercase transition hover:text-[#6f6b63]"
      >
        Menu
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex min-h-screen flex-col bg-[#f7f6f2] px-5 pb-6 pt-5">
          <div className="flex items-start justify-between text-[11px] uppercase tracking-[0.24em] text-[#121212]">
            <a href="/" onClick={() => setIsOpen(false)}>
              Okiemute Egokiphovwen
            </a>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="transition hover:text-[#6f6b63]"
            >
              Close
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-12 text-center text-[clamp(3.25rem,14vw,4.75rem)] font-medium leading-none tracking-[-0.06em] text-[#121212]">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="transition hover:text-[#6f6b63]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-center text-[11px] uppercase tracking-[0.24em] text-[#a3a0a0]">
            {time} WAT
          </p>
        </div>
      )}
    </>
  );
}
