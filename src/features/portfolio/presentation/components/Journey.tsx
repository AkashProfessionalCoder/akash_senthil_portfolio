import React, { useState } from 'react'
import { Calendar, Briefcase, ChevronRight, MapPin } from 'lucide-react'
import { GlassCard } from '@shared/components/cards/GlassCard'
import { Badge } from '@shared/components/common/Badge'
import { FadeIn } from '@shared/components/animations/FadeIn'
import type { JourneyItem } from '../../domain/entities/portfolioEntities'

const CompanyLogo: React.FC<{ company: string; logoUrl?: string }> = ({ company, logoUrl }) => {
  const [hasError, setHasError] = useState(false)

  const getCompanyLogoClass = (name: string) => {
    if (name.toLowerCase().includes('samaaro')) {
      return 'bg-gradient-to-br from-accent-purple/20 to-indigo-950/40 border border-accent-purple/30 text-accent-purple'
    }
    return 'bg-gradient-to-br from-accent-blue/20 to-cyan-950/40 border border-accent-blue/30 text-accent-blue'
  }

  return (
    <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-md bg-white/5 border border-white/10">
      {logoUrl && !hasError ? (
        <img
          src={logoUrl}
          alt={`${company} logo`}
          className="w-full h-full object-contain p-1.5 bg-white/5"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center font-display font-extrabold text-lg ${getCompanyLogoClass(company)}`}>
          {company.charAt(0)}
        </div>
      )}
    </div>
  )
}

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
        <div className="relative border-l border-border-subtle/70 ml-4 md:ml-48 space-y-12">
          {journey.map((item, idx) => {
            const isSamaaro = item.company.toLowerCase().includes('samaaro')
            const glowColor = isSamaaro ? 'purple' : 'blue'
            const hoverBorder = isSamaaro ? 'group-hover:border-accent-purple/40 shadow-accent-purple/2' : 'group-hover:border-accent-blue/40 shadow-accent-blue/2'
            const hoverText = isSamaaro ? 'group-hover:text-accent-purple' : 'group-hover:text-accent-blue'

            return (
              <div key={item.id} className="relative pl-8 md:pl-12">

                {/* Timeline Dot */}
                <div className="absolute top-1.5 -left-[7px] w-3.5 h-3.5 rounded-full border-2 border-accent-blue bg-bg-primary shadow-lg shadow-accent-blue/30 z-10" />

                {/* Desktop Year Text */}
                <div className="hidden md:block absolute top-1 -left-[180px] w-40 text-right text-xs font-bold font-mono text-accent-blue">
                  {item.year}
                </div>

                <FadeIn direction="up" delay={idx * 0.15}>
                  {item.companyUrl ? (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group cursor-pointer h-full"
                    >
                      <GlassCard
                        glowColor={glowColor}
                        className={`p-6 md:p-8 transition-all duration-300 ${hoverBorder}`}
                      >
                        <div className="space-y-4 text-left">

                          {/* Header */}
                          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                            <div className="flex items-start space-x-4">
                              <CompanyLogo company={item.company} logoUrl={item.logoUrl} />
                              <div className="space-y-1 text-left">
                                {/* Mobile Year Badge */}
                                <div className="md:hidden flex items-center space-x-1 text-xs font-mono text-accent-blue font-bold">
                                  <Calendar size={12} />
                                  <span>{item.year}</span>
                                </div>

                                <h4 className={`text-lg font-bold font-display text-white tracking-tight flex items-center transition-colors duration-200 ${hoverText}`}>
                                  <Briefcase size={16} className="text-text-dim mr-2 flex-shrink-0" />
                                  <span>{item.title}</span>
                                </h4>

                                <p className="text-sm text-text-dim font-mono">{item.company}</p>

                                {item.location && (
                                  <p className="flex items-center text-[11px] text-slate-500 font-mono">
                                    <MapPin size={11} className="mr-1 text-slate-600 flex-shrink-0" />
                                    <span>{item.location}</span>
                                  </p>
                                )}
                              </div>
                            </div>


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
                    </a>
                  ) : (
                    <GlassCard
                      glowColor={glowColor}
                      className="p-6 md:p-8"
                    >
                      <div className="space-y-4 text-left">

                        {/* Header without link */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                          <div className="flex items-start space-x-4">
                            <CompanyLogo company={item.company} logoUrl={item.logoUrl} />
                            <div className="space-y-1 text-left">
                              {/* Mobile Year Badge */}
                              <div className="md:hidden flex items-center space-x-1 text-xs font-mono text-accent-blue font-bold">
                                <Calendar size={12} />
                                <span>{item.year}</span>
                              </div>

                              <h4 className="text-lg font-bold font-display text-white tracking-tight flex items-center">
                                <Briefcase size={16} className="text-text-dim mr-2 flex-shrink-0" />
                                <span>{item.title}</span>
                              </h4>

                              <p className="text-sm text-text-dim font-mono">{item.company}</p>

                              {item.location && (
                                <p className="flex items-center text-[11px] text-slate-500 font-mono">
                                  <MapPin size={11} className="mr-1 text-slate-600 flex-shrink-0" />
                                  <span>{item.location}</span>
                                </p>
                              )}
                            </div>
                          </div>


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
                  )}
                </FadeIn>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
