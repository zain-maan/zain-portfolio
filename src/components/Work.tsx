import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PROJECTS, type Category, type Project } from '../data'
import { gsap, prefersReducedMotion } from '../lib/motion'
import CaseStudy from './CaseStudy'
import ProjectMedia from './ProjectMedia'
import { ArrowUpRight } from './ui'

type Filter = 'All' | Category
const FILTERS: Filter[] = ['All', 'Web', 'App', 'AI']
const count = (f: Filter) => String(f === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === f).length).padStart(2, '0')

// Case studies open as a full-screen panel and get their own URL hash (#work/<id>) so they can be shared.
const idFromHash = () => {
  const m = window.location.hash.match(/^#work\/([\w-]+)$/)
  return m && PROJECTS.some((p) => p.id === m[1]) ? m[1] : null
}

export default function Work() {
  const [filter, setFilter] = useState<Filter>('All')
  const [openId, setOpenId] = useState<string | null>(() => idFromHash())
  const grid = useRef<HTMLDivElement>(null)
  const first = useRef(true)
  const list = PROJECTS.filter((p) => filter === 'All' || p.category === filter)

  useEffect(() => {
    const sync = () => setOpenId(idFromHash())
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  const open = useCallback((id: string) => {
    history.pushState(null, '', `#work/${id}`)
    setOpenId(id)
  }, [])
  const close = useCallback(() => {
    if (idFromHash()) history.back()
    else setOpenId(null)
  }, [])

  // Cards re-deal when the filter changes.
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (prefersReducedMotion() || !grid.current) return
    const tween = gsap.fromTo(
      grid.current.children,
      { y: 60, opacity: 0, rotate: 1.5 },
      { y: 0, opacity: 1, rotate: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out', clearProps: 'transform' },
    )
    return () => void tween.kill()
  }, [filter])

  // Phones: cards flip up into place as they scroll in.
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !grid.current) return
    const mm = gsap.matchMedia()
    mm.add('(max-width: 767px)', () => {
      gsap.utils.toArray<HTMLElement>('[data-card]', grid.current).forEach((el) => {
        gsap.from(el, { rotateX: 24, y: 70, opacity: 0, transformPerspective: 1000, transformOrigin: '50% 100%', duration: 1.1, ease: 'back.out(1.2)', scrollTrigger: { trigger: el, start: 'top bottom-=40', once: true } })
      })
    })
    return () => mm.revert()
  }, [])

  const openProject = PROJECTS.find((p) => p.id === openId) ?? null

  return (
    <section id="work" className="px-4 pb-24 pt-10 sm:px-8 lg:pb-36">
      <div className="mx-auto max-w-[90rem]">
        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-line pt-10">
          <div>
            <span className="slash" data-reveal>
              Work
            </span>
            <h2 data-split className="mt-5 font-display text-[clamp(3rem,9vw,9rem)] font-bold uppercase leading-[0.86] tracking-[-0.055em]">
              Selected <span className="font-serif font-normal normal-case italic tracking-[-0.02em] text-clay">work</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects" data-reveal="0.1">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${filter === f ? 'border-ink bg-ink text-paper' : 'border-line bg-white hover:border-ink'}`}
              >
                {f} <sup className={`text-[0.6rem] ${filter === f ? 'text-paper/60' : 'text-grey'}`}>{count(f)}</sup>
              </button>
            ))}
          </div>
        </div>

        <div ref={grid} className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-20">
          {list.map((p, i) => (
            <ProjectCard key={p.id} project={p} number={PROJECTS.indexOf(p) + 1} offset={i % 2 === 1} onOpen={() => open(p.id)} />
          ))}
        </div>
      </div>

      {openProject && <CaseStudy project={openProject} onClose={close} onOpen={open} />}
    </section>
  )
}

function ProjectCard({ project: p, number, offset, onOpen }: { project: Project; number: number; offset: boolean; onOpen: () => void }) {
  const [shot, setShot] = useState(0)
  const timer = useRef(0)

  // On hover the card flicks through the project's screens.
  const start = () => {
    if (p.shots.length < 2 || prefersReducedMotion()) return
    window.clearInterval(timer.current)
    timer.current = window.setInterval(() => setShot((s) => (s + 1) % p.shots.length), 1400)
  }
  const stop = () => window.clearInterval(timer.current)
  useEffect(() => stop, [])

  return (
    <article data-card className={offset ? 'md:mt-28' : ''}>
      <button onClick={onOpen} onMouseEnter={start} onMouseLeave={stop} className="group block w-full text-left" data-cursor="View" aria-label={`Open the ${p.name} case study`}>
        <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem]">
          <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
            <ProjectMedia project={p} shot={shot} />
          </div>
          <span className="absolute left-4 top-4 z-10 rounded-full bg-paper/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">{p.category}</span>
          <span
            className={`absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${
              p.status === 'Live' ? 'bg-emerald-500 text-white' : 'bg-ink/70 text-paper'
            }`}
          >
            {p.status === 'Live' && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
            {p.status}
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <p className="text-sm text-grey">
              {String(number).padStart(2, '0')} · {p.kind}
            </p>
            <h3 className="mt-1 font-display text-4xl font-bold uppercase tracking-[-0.045em] sm:text-5xl">{p.name}</h3>
            <p className="mt-2 max-w-md text-ink/65">{p.outcome}</p>
          </div>
          <span className="mt-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <ArrowUpRight size={20} />
          </span>
        </div>
      </button>
    </article>
  )
}
