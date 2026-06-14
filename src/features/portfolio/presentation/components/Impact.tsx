import React from 'react'
import { CheckCircle2, Award, Terminal, HardDrive } from 'lucide-react'
import { GlassCard } from '@shared/components/cards/GlassCard'
import { FadeIn } from '@shared/components/animations/FadeIn'
import type { PortfolioData } from '../../domain/entities/portfolioEntities'

interface ImpactProps {
  stats: PortfolioData['impactStats'];
}

export const Impact: React.FC<ImpactProps> = ({ stats }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'stat-1':
        return <Award className="text-accent-blue" size={24} />
      case 'stat-2':
        return <Terminal className="text-accent-purple" size={24} />
      case 'stat-3':
        return <CheckCircle2 className="text-accent-emerald" size={24} />
      default:
        return <HardDrive className="text-accent-amber" size={24} />
    }
  }

  const getGlow = (id: string) => {
    switch (id) {
      case 'stat-1':
        return 'blue'
      case 'stat-2':
        return 'purple'
      case 'stat-3':
        return 'emerald'
      default:
        return 'orange'
    }
  }

  return (
    <section id="engineering" className="py-20 border-t border-border-subtle/35">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl">
          <FadeIn direction="up">
            <h2 className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase">
              // ENGINEERING METRICS
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-display">
              Quantifiable Impact & Ownership
            </h3>
            <p className="text-text-dim mt-4">
              Building apps isn't just about writing code; it's about owning the lifecycle, ensuring scalability, and delivering business value.
            </p>
          </FadeIn>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat, idx) => (
            <FadeIn key={stat.id} direction="up" delay={idx * 0.1}>
              <GlassCard
                glowColor={getGlow(stat.id) as any}
                className="h-full flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex justify-between items-center">
                    <span className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
                      {stat.value}
                    </span>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      {getIcon(stat.id)}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-lg text-white">
                      {stat.label}
                    </h4>
                    <p className="text-sm text-text-dim leading-relaxed">
                      {stat.subtitle}
                    </p>
                  </div>

                  {/* Bullet Details */}
                  {stat.details && stat.details.length > 0 && (
                    <div className="pt-4 border-t border-border-subtle/50">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-mono">
                        {stat.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
