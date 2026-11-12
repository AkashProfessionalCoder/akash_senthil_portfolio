import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/outfit'
import '@fontsource-variable/fira-code'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The production build prerenders the page into this same container (see
// entry-server.tsx and scripts/prerender.ts), so it already holds markup by
// the time this script runs. Hydrate onto it instead of replacing it, so the
// prerendered content stays in place rather than flashing and remounting.
// In dev, and if prerendering was skipped for any reason, the container is
// empty and this falls back to a normal client render.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
