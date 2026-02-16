import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, Layout } from 'lucide-react';

const projects = [
    {
        title: 'Neurozentrierte Achtsamkeit',
        url: 'https://neurozentrierteachtsamkeit.de',
        desc: 'Membership-Plattform & Kurs-System',
        stack: ['WordPress', 'MemberPress', 'Learndash']
    },
    {
        title: 'Croelle',
        url: 'https://croelle.com',
        desc: 'E-Commerce & Brand Identity',
        stack: ['Shopify', 'Liquid', 'GSAP']
    },
    {
        title: 'Böckel-Bartscher',
        url: 'https://bockel-bartscher.de',
        desc: 'Corporate Website für Kanzlei',
        stack: ['WordPress', 'Custom Theme']
    },
    {
        title: 'MS Bau Hamm',
        url: 'https://msbau-hamm.de',
        desc: 'Handwerker-Website & Lead Gen',
        stack: ['Webflow', 'Local SEO']
    },
    {
        title: 'Kost Sicherheitstechnik',
        url: 'https://kost-sicherheitstechnik.de',
        desc: 'Unternehmensauftritt',
        stack: ['WordPress', 'Elementor Pro']
    },
    {
        title: 'Fitnesscenter Drensteinfurt',
        url: 'https://fitnesscenter-drensteinfurt.de',
        desc: 'Lokalmarketing & Web-Visitenkarte',
        stack: ['Astra Theme', 'Google Maps API']
    },
];

const Projects: React.FC = () => {
    return (
        <section className="space-y-12 py-12 border-t border-neutral-900">
            <div className="flex flex-col items-center text-center space-y-4">
                <h3 className="mono text-blue-500 text-xs tracking-[0.3em] uppercase opacity-70" aria-hidden="true">// CLIENT_ARCHIVE</h3>
                <h2 className="text-3xl font-bold uppercase tracking-[0.05em]">Selected Web Design Work</h2>
                <p className="max-w-[65ch] text-neutral-400 text-sm leading-relaxed">
                    Auszug aus über 10 Jahren Agentur-Tätigkeit. Fokus auf Conversion, SEO und performante Umsetzung.
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
                                <h4 className="font-bold text-neutral-200 group-hover:text-white uppercase text-sm tracking-wide">{p.title}</h4>
                            </div>

                            <p className="text-xs text-neutral-400 leading-relaxed font-mono min-h-[3em]">
                                {p.desc}
                            </p>

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
