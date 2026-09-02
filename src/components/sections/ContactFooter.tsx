import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  MapPin,
  Github,
  Copy,
  Check,
  ChevronUp,
  FileText,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { Modal } from '../ui/Modal';

export const ContactFooter: React.FC = () => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);

  const email = t.contact.email || 'info@munverricht.org';
  const phone = t.contact.phone || '+49 163 3229892';
  const location = t.contact.location || 'Dortmund, Deutschland';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="pt-12 sm:pt-16 lg:pt-20 pb-16 space-y-12"
    >
      {/* Contact Banner Card */}
      <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-[var(--bgInverse)] text-[var(--bg1)] border border-[var(--bgInverse2)] shadow-2xl space-y-8 relative overflow-hidden">
        {/* Background Slanted Hatch */}
        <div
          className="absolute -right-20 -bottom-20 w-80 h-80 hyp-hatch-accent1 opacity-10 rounded-full pointer-events-none"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent2)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent2)] animate-ping" />
            <span>{language === 'de' ? 'DIREKTER KONTAKT' : 'DIRECT CONTACT'}</span>
          </div>

          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight"
          >
            {t.contact.title}
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-sans max-w-xl leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Contact Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {/* Email Action */}
          <div className="p-4 rounded-xl bg-[var(--darkBg1)] border border-[var(--darkInverse2)] space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-gray-400">
                E-MAIL ADDRESS
              </span>
              <a
                href={`mailto:${email}`}
                className="text-sm font-bold text-white font-mono truncate hover:text-[var(--accent2)] transition-colors block focus-visible:ring-1 focus-visible:ring-[var(--accent1)] rounded"
              >
                {email}
              </a>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={`mailto:${email}`}
                className="touch-target flex-1 py-2 px-3 rounded bg-[var(--accent1)] text-white text-xs font-mono font-bold uppercase text-center hover:opacity-95 transition-opacity"
              >
                {t.contact.ctaButton}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="touch-target p-2 rounded bg-[var(--bgInverse2)] text-gray-300 hover:text-white transition-colors"
                title="Copy Email"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            {copied && (
              <div
                role="status"
                aria-live="polite"
                className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 pt-1 animate-fade-in"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.contact.copiedNotice}</span>
              </div>
            )}
          </div>

          {/* Phone Action */}
          <div className="p-4 rounded-xl bg-[var(--darkBg1)] border border-[var(--darkInverse2)] space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-gray-400">
                DIRECT PHONE
              </span>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="text-sm font-bold text-white font-mono hover:text-[var(--accent2)] transition-colors block focus-visible:ring-1 focus-visible:ring-[var(--accent1)] rounded"
              >
                {phone}
              </a>
            </div>

            <div className="pt-2">
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="touch-target block w-full py-2 px-3 rounded bg-[var(--bgInverse2)] hover:bg-white/20 text-white text-xs font-mono font-bold uppercase text-center transition-colors border border-white/10"
              >
                {language === 'de' ? 'Anrufen' : 'Call Now'}
              </a>
            </div>
          </div>

          {/* Location & Status */}
          <div className="p-4 rounded-xl bg-[var(--darkBg1)] border border-[var(--darkInverse2)] space-y-2 flex flex-col justify-between col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-gray-400">
                LOCATION &amp; AVAILABILITY
              </span>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[var(--accent1)]" />
                <span>{location}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-bold w-full justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{language === 'de' ? 'Sofort verfügbar' : 'Available Immediately'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Secondary Links: GitHub, Impressum, Scroll Top */}
        <div className="pt-6 border-t border-[var(--bgInverse2)]/80 flex flex-wrap items-center justify-between gap-4 relative z-10 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/munverricht"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--bgInverse2)] hover:text-[var(--accent2)] text-gray-300 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <button
              type="button"
              onClick={() => setIsImpressumOpen(true)}
              className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--bgInverse2)] hover:text-white text-gray-300 transition-colors"
            >
              <FileText className="w-4 h-4 text-[var(--accent1)]" />
              <span>{language === 'de' ? 'Impressum & Datenschutz' : 'Imprint & Legal'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--accent1)] text-white font-bold uppercase tracking-wider hover:opacity-95 transition-opacity"
          >
            <span>TOP</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Colophon & Static Deployment Tag */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[var(--bgInverse)]/80 px-2">
        <div>
          © 2026 Maximilian Unverricht. All rights reserved.
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Deployed statically to Cloudflare Pages Edge</span>
        </div>
      </div>

      {/* Impressum & Legal Modal */}
      <Modal
        isOpen={isImpressumOpen}
        onClose={() => setIsImpressumOpen(false)}
        title={language === 'de' ? 'Impressum & Rechtliche Hinweise' : 'Imprint & Legal Notice'}
        subtitle="Angaben gemäß § 5 TMG / DSGVO"
        maxWidth="2xl"
      >
        <div className="space-y-4 font-mono text-xs sm:text-sm text-[var(--bgInverse)] leading-relaxed">
          <div className="p-3.5 rounded-lg bg-[var(--bg2)]/60 border border-[var(--bgInverse2)]/20 space-y-1">
            <div className="font-bold text-sm uppercase">Diensteanbieter / Verantwortlich:</div>
            <div>Maximilian Unverricht</div>
            <div>Dortmund, Nordrhein-Westfalen, Deutschland</div>
            <div>E-Mail: info@munverricht.org</div>
            <div>Telefon: +49 163 3229892</div>
          </div>

          <div className="space-y-1.5">
            <div className="font-bold uppercase text-xs text-[var(--accent1)]">
              1. Haftung für Inhalte &amp; Urheberrecht
            </div>
            <p className="font-sans text-xs opacity-90">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="font-bold uppercase text-xs text-[var(--accent1)]">
              2. Datenschutz &amp; Cloudflare Edge Hosting
            </div>
            <p className="font-sans text-xs opacity-90">
              Diese Website wird als rein statische Applikation auf Cloudflare Pages ausgeliefert. Es werden keine Tracking-Cookies von Drittanbietern oder serverseitigen Session-Logs erhoben. Benutzereinstellungen (Sprache, Theme-Palette, Schriftgröße) werden ausschließlich lokal in Ihrem Browser (localStorage) gespeichert.
            </p>
          </div>
        </div>
      </Modal>
    </footer>
  );
};

export default ContactFooter;
