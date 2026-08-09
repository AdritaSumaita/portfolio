import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-32">
      <p className="label-mono text-[var(--accent)]">Error</p>
      <p className="mt-4 font-[family-name:var(--font-grotesk)] text-7xl font-semibold tracking-tight text-transparent [-webkit-text-stroke:1px_var(--line-strong)] sm:text-8xl">
        404
      </p>
      <h1 className="mt-6 font-[family-name:var(--font-grotesk)] text-3xl font-semibold tracking-tight text-[var(--ink)]">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--ink-soft)]">
        That page does not exist. The projects are all reachable from the home
        page.
      </p>
      <Link
        href="/"
        className="mt-9 inline-block rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--on-accent)] transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
}
