import React from 'react';
import { Bot, CheckCircle2, FileJson, ShoppingCart, Sparkles } from 'lucide-react';
import ASCIIText from './ASCIIText';
import { Badge, Card, Section } from './ui';

type Language = 'de' | 'en';

type FlagshipAICasesProps = {
  language: Language;
};

const cases = {
  de: [
    {
      title: 'Produktberater-Agent',
      eyebrow: 'E-Commerce AI / Produktdaten',
      problem: 'Große Produktkataloge sind schwer beratbar, besonders wenn Kunden nicht mit exakten Artikelnummern suchen.',
      solution: 'Agentischer Produktberater- und RAG-Workflow, der Produktdaten versteht, Rückfragen strukturiert und Empfehlungen nachvollziehbar macht.',
      result: 'Schnellere Beratung, bessere Orientierung und eine skalierbare Basis für Produktkommunikation bei ca. 1400 Produkten.',
      stack: ['Agentic workflow', 'RAG', 'Produktdaten', 'ca. 1400 Produkte'],
      icon: Bot,
      accent: 'text-cyan-300',
    },
    {
      title: 'Custom Commerce',
      eyebrow: 'Shop-Logik / Checkout',
      problem: 'Standard-Shop-Logik reicht oft nicht aus, wenn Produktzustände, Beratung und Verkaufsfluss projektabhängig sind.',
      solution: 'Eigene Shop-Logik mit Produktzuständen, Warenkorb, Checkout-Strecke und Stripe-Anbindung.',
      result: 'Mehr Kontrolle über Verkaufsfluss, Erweiterbarkeit und konkrete Kundenanforderungen statt Template-Kompromisse.',
      stack: ['Custom shop logic', 'Stripe', 'Cart/Checkout', 'Cloudflare'],
      icon: ShoppingCart,
      accent: 'text-blue-300',
    },
    {
      title: 'Dokumenten-/LLM-Pipeline',
      eyebrow: 'Lokaler Workflow / Validierung',
      problem: 'Technische Dokumente müssen strukturiert analysiert, übersetzt und validiert werden, ohne sensible Inhalte unnötig zu verteilen.',
      solution: 'Docling/PyMuPDF-Extraktion, lokaler LLM-Workflow, Python-Validierung und JSON-Ausgabe.',
      result: 'Kontrollierbarer Workflow für sensible technische Inhalte mit prüfbarer Ausgabe statt losem Chat-Ergebnis.',
      stack: ['Docling', 'PyMuPDF', 'Local LLM', 'Python validation', 'JSON'],
      icon: FileJson,
      accent: 'text-emerald-300',
    },
  ],
  en: [
    {
      title: 'Product advisor agent',
      eyebrow: 'E-commerce AI / product data',
      problem: 'Large product catalogs are hard to advise on, especially when customers do not search by exact part numbers.',
      solution: 'Agentic product-advisor and RAG workflow that understands product data, structures follow-up questions, and explains recommendations.',
      result: 'Faster advice, clearer orientation, and a scalable base for product communication across roughly 1400 products.',
      stack: ['Agentic workflow', 'RAG', 'Product data', '~1400 products'],
      icon: Bot,
      accent: 'text-cyan-300',
    },
    {
      title: 'Custom commerce',
      eyebrow: 'Shop logic / checkout',
      problem: 'Default shop logic often falls short when product states, advice, and sales flow are specific to the project.',
      solution: 'Custom shop logic with product states, cart, checkout flow, and Stripe integration.',
      result: 'More control over sales flow, extensibility, and real customer requirements instead of template compromises.',
      stack: ['Custom shop logic', 'Stripe', 'Cart/Checkout', 'Cloudflare'],
      icon: ShoppingCart,
      accent: 'text-blue-300',
    },
    {
      title: 'Document / LLM pipeline',
      eyebrow: 'Local workflow / validation',
      problem: 'Technical documents need to be analyzed, translated, and validated without spreading sensitive content unnecessarily.',
      solution: 'Docling/PyMuPDF extraction, local LLM workflow, Python validation, and JSON output.',
      result: 'A controllable workflow for sensitive technical material with verifiable output instead of loose chat results.',
      stack: ['Docling', 'PyMuPDF', 'Local LLM', 'Python validation', 'JSON'],
      icon: FileJson,
      accent: 'text-emerald-300',
    },
  ],
};

const copy = {
  de: {
    kicker: '// FLAGSHIP_AI_CASES',
    title: 'AI-Websysteme, die real einsetzbar sind.',
    intro:
      'Die Seite soll nicht nur Tools aufzählen, sondern zeigen, welche Art von Systemen ich bauen kann: Produktberater, Commerce-Flows, Dokumentenpipelines und schnelle produktnahe Prototypen.',
    problem: 'Problem',
    solution: 'Lösung',
    result: 'Ergebnis',
  },
  en: {
    kicker: '// FLAGSHIP_AI_CASES',
    title: 'AI web systems that can actually be used.',
    intro:
      'This page should not just list tools. It should show the systems I can build: product advisors, commerce flows, document pipelines, and fast product-adjacent prototypes.',
    problem: 'Problem',
    solution: 'Solution',
    result: 'Result',
  },
};

const FlagshipAICases: React.FC<FlagshipAICasesProps> = ({ language }) => {
  const c = copy[language];

  return (
    <Section id="flagship-ai-cases" spacing="md" className="scroll-mt-28 border-t border-neutral-900">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
        <div className="space-y-4 text-center lg:text-left">
          <p className="mono text-xs uppercase tracking-[0.3em] text-blue-500/80" aria-hidden="true">
            <ASCIIText text={c.kicker} noWrap={false} />
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-[0.04em] text-white mono sm:text-4xl">
            <ASCIIText text={c.title} noWrap={false} />
          </h2>
        </div>
        <p className="mx-auto max-w-[70ch] text-center text-sm leading-relaxed text-neutral-300 lg:mx-0 lg:text-left">
          {c.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {cases[language].map((item) => (
          <Card key={item.title} className="h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_0_28px_rgba(59,130,246,0.14)]">
            <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" aria-hidden="true" />
            <div className="relative z-10 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="mono text-[10px] uppercase tracking-[0.22em] text-blue-400">{item.eyebrow}</p>
                  <h3 className="text-xl font-semibold uppercase tracking-[0.03em] text-white mono">{item.title}</h3>
                </div>
                <div className={`rounded-md border border-neutral-800 bg-black/40 p-2 ${item.accent}`} aria-hidden="true">
                  <item.icon className="h-5 w-5" />
                </div>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-neutral-300">
                <p><span className="text-blue-400">{c.problem}:</span> {item.problem}</p>
                <p><span className="text-blue-400">{c.solution}:</span> {item.solution}</p>
                <p><span className="text-blue-400">{c.result}:</span> {item.result}</p>
              </div>

              <div className="flex flex-wrap gap-2 border-t border-neutral-800/80 pt-4">
                {item.stack.map((stackItem) => (
                  <Badge key={stackItem} tone="proof" icon={<CheckCircle2 className="h-3 w-3" aria-hidden="true" />}>
                    {stackItem}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-center text-sm leading-relaxed text-neutral-300">
        <Sparkles className="mx-auto mb-2 h-4 w-4 text-blue-400" aria-hidden="true" />
        {language === 'de'
          ? 'Positionierung: kein ML-Research-Claim, sondern praktische AI-Produktumsetzung für Web, Commerce, Produktdaten, Automatisierung und Prototyping.'
          : 'Positioning: not an ML research claim, but practical AI product delivery for web, commerce, product data, automation, and prototyping.'}
      </div>
    </Section>
  );
};

export default FlagshipAICases;
