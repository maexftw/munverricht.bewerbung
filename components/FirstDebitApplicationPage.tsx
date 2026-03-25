import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Brain, BriefcaseBusiness, Download, FileText, Mail, Phone, ShieldCheck, Workflow, Wrench } from 'lucide-react';
import ASCIIText from './ASCIIText';

const quickLinks = [
  { label: 'Anschreiben', href: '/first-debit-anschreiben.md', icon: FileText },
  { label: 'Lebenslauf', href: '/Maximilian_Unverricht_Resume_2026.html', icon: Download },
  { label: 'E-Mail', href: 'mailto:info@graphiks.de', icon: Mail },
  { label: 'Telefon', href: 'tel:+491633229892', icon: Phone },
];

const relevanceSignals = [
  {
    title: 'Lokale LLM-Workflows',
    text: 'Ich arbeite nicht nur mit Cloud-Tools, sondern denke KI auch lokal: Modellwahl, Datensouveränität, kontrollierte Kontexte, nachvollziehbare Grenzen.',
  },
  {
    title: 'Web-Umsetzung statt Folien',
    text: 'Ich kann Ideen schnell in echte Interfaces, Prototypen und intern nutzbare Arbeitsstrecken übersetzen – mit React, TypeScript, Vite und pragmischem Delivery-Fokus.',
  },
  {
    title: 'Selbstständigkeit als Belastungstest',
    text: 'Seit 2013 arbeite ich eigenverantwortlich in echten Kundenkontexten. Das bedeutet: Ergebnisse liefern, sauber kommunizieren, iterativ verbessern, live betreiben.',
  },
];

const firstDebitUseCases = [
  'Interne Wissensoberflächen für Regeln, Leitfäden, Falltypen und Argumentationshilfen',
  'Dokumentenunterstützung für strukturierte Sichtung, Vorbewertung und Aufbereitung',
  'Recherche- und Prüf-Workflows für datensensible, nachvollziehbare Arbeitsschritte',
  'Schnelle Prototypen für Sachbearbeitung, Operations oder interne AI-Tools',
];

const recentWork = [
  {
    label: 'AI-Fokus seit 10/2025',
    value: 'Aufbau lokaler LLM- und AI-Workflow-Praxis mit produktionsnaher Dokumentation statt bloßer Tool-Neugier.',
  },
  {
    label: 'Portfolio geschärft',
    value: 'Recruiter-taugliche React/Vite-Präsenz mit klaren Cases, besserer Struktur und direkter Kontaktstrecke live weiterentwickelt.',
  },
  {
    label: 'Delivery konsolidiert',
    value: 'Build-, Review- und Deployment-Strecken mit Cloudflare Pages/Wrangler stabilisiert und reale Referenzen systematisch aufbereitet.',
  },
];

const proofCases = [
  {
    name: 'ZBN Pipeline',
    problem: 'Wie lässt sich dokumentenlastige Information so aufbereiten, dass KI praktisch nutzbar wird, ohne Datensouveränität leichtfertig aus der Hand zu geben?',
    solution: 'Lokaler, RAG-naher Ansatz für Dokumentanalyse, Kontextführung und nachvollziehbare AI-Arbeitslogik mit Fokus auf Zero-Cloud-Denken und kontrollierbare Verarbeitung.',
    result: 'Demoprojekt als glaubwürdiger Beleg dafür, dass ich lokale LLM-Nutzung nicht nur theoretisch verstehe, sondern strukturiert in reale Anwendungsszenarien übersetzen kann.',
    accent: 'Hauptbeleg',
  },
  {
    name: 'munverricht.org',
    problem: 'Wie zeigt man AI- und Delivery-Kompetenz so, dass Recruiter sie in kurzer Zeit einordnen können?',
    solution: 'Eigenes Portfolio in React/TypeScript/Vite iterativ zu einer scanbaren, recruiter-orientierten Beweisfläche ausgebaut.',
    result: 'Live-System als Nachweis für Positionierung, Frontend-Umsetzung, Deployment und klare Case-Kommunikation.',
    accent: 'Zusatzbeleg',
  },
  {
    name: 'Live-Kundenprojekt',
    problem: 'Wie belegt man, dass Delivery nicht nur im Demo-Kontext funktioniert?',
    solution: 'Laufende Kundenarbeit mit technischem Betrieb, stabiler Web-Umsetzung und belastbarer Übergabe im Live-Betrieb.',
    result: 'Zeigt Verlässlichkeit, Umsetzungsdisziplin und die Fähigkeit, echte Systeme statt nur Showcase-Artefakte zu betreuen.',
    accent: 'Zusatzbeleg',
  },
];

const timeline = [
  {
    period: 'seit 10/2025',
    title: 'AI Workflow & Web Specialist',
    detail: 'Lokale LLM-Workflows, AI-Prototyping, React/Vite-Umsetzung, Demo- und Delivery-Strecken.',
  },
  {
    period: '02/2013 – 10/2025',
    title: 'Selbstständigkeit mit Graphiks.de',
    detail: 'WordPress, Webflow, Webdesign, Conversion-orientierte Seitenstruktur, laufender Kundenbetrieb, Google Ads.',
  },
  {
    period: 'kurz & bewusst knapp',
    title: 'Schulabschluss',
    detail: 'Im Lebenslauf nur kurz benannt, ohne künstliche Aufblähung durch irrelevante Alt-Historie.',
  },
];

const FirstDebitApplicationPage: React.FC = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const previousRobots = document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? null;

    document.title = 'First Debit Bewerbung | Maximilian Unverricht';

    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet');

    return () => {
      document.title = previousTitle;
      if (previousRobots === null) {
        robotsMeta?.remove();
      } else if (robotsMeta) {
        robotsMeta.setAttribute('content', previousRobots);
      }
    };
  }, []);

  return (
    <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-3 py-8 sm:px-4 sm:py-10 lg:gap-14 lg:px-0 lg:py-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-[color:color-mix(in_srgb,var(--accent-color)_22%,transparent)] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--surface-2)_90%,transparent),color-mix(in_srgb,var(--surface-1)_96%,transparent))] px-5 py-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:px-7 sm:py-8 lg:px-10 lg:py-12">
        <div className="absolute inset-y-0 right-0 hidden w-[32%] bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--accent-color)_13%,transparent),transparent_63%)] lg:block" aria-hidden="true" />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div className="space-y-6">
            <a href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent-color)]">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Zurück zu munverricht.org
            </a>

            <div className="space-y-4">
              <div className="text-[11px] uppercase tracking-[0.35em] text-[color:var(--accent-color)]">
                <ASCIIText text="// INITIATIVBEWERBUNG_FIRST_DEBIT" />
              </div>
              <h1 className="max-w-[13ch] text-4xl font-semibold uppercase leading-[0.92] text-[color:var(--text-strong)] sm:text-5xl lg:text-7xl">
                AI Automation &amp; Web Umsetzung
              </h1>
              <p className="max-w-[65ch] text-sm leading-7 text-[color:var(--text-muted)] sm:text-base">
                Ich bewerbe mich initiativ bei First Debit, weil ich genau an der Schnittstelle arbeite, die für ein datensensibles Unternehmen interessant ist: lokale LLMs, strukturierte AI-Workflows und schnelle Web-Umsetzung für reale Arbeitsprozesse.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {quickLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="group inline-flex items-center justify-between rounded-2xl border border-[color:color-mix(in_srgb,var(--accent-color)_18%,var(--border-color))] bg-[color:color-mix(in_srgb,var(--surface-2)_80%,transparent)] px-4 py-3 text-sm text-[color:var(--text-strong)] transition-all hover:border-[color:var(--accent-color)] hover:bg-[color:color-mix(in_srgb,var(--surface-2)_94%,transparent)]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" />
                    <span className="uppercase tracking-[0.16em] text-[11px]">{label}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[color:var(--muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--accent-color)]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-[color:color-mix(in_srgb,var(--accent-color)_18%,transparent)] bg-[color:color-mix(in_srgb,var(--surface-1)_88%,transparent)] p-5 sm:p-6">
            <div className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-color)]">
              <ASCIIText text="// QUICK_SCAN" />
            </div>
            <dl className="space-y-4 text-sm text-[color:var(--text-muted)]">
              <div>
                <dt className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Ort</dt>
                <dd className="text-base text-[color:var(--text-strong)]">Dortmund · Remote / Hybrid</dd>
              </div>
              <div>
                <dt className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Fokus</dt>
                <dd className="text-base text-[color:var(--text-strong)]">Lokale LLMs · AI-Workflows · Web Delivery</dd>
              </div>
              <div>
                <dt className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Relevante Phase</dt>
                <dd className="text-base text-[color:var(--text-strong)]">Starker AI-Fokus seit 10/2025</dd>
              </div>
              <div>
                <dt className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Fundament</dt>
                <dd className="text-base text-[color:var(--text-strong)]">Selbstständige Delivery-Praxis seit 2013</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        {relevanceSignals.map(({ title, text }, index) => {
          const icons = [Brain, Workflow, BriefcaseBusiness] as const;
          const Icon = icons[index];

          return (
            <article key={title} className="rounded-[1.6rem] border border-[color:var(--border-color)] bg-[color:color-mix(in_srgb,var(--surface-2)_82%,transparent)] p-5 sm:p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--accent-color)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-color)_10%,transparent)] text-[color:var(--accent-color)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mb-3 text-lg font-semibold text-[color:var(--text-strong)]">{title}</h2>
              <p className="text-sm leading-7 text-[color:var(--text-muted)]">{text}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[1.8rem] border border-[color:var(--border-color)] bg-[color:color-mix(in_srgb,var(--surface-2)_74%,transparent)] p-6 sm:p-7">
          <div className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-color)]">
            <ASCIIText text="// WAS_ICH_FUER_FIRST_DEBIT_BAUEN_KOENNTE" />
          </div>
          <ul className="space-y-3 text-sm leading-7 text-[color:var(--text-muted)]">
            {firstDebitUseCases.map((item) => (
              <li key={item} className="flex gap-3">
                <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent-color)]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[1.8rem] border border-[color:color-mix(in_srgb,var(--accent-color)_18%,transparent)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--surface-1)_92%,transparent),color-mix(in_srgb,var(--accent-color)_5%,var(--surface-2)))] p-6 sm:p-7">
          <div className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-color)]">
            <ASCIIText text="// LETZTE_6_MONATE" />
          </div>
          <div className="space-y-4">
            {recentWork.map(({ label, value }) => (
              <div key={label} className="border-l border-[color:color-mix(in_srgb,var(--accent-color)_28%,transparent)] pl-4">
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">{label}</p>
                <p className="text-sm leading-7 text-[color:var(--text-muted)]">{value}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-color)]">
              <ASCIIText text="// PROJEKTBEWEIS" />
            </div>
            <h2 className="text-2xl font-semibold uppercase tracking-[0.04em] text-[color:var(--text-strong)] sm:text-3xl">Problem → Lösung → Ergebnis</h2>
          </div>
          <p className="max-w-[42ch] text-sm leading-7 text-[color:var(--text-muted)]">
            Für First Debit ist ein fokussierter Beleg wichtiger als eine lose Sammlung von Showcase-Projekten. Deshalb stehen ein Hauptcase und zwei Ergänzungsbelege im Mittelpunkt.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {proofCases.map((item) => (
            <article key={item.name} className="rounded-[1.6rem] border border-[color:var(--border-color)] bg-[color:color-mix(in_srgb,var(--surface-2)_80%,transparent)] p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-[color:var(--text-strong)]">{item.name}</h3>
                <span className="rounded-full border border-[color:color-mix(in_srgb,var(--accent-color)_24%,transparent)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--accent-color)]">
                  {item.accent}
                </span>
              </div>
              <div className="space-y-4 text-sm leading-7 text-[color:var(--text-muted)]">
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Problem</p>
                  <p>{item.problem}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Lösung</p>
                  <p>{item.solution}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Ergebnis</p>
                  <p>{item.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[1.8rem] border border-[color:var(--border-color)] bg-[color:color-mix(in_srgb,var(--surface-2)_78%,transparent)] p-6 sm:p-7">
          <div className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-color)]">
            <ASCIIText text="// KURZLEBENSLAUF" />
          </div>
          <div className="space-y-5">
            {timeline.map(({ period, title, detail }) => (
              <div key={title} className="grid gap-2 border-b border-[color:var(--border-color)] pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[10rem_1fr]">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">{period}</p>
                <div>
                  <h3 className="text-base font-semibold text-[color:var(--text-strong)]">{title}</h3>
                  <p className="mt-1 text-sm leading-7 text-[color:var(--text-muted)]">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[1.8rem] border border-[color:color-mix(in_srgb,var(--accent-color)_20%,transparent)] bg-[color:color-mix(in_srgb,var(--surface-1)_90%,transparent)] p-6 sm:p-7">
          <div className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-color)]">
            <ASCIIText text="// WARUM_DIESE_BEWERBUNG_ANDERS_AUSSIHT" />
          </div>
          <p className="mb-4 text-sm leading-7 text-[color:var(--text-muted)]">
            Diese Seite ist bewusst keine generische Bewerbungshülle. Sie soll zeigen, wie ich arbeite: konkret, nachvollziehbar, schnell in sichtbaren Ergebnissen. Genau deshalb kombiniere ich hier Anschreiben, Lebenslauf und einen fokussierten Projektbeweis in einer eigenen Bewerbungsoberfläche.
          </p>
          <div className="rounded-[1.4rem] border border-[color:var(--border-color)] bg-[color:color-mix(in_srgb,var(--surface-2)_76%,transparent)] p-5">
            <div className="mb-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
              <Wrench className="h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" /> Arbeitsstil
            </div>
            <p className="text-sm leading-7 text-[color:var(--text-strong)]">
              Pragmatismus vor Buzzwords, saubere Übergaben vor Showeffekten, echte Delivery vor Konzeptfolien.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
};

export default FirstDebitApplicationPage;
