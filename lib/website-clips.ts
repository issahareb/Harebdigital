import type { HdLang } from './hd-texte'

/** Visual directions for the capabilities showcase, separate from customer case studies. */
export const WEBSITE_CLIPS = [
  {
    "id": "iris-ai",
    "title": "IRIS AI",
    alt: { de: 'Website-Design IRIS AI mit metallischer Roboterhand und leuchtenden Fingerspitzen.', en: 'IRIS AI website design with a metallic robot hand and glowing fingertips.', es: 'Diseño web IRIS AI con una mano robótica metálica y puntas de los dedos iluminadas.' },
    "src": "/videos/schau-1.mp4",
    "poster": "/videos/schau-1.jpg",
    "color": "#989994"
  },
  {
    "id": "core-sentinel",
    "title": "CoreSentinel",
    alt: { de: 'Website-Design CoreSentinel mit einem blauen, dreidimensionalen Glasobjekt auf hellem Hintergrund.', en: 'CoreSentinel website design with a blue three-dimensional glass object on a light background.', es: 'Diseño web CoreSentinel con un objeto tridimensional de vidrio azul sobre fondo claro.' },
    "src": "/videos/design/core-sentinel.mp4",
    "poster": "/videos/design/core-sentinel.jpg",
    "color": "#cfd4dd"
  },
  {
    "id": "unfold",
    "title": "Unfold",
    alt: { de: 'Website-Design Unfold mit großer weißer Schrift und einer rosa-orangefarbenen Glasform.', en: 'Unfold website design with large white lettering and a pink-orange glass shape.', es: 'Diseño web Unfold con letras blancas grandes y una forma de vidrio rosa y naranja.' },
    "src": "/videos/design/unfold.mp4",
    "poster": "/videos/design/unfold.jpg",
    "color": "#f0eded"
  },
  {
    "id": "lagunitas",
    "title": "Lagunitas",
    alt: { de: 'Website-Design für Lagunitas IPA mit Bierflasche, roter Typografie und cremefarbenem Hintergrund.', en: 'Lagunitas IPA website design with a beer bottle, red typography and a cream background.', es: 'Diseño web de Lagunitas IPA con una botella de cerveza, tipografía roja y fondo crema.' },
    "src": "/videos/design/lagunitas.mp4",
    "poster": "/videos/design/lagunitas.jpg",
    "color": "#ece3c9"
  },
  {
    "id": "spectrum",
    "title": "Spectrum",
    alt: { de: 'Website-Design Spectrum mit violettem Farbverlauf, weißer Typografie und blauem Lichtstreifen.', en: 'Spectrum website design with a purple gradient, white typography and a blue light strip.', es: 'Diseño web Spectrum con un degradado violeta, tipografía blanca y una franja de luz azul.' },
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
