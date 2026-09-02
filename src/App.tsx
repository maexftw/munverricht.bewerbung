import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AppLayout } from './components/layout/AppLayout';
import { HeroBanner } from './components/sections/HeroBanner';
import { HandbookIndex } from './components/sections/HandbookIndex';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsMatrix } from './components/sections/SkillsMatrix';
import { FlagshipCaseStudy } from './components/sections/FlagshipCaseStudy';
import { SecondaryProjects } from './components/sections/SecondaryProjects';
import { ExperienceTimeline } from './components/sections/ExperienceTimeline';
import { ContactFooter } from './components/sections/ContactFooter';

export const MainLayout: React.FC = () => {
  const { language } = useLanguage();

  return (
    <AppLayout className="bg-[var(--bg1)]">
      {/* 1. Hyper-Link Editorial Hero Banner */}
      <HeroBanner />

      {/* 2. Hyper-Link Quick Navigation Handbook */}
      <HandbookIndex />

      {/* 3. Hyper-Link Genres 2-Column Domain Workspace */}
      <div className="hyp-genres">
        {/* Left Sticky Anchor Rail */}
        <aside className="hyp-genres-left" aria-label="Section Navigation">
          <div className="hyp-genres-anchor">
            <a href="#about">{language === 'de' ? 'Über Mich' : 'About'}</a>
            <a href="#flagship">{language === 'de' ? 'ASL Ademco' : 'ASL Ademco'}</a>
            <a href="#skills">{language === 'de' ? 'Kompetenzen' : 'Skills'}</a>
            <a href="#projects">{language === 'de' ? 'Projekte' : 'Projects'}</a>
            <a href="#experience">{language === 'de' ? 'Werdegang' : 'Timeline'}</a>
            <a href="#contact">{language === 'de' ? 'Kontakt' : 'Contact'}</a>
          </div>
        </aside>

        {/* Right Content Stream: All Sections Cohesively Formatted */}
        <div className="hyp-genres-right space-y-16">
          <AboutSection />
          <FlagshipCaseStudy />
          <SkillsMatrix />
          <SecondaryProjects />
          <ExperienceTimeline />
          <ContactFooter />
        </div>
      </div>
    </AppLayout>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainLayout />
      </LanguageProvider>
    </ThemeProvider>
  );
}
