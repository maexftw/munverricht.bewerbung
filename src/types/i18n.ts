/**
 * Bilingual Internationalization (i18n) Type Definitions & Translation Dictionary Contracts
 * Maximilian Unverricht Digital Résumé & Portfolio
 */

export type Language = 'de' | 'en';

export interface MetaContent {
  title: string;
  description: string;
  ogTitle: string;
}

export interface NavContent {
  overview?: string;
  about: string;
  skills: string;
  flagship: string;
  projects: string;
  experience: string;
  contact: string;
  settings?: string;
  toggleLang: string;
}

export interface HeroContent {
  greeting: string;
  name: string;
  title: string;
  location: string;
  tagline: string;
  bio?: string;
  statsYears?: string;
  statsProjects?: string;
  statsAccuracy?: string;
  primaryCta: string;
  secondaryCta: string;
  ctaProjects?: string;
  ctaContact?: string;
}

export interface AboutHighlight {
  label: string;
  value: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  paragraphs: string[];
  highlights: AboutHighlight[];
}

export interface SkillCategory {
  name: string;
  skills?: string[];
  items: string[];
}

export interface SkillsContent {
  title: string;
  subtitle: string;
  categories: SkillCategory[];
}

export interface FlagshipPillar {
  title: string;
  desc?: string;
  description: string;
  tech: string;
}

export interface FlagshipMetric {
  label: string;
  value: string;
  detail: string;
}

export interface FlagshipAttribution {
  prototype: string;
  engineering: string[];
}

export interface FlagshipContent {
  badge: string;
  title: string;
  client: string;
  role?: string;
  subtitle: string;
  summary: string;
  problemTitle: string;
  problem: string;
  reactLoopTitle?: string;
  reactLoopDesc?: string;
  sqlPlaygroundTitle?: string;
  sqlPlaygroundDesc?: string;
  pillarsTitle: string;
  pillars: FlagshipPillar[];
  metricsTitle: string;
  metrics: FlagshipMetric[];
  attributionTitle: string;
  attribution: FlagshipAttribution;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  description: string;
  architecture: string;
  technologies: string[];
  metrics?: string;
  stack: string[];
  impact: string;
  links?: ProjectLink[];
}

export interface ProjectsContent {
  title: string;
  subtitle: string;
  genreAll?: string;
  genreEdge?: string;
  genreAi?: string;
  genreInfra?: string;
  items: ProjectItem[];
}

export interface ExperienceTimelineEntry {
  period: string;
  title: string;
  company: string;
  description: string;
  highlights: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  stack: string[];
}

export interface ExperienceContent {
  title: string;
  subtitle: string;
  timeline?: ExperienceTimelineEntry[];
  items: ExperienceItem[];
}

export interface SettingsContent {
  title: string;
  palettes: string;
  modes: string;
  light: string;
  sepia: string;
  dark: string;
  fontSize: string;
  fontSizeReset: string;
  contrast: string;
  lowContrastLabel: string;
}

export interface ContactContent {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  github?: string;
  imprint?: string;
  ctaButton: string;
  copiedNotice: string;
}

export interface ImprintSection {
  heading: string;
  text: string;
}

export interface ImprintContent {
  title: string;
  subtitle: string;
  content?: string;
  sections: ImprintSection[];
}

export interface TranslationDictionary {
  meta: MetaContent;
  nav: NavContent;
  hero: HeroContent;
  about: AboutContent;
  skills: SkillsContent;
  flagship: FlagshipContent;
  projects: ProjectsContent;
  experience: ExperienceContent;
  settings?: SettingsContent;
  contact: ContactContent;
  imprint?: ImprintContent;
}

export interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
}

export type LanguageContextType = LanguageContextValue;
