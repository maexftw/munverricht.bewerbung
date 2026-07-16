import React, { lazy, Suspense, useState } from 'react';
import type { Language } from './components/portfolioContent';

const PortfolioPage = lazy(() => import('./components/PortfolioPage'));
const CaseStudyPage = lazy(() => import('./components/CaseStudyPage'));
const LegalPage = lazy(() => import('./components/LegalPage'));

const normalizePath = (pathname: string) => pathname.replace(/\/+$/, '') || '/';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'de';
    return window.localStorage.getItem('mu_language') === 'en' ? 'en' : 'de';
  });
  const pathname = normalizePath(window.location.pathname);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem('mu_language', nextLanguage);
  };

  let page: React.ReactNode;
  if (pathname === '/impressum' || pathname === '/datenschutz') {
    page = (
      <LegalPage
        page={pathname === '/impressum' ? 'impressum' : 'datenschutz'}
        language={language}
        onLanguageChange={changeLanguage}
      />
    );
  } else if (pathname.startsWith('/case/')) {
    page = <CaseStudyPage path={pathname} language={language} onLanguageChange={changeLanguage} />;
  } else {
    page = <PortfolioPage language={language} onLanguageChange={changeLanguage} />;
  }

  return <Suspense fallback={null}>{page}</Suspense>;
};

export default App;
