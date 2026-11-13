import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRoutes } from './app/router/AppRoutes'
import { StaticPortfolioDataSource } from './features/portfolio/data/datasources/StaticPortfolioDataSource'
import { PortfolioRepositoryImpl } from './features/portfolio/data/repositories/PortfolioRepositoryImpl'
import { GetPortfolioDataUseCase } from './features/portfolio/domain/usecases/GetPortfolioDataUseCase'

// Build-time only: renders the same route tree the browser does, but under a
// StaticRouter (no window/history needed) and with the portfolio data already
// sitting in the query cache (the real DI chain, same one usePortfolio.ts
// wires up, just invoked directly here instead of through the hook) so the
// page renders its real content on the first pass instead of the loading
// state. Used by scripts/prerender.mjs; never imported by the browser bundle.
//
// Returns `data` alongside `html`: the browser's own QueryClient starts with
// an empty cache, so without also embedding this same data for the client to
// seed its cache with (see AppProviders.tsx), its first render would show
// the loading state while the markup here shows the finished page - a
// hydration mismatch that makes React discard and redraw the whole page.
export async function renderApp(url: string) {
  const dataSource = new StaticPortfolioDataSource()
  const repository = new PortfolioRepositoryImpl(dataSource)
  const useCase = new GetPortfolioDataUseCase(repository)
  const data = await useCase.execute()

  const queryClient = new QueryClient()
  queryClient.setQueryData(['portfolioData'], data)

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </QueryClientProvider>,
  )

  return { html, data }
}
