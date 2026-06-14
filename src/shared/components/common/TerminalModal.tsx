import React, { useState, useRef, useEffect } from 'react'
import { X, Terminal, CornerDownLeft, Trash2 } from 'lucide-react'
import { useUIStore } from '@app/store/uiStore'
import { motion as m, AnimatePresence } from 'framer-motion'

interface LogEntry {
  command: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC = () => {
  const isTerminalOpen = useUIStore((state) => state.isTerminalOpen)
  const setTerminalOpen = useUIStore((state) => state.setTerminalOpen)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<LogEntry[]>([
    {
      command: 'system_init',
      output: (
        <div className="text-slate-400">
          <p>Akash Senthil Portfolio OS [Version 1.0.0]</p>
          <p className="mt-0.5">Type <span className="text-accent-blue font-bold">help</span> to view available commands.</p>
        </div>
      ),
    },
  ])

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto scroll terminal on history updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  // Focus input on mount/toggle
  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isTerminalOpen])

  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  const handleCommandRun = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedInput = input.trim().toLowerCase()
    if (!trimmedInput) return

    let response: React.ReactNode = null

    switch (trimmedInput) {
      case 'help':
        response = (
          <div className="space-y-1 text-slate-300">
            <p className="text-accent-purple font-bold">Available Commands:</p>
            <p><span className="text-accent-blue font-bold">whoami</span>      - Core role & positioning statement</p>
            <p><span className="text-accent-blue font-bold">experience</span>  - Years in industry & technical highlights</p>
            <p><span className="text-accent-blue font-bold">shipped</span>     - List of production applications shipped</p>
            <p><span className="text-accent-blue font-bold">focus</span>       - Architectural and engineering focus areas</p>
            <p><span className="text-accent-blue font-bold">currently</span>   - What I am building right now</p>
            <p><span className="text-accent-blue font-bold">clear</span>       - Wipe the screen logs</p>
            <p><span className="text-accent-blue font-bold">help</span>        - Display this menu</p>
          </div>
        )
        break
      case 'whoami':
        response = (
          <div className="space-y-1.5 text-slate-300">
            <p className="font-bold text-white">Akash Senthil</p>
            <p className="text-accent-purple font-mono">Mobile Engineer</p>
            <p className="leading-relaxed">
              Specializing in production-grade mobile applications, architecture design, CI/CD pipelines, performance tuning, and engineering ecosystems.
            </p>
          </div>
        )
        break
      case 'experience':
        response = (
          <div className="space-y-1 text-slate-300">
            <p className="font-bold text-white">3.5+ Years Mobile Engineering Experience</p>
            <p>• Lead Mobile Developer at Samaaro (2024 - Present)</p>
            <p>• Mobile Engineer at WHY Global Services (2022 - 2024)</p>
            <p>• Specialized in Flutter, Dart, Native integrations, and automation scripting.</p>
          </div>
        )
        break
      case 'shipped':
        response = (
          <div className="space-y-1 text-slate-300">
            <p className="font-bold text-white">7+ Production Apps Shipped & Maintained:</p>
            <p>• Samaaro Organizer App (Events platform)</p>
            <p>• Samaaro Attendee App (White-label event apps)</p>
            <p>• Namma Wallet (Open Source Crypto Wallet)</p>
            <p>• PepsiCo Distribution Verification (Enterprise App)</p>
            <p>• Apex Group Investor Portals</p>
            <p>• Apex Invest Mobile Client</p>
          </div>
        )
        break
      case 'focus':
        response = (
          <div className="space-y-1 text-slate-300">
            <p>• <span className="text-white font-bold">Clean Architecture</span> separating presentation, domain, and data layers.</p>
            <p>• <span className="text-white font-bold">DevOps & Automation</span> using GitHub Actions and Fastlane workflows.</p>
            <p>• <span className="text-white font-bold">OTA Hotfixing</span> with Shorebird to deliver fixes in seconds.</p>
            <p>• <span className="text-white font-bold">Performance Engineering</span> (smooth rendering, memory safety, caching).</p>
          </div>
        )
        break
      case 'currently':
        response = (
          <div className="text-slate-300">
            <p>Building high-performance ecosystems and speaking at Namma Flutter events. 🚀</p>
          </div>
        )
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
      default:
        response = (
          <p className="text-accent-amber font-mono">
            sh: command not found: {trimmedInput}. Type 'help' to see list.
          </p>
        )
        break
    }

    setHistory((prev) => [...prev, { command: input, output: response }])
    setInput('')
  }

  return (
    <AnimatePresence>
      {isTerminalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-bg-primary/80 backdrop-blur-md">
          {/* Modal Container */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleTerminalClick}
            className="w-full max-w-2xl h-[450px] terminal-window flex flex-col z-50 text-left select-text"
          >
            {/* Terminal Window Header Bar */}
            <div className="h-10 bg-terminal-bar px-4 flex justify-between items-center border-b border-border-subtle cursor-default">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer" onClick={() => setTerminalOpen(false)} />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-text-dim font-mono ml-4 flex items-center space-x-1.5">
                  <Terminal size={12} />
                  <span>akash@portfolio: ~</span>
                </span>
              </div>
              
              <div className="flex items-center space-x-3 text-slate-500">
                <button
                  onClick={() => setHistory([])}
                  title="Clear history"
                  className="hover:text-slate-300 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
                <button
                  onClick={() => setTerminalOpen(false)}
                  className="hover:text-white transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Terminal Console Logs */}
            <div
              ref={scrollRef}
              className="flex-1 p-5 overflow-y-auto space-y-4 font-mono text-xs leading-relaxed text-slate-200"
            >
              {history.map((log, index) => (
                <div key={index} className="space-y-1">
                  {log.command !== 'system_init' && (
                    <div className="flex items-center space-x-2 text-accent-blue font-bold">
                      <span>akash@portfolio %</span>
                      <span className="text-slate-200 font-normal">{log.command}</span>
                    </div>
                  )}
                  <div className="pl-4 border-l border-white/5 py-0.5">
                    {log.output}
                  </div>
                </div>
              ))}

              {/* Input Prompt Section */}
              <form onSubmit={handleCommandRun} className="flex items-center space-x-2 pt-1">
                <span className="text-accent-blue font-bold flex-shrink-0">akash@portfolio %</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-200 font-mono focus:ring-0 focus:ring-offset-0 p-0 m-0"
                  aria-label="Terminal command input"
                  autoComplete="off"
                  autoCapitalize="none"
                />
                <button
                  type="submit"
                  className="text-slate-500 hover:text-white p-1 rounded transition-colors"
                >
                  <CornerDownLeft size={12} />
                </button>
              </form>
            </div>
            
            {/* Terminal Window Footer */}
            <div className="h-6 bg-terminal-bar/50 px-4 py-1 border-t border-border-subtle/50 text-[10px] text-slate-500 font-mono flex justify-between items-center">
              <span>STATUS: READY</span>
              <span>UTF-8</span>
            </div>
          </m.div>

          {/* Clickable backdrop overlay */}
          <div className="absolute inset-0 bg-transparent cursor-default z-40" onClick={() => setTerminalOpen(false)} />
        </div>
      )}
    </AnimatePresence>
  )
}
