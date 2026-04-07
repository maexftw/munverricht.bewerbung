import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Search, Sparkles, Wrench } from 'lucide-react';
import LegalInfo from './LegalInfo';
import WebdesignSignalArt from './WebdesignSignalArt';
import { themeClasses } from './themeClasses';

type Language = 'de' | 'en';

type WebdesignPageProps = {
  language: Language;
};

const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.24 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const servicePillars = [
  {
    index: '01',
    title: 'Klarer Erstkontakt',
    body: 'Eine Seite, die sofort verständlich wirkt, statt nach Baukasten oder generischer AI-Ästhetik auszusehen.',
    icon: Sparkles,
  },
  {
    index: '02',
    title: 'Lokale Sichtbarkeit',
    body: 'Saubere SEO-Basis, nachvollziehbare Struktur und Inhalte, die zu echten Anfragen führen können.',
    icon: Search,
  },
  {
    index: '03',
    title: 'Saubere Auslieferung',
    body: 'Performance, wartbare Technik und ein Ablauf, der kleine Unternehmen nicht mit Prozessballast belastet.',
    icon: Wrench,
  },
];

const processSteps = [
  {
    eyebrow: 'Signal 01',
    title: 'Angebot und Ziel in kurzer Zeit ordnen',
    body: 'Was soll die Seite leisten, wen soll sie ansprechen und was ist die eine Handlung, die wirklich zählt?',
  },
  {
    eyebrow: 'Signal 02',
    title: 'Struktur und Tonalität passend bauen',
    body: 'Ich reduziere die Seite auf die Aussagen, die Vertrauen erzeugen. Nicht mehr Inhalt, sondern bessere Gewichtung.',
  },
  {
    eyebrow: 'Signal 03',
    title: 'Schnell online, ohne technischen Nebel',
    body: 'Die Seite soll nicht nur gut aussehen, sondern auch sauber laden, leicht pflegbar sein und im Alltag nutzbar bleiben.',
  },
];

const proofItems = [
  {
    name: 'Fitness Drensteinfurt',
    angle: 'Landingpage statt Umweg',
    result: 'Klarerer Weg zur Anfrage und ein Auftritt, der lokales Marketing besser stützt als ein verstreuter Standardaufbau.',
  },
  {
    name: 'Kost Sicherheitstechnik',
    angle: 'Seriös statt technisch schwer',
    result: 'Ruhigere Präsentation, glaubwürdigerer Eindruck und weniger Reibung in Auslieferung und Pflege.',
  },
  {
    name: 'Bockel-Bartscher',
    angle: 'Vertrauen durch Lesbarkeit',
    result: 'Bessere Orientierung für Erstbesucher und eine Informationsarchitektur, die nicht erst entschlüsselt werden muss.',
  },
];

const faqs = [
  {
    question: 'Ist das eher für kleine Relaunches oder komplette Neuanfänge?',
    answer: 'Beides. Besonders sinnvoll ist es, wenn die bestehende Seite diffus wirkt, aber kein monatelanges Großprojekt daraus werden soll.',
  },
  {
    question: 'Muss ich Texte, Struktur und SEO schon fertig mitbringen?',
    answer: 'Nein. Genau diese Vorarbeit gehört oft dazu: sortieren, reduzieren, priorisieren und die Seite auf eine klare Aussage zuspitzen.',
  },
  {
    question: 'Wird das eher Design oder eher Technik?',
    answer: 'Die Wirkung entsteht aus beidem zusammen. Gutes Design ohne Performance nützt wenig, reine Technik ohne Haltung wirkt austauschbar.',
  },
];

const WebdesignPage: React.FC<WebdesignPageProps> = ({ language }) => {
  const isEnglish = language === 'en';

  return (
    <div className="relative">
      <section
        id="webdesign-hero"
        className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden border-b border-[color:var(--border-subtle)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent-color)_10%,var(--bg-color))_0%,var(--bg-color)_55%,color-mix(in_srgb,var(--bg-color)_88%,black)_100%)]"
      >
        <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_16%_24%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(96,165,250,0.18),transparent_26%),linear-gradient(120deg,transparent_0%,rgba(191,219,254,0.05)_28%,transparent_52%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_top,rgba(5,7,13,0.98),transparent)]" />

        <div className="relative mx-auto grid min-h-[100svh] max-w-6xl gap-12 px-4 pb-14 pt-24 sm:px-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(360px,1.12fr)] lg:items-center lg:gap-16 lg:px-8 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 space-y-8"
          >
            <div className="space-y-5">
              <p className="mono text-[11px] uppercase tracking-[0.32em] text-[color:var(--accent-soft)]">
                {isEnglish ? 'WEBDESIGN SERVICES // SMALL BUSINESS FOCUS' : 'WEBDESIGN-DIENSTLEISTUNGEN // KLEINE UNTERNEHMEN & SELBSTSTÄNDIGE'}
              </p>
              <h1 className="max-w-[10ch] text-5xl font-semibold leading-[0.9] tracking-[-0.075em] text-[color:var(--text-primary)] sm:text-6xl lg:text-[5.85rem]">
                {isEnglish ? 'Calm websites with clear commercial gravity.' : 'Websites mit ruhiger Präsenz und klarem Zug zur Anfrage.'}
              </h1>
              <p className="max-w-[33rem] text-base leading-7 text-[color:var(--text-secondary)] sm:text-lg">
                {isEnglish
                  ? 'German remains the primary live copy on this page. The offer is focused on small businesses that need a site with stronger readability, trust, performance, and simpler delivery.'
                  : 'Ich baue Webauftritte für kleine Unternehmen, die nicht nach Template aussehen, aber technisch sauber laufen, lokal besser auffindbar sind und direkt zur richtigen Kontaktaufnahme führen.'}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:info@graphiks.de?subject=Anfrage%20Webdesign"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent-fill)] px-6 py-3 text-sm font-semibold text-[color:var(--accent-contrast)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {isEnglish ? 'Start a conversation' : 'Projekt anfragen'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#webdesign-process"
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface-1)]/45 px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)] backdrop-blur-sm transition-colors hover:border-[color:var(--accent-border-strong)]"
              >
                {isEnglish ? 'See the workflow' : 'Ablauf ansehen'}
              </a>
            </div>

            <div className="grid gap-4 border-t border-[color:var(--border-subtle)] pt-7 sm:grid-cols-3">
              <div>
                <p className="mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent-soft)]">SEO-Basis</p>
                <p className="mt-3 max-w-[18ch] text-sm leading-6 text-[color:var(--text-secondary)]">Klare Überschriften, lokale Lesbarkeit und sinnvolle Seitenstruktur.</p>
              </div>
              <div>
                <p className="mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent-soft)]">Performance</p>
                <p className="mt-3 max-w-[18ch] text-sm leading-6 text-[color:var(--text-secondary)]">Weniger technische Schwere, mehr Direktheit und schnellerer erster Eindruck.</p>
              </div>
              <div>
                <p className="mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent-soft)]">Ablauf</p>
                <p className="mt-3 max-w-[18ch] text-sm leading-6 text-[color:var(--text-secondary)]">Kurze Abstimmung, klares Zielbild, saubere Auslieferung.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.82, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 [perspective:1400px]"
          >
            <div className="relative translate-y-2 sm:translate-y-0 [transform-style:preserve-3d]">
              <div className="pointer-events-none absolute inset-0 translate-x-6 translate-y-8 rounded-[2.3rem] border border-[color:var(--accent-border)] bg-[linear-gradient(140deg,rgba(37,99,235,0.12),rgba(15,23,42,0.04))] blur-[2px] [transform:translateZ(-90px)]" />
              <div className="pointer-events-none absolute -inset-4 rounded-[2.8rem] bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.18),transparent_60%)] blur-3xl [transform:translateZ(-120px)]" />
              <WebdesignSignalArt />
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.8rem] border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)]/82 p-5 backdrop-blur-xl">
                  <p className="mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--text-subtle)]">Geeignet für</p>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">Dienstleister, Studios, Kanzleien, Praxen und lokale Unternehmen, die seriöser und leichter lesbar auftreten wollen.</p>
                </div>
                <div className="rounded-[1.8rem] border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)]/82 p-5 backdrop-blur-xl">
                  <p className="mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--text-subtle)]">Was nicht passiert</p>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">Kein aufgeblasenes Agentur-Setup, keine Dashboard-Deko und kein generischer KI-Marketingsound.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 sm:px-5 lg:px-0">
        <main
          id="main-content"
          className="relative z-10 w-full py-12 pb-28 sm:py-14 sm:pb-24 outline-none"
          tabIndex={-1}
        >
          <motion.section
            id="webdesign-services"
            {...sectionReveal}
            className="grid gap-10 border-b border-[color:var(--border-subtle)] py-16 lg:grid-cols-[0.72fr_1.28fr]"
          >
            <div className="space-y-4">
              <p className="mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">Leistungsbild</p>
              <h2 className="max-w-[13ch] text-3xl font-semibold tracking-[-0.05em] text-[color:var(--text-primary)] sm:text-4xl md:text-[3.1rem]">
                Weniger Oberfläche. Mehr Wirkung beim ersten Blick.
              </h2>
              <p className={`max-w-[34rem] text-base leading-7 ${themeClasses.textSoft}`}>
                Statt vieler kleiner UI-Bausteine bekommt jede Ebene eine klare Aufgabe: erklären, ordnen, Vertrauen aufbauen oder zur Anfrage führen.
              </p>
            </div>

            <div className="grid gap-0 border-t border-[color:var(--border-subtle)] md:grid-cols-3 md:border-l md:border-t-0">
              {servicePillars.map((pillar) => (
                <article key={pillar.title} className="border-b border-[color:var(--border-subtle)] py-7 md:border-b-0 md:border-r md:px-6 md:py-0">
                  <pillar.icon className="h-5 w-5 text-[color:var(--accent-color)]" aria-hidden="true" />
                  <p className="mono mt-10 text-[10px] uppercase tracking-[0.28em] text-[color:var(--text-subtle)]">{pillar.index}</p>
                  <h3 className="mt-3 text-xl font-semibold text-[color:var(--text-primary)]">{pillar.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[color:var(--text-secondary)]">{pillar.body}</p>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="webdesign-process"
            {...sectionReveal}
            className="grid gap-10 border-b border-[color:var(--border-subtle)] py-16 lg:grid-cols-[0.58fr_1.42fr]"
          >
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">Ablauf</p>
              <h2 className="mt-4 max-w-[11ch] text-3xl font-semibold tracking-[-0.05em] text-[color:var(--text-primary)] sm:text-4xl md:text-[3.05rem]">
                Ein ruhiger Prozess statt Projekt-Labyrinth.
              </h2>
              <p className={`mt-5 max-w-[30rem] text-base leading-7 ${themeClasses.textSoft}`}>
                Kleine Unternehmen brauchen selten eine riesige Digitalarchitektur. Sie brauchen einen guten Auftritt, der in vernünftiger Zeit auf den Punkt kommt.
              </p>
            </div>

            <div className="relative space-y-12 pl-0 md:pl-12">
              <div className="pointer-events-none absolute bottom-0 left-2 top-0 hidden w-px bg-[linear-gradient(to_bottom,transparent,color-mix(in_srgb,var(--accent-color)_55%,transparent),transparent)] md:block" />
              {processSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="relative grid gap-3 border-b border-[color:var(--border-subtle)] pb-10 last:border-b-0 last:pb-0 md:grid-cols-[120px_minmax(0,1fr)]"
                >
                  <div className="relative">
                    <span className="hidden h-4 w-4 rounded-full border border-[color:var(--accent-border-strong)] bg-[color:var(--bg-color)] md:absolute md:-left-[3.2rem] md:top-1 md:block" />
                    <p className="mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--accent-soft)]">{step.eyebrow}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--text-primary)]">{step.title}</h3>
                    <p className="mt-4 max-w-[38rem] text-base leading-7 text-[color:var(--text-secondary)]">{step.body}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="webdesign-proof"
            {...sectionReveal}
            className="grid gap-10 border-b border-[color:var(--border-subtle)] py-16 lg:grid-cols-[0.68fr_1.32fr]"
          >
            <div className="space-y-4">
              <p className="mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">Proof</p>
              <h2 className="max-w-[12ch] text-3xl font-semibold tracking-[-0.05em] text-[color:var(--text-primary)] sm:text-4xl md:text-[3rem]">
                Reale Projekte statt austauschbarer Showcase-Mockups.
              </h2>
              <p className={`max-w-[32rem] text-base leading-7 ${themeClasses.textSoft}`}>
                Die Muster sind wiederkehrend: überladene Seiten beruhigen, Lesbarkeit verbessern, Vertrauensgefühl stärken und den Weg zur Kontaktaufnahme verkürzen.
              </p>
            </div>

            <div className="divide-y divide-[color:var(--border-subtle)] border-y border-[color:var(--border-subtle)]">
              {proofItems.map((item, index) => (
                <motion.article
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  className="grid gap-4 py-7 md:grid-cols-[minmax(180px,0.42fr)_minmax(0,0.58fr)]"
                >
                  <div>
                    <p className="mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--text-subtle)]">{item.angle}</p>
                    <h3 className="mt-3 text-xl font-semibold text-[color:var(--text-primary)]">{item.name}</h3>
                  </div>
                  <p className="max-w-[38rem] text-base leading-7 text-[color:var(--text-secondary)]">{item.result}</p>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="webdesign-faq"
            {...sectionReveal}
            className="grid gap-10 border-b border-[color:var(--border-subtle)] py-16 lg:grid-cols-[0.66fr_1.34fr]"
          >
            <div className="space-y-4">
              <p className="mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">Vertrauen</p>
              <h2 className="max-w-[12ch] text-3xl font-semibold tracking-[-0.05em] text-[color:var(--text-primary)] sm:text-4xl md:text-[3rem]">
                Präzise Wirkung statt künstlicher Größe.
              </h2>
              <p className={`max-w-[32rem] text-base leading-7 ${themeClasses.textSoft}`}>
                Gerade kleinere Anbieter wirken überzeugend, wenn die Seite Haltung hat, aber nicht nach großer Agenturkulisse aussieht.
              </p>
            </div>

            <div className="divide-y divide-[color:var(--border-subtle)] border-y border-[color:var(--border-subtle)]">
              {faqs.map((faq, index) => (
                <motion.article
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  className="grid gap-4 py-7 md:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)]"
                >
                  <div className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{faq.question}</h3>
                  </div>
                  <p className="max-w-[36rem] text-sm leading-7 text-[color:var(--text-secondary)]">{faq.answer}</p>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="webdesign-contact"
            {...sectionReveal}
            className="py-16"
          >
            <div className="relative overflow-hidden rounded-[2.4rem] border border-[color:var(--accent-border)] px-6 py-10 sm:px-10 sm:py-12">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent-color)_18%,var(--surface-1))_0%,var(--surface-1)_48%,color-mix(in_srgb,var(--accent-color)_8%,var(--bg-color))_100%)]" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-[34%] bg-[radial-gradient(circle_at_center,rgba(191,219,254,0.16),transparent_60%)] blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                <div className="space-y-4">
                  <p className="mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">Kontakt</p>
                  <h2 className="max-w-[15ch] text-3xl font-semibold tracking-[-0.05em] text-[color:var(--text-primary)] sm:text-4xl md:text-[3.05rem]">
                    Wenn der jetzige Auftritt zu beliebig wirkt, bauen wir ihn ruhiger und klarer neu.
                  </h2>
                  <p className="max-w-[38rem] text-base leading-7 text-[color:var(--text-secondary)]">
                    Direkter Kontakt ist hier Absicht. Kein Formularlabyrinth, keine unverbindliche Pitch-Strecke und keine Agentur-Rhetorik.
                  </p>
                </div>

                <div className="grid gap-3">
                  <a
                    href="mailto:info@graphiks.de?subject=Anfrage%20Webdesign"
                    className="rounded-full bg-[color:var(--accent-fill)] px-6 py-3 text-center text-sm font-semibold text-[color:var(--accent-contrast)] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    info@graphiks.de
                  </a>
                  <a
                    href="tel:+491633229892"
                    className="rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface-1)]/45 px-6 py-3 text-center text-sm font-semibold text-[color:var(--text-primary)] backdrop-blur-sm transition-colors hover:border-[color:var(--accent-border-strong)]"
                  >
                    +49 163 3229892
                  </a>
                  <a
                    href="/"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--text-primary)]"
                  >
                    Portfolio ansehen
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </motion.section>

          <LegalInfo language={language} />

          <footer className={`pt-16 sm:pt-20 pb-8 text-center mono text-[10px] sm:text-xs leading-relaxed ${themeClasses.textSoft} border-t ${themeClasses.sectionBorder}`}>
            <p className="break-words">© 2026 MAXIMILIAN UNVERRICHT // WEBDESIGN & WEB DELIVERY</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default WebdesignPage;
