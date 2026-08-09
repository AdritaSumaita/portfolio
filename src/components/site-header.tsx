import Link from "next/link";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav, type NavItem } from "./mobile-nav";

const navItems: NavItem[] = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#toolkit", label: "Toolkit" },
  { href: "/#about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--canvas)_78%,transparent)] backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[var(--accent)] transition-transform group-hover:scale-125"
          />
          <span className="font-[family-name:var(--font-grotesk)] text-sm font-semibold tracking-tight text-[var(--ink)]">
            {profile.shortName}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-[var(--ink-soft)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={`mailto:${profile.email}`}
            className="hidden rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--on-accent)] transition-opacity hover:opacity-90 md:inline-block"
          >
            Get in touch
          </a>
          <ThemeToggle />
          <MobileNav
            items={navItems}
            email={profile.email}
            linkedin={profile.linkedin}
          />
        </div>
      </div>
    </header>
  );
}
