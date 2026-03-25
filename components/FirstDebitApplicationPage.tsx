import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Brain, BriefcaseBusiness, Download, FileText, Mail, Phone, ShieldCheck, Workflow, Wrench } from 'lucide-react';
import ASCIIText from './ASCIIText';

const documentLinks = [
  { label: 'Anschreiben', href: '/first-debit-anschreiben.html', icon: FileText, hint: 'sauber formatiert' },
  { label: 'Lebenslauf', href: '/Maximilian_Unverricht_Resume_2026.html', icon: Download },
];

const contactLinks = [
  { label: 'E-Mail', href: 'mailto:info@graphiks.de', icon: Mail },
  { label: 'Telefon', href: 'tel:+491633229892', icon: Phone },
];

const relevanceSignals = [
  {
    title: 'Sensible Prozesse lokal gedacht',
    text: 'Wenn Informationen nicht einfach in irgendein Cloud-Tool gekippt werden sollen, wird lokale Modellnutzung relevant. Genau dort setze ich an: kontrollierte Kontexte, nachvollziehbare Verarbeitung und ein technisches Setup, das zu sensiblen Arbeitsabläufen passt.',
  },
  {
    title: 'Interne Tools statt KI-Folien',
    text: 'Ich bringe Ideen nicht nur in Präsentationen, sondern in echte Oberflächen: kleine interne Werkzeuge, testbare Prototypen, klare Bedienwege und Workflows, die im Tagesgeschäft überhaupt erst praktisch werden.',
  },
  {
    title: 'Liefern unter realen Bedingungen',
    text: 'Meine Selbstständigkeit ist dabei kein Nebensatz, sondern der Belastungstest: Anforderungen übersetzen, pragmatisch bauen, sauber nachschärfen und Ergebnisse so ausliefern, dass sie außerhalb eines Demos bestehen.',
  },
];

const firstDebitUseCases = [
  'Interne Wissensoberflächen für Leitfäden, Einwände, Falltypen und wiederkehrende Bearbeitungslogik',
  'Dokumentenvorsortierung und Voraufbereitung, damit Sachbearbeitung weniger Zeit mit Sichten und Suchen verliert',
  'Recherche- und Prüfstrecken mit nachvollziehbaren Zwischenschritten statt Black-Box-Antworten',
  'Schnelle Prototypen für Operations, interne KI-Werkzeuge oder unterstützende Bearbeitungsoberflächen',
];

const recentWork = [
  {
    label: 'AI-Fokus seit 10/2025',
    value: 'Ich habe mein Arbeitsmodell gezielt auf lokale LLM- und AI-Workflows umgestellt – nicht als Spielerei, sondern mit Blick auf reale, sensible Anwendungsszenarien.',
  },
  {
    label: 'Portfolio geschärft',
    value: 'Ich habe meine Positionierung so geschärft, dass Arbeitsweise, Cases und Nutzen schneller erfassbar werden – genau deshalb gibt es diese dedizierte Unterseite statt einer normalen Mail mit Anhang.',
  },
  {
    label: 'Delivery konsolidiert',
    value: 'Ich habe Build-, Review- und Deployment-Strecken sauber zusammengezogen und meine Referenzen so aufbereitet, dass daraus belastbare Belege statt bloßer Projektlisten werden.',
  },
];

const proofCases = [
  {
    name: 'ZBN Pipeline',
    problem: 'Dokumentenlastige Arbeit wird schnell langsam, wenn Inhalte erst manuell gesichtet, eingeordnet und gegengeprüft werden müssen – besonders dann, wenn sensible Informationen nicht unkontrolliert in externe Systeme laufen sollen.',
    solution: 'Ich habe einen lokalen, RAG-nahen Workflow entworfen, der Dokumentanalyse, Kontextführung und nachvollziehbare Verarbeitung zusammendenkt, statt nur eine generische KI-Antwort über Text zu legen.',
    result: 'Das Projekt zeigt genau die Art von Denken, die ich auch für First Debit für relevant halte: sensible Inhalte strukturiert nutzbar machen, ohne Kontrolle und Nachvollziehbarkeit zu verlieren.',
    accent: 'Hauptbeleg',
  },
  {
    name: 'munverricht.org',
    problem: 'Wenn man komplexe Arbeitsweise nur beschreibt, bleibt oft unklar, ob daraus wirklich nutzbare Ergebnisse entstehen.',
    solution: 'Ich habe mein eigenes Portfolio als Beweisfläche gebaut: scanbar, live, iterativ verbessert und so strukturiert, dass Arbeitsweise, Qualität und Positionierung schnell sichtbar werden.',
    result: 'Für First Debit ist diese Unterseite selbst schon ein Teil des Belegs: keine Behauptung, sondern eine konkrete, sauber umgesetzte Bewerbungsoberfläche.',
    accent: 'Zusatzbeleg',
  },
  {
    name: 'Live-Kundenprojekt',
    problem: 'Viele gute Demos sagen noch nichts darüber aus, ob jemand im laufenden Betrieb sauber liefert und Verantwortung mitträgt.',
    solution: 'Meine bestehende Kundenarbeit belegt genau das: stabile Web-Umsetzung, technische Pflege, laufender Betrieb und Übergaben, die nicht nur im Showcase funktionieren.',
    result: 'Das ist wichtig, weil Sie damit nicht nur jemanden sehen, der KI spannend findet, sondern jemanden, der Ergebnisse auch im echten Alltag sauber zu Ende bringt.',
    accent: 'Zusatzbeleg',
  },
];

const timeline = [
  {
    period: 'seit 10/2025',
    title: 'AI Workflow & Web Specialist',
    detail: 'Fokus auf lokale LLM-Workflows, prototypische interne Werkzeuge, sensible Dokumentkontexte und schnelle Web-Umsetzung bis zum belastbaren Demonstrator.',
  },
  {
    period: '02/2013 – 10/2025',
    title: 'Selbstständigkeit mit Graphiks.de',
    detail: 'Langjährige Delivery-Praxis mit WordPress, Webflow, Webdesign, Conversion-orientierter Struktur, technischem Betrieb und direkter Kundenverantwortung.',
  },
  {
    period: 'kurz & bewusst knapp',
    title: 'Schulabschluss',
    detail: 'Im Lebenslauf nur kurz benannt, ohne künstliche Aufblähung durch irrelevante Alt-Historie.',
  },
];

type FirstDebitApplicationPageProps = {
  privatePath: string;
};

const FirstDebitApplicationPage: React.FC<FirstDebitApplicationPageProps> = ({ privatePath }) => {
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
    <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-3 py-8 sm:px-4 sm:py-10 lg:gap-14 lg:px-0 lg:py-12" aria-label="First Debit Bewerbung">
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
              <h1 className="max-w-[14ch] text-4xl font-semibold uppercase leading-[0.92] text-[color:var(--text-strong)] sm:text-5xl lg:text-7xl">
                Lokale KI f&uuml;r sensible Dokument- und Prozessarbeit
              </h1>
              <p className="max-w-[65ch] text-sm leading-7 text-[color:var(--text-muted)] sm:text-base">
                Ich bewerbe mich initiativ bei First Debit, weil ich nicht nur mit KI experimentiere, sondern sie in nachvollziehbare Arbeitsstrecken übersetze: lokale LLMs, strukturierte Dokumentenverarbeitung und schnelle Oberflächen f&uuml;r interne Prozesse, bei denen Kontrolle und Praxistauglichkeit wichtiger sind als blo&szlig;e Tool-Demos.
              </p>
              <p className="max-w-[62ch] text-sm leading-7 text-[color:var(--text-muted)] sm:text-base">
                Statt einfach nur Unterlagen per Mail zu schicken, wollte ich Ihnen direkt zeigen, wie ich denke und arbeite: klar strukturiert, digital sauber umgesetzt und so aufbereitet, dass man in wenigen Minuten einschätzen kann, ob daraus f&uuml;r First Debit operativer Nutzen entstehen kann.
              </p>
              <p className="max-w-[60ch] text-xs uppercase tracking-[0.22em] text-[color:var(--muted)] sm:text-[13px]">
                Privater Bewerbungslink · nicht verlinkt · noindex gesetzt · Pfad: <span className="break-all text-[color:var(--accent-color)]">{privatePath}</span>
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {documentLinks.map(({ label, href, icon: Icon, hint }) => (
                <a
                  key={label}
                  href={href}
                  className="group inline-flex min-w-0 items-center justify-between rounded-2xl border border-[color:color-mix(in_srgb,var(--accent-color)_18%,var(--border-color))] bg-[color:color-mix(in_srgb,var(--surface-2)_80%,transparent)] px-4 py-3.5 text-sm text-[color:var(--text-strong)] transition-all hover:border-[color:var(--accent-color)] hover:bg-[color:color-mix(in_srgb,var(--surface-2)_94%,transparent)]"
                >
                  <span className="inline-flex min-w-0 items-center gap-3">
                    <Icon className="h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block truncate uppercase tracking-[0.16em] text-[11px]">{label}</span>
                      {hint ? <span className="block text-xs text-[color:var(--muted)]">{hint}</span> : null}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[color:var(--muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--accent-color)]" aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[color:var(--text-muted)]">
              {contactLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} className="inline-flex items-center gap-2 transition-colors hover:text-[color:var(--text-strong)]">
                  <Icon className="h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" />
                  <span className="uppercase tracking-[0.14em] text-[11px]">{label}</span>
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
                <dt className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Relevanz f&uuml;r First Debit</dt>
                <dd className="text-base text-[color:var(--text-strong)]">Lokale KI · Dokumentenprozesse · interne Tools</dd>
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
            <article key={title} className="rounded-[1.6rem] border border-[color:color-mix(in_srgb,var(--border-color)_78%,transparent)] bg-[color:color-mix(in_srgb,var(--surface-2)_76%,transparent)] p-5 sm:p-6">
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
            Ich wollte hier bewusst nicht zehn Projekte stapeln, sondern drei klare Belege zeigen: einen f&uuml;r sensibles AI-Denken, einen f&uuml;r digitale Umsetzung und einen f&uuml;r belastbare Delivery im echten Betrieb.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {proofCases.map((item) => (
            <article key={item.name} className="rounded-[1.6rem] border border-[color:var(--border-color)] bg-[color:color-mix(in_srgb,var(--surface-2)_72%,transparent)] p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="min-w-0 text-lg font-semibold text-[color:var(--text-strong)] break-words">{item.name}</h3>
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
            Diese Unterseite ist Absicht. Ich wollte Ihnen nicht nur schreiben, dass ich digitale Prozesse sauber strukturieren und mit KI-Logik verbinden kann &ndash; ich wollte es in der Form der Bewerbung selbst schon zeigen: reduziert, direkt, ohne Umwege und mit genug Substanz, um eine echte Entscheidung vorzubereiten.
          </p>
          <div className="rounded-[1.4rem] border border-[color:var(--border-color)] bg-[color:color-mix(in_srgb,var(--surface-2)_76%,transparent)] p-5">
            <div className="mb-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
              <Wrench className="h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" /> Arbeitsstil
            </div>
            <p className="text-sm leading-7 text-[color:var(--text-strong)]">
              Weniger Buzzwords, mehr Nutzwert: Prozesse verstehen, sauber bauen, nachvollziehbar testen und so ausliefern, dass daraus intern wirklich etwas wird.
            </p>
          </div>
        </article>
      </section>
    </section>
  );
};

export default FirstDebitApplicationPage;
