import React from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { cn } from '@core/utils/cn'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'emerald' | 'none';
  spotlight?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glowColor = 'blue',
  spotlight = true,
  ...props
}) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const glowStyles = {
    blue: 'hover:border-accent-blue/35 hover:shadow-accent-blue/5',
    purple: 'hover:border-accent-purple/35 hover:shadow-accent-purple/5',
    emerald: 'hover:border-accent-emerald/35 hover:shadow-accent-emerald/5',
    none: 'hover:border-white/15',
  }

  const glowColorMap = {
    blue: 'rgba(14, 165, 233, 0.09)',
    purple: 'rgba(168, 85, 247, 0.09)',
    emerald: 'rgba(16, 185, 129, 0.09)',
    none: 'rgba(255, 255, 255, 0.04)',
  }

  const backgroundTemplate = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      ${glowColorMap[glowColor]},
      transparent 80%
    )
  `

  return (
    <div
      onMouseMove={spotlight ? handleMouseMove : undefined}
      className={cn(
        'group relative overflow-hidden rounded-xl glass-panel glass-panel-hover p-6 border border-border-subtle bg-bg-card',
        glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {/* Interactive spotlight overlay */}
      {spotlight && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
          style={{ background: backgroundTemplate }}
        />
      )}
      
      {/* Content wrapper */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  )
}
