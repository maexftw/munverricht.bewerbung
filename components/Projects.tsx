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
      problem: 'Artist-Portfolio sollte modern wirken, auf Mobile überzeugen und schnell aktualisierbar sein.',
      solution: 'React/Vite-basierter Relaunch mit klarer Struktur und performanter Auslieferung über Cloudflare.',
      result: 'Professionellerer Erstauftritt für Booking-Anfragen und bessere Scanbarkeit der Inhalte für neue Besucher.',
      stack: ['React', 'Vite', 'Cloudflare'],
    },
    {
      title: 'Fitness Drensteinfurt',
      url: 'https://fitness-drensteinfurt-v2.pages.dev/',
      problem: 'Lokale Sichtbarkeit und Leadgewinnung sollten trotz begrenzter Zeit und Budgets verbessert werden.',
      solution: 'Relaunch als fokussierte Landingpage mit klaren CTAs, strukturierter Informationshierarchie und Conversion-Fokus.',
      result: 'Bessere Grundlage für Kampagnen und eine deutlich klarere Nutzerführung bis zur Kontaktaufnahme.',
      stack: ['Landing Page', 'Conversion Opt.'],
    },
    {
      title: 'Immo Netzwerk Portal',
      url: 'https://immonetzwerkportal.pages.dev/',
      problem: 'Komplexe Plattform-Idee musste für Stakeholder früh greifbar und testbar gemacht werden.',
      solution: 'Interaktiver Prototyp mit Dashboard-Struktur zur schnellen Validierung von User-Flows und Funktionsumfang.',
      result: 'Schnellere Entscheidungsgrundlage für nächste Produkt-Schritte ohne teuren Full-Build im ersten Schritt.',
      stack: ['React', 'Dashboard', 'Concept'],
    },
    {
      title: 'Baker & Charlie',
      url: 'https://bakerandcharlie.pages.dev/',
      problem: 'Traditionelles Angebot brauchte einen zeitgemäßen digitalen Markenauftritt.',
      solution: 'Website-Concept mit moderner visueller Führung und klaren Content-Modulen für lokale Zielgruppen.',
      result: 'Stärkerer Markenfit als Basis für einen vertrauenswürdigen, lokalen Erstkontakt online.',
      stack: ['Design', 'Local Business'],
    },
    {
      title: 'Kaffee Faensen Commerce',
      url: 'https://www.kaffee-faensen.de/shop/homepage',
      problem: 'Standard-Shop-Logik deckte individuelle Produkt- und Prozessanforderungen nicht ab.',
      solution: 'Custom-Commerce-Setup mit eigener Shop-Logik, Stripe-Integration und markenkonformer UX.',
      result: 'Flexiblerer Verkaufsprozess und bessere technische Basis für künftige Shop-Erweiterungen.',
      stack: ['Custom Shop Logic', 'Stripe', 'Brand Identity'],
    },
    {
      title: 'Kost Sicherheitstechnik',
      url: 'https://www.kost-sicherheitstechnik.de/',
      problem: 'Unternehmensauftritt sollte seriöser wirken und lokal besser gefunden werden.',
      solution: 'Migration von WordPress auf ein performantes Cloudflare-System für maximale Geschwindigkeit und Sicherheit.',
      result: 'Mehr Vertrauen im Erstkontakt und eine belastbare Grundlage für fortlaufende organische Sichtbarkeit.',
      stack: ['Cloudflare', 'Modern Workflows', 'Performance'],
    },
    {
      title: 'Bockel-Bartscher',
      url: 'https://www.bockel-bartscher.de/',
      problem: 'Kanzlei-Inhalte waren zu wenig strukturiert für schnelle Orientierung potenzieller Mandanten.',
      solution: 'Klar gegliederter Kanzlei-Auftritt mit fokussierter Informationsarchitektur und professionellem Corporate-Design-Rahmen.',
      result: 'Seriöserer digitaler Eindruck und bessere inhaltliche Scanbarkeit bei Erstbesuchen.',
      stack: ['Cloudflare', 'Modern Workflows', 'Corporate Design'],
    },
  ],
  en: [
    {
      title: 'TriXstar Portfolio',
      url: 'https://trixstar-portfolio.pages.dev/',
      problem: 'The artist portfolio needed a modern look, strong mobile experience, and fast update cycles.',
      solution: 'React/Vite relaunch with clear structure and fast Cloudflare delivery.',
      result: 'More professional first impression for booking requests and better content scanability for new visitors.',
      stack: ['React', 'Vite', 'Cloudflare'],
    },
    {
      title: 'Fitness Drensteinfurt',
      url: 'https://fitness-drensteinfurt-v2.pages.dev/',
      problem: 'Local visibility and lead generation had to improve despite limited time and budget.',
      solution: 'Relaunch as a focused landing page with clear CTAs, structured information hierarchy, and conversion focus.',
      result: 'Stronger campaign foundation and much clearer user guidance up to contact.',
      stack: ['Landing Page', 'Conversion Opt.'],
    },
    {
      title: 'Immo Netzwerk Portal',
      url: 'https://immonetzwerkportal.pages.dev/',
      problem: 'A complex platform idea needed to be tangible and testable early for stakeholders.',
      solution: 'Interactive prototype with dashboard structure for rapid validation of user flows and scope.',
      result: 'Faster decision-making for next product steps without an expensive full build in phase one.',
      stack: ['React', 'Dashboard', 'Concept'],
    },
    {
      title: 'Baker & Charlie',
      url: 'https://bakerandcharlie.pages.dev/',
      problem: 'A traditional offer needed a contemporary digital brand presence.',
      solution: 'Website concept with modern visual guidance and clear content modules for local audiences.',
      result: 'Stronger brand fit as a base for trustworthy first contact online.',
      stack: ['Design', 'Local Business'],
    },
    {
      title: 'Kaffee Faensen Commerce',
      url: 'https://www.kaffee-faensen.de/shop/homepage',
      problem: 'Default shop logic did not fit specific product and process requirements.',
      solution: 'Custom commerce setup with own shop logic, Stripe integration, and brand-consistent UX.',
      result: 'More flexible sales process and better technical base for future shop extensions.',
      stack: ['Custom Shop Logic', 'Stripe', 'Brand Identity'],
    },
    {
      title: 'Kost Sicherheitstechnik',
      url: 'https://www.kost-sicherheitstechnik.de/',
      problem: 'The company presence needed to look more professional and rank better locally.',
      solution: 'Migration from WordPress to a high-performance Cloudflare setup for speed and security.',
      result: 'More trust on first contact and a stable base for ongoing organic visibility.',
      stack: ['Cloudflare', 'Modern Workflows', 'Performance'],
    },
    {
      title: 'Bockel-Bartscher',
      url: 'https://www.bockel-bartscher.de/',
      problem: 'Law firm content was not structured enough for quick orientation of potential clients.',
      solution: 'Clearly structured law firm presence with focused information architecture and professional corporate design frame.',
      result: 'More trustworthy digital first impression and better content scanability for first-time visitors.',
      stack: ['Cloudflare', 'Modern Workflows', 'Corporate Design'],
    },
  ],
};

const Projects: React.FC<ProjectsProps> = ({ language }) => {
  return (
    <section id="projects" className="space-y-12 py-12 border-t border-neutral-900 scroll-mt-28">
      <div className="flex flex-col items-center text-center space-y-4">
        <h3 className="mono text-blue-500 text-xs tracking-[0.3em] uppercase opacity-70" aria-hidden="true">
          <ASCIIText text="// SELECTED_WORK" />
        </h3>
        <h2 className="text-3xl font-bold uppercase tracking-[0.05em] mono">
          <ASCIIText text={language === 'de' ? 'Projektübersicht' : 'Project Overview'} />
        </h2>
        <p className="max-w-[65ch] text-neutral-400 text-sm leading-relaxed">
          {language === 'de'
            ? 'Auswahl recruiter-relevanter Praxisprojekte im Format Problem → Lösung → Ergebnis für schnelle Einordnung.'
            : 'Selection of recruiter-relevant projects in a Problem → Solution → Result format for quick evaluation.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <p><span className="text-blue-400">{language === 'de' ? 'Problem:' : 'Problem:'}</span> {p.problem}</p>
                <p><span className="text-blue-400">{language === 'de' ? 'Lösung:' : 'Solution:'}</span> {p.solution}</p>
                <p><span className="text-blue-400">{language === 'de' ? 'Ergebnis:' : 'Result:'}</span> {p.result}</p>
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
