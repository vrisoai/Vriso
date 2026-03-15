'use client';

import { useState, useEffect } from 'react';

/**
 * Returns whether the given media query matches. Updates on change.
 * Use for responsive behavior (e.g. disable word-split on mobile, spotlight only on hover devices).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
