import { Check, Smartphone, ExternalLink } from 'lucide-react'
import { GlassCard } from '@shared/components/cards/GlassCard'
import { Badge } from '@shared/components/common/Badge'
import { FadeIn } from '@shared/components/animations/FadeIn'
import type { Project } from '../../domain/entities/portfolioEntities'

interface ProductsProps {
  projects: Project[];
}

export const Products: React.FC<ProductsProps> = ({ projects }) => {
  
  // Custom styled CSS screens matching project types
  const renderMockScreen = (id: string) => {
    switch (id) {
      case 'proj-1': // Samaaro
        return (
          <div className="w-full h-44 rounded-lg bg-gradient-to-br from-slate-900 to-sky-950/80 border border-white/5 relative overflow-hidden flex flex-col p-3 font-sans">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[10px] text-sky-400 font-mono tracking-widest">SAMAARO // COLLOQUIUM</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
            </div>
            <div className="mt-3 space-y-2 flex-1">
              <div className="h-6 rounded bg-white/5 border border-white/10 flex items-center px-2 justify-between">
                <span className="text-[9px] text-white">Main Conference Hall</span>
                <span className="text-[8px] text-sky-400 px-1 py-0.5 rounded bg-sky-950 font-mono">10:00 AM</span>
              </div>
              <div className="h-6 rounded bg-white/5 border border-white/10 flex items-center px-2 justify-between">
                <span className="text-[9px] text-slate-400">Networking Lounge</span>
                <span className="text-[8px] text-slate-500 font-mono">01:30 PM</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[8px] text-slate-500 font-mono mt-auto">
              <span>ACTIVE SESSION</span>
              <span>7 CLIENT BUILDS</span>
            </div>
          </div>
        )
      case 'proj-2': // Namma Wallet
        return (
          <div className="w-full h-44 rounded-lg bg-gradient-to-br from-slate-900 to-purple-950/80 border border-white/5 relative overflow-hidden flex flex-col p-3 font-sans">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[10px] text-purple-400 font-mono tracking-widest">NAMMA WALLET</span>
              <span className="text-[8px] text-slate-400">USD</span>
            </div>
            <div className="mt-4 text-center">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Total Balance</span>
              <span className="text-xl font-bold font-display text-white tracking-tight">$42,950.45</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-auto">
              <div className="h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[8px] text-purple-400 font-bold">
                SEND
              </div>
              <div className="h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[8px] text-emerald-400 font-bold">
                RECEIVE
              </div>
            </div>
          </div>
        )
      case 'proj-3': // PepsiCo Delivery
        return (
          <div className="w-full h-44 rounded-lg bg-gradient-to-br from-slate-900 to-emerald-950/80 border border-white/5 relative overflow-hidden flex flex-col p-3 font-sans">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[10px] text-emerald-400 font-mono tracking-widest">PEPSICO // DISTRIB</span>
              <span className="text-[8px] text-slate-400 font-mono">OFFLINE_OK</span>
            </div>
            <div className="mt-3 flex-1 flex flex-col justify-center space-y-1.5">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded bg-emerald-500" />
                <span className="text-[9px] text-white">Route 4A Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded bg-slate-700" />
                <span className="text-[9px] text-slate-400">Route 4B Pending (3 stores)</span>
              </div>
            </div>
            <div className="text-[8px] text-slate-500 font-mono mt-auto flex justify-between">
              <span>SYNC STATUS</span>
              <span>100% SECURE</span>
            </div>
          </div>
        )
      default: // Apex Invest
        return (
          <div className="w-full h-44 rounded-lg bg-gradient-to-br from-slate-900 to-amber-950/80 border border-white/5 relative overflow-hidden flex flex-col p-3 font-sans">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[10px] text-amber-400 font-mono tracking-widest">APEX INVEST</span>
              <span className="text-[8px] text-amber-400 font-mono">SECURE</span>
            </div>
            <div className="mt-4 flex items-end space-x-1.5 h-12 justify-center">
              <div className="w-2.5 h-6 bg-white/5 rounded-t" />
              <div className="w-2.5 h-8 bg-white/10 rounded-t" />
              <div className="w-2.5 h-12 bg-amber-500/20 rounded-t border-t border-amber-400" />
              <div className="w-2.5 h-10 bg-amber-500/30 rounded-t border-t border-amber-400" />
              <div className="w-2.5 h-14 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t" />
            </div>
            <div className="flex justify-between text-[8px] text-slate-500 font-mono mt-auto">
              <span>QUARTERLY GROWTH</span>
              <span>+14.2%</span>
            </div>
          </div>
        )
    }
  }

  return (
    <section id="work" className="py-20 border-t border-border-subtle/35">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="text-left max-w-2xl">
            <FadeIn direction="up">
              <h2 className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase">
                // PRODUCTION SHIPPED
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-display">
                Products I've Engineered
              </h3>
              <p className="text-text-dim mt-4">
                Mobile applications I developed, deployed, and continue maintaining across iOS and Android. Built on scalable architectures.
              </p>
            </FadeIn>
          </div>
          
          {/* Badge links to store portfolios */}
          <FadeIn direction="left" className="flex gap-4">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all font-mono text-xs text-slate-300"
            >
              <Smartphone size={14} />
              <span>App Store</span>
              <ExternalLink size={10} className="text-slate-500" />
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all font-mono text-xs text-slate-300"
            >
              <Smartphone size={14} />
              <span>Play Store</span>
              <ExternalLink size={10} className="text-slate-500" />
            </a>
          </FadeIn>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <FadeIn key={project.id} direction="up" delay={idx * 0.1}>
              <GlassCard
                glowColor={idx % 2 === 0 ? 'blue' : 'purple'}
                className="h-full flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Mock Screen Preview Box */}
                  {renderMockScreen(project.id)}

                  {/* Project Title and Status */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold font-display text-white">{project.name}</h4>
                      <p className="text-xs text-accent-blue font-mono mt-0.5">{project.role}</p>
                    </div>
                    <Badge variant={project.status === 'LIVE' ? 'emerald' : 'orange'}>
                      {project.status}
                    </Badge>
                  </div>

                  {/* Project description */}
                  <p className="text-sm text-text-dim leading-relaxed text-left">
                    {project.description}
                  </p>

                  {/* Ownership Checkboxes */}
                  <div className="space-y-2 text-left">
                    <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                      Responsibility & Ownership:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.ownership.map((owner, oIdx) => (
                        <div key={oIdx} className="flex items-center space-x-2 text-xs text-slate-300">
                          <Check size={14} className="text-accent-emerald flex-shrink-0" />
                          <span className="truncate">{owner}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div className="space-y-2 text-left pt-2 border-t border-border-subtle/50">
                    <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                      Tech Stack:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="gray">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* External links footer */}
                {(project.appStoreUrl || project.playStoreUrl) && (
                  <div className="flex space-x-4 mt-6 pt-4 border-t border-border-subtle/50 justify-end">
                    {project.appStoreUrl && (
                      <a
                        href={project.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-text-dim hover:text-white flex items-center space-x-1"
                      >
                        <span>iOS Link</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                    {project.playStoreUrl && (
                      <a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-text-dim hover:text-white flex items-center space-x-1"
                      >
                        <span>Android Link</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                )}
              </GlassCard>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
