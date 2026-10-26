# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (type-check is part of the build)
- `npm run lint` — ESLint over the whole repo
- `npm run preview` — serve the production build

There is no test runner configured.

## Architecture

Single-page portfolio (React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion), deployed on Vercel. The `src/` tree follows Clean Architecture, with path aliases `@app`, `@core`, `@shared`, `@features` (defined in both [vite.config.ts](vite.config.ts) and [tsconfig.app.json](tsconfig.app.json) — keep them in sync when adding one).

### Data flow (spans several files)

All portfolio content (hero, impact stats, journey, skills, notes, community) lives in one place: [StaticPortfolioDataSource.ts](src/features/portfolio/data/datasources/StaticPortfolioDataSource.ts). To change site copy, edit that file. The shape is defined in [portfolioEntities.ts](src/features/portfolio/domain/entities/portfolioEntities.ts).

Chain: `StaticPortfolioDataSource` → `PortfolioRepositoryImpl` → `GetPortfolioDataUseCase` → `usePortfolio()` (TanStack Query). The dependency injection is manual, done at module scope in [usePortfolio.ts](src/features/portfolio/presentation/hooks/usePortfolio.ts). To swap in a real API, implement the `PortfolioDataSource` interface and change the instance there. The static source adds an artificial 300ms delay, so the loading state in `PortfolioPage` is real.

### UI structure

- `App.tsx` → `AppProviders` (React Query) → `AppRouter`. The router has a single `Shell` layout, and both `/` and `*` render `PortfolioPage`.
- `PortfolioPage` renders every section component (Hero, Impact, Journey, Toolbox, Notes, Community, Contact) stacked on one page.
- Navbar highlighting: `useActiveSection` (an IntersectionObserver in `@core/hooks`) writes the visible section id to the Zustand `uiStore`, which `Navbar` reads. The section ids passed in `PortfolioPage` (`hero`, `engineering`, `experience`, `writing`, `community`, `contact`) must match the `id` attributes in the section components and the Navbar links.
- `uiStore` also holds the terminal modal state (`TerminalModal` in `@shared/components/common`).
- Reusable primitives (GlassCard, Button, Badge, FadeIn) are in `src/shared/components`; `cn` in `@core/utils` merges class names.

## Repo quirks

- `.npm-cache/` is tracked in git. It is not in `.gitignore`; avoid touching or staging it.
- TypeScript is strict about `verbatimModuleSyntax` (use `import type` for types) and `erasableSyntaxOnly` (no enums or parameter properties — hence the explicit field assignments in the repository and use-case classes).
- Working branch is `dev`; `main` is the primary branch.
