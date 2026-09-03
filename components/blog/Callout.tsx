import type { ReactNode } from "react";

type CalloutType = "note" | "warning" | "aside";

const STYLES: Record<CalloutType, { border: string; label: string; wrap: string }> = {
  note: {
    border: "border-[#121212]/20",
    label: "text-[#121212]/50",
    wrap: "bg-[#121212]/[0.03]",
  },
  warning: {
    border: "border-[#8a5a00]/40",
    label: "text-[#8a5a00]",
    wrap: "bg-[#8a5a00]/[0.06]",
  },
  aside: {
    border: "border-[#121212]/10",
    label: "text-[#121212]/40",
    wrap: "bg-transparent",
  },
};

const LABELS: Record<CalloutType, string> = {
  note: "Note",
  warning: "Warning",
  aside: "Aside",
};

export default function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const style = STYLES[type] ?? STYLES.note;

  return (
    <div
      className={`my-8 border-l-2 ${style.border} ${style.wrap} px-5 py-4`}
    >
      <p
        className={`mb-2 text-[10px] uppercase tracking-[0.24em] ${style.label}`}
      >
        {title ?? LABELS[type] ?? LABELS.note}
      </p>
      <div className="space-y-3 text-sm leading-7 text-[#121212]/80 sm:text-[15px] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
