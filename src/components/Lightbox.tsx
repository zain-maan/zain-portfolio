import { useEffect, useRef } from 'react'
import { Shot } from './ui'

export type LightboxItem = { name: string; mobile?: boolean }

// Full-screen view of a screenshot. Arrows, swipe or the keyboard step through; Esc, ✕ or a tap outside close.
export default function Lightbox({ items, index, onIndex, onClose }: { items: LightboxItem[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const touch = useRef<number | null>(null)
  const item = items[index]
  const go = (d: number) => onIndex((index + d + items.length) % items.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      } else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    // Capture phase, so Esc closes only the lightbox and not the case study underneath.
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  })

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot viewer"
      className="fixed inset-0 z-[90] flex flex-col bg-ink/95 text-paper backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return
        const dx = e.changedTouches[0].clientX - touch.current
        touch.current = null
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-sm sm:px-6" onClick={(e) => e.stopPropagation()}>
        <span className="text-paper/70">
          {index + 1} / {items.length}
        </span>
        <button onClick={onClose} className="btn btn-paper !px-4 !py-2 !text-sm" aria-label="Close screenshot">
          Close ✕
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4 sm:px-16">
        <Shot
          key={item.name}
          name={item.name}
          mobile={item.mobile}
          loading="eager"
          sizes="100vw"
          onClick={(e) => e.stopPropagation()}
          className={`max-h-[calc(100svh-8rem)] max-w-full rounded-lg object-contain shadow-2xl ${item.mobile ? 'w-auto' : 'w-full'}`}
        />
        {items.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                go(-1)
              }}
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/15 text-xl backdrop-blur hover:bg-paper/25 sm:left-4"
              aria-label="Previous screenshot"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                go(1)
              }}
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/15 text-xl backdrop-blur hover:bg-paper/25 sm:right-4"
              aria-label="Next screenshot"
            >
              ›
            </button>
          </>
        )}
      </div>
      <p className="pb-4 text-center text-xs text-paper/60">Tap outside or press Esc to close · swipe for more</p>
    </div>
  )
}
