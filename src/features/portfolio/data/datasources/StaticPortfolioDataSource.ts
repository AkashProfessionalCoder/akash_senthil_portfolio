import type { PortfolioDataSource } from './PortfolioDataSource'
import type { PortfolioData } from '../../domain/entities/portfolioEntities'

export class StaticPortfolioDataSource implements PortfolioDataSource {
  async getPortfolioData(): Promise<PortfolioData> {
    // Simulated network delay for production-like feel (React Query will handle loading states)
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      hero: {
        name: 'Akash Senthil',
        role: 'Mobile Engineer',
        tagline: 'Building production-grade mobile experiences from architecture → deployment → scale.',
        skillsHighlight: ['Flutter', 'Mobile Architecture', 'CI/CD', 'Performance Engineering'],
        stats: [
          { label: 'Experience', value: '3.5+ Years' },
          { label: 'Production Apps Shipped', value: '7+' },
          { label: 'Contributions', value: 'Open Source' },
          { label: 'Community', value: 'Public Speaker' },
        ],
      },
      impactStats: [
        {
          id: 'stat-1',
          value: '7+',
          label: 'Production Apps',
          subtitle: 'Built, Released, and Maintained across iOS & Android App Stores.',
        },
        {
          id: 'stat-2',
          value: '3.5+',
          label: 'Years Experience',
          subtitle: 'In mobile engineering, architectural design, and automation.',
        },
        {
          id: 'stat-3',
          value: '100%',
          label: 'Product Ownership',
          subtitle: 'Leading development end-to-end.',
          details: ['Architecture', 'Development', 'CI/CD Pipeline', 'Store Deployment', 'Post-release Maintenance'],
        },
        {
          id: 'stat-4',
          value: 'Enterprise',
          label: 'Products Scaled',
          subtitle: 'Engineered robust solutions for top-tier systems.',
          details: ['PepsiCo Delivery Ecosystem', 'Apex Group Portals', 'Apex Invest Platform'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'Samaaro Events Platform',
          role: 'Mobile Engineer',
          description: 'A robust, white-labeled mobile ecosystem enabling customized event experiences for corporate clients. Shipped 7+ unique client installations from a single core repository.',
          ownership: [
            'Flutter Development',
            'Architecture Design',
            'Native iOS & Android Setup',
            'Store Deployment',
            'Fastlane Automation',
            'Shorebird OTA Updates',
          ],
          techStack: ['Flutter', 'Dart', 'REST API', 'Firebase', 'Fastlane', 'Shorebird'],
          status: 'LIVE',
          appStoreUrl: 'https://apps.apple.com',
          playStoreUrl: 'https://play.google.com',
        },
        {
          id: 'proj-2',
          name: 'Namma Wallet',
          role: 'Open Source Contributor',
          description: 'A secure, non-custodial wallet application. Contributed core features, home widgets, and implemented standard CI/CD deployment routines.',
          ownership: [
            'Feature Development',
            'Home Widget Implementation',
            'Contributor Modules Integration',
            'Fastlane CI/CD Setup',
            'Release Automation',
          ],
          techStack: ['Flutter', 'Dart', 'WebSockets', 'Hive Storage', 'Fastlane', 'GitHub Actions'],
          status: 'LIVE',
          appStoreUrl: 'https://apps.apple.com',
          playStoreUrl: 'https://play.google.com',
        },
        {
          id: 'proj-3',
          name: 'PepsiCo Store Delivery App',
          role: 'Mobile Engineer (Consultant)',
          description: 'Enterprise delivery routing app built to automate inventory updates, tracking, and store verification. Scaled for high-density route environments.',
          ownership: [
            'Architecture Design',
            'Offline-First Sync Engine',
            'Native Map Integrations',
            'CI/CD Pipeline Automation',
          ],
          techStack: ['Flutter', 'Dart', 'SQLite', 'Mapbox', 'GitLab CI'],
          status: 'LIVE',
        },
        {
          id: 'proj-4',
          name: 'Apex Invest Portal',
          role: 'Mobile Engineer',
          description: 'Fintech mobile gateway for investors and managers. Designed around strict security constraints and complex charts representing real-time fund analytics.',
          ownership: [
            'Secure Biometric Auth Layer',
            'Performance Optimization',
            'Analytics Dashboard',
            'Automated Code Signing',
          ],
          techStack: ['Flutter', 'Dart', 'REST API', 'Zustand-like BLoC', 'Fastlane'],
          status: 'LIVE',
        },
      ],
      caseStudy: {
        id: 'cs-1',
        title: 'Building a Scalable Mobile Platform',
        problem: 'Enterprise clients required customized, fully branded event applications without starting development from scratch for each customer, avoiding massive maintenance overhead.',
        solution: 'Designed and built a modular white-label Flutter platform. Integrated custom branding modules, reusable component schemas, environment configurations, and over-the-air (OTA) updates.',
        implementation: [
          'Shared Core Architecture separating configs from presentation',
          'Dynamic runtime branding & UI adjustment based on client JSON profiles',
          'Reusable platform modules (chat, schedules, networking)',
          'Environment-based automated pipeline setups (GitHub Actions)',
          'Fastlane code signing and store release automation',
          'Shorebird integration for hotfixing critical UI/logic bugs without App Store review',
        ],
        result: 'Successfully delivered and maintained 7 production applications on App Store and Play Store, cutting time-to-market for new client releases by 70%.',
      },
      journey: [
        {
          id: 'journey-1',
          year: '2022',
          title: 'Mobile Engineer',
          company: 'WHY Global Services',
          role: 'Mobile Apps Developer',
          workDone: [
            'Built custom interactive Maps integrations for location tracking and routing.',
            'Established real-time updates using WebSockets.',
            'Integrated external third-party SDKs and customized native bridges.',
            'Collaborated with designers to build fluid UI interactions.',
          ],
          tags: ['Mobile Apps', 'Maps', 'WebSockets', 'SDK Integrations'],
        },
        {
          id: 'journey-2',
          year: '2024',
          title: 'Mobile Engineer',
          company: 'Samaaro',
          role: 'Mobile Platform Owner',
          workDone: [
            'Engineered 5 Client Applications and 2 Internal Apps from scratch.',
            'Owned complete lifecycle: Architecture, Testing, CI/CD, and App Store/Play Store deployments.',
            'Optimized application boot time and rendering performance.',
            'Standardized repository workflows and developer guidelines.',
          ],
          tags: ['White-label Architecture', 'CI/CD Pipelines', 'App Store Releases', 'Shorebird OTA'],
        },
        {
          id: 'journey-3',
          year: 'Present',
          title: 'Mobile Platform Engineering',
          company: 'Community & Open Source',
          role: 'Speaker & Core Contributor',
          workDone: [
            'Contributing to Namma Wallet and other open-source projects.',
            'Delivering session talks on Flutter, state management, and CI/CD tools.',
            'Co-organizing events and mentoring junior engineers in the ecosystem.',
            'Writing technical papers and notes regarding mobile performance.',
          ],
          tags: ['Open Source', 'Public Speaking', 'Community Leadership', 'Technical Writing'],
        },
      ],
      skills: [
        {
          id: 'sk-1',
          categoryName: 'Mobile Engineering',
          skills: ['Flutter', 'Dart', 'Android', 'iOS', 'Xcode', 'Android Studio'],
        },
        {
          id: 'sk-2',
          categoryName: 'State Management',
          skills: ['BLoC', 'Riverpod', 'GetX'],
        },
        {
          id: 'sk-3',
          categoryName: 'Architecture & System Design',
          skills: ['Clean Architecture', 'Feature-First Architecture', 'System Design', 'Design Patterns', 'OOP', 'DSA Fundamentals', 'Performance Optimization'],
        },
        {
          id: 'sk-4',
          categoryName: 'Backend & Data Integration',
          skills: ['REST API', 'Dio', 'HTTP', 'JSON', 'WebSockets', 'Firebase Services'],
        },
        {
          id: 'sk-5',
          categoryName: 'DevOps & Automation',
          skills: ['Git', 'GitHub', 'GitLab', 'CI/CD Pipelines', 'GitHub Actions', 'Fastlane Automation', 'Shorebird OTA', 'Play Store Console', 'App Store Connect'],
        },
        {
          id: 'sk-6',
          categoryName: 'Testing & Debugging',
          skills: ['Unit Testing', 'Widget Testing', 'Integration Testing', 'Dart DevTools', 'Memory Leak Profiling'],
        },
        {
          id: 'sk-7',
          categoryName: 'Exploring & Full-Stack',
          skills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Java', 'JavaScript'],
        },
        {
          id: 'sk-8',
          categoryName: 'AI Engineering & Productivity',
          skills: ['ChatGPT', 'Claude AI', 'GitHub Copilot', 'Prompt Engineering', 'AI-assisted debugging', 'Auto-documentation'],
        },
      ],
      openSource: {
        id: 'os-1',
        name: 'Namma Wallet',
        role: 'Open Source Contributor',
        contributions: [
          'Feature Development for transactions history and wallets dashboard',
          'Custom Home Widgets allowing instant action items',
          'Modularized contributor templates for plug-and-play extensions',
          'Fastlane CI/CD scripting to speed up testing builds',
          'Release Automation publishing nightly builds onto GitHub Releases',
        ],
        githubUrl: 'https://github.com/namma-wallet',
      },
      notes: [
        {
          id: 'note-1',
          title: 'Flutter Deep Linking: Complete Guide',
          subtitle: 'A deep dive into setting up universal links on iOS and app links on Android securely.',
          date: 'May 14, 2026',
          readTime: '8 min read',
          link: 'https://medium.com',
        },
        {
          id: 'note-2',
          title: 'Mobile CI/CD with Fastlane & GitHub Actions',
          subtitle: 'How to automate code signing, build numbering, and store distribution from a single commit.',
          date: 'Apr 2, 2026',
          readTime: '12 min read',
          link: 'https://medium.com',
        },
        {
          id: 'note-3',
          title: 'Mobile Security Practices for Production Apps',
          subtitle: 'Implementing SSL pinning, biometric auth, and secure storage in Flutter apps.',
          date: 'Feb 18, 2026',
          readTime: '10 min read',
          link: 'https://medium.com',
        },
        {
          id: 'note-4',
          title: 'Flutter Performance Optimization Techniques',
          subtitle: 'Under the hood of Flutter rendering: reducing rebuilds, optimizing lists, and profiling memory leaks.',
          date: 'Jan 5, 2026',
          readTime: '15 min read',
          link: 'https://medium.com',
        },
      ],
      community: {
        id: 'comm-1',
        title: 'Namma Flutter Community',
        role: 'Core Team Member — Namma Flutter',
        description: 'Core Team Member @ Namma Flutter. Helping scale Chennai’s Flutter developer ecosystem through community engineering, meetups, workshops, and open-source collaboration.',
        activities: [
          'Help Organize Events',
          'Validate Speakers',
          'Be a Speaker for Sessions',
          'Conducted Sessions (5+ Topics)',
        ],
      },
    }
  }
}
