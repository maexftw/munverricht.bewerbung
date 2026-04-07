import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers } from 'lucide-react';
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
    <section id="projects" className="space-y-12 py-12 border-t border-[color:var(--border-subtle)] scroll-mt-28">
      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
        <div className="space-y-4">
          <h3 className="mono text-[11px] tracking-[0.3em] uppercase text-[color:var(--accent-soft)]" aria-hidden="true">
            <ASCIIText text="// SELECTED_WORK" />
          </h3>
          <h2 className="max-w-[12ch] text-3xl font-semibold tracking-[-0.05em] text-[color:var(--text-primary)] sm:text-4xl md:text-[3rem]">
            {language === 'de' ? 'Reale Projekte, lesbar statt laut.' : 'Real projects, readable instead of loud.'}
          </h2>
        </div>
        <p className="max-w-[40rem] text-sm leading-7 text-[color:var(--text-secondary)]">
          {language === 'de'
            ? 'Keine Projektkarten-Galerie, sondern eine Auswahl echter Fälle im Format Problem → Lösung → Ergebnis. So ist Umfang schnell erfassbar und die Wirkung jedes Projekts klarer.'
            : 'Not a project-card gallery, but a selection of real cases in a Problem → Solution → Result format so scope and value are easy to scan.'}
        </p>
      </div>

      <div className="divide-y divide-[color:var(--border-subtle)] border-y border-[color:var(--border-subtle)]">
        {projects[language].map((project, index) => (
          <motion.a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.04 }}
            className="group grid gap-6 py-8 transition-colors hover:bg-[color:var(--surface-1)]/32 md:grid-cols-[minmax(170px,0.26fr)_minmax(0,0.34fr)_minmax(0,0.4fr)] md:px-3"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mono text-[10px] uppercase tracking-[0.26em] text-[color:var(--text-subtle)]">Project {String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 text-xl font-semibold text-[color:var(--text-primary)]">{project.title}</h3>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[color:var(--accent-color)] opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.stack.map((item) => (
                  <span key={item} className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[color:var(--text-secondary)] border border-[color:var(--border-subtle)] rounded-full px-2.5 py-1">
                    <Layers className="w-3 h-3" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent-soft)]">{language === 'de' ? 'Problem' : 'Problem'}</p>
              <p className="text-sm leading-7 text-[color:var(--text-secondary)]">{project.problem}</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-3">
                <p className="mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent-soft)]">{language === 'de' ? 'Lösung' : 'Solution'}</p>
                <p className="text-sm leading-7 text-[color:var(--text-secondary)]">{project.solution}</p>
              </div>
              <div className="space-y-3">
                <p className="mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent-soft)]">{language === 'de' ? 'Ergebnis' : 'Result'}</p>
                <p className="text-sm leading-7 text-[color:var(--text-secondary)]">{project.result}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
