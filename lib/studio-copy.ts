import type { HdLang } from './hd-texte'

export type StudioCopy = {
  title: string
  description: string
  skip: string
  menu: string
  close: string
  nav: [string, string, string]
  project: string
  language: string
  headline: [string, string]
  intro: string
  workLink: string
  scroll: string
  motionOff: string
  motionOn: string
  heroAlt: string
  heroChapters: { label: string; title: string; description: string }[]
  strip: [string, string, string]
  approachLabel: string
  approach: [string, string]
  approachText: string
  servicesTitle: string
  servicesIntro: string
  serviceNames: string[]
  serviceTags: string[]
  workTitle: string
  workIntro: string
  caseType: string
  caseTitle: string
  caseText: string
  caseTags: string[]
  caseLink: string
  moreWork: string
  socialTitle: string
  socialText: string
  socialSource: string
  reach: string
  budget: string
  studioTitle: string
  studioText: string
  studioLink: string
  processTitle: string
  faqTitle: string
  faqIntro: string
  faq: { question: string; answer: string }[]
  contactTitle: [string, string]
  contactText: string
  footerLine: string
  home: string
  breadcrumb: string
  details: string
  contactDescription: string
}

export const STUDIO_COPY: Record<HdLang, StudioCopy> = {
  de: {
    title: 'Webdesign Essen & Webentwicklung | Hareb Digital',
    description:
      'Webdesign und Webentwicklung aus Essen: individuelle Websites, Webanwendungen und Automatisierung. Plane dein Projekt direkt mit Issa Hareb von Hareb Digital.',
    skip: 'Zum Inhalt springen',
    menu: 'Menü öffnen',
    close: 'Menü schließen',
    nav: ['Arbeiten', 'Leistungen', 'Studio'],
    project: 'Projekt anfragen',
    language: 'Sprache wählen',
    headline: ['Webdesign.', 'Aus Essen.'],
    intro:
      'Du möchtest eine Website erstellen lassen? Als Webdesigner und Webentwickler aus Essen verbinde ich Gestaltung, Inhalte und Technik. Für Unternehmen, die ihr Angebot klar zeigen und Kunden den Weg zur Anfrage erleichtern möchten.',
    workLink: 'Arbeiten entdecken',
    scroll: 'Scrollen & entdecken',
    motionOff: 'Animation ausschalten',
    motionOn: 'Animation einschalten',
    heroAlt:
      'Ein Lichtfaden führt durch eine räumliche Landschaft aus Glas und gebürstetem Metall.',
    heroChapters: [
      { label: 'SEO & AEO', title: 'Bei Google sichtbarer.\nAuch in KI-Antworten.', description: 'Damit Kunden dich auch über ChatGPT, Gemini und Claude entdecken.' },
      { label: 'Automatisierung', title: 'Bestellung da.\nBestätigung schon raus.', description: 'Verbinde Zahlung, Rechnung und Versand zu einem automatisierten Ablauf.' },
    ],
    strip: ['Strategie & Design', 'Entwicklung & Automatisierung', 'SEO & AEO'],
    approachLabel: 'Der Anspruch',
    approach: ['Gutes Design zieht an.', 'Gute Technik trägt weiter.'],
    approachText:
      'Was suchen deine Kunden? Welche Informationen brauchen sie, bevor sie anfragen? Daraus entwickle ich die Struktur deiner Website. Gestaltung und Technik sorgen dafür, dass sie auf dem Handy und am Rechner einfach zu bedienen ist.',
    servicesTitle: 'Websites entwickeln.\nAbläufe vereinfachen.',
    servicesIntro:
      'Webdesign und Webentwicklung für Unternehmen in Essen und darüber hinaus. Dazu kommen individuelle Anwendungen, Automatisierung und Social-Media-Inhalte, passend zu deinem Projekt.',
    serviceNames: ['Webdesign & Entwicklung', 'Website-Relaunch', 'Automatisierung', 'SEO & AEO'],
    serviceTags: [
      'Von der ersten Idee bis zur Veröffentlichung',
      'Bestehendes gezielt besser machen',
      'Weniger Routine. Mehr Freiraum.',
      'Sichtbarkeit in Suchmaschinen und KI-Antworten',
    ],
    workTitle: 'Nicht nur entworfen.\nIn Betrieb.',
    workIntro:
      'Ein Kundenprojekt und eine eigene Webanwendung zeigen, wie ich Gestaltung und Funktionen auf konkrete Aufgaben abstimme.',
    caseType: 'Kundenprojekt · Mobilität',
    caseTitle: 'Taxi anfragen.\nEinfach online.',
    caseText:
      'Fahrgäste können ihre Fahrt online anfragen. Taxi B&B Essen verwaltet die Buchungen über einen eigenen Bereich und versendet automatische E-Mails. Die Seitenstruktur ist auf die lokale Suche ausgerichtet.',
    caseTags: ['Webdesign', 'Buchungssystem', 'Lokale Suche'],
    caseLink: 'Taxi B&B Essen besuchen',
    moreWork: 'Eigenes Produkt · GuardianGrid',
    socialTitle: 'Aufmerksamkeit\nbeginnt vor dem Klick.',
    socialText:
      'Video-Einstiege, Schnitt und Erzählweise prägen, ob Menschen weiterschauen. Damit habe ich auf meinem früheren Instagram-Account dailyraphood und meinem TikTok-Profil Mr Han praktische Erfahrung gesammelt. Diese Erfahrung fließt in die Konzeption von Social-Media-Inhalten und Werbevideos ein.',
    socialSource:
      'Archivierte Instagram-Statistik von dailyraphood: Ein Beitrag erreichte rund 1,3 Millionen Konten ohne Werbebudget.',
    reach: 'erreichte Konten mit einem Beitrag',
    budget: 'Werbebudget',
    studioTitle: 'Dein Webentwickler.\nDirekt aus Essen.',
    studioText:
      'Ich bin Issa Hareb und entwickle digitale Projekte aus Essen. Konzept, Gestaltung und technische Umsetzung liegen bei mir. So kannst du Fragen direkt mit dem klären, der dein Projekt umsetzt.',
    studioLink: 'Mehr über Issa',
    processTitle: 'Klar im Ablauf.\nPersönlich im Kontakt.',
    faqTitle: 'Gute Fragen.\nKlare Antworten.',
    faqIntro: 'Das Wichtigste vor dem ersten Gespräch.',
    faq: [
      {
        question: 'Was macht Hareb Digital?',
        answer:
          'Hareb Digital ist mein unabhängiges Digitalstudio. Ich verbinde Webdesign und Webentwicklung mit individuellen Webanwendungen, Automatisierung und Social Media Marketing. Dazu gehören die Konzeption von Social-Media-Inhalten sowie Video- und Werbemittelproduktion. Mit Suchmaschinenoptimierung (SEO) und klar aufbereiteten Inhalten für KI-Antwortsysteme (AEO) verbessere ich die Grundlagen deiner Online-Sichtbarkeit.',
      },
      {
        question: 'Wie viel kostet eine Website?',
        answer:
          'Der Preis hängt vom Seitenumfang, der Gestaltung und den Funktionen ab. Sobald wir die Anforderungen geklärt haben, erhältst du ein Angebot mit festem Preis und klar beschriebenen Leistungen. Mögliche laufende Kosten, etwa für Hosting oder Betreuung, klären wir ebenfalls vorab.',
      },
      {
        question: 'Wie lange dauert die Umsetzung?',
        answer:
          'Als Orientierung gelten zwei bis drei Wochen für eine einzelne Landingpage und vier bis acht Wochen für eine Website mit mehreren Seiten. Funktionen, verfügbare Inhalte und Abstimmungen beeinflussen die Dauer. Den konkreten Zeitplan vereinbaren wir vor dem Start.',
      },
      {
        question: 'Was ist der Unterschied zwischen SEO und AEO?',
        answer:
          'SEO verbessert die Voraussetzungen dafür, dass deine Website bei passenden Suchanfragen gefunden wird. AEO steht für Answer Engine Optimization: Inhalte werden so aufbereitet, dass KI-Antwortsysteme wie ChatGPT sie leichter verstehen und als Quelle nutzen können. Dazu gehören klare Antworten und eindeutige Unternehmensangaben. Platzierungen oder Nennungen lassen sich nicht garantieren.',
      },
      {
        question: 'Arbeitest du nur mit Unternehmen aus Essen?',
        answer:
          'Ich arbeite von Essen aus und betreue auch überregionale Projekte. Planung, Entwürfe und Abstimmungen können digital stattfinden. Für eine gute Zusammenarbeit zählen ein klarer Ansprechpartner und kurze Wege.',
      },
      {
        question: 'Kann meine bestehende Website erhalten bleiben?',
        answer:
          'Ja. Bei einem Relaunch prüfe ich zuerst, welche Inhalte, Adressen und Funktionen erhalten bleiben können. Sinnvolle Bestandteile werden weitergenutzt; notwendige URL-Änderungen werden mit Weiterleitungen geplant.',
      },
    ],
    contactTitle: ['Was hast du vor?', 'Lass uns sprechen.'],
    contactText:
      'Erzähl mir kurz von deinem Unternehmen und davon, was du erreichen oder verbessern möchtest. Wenn du bereits eine Website hast, schick gern den Link mit.',
    footerLine: 'Gestaltung mit Haltung. Technik mit Verstand.',
    home: 'Startseite',
    breadcrumb: 'Brotkrumennavigation',
    details: 'Leistung entdecken',
    contactDescription:
      'Plane dein Webdesign-, SEO- oder Automatisierungsprojekt direkt mit Issa Hareb. Kontakt zu Hareb Digital in Essen per E-Mail und Projektanfrage.',
  },
  en: {
    title: 'Web Design, SEO & Automation in Essen | Hareb Digital',
    description:
      'Independent web design, technical SEO, AEO and automation from Essen, Germany. Work directly with Issa Hareb, from the first idea to a website in operation.',
    skip: 'Skip to content',
    menu: 'Open menu',
    close: 'Close menu',
    nav: ['Work', 'Services', 'Studio'],
    project: 'Start a project',
    language: 'Choose language',
    headline: ['Digital.', 'With substance.'],
    intro:
      'I build websites that explain what you offer and make it easy for customers to enquire. Tailored automation takes recurring tasks off your hands.',
    workLink: 'Explore the work',
    scroll: 'Scroll to explore',
    motionOff: 'Turn animation off',
    motionOn: 'Turn animation on',
    heroAlt: 'A light thread leads through a spatial landscape of glass and brushed metal.',
    heroChapters: [
      { label: 'SEO & AEO', title: 'More visible on Google.\nAnd in AI answers.', description: 'Help customers discover you through ChatGPT, Gemini and Claude, too.' },
      { label: 'Automation', title: 'Order received.\nConfirmation sent.', description: 'Connect payments, invoices and shipping in one automated workflow.' },
    ],
    strip: ['Strategy & design', 'Development & automation', 'SEO & AEO'],
    approachLabel: 'The approach',
    approach: ['Good design draws you in.', 'Good engineering takes you further.'],
    approachText:
      'What are your customers looking for? What do they need to know before getting in touch? Those questions shape the structure of your website. Design and development make it easy to use on mobile and desktop.',
    servicesTitle: 'The right solution.\nFor your business.',
    servicesIntro:
      'A new website, a focused redesign or an automated workflow: together, we work out what will help your business.',
    serviceNames: ['Web design & development', 'Website redesign', 'Automation', 'SEO & AEO'],
    serviceTags: [
      'From the first idea to launch',
      'Make what exists work better',
      'Less routine. More room to grow.',
      'Visibility in search engines and AI answers',
    ],
    workTitle: 'Designed. Built.\nOut in the world.',
    workIntro: 'A client project and my own web application show how I connect design and functionality to practical needs.',
    caseType: 'Client project · Mobility',
    caseTitle: 'Request a taxi.\nSimply online.',
    caseText:
      'Passengers can request a ride online. Taxi B&B Essen manages bookings through a dedicated dashboard and sends automated emails. The website structure supports local search.',
    caseTags: ['Web design', 'Booking system', 'Local SEO'],
    caseLink: 'Visit Taxi B&B Essen',
    moreWork: 'Own product · GuardianGrid',
    socialTitle: 'Attention starts\nbefore the click.',
    socialText:
      'Video openings, editing and storytelling shape whether people keep watching. I gained hands-on experience through my former Instagram account dailyraphood and my TikTok profile Mr Han. That experience informs how I plan social media content and promotional videos.',
    socialSource:
      'Archived Instagram statistics from dailyraphood: one post reached around 1.3 million accounts with no advertising spend.',
    reach: 'accounts reached with one post',
    budget: 'advertising spend',
    studioTitle: 'Your project.\nBuilt with Issa.',
    studioText:
      'I’m Issa Hareb, and I develop digital projects from Essen, Germany. I handle planning, design and development, so you can discuss questions directly with the person building your project.',
    studioLink: 'More about Issa',
    processTitle: 'Clear process.\nPersonal contact.',
    faqTitle: 'Good questions.\nStraight answers.',
    faqIntro: 'The essentials before our first conversation.',
    faq: [
      {
        question: 'What does Hareb Digital do?',
        answer:
          'Hareb Digital is my independent digital studio. I build websites, improve existing sites and automate recurring tasks. Search engine optimisation (SEO) and content prepared for AI answer systems (AEO) help strengthen the foundations of your online visibility.',
      },
      {
        question: 'How much does a website cost?',
        answer:
          'The cost depends on the number of pages, design and features. Once we have clarified the requirements, you receive a fixed-price proposal with a defined scope. We also discuss any ongoing costs, such as hosting or support, before work begins.',
      },
      {
        question: 'How long does a website take?',
        answer:
          'As a guide, a single landing page takes two to three weeks and a multi-page website four to eight. Features, available content and feedback affect the schedule. We agree on the timeline before work starts.',
      },
      {
        question: 'What is the difference between SEO and AEO?',
        answer:
          'SEO helps your website become discoverable for relevant searches. AEO stands for Answer Engine Optimization: it prepares content so AI answer systems such as ChatGPT can understand it and use it as a source. This includes clear answers and consistent business details. Rankings and mentions cannot be guaranteed.',
      },
      {
        question: 'Do you only work with businesses in Essen?',
        answer:
          'I work from Essen and also collaborate remotely with businesses elsewhere. Planning, design reviews and discussions can all happen online.',
      },
      {
        question: 'Can my existing website be preserved?',
        answer:
          'Yes. A redesign begins by reviewing which content, URLs and features should be retained. Useful elements are reused, and necessary URL changes are planned with redirects.',
      },
    ],
    contactTitle: ['What do you have in mind?', 'Let’s talk.'],
    contactText:
      'Tell me a little about your business and what you want to achieve or improve. If you already have a website, include the link.',
    footerLine: 'Considered design. Thoughtful engineering.',
    home: 'Home',
    breadcrumb: 'Breadcrumb',
    details: 'Explore service',
    contactDescription:
      'Plan your web design, SEO or automation project directly with Issa Hareb. Contact Hareb Digital in Essen by email or prepare a project enquiry.',
  },
  es: {
    title: 'Diseño web, SEO y automatización | Hareb Digital, Essen',
    description:
      'Diseño web a medida, SEO técnico, AEO y automatización desde Essen, Alemania. Trabaja directamente con Issa Hareb, desde la idea hasta la puesta en marcha.',
    skip: 'Saltar al contenido',
    menu: 'Abrir menú',
    close: 'Cerrar menú',
    nav: ['Proyectos', 'Servicios', 'Estudio'],
    project: 'Iniciar un proyecto',
    language: 'Elegir idioma',
    headline: ['Digital.', 'Con sustancia.'],
    intro:
      'Desarrollo webs que explican lo que ofreces y facilitan que tus clientes te contacten. Las automatizaciones a medida se encargan de las tareas repetitivas.',
    workLink: 'Explorar proyectos',
    scroll: 'Desliza para descubrir',
    motionOff: 'Desactivar animación',
    motionOn: 'Activar animación',
    heroAlt: 'Un hilo de luz recorre un paisaje espacial de vidrio y metal cepillado.',
    heroChapters: [
      { label: 'SEO y AEO', title: 'Más visible en Google.\nY en respuestas de IA.', description: 'Para que tus clientes también te descubran en ChatGPT, Gemini y Claude.' },
      { label: 'Automatización', title: 'Pedido recibido.\nConfirmación enviada.', description: 'Conecta pagos, facturas y envíos en un proceso automatizado.' },
    ],
    strip: ['Estrategia y diseño', 'Desarrollo y automatización', 'SEO y AEO'],
    approachLabel: 'El enfoque',
    approach: ['El buen diseño atrae.', 'La buena tecnología te lleva más lejos.'],
    approachText:
      '¿Qué buscan tus clientes? ¿Qué necesitan saber antes de contactarte? Estas preguntas definen la estructura de tu web. El diseño y el desarrollo hacen que resulte fácil de usar tanto en el móvil como en la computadora.',
    servicesTitle: 'La solución adecuada.\nPara tu negocio.',
    servicesIntro:
      'Una web nueva, una renovación puntual o un proceso automatizado: juntos definimos qué necesita tu negocio.',
    serviceNames: ['Diseño y desarrollo web', 'Rediseño web', 'Automatización', 'SEO y AEO'],
    serviceTags: [
      'De la primera idea al lanzamiento',
      'Mejorar lo que ya existe',
      'Menos rutina. Más tiempo.',
      'Visibilidad en buscadores y respuestas de IA',
    ],
    workTitle: 'Diseñado. Desarrollado.\nEn funcionamiento.',
    workIntro:
      'Un proyecto para un cliente y una aplicación propia muestran cómo adapto el diseño y las funciones a necesidades concretas.',
    caseType: 'Proyecto de cliente · Movilidad',
    caseTitle: 'Solicita tu taxi.\nFácil y en línea.',
    caseText:
      'Los pasajeros pueden solicitar un viaje en línea. Taxi B&B Essen gestiona las reservas desde un panel propio y envía correos automáticos. La estructura de la web está orientada a las búsquedas locales.',
    caseTags: ['Diseño web', 'Sistema de reservas', 'SEO local'],
    caseLink: 'Visitar Taxi B&B Essen',
    moreWork: 'Producto propio · GuardianGrid',
    socialTitle: 'La atención empieza\nantes del clic.',
    socialText:
      'El inicio de un video, la edición y la narrativa influyen en que la gente siga mirando. Adquirí experiencia práctica con mi antigua cuenta de Instagram dailyraphood y mi perfil de TikTok Mr Han. Esa experiencia guía la creación de conceptos para redes sociales y videos publicitarios.',
    socialSource:
      'Estadísticas archivadas de Instagram de dailyraphood: una publicación alcanzó alrededor de 1,3 millones de cuentas sin inversión publicitaria.',
    reach: 'cuentas alcanzadas con una publicación',
    budget: 'inversión publicitaria',
    studioTitle: 'Tu proyecto.\nDirectamente con Issa.',
    studioText:
      'Soy Issa Hareb y desarrollo proyectos digitales desde Essen, Alemania. Me encargo de la planificación, el diseño y el desarrollo. Así puedes resolver tus dudas directamente con quien realiza tu proyecto.',
    studioLink: 'Más sobre Issa',
    processTitle: 'Un proceso claro.\nUn trato personal.',
    faqTitle: 'Buenas preguntas.\nRespuestas claras.',
    faqIntro: 'Lo esencial antes de nuestra primera conversación.',
    faq: [
      {
        question: '¿Qué hace Hareb Digital?',
        answer:
          'Hareb Digital es mi estudio digital independiente. Desarrollo webs, mejoro sitios existentes y automatizo tareas repetitivas. La optimización para buscadores (SEO) y los contenidos preparados para sistemas de respuesta con IA (AEO) refuerzan las bases de tu visibilidad en línea.',
      },
      {
        question: '¿Cuánto cuesta una web?',
        answer:
          'El precio depende de la cantidad de páginas, el diseño y las funciones. Una vez definidos los requisitos, recibes una propuesta con precio fijo y alcance detallado. También aclaramos de antemano los posibles costos recurrentes, como alojamiento o mantenimiento.',
      },
      {
        question: '¿Cuánto tarda el desarrollo?',
        answer:
          'Como orientación, una landing page requiere de dos a tres semanas y una web con varias páginas de cuatro a ocho. Las funciones, los contenidos disponibles y las revisiones influyen en el plazo. Acordamos el calendario antes de empezar.',
      },
      {
        question: '¿Cuál es la diferencia entre SEO y AEO?',
        answer:
          'El SEO ayuda a que tu web pueda encontrarse en búsquedas relevantes. AEO significa Answer Engine Optimization: prepara los contenidos para que sistemas de respuesta con IA, como ChatGPT, puedan comprenderlos y usarlos como fuente. Incluye respuestas claras y datos coherentes de la empresa. No se pueden garantizar posiciones ni menciones.',
      },
      {
        question: '¿Solo trabajas con empresas de Essen?',
        answer:
          'Trabajo desde Essen y también colaboro a distancia con empresas de otras ciudades. La planificación, las revisiones y las conversaciones pueden realizarse online.',
      },
      {
        question: '¿Se puede conservar mi web actual?',
        answer:
          'Sí. Un rediseño comienza revisando qué contenidos, URLs y funciones conviene conservar. Se reutilizan los elementos útiles y se planifican redirecciones para los cambios de URL necesarios.',
      },
    ],
    contactTitle: ['¿Qué tienes en mente?', 'Hablemos.'],
    contactText:
      'Cuéntame brevemente sobre tu empresa y qué te gustaría lograr o mejorar. Si ya tienes una web, puedes incluir el enlace.',
    footerLine: 'Diseño con criterio. Tecnología con sentido.',
    home: 'Inicio',
    breadcrumb: 'Ruta de navegación',
    details: 'Explorar servicio',
    contactDescription:
      'Planifica tu proyecto de diseño web, SEO o automatización directamente con Issa Hareb. Contacta con Hareb Digital en Essen por correo o prepara tu consulta.',
  },
}
