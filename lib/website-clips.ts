import type { HdLang } from './hd-texte'

/** Curated external references, linked to their Pinterest source; not client work. */
export const WEBSITE_CLIPS = [
  {
    "id": "core-sentinel",
    "title": "CoreSentinel",
    "src": "https://v1.pinimg.com/videos/iht/expMp4/50/04/18/50041837b24295fc79cbb70075b4137c_720w.mp4",
    "poster": "https://i.pinimg.com/videos/thumbnails/originals/50/04/18/50041837b24295fc79cbb70075b4137c.0000000.jpg",
    "color": "#cfd4dd",
    "source": "https://www.pinterest.com/pin/1140888518105646850/"
  },
  {
    "id": "unfold",
    "title": "Unfold",
    "src": "https://v1.pinimg.com/videos/iht/expMp4/1f/54/94/1f54947d5de2fa510e3fc075496afdd2_720w.mp4",
    "poster": "https://i.pinimg.com/videos/thumbnails/originals/1f/54/94/1f54947d5de2fa510e3fc075496afdd2.0000000.jpg",
    "color": "#f0eded",
    "source": "https://www.pinterest.com/pin/1140888518105751838/"
  },
  {
    "id": "lagunitas",
    "title": "Lagunitas",
    "src": "https://v1.pinimg.com/videos/iht/720p/17/34/b3/1734b310cd75a85112d7ff55c85fee49.mp4",
    "poster": "https://i.pinimg.com/videos/thumbnails/originals/17/34/b3/1734b310cd75a85112d7ff55c85fee49.0000000.jpg",
    "color": "#ece3c9",
    "source": "https://www.pinterest.com/pin/3448137209488679/"
  },
  {
    "id": "spectrum",
    "title": "Spectrum",
    "src": "https://v1.pinimg.com/videos/mc/720p/3c/51/70/3c51709dcb4f187d8f73e449555c50eb.mp4",
    "poster": "https://i.pinimg.com/videos/thumbnails/originals/3c/51/70/3c51709dcb4f187d8f73e449555c50eb.0000000.jpg",
    "color": "#535570",
    "source": "https://www.pinterest.com/pin/358528820357753597/"
  }
] as const

export const SHOWCASE_COPY: Record<HdLang, {
  label: string; title: string; intro: string; previous: string; next: string; play: string; pause: string;
  source: string; reference: string; continue: string; carousel: string; unavailable: string; noJs: string;
}> = {
  de: {
    label: 'Webdesign in Bewegung', title: 'Vier Ideen. Ein neuer Blick.',
    intro: 'Ausgewählte Designinspirationen für Animation, Interaktion und digitale Erlebnisse.',
    previous: 'Vorheriges Video', next: 'Nächstes Video', play: 'Video abspielen', pause: 'Video pausieren',
    source: 'Pinterest', reference: 'Designinspiration', continue: 'Zu den Leistungen', carousel: 'Videogalerie',
    unavailable: 'Video momentan nicht verfügbar', noJs: 'Wische durch die Vorschauen und entdecke die Designs.',
  },
  en: {
    label: 'Web design in motion', title: 'Four ideas. A fresh perspective.',
    intro: 'Selected design inspiration for animation, interaction and digital experiences.',
    previous: 'Previous video', next: 'Next video', play: 'Play video', pause: 'Pause video',
    source: 'Pinterest', reference: 'Design inspiration', continue: 'Explore services', carousel: 'Video gallery',
    unavailable: 'Video currently unavailable', noJs: 'Swipe through the previews to explore the designs.',
  },
  es: {
    label: 'Diseño web en movimiento', title: 'Cuatro ideas. Otra perspectiva.',
    intro: 'Inspiraciones de diseño para animación, interacción y experiencias digitales.',
    previous: 'Video anterior', next: 'Siguiente video', play: 'Reproducir video', pause: 'Pausar video',
    source: 'Pinterest', reference: 'Inspiración de diseño', continue: 'Ver servicios', carousel: 'Galería de videos',
    unavailable: 'Video no disponible por el momento', noJs: 'Desliza para explorar las vistas previas de los diseños.',
  },
}
