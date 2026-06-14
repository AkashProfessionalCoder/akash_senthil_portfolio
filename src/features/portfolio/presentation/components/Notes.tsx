import React from 'react'
import { BookOpen, Calendar, Clock, ArrowUpRight } from 'lucide-react'
import { GlassCard } from '@shared/components/cards/GlassCard'
import { Button } from '@shared/components/buttons/Button'
import { FadeIn } from '@shared/components/animations/FadeIn'
import { appConfig } from '@app/config/appConfig'
import type { NoteItem } from '../../domain/entities/portfolioEntities'

interface NotesProps {
  notes: NoteItem[];
}

export const Notes: React.FC<NotesProps> = ({ notes }) => {
  return (
    <section id="writing" className="py-20 border-t border-border-subtle/35">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6">
          <div className="text-left max-w-2xl">
            <FadeIn direction="up">
              <h2 className="text-xs font-mono font-bold tracking-widest text-accent-purple uppercase">
                // TECHNICAL KNOWLEDGE
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-display">
                Engineering Notes
              </h3>
              <p className="text-text-dim mt-4">
                Writing what I learn while building. Documenting mobile architectures, performance metrics, and build processes.
              </p>
            </FadeIn>
          </div>

          <FadeIn direction="left">
            <a href={appConfig.social.medium} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                icon={<BookOpen size={16} />}
                id="read-medium-notes"
              >
                Read on Medium
              </Button>
            </a>
          </FadeIn>
        </div>

        {/* Notes list grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note, idx) => (
            <FadeIn key={note.id} direction="up" delay={idx * 0.08}>
              <a
                href={note.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full"
              >
                <GlassCard
                  glowColor="purple"
                  className="h-full flex flex-col justify-between transition-all duration-300 group-hover:border-accent-purple/40"
                >
                  <div className="space-y-4 text-left">
                    
                    {/* Metadata Header */}
                    <div className="flex items-center space-x-4 text-xs font-mono text-text-dim">
                      <span className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{note.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{note.readTime}</span>
                      </span>
                    </div>

                    {/* Article Details */}
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold font-display text-white tracking-tight group-hover:text-accent-purple transition-colors flex items-center justify-between">
                        <span>{note.title}</span>
                        <ArrowUpRight size={16} className="text-slate-600 group-hover:text-accent-purple transition-colors flex-shrink-0 ml-2" />
                      </h4>
                      <p className="text-sm text-text-dim leading-relaxed">
                        {note.subtitle}
                      </p>
                    </div>

                  </div>
                  
                  {/* Fake footer decorator */}
                  <div className="mt-6 pt-3 border-t border-border-subtle/40 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>PUBLISHED: MEDIUM</span>
                    <span>#MOBILEENGINEERING</span>
                  </div>
                </GlassCard>
              </a>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
