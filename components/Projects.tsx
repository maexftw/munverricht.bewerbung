import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, Layout } from 'lucide-react';
import ASCIIText from './ASCIIText';

const projects = [
    {
        title: 'TriXstar Portfolio',
        url: 'https://trixstar-portfolio.pages.dev/',
        problem: 'Artist-Portfolio sollte modern wirken, auf Mobile überzeugen und schnell aktualisierbar sein.',
        solution: 'React/Vite-basierter Relaunch mit klarer Struktur und performanter Auslieferung über Cloudflare.',
        result: 'Professionellerer Erstauftritt für Booking-Anfragen und bessere Scanbarkeit der Inhalte für neue Besucher.',
        stack: ['React', 'Vite', 'Cloudflare']
    },
    {
        title: 'Fitness Drensteinfurt',
        url: 'https://fitness-drensteinfurt-v2.pages.dev/',
        problem: 'Lokale Sichtbarkeit und Leadgewinnung sollten trotz begrenzter Zeit und Budgets verbessert werden.',
        solution: 'Relaunch als fokussierte Landingpage mit klaren CTAs, strukturierter Informationshierarchie und Conversion-Fokus.',
        result: 'Bessere Grundlage für Kampagnen und eine deutlich klarere Nutzerführung bis zur Kontaktaufnahme.',
        stack: ['Landing Page', 'Conversion Opt.']
    },
    {
        title: 'Immo Netzwerk Portal',
        url: 'https://immonetzwerkportal.pages.dev/',
        problem: 'Komplexe Plattform-Idee musste für Stakeholder früh greifbar und testbar gemacht werden.',
        solution: 'Interaktiver Prototyp mit Dashboard-Struktur zur schnellen Validierung von User-Flows und Funktionsumfang.',
        result: 'Schnellere Entscheidungsgrundlage für nächste Produkt-Schritte ohne teuren Full-Build im ersten Schritt.',
        stack: ['React', 'Dashboard', 'Concept']
    },
    {
        title: 'Baker & Charlie',
        url: 'https://bakerandcharlie.pages.dev/',
        problem: 'Traditionelles Angebot brauchte einen zeitgemäßen digitalen Markenauftritt.',
        solution: 'Website-Concept mit moderner visueller Führung und klaren Content-Modulen für lokale Zielgruppen.',
        result: 'Stärkerer Markenfit als Basis für einen vertrauenswürdigen, lokalen Erstkontakt online.',
        stack: ['Design', 'Local Business']
    },
    {
        title: 'Kaffee Faensen Commerce',
        url: 'https://www.kaffee-faensen.de/shop/homepage',
        problem: 'Standard-Shop-Logik deckte individuelle Produkt- und Prozessanforderungen nicht ab.',
        solution: 'Custom-Commerce-Setup mit eigener Shop-Logik, Stripe-Integration und markenkonformer UX.',
        result: 'Flexiblerer Verkaufsprozess und bessere technische Basis für künftige Shop-Erweiterungen.',
        stack: ['Custom Shop Logic', 'Stripe', 'Brand Identity']
    },
    {
        title: 'Kost Sicherheitstechnik',
        url: 'https://www.kost-sicherheitstechnik.de/',
        problem: 'Unternehmensauftritt sollte seriöser wirken und lokal besser gefunden werden.',
        solution: 'Migration von WordPress auf ein performantes Cloudflare-System für maximale Geschwindigkeit und Sicherheit.',
        result: 'Mehr Vertrauen im Erstkontakt und eine belastbare Grundlage für fortlaufende organische Sichtbarkeit.',
        stack: ['Cloudflare', 'Modern Workflows', 'Performance']
    },
    {
        title: 'Bockel-Bartscher',
        url: 'https://www.bockel-bartscher.de/',
        problem: 'Kanzlei-Inhalte waren zu wenig strukturiert für schnelle Orientierung potenzieller Mandanten.',
        solution: 'Klar gegliederter Kanzlei-Auftritt mit fokussierter Informationsarchitektur und professionellem Corporate-Design-Rahmen.',
        result: 'Seriöserer digitaler Eindruck und bessere inhaltliche Scanbarkeit bei Erstbesuchen.',
        stack: ['Cloudflare', 'Modern Workflows', 'Corporate Design']
    },
];

const Projects: React.FC = () => {
    return (
        <section id="projects" className="space-y-12 py-12 border-t border-neutral-900 scroll-mt-28">
            <div className="flex flex-col items-center text-center space-y-4">
                <h3 className="mono text-blue-500 text-xs tracking-[0.3em] uppercase opacity-70" aria-hidden="true">
                    <ASCIIText text="// SELECTED_WORK" />
                </h3>
                <h2 className="text-3xl font-bold uppercase tracking-[0.05em] mono">
                    <ASCIIText text="Projektübersicht" />
                </h2>
                <p className="max-w-[65ch] text-neutral-400 text-sm leading-relaxed">
                    Auswahl recruiter-relevanter Praxisprojekte im Format Problem → Lösung → Ergebnis für schnelle Einordnung.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p, i) => (
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
                                    <Layout className="w-4 h-4 text-neutral-600 group-hover:text-blue-500 transition-colors" aria-hidden="true" />
                                    <h4 className="font-bold text-neutral-200 group-hover:text-white uppercase text-sm tracking-wide">
                                        <ASCIIText text={p.title} />
                                    </h4>
                                </div>

                            <div className="space-y-2 text-xs leading-relaxed min-h-[11.5em]">
                                <p className="text-neutral-300">
                                    <span className="mono text-[10px] uppercase tracking-wider text-blue-400">Problem:</span> {p.problem}
                                </p>
                                <p className="text-neutral-300">
                                    <span className="mono text-[10px] uppercase tracking-wider text-blue-400">Lösung:</span> {p.solution}
                                </p>
                                <p className="text-neutral-200">
                                    <span className="mono text-[10px] uppercase tracking-wider text-blue-400">Ergebnis:</span> {p.result}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-900/50">
                                {p.stack.map(s => (
                                    <span key={s} className="px-2 py-1 bg-neutral-900 rounded text-[9px] mono text-neutral-500 uppercase tracking-wider">
                                        {s}
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
