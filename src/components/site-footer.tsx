import Link from "next/link";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { CopyrightYear } from "./copyright-year";
import { LocalTime } from "./local-time";

const navItems = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#toolkit", label: "Toolkit" },
  { href: "/#about", label: "About" },
];

const linkClass =
  "text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)]";

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-[var(--line)]">
      <div className="container-page py-14">
        {/* Three columns, each doing a job the rest of the page does not:
            section nav, direct links to the case studies (unreachable from
            the header), and the contact details. */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr]">
          <nav aria-label="Sections">
            <p className="label-mono">Sections</p>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Projects">
            <p className="label-mono">Projects</p>
            <ul className="mt-4 space-y-2.5">
              {projects.map((project) => (
                <li key={project.slug}>
                  {/* prefetch disabled — see the note in project-card.tsx. */}
                  <Link
                    href={`/projects/${project.slug}`}
                    prefetch={false}
                    className={`${linkClass} flex gap-2.5 leading-snug`}
                  >
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-[family-name:var(--font-mono-jb)] text-[var(--muted)]"
                    >
                      {String(project.order).padStart(2, "0")}
                    </span>
                    {/* Wraps rather than truncating — an ellipsis here would
                        cut "Delivery" off the second project's title. */}
                    <span>{project.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label-mono">Contact</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${profile.email}`} className={linkClass}>
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                  className={linkClass}
                >
                  {profile.phone}
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={linkClass}
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-page border-t border-[var(--line)] py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono">
            © <CopyrightYear /> {profile.name}
          </p>

          <div className="flex items-center gap-6">
            <LocalTime />
            <a
              href="#main"
              className="label-mono transition-colors hover:text-[var(--accent)]"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
