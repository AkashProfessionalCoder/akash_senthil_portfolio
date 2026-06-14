export interface Project {
  id: string;
  name: string;
  role: string;
  ownership: string[];
  techStack: string[];
  status: 'LIVE' | 'IN_DEVELOPMENT';
  appStoreUrl?: string;
  playStoreUrl?: string;
  description: string;
}

export interface ImpactStat {
  id: string;
  value: string;
  label: string;
  subtitle?: string;
  details?: string[];
  category?: string;
}

export interface JourneyItem {
  id: string;
  year: string;
  title: string;
  company: string;
  role: string;
  workDone: string[];
  tags: string[];
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  problem: string;
  solution: string;
  implementation: string[];
  result: string;
}

export interface OpenSourceProject {
  id: string;
  name: string;
  role: string;
  contributions: string[];
  githubUrl?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  link: string;
}

export interface CommunityActivity {
  id: string;
  title: string;
  role: string;
  description: string;
  activities: string[];
  images?: string[];
}

export interface PortfolioData {
  hero: {
    name: string;
    role: string;
    tagline: string;
    skillsHighlight: string[];
    stats: { label: string; value: string }[];
  };
  impactStats: ImpactStat[];
  projects: Project[];
  caseStudy: CaseStudy;
  journey: JourneyItem[];
  skills: SkillCategory[];
  openSource: OpenSourceProject;
  notes: NoteItem[];
  community: CommunityActivity;
}
