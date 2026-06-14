import React, { useState } from 'react'
import { Mail, Linkedin, Github, BookOpen, Send, CheckCircle } from 'lucide-react'
import { GlassCard } from '@shared/components/cards/GlassCard'
import { Button } from '@shared/components/buttons/Button'
import { FadeIn } from '@shared/components/animations/FadeIn'
import { appConfig } from '@app/config/appConfig'

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const consultingAreas = ['Mobile Engineering', 'Flutter Architecture', 'CI/CD Pipelines', 'Community Talks']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const triggerMailtoFallback = () => {
    const emailAddress = appConfig.social.email.replace('mailto:', '')
    const subject = encodeURIComponent(`Message from ${formData.name} (Portfolio)`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`
    setIsSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 4000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSending(true)
    const web3Key = appConfig.contactForm?.web3FormsKey

    if (web3Key) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `New Portfolio Message from ${formData.name}`,
          }),
        })

        const result = await response.json()
        if (result.success) {
          setIsSubmitted(true)
          setFormData({ name: '', email: '', message: '' })
          setTimeout(() => setIsSubmitted(false), 4000)
        } else {
          alert('Submission error: ' + (result.message || 'Verification failed.'))
        }
      } catch (err) {
        console.error('Web3Forms submit error:', err)
        alert('Network transmission failed. Launching local email client...')
        triggerMailtoFallback()
      } finally {
        setIsSending(false)
      }
    } else {
      // Fallback to mailto link
      triggerMailtoFallback()
      setIsSending(false)
    }
  }

  return (
    <section id="contact" className="py-20 border-t border-border-subtle/35">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto">
          <FadeIn direction="up">
            <h2 className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase">
              // CONNECT
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-display">
              Let's build something impactful 🚀
            </h3>
            <p className="text-text-dim mt-4">
              Looking for a product-oriented mobile engineer to lead app architecture, automate your deployments, or speak at your developer event? Reach out!
            </p>
          </FadeIn>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          
          {/* Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <FadeIn direction="right" className="h-full">
              <GlassCard glowColor="blue" className="h-full p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-2xl font-bold font-display text-white tracking-tight">Akash Senthil</h4>
                    <p className="text-sm text-accent-blue font-mono mt-0.5">Mobile Engineer</p>
                  </div>

                  {/* Areas of interest */}
                  <div className="space-y-3 pt-4 border-t border-border-subtle/40">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                      AVAILABLE FOR:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {consultingAreas.map((area) => (
                        <div key={area} className="flex items-center space-x-2 text-xs text-slate-300 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Social Buttons */}
                <div className="space-y-4 pt-6 border-t border-border-subtle/40 mt-8">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block">
                    DIRECTORY:
                  </span>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <a
                      href={appConfig.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border-subtle bg-white/5 text-text-dim hover:text-white hover:border-white/10 transition-all"
                    >
                      <Linkedin size={14} className="text-accent-blue" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href={appConfig.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border-subtle bg-white/5 text-text-dim hover:text-white hover:border-white/10 transition-all"
                    >
                      <Github size={14} className="text-white" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href={appConfig.social.medium}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border-subtle bg-white/5 text-text-dim hover:text-white hover:border-white/10 transition-all"
                    >
                      <BookOpen size={14} className="text-accent-purple" />
                      <span>Medium</span>
                    </a>
                    <a
                      href={appConfig.social.email}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border-subtle bg-white/5 text-text-dim hover:text-white hover:border-white/10 transition-all"
                    >
                      <Mail size={14} className="text-accent-emerald" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 h-full">
            <FadeIn direction="left" className="h-full">
              <GlassCard glowColor="purple" spotlight={false} className="p-8 h-full">
                <form onSubmit={handleSubmit} className="space-y-5 flex flex-col h-full justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                      // SEND SECURE ENCRYPTED MESSAGE
                    </span>

                    {/* Input name */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-name" className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-bg-secondary/70 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-accent-purple/50 text-sm font-mono transition-all"
                      />
                    </div>

                    {/* Input email */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-email" className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-bg-secondary/70 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-accent-purple/50 text-sm font-mono transition-all"
                      />
                    </div>

                    {/* Input message */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-message" className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                        Message Payload
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Message details..."
                        className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-bg-secondary/70 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-accent-purple/50 text-sm font-mono transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isSending}
                      icon={<Send size={14} />}
                      id="submit-contact-form"
                    >
                      Transmit Message
                    </Button>
                    
                    {isSubmitted && (
                      <div className="flex items-center space-x-2 text-accent-emerald text-xs font-mono animate-fade-in">
                        <CheckCircle size={14} />
                        <span>Transmission successful!</span>
                      </div>
                    )}
                  </div>
                </form>
              </GlassCard>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  )
}
