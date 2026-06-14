import React from 'react'
import { cn } from '@core/utils/cn'

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'purple' | 'emerald' | 'gray' | 'orange';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gray',
  className,
}) => {
  const baseStyles = 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border font-mono tracking-tight transition-all duration-300'
  
  const variants = {
    blue: 'bg-accent-blue/10 border-accent-blue/20 text-accent-blue',
    purple: 'bg-accent-purple/10 border-accent-purple/20 text-accent-purple',
    emerald: 'bg-accent-emerald/10 border-accent-emerald/20 text-accent-emerald',
    gray: 'bg-white/5 border-white/10 text-slate-300',
    orange: 'bg-accent-amber/10 border-accent-amber/20 text-accent-amber',
  }

  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      {children}
    </span>
  )
}
