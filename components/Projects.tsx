import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, Layout } from 'lucide-react';
import ASCIIText from './ASCIIText';

type Language = 'de' | 'en';

type ProjectsProps = {
  language: Language;
};

type ProjectItem = {
  title: string;
  url: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
};

const projects: Record<Language, ProjectItem[]> = {
  de: [
    {
      title: 'TriXstar Portfolio',
      url: 'https://trixstar-portfolio.pages.dev/',
      problem: 'Das Künstlerportfolio sollte auf Mobilgeräten besser funktionieren und Inhalte schneller aktualisierbar machen.',
      solution: 'Relaunch mit React und Vite, klarerer Seitenstruktur und Deployment über Cloudflare Pages.',
      result: 'Besser lesbarer Erstkontakt für Booking-Anfragen und eine einfachere Basis für laufende Updates.',
      stack: ['React', 'Vite', 'Cloudflare'],
    },
    {
      title: 'Fitness Drensteinfurt',
      url: 'https://fitness-drensteinfurt-v2.pages.dev/',
      problem: 'Die Website sollte lokale Sichtbarkeit und Anfragen besser unterstützen, ohne ein großes Budget oder langen Relaunch.',
      solution: 'Umbau zu einer fokussierten Landingpage mit klaren CTAs, sauberer Informationshierarchie und kurzer Kontaktstrecke.',
      result: 'Eine klarere Grundlage für Kampagnen und weniger Reibung bis zur Anfrage.',
      stack: ['Landing Page', 'Conversion Opt.'],
    },
    {
      title: 'Immo Netzwerk Portal',
      url: 'https://immonetzwerkportal.pages.dev/',
      problem: 'Eine komplexe Plattform-Idee musste früh sichtbar und diskutierbar werden, bevor in einen Vollbau investiert wird.',
      solution: 'Interaktiver React-Prototyp mit Dashboard-Struktur, um User-Flows und Umfang gemeinsam durchzugehen.',
      result: 'Frühere Abstimmung mit Stakeholdern und eine günstigere Entscheidungsbasis für die nächsten Schritte.',
      stack: ['React', 'Dashboard', 'Concept'],
    },
    {
      title: 'Baker & Charlie',
      url: 'https://bakerandcharlie.pages.dev/',
      problem: 'Das traditionelle Angebot brauchte einen digitalen Auftritt, der verständlicher und passender zur Marke wirkt.',
      solution: 'Website-Konzept mit klaren Content-Modulen, visueller Führung und lokaler Ansprache.',
      result: 'Bessere Grundlage für einen glaubwürdigen ersten Eindruck bei neuen Besuchern.',
      stack: ['Design', 'Local Business'],
    },
    {
      title: 'Kaffee Faensen Commerce',
      url: 'https://www.kaffee-faensen.de/shop/homepage',
      problem: 'Die vorhandene Shop-Logik passte nicht zu den konkreten Produkt- und Prozessanforderungen.',
      solution: 'Eigene Commerce-Strecke mit individueller Shop-Logik, Stripe-Anbindung und passender UX.',
      result: 'Mehr Kontrolle über den Verkaufsablauf und eine tragfähige Basis für spätere Erweiterungen.',
      stack: ['Custom Shop Logic', 'Stripe', 'Brand Identity'],
    },
    {
      title: 'Kost Sicherheitstechnik',
      url: 'https://www.kost-sicherheitstechnik.de/',
      problem: 'Der Unternehmensauftritt sollte seriöser wirken und lokal besser auffindbar sein.',
      solution: 'Neuaufbau mit klarerer Struktur und Betrieb über Cloudflare, um Wartung und Auslieferung zu vereinfachen.',
      result: 'Ruhigerer Gesamteindruck, weniger technische Reibung und eine bessere Basis für lokale Sichtbarkeit.',
      stack: ['Cloudflare', 'Modern Workflows', 'Performance'],
    },
    {
      title: 'Bockel-Bartscher',
      url: 'https://www.bockel-bartscher.de/',
      problem: 'Kanzlei-Inhalte waren für neue Besucher nicht schnell genug erfassbar.',
      solution: 'Klar gegliederter Auftritt mit nachvollziehbarer Informationsarchitektur und ruhigem visuellen Rahmen.',
      result: 'Ein vertrauenswürdigerer erster Eindruck und schnellere Orientierung bei Erstbesuchen.',
      stack: ['Cloudflare', 'Modern Workflows', 'Corporate Design'],
    },
  ],
  en: [
    {
      title: 'TriXstar Portfolio',
      url: 'https://trixstar-portfolio.pages.dev/',
      problem: 'The artist portfolio needed to work better on mobile and make updates easier to ship.',
      solution: 'Relaunch with React and Vite, clearer page structure, and deployment through Cloudflare Pages.',
      result: 'A cleaner first touchpoint for booking requests and an easier base for ongoing updates.',
      stack: ['React', 'Vite', 'Cloudflare'],
    },
    {
      title: 'Fitness Drensteinfurt',
      url: 'https://fitness-drensteinfurt-v2.pages.dev/',
      problem: 'The website needed to support local visibility and enquiries without a large budget or long rebuild.',
      solution: 'Reshaped into a focused landing page with clear CTAs, better information order, and a shorter path to contact.',
      result: 'A clearer campaign landing point and less friction before enquiry.',
      stack: ['Landing Page', 'Conversion Opt.'],
    },
    {
      title: 'Immo Netzwerk Portal',
      url: 'https://immonetzwerkportal.pages.dev/',
      problem: 'A complex platform idea needed to become visible and discussable before investing in a full build.',
      solution: 'Interactive React prototype with dashboard structure to walk through user flows and scope early.',
      result: 'Earlier stakeholder alignment and a lower-risk basis for the next product decisions.',
      stack: ['React', 'Dashboard', 'Concept'],
    },
    {
      title: 'Baker & Charlie',
      url: 'https://bakerandcharlie.pages.dev/',
      problem: 'The traditional offer needed a clearer digital presence that felt closer to the brand.',
      solution: 'Website concept with clearer content modules, guided reading flow, and local audience framing.',
      result: 'A better starting point for a credible first impression online.',
      stack: ['Design', 'Local Business'],
    },
    {
      title: 'Kaffee Faensen Commerce',
      url: 'https://www.kaffee-faensen.de/shop/homepage',
      problem: 'The default shop logic did not fit the actual product and process requirements.',
      solution: 'Custom commerce flow with tailored shop logic, Stripe integration, and fitting UX.',
      result: 'More control over the sales flow and a workable base for later extensions.',
      stack: ['Custom Shop Logic', 'Stripe', 'Brand Identity'],
    },
    {
      title: 'Kost Sicherheitstechnik',
      url: 'https://www.kost-sicherheitstechnik.de/',
      problem: 'The company site needed a more credible presentation and better local findability.',
      solution: 'Rebuild with clearer structure and Cloudflare-based delivery to simplify maintenance and publishing.',
      result: 'A calmer first impression, less technical friction, and a better base for local visibility.',
      stack: ['Cloudflare', 'Modern Workflows', 'Performance'],
    },
    {
      title: 'Bockel-Bartscher',
      url: 'https://www.bockel-bartscher.de/',
      problem: 'The law firm content was not easy enough to scan for first-time visitors.',
      solution: 'Clearly structured site with understandable information architecture and a restrained visual frame.',
      result: 'A more trustworthy first impression and faster orientation for potential clients.',
      stack: ['Cloudflare', 'Modern Workflows', 'Corporate Design'],
    },
  ],
};

const Projects: React.FC<ProjectsProps> = ({ language }) => {
  return (
    <section id="projects" className="space-y-8 sm:space-y-10 lg:space-y-12 py-8 sm:py-10 lg:py-12 border-t border-neutral-900 scroll-mt-28">
      <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
        <h3 className="mono text-blue-500 text-xs tracking-[0.3em] uppercase opacity-70" aria-hidden="true">
          <ASCIIText text="// SELECTED_WORK" />
        </h3>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.05em] mono">
          <ASCIIText text={language === 'de' ? 'Projektübersicht' : 'Project Overview'} />
        </h2>
        <p className="max-w-[65ch] text-neutral-400 text-sm sm:text-base leading-relaxed">
          {language === 'de'
            ? 'Auswahl realer Projekte im Format Problem → Lösung → Ergebnis, damit Recruiter Umfang und Arbeitsweise schnell einordnen können.'
            : 'Selection of real projects in a Problem → Solution → Result format so recruiters can quickly assess scope and working style.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {projects[language].map((p, i) => (
          <motion.a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group block bg-[#111111] p-6 rounded border border-neutral-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" aria-hidden="true">
              <ExternalLink className="w-5 h-5" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Layout className="w-4 h-4 text-neutral-600 group-hover:text-blue-500 transition-colors" />
                <h3 className="font-semibold text-white uppercase tracking-[0.04em]">{p.title}</h3>
              </div>

              <div className="space-y-2 text-xs leading-relaxed text-neutral-300">
                <section>
                  <p><span className="text-blue-400">{language === 'de' ? 'Problem:' : 'Problem:'}</span> {p.problem}</p>
                </section>
                <section>
                  <p><span className="text-blue-400">{language === 'de' ? 'Lösung:' : 'Solution:'}</span> {p.solution}</p>
                </section>
                <section>
                  <p><span className="text-blue-400">{language === 'de' ? 'Ergebnis:' : 'Result:'}</span> {p.result}</p>
                </section>
              </div>

              <div className="pt-2 border-t border-neutral-800/80 flex flex-wrap gap-2">
                {p.stack.map((item) => (
                  <span key={item} className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-neutral-400 border border-neutral-700 rounded px-2 py-1">
                    <Layers className="w-3 h-3" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
