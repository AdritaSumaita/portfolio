"use client";

/**
 * Theme toggle with no React state.
 *
 * The active theme lives in one place — the `data-theme` attribute on <html>,
 * set before first paint by the inline script in the root layout. The icon is
 * chosen by CSS from that same attribute, so there is nothing to hydrate.
 *
 * This design is dark by default, so an absent attribute means dark unless the
 * OS explicitly asks for light.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ??
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem("theme", next);
    } catch {
      // Storage is unavailable in some private-browsing modes; the toggle
      // still works for this page view.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
      className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] text-[var(--ink-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      <span aria-hidden="true" className="theme-icon-moon text-sm">
        ☾
      </span>
      <span aria-hidden="true" className="theme-icon-sun text-sm">
        ☀
      </span>
    </button>
  );
}
