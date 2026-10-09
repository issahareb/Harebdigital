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
  heroChapters: { label: string; title: string }[]
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
  studioAlt: string
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
    title: 'Webdesign Essen, SEO & Automatisierung | Hareb Digital',
    description:
      'Hareb Digital aus Essen: individuelles Webdesign, technische SEO, AEO und Automatisierung. Direkt mit Issa Hareb – von der ersten Idee bis zum laufenden Betrieb.',
    skip: 'Zum Inhalt springen',
    menu: 'Menü öffnen',
    close: 'Menü schließen',
    nav: ['Arbeiten', 'Leistungen', 'Studio'],
    project: 'Projekt anfragen',
    language: 'Sprache wählen',
    headline: ['Webdesign.', 'Mit Substanz.'],
    intro:
      'Ein Auftritt, der zu dir passt. Technik, die mitdenkt. Ich entwickle Websites, die Eindruck machen und deinem Unternehmen Arbeit abnehmen.',
    workLink: 'Arbeiten entdecken',
    scroll: 'Scrollen & entdecken',
    motionOff: 'Animation ausschalten',
    motionOn: 'Animation einschalten',
    heroAlt:
      'Ein Lichtfaden führt durch eine räumliche Landschaft aus Glas und gebürstetem Metall.',
    heroChapters: [
      { label: 'SEO & AEO', title: 'Dein Angebot.\nKlar erklärt, leicht zu finden.' },
      { label: 'Automatisierung', title: 'Von der Anfrage\nbis zur Bestätigung.' },
    ],
    strip: ['Strategie & Design', 'Entwicklung & Automatisierung', 'SEO & AEO'],
    approachLabel: 'Der Anspruch',
    approach: ['Gutes Design zieht an.', 'Gute Technik trägt weiter.'],
    approachText:
      'Deine Website soll mehr können als gut aussehen. Sie soll erklären, was dich besonders macht, gefunden werden und aus Interesse eine konkrete Anfrage machen. Dafür bringe ich Gestaltung, Entwicklung und Sichtbarkeit zusammen.',
    servicesTitle: 'Was dein nächster\nSchritt braucht.',
    servicesIntro:
      'Vier Leistungen. Ein Ansprechpartner. Wir starten dort, wo es für deinen Betrieb den größten Unterschied macht.',
    serviceNames: ['Webdesign & Entwicklung', 'Website-Relaunch', 'Automatisierung', 'SEO & AEO'],
    serviceTags: [
      'Von der ersten Idee bis zum Launch',
      'Bestehendes gezielt besser machen',
      'Weniger Routine. Mehr Freiraum.',
      'Für Suchmaschinen und klare Antworten',
    ],
    workTitle: 'Nicht nur entworfen.\nIn Betrieb.',
    workIntro:
      'Ausgewählte Arbeit. Echte Anforderungen, konkrete Lösungen und ein Blick auf das Ergebnis.',
    caseType: 'Kundenprojekt · Mobilität',
    caseTitle: 'Eine Stadt.\nEin direkter Weg.',
    caseText:
      'Für Taxi B&B Essen: eine Website mit Buchungsstrecke, Verwaltungsbereich, automatischen E-Mails und einer klaren Struktur für die lokale Suche.',
    caseTags: ['Webdesign', 'Buchungssystem', 'Local SEO'],
    caseLink: 'Taxi B&B Essen besuchen',
    moreWork: 'Eigenes Produkt · GuardianGrid',
    socialTitle: 'Aufmerksamkeit\nbeginnt vor dem Klick.',
    socialText:
      'Mit meinem ehemaligen Instagram-Account dailyraphood habe ich Erfahrung mit Video-Einstiegen, Erzählweise und organischer Reichweite gesammelt. Auf TikTok findest du mich als Mr Han unter @issa3701.',
    socialSource:
      'Archivierter Nachweis aus meinem ehemaligen Instagram-Account dailyraphood: Reichweite eines einzelnen Beitrags ohne Werbebudget.',
    reach: 'erreichte Konten mit einem Beitrag',
    budget: 'Werbebudget',
    studioTitle: 'Dein Projekt.\nDirekt mit Issa.',
    studioText:
      'Ich bin Issa Hareb. Ich gestalte, entwickle und begleite digitale Projekte aus Essen. Du sprichst direkt mit dem Menschen, der deine Website baut – vom ersten Gespräch bis zu den Fragen nach dem Launch.',
    studioAlt: 'Bildschirmaufnahme dieser Website: Hareb Digital mit der Überschrift Webdesign. Mit Substanz.',
    studioLink: 'Mehr über Issa',
    processTitle: 'Klar im Ablauf.\nPersönlich im Kontakt.',
    faqTitle: 'Gute Fragen.\nKlare Antworten.',
    faqIntro: 'Das Wichtigste vor dem ersten Gespräch.',
    faq: [
      {
        question: 'Was macht Hareb Digital?',
        answer:
          'Hareb Digital ist das unabhängige Digitalstudio von Issa Hareb in Essen. Das Angebot umfasst individuelle Websites, die Überarbeitung bestehender Seiten, technische Suchmaschinenoptimierung (SEO), Answer Engine Optimization (AEO) und die Automatisierung wiederkehrender Abläufe.',
      },
      {
        question: 'Wie viel kostet eine Website?',
        answer:
          'Der Preis hängt von Seitenumfang, Gestaltung und Funktionen ab. Nach einem ersten Gespräch erhältst du ein Angebot mit klar definiertem Umfang und festem Preis. Eine pauschale Zahl ohne Blick auf dein Projekt wäre wenig hilfreich.',
      },
      {
        question: 'Wie lange dauert die Umsetzung?',
        answer:
          'Für eine Landingpage sind meist zwei bis drei Wochen vorgesehen, für eine mehrseitige Website vier bis acht Wochen. Der konkrete Zeitplan hängt von Inhalt, Funktionen und Abstimmungen ab und wird vor dem Start vereinbart.',
      },
      {
        question: 'Was ist der Unterschied zwischen SEO und AEO?',
        answer:
          'SEO hilft Suchmaschinen, Seiten zu finden, zu verstehen und passenden Suchanfragen zuzuordnen. AEO bereitet Inhalte so auf, dass Antwortsysteme klare, nachvollziehbare Informationen finden: mit direkten Antworten, eindeutigen Unternehmensangaben und passenden strukturierten Daten. Rankings oder Nennungen in KI-Antworten lassen sich nicht garantieren.',
      },
      {
        question: 'Arbeitest du nur mit Unternehmen aus Essen?',
        answer:
          'Hareb Digital sitzt in Essen und arbeitet auch überregional. Planung, Entwürfe und Abstimmungen können digital stattfinden. Für eine gute Zusammenarbeit zählen ein klarer Ansprechpartner und kurze Wege.',
      },
      {
        question: 'Kann meine bestehende Website erhalten bleiben?',
        answer:
          'Ja. Bei einem Relaunch prüfe ich zuerst, welche Inhalte, Adressen und Funktionen erhalten bleiben können. Sinnvolle Bestandteile werden weitergenutzt; notwendige URL-Änderungen werden mit Weiterleitungen geplant.',
      },
    ],
    contactTitle: ['Dein nächstes Kapitel.', 'Fangen wir an.'],
    contactText:
      'Erzähl mir, was du vorhast. Ein paar Sätze zu deinem Unternehmen und deiner Idee genügen für den Anfang.',
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
      'A presence that feels like you. Technology that thinks ahead. I build websites that make an impression and take work off your desk.',
    workLink: 'Explore the work',
    scroll: 'Scroll to explore',
    motionOff: 'Turn animation off',
    motionOn: 'Turn animation on',
    heroAlt: 'A light thread leads through a spatial landscape of glass and brushed metal.',
    heroChapters: [
      { label: 'SEO & AEO', title: 'What you offer.\nClear and easy to find.' },
      { label: 'Automation', title: 'From the first enquiry\nto the confirmation.' },
    ],
    strip: ['Strategy & design', 'Development & automation', 'SEO & AEO'],
    approachLabel: 'The approach',
    approach: ['Good design draws you in.', 'Good engineering takes you further.'],
    approachText:
      'Your website should do more than look good. It should explain what makes you different, be discoverable and turn interest into an enquiry. I bring design, development and visibility together to make that happen.',
    servicesTitle: 'What your next\nstep needs.',
    servicesIntro:
      'Four services. One point of contact. We start where it makes the greatest difference for your business.',
    serviceNames: ['Web design & development', 'Website redesign', 'Automation', 'SEO & AEO'],
    serviceTags: [
      'From the first idea to launch',
      'Make what exists work better',
      'Less routine. More room to grow.',
      'For search and clear answers',
    ],
    workTitle: 'Designed. Built.\nOut in the world.',
    workIntro: 'Selected work. Real requirements, concrete solutions and a look at the result.',
    caseType: 'Client project · Mobility',
    caseTitle: 'One city.\nA direct connection.',
    caseText:
      'For Taxi B&B Essen: a website with a booking flow, management dashboard, automated emails and a clear structure for local search.',
    caseTags: ['Web design', 'Booking system', 'Local SEO'],
    caseLink: 'Visit Taxi B&B Essen',
    moreWork: 'Own product · GuardianGrid',
    socialTitle: 'Attention starts\nbefore the click.',
    socialText:
      'My former Instagram account dailyraphood gave me hands-on experience with video openings, storytelling and organic reach. On TikTok, you can find me as Mr Han at @issa3701.',
    socialSource:
      'Archived evidence from my former Instagram account dailyraphood: the reach of a single post with no advertising spend.',
    reach: 'accounts reached with one post',
    budget: 'advertising spend',
    studioTitle: 'Your project.\nBuilt with Issa.',
    studioText:
      'I’m Issa Hareb. I design, develop and support digital projects from Essen, Germany. You work directly with the person building your website, from the first conversation to questions after launch.',
    studioAlt: 'Screenshot of this website: the German Hareb Digital homepage.',
    studioLink: 'More about Issa',
    processTitle: 'Clear process.\nPersonal contact.',
    faqTitle: 'Good questions.\nStraight answers.',
    faqIntro: 'The essentials before our first conversation.',
    faq: [
      {
        question: 'What does Hareb Digital do?',
        answer:
          'Hareb Digital is Issa Hareb’s independent digital studio in Essen, Germany. Services include bespoke websites, website redesign, technical search engine optimisation (SEO), Answer Engine Optimization (AEO) and automation of recurring workflows.',
      },
      {
        question: 'How much does a website cost?',
        answer:
          'The cost depends on the number of pages, design and functionality. After an initial conversation, you receive a proposal with a defined scope and a fixed price. A blanket figure without understanding your project would not be useful.',
      },
      {
        question: 'How long does a website take?',
        answer:
          'A landing page usually takes two to three weeks; a multi-page website four to eight weeks. The schedule depends on content, functionality and feedback and is agreed before work starts.',
      },
      {
        question: 'What is the difference between SEO and AEO?',
        answer:
          'SEO helps search engines find, understand and match pages to relevant searches. AEO makes information clear for answer systems, using direct answers, consistent business details and appropriate structured data. Rankings and mentions in AI answers cannot be guaranteed.',
      },
      {
        question: 'Do you only work with businesses in Essen?',
        answer:
          'The studio is based in Essen and also works remotely with businesses elsewhere. Planning, design reviews and discussions can all happen online.',
      },
      {
        question: 'Can my existing website be preserved?',
        answer:
          'Yes. A redesign begins by reviewing which content, URLs and features should be retained. Useful elements are reused, and necessary URL changes are planned with redirects.',
      },
    ],
    contactTitle: ['Your next chapter.', 'Let’s begin.'],
    contactText:
      'Tell me what you have in mind. A few lines about your business and your idea are enough to start.',
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
      'Una presencia que te representa. Tecnología que piensa más allá. Desarrollo webs que dejan huella y facilitan el trabajo de tu empresa.',
    workLink: 'Explorar proyectos',
    scroll: 'Desliza para descubrir',
    motionOff: 'Desactivar animación',
    motionOn: 'Activar animación',
    heroAlt: 'Un hilo de luz recorre un paisaje espacial de vidrio y metal cepillado.',
    heroChapters: [
      { label: 'SEO y AEO', title: 'Lo que ofreces.\nClaro y fácil de encontrar.' },
      { label: 'Automatización', title: 'Desde la primera consulta\nhasta la confirmación.' },
    ],
    strip: ['Estrategia y diseño', 'Desarrollo y automatización', 'SEO y AEO'],
    approachLabel: 'El enfoque',
    approach: ['El buen diseño atrae.', 'La buena tecnología te lleva más lejos.'],
    approachText:
      'Tu web debe hacer más que verse bien. Debe explicar qué te hace diferente, ser fácil de encontrar y convertir el interés en una consulta. Para lograrlo, uno diseño, desarrollo y visibilidad.',
    servicesTitle: 'Lo que necesita\ntu siguiente paso.',
    servicesIntro:
      'Cuatro servicios. Una persona de contacto. Empezamos donde más se note la diferencia para tu negocio.',
    serviceNames: ['Diseño y desarrollo web', 'Rediseño web', 'Automatización', 'SEO y AEO'],
    serviceTags: [
      'De la primera idea al lanzamiento',
      'Mejorar lo que ya existe',
      'Menos rutina. Más tiempo.',
      'Para búsquedas y respuestas claras',
    ],
    workTitle: 'Diseñado. Desarrollado.\nEn funcionamiento.',
    workIntro:
      'Proyectos seleccionados. Necesidades reales, soluciones concretas y resultados visibles.',
    caseType: 'Proyecto de cliente · Movilidad',
    caseTitle: 'Una ciudad.\nUna conexión directa.',
    caseText:
      'Para Taxi B&B Essen: una web con reservas, panel de gestión, correos automatizados y una estructura clara para las búsquedas locales.',
    caseTags: ['Diseño web', 'Sistema de reservas', 'SEO local'],
    caseLink: 'Visitar Taxi B&B Essen',
    moreWork: 'Producto propio · GuardianGrid',
    socialTitle: 'La atención empieza\nantes del clic.',
    socialText:
      'Con mi antigua cuenta de Instagram dailyraphood adquirí experiencia en inicios de vídeo, narrativa y alcance orgánico. En TikTok puedes encontrarme como Mr Han en @issa3701.',
    socialSource:
      'Datos archivados de mi antigua cuenta de Instagram dailyraphood: alcance de una sola publicación sin inversión publicitaria.',
    reach: 'cuentas alcanzadas con una publicación',
    budget: 'inversión publicitaria',
    studioTitle: 'Tu proyecto.\nDirectamente con Issa.',
    studioText:
      'Soy Issa Hareb. Diseño, desarrollo y acompaño proyectos digitales desde Essen, Alemania. Hablas directamente con quien construye tu web, desde la primera conversación hasta las dudas después del lanzamiento.',
    studioAlt: 'Captura de esta web: la página de inicio de Hareb Digital en alemán.',
    studioLink: 'Más sobre Issa',
    processTitle: 'Un proceso claro.\nUn trato personal.',
    faqTitle: 'Buenas preguntas.\nRespuestas claras.',
    faqIntro: 'Lo esencial antes de nuestra primera conversación.',
    faq: [
      {
        question: '¿Qué hace Hareb Digital?',
        answer:
          'Hareb Digital es el estudio digital independiente de Issa Hareb en Essen, Alemania. Ofrece webs a medida, rediseño, optimización técnica para buscadores (SEO), optimización para motores de respuesta (AEO) y automatización de tareas recurrentes.',
      },
      {
        question: '¿Cuánto cuesta una web?',
        answer:
          'El precio depende del número de páginas, el diseño y las funciones. Tras una primera conversación recibes una propuesta con alcance definido y precio fijo. Una cifra genérica sin conocer el proyecto no sería útil.',
      },
      {
        question: '¿Cuánto tarda el desarrollo?',
        answer:
          'Una landing page suele necesitar entre dos y tres semanas; una web con varias páginas, entre cuatro y ocho. El calendario depende de contenidos, funciones y revisiones, y se acuerda antes de empezar.',
      },
      {
        question: '¿Cuál es la diferencia entre SEO y AEO?',
        answer:
          'SEO ayuda a los buscadores a encontrar, comprender y relacionar páginas con búsquedas relevantes. AEO organiza la información para los sistemas de respuesta mediante respuestas directas, datos empresariales coherentes y datos estructurados apropiados. No se pueden garantizar posiciones ni menciones en respuestas de IA.',
      },
      {
        question: '¿Solo trabajas con empresas de Essen?',
        answer:
          'El estudio está en Essen y también trabaja a distancia con empresas de otras ciudades. La planificación, las revisiones y las conversaciones pueden realizarse online.',
      },
      {
        question: '¿Se puede conservar mi web actual?',
        answer:
          'Sí. Un rediseño comienza revisando qué contenidos, URLs y funciones conviene conservar. Se reutilizan los elementos útiles y se planifican redirecciones para los cambios de URL necesarios.',
      },
    ],
    contactTitle: ['Tu próximo capítulo.', 'Empecemos.'],
    contactText:
      'Cuéntame qué tienes en mente. Unas líneas sobre tu empresa y tu idea bastan para empezar.',
    footerLine: 'Diseño con criterio. Tecnología con sentido.',
    home: 'Inicio',
    breadcrumb: 'Ruta de navegación',
    details: 'Explorar servicio',
    contactDescription:
      'Planifica tu proyecto de diseño web, SEO o automatización directamente con Issa Hareb. Contacta con Hareb Digital en Essen por correo o prepara tu consulta.',
  },
}
