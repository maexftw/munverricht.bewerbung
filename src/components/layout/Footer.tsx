import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUp, Terminal, Shield, Github, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDe = language === 'de';

  return (
    <footer className="relative border-t border-cyan-500/20 bg-[#070A0F] text-slate-400 font-sans overflow-hidden">
      {/* Micro-grid background overlay */}
      <div className="absolute inset-0 cyber-grid-overlay opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Identity & Positioning */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
              <div className="w-7 h-7 rounded bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span>Maximilian Unverricht</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {isDe
                ? 'AI-gestützter Web-Entwickler & AI Automation Specialist mit 12+ Jahren Erfahrung in moderner Frontend-Architektur und Cloudflare Edge Pipelines.'
                : 'AI-assisted Web Developer & AI Automation Specialist with 12+ years of experience building modern frontend architectures and Cloudflare Edge pipelines.'}
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
              <span>{isDe ? 'STATUS: VERFÜGBAR FÜR PROJEKTE & ROLLEN' : 'STATUS: AVAILABLE FOR PROJECTS & ROLES'}</span>
            </div>
          </div>

          {/* Col 2: Navigation Anchors */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-2">
              // Navigation
            </span>
            <ul className="space-y-1 text-xs sm:text-sm">
              <li>
                <a href="#about" className="hover:text-cyan-300 transition-colors py-1 inline-block">
                  {t.nav.about || (isDe ? 'Profil' : 'Profile')}
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-300 transition-colors py-1 inline-block">
                  {t.nav.skills || 'Skills & Stack'}
                </a>
              </li>
              <li>
                <a href="#flagship" className="hover:text-cyan-300 transition-colors py-1 inline-block">
                  {t.nav.flagship || 'ASL Ademco B2B Flagship'}
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-300 transition-colors py-1 inline-block">
                  {t.nav.projects || (isDe ? 'Projekte' : 'Projects')}
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-cyan-300 transition-colors py-1 inline-block">
                  {t.nav.experience || (isDe ? 'Werdegang' : 'Experience')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-2">
              // Direct Contact
            </span>
            <div className="space-y-2 text-xs sm:text-sm">
              <a
                href="mailto:info@munverricht.org"
                aria-label="Footer Email: info@munverricht.org"
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors py-1"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>info@munverricht.org</span>
              </a>
              <a
                href="tel:+491633229892"
                aria-label="Footer Phone: +49 163 3229892"
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors py-1"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="tabular-nums">+49 163 3229892</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400 py-1">
                <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Dortmund, NRW, Deutschland</span>
              </div>
              <a
                href="https://github.com/munverricht"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors py-1"
              >
                <Github className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <span>github.com/munverricht</span>
              </a>
            </div>
          </div>

          {/* Col 4: Architecture & A11y Attestation */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-2">
              // Telemetry & Standards
            </span>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>RUNTIME</span>
                <span className="text-cyan-300">REACT 19 · VITE 6</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>WCAG</span>
                <span className="text-emerald-400">2.1 AA COMPLIANT</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CONTRAST</span>
                <span className="text-purple-300">&gt;= 4.5:1</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>HOSTING</span>
                <span className="text-amber-300">CLOUDFLARE EDGE</span>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="
                touch-target min-h-[44px] px-4 py-2 rounded-lg font-mono text-xs
                bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-slate-800 hover:border-cyan-400/60
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
                inline-flex items-center justify-center gap-2 transition-all
              "
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{isDe ? 'NACH OBEN' : 'BACK TO TOP'}</span>
            </button>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} Maximilian Unverricht. All rights reserved. / Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>DIN ISO / GDPR DSGVO KONFORM</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
