import Link from "next/link";
import type { Project, ProjectStatus } from "@/types/content";
import { SpotlightCard } from "./spotlight-card";

const statusLabel: Record<ProjectStatus, string> = {
  planned: "Spec complete",
  "in-progress": "In build",
  // "Built", not "Published" — the reports are complete and verified against
  // source, but none is published to a live URL yet, and the case-study
  // sidebar says so a few centimetres away.
  complete: "Built",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const isLive = status === "complete";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--line)] bg-[var(--surface-2)] px-2 py-1 font-[family-name:var(--font-mono-jb)] text-[10px] uppercase tracking-[0.12em] text-[var(--ink-soft)]">
      <span
        aria-hidden="true"
        className={
          "h-1.5 w-1.5 rounded-full " +
          (isLive ? "bg-[var(--accent)]" : "bg-[var(--line-strong)]")
        }
      />
      {statusLabel[status]}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="group flex h-full flex-col p-6 transition-colors duration-300 hover:border-[var(--line-strong)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="font-[family-name:var(--font-grotesk)] text-5xl font-semibold leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_var(--line-strong)] transition-colors duration-300 group-hover:[-webkit-text-stroke:1px_var(--accent)]">
          {String(project.order).padStart(2, "0")}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <p className="label-mono mt-6">{project.domain}</p>

      <h3 className="mt-3 font-[family-name:var(--font-grotesk)] text-xl font-semibold leading-tight tracking-tight text-[var(--ink)] sm:text-2xl">
        {/* prefetch disabled: next build --output export writes this dynamic
            route's RSC payload to __next.projects/$d$slug.txt, but the client
            requests the flattened __next.projects.$d$slug.txt, so every
            prefetch 404s. Navigation is unaffected. */}
        <Link
          href={`/projects/${project.slug}`}
          prefetch={false}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {project.title}
        </Link>
      </h3>

      <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-soft)]">
        {project.summary}
      </p>

      <div className="mt-6 rounded-lg border-l-2 border-[var(--accent)] bg-[var(--surface-2)] p-4">
        <p className="label-mono">Decision it drives</p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
          {project.decision}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.tools.map((tool) => (
          <span
            key={tool}
            className="rounded border border-[var(--line)] px-2 py-0.5 font-[family-name:var(--font-mono-jb)] text-[10px] text-[var(--muted)]"
          >
            {tool}
          </span>
        ))}
      </div>

      {/* mt-auto keeps the CTA on the card foot whatever the copy length. */}
      <p className="mt-auto flex items-center gap-2 pt-7 text-sm font-medium text-[var(--accent)]">
        Read the case study
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </p>
    </SpotlightCard>
  );
}
