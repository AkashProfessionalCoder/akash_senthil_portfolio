import { Routes, Route } from 'react-router-dom'
import { Shell } from '@shared/components/layout/Shell'
import { PortfolioPage } from '@features/portfolio/presentation/pages/PortfolioPage'

// The route tree on its own, with no router implementation attached, so it
// can be mounted under a BrowserRouter in the browser (AppRouter.tsx) and
// under a StaticRouter at build time for prerendering (entry-server.tsx).
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Shell />}>
        <Route index element={<PortfolioPage />} />
        {/* Future routes like blog, admin, etc. will go here */}
        <Route path="*" element={<PortfolioPage />} />
      </Route>
    </Routes>
  )
}
