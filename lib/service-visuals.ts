import type { HdLang } from './hd-texte'

/** Distinguish generated service concepts from the archived site and real client work. */
export const VISUAL_COPY = {
  de: {
    labels: [
      'Konzept · Webentwicklung',
      'Gestaltung · Webdesign',
      'Konzept · Automatisierung',
      'Konzept · Suche & Antworten',
    ],
    captions: [
      'Vom Entwurf zur fertigen Website.',
      'Vom alten Auftritt zum neuen Erlebnis · Konzeptillustration.',
      'Von der Anfrage bis zur Bestätigung.',
      'Klare Angaben. Verständliche Antworten.',
    ],
    descriptions: [
      'Konzeptillustration zur Webentwicklung: Seitenstruktur und der fiktive Website-Entwurf FORM auf Desktop und Handy.',
      'Konzeptillustration eines Website-Redesigns: links die ältere, überladene Website des fiktiven Studios FORM; rechts ein modernes, klares Layout mit passender Smartphone-Ansicht.',
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
      'Creative design · Web design',
      'Concept · Automation',
      'Concept · Search & answers',
    ],
    captions: [
      'From design to a finished website.',
      'From an old website to a fresh experience · Concept illustration.',
      'From enquiry to confirmation.',
      'Clear information. Useful answers.',
    ],
    descriptions: [
      'Web development concept: page structure and the fictional FORM website design on desktop and mobile.',
      'Website redesign concept: the fictional FORM studio’s older, crowded website on the left and a modern, clear layout with a matching mobile view on the right.',
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
      'Creatividad · Diseño web',
      'Concepto · Automatización',
      'Concepto · Búsqueda y respuestas',
    ],
    captions: [
      'Del diseño a una web terminada.',
      'De una web antigua a una nueva experiencia · Ilustración conceptual.',
      'De la solicitud a la confirmación.',
      'Información clara. Respuestas útiles.',
    ],
    descriptions: [
      'Concepto de desarrollo web: estructura de página y diseño de la web ficticia FORM en escritorio y móvil.',
      'Concepto de rediseño web: a la izquierda, la web antigua y recargada del estudio ficticio FORM; a la derecha, un diseño moderno y claro con su versión móvil.',
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
