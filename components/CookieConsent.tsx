import React, { useEffect, useState } from 'react';

const COOKIE_KEY = 'mu_cookie_consent_v1';

type ConsentChoice = 'essential' | 'all';
type Language = 'de' | 'en';

type CookieConsentProps = {
  language: Language;
};

const CookieConsent: React.FC<CookieConsentProps> = ({ language }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(COOKIE_KEY);
    if (!saved) setVisible(true);
  }, []);

  const persistChoice = (choice: ConsentChoice) => {
    window.localStorage.setItem(
      COOKIE_KEY,
      JSON.stringify({ choice, timestamp: new Date().toISOString() }),
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[1200] md:left-auto md:max-w-xl">
      <div className="rounded-xl border border-neutral-700 bg-[#0b0d14]/95 backdrop-blur-md p-5 shadow-[0_0_35px_rgba(59,130,246,0.2)] space-y-4">
        <h3 className="mono text-xs uppercase tracking-[0.2em] text-blue-400">{language === 'de' ? 'Cookie-Zustimmung' : 'Cookie Consent'}</h3>
        <p className="text-sm text-neutral-200 leading-relaxed">
          {language === 'de'
            ? 'Diese Website wird über Cloudflare bereitgestellt. Es werden technisch notwendige Cookies genutzt. Optionale Messung (z. B. Cloudflare Analytics) wird erst nach deiner Zustimmung aktiviert.'
            : 'This website is delivered via Cloudflare. Technically necessary cookies are used. Optional measurement (e.g. Cloudflare Analytics) is only activated after your consent.'}
        </p>
        <p className="text-xs text-neutral-400 leading-relaxed">
          {language === 'de' ? 'Mehr Infos findest du im ' : 'More information in the '}
          <a href="#impressum" className="text-blue-400 hover:text-blue-300">{language === 'de' ? 'Impressum' : 'legal notice'}</a>
          {language === 'de' ? ' und in der ' : ' and in the '}
          <a href="#datenschutz" className="text-blue-400 hover:text-blue-300">{language === 'de' ? 'Datenschutzerklärung' : 'privacy policy'}</a>.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => persistChoice('essential')}
            className="px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded border border-neutral-600 text-neutral-200 hover:border-blue-500"
          >
            {language === 'de' ? 'Nur notwendige' : 'Essential only'}
          </button>
          <button
            onClick={() => persistChoice('all')}
            className="px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded bg-blue-600 text-white hover:bg-blue-500"
          >
            {language === 'de' ? 'Alle akzeptieren' : 'Accept all'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
