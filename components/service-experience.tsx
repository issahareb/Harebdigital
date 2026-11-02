'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, Mail, Search, Sparkles, Pause, Play, SlidersHorizontal } from 'lucide-react'
import type { HdLang } from '@/lib/hd-texte'
import s from './service-experience.module.css'

const COPY = {
  de: { example:'Interaktives Konzept', before:'Vorher', after:'Nachher', compare:'Vorher und Nachher vergleichen', studio:'AREAL / STUDIO', headline:'Räume, die bleiben.', intro:'Architektur mit Haltung. Klar bis ins Detail.', project:'Projekt entdecken', oldTitle:'Willkommen auf unserer Website!', oldIntro:'Ihr Partner für Architektur, Planung und Gestaltung.', oldNav:'Startseite · Leistungen · Über uns · Kontakt', steps:['Anfrage','Freigabe','Bestätigung'], details:['Eine Anfrage trifft ein. Alle wichtigen Angaben werden strukturiert aufgenommen.','Du prüfst die Angaben und entscheidest, welcher nächste Schritt passt.','Nach deiner Freigabe geht die Bestätigung an den Kunden.'], play:'Animation starten',pause:'Animation anhalten', search:'Suche', ai:'KI-Antwort', query:'Webdesign für mein Unternehmen', result:'Dein Angebot. Klar auffindbar.', answer:'Strukturierte Inhalte verbinden dein Angebot mit passenden Fragen.', source:'Quelle: deine Website', flow:'Dein Ablauf. In Bewegung.', choose:'Schritt auswählen' },
  en: { example:'Interactive concept', before:'Before',after:'After',compare:'Compare before and after',studio:'AREAL / STUDIO',headline:'Spaces that stay with you.',intro:'Architecture with purpose. Clear in every detail.',project:'Explore project',oldTitle:'Welcome to our website!',oldIntro:'Your partner for architecture, planning and design.',oldNav:'Home · Services · About · Contact',steps:['Enquiry','Approval','Confirmation'],details:['An enquiry arrives. Relevant details are captured in a clear structure.','You review the details and choose the next step.','After your approval, the customer receives a confirmation.'],play:'Play animation',pause:'Pause animation',search:'Search',ai:'AI answer',query:'Web design for my business',result:'Your offer. Clearly discoverable.',answer:'Structured content connects your offer to relevant questions.',source:'Source: your website',flow:'Your workflow. In motion.',choose:'Choose a step' },
  es: { example:'Concepto interactivo',before:'Antes',after:'Después',compare:'Comparar antes y después',studio:'AREAL / STUDIO',headline:'Espacios que permanecen.',intro:'Arquitectura con criterio. Claridad en cada detalle.',project:'Ver proyecto',oldTitle:'¡Bienvenido a nuestra web!',oldIntro:'Tu socio en arquitectura, planificación y diseño.',oldNav:'Inicio · Servicios · Nosotros · Contacto',steps:['Solicitud','Aprobación','Confirmación'],details:['Llega una solicitud y se organizan los datos relevantes.','Revisas los datos y eliges el siguiente paso.','Tras tu aprobación, el cliente recibe la confirmación.'],play:'Iniciar animación',pause:'Pausar animación',search:'Búsqueda',ai:'Respuesta de IA',query:'Diseño web para mi empresa',result:'Tu oferta. Fácil de encontrar.',answer:'El contenido estructurado conecta tu oferta con preguntas relevantes.',source:'Fuente: tu web',flow:'Tu proceso. En movimiento.',choose:'Elegir paso' },
}

export function ServiceExperience({ index, lang }: { index: number; lang: HdLang }) {
  const t = COPY[lang]
  const root = useRef<HTMLDivElement>(null)
  const [reveal,setReveal] = useState(55)
  const [step,setStep] = useState(0)
  const [running,setRunning] = useState(true)
  const [visible,setVisible] = useState(false)
  const [reduced,setReduced] = useState(true)
  useEffect(() => {
    const preference=matchMedia('(prefers-reduced-motion: reduce)')
    const sync=()=>setReduced(preference.matches)
    sync(); preference.addEventListener('change',sync)
    let intersecting=false
    const visibility=()=>setVisible(intersecting&&!document.hidden)
    const observer=new IntersectionObserver(([entry])=>{intersecting=entry.isIntersecting;visibility()})
    if(root.current) observer.observe(root.current)
    document.addEventListener('visibilitychange',visibility)
    return()=>{preference.removeEventListener('change',sync);observer.disconnect();document.removeEventListener('visibilitychange',visibility)}
  },[])
  useEffect(()=>{
    if(index!==2 || !visible || !running || reduced) return
    let timer: ReturnType<typeof setInterval> | undefined
    const sync=()=>{clearInterval(timer);if(!document.hidden)timer=setInterval(()=>setStep(value=>(value+1)%3),2800)}
    sync();document.addEventListener('visibilitychange',sync)
    return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',sync)}
  },[index,visible,running,reduced])
  const icons=[Mail,SlidersHorizontal,Check]
  return <div ref={root} className={s.root} data-running={visible && running && !reduced}>
    <span className={s.example}>{t.example}</span>
    {index===1 ? <>
      <div className={s.compare}>
        <div className={s.oldSite}><div>{t.oldNav}</div><h3>{t.oldTitle}</h3><p>{t.oldIntro}</p><div className={s.oldImage}/><div className={s.oldColumns}><span/><span/><span/></div></div>
        <div className={s.newSite} style={{clipPath:`inset(0 ${100-reveal}% 0 0)`}}><div className={s.miniNav}><b>{t.studio}</b><span>01 / 03</span></div><div className={s.newHero}><h3>{t.headline}</h3><div className={s.architecture}><i/><i/><i/></div></div><p>{t.intro}</p><span className={s.miniLink}>{t.project}<ArrowUpRight size={15} aria-hidden/></span></div>
        <div className={s.divider} style={{left:`${reveal}%`}}><span><SlidersHorizontal size={15} aria-hidden/></span></div>
        <div className={s.comparisonLabels}><span>{t.after}</span><span>{t.before}</span></div>
      </div>
      <label className={s.slider}><span>{t.compare}</span><input type="range" min="0" max="100" value={reveal} onChange={event=>setReveal(+event.target.value)} aria-label={t.compare}/></label>
    </> : index===2 ? <div className={s.workflow}>
      <div className={s.visualHeading}><h3>{t.flow}</h3><button type="button" aria-label={running?t.pause:t.play} onClick={()=>setRunning(!running)}>{running?<Pause size={16}/>:<Play size={16}/>}</button></div>
      <div className={s.flow} role="group" aria-label={t.choose}>{t.steps.map((label,i)=>{const Icon=icons[i];return <button type="button" key={label} aria-pressed={step===i} onClick={()=>{setStep(i);setRunning(false)}} className={step===i?s.activeStep:''}><span><Icon size={23} strokeWidth={1.5}/></span><small>0{i+1}</small><b>{label}</b>{i<2&&<ArrowRight className={s.connector} size={17} aria-hidden/>}</button>})}</div>
      <div className={s.track}><span style={{transform:`translateX(${step*100}%)`}}/></div>
      <p key={step} className={s.detail}>{t.details[step]}</p>
    </div> : <div className={s.visibility}>
      <div className={s.switches}><button type="button" aria-pressed={step===0} onClick={()=>setStep(0)}><Search size={15}/>{t.search}</button><button type="button" aria-pressed={step===1} onClick={()=>setStep(1)}><Sparkles size={15}/>{t.ai}</button></div>
      <div className={s.query}><Search size={16} aria-hidden/><span>{t.query}</span></div>
      <div className={s.signal} aria-hidden><i/><i/><i/><i/></div>
      <div key={step} className={s.answer}><span className={s.source}>{step===0?'hareb.digital':t.source}</span><h3>{step===0?t.result:t.ai}</h3><p>{t.answer}</p><span className={s.answerLink}>{step===0?t.project:t.source}<ArrowUpRight size={14} aria-hidden/></span></div>
    </div>}
  </div>
}
