# Akash Senthil Portfolio

<div align="center">
  <img src="./src/assets/akash_profile.jpg" alt="Akash Senthil" width="150" height="150" style="border-radius: 50%; object-fit: cover;" />
  
  A modern, fully-featured portfolio website built with React, TypeScript, and Vite. Showcasing professional work, journey, and expertise with smooth animations and a responsive design.

  **[🚀 View Live Portfolio](https://akash-senthil-portfolio.vercel.app/)**
</div>

## ✨ Features

- **Modern UI/UX**: Glass-morphism design with smooth animations using Framer Motion
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Fast Performance**: Built with Vite for optimized development and production builds
- **Type-Safe**: Full TypeScript support for reliability
- **State Management**: Zustand for lightweight, scalable state management
- **Data Fetching**: TanStack Query for efficient data synchronization
- **Modular Architecture**: Clean Architecture pattern with separation of concerns
- **Smooth Navigation**: React Router for seamless page transitions
- **Accessible**: Semantic HTML and accessibility best practices

## 🚀 Tech Stack

### Frontend
- **React** 19.2.6 - UI library
- **TypeScript** 6.0.2 - Type safety
- **Vite** 8.0.12 - Build tool & dev server
- **React Router** 7.17.0 - Client-side routing

### State & Data Management
- **Zustand** 5.0.14 - Global state management
- **TanStack Query** 5.101.0 - Server state management & caching

### Styling & Animation
- **Tailwind CSS** 4.3.1 - Utility-first CSS framework
- **Framer Motion** 12.40.0 - Animation library
- **Lucide React** 0.468.0 - Icon library

### Development
- **ESLint** 10.3.0 - Code linting
- **Tailwind CSS Vite** 4.3.1 - Tailwind integration with Vite

## 📁 Project Structure

```
src/
├── app/                    # Application configuration & setup
│   ├── config/             # App configuration
│   ├── providers/          # React providers (context, etc.)
│   ├── router/             # Route definitions
│   └── store/              # Global state store (Zustand)
│
├── core/                   # Core utilities & hooks
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Utility functions
│
├── features/               # Feature modules (Clean Architecture)
│   └── portfolio/
│       ├── data/           # Data layer
│       │   ├── datasources/   # External data sources
│       │   └── repositories/  # Repository implementations
│       ├── domain/         # Business logic layer
│       │   ├── entities/      # Domain models
│       │   ├── repositories/  # Repository interfaces
│       │   └── usecases/      # Use cases (business logic)
│       └── presentation/   # Presentation layer
│           ├── components/    # React components
│           ├── hooks/         # Feature-specific hooks
│           └── pages/         # Page components
│
├── shared/                 # Shared components & utilities
│   └── components/
│       ├── animations/     # Animation components
│       ├── buttons/        # Button components
│       ├── cards/          # Card components
│       ├── common/         # Common UI components
│       └── layout/         # Layout components
│
└── assets/                 # Static assets
```

### Architecture Pattern

This project follows **Clean Architecture** principles:

- **Data Layer**: Handles data fetching from datasources (static, API, etc.)
- **Domain Layer**: Contains business logic, entities, and interfaces
- **Presentation Layer**: React components that depend on domain layer

This separation ensures maintainability, testability, and scalability.

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd akash_portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

## 📦 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Compile TypeScript and build for production
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run preview`** - Preview production build locally

## 🏗️ Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory with:
- Minified code
- Optimized assets
- Tree-shaken dependencies

Preview the build locally:
```bash
npm run preview
```

## 🔍 Code Quality

### Linting
```bash
npm run lint
```

Linting is configured with:
- ESLint for JavaScript/TypeScript
- React and React Hooks rules
- TypeScript-aware linting

## 🎨 Component Architecture

### Reusable Components

Located in `src/shared/components/`:

- **Animations**: `FadeIn` - Smooth fade-in animations
- **Buttons**: `Button` - Customizable button component
- **Cards**: `GlassCard` - Glass-morphism card effect
- **Common**: `Badge`, `TerminalModal` - Utility components
- **Layout**: `Navbar`, `Footer`, `Shell` - Layout components

### Feature Components

Located in `src/features/portfolio/presentation/components/`:

- `Hero` - Hero section
- `Journey` - Career journey timeline
- `Impact` - Impact & achievements section
- `Toolbox` - Skills & tools showcase
- `Community` - Community involvement
- `Contact` - Contact section
- `Notes` - Blog/notes section

## 🎯 How It Works

1. **Data Flow**: Components → Use Cases → Repositories → Data Sources
2. **State Management**: Global UI state managed with Zustand
3. **Data Fetching**: Portfolio data fetched using TanStack Query
4. **Routing**: Client-side routing with React Router
5. **Animations**: Smooth transitions using Framer Motion

## 📝 Configuration

### TypeScript Configuration
- `tsconfig.json` - Main TypeScript config
- `tsconfig.app.json` - App-specific settings
- `tsconfig.node.json` - Node-specific settings

### Vite Configuration
- `vite.config.ts` - Vite build configuration

### ESLint Configuration
- `eslint.config.js` - Linting rules

## 🚀 Deployment

This project can be deployed to various platforms:

- **Vercel** - Zero-config deployment for Vite apps
- **Netlify** - Continuous deployment from Git
- **GitHub Pages** - Static hosting
- **Any Static Host** - Build output in `dist/` directory

## 📄 License

Private project - Akash Senthil

## 👤 Author

**[Akash Senthil](https://www.linkedin.com/in/akashprocoder/)** - Software Developer

---

Built with ❤️ using React + TypeScript + Vite
