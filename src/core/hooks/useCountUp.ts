import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { usePrefersReducedMotion } from './usePointerCapability'

interface CountTarget {
  prefix: string;
  number: number;
  decimals: number;
  suffix: string;
}

/**
 * Splits a leading numeric portion out of a stat string like '3.8+ Years' or
 * '100%' into its pieces, so the number can be animated while the rest of
 * the string stays put. Returns null for strings with no leading number
 * ('Open Source', 'Public Speaker', 'Enterprise') - callers fall back to
 * rendering those unchanged.
 */
export function parseCountTarget(value: string): CountTarget | null {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return null
  const [, prefix, numStr, suffix] = match
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0
  return { prefix, number: parseFloat(numStr), decimals, suffix }
}

/**
 * Counts up to the numeric portion of `rawValue` once its ref scrolls into
 * view, respecting prefers-reduced-motion. Safe to call on any stat string,
 * numeric or not - non-numeric values just render as-is, unanimated.
 */
export function useCountUp(rawValue: string, durationMs = 1200) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reducedMotion = usePrefersReducedMotion()
  const target = parseCountTarget(rawValue)
  // Non-numeric values ('Open Source', 'Enterprise') and reduced-motion both
  // skip the animation entirely - rawValue is returned directly below
  // rather than through state, so the effect never needs to setState just
  // to "turn the animation off".
  const shouldAnimate = target !== null && !reducedMotion

  // Numeric + animating: start at 0. Server and first client render agree
  // (isInView is false until an effect fires), so there's no flash of the
  // final value before the count-up plays.
  const [display, setDisplay] = useState(() => (target ? `${target.prefix}0${target.suffix}` : rawValue))

  useEffect(() => {
    if (!shouldAnimate || !isInView) return
    // Recomputed here (not read from the render-scope `target` above) so
    // this effect's dependency array can use primitives - `target` is a
    // fresh object every render, which would otherwise retrigger (and
    // restart) the animation on every tick's own setDisplay-caused re-render.
    const parsed = parseCountTarget(rawValue)
    if (!parsed) return

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1)
      const eased = 1 - (1 - t) ** 3
      const current = parsed.number * eased
      setDisplay(`${parsed.prefix}${current.toFixed(parsed.decimals)}${parsed.suffix}`)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, shouldAnimate, rawValue, durationMs])

  return { ref, display: shouldAnimate ? display : rawValue }
}
