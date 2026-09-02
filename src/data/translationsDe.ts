/**
 * Canonical German (DE) Translation Dictionary
 * Maximilian Unverricht Digital Résumé & Portfolio
 */

import type { TranslationDictionary } from '../types/i18n';

export const translationsDe: TranslationDictionary = {
  meta: {
    title: "Maximilian Unverricht — AI Workflow & Web Delivery Specialist",
    description: "Digitaler Lebenslauf & Portfolio von Maximilian Unverricht. 12+ Jahre Weberfahrung, Spezialist für React, TypeScript, Cloudflare Edge & AI-gestützte Workflows.",
    ogTitle: "Maximilian Unverricht — Digital Résumé & Portfolio"
  },
  nav: {
    overview: "Übersicht",
    about: "Profil",
    skills: "Skills & Stack",
    flagship: "Flagship: ASL Ademco",
    projects: "Projekte",
    experience: "Werdegang",
    contact: "Kontakt",
    settings: "Einstellungen",
    toggleLang: "EN"
  },
  hero: {
    greeting: "Hallo, ich bin",
    name: "Maximilian Unverricht",
    title: "AI Workflow & Web Delivery Specialist",
    location: "Dortmund, Deutschland (Remote / Hybrid)",
    tagline: "Pragmatischer Web-Entwickler mit 12+ Jahren Erfahrung: Verbindet moderne Web-Architekturen (React, TypeScript, Cloudflare) mit praxiserprobten AI-Agenten und deterministischen RAG-Pipelines.",
    bio: "12+ Jahre professionelle Webentwicklung. Fokus auf React 19, Cloudflare Edge & D1 SQL, ReAct Tool-Calling und deterministische Guardrails ohne KI-Halluzinationen.",
    statsYears: "12+ Jahre Erfahrung",
    statsProjects: "1.460+ Katalog-SKUs",
    statsAccuracy: "100% DB-gebunden",
    primaryCta: "Kontakt aufnehmen",
    secondaryCta: "Flagship Case Study ansehen",
    ctaProjects: "Projekte ansehen",
    ctaContact: "Kontakt aufnehmen"
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
        skills: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Next.js", "WCAG 2.1 AA A11y", "Responsive Design"],
        items: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Next.js", "WCAG 2.1 AA A11y", "Responsive Design"]
      },
      {
        name: "Edge Backend & Database",
        skills: ["Cloudflare Pages & Workers", "Cloudflare D1 (SQL)", "Node.js (ESM)", "Python", "REST APIs", "WAF & Security"],
        items: ["Cloudflare Pages & Workers", "Cloudflare D1 (SQL)", "Node.js (ESM)", "Python", "REST APIs", "WAF & Security"]
      },
      {
        name: "AI & Automation Runtimes",
        skills: ["DeepSeek-V3", "Google Gemini API", "Ollama / vLLM", "ChromaDB", "Docling", "Sentence-Transformers", "ReAct Tool Loops"],
        items: ["DeepSeek-V3", "Google Gemini API", "Ollama / vLLM", "ChromaDB", "Docling", "Sentence-Transformers", "ReAct Tool Loops"]
      },
      {
        name: "DevOps, Testing & Tooling",
        skills: ["Git & GitHub Actions", "Playwright", "Vitest / Node Test", "Datanorm Importer", "Lighthouse 95+", "Performance Audits"],
        items: ["Git & GitHub Actions", "Playwright", "Vitest / Node Test", "Datanorm Importer", "Lighthouse 95+", "Performance Audits"]
      }
    ]
  },
  flagship: {
    badge: "Flagship Case Study #1",
    title: "ASL Ademco B2B — AI-gestützter Produktberater & Planning Studio",
    client: "ASL Ademco B2B Großhandel (asl-ademco.de)",
    role: "Lead Fullstack & AI Agent Engineer",
    subtitle: "Kataloggebundener Vertical Agent mit ReAct-Reasoning und deterministischer SQL-RAG auf Cloudflare D1",
    summary: "Für ASL Ademco, einen führenden deutschen B2B-Großhändler für Sicherheitstechnik und Brandschutz, wurde ein interaktiver AI-Fachberater entwickelt, der Errichter und Techniker bei der Systemkonfiguration und Produktauswahl aus einem 1.460+ Artikel umfassenden Sortiment unterstützt.",
    problemTitle: "Herausforderung & Problemstellung",
    problem: "B2B-Sicherheitsinstallateure benötigen hochpräzise, kompatibilitätsgeprüfte Produktempfehlungen ohne KI-Halluzinationen. Standard-Chatbots erfinden Artikelnummern oder empfehlen inkompatible Komponenten, was im Brandschutz und der Einbruchmeldetechnik inakzeptabel ist.",
    reactLoopTitle: "ReAct Reasoning Loop (Bis zu 7 Zyklen)",
    reactLoopDesc: "Schrittweise autonome Tool-Aufrufe gegen Cloudflare D1 SQL mit strikter Iterationsbegrenzung und Verifikation.",
    sqlPlaygroundTitle: "Cloudflare D1 SQL Playground",
    sqlPlaygroundDesc: "Interaktive Inspektion von D1 SQLite Tabellen, Indizes und deterministischen 3-Stufen-Suchabfragen.",
    pillarsTitle: "5 Technische Lösungssäulen",
    pillars: [
      {
        title: "1. Vertical Agent (ReAct Loop)",
        desc: "Interaktiver AI-Berater mit bis zu 7 Reasoning-Zyklen. Fragt eine Cloudflare D1 SQL-Datenbank mit 1.460+ Artikeln aus Datanorm/CSV-Exporten ab. Provider-Abstraktion für DeepSeek-V3 und Google Gemini.",
        description: "Interaktiver AI-Berater mit bis zu 7 Reasoning-Zyklen. Fragt eine Cloudflare D1 SQL-Datenbank mit 1.460+ Artikeln aus Datanorm/CSV-Exporten ab. Provider-Abstraktion für DeepSeek-V3 und Google Gemini.",
        tech: "React 19 · Cloudflare Workers · D1 SQL · DeepSeek / Gemini"
      },
      {
        title: "2. Anti-Halluzinations-Guardrails",
        desc: "Strikte Positiv-Bindung (nur datenbankverifizierte SKUs), Hard-Block gegen Phantasie-Artikelnummern, Scope-Gate gegen Off-Topic-Anfragen und kontrolliertes Graceful Degradation bei Iterationsgrenzen.",
        description: "Strikte Positiv-Bindung (nur datenbankverifizierte SKUs), Hard-Block gegen Phantasie-Artikelnummern, Scope-Gate gegen Off-Topic-Anfragen und kontrolliertes Graceful Degradation bei Iterationsgrenzen.",
        tech: "Deterministic Guardrails · Scope Gate · SKU Validation"
      },
      {
        title: "3. Strukturierte SQL-RAG-Pipeline",
        desc: "3-stufige SQL-Suche (Exakte SKU → AND-Volltext → OR mit Synonym-Expansion), Kompatibilitätsmatrix-Prüfung, automatische Zubehör-Auflösung und Detail-Hydration mit Bildern, Datenblättern und Staffelpreisen.",
        description: "3-stufige SQL-Suche (Exakte SKU → AND-Volltext → OR mit Synonym-Expansion), Kompatibilitätsmatrix-Prüfung, automatische Zubehör-Auflösung und Detail-Hydration mit Bildern, Datenblättern und Staffelpreisen.",
        tech: "3-Stage SQL RAG · Synonym Expansion · Accessory Resolution"
      },
      {
        title: "4. B2B Planning Studio Frontend",
        desc: "Responsiver B2B-Arbeitsplatz mit Merkliste, Mengenanpassung, Projektnotizen, 1-Klick-Anfrageexport und Onboarding-Tutorial. WCAG 2.2 AA konform und Lighthouse 100/100 Best Practices.",
        description: "Responsiver B2B-Arbeitsplatz mit Merkliste, Mengenanpassung, Projektnotizen, 1-Klick-Anfrageexport und Onboarding-Tutorial. WCAG 2.2 AA konform und Lighthouse 100/100 Best Practices.",
        tech: "React 19 · Tailwind CSS · WCAG 2.2 AA · Lighthouse 100"
      },
      {
        title: "5. Datanorm Import-Pipeline",
        desc: "Node.js ESM-Skripte für den Import deutscher Großhandels-Katalogformate in Cloudflare D1, inklusive nicht-destruktiver Aktualisierung von 1.461 Produktbildern via SQL.",
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
    genreAll: "Alle Projekte",
    genreEdge: "Edge & Fullstack",
    genreAi: "AI & RAG",
    genreInfra: "Security & Infra",
    items: [
      {
        id: "baker-charlie",
        title: "Baker & Charlie",
        category: "Artisanal Bakery & Café (Bengaluru, Indien)",
        client: "Baker & Charlie Artisan Bakery",
        year: "2024",
        description: "Performante Custom HTML/JS-Website auf Cloudflare Pages als Webflow-Ablösung. Playwright Test-Suite (Modals, Content-Loader, Scroll-Progress, Mobile Overflow, Redirects), Pages CMS mit JSON-Schemas und Tabnabbing-Security-Fixes. Lighthouse von 60-70 auf 95+ gesteigert; spart ~38.000 ₹/Jahr Hosting und bis zu 2,35 Lakhs ₹/Jahr Lieferplattform-Provisionen.",
        architecture: "Cloudflare Pages Static SPA + Pages CMS JSON Schemas + Playwright E2E",
        technologies: ["Cloudflare Pages", "Playwright", "JSON Schemas", "Vanilla JS", "Lighthouse 95+"],
        metrics: "Lighthouse 95+ | ~38k ₹/Jahr Hostingerparnis",
        stack: ["Cloudflare Pages", "Playwright", "JSON Schemas", "Vanilla JS", "Lighthouse 95+"],
        impact: "Spart ~38.000 ₹/Jahr Hosting und bis zu 2,35 Lakhs ₹/Jahr Aggregator-Gebühren."
      },
      {
        id: "kost-sicherheit",
        title: "KOST Sicherheitstechnik",
        category: "Unternehmenswebsite & Edge Security",
        client: "KOST Sicherheitstechnik GmbH",
        year: "2024",
        description: "Sicherheitstechnik-Website mit Cloudflare WAF-Management, Googlebot-Ausnahmeautomation und individuellem Python CloudflareManager für automatisierte SEO- und Sicherheits-Workflows.",
        architecture: "Cloudflare WAF Custom Rules + Python CloudflareManager REST API v4",
        technologies: ["Cloudflare WAF", "Python Automation", "SEO Tooling", "Cloudflare API"],
        metrics: "WAF Automation & Googlebot Whitelisting",
        stack: ["Cloudflare WAF", "Python Automation", "SEO Tooling", "Cloudflare API"],
        impact: "100% Eliminierung bösartiger Bot-Zugriffe bei unterbrechungsfreiem Googlebot-Crawling."
      },
      {
        id: "kaffee-faensen",
        title: "Kaffee Faensen",
        category: "E-Commerce & Logistik-Logik",
        client: "Kaffee Faensen Spezialitätenrösterei",
        year: "2024",
        description: "Kaffee-Onlineshop mit Stripe Checkout, Cloudflare Pages Functions und individueller Versandlogik (kostenfreier lokaler Kurier für Hammer Postleitzahlen, gewichtsbasierte DHL-Tarife bundesweit). 21/21 Node-Regressionstests bestanden.",
        architecture: "Cloudflare Pages Functions Edge API + Stripe Checkout Webhooks + Custom Courier Router",
        technologies: ["Cloudflare Pages Functions", "Stripe Checkout", "Node.js Test Runner", "Custom Delivery Engine"],
        metrics: "21/21 Regressionstests | PLZ-Logistik Engine",
        stack: ["Cloudflare Pages Functions", "Stripe Checkout", "Node.js Test Runner", "Custom Delivery Engine"],
        impact: "Zero SaaS-Monatsgebühren, maßgeschneiderte lokale Elektrofahrzeug-Lieferung."
      },
      {
        id: "rlc-1952",
        title: "RLC 1952 Recklinghausen",
        category: "Vereinsportal & Automatisierung",
        client: "Recklinghäuser LC 1952 e.V.",
        year: "2024",
        description: "Sportvereins-Portal mit automatisierter Python Content-Pipeline und Cloudflare Pages Kontakt-Funktion mit Turnstile & Honeypot Spam-Schutz.",
        architecture: "Cloudflare Pages Static + Python PDF Meeting Parser + Turnstile Honeypot",
        technologies: ["Cloudflare Pages", "Turnstile A11y", "Python Content Pipeline", "Honeypot Shield"],
        metrics: "100% Spam-Schutz via Turnstile + Honeypot",
        stack: ["Cloudflare Pages", "Turnstile A11y", "Python Content Pipeline", "Honeypot Shield"],
        impact: "Ergebnisveröffentlichung von 48 Stunden auf unter 5 Minuten reduziert."
      },
      {
        id: "zbn-offline-rag",
        title: "ZBN Offline RAG Pipeline",
        category: "Datensouveräne AI-Dokumentenanalyse",
        client: "Ziviltechniker & Bauingenieure",
        year: "2025",
        description: "100% offlinefähige Dokumentenanalyse für das Bauingenieurwesen mit IBM Docling, Ollama, ChromaDB und Sentence-Transformers auf einer lokalen RTX 5090. Vollständige Datensouveränität ohne Cloud-Übertragung.",
        architecture: "IBM Docling Multimodal Layout + ChromaDB + Ollama DeepSeek-R1 auf RTX 5090 (32GB VRAM)",
        technologies: ["Docling", "Ollama", "ChromaDB", "Sentence-Transformers", "Local GPU Compute"],
        metrics: "100% Zero-Cloud Datensouveränität | RTX 5090",
        stack: ["Docling", "Ollama", "ChromaDB", "Sentence-Transformers", "Local GPU Compute"],
        impact: "Air-gapped Analyse vertraulicher Statikpläne und DIN-Normen ohne Cloud-Risiko."
      }
    ]
  },
  experience: {
    title: "Beruflicher Werdegang",
    subtitle: "12+ Jahre Erfahrung in Web-Entwicklung, Delivery und AI-Automatisierung",
    timeline: [
      {
        period: "08/2025 – Heute",
        title: "AI Workflow & Web Delivery Specialist",
        company: "Selbstständig / Projektbasiert",
        description: "Fokussierte Entwicklung von modernen Web-Applikationen mit React 19, TypeScript, Vite, Cloudflare Pages/Workers und Integration von Vertical AI-Agents (ReAct-Loops, D1 SQL RAG, Guardrails).",
        highlights: [
          "Entwicklung des Flagship ASL Ademco B2B AI-Fachberaters mit 1.460+ SKUs",
          "Architektur robuster RAG- und Edge-Pipelines auf Cloudflare-Infrastruktur",
          "Aufbau datensouveräner Offline-RAG-Systeme mit Docling & lokalen Modellen"
        ]
      },
      {
        period: "2013 – 2025",
        title: "Web Developer & Performance Marketing Manager",
        company: "Graphiks.de",
        description: "Über 10 Jahre ganzheitliche Betreuung von Kundenprojekten: Konzeption, Umsetzung und Wartung von WordPress- und Webflow-Websites, technisches SEO, Performance-Optimierung und Conversion-Funnel.",
        highlights: [
          "Realisierung und Betreuung von Dutzenden erfolgreichen Kunden-Websites",
          "Performance-Steigerung bestehender Systeme auf Lighthouse 90+ Werte",
          "Verbindung von Web-Development mit messbarem Performance-Marketing"
        ]
      }
    ],
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
  settings: {
    title: "Design- & Theme-Einstellungen",
    palettes: "Farbpaletten",
    modes: "Anzeigemodus",
    light: "Hell",
    sepia: "Sepia",
    dark: "Dunkel",
    fontSize: "Schriftgröße",
    fontSizeReset: "Zurücksetzen",
    contrast: "Kontrast",
    lowContrastLabel: "Reduzierter Kontrast"
  },
  contact: {
    title: "Kontakt aufnehmen",
    subtitle: "Lassen Sie uns über anstehende Projekte, Rollen oder Kooperationen sprechen",
    email: "info@munverricht.org",
    phone: "+49 163 3229892",
    location: "Dortmund, Deutschland (Remote / Hybrid)",
    github: "https://github.com/munverricht",
    imprint: "Impressum & Datenschutz",
    ctaButton: "E-Mail senden",
    copiedNotice: "E-Mail-Adresse in die Zwischenablage kopiert!"
  },
  imprint: {
    title: "Impressum & Rechtliche Hinweise",
    subtitle: "Angaben gemäß § 5 TMG und Verantwortlichkeit für den Inhalt",
    content: "Maximilian Unverricht, Dortmund, Deutschland. Kontakt: info@munverricht.org",
    sections: [
      {
        heading: "Angaben gemäß § 5 TMG",
        text: "Maximilian Unverricht\nAI Workflow & Web Delivery Specialist\nDortmund, Deutschland\nE-Mail: info@munverricht.org\nTelefon: +49 163 3229892"
      },
      {
        heading: "Haftung für Inhalte & Urheberrecht",
        text: "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht."
      },
      {
        heading: "Datenschutz & Hosting",
        text: "Diese Website wird statisch auf Cloudflare Pages gehostet. Es werden keine Tracking-Cookies gesetzt und keine personenbezogenen Daten ohne Ihre ausdrückliche Kontaktaufnahme gespeichert."
      }
    ]
  }
};

export const de = translationsDe;
