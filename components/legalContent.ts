export type LegalLanguage = 'de' | 'en';
export type LegalPageKind = 'impressum' | 'datenschutz';

const contact = {
  name: 'Maximilian Unverricht',
  street: 'Echeloh 48',
  city: '44149 Dortmund',
  email: 'info@munverricht.org',
  phone: '+49 163 3229892',
};

export const legalRouteLabels = {
  de: { legalNotice: 'Impressum', privacy: 'Datenschutz', backHome: 'Zur Startseite' },
  en: { legalNotice: 'Legal notice', privacy: 'Privacy', backHome: 'Back to home' },
} as const;

export const legalPageCopy = {
  de: {
    title: { impressum: 'Impressum', datenschutz: 'Datenschutz' },
    intro: {
      impressum: 'Diese Seite stellt die Anbieterkennzeichnung für das Portfolio bereit.',
      datenschutz: 'Diese Hinweise beschreiben, welche personenbezogenen Daten beim Besuch dieser Website verarbeitet werden und zu welchen Zwecken das geschieht.',
    },
    summary: { impressum: 'Anbieterkennzeichnung gemäß § 5 DDG', datenschutz: 'Informationen gemäß Art. 13 DSGVO' },
    imprintSections: [
      { heading: 'Anbieter', paragraphs: [contact.name, `${contact.street}\n${contact.city}`] },
      { heading: 'Kontakt', paragraphs: [`E-Mail: ${contact.email}`, `Telefon: ${contact.phone}`] },
      { heading: 'Verantwortlich für Inhalte', paragraphs: [`Verantwortlich für die Inhalte dieses Onlineangebots ist ${contact.name}, ${contact.street}, ${contact.city}.`, 'Soweit journalistisch-redaktionelle Inhalte angeboten werden, gilt diese Angabe zugleich als Benennung der verantwortlichen Person im Sinne des § 18 Abs. 2 MStV.'] },
    ],
    privacySections: [
      { heading: 'Verantwortlicher', paragraphs: [`${contact.name}, ${contact.street}, ${contact.city}.`, `Kontakt: ${contact.email}, ${contact.phone}.`] },
      { heading: 'Hosting und Auslieferung', paragraphs: ['Diese Website wird über einen technischen Hosting-Anbieter ausgeliefert. Dabei können erforderliche Verbindungsdaten wie IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene URL, Referrer, User-Agent und ähnliche Protokolldaten verarbeitet werden.', 'Die Verarbeitung erfolgt zur sicheren Bereitstellung, zur Stabilität des Betriebs und zur Abwehr von Missbrauch auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.'] },
      { heading: 'Lokale Speicherung', paragraphs: ['Die Website speichert nur die gewählte Spracheinstellung lokal im Browser. Dieser Eintrag dient ausschließlich der Bedienung und wird nicht serverseitig an mich übermittelt.', 'Es werden keine Analyse-, Marketing- oder Profiling-Cookies eingesetzt.'] },
      { heading: 'Kontaktaufnahme', paragraphs: ['Wenn Sie mir eine E-Mail schreiben, verarbeite ich die übermittelten Angaben zur Bearbeitung Ihres Anliegens und zur weiteren Kommunikation.', 'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO für vorvertragliche Maßnahmen, ansonsten Art. 6 Abs. 1 lit. f DSGVO.'] },
      { heading: 'Externe Links', paragraphs: ['Diese Website enthält externe Links, etwa zu GitHub, LinkedIn oder Referenzprojekten. Für die Datenverarbeitung auf der Zielseite ist deren Betreiber verantwortlich.'] },
      { heading: 'Speicherdauer und Rechte', paragraphs: ['Protokoll- und Kontaktdaten werden nur so lange gespeichert, wie dies für sicheren Betrieb, Bearbeitung oder gesetzliche Pflichten erforderlich ist.', 'Sie haben nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch sowie ein Beschwerderecht bei einer Aufsichtsbehörde.'] },
    ],
    note: 'Registereintrag, USt-IdNr. oder berufsrechtliche Pflichtangaben werden ergänzt, sofern sie für dieses Angebot einschlägig werden.',
  },
  en: {
    title: { impressum: 'Legal notice', datenschutz: 'Privacy' },
    intro: {
      impressum: 'This page contains the provider information for this portfolio.',
      datenschutz: 'This notice explains which personal data may be processed when visiting this website and why.',
    },
    summary: { impressum: 'Provider information pursuant to Section 5 DDG', datenschutz: 'Information pursuant to Article 13 GDPR' },
    imprintSections: [
      { heading: 'Provider', paragraphs: [contact.name, `${contact.street}\n${contact.city}`] },
      { heading: 'Contact', paragraphs: [`Email: ${contact.email}`, `Phone: ${contact.phone}`] },
      { heading: 'Responsible for content', paragraphs: [`${contact.name}, ${contact.street}, ${contact.city}, is responsible for the content of this website.`] },
    ],
    privacySections: [
      { heading: 'Controller', paragraphs: [`${contact.name}, ${contact.street}, ${contact.city}.`, `Contact: ${contact.email}, ${contact.phone}.`] },
      { heading: 'Hosting and delivery', paragraphs: ['This website is delivered through a technical hosting provider. Required connection data such as IP address, access time, requested URL, referrer, user agent, and similar log data may be processed.', 'Processing is necessary for secure delivery, stable operation, and abuse prevention on the basis of Article 6(1)(f) GDPR.'] },
      { heading: 'Local storage', paragraphs: ['The website stores only the chosen language locally in your browser. This value is used solely for usability and is not transmitted to me server-side.', 'No analytics, marketing, or profiling cookies are used.'] },
      { heading: 'Contact requests', paragraphs: ['When you send me an email, I process the submitted information to handle your request and continue communication.', 'The legal basis is Article 6(1)(b) GDPR for pre-contractual steps, otherwise Article 6(1)(f) GDPR.'] },
      { heading: 'External links', paragraphs: ['This website contains external links, including GitHub, LinkedIn, and reference projects. The destination operator is responsible for processing there.'] },
      { heading: 'Storage period and rights', paragraphs: ['Log and contact data is retained only for as long as required for secure operation, handling the request, or legal obligations.', 'Subject to the GDPR, you have rights of access, rectification, erasure, restriction, portability, objection, and complaint to a supervisory authority.'] },
    ],
    note: 'Register details, VAT ID, or profession-specific information will be added if they become applicable.',
  },
} as const;
