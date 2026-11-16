import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

// Sits as the last child inside Navbar's <header>, which is already
// position: sticky - absolute bottom-0 inherits that for free, with no
// hardcoded header-height constant to keep in sync.
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-accent-blue via-accent-purple to-accent-emerald"
      style={{ scaleX }}
    />
  )
}
