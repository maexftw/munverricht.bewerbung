/**
 * Secondary Projects Dataset (5 Selected Production & Edge Deliveries)
 * Maximilian Unverricht Digital Résumé & Portfolio
 */

import type { SecondaryProject } from '../types/project';

export const secondaryProjectsData: SecondaryProject[] = [
  {
    id: "baker-charlie",
    title: "Baker & Charlie",
    client: "Baker & Charlie Artisan Bakery & Pâtisserie",
    year: "2024",
    domain: "Artisanal Bakery & Specialty Café Platform (Bengaluru, Indien)",
    category: "edge",
    description: "Performante Custom HTML/JS-Website auf Cloudflare Pages als Webflow-Ablösung. Playwright Test-Suite (Modals, Content-Loader, Scroll-Progress, Mobile Overflow, Redirects), Pages CMS mit JSON-Schemas und Tabnabbing-Security-Fixes. Lighthouse von 60-70 auf 95+ gesteigert; spart ~38.000 ₹/Jahr Hosting und bis zu 2,35 Lakhs ₹/Jahr Lieferplattform-Provisionen.",
    objectives: [
      "Vollständige Ablösung der teuren Webflow SaaS-Hostinggebühren (~38.000 ₹/Jahr)",
      "Reduktion hoher Lieferplattform-Provisionen (Zomato/Swiggy 20-25%) durch direkte Kundenbestellungen",
      "Maximale Ladezeit-Optimierung für mobile indische Netzwerke (Lighthouse 95+)"
    ],
    architecture: "Statische Single-Page Application auf Cloudflare Pages Global CDN, Pages CMS mit typisierten JSON Schemas für Mitarbeiter-Menüpflege, automatisierte Playwright E2E-Regressionstests.",
    architecturePillars: [
      "Static Cloudflare Pages Hosting",
      "Headless Pages CMS mit JSON Schemas",
      "Playwright Automated Regression Suite",
      "Tabnabbing Security & SEO Redirect Engine"
    ],
    stack: [
      "Cloudflare Pages",
      "Playwright",
      "JSON Schemas",
      "Vanilla JS",
      "HTML5 / CSS3",
      "Lighthouse 95+"
    ],
    metrics: "Lighthouse 95+ | ~38k ₹/Jahr Hostingerparnis | Bis zu 2,35L ₹/Jahr Provisionsersparnis",
    keyLearnings: "Statische Web-Architekturen mit Git-basiertem Headless CMS übertreffen monolithische Visual Builder in Ladezeiten, Betriebskosten und Zuverlässigkeit um ein Vielfaches.",
    highlights: [
      "Lighthouse Performance Score von 60-70 auf 95+ gesteigert",
      "Automatisierte Playwright E2E-Tests für alle interaktiven Modaldialoge & Redirects",
      "Behebung kritischer Tabnabbing-Schwachstellen (rel='noopener noreferrer')"
    ],
    links: [
      { label: "Case Study & Architecture", url: "#projects" }
    ]
  },
  {
    id: "kost-sicherheit",
    title: "KOST Sicherheitstechnik",
    client: "KOST Sicherheitstechnik GmbH",
    year: "2024",
    domain: "Unternehmenswebsite & Edge Infrastructure (Dortmund / NRW)",
    category: "infra",
    description: "Sicherheitstechnik-Website mit Cloudflare WAF-Management, Googlebot-Ausnahmeautomation und individuellem Python CloudflareManager für automatisierte SEO- und Sicherheits-Workflows.",
    objectives: [
      "Schutz vor aggressiven Bot-Angriffen und Content-Scraping",
      "Automatisierte Whitelist-Pflege verifizierter Googlebot- und Bingbot-IPs zur Vermeidung von SEO-Deindexierungen",
      "Programmatische WAF-Regelverwaltung über Cloudflare REST API v4"
    ],
    architecture: "Cloudflare WAF Custom Security Rules mit vorgeschalteter Bot-Challenge und einem in Python 3.11 geschriebenen 'CloudflareManager' CLI zur Verifikation von Suchmaschinen-Crawlern.",
    architecturePillars: [
      "Cloudflare WAF Rate Limiting & Firewall Rules",
      "Python 3.11 CloudflareManager CLI Tool",
      "Reverse DNS Verification für Googlebot/Bingbot",
      "Zero-Downtime DNS & Security Policy Sync"
    ],
    stack: [
      "Cloudflare WAF",
      "Python Automation",
      "SEO Tooling",
      "Cloudflare API",
      "REST",
      "JSON Automation"
    ],
    metrics: "WAF Automation & Googlebot Whitelisting | 100% Bot-Abwehr",
    keyLearnings: "Aggressive Sicherheitsregeln an der Edge erfordern eine automatisierte Validierung von Suchmaschinen-Crawlern, um Kollateralschäden im organischen SEO-Ranking zu verhindern.",
    highlights: [
      "100% Eliminierung bösartiger Traffic-Spitzen ohne False-Positives bei echten Crawlern",
      "Wöchentliche automatisierte Regelvalidierung ohne manuellen Pflegeaufwand"
    ],
    links: [
      { label: "Architecture Overview", url: "#projects" }
    ]
  },
  {
    id: "kaffee-faensen",
    title: "Kaffee Faensen",
    client: "Kaffee Faensen Spezialitätenrösterei",
    year: "2024",
    domain: "E-Commerce & Regionale Logistik-Logik (Hamm, Deutschland)",
    category: "edge",
    description: "Kaffee-Onlineshop mit Stripe Checkout, Cloudflare Pages Functions und individueller Versandlogik (kostenfreier lokaler Kurier für Hammer Postleitzahlen, gewichtsbasierte DHL-Tarife bundesweit). 21/21 Node-Regressionstests bestanden.",
    objectives: [
      "Aufbau eines wartungsarmen E-Commerce-Shops ohne fixe monatliche Shopify-Gebühren",
      "Implementierung einer maßgeschneiderten lokalen Kurier-Lieferung per Elektrofahrzeug für Hammer PLZ-Gebiete",
      "Nahtlose Integration der Stripe Checkout API mit gewichtsgestaffelten DHL-Versandtarifen"
    ],
    architecture: "Serverless Cloudflare Pages Functions Edge API zur Validierung von Warenkorbgewichten und dynamischer Berechnung der Lieferkonditionen nach PLZ-Zonen mit Stripe Webhooks.",
    architecturePillars: [
      "Cloudflare Pages Functions Edge Runtime",
      "Stripe Checkout & Webhook Pipeline",
      "Postleitzahlen-basierte Logik-Engine (PLZ 59063-59077)",
      "21/21 Node.js Automated Regression Test Suite"
    ],
    stack: [
      "Cloudflare Pages Functions",
      "Stripe Checkout",
      "Node.js Test Runner",
      "Custom Delivery Engine",
      "TypeScript",
      "Stripe Webhooks"
    ],
    metrics: "21/21 Regressionstests | PLZ-Logistik Engine | 0 € monatliche SaaS-Fixkosten",
    keyLearnings: "Edge Functions bieten ausreichend Rechenkapazität für hochgradig individualisierte regionale Versandlogiken im Mittelstand und machen teure E-Commerce-SaaS-Plattformen überflüssig.",
    highlights: [
      "21 von 21 Regressionstests erfolgreich mit 100% Testabdeckung der Versandberechnung",
      "Vollständiges Pay-as-you-go Kostenmodell ohne Plattform-Abonnements"
    ],
    links: [
      { label: "Shop Architecture Details", url: "#projects" }
    ]
  },
  {
    id: "rlc-1952",
    title: "RLC 1952 Recklinghausen",
    client: "Recklinghäuser Leichtathletik-Club 1952 e.V.",
    year: "2024",
    domain: "Sportvereinsportal & Content-Automatisierung (Recklinghausen)",
    category: "infra",
    description: "Sportvereins-Portal mit automatisierter Python Content-Pipeline und Cloudflare Pages Kontakt-Funktion mit Turnstile & Honeypot Spam-Schutz.",
    objectives: [
      "Automatisierung der Veröffentlichung von Wettkampfergebnissen aus Wettkampf-PDFs",
      "Effektive Eliminierung von Formular-Spam ohne unzugängliche Bild-Captchas",
      "Barrierefreie und mobile Optimierung für Vereinsmitglieder aller Altersgruppen"
    ],
    architecture: "Python-basierte Parsing-Pipeline für Wettkampf-Ergebnislisten (PDF zu Markdown), Cloudflare Pages Hosting und barrierefreie Cloudflare Turnstile Integration mit HoneyPot-Falle.",
    architecturePillars: [
      "Python PDF Ingestion Pipeline",
      "Cloudflare Turnstile Accessible Protection",
      "Hidden Honeypot Defense Layer",
      "WCAG 2.1 AA A11y & Mobile First Layout"
    ],
    stack: [
      "Cloudflare Pages",
      "Turnstile A11y",
      "Python Content Pipeline",
      "Honeypot Shield",
      "Accessible CSS",
      "HTML5"
    ],
    metrics: "100% Spam-Schutz via Turnstile + Honeypot | Veröffentlichungszeit: 48h -> 5 Min",
    keyLearnings: "Datenschutzfreundliche Turnstile-Validierung in Kombination mit unsichtbaren Honeypots bietet einen 100%igen Spamschutz bei optimaler Barrierefreiheit für ältere Nutzer.",
    highlights: [
      "Veröffentlichungszyklus für Wettkampfergebnisse von 48 Stunden auf unter 5 Minuten gesenkt",
      "Null Spam-Einträge bei 100% Benutzerfreundlichkeit"
    ],
    links: [
      { label: "Club Portal Info", url: "#projects" }
    ]
  },
  {
    id: "zbn-offline-rag",
    title: "ZBN Offline RAG Pipeline",
    client: "Ziviltechniker & Bauingenieure",
    year: "2025",
    domain: "Datensouveräne AI-Dokumentenanalyse (Dortmund, Deutschland)",
    category: "ai",
    description: "100% offlinefähige Dokumentenanalyse für das Bauingenieurwesen mit IBM Docling, Ollama, ChromaDB und Sentence-Transformers auf einer lokalen RTX 5090. Vollständige Datensouveränität ohne Cloud-Übertragung.",
    objectives: [
      "Air-gapped Dokumentenanalyse vertraulicher Statikberechnungen, Baupläne und DIN-Normen",
      "Garantierte 100%ige Datensouveränität ohne externe Cloud-API-Aufrufe",
      "Präzise multimodale Extraktion komplexer Tabellen und Formeln aus Bauakten"
    ],
    architecture: "Lokale multimodale Extraktions-Pipeline mit IBM Docling, lokaler ChromaDB Vektordatenbank mit bge-m3 Embeddings und Ollama/vLLM LLM-Inferenz auf dedizierter NVIDIA GeForce RTX 5090 (32GB VRAM).",
    architecturePillars: [
      "IBM Docling Multimodal Layout & Table Extraction",
      "ChromaDB Local Vector Store mit bge-m3 Embeddings",
      "Ollama / vLLM Inferenz (DeepSeek-R1 / Llama-3.3)",
      "NVIDIA GeForce RTX 5090 CUDA Acceleration"
    ],
    stack: [
      "Docling",
      "Ollama",
      "ChromaDB",
      "Sentence-Transformers",
      "Local GPU Compute",
      "Python 3.11",
      "RTX 5090"
    ],
    metrics: "100% Zero-Cloud Datensouveränität | RTX 5090 (32GB VRAM) | 500+ Seiten Baugutachten",
    keyLearnings: "Die Kombination aus fortgeschrittenem Multimodal-Parsing (Docling) und hochperformanten lokalen Open-Weight Modellen ermöglicht vollwertige Enterprise-RAG-Systeme im streng geschützten Ingenieurbereich.",
    highlights: [
      "Vollständige Geheimhaltung und DSGVO-Konformität ohne Cloud-Sicherheitsrisiken",
      "Zuverlässige Extraktion verschachtelter Tabellen und statischer Formelblätter"
    ],
    links: [
      { label: "Offline AI Architecture", url: "#projects" }
    ]
  }
];
