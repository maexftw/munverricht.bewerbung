import React from 'react';
import { ArrowRight, Check, Clock3, Search, Sparkles, Wrench } from 'lucide-react';
import LegalInfo from './LegalInfo';
import WebdesignSignalArt from './WebdesignSignalArt';
import { themeClasses } from './themeClasses';

type Language = 'de' | 'en';

type WebdesignPageProps = {
  language: Language;
};

const services = [
  {
    title: 'Websites, die schnell verstanden werden',
    body: 'Klare Seitenstruktur, deutliche Botschaften und ein Auftritt, der nicht nach Baukasten oder generischer AI-Landingpage aussieht.',
    icon: Sparkles,
  },
  {
    title: 'SEO-Basis ohne Overkill',
    body: 'Saubere Headlines, lokale Auffindbarkeit, technische Grundstruktur und Inhalte, die für Menschen und Suchmaschinen gleichermaßen Sinn ergeben.',
    icon: Search,
  },
  {
    title: 'Performance und einfache Pflege',
    body: 'Schnelle Auslieferung, wenig Ballast und ein Setup, das nicht bei jeder kleinen Änderung unnötig kompliziert wird.',
    icon: Wrench,
  },
];

const processSteps = [
  {
    title: '1. Kurz klären, was die Seite leisten soll',
    body: 'Keine langen Workshops. Wir definieren Ziel, Zielgruppe, Inhalt und den direktesten Weg zur Anfrage oder Kontaktaufnahme.',
  },
  {
    title: '2. Struktur und Look auf das Geschäft zuschneiden',
    body: 'Ich baue keine austauschbare Standardseite, sondern eine reduzierte Struktur mit klarer Hierarchie und einem modernen, seriösen Auftritt.',
  },
  {
    title: '3. Schnell umsetzen und sauber online bringen',
    body: 'Der Fokus liegt auf einer funktionierenden Seite mit guter Ladezeit, verständlicher Pflege und klaren Kontaktwegen.',
  },
];

const proofItems = [
  {
    name: 'Fitness Drensteinfurt',
    result: 'Fokussierte Landingpage mit kürzerem Weg zur Anfrage und besserer lokaler Sichtbarkeit als Zielbild.',
  },
  {
    name: 'Kost Sicherheitstechnik',
    result: 'Seriöserer Gesamtauftritt, einfachere technische Auslieferung und eine ruhigere, glaubwürdigere Präsenz.',
  },
  {
    name: 'Bockel-Bartscher',
    result: 'Klare Informationsarchitektur für Besucher, die Inhalte schnell erfassen und Vertrauen aufbauen müssen.',
  },
];

const faqs = [
  {
    question: 'Ist das nur für große Relaunches gedacht?',
    answer: 'Nein. Das passt gerade für kleinere Unternehmen und Selbstständige, wenn der bestehende Auftritt unklar, langsam oder überholt wirkt.',
  },
  {
    question: 'Muss schon alles fertig vorbereitet sein?',
    answer: 'Nein. Wenn Texte, Struktur oder Prioritäten noch nicht sauber sortiert sind, übernehme ich genau diese Vereinfachung mit.',
  },
  {
    question: 'Geht es eher um Design oder eher um Technik?',
    answer: 'Beides zusammen. Die Seite soll gut aussehen, schnell laden, verständlich wirken und im Alltag ohne Reibung nutzbar sein.',
  },
];

const WebdesignPage: React.FC<WebdesignPageProps> = ({ language }) => {
  const isEnglish = language === 'en';

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-5 lg:px-0">
      <main
        id="main-content"
        className="relative z-10 w-full max-w-6xl mx-auto py-10 sm:py-12 pb-28 sm:pb-24 outline-none"
        tabIndex={-1}
      >
        <section id="webdesign-hero" className="grid gap-10 border-b border-[color:var(--border-subtle)] pb-16 pt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="mono text-[11px] uppercase tracking-[0.32em] text-[color:var(--accent-soft)]">
                {isEnglish ? 'WEBDESIGN SERVICES // SMALL BUSINESS FOCUS' : 'WEBDESIGN-DIENSTLEISTUNGEN // KLEINE UNTERNEHMEN & SELBSTSTÄNDIGE'}
              </p>
              <h1 className="max-w-[12ch] text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-[color:var(--text-primary)] sm:text-6xl lg:text-7xl">
                {isEnglish ? 'Websites that look calm and convert clearly.' : 'Websites, die klar wirken und sauber anfragen lassen.'}
              </h1>
              <p className="max-w-[62ch] text-base leading-7 text-[color:var(--text-secondary)] sm:text-lg">
                {isEnglish
                  ? 'German copy is currently the primary version of this page. I build modern websites for small businesses and solo professionals with strong readability, technical cleanliness, and straightforward delivery.'
                  : 'Ich unterstütze kleine Unternehmen und Selbstständige mit Websites, die modern aussehen, schnell laden, lokal besser auffindbar sind und ohne komplizierte Abläufe auskommen.'}
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
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--border-strong)] px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition-colors hover:border-[color:var(--accent-border-strong)]"
              >
                {isEnglish ? 'See the workflow' : 'Ablauf ansehen'}
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-5">
                <p className="mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent-soft)]">SEO-Basis</p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">Lokale Auffindbarkeit, klare Seitentitel und Inhalte mit echtem Nutzwert.</p>
              </div>
              <div className="rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-5">
                <p className="mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent-soft)]">Performance</p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">Weniger technische Reibung, schnelle Ladezeiten und ein robuster Live-Stand.</p>
              </div>
              <div className="rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-5">
                <p className="mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent-soft)]">Einfacher Ablauf</p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">Kurze Abstimmungen, klare Prioritäten und direkte Kontaktwege statt Prozessballast.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <WebdesignSignalArt />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-5">
                <p className="mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--text-subtle)]">Geeignet für</p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">Dienstleister, lokale Anbieter, Kanzleien, Studios, Praxen und kleine Teams mit begrenzter Zeit.</p>
              </div>
              <div className="rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-5">
                <p className="mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--text-subtle)]">Ziel</p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">Ein glaubwürdiger Auftritt, der auf den ersten Blick verständlich ist und zu Kontakt führt.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="webdesign-services" className="grid gap-8 border-b border-[color:var(--border-subtle)] py-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-4">
            <p className="mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">Leistungen</p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text-primary)] sm:text-4xl">
              Kein Baukasten-Look, sondern ein klarer digitaler Erstkontakt.
            </h2>
            <p className={`max-w-[56ch] text-base leading-7 ${themeClasses.textSoft}`}>
              Ich kombiniere Webdesign, technische Umsetzung und pragmatische Inhaltsstruktur, damit die Seite im Alltag wirklich nützt und nicht nur gut aussieht.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-[1.75rem] border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-6">
                <service.icon className="h-5 w-5 text-[color:var(--accent-color)]" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold text-[color:var(--text-primary)]">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">{service.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="webdesign-process" className="grid gap-8 border-b border-[color:var(--border-subtle)] py-16 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-4">
            <p className="mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">Ablauf</p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text-primary)] sm:text-4xl">
              Einfacher Prozess statt langer Projekt-Reibung.
            </h2>
            <p className={`max-w-[54ch] text-base leading-7 ${themeClasses.textSoft}`}>
              Gerade bei kleineren Unternehmen muss eine Website nicht kompliziert organisiert werden. Wichtig ist ein sauberer Weg von der Idee bis zur Veröffentlichung.
            </p>
          </div>

          <div className="space-y-4">
            {processSteps.map((step) => (
              <div key={step.title} className="rounded-[1.75rem] border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{step.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-[color:var(--text-secondary)]">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="webdesign-proof" className="grid gap-8 border-b border-[color:var(--border-subtle)] py-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-4">
            <p className="mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">Referenzen</p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text-primary)] sm:text-4xl">
              Beispiele aus realen Projekten, nicht aus Demo-Material.
            </h2>
            <p className={`max-w-[56ch] text-base leading-7 ${themeClasses.textSoft}`}>
              Die Richtung ist immer ähnlich: verständlicher werden, seriöser auftreten, schneller ausliefern und den Weg zur Kontaktaufnahme verkürzen.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {proofItems.map((item) => (
              <article key={item.name} className="rounded-[1.75rem] border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-6">
                <p className="mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--text-subtle)]">{item.name}</p>
                <p className="mt-4 text-sm leading-6 text-[color:var(--text-secondary)]">{item.result}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="webdesign-faq" className="grid gap-8 border-b border-[color:var(--border-subtle)] py-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-4">
            <p className="mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">Vertrauen & Fragen</p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text-primary)] sm:text-4xl">
              Seriöser Auftritt, ohne künstlich groß zu wirken.
            </h2>
            <p className={`max-w-[56ch] text-base leading-7 ${themeClasses.textSoft}`}>
              Viele kleinere Anbieter brauchen keine große Digitalstrategie, sondern eine Website, die nachvollziehbar aufgebaut ist und sich professionell anfühlt.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-[1.75rem] border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{faq.question}</h3>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--text-secondary)]">{faq.answer}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="webdesign-contact" className="py-16">
          <div className="rounded-[2rem] border border-[color:var(--accent-border)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent-color)_12%,var(--surface-1))_0%,var(--surface-1)_100%)] px-6 py-8 sm:px-10 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <p className="mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">Kontakt</p>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text-primary)] sm:text-4xl">
                  Wenn der aktuelle Auftritt zu beliebig oder zu umständlich wirkt, können wir das vereinfachen.
                </h2>
                <p className="max-w-[58ch] text-base leading-7 text-[color:var(--text-secondary)]">
                  Am schnellsten geht es direkt per E-Mail oder Telefon. Ohne Formularstrecke, ohne Agentur-Theater und ohne unnötige Vorabprozesse.
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
                  className="rounded-full border border-[color:var(--border-strong)] px-6 py-3 text-center text-sm font-semibold text-[color:var(--text-primary)] transition-colors hover:border-[color:var(--accent-border-strong)]"
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
        </section>

        <LegalInfo language={language} />

        <footer className={`pt-16 sm:pt-20 pb-8 text-center mono text-[10px] sm:text-xs leading-relaxed ${themeClasses.textSoft} border-t ${themeClasses.sectionBorder}`}>
          <p className="break-words">© 2026 MAXIMILIAN UNVERRICHT // WEBDESIGN & WEB DELIVERY</p>
        </footer>
      </main>
    </div>
  );
};

export default WebdesignPage;
