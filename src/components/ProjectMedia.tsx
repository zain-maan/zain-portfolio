import type { Project } from '../data'
import { Shot } from './ui'
import { CorpMindVisual, MindAIVisual } from './Visuals'

// The project's "cover": a browser frame with its screens plus a phone, on the project's colour.
// Projects without public screenshots show a designed visual instead.
export default function ProjectMedia({ project: p, shot = 0, large = false }: { project: Project; shot?: number; large?: boolean }) {
  if (p.visual === 'corpmind') return <CorpMindVisual />
  if (p.visual === 'mindai') return <MindAIVisual />

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: p.tone }}>
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_20%_0%,rgba(255,255,255,0.18),transparent_60%)]" />
      <div className="absolute left-[7%] right-[13%] top-[11%] overflow-hidden rounded-[0.7rem] bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-black/10">
        <div className="flex items-center gap-1.5 bg-[#111] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          {p.live && <span className="mx-auto hidden truncate rounded bg-white/10 px-2 py-0.5 text-[0.62rem] text-white/55 sm:block">{p.live.replace('https://', '')}</span>}
        </div>
        <div className="relative aspect-[16/10]">
          {p.shots.map((s, i) => (
            <Shot
              key={s}
              name={s}
              sizes={large ? '(min-width: 1024px) 60vw, 92vw' : '(min-width: 768px) 40vw, 92vw'}
              className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-[1.1s] ${i === shot ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
      </div>
      {p.mobile && (
        <div className="absolute bottom-[-6%] right-[5%] w-[23%] overflow-hidden rounded-[1.1rem] border-[4px] border-black bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] sm:rounded-[1.4rem] sm:border-[5px]">
          <Shot name={p.mobile} mobile sizes="200px" className="aspect-[390/844] w-full object-cover object-top" />
        </div>
      )}
    </div>
  )
}
