import type { ReactNode } from "react";
import { Reveal } from "./reveal";

interface SectionProps {
  id?: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  children: ReactNode;
}

export function Section({
  id,
  index,
  eyebrow,
  title,
  lede,
  children,
}: SectionProps) {
  // Anchor offset comes from scroll-padding-top on <html>, which applies to
  // every target uniformly. A scroll-mt here as well would double it.
  return (
    <section id={id} className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="label-mono text-[var(--accent)]">{index}</span>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[var(--line-strong)]"
            />
            <span className="label-mono">{eyebrow}</span>
          </div>

          <h2 className="mt-5 max-w-3xl font-[family-name:var(--font-grotesk)] text-3xl font-semibold leading-[1.12] tracking-tight text-[var(--ink)] sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          {lede ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)]">
              {lede}
            </p>
          ) : null}
        </Reveal>

        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-[var(--line)] bg-[var(--surface-2)] px-2.5 py-1 font-[family-name:var(--font-mono-jb)] text-[11px] text-[var(--ink-soft)]">
      {children}
    </span>
  );
}
