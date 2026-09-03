import type { ReactNode } from "react";

/**
 * Breaks a child out of the `max-w-[840px]` prose column to (near) full
 * container width — for wide diagrams, tables, and code. Centered on the
 * viewport so it stays aligned no matter the prose column's position.
 */
export default function Wide({ children }: { children: ReactNode }) {
  return (
    <div className="my-10 ml-[50%] w-[min(1160px,calc(100vw-2.5rem))] -translate-x-1/2 lg:w-[min(1160px,calc(100vw-5rem))]">
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
