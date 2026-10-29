import Link from 'next/link'
import type { HdLang } from '@/lib/hd-texte'
import { localizedPath } from '@/lib/locale'

const COPY = {
 de: { more: 'Mehr erfahren', cards: [
 ['social', 'Content, der neugierig macht.', 'Von der ersten Sekunde bis zur passenden Landingpage.'],
 ['studio', 'Deine Idee. Mein Handwerk.', 'Direkt mit mir arbeiten. Von der Planung bis zum Start.'],
 ['ablauf', 'Klarer Ablauf. Kurze Wege.', 'So wird aus deinem Vorhaben eine fertige Website.'],
 ['hosting-wartung', 'Live ist erst der Anfang.', 'Hosting, Wartung und Betreuung passend zu deinem Projekt.'],
 ['faq', 'Noch eine Frage?', 'Antworten zu Kosten, Inhalten und Zusammenarbeit.'],
 ] },
 en: { more: 'Learn more', cards: [
 ['social', 'Content that sparks interest.', 'From the opening seconds to the right landing page.'],
 ['studio', 'Your idea. My craft.', 'Work directly with me from planning to launch.'],
 ['ablauf', 'A clear process.', 'How your idea becomes a finished website.'],
 ['hosting-wartung', 'Launch is the beginning.', 'Hosting, maintenance and ongoing support.'],
 ['faq', 'Any questions?', 'Costs, content and working together.'],
 ] },
 es: { more: 'Saber más', cards: [
 ['social', 'Contenido que despierta interés.', 'Del primer segundo a la página adecuada.'],
 ['studio', 'Tu idea. Mi trabajo.', 'Contacto directo desde el plan hasta el lanzamiento.'],
 ['ablauf', 'Un proceso claro.', 'De tu idea a una web terminada.'],
 ['hosting-wartung', 'Publicar es el principio.', 'Alojamiento, mantenimiento y soporte.'],
 ['faq', '¿Alguna pregunta?', 'Costes, contenidos y colaboración.'],
 ] },
}
export function HomeMore({ lang }: { lang: HdLang }) {
 const t = COPY[lang]
 return <section className="home-more wrap section-space" aria-label={t.more}>{t.cards.map(([id,title,text]) => <article id={id} key={id}><h2>{title}</h2><p>{text}</p><Link className="text-link" href={`${localizedPath(lang, '/zusammenarbeit/')}#${id}`}>{t.more} ↗</Link></article>)}</section>
}
