import React from 'react'
import { usePortfolio } from '../hooks/usePortfolio'
import { Hero } from '../components/Hero'
import { Impact } from '../components/Impact'
import { Journey } from '../components/Journey'
import { Toolbox } from '../components/Toolbox'
import { Notes } from '../components/Notes'
import { Community } from '../components/Community'
import { Contact } from '../components/Contact'
import { useActiveSection } from '@core/hooks/useActiveSection'

export const PortfolioPage: React.FC = () => {
  const { data, isLoading, error } = usePortfolio()

  // Track the active section for the navbar scroll indicator
  useActiveSection(['hero', 'engineering', 'experience', 'writing', 'community', 'contact'])

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 rounded-full border-4 border-accent-blue/20 border-t-accent-blue animate-spin" />
        <span className="font-mono text-xs text-text-dim">initialise_portfolio_engine...</span>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 text-center px-6">
        <div className="p-3 rounded-full bg-accent-amber/10 border border-accent-amber/20 text-accent-amber font-mono text-lg font-bold">
          !
        </div>
        <h3 className="font-display font-bold text-xl text-white">Initialization Failure</h3>
        <p className="text-sm text-text-dim max-w-md">
          Could not load the portfolio repository. Check connectivity or data source integrity.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-6 space-y-4 relative">
      {/* Sections rendering sequentially */}
      <Hero data={data.hero} />
      <Impact stats={data.impactStats} />
      <Journey journey={data.journey} />
      <Toolbox skills={data.skills} />
      <Notes notes={data.notes} />
      <Community data={data.community} />
      <Contact />
    </div>
  )
}
