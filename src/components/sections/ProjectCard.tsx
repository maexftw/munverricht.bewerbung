import React, { useState } from 'react';
import type { SecondaryProject } from '../../types/project';
import { useLanguage } from '../../context/LanguageContext';
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Cpu,
  Shield,
  Zap,
} from 'lucide-react';

export interface ProjectCardProps {
  project: SecondaryProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryIcons = {
    edge: <Zap className="w-4 h-4 text-[var(--accent1)]" />,
    ai: <Cpu className="w-4 h-4 text-[var(--accent2)]" />,
    infra: <Shield className="w-4 h-4 text-[var(--accent1)]" />,
  };

  const categoryLabels = {
    edge: language === 'de' ? 'Edge & Fullstack' : 'Edge & Fullstack',
    ai: language === 'de' ? 'Offline AI & RAG' : 'Offline AI & RAG',
    infra: language === 'de' ? 'Security & Infra' : 'Security & Infra',
  };

  return (
    <article
      className="p-6 sm:p-7 rounded-2xl bg-[var(--bg1)] border-2 border-[var(--bgInverse)] shadow-lg space-y-4 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className="space-y-3">
        {/* Category & Year Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--bgInverse)] text-[var(--bg1)] text-[11px] font-mono font-bold uppercase tracking-wider">
            {categoryIcons[project.category]}
            <span>{categoryLabels[project.category]}</span>
          </div>

          <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded bg-[var(--bg2)] text-[var(--bgInverse)]">
            {project.year}
          </span>
        </div>

        {/* Title & Client */}
        <div>
          <h3
            id={`project-title-${project.id}`}
            className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[var(--bgInverse)]"
          >
            {project.title}
          </h3>
          <p className="text-xs font-mono font-bold text-[var(--accent1)] mt-0.5">
            {project.client} • {project.domain}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[var(--bgInverse)]/85 leading-relaxed font-sans">
          {project.description}
        </p>

        {/* Measurable Metrics Pill */}
        {project.metrics && (
          <div className="p-3 rounded-xl bg-[var(--bg2)]/70 border border-[var(--bgInverse2)]/20 text-xs font-mono text-[var(--bgInverse)] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[var(--accent1)] tracking-wider block">
              {language === 'de' ? 'Messbare Ergebnisse:' : 'Measurable Impact:'}
            </span>
            <div className="font-bold">{project.metrics}</div>
          </div>
        )}

        {/* Expandable Architecture & Highlights */}
        {isExpanded && (
          <div
            id={`project-details-${project.id}`}
            className="space-y-3 pt-2 border-t border-[var(--bgInverse2)]/20 animate-[hypFadeIn_0.2s_ease-out]"
          >
            {/* Architecture Overview */}
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase text-[var(--bgInverse)]">
                {language === 'de' ? 'Architektur-Aufbau:' : 'Architecture Breakdown:'}
              </span>
              <p className="text-xs text-[var(--bgInverse)]/80 leading-relaxed font-sans">
                {project.architecture}
              </p>
            </div>

            {/* Highlights List */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold uppercase text-[var(--bgInverse)]">
                  {language === 'de' ? 'Besondere Highlights:' : 'Key Highlights:'}
                </span>
                <ul className="space-y-1 text-xs text-[var(--bgInverse)]/90">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Learnings */}
            {project.keyLearnings && (
              <div className="p-2.5 rounded bg-[var(--bgInverse)] text-[var(--bg1)] text-xs font-mono italic">
                💡 {project.keyLearnings}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer: Tech Stack Chips & Expand Toggle */}
      <div className="space-y-3 pt-3 border-t border-[var(--bgInverse2)]/20">
        {/* Tech Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-[var(--bg2)] text-[var(--bgInverse)] text-[10px] font-mono font-bold uppercase border border-[var(--bgInverse2)]/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expand / Collapse Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={`project-details-${project.id}`}
          className="touch-target w-full py-1.5 px-3 rounded bg-[var(--bg2)] hover:bg-[var(--bg3)] text-[var(--bgInverse)] text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
        >
          <span>
            {isExpanded
              ? language === 'de'
                ? 'Details ausblenden'
                : 'Hide Details'
              : language === 'de'
              ? 'Architektur & Details anzeigen'
              : 'Show Architecture & Details'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;
