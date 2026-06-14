import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, ShieldCheck, Database, HardDriveUpload, ArrowRight } from 'lucide-react'
import { GlassCard } from '@shared/components/cards/GlassCard'
import { FadeIn } from '@shared/components/animations/FadeIn'

interface ArchitectureLayer {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  technologies: string[];
  description: string;
  bestPractices: string[];
}

export const HowIBuild: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>('presentation')

  const layers: ArchitectureLayer[] = [
    {
      id: 'presentation',
      name: 'Presentation Layer',
      subtitle: 'State Management & UI Views',
      icon: <Layers className="text-accent-blue" size={20} />,
      technologies: ['BLoC Pattern', 'Riverpod', 'GetX', 'Framer Motion (Web)'],
      description: 'Isolates user interfaces from business logic. Employs unidirectional data flows and strict state models to prevent widget rebuild lags, ensuring consistent 120 FPS performance.',
      bestPractices: ['Immutable state events', 'Declarative routing configurations', 'Strict UI-logic separation', 'Reactive layout bindings'],
    },
    {
      id: 'domain',
      name: 'Domain Layer',
      subtitle: 'Business Rules & Usecases',
      icon: <ShieldCheck className="text-accent-purple" size={20} />,
      technologies: ['Use Cases', 'Domain Entities', 'Repository Contracts', 'Functional Error Models'],
      description: 'The core business logic center. Totally framework-independent (does not know about Flutter, React, databases, or API clients). Contains the pure contracts representing what the app actually does.',
      bestPractices: ['Repository interfaces pattern (contracts)', 'One UseCase per specific action rules', 'Isolated domain models', 'Immutable properties'],
    },
    {
      id: 'data',
      name: 'Data Layer',
      subtitle: 'External APIs & Caching',
      icon: <Database className="text-accent-emerald" size={20} />,
      technologies: ['REST API (Dio)', 'WebSockets', 'Firebase services', 'SQLite / Hive storage'],
      description: 'Coordinates data fetching, caching, and model serialization. Implements the Repository Contracts defined by the Domain layer, swapping local caches and remote feeds seamlessly.',
      bestPractices: ['Retrofit or Dio networking wrappers', 'Offline-first SQLite local sync policies', 'Automated JSON serialization', 'Network state check interceptors'],
    },
    {
      id: 'delivery',
      name: 'DevOps & Delivery',
      subtitle: 'CI/CD & Store Releases',
      icon: <HardDriveUpload className="text-accent-amber" size={20} />,
      technologies: ['GitHub Actions', 'Fastlane pipelines', 'Shorebird OTA updates', 'Store deployment scripts'],
      description: 'Automates building, testing, code signing, and App Store / Play Store uploads on every push. Shorebird integration allows push-patching critical live bugs instantly without store review wait times.',
      bestPractices: ['Automated keychain certificates setup', 'Slack notification build alerts', 'OTA hotfixes setup', 'Unit/Widget testing automation'],
    },
  ]

  const activeLayer = layers.find((l) => l.id === activeLayerId) || layers[0]

  return (
    <section className="py-20 border-t border-border-subtle/35">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl">
          <FadeIn direction="up">
            <h2 className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase">
              // ENGINEERING WORKFLOW
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-display">
              How I Build Mobile Apps
            </h3>
            <p className="text-text-dim mt-4">
              An interactive visualization of my modular Clean Architecture pipeline, taking a product from abstract logic to millions of store installations.
            </p>
          </FadeIn>
        </div>

        {/* Visualizer Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Flow Column */}
          <div className="lg:col-span-5 space-y-4">
            <FadeIn direction="right" className="text-left">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block mb-4">
                // CLICK TO INSPECT LAYER
              </span>
            </FadeIn>

            <div className="space-y-3 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-[33px] top-6 bottom-6 w-0.5 bg-border-subtle/60 pointer-events-none" />

              {layers.map((layer, idx) => {
                const isActive = layer.id === activeLayerId
                return (
                  <FadeIn key={layer.id} direction="up" delay={idx * 0.08}>
                    <button
                      onClick={() => setActiveLayerId(layer.id)}
                      className={`w-full flex items-center p-4 rounded-xl border text-left transition-all duration-300 relative ${
                        isActive
                          ? 'bg-white/5 border-accent-blue/40 shadow-lg shadow-accent-blue/5'
                          : 'bg-transparent border-border-subtle hover:border-white/10 hover:bg-white/5'
                      }`}
                    >
                      {/* Flow index indicator or active glowing bullet */}
                      <div className={`w-10 h-10 rounded-full border flex items-center justify-center relative z-10 transition-all ${
                        isActive
                          ? 'bg-accent-blue/15 border-accent-blue text-white'
                          : 'bg-bg-primary border-border-subtle text-text-dim'
                      }`}>
                        {idx + 1}
                      </div>

                      <div className="ml-4 flex-1">
                        <h4 className={`font-display font-bold text-sm transition-colors ${
                          isActive ? 'text-white' : 'text-slate-300'
                        }`}>
                          {layer.name}
                        </h4>
                        <p className="text-xs text-text-dim mt-0.5">{layer.subtitle}</p>
                      </div>

                      <ArrowRight
                        size={14}
                        className={`text-slate-600 transition-transform ${
                          isActive ? 'translate-x-1 text-accent-blue' : ''
                        }`}
                      />
                    </button>
                  </FadeIn>
                )
              })}
            </div>
          </div>

          {/* Right Details Column */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayerId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <GlassCard spotlight={false} className="p-8 text-left flex flex-col justify-between h-full border border-accent-blue/15">
                  <div className="space-y-6">
                    {/* Layer Header */}
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        {activeLayer.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold font-display text-white">{activeLayer.name}</h4>
                        <p className="text-xs text-text-dim font-mono">{activeLayer.subtitle}</p>
                      </div>
                    </div>

                    {/* Explanatory description */}
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                      {activeLayer.description}
                    </p>

                    {/* Technologies list */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                        Technologies used:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeLayer.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Architectural rules */}
                    <div className="space-y-2 pt-4 border-t border-border-subtle/50">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                        Architectural Best Practices:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeLayer.bestPractices.map((practice, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-xs text-text-dim">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0" />
                            <span>{practice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}
