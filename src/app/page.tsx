import {
  domains,
  education,
  languages,
  profile,
  roles,
  skillGroups,
} from "@/content/profile";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { Section, Tag } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { StatTile } from "@/components/stat-tile";
import { Marquee } from "@/components/marquee";

const stats = [
  // "Experience", not "analysis" — ~22 months of that total is the MSF
  // fundraising lead role, which is leadership rather than analysis work.
  { label: "Years of experience", value: "4+" },
  { label: "Domains delivered", value: "6" },
  { label: "MSc GPA", value: "4.23", note: "out of 5.0" },
  { label: "Team led", value: "7" },
];

const marqueeItems = [
  "Power BI",
  "DAX",
  "Power Query",
  "Requirement Engineering",
  "BRD / SRS / FDD / RTM",
  "BPMN",
  "As-Is / To-Be",
  "Product Ownership",
  "MVP Strategy",
  "Figma",
  "Jira",
  "Agile Delivery",
  "Stakeholder Engagement",
];

export default function Home() {
  return (
    <>
      {/* ── Hero: bento grid ───────────────────────────────────────── */}
      <section className="pt-16 pb-8 sm:pt-24">
        <div className="container-page">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="label-mono">
                Available · {profile.location}
              </span>
            </div>

            <h1 className="mt-7 max-w-4xl font-[family-name:var(--font-grotesk)] text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
              {profile.title.split(" & ")[0]} who turns{" "}
              <span className="gradient-text">ambiguity</span> into decisions.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
              {profile.tagline}
            </p>
          </Reveal>

          {/* Bento tiles */}
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <Reveal className="lg:col-span-2" delay={60}>
              <SpotlightCard className="panel-lit h-full p-7 sm:p-9">
                <p className="label-mono">Who</p>
                <p className="mt-4 font-[family-name:var(--font-grotesk)] text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
                  {profile.name}
                </p>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
                  Business analysis across IoT, ERP, HealthTech, Textile and
                  Energy — from requirement engineering for enterprise clients
                  to leading a fundraising team in the field.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#work"
                    className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--on-accent)] transition-opacity hover:opacity-90"
                  >
                    View the work
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-full border border-[var(--line-strong)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>

            <Reveal delay={120}>
              <SpotlightCard className="flex h-full flex-col justify-between gap-8 p-7 sm:p-9">
                <p className="label-mono">By the numbers</p>
                <div className="grid grid-cols-2 gap-7">
                  {stats.map((stat) => (
                    <StatTile
                      key={stat.label}
                      label={stat.label}
                      value={stat.value}
                      note={stat.note}
                    />
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Toolkit ticker ─────────────────────────────────────────── */}
      <div className="border-y border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_50%,transparent)]">
        <Marquee items={marqueeItems} />
      </div>

      {/* ── Work ───────────────────────────────────────────────────── */}
      <Section
        id="work"
        index="01"
        eyebrow="Selected work"
        title={
          <>
            Three Power BI projects, each proving a{" "}
            <span className="text-[var(--muted)]">different</span> skill.
          </>
        }
        lede="I define the decision first, then the metric, then the visual — so every measure in the model exists because a named stakeholder needed it."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 90} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Experience ─────────────────────────────────────────────── */}
      <Section
        id="experience"
        index="02"
        eyebrow="Experience"
        title="Where I have done this"
        lede="Requirement engineering for enterprise clients across regulated domains, and team leadership in the field."
      >
        <ol className="space-y-4">
          {roles.map((role, index) => (
            <Reveal as="li" key={`${role.company}-${role.position}`} delay={index * 70}>
              <SpotlightCard className="p-6 sm:p-8">
                <div className="grid gap-6 md:grid-cols-[minmax(0,12rem)_1fr] md:gap-10">
                  <div>
                    <p className="label-mono">
                      {role.start} — {role.end}
                    </p>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {role.location}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-[family-name:var(--font-grotesk)] text-xl font-semibold tracking-tight text-[var(--ink)]">
                      {role.position}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[var(--accent)]">
                      {role.company}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                      {role.context}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {role.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-3 text-[15px] leading-relaxed text-[var(--ink-soft)]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {role.domains ? (
                      <div className="mt-6 flex flex-wrap gap-1.5">
                        {role.domains.map((domain) => (
                          <Tag key={domain}>{domain}</Tag>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── Toolkit ────────────────────────────────────────────────── */}
      <Section
        id="toolkit"
        index="03"
        eyebrow="Toolkit"
        title="Skills & tools"
        lede="Analysis and requirements are the core. The BI and design tooling exists to make the analysis land with the people who have to act on it."
      >
        {/* Six groups — a clean 2×3 / 3×2 grid at every breakpoint. */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.category} delay={index * 60} className="h-full">
              <SpotlightCard className="flex h-full flex-col p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-[family-name:var(--font-grotesk)] text-sm font-semibold text-[var(--ink)]">
                    {group.category}
                  </h3>
                  <span className="label-mono shrink-0">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Industries, not tools — given their own full-width band rather than
            a seventh card, which is both truer to what they are and what
            removes the orphaned row. */}
        <Reveal delay={120}>
          <SpotlightCard className="panel-lit mt-4 p-7 sm:p-9">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-sm">
                <p className="label-mono">Domains delivered</p>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                  Industries I have shipped requirements and product decisions
                  in — as an analyst, a solution consultant, or both.
                </p>
              </div>

              <ul className="flex flex-wrap gap-2.5">
                {domains.map((domain) => (
                  <li
                    key={domain}
                    className="rounded-full border border-[var(--line-strong)] px-4 py-2 font-[family-name:var(--font-grotesk)] text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {domain}
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </Reveal>
      </Section>

      {/* ── About ──────────────────────────────────────────────────── */}
      <Section
        id="about"
        index="04"
        eyebrow="About"
        title="How I work"
        lede="Modern business analysis goes beyond documentation."
      >
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="h-full">
            <SpotlightCard className="h-full p-7 sm:p-9">
              {profile.summary.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mb-4 text-[15px] leading-relaxed text-[var(--ink-soft)]"
                >
                  {paragraph}
                </p>
              ))}

              <p className="label-mono mt-8">Focus areas</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {profile.focusAreas.map((area) => (
                  <li key={area}>
                    <Tag>{area}</Tag>
                  </li>
                ))}
              </ul>

              <p className="label-mono mt-8">Languages</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {languages.map((language) => (
                  <li key={language.name} className="text-[15px]">
                    <span className="font-medium text-[var(--ink)]">
                      {language.name}
                    </span>
                    <span className="text-[var(--muted)]">
                      {" — "}
                      {language.level}
                      {language.note ? ` (${language.note})` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>

          <div className="grid gap-4">
            {education.map((entry, index) => (
              <Reveal key={entry.institution} delay={index * 80}>
                <SpotlightCard
                  className={`h-full p-7 ${entry.thesis ? "panel-lit" : ""}`}
                >
                  <p className="label-mono">
                    {entry.start} — {entry.end}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-grotesk)] text-lg font-semibold leading-snug tracking-tight text-[var(--ink)]">
                    {entry.degree}, {entry.field}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--accent)]">
                    {entry.institution}
                  </p>
                  {entry.gpa ? (
                    <p className="mt-2 text-sm text-[var(--ink-soft)]">
                      GPA {entry.gpa}
                    </p>
                  ) : null}

                  {entry.thesis ? (
                    <div className="mt-6 border-t border-[var(--line)] pt-5">
                      <p className="label-mono">
                        Thesis · {entry.thesis.credits} cr ·{" "}
                        {entry.thesis.grade}
                      </p>
                      <a
                        href={entry.thesis.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-3 inline-block text-[15px] font-medium leading-relaxed text-[var(--ink)] underline decoration-[var(--accent)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--accent)]"
                      >
                        {entry.thesis.title} ↗
                      </a>
                    </div>
                  ) : null}
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Contact ────────────────────────────────────────────────── */}
      <section className="pb-8">
        <div className="container-page">
          <Reveal>
            <SpotlightCard className="panel-lit overflow-hidden p-8 text-center sm:p-16">
              <p className="label-mono">Next step</p>
              <h2 className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-grotesk)] text-3xl font-semibold leading-tight tracking-tight text-[var(--ink)] sm:text-5xl">
                Let&rsquo;s talk about what your dashboard should have been
                designed to <span className="gradient-text">decide</span>.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--ink-soft)]">
                Open to Business Analyst and Product Owner roles in{" "}
                {profile.location} and across the EU.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--on-accent)] transition-opacity hover:opacity-90"
                >
                  {profile.email}
                </a>
                {/* Displayed spaced for reading, dialled unspaced. */}
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                  className="rounded-full border border-[var(--line-strong)] px-6 py-3 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {profile.phone}
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-full border border-[var(--line-strong)] px-6 py-3 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  LinkedIn ↗
                </a>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}
