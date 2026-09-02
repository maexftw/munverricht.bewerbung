import React from 'react';
import { SideDock } from './SideDock';
import { DiagonalSlant } from './DiagonalSlant';
import { SettingsDrawer } from './SettingsDrawer';
import { LiveAnnouncer } from '../ui/LiveAnnouncer';
import { useLanguage } from '../../context/LanguageContext';

export interface AppLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, className = '' }) => {
  let language = 'de';
  try {
    const langContext = useLanguage();
    language = langContext.language;
  } catch {
    // Fallback outside LanguageProvider
  }

  return (
    <div className={`hyp flex flex-col lg:grid ${className}`} data-testid="app-layout">
      {/* Accessible Skip Link for Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[var(--accent1)] focus:text-white focus:font-mono focus:font-bold focus:rounded focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        {language === 'de' ? 'Zum Hauptinhalt springen' : 'Skip to main content'}
      </a>

      {/* Screen Reader Live Region for Dynamic Changes */}
      <LiveAnnouncer />

      {/* 1. Side Dock (140px fixed left bar) */}
      <SideDock />

      {/* 2. Diagonal Slanted Visual Break (25px hatch separator) */}
      <DiagonalSlant />

      {/* 3. Main Content Scroll Canvas */}
      <main id="main-content" className="hyp-body max-w-6xl mx-auto w-full" tabIndex={-1}>
        <div className="hyp-wrapper">{children}</div>
      </main>

      {/* 4. Settings Drawer Modal */}
      <SettingsDrawer />
    </div>
  );
};

