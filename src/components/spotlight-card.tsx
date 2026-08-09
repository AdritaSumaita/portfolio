"use client";

import type { MouseEvent, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Panel that tracks the cursor with a soft accent highlight.
 *
 * The position is written to CSS custom properties and the gradient itself
 * lives in CSS, so no React state is involved and no re-render happens on
 * mouse move. Purely decorative — it carries no information, and it is absent
 * on touch devices where there is no hover.
 */
export function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--mx",
      `${event.clientX - rect.left}px`
    );
    event.currentTarget.style.setProperty(
      "--my",
      `${event.clientY - rect.top}px`
    );
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`panel spotlight overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
