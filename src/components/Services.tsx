import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/motion'
import { SERVICES } from '../data'
import { ArrowUpRight } from './ui'

// Big rows in the "/SERVICE" style. Desktop: hovering a row opens it. Phones: every row is open and wipes in once.
export default function Services() {
  const [open, setOpen] = useState<number | null>(null)
  const list = useRef<HTMLUListElement>(null)

  // Phones: each time a row comes into view, scrolling down or back up, its title wipes in from the side it
  // enters on, then its text and tags follow. Nothing hides when a row leaves, so it never blinks out.
  useLayoutEffect(() => {
    if (!list.current || prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(max-width: 1023px)', () => {
      gsap.utils.toArray<HTMLElement>('li', list.current).forEach((row) => {
        const play = (fromBelow: boolean) => {
          // Scrolling back up plays slower and softer, so it reads as a gentle reveal rather than a snap.
          const slow = fromBelow ? 1 : 1.9
          const tl = gsap.timeline()
          tl.fromTo(
            row.querySelector('[data-service-title]'),
            { clipPath: fromBelow ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9 * slow, ease: fromBelow ? 'expo.out' : 'power2.out', clearProps: 'clipPath' },
          )
            .fromTo(
              row.querySelectorAll('[data-service-body] > *'),
              { y: fromBelow ? 24 : -24, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6 * slow, stagger: 0.08 * slow, ease: 'power3.out' },
              0.2 * slow,
            )
            .fromTo(row.querySelector('[data-service-arrow]'), { rotate: fromBelow ? -90 : 90, scale: 0.4 }, { rotate: 0, scale: 1, duration: 0.7 * slow, ease: 'back.out(2)' }, 0.1 * slow)
        }
        ScrollTrigger.create({ trigger: row, start: 'top 92%', end: 'bottom 8%', onEnter: () => play(true), onEnterBack: () => play(false) })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="services" className="px-4 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-[90rem]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="slash" data-reveal>
              Services
            </span>
            <h2 data-split className="mt-5 font-display text-[clamp(2.6rem,7vw,7rem)] font-bold uppercase leading-[0.88] tracking-[-0.055em]">
              What I can <span className="font-serif font-normal normal-case italic tracking-[-0.02em] text-clay">build</span> for you
            </h2>
          </div>
          <p className="max-w-sm text-ink/60" data-reveal="0.1">
            One person from the first call to launch: design, frontend, backend and the AI that ties it together.
          </p>
        </div>

        <ul ref={list} className="mt-14 border-b border-line" onMouseLeave={() => window.matchMedia('(pointer: fine)').matches && setOpen(null)}>
          {SERVICES.map((s, i) => {
            const isOpen = open === i
            return (
              <li key={s.title} className="border-t border-line">
                <button
                  onMouseEnter={() => setOpen(i)}
                  onClick={() => window.matchMedia('(min-width: 1024px)').matches && setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-7 text-left sm:grid-cols-[4rem_1fr_auto] lg:py-9"
                >
                  <span className="text-sm font-medium text-grey">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    data-service-title
                    className={`font-display text-[clamp(1.7rem,4.6vw,4.2rem)] font-bold uppercase leading-[0.95] tracking-[-0.045em] transition-[color,transform] duration-500 ${
                      isOpen ? 'translate-x-2 text-ink' : 'text-ink max-lg:translate-x-0 lg:text-ink/35'
                    }`}
                  >
                    {s.title}
                  </span>
                  <span
                    data-service-arrow
                    className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 sm:h-14 sm:w-14 ${
                      isOpen ? 'rotate-45 border-ink bg-ink text-paper' : 'border-ink bg-ink text-paper lg:border-line lg:bg-transparent lg:text-ink/40'
                    }`}
                  >
                    <ArrowUpRight size={22} />
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[1fr] lg:grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div data-service-body className="grid gap-4 pb-8 pl-[3.5rem] sm:pl-[5rem] lg:grid-cols-[1.2fr_1fr] lg:gap-10">
                      <p className="max-w-xl text-lg leading-relaxed text-ink/70">{s.text}</p>
                      <div className="flex flex-wrap content-start gap-2">
                        {s.tags.map((t) => (
                          <span key={t} className="chip">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
