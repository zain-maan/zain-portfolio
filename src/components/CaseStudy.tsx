import { useEffect, useLayoutEffect, useRef } from 'react'
import { PROJECTS, type Project } from '../data'
import { gsap, prefersReducedMotion, setScrollLocked } from '../lib/motion'
import ProjectMedia from './ProjectMedia'
import { ArrowUpRight, GitHub, Shot } from './ui'

// A full-screen case study that slides up over the page. Esc, ✕ or the browser's back button close it.
export default function CaseStudy({ project: p, onClose, onOpen }: { project: Project; onClose: () => void; onOpen: (id: string) => void }) {
  const panel = useRef<HTMLDivElement>(null)
  const next = PROJECTS[(PROJECTS.indexOf(p) + 1) % PROJECTS.length]

  useEffect(() => {
    setScrollLocked(true)
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      setScrollLocked(false)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  useLayoutEffect(() => {
    const el = panel.current
    if (!el) return
    el.scrollTop = 0
    el.focus()
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' })
      gsap.from('[data-cs-in]', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.06, delay: 0.45 })
    }, el)
    return () => ctx.revert()
  }, [p.id])

  const meta = [
    ['Type', p.kind],
    ['Category', p.category],
    ['Year', p.year],
    ['Status', p.status === 'Live' ? 'Live site' : 'Case study'],
  ]

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cs-title"
      tabIndex={-1}
      data-lenis-prevent
      className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-paper outline-none"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-paper/85 px-4 py-3 backdrop-blur-xl sm:px-8">
        <span className="slash">Case study</span>
        <button onClick={onClose} className="btn btn-ink !px-4 !py-2 !text-sm" aria-label="Close case study">
          Close ✕
        </button>
      </div>

      <article className="mx-auto max-w-[90rem] px-4 pb-24 pt-10 sm:px-8 sm:pt-16">
        <p className="text-sm text-grey" data-cs-in>
          {p.category} · {p.year}
        </p>
        <h1 id="cs-title" className="mt-3 font-display text-[clamp(3.2rem,11vw,10rem)] font-bold uppercase leading-[0.85] tracking-[-0.055em]" data-cs-in>
          {p.name}
        </h1>
        <p className="mt-4 font-serif text-2xl italic text-clay sm:text-4xl" data-cs-in>
          {p.outcome}
        </p>

        <div className="mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-4" data-cs-in>
          {meta.map(([k, v]) => (
            <div key={k}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-grey">{k}</p>
              <p className="mt-1 font-medium">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3" data-cs-in>
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-ink" data-magnetic>
              Visit live site <ArrowUpRight size={18} />
            </a>
          )}
          {p.code && (
            <a href={p.code} target="_blank" rel="noreferrer" className="btn btn-line" data-magnetic>
              <GitHub size={18} /> View code
            </a>
          )}
          {!p.live && !p.code && <p className="text-sm text-grey">Private client-style build · demo on request</p>}
        </div>

        {/* Cover */}
        <div className="relative mt-12 aspect-[16/11] overflow-hidden rounded-[1.75rem] sm:aspect-[16/9]" data-cs-in>
          <ProjectMedia project={p} large />
        </div>
        {p.visual && <p className="mt-3 text-xs text-grey">Illustration of the product. Screens are available on request.</p>}

        {/* Problem → solution */}
        <div className="mt-20 grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="slash">The problem</span>
            <p className="mt-5 font-display text-2xl font-medium leading-snug tracking-[-0.02em] sm:text-3xl">{p.problem}</p>
          </div>
          <div>
            <span className="slash">The solution</span>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">{p.solution}</p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <span className="slash">Key features</span>
          <ol className="mt-6 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 sm:[&>li:last-child:nth-child(odd)]:col-span-2 lg:[&>li:last-child:nth-child(odd)]:col-span-1 lg:[&>li:last-child:nth-child(3n+2)]:col-span-2">
            {p.features.map((f, i) => (
              <li key={f} className="bg-paper p-6">
                <span className="font-display text-sm font-semibold text-clay">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-3 text-lg font-medium leading-snug">{f}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* More screens */}
        {p.shots.length > 1 && (
          <div className="mt-20 grid gap-6 md:grid-cols-2">
            {p.shots.slice(1).map((s) => (
              <div key={s} className="overflow-hidden rounded-[1.25rem] border border-line bg-white shadow-[0_30px_60px_-40px_rgba(10,9,9,0.4)]">
                <Shot name={s} sizes="(min-width: 768px) 45vw, 92vw" className="aspect-[16/10] w-full object-cover object-top" />
              </div>
            ))}
          </div>
        )}

        {/* Stack */}
        <div className="mt-20">
          <span className="slash">Built with</span>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="chip !px-4 !py-2 !text-sm">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Next */}
        <button onClick={() => onOpen(next.id)} className="group mt-24 block w-full border-t border-line pt-10 text-left" data-cursor="Next">
          <span className="text-sm text-grey">Next project</span>
          <span className="mt-2 flex items-center justify-between gap-6">
            <span className="font-display text-[clamp(2.6rem,8vw,7rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em] transition-colors group-hover:text-clay">{next.name}</span>
            <ArrowUpRight size={48} className="shrink-0 transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </button>
      </article>
    </div>
  )
}
