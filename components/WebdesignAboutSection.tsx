import React from 'react';
import { ArrowRight, Clock3, Languages, MapPin, Sparkles } from 'lucide-react';
import ASCIIText from './ASCIIText';
import WebPortraitParticles from './WebPortraitParticles';
import { themeClasses } from './themeClasses';

const trustFacts = [
  {
    label: 'Standort',
    value: 'Dortmund, NRW',
    icon: MapPin,
    iconClassName: 'text-blue-600',
  },
  {
    label: 'Erfahrung',
    value: '12+ Jahre Webdesign & Marketing',
    icon: Sparkles,
    iconClassName: 'text-sky-500',
  },
  {
    label: 'Sprachen',
    value: 'Deutsch & Englisch',
    icon: Languages,
    iconClassName: 'text-cyan-600',
  },
  {
    label: 'Start',
    value: 'Kurzfristig moeglich',
    icon: Clock3,
    iconClassName: 'text-indigo-500',
  },
];

const workingPoints = [
  'Direkter Kontakt mit der Person, die alles umsetzt.',
  'Keine Platzhalter und keine Design-Dummys, sondern echte Websites fuer den Unternehmensalltag.',
  'Das macht den Prozess schneller, klarer und meist guenstiger als eine klassische Agenturstrecke.',
];

const WebdesignAboutSection: React.FC = () => {
  return (
    <section id="webdesign-about" className="relative scroll-mt-28 py-12 sm:py-16 lg:py-18">
      <div className="absolute left-[7%] top-10 hidden h-24 w-24 rounded-full bg-blue-100/30 blur-[82px] lg:block" aria-hidden="true" />
      <div className="absolute right-[10%] top-20 hidden h-28 w-28 rounded-full bg-cyan-100/28 blur-[94px] lg:block" aria-hidden="true" />

      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(21rem,0.78fr)] lg:gap-12">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className={themeClasses.webEyebrow}>
              <ASCIIText text="// PERSON_HINTER_DER_SEITE" noWrap={false} enableHover={false} revealOnMount={false} />
            </p>
            <h2 className="max-w-[11ch] text-balance text-[2.4rem] font-bold uppercase leading-[0.94] tracking-[0.03em] text-slate-900 sm:text-5xl lg:text-[4.15rem]">
              Die Person,
              <br />
              die Ihre Website baut.
            </h2>
            <p className="max-w-[35ch] text-base leading-7 text-slate-600 sm:text-[1.04rem] sm:leading-8">
              Ich bin Maximilian Unverricht. Seit ueber 12 Jahren arbeite ich an digitalen Auftritten fuer Unternehmen. Heute
              baue ich Websites direkt im Code: schnell genug fuer kleine Betriebe und sauber genug fuer den echten
              Live-Betrieb.
            </p>
          </div>

          <div className={`rounded-[1.35rem] p-5 sm:p-6 ${themeClasses.webPanelSoft}`}>
            <p className={`${themeClasses.webMeta} text-blue-600`}>Warum das fuer Sie relevant ist</p>
            <p className="mt-3 max-w-[42ch] text-[1.02rem] leading-7 text-slate-700">
              Sie sprechen direkt mit der Person, die Konzept, Design, Umsetzung und Veroeffentlichung uebernimmt. Dadurch
              bleibt der Prozess klar, schnell und ohne unnötige Schleifen.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {trustFacts.map((fact) => {
              const Icon = fact.icon;

              return (
                <div key={fact.label} className={`rounded-[1.15rem] px-4 py-4 sm:px-5 ${themeClasses.webCard}`}>
                  <div className={`flex items-center gap-2 ${themeClasses.webMeta} text-blue-600`}>
                    <Icon aria-hidden="true" className={`h-4 w-4 ${fact.iconClassName}`} />
                    {fact.label}
                  </div>
                  <p className="mt-2 text-base font-semibold text-slate-900">{fact.value}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-3 border-l border-blue-200/80 pl-4 sm:pl-5">
            {workingPoints.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-blue-500" />
                <p className="text-[0.98rem] leading-7 text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-5 top-8 hidden h-24 w-24 rounded-full bg-blue-200/32 blur-3xl sm:block" aria-hidden="true" />
          <WebPortraitParticles
            src="/images/maximilian-unverricht-about.jpeg"
            alt="Portrait von Maximilian Unverricht"
            className="aspect-[4/5] min-h-[420px] sm:min-h-[520px]"
          />
          <div className={`absolute inset-x-5 bottom-5 z-30 rounded-[1.15rem] px-4 py-4 sm:inset-x-6 sm:bottom-6 sm:px-5 ${themeClasses.webCard}`}>
            <p className={`${themeClasses.webMeta} text-blue-600`}>Direkt, erreichbar, ohne Agenturfilter</p>
            <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-slate-700 sm:text-[0.96rem]">
              Die Animation bleibt bewusst dezent. Sie bringt Bewegung in die Seite, ohne die eigentlichen Inhalte zu stoeren.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebdesignAboutSection;
