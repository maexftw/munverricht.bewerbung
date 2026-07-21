import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, Layout } from 'lucide-react';
import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { Text } from '@astryxdesign/core/Text';
import { Token } from '@astryxdesign/core/Token';
import { VStack } from '@astryxdesign/core/VStack';
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
  status?: 'wip';
  provenance?: string;
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
      title: 'KOST Sicherheitstechnik Shop',
      url: 'https://c95787f1.kost-9h6.pages.dev/shop/',
      problem: 'Eine bereitgestellte Produktbasis von rund 1.500 Sicherheitstechnik-Artikeln sollte importiert, strukturiert und responsiv navigierbar werden.',
      solution: 'React-/Cloudflare-Shop mit CSV-Import, D1-Katalogschema, Pages-Functions-API, KOST-Taxonomie, Produktansichten und persistentem Browser-Warenkorb.',
      result: 'Bestellanfragen werden mit Pflichtdaten und Legal Consent sowie einem testabgedeckten Draft-, Freigabe- und Payment-Link-Vertrag vorbereitet.',
      stack: ['React 19', 'Cloudflare Functions', 'D1'],
      status: 'wip',
      provenance: 'Stand 20.07.2026 · KOST-Repository · Commit 7e52176 · Produktion und main unverändert',
    },
    {
      title: 'Totti Vertical Agent',
      url: 'https://c95787f1.kost-9h6.pages.dev/shop/totti/',
      problem: 'Endkundenbedarf in der Sicherheitstechnik sollte strukturiert erfasst werden, ohne unklare oder normkritische Fälle als sichere Fachplanung auszugeben.',
      solution: 'Kataloggebundener KI-Berater mit freier Texteingabe, Guided Questions, serverseitiger Hydrierung, Produktrollen und Safety-, Norm- und Fremdmarken-Guards.',
      result: 'Passende KOST-Produkte werden eingegrenzt; Kauf-, Misch-, Anfrage- und Ablehnungspfade sind getrennt, und planungsintensive Fälle gehen fail-closed an eine persönliche KOST-Prüfung.',
      stack: ['React', 'Cloudflare Functions', 'D1'],
      status: 'wip',
      provenance: 'Stand 20.07.2026 · KOST-Repository · Commit 7e52176 · Produktion und main unverändert',
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
      url: 'https://maexftw.github.io/aim-trainer/',
      problem: 'Ein frameworkfreier Browsertrainer sollte drei Trainingsmodi mit messbaren und lokal gespeicherten Ergebnissen verbinden.',
      solution: 'Vanilla JavaScript mit Canvas-/Pointer-Lock-Interaktion, Leistungsmetriken und LocalStorage-Persistenz.',
      result: 'Unit-Test und Build bestanden; das GitHub-Pages-Deployment wurde live ohne JavaScript-Fehler geprüft.',
      stack: ['Vanilla JavaScript', 'Canvas', 'LocalStorage'],
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
      title: 'KOST Sicherheitstechnik Shop',
      url: 'https://c95787f1.kost-9h6.pages.dev/shop/',
      problem: 'A supplied product base of around 1,500 security-technology items needed to be imported, structured, and made responsive and navigable.',
      solution: 'React and Cloudflare shop with CSV import, a D1 catalogue schema, Pages Functions API, KOST taxonomy, product views, and a persistent browser cart.',
      result: 'It prepares order requests with a test-covered draft, approval, and payment-link contract, including required customer data and legal consent.',
      stack: ['React 19', 'Cloudflare Functions', 'D1'],
      status: 'wip',
      provenance: 'As of 20 Jul 2026 · KOST repository · Commit 7e52176 · Production and main unchanged',
    },
    {
      title: 'Totti Vertical Agent',
      url: 'https://c95787f1.kost-9h6.pages.dev/shop/totti/',
      problem: 'Security-technology customer needs needed structured capture without presenting unclear or standards-critical cases as reliable specialist planning.',
      solution: 'Catalogue-bound AI adviser with free-text input, guided questions, server-side hydration, product roles, and safety, standards, and third-party-brand guards.',
      result: 'It narrows suitable KOST products, separates purchase, mixed, enquiry, and rejection paths, and hands unclear, standards-critical, or planning-intensive cases off for personal KOST review.',
      stack: ['React', 'Cloudflare Functions', 'D1'],
      status: 'wip',
      provenance: 'As of 20 Jul 2026 · KOST repository · Commit 7e52176 · Production and main unchanged',
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
      url: 'https://maexftw.github.io/aim-trainer/',
      problem: 'A framework-free browser trainer needed to combine three training modes with measurable, locally stored results.',
      solution: 'Vanilla JavaScript with Canvas and Pointer Lock interaction, performance metrics, and LocalStorage persistence.',
      result: 'The unit test and build passed, and the GitHub Pages deployment was checked live without JavaScript errors.',
      stack: ['Vanilla JavaScript', 'Canvas', 'LocalStorage'],
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
    <section id="projects" className="scroll-mt-28 border-t border-[color:var(--border-subtle)] py-12">
      <VStack gap={10}>
        <VStack gap={4} hAlign="center">
          <Text type="code" color="accent" display="block" justify="center" aria-hidden="true">
          <ASCIIText text="// SELECTED_WORK" />
          </Text>
          <Heading level={2} justify="center" textWrap="balance">
            <ASCIIText text={language === 'de' ? 'Projektübersicht' : 'Project Overview'} />
          </Heading>
          <Text type="supporting" color="secondary" display="block" justify="center" textWrap="pretty" className="max-w-[65ch]">
          {language === 'de'
            ? 'Repository-geprüfte Projekte: bestehende Arbeiten als Problem → Lösung → Ergebnis, neue WIP-Systeme als Problem → Ansatz → belegter Stand.'
            : 'Repository-reviewed projects: established work as Problem → Solution → Result, and new WIP systems as Problem → Approach → Verified state.'}
          </Text>
        </VStack>

        <Grid columns={{ minWidth: 280, max: 3, repeat: 'fit' }} gap={6}>
          {projects[language].map((p, i) => {
            const cardContent = (
              <>
                <PixelCanvas colors={['#3b82f6', '#1d4ed8']} density={0.15} gap={10} />
                <VStack gap={4} className="relative z-10">
                  <HStack gap={3} vAlign="center">
                    <Layout className="h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" />
                    <Heading level={3}>{p.title}</Heading>
                    {p.url && <ExternalLink className="ml-auto h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" />}
                  </HStack>
                  {p.status === 'wip' && (
                    <HStack gap={2} wrap="wrap">
                      <Token label="Work in Progress" size="sm" color="cyan" />
                      <Text type="code" color="secondary">{p.provenance}</Text>
                    </HStack>
                  )}
                  <VStack gap={2}>
                    <Text type="supporting" color="secondary" display="block">
                      <Text type="supporting" color="accent">Problem:</Text> {p.problem}
                    </Text>
                    <Text type="supporting" color="secondary" display="block">
                      <Text type="supporting" color="accent">
                        {p.status === 'wip' ? (language === 'de' ? 'Ansatz:' : 'Approach:') : (language === 'de' ? 'Lösung:' : 'Solution:')}
                      </Text> {p.solution}
                    </Text>
                    <Text type="supporting" color="secondary" display="block">
                      <Text type="supporting" color="accent">
                        {p.status === 'wip' ? (language === 'de' ? 'Belegter Stand:' : 'Verified state:') : (language === 'de' ? 'Ergebnis:' : 'Result:')}
                      </Text> {p.result}
                    </Text>
                  </VStack>
                  <HStack gap={2} wrap="wrap">
                    {p.stack.map((item) => (
                      <React.Fragment key={item}><Token label={item} size="sm" color="blue" icon={<Layers aria-hidden="true" />} /></React.Fragment>
                    ))}
                  </HStack>
                </VStack>
              </>
            );

            return (
              <motion.article
                key={p.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
                className="h-full"
          >
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} ${p.status === 'wip' ? 'WIP-Preview ' : ''}${language === 'de' ? 'in neuem Tab öffnen' : 'open in new tab'}`}
                    className="project-card-link group block h-full rounded-[var(--radius-container)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-color)]"
                  >
                    <Card padding={6} className="relative h-full overflow-hidden transition-colors group-hover:border-[var(--accent-color)]">
                      {cardContent}
                    </Card>
                  </a>
                ) : (
                  <Card padding={6} className="relative h-full overflow-hidden">
                    {cardContent}
                  </Card>
                )}
              </motion.article>
            );
          })}
        </Grid>
      </VStack>
    </section>
  );
};

export default Projects;
