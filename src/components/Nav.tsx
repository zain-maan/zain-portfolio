import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ME } from '../data'
import { gsap, prefersReducedMotion, scrollToElement, scrollToTop, setScrollLocked } from '../lib/motion'
import { ArrowUpRight } from './ui'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export function Logo() {
  return (
    <span className="font-display text-xl font-semibold tracking-[-0.03em]">
      {ME.first}
      <span className="text-ember">.</span>
    </span>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menu = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setScrollLocked(open)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      setScrollLocked(false)
      document.body.style.overflow = ''
    }
  }, [open])

  useLayoutEffect(() => {
    if (!open || !menu.current || prefersReducedMotion()) return
    const tween = gsap.from(menu.current.querySelectorAll('[data-menu-item]'), { yPercent: 110, duration: 0.8, ease: 'power4.out', stagger: 0.06, delay: 0.05 })
    return () => void tween.kill()
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    // Wait a frame so the scroll lock is released before scrolling.
    requestAnimationFrame(() => scrollToElement(`#${id}`))
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      {open && (
        <div ref={menu} id="menu" className="fixed inset-0 flex flex-col bg-ink-2 px-6 pb-10 pt-28 md:hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-ember/30 blur-3xl" />
          <ul className="relative">
            {LINKS.map((l, i) => (
              <li key={l.id} className="overflow-hidden border-b border-white/10">
                <button onClick={() => go(l.id)} data-menu-item className="flex w-full items-baseline justify-between py-4 font-display text-5xl font-semibold tracking-[-0.04em]">
                  {l.label}
                  <span className="text-sm font-medium text-muted">0{i + 1}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="relative mt-auto overflow-hidden">
            <button onClick={() => go('contact')} data-menu-item className="btn btn-ember w-full">
              Start a project <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      )}

      <nav
        className={`relative mx-auto flex h-14 max-w-[90rem] items-center justify-between rounded-full pl-5 pr-2 transition-all duration-500 ${
          scrolled && !open ? 'border border-white/10 bg-ink/70 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.8)] backdrop-blur-xl' : 'border border-transparent'
        }`}
      >
        <button onClick={() => (open ? setOpen(false) : scrollToTop())} aria-label="Back to top">
          <Logo />
        </button>

        <ul className="hidden items-center gap-1 text-sm font-medium md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button onClick={() => go(l.id)} className="group relative overflow-hidden rounded-full px-4 py-2 text-cream/75 transition-colors hover:text-cream">
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 pr-2 text-xs text-cream/70 lg:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for projects
          </span>
          <button onClick={() => go('contact')} className="btn btn-ember hidden !py-2.5 !text-sm md:inline-flex" data-magnetic>
            Let's talk
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-cream text-ink md:hidden"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className={`h-[1.5px] w-4 bg-current transition-transform duration-300 ${open ? 'translate-y-[3.75px] rotate-45' : ''}`} />
            <span className={`h-[1.5px] w-4 bg-current transition-transform duration-300 ${open ? '-translate-y-[3.75px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>
    </header>
  )
}
