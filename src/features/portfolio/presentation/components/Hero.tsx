import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { Button } from '@shared/components/buttons/Button'
import { appConfig } from '@app/config/appConfig'
import type { PortfolioData } from '../../domain/entities/portfolioEntities'
import profileImg from '../../../../assets/akash_profile.jpg'

interface HeroProps {
  data: PortfolioData['hero'];
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  // Floating technology tags around profile picture
  const techTags = [
    {
      name: 'Flutter',
      color: 'border-sky-500/20 text-sky-400 bg-sky-950/40 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(2,86,155,0.45)] shadow-[0_0_12px_rgba(2,86,155,0.2)]',
      logo: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.314 0L2.3 12l3.87 3.87 15.83-15.87h-7.686zm-4.144 16.143l-3.87-3.87L2.3 16.143l12.014 12.014h7.686l-11.83-12.014z" fill="#40C4FF" />
        </svg>
      ),
      position: 'top-0 left-4 sm:left-10',
      floatClass: 'animate-float-1',
    },
    {
      name: 'Dart',
      color: 'border-teal-500/20 text-teal-400 bg-teal-950/40 hover:border-teal-400/50 hover:shadow-[0_0_20px_rgba(0,180,171,0.45)] shadow-[0_0_12px_rgba(0,180,171,0.2)]',
      logo: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#00B4AB" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#00B4AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      position: 'top-0 right-4 sm:right-10',
      floatClass: 'animate-float-2',
    },
    {
      name: 'Google Cloud',
      color: 'border-blue-500/20 text-blue-400 bg-blue-950/40 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(66,133,244,0.45)] shadow-[0_0_12px_rgba(66,133,244,0.2)]',
      logo: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4" />
          <path d="M19 15h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z" fill="#34A853" />
        </svg>
      ),
      position: 'top-1/4 -right-8 sm:-right-14',
      floatClass: 'animate-float-3',
    },
    {
      name: 'Android',
      color: 'border-emerald-500/20 text-emerald-400 bg-emerald-950/40 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(61,220,132,0.45)] shadow-[0_0_12px_rgba(61,220,132,0.2)]',
      logo: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.63 3.22L18 1.83a.5.5 0 0 0-.71-.71l-1.46 1.46A9.95 9.95 0 0 0 12 2c-1.37 0-2.68.28-3.83.78L6.71 1.32a.5.5 0 0 0-.71.71l1.39 1.39A10.02 10.02 0 0 0 2 13h20a10.02 10.02 0 0 0-5.37-9.78zM7 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM2 14.5v3.5a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-3.5H2z" fill="#3DDC84" />
        </svg>
      ),
      position: 'bottom-12 -right-8 sm:-right-14',
      floatClass: 'animate-float-1',
    },
    {
      name: 'iOS',
      color: 'border-slate-500/20 text-white bg-slate-900/40 hover:border-slate-400/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] shadow-[0_0_12px_rgba(255,255,255,0.15)]',
      logo: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.82M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
        </svg>
      ),
      position: 'bottom-0 right-6 sm:right-16',
      floatClass: 'animate-float-2',
    },
    {
      name: 'Web',
      color: 'border-cyan-500/20 text-cyan-400 bg-cyan-950/40 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.45)] shadow-[0_0_12px_rgba(56,189,248,0.2)]',
      logo: (
        <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      position: 'bottom-0 left-6 sm:left-16',
      floatClass: 'animate-float-3',
    },
    {
      name: 'BLoC',
      color: 'border-sky-500/20 text-sky-400 bg-sky-950/40 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.45)] shadow-[0_0_12px_rgba(14,165,233,0.2)]',
      logo: (
        <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" fill="currentColor" fillOpacity="0.1" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      position: 'bottom-12 -left-8 sm:-left-14',
      floatClass: 'animate-float-1',
    },
    {
      name: 'Figma',
      color: 'border-purple-500/20 text-purple-400 bg-purple-950/40 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(162,89,255,0.45)] shadow-[0_0_12px_rgba(162,89,255,0.2)]',
      logo: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M8 24a4 4 0 0 1-4-4 4 4 0 0 1 4-4h4v4a4 4 0 0 1-4 4z" fill="#0ACF83" />
          <path d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" fill="#A259FF" />
          <path d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" fill="#F24E1E" />
          <path d="M12 0h4a4 4 0 0 1 4 4 4 4 0 0 1-4 4h-4V0z" fill="#FF7262" />
          <path d="M20 12a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4h4a4 4 0 0 1 4 4z" fill="#1ABCFE" />
        </svg>
      ),
      position: 'top-1/4 -left-8 sm:-left-14',
      floatClass: 'animate-float-2',
    }
  ]

  const handleExploreClick = () => {
    const element = document.querySelector('#work') || document.querySelector('#engineering')
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="hero" className="relative py-12 md:py-24 overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent-blue/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent-purple/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Text details */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-6 text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-accent-blue/20 bg-accent-blue/5 text-accent-blue text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
            <span>Available for Mobile Engineering Roles</span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
              Hey, I'm <span className="text-gradient-blue-purple font-display">{data.name}</span> 👋
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 mt-2 font-display">
              {data.role}
            </h2>
          </motion.div>

          <motion.p variants={itemVariants} className="text-base sm:text-lg text-text-dim max-w-xl leading-relaxed">
            {data.tagline}
          </motion.p>

          {/* Highlight Tags */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
            {data.skillsHighlight.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-mono rounded-lg border border-border-subtle bg-white/5 text-slate-300"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <Button
              onClick={handleExploreClick}
              variant="primary"
              size="lg"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
              id="explore-work"
            >
              Explore My Work
            </Button>
            <a href={appConfig.resumeUrl} download>
              <Button
                variant="secondary"
                size="lg"
                icon={<Download size={16} />}
                id="download-resume-hero"
              >
                Download Resume
              </Button>
            </a>
          </motion.div>

          {/* Micro Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border-subtle/50"
          >
            {data.stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-xl font-bold font-display text-white">{stat.value}</div>
                <div className="text-xs text-text-dim font-mono">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side Profile Picture with floating tags */}
        <div className="lg:col-span-5 flex justify-center items-center py-12 lg:py-0 relative">
          <div className="absolute inset-0 bg-radial-gradient from-accent-blue/5 to-transparent pointer-events-none rounded-full w-80 h-80 mx-auto blur-2xl" />
          
          <div className="relative w-[280px] sm:w-[320px] h-[320px] flex items-center justify-center">
            
            {/* Ambient pulsing light behind the avatar */}
            <motion.div
              className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-accent-blue to-accent-purple opacity-30 blur-2xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Rotating dashed borders */}
            <div className="absolute w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] rounded-full border border-dashed border-accent-blue/30 animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] rounded-full border border-dashed border-accent-purple/15 animate-[spin_60s_linear_infinite_reverse]" />

            {/* Main Profile Container */}
            <motion.div
              className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2 bg-bg-card/75 border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden z-10 group"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={profileImg}
                alt="Akash Senthil"
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* Floating Tags */}
            {techTags.map((tag, idx) => (
              <motion.div
                key={tag.name}
                className={`absolute ${tag.position} z-20`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.4 + idx * 0.1 },
                  scale: { duration: 0.5, delay: 0.4 + idx * 0.1 }
                }}
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border border-border-subtle bg-bg-card/95 backdrop-blur-md shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-default select-none ${tag.color} ${tag.floatClass}`}
                  title={tag.name}
                >
                  {tag.logo}
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </div>
    </section>
  )
}
