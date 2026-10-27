import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { PROJECTS, type Project } from '../data'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { ArrowUpRight, GitHub, Shot } from './ui'

// Tall enough screens: each case study sticks and the next one slides over it like a stack of prints.
// Shorter screens and phones: the cards simply follow each other and flip up into place.
const STACK = '(min-width: 1024px) and (min-height: 760px)'

export default function Work() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add(STACK, () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-case]', root.current)
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        gsap.to(card.querySelector('[data-case-inner]'), {
          scale: 0.92,
          filter: 'brightness(0.55)',
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 12%', scrub: true },
        })
      })
    })
    mm.add(`not all and ${STACK}`, () => {
      gsap.utils.toArray<HTMLElement>('[data-case-inner]', root.current).forEach((el) => {
        gsap.from(el, {
          rotateX: 18,
          y: 80,
          opacity: 0,
          transformPerspective: 1200,
          transformOrigin: '50% 100%',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="work" ref={root} className="relative px-3 pb-10 pt-24 sm:px-5 lg:pt-36">
      <div className="mx-auto max-w-[90rem] px-2 sm:px-3 lg:px-7">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 data-split className="font-display text-[clamp(3rem,9vw,9rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
            Selected <span className="font-serif font-normal italic tracking-[-0.02em] text-ember-soft">work</span>
            <sup className="ml-2 align-top text-[0.25em] font-medium tracking-normal text-muted">({String(PROJECTS.length).padStart(2, '0')})</sup>
          </h2>
          <p className="max-w-sm text-cream/65" data-reveal>
            Two complete products, designed and built end to end: from the first sketch to booking flows, dashboards and launch.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[90rem] flex-col gap-6 lg:mt-20 [@media(min-width:1024px)_and_(min-height:760px)]:gap-[12vh]">
        {PROJECTS.map((p, i) => (
          <CaseStudy key={p.id} project={p} order={i} />
        ))}
      </div>
    </section>
  )
}

function CaseStudy({ project: p, order }: { project: Project; order: number }) {
  const [shot, setShot] = useState(0)
  const frame = useRef<HTMLAnchorElement>(null)

  // Cycle through the project's screens, but only while the frame is on screen.
  useEffect(() => {
    if (prefersReducedMotion() || !frame.current) return
    let id = 0
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(id)
      if (e.isIntersecting) id = window.setInterval(() => setShot((s) => (s + 1) % p.shots.length), 3200)
    })
    io.observe(frame.current)
    return () => {
      io.disconnect()
      window.clearInterval(id)
    }
  }, [p.shots.length])

  const t = p.theme
  return (
    <article
      data-case
      className="[@media(min-width:1024px)_and_(min-height:760px)]:sticky [@media(min-width:1024px)_and_(min-height:760px)]:top-[var(--case-top)]"
      style={{ '--case-top': `calc(5.5rem + ${order * 18}px)` } as CSSProperties}
      aria-labelledby={`${p.id}-title`}
    >
      <div
        data-case-inner
        className="origin-top overflow-hidden rounded-[2rem] p-5 shadow-[0_-30px_80px_-40px_rgba(0,0,0,0.9)] sm:p-8 lg:p-9"
        style={{ background: t.bg, color: t.fg }}
      >
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 [@media(min-width:1024px)_and_(min-height:760px)]:min-h-[calc(100svh-12rem)]">
          {/* Text */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-sm" style={{ color: t.muted }}>
              <span className="font-medium">
                {p.index} / {p.sector}
              </span>
              <span>{p.year} · Concept build</span>
            </div>
            <h3 id={`${p.id}-title`} className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:mt-4 lg:text-6xl 2xl:text-7xl">
              {p.name}
            </h3>
            <p className="mt-3 font-serif text-2xl italic" style={{ color: t.accent }}>
              {p.kind}
            </p>
            <p className="mt-6 max-w-lg leading-relaxed lg:mt-4" style={{ color: t.muted }}>
              {p.problem}
            </p>
            <ul className="mt-6 space-y-2.5 border-t pt-6 text-[0.95rem] lg:mt-5 lg:space-y-2 lg:pt-5" style={{ borderColor: t.line }}>
              {p.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: t.accent }} />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2 lg:mt-5" style={{ color: t.fg }}>
              {p.stack.map((s) => (
                <span key={s} className="chip" style={{ borderColor: t.line }}>
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-6">
              <a href={p.live} target="_blank" rel="noreferrer" className="btn" style={{ background: t.fg, color: t.bg }} data-magnetic>
                Visit live site <ArrowUpRight size={18} />
              </a>
              <a href={p.code} target="_blank" rel="noreferrer" className="btn border" style={{ borderColor: t.line }} data-magnetic>
                <GitHub size={18} /> Code
              </a>
            </div>
          </div>

          {/* Screens */}
          <div className="relative order-first pb-10 lg:order-none lg:self-center lg:pb-14">
            <a
              ref={frame}
              href={p.live}
              target="_blank"
              rel="noreferrer"
              data-cursor="Visit"
              aria-label={`Open the ${p.name} live site`}
              className="group block overflow-hidden rounded-xl bg-black/30 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-black/10 sm:rounded-2xl"
            >
              <div className="flex items-center gap-2 bg-black/80 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="mx-auto truncate rounded-md bg-white/10 px-3 py-0.5 text-[0.7rem] text-white/60">{p.live.replace('https://', '')}</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden">
                {p.shots.map((s, i) => (
                  <Shot
                    key={s}
                    name={s}
                    sizes="(min-width: 1024px) 50vw, 92vw"
                    className={`absolute inset-0 h-full w-full object-cover object-top transition-[opacity,transform] duration-[1.1s] ease-out group-hover:scale-[1.03] ${i === shot ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
            </a>
            <div className="absolute bottom-0 right-3 w-[26%] min-w-24 max-w-44 animate-float overflow-hidden rounded-[1.4rem] border-[5px] border-black bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] sm:right-6">
              <Shot name={p.mobile} mobile sizes="180px" className="aspect-[390/844] w-full object-cover object-top" />
            </div>
            <div className="mt-4 flex gap-1.5" aria-hidden="true">
              {p.shots.map((s, i) => (
                <span key={s} className="h-1 w-6 rounded-full transition-colors duration-500" style={{ background: i === shot ? t.accent : t.line }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
