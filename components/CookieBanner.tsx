import React, { useEffect, useState } from 'react';

type CookieBannerProps = {
  language: 'de' | 'en';
};

const COOKIE_NOTICE_KEY = 'mu_cookie_notice_acknowledged_v1';

const cookieBannerCopy = {
  de: {
    title: 'Cookie-Hinweis',
    body:
      'Diese Website verwendet keine Analyse- oder Marketing-Cookies. Lokal gespeichert werden nur technisch notwendige Einstellungen wie Sprache, Theme und die Info, dass Sie diesen Hinweis bereits geschlossen haben.',
    cta: 'Verstanden',
    privacy: 'Datenschutz',
  },
  en: {
    title: 'Cookie notice',
    body:
      'This website does not use analytics or marketing cookies. It stores only technically necessary settings such as language, theme, and the information that you dismissed this notice.',
    cta: 'Understood',
    privacy: 'Privacy',
  },
} as const;

const CookieBanner: React.FC<CookieBannerProps> = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasAcknowledged = window.localStorage.getItem(COOKIE_NOTICE_KEY) === 'true';
    setIsVisible(!hasAcknowledged);
  }, []);

  const handleDismiss = () => {
    window.localStorage.setItem(COOKIE_NOTICE_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  const copy = cookieBannerCopy[language];

  return (
    <div className="fixed inset-x-0 bottom-0 z-[120] px-4 pb-4 sm:px-6 sm:pb-6">
      <section
        role="dialog"
        aria-live="polite"
        aria-label={copy.title}
        className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-[1.25rem] border border-[color:var(--border-strong)] bg-[color:var(--surface-1)] p-4 text-[color:var(--text-primary)] shadow-[0_22px_48px_rgba(15,23,42,0.18)] backdrop-blur-[20px] sm:flex-row sm:items-end sm:justify-between sm:p-5"
      >
        <div className="max-w-3xl space-y-2">
          <p className="mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-color)]">{copy.title}</p>
          <p className="text-sm leading-6 text-[color:var(--text-secondary)] sm:text-[0.95rem]">
            {copy.body}{' '}
            <a
              href="/datenschutz"
              className="font-semibold text-[color:var(--accent-color)] underline decoration-[color:var(--accent-border-strong)] underline-offset-4 transition-colors hover:text-[color:var(--accent-soft)]"
            >
              {copy.privacy}
            </a>
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={handleDismiss}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[color:var(--accent-fill)] px-5 py-3 mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-contrast)] transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-1)]"
          >
            {copy.cta}
          </button>
        </div>
      </section>
    </div>
  );
};

export default CookieBanner;
