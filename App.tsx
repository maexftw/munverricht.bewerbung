import React, { Suspense, lazy, useState } from 'react';
import { ThemeProvider } from './components/ThemeContext';

const FirecrawlAnimationDemo = lazy(() => import('./components/FirecrawlAnimationDemo'));
const WebdesignLandingPage = lazy(() => import('./components/WebdesignLandingPage'));
const MainPortfolioPage = lazy(() => import('./components/MainPortfolioPage'));
const LegalPage = lazy(() => import('./components/LegalPage'));

const App: React.FC = () => {
  const [language, setLanguage] = useState<'de' | 'en'>(() => {
    if (typeof window === 'undefined') return 'de';
    const saved = window.localStorage.getItem('mu_language');
    return saved === 'en' ? 'en' : 'de';
  });
  const pathname = typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') || '/' : '/';
  const isFirecrawlAnimationDemo = pathname === '/firecrawl-animation';
  const isLegalPage = pathname === '/impressum' || pathname === '/datenschutz';
  const isWebdesignLandingPage = pathname === '/webdesign';
  const legalPage = pathname === '/impressum' ? 'impressum' : 'datenschutz';

  const handleLanguageChange = (nextLanguage: 'de' | 'en') => {
    setLanguage(nextLanguage);
    window.localStorage.setItem('mu_language', nextLanguage);
  };

  if (isFirecrawlAnimationDemo) {
    return (
      <Suspense fallback={null}>
        <FirecrawlAnimationDemo />
      </Suspense>
    );
  }

  if (isWebdesignLandingPage) {
    return (
      <ThemeProvider forcedTheme="light">
        <Suspense fallback={null}>
          <WebdesignLandingPage />
        </Suspense>
      </ThemeProvider>
    );
  }

  if (isLegalPage) {
    return (
      <Suspense fallback={null}>
        <LegalPage page={legalPage} language={language} onLanguageChange={handleLanguageChange} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={null}>
      <MainPortfolioPage language={language} onLanguageChange={handleLanguageChange} />
    </Suspense>
  );
};

export default App;
