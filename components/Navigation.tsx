import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Terminal,
  User,
  Code,
  Briefcase,
  Mail,
  Sun,
  Moon,
  Sparkles,
  ListChecks,
  ArrowUpRight,
} from 'lucide-react';
import ASCIIText from './ASCIIText';
import { useTheme } from './ThemeContext';

type Language = 'de' | 'en';

type NavigationProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
  currentPath: string;
};

type NavItem = {
  name: string;
  href: string;
  icon: typeof Terminal;
};

const portfolioNavItems: Record<Language, NavItem[]> = {
  de: [
    { name: 'Start', href: '#hero', icon: Terminal },
    { name: 'Über mich', href: '#evolution', icon: User },
    { name: 'Projekte', href: '#projects', icon: Briefcase },
    { name: 'Skills', href: '#skill-monitor', icon: Code },
    { name: 'Kontakt', href: '#contact-shell', icon: Mail },
  ],
  en: [
    { name: 'Home', href: '#hero', icon: Terminal },
    { name: 'About', href: '#evolution', icon: User },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Skills', href: '#skill-monitor', icon: Code },
    { name: 'Contact', href: '#contact-shell', icon: Mail },
  ],
};

const serviceNavItems: Record<Language, NavItem[]> = {
  de: [
    { name: 'Leistungen', href: '#webdesign-services', icon: Sparkles },
    { name: 'Ablauf', href: '#webdesign-process', icon: ListChecks },
    { name: 'Referenzen', href: '#webdesign-proof', icon: Briefcase },
    { name: 'Kontakt', href: '#webdesign-contact', icon: Mail },
  ],
  en: [
    { name: 'Services', href: '#webdesign-services', icon: Sparkles },
    { name: 'Process', href: '#webdesign-process', icon: ListChecks },
    { name: 'Proof', href: '#webdesign-proof', icon: Briefcase },
    { name: 'Contact', href: '#webdesign-contact', icon: Mail },
  ],
};

const Navigation: React.FC<NavigationProps> = ({ language, onLanguageChange, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isWebdesignPage = currentPath === '/webdesign';
  const navItems = isWebdesignPage ? serviceNavItems[language] : portfolioNavItems[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 42);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const desktopShellClass = [
    'flex w-full items-center justify-between rounded-full border px-4 py-3 backdrop-blur-xl transition-all duration-300',
    scrolled
      ? 'border-[color:var(--accent-border)] bg-[color:var(--surface-1)]/82 shadow-[0_18px_70px_rgba(4,8,18,0.28)]'
      : 'border-[color:var(--border-subtle)] bg-[color:var(--surface-1)]/52 shadow-[0_10px_40px_rgba(4,8,18,0.18)]',
  ].join(' ');

  const webdesignLinkClass = [
    'inline-flex h-10 items-center rounded-full border px-4 mono text-[10px] uppercase tracking-[0.24em] transition-colors',
    isWebdesignPage
      ? 'border-[color:var(--accent-border-strong)] bg-[color:var(--accent-fill)] text-[color:var(--accent-contrast)]'
      : 'border-[color:var(--border-subtle)] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]',
  ].join(' ');

  const themeLabel = theme === 'light' ? 'dunklem' : 'hellem';

  return (
    <>
      <motion.nav
        initial={{ y: -88, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 hidden md:block"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-4 sm:px-6 lg:px-8">
          <div
            className={desktopShellClass}
            style={{ transform: 'translate3d(calc(var(--space-x, 0) * 8px), calc(var(--space-y, 0) * -6px), 0)' }}
          >
            <button
              type="button"
              className="group flex items-center gap-2 text-left"
              onClick={() => {
                if (isWebdesignPage) {
                  window.location.href = '/';
                  return;
                }
                scrollToSection('#hero');
              }}
              aria-label="munverricht.org"
            >
              <div className="text-[color:var(--text-primary)] transition-transform duration-300 group-hover:-translate-y-0.5">
                <ASCIIText text="munverricht" className="lowercase" />
              </div>
              <span className="mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent-color)]">.org</span>
            </button>

            <div className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--text-primary)]"
                >
                  <item.icon
                    className="h-3.5 w-3.5 text-[color:var(--accent-color)] opacity-50 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)]/50 text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--text-primary)]"
                aria-label={'Zu ' + themeLabel + ' Modus wechseln'}
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>

              <button
                type="button"
                onClick={() => onLanguageChange(language === 'de' ? 'en' : 'de')}
                className="inline-flex h-10 items-center justify-center rounded-full border border-[color:var(--border-subtle)] px-4 mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--text-primary)]"
              >
                {language === 'de' ? 'EN' : 'DE'}
              </button>

              <a href="/webdesign" className={webdesignLinkClass}>
                {language === 'de' ? 'Webdesign' : 'Web Design'}
              </a>

              <a
                href="Maximilian_Unverricht_Resume.html"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[color:var(--accent-fill)] px-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-contrast)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {language === 'de' ? 'Lebenslauf' : 'Resume'}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="fixed left-4 right-4 top-4 z-50 flex items-center justify-between md:hidden">
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)]/82 text-[color:var(--text-secondary)] backdrop-blur-xl"
          aria-label={'Zu ' + themeLabel + ' Modus wechseln'}
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)]/82 text-[color:var(--text-primary)] backdrop-blur-xl"
          aria-label={language === 'de' ? 'Menü umschalten' : 'Toggle menu'}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-[rgba(3,6,14,0.78)] backdrop-blur-2xl" />
            <motion.div
              initial={{ y: 26, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex min-h-screen flex-col justify-between px-6 pb-8 pt-24"
            >
              <div className="space-y-10">
                <div className="space-y-3">
                  <p className="mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">munverricht.org</p>
                  <p className="max-w-[20rem] text-sm leading-7 text-[color:var(--text-secondary)]">
                    {language === 'de'
                      ? 'Frontend, Webdesign und lokale AI-Workflows mit ruhigerer, hochwertigerer Präsentation.'
                      : 'Frontend, web design, and local AI workflows with a calmer, more premium presentation.'}
                  </p>
                </div>

                <div className="space-y-3">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => scrollToSection(item.href)}
                      className="flex w-full items-center justify-between border-b border-[color:var(--border-subtle)] py-4 text-left text-xl font-semibold tracking-[-0.04em] text-[color:var(--text-primary)]"
                    >
                      <span>{item.name}</span>
                      <item.icon className="h-5 w-5 text-[color:var(--accent-color)]" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 border-t border-[color:var(--border-subtle)] pt-6">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onLanguageChange(language === 'de' ? 'en' : 'de')}
                    className="inline-flex h-11 items-center rounded-full border border-[color:var(--border-subtle)] px-4 mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--text-secondary)]"
                  >
                    {language === 'de' ? 'Switch to EN' : 'Wechsel zu DE'}
                  </button>
                  <a
                    href="/webdesign"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex h-11 items-center rounded-full border border-[color:var(--border-subtle)] px-4 mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--text-secondary)]"
                  >
                    {language === 'de' ? 'Webdesign' : 'Web Design'}
                  </a>
                </div>
                <a
                  href="Maximilian_Unverricht_Resume.html"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-[color:var(--accent-fill)] px-5 text-sm font-semibold text-[color:var(--accent-contrast)]"
                >
                  {language === 'de' ? 'Lebenslauf öffnen' : 'Open resume'}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
