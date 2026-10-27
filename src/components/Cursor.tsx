import { useEffect, useRef, useState } from 'react'
import { finePointer, gsap, prefersReducedMotion } from '../lib/motion'

// A small dot that trails the pointer and grows into a label over [data-cursor] elements.
// Buttons and links marked data-magnetic lean towards the pointer. Mouse and trackpad only.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!finePointer() || prefersReducedMotion()) return
    const el = dot.current!
    const x = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' })
    let magnet: HTMLElement | null = null

    const move = (e: PointerEvent) => {
      x(e.clientX)
      y(e.clientY)
      const target = e.target as HTMLElement
      const tagged = target.closest<HTMLElement>('[data-cursor]')
      setLabel(tagged?.dataset.cursor ?? '')
      el.dataset.hover = String(!tagged && !!target.closest('a,button'))

      const m = target.closest<HTMLElement>('[data-magnetic]')
      if (m !== magnet) {
        if (magnet) gsap.to(magnet, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
        magnet = m
      }
      if (m) {
        const r = m.getBoundingClientRect()
        gsap.to(m, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: 'power3' })
      }
    }
    window.addEventListener('pointermove', move, { passive: true })
    el.style.opacity = '1'
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <div
      ref={dot}
      aria-hidden="true"
      data-hover="false"
      className={`pointer-events-none fixed left-0 top-0 z-[70] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-paper opacity-0 transition-[width,height,background-color] duration-300 [@media(pointer:fine)]:flex ${
        label ? 'h-24 w-24' : 'h-3 w-3 data-[hover=true]:h-12 data-[hover=true]:w-12 data-[hover=true]:bg-ink/10 data-[hover=true]:backdrop-blur-[2px]'
      }`}
    >
      <span className={`text-xs font-semibold uppercase tracking-[0.18em] transition-opacity ${label ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
    </div>
  )
}
