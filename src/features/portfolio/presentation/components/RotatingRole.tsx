import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@core/hooks/usePointerCapability'

interface RotatingRoleProps {
  roles: string[];
  intervalMs?: number;
}

export const RotatingRole: React.FC<RotatingRoleProps> = ({ roles, intervalMs = 2600 }) => {
  const [index, setIndex] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (roles.length <= 1 || reducedMotion) return
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), intervalMs)
    return () => clearInterval(id)
  }, [roles, intervalMs, reducedMotion])

  // Single role, reduced motion, or SSR/first paint (reducedMotion defaults
  // false there too, but index is always 0 on both sides either way): a
  // plain static span, no crossfade churn.
  if (roles.length <= 1 || reducedMotion) {
    return <span>{roles[0]}</span>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={roles[index]}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35 }}
        className="inline-block"
      >
        {roles[index]}
      </motion.span>
    </AnimatePresence>
  )
}
