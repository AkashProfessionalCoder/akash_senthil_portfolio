import React from 'react'
import { Cpu, Server, ShieldAlert, GitMerge, FileCheck, Layers, Eye } from 'lucide-react'
import { GlassCard } from '@shared/components/cards/GlassCard'
import { FadeIn } from '@shared/components/animations/FadeIn'
import type { SkillCategory } from '../../domain/entities/portfolioEntities'

interface ToolboxProps {
  skills: SkillCategory[];
}

export const Toolbox: React.FC<ToolboxProps> = ({ skills }) => {
  const getIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'mobile engineering':
        return <Cpu className="text-accent-blue" size={20} />
      case 'state management':
        return <Layers className="text-accent-purple" size={20} />
      case 'architecture & system design':
        return <ShieldAlert className="text-accent-emerald" size={20} />
      case 'backend & data integration':
        return <Server className="text-accent-amber" size={20} />
      case 'devops & automation':
        return <GitMerge className="text-accent-blue" size={20} />
      case 'testing & debugging':
        return <FileCheck className="text-accent-purple" size={20} />
      default:
        return <Eye className="text-accent-emerald" size={20} />
    }
  }

  const getGlow = (idx: number) => {
    const glows = ['blue', 'purple', 'emerald', 'orange']
    return glows[idx % glows.length]
  }

  return (
    <section className="py-20 border-t border-border-subtle/35">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl">
          <FadeIn direction="up">
            <h2 className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase">
              // TECHNICAL CAPABILITIES
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-display">
              Engineering Toolbox
            </h3>
            <p className="text-text-dim mt-4">
              Categorized technologies, languages, architectures, and automated setups that I utilize to design, build, and scale digital products.
            </p>
          </FadeIn>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category, idx) => (
            <FadeIn key={category.id} direction="up" delay={idx * 0.05}>
              <GlassCard
                glowColor={getGlow(idx) as any}
                className="h-full flex flex-col justify-between"
              >
                <div className="space-y-4 text-left">
                  {/* Category Header */}
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                      {getIcon(category.categoryName)}
                    </div>
                    <h4 className="font-display font-bold text-sm text-white leading-tight">
                      {category.categoryName}
                    </h4>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-[11px] font-mono rounded border border-border-subtle/60 bg-bg-secondary/50 text-slate-300 transition-colors hover:text-white hover:border-white/15"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
