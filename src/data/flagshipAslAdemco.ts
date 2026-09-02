/**
 * Flagship Case Study Data: ASL Ademco B2B AI Fachberater & Planning Studio
 * Maximilian Unverricht Digital Résumé & Portfolio
 */

import type { FlagshipCaseStudyData } from '../types/project';

export const flagshipAslAdemcoData: FlagshipCaseStudyData = {
  client: "ASL Ademco B2B Großhandel",
  clientUrl: "https://asl-ademco.de",
  role: "Lead Fullstack & AI Agent Engineer",
  timeframe: "2025 – Present",
  summary: "Für ASL Ademco, einen führenden deutschen B2B-Großhändler für Sicherheitstechnik und Brandschutz, wurde ein interaktiver AI-Fachberater entwickelt, der Errichter und Techniker bei der Systemkonfiguration und Produktauswahl aus einem 1.460+ Artikel umfassenden Sortiment unterstützt.",
  problem: "B2B-Sicherheitsinstallateure benötigen hochpräzise, kompatibilitätsgeprüfte Produktempfehlungen ohne KI-Halluzinationen. Standard-Chatbots erfinden Artikelnummern oder empfehlen inkompatible Komponenten, was im Brandschutz und der Einbruchmeldetechnik inakzeptabel ist.",
  
  pillars: [
    {
      id: "pillar-1",
      number: 1,
      title: "1. Vertical Agent (ReAct Loop)",
      description: "Interaktiver AI-Berater mit bis zu 7 Reasoning-Zyklen. Fragt eine Cloudflare D1 SQL-Datenbank mit 1.460+ Artikeln aus Datanorm/CSV-Exporten ab. Provider-Abstraktion für DeepSeek-V3 und Google Gemini.",
      tech: "React 19 · Cloudflare Workers · D1 SQL · DeepSeek / Gemini",
      highlights: [
        "ReAct (Reasoning + Acting) Agent-Loop auf Cloudflare Workers Edge Runtime",
        "Strikte Obergrenze von maximal 7 Reasoning-Zyklen gegen Token-Explosionen",
        "Provider-Abstraktionsschicht für DeepSeek-V3 und Google Gemini 2.0 API mit Failover",
        "Domain-spezifisches System-Prompting für deutsche Elektro- & Brandschutz-Fachstandards"
      ]
    },
    {
      id: "pillar-2",
      number: 2,
      title: "2. Anti-Halluzinations-Guardrails",
      description: "Strikte Positiv-Bindung (nur datenbankverifizierte SKUs), Hard-Block gegen Phantasie-Artikelnummern, Scope-Gate gegen Off-Topic-Anfragen und kontrolliertes Graceful Degradation bei Iterationsgrenzen.",
      tech: "Deterministic Guardrails · Scope Gate · SKU Validation",
      highlights: [
        "100% Positiv-Bindung: Ausschließlich durch D1 SQL-Tool-Observation bestätigte SKUs im finalen BOM",
        "Hard-Filter gegen synthetische Dummy-SKUs (z.B. PROD-TEMP-99 oder FAKE-123)",
        "Scope-Gate zur Erkennung und höflichen Zurückweisung von Off-Topic-Anfragen",
        "Graceful Degradation bei Erreichen des 7. Zyklus mit Rückfall auf Teilverifikation & Hotline-Hinweis"
      ]
    },
    {
      id: "pillar-3",
      number: 3,
      title: "3. Strukturierte SQL-RAG-Pipeline",
      description: "3-stufige SQL-Suche (Exakte SKU → AND-Volltext → OR mit Synonym-Expansion), Kompatibilitätsmatrix-Prüfung, automatische Zubehör-Auflösung und Detail-Hydration mit Bildern, Datenblättern und Staffelpreisen.",
      tech: "3-Stage SQL RAG · Synonym Expansion · Accessory Resolution",
      highlights: [
        "Stufe 1 (Exakt): SKU / EAN / Herstellernummer-Direktabfrage mit Sub-Millisekunden-Laufzeit",
        "Stufe 2 (AND-Volltext): Tokenisierte Suche über Artikelname und technische Beschreibung",
        "Stufe 3 (Synonym-Expansion): Automatische Begriffserweiterung (z.B. 'BWM' -> 'Bewegungsmelder')",
        "Relationales Zubehör-Joining zur automatischen Auflösung obligatorischer Montagesockel & Netzteile"
      ]
    },
    {
      id: "pillar-4",
      number: 4,
      title: "4. B2B Planning Studio Frontend",
      description: "Responsiver B2B-Arbeitsplatz mit Merkliste, Mengenanpassung, Projektnotizen, 1-Klick-Anfrageexport und Onboarding-Tutorial. WCAG 2.2 AA konform und Lighthouse 100/100 Best Practices.",
      tech: "React 19 · Tailwind CSS · WCAG 2.2 AA · Lighthouse 100",
      highlights: [
        "Interaktive Stückliste (BOM) mit Echtzeit-Preiskalkulation und Kompatibilitäts-Statusindikatoren",
        "1-Klick RFQ-Exportfunktion für formatierte Angebotsanfragen und CSV-Materiallisten",
        "WCAG 2.2 AA konform mit vollständiger Tastaturnavigation (Tab, Enter, Escape) und Screenreader-Labels",
        "Lighthouse 100/100 Scores in Best Practices, SEO und Accessibility"
      ]
    },
    {
      id: "pillar-5",
      number: 5,
      title: "5. Datanorm Import-Pipeline",
      description: "Node.js ESM-Skripte für den Import deutscher Großhandels-Katalogformate in Cloudflare D1, inklusive nicht-destruktiver Aktualisierung von 1.461 Produktbildern via SQL.",
      tech: "Node.js ESM · Datanorm Parser · SQL Batch Ingestion",
      highlights: [
        "Robuster Parser für Großhandels-Standardformate Datanorm 4.0 und 5.0 (CP850 / ISO-8859 zu UTF-8)",
        "Automatisierte Normalisierung technischer Einheiten (Spannung, Stromaufnahme, Schutzart IP)",
        "Nicht-destruktive SQL-Batch-Imports zur kontinuierlichen Synchronisation von 1.461 Artikeln und CDN-Bildern",
        "Erhalt manuell annotierter Kompatibilitätsbeziehungen bei Katalog-Updates"
      ]
    }
  ],

  reactTraces: [
    {
      id: "trace-smoke-detectors",
      title: "Bürokomplex Brandmelder mit Sockeln & Zentrale",
      query: "Ich benötige für ein Bürogebäude 12 optische Rauchmelder mit passenden Standardsockeln sowie eine kompatible Brandmeldezentrale für mindestens 2 Ringleitungen.",
      totalCycles: 5,
      cycles: [
        {
          cycle: 1,
          thought: "Der Anwender sucht 12 optische Rauchmelder für ein Standard-Bürogebäude. Zuerst frage ich den D1-Katalog nach optischen Rauchmeldern in der Kategorie 'Brandmelder' ab.",
          action: "query_catalog_sql",
          tool: "query_catalog_sql",
          args: { search_term: "optischer Rauchmelder", category: "Brandmelder", max_results: 3 },
          observation: [
            { sku: "ADEM-BM-8003", brand: "Esser / Honeywell", name: "Optischer Rauchmelder IQ8Quad", price_netto: 68.50, in_stock: 140 },
            { sku: "ADEM-BM-OT01", brand: "Novar", name: "Optisch-thermischer Mehrfachsensor", price_netto: 84.00, in_stock: 45 }
          ],
          verified: true
        },
        {
          cycle: 2,
          thought: "ADEM-BM-8003 (IQ8Quad) ist der führende Industriestandard mit hoher Verfügbarkeit (140 Stück). Nun prüfe ich die Kompatibilitätstabelle, um den vorgeschriebenen Standardsockel zu ermitteln.",
          action: "check_compatibility",
          tool: "check_compatibility",
          args: { primary_sku: "ADEM-BM-8003" },
          observation: [
            { compatible_sku: "ADEM-SO-8055", brand: "Esser", name: "Standard-Meldesockel IQ8", relation_type: "mandatory_accessory", price_netto: 11.20, in_stock: 310 },
            { compatible_sku: "ADEM-SO-8056", brand: "Esser", name: "Meldesockel mit Relaiskontakt", relation_type: "optional_accessory", price_netto: 28.50, in_stock: 80 }
          ],
          verified: true
        },
        {
          cycle: 3,
          thought: "Für 12 Melder (ADEM-BM-8003) werden 12 Standardsockel (ADEM-SO-8055) benötigt. Jetzt suche ich nach einer kompatiblen 2-Loop Brandmeldezentrale (BMZ).",
          action: "query_catalog_sql",
          tool: "query_catalog_sql",
          args: { search_term: "Brandmelderzentrale 2 Ringleitungen", category: "Brandmelder", max_results: 2 },
          observation: [
            { sku: "ADEM-BMZ-IQ8C", brand: "Esser", name: "Brandmelderzentrale IQ8Control C (2 Loops)", price_netto: 1420.00, in_stock: 8 }
          ],
          verified: true
        },
        {
          cycle: 4,
          thought: "Die Zentrale ADEM-BMZ-IQ8C ist vollständig kompatibel. Nun validiere ich die Gesamtkalkulation und Verfügbarkeit für 12x ADEM-BM-8003, 12x ADEM-SO-8055 und 1x ADEM-BMZ-IQ8C.",
          action: "calculate_bom_pricing",
          tool: "calculate_bom_pricing",
          args: {
            items: [
              { sku: "ADEM-BM-8003", quantity: 12 },
              { sku: "ADEM-SO-8055", quantity: 12 },
              { sku: "ADEM-BMZ-IQ8C", quantity: 1 }
            ]
          },
          observation: {
            subtotal_netto: 2376.40,
            all_in_stock: true,
            items: [
              { sku: "ADEM-BM-8003", qty: 12, unit_price: 68.50, line_total: 822.00 },
              { sku: "ADEM-SO-8055", qty: 12, unit_price: 11.20, line_total: 134.40 },
              { sku: "ADEM-BMZ-IQ8C", qty: 1, unit_price: 1420.00, line_total: 1420.00 }
            ]
          },
          verified: true
        },
        {
          cycle: 5,
          thought: "Alle 3 Komponenten sind 100% verifiziert, zueinander kompatibel und lagernd. Ich erstelle die finale Antwort mit transparenter Einzelaufstellung.",
          action: "finalize_recommendation",
          tool: "finalize_recommendation",
          args: { verified_boms_count: 3, total_netto: 2376.40 },
          observation: "Ready to render verified recommendation.",
          verified: true
        }
      ],
      finalAnswer: "Für Ihre Bürogebäude-Konfiguration habe ich folgende kompatible, ab Lager verfügbare Systemkomponenten zusammengestellt:\n\n1. 12x Optischer Rauchmelder IQ8Quad (SKU: ADEM-BM-8003) — Einzelpreis: 68,50 € | Gesamt: 822,00 €\n2. 12x Standard-Meldesockel IQ8 (SKU: ADEM-SO-8055) — Einzelpreis: 11,20 € | Gesamt: 134,40 € (Obligatorischer Montagesockel)\n3. 1x Brandmelderzentrale IQ8Control C (SKU: ADEM-BMZ-IQ8C) — 2 Ringleitungen | Einzelpreis: 1.420,00 €\n\nGesamtsumme netto: 2.376,40 €\nAlle Artikel sind ab Lager lieferbar. Sie können diese Zusammenstellung mit einem Klick in das Planning Studio übernehmen und als Anfrage exportieren."
    },
    {
      id: "trace-underground-garage",
      title: "Tiefgaragen-Bewegungsmelder IP65 mit Relais",
      query: "Wir rüsten eine Tiefgarage um und suchen 8 wetterfeste Bewegungsmelder mit Schutzart mindestens IP65 und potenzialfreiem Relaiskontakt.",
      totalCycles: 3,
      cycles: [
        {
          cycle: 1,
          thought: "Suche nach Bewegungsmeldern mit IP65 Schutzart für feuchte Umgebungen (Tiefgarage). Ich nutze die Synonym-Erweiterung für 'BWM' und 'IP65'.",
          action: "query_catalog_sql",
          tool: "query_catalog_sql",
          args: { search_term: "Bewegungsmelder IP65 Relais", category: "Einbruchmelder", max_results: 3 },
          observation: [
            { sku: "ADEM-BWM-65PRO", brand: "Optex / Ademco", name: "Außen-PIR-Melder IP65 mit Wechslerrelais", price_netto: 118.00, in_stock: 52 }
          ],
          verified: true
        },
        {
          cycle: 2,
          thought: "ADEM-BWM-65PRO verfügt über integrierte Wechslerrelais und IP65. Prüfe optionale Montagehalterungen für Eckmontage.",
          action: "check_compatibility",
          tool: "check_compatibility",
          args: { primary_sku: "ADEM-BWM-65PRO" },
          observation: [
            { compatible_sku: "ADEM-MB-ECK01", brand: "Optex", name: "Eck-Montagewinkel verstellbar", relation_type: "optional_accessory", price_netto: 14.50, in_stock: 65 }
          ],
          verified: true
        },
        {
          cycle: 3,
          thought: "Kalkuliere 8 Stück ADEM-BWM-65PRO mit optionalen Eckwinkeln und erstelle die Empfehlung.",
          action: "calculate_bom_pricing",
          tool: "calculate_bom_pricing",
          args: {
            items: [
              { sku: "ADEM-BWM-65PRO", quantity: 8 },
              { sku: "ADEM-MB-ECK01", quantity: 8 }
            ]
          },
          observation: {
            subtotal_netto: 1060.00,
            all_in_stock: true,
            items: [
              { sku: "ADEM-BWM-65PRO", qty: 8, unit_price: 118.00, line_total: 944.00 },
              { sku: "ADEM-MB-ECK01", qty: 8, unit_price: 14.50, line_total: 116.00 }
            ]
          },
          verified: true
        }
      ],
      finalAnswer: "Für die Tiefgaragen-Ausstattung empfehle ich:\n\n1. 8x Außen-PIR-Melder IP65 mit Wechslerrelais (SKU: ADEM-BWM-65PRO) — 118,00 € | Gesamt: 944,00 €\n2. 8x Eck-Montagewinkel verstellbar (SKU: ADEM-MB-ECK01) — 14,50 € | Gesamt: 116,00 € (Optional)\n\nGesamtsumme netto: 1.060,00 € (Alle Artikel lagernd)."
    },
    {
      id: "trace-guardrail-defense",
      title: "Anti-Halluzinations-Guardrail: Blockade nicht-existenter SKU",
      query: "Bitte prüfen Sie die Verfügbarkeit von 5 Stück Sensor Typ SKU-99999-FAKE.",
      totalCycles: 2,
      cycles: [
        {
          cycle: 1,
          thought: "Der Anwender fragt nach einer spezifischen Artikelnummer 'SKU-99999-FAKE'. Ich führe eine exakte D1-SQL-Suche durch.",
          action: "query_catalog_sql",
          tool: "query_catalog_sql",
          args: { search_term: "SKU-99999-FAKE", max_results: 1 },
          observation: [],
          verified: false
        },
        {
          cycle: 2,
          thought: "Die Artikelnummer existiert nicht in der D1-Datenbank. Gemäß Anti-Halluzinations-Guardrail darf kein Scheinprodukt erfunden werden. Antwort ablehnen und Hilfestellung bieten.",
          action: "guardrail_intercept",
          tool: "guardrail_intercept",
          args: { reason: "unverified_sku_rejected", input_sku: "SKU-99999-FAKE" },
          observation: { blocked: true, guardrail: "positive_binding_enforced" },
          verified: true
        }
      ],
      finalAnswer: "Die angefragte Artikelnummer 'SKU-99999-FAKE' konnte im ASL Ademco Katalog nicht gefunden werden. Bitte überprüfen Sie die Schreibweise oder beschreiben Sie den gewünschten Einsatzzweck, damit ich Ihnen ein verifiziertes Alternativprodukt empfehlen kann."
    }
  ],

  sqlSchemas: [
    {
      tableName: "products",
      description: "Hauptkatalog-Tabelle mit 1.460+ indizierten Artikeln aus Datanorm- und CSV-Importen",
      ddl: `CREATE TABLE IF NOT EXISTS products (
  sku TEXT PRIMARY KEY,
  manufacturer_sku TEXT NOT NULL,
  brand TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  description TEXT NOT NULL,
  price_netto REAL NOT NULL,
  currency TEXT DEFAULT 'EUR',
  in_stock INTEGER DEFAULT 1,
  datasheet_url TEXT,
  image_url TEXT,
  specs_json TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_mfg_sku ON products(manufacturer_sku);`,
      columns: [
        { name: "sku", type: "TEXT", isPrimary: true, description: "Eindeutige Artikelnummer im Großhandelskatalog" },
        { name: "manufacturer_sku", type: "TEXT", description: "Hersteller-Teilenummer (MPN / EAN)" },
        { name: "brand", type: "TEXT", description: "Hersteller / Marke (z.B. Esser, Novar, Honeywell, Optex)" },
        { name: "name", type: "TEXT", description: "Vollständiger Artikelname" },
        { name: "category", type: "TEXT", description: "Hauptkategorie (Brandmelder, Einbruch, Video, Zutritt)" },
        { name: "price_netto", type: "REAL", description: "Großhandels-Einkaufspreis netto in EUR" },
        { name: "in_stock", type: "INTEGER", description: "Lagerbestand (verfügbare Mengeneinheiten)" },
        { name: "specs_json", type: "TEXT", description: "JSON-Schlüssel-Werte für technische Parameter (IP-Schutzart, Spannung, Strom)" }
      ],
      sampleRowsCount: 1461
    },
    {
      tableName: "compatibilities",
      description: "Relationales Regelwerk für obligatorisches und optionales Zubehör zwischen SKUs",
      ddl: `CREATE TABLE IF NOT EXISTS compatibilities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  primary_sku TEXT NOT NULL,
  compatible_sku TEXT NOT NULL,
  relation_type TEXT CHECK(relation_type IN ('mandatory_accessory', 'optional_accessory', 'replacement', 'parent_panel')),
  notes TEXT,
  FOREIGN KEY (primary_sku) REFERENCES products(sku) ON DELETE CASCADE,
  FOREIGN KEY (compatible_sku) REFERENCES products(sku) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_compat_primary ON compatibilities(primary_sku);
CREATE INDEX IF NOT EXISTS idx_compat_relation ON compatibilities(relation_type);`,
      columns: [
        { name: "id", type: "INTEGER", isPrimary: true, description: "Auto-Inkrement Primärschlüssel" },
        { name: "primary_sku", type: "TEXT", description: "Hauptgerät SKU (z.B. Rauchmelder-Kopf)" },
        { name: "compatible_sku", type: "TEXT", description: "Zubehör-SKU (z.B. passender Sockel)" },
        { name: "relation_type", type: "TEXT", description: "Beziehungstyp: mandatory_accessory | optional_accessory | replacement" },
        { name: "notes", type: "TEXT", description: "Technische Anmerkung zur Kombination" }
      ],
      sampleRowsCount: 840
    },
    {
      tableName: "search_synonyms",
      description: "Domain-Wörterbuch für Fachbegriffe und Abkürzungen im Sicherheitsbereich",
      ddl: `CREATE TABLE IF NOT EXISTS search_synonyms (
  term TEXT PRIMARY KEY,
  expansions TEXT NOT NULL
);`,
      columns: [
        { name: "term", type: "TEXT", isPrimary: true, description: "Suchbegriff / Abkürzung (z.B. bwm, bmz, pir)" },
        { name: "expansions", type: "TEXT", description: "Kommagetrennte Synonyme für SQL LIKE-Expansion" }
      ],
      sampleRowsCount: 120
    }
  ],

  sqlQueries: [
    {
      id: "query-stage-1-2",
      title: "1. 3-Stufen SQL RAG: Exakte SKU & Volltextsuche",
      stage: "Stage 1 & 2",
      query: `SELECT sku, brand, name, category, price_netto, in_stock, datasheet_url, image_url 
FROM products 
WHERE sku = ?1 OR manufacturer_sku = ?1
   OR ((name LIKE ?2 AND name LIKE ?3) OR (description LIKE ?2 AND description LIKE ?3))
ORDER BY in_stock DESC, price_netto ASC
LIMIT 10;`,
      params: ["'ADEM-BM-8003'", "'%Rauchmelder%'", "'%Esser%'"],
      explanation: "Kombiniert Stufe 1 (Sub-ms SKU Match) mit Stufe 2 (tokenisierter AND-Suche nach Artikelname und Beschreibung).",
      resultSummary: "1 exakter Treffer, 2 verwandte Volltexttreffer",
      mockExecutionTimeMs: 2.4,
      mockResults: [
        { sku: "ADEM-BM-8003", brand: "Esser", name: "Optischer Rauchmelder IQ8Quad", category: "Brandmelder", price_netto: 68.50, in_stock: 140 },
        { sku: "ADEM-BM-OT01", brand: "Novar", name: "Optisch-thermischer Mehrfachsensor", category: "Brandmelder", price_netto: 84.00, in_stock: 45 }
      ]
    },
    {
      id: "query-accessory-join",
      title: "2. Automatische Zubehör- & Sockelauflösung",
      stage: "Relational Join",
      query: `SELECT 
    p.sku, 
    p.brand, 
    p.name, 
    p.category, 
    p.price_netto, 
    c.relation_type, 
    c.notes
FROM products p
JOIN compatibilities c ON p.sku = c.compatible_sku
WHERE c.primary_sku = ?1 
  AND c.relation_type = 'mandatory_accessory';`,
      params: ["'ADEM-BM-8003'"],
      explanation: "Löst über die 'compatibilities'-Tabelle obligatorische Sockel und Montagemodule für das ausgewählte Melder-Modell auf.",
      resultSummary: "1 obligatorischer Sockel gefunden",
      mockExecutionTimeMs: 1.9,
      mockResults: [
        { sku: "ADEM-SO-8055", brand: "Esser", name: "Standard-Meldesockel IQ8", category: "Brandmelder-Zubehör", price_netto: 11.20, relation_type: "mandatory_accessory", notes: "Passend für alle IQ8Quad Melder" }
      ]
    },
    {
      id: "query-bom-verification",
      title: "3. Multi-Komponenten BOM Kompatibilitäts-Check",
      stage: "Integrity Verification",
      query: `SELECT 
    p1.sku AS main_item,
    p2.sku AS accessory_item,
    c.relation_type,
    c.notes
FROM compatibilities c
JOIN products p1 ON c.primary_sku = p1.sku
JOIN products p2 ON c.compatible_sku = p2.sku
WHERE c.primary_sku IN (?1, ?2)
  AND c.compatible_sku IN (?3, ?4);`,
      params: ["'ADEM-BM-8003'", "'ADEM-BWM-65PRO'", "'ADEM-SO-8055'", "'ADEM-MB-ECK01'"],
      explanation: "Verifiziert alle paarweisen Beziehungen einer konfigurierten Stückliste auf konsistente Kompatibilität vor dem Export.",
      resultSummary: "Alle 2 Beziehungen validiert",
      mockExecutionTimeMs: 3.1,
      mockResults: [
        { main_item: "ADEM-BM-8003", accessory_item: "ADEM-SO-8055", relation_type: "mandatory_accessory", notes: "Zertifiziert nach DIN EN 54-7" },
        { main_item: "ADEM-BWM-65PRO", accessory_item: "ADEM-MB-ECK01", relation_type: "optional_accessory", notes: "Wand-/Eckmontage IP65" }
      ]
    }
  ],

  metrics: [
    {
      label: "1.460+",
      value: "Reale Katalog-SKUs",
      detail: "Vollständig in Cloudflare D1 SQL indiziert und fehlerfrei abfragbar",
      unit: "SKUs",
      category: "catalog"
    },
    {
      label: "Bis zu 7",
      value: "ReAct Reasoning-Zyklen",
      detail: "Autonome Tool-Aufrufe mit strikter Iterationsbegrenzung gegen Token-Explosion",
      unit: "Zyklen",
      category: "performance"
    },
    {
      label: "100%",
      value: "Positiv-gebundene SKUs",
      detail: "0% Halluzinationen oder erfundene Artikelnummern im finalen Angebot",
      unit: "%",
      category: "guardrail"
    },
    {
      label: "100/100",
      value: "Lighthouse Score",
      detail: "Perfekte Bewertungen in Best Practices, Accessibility und SEO",
      unit: "Score",
      category: "quality"
    }
  ],

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
};
