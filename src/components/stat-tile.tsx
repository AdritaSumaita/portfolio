"use client";

import { useEffect, useRef } from "react";

interface StatTileProps {
  label: string;
  value: string;
  /** Optional one-line qualifier under the number. */
  note?: string;
}

/**
 * Splits "4.23/5" into 4.23 and "/5", or "53,634" into 53634 and "" (the
 * comma is a thousands separator, not a suffix), so the numeric part can be
 * animated.
 */
function splitValue(
  value: string
): { num: number; suffix: string; grouped: boolean } | null {
  const match = /^(\d+(?:,\d{3})*(?:\.\d+)?)(.*)$/.exec(value.trim());
  if (!match) return null;
  return {
    num: Number(match[1].replace(/,/g, "")),
    suffix: match[2],
    grouped: match[1].includes(","),
  };
}

/**
 * Stat tile: monospace label, large sans value.
 *
 * The value uses the body sans rather than the display face — at this size a
 * display or serif number reads as decoration rather than data. Figures stay
 * proportional (not tabular): these are standalone values, not a column that
 * has to align.
 */
export function StatTile({ label, value, note }: StatTileProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parsed = splitValue(value);
    if (!parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const decimals = (parsed.num.toString().split(".")[1] ?? "").length;
    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const duration = 1100;
        const start = performance.now();

        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // easeOutExpo — fast start, long settle
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          el.textContent =
            (parsed.num * eased).toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
              useGrouping: parsed.grouped,
            }) + parsed.suffix;
          if (t < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div className="flex flex-col gap-1.5">
      <span className="label-mono">{label}</span>
      {/* Server-rendered as the final value, so no-JS and crawlers see it. */}
      <span
        ref={ref}
        className="text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl"
      >
        {value}
      </span>
      {note ? (
        <span className="text-xs text-[var(--muted)]">{note}</span>
      ) : null}
    </div>
  );
}
