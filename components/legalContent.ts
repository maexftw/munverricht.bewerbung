export type LegalLanguage = 'de' | 'en';
export type LegalPageKind = 'impressum' | 'datenschutz';

export const legalContact = {
  name: 'Maximilian Unverricht',
  street: 'Echeloh 48',
  postalCode: '44149 Dortmund',
  email: 'info@graphiks.de',
  phone: '+49 163 3229892',
};

export const legalRouteLabels = {
  de: {
    home: 'Startseite',
    webdesign: 'Webdesign',
    legalNotice: 'Impressum',
    privacy: 'Datenschutz',
    backHome: 'Zur Startseite',
  },
  en: {
    home: 'Home',
    webdesign: 'Webdesign',
    legalNotice: 'Legal notice',
    privacy: 'Privacy',
    backHome: 'Back to home',
  },
} as const;

export const legalPreviewCopy = {
  de: {
    eyebrow: '// RECHTLICHES',
    title: 'Vollständige Rechtstexte auf eigenen Seiten.',
    intro:
      'Impressum und Datenschutz stehen bewusst nicht mehr nur als Kurzblock im Footer. Die vollständigen Angaben sind separat, direkt erreichbar und dauerhaft verlinkt.',
    cards: [
      {
        kind: 'impressum' as LegalPageKind,
        title: 'Impressum',
        body: 'Anbieterkennzeichnung, Kontaktangaben und verantwortliche Stelle.',
        cta: 'Impressum öffnen',
      },
      {
        kind: 'datenschutz' as LegalPageKind,
        title: 'Datenschutz',
        body: 'Hosting, lokale Speicherungen, Kontaktaufnahme und Ihre Rechte.',
        cta: 'Datenschutz öffnen',
      },
    ],
  },
  en: {
    eyebrow: '// LEGAL',
    title: 'Full legal texts on dedicated pages.',
    intro:
      'Legal notice and privacy information no longer live as compressed footer snippets. The complete information is available on dedicated pages and linked permanently.',
    cards: [
      {
        kind: 'impressum' as LegalPageKind,
        title: 'Legal notice',
        body: 'Provider details, contact information, and responsible person.',
        cta: 'Open legal notice',
      },
      {
        kind: 'datenschutz' as LegalPageKind,
        title: 'Privacy',
        body: 'Hosting, local storage, contact handling, and your rights.',
        cta: 'Open privacy page',
      },
    ],
  },
} as const;

export const legalPageCopy = {
  de: {
    title: {
      impressum: 'Impressum',
      datenschutz: 'Datenschutz',
    },
    intro: {
      impressum:
        'Diese Seite stellt die Anbieterkennzeichnung für das Portfolio und die Webdesign-Unterseite bereit.',
      datenschutz:
        'Diese Hinweise beschreiben, welche personenbezogenen Daten beim Besuch dieser Website verarbeitet werden und zu welchen Zwecken das geschieht.',
    },
    summary: {
      impressum: 'Anbieterkennzeichnung gemäß § 5 DDG',
      datenschutz: 'Informationen gemäß Art. 13 DSGVO',
    },
    imprintSections: [
      {
        heading: 'Anbieter',
        paragraphs: [
          `${legalContact.name}`,
          `${legalContact.street}\n${legalContact.postalCode}`,
        ],
      },
      {
        heading: 'Kontakt',
        paragraphs: [
          `E-Mail: ${legalContact.email}`,
          `Telefon: ${legalContact.phone}`,
        ],
      },
      {
        heading: 'Verantwortlich für Inhalte',
        paragraphs: [
          `Verantwortlich für die Inhalte dieses Onlineangebots ist ${legalContact.name}, ${legalContact.street}, ${legalContact.postalCode}.`,
          'Soweit journalistisch-redaktionelle Inhalte angeboten werden, gilt diese Angabe zugleich als Benennung der verantwortlichen Person im Sinne des § 18 Abs. 2 MStV.',
        ],
      },
    ],
    privacySections: [
      {
        heading: 'Verantwortlicher',
        paragraphs: [
          `${legalContact.name}, ${legalContact.street}, ${legalContact.postalCode}.`,
          `Kontakt: ${legalContact.email}, ${legalContact.phone}.`,
        ],
      },
      {
        heading: 'Hosting und Auslieferung',
        paragraphs: [
          'Diese Website wird über Cloudflare ausgeliefert. Dabei können technisch erforderliche Verbindungsdaten wie IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene URL, Referrer, User-Agent und ähnliche Protokolldaten verarbeitet werden.',
          'Die Verarbeitung erfolgt zur sicheren Bereitstellung der Website, zur Stabilität des Betriebs und zur Abwehr von Missbrauch. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Soweit Informationen auf Ihrem Endgerät ausschließlich zur Bereitstellung des ausdrücklich gewünschten digitalen Dienstes benötigt werden, stützt sich dies ergänzend auf § 25 Abs. 2 Nr. 2 TDDDG.',
        ],
      },
      {
        heading: 'Lokale Speicherungen im Browser',
        paragraphs: [
          'Die Website speichert derzeit nur lokal im Browser, welche Spracheinstellung und welches Theme zuletzt gewählt wurden. Diese Einträge dienen ausschließlich der Darstellung und Bedienung der Website und werden nicht serverseitig an mich übermittelt.',
          'Sie können diese lokalen Einträge jederzeit in den Einstellungen Ihres Browsers löschen. Es werden aktuell keine Analyse-, Marketing- oder Profiling-Cookies bzw. vergleichbare nicht notwendige Tracking-Technologien eingesetzt.',
        ],
      },
      {
        heading: 'Schriftarten und eingebundene Assets',
        paragraphs: [
          'Schriftarten, Icons und UI-Elemente dieser Website werden ohne automatisch nachgeladene Analyse- oder Werbedienste dargestellt. Es werden derzeit keine externen Font-CDNs oder Icon-CDNs allein zur Darstellung der Oberfläche geladen.',
        ],
      },
      {
        heading: 'Kontaktaufnahme',
        paragraphs: [
          'Wenn Sie mir eine E-Mail schreiben oder über einen mailto-Link Kontakt aufnehmen, verarbeite ich die von Ihnen übermittelten Angaben zur Bearbeitung Ihres Anliegens und zur weiteren Kommunikation.',
          'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um vorvertragliche Maßnahmen oder die Anbahnung eines Auftrags geht, ansonsten Art. 6 Abs. 1 lit. f DSGVO.',
        ],
      },
      {
        heading: 'Externe Links',
        paragraphs: [
          'Diese Website enthält externe Links, etwa zu GitHub, LinkedIn oder Referenzprojekten. Beim Anklicken verlassen Sie diese Website. Für die Datenverarbeitung durch die jeweilige Zielseite sind ausschließlich deren Betreiber verantwortlich.',
        ],
      },
      {
        heading: 'Empfänger und Drittlandbezug',
        paragraphs: [
          'Empfänger von Daten können technische Dienstleister sein, die für Hosting und Auslieferung eingesetzt werden, insbesondere Cloudflare. Dabei kann eine Verarbeitung auch außerhalb der Europäischen Union beziehungsweise des Europäischen Wirtschaftsraums nicht ausgeschlossen werden.',
          'Weitere externe Dienste werden auf dieser Website derzeit nicht automatisch zur Analyse oder zu Werbezwecken eingebunden.',
        ],
      },
      {
        heading: 'Speicherdauer',
        paragraphs: [
          'Serverseitige Protokolldaten werden nur so lange gespeichert, wie dies für den sicheren Betrieb, die Fehlersuche und die Missbrauchserkennung erforderlich ist. Inhalte aus Kontaktanfragen speichere ich nur so lange, wie dies zur Bearbeitung Ihres Anliegens, für Anschlussfragen oder zur Erfüllung gesetzlicher Aufbewahrungspflichten nötig ist.',
        ],
      },
      {
        heading: 'Ihre Rechte',
        paragraphs: [
          'Sie haben nach Maßgabe der DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen.',
          'Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.',
        ],
      },
    ],
    note:
      'Hinweis: Angaben wie Registereintrag, USt-IdNr. oder berufsrechtliche Pflichtangaben werden an dieser Stelle ergänzt, sofern sie für dieses Angebot einschlägig sind.',
  },
  en: {
    title: {
      impressum: 'Legal notice',
      datenschutz: 'Privacy',
    },
    intro: {
      impressum:
        'This page contains the provider information for the portfolio and the web design landing page.',
      datenschutz:
        'This notice explains which personal data may be processed when visiting this website and why that happens.',
    },
    summary: {
      impressum: 'Provider information pursuant to Section 5 DDG',
      datenschutz: 'Information pursuant to Article 13 GDPR',
    },
    imprintSections: [
      {
        heading: 'Provider',
        paragraphs: [
          `${legalContact.name}`,
          `${legalContact.street}\n${legalContact.postalCode}`,
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          `Email: ${legalContact.email}`,
          `Phone: ${legalContact.phone}`,
        ],
      },
      {
        heading: 'Responsible for content',
        paragraphs: [
          `${legalContact.name}, ${legalContact.street}, ${legalContact.postalCode}, is responsible for the content of this website.`,
          'Where journalistic or editorial content is offered, this information also names the responsible person for those contents.',
        ],
      },
    ],
    privacySections: [
      {
        heading: 'Controller',
        paragraphs: [
          `${legalContact.name}, ${legalContact.street}, ${legalContact.postalCode}.`,
          `Contact: ${legalContact.email}, ${legalContact.phone}.`,
        ],
      },
      {
        heading: 'Hosting and delivery',
        paragraphs: [
          'This website is delivered through Cloudflare. Technically required connection data such as IP address, date and time of access, requested URL, referrer, user agent, and similar log data may be processed.',
          'The processing is used to provide the website securely, keep the service stable, and defend against abuse. The legal basis is Article 6(1)(f) GDPR. Where information on your device is strictly required to provide the digital service you requested, the processing is additionally based on Section 25(2) no. 2 TDDDG.',
        ],
      },
      {
        heading: 'Local browser storage',
        paragraphs: [
          'The website currently stores only your chosen language and theme locally in your browser. These values are used only for presentation and usability and are not transmitted to me server-side.',
          'You can delete these local entries at any time in your browser settings. No analytics, marketing, or profiling cookies or comparable non-essential tracking technologies are currently used on this website.',
        ],
      },
      {
        heading: 'Fonts and embedded assets',
        paragraphs: [
          'Fonts, icons, and UI assets on this website are presented without automatically loading analytics or advertising services. No external font CDN or icon CDN is currently loaded just to render the interface.',
        ],
      },
      {
        heading: 'Contact requests',
        paragraphs: [
          'If you send me an email or use a mailto link, I process the information you provide in order to handle your request and continue communication with you.',
          'The legal basis is Article 6(1)(b) GDPR where the request relates to pre-contractual steps or a potential assignment; otherwise Article 6(1)(f) GDPR applies.',
        ],
      },
      {
        heading: 'External links',
        paragraphs: [
          'This website contains external links, for example to GitHub, LinkedIn, or project references. Once you click such a link, you leave this website. The operator of the destination page is solely responsible for data processing there.',
        ],
      },
      {
        heading: 'Recipients and third-country processing',
        paragraphs: [
          'Recipients of data may include technical service providers used for hosting and delivery, especially Cloudflare. Processing outside the European Union or the European Economic Area cannot be ruled out.',
          'No other third-party services are currently loaded automatically for analytics or advertising purposes.',
        ],
      },
      {
        heading: 'Storage period',
        paragraphs: [
          'Server-side log data is stored only for as long as necessary for secure operations, troubleshooting, and abuse prevention. Contact-related content is kept only for as long as necessary to handle your request, answer follow-up questions, or comply with legal retention requirements.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'Under the GDPR, you have rights of access, rectification, erasure, restriction of processing, data portability, and objection to certain processing activities.',
          'You also have the right to lodge a complaint with a data protection supervisory authority.',
        ],
      },
    ],
    note:
      'Note: register details, VAT ID, or profession-specific legal information will be added here if they become applicable to this offer.',
  },
} as const;
