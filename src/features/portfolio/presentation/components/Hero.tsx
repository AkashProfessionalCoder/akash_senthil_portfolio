import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Smartphone, ShieldCheck, Cpu, Code2 } from 'lucide-react'
import { Button } from '@shared/components/buttons/Button'
import { appConfig } from '@app/config/appConfig'
import type { PortfolioData } from '../../domain/entities/portfolioEntities'

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

  // Device stack details
  const deviceCards = [
    {
      title: 'Samaaro Event App',
      category: 'Production Platform',
      details: 'White-label Architecture • Shipped to 7 Clients',
      color: 'from-sky-400 to-blue-600',
      icon: <Smartphone className="text-sky-400" size={20} />,
      badge: 'LIVE',
    },
    {
      title: 'Namma Wallet',
      category: 'Crypto Wallet',
      details: 'Open Source • Hive Local Storage • WebSockets',
      color: 'from-purple-400 to-indigo-600',
      icon: <ShieldCheck className="text-purple-400" size={20} />,
      badge: 'CONTRIBUTOR',
    },
    {
      title: 'Flutter Shaders',
      category: 'Graphics Experiment',
      details: 'Skia Engine Performance • 120 FPS Rendering',
      color: 'from-emerald-400 to-teal-600',
      icon: <Cpu className="text-emerald-400" size={20} />,
      badge: 'EXPERIMENT',
    },
    {
      title: 'Fastlane CI Config',
      category: 'DevOps Module',
      details: 'Fastlane & GitHub Actions • Build Automation',
      color: 'from-amber-400 to-orange-600',
      icon: <Code2 className="text-amber-400" size={20} />,
      badge: 'ENGINEERING',
    },
  ]

  const handleExploreClick = () => {
    const element = document.querySelector('#work')
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

        {/* Right Stack Cards */}
        <div className="lg:col-span-5 flex justify-center items-center py-12 lg:py-0 relative">
          <div className="absolute inset-0 bg-radial-gradient from-accent-blue/5 to-transparent pointer-events-none rounded-full w-80 h-80 mx-auto blur-2xl" />
          
          <motion.div
            className="relative w-[280px] sm:w-[320px] h-[340px] flex items-center justify-center cursor-pointer group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {deviceCards.map((card, idx) => {
              // 3D layering constants
              const rotation = -5 + idx * 4
              const translateY = idx * 10
              const scale = 1 - idx * 0.05

              return (
                <motion.div
                  key={card.title}
                  className={`absolute w-full rounded-2xl glass-panel border border-border-subtle p-5 bg-gradient-to-br from-bg-card to-bg-secondary flex flex-col justify-between shadow-2xl transition-all duration-500`}
                  style={{
                    zIndex: 20 - idx,
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    rotateZ: rotation,
                    y: translateY,
                    scale: scale,
                  }}
                  whileHover={{
                    // Interactive Fan Out
                    rotateZ: -10 + idx * 8,
                    x: idx * 40 - 60,
                    y: idx * -10 - 20,
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 20px rgba(14, 165, 233, 0.1)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                  }}
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      {card.icon}
                    </div>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border border-border-subtle bg-white/5 text-text-dim">
                      {card.badge}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-1.5 mt-8">
                    <span className="text-[10px] font-mono text-accent-blue font-bold tracking-widest uppercase">
                      {card.category}
                    </span>
                    <h3 className="font-display font-bold text-lg text-white">
                      {card.title}
                    </h3>
                    <p className="text-xs text-text-dim leading-relaxed">
                      {card.details}
                    </p>
                  </div>

                  {/* Card Footer decorator */}
                  <div className="mt-6 pt-3 border-t border-border-subtle/50 flex items-center justify-between text-[9px] font-mono text-slate-500">
                    <span>STABLE RELEASE</span>
                    <span>v1.0.0</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
