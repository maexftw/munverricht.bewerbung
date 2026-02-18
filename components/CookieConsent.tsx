import React, { useEffect, useState } from 'react';

const COOKIE_KEY = 'mu_cookie_consent_v1';

type ConsentChoice = 'essential' | 'all';

const CookieConsent: React.FC = () => {
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
        <h3 className="mono text-xs uppercase tracking-[0.2em] text-blue-400">Cookie Consent</h3>
        <p className="text-sm text-neutral-200 leading-relaxed">
          Diese Website wird über Cloudflare bereitgestellt. Es werden technisch notwendige Cookies genutzt.
          Optionale Messung (z. B. Cloudflare Analytics) wird erst nach deiner Zustimmung aktiviert.
        </p>
        <p className="text-xs text-neutral-400 leading-relaxed">
          Mehr Infos findest du im <a href="#impressum" className="text-blue-400 hover:text-blue-300">Impressum</a> und in der{' '}
          <a href="#datenschutz" className="text-blue-400 hover:text-blue-300">Datenschutzerklärung</a>.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => persistChoice('essential')}
            className="px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded border border-neutral-600 text-neutral-200 hover:border-blue-500"
          >
            Nur notwendige
          </button>
          <button
            onClick={() => persistChoice('all')}
            className="px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded bg-blue-600 text-white hover:bg-blue-500"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
