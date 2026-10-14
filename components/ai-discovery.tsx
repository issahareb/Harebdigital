'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Check, Copy } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'

const COPY = {
  de: {
    label: 'Sichtbarkeit in KI-Antworten', title: 'Frag nach mir.\nProbier’s selbst.',
    text: 'Was erfahren potenzielle Kunden über dich, wenn sie eine KI fragen? Hier siehst du eine gespeicherte ChatGPT-Antwort über mich. Stell selbst eine Frage zu Issa Hareb oder Hareb Digital und schau dir die aktuellen Antworten und Quellen an.',
    questions: ['Wer ist Issa Hareb?', 'Was ist Hareb Digital und welche Leistungen bietet das Unternehmen an?'],
    open: 'In ChatGPT fragen', copy: 'Frage kopieren', copied: 'Kopiert', error: 'Bitte die Frage oben markieren und kopieren.',
    other: 'Auch in Gemini oder Claude ausprobieren: Frage kopieren und dort einfügen.',
    caption: 'Auszug aus einer ChatGPT-Antwort vom 13.10.2026. Aus zwei Aufnahmen zusammengefügt.',
    archive: 'Archiv · 13.10.2026',
    scroll: 'Im Chat scrollen oder wischen', full: 'Vollständige Aufnahme öffnen', region: 'ChatGPT-Antwort, scrollbar',
    note: 'Historisches Beispiel, keine Live-Abfrage. Für den aktuellen Stand nutze „In ChatGPT fragen“. Antworten können je nach Frage, Modell und Websuche variieren.',
    alt: 'Gespeicherte ChatGPT-Antwort auf „Wer ist Issa Hareb?“: nennt Webentwicklung, Automatisierung, KI-Agenten und L.U.K.A.S. mit Quellenverweisen auf das Portfolio.',
  },
  en: {
    label: 'Visibility in AI answers', title: 'Ask about me.\nTry it yourself.',
    text: 'What do potential customers learn about you when they ask AI? Here is a saved ChatGPT answer about me. Ask about Issa Hareb or Hareb Digital and explore the current answers and sources yourself.',
    questions: ['Who is Issa Hareb?', 'What is Hareb Digital and what services does the business offer?'],
    open: 'Ask ChatGPT', copy: 'Copy question', copied: 'Copied', error: 'Please select and copy the question above.',
    other: 'Try Gemini or Claude too: copy the question and paste it there.',
    caption: 'Excerpt from a German ChatGPT answer dated 13 October 2026. Combined from two captures.',
    archive: 'Archive · 13 Oct 2026',
    scroll: 'Scroll or swipe inside the chat', full: 'Open complete capture', region: 'Scrollable ChatGPT answer',
    note: 'A historical example, not a live result. Use “Ask ChatGPT” for a current answer. Results may vary by question, model and web search.',
    alt: 'Saved German ChatGPT answer about Issa Hareb, mentioning web development, automation, AI agents and L.U.K.A.S., with portfolio sources.',
  },
  es: {
    label: 'Visibilidad en respuestas de IA', title: 'Pregunta por mí.\nPruébalo tú mismo.',
    text: '¿Qué descubren tus clientes cuando preguntan a una IA por ti? Aquí puedes ver una respuesta guardada de ChatGPT sobre mí. Pregunta por Issa Hareb o Hareb Digital y consulta las respuestas y fuentes actuales.',
    questions: ['¿Quién es Issa Hareb?', '¿Qué es Hareb Digital y qué servicios ofrece?'],
    open: 'Preguntar a ChatGPT', copy: 'Copiar pregunta', copied: 'Copiado', error: 'Selecciona y copia la pregunta de arriba.',
    other: 'Prueba también Gemini o Claude: copia la pregunta y pégala allí.',
    caption: 'Extracto de una respuesta de ChatGPT del 13 de octubre de 2026, en alemán. Dos capturas combinadas.',
    archive: 'Archivo · 13 oct 2026',
    scroll: 'Desliza dentro del chat', full: 'Abrir captura completa', region: 'Respuesta de ChatGPT desplazable',
    note: 'Ejemplo histórico, no una consulta en directo. Usa «Preguntar a ChatGPT» para una respuesta actual. Los resultados pueden variar según la pregunta, el modelo y la búsqueda web.',
    alt: 'Respuesta guardada en alemán de ChatGPT sobre Issa Hareb: desarrollo web, automatización, agentes de IA y L.U.K.A.S., con fuentes del portfolio.',
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
    <section className="ai-discovery" aria-labelledby="ai-discovery-title" id="ki-sichtbarkeit">
      <div>
        <span className="eyebrow">{t.label}</span>
        <h2 id="ai-discovery-title">{t.title}</h2>
        <p className="ai-discovery-intro">{t.text}</p>
        <div className="ai-discovery-questions">
          {t.questions.map((question, index) => (
            <div className="ai-discovery-question" key={question}>
              <p>{question}</p>
              <div className="ai-discovery-actions">
                <a href={`https://chatgpt.com/?q=${encodeURIComponent(question)}`} target="_blank" rel="noopener noreferrer">{t.open}<ArrowUpRight size={16} aria-hidden /></a>
                <button type="button" onClick={() => copyQuestion(index)} aria-label={`${t.copy}: ${question}`}>
                  <span className="control-confirm" data-confirmed={copied === index} aria-hidden="true"><Copy size={16} /><Check size={16} /></span>
                  {copied === index ? t.copied : t.copy}
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="ai-discovery-other">{t.other}</p>
        <nav className="ai-discovery-providers" aria-label={t.label}>
          <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer">Gemini <ArrowUpRight size={15} aria-hidden /></a>
          <a href="https://claude.ai/" target="_blank" rel="noopener noreferrer">Claude <ArrowUpRight size={15} aria-hidden /></a>
        </nav>
        <span className="ai-discovery-status" role="status">{error || (copied !== null ? t.copied : '')}</span>
      </div>
      <figure className="ai-discovery-proof">
        <div className="ai-chat-toolbar"><span>ChatGPT · {t.archive}</span><span>{t.scroll}<ArrowDown size={14} aria-hidden /></span></div>
        <div className="ai-chat-scroll" tabIndex={0} role="region" aria-label={t.region}>
          <div className="ai-chat-excerpt">
            <Image src="/studio/evidence/chatgpt-issa-hareb-full.webp" alt={t.alt} width={728} height={2160} sizes="(max-width: 800px) 90vw, 560px" draggable={false} />
          </div>
        </div>
        <a className="ai-chat-full" href="/studio/evidence/chatgpt-issa-hareb-full.webp" target="_blank" rel="noopener noreferrer">{t.full}<ArrowUpRight size={14} aria-hidden /></a>
        <figcaption>{t.caption}<span>{t.note}</span></figcaption>
      </figure>
    </section>
  )
}
