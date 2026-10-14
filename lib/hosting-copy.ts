import type { HdLang } from './hd-texte'

type HostingCopy = {
  label: string; title: string; intro: string
  cards: { title: string; text: string; items: string[] }[]
  promise: string; detail: string; scope: string; cta: string
  faq: { question: string; answer: string }[]
}

export const HOSTING_COPY: Record<HdLang, HostingCopy> = {
  de: {
    label: 'Hosting & laufende Betreuung',
    title: 'Mit dem Launch\ngeht es weiter.',
    intro: 'Wenn du deine Website bei mir hostest, betreue ich sie auch nach der Veröffentlichung. Betrieb, Wartung und laufende Weiterentwicklung gehören dabei zusammen.',
    cards: [
      { title: 'Hosting', text: 'Hosting ist das technische Zuhause deiner Website. Ich kümmere mich um die Bereitstellung und betreue die Umgebung, auf der dein Auftritt läuft. Du hast einen Ansprechpartner für Website und Betrieb.', items: ['Passende Hosting-Umgebung für dein Projekt', 'Domainanbindung und verschlüsselte Verbindung per HTTPS', 'Abstimmung zu Speicher, Datenbanken und externen Diensten'] },
      { title: 'Wartung', text: 'Auch nach dem Start braucht die Technik Aufmerksamkeit. Ich pflege die technische Basis, behebe Fehler und prüfe wichtige Funktionen nach Änderungen. So bleibt die Website im Alltag nutzbar.', items: ['Sicherheits- und Softwareupdates', 'Prüfung von Erreichbarkeit, Ladezeiten und zentralen Funktionen', 'Backup- und Wiederherstellungsplan passend zum Projekt'] },
      { title: 'Weiterentwicklung', text: 'Eine Website muss mit deinem Unternehmen und den Erwartungen deiner Besucher mitwachsen. Deshalb entwickle ich alle Websites, die ich hoste, laufend weiter, damit sie technisch und gestalterisch auf dem neuesten Stand bleiben.', items: ['Bedienung und Darstellung auf aktuellen Geräten verbessern', 'Inhalte, Struktur und technische SEO-Grundlagen weiter optimieren', 'Sinnvolle Anpassungen an neue Anforderungen und Möglichkeiten'] },
    ],
    promise: 'Deine Website bleibt in Entwicklung.',
    detail: 'Ich prüfe, wo Verbesserungen sinnvoll sind, stimme größere Änderungen mit dir ab und setze die vereinbarten Anpassungen um. Du musst nicht für jedes technische Thema einen neuen Dienstleister suchen.',
    scope: 'Hosting, Wartung und Weiterentwicklung werden vorab mit einem klaren Leistungsumfang und transparenten laufenden Kosten vereinbart. Update-Rhythmus, Überwachung und Backups richten sich nach dem Projekt. Größere neue Funktionen oder ein kompletter Relaunch werden gesondert abgestimmt.',
    cta: 'Hosting & Betreuung besprechen',
    faq: [
      { question: 'Was umfasst Hosting und Wartung bei dir?', answer: 'Hosting stellt deine Website online bereit. Bei der Wartung pflege ich die Software, kümmere mich um Sicherheitsupdates und Fehler und prüfe wichtige Funktionen. Domainanbindung, HTTPS, Überwachung und ein passendes Backup-Konzept besprechen wir für dein Projekt. Welche Leistungen enthalten sind und welche laufenden Kosten entstehen, steht vor dem Start im Angebot.' },
      { question: 'Wird meine Website nach dem Start weiterentwickelt?', answer: 'Ja. Alle Websites, die ich hoste, werden laufend weiterentwickelt, um sie technisch und gestalterisch auf dem neuesten Stand zu halten. Dazu gehören im vereinbarten Umfang Verbesserungen an Bedienung, mobiler Darstellung, Ladezeiten, Inhalten und technischen SEO-Grundlagen. Größere Erweiterungen oder ein vollständiger Relaunch werden vorab mit dir abgestimmt und separat angeboten.' },
    ],
  },
  en: {
    label: 'Hosting & ongoing support', title: 'Launch is\njust the beginning.',
    intro: 'When you host your website with me, I look after it beyond launch. Hosting, maintenance and continuous improvement work together.',
    cards: [
      { title: 'Hosting', text: 'Hosting is your website’s technical home. I handle deployment and look after the environment it runs on, giving you one point of contact for the website and its operation.', items: ['A hosting environment suited to your project', 'Domain connection and encrypted HTTPS access', 'Planning for storage, databases and external services'] },
      { title: 'Maintenance', text: 'The technology needs attention after launch too. I maintain the technical foundations, fix faults and check key functions after changes so the website stays useful day to day.', items: ['Security and software updates', 'Checks of availability, loading speed and key functions', 'A backup and recovery plan suited to the project'] },
      { title: 'Continuous improvement', text: 'Your website needs to grow with your business and your visitors’ expectations. I continually develop every website I host to keep its technology and design up to date.', items: ['Improve usability and presentation on current devices', 'Refine content, structure and technical SEO foundations', 'Adapt to relevant new requirements and opportunities'] },
    ],
    promise: 'Your website keeps moving forward.', detail: 'I review where improvements make sense, discuss larger changes with you and implement the agreed updates. You keep the same contact for ongoing technical work.',
    scope: 'We agree on the scope and recurring costs of hosting, maintenance and development in advance. Update frequency, monitoring and backups depend on the project. Major new features or a complete redesign are scoped separately.',
    cta: 'Discuss hosting & support',
    faq: [
      { question: 'What do hosting and maintenance include?', answer: 'Hosting makes your website available online. Maintenance covers software care, security updates, fixes and checks of key functions. We discuss domain connection, HTTPS, monitoring and a suitable backup plan for your project. The proposal defines the included services and recurring costs before work begins.' },
      { question: 'Will my website keep improving after launch?', answer: 'Yes. I continually develop every website I host to keep its technology and design up to date. Within the agreed scope, this includes improvements to usability, mobile presentation, loading speed, content and technical SEO foundations. Major additions or a complete redesign are discussed and quoted separately.' },
    ],
  },
  es: {
    label: 'Alojamiento y soporte continuo', title: 'El lanzamiento\nes solo el comienzo.',
    intro: 'Si alojas tu web conmigo, sigo cuidándola después de su publicación. El alojamiento, el mantenimiento y la mejora continua forman parte del mismo servicio de atención.',
    cards: [
      { title: 'Alojamiento', text: 'El alojamiento es la base técnica de tu web. Me encargo de publicarla y de cuidar el entorno en el que funciona. Tienes un único contacto para la web y su funcionamiento.', items: ['Un entorno de alojamiento adecuado para tu proyecto', 'Conexión del dominio y acceso cifrado mediante HTTPS', 'Planificación del almacenamiento, las bases de datos y los servicios externos'] },
      { title: 'Mantenimiento', text: 'La tecnología también necesita atención después del lanzamiento. Mantengo la base técnica, corrijo errores y reviso las funciones importantes tras los cambios para que la web siga siendo útil cada día.', items: ['Actualizaciones de seguridad y software', 'Revisión de disponibilidad, velocidad y funciones esenciales', 'Un plan de copias de seguridad y recuperación adecuado al proyecto'] },
      { title: 'Mejora continua', text: 'Tu web debe crecer con tu empresa y con las expectativas de tus visitantes. Por eso sigo desarrollando todas las webs que alojo, para mantener al día su tecnología y su diseño.', items: ['Mejorar la navegación y la presentación en dispositivos actuales', 'Optimizar contenidos, estructura y bases técnicas de SEO', 'Adaptar la web a nuevos requisitos y oportunidades relevantes'] },
    ],
    promise: 'Tu web sigue evolucionando.', detail: 'Reviso qué mejoras tienen sentido, consulto contigo los cambios importantes e implemento las actualizaciones acordadas. Mantienes el mismo contacto para el trabajo técnico continuo.',
    scope: 'Acordamos de antemano el alcance y los costos recurrentes del alojamiento, mantenimiento y desarrollo. La frecuencia de actualización, la supervisión y las copias de seguridad dependen del proyecto. Las funciones nuevas de gran alcance o un rediseño completo se presupuestan por separado.',
    cta: 'Hablar de alojamiento y soporte',
    faq: [
      { question: '¿Qué incluyen el alojamiento y el mantenimiento?', answer: 'El alojamiento permite que tu web esté disponible online. El mantenimiento incluye el cuidado del software, las actualizaciones de seguridad, la corrección de errores y la revisión de funciones esenciales. Acordamos la conexión del dominio, HTTPS, la supervisión y un plan de copias de seguridad adecuado al proyecto. La propuesta define los servicios incluidos y los costos recurrentes antes de empezar.' },
      { question: '¿Mi web seguirá mejorando después del lanzamiento?', answer: 'Sí. Sigo desarrollando todas las webs que alojo para mantener al día su tecnología y su diseño. Dentro del alcance acordado, esto incluye mejoras de navegación, presentación móvil, velocidad, contenidos y bases técnicas de SEO. Las ampliaciones importantes o un rediseño completo se acuerdan y presupuestan por separado.' },
    ],
  },
}
