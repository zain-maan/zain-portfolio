import { useState } from 'react'
import { SERVICES } from '../data'
import { ArrowUpRight } from './ui'

// Big rows in the "/SERVICE" style. Hover (or tap on a phone) opens a row to show what it covers.
export default function Services() {
  const [open, setOpen] = useState<number | null>(null)

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

        <ul className="mt-14 border-b border-line" onMouseLeave={() => setOpen(null)}>
          {SERVICES.map((s, i) => {
            const isOpen = open === i
            return (
              <li key={s.title} className="border-t border-line" data-reveal={i * 0.05}>
                <button
                  onMouseEnter={() => setOpen(i)}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-7 text-left sm:grid-cols-[4rem_1fr_auto] lg:py-9"
                >
                  <span className="text-sm font-medium text-grey">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className={`font-display text-[clamp(1.7rem,4.6vw,4.2rem)] font-bold uppercase leading-[0.95] tracking-[-0.045em] transition-[color,transform] duration-500 ${
                      isOpen ? 'translate-x-2 text-ink' : 'text-ink/35'
                    }`}
                  >
                    {s.title}
                  </span>
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 sm:h-14 sm:w-14 ${
                      isOpen ? 'rotate-45 border-ink bg-ink text-paper' : 'border-line text-ink/40'
                    }`}
                  >
                    <ArrowUpRight size={22} />
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="grid gap-4 pb-8 pl-[3.5rem] sm:pl-[5rem] lg:grid-cols-[1.2fr_1fr] lg:gap-10">
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
