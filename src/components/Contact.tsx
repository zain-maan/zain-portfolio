import { ME } from '../data'
import { scrollToTop } from '../lib/motion'
import { SOCIALS } from './Hero'
import { Available } from './Nav'
import { ArrowUpRight } from './ui'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-4 pb-6 pt-28 sm:px-8 lg:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-24 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-sand/40 blur-[120px]" />

      <div className="relative mx-auto flex max-w-[90rem] flex-col items-center text-center">
        <span className="chip" data-reveal>
          <Available />
        </span>
        <h2 data-split className="mt-8 max-w-6xl font-display text-[clamp(2.8rem,9vw,9rem)] font-bold uppercase leading-[0.88] tracking-[-0.055em]">
          Have a project <span className="font-serif font-normal normal-case italic tracking-[-0.02em] text-clay sm:block">in mind?</span>
        </h2>
        <p className="mt-6 max-w-lg text-lg text-ink/60" data-reveal="0.1">
          A website, an app or an AI agent: tell me what you need and I will come back with ideas and a clear plan.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal="0.15">
          <a href={`mailto:${ME.email}?subject=New%20project`} className="btn btn-ink !px-8 !py-4 text-base" data-magnetic>
            Contact me <ArrowUpRight size={18} />
          </a>
          <a href={`https://wa.me/${ME.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-line !px-8 !py-4 text-base" data-magnetic>
            WhatsApp me
          </a>
        </div>

        <ul className="mt-14 flex flex-wrap justify-center gap-2" data-reveal="0.2">
          <li className="chip !bg-ink !py-1.5 !pl-1.5 !text-paper">
            <picture>
              <source type="image/avif" srcSet={`/${ME.photo}-640.avif`} />
              <img src={`/${ME.photo}-640.webp`} alt="" className="h-7 w-7 rounded-full object-cover" loading="lazy" />
            </picture>
            {ME.name}
          </li>
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target={s.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer" className="chip !py-2 transition-colors hover:border-ink hover:bg-ink hover:text-paper">
                <s.icon size={15} /> {s.label === 'Email' ? ME.email : s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Giant outlined name */}
      <p aria-hidden="true" className="text-outline-ink relative mt-24 select-none whitespace-nowrap text-center font-display text-[11vw] font-bold uppercase leading-[0.8] tracking-[-0.06em]">
        {ME.name}
      </p>

      <footer className="relative mx-auto mt-8 flex max-w-[90rem] flex-col gap-4 border-t border-line pt-6 text-sm text-grey sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {ME.name}. Designed and built by hand.
        </p>
        <button onClick={() => scrollToTop()} className="self-start text-ink transition-colors hover:text-clay sm:self-auto">
          Back to top ↑
        </button>
      </footer>
    </section>
  )
}
