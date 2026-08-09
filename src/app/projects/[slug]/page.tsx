import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, projectBySlug } from "@/content/projects";
import { StatusBadge } from "@/components/project-card";
import { Tag } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { StatTile } from "@/components/stat-tile";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Required for `output: "export"` — every route is known at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) notFound();

  const others = projects.filter((item) => item.slug !== project.slug);

  return (
    <article className="pb-8">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="border-b border-[var(--line)] py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <Link
              href="/#work"
              className="label-mono transition-colors hover:text-[var(--accent)]"
            >
              ← All projects
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="font-[family-name:var(--font-grotesk)] text-6xl font-semibold leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_var(--line-strong)] sm:text-7xl">
                {String(project.order).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <StatusBadge status={project.status} />
                <span className="label-mono">{project.domain}</span>
              </div>
            </div>

            <h1 className="mt-8 max-w-4xl font-[family-name:var(--font-grotesk)] text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-[var(--ink-soft)]">
              {project.subtitle}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              <SpotlightCard className="panel-lit p-7">
                <p className="label-mono">The decision this dashboard drives</p>
                <p className="mt-4 font-[family-name:var(--font-grotesk)] text-xl leading-snug tracking-tight text-[var(--ink)] sm:text-2xl">
                  {project.decision}
                </p>
              </SpotlightCard>

              <SpotlightCard className="p-7">
                <p className="label-mono">At a glance</p>
                <dl className="mt-6 grid grid-cols-2 gap-6">
                  {project.metrics.map((metric) => (
                    <StatTile
                      key={metric.label}
                      label={metric.label}
                      value={metric.value}
                    />
                  ))}
                </dl>
              </SpotlightCard>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_17rem] lg:gap-16">
        <div>
          {project.caseStudy.map((section, index) => (
            <Reveal
              as="section"
              key={section.heading}
              className="mb-14"
              delay={index === 0 ? 0 : 40}
            >
              <div className="flex items-center gap-3">
                <span className="label-mono text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-[var(--line-strong)]"
                />
              </div>
              <h2 className="mt-4 font-[family-name:var(--font-grotesk)] text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
                {section.heading}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mt-5 text-[15px] leading-[1.8] text-[var(--ink-soft)]"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-6 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[15px] leading-relaxed text-[var(--ink-soft)]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          ))}

          <Reveal as="section">
            <SpotlightCard className="p-7 sm:p-9">
              <p className="label-mono">Findings</p>
              <h2 className="mt-4 font-[family-name:var(--font-grotesk)] text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
                What the report surfaces
              </h2>
              <p className="mt-3 text-sm text-[var(--muted)]">
                A dashboard with nothing to discover is a report. These are the
                findings the model is built to make visible.
              </p>
              <ol className="mt-8 space-y-6">
                {project.findings.map((finding, index) => (
                  <li key={finding} className="flex gap-5">
                    <span className="font-[family-name:var(--font-grotesk)] text-2xl font-semibold leading-none text-transparent [-webkit-text-stroke:1px_var(--accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">
                      {finding}
                    </p>
                  </li>
                ))}
              </ol>
            </SpotlightCard>
          </Reveal>
        </div>

        {/* ── Sidebar ──────────────────────────────────────────────── */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <SpotlightCard className="p-6">
            <p className="label-mono">Skill this proves</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
              {project.centreOfGravity}
            </p>

            <p className="label-mono mt-7">Tools</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <li key={tool}>
                  <Tag>{tool}</Tag>
                </li>
              ))}
            </ul>

            {/* No live-report link, and no placeholder promising one. Power BI's
                Publish to web needs a work or school account, which the author
                does not hold, so these reports will not have public URLs. The
                repository is the real destination: it carries the .pbix itself,
                the seeded generator, the screenshots and the measure
                documentation. A dashed "link on publish" box promised something
                that was never going to arrive. */}
            {project.repoUrl ? (
              <>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-7 block rounded-full bg-[var(--accent)] px-4 py-2.5 text-center text-sm font-medium text-[var(--on-accent)] transition-opacity hover:opacity-90"
                >
                  Open the project on GitHub ↗
                </a>
                <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">
                  The <code>.pbix</code> file, the seeded data generator, the
                  model and report screenshots, and the KPI catalogue
                  documenting every measure.
                </p>
              </>
            ) : null}
          </SpotlightCard>
        </aside>
      </div>

      {/* ── Other projects ─────────────────────────────────────────── */}
      <div className="container-page border-t border-[var(--line)] pt-14">
        <p className="label-mono">Other projects</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {others.map((other, index) => (
            <Reveal key={other.slug} delay={index * 80} className="h-full">
              {/* prefetch disabled — see the note in project-card.tsx. */}
              <Link
                href={`/projects/${other.slug}`}
                prefetch={false}
                className="group block h-full"
              >
                <SpotlightCard className="h-full p-6 transition-colors hover:border-[var(--line-strong)]">
                  <p className="label-mono">{other.domain}</p>
                  <p className="mt-3 font-[family-name:var(--font-grotesk)] text-lg font-semibold leading-snug tracking-tight text-[var(--ink)]">
                    {other.title}
                  </p>
                  <p className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                    Read
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </p>
                </SpotlightCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  );
}
