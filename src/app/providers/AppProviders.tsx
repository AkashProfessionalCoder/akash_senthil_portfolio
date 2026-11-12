import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

// The production build prerenders the page (see entry-server.tsx and
// scripts/prerender.mjs) with this same data already in a query cache, so
// its markup shows the finished page rather than the loading state. Seed
// this client-side cache with that same data before the first render, or
// the two would disagree - our cache starts empty - and React would discard
// the prerendered markup and redraw the whole page from the loading state.
// In dev, or if prerendering was skipped, the element below doesn't exist
// and usePortfolio() just runs its normal fetch.
const prerenderedData = document.getElementById('portfolio-data')?.textContent
if (prerenderedData) {
  try {
    queryClient.setQueryData(['portfolioData'], JSON.parse(prerenderedData))
  } catch {
    // Malformed or missing - fall through to usePortfolio()'s normal fetch.
  }
}

interface AppProvidersProps {
  children: React.ReactNode
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
