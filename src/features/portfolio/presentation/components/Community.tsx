import React from 'react'
import { Users, Presentation, Calendar } from 'lucide-react'
import { FadeIn } from '@shared/components/animations/FadeIn'
import { GlassCard } from '@shared/components/cards/GlassCard'
import type { CommunityActivity } from '../../domain/entities/portfolioEntities'
import nammaFlutterLogo from '../../../../assets/nammaflutter_logo.png'
import { appConfig } from '@app/config/appConfig'

interface CommunityProps {
  data: CommunityActivity;
}

export const Community: React.FC<CommunityProps> = ({ data }) => {
  const communityImages = Object.values(
    import.meta.glob('/src/assets/community/*.{png,jpg,jpeg,JPG,JPEG,PNG}', { eager: true, import: 'default' })
  ) as string[]

  const row1Images = communityImages.slice(0, Math.ceil(communityImages.length / 2))
  const row2Images = communityImages.slice(Math.ceil(communityImages.length / 2))

  // The 3-card event design with custom tags, icons, descriptions
  const communityCards = [
    {
      title: 'Help Organize Events',
      tag: 'ORGANIZER',
      glowColor: 'blue' as const,
      icon: <Users className="text-accent-blue" size={24} />,
      desc: 'Organized and managed 18+ Flutter meetups, workshops, and developer hackathons.',
    },
    {
      title: 'Host Events',
      tag: 'HOST',
      glowColor: 'purple' as const,
      icon: <Calendar className="text-accent-purple" size={24} />,
      desc: 'Welcomed attendees, validated speakers, and managed the flow of developer meetups.',
    },
    {
      title: 'Conduct Sessions in the Event',
      tag: 'SPEAKER',
      glowColor: 'emerald' as const,
      icon: <Presentation className="text-accent-emerald" size={24} />,
      desc: 'Delivered technical presentations and hands-on workshops covering mobile architectures.',
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Block: Description */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            <FadeIn direction="right" className="space-y-4">
              <div className="flex items-center space-x-3">
                <a 
                  href={appConfig.links.nammaFlutter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-1 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center w-12 h-12 hover:border-accent-blue/50 hover:bg-white/10 transition-all duration-300 flex-shrink-0"
                >
                  <img src={nammaFlutterLogo} alt="Namma Flutter Logo" className="w-full h-full object-contain" />
                </a>
                <div>
                  <h4 className="text-xl font-bold font-display text-white tracking-tight">{data.title}</h4>
                  <p className="text-xs text-accent-blue font-mono mt-0.5">{data.role}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">2025 – 2026 | Chennai, India</p>
                </div>
              </div>

              <p className="text-sm text-text-dim leading-relaxed">
                {data.description}
              </p>

              <div className="pt-2">
                <a
                  href={appConfig.links.nammaFlutter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-accent-blue font-mono hover:text-white transition-colors duration-200"
                >
                  <span>launch_url: {appConfig.links.nammaFlutter}</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Block: 3 Event Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {communityCards.map((card, idx) => (
              <FadeIn key={card.title} direction="up" delay={idx * 0.1} className="h-full">
                <GlassCard
                  glowColor={card.glowColor}
                  spotlight={true}
                  className="p-5 flex flex-col justify-between text-left h-full min-h-[200px]"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        {card.icon}
                      </div>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-slate-300">
                        {card.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <h5 className="font-display font-bold text-sm text-white leading-tight">
                        {card.title}
                      </h5>
                      <p className="text-xs text-text-dim leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
 
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Community Images Ticker */}
        {communityImages.length > 0 && (
          <FadeIn direction="up" delay={0.2} className="w-full mt-16 space-y-6 hover-pause select-none">
            <div className="text-left border-b border-border-subtle/50 pb-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                // COMMUNITY MEMORIES & SNAPSHOTS
              </span>
            </div>

            <div className="relative w-full overflow-hidden py-1">
              {/* Left and right gradient blur overlays */}
              <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-bg-primary via-bg-primary/50 to-transparent z-20 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-bg-primary via-bg-primary/50 to-transparent z-20 pointer-events-none" />

              {/* Row 1: Left to Right (animate-scroll-right) */}
              <div className="flex w-full overflow-hidden">
                <div className="flex space-x-4 animate-scroll-right py-2">
                  {[...row1Images, ...row1Images].map((src, i) => (
                    <div key={`row1-${i}`} className="w-64 h-40 flex-shrink-0 rounded-xl overflow-hidden border border-border-subtle bg-bg-secondary shadow-lg">
                      <img
                        src={src}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        alt={`Community event snapshot ${i}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Right to Left (animate-scroll-left) */}
              <div className="flex w-full overflow-hidden mt-4">
                <div className="flex space-x-4 animate-scroll-left py-2">
                  {[...row2Images, ...row2Images].map((src, i) => (
                    <div key={`row2-${i}`} className="w-64 h-40 flex-shrink-0 rounded-xl overflow-hidden border border-border-subtle bg-bg-secondary shadow-lg">
                      <img
                        src={src}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        alt={`Community meetup snapshot ${i}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        )}

      </div>
    </section>
  )
}
