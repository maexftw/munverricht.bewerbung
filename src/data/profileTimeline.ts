/**
 * Profile, Career Timeline, and Skills Matrix Data
 * Maximilian Unverricht Digital Résumé & Portfolio
 */

import type { TimelineMilestone, SkillGroup } from '../types/project';

export interface CandidateProfile {
  name: string;
  age: number;
  location: string;
  role: string;
  experienceYears: string;
  email: string;
  phone: string;
  availability: string;
  github: string;
  shortBio: string;
}

export const CANDIDATE_PROFILE: CandidateProfile = {
  name: "Maximilian Unverricht",
  age: 36,
  location: "Dortmund, Nordrhein-Westfalen, Deutschland (Remote / Hybrid)",
  role: "AI Workflow & Web Delivery Specialist / Senior Frontend Engineer",
  experienceYears: "12+ Jahre",
  email: "info@munverricht.org",
  phone: "+49 163 3229892",
  availability: "Verfügbar für Projekte & Rollen (Sofort / Nach Absprache)",
  github: "https://github.com/munverricht",
  shortBio: "Pragmatischer Fullstack- und Frontend-Ingenieur mit über 12 Jahren professioneller Web-Erfahrung. Spezialisiert auf moderne React 19 / TypeScript Architekturen, Cloudflare Edge-Infrastrukturen und deterministische, geschäftskritische AI-Agenten-Pipelines."
};

export const CAREER_TIMELINE: TimelineMilestone[] = [
  {
    period: "08/2025 – Heute",
    role: "AI Workflow & Web Delivery Specialist",
    company: "Selbstständig / Projektbasiert",
    location: "Dortmund (Remote / Hybrid)",
    description: "Fokussierte Entwicklung von modernen Web-Applikationen mit React 19, TypeScript, Vite, Cloudflare Pages/Workers und Integration von Vertical AI-Agents (ReAct-Loops, D1 SQL RAG, Guardrails).",
    achievements: [
      "Entwicklung des Flagship ASL Ademco B2B AI-Fachberaters mit 1.460+ SKUs",
      "Architektur robuster RAG- und Edge-Pipelines auf Cloudflare-Infrastruktur",
      "Aufbau datensouveräner Offline-RAG-Systeme mit Docling & lokalen GPU-Modellen",
      "Umsetzung strikter WCAG 2.1/2.2 AA Barrierefreiheit und 4pt/8pt Rhythmus-Designsysteme"
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Cloudflare Pages & D1",
      "DeepSeek-V3",
      "Google Gemini API",
      "Playwright",
      "Tailwind CSS"
    ],
    isCurrent: true
  },
  {
    period: "2013 – 2025",
    role: "Web Developer & Performance Marketing Manager",
    company: "Graphiks.de",
    location: "Dortmund / Deutschland",
    description: "Über 10 Jahre ganzheitliche Betreuung von Kundenprojekten: Konzeption, Umsetzung und Wartung von WordPress- und Webflow-Websites, technisches SEO, Performance-Optimierung und Conversion-Funnel.",
    achievements: [
      "Realisierung und Betreuung von Dutzenden erfolgreichen Kunden-Websites im B2B- und B2C-Bereich",
      "Performance-Steigerung bestehender Systeme auf nachhaltige Lighthouse 90+ Werte",
      "Verbindung von technischem Web-Development mit messbarem Performance-Marketing und Tracking",
      "Verantwortung für Server-Administration, Domain-Management, WAF-Sicherheit und CMS-Upgrades"
    ],
    stack: [
      "WordPress",
      "Webflow",
      "PHP / JavaScript",
      "Technical SEO",
      "Conversion Optimization",
      "Google Ads / Analytics"
    ],
    isCurrent: false
  }
];

export const SKILLS_TAXONOMY: SkillGroup[] = [
  {
    id: "frontend-arch",
    name: "Frontend Architecture",
    category: "Web & Interface Engineering",
    description: "Modulare UI-Systeme mit React 19, striktem TypeScript, WCAG AA Barrierefreiheit und Sub-Pixel-Präzision.",
    skills: [
      "React 19",
      "TypeScript 5.7",
      "Vite",
      "Tailwind CSS v3/v4",
      "Next.js",
      "WCAG 2.1/2.2 AA A11y",
      "Responsive Layouts (0px Overflow)"
    ],
    items: [
      { name: "React 19", level: "expert", highlighted: true, tags: ["Frontend", "Core"] },
      { name: "TypeScript 5.7", level: "expert", highlighted: true, tags: ["Language", "Type Safety"] },
      { name: "Tailwind CSS", level: "expert", highlighted: true, tags: ["Styling", "Design System"] },
      { name: "WCAG 2.1 AA A11y", level: "advanced", highlighted: true, tags: ["Accessibility", "Audit"] }
    ]
  },
  {
    id: "edge-backend",
    name: "Edge Backend & Database",
    category: "Cloudflare & Serverless Architecture",
    description: "Global verteilte Edge-Compute Endpunkte, relationale SQLite Datenbanken und sichere API-Integrationen.",
    skills: [
      "Cloudflare Pages & Workers",
      "Cloudflare D1 (SQLite)",
      "Node.js (ESM)",
      "Python 3.11",
      "REST APIs & Webhooks",
      "Cloudflare WAF & Security"
    ],
    items: [
      { name: "Cloudflare D1 (SQL)", level: "expert", highlighted: true, tags: ["Edge DB", "SQLite"] },
      { name: "Cloudflare Workers/Pages", level: "expert", highlighted: true, tags: ["Edge Compute", "Serverless"] },
      { name: "Python 3.11", level: "advanced", highlighted: false, tags: ["Automation", "Backend"] },
      { name: "Stripe API", level: "advanced", highlighted: false, tags: ["Payments", "Checkout"] }
    ]
  },
  {
    id: "ai-runtimes",
    name: "AI & Automation Runtimes",
    category: "LLMs, Agents & RAG Pipelines",
    description: "Deterministische AI-Systeme: Autonome ReAct Loops, Anti-Halluzinations-Filter und Offline-Dokumentenanalyse.",
    skills: [
      "DeepSeek-V3 / R1",
      "Google Gemini 2.0 API",
      "Ollama / vLLM",
      "ChromaDB",
      "IBM Docling",
      "Sentence-Transformers (bge-m3)",
      "ReAct Tool Loops & Guardrails"
    ],
    items: [
      { name: "ReAct Agent Loops", level: "expert", highlighted: true, tags: ["AI Agents", "Tool Calling"] },
      { name: "Deterministic Guardrails", level: "expert", highlighted: true, tags: ["Reliability", "Anti-Hallucination"] },
      { name: "IBM Docling & OCR", level: "advanced", highlighted: false, tags: ["Multimodal", "Document Parsing"] },
      { name: "ChromaDB & Embeddings", level: "advanced", highlighted: false, tags: ["Vector DB", "RAG"] }
    ]
  },
  {
    id: "devops-tooling",
    name: "DevOps, Testing & Tooling",
    category: "Quality Assurance & CI/CD",
    description: "Automatisierte E2E- und Regressions-Testsuiten, performante Build-Pipelines und Sicherheits-Härtung.",
    skills: [
      "Git & GitHub Actions",
      "Playwright E2E",
      "Vitest / Node Test Runner",
      "Datanorm Importer",
      "Lighthouse 95+ Audits",
      "Cloudflare Turnstile & Honeypot"
    ],
    items: [
      { name: "Playwright E2E", level: "expert", highlighted: true, tags: ["Testing", "Automation"] },
      { name: "Vitest / Node Test", level: "advanced", highlighted: false, tags: ["Unit Tests", "Regression"] },
      { name: "Lighthouse 100/100", level: "expert", highlighted: true, tags: ["Performance", "SEO"] },
      { name: "Turnstile / Honeypot", level: "advanced", highlighted: false, tags: ["Security", "Spam Defense"] }
    ]
  }
];

export const ENGINEERING_PHILOSOPHY = {
  principles: [
    {
      title: "Deutsche Ingenieurspräzision & Verlässlichkeit",
      description: "Keine unbegründeten Spekulationen: Jede AI-Empfehlung ist 100% datenbankgebunden und deterministisch verifiziert."
    },
    {
      title: "Strikte Anti-Slop Disziplin",
      description: "Klare, semantische Komponenten, mathematische 4pt/8pt Rhythmen und Null-Toleranz gegenüber generischen AI-Platzhaltern."
    },
    {
      title: "Pragmatische 80/20 Delivery",
      description: "Fokus auf greifbaren Geschäftsnutzen, Ladezeiten und Wartbarkeit statt unnötiger technologischer Überkomplexität."
    },
    {
      title: "Ehrliche & Transparente Entwickler-Zuordnung",
      description: "Klare Abgrenzung zwischen explorativen UI-Ideen und vollständiger technischer Produktions-Architektur."
    }
  ]
};
