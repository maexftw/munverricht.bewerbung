import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { useReducedMotion } from 'framer-motion';
import {
  Activity,
  BriefcaseBusiness,
  Clock3,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Terminal,
  Zap,
} from 'lucide-react';
import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { Token, type TokenColor } from '@astryxdesign/core/Token';
import { VStack } from '@astryxdesign/core/VStack';
import ASCIIText from './ASCIIText';
import HeroExperience from './HeroExperience';
import { VSCodeIcon } from './Icons';

type Language = 'de' | 'en';

type HeroProps = {
  language: Language;
};

const simpleIconUrl = (slug: string, color: string) => `https://cdn.simpleicons.org/${slug}/${color}`;

const toolLogos = [
  { name: 'VS Code', Icon: VSCodeIcon, badgeClassName: 'bg-sky-500/12 text-sky-300 border-sky-500/25', color: 'blue' as TokenColor },
  { name: 'React', logoSrc: simpleIconUrl('react', '61DAFB'), badgeClassName: 'bg-cyan-500/12 border-cyan-500/25', color: 'cyan' as TokenColor },
  { name: 'Tailwind', logoSrc: simpleIconUrl('tailwindcss', '06B6D4'), badgeClassName: 'bg-teal-500/12 border-teal-500/25', color: 'teal' as TokenColor },
  { name: 'Vite', logoSrc: simpleIconUrl('vite', '646CFF'), badgeClassName: 'bg-violet-500/12 border-violet-500/25', color: 'purple' as TokenColor },
  { name: 'TypeScript', logoSrc: simpleIconUrl('typescript', '3178C6'), badgeClassName: 'bg-blue-500/12 border-blue-500/25', color: 'blue' as TokenColor },
  { name: 'GSAP', logoSrc: simpleIconUrl('gsap', '88CE02'), badgeClassName: 'bg-emerald-500/12 border-emerald-500/25', color: 'green' as TokenColor },
  { name: 'Anime.js', logoSrc: simpleIconUrl('animedotjs', 'F7A8B8'), badgeClassName: 'bg-fuchsia-500/12 border-fuchsia-500/25', color: 'pink' as TokenColor },
  { name: 'HTML5', logoSrc: simpleIconUrl('html5', 'E34F26'), badgeClassName: 'bg-orange-500/12 border-orange-500/25', color: 'orange' as TokenColor },
  { name: 'GitHub', logoSrc: simpleIconUrl('github', 'FFFFFF'), badgeClassName: 'bg-slate-500/12 border-slate-500/25', color: 'gray' as TokenColor },
  { name: 'Cloudflare', logoSrc: simpleIconUrl('cloudflare', 'F38020'), badgeClassName: 'bg-amber-500/12 border-amber-500/25', color: 'yellow' as TokenColor },
  { name: 'Webflow', logoSrc: simpleIconUrl('webflow', '4353FF'), badgeClassName: 'bg-indigo-500/12 border-indigo-500/25', color: 'purple' as TokenColor },
  { name: 'Stripe', logoSrc: simpleIconUrl('stripe', '635BFF'), badgeClassName: 'bg-purple-500/12 border-purple-500/25', color: 'purple' as TokenColor },
];

const quickActionLabels = {
  de: { resume: 'Lebenslauf', projects: 'Projekte', email: 'E-Mail', phone: 'Telefon', open: 'öffnen' },
  en: { resume: 'Resume', projects: 'Projects', email: 'Email', phone: 'Phone', open: 'open' },
};

const Hero: React.FC<HeroProps> = ({ language }) => {
  const headingBlockRef = useRef<HTMLDivElement | null>(null);
  const introTextRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const recruiterQuickActions = [
    { label: quickActionLabels[language].resume, href: 'Maximilian_Unverricht_Resume_2026.html', icon: Terminal },
    { label: quickActionLabels[language].projects, href: '#projects', icon: BriefcaseBusiness },
    { label: quickActionLabels[language].email, href: 'mailto:info@munverricht.org', icon: Mail },
    { label: quickActionLabels[language].phone, href: 'tel:+491633229892', icon: Phone },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/maximilian-unverricht-590203392', icon: Linkedin, external: true },
    { label: 'GitHub', href: 'https://github.com/maexftw', icon: Github, external: true },
  ];

  useEffect(() => {
    if (shouldReduceMotion) return;

    const runningAnimations = [];

    if (headingBlockRef.current) {
      runningAnimations.push(
        animate(headingBlockRef.current, {
          scale: [0.95, 1],
          opacity: [0, 1],
          duration: 800,
          ease: 'outQuad',
        }),
      );
    }

    if (introTextRef.current) {
      runningAnimations.push(
        animate(introTextRef.current, {
          translateY: [10, 0],
          opacity: [0, 1],
          delay: 200,
          duration: 700,
          ease: 'outQuad',
        }),
      );
    }

    return () => {
      runningAnimations.forEach((animation) => {
        animation.cancel();
      });
    };
  }, [shouldReduceMotion]);

  const snapshotItems = [
    {
      icon: MapPin,
      label: language === 'de' ? 'Region' : 'Region',
      value: language === 'de' ? 'Deutschlandweit remote' : 'Remote across Germany',
    },
    {
      icon: Terminal,
      label: language === 'de' ? 'Fokus' : 'Focus',
      value: language === 'de' ? 'Frontend & Automatisierung' : 'Frontend & automation',
    },
    {
      icon: BriefcaseBusiness,
      label: language === 'de' ? 'Arbeitsmodell' : 'Work model',
      value: language === 'de' ? '100 % remote · Hybrid in Hamm' : 'Fully remote · Hybrid in Hamm',
    },
    {
      icon: Clock3,
      label: language === 'de' ? 'AI-Praxis' : 'AI practice',
      value: language === 'de' ? 'ca. 1,5 Jahre Coding Agents' : 'around 1.5 years with coding agents',
    },
  ];

  const relevanceItems = [
    {
      icon: Terminal,
      label: language === 'de' ? '01 / PRAXIS AUS REALEN PROJEKTEN' : '01 / PRACTICE FROM REAL PROJECTS',
      text: language === 'de'
        ? 'Ich arbeite an Unternehmens- und Vereinswebsites, kleinen Commerce-Lösungen und eigenen Browseranwendungen. Dabei übernehme ich Anpassung, Integration und Übergabe.'
        : 'I work on company and association websites, small commerce solutions, and browser applications of my own. My role covers adaptation, integration, and handover.',
    },
    {
      icon: Activity,
      label: language === 'de' ? '02 / AKTUELLER FOKUS' : '02 / CURRENT FOCUS',
      text: language === 'de'
        ? 'Mein aktueller Schwerpunkt liegt auf React/Vite, modernen statischen Websites, Cloudflare Pages und Functions sowie wiederholbaren Content- und Release-Workflows.'
        : 'My current focus is on React/Vite, modern static websites, Cloudflare Pages and Functions, and repeatable content and release workflows.',
    },
    {
      icon: Zap,
      label: language === 'de' ? '03 / HIRING RELEVANZ' : '03 / HIRING RELEVANCE',
      text: language === 'de'
        ? 'Meine Stärke liegt darin, auch bestehende oder AI-generierte Codebasen zu verstehen, zu überarbeiten und mit Tests bis zu einem funktionierenden Stand zu bringen.'
        : 'My strength is understanding existing or AI-generated codebases, refining them, and using tests to bring them to a working state.',
    },
  ];

  return (
    <section id="hero" className="hero-section relative isolate scroll-mt-28 overflow-hidden rounded-[var(--radius-container)] px-3 pb-12 pt-20 sm:px-6">
      <HeroExperience reducedMotion={Boolean(shouldReduceMotion)} />
      <VStack gap={8} hAlign="center" className="relative z-10 text-center">
        <div
          ref={headingBlockRef}
          className="relative"
          style={shouldReduceMotion ? undefined : { transform: 'scale(0.95)', opacity: 0 }}
        >
          <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full" aria-hidden="true" />
          <VStack gap={4} hAlign="center">
            <Text type="code" color="accent" display="block" justify="center" className="tracking-[0.4em] uppercase">
              {language === 'de' ? 'RECRUITER PROFIL // WEBENTWICKLUNG & AUTOMATISIERUNG' : 'RECRUITER PROFILE // WEB DEVELOPMENT & AUTOMATION'}
            </Text>
            <Heading level={1} type="display-1" justify="center" textWrap="balance" className="uppercase tracking-[0.05em]">
              MAXIMILIAN <span className="text-blue-500">UNVERRICHT</span>
            </Heading>
          </VStack>
        </div>

        <Text
          ref={introTextRef}
          as="p"
          type="body"
          weight="medium"
          display="block"
          justify="center"
          textWrap="pretty"
          className="max-w-[70ch]"
          style={shouldReduceMotion ? undefined : { transform: 'translateY(10px)', opacity: 0 }}
        >
          {language === 'de'
            ? 'Ich entwickle Websites und Webanwendungen, die im Alltag funktionieren. Mein Fundament reicht von Google Ads und Analytics seit 2013 sowie langjähriger CMS- und Commerce-Praxis bis zu modernen Frontends, Cloudflare und praktischer Automatisierung. Coding Agents nutze ich gezielt für Umsetzung, Fehlersuche und Tests.'
            : 'I build websites and web applications that work in everyday use. My foundation spans Google Ads and Analytics since 2013, long-standing CMS and commerce practice, modern frontends, Cloudflare, and practical automation. I use coding agents where they help with implementation, debugging, and testing.'}
        </Text>

        <Card width="100%" maxWidth={896} padding={5} variant="muted">
          <VStack gap={3}>
            <Text type="code" color="accent" display="block" className="tracking-[0.22em] uppercase">
              <ASCIIText text="// HIRING_SNAPSHOT" />
            </Text>
            <Grid columns={{ minWidth: 180, max: 4, repeat: 'fit' }} gap={3}>
              {snapshotItems.map((item) => (
                <React.Fragment key={item.label}>
                  <Card padding={3} variant="default">
                    <VStack gap={2}>
                      <HStack gap={2} vAlign="center">
                        <item.icon className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                        <Text type="code" color="accent" className="uppercase tracking-wider">{item.label}</Text>
                      </HStack>
                      <Text type="supporting" color="secondary" display="block">{item.value}</Text>
                    </VStack>
                  </Card>
                </React.Fragment>
              ))}
            </Grid>
          </VStack>
        </Card>

        <Card width="100%" maxWidth={896} padding={5} variant="muted">
          <VStack gap={3}>
            <Text type="code" color="accent" display="block" className="tracking-[0.22em] uppercase">
              <ASCIIText text="// TOOLING_STACK" />
            </Text>
            <HStack gap={3} wrap="wrap" justify="center">
              {toolLogos.map((tool) => {
                const icon = tool.Icon ? (
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md border ${tool.badgeClassName}`}>
                    <tool.Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                ) : (
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md border ${tool.badgeClassName}`}>
                    <img
                      src={tool.logoSrc}
                      alt=""
                      className="h-4 w-4 object-contain"
                      width="16"
                      height="16"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      aria-hidden="true"
                    />
                  </span>
                );

                return <React.Fragment key={tool.name}><Token label={tool.name} size="sm" color={tool.color} icon={icon} /></React.Fragment>;
              })}
            </HStack>
          </VStack>
        </Card>

        <Card width="100%" maxWidth={896} padding={5} variant="blue" className="mt-4">
          <VStack gap={3}>
            <Text type="code" color="accent" display="block" className="tracking-[0.22em] uppercase">
              <ASCIIText text="// QUICK_RECRUITER_ACCESS" />
            </Text>
            <Grid columns={{ minWidth: 120, max: 6, repeat: 'fit' }} gap={3}>
              {recruiterQuickActions.map((action) => (
                <React.Fragment key={action.label}>
                  <Link
                    href={action.href}
                    isExternalLink={action.external}
                    label={`${action.label} ${quickActionLabels[language].open}`}
                    isStandalone
                    type="code"
                    className="flex items-center justify-center gap-2 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-background-card)] px-3 py-3 uppercase tracking-wider hover:border-[color:var(--color-accent)]"
                  >
                    <action.icon className="w-4 h-4 text-blue-400" aria-hidden="true" />
                    {action.label}
                  </Link>
                </React.Fragment>
              ))}
            </Grid>
          </VStack>
        </Card>

        <Grid columns={{ minWidth: 260, max: 3, repeat: 'fit' }} gap={8} width="100%" className="mt-24 border-t border-neutral-900 pt-12 text-left">
          {relevanceItems.map((item) => (
            <React.Fragment key={item.label}>
              <VStack gap={3}>
                <HStack gap={2} vAlign="center">
                  <item.icon className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />
                  <Text type="code" color="accent" className="tracking-[0.05em]">{item.label}</Text>
                </HStack>
                <Text type="supporting" color="secondary" display="block">{item.text}</Text>
              </VStack>
            </React.Fragment>
          ))}
        </Grid>
      </VStack>
    </section>
  );
};

export default Hero;
