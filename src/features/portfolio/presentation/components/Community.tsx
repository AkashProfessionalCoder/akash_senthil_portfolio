import React from 'react'
import { Users, Presentation, Calendar, Award, Compass, MessageSquare } from 'lucide-react'
import { FadeIn } from '@shared/components/animations/FadeIn'
import type { CommunityActivity } from '../../domain/entities/portfolioEntities'

interface CommunityProps {
  data: CommunityActivity;
}

export const Community: React.FC<CommunityProps> = ({ data }) => {
  // Stylized mock slides for events
  const mockGalleries = [
    {
      title: 'DevFest Stage Talk',
      tag: 'PUBLIC SPEAKER',
      color: 'from-blue-600/20 to-sky-950/40 border-blue-500/20',
      icon: <Presentation className="text-accent-blue" size={24} />,
      desc: 'Mobile Architectures & CI/CD automation session',
      date: 'March 2026',
    },
    {
      title: 'Namma Flutter Meetup',
      tag: 'ORGANIZER',
      color: 'from-purple-600/20 to-indigo-950/40 border-purple-500/20',
      icon: <Users className="text-accent-purple" size={24} />,
      desc: 'Google-recognized Flutter community developers session',
      date: 'April 2026',
    },
    {
      title: 'Performance Workshop',
      tag: 'INSTRUCTOR',
      color: 'from-emerald-600/20 to-teal-950/40 border-emerald-500/20',
      icon: <Award className="text-accent-emerald" size={24} />,
      desc: 'Profiling memory and reducing rebuild cycles hands-on',
      date: 'June 2026',
    },
  ]

  return (
    <section id="community" className="py-20 border-t border-border-subtle/35">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl">
          <FadeIn direction="up">
            <h2 className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase">
              // ENGAGING ECOSYSTEM
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-display">
              Beyond Code 💙
            </h3>
            <p className="text-text-dim mt-4">
              I actively invest in communities, sharing knowledge, and building engineering circles. Core organizer at Namma Flutter.
            </p>
          </FadeIn>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Block: Description & Activities */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            <FadeIn direction="right" className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-accent-blue">
                  <Compass size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold font-display text-white tracking-tight">{data.title}</h4>
                  <p className="text-xs text-accent-blue font-mono mt-0.5">{data.role}</p>
                </div>
              </div>

              <p className="text-sm text-text-dim leading-relaxed">
                {data.description} I participate in ecosystem initiatives and help organize conferences, code jams, and local networking events.
              </p>
            </FadeIn>

            {/* Bullet activities */}
            <FadeIn direction="right" delay={0.1} className="space-y-3 pt-4 border-t border-border-subtle/40">
              <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                Community Initiatives:
              </span>
              <div className="space-y-2">
                {data.activities.map((act, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <MessageSquare size={14} className="text-accent-blue mt-0.5 flex-shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right Block: Event Slide Previews */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {mockGalleries.map((gallery, idx) => (
              <FadeIn key={gallery.title} direction="up" delay={idx * 0.1}>
                <div className={`h-full rounded-xl border bg-gradient-to-br ${gallery.color} p-5 flex flex-col justify-between text-left shadow-lg`}>
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        {gallery.icon}
                      </div>
                      <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-slate-300">
                        {gallery.tag}
                      </span>
                    </div>

                    {/* Meta details */}
                    <div className="space-y-1">
                      <h5 className="font-display font-bold text-sm text-white leading-tight">
                        {gallery.title}
                      </h5>
                      <p className="text-[11px] text-text-dim leading-normal">
                        {gallery.desc}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center space-x-1 text-[9px] font-mono text-slate-500 mt-6 pt-2 border-t border-white/5">
                    <Calendar size={10} />
                    <span>{gallery.date}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
