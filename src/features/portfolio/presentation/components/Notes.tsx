import React, { useState, useEffect } from 'react'
import { BookOpen, Calendar, Clock, ArrowUpRight } from 'lucide-react'
import { GlassCard } from '@shared/components/cards/GlassCard'
import { Button } from '@shared/components/buttons/Button'
import { FadeIn } from '@shared/components/animations/FadeIn'
import { appConfig } from '@app/config/appConfig'
import type { NoteItem } from '../../domain/entities/portfolioEntities'
import redMentorImg from '../../../../assets/red_mentor.png'


const getCachedPreview = (url: string): string | null => {
  try {
    return sessionStorage.getItem(`og_image_${url}`)
  } catch {
    return null
  }
}

const setCachedPreview = (url: string, imgUrl: string) => {
  try {
    sessionStorage.setItem(`og_image_${url}`, imgUrl)
  } catch {
    // Ignore storage quota errors
  }
}

const MediumPreviewImage: React.FC<{ url: string; title: string; staticImageUrl?: string }> = ({ url, title, staticImageUrl }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(staticImageUrl || null)
  const [loading, setLoading] = useState(!staticImageUrl)

  useEffect(() => {
    if (staticImageUrl) return // Skip fetching if static image is already available

    const cached = getCachedPreview(url)
    if (cached) {
      setImageUrl(cached)
      setLoading(false)
      return
    }

    let isMounted = true
    // Fetch metadata from Microlink (free, no API key needed)
    fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted && data?.status === 'success' && data?.data?.image?.url) {
          const img = data.data.image.url
          setImageUrl(img)
          setCachedPreview(url, img)
        }
      })
      .catch(() => { })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [url, staticImageUrl])

  if (loading) {
    return (
      <div className="w-full aspect-[16/9] rounded-lg bg-white/5 animate-pulse border border-white/5 flex items-center justify-center">
        <span className="text-[10px] font-mono text-slate-500">fetching_preview...</span>
      </div>
    )
  }

  // Fallback to redMentorImg if dynamic fetch failed and no static image is available
  const displayUrl = imageUrl || redMentorImg

  return (
    <div className="w-full aspect-[16/9] rounded-lg overflow-hidden border border-border-subtle bg-bg-secondary relative group-hover:border-accent-purple/30 transition-all duration-300">
      <img
        src={displayUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        loading="lazy"
      />
    </div>
  )
}

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

                    {/* Preview Image */}
                    <MediumPreviewImage url={note.link} title={note.title} />

                    {/* Metadata Header */}
                    <div className="flex items-center space-x-4 text-xs font-mono text-text-dim pt-1">
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



