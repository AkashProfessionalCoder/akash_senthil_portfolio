import React from 'react'
import { Github, Linkedin, Mail, BookOpen } from 'lucide-react'
import { appConfig } from '@app/config/appConfig'

export const Footer: React.FC = () => {
  const socialLinks = [
    { label: 'GitHub', href: appConfig.social.github, icon: <Github size={18} /> },
    { label: 'LinkedIn', href: appConfig.social.linkedin, icon: <Linkedin size={18} /> },
    { label: 'Medium', href: appConfig.social.medium, icon: <BookOpen size={18} /> },
    { label: 'Email', href: appConfig.social.email, icon: <Mail size={18} /> },
  ]

  return (
    <footer className="relative z-10 border-t border-border-subtle/50 bg-bg-secondary/70 backdrop-blur-md px-6 py-12 text-center">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Name and branding */}
        <div className="text-left">
          <div className="font-display font-bold text-lg text-white">Akash Senthil</div>
          <p className="text-sm text-text-dim mt-1">Mobile Engineer</p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-border-subtle bg-white/5 text-text-dim hover:text-white hover:border-white/20 transition-all duration-300"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Availability status */}
        <div className="text-sm text-text-dim flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
          <span>Available for contract & talks</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-border-subtle/35 flex flex-col md:flex-row justify-between items-center text-xs text-text-dim space-y-3 md:space-y-0">
        <p>© {new Date().getFullYear()} Akash Senthil. All rights reserved.</p>
        <p className="font-mono text-[10px] text-slate-500">
          Built with React • TypeScript • Vite • Tailwind • Clean Arch
        </p>
      </div>
    </footer>
  )
}
