'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, ChevronDown } from 'lucide-react'
import s from './interactive-studio.module.css'

export type Choice = { value: string; label: string; hint?: string; disabled?: boolean }

/** A single-select listbox: native button activation, roving focus and outside dismissal. */
export function AnimatedSelect({ label, value, options, onChange, placeholder = 'Bitte auswählen', disabled = false }: {
  label: string; value: string; options: Choice[]; onChange: (value: string) => void; placeholder?: string; disabled?: boolean
}) {
  const id = useId()
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const list = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(0)
  const reduced = useReducedMotion()
  const active = options.find(option => option.value === value)
  const close = (restore = false) => { setOpen(false); if (restore) trigger.current?.focus({ preventScroll: true }) }

  useEffect(() => {
    if (!open) return
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false) }
    document.addEventListener('pointerdown', outside)
    return () => document.removeEventListener('pointerdown', outside)
  }, [open])
  useEffect(() => { if (open) list.current?.querySelectorAll<HTMLButtonElement>('[role="option"]')[focused]?.focus({ preventScroll: true }) }, [open, focused])

  const show = () => { const selected = options.findIndex(option => option.value === value && !option.disabled); setFocused(selected >= 0 ? selected : Math.max(0, options.findIndex(option => !option.disabled))); setOpen(true) }
  const move = (direction: number) => {
    for (let offset = 1; offset <= options.length; offset++) {
      const next = (focused + direction * offset + options.length) % options.length
      if (!options[next].disabled) { setFocused(next); break }
    }
  }
  return <div ref={root} className={s.select} data-open={open} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}>
    <span id={`${id}-label`} className={s.fieldLabel}>{label}</span>
    <button ref={trigger} type="button" className={s.selectTrigger} disabled={disabled} aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-list`} aria-labelledby={`${id}-label ${id}-value`}
      onClick={() => open ? close() : show()} onKeyDown={event => { if (['ArrowDown', 'ArrowUp'].includes(event.key)) { event.preventDefault(); show() } }}>
      <span id={`${id}-value`}>{active?.label ?? placeholder}</span><ChevronDown size={17} aria-hidden />
    </button>
    <AnimatePresence initial={false}>{open && <motion.div ref={list} id={`${id}-list`} role="listbox" aria-labelledby={`${id}-label`} className={s.selectMenu}
      initial={{ opacity: 0, y: reduced ? 0 : -8, scale: reduced ? 1 : 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: reduced ? 0 : -5 }} transition={{ duration: reduced ? 0 : 0.18 }}
      onKeyDown={event => {
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(true) }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); move(event.key === 'ArrowDown' ? 1 : -1) }
        if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); const indices = options.map((option, index) => option.disabled ? -1 : index).filter(index => index >= 0); setFocused(event.key === 'Home' ? indices[0] : indices[indices.length - 1]) }
        if (event.key.length === 1 && /\S/.test(event.key)) { const index = options.findIndex(option => !option.disabled && option.label.toLocaleLowerCase('de').startsWith(event.key.toLocaleLowerCase('de'))); if (index >= 0) setFocused(index) }
      }}>
      {options.map((option, index) => <button type="button" key={option.value} role="option" aria-selected={value === option.value} aria-disabled={option.disabled || undefined} disabled={option.disabled} tabIndex={focused === index ? 0 : -1}
        onFocus={() => setFocused(index)} onClick={() => { onChange(option.value); close(true) }}>
        <span>{option.label}{option.hint && <small>{option.hint}</small>}</span>{value === option.value && <Check size={16} aria-hidden />}
      </button>)}
    </motion.div>}</AnimatePresence>
  </div>
}
