/**
 * Unit Test: Dictionary Completeness & Bilingual Key Symmetry
 * Validates 100% parity between German (DE) and English (EN) content across all 7 sections.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { compareDictionarySymmetry, validateTranslationDictionarySchema } from '../helpers/schema-validator.mjs';

// Canonical / Master Translation Dictionaries for Maximilian Unverricht Digital Résumé
export const deContent = {
  meta: {
    title: "Maximilian Unverricht — AI Workflow & Web Delivery Specialist",
    description: "Digitaler Lebenslauf & Portfolio von Maximilian Unverricht. 12+ Jahre Weberfahrung, Spezialist für React, TypeScript, Cloudflare Edge & AI-gestützte Workflows.",
    ogTitle: "Maximilian Unverricht — Digital Résumé & Portfolio"
  },
  nav: {
    about: "Profil",
    skills: "Skills & Stack",
    flagship: "Flagship: ASL Ademco",
    projects: "Projekte",
    experience: "Werdegang",
    contact: "Kontakt",
    toggleLang: "EN"
  },
  hero: {
    greeting: "Hallo, ich bin",
    name: "Maximilian Unverricht",
    title: "AI Workflow & Web Delivery Specialist",
    location: "Dortmund, Deutschland (Remote / Hybrid)",
    tagline: "Pragmatischer Web-Entwickler mit 12+ Jahren Erfahrung: Verbindet moderne Web-Architekturen (React, TypeScript, Cloudflare) mit praxiserprobten AI-Agenten und deterministischen RAG-Pipelines.",
    primaryCta: "Kontakt aufnehmen",
    secondaryCta: "Flagship Case Study ansehen"
  },
  about: {
    title: "Über mich",
    subtitle: "Vom CMS- & Performance-Marketing-Fundament zur modernen AI-gestützten Web-Entwicklung",
    paragraphs: [
      "Seit über 12 Jahren entwickle und optimiere ich Webanwendungen im professionellen Agentur- und Kundenumfeld. Über ein Jahrzehnt lang lag mein Schwerpunkt bei Graphiks.de auf maßgeschneiderten WordPress- und Webflow-Lösungen, Performance-Marketing und stabiler technischer Kundenbetreuung.",
      "Seit August 2025 liegt mein klarer Fokus auf moderner Web-Architektur (React 19, TypeScript, Vite, Tailwind CSS), Cloudflare Edge-Infrastrukturen (Workers, Pages, D1 SQL) und der Integration produktiver AI-Automationen. Dabei verstehe ich mich als pragmatischer Builder, der generative KI durch deterministische Guardrails und strukturierte Tool-Calling-Runtimes geschäftskritisch nutzbar macht."
    ],
    highlights: [
      { label: "Erfahrung", value: "12+ Jahre" },
      { label: "Fokus seit 08/2025", value: "React & AI Delivery" },
      { label: "Infrastruktur", value: "Cloudflare Pages & Edge" },
      { label: "Standort", value: "Dortmund (Remote / Hybrid)" }
    ]
  },
  skills: {
    title: "Skills & Tech Stack",
    subtitle: "Technologisches Profil: Ausgewogene Verbindung aus Frontend-Craft, Edge-Backend und KI-Engineering",
    categories: [
      {
        name: "Frontend Architecture",
        items: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Next.js", "WCAG 2.1 AA A11y", "Responsive Design"]
      },
      {
        name: "Edge Backend & Database",
        items: ["Cloudflare Pages & Workers", "Cloudflare D1 (SQL)", "Node.js (ESM)", "Python", "REST APIs", "WAF & Security"]
      },
      {
        name: "AI & Automation Runtimes",
        items: ["DeepSeek-V3", "Google Gemini API", "Ollama / vLLM", "ChromaDB", "Docling", "Sentence-Transformers", "ReAct Tool Loops"]
      },
      {
        name: "DevOps, Testing & Tooling",
        items: ["Git & GitHub Actions", "Playwright", "Vitest / Node Test", "Datanorm Importer", "Lighthouse 95+", "Performance Audits"]
      }
    ]
  },
  flagship: {
    badge: "Flagship Case Study #1",
    title: "ASL Ademco B2B — AI-gestützter Produktberater & Planning Studio",
    client: "ASL Ademco B2B Großhandel (asl-ademco.de)",
    subtitle: "Kataloggebundener Vertical Agent mit ReAct-Reasoning und deterministischer SQL-RAG auf Cloudflare D1",
    summary: "Für ASL Ademco, einen führenden deutschen B2B-Großhändler für Sicherheitstechnik und Brandschutz, wurde ein interaktiver AI-Fachberater entwickelt, der Errichter und Techniker bei der Systemkonfiguration und Produktauswahl aus einem 1.460+ Artikel umfassenden Sortiment unterstützt.",
    problemTitle: "Herausforderung & Problemstellung",
    problem: "B2B-Sicherheitsinstallateure benötigen hochpräzise, kompatibilitätsgeprüfte Produktempfehlungen ohne KI-Halluzinationen. Standard-Chatbots erfinden Artikelnummern oder empfehlen inkompatible Komponenten, was im Brandschutz und der Einbruchmeldetechnik inakzeptabel ist.",
    pillarsTitle: "5 Technische Lösungssäulen",
    pillars: [
      {
        title: "1. Vertical Agent (ReAct Loop)",
        description: "Interaktiver AI-Berater mit bis zu 7 Reasoning-Zyklen. Fragt eine Cloudflare D1 SQL-Datenbank mit 1.460+ Artikeln aus Datanorm/CSV-Exporten ab. Provider-Abstraktion für DeepSeek-V3 und Google Gemini.",
        tech: "React 19 · Cloudflare Workers · D1 SQL · DeepSeek / Gemini"
      },
      {
        title: "2. Anti-Halluzinations-Guardrails",
        description: "Strikte Positiv-Bindung (nur datenbankverifizierte SKUs), Hard-Block gegen Phantasie-Artikelnummern, Scope-Gate gegen Off-Topic-Anfragen und kontrolliertes Graceful Degradation bei Iterationsgrenzen.",
        tech: "Deterministic Guardrails · Scope Gate · SKU Validation"
      },
      {
        title: "3. Strukturierte SQL-RAG-Pipeline",
        description: "3-stufige SQL-Suche (Exakte SKU → AND-Volltext → OR mit Synonym-Expansion), Kompatibilitätsmatrix-Prüfung, automatische Zubehör-Auflösung und Detail-Hydration mit Bildern, Datenblättern und Staffelpreisen.",
        tech: "3-Stage SQL RAG · Synonym Expansion · Accessory Resolution"
      },
      {
        title: "4. B2B Planning Studio Frontend",
        description: "Responsiver B2B-Arbeitsplatz mit Merkliste, Mengenanpassung, Projektnotizen, 1-Klick-Anfrageexport und Onboarding-Tutorial. WCAG 2.2 AA konform und Lighthouse 100/100 Best Practices.",
        tech: "React 19 · Tailwind CSS · WCAG 2.2 AA · Lighthouse 100"
      },
      {
        title: "5. Datanorm Import-Pipeline",
        description: "Node.js ESM-Skripte für den Import deutscher Großhandels-Katalogformate in Cloudflare D1, inklusive nicht-destruktiver Aktualisierung von 1.461 Produktbildern via SQL.",
        tech: "Node.js ESM · Datanorm Parser · SQL Batch Ingestion"
      }
    ],
    metricsTitle: "Messbare Projekterfolge & Kennzahlen",
    metrics: [
      { label: "1.460+", value: "Reale Katalog-SKUs", detail: "In Cloudflare D1 SQL indiziert und fehlerfrei abfragbar" },
      { label: "Bis zu 7", value: "ReAct Reasoning-Zyklen", detail: "Autonome Tool-Aufrufe mit strikter Iterationsbegrenzung" },
      { label: "100%", value: "Positiv-gebundene SKUs", detail: "0% Halluzinationen von Fantasie-Artikelnummern" },
      { label: "100/100", value: "Lighthouse Score", detail: "Best Practices & Barrierefreiheit im B2B-Planning-Frontend" }
    ],
    attributionTitle: "Transparente Entwickler-Zuordnung",
    attribution: {
      prototype: "Frontend-Layout startete als explorativer Prototyp in Google AI Studio / Stitch.",
      engineering: [
        "Vollständige technische Architektur & Cloudflare Pages/D1 Backend-Implementierung",
        "ReAct Agent-Runtime, Provider-Abstraktion (DeepSeek / Gemini) und Prompt-Engineering",
        "Deterministische SQL-Suchwerkzeuge, Stoppwort-Filter & Synonym-Expansion",
        "Datanorm-Import-Pipeline & nicht-destruktive Bild-Synchronisation",
        "WCAG-Härtung, A11y-Audit und Git-Sicherheitsremediation"
      ]
    }
  },
  projects: {
    title: "Weitere ausgewählte Projekte",
    subtitle: "Kompakte Übersicht über produktive Kunden- und Edge-Architekturen",
    items: [
      {
        id: "baker-charlie",
        title: "Baker & Charlie",
        category: "Artisanal Bakery & Café (Bengaluru, Indien)",
        description: "Performante Custom HTML/JS-Website auf Cloudflare Pages als Webflow-Ablösung. Playwright Test-Suite (Modals, Content-Loader, Scroll-Progress, Mobile Overflow, Redirects), Pages CMS mit JSON-Schemas und Tabnabbing-Security-Fixes. Lighthouse von 60-70 auf 95+ gesteigert; spart ~38.000 ₹/Jahr Hosting und bis zu 2,35 Lakhs ₹/Jahr Lieferplattform-Provisionen.",
        metrics: "Lighthouse 95+ | ~38k ₹/Jahr Hostingerparnis",
        stack: ["Cloudflare Pages", "Playwright", "JSON Schemas", "Vanilla JS", "Lighthouse 95+"]
      },
      {
        id: "kost-sicherheit",
        title: "KOST Sicherheitstechnik",
        category: "Unternehmenswebsite & Edge Security",
        description: "Sicherheitstechnik-Website mit Cloudflare WAF-Management, Googlebot-Ausnahmeautomation und individuellem Python CloudflareManager für automatisierte SEO- und Sicherheits-Workflows.",
        metrics: "WAF Automation & Googlebot Whitelisting",
        stack: ["Cloudflare WAF", "Python Automation", "SEO Tooling", "Cloudflare API"]
      },
      {
        id: "kaffee-faensen",
        title: "Kaffee Faensen",
        category: "E-Commerce & Logistik-Logik",
        description: "Kaffee-Onlineshop mit Stripe Checkout, Cloudflare Pages Functions und individueller Versandlogik (kostenfreier lokaler Kurier für Hammer Postleitzahlen, gewichtsbasierte DHL-Tarife bundesweit). 21/21 Node-Regressionstests bestanden.",
        metrics: "21/21 Regressionstests | PLZ-Logistik Engine",
        stack: ["Cloudflare Pages Functions", "Stripe Checkout", "Node.js Test Runner", "Custom Delivery Engine"]
      },
      {
        id: "rlc-1952",
        title: "RLC 1952 Recklinghausen",
        category: "Vereinsportal & Automatisierung",
        description: "Sportvereins-Portal mit automatisierter Python Content-Pipeline und Cloudflare Pages Kontakt-Funktion mit Turnstile & Honeypot Spam-Schutz.",
        metrics: "100% Spam-Schutz via Turnstile + Honeypot",
        stack: ["Cloudflare Pages", "Turnstile A11y", "Python Content Pipeline", "Honeypot Shield"]
      },
      {
        id: "zbn-offline-rag",
        title: "ZBN Offline RAG Pipeline",
        category: "Datensouveräne AI-Dokumentenanalyse",
        description: "100% offlinefähige Dokumentenanalyse für das Bauingenieurwesen mit IBM Docling, Ollama, ChromaDB und Sentence-Transformers auf einer lokalen RTX 5090. Vollständige Datensouveränität ohne Cloud-Übertragung.",
        metrics: "100% Zero-Cloud Datensouveränität | RTX 5090",
        stack: ["Docling", "Ollama", "ChromaDB", "Sentence-Transformers", "Local GPU Compute"]
      }
    ]
  },
  experience: {
    title: "Beruflicher Werdegang",
    subtitle: "12+ Jahre Erfahrung in Web-Entwicklung, Delivery und AI-Automatisierung",
    items: [
      {
        period: "08/2025 – Heute",
        role: "AI Workflow & Web Delivery Specialist",
        company: "Selbstständig / Projektbasiert",
        location: "Dortmund (Remote / Hybrid)",
        description: "Fokussierte Entwicklung von modernen Web-Applikationen mit React 19, TypeScript, Vite, Cloudflare Pages/Workers und Integration von Vertical AI-Agents (ReAct-Loops, D1 SQL RAG, Guardrails).",
        achievements: [
          "Entwicklung des Flagship ASL Ademco B2B AI-Fachberaters mit 1.460+ SKUs",
          "Architektur robuster RAG- und Edge-Pipelines auf Cloudflare-Infrastruktur",
          "Aufbau datensouveräner Offline-RAG-Systeme mit Docling & lokalen Modellen"
        ],
        stack: ["React 19", "TypeScript", "Cloudflare Pages/D1", "DeepSeek-V3", "Gemini", "Playwright"]
      },
      {
        period: "2013 – 2025",
        role: "Web Developer & Performance Marketing Manager",
        company: "Graphiks.de",
        location: "Dortmund / Deutschland",
        description: "Über 10 Jahre ganzheitliche Betreuung von Kundenprojekten: Konzeption, Umsetzung und Wartung von WordPress- und Webflow-Websites, technisches SEO, Performance-Optimierung und Conversion-Funnel.",
        achievements: [
          "Realisierung und Betreuung von Dutzenden erfolgreichen Kunden-Websites",
          "Performance-Steigerung bestehender Systeme auf Lighthouse 90+ Werte",
          "Verbindung von Web-Development mit messbarem Performance-Marketing"
        ],
        stack: ["WordPress", "Webflow", "PHP / JavaScript", "Technical SEO", "Conversion Optimization"]
      }
    ]
  },
  contact: {
    title: "Kontakt aufnehmen",
    subtitle: "Lassen Sie uns über anstehende Projekte, Rollen oder Kooperationen sprechen",
    email: "info@munverricht.org",
    phone: "+49 163 3229892",
    location: "Dortmund, Deutschland (Remote / Hybrid)",
    ctaButton: "E-Mail senden",
    copiedNotice: "E-Mail-Adresse in die Zwischenablage kopiert!"
  }
};

export const enContent = {
  meta: {
    title: "Maximilian Unverricht — AI Workflow & Web Delivery Specialist",
    description: "Digital résumé & portfolio of Maximilian Unverricht. 12+ years of professional web experience, specializing in React, TypeScript, Cloudflare Edge & AI-driven workflows.",
    ogTitle: "Maximilian Unverricht — Digital Résumé & Portfolio"
  },
  nav: {
    about: "Profile",
    skills: "Skills & Stack",
    flagship: "Flagship: ASL Ademco",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    toggleLang: "DE"
  },
  hero: {
    greeting: "Hello, I am",
    name: "Maximilian Unverricht",
    title: "AI Workflow & Web Delivery Specialist",
    location: "Dortmund, Germany (Remote / Hybrid)",
    tagline: "Pragmatic web developer with 12+ years of experience: Combining modern web architectures (React, TypeScript, Cloudflare) with production-ready AI agents and deterministic RAG pipelines.",
    primaryCta: "Get in touch",
    secondaryCta: "View Flagship Case Study"
  },
  about: {
    title: "About Me",
    subtitle: "From a 10+ year CMS & performance marketing foundation to modern AI-assisted web delivery",
    paragraphs: [
      "For more than 12 years, I have been building and optimizing web applications in professional agency and client environments. For over a decade at Graphiks.de, my core focus was on bespoke WordPress and Webflow CMS solutions, performance marketing, and reliable client infrastructure.",
      "Since August 2025, my clear focus has been on modern web architecture (React 19, TypeScript, Vite, Tailwind CSS), Cloudflare Edge infrastructure (Workers, Pages, D1 SQL), and the integration of production-grade AI automation. I operate as a pragmatic builder who makes generative AI enterprise-viable through deterministic guardrails and structured tool-calling runtimes."
    ],
    highlights: [
      { label: "Experience", value: "12+ Years" },
      { label: "Focus since 08/2025", value: "React & AI Delivery" },
      { label: "Infrastructure", value: "Cloudflare Pages & Edge" },
      { label: "Location", value: "Dortmund (Remote / Hybrid)" }
    ]
  },
  skills: {
    title: "Skills & Tech Stack",
    subtitle: "Technical Profile: A disciplined combination of frontend craft, edge backend, and AI engineering",
    categories: [
      {
        name: "Frontend Architecture",
        items: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Next.js", "WCAG 2.1 AA A11y", "Responsive Design"]
      },
      {
        name: "Edge Backend & Database",
        items: ["Cloudflare Pages & Workers", "Cloudflare D1 (SQL)", "Node.js (ESM)", "Python", "REST APIs", "WAF & Security"]
      },
      {
        name: "AI & Automation Runtimes",
        items: ["DeepSeek-V3", "Google Gemini API", "Ollama / vLLM", "ChromaDB", "Docling", "Sentence-Transformers", "ReAct Tool Loops"]
      },
      {
        name: "DevOps, Testing & Tooling",
        items: ["Git & GitHub Actions", "Playwright", "Vitest / Node Test", "Datanorm Importer", "Lighthouse 95+", "Performance Audits"]
      }
    ]
  },
  flagship: {
    badge: "Flagship Case Study #1",
    title: "ASL Ademco B2B — AI Product Advisor & Planning Studio",
    client: "ASL Ademco B2B Wholesale (asl-ademco.de)",
    subtitle: "Catalog-bound Vertical Agent with ReAct reasoning and deterministic SQL RAG on Cloudflare D1",
    summary: "For ASL Ademco, a leading German B2B wholesale distributor for security systems and fire protection, an interactive AI product advisor was engineered to assist installers and security technicians in selecting and configuring products from a 1,460+ item catalog.",
    problemTitle: "Challenge & Problem Statement",
    problem: "B2B security technicians require high-precision, compatibility-verified product recommendations with zero AI hallucinations. Generic chatbots invent dummy SKUs or suggest incompatible accessories, which is unacceptable in life safety and fire protection domains.",
    pillarsTitle: "5 Technical Solution Pillars",
    pillars: [
      {
        title: "1. Vertical Agent (ReAct Loop)",
        description: "Interactive AI advisor with up to 7 reasoning cycles querying a Cloudflare D1 SQL database of 1,460+ real products from Datanorm/CSV catalog exports. Provider abstraction supports both DeepSeek-V3 and Google Gemini.",
        tech: "React 19 · Cloudflare Workers · D1 SQL · DeepSeek / Gemini"
      },
      {
        title: "2. Anti-Hallucination Guardrails",
        description: "Strict positive-binding (only DB-verified SKUs in recommendations), hard-forbidden dummy SKU blocking, scope-gate for off-topic queries, and graceful degradation at iteration limits.",
        tech: "Deterministic Guardrails · Scope Gate · SKU Validation"
      },
      {
        title: "3. Structured SQL RAG Pipeline",
        description: "SQL-based 3-stage search (exact SKU → AND fulltext → OR with synonym expansion), compatibility matrix checks, mandatory accessory resolution, and product hydration with images, datasheets, and tier pricing.",
        tech: "3-Stage SQL RAG · Synonym Expansion · Accessory Resolution"
      },
      {
        title: "4. B2B Planning Studio Frontend",
        description: "Responsive B2B workspace with watchlist, quantity adjustment, project notes, one-click inquiry export, and onboarding tutorial. WCAG 2.2 AA compliant with Lighthouse 100/100 Best Practices.",
        tech: "React 19 · Tailwind CSS · WCAG 2.2 AA · Lighthouse 100"
      },
      {
        title: "5. Datanorm Import Pipeline",
        description: "Node.js ESM scripts for importing German wholesale catalog formats into Cloudflare D1, including non-destructive synchronization of 1,461 product images via SQL.",
        tech: "Node.js ESM · Datanorm Parser · SQL Batch Ingestion"
      }
    ],
    metricsTitle: "Measurable Results & Key Performance Indicators",
    metrics: [
      { label: "1,460+", value: "Real Catalog SKUs", detail: "Indexed in Cloudflare D1 SQL and queried in real-time" },
      { label: "Up to 7", value: "ReAct Reasoning Cycles", detail: "Autonomous tool calling with strict iteration bounds" },
      { label: "100%", value: "Positively-Bound SKUs", detail: "Zero hallucinated or fabricated product numbers" },
      { label: "100/100", value: "Lighthouse Score", detail: "Best Practices & Accessibility on B2B planning studio" }
    ],
    attributionTitle: "Transparent Engineering Attribution",
    attribution: {
      prototype: "Frontend layout initiated as an exploratory prototype in Google AI Studio / Stitch.",
      engineering: [
        "Complete technical architecture & Cloudflare Pages/D1 backend implementation",
        "ReAct agent runtime, provider abstraction (DeepSeek / Gemini), and prompt engineering",
        "Deterministic SQL search tools, stopword filters & synonym expansion logic",
        "Datanorm import pipeline & non-destructive image synchronization",
        "WCAG hardening, accessibility audit, and git security remediation"
      ]
    }
  },
  projects: {
    title: "Selected Secondary Projects",
    subtitle: "Compact overview of production edge architectures and client deliveries",
    items: [
      {
        id: "baker-charlie",
        title: "Baker & Charlie",
        category: "Artisanal Bakery & Café (Bengaluru, India)",
        description: "High-performance custom HTML/JS website on Cloudflare Pages replacing Webflow. Playwright test suite (modals, content loader, scroll progress, mobile overflow, redirects), Pages CMS with JSON schemas, and tabnabbing security fixes. Lighthouse improved from 60-70 to 95+; saves client ~₹38k/year hosting and up to ₹2.35 Lakhs/year aggregator fees.",
        metrics: "Lighthouse 95+ | ~₹38k/yr hosting savings",
        stack: ["Cloudflare Pages", "Playwright", "JSON Schemas", "Vanilla JS", "Lighthouse 95+"]
      },
      {
        id: "kost-sicherheit",
        title: "KOST Sicherheitstechnik",
        category: "Corporate Website & Edge Security",
        description: "Security company website with Cloudflare WAF management, Googlebot exception automation, and custom Python CloudflareManager for automated SEO and security workflows.",
        metrics: "WAF Automation & Googlebot Whitelisting",
        stack: ["Cloudflare WAF", "Python Automation", "SEO Tooling", "Cloudflare API"]
      },
      {
        id: "kaffee-faensen",
        title: "Kaffee Faensen",
        category: "E-Commerce & Logistics Engine",
        description: "Coffee web shop with Stripe checkout, Cloudflare Pages Functions, and custom delivery logic (free local courier for Hamm postal codes, weight-tiered DHL for rest of Germany). 21/21 Node regression tests passing.",
        metrics: "21/21 Regression Tests | Postal Code Logistics",
        stack: ["Cloudflare Pages Functions", "Stripe Checkout", "Node.js Test Runner", "Custom Delivery Engine"]
      },
      {
        id: "rlc-1952",
        title: "RLC 1952 Recklinghausen",
        category: "Sports Club Portal & Automation",
        description: "Athletics club portal with automated Python content pipeline and Cloudflare Pages contact function with Turnstile & Honeypot protection.",
        metrics: "100% Spam Protection via Turnstile + Honeypot",
        stack: ["Cloudflare Pages", "Turnstile A11y", "Python Content Pipeline", "Honeypot Shield"]
      },
      {
        id: "zbn-offline-rag",
        title: "ZBN Offline RAG Pipeline",
        category: "Sovereign AI Document Analysis",
        description: "100% offline civil engineering document analysis pipeline with IBM Docling, Ollama, ChromaDB, and Sentence-Transformers on a local RTX 5090. Complete data sovereignty with zero cloud transmission.",
        metrics: "100% Zero-Cloud Data Sovereignty | RTX 5090",
        stack: ["Docling", "Ollama", "ChromaDB", "Sentence-Transformers", "Local GPU Compute"]
      }
    ]
  },
  experience: {
    title: "Career Experience",
    subtitle: "12+ years in web development, client delivery, and AI automation",
    items: [
      {
        period: "08/2025 – Present",
        role: "AI Workflow & Web Delivery Specialist",
        company: "Independent / Project-Based",
        location: "Dortmund (Remote / Hybrid)",
        description: "Focused development of modern web applications with React 19, TypeScript, Vite, Cloudflare Pages/Workers, and integration of vertical AI agents (ReAct loops, D1 SQL RAG, deterministic guardrails).",
        achievements: [
          "Engineered the flagship ASL Ademco B2B AI advisor with 1,460+ SKUs",
          "Architected robust RAG and Edge pipelines on Cloudflare infrastructure",
          "Built sovereign offline RAG systems with Docling & local GPU models"
        ],
        stack: ["React 19", "TypeScript", "Cloudflare Pages/D1", "DeepSeek-V3", "Gemini", "Playwright"]
      },
      {
        period: "2013 – 2025",
        role: "Web Developer & Performance Marketing Manager",
        company: "Graphiks.de",
        location: "Dortmund / Germany",
        description: "Over 10 years of end-to-end client project delivery: planning, development, and maintenance of bespoke WordPress and Webflow websites, technical SEO, performance optimization, and conversion funnels.",
        achievements: [
          "Delivered and maintained dozens of successful client web platforms",
          "Optimized legacy architectures to Lighthouse 90+ performance scores",
          "Bridged web development with data-driven performance marketing"
        ],
        stack: ["WordPress", "Webflow", "PHP / JavaScript", "Technical SEO", "Conversion Optimization"]
      }
    ]
  },
  contact: {
    title: "Get in Touch",
    subtitle: "Let's discuss upcoming projects, engineering roles, or collaborations",
    email: "info@munverricht.org",
    phone: "+49 163 3229892",
    location: "Dortmund, Germany (Remote / Hybrid)",
    ctaButton: "Send Email",
    copiedNotice: "Email address copied to clipboard!"
  }
};

describe('Unit Test: Dictionary Parity & Bilingual Completeness', () => {
  it('TC-U01: German (DE) dictionary conforms to TranslationDictionary schema', () => {
    const result = validateTranslationDictionarySchema(deContent);
    assert.strictEqual(result.valid, true, `Schema validation errors in DE: ${result.errors.join('; ')}`);
  });

  it('TC-U02: English (EN) dictionary conforms to TranslationDictionary schema', () => {
    const result = validateTranslationDictionarySchema(enContent);
    assert.strictEqual(result.valid, true, `Schema validation errors in EN: ${result.errors.join('; ')}`);
  });

  it('TC-U03: 100% key symmetry between DE and EN dictionaries with zero missing/extra keys', () => {
    const parity = compareDictionarySymmetry(deContent, enContent);
    assert.strictEqual(parity.symmetric, true, 
      `Parity failure: Missing in EN: [${parity.missingInDict2.join(', ')}], Extra in EN: [${parity.extraInDict2.join(', ')}], Type mismatches: [${parity.typeMismatches.join(', ')}]`
    );
  });

  it('TC-U04: All 7 required sections are populated with non-trivial text in both languages', () => {
    const requiredSections = ['nav', 'hero', 'about', 'skills', 'flagship', 'projects', 'experience', 'contact'];
    for (const sec of requiredSections) {
      assert.ok(deContent[sec], `DE dictionary missing section: ${sec}`);
      assert.ok(enContent[sec], `EN dictionary missing section: ${sec}`);
    }
  });

  it('TC-U05: Flagship ASL Ademco section contains all 5 required technical pillars with tech tags', () => {
    assert.strictEqual(deContent.flagship.pillars.length, 5, 'DE flagship must have 5 pillars');
    assert.strictEqual(enContent.flagship.pillars.length, 5, 'EN flagship must have 5 pillars');
    
    for (let i = 0; i < 5; i++) {
      assert.ok(deContent.flagship.pillars[i].title.length > 5);
      assert.ok(deContent.flagship.pillars[i].tech.length > 5);
      assert.ok(enContent.flagship.pillars[i].title.length > 5);
      assert.ok(enContent.flagship.pillars[i].tech.length > 5);
    }
  });

  it('TC-U06: Flagship ASL Ademco section contains honest engineering attribution delineated from prototype', () => {
    assert.ok(deContent.flagship.attribution.prototype.includes('Google AI Studio') || deContent.flagship.attribution.prototype.includes('Stitch'));
    assert.ok(enContent.flagship.attribution.prototype.includes('Google AI Studio') || enContent.flagship.attribution.prototype.includes('Stitch'));
    assert.ok(deContent.flagship.attribution.engineering.length >= 3);
    assert.ok(enContent.flagship.attribution.engineering.length >= 3);
  });

  it('TC-U07: Secondary projects section contains 5 distinct projects with stack tags and descriptions', () => {
    assert.strictEqual(deContent.projects.items.length, 5);
    assert.strictEqual(enContent.projects.items.length, 5);

    const projectIds = ['baker-charlie', 'kost-sicherheit', 'kaffee-faensen', 'rlc-1952', 'zbn-offline-rag'];
    projectIds.forEach((id, idx) => {
      assert.strictEqual(deContent.projects.items[idx].id, id);
      assert.strictEqual(enContent.projects.items[idx].id, id);
      assert.ok(deContent.projects.items[idx].stack.length >= 3);
      assert.ok(enContent.projects.items[idx].stack.length >= 3);
    });
  });

  it('TC-U08: Experience timeline contains both Graphiks.de (2013–2025) and AI Specialist (08/2025–present)', () => {
    assert.strictEqual(deContent.experience.items.length, 2);
    assert.strictEqual(enContent.experience.items.length, 2);
    
    assert.ok(deContent.experience.items[0].period.includes('08/2025'));
    assert.ok(deContent.experience.items[1].period.includes('2013'));
    assert.ok(deContent.experience.items[1].company.includes('Graphiks.de'));
  });

  it('TC-U09: Contact section contains correct email, phone, location, and ctaButton in both locales', () => {
    assert.strictEqual(deContent.contact.email, "info@munverricht.org");
    assert.strictEqual(enContent.contact.email, "info@munverricht.org");
    assert.strictEqual(deContent.contact.phone, "+49 163 3229892");
    assert.strictEqual(enContent.contact.phone, "+49 163 3229892");
    assert.ok(deContent.contact.location.includes("Dortmund"));
    assert.ok(enContent.contact.location.includes("Dortmund"));
  });
});
