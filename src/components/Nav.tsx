import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ME, PROJECTS, SERVICES } from '../data'
import { gsap, prefersReducedMotion, scrollToElement, setScrollLocked } from '../lib/motion'
import { ArrowUpRight } from './ui'

const LINKS = [
  { id: 'work', label: 'Work', count: PROJECTS.length },
  { id: 'services', label: 'Services', count: SERVICES.length },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const pad = (n: number) => String(n).padStart(2, '0')

export function Available({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Available for new projects
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
        <div ref={menu} id="menu" className="fixed inset-0 flex flex-col bg-paper px-6 pb-10 pt-28 md:hidden">
          <ul>
            {LINKS.map((l) => (
              <li key={l.id} className="overflow-hidden border-b border-line">
                <button onClick={() => go(l.id)} data-menu-item className="flex w-full items-start justify-between py-4 text-left font-display text-5xl font-bold uppercase tracking-[-0.04em]">
                  {l.label}
                  {l.count && <span className="text-sm font-medium tracking-normal text-grey">{pad(l.count)}</span>}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-4 overflow-hidden">
            <Available className="text-sm text-grey" />
            <button onClick={() => go('contact')} data-menu-item className="btn btn-ink w-full">
              Let's talk <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      )}

      <nav
        className={`relative mx-auto flex h-14 max-w-[90rem] items-center justify-between rounded-full pl-5 pr-2 transition-all duration-500 ${
          scrolled && !open ? 'border border-line bg-paper/75 shadow-[0_20px_50px_-30px_rgba(10,9,9,0.35)] backdrop-blur-xl' : 'border border-transparent'
        }`}
      >
        <div className="flex items-center gap-6">
          {/* The same mark as the favicon. Clicking it reloads the site from the top. */}
          <a href="/" aria-label={`${ME.name}, reload home`} className="block transition-transform duration-300 hover:-rotate-6 hover:scale-105" data-magnetic>
            <img src="/favicon.svg" alt="" width={36} height={36} className="h-9 w-9 rounded-[0.6rem]" />
          </a>
          <span className="hidden lg:block">
            <Available className="text-xs font-medium text-grey" />
          </span>
        </div>

        <ul className="hidden items-center gap-1 text-sm font-medium md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button onClick={() => go(l.id)} className="rounded-full px-4 py-2 text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink">
                {l.label}
                {l.count && <sup className="ml-0.5 text-[0.6rem] text-grey">{pad(l.count)}</sup>}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={() => go('contact')} className="btn btn-ink hidden !py-2.5 !text-sm md:inline-flex" data-magnetic>
            Let's talk <ArrowUpRight size={16} />
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-ink text-paper md:hidden"
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
