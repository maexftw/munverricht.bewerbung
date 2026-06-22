export type Language = 'de' | 'en';

export type ProjectSignal = 'commerce' | 'local-business' | 'prototype' | 'delivery';

export type ProjectCase = {
  id: string;
  title: string;
  href: string;
  signal: ProjectSignal;
  featured?: boolean;
  proofLabel: Record<Language, string>;
  constraint: Record<Language, string>;
  build: Record<Language, string>;
  output: Record<Language, string>;
  stack: string[];
};

export const projectSignals: { id: ProjectSignal | 'all'; label: Record<Language, string> }[] = [
  { id: 'all', label: { de: 'Alle', en: 'All' } },
  { id: 'commerce', label: { de: 'Commerce', en: 'Commerce' } },
  { id: 'local-business', label: { de: 'Local Business', en: 'Local Business' } },
  { id: 'prototype', label: { de: 'Prototype', en: 'Prototype' } },
  { id: 'delivery', label: { de: 'Delivery', en: 'Delivery' } },
];

export const projectCases: ProjectCase[] = [
  {
    id: 'kaffee-faensen',
    title: 'Kaffee Faensen Commerce',
    href: 'https://www.kaffee-faensen.de/shop/homepage',
    signal: 'commerce',
    featured: true,
    proofLabel: { de: 'Live-Shop ansehen', en: 'View live shop' },
    constraint: {
      de: 'Die vorhandene Shop-Logik passte nicht zu Produktzuständen, Kaufstrecke und realem Ablauf.',
      en: 'The existing shop logic did not fit the product states, buying flow, and real operating process.',
    },
    build: {
      de: 'Eigene Commerce-Strecke mit Warenkorb, Checkout-Verhalten und Stripe-Anbindung statt Standard-Theme-Kompromiss.',
      en: 'Custom commerce flow with cart, checkout behaviour, and Stripe integration instead of a preset theme compromise.',
    },
    output: {
      de: 'Mehr Kontrolle über Verkaufsfluss, Zahlungsstrecke und spätere Erweiterungen.',
      en: 'More control over the sales flow, payment path, and later extensions.',
    },
    stack: ['Custom Shop Logic', 'Stripe', 'Cart/Checkout', 'Brand UX'],
  },
  {
    id: 'immo-netzwerk',
    title: 'Immo Netzwerk Portal',
    href: 'https://immonetzwerkportal.pages.dev/',
    signal: 'prototype',
    featured: true,
    proofLabel: { de: 'Prototyp ansehen', en: 'View prototype' },
    constraint: {
      de: 'Eine komplexe Plattform-Idee musste früh sichtbar werden, bevor Budget in einen Vollbau fließt.',
      en: 'A complex platform idea needed to become visible before budget went into a full build.',
    },
    build: {
      de: 'React-Prototyp mit Dashboard-Struktur, User-Flows und diskutierbarem Funktionsumfang.',
      en: 'React prototype with dashboard structure, user flows, and discussable feature scope.',
    },
    output: {
      de: 'Schnellere Abstimmung und eine günstigere Entscheidungsbasis für den nächsten Produktschritt.',
      en: 'Faster alignment and a lower-risk basis for the next product step.',
    },
    stack: ['React', 'Dashboard', 'Product Concept', 'Flow Mapping'],
  },
  {
    id: 'kost-sicherheitstechnik',
    title: 'KOST Sicherheitstechnik',
    href: 'https://www.kost-sicherheitstechnik.de/',
    signal: 'delivery',
    featured: true,
    proofLabel: { de: 'Live-Seite ansehen', en: 'View live site' },
    constraint: {
      de: 'Ein technischer Unternehmensauftritt sollte seriöser wirken und lokal besser auffindbar sein.',
      en: 'A technical company site needed to feel more credible and become easier to find locally.',
    },
    build: {
      de: 'Klarere Seitenstruktur, ruhigerer visueller Rahmen und Cloudflare-basierter Betrieb.',
      en: 'Clearer site structure, calmer visual framing, and Cloudflare-based delivery.',
    },
    output: {
      de: 'Weniger technische Reibung, glaubwürdigerer Ersteindruck und bessere Basis für lokale Sichtbarkeit.',
      en: 'Less technical friction, a more credible first impression, and a better base for local visibility.',
    },
    stack: ['Cloudflare Pages', 'Deployment', 'Performance', 'Local SEO'],
  },
  {
    id: 'bockel-bartscher',
    title: 'Bockel-Bartscher',
    href: 'https://www.bockel-bartscher.de/',
    signal: 'local-business',
    proofLabel: { de: 'Live-Seite ansehen', en: 'View live site' },
    constraint: {
      de: 'Kanzlei-Inhalte mussten für Erstbesucher schneller erfassbar und vertrauenswürdiger wirken.',
      en: 'Law firm content needed to be easier to scan and feel more trustworthy for first-time visitors.',
    },
    build: {
      de: 'Ruhige Informationsarchitektur mit klarer Gliederung und nachvollziehbarer Kontaktführung.',
      en: 'Calm information architecture with clear structure and understandable contact guidance.',
    },
    output: {
      de: 'Schnellere Orientierung und ein seriöserer erster Eindruck.',
      en: 'Faster orientation and a more serious first impression.',
    },
    stack: ['Information Architecture', 'Corporate Design', 'Cloudflare Pages'],
  },
  {
    id: 'fitness-drensteinfurt',
    title: 'Fitness Drensteinfurt',
    href: 'https://fitness-drensteinfurt-v2.pages.dev/',
    signal: 'local-business',
    proofLabel: { de: 'Landingpage ansehen', en: 'View landing page' },
    constraint: {
      de: 'Lokale Anfragen sollten unterstützt werden, ohne langen Relaunch oder großes Budget.',
      en: 'Local enquiries needed support without a long rebuild or large budget.',
    },
    build: {
      de: 'Fokussierte Landingpage mit klaren CTAs, kurzer Kontaktstrecke und sortierter Informationshierarchie.',
      en: 'Focused landing page with clear CTAs, short contact path, and ordered information hierarchy.',
    },
    output: {
      de: 'Klarerer Kampagnen-Einstieg und weniger Reibung bis zur Anfrage.',
      en: 'Clearer campaign entry point and less friction before enquiry.',
    },
    stack: ['Landing Page', 'Conversion Path', 'Local Business'],
  },
  {
    id: 'trixstar',
    title: 'TriXstar Portfolio',
    href: 'https://trixstar-portfolio.pages.dev/',
    signal: 'delivery',
    proofLabel: { de: 'Portfolio ansehen', en: 'View portfolio' },
    constraint: {
      de: 'Ein Künstlerportfolio sollte auf Mobilgeräten besser funktionieren und leichter aktualisierbar sein.',
      en: 'An artist portfolio needed to work better on mobile and become easier to update.',
    },
    build: {
      de: 'Relaunch mit React/Vite, klarerer Struktur und Cloudflare-Pages-Deployment.',
      en: 'Relaunch with React/Vite, clearer structure, and Cloudflare Pages deployment.',
    },
    output: {
      de: 'Besser lesbarer Erstkontakt für Booking-Anfragen und eine stabilere Update-Basis.',
      en: 'Cleaner first contact for booking enquiries and a more stable update base.',
    },
    stack: ['React', 'Vite', 'Cloudflare Pages'],
  },
  {
    id: 'baker-charlie',
    title: 'Baker & Charlie',
    href: 'https://bakerandcharlie.pages.dev/',
    signal: 'local-business',
    proofLabel: { de: 'Konzept ansehen', en: 'View concept' },
    constraint: {
      de: 'Ein traditionelles Angebot brauchte einen digitalen Auftritt, der verständlicher zur Marke passt.',
      en: 'A traditional offer needed a clearer digital presence that matched the brand better.',
    },
    build: {
      de: 'Content-Module, visuelle Führung und lokale Ansprache als kompakter Website-Stand.',
      en: 'Content modules, visual guidance, and local audience framing in a compact website version.',
    },
    output: {
      de: 'Bessere Grundlage für einen glaubwürdigen ersten Eindruck bei neuen Besuchern.',
      en: 'A better basis for a credible first impression with new visitors.',
    },
    stack: ['Design', 'Content Modules', 'Local Business'],
  },
];

export const getProjectCases = (signal: ProjectSignal | 'all') => {
  if (signal === 'all') return projectCases;
  return projectCases.filter((project) => project.signal === signal);
};
