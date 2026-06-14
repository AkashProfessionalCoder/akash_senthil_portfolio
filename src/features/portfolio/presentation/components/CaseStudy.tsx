import { Settings, Zap, ArrowRight, Layers, FileJson, GitBranch } from 'lucide-react'
import { GlassCard } from '@shared/components/cards/GlassCard'
import { FadeIn } from '@shared/components/animations/FadeIn'
import type { CaseStudy as CaseStudyType } from '../../domain/entities/portfolioEntities'

interface CaseStudyProps {
  data: CaseStudyType;
}

export const CaseStudy: React.FC<CaseStudyProps> = ({ data }) => {
  return (
    <section className="py-20 border-t border-border-subtle/35 bg-bg-secondary/20 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full bg-accent-blue/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-left max-w-2xl">
          <FadeIn direction="up">
            <h2 className="text-xs font-mono font-bold tracking-widest text-accent-purple uppercase">
              // ARCHITECTURAL DEEP DIVE
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-display">
              Featured Case Study
            </h3>
            <p className="text-text-dim mt-4">
              Solving complex scaling problems for enterprise deployments. Here is how I built a white-label mobile engine that handles multi-tenant custom branding.
            </p>
          </FadeIn>
        </div>

        {/* Case Study Card Layout */}
        <FadeIn direction="up">
          <GlassCard glowColor="purple" spotlight={false} className="p-8 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: Problem, Solution, Result */}
              <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-between">
                <div>
                  <h4 className="text-2xl font-bold font-display text-white tracking-tight">
                    {data.title}
                  </h4>
                  <div className="h-[2px] w-20 bg-gradient-to-r from-accent-blue to-accent-purple mt-3 rounded-full" />
                </div>

                <div className="space-y-4">
                  {/* Problem Statement */}
                  <div>
                    <h5 className="text-xs font-mono font-bold text-accent-blue uppercase tracking-widest">
                      [01] THE PROBLEM
                    </h5>
                    <p className="text-sm text-text-dim mt-1.5 leading-relaxed">
                      {data.problem}
                    </p>
                  </div>

                  {/* Solution Statement */}
                  <div>
                    <h5 className="text-xs font-mono font-bold text-accent-purple uppercase tracking-widest">
                      [02] THE SOLUTION
                    </h5>
                    <p className="text-sm text-text-dim mt-1.5 leading-relaxed">
                      {data.solution}
                    </p>
                  </div>
                </div>

                {/* Result Section */}
                <div className="p-4 rounded-lg bg-accent-emerald/5 border border-accent-emerald/20 mt-4">
                  <h5 className="text-xs font-mono font-bold text-accent-emerald uppercase tracking-widest flex items-center space-x-1">
                    <Zap size={12} />
                    <span>THE RESULT</span>
                  </h5>
                  <p className="text-sm font-semibold text-slate-100 mt-1">
                    {data.result}
                  </p>
                </div>
              </div>

              {/* Right Column: Implementation Steps & Technical Diagram */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left border-t lg:border-t-0 lg:border-l border-border-subtle/50 pt-8 lg:pt-0 lg:pl-8">
                
                {/* Implementation List */}
                <div className="space-y-4">
                  <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                    // KEY ARCHITECTURE BLOCKS
                  </h5>
                  
                  <div className="space-y-3">
                    {data.implementation.map((step, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-xs text-slate-300">
                        <div className="mt-0.5 p-1 rounded bg-white/5 border border-white/10 text-accent-purple flex-shrink-0">
                          <Settings size={12} />
                        </div>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flow Visualization */}
                <div className="p-4 rounded-lg bg-bg-secondary border border-border-subtle">
                  <span className="text-[10px] font-mono text-slate-500 block mb-2 uppercase">
                    Build & Distribution Pipeline:
                  </span>
                  
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <div className="flex flex-col items-center p-2 rounded bg-white/5 border border-white/10 w-[28%] text-center">
                      <GitBranch size={14} className="text-accent-blue mb-1" />
                      <span className="text-[8px] truncate">1 Codebase</span>
                    </div>
                    <ArrowRight size={12} className="text-slate-600" />
                    <div className="flex flex-col items-center p-2 rounded bg-white/5 border border-white/10 w-[30%] text-center">
                      <FileJson size={14} className="text-accent-purple mb-1" />
                      <span className="text-[8px] truncate">Dynamic Config</span>
                    </div>
                    <ArrowRight size={12} className="text-slate-600" />
                    <div className="flex flex-col items-center p-2 rounded bg-white/5 border border-white/10 w-[28%] text-center">
                      <Layers size={14} className="text-accent-emerald mb-1" />
                      <span className="text-[8px] truncate">7 App Stores</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  )
}
