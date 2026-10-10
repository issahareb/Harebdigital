import type { HdLang } from './hd-texte'

/** Distinguish generated service concepts from the archived site and real client work. */
export const VISUAL_COPY = {
  de: {
    labels: [
      'Konzept · Webentwicklung',
      'Archiv · frühere hareb.digital',
      'Konzept · Automatisierung',
      'Konzept · Suche & Antworten',
    ],
    captions: [
      'Vom Entwurf zur responsiven Website.',
      'Bestehendes prüfen. Gezielt erneuern.',
      'Von der Anfrage bis zur Bestätigung.',
      'Klare Angaben. Verständliche Antworten.',
    ],
    descriptions: [
      'Konzeptillustration zur Webentwicklung: Seitenstruktur und der fiktive Website-Entwurf FORM auf Desktop und Handy.',
      'Echte Bildschirmaufnahme der früheren hareb.digital-Seite als Ausgangspunkt für eine Überarbeitung.',
      'Konzeptillustration eines Ablaufs von der Anfrage über die persönliche Freigabe und den Kalendereintrag bis zur E-Mail-Bestätigung.',
      'Konzeptillustration für SEO und AEO: Seiteninhalte verbinden Suchergebnisse mit einer Antwort samt Quellenangabe.',
    ],
    taxiDesktopAlt: 'Die Website von Taxi B&B Essen in der Desktop-Ansicht mit Anfrageformular.',
    taxiMobileAlt:
      'Dieselbe Taxi-B&B-Website auf dem Handy mit Anfrageformular, Anruf- und WhatsApp-Schaltfläche.',
    socialArchive: 'Archivierte Profilansicht · TikTok',
    socialProofLabel: 'Ehemaliger Instagram-Account · dailyraphood',
    socialAlt: 'Archivierter Screenshot des TikTok-Profils Mr Han mit dem Benutzernamen @issa3701.',
    studioLabel: 'Originalcode dieser Website · Einblick in die Entwicklung',
    codeLabel: 'Wortweise Farbänderung beim Scrollen',
  },
  en: {
    labels: [
      'Concept · Web development',
      'Archive · previous hareb.digital',
      'Concept · Automation',
      'Concept · Search & answers',
    ],
    captions: [
      'From design to a responsive website.',
      'Review what exists. Improve what matters.',
      'From enquiry to confirmation.',
      'Clear information. Useful answers.',
    ],
    descriptions: [
      'Web development concept: page structure and the fictional FORM website design on desktop and mobile.',
      'An actual screenshot of the previous hareb.digital website as the starting point for a redesign.',
      'Workflow concept showing an enquiry, human approval, a calendar entry and an email confirmation.',
      'SEO and AEO concept: page content connects search results to an answer with a source citation.',
    ],
    taxiDesktopAlt: 'The Taxi B&B Essen website on desktop with its enquiry form.',
    taxiMobileAlt:
      'The same Taxi B&B website on mobile, with enquiry form, call and WhatsApp buttons.',
    socialArchive: 'Archived profile view · TikTok',
    socialProofLabel: 'Former Instagram account · dailyraphood',
    socialAlt: 'Archived screenshot of the Mr Han TikTok profile with the username @issa3701.',
    studioLabel: 'Original code from this website · Inside the development',
    codeLabel: 'Word-by-word colour change on scroll',
  },
  es: {
    labels: [
      'Concepto · Desarrollo web',
      'Archivo · antigua hareb.digital',
      'Concepto · Automatización',
      'Concepto · Búsqueda y respuestas',
    ],
    captions: [
      'Del diseño a una web adaptable.',
      'Revisar lo existente. Mejorar lo necesario.',
      'De la solicitud a la confirmación.',
      'Información clara. Respuestas útiles.',
    ],
    descriptions: [
      'Concepto de desarrollo web: estructura de página y diseño de la web ficticia FORM en escritorio y móvil.',
      'Captura real de la antigua web hareb.digital como punto de partida para un rediseño.',
      'Concepto de proceso: solicitud, aprobación de una persona, entrada en el calendario y confirmación por correo.',
      'Concepto de SEO y AEO: el contenido conecta resultados de búsqueda con una respuesta que cita su fuente.',
    ],
    taxiDesktopAlt: 'La web de Taxi B&B Essen en escritorio con su formulario de solicitud.',
    taxiMobileAlt: 'La misma web de Taxi B&B en móvil, con formulario, llamada y WhatsApp.',
    socialArchive: 'Vista de perfil archivada · TikTok',
    socialProofLabel: 'Antigua cuenta de Instagram · dailyraphood',
    socialAlt: 'Captura archivada del perfil de TikTok Mr Han con el nombre de usuario @issa3701.',
    studioLabel: 'Código original de esta web · Una mirada al desarrollo',
    codeLabel: 'Cambio de color por palabra al desplazarse',
  },
} satisfies Record<HdLang, object>
