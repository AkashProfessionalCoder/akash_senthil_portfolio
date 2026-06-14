import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText, Code } from 'lucide-react'
import { useUIStore } from '@app/store/uiStore'
import { appConfig } from '@app/config/appConfig'

export const Navbar: React.FC = () => {
  const activeSection = useUIStore((state) => state.activeSection)
  const toggleTerminal = useUIStore((state) => state.toggleTerminal)
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Engineering', href: '#engineering', id: 'engineering' },
    { label: 'Writing', href: '#writing', id: 'writing' },
    { label: 'Community', href: '#community', id: 'community' },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      const offset = 80 // height of sticky navbar
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
    <>
      <header className="sticky top-0 w-full z-40 glass-panel border-b border-border-subtle/50 px-6 py-4 flex justify-between items-center transition-all duration-300">
        {/* Logo */}
        <a href="#hero" onClick={(e) => handleScroll(e, '#hero')} className="flex items-center space-x-2 font-display font-bold text-2xl text-gradient-blue-purple tracking-tight">
          <span>Akash.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className={`relative px-1 py-2 transition-colors duration-200 hover:text-white ${
                  isActive ? 'text-white' : 'text-text-dim'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTerminal}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono text-accent-blue border border-accent-blue/30 rounded bg-accent-blue/5 hover:bg-accent-blue/10 transition-colors"
          >
            <Code size={13} />
            <span>terminal_</span>
          </button>
          
          <a
            href={appConfig.resumeUrl}
            download
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-accent-blue to-accent-purple font-semibold hover:opacity-90 shadow-lg shadow-accent-blue/10 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <FileText size={16} />
            <span>Resume ↓</span>
          </a>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleTerminal}
            className="flex items-center p-2 text-accent-blue border border-accent-blue/30 rounded bg-accent-blue/5"
          >
            <Code size={16} />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-text-dim hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[73px] left-0 right-0 z-30 glass-panel border-b border-border-subtle p-6 flex flex-col space-y-4"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`text-lg font-medium py-2 px-3 rounded-lg ${
                    isActive ? 'bg-white/5 text-white font-semibold' : 'text-text-dim'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
            <div className="pt-4 border-t border-border-subtle flex flex-col space-y-3">
              <a
                href={appConfig.resumeUrl}
                download
                className="flex items-center justify-center space-x-2 w-full py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple font-semibold text-center text-sm shadow-md"
              >
                <FileText size={18} />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
