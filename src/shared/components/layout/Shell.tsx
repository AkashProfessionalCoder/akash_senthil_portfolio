import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2 } from 'lucide-react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { TerminalModal } from '@shared/components/common/TerminalModal'
import { useUIStore } from '@app/store/uiStore'

export const Shell: React.FC = () => {
  const toggleTerminal = useUIStore((state) => state.toggleTerminal)
  const isTerminalOpen = useUIStore((state) => state.isTerminalOpen)

  return (
    <div className="min-h-screen bg-bg-primary text-slate-100 flex flex-col relative grid-bg overflow-x-hidden">
      {/* Radial fade to soften the grid background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary pointer-events-none radial-fade z-0" />
      
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 relative z-10 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Terminal Button */}
      <AnimatePresence>
        {!isTerminalOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(14, 165, 233, 0.4)' }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTerminal}
            className="fixed bottom-6 right-6 z-40 p-4 rounded-full border border-accent-blue/30 bg-bg-card text-accent-blue shadow-2xl backdrop-blur-md cursor-pointer hover:border-accent-blue/60 transition-all flex items-center justify-center"
            title="Open developer terminal"
            id="floating-terminal-trigger"
          >
            <Code2 size={20} className="animate-pulse" />
            <span className="ml-1.5 font-mono text-xs font-bold hidden sm:inline">{'> _'}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Terminal Overlay Modal */}
      <TerminalModal />
    </div>
  )
}
