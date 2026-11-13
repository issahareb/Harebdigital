import type { HdLang } from './hd-texte'

/** Distinguish generated service concepts from the archived site and real client work. */
export const VISUAL_COPY = {
  de: {
    labels: [
      'Konzept · Webentwicklung',
      'Kundenprojekt · Website-Relaunch',
      'Konzept · Automatisierung',
      'Konzept · Suche & Antworten',
    ],
    captions: [
      'Vom Entwurf zur fertigen Website.',
      'Taxi Beige und Taxi B&B Essen im direkten Vergleich.',
      'Von der Anfrage bis zur Bestätigung.',
      'Klare Angaben. Verständliche Antworten.',
    ],
    descriptions: [
      'Konzeptillustration zur Webentwicklung: Seitenstruktur und der fiktive Website-Entwurf FORM auf Desktop und Handy.',
      'Website-Relaunch für Taxi B&B Essen: rekonstruierter Archivstand von Taxi Beige vom 23. Januar 2023 und Aufnahme der TaxiBB-Website vom 13. November 2026.',
      'Konzeptillustration eines Ablaufs von der Anfrage über die persönliche Freigabe und den Kalendereintrag bis zur E-Mail-Bestätigung.',
      'Konzeptillustration für SEO und AEO: Seiteninhalte verbinden Suchergebnisse mit einer Antwort samt Quellenangabe.',
    ],
    taxiDesktopAlt: 'Die Website von Taxi B&B Essen in der Desktop-Ansicht mit Anfrageformular.',
    taxiMobileAlt:
      'Dieselbe Taxi-B&B-Website auf dem Handy mit Anfrageformular, Anruf- und WhatsApp-Schaltfläche.',
    socialArchive: 'Archivierte Profilansicht · TikTok',
    socialProofLabel: 'Ehemaliger Instagram-Account · dailyraphood',
    socialAlt: 'Archivierter Screenshot des TikTok-Profils Mr Han mit dem Benutzernamen @issa3701.',
    demoText: 'Aus einer Idee\nwird ein Erlebnis.',
  },
  en: {
    labels: [
      'Concept · Web development',
      'Client project · Website redesign',
      'Concept · Automation',
      'Concept · Search & answers',
    ],
    captions: [
      'From design to a finished website.',
      'Compare Taxi Beige and Taxi B&B Essen directly.',
      'From enquiry to confirmation.',
      'Clear information. Useful answers.',
    ],
    descriptions: [
      'Web development concept: page structure and the fictional FORM website design on desktop and mobile.',
      'Taxi B&B Essen website redesign: reconstructed Taxi Beige archive dated 23 January 2023 and TaxiBB captured 13 November 2026.',
      'Workflow concept showing an enquiry, human approval, a calendar entry and an email confirmation.',
      'SEO and AEO concept: page content connects search results to an answer with a source citation.',
    ],
    taxiDesktopAlt: 'The Taxi B&B Essen website on desktop with its enquiry form.',
    taxiMobileAlt:
      'The same Taxi B&B website on mobile, with enquiry form, call and WhatsApp buttons.',
    socialArchive: 'Archived profile view · TikTok',
    socialProofLabel: 'Former Instagram account · dailyraphood',
    socialAlt: 'Archived screenshot of the Mr Han TikTok profile with the username @issa3701.',
    demoText: 'From an idea\nto an experience.',
  },
  es: {
    labels: [
      'Concepto · Desarrollo web',
      'Proyecto real · Rediseño web',
      'Concepto · Automatización',
      'Concepto · Búsqueda y respuestas',
    ],
    captions: [
      'Del diseño a una web terminada.',
      'Compara Taxi Beige y Taxi B&B Essen directamente.',
      'De la solicitud a la confirmación.',
      'Información clara. Respuestas útiles.',
    ],
    descriptions: [
      'Concepto de desarrollo web: estructura de página y diseño de la web ficticia FORM en escritorio y móvil.',
      'Rediseño web de Taxi B&B Essen: reconstrucción de Taxi Beige del 23 de enero de 2023 y captura de TaxiBB del 13 de noviembre de 2026.',
      'Concepto de proceso: solicitud, aprobación de una persona, entrada en el calendario y confirmación por correo.',
      'Concepto de SEO y AEO: el contenido conecta resultados de búsqueda con una respuesta que cita su fuente.',
    ],
    taxiDesktopAlt: 'La web de Taxi B&B Essen en escritorio con su formulario de solicitud.',
    taxiMobileAlt: 'La misma web de Taxi B&B en móvil, con formulario, llamada y WhatsApp.',
    socialArchive: 'Vista de perfil archivada · TikTok',
    socialProofLabel: 'Antigua cuenta de Instagram · dailyraphood',
    socialAlt: 'Captura archivada del perfil de TikTok Mr Han con el nombre de usuario @issa3701.',
    demoText: 'De una idea\na una experiencia.',
  },
} satisfies Record<HdLang, object>
