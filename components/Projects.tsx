import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, Layout } from 'lucide-react';
import ASCIIText from './ASCIIText';
import PixelCanvas from './PixelCanvas';

type Language = 'de' | 'en';

type ProjectsProps = {
  language: Language;
};

type ProjectItem = {
  title: string;
  url?: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
};

const projects: Record<Language, ProjectItem[]> = {
  de: [
    {
      title: 'RLC 1952',
      url: 'https://rlc-1952-recklinghausen.pages.dev/',
      problem: 'Eine umfangreiche Vereinswebsite brauchte einen verlässlichen Weg für News, Termine, Kontakt und Releases.',
      solution: 'Statische Seiten, Python-gestützte Contentpflege und eine Cloudflare Function für das Kontaktformular.',
      result: 'Live-Website mit geprüftem Build, funktionierendem Kontaktweg und nachvollziehbarem Preview-/Releaseprozess.',
      stack: ['JavaScript', 'Python', 'Cloudflare'],
    },
    {
      title: 'KOST Sicherheitstechnik',
      url: 'https://www.kost-sicherheitstechnik.de/',
      problem: 'Eine produktive Unternehmenswebsite musste technisch geprüft und zuverlässig über Cloudflare betrieben werden.',
      solution: 'Statische Umsetzung, Cloudflare-Deployment sowie technische Audits für Links, Tracking und Laufzeitfehler.',
      result: 'Produktiver Betrieb auf der kanonischen Domain mit verifiziertem Build und dokumentierten Prüfungen.',
      stack: ['JavaScript', 'Cloudflare', 'Python'],
    },
    {
      title: 'Kaffee Faensen Commerce',
      url: 'https://www.kaffee-faensen.de/shop/homepage',
      problem: 'Shop und Versand mussten reale Adress-, PLZ- und Gewichtsregeln abbilden.',
      solution: 'Statischer Shop mit Warenkorb, Cloudflare-Checkout-Function, Stripe und eigener Versandlogik.',
      result: 'Die Geschäftsregeln sind umgesetzt und durch 21 Node-Tests abgedeckt; eine echte Stripe-Transaktion war nicht Teil der Prüfung.',
      stack: ['JavaScript', 'Stripe', 'Cloudflare Functions'],
    },
    {
      title: 'Baker & Charlie',
      url: 'https://baker-charlie-production.pages.dev/',
      problem: 'Inhalte sollten pflegbar bleiben, ohne ein schweres klassisches CMS einzuführen.',
      solution: 'Mehrseitige Website mit JSON-basierten Inhalten, Pages CMS und Git-basiertem Redaktionsprozess.',
      result: 'Contentmodell, Build und CMS-Checks sind nachvollziehbar; zwei Browserprüfungen bleiben als offene QA-Punkte dokumentiert.',
      stack: ['JavaScript', 'JSON', 'Pages CMS'],
    },
    {
      title: 'VR Air Bridge Fix',
      url: 'https://github.com/maexftw/vr-airbridge-fix',
      problem: 'Ein nicht mehr unterstützter VR-Adapter fiel unter Windows 11 auf USB 2.0 und 2,4 GHz zurück.',
      solution: 'PowerShell automatisiert Geräteerkennung, Registry- und Treiberparameter, WinRT-Hotspotkonfiguration sowie Service- und Hardware-Neustarts.',
      result: 'Öffentlich dokumentierter und parser-geprüfter Fix; ein Meta-freier Betrieb setzt einen generischen Realtek-Treiber voraus.',
      stack: ['PowerShell', 'Windows PnP', 'WinRT'],
    },
    {
      title: 'Aim Trainer',
      url: 'https://aim-trainer-react.pages.dev/',
      problem: 'Eine kleine Browseranwendung sollte mehrere Trainingsmodi und nachvollziehbare lokale Ergebnisse verbinden.',
      solution: 'React-App mit Canvas-Interaktion, Metriken und lokaler Speicherung der Resultate.',
      result: 'Produktiver Build und Live-Deployment mit verifiziertem Kernablauf.',
      stack: ['React', 'Canvas', 'LocalStorage'],
    },
    {
      title: 'STALKER 2 Re Voice',
      problem: 'Hunderte Sprachdateien mussten eindeutig zugeordnet, ersetzt und als entfernbares Mod-Paket reproduzierbar gebaut werden.',
      solution: 'Python-Pipeline für Manifest, WEM-Mapping, Sprachgenerierung, ASR-/Audio-QC, Wwise-Konvertierung und PAK-Build.',
      result: '410 Banditen-Sprachpfade gebaut und hash-geprüft; zehn relevante Offline-Tests bestanden. Das Projekt ist lokal und noch nicht öffentlich versioniert.',
      stack: ['Python', 'Wwise/WEM', 'Audio QC'],
    },
  ],
  en: [
    {
      title: 'RLC 1952',
      url: 'https://rlc-1952-recklinghausen.pages.dev/',
      problem: 'A large association website needed a reliable workflow for news, events, contact, and releases.',
      solution: 'Static pages, Python-assisted content maintenance, and a Cloudflare Function for the contact form.',
      result: 'A live website with a verified build, working contact path, and a clear preview and release process.',
      stack: ['JavaScript', 'Python', 'Cloudflare'],
    },
    {
      title: 'KOST Sicherheitstechnik',
      url: 'https://www.kost-sicherheitstechnik.de/',
      problem: 'A production company website needed technical review and reliable Cloudflare operations.',
      solution: 'Static implementation, Cloudflare deployment, and technical audits for links, tracking, and runtime errors.',
      result: 'Production operation on the canonical domain with a verified build and documented checks.',
      stack: ['JavaScript', 'Cloudflare', 'Python'],
    },
    {
      title: 'Kaffee Faensen Commerce',
      url: 'https://www.kaffee-faensen.de/shop/homepage',
      problem: 'The shop and shipping flow needed to represent real address, postcode, and weight rules.',
      solution: 'Static shop with cart, Cloudflare checkout function, Stripe, and custom shipping logic.',
      result: 'The business rules are implemented and covered by 21 Node tests; a real Stripe transaction was outside the verification scope.',
      stack: ['JavaScript', 'Stripe', 'Cloudflare Functions'],
    },
    {
      title: 'Baker & Charlie',
      url: 'https://baker-charlie-production.pages.dev/',
      problem: 'Content needed to remain editable without introducing a heavyweight traditional CMS.',
      solution: 'Multi-page website with JSON content, Pages CMS, and a Git-based editorial workflow.',
      result: 'The content model, build, and CMS checks are documented; two browser checks remain open QA items.',
      stack: ['JavaScript', 'JSON', 'Pages CMS'],
    },
    {
      title: 'VR Air Bridge Fix',
      url: 'https://github.com/maexftw/vr-airbridge-fix',
      problem: 'An unsupported VR adapter fell back to USB 2.0 and 2.4 GHz under Windows 11.',
      solution: 'PowerShell automates device discovery, registry and driver parameters, WinRT hotspot configuration, and service and hardware restarts.',
      result: 'A publicly documented and parser-validated fix; Meta-free operation requires a generic Realtek driver.',
      stack: ['PowerShell', 'Windows PnP', 'WinRT'],
    },
    {
      title: 'Aim Trainer',
      url: 'https://aim-trainer-react.pages.dev/',
      problem: 'A small browser application needed to combine several training modes with clear local results.',
      solution: 'React app with Canvas interaction, metrics, and local result storage.',
      result: 'Production build and live deployment with a verified core flow.',
      stack: ['React', 'Canvas', 'LocalStorage'],
    },
    {
      title: 'STALKER 2 Re Voice',
      problem: 'Hundreds of voice files needed to be mapped, replaced, and packaged reproducibly as a removable mod.',
      solution: 'Python pipeline for manifests, WEM mapping, voice generation, ASR and audio QC, Wwise conversion, and PAK builds.',
      result: 'Built and hash-verified 410 Bandit voice paths, with ten relevant offline tests passing. The project is local and not yet publicly versioned.',
      stack: ['Python', 'Wwise/WEM', 'Audio QC'],
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
            ? 'Repository-geprüfte Projekte im Format Problem → Lösung → Ergebnis. Die Texte nennen nur Aufgaben und Resultate, die sich im Code, in Tests oder im Live-Stand nachvollziehen lassen.'
            : 'Repository-reviewed projects in a Problem → Solution → Result format. The descriptions only state work and results that can be traced in code, tests, or the live version.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects[language].map((p, i) => (
          <motion.a
            key={i}
            href={p.url}
            target={p.url ? '_blank' : undefined}
            rel={p.url ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group block bg-[#111111] p-6 rounded border border-neutral-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] relative overflow-hidden"
          >
            <PixelCanvas colors={['#3b82f6', '#1d4ed8']} density={0.15} gap={10} />
            {p.url && (
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" aria-hidden="true">
                <ExternalLink className="w-5 h-5" />
              </div>
            )}

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
