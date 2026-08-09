"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Static export bakes the build-time year into the HTML. Reading it through
 * useSyncExternalStore (server snapshot null, like LocalTime) swaps in the
 * client's real year after hydration with no mismatch, so the footer doesn't
 * go stale across a year boundary between deploys.
 */
export function CopyrightYear() {
  const subscribe = useCallback(() => () => {}, []);
  const getSnapshot = useCallback(() => new Date().getFullYear(), []);
  const getServerSnapshot = useCallback(() => null, []);

  const year = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return <>{year}</>;
}
