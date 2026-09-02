import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { secondaryProjectsData } from '../../data/secondaryProjects';
import type { ProjectGenreFilter } from '../../types/project';
import { SteppedButton } from '../ui/SteppedButton';
import { ProjectCard } from './ProjectCard';

export const SecondaryProjects: React.FC = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<ProjectGenreFilter>('all');

  const filteredProjects =
    filter === 'all'
      ? secondaryProjectsData
      : secondaryProjectsData.filter((p) => p.category === filter);

  const filterTabs: Array<{ id: ProjectGenreFilter; labelDe: string; labelEn: string }> = [
    { id: 'all', labelDe: 'Alle Projekte (5)', labelEn: 'All Projects (5)' },
    { id: 'edge', labelDe: 'Edge & Fullstack', labelEn: 'Edge & Fullstack' },
    { id: 'ai', labelDe: 'Offline AI & RAG', labelEn: 'Offline AI & RAG' },
    { id: 'infra', labelDe: 'Security & Infra', labelEn: 'Security & Infra' },
  ];

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-12 sm:py-16 lg:py-20 border-b border-[var(--bgInverse2)]/20 space-y-8"
    >
      {/* Section Header & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-8 hyp-hatch-accent1 rounded-sm" aria-hidden="true" />
            <h2
              id="projects-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[var(--bgInverse)]"
            >
              {t.projects.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--bgInverse)]/80 font-medium max-w-2xl font-sans">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Genre Filter Stepped Buttons */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={language === 'de' ? 'Projektkategorien Filter' : 'Project Genre Filter'}>
          {filterTabs.map((tab) => (
            <SteppedButton
              key={tab.id}
              size="sm"
              variant={filter === tab.id ? 'primary' : 'neutral'}
              steppedShadow={filter === tab.id ? 'accent1' : 'none'}
              onClick={() => setFilter(tab.id)}
              aria-pressed={filter === tab.id}
            >
              {language === 'de' ? tab.labelDe : tab.labelEn}
            </SteppedButton>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default SecondaryProjects;
