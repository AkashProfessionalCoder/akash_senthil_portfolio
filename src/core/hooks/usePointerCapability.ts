import { useSyncExternalStore } from 'react'

const noopSubscribe = () => () => {}

// SSR-safe matchMedia checks. The server snapshot (and therefore the
// client's very first render, before hydration settles) is always `false`,
// matching SiteCursor.tsx's existing pattern for the same reason - nothing
// to reconcile a hydration mismatch against.
export const usePrefersReducedMotion = (): boolean => {
  return useSyncExternalStore(
    noopSubscribe,
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )
}

export const useHasFinePointer = (): boolean => {
  return useSyncExternalStore(
    noopSubscribe,
    () => typeof window !== 'undefined' && window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches,
    () => false,
  )
}
