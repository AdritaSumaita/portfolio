"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Live local time where she is.
 *
 * A clock is an external, changing source, so it is read with
 * useSyncExternalStore rather than mirrored into state from an effect. The
 * server snapshot is null — the server cannot know the current time — and
 * useSyncExternalStore swaps to the client value after hydration without a
 * mismatch.
 */
export function LocalTime({
  timeZone = "Europe/Helsinki",
}: {
  timeZone?: string;
}) {
  const subscribe = useCallback((onChange: () => void) => {
    const id = setInterval(onChange, 30_000);
    return () => clearInterval(id);
  }, []);

  const getSnapshot = useCallback(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
      }).format(new Date()),
    [timeZone]
  );

  const getServerSnapshot = useCallback(() => null, []);

  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!time) return null;

  return (
    <span className="label-mono">
      <span
        aria-hidden="true"
        className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] align-middle"
      />
      {time} in Tampere
    </span>
  );
}
