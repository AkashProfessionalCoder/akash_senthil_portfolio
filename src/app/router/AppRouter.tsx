import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Shell } from '@shared/components/layout/Shell'
import { PortfolioPage } from '@features/portfolio/presentation/pages/PortfolioPage'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<PortfolioPage />} />
          {/* Future routes like blog, admin, etc. will go here */}
          <Route path="*" element={<PortfolioPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
