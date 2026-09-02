import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X, Terminal, Cpu } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const navLinks = [
    { href: '#about', label: t.nav.about || (language === 'de' ? 'Profil' : 'Profile'), testId: 'nav-link-about' },
    { href: '#skills', label: t.nav.skills || 'Skills & Stack', testId: 'nav-link-skills' },
    { href: '#flagship', label: t.nav.flagship || 'ASL Ademco', testId: 'nav-link-flagship' },
    { href: '#projects', label: t.nav.projects || (language === 'de' ? 'Projekte' : 'Projects'), testId: 'nav-link-projects' },
    { href: '#experience', label: t.nav.experience || (language === 'de' ? 'Werdegang' : 'Experience'), testId: 'nav-link-experience' },
    { href: '#contact', label: t.nav.contact || (language === 'de' ? 'Kontakt' : 'Contact'), testId: 'nav-link-contact' },
  ];

  return (
    <header
      data-testid="cyber-navbar"
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          scrolled
            ? 'bg-[#0B0F17]/90 backdrop-blur-md border-b border-cyan-500/25 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-[#0B0F17]/70 backdrop-blur-sm border-b border-cyan-500/15'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand & Logo */}
        <a
          href="#"
          aria-label="Maximilian Unverricht — Home"
          className="touch-target min-h-[44px] inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg pr-2"
        >
          <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
            <Terminal className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm sm:text-base text-slate-100 group-hover:text-cyan-300 transition-colors tracking-tight">
              Maximilian Unverricht
            </span>
            <span className="font-mono text-[10px] text-cyan-400/80 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" aria-hidden="true" />
              AI & Web Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Desktop Navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={link.testId}
              className="
                touch-target min-h-[44px] px-3.5 py-2 rounded-lg text-sm font-medium
                text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
              "
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Telemetry Status Pill (Desktop only) */}
          <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 motion-safe:animate-ping" aria-hidden="true" />
            <span className="tabular-nums uppercase text-[11px] font-semibold">Available for roles</span>
          </div>

          {/* Bilingual Language Switcher */}
          <LanguageSwitcher />

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="
              lg:hidden touch-target min-h-[44px] min-w-[44px] p-2.5 rounded-lg
              bg-slate-900/80 border border-cyan-500/30 text-slate-300
              hover:text-cyan-300 hover:border-cyan-400/60
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
              transition-all
            "
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-cyan-400" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5 text-slate-200" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-label="Mobile Navigation"
          aria-modal="true"
          className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bg-[#0B0F17]/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-[0_20px_40px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="
                  touch-target min-h-[48px] px-4 py-3 rounded-lg text-base font-medium
                  text-slate-200 hover:text-cyan-300 hover:bg-slate-800/80
                  border border-transparent hover:border-cyan-500/20
                  transition-all duration-150 flex items-center justify-between
                "
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-cyan-400/60">→</span>
              </a>
            ))}

            {/* Mobile Telemetry Footer */}
            <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>REACT 19 · CLOUDFLARE EDGE</span>
              </span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                DORTMUND, DE
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
