import { ME, STACK } from '../data'

const FACTS = [
  { k: 'Mobile-first', v: 'Every page is designed for the phone first, then grows up to desktop.' },
  { k: 'Fast by default', v: 'Modern image formats, code-splitting and no heavy page builders.' },
  { k: 'Built to convert', v: 'Clear calls to action and booking flows people actually finish.' },
]

function Portrait() {
  if (ME.photo) return <img src={ME.photo} alt={`Portrait of ${ME.name}`} className="h-full w-full object-cover" />
  // Until a photo is added: a warm gradient with a monogram, so the layout still looks finished.
  const initials = ME.name
    .split(' ')
    .map((w) => w[0])
    .join('')
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(120%_90%_at_30%_10%,#ff8a5c_0%,#ff5a1f_35%,#3b1408_80%,#140805_100%)]">
      <span className="font-serif text-[9rem] italic leading-none text-ink/80 mix-blend-multiply sm:text-[12rem]">{initials}</span>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-[90rem] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]" data-clip>
            <div className="absolute inset-x-0 -top-[8%] -bottom-[8%]" data-speed="0.06">
              <Portrait />
            </div>
          </div>
          <div className="absolute -bottom-6 -right-2 animate-float rounded-2xl border border-white/10 bg-ink-2/90 px-5 py-4 shadow-2xl backdrop-blur-md sm:-right-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Currently</p>
            <p className="mt-1 flex items-center gap-2 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Taking on new projects
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <span className="eyebrow" data-reveal>
            About me
          </span>
          <h2 data-split className="mt-6 font-display text-[clamp(2.3rem,5vw,4.8rem)] font-semibold leading-[1] tracking-[-0.045em]">
            I'm {ME.first}. I build websites for businesses that want to look <span className="font-serif font-normal italic tracking-[-0.02em] text-ember-soft">big</span>, and work even better.
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/65" data-reveal="0.1">
            I mix clean design with real engineering: booking systems, owner dashboards and the small animations that make people
            trust a brand. You get one person who cares about how it looks, how fast it loads and whether it brings you customers.
          </p>

          <dl className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {FACTS.map((f, i) => (
              <div key={f.k} data-reveal={0.1 + i * 0.08}>
                <dt className="font-display text-xl font-semibold tracking-[-0.02em]">{f.k}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream/55">{f.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10" data-reveal="0.2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Tools I use</p>
            <div className="mt-4 flex flex-wrap gap-2 text-cream/75">
              {STACK.map((s) => (
                <span key={s} className="chip !border-white/15 transition-colors hover:!border-ember hover:text-ember">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
