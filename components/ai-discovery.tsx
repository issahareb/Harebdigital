'use client'

import { useState } from 'react'
import Link from 'next/link'
import { localizedPath } from '@/lib/locale'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'

const COPY = {
  de: {
    label: 'Sichtbarkeit in KI-Antworten', title: 'Frag nach mir.\nProbier’s selbst.',
    text: 'Wirst du schon empfohlen? So sah eine ChatGPT-Antwort über Hareb Digital aus. Frag selbst nach.',
    quote: 'Issa Hareb ist ein deutscher Unternehmer, autodidaktischer Full-Stack- und KI-Entwickler aus Essen. Er ist Gründer von Hareb Digital.',
    questions: ['Wer ist Issa Hareb?', 'Was ist Hareb Digital und welche Leistungen bietet das Unternehmen an?'],
    open: 'In ChatGPT fragen', copy: 'Frage kopieren', copied: 'Kopiert', error: 'Bitte die Frage oben markieren und kopieren.',
    other: 'Auch in Gemini oder Claude ausprobieren: Frage kopieren und dort einfügen.',
    caption: 'Wörtlicher Auszug, 13.10.2026.',
    archive: 'ChatGPT · 13.10.2026',
    full: 'Vollständige Aufnahme öffnen',
    note: 'Historisches Beispiel, keine Live-Abfrage. Für den aktuellen Stand nutze „In ChatGPT fragen“. Antworten können je nach Frage, Modell und Websuche variieren.',
  },
  en: {
    label: 'Visibility in AI answers', title: 'Ask about me.\nTry it yourself.',
    text: 'Are you being recommended? Explore this saved ChatGPT answer about Hareb Digital, then ask for yourself.',
    quote: 'Issa Hareb is a self-taught full-stack and AI developer from Essen, and the founder of Hareb Digital.',
    questions: ['Who is Issa Hareb?', 'What is Hareb Digital and what services does the business offer?'],
    open: 'Ask ChatGPT', copy: 'Copy question', copied: 'Copied', error: 'Please select and copy the question above.',
    other: 'Try Gemini or Claude too: copy the question and paste it there.',
    caption: 'Translated from a saved German answer, 13 October 2026.',
    archive: 'ChatGPT · 13 Oct 2026',
    full: 'Open complete capture',
    note: 'A historical example, not a live result. Use “Ask ChatGPT” for a current answer. Results may vary by question, model and web search.',
  },
  es: {
    label: 'Visibilidad en respuestas de IA', title: 'Pregunta por mí.\nPruébalo tú mismo.',
    text: '¿Ya te recomiendan? Explora esta respuesta guardada de ChatGPT sobre Hareb Digital y pregunta tú mismo.',
    quote: 'Issa Hareb es un desarrollador full-stack y de IA autodidacta de Essen, y el fundador de Hareb Digital.',
    questions: ['¿Quién es Issa Hareb?', '¿Qué es Hareb Digital y qué servicios ofrece?'],
    open: 'Preguntar a ChatGPT', copy: 'Copiar pregunta', copied: 'Copiado', error: 'Selecciona y copia la pregunta de arriba.',
    other: 'Prueba también Gemini o Claude: copia la pregunta y pégala allí.',
    caption: 'Traducción de una respuesta guardada en alemán, 13 de octubre de 2026.',
    archive: 'ChatGPT · 13 oct 2026',
    full: 'Abrir captura completa',
    note: 'Ejemplo histórico, no una consulta en directo. Usa «Preguntar a ChatGPT» para una respuesta actual. Los resultados pueden variar según la pregunta, el modelo y la búsqueda web.',
  },
}

export function AiDiscovery({ lang }: { lang: HdLang }) {
  const t = COPY[lang]
  const [copied, setCopied] = useState<number | null>(null)
  const [error, setError] = useState('')
  async function copyQuestion(index: number) {
    try {
      await navigator.clipboard.writeText(t.questions[index])
      setCopied(index)
      setError('')
    } catch {
      setError(t.error)
    }
  }
  return (
    <section data-track-section="ai-discovery-section-1" className="ai-discovery" aria-labelledby="ai-discovery-title" id="ki-sichtbarkeit">
      <div>
        <h2 id="ai-discovery-title">{t.label}</h2>
        <p className="ai-discovery-subtitle">{t.title.replace(/\n/g, ' ')}</p>
        <p className="ai-discovery-intro">{t.text}</p>
        <div className="ai-discovery-questions">
          {t.questions.slice(0, 1).map((question, index) => (
            <div className="ai-discovery-question" key={question}>
              <p>{question}</p>
              <div className="ai-discovery-actions">
                <a data-track-id="ai-discovery-a-2" href={`https://chatgpt.com/?q=${encodeURIComponent(question)}`} target="_blank" rel="noopener noreferrer" aria-label={`${t.open}: ${question}`}>{t.open}<ArrowUpRight size={16} aria-hidden /></a>
                <button data-track-id="ai-discovery-button-3" type="button" onClick={() => copyQuestion(index)} aria-label={`${t.copy}: ${question}`}>
                  <span className="control-confirm" data-confirmed={copied === index} aria-hidden="true"><Copy size={16} /><Check size={16} /></span>
                  {copied === index ? t.copied : t.copy}
                </button>
              </div>
            </div>
          ))}
        </div>

        <nav className="ai-discovery-providers" aria-label={t.label}>
          <a data-track-id="ai-discovery-a-4" href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer">Gemini <ArrowUpRight size={15} aria-hidden /></a>
          <a data-track-id="ai-discovery-a-5" href="https://claude.ai/" target="_blank" rel="noopener noreferrer">Claude <ArrowUpRight size={15} aria-hidden /></a>
        </nav>
        <Link className="text-link" href={localizedPath(lang, '/leistungen/gefunden-werden/')}>{lang === 'de' ? 'Mehr erfahren' : lang === 'en' ? 'Learn more' : 'Saber más'} ↗</Link>
        <span className="ai-discovery-status" role="status">{error || (copied !== null ? t.copied : '')}</span>
      </div>
      <figure className="ai-discovery-proof">
        <div className="ai-proof-toolbar"><span>{t.archive}</span><span>{lang === 'de' ? 'Im Bild scrollen ↓' : lang === 'en' ? 'Scroll inside ↓' : 'Desliza dentro ↓'}</span></div>
        <div className="ai-proof-scroll" tabIndex={0} role="region" aria-label={lang === 'de' ? 'Scrollbare originale ChatGPT-Aufnahme' : lang === 'en' ? 'Scrollable original ChatGPT capture' : 'Captura original de ChatGPT desplazable'}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/studio/evidence/chatgpt-issa-hareb-full.webp" width={728} height={2160} loading="lazy" alt={lang === 'de' ? 'Gespeicherte ChatGPT-Antwort über Issa Hareb und Hareb Digital vom 13. Oktober 2026. Vollständige Originalaufnahme.' : 'Original German ChatGPT answer about Issa Hareb and Hareb Digital, 13 October 2026.'} />
        </div>
        <figcaption><p>{t.note}</p><a className="text-link" href="/studio/evidence/chatgpt-issa-hareb-full.webp" target="_blank" rel="noopener noreferrer">{t.full}<ArrowUpRight size={14} aria-hidden /></a></figcaption>
      </figure>
    </section>
  )
}
