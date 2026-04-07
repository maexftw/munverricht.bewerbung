import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Gauge, Search, Workflow } from 'lucide-react';
import LegalInfo from './LegalInfo';

type Language = 'de' | 'en';

type WebdesignPageProps = {
  language: Language;
};

const services = {
  de: [
    {
      title: 'Webdesign mit klarer Fuehrung',
      body: 'Ein ruhiger, hochwertiger Auftritt, der dein Angebot sofort verstaendlich macht und nicht wie eine generische Agenturvorlage wirkt.',
      icon: Workflow,
    },
    {
      title: 'SEO von Anfang an mitgedacht',
      body: 'Saubere Seitenstruktur, sinnvolle Ueberschriften und lokale Auffindbarkeit als Basis fuer echte Anfragen.',
      icon: Search,
    },
    {
      title: 'Performance ohne Technikballast',
      body: 'Schnelle, wartbare Websites mit einfachen Ablaeufen, damit die Seite nicht nur huebsch aussieht, sondern sauber funktioniert.',
      icon: Gauge,
    },
  ],
  en: [
    {
      title: 'Web design with clear direction',
      body: 'A calm, premium presentation that makes your offer immediately understandable instead of looking like a generic agency template.',
      icon: Workflow,
    },
    {
      title: 'SEO built in from the start',
      body: 'Clear information structure, sensible headings, and local discoverability as the basis for real enquiries.',
      icon: Search,
    },
    {
      title: 'Performance without technical bloat',
      body: 'Fast, maintainable websites with simple delivery so the result does not just look good, but works cleanly.',
      icon: Gauge,
    },
  ],
};

const proofItems = {
  de: [
    {
      title: 'Kost Sicherheitstechnik',
      body: 'Serioeserer Eindruck, ruhigeres Lesen und ein digitaler Auftritt, der naeher an Vertrauen als an Techniklaerm sitzt.',
    },
    {
      title: 'Bockel-Bartscher',
      body: 'Bessere Orientierung fuer Erstbesucher durch klarere Struktur und nachvollziehbare Informationsfuehrung.',
    },
    {
      title: 'Fitness Drensteinfurt',
      body: 'Fokussierterer Erstkontakt und weniger Reibung bis zur Anfrage oder Kampagnen-Landingpage.',
    },
  ],
  en: [
    {
      title: 'Kost Sicherheitstechnik',
      body: 'A more credible first impression, calmer reading flow, and a presentation closer to trust than technical noise.',
    },
    {
      title: 'Bockel-Bartscher',
      body: 'Better orientation for first-time visitors through clearer structure and more readable information flow.',
    },
    {
      title: 'Fitness Drensteinfurt',
      body: 'A more focused first touchpoint and less friction before enquiry or campaign landing page conversion.',
    },
  ],
};

const process = {
  de: [
    'Angebot und Zielbild gemeinsam scharfziehen',
    'Inhalte ordnen und auf die richtige Wirkung reduzieren',
    'Sauber umsetzen und ohne unnoetigen Projektnebel online bringen',
  ],
  en: [
    'Clarify the offer and the target outcome together',
    'Structure the content and reduce it to the right level of impact',
    'Implement cleanly and launch without unnecessary project overhead',
  ],
};

const WebdesignPage: React.FC<WebdesignPageProps> = ({ language }) => {
  const isEnglish = language === 'en';

  return (
    <div className="relative bg-[#0e0e0e] text-[#e4e2e1]">
      <style>{`@keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }`}</style>
      <section className="relative overflow-hidden border-b border-[#5a4138]/20 bg-[#131313]">
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(90,65,56,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(90,65,56,0.1)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute left-1/2 top-0 h-[30rem] w-[54rem] -translate-x-1/2 rounded-full bg-[#fa5d19]/[0.08] blur-[140px]" />

        <div className="relative mx-auto grid min-h-screen max-w-7xl gap-16 px-6 pb-16 pt-28 lg:grid-cols-[minmax(0,0.95fr)_minmax(380px,1.05fr)] lg:items-center lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#fa5d19]/25 bg-[#fa5d19]/10 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#fa5d19]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#ffb59b]">
                {isEnglish ? 'Small business websites' : 'Webdesign fuer kleine Unternehmen'}
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="max-w-[10ch] font-['Space_Grotesk'] text-5xl font-bold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                {isEnglish ? 'Websites that rank, read clearly, and convert.' : 'Websites, die gefunden werden, klar wirken und Anfragen fuehren.'}
              </h1>
              <p className="max-w-xl text-base leading-8 text-[#e4e2e1]/72 sm:text-lg">
                {isEnglish
                  ? 'I build affordable websites for small businesses and solo operators with a stronger first impression, a cleaner structure, and real SEO and performance basics.'
                  : 'Ich baue bezahlbare Websites fuer kleine Unternehmen und Selbststaendige, die serioeser auftreten, lokal besser auffindbar sind und mit weniger Reibung zur Kontaktaufnahme fuehren.'}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:info@graphiks.de?subject=Anfrage%20Webdesign"
                className="inline-flex items-center justify-center rounded-md bg-[#fa5d19] px-8 py-4 text-sm font-bold text-white transition duration-150 hover:opacity-90"
              >
                {isEnglish ? 'Start your project' : 'Projekt anfragen'}
              </a>
              <a
                href="#webdesign-services"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#5a4138]/40 px-8 py-4 text-sm font-bold text-[#e4e2e1] transition duration-150 hover:bg-[#1a1a1a]"
              >
                {isEnglish ? 'View services' : 'Leistungen ansehen'}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-xl border border-[#5a4138]/25 bg-[#131313] p-2 shadow-[0_0_64px_rgba(0,0,0,0.4)]">
              <div className="relative overflow-hidden rounded-lg bg-black/35 p-6">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(250,93,25,0.05),transparent)] animate-[scanline_8s_linear_infinite]" />
                <div className="space-y-6 rounded-lg border border-[#5a4138]/20 bg-[#0e0e0e]/80 p-6">
                  <div className="flex items-center justify-between border-b border-[#5a4138]/20 pb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#ffb59b]/75">Authority layer</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#e4e2e1]/35">SEO / Speed / UX</span>
                  </div>
                  <div className="grid gap-4">
                    <div className="h-36 rounded-lg bg-[linear-gradient(135deg,rgba(250,93,25,0.15),rgba(250,93,25,0.03),rgba(255,181,155,0.08))]" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg border border-[#5a4138]/20 bg-[#1a1a1a] p-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#ffb59b]/70">
                          {isEnglish ? 'For' : 'Geeignet fuer'}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[#e4e2e1]/68">
                          {isEnglish
                            ? 'Local services, law firms, practices, studios, craftsmen, and smaller brands.'
                            : 'Lokale Dienstleister, Kanzleien, Praxen, Studios, Handwerk und kleinere Marken.'}
                        </p>
                      </div>
                      <div className="rounded-lg border border-[#5a4138]/20 bg-[#1a1a1a] p-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#ffb59b]/70">
                          {isEnglish ? 'Not included' : 'Nicht gemeint'}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[#e4e2e1]/68">
                          {isEnglish
                            ? 'No generic SaaS dashboard style, no template clutter, no bloated agency process.'
                            : 'Keine generische SaaS-Kacheloptik, keine Template-Unruhe und kein aufgeblasener Agenturprozess.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#5a4138]/15 bg-[#0e0e0e] py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3 lg:px-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#ffb59b]/72">SEO-Basis</p>
            <p className="mt-3 text-sm leading-7 text-[#e4e2e1]/65">
              {isEnglish ? 'Clear headings, local relevance, and better page architecture.' : 'Klare Ueberschriften, lokale Relevanz und eine bessere Seitenarchitektur.'}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#ffb59b]/72">Performance</p>
            <p className="mt-3 text-sm leading-7 text-[#e4e2e1]/65">
              {isEnglish ? 'Faster delivery and less friction before the first contact.' : 'Schnellere Auslieferung und weniger Reibung bis zum ersten Kontakt.'}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#ffb59b]/72">Ablauf</p>
            <p className="mt-3 text-sm leading-7 text-[#e4e2e1]/65">
              {isEnglish ? 'Short alignment, clear priorities, clean implementation.' : 'Kurze Abstimmung, klare Prioritaeten, saubere Umsetzung.'}
            </p>
          </div>
        </div>
      </section>

      <main id="main-content" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <section id="webdesign-services" className="grid gap-10 py-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffb59b]">// LEISTUNGEN</p>
            <h2 className="font-['Space_Grotesk'] text-4xl font-bold tracking-[-0.05em] text-[#e4e2e1] md:text-5xl">
              {isEnglish ? 'Engineered for visibility and trust.' : 'Gebaut fuer Sichtbarkeit, Lesbarkeit und Vertrauen.'}
            </h2>
          </div>
          <p className="max-w-xl border-l-2 border-[#fa5d19]/20 pl-6 text-sm leading-7 text-[#e4e2e1]/58">
            {isEnglish
              ? 'The goal is not to make the site louder. The goal is to make the right information easier to understand, easier to find, and easier to act on.'
              : 'Ziel ist nicht, die Website lauter zu machen. Ziel ist, die richtigen Informationen schneller erfassbar, besser auffindbar und leichter kontaktierbar zu machen.'}
          </p>
        </section>

        <section className="grid gap-6 py-12 md:grid-cols-3">
          {services[language].map((service) => (
            <article
              key={service.title}
              className="group bg-[#1a1a1a] p-8 transition duration-300 hover:border-[#fa5d19]/50"
            >
              <div className="mb-10 flex h-12 w-12 items-center justify-center rounded border border-[#5a4138]/25">
                <service.icon className="h-5 w-5 text-[#fa5d19]" aria-hidden="true" />
              </div>
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[#e4e2e1]">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#e4e2e1]/60">{service.body}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 py-16 md:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden rounded-lg border border-[#5a4138]/20 bg-[#1a1a1a] p-10">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(90,65,56,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(90,65,56,0.1)_1px,transparent_1px)] [background-size:40px_40px]" />
            <div className="relative max-w-2xl space-y-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffb59b]">// ABLAUF</p>
              <h2 className="font-['Space_Grotesk'] text-4xl font-bold tracking-[-0.05em] text-[#e4e2e1] md:text-5xl">
                {isEnglish ? 'A small-business friendly process.' : 'Ein Ablauf, der fuer kleine Unternehmen passt.'}
              </h2>
              <ol className="space-y-4 pt-2">
                {process[language].map((item, index) => (
                  <li key={item} className="flex gap-4 border-t border-[#5a4138]/16 pt-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#ffb59b]/80">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm leading-7 text-[#e4e2e1]/68">{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="rounded-lg border border-[#5a4138]/20 bg-[#131313] p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffb59b]">// PREISGEDANKE</p>
            <h3 className="mt-5 font-['Space_Grotesk'] text-3xl font-bold tracking-[-0.05em] text-[#e4e2e1]">
              {isEnglish ? 'Good design without giant overhead.' : 'Gute Websites ohne riesigen Agentur-Overhead.'}
            </h3>
            <p className="mt-5 text-sm leading-7 text-[#e4e2e1]/62">
              {isEnglish
                ? 'This is intended for smaller relaunches and new sites where the result should feel premium, but the process should stay understandable and efficient.'
                : 'Das Angebot ist fuer kleinere Relaunches und neue Websites gedacht, bei denen das Ergebnis hochwertig wirken soll, der Weg dorthin aber verstaendlich und effizient bleiben muss.'}
            </p>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-[#ffb59b]">
                <span className="h-2 w-2 rounded-full bg-[#fa5d19]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em]">
                  {isEnglish ? 'No hidden add-ons' : 'Keine versteckten Zusatzpakete'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[#ffb59b]">
                <span className="h-2 w-2 rounded-full bg-[#fa5d19]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em]">
                  {isEnglish ? 'SEO basics included' : 'SEO-Basis direkt mitgedacht'}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffb59b]">// REFERENZEN</p>
              <h2 className="font-['Space_Grotesk'] text-4xl font-bold tracking-[-0.05em] text-[#e4e2e1] md:text-5xl">
                {isEnglish ? 'Real projects, not abstract promises.' : 'Reale Projekte statt abstrakter Versprechen.'}
              </h2>
            </div>
            <div className="grid gap-6">
              {proofItems[language].map((item) => (
                <article key={item.title} className="border-b border-[#5a4138]/18 pb-6">
                  <h3 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[#e4e2e1]">{item.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#e4e2e1]/64">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#131313] px-8 py-24 text-center">
          <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,rgba(90,65,56,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(90,65,56,0.1)_1px,transparent_1px)] [background-size:40px_40px]" />
          <div className="relative mx-auto max-w-4xl space-y-10">
            <div className="inline-flex rounded-full border border-[#fa5d19]/30 bg-[#fa5d19]/10 px-4 py-1.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-[#ffb59b]">
                {isEnglish ? 'Scale your first impression' : 'Staerkerer erster Eindruck'}
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-5xl font-bold leading-[1.04] tracking-[-0.06em] text-[#e4e2e1] md:text-7xl">
              {isEnglish ? 'Ready for a site that feels clearer and sells better?' : 'Bereit fuer eine Website, die klarer wirkt und besser verkauft?'}
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-[#e4e2e1]/55">
              {isEnglish
                ? 'If your current site feels noisy, dated, or hard to trust, we can rebuild it into something calmer, faster, and more convincing.'
                : 'Wenn deine aktuelle Seite unruhig, veraltet oder schwer vertrauenswuerdig wirkt, koennen wir daraus einen ruhigeren, schnelleren und ueberzeugenderen Auftritt machen.'}
            </p>
            <div>
              <a
                href="mailto:info@graphiks.de?subject=Anfrage%20Webdesign"
                className="inline-flex items-center justify-center rounded-md bg-[#fa5d19] px-12 py-5 text-lg font-bold text-white transition duration-150 hover:-translate-y-0.5 hover:opacity-95"
              >
                {isEnglish ? 'Start your project' : 'Projekt anfragen'}
              </a>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-[#e4e2e1]/34">
                {isEnglish ? 'Short call - clear scope - no obligation' : 'Kurzes Gespraech - klarer Umfang - unverbindlich'}
              </p>
            </div>
          </div>
        </section>

        <LegalInfo language={language} />
      </main>
    </div>
  );
};

export default WebdesignPage;
