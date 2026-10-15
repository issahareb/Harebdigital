import type { HdLang } from './hd-texte'

/** Visual directions for the capabilities showcase, separate from customer case studies. */
export const WEBSITE_CLIPS = [
  {
    "id": "iris-ai",
    "title": "IRIS AI",
    "src": "/videos/schau-1.mp4",
    "poster": "/videos/schau-1.jpg",
    "color": "#989994"
  },
  {
    "id": "core-sentinel",
    "title": "CoreSentinel",
    "src": "/videos/design/core-sentinel.mp4",
    "poster": "/videos/design/core-sentinel.jpg",
    "color": "#cfd4dd"
  },
  {
    "id": "unfold",
    "title": "Unfold",
    "src": "/videos/design/unfold.mp4",
    "poster": "/videos/design/unfold.jpg",
    "color": "#f0eded"
  },
  {
    "id": "lagunitas",
    "title": "Lagunitas",
    "src": "/videos/design/lagunitas.mp4",
    "poster": "/videos/design/lagunitas.jpg",
    "color": "#ece3c9"
  },
  {
    "id": "spectrum",
    "title": "Spectrum",
    "src": "/videos/design/spectrum.mp4",
    "poster": "/videos/design/spectrum.jpg",
    "color": "#535570"
  }
] as const

export const SHOWCASE_COPY: Record<HdLang, {
  label: string; title: string; intro: string; previous: string; next: string; play: string; pause: string;
  reference: string; continue: string; carousel: string; unavailable: string; noJs: string;
}> = {
  de: {
    label: 'Meine gestalterischen Möglichkeiten', title: 'So kann deine Website wirken.',
    intro: 'Ausdrucksstarke Gestaltung, räumliche Animationen und durchdachte Interaktionen. Entdecke mögliche Richtungen für deinen eigenen Auftritt.',
    previous: 'Vorheriges Video', next: 'Nächstes Video', play: 'Video abspielen', pause: 'Video pausieren',
    reference: 'Gestaltungsmöglichkeiten', continue: 'Zu den Leistungen', carousel: 'Videogalerie',
    unavailable: 'Video momentan nicht verfügbar', noJs: 'Wische durch die Vorschauen und entdecke die Designs.',
  },
  en: {
    label: 'My creative capabilities', title: 'What your website could feel like.',
    intro: 'Expressive design, spatial animation and thoughtful interaction. Explore possible directions for your own website.',
    previous: 'Previous video', next: 'Next video', play: 'Play video', pause: 'Pause video',
    reference: 'Creative possibilities', continue: 'Explore services', carousel: 'Video gallery',
    unavailable: 'Video currently unavailable', noJs: 'Swipe through the previews to explore the designs.',
  },
  es: {
    label: 'Mis posibilidades creativas', title: 'Así podría sentirse tu web.',
    intro: 'Diseño expresivo, animación espacial e interacciones cuidadas. Explora posibles caminos para tu propia web.',
    previous: 'Video anterior', next: 'Siguiente video', play: 'Reproducir video', pause: 'Pausar video',
    reference: 'Posibilidades creativas', continue: 'Ver servicios', carousel: 'Galería de videos',
    unavailable: 'Video no disponible por el momento', noJs: 'Desliza para explorar las vistas previas de los diseños.',
  },
}
