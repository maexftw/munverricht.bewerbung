import React, { useEffect } from 'react';
import { ArrowRight, FileText, Download, Mail, Phone, ShieldCheck, Brain, Workflow, BriefcaseBusiness } from 'lucide-react';
import ASCIIText from './ASCIIText';

const ApplicationLandingPage: React.FC = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Bewerbung | Maximilian Unverricht';

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-3 py-8 sm:px-4 sm:py-10 lg:gap-14 lg:px-0 lg:py-12" aria-label="Bewerbung">
      <section className="relative overflow-hidden rounded-[2rem] border border-[color:color-mix(in_srgb,var(--accent-color)_22%,transparent)] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--surface-2)_90%,transparent),color-mix(in_srgb,var(--surface-1)_96%,transparent))] px-5 py-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:px-7 sm:py-8 lg:px-10 lg:py-12">
        <div className="absolute inset-y-0 right-0 hidden w-[32%] bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--accent-color)_13%,transparent),transparent_63%)] lg:block" aria-hidden="true" />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-[11px] uppercase tracking-[0.35em] text-[color:var(--accent-color)]">
                <ASCIIText text="// INITIATIVBEWERBUNG" />
              </div>
              <h1 className="max-w-[14ch] text-4xl font-semibold uppercase leading-[0.92] text-[color:var(--text-strong)] sm:text-5xl lg:text-7xl">
                Maximilian Unverricht
              </h1>
              <p className="max-w-[65ch] text-sm leading-7 text-[color:var(--text-muted)] sm:text-base">
                Initiativbewerbung für First Debit · Lokale KI für sensible Dokument- und Prozessarbeit
              </p>
              <p className="max-w-[62ch] text-sm leading-7 text-[color:var(--text-muted)] sm:text-base">
                Ich bewerbe mich initiativ bei First Debit, weil ich nicht nur mit KI experimentiere, sondern sie in nachvollziehbare Arbeitsstrecken übersetze: lokale LLMs, strukturierte Dokumentenverarbeitung und schnelle Oberflächen für interne Prozesse, bei denen Kontrolle und Praxistauglichkeit wichtiger sind als bloße Tool-Demos.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="/first-debit-anschreiben.html"
                className="group inline-flex min-w-0 items-center justify-between rounded-2xl border border-[color:color-mix(in_srgb,var(--accent-color)_18%,var(--border-color))] bg-[color:color-mix(in_srgb,var(--surface-2)_80%,transparent)] px-4 py-3.5 text-sm text-[color:var(--text-strong)] transition-all hover:border-[color:var(--accent-color)] hover:bg-[color:color-mix(in_srgb,var(--surface-2)_94%,transparent)]"
              >
                <span className="inline-flex min-w-0 items-center gap-3">
                  <FileText className="h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block truncate uppercase tracking-[0.16em] text-[11px]">Anschreiben</span>
                    <span className="block text-xs text-[color:var(--muted)]">sauber formatiert</span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-[color:var(--muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--accent-color)]" aria-hidden="true" />
              </a>
              
              <a
                href="/Maximilian_Unverricht_Resume_2026.html"
                className="group inline-flex min-w-0 items-center justify-between rounded-2xl border border-[color:color-mix(in_srgb,var(--accent-color)_18%,var(--border-color))] bg-[color:color-mix(in_srgb,var(--surface-2)_80%,transparent)] px-4 py-3.5 text-sm text-[color:var(--text-strong)] transition-all hover:border-[color:var(--accent-color)] hover:bg-[color:color-mix(in_srgb,var(--surface-2)_94%,transparent)]"
              >
                <span className="inline-flex min-w-0 items-center gap-3">
                  <Download className="h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block truncate uppercase tracking-[0.16em] text-[11px]">Lebenslauf</span>
                    <span className="block text-xs text-[color:var(--muted)]">aktuell 2026</span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-[color:var(--muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--accent-color)]" aria-hidden="true" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[color:var(--text-muted)]">
              <a href="mailto:info@graphiks.de" className="inline-flex items-center gap-2 transition-colors hover:text-[color:var(--text-strong)]">
                <Mail className="h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" />
                <span className="uppercase tracking-[0.14em] text-[11px]">E-Mail</span>
              </a>
              <a href="tel:+491633229892" className="inline-flex items-center gap-2 transition-colors hover:text-[color:var(--text-strong)]">
                <Phone className="h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" />
                <span className="uppercase tracking-[0.14em] text-[11px]">Telefon</span>
              </a>
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
                <dt className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Relevanz für First Debit</dt>
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
        <article className="rounded-[1.6rem] border border-[color:color-mix(in_srgb,var(--border-color)_78%,transparent)] bg-[color:color-mix(in_srgb,var(--surface-2)_76%,transparent)] p-5 sm:p-6">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--accent-color)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-color)_10%,transparent)] text-[color:var(--accent-color)]">
            <Brain className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="mb-3 text-lg font-semibold text-[color:var(--text-strong)]">Sensible Prozesse lokal gedacht</h2>
          <p className="text-sm leading-7 text-[color:var(--text-muted)]">Wenn Informationen nicht einfach in irgendein Cloud-Tool gekippt werden sollen, wird lokale Modellnutzung relevant. Genau dort setze ich an: kontrollierte Kontexte, nachvollziehbare Verarbeitung und ein technisches Setup, das zu sensiblen Arbeitsabläufen passt.</p>
        </article>

        <article className="rounded-[1.6rem] border border-[color:color-mix(in_srgb,var(--border-color)_78%,transparent)] bg-[color:color-mix(in_srgb,var(--surface-2)_76%,transparent)] p-5 sm:p-6">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--accent-color)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-color)_10%,transparent)] text-[color:var(--accent-color)]">
            <Workflow className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="mb-3 text-lg font-semibold text-[color:var(--text-strong)]">Interne Tools statt KI-Folien</h2>
          <p className="text-sm leading-7 text-[color:var(--text-muted)]">Ich bringe Ideen nicht nur in Präsentationen, sondern in echte Oberflächen: kleine interne Werkzeuge, testbare Prototypen, klare Bedienwege und Workflows, die im Tagesgeschäft überhaupt erst praktisch werden.</p>
        </article>

        <article className="rounded-[1.6rem] border border-[color:color-mix(in_srgb,var(--border-color)_78%,transparent)] bg-[color:color-mix(in_srgb,var(--surface-2)_76%,transparent)] p-5 sm:p-6">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--accent-color)_28%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-color)_10%,transparent)] text-[color:var(--accent-color)]">
            <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="mb-3 text-lg font-semibold text-[color:var(--text-strong)]">Liefern unter realen Bedingungen</h2>
          <p className="text-sm leading-7 text-[color:var(--text-muted)]">Meine Selbstständigkeit ist dabei kein Nebensatz, sondern der Belastungstest: Anforderungen übersetzen, pragmatisch bauen, sauber nachschärfen und Ergebnisse so ausliefern, dass sie außerhalb eines Demos bestehen.</p>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[1.8rem] border border-[color:var(--border-color)] bg-[color:color-mix(in_srgb,var(--surface-2)_74%,transparent)] p-6 sm:p-7">
          <div className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-color)]">
            <ASCIIText text="// WAS_ICH_FUER_FIRST_DEBIT_BAUEN_KOENNTE" />
          </div>
          <ul className="space-y-3 text-sm leading-7 text-[color:var(--text-muted)]">
            <li className="flex gap-3">
              <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent-color)]" aria-hidden="true" />
              <span>Interne Wissensoberflächen für Leitfäden, Einwände, Falltypen und wiederkehrende Bearbeitungslogik</span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent-color)]" aria-hidden="true" />
              <span>Dokumentenvorsortierung und Voraufbereitung, damit Sachbearbeitung weniger Zeit mit Sichten und Suchen verliert</span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent-color)]" aria-hidden="true" />
              <span>Recherche- und Prüfstrecken mit nachvollziehbaren Zwischenschritten statt Black-Box-Antworten</span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent-color)]" aria-hidden="true" />
              <span>Schnelle Prototypen für Operations, interne KI-Werkzeuge oder unterstützende Bearbeitungsoberflächen</span>
            </li>
          </ul>
        </article>

        <article className="rounded-[1.8rem] border border-[color:color-mix(in_srgb,var(--accent-color)_18%,transparent)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--surface-1)_92%,transparent),color-mix(in_srgb,var(--accent-color)_5%,var(--surface-2)))] p-6 sm:p-7">
          <div className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-color)]">
            <ASCIIText text="// LETZTE_6_MONATE" />
          </div>
          <div className="space-y-4">
            <div className="border-l border-[color:color-mix(in_srgb,var(--accent-color)_28%,transparent)] pl-4">
              <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">AI-Fokus seit 10/2025</p>
              <p className="text-sm leading-7 text-[color:var(--text-muted)]">Ich habe mein Arbeitsmodell gezielt auf lokale LLM- und AI-Workflows umgestellt – nicht als Spielerei, sondern mit Blick auf reale, sensible Anwendungsszenarien.</p>
            </div>
            <div className="border-l border-[color:color-mix(in_srgb,var(--accent-color)_28%,transparent)] pl-4">
              <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Portfolio geschärft</p>
              <p className="text-sm leading-7 text-[color:var(--text-muted)]">Ich habe meine Positionierung so geschärft, dass Arbeitsweise, Cases und Nutzen schneller erfassbar werden – genau deshalb gibt es diese dedizierte Unterseite statt einer normalen Mail mit Anhang.</p>
            </div>
            <div className="border-l border-[color:color-mix(in_srgb,var(--accent-color)_28%,transparent)] pl-4">
              <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Delivery konsolidiert</p>
              <p className="text-sm leading-7 text-[color:var(--text-muted)]">Ich habe Build-, Review- und Deployment-Strecken sauber zusammengezogen und meine Referenzen so aufbereitet, dass daraus belastbare Belege statt bloßer Projektlisten werden.</p>
            </div>
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
            Ich wollte hier bewusst nicht zehn Projekte stapeln, sondern drei klare Belege zeigen: einen für sensibles AI-Denken, einen für digitale Umsetzung und einen für belastbare Delivery im echten Betrieb.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <article className="rounded-[1.6rem] border border-[color:var(--border-color)] bg-[color:color-mix(in_srgb,var(--surface-2)_72%,transparent)] p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="min-w-0 text-lg font-semibold text-[color:var(--text-strong)] break-words">ZBN Pipeline</h3>
              <span className="rounded-full border border-[color:color-mix(in_srgb,var(--accent-color)_24%,transparent)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--accent-color)]">
                Hauptbeleg
              </span>
            </div>
            <div className="space-y-4 text-sm leading-7 text-[color:var(--text-muted)]">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Problem</p>
                <p>Dokumentenlastige Arbeit wird schnell langsam, wenn Inhalte erst manuell gesichtet, eingeordnet und gegengeprüft werden müssen – besonders dann, wenn sensible Informationen nicht unkontrolliert in externe Systeme laufen sollen.</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Lösung</p>
                <p>Ich habe einen lokalen, RAG-nahen Workflow entworfen, der Dokumentanalyse, Kontextführung und nachvollziehbare Verarbeitung zusammendenkt, statt nur eine generische KI-Antwort über Text zu legen.</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Ergebnis</p>
                <p>Das Projekt zeigt genau die Art von Denken, die ich auch für First Debit für relevant halte: sensible Inhalte strukturiert nutzbar machen, ohne Kontrolle und Nachvollziehbarkeit zu verlieren.</p>
              </div>
            </div>
          </article>

          <article className="rounded-[1.6rem] border border-[color:var(--border-color)] bg-[color:color-mix(in_srgb,var(--surface-2)_72%,transparent)] p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="min-w-0 text-lg font-semibold text-[color:var(--text-strong)] break-words">munverricht.org</h3>
              <span className="rounded-full border border-[color:color-mix(in_srgb,var(--accent-color)_24%,transparent)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--accent-color)]">
                Zusatzbeleg
              </span>
            </div>
            <div className="space-y-4 text-sm leading-7 text-[color:var(--text-muted)]">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Problem</p>
                <p>Wenn man komplexe Arbeitsweise nur beschreibt, bleibt oft unklar, ob daraus wirklich nutzbare Ergebnisse entstehen.</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Lösung</p>
                <p>Ich habe mein eigenes Portfolio als Beweisfläche gebaut: scanbar, live, iterativ verbessert und so strukturiert, dass Arbeitsweise, Qualität und Positionierung schnell sichtbar werden.</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Ergebnis</p>
                <p>Für First Debit ist diese Unterseite selbst schon ein Teil des Belegs: keine Behauptung, sondern eine konkrete, sauber umgesetzte Bewerbungsoberfläche.</p>
              </div>
            </div>
          </article>

          <article className="rounded-[1.6rem] border border-[color:var(--border-color)] bg-[color:color-mix(in_srgb,var(--surface-2)_72%,transparent)] p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="min-w-0 text-lg font-semibold text-[color:var(--text-strong)] break-words">Live-Kundenprojekt</h3>
              <span className="rounded-full border border-[color:color-mix(in_srgb,var(--accent-color)_24%,transparent)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--accent-color)]">
                Zusatzbeleg
              </span>
            </div>
            <div className="space-y-4 text-sm leading-7 text-[color:var(--text-muted)]">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Problem</p>
                <p>Viele gute Demos sagen noch nichts darüber aus, ob jemand im laufenden Betrieb sauber liefert und Verantwortung mitträgt.</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Lösung</p>
                <p>Meine bestehende Kundenarbeit belegt genau das: stabile Web-Umsetzung, technische Pflege, laufender Betrieb und Übergaben, die nicht nur im Showcase funktionieren.</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">Ergebnis</p>
                <p>Das ist wichtig, weil Sie damit nicht nur jemanden sehen, der KI spannend findet, sondern jemanden, der Ergebnisse auch im echten Alltag sauber zu Ende bringt.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[1.8rem] border border-[color:var(--border-color)] bg-[color:color-mix(in_srgb,var(--surface-2)_78%,transparent)] p-6 sm:p-7">
          <div className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-color)]">
            <ASCIIText text="// KURZLEBENSLAUF" />
          </div>
          <div className="space-y-5">
            <div className="grid gap-2 border-b border-[color:var(--border-color)] pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[10rem_1fr]">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">seit 10/2025</p>
              <div>
                <h3 className="text-base font-semibold text-[color:var(--text-strong)]">AI Workflow & Web Specialist</h3>
                <p className="mt-1 text-sm leading-7 text-[color:var(--text-muted)]">Fokus auf lokale LLM-Workflows, prototypische interne Werkzeuge, sensible Dokumentkontexte und schnelle Web-Umsetzung bis zum belastbaren Demonstrator.</p>
              </div>
            </div>
            <div className="grid gap-2 border-b border-[color:var(--border-color)] pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[10rem_1fr]">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">02/2013 – 10/2025</p>
              <div>
                <h3 className="text-base font-semibold text-[color:var(--text-strong)]">Selbstständigkeit mit Graphiks.de</h3>
                <p className="mt-1 text-sm leading-7 text-[color:var(--text-muted)]">Langjährige Delivery-Praxis mit WordPress, Webflow, Webdesign, Conversion-orientierter Struktur, technischem Betrieb und direkter Kundenverantwortung.</p>
              </div>
            </div>
            <div className="grid gap-2 border-b border-[color:var(--border-color)] pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[10rem_1fr]">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">kurz & bewusst knapp</p>
              <div>
                <h3 className="text-base font-semibold text-[color:var(--text-strong)]">Schulabschluss</h3>
                <p className="mt-1 text-sm leading-7 text-[color:var(--text-muted)]">Im Lebenslauf nur kurz benannt, ohne künstliche Aufblähung durch irrelevante Alt-Historie.</p>
              </div>
            </div>
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
              <span className="text-blue-500">🛠️</span> Arbeitsstil
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

export default ApplicationLandingPage;