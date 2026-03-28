import React from 'react';
import { Mail, Phone, Terminal, FileText } from 'lucide-react';

type Language = 'de' | 'en';

type ContactShellProps = {
  language: Language;
};

const ContactShell: React.FC<ContactShellProps> = ({ language }) => {
  return (
    <section id="contact-shell" className="space-y-8 sm:space-y-10 lg:space-y-12 pb-16 sm:pb-20 scroll-mt-28">
      <div className="flex flex-col items-center text-center">
        <h3 className="mono text-blue-500 text-xs tracking-widest uppercase mb-2" aria-hidden="true">// DIRECT_CONTACT</h3>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase">{language === 'de' ? 'Direkter Kontakt' : 'Direct Contact'}</h2>
      </div>

      <div className="max-w-3xl mx-auto bg-[#111111] border border-blue-500/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.1)]">
        <div className="bg-neutral-900 px-4 py-2 flex justify-between items-center border-b border-neutral-800" aria-hidden="true">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-500" />
            <span className="mono text-[10px] text-neutral-400">CONTACT</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500/50" />
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5 sm:space-y-6 mono text-sm">
          <div className="text-neutral-300 leading-relaxed">
            {language === 'de' ? 'Am einfachsten erreichst du mich direkt per E-Mail oder Telefon.' : 'The easiest way to reach me is directly by email or phone.'}<br />
            {language === 'de' ? 'Keine Formulare, keine Umwege.' : 'No forms, no detours.'}
          </div>

          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            <a href="mailto:info@graphiks.de" className="bg-neutral-900 border border-neutral-800 rounded px-4 py-4 hover:border-blue-500/70 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-colors">
              <span className="flex items-center gap-2 text-blue-400 mb-2">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span className="mono text-[10px] uppercase tracking-widest">E-Mail</span>
              </span>
              <span className="text-neutral-100 text-sm break-all">info@graphiks.de</span>
            </a>

            <a href="tel:+491633229892" className="bg-neutral-900 border border-neutral-800 rounded px-4 py-4 hover:border-blue-500/70 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-colors">
              <span className="flex items-center gap-2 text-blue-400 mb-2">
                <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="mono text-[10px] uppercase tracking-widest">{language === 'de' ? 'Telefon' : 'Phone'}</span>
              </span>
              <span className="text-neutral-100 text-sm">+49 163 3229892</span>
            </a>
          </div>

          <div className="mt-4 flex justify-between items-center mono text-[9px] sm:text-[10px] text-neutral-600 uppercase tracking-tighter" aria-hidden="true">
            <div className="flex gap-4">
              <span>{language === 'de' ? 'DIREKTER KONTAKT' : 'DIRECT CONTACT'}</span>
              <span>{language === 'de' ? 'ANTWORTWEG: DIREKT' : 'REPLY PATH: DIRECT'}</span>
            </div>
            <div className="text-blue-500/50">MAXIMILIAN_UNVERRICHT // CONTACT</div>
          </div>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto bg-[#111111] border border-blue-500/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.1)]">
        <div className="bg-neutral-900 px-4 py-2 flex justify-between items-center border-b border-neutral-800" aria-hidden="true">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <span className="mono text-[10px] text-neutral-400">APPLICATION</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500/50" />
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5 sm:space-y-6 mono text-sm">
          <div className="text-neutral-300 leading-relaxed">
            {language === 'de' ? 'Hier finden Sie meine Bewerbung für First Debit.' : 'Here you can find my application for First Debit.'}
          </div>

          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            <a href="/bewerbung" className="bg-neutral-900 border border-neutral-800 rounded px-4 py-4 hover:border-blue-500/70 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-colors">
              <span className="flex items-center gap-2 text-blue-400 mb-2">
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span className="mono text-[10px] uppercase tracking-widest">{language === 'de' ? 'Bewerbung' : 'Application'}</span>
              </span>
              <span className="text-neutral-100 text-sm break-all">/bewerbung</span>
            </a>
          </div>

          <div className="mt-4 flex justify-between items-center mono text-[9px] sm:text-[10px] text-neutral-600 uppercase tracking-tighter" aria-hidden="true">
            <div className="flex gap-4">
              <span>{language === 'de' ? 'BEWERBUNG' : 'APPLICATION'}</span>
              <span>{language === 'de' ? 'ERREICHBAR UNTER: /bewerbung' : 'AVAILABLE AT: /bewerbung'}</span>
            </div>
            <div className="text-blue-500/50">MAXIMILIAN_UNVERRICHT // APPLICATION</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactShell;
