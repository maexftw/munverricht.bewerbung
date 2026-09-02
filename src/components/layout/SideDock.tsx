import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../context/LanguageContext';
import {
  User,
  Layers,
  ShieldCheck,
  FolderGit2,
  Briefcase,
  Mail,
  Languages,
  Sliders,
  ChevronUp,
} from 'lucide-react';

export interface SideDockProps {
  className?: string;
}

interface NavItem {
  href: string;
  labelDe: string;
  labelEn: string;
  pillText: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: '#about',
    labelDe: 'Profil',
    labelEn: 'Profile',
    pillText: '12+',
    icon: <User className="w-5 h-5" />,
  },
  {
    href: '#skills',
    labelDe: 'Skills & Stack',
    labelEn: 'Skills & Stack',
    pillText: '4x',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    href: '#flagship',
    labelDe: 'ASL Ademco Flagship',
    labelEn: 'ASL Ademco Flagship',
    pillText: '1.4k',
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    href: '#projects',
    labelDe: 'Projekte',
    labelEn: 'Projects',
    pillText: '5',
    icon: <FolderGit2 className="w-5 h-5" />,
  },
  {
    href: '#experience',
    labelDe: 'Werdegang',
    labelEn: 'Experience',
    pillText: '2',
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    href: '#contact',
    labelDe: 'Kontakt',
    labelEn: 'Contact',
    pillText: '@',
    icon: <Mail className="w-5 h-5" />,
  },
];

export const SideDock: React.FC<SideDockProps> = ({ className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  let toggleDrawer = () => {};
  let isDrawerOpen = false;
  let mode = 'light';
  let palette = 'default';
  try {
    const themeCtx = useTheme();
    toggleDrawer = themeCtx.toggleDrawer;
    isDrawerOpen = themeCtx.isDrawerOpen;
    mode = themeCtx.mode;
    palette = themeCtx.palette;
  } catch {
    // Fallback if rendered outside ThemeProvider
  }

  let language: 'de' | 'en' = 'de';
  let toggleLanguage: (() => void) | undefined;
  try {
    const langCtx = useLanguage();
    language = langCtx.language;
    toggleLanguage = langCtx.toggleLanguage;
  } catch {
    // Fallback if rendered outside LanguageProvider
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile Top App Bar (visible < 1024px) */}
      <header className="lg:hidden sticky top-0 z-40 w-full bg-[var(--bgInverse)] text-[var(--bg1)] border-b border-[var(--bgInverse2)] shadow-md">
        <div className="px-4 py-3 flex items-center justify-between">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            aria-label="Maximilian Unverricht — Home"
            className="font-black text-sm uppercase tracking-wider text-[var(--bg1)] hover:text-[var(--accent2)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent1)] rounded p-1 min-h-[44px] inline-flex items-center"
          >
            MAX<span className="text-[var(--accent1)]">UNVERRICHT</span>
          </a>

          <div className="flex items-center gap-2">
            {toggleLanguage && (
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={language === 'de' ? 'Mobile: Sprache wechseln' : 'Mobile: Switch language'}
                className="touch-target px-2.5 py-1 text-xs font-black uppercase rounded border border-[var(--accent2)] bg-[var(--bgInverse2)] text-[var(--accent2)] hover:bg-[var(--accent2)] hover:text-[var(--bgInverse)] transition-colors min-h-[44px] min-w-[44px]"
              >
                {language === 'de' ? 'EN' : 'DE'}
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="touch-target px-3 py-1 text-xs font-black uppercase rounded bg-[var(--accent1)] text-[var(--bg1)] hover:opacity-90 transition-opacity flex items-center gap-1.5 min-h-[44px]"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>MENU</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu Dropdown */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile Navigation"
            className="border-t border-[var(--bgInverse2)] bg-[var(--bgInverse)] text-[var(--bg1)] px-4 py-4 space-y-2 shadow-2xl"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded bg-[var(--bgInverse2)] text-white hover:text-[var(--accent2)] transition-colors text-xs font-mono font-bold uppercase min-h-[44px]"
              >
                <span>{language === 'de' ? item.labelDe : item.labelEn}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent1)] text-white">
                  {item.pillText}
                </span>
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                toggleDrawer();
              }}
              aria-expanded={isDrawerOpen}
              aria-controls="settings-drawer-panel"
              className="touch-target w-full mt-2 py-2 px-3 rounded bg-[var(--accent2)] text-[var(--bgInverse)] text-xs font-mono font-bold uppercase text-center hover:opacity-90 transition-opacity min-h-[44px]"
            >
              {language === 'de' ? 'Themen & Einstellungen' : 'Themes & Settings'}
            </button>
          </nav>
        )}
      </header>

      {/* Desktop 140px Fixed Side Dock (visible >= 1024px) */}
      <aside
        data-testid="side-dock"
        aria-label="Sidebar Navigation"
        className={`hyp-menu hidden lg:flex ${className}`}
      >
        {/* 1. Menu Trigger Button (.hyp-menu-click) */}
        <button
          type="button"
          data-testid="menu-trigger-btn"
          onClick={toggleDrawer}
          aria-expanded={isDrawerOpen}
          aria-controls="settings-drawer-panel"
          aria-label={language === 'de' ? 'Einstellungen öffnen' : 'Open settings drawer'}
          className="hyp-menu-click group focus-visible:ring-2 focus-visible:ring-[var(--accent1)] rounded min-h-[44px] min-w-[44px]"
        >
          <div className="hyp-menu-click1">
            <div className="hyp-menu-click2">
              <div>
                <Sliders className="w-6 h-6 text-[var(--accent1)] group-hover:text-[var(--accent2)] transition-colors" />
              </div>
            </div>
          </div>
          <div className="hyp-menu-click3">MENU</div>
        </button>

        {/* 2. Top Hairline Divider */}
        <div className="w-full flex flex-col items-center gap-2 my-2" aria-hidden="true">
          <div className="w-2 h-2 bg-[var(--bgInverse2)]" />
          <div className="w-px h-8 bg-[var(--bgInverse2)]" />
        </div>

        {/* 3. Navigation Anchor Links */}
        <nav aria-label="Main Section Navigation" className="flex flex-col items-center gap-3 my-auto">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-testid={`nav-link-${item.href.replace('#', '')}`}
              aria-label={language === 'de' ? item.labelDe : item.labelEn}
              className="hyp-nav-link touch-target relative p-2 text-[var(--bg2)] hover:text-[var(--accent2)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent1)] rounded"
              title={language === 'de' ? item.labelDe : item.labelEn}
            >
              {item.icon}
              <div className="hyp-nav-pill" aria-hidden="true">
                {item.pillText}
              </div>
            </a>
          ))}
        </nav>

        {/* 4. Bottom Hairline Divider */}
        <div className="w-full flex flex-col items-center gap-2 my-2" aria-hidden="true">
          <div className="w-px h-8 bg-[var(--bgInverse2)]" />
          <div className="w-2 h-2 bg-[var(--bgInverse2)]" />
        </div>

        {/* 5. Utility Controls: Language & Scroll Top */}
        <div className="flex flex-col items-center gap-2 mt-auto w-full pt-2">
          {toggleLanguage && (
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={language === 'de' ? 'Switch language to English' : 'Sprache auf Deutsch umschalten'}
              className="touch-target w-full py-1.5 px-2 text-[11px] font-black uppercase rounded border border-[var(--bgInverse2)] bg-[var(--bgInverse2)] text-[var(--bg1)] hover:border-[var(--accent2)] hover:text-[var(--accent2)] transition-colors flex items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent1)]"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === 'de' ? 'DE' : 'EN'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={scrollToTop}
            aria-label={language === 'de' ? 'Nach oben scrollen' : 'Scroll to top'}
            className="touch-target w-full py-1.5 px-2 text-[11px] font-black uppercase rounded border border-[var(--bgInverse2)] bg-[var(--bgInverse2)] text-[var(--bg1)] hover:border-[var(--accent1)] hover:text-[var(--accent1)] transition-colors flex items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent1)]"
            title="Top"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            <span>TOP</span>
          </button>

          {/* Active Theme Mode / Palette Indicator */}
          <div className="text-[9px] uppercase tracking-widest text-gray-400 font-mono mt-1 text-center">
            {mode} • {palette.slice(0, 4)}
          </div>
        </div>
      </aside>
    </>
  );
};
