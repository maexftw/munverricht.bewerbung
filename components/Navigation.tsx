import React, { useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@astryxdesign/core/Button';
import { HStack } from '@astryxdesign/core/HStack';
import { IconButton } from '@astryxdesign/core/IconButton';
import { Link } from '@astryxdesign/core/Link';
import { MobileNav } from '@astryxdesign/core/MobileNav';
import { SideNavItem, SideNavSection } from '@astryxdesign/core/SideNav';
import { TopNav, TopNavHeading, TopNavItem } from '@astryxdesign/core/TopNav';
import { useTheme } from './ThemeContext';

type Language = 'de' | 'en';

type NavigationProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
};

const navItems = {
  de: [
    { name: 'Start', href: '#hero' },
    { name: 'Über mich', href: '#evolution' },
    { name: 'Projekte', href: '#projects' },
    { name: 'Skills', href: '#skill-monitor' },
    { name: 'Kontakt', href: '#contact-shell' },
  ],
  en: [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#evolution' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skill-monitor' },
    { name: 'Contact', href: '#contact-shell' },
  ],
};

const Navigation: React.FC<NavigationProps> = ({ language, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const nextLanguage = language === 'de' ? 'en' : 'de';
  const languageLabel = language === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln';
  const themeLabel =
    language === 'de'
      ? `Zu ${theme === 'light' ? 'dunklem' : 'hellem'} Modus wechseln`
      : `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`;
  const menuLabel = language === 'de' ? 'Menü öffnen' : 'Open menu';

  return (
    <>
      <TopNav
        className="hidden lg:flex"
        label={language === 'de' ? 'Hauptnavigation' : 'Main navigation'}
        heading={<TopNavHeading heading="munverricht.org" headingHref="#hero" />}
        centerContent={navItems[language].map((item) => (
          <React.Fragment key={item.href}><TopNavItem label={item.name} href={item.href} /></React.Fragment>
        ))}
        endContent={(
          <HStack gap={2} vAlign="center">
            <Button
              label={languageLabel}
              variant="ghost"
              size="sm"
              onClick={() => onLanguageChange(nextLanguage)}
            >
              {nextLanguage.toUpperCase()}
            </Button>
            <IconButton
              label={themeLabel}
              tooltip={themeLabel}
              variant="ghost"
              size="sm"
              icon={theme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
              onClick={toggleTheme}
            />
            <Link href="Maximilian_Unverricht_Resume_2026.html" isStandalone>
              {language === 'de' ? 'Lebenslauf' : 'Resume'} ↓
            </Link>
          </HStack>
        )}
      />

      <span className="fixed right-4 top-4 z-50 lg:hidden">
        <IconButton
          label={menuLabel}
          tooltip={menuLabel}
          icon={<Menu aria-hidden="true" />}
          variant="secondary"
          onClick={() => setIsOpen(true)}
        />
      </span>

      <MobileNav isOpen={isOpen} onOpenChange={setIsOpen} side="end" header="munverricht.org">
        <SideNavSection title="Navigation" isHeaderHidden>
          {navItems[language].map((item) => (
            <React.Fragment key={item.href}>
              <SideNavItem
                label={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
              />
            </React.Fragment>
          ))}
        </SideNavSection>
        <HStack gap={2} padding={4} wrap="wrap">
          <Button
            label={languageLabel}
            variant="secondary"
            size="sm"
            onClick={() => onLanguageChange(nextLanguage)}
          >
            {nextLanguage.toUpperCase()}
          </Button>
          <IconButton
            label={themeLabel}
            tooltip={themeLabel}
            variant="secondary"
            size="sm"
            icon={theme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
            onClick={toggleTheme}
          />
          <Link href="Maximilian_Unverricht_Resume_2026.html" isStandalone>
            {language === 'de' ? 'Lebenslauf' : 'Resume'} ↓
          </Link>
        </HStack>
      </MobileNav>
    </>
  );
};

export default Navigation;