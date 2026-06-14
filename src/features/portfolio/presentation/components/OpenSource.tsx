import React, { useMemo } from 'react'
import { GitPullRequest, GitFork, Star, Github } from 'lucide-react'
import { GlassCard } from '@shared/components/cards/GlassCard'
import { FadeIn } from '@shared/components/animations/FadeIn'
import type { OpenSourceProject } from '../../domain/entities/portfolioEntities'

interface OpenSourceProps {
  data: OpenSourceProject;
}

export const OpenSource: React.FC<OpenSourceProps> = ({ data }) => {
  // Generate mock GitHub activity cells
  // 30 columns x 7 rows = 210 cells for a nice responsive container width
  const activityData = useMemo(() => {
    const cells = []
    const shades = [
      'bg-slate-900 border-slate-950',        // no activity
      'bg-emerald-950 border-emerald-900/40', // low activity
      'bg-emerald-800 border-emerald-700/40', // med-low activity
      'bg-emerald-600 border-emerald-500/40', // med-high activity
      'bg-emerald-400 border-emerald-300/40', // high activity
    ]

    for (let i = 0; i < 210; i++) {
      // Programmatically bias contribution density for a realistic Git graph look
      const rand = Math.random()
      let shadeIdx = 0
      if (rand > 0.88) shadeIdx = 4
      else if (rand > 0.72) shadeIdx = 3
      else if (rand > 0.55) shadeIdx = 2
      else if (rand > 0.35) shadeIdx = 1

      cells.push({
        id: i,
        shade: shades[shadeIdx],
      })
    }
    return cells
  }, [])

  return (
    <section className="py-20 border-t border-border-subtle/35">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl">
          <FadeIn direction="up">
            <h2 className="text-xs font-mono font-bold tracking-widest text-accent-emerald uppercase">
              // COLLABORATIVE EFFORTS
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-display">
              Building Beyond Work
            </h3>
            <p className="text-text-dim mt-4">
              I believe in giving back to the ecosystem. I dedicate time to code optimization, building community modules, and maintaining repositories.
            </p>
          </FadeIn>
        </div>

        {/* Showcase Layout */}
        <FadeIn direction="up">
          <GlassCard glowColor="emerald" spotlight={false} className="p-8 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Side: Repo Details */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-accent-emerald">
                    <Github size={24} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold font-display text-white tracking-tight flex items-center">
                      <span>{data.name}</span>
                    </h4>
                    <p className="text-xs text-accent-emerald font-mono mt-0.5">{data.role}</p>
                  </div>
                </div>

                <p className="text-sm text-text-dim leading-relaxed">
                  Contributed key architectures to the Namma Wallet mobile client. Modularized widget frames and implemented Fastlane deployment routines.
                </p>

                {/* Contribution list */}
                <div className="space-y-3">
                  <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                    Key Contributions:
                  </span>
                  
                  <div className="space-y-2.5">
                    {data.contributions.map((contribution, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <GitPullRequest size={14} className="text-accent-emerald mt-0.5 flex-shrink-0" />
                        <span>{contribution}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {data.githubUrl && (
                  <div className="pt-4 flex items-center space-x-4 text-xs font-mono text-text-dim">
                    <a
                      href={data.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-border-subtle bg-white/5 hover:text-white transition-colors"
                    >
                      <Github size={12} />
                      <span>View Repository</span>
                    </a>
                    <span className="flex items-center space-x-1">
                      <Star size={12} />
                      <span>150+ Stars</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <GitFork size={12} />
                      <span>42 forks</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Right Side: GitHub Activity Grid */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-5 rounded-xl border border-border-subtle bg-bg-secondary/80">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-4 border-b border-border-subtle/50 pb-2">
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                      <span>Git Activity Graph</span>
                    </span>
                    <span>1,850+ commits / yr</span>
                  </div>

                  {/* Contributions Grid */}
                  <div className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto justify-center md:justify-start">
                    {activityData.map((cell) => (
                      <div
                        key={cell.id}
                        className={`w-[10px] h-[10px] rounded-[1.5px] border-[0.5px] transition-all duration-300 hover:scale-125 ${cell.shade}`}
                      />
                    ))}
                  </div>

                  {/* Git Activity Footer Indicators */}
                  <div className="flex items-center justify-between mt-4 text-[10px] font-mono text-slate-500">
                    <span>Jan</span>
                    <div className="flex items-center space-x-1">
                      <span>Less</span>
                      <div className="w-[10px] h-[10px] rounded-[1.5px] bg-slate-900 border border-slate-950" />
                      <div className="w-[10px] h-[10px] rounded-[1.5px] bg-emerald-950 border border-emerald-900/40" />
                      <div className="w-[10px] h-[10px] rounded-[1.5px] bg-emerald-800 border border-emerald-700/40" />
                      <div className="w-[10px] h-[10px] rounded-[1.5px] bg-emerald-600 border border-emerald-500/40" />
                      <div className="w-[10px] h-[10px] rounded-[1.5px] bg-emerald-400 border border-emerald-300/40" />
                      <span>More</span>
                    </div>
                    <span>Dec</span>
                  </div>
                </div>

                <p className="text-[11px] font-mono text-slate-500 text-left">
                  * Grid represents aggregated contributions across private and public Git servers including GitHub and GitLab.
                </p>
              </div>

            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  )
}
