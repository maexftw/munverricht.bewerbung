import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Braces, ListChecks, MessageSquareText, ShieldCheck, Workflow } from 'lucide-react';
import ASCIIText from './ASCIIText';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type Language = 'de' | 'en';

type ShowcaseVerticalAgentProps = {
  language: Language;
};

type CopyBlock = {
  eyebrow: string;
  title: string;
  intro: string;
  intake: string;
  status: string;
  labels: {
    scope: string;
    ask: string;
    structure: string;
    review: string;
    input: string;
    process: string;
    output: string;
  };
  steps: Array<{
    label: string;
    text: string;
  }>;
};

const AGENT_BACKGROUND_TEXT = Array(42)
  .fill('VERTICAL_AGENT_SCOPE_STRUCTURED_OUTPUT_REVIEW_LOOP_DOMAIN_WORKFLOW ')
  .join(' ');

const copy: Record<Language, CopyBlock> = {
  de: {
    eyebrow: '// AGENT_USE_CASE_01',
    title: 'Fachworkflow Agent',
    intro:
      'Ein anonymisierter Showcase für spezialisiertes agentisches Arbeiten: kein offener Chat, sondern ein geführter Workflow mit klarer Aufgabe, strukturierten Ausgaben und Review-Punkten. Der Case zeigt, wie ich AI so eingrenze, dass daraus prüfbare Arbeitsschritte statt lose Antworten entstehen.',
    intake: 'Fachlicher Kontext rein, aber kein freier Chat ohne Ziel.',
    status: 'PROTOTYPE / SCOPED AGENT WORKFLOW / HUMAN REVIEW',
    labels: {
      scope: 'SCOPE',
      ask: 'ASK',
      structure: 'STRUCTURE',
      review: 'REVIEW',
      input: 'Input: fachlicher Kontext',
      process: 'Vertical Agent Flow',
      output: 'Reviewfähiger Output',
    },
    steps: [
      {
        label: '01 / Scope statt Chat',
        text:
          'Der Agent bekommt eine enge Aufgabe, definierte Eingaben und klare Grenzen. So bleibt der Workflow nachvollziehbar und driftet nicht in beliebige Chat-Antworten ab.',
      },
      {
        label: '02 / Strukturierte Ausgabe',
        text:
          'Antworten werden nicht nur als Text gedacht, sondern als strukturierte Daten, Checklisten oder nächste Arbeitsschritte, die im Web- oder Editor-Workflow weiterverwendet werden können.',
      },
      {
        label: '03 / Review-Schleife',
        text:
          'Zwischenergebnisse bleiben sichtbar und prüfbar. Der Mensch entscheidet, was übernommen wird, bevor der Output als Content, UI-Zustand oder technische Aufgabe weiterläuft.',
      },
    ],
  },
  en: {
    eyebrow: '// AGENT_USE_CASE_01',
    title: 'Vertical Agent Prototype',
    intro:
      'An anonymized showcase for specialized agentic work: not an open chat, but a guided workflow with a clear task, structured outputs, and review points. The case shows how I scope AI so it produces reviewable work steps instead of loose answers.',
    intake: 'Domain context in, but not a free chat without a target.',
    status: 'PROTOTYPE / SCOPED AGENT WORKFLOW / HUMAN REVIEW',
    labels: {
      scope: 'SCOPE',
      ask: 'ASK',
      structure: 'STRUCTURE',
      review: 'REVIEW',
      input: 'Input: domain context',
      process: 'Vertical agent flow',
      output: 'Reviewable output',
    },
    steps: [
      {
        label: '01 / Scope over chat',
        text:
          'The agent gets a narrow task, defined inputs, and clear boundaries. That keeps the workflow understandable instead of drifting into generic chat responses.',
      },
      {
        label: '02 / Structured output',
        text:
          'Outputs are treated as structured data, checklists, or next work steps that can continue inside a web or editor workflow.',
      },
      {
        label: '03 / Review loop',
        text:
          'Intermediate results stay visible and reviewable. A human decides what gets accepted before the output becomes content, UI state, or a technical task.',
      },
    ],
  },
};

const stageIcons = [Bot, MessageSquareText, Braces, ListChecks];

const ShowcaseVerticalAgent: React.FC<ShowcaseVerticalAgentProps> = ({ language }) => {
  const t = copy[language];
  const stages = [t.labels.scope, t.labels.ask, t.labels.structure, t.labels.review];

  return (
    <section id="showcase-vertical-agent" className="space-y-16 scroll-mt-28">
      <div className="space-y-4">
        <h3 className="mono text-blue-500 text-xs tracking-[0.3em] uppercase opacity-70" aria-hidden="true">
          <ASCIIText text={t.eyebrow} />
        </h3>
        <h2 className="text-4xl font-bold uppercase tracking-[0.05em] mono">
          <ASCIIText text={t.title} noWrap={false} />
        </h2>
        <p className="max-w-[70ch] text-neutral-200 text-sm leading-relaxed">
          {t.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <Card className="lg:col-span-7 gap-0 py-0 bg-[#111111] border-blue-500/20 text-neutral-100 relative overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.08)]">
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none mono text-[8px] leading-tight select-none" aria-hidden="true">
            {AGENT_BACKGROUND_TEXT}
          </div>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" aria-hidden="true" />

          <CardContent className="relative space-y-6 p-6 sm:p-8" aria-hidden="true">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mono text-[10px] uppercase tracking-widest">
              <span className="text-blue-400">VERTICAL_AGENT_CONSOLE</span>
              <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 mono text-[9px] uppercase tracking-widest text-amber-300">
                REVIEW MODE
              </Badge>
            </div>

            <Card className="gap-0 py-0 rounded border-neutral-800 bg-neutral-950/70 text-neutral-100">
              <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 mono text-[10px] text-neutral-500 uppercase tracking-widest">
                <MessageSquareText className="w-4 h-4 text-blue-400" />
                Scoped intake
              </div>
              <p className="text-sm text-neutral-200 leading-relaxed">{t.intake}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stages.map((stage, index) => {
                const Icon = stageIcons[index] ?? Workflow;
                return (
                  <Card key={stage} size="sm" className="min-h-24 gap-0 py-0 rounded border-blue-500/20 bg-blue-500/5 mono text-[9px] text-blue-300">
                    <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-3 text-neutral-500">
                      <span>0{index + 1}</span>
                      <Icon className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div className="break-words uppercase tracking-widest">{stage}</div>
                    <motion.div
                      className="mt-3 h-1 rounded-full bg-blue-500 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.7 }}
                      transition={{ delay: index * 0.18, duration: 0.45 }}
                    />
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="rounded border border-neutral-800 bg-black/40 p-4 mono text-[10px] leading-relaxed text-neutral-400">
              <div className="flex items-center gap-2 text-blue-400 mb-2 uppercase tracking-widest">
                <Braces className="w-4 h-4" /> structured_output.json
              </div>
              <pre className="whitespace-pre-wrap break-words">{`{
  "task": "scoped_agent_workflow",
  "mode": "human_review",
  "output": ["summary", "next_steps", "checks"]
}`}</pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-center">
              <div className="mono text-[8px] text-neutral-600 uppercase">{t.labels.input}</div>
              <div className="mono text-[8px] text-blue-500 uppercase">{t.labels.process}</div>
              <div className="mono text-[8px] text-amber-500 uppercase">{t.labels.output}</div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-5 space-y-8 self-center">
          <div className="space-y-6">
            {t.steps.map((step) => (
              <Card key={step.label} size="sm" className="gap-0 py-0 border-neutral-800 bg-neutral-950/35 text-neutral-100">
                <CardContent className="p-4 space-y-2">
                <h4 className="mono text-[10px] text-blue-500 uppercase font-bold tracking-widest">
                  <ASCIIText text={`>> ${step.label}`} />
                </h4>
                <p className="text-neutral-200 text-sm leading-relaxed">{step.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center gap-3 bg-neutral-900 border border-amber-500/20 px-4 py-3 rounded">
            <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" aria-hidden="true" />
            <div className="mono text-[10px] text-neutral-500 leading-relaxed">
              STATUS:{' '}
              <Badge variant="outline" className="h-auto border-amber-500/30 bg-amber-500/10 mono text-[9px] uppercase tracking-widest text-amber-300">
                {t.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseVerticalAgent;
