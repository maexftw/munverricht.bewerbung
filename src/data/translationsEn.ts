/**
 * Canonical English (EN) Translation Dictionary
 * Maximilian Unverricht Digital Résumé & Portfolio
 */

import type { TranslationDictionary } from '../types/i18n';

export const translationsEn: TranslationDictionary = {
  meta: {
    title: "Maximilian Unverricht — AI Workflow & Web Delivery Specialist",
    description: "Digital résumé & portfolio of Maximilian Unverricht. 12+ years of professional web experience, specializing in React, TypeScript, Cloudflare Edge & AI-driven workflows.",
    ogTitle: "Maximilian Unverricht — Digital Résumé & Portfolio"
  },
  nav: {
    overview: "Overview",
    about: "Profile",
    skills: "Skills & Stack",
    flagship: "Flagship: ASL Ademco",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    settings: "Settings",
    toggleLang: "DE"
  },
  hero: {
    greeting: "Hello, I am",
    name: "Maximilian Unverricht",
    title: "AI Workflow & Web Delivery Specialist",
    location: "Dortmund, Germany (Remote / Hybrid)",
    tagline: "Pragmatic web developer with 12+ years of experience: Focus on React, Cloudflare Edge & deterministic AI agents.",
    bio: "Building web architectures that work. Zero hallucinations, zero slop.",
    statsYears: "12+ Years Experience",
    statsProjects: "1,460+ Catalog SKUs",
    statsAccuracy: "100% Positively-Bound",
    primaryCta: "Get in touch",
    secondaryCta: "View Flagship Case Study",
    ctaProjects: "View Projects",
    ctaContact: "Get in Touch"
  },
  about: {
    title: "About Me",
    subtitle: "From performance marketing to deterministic AI engineering",
    paragraphs: [
      "For more than 12 years, I have been building and optimizing web applications at Graphiks.de. Focus: bespoke CMS, performance marketing, and reliable infrastructure.",
      "Since August 2025, my clear focus has been on React 19, TypeScript, Cloudflare Edge (Workers, Pages, D1 SQL), and deterministic AI agents without hallucinations."
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
    title: "ASL Ademco B2B — AI Product Advisor & Planning Studio",
    client: "ASL Ademco B2B Wholesale (asl-ademco.de)",
    role: "Lead Fullstack & AI Agent Engineer",
    subtitle: "Catalog-bound Vertical Agent with ReAct reasoning and deterministic SQL RAG on Cloudflare D1",
    summary: "For ASL Ademco, a leading German B2B wholesale distributor for security systems and fire protection, an interactive AI product advisor was engineered to assist installers and security technicians in selecting and configuring products from a 1,460+ item catalog.",
    problemTitle: "Challenge & Problem Statement",
    problem: "B2B security technicians require high-precision, compatibility-verified product recommendations with zero AI hallucinations. Generic chatbots invent dummy SKUs or suggest incompatible accessories, which is unacceptable in life safety and fire protection domains.",
    reactLoopTitle: "ReAct Reasoning Loop (Up to 7 Cycles)",
    reactLoopDesc: "Step-by-step autonomous tool calls querying Cloudflare D1 SQL with strict iteration bounds and validation.",
    sqlPlaygroundTitle: "Cloudflare D1 SQL Playground",
    sqlPlaygroundDesc: "Interactive inspection of D1 SQLite tables, schema indexes, and deterministic 3-stage search queries.",
    pillarsTitle: "5 Technical Solution Pillars",
    pillars: [
      {
        title: "1. Vertical Agent (ReAct Loop)",
        desc: "Interactive AI advisor with up to 7 reasoning cycles querying a Cloudflare D1 SQL database of 1,460+ real products from Datanorm/CSV catalog exports. Provider abstraction supports both DeepSeek-V3 and Google Gemini.",
        description: "Interactive AI advisor with up to 7 reasoning cycles querying a Cloudflare D1 SQL database of 1,460+ real products from Datanorm/CSV catalog exports. Provider abstraction supports both DeepSeek-V3 and Google Gemini.",
        tech: "React 19 · Cloudflare Workers · D1 SQL · DeepSeek / Gemini"
      },
      {
        title: "2. Anti-Hallucination Guardrails",
        desc: "Strict positive-binding (only DB-verified SKUs in recommendations), hard-forbidden dummy SKU blocking, scope-gate for off-topic queries, and graceful degradation at iteration limits.",
        description: "Strict positive-binding (only DB-verified SKUs in recommendations), hard-forbidden dummy SKU blocking, scope-gate for off-topic queries, and graceful degradation at iteration limits.",
        tech: "Deterministic Guardrails · Scope Gate · SKU Validation"
      },
      {
        title: "3. Structured SQL RAG Pipeline",
        desc: "SQL-based 3-stage search (exact SKU → AND fulltext → OR with synonym expansion), compatibility matrix checks, mandatory accessory resolution, and product hydration with images, datasheets, and tier pricing.",
        description: "SQL-based 3-stage search (exact SKU → AND fulltext → OR with synonym expansion), compatibility matrix checks, mandatory accessory resolution, and product hydration with images, datasheets, and tier pricing.",
        tech: "3-Stage SQL RAG · Synonym Expansion · Accessory Resolution"
      },
      {
        title: "4. B2B Planning Studio Frontend",
        desc: "Responsive B2B workspace with watchlist, quantity adjustment, project notes, one-click inquiry export, and onboarding tutorial. WCAG 2.2 AA compliant with Lighthouse 100/100 Best Practices.",
        description: "Responsive B2B workspace with watchlist, quantity adjustment, project notes, one-click inquiry export, and onboarding tutorial. WCAG 2.2 AA compliant with Lighthouse 100/100 Best Practices.",
        tech: "React 19 · Tailwind CSS · WCAG 2.2 AA · Lighthouse 100"
      },
      {
        title: "5. Datanorm Import Pipeline",
        desc: "Node.js ESM scripts for importing German wholesale catalog formats into Cloudflare D1, including non-destructive synchronization of 1,461 product images via SQL.",
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
    genreAll: "All Projects",
    genreEdge: "Edge & Fullstack",
    genreAi: "AI & RAG",
    genreInfra: "Security & Infra",
    items: [
      {
        id: "baker-charlie",
        title: "Baker & Charlie",
        category: "Artisanal Bakery & Café (Bengaluru, India)",
        client: "Baker & Charlie Artisan Bakery",
        year: "2024",
        description: "High-performance custom HTML/JS website on Cloudflare Pages replacing Webflow. Playwright test suite (modals, content loader, scroll progress, mobile overflow, redirects), Pages CMS with JSON schemas, and tabnabbing security fixes. Lighthouse improved from 60-70 to 95+; saves client ~₹38k/year hosting and up to ₹2.35 Lakhs/year aggregator fees.",
        architecture: "Cloudflare Pages Static SPA + Pages CMS JSON Schemas + Playwright E2E",
        technologies: ["Cloudflare Pages", "Playwright", "JSON Schemas", "Vanilla JS", "Lighthouse 95+"],
        metrics: "Lighthouse 95+ | ~₹38k/yr hosting savings",
        stack: ["Cloudflare Pages", "Playwright", "JSON Schemas", "Vanilla JS", "Lighthouse 95+"],
        impact: "Saves ~₹38,000/year in Webflow SaaS costs and up to ₹2.35 Lakhs/year in aggregator commissions."
      },
      {
        id: "kost-sicherheit",
        title: "KOST Sicherheitstechnik",
        category: "Corporate Website & Edge Security",
        client: "KOST Sicherheitstechnik GmbH",
        year: "2024",
        description: "Security company website with Cloudflare WAF management, Googlebot exception automation, and custom Python CloudflareManager for automated SEO and security workflows.",
        architecture: "Cloudflare WAF Custom Rules + Python CloudflareManager REST API v4",
        technologies: ["Cloudflare WAF", "Python Automation", "SEO Tooling", "Cloudflare API"],
        metrics: "WAF Automation & Googlebot Whitelisting",
        stack: ["Cloudflare WAF", "Python Automation", "SEO Tooling", "Cloudflare API"],
        impact: "100% elimination of malicious traffic spikes with zero false-positive crawler blocks."
      },
      {
        id: "kaffee-faensen",
        title: "Kaffee Faensen",
        category: "E-Commerce & Logistics Engine",
        client: "Kaffee Faensen Specialty Roastery",
        year: "2024",
        description: "Coffee web shop with Stripe checkout, Cloudflare Pages Functions, and custom delivery logic (free local courier for Hamm postal codes, weight-tiered DHL for rest of Germany). 21/21 Node regression tests passing.",
        architecture: "Cloudflare Pages Functions Edge API + Stripe Checkout Webhooks + Custom Courier Router",
        technologies: ["Cloudflare Pages Functions", "Stripe Checkout", "Node.js Test Runner", "Custom Delivery Engine"],
        metrics: "21/21 Regression Tests | Postal Code Logistics",
        stack: ["Cloudflare Pages Functions", "Stripe Checkout", "Node.js Test Runner", "Custom Delivery Engine"],
        impact: "Zero monthly SaaS platform fees with bespoke local EV delivery routing."
      },
      {
        id: "rlc-1952",
        title: "RLC 1952 Recklinghausen",
        category: "Sports Club Portal & Automation",
        client: "Recklinghäuser LC 1952 e.V.",
        year: "2024",
        description: "Athletics club portal with automated Python content pipeline and Cloudflare Pages contact function with Turnstile & Honeypot protection.",
        architecture: "Cloudflare Pages Static + Python PDF Meeting Parser + Turnstile Honeypot",
        technologies: ["Cloudflare Pages", "Turnstile A11y", "Python Content Pipeline", "Honeypot Shield"],
        metrics: "100% Spam Protection via Turnstile + Honeypot",
        stack: ["Cloudflare Pages", "Turnstile A11y", "Python Content Pipeline", "Honeypot Shield"],
        impact: "Results publishing turnaround reduced from 48 hours to under 5 minutes."
      },
      {
        id: "zbn-offline-rag",
        title: "ZBN Offline RAG Pipeline",
        category: "Sovereign AI Document Analysis",
        client: "Civil & Structural Engineers",
        year: "2025",
        description: "100% offline civil engineering document analysis pipeline with IBM Docling, Ollama, ChromaDB, and Sentence-Transformers on a local RTX 5090. Complete data sovereignty with zero cloud transmission.",
        architecture: "IBM Docling Multimodal Layout + ChromaDB + Ollama DeepSeek-R1 on RTX 5090 (32GB VRAM)",
        technologies: ["Docling", "Ollama", "ChromaDB", "Sentence-Transformers", "Local GPU Compute"],
        metrics: "100% Zero-Cloud Data Sovereignty | RTX 5090",
        stack: ["Docling", "Ollama", "ChromaDB", "Sentence-Transformers", "Local GPU Compute"],
        impact: "Air-gapped analysis of confidential statics calculations and DIN building codes."
      }
    ]
  },
  experience: {
    title: "Career Experience",
    subtitle: "12+ years in web development, client delivery, and AI automation",
    timeline: [
      {
        period: "08/2025 – Present",
        title: "AI Workflow & Web Delivery Specialist",
        company: "Independent / Project-Based",
        description: "Focused development of modern web applications with React 19, TypeScript, Vite, Cloudflare Pages/Workers, and integration of vertical AI agents (ReAct loops, D1 SQL RAG, deterministic guardrails).",
        highlights: [
          "Engineered the flagship ASL Ademco B2B AI advisor with 1,460+ SKUs",
          "Architected robust RAG and Edge pipelines on Cloudflare infrastructure",
          "Built sovereign offline RAG systems with Docling & local GPU models"
        ]
      },
      {
        period: "2013 – 2025",
        title: "Web Developer & Performance Marketing Manager",
        company: "Graphiks.de",
        description: "Over 10 years of end-to-end client project delivery: planning, development, and maintenance of bespoke WordPress and Webflow websites, technical SEO, performance optimization, and conversion funnels.",
        highlights: [
          "Delivered and maintained dozens of successful client web platforms",
          "Optimized legacy architectures to Lighthouse 90+ performance scores",
          "Bridged web development with data-driven performance marketing"
        ]
      }
    ],
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
  settings: {
    title: "Design & Theme Settings",
    palettes: "Color Palettes",
    modes: "Display Mode",
    light: "Light",
    sepia: "Sepia",
    dark: "Dark",
    fontSize: "Font Size",
    fontSizeReset: "Reset",
    contrast: "Contrast",
    lowContrastLabel: "Reduced Contrast"
  },
  contact: {
    title: "Get in Touch",
    subtitle: "Let's discuss upcoming projects, engineering roles, or collaborations",
    email: "info@munverricht.org",
    phone: "+49 163 3229892",
    location: "Dortmund, Germany (Remote / Hybrid)",
    github: "https://github.com/munverricht",
    imprint: "Imprint & Privacy",
    ctaButton: "Send Email",
    copiedNotice: "Email address copied to clipboard!"
  },
  imprint: {
    title: "Legal Notice & Imprint",
    subtitle: "Information pursuant to § 5 TMG and content responsibility",
    content: "Maximilian Unverricht, Dortmund, Germany. Contact: info@munverricht.org",
    sections: [
      {
        heading: "Information according to § 5 TMG",
        text: "Maximilian Unverricht\nAI Workflow & Web Delivery Specialist\nDortmund, Germany\nEmail: info@munverricht.org\nPhone: +49 163 3229892"
      },
      {
        heading: "Liability for Content & Copyright",
        text: "As a service provider, we are responsible for our own content on these pages under general law according to § 7 (1) TMG. The content and works published on these pages are governed by German copyright law."
      },
      {
        heading: "Privacy Policy & Hosting",
        text: "This site is statically hosted on Cloudflare Pages. No tracking cookies are used and no personal information is collected without your explicit contact request."
      }
    ]
  }
};

export const en = translationsEn;
