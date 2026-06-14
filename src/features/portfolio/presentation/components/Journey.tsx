import React from 'react'
import { Calendar, Briefcase, ChevronRight } from 'lucide-react'
import { GlassCard } from '@shared/components/cards/GlassCard'
import { Badge } from '@shared/components/common/Badge'
import { FadeIn } from '@shared/components/animations/FadeIn'
import type { JourneyItem } from '../../domain/entities/portfolioEntities'

interface JourneyProps {
  journey: JourneyItem[];
}

export const Journey: React.FC<JourneyProps> = ({ journey }) => {
  return (
    <section className="py-20 border-t border-border-subtle/35">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto">
          <FadeIn direction="up">
            <h2 className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase">
              // CAREER PROGRESSION
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-display">
              Engineering Journey
            </h3>
            <p className="text-text-dim mt-4">
              A chronology of shipping applications, leading system architecture, and contributing back to the community.
            </p>
          </FadeIn>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-border-subtle/70 ml-4 md:ml-32 space-y-12">
          {journey.map((item, idx) => (
            <div key={item.id} className="relative pl-8 md:pl-12">
              
              {/* Year indicator left-aligned on desktop */}
              <div className="absolute top-0 -left-[20px] md:-left-[120px] w-9 h-9 md:w-24 md:h-9 flex items-center md:justify-end text-sm md:text-base font-bold font-mono text-accent-blue bg-bg-primary">
                <span className="hidden md:inline mr-3">{item.year}</span>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-accent-blue bg-bg-primary shadow-lg shadow-accent-blue/30 relative z-10" />
              </div>

              <FadeIn direction="up" delay={idx * 0.15}>
                <GlassCard
                  glowColor={idx === 2 ? 'emerald' : idx === 1 ? 'purple' : 'blue'}
                  className="p-6 md:p-8"
                >
                  <div className="space-y-4 text-left">
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div>
                        {/* Mobile Year Badge */}
                        <div className="md:hidden flex items-center space-x-1 text-xs font-mono text-accent-blue font-bold mb-1">
                          <Calendar size={12} />
                          <span>{item.year}</span>
                        </div>
                        
                        <h4 className="text-lg font-bold font-display text-white tracking-tight flex items-center">
                          <Briefcase size={16} className="text-text-dim mr-2 flex-shrink-0" />
                          <span>{item.title}</span>
                        </h4>
                        <p className="text-sm text-accent-blue font-mono mt-0.5">{item.company}</p>
                      </div>
                      
                      <span className="text-xs text-text-dim font-mono self-start sm:self-center px-2 py-0.5 rounded border border-border-subtle bg-white/5">
                        {item.role}
                      </span>
                    </div>

                    {/* Accomplishments */}
                    <div className="space-y-2.5 pt-4 border-t border-border-subtle/50">
                      {item.workDone.map((work, wIdx) => (
                        <div key={wIdx} className="flex items-start space-x-2 text-xs md:text-sm text-text-dim leading-relaxed">
                          <ChevronRight size={14} className="text-accent-blue mt-1 flex-shrink-0" />
                          <span>{work}</span>
                        </div>
                      ))}
                    </div>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-4">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="gray">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                  </div>
                </GlassCard>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
