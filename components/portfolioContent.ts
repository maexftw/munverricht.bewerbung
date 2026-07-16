export type Language = 'de' | 'en';

export type CaseKey = 'asl' | 'documents' | 'faensen';

export type CaseContent = {
  key: CaseKey;
  path: string;
  index: string;
  title: string;
  short: string;
  category: string;
  problem: string;
  approach: string;
  result: string;
  proof: string[];
  flow: string[];
  image?: string;
};

export const cases: Record<Language, CaseContent[]> = {
  de: [
    {
      key: 'asl',
      path: '/case/asl-ademco-agent',
      index: '01',
      title: 'ASL Ademco B2B Fachassistent',
      category: 'AI Workflow · B2B Produktberatung',
      short: 'Produktsuche, Spezifikationsprüfung, Zubehör und Projektvorschläge als nachvollziehbarer AI-Web-Prototyp.',
      problem: 'Fachpartner brauchen schnelle Orientierung in Produktdaten und Spezifikationen, ohne dass ein allgemeiner Shop-Chat falsche Sicherheit erzeugt.',
      approach: 'Eine separate React/Vite-Strecke verbindet eine serverseitige Agent-API, Produktdaten, LLM-Routing, Guardrails und klare B2B-Antwortwege.',
      result: 'Ein prüfbarer Produktprototyp mit Frontend, Gatekeeping und dokumentierter QA. Bestehende Evidenz wird sichtbar von neu zu prüfenden Live-Claims getrennt.',
      proof: ['React/Vite Studio', 'Agent API', 'Produktdaten', 'Guardrails', 'Mobile UI', 'QA dokumentiert'],
      flow: ['React/Vite Studio', 'Agent API', 'Produktdaten', 'LLM Route', 'Sichere B2B Antwort'],
    },
    {
      key: 'documents',
      path: '/case/local-document-workflow',
      index: '02',
      title: 'Lokaler Dokumenten-Workflow',
      category: 'Local AI · Datensouveränität',
      short: 'PDF rein. Struktur, Prüfung und kontrollierte Ausgabe lokal.',
      problem: 'Dokumente mussten strukturiert ausgewertet werden, ohne sensible Inhalte unnötig in externe Cloud-Dienste zu geben.',
      approach: 'Ein lokaler Workflow zerlegt Dokumente, prüft extrahierte Felder und erzeugt eine nachvollziehbare strukturierte Ausgabe.',
      result: 'Ein wiederholbarer Ablauf, der lokale Modellnutzung, Validierung und Datenkontrolle praktisch zusammenführt.',
      proof: ['Lokale Verarbeitung', 'PDF-Workflow', 'Validierung', 'Strukturierte Ausgabe'],
      flow: ['PDF Input', 'Lokale Extraktion', 'Struktur', 'Validierung', 'JSON Output'],
    },
    {
      key: 'faensen',
      path: '/case/kaffee-faensen-commerce',
      index: '03',
      title: 'Kaffee Faensen Commerce',
      category: 'Commerce · Web Delivery',
      short: 'Individuelle Shop-Logik, Stripe und eine markengerechte Conversion-Strecke.',
      problem: 'Eine Standard-Shopstruktur passte nicht zu den konkreten Produkt-, Marken- und Prozessanforderungen.',
      approach: 'Die Commerce-Strecke wurde um die tatsächliche Produktauswahl gebaut und mit Stripe als Zahlungsweg verbunden.',
      result: 'Mehr Kontrolle über den Verkaufsablauf und eine tragfähige Basis für spätere Erweiterungen.',
      proof: ['Custom Shop Logic', 'Stripe', 'Conversion UX', 'Brand Delivery'],
      flow: ['Produktwahl', 'Warenkorb', 'Stripe Checkout', 'Bestätigung', 'Übergabe'],
      image: '/screenshots/kaffee-faensen.webp',
    },
  ],
  en: [
    {
      key: 'asl',
      path: '/case/asl-ademco-agent',
      index: '01',
      title: 'ASL Ademco B2B Assistant',
      category: 'AI Workflow · B2B Product Guidance',
      short: 'Product search, specification checks, accessories, and project suggestions shaped into a traceable AI web prototype.',
      problem: 'Trade partners need fast orientation across product data and specifications without a general shop chat creating false confidence.',
      approach: 'A dedicated React/Vite surface connects a server-side agent API, product data, LLM routing, guardrails, and focused B2B answer paths.',
      result: 'A verifiable product prototype with frontend, gatekeeping, and documented QA. Existing evidence stays visibly separate from live claims that need a rerun.',
      proof: ['React/Vite Studio', 'Agent API', 'Product data', 'Guardrails', 'Mobile UI', 'QA documented'],
      flow: ['React/Vite Studio', 'Agent API', 'Product data', 'LLM Route', 'Safe B2B answer'],
    },
    {
      key: 'documents',
      path: '/case/local-document-workflow',
      index: '02',
      title: 'Local Document Workflow',
      category: 'Local AI · Data Sovereignty',
      short: 'PDF in. Structure, validation, and controlled local output.',
      problem: 'Documents needed structured analysis without sending sensitive contents to unnecessary external cloud services.',
      approach: 'A local workflow breaks down documents, validates extracted fields, and produces a traceable structured output.',
      result: 'A repeatable process combining local model use, validation, and data control in practical delivery.',
      proof: ['Local processing', 'PDF workflow', 'Validation', 'Structured output'],
      flow: ['PDF input', 'Local extraction', 'Structure', 'Validation', 'JSON output'],
    },
    {
      key: 'faensen',
      path: '/case/kaffee-faensen-commerce',
      index: '03',
      title: 'Kaffee Faensen Commerce',
      category: 'Commerce · Web Delivery',
      short: 'Custom shop logic, Stripe, and a brand-fit conversion flow.',
      problem: 'A standard shop structure did not match the actual product, brand, and process requirements.',
      approach: 'The commerce flow was built around the real product selection and connected to Stripe for payment.',
      result: 'More control over the purchase journey and a sound base for later extensions.',
      proof: ['Custom shop logic', 'Stripe', 'Conversion UX', 'Brand delivery'],
      flow: ['Product choice', 'Cart', 'Stripe checkout', 'Confirmation', 'Handoff'],
      image: '/screenshots/kaffee-faensen.webp',
    },
  ],
};

export const additionalProjects = [
  { title: 'TriXstar Portfolio', type: 'React / Vite Portfolio', url: 'https://trixstar-portfolio.pages.dev/' },
  { title: 'Fitness Drensteinfurt', type: 'Local Lead Landingpage', url: 'https://fitness-drensteinfurt-v2.pages.dev/', image: '/screenshots/fitnesscenter-drensteinfurt.webp' },
  { title: 'Immo Netzwerk Portal', type: 'React Dashboard Prototype', url: 'https://immonetzwerkportal.pages.dev/' },
  { title: 'Kost Sicherheitstechnik', type: 'Corporate Web Delivery', url: 'https://www.kost-sicherheitstechnik.de/', image: '/screenshots/kost-sicherheitstechnik.webp' },
  { title: 'Bockel-Bartscher', type: 'Corporate Web Delivery', url: 'https://www.bockel-bartscher.de/', image: '/screenshots/bockel-bartscher.webp' },
];

export const labels = {
  de: {
    nav: ['Arbeit', 'Über mich', 'Kontakt'],
    resume: 'Lebenslauf',
    hero: 'Komplexe AI- und Web-Projekte. Verständlich. Testbar. Lieferbar.',
    intro: 'Maximilian Unverricht verbindet 12+ Jahre Web-Praxis mit AI-Workflows, React und zuverlässiger Delivery.',
    caseCta: 'ASL Case ansehen',
    contactCta: 'Direkt kontaktieren',
    workTitle: 'Drei Projekte, die meine Arbeit belegen.',
    moreWork: 'Weitere ausgewählte Arbeit',
    openCase: 'Case öffnen',
    openProject: 'Projekt ansehen',
    aboutTitle: 'Web-Praxis trifft moderne AI-Delivery.',
    about: 'Ich arbeite pragmatisch in kleinen, überprüfbaren Schritten: verstehen, bauen, im Browser testen, sauber übergeben.',
    contactTitle: 'Lass uns über die nächste Aufgabe sprechen.',
    back: 'Alle Projekte',
    problem: 'Ausgangslage',
    approach: 'Ansatz',
    result: 'Was der Case zeigt',
    evidence: 'Belege',
    status: 'Aktueller Status muss vor Live-Claims erneut geprüft werden.',
  },
  en: {
    nav: ['Work', 'About', 'Contact'],
    resume: 'Resume',
    hero: 'Complex AI and web projects. Clear. Testable. Deliverable.',
    intro: 'Maximilian Unverricht combines 12+ years of web practice with AI workflows, React, and reliable delivery.',
    caseCta: 'View ASL case',
    contactCta: 'Contact directly',
    workTitle: 'Three projects that show how I work.',
    moreWork: 'More selected work',
    openCase: 'Open case',
    openProject: 'View project',
    aboutTitle: 'Web practice meets modern AI delivery.',
    about: 'I work pragmatically in small, verifiable steps: understand, build, test in the browser, and hand over cleanly.',
    contactTitle: 'Let’s talk about the next assignment.',
    back: 'All projects',
    problem: 'Context',
    approach: 'Approach',
    result: 'What the case shows',
    evidence: 'Evidence',
    status: 'Current status must be rechecked before publishing live claims.',
  },
} as const;
