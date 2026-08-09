"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger within a group, in ms. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}

/**
 * Fades content up as it enters the viewport.
 *
 * The `.reveal` class is applied from JS rather than baked into the markup, so
 * a visitor without JavaScript sees the content immediately instead of a blank
 * page. Reduced-motion is handled in CSS.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    el.classList.add("reveal");
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    // @ts-expect-error — ref type varies with the polymorphic tag
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
