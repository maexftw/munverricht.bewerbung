import React from 'react';
import { Check, MinusCircle } from 'lucide-react';
import ASCIIText from './ASCIIText';
import { Badge, Card, Section } from './ui';

type Language = 'de' | 'en';

type RoleFitProps = {
  language: Language;
};

const copy = {
  de: {
    kicker: '// ROLE_FIT',
    title: 'Für welche Rollen ich passe',
    intro:
      'Die Seite soll schnell einordnen, wofür ich eingestellt werden sollte — und wofür nicht. Meine Stärke liegt in produktnaher Umsetzung, Web, Commerce, Agenten und Deployment.',
    fitLabel: 'Passt gut',
    boundaryLabel: 'Nicht mein Kernprofil',
    roles: [
      'AI Solutions Developer',
      'AI Automation Engineer',
      'Technical AI Consultant',
      'Product Engineer AI',
      'E-Commerce AI Specialist',
      'Frontend Developer mit AI-Integration',
    ],
    boundaries: [
      'Kein ML-Researcher',
      'Kein reiner Data Scientist',
      'Kein klassischer Konzern-Senior',
      'Stärke: schnelle produktnahe Umsetzung, Prototyping, Web, Commerce, Agenten, Deployment',
    ],
  },
  en: {
    kicker: '// ROLE_FIT',
    title: 'Roles I fit well',
    intro:
      'The page should make it easy to understand what I should be hired for — and what I am not claiming. My strength is product-adjacent delivery, web, commerce, agents, and deployment.',
    fitLabel: 'Good fit',
    boundaryLabel: 'Not my core profile',
    roles: [
      'AI Solutions Developer',
      'AI Automation Engineer',
      'Technical AI Consultant',
      'Product Engineer AI',
      'E-Commerce AI Specialist',
      'Frontend Developer with AI integration',
    ],
    boundaries: [
      'Not an ML researcher',
      'Not a pure data scientist',
      'Not a classic corporate senior profile',
      'Strength: fast product-adjacent delivery, prototyping, web, commerce, agents, deployment',
    ],
  },
};

const RoleFit: React.FC<RoleFitProps> = ({ language }) => {
  const c = copy[language];

  return (
    <Section id="role-fit" spacing="md" className="scroll-mt-28 border-t border-neutral-900">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <p className="mono text-xs uppercase tracking-[0.3em] text-blue-500/80" aria-hidden="true">
          <ASCIIText text={c.kicker} noWrap={false} />
        </p>
        <h2 className="text-3xl font-bold uppercase tracking-[0.04em] text-white mono sm:text-4xl">
          <ASCIIText text={c.title} noWrap={false} />
        </h2>
        <p className="text-sm leading-relaxed text-neutral-300">{c.intro}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <Card className="p-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="mono text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">{c.fitLabel}</h3>
              <Check className="h-5 w-5 text-emerald-400" aria-hidden="true" />
            </div>
            <div className="flex flex-wrap gap-2">
              {c.roles.map((role) => (
                <Badge key={role} tone="primary" size="md" icon={<Check className="h-3 w-3" aria-hidden="true" />}>
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="mono text-sm font-semibold uppercase tracking-[0.22em] text-neutral-400">{c.boundaryLabel}</h3>
              <MinusCircle className="h-5 w-5 text-neutral-500" aria-hidden="true" />
            </div>
            <ul className="space-y-3 text-sm leading-relaxed text-neutral-300">
              {c.boundaries.map((boundary) => (
                <li key={boundary} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-600" aria-hidden="true" />
                  <span>{boundary}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default RoleFit;
