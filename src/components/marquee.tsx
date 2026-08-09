/**
 * Continuous ticker of short strings.
 *
 * The list is rendered twice and the track translates -50%, so the loop is
 * seamless. Pauses on hover; the animation is disabled entirely under
 * reduced-motion by the global rule in globals.css. The duplicate copy is
 * aria-hidden so a screen reader hears the list once.
 */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-3 pr-3"
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-3 whitespace-nowrap text-sm text-[var(--ink-soft)]"
        >
          <span aria-hidden="true" className="text-[var(--accent)]">
            ◦
          </span>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee marquee-mask relative w-full overflow-hidden py-4">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
