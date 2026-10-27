// Designed visuals for projects without public screenshots. Sized with container units,
// so they look the same in a small card and in the full case study.

export function MindAIVisual() {
  return (
    <div className="@container absolute inset-0 overflow-hidden bg-[#1f1b3a] text-white">
      <div className="absolute left-[-15%] top-[-30%] h-[80%] w-[60%] rounded-full bg-[#8b5cf6]/40 blur-[9cqw]" />
      <div className="absolute bottom-[-30%] right-[0%] h-[70%] w-[50%] rounded-full bg-[#f472b6]/25 blur-[9cqw]" />

      {/* Desktop panel: chat with citations + progress */}
      <div className="absolute left-[6%] top-[12%] w-[56%] rounded-[2cqw] border border-white/10 bg-[#141128]/90 p-[2.4cqw] shadow-2xl">
        <div className="flex items-center gap-[1cqw] text-[1.6cqw] text-white/50">
          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#ff5f57]" />
          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#febc2e]" />
          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#28c840]" />
          <span className="ml-[1cqw]">Biology · Chapter 4.pdf</span>
        </div>
        <p className="mt-[2cqw] ml-auto w-fit rounded-[1.6cqw] rounded-br-[0.4cqw] bg-[#8b5cf6] px-[2cqw] py-[1.2cqw] text-[1.9cqw]">What does the mitochondria do?</p>
        <p className="mt-[1.6cqw] rounded-[1.6cqw] rounded-bl-[0.4cqw] bg-white/8 bg-white/10 px-[2cqw] py-[1.4cqw] text-[1.9cqw] leading-snug text-white/90">
          It produces ATP, the cell’s energy, through cellular respiration <span className="rounded bg-[#f472b6]/30 px-[0.6cqw] text-[#fbcfe8]">[1]</span>
        </p>
        <div className="mt-[2.4cqw] grid grid-cols-3 gap-[1.4cqw]">
          {[
            ['Quiz score', '86%'],
            ['Streak', '12 days'],
            ['Weak topic', 'Enzymes'],
          ].map(([k, v]) => (
            <div key={k} className="rounded-[1.2cqw] bg-white/5 p-[1.4cqw]">
              <p className="text-[1.4cqw] text-white/50">{k}</p>
              <p className="mt-[0.4cqw] text-[2.2cqw] font-semibold">{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Phone: flashcard review */}
      <div className="absolute bottom-[-4%] right-[7%] w-[27%] rounded-[3.4cqw] border-[0.9cqw] border-black bg-[#f8f7ff] p-[1.8cqw] text-[#1f1b3a] shadow-2xl">
        <div className="mx-auto mb-[1.6cqw] h-[1cqw] w-[30%] rounded-full bg-black/80" />
        <p className="text-[1.5cqw] font-semibold uppercase tracking-[0.15em] text-[#8b5cf6]">Flashcard · 3/20</p>
        <div className="mt-[1.4cqw] flex aspect-[4/5] items-center rounded-[2cqw] bg-gradient-to-br from-[#8b5cf6] to-[#f472b6] p-[2cqw] text-[2.3cqw] font-semibold leading-snug text-white">
          What is spaced repetition?
        </div>
        <div className="mt-[1.6cqw] grid grid-cols-4 gap-[0.8cqw] text-center text-[1.4cqw] font-semibold">
          {['Again', 'Hard', 'Good', 'Easy'].map((b, i) => (
            <span key={b} className={`rounded-[1cqw] py-[1cqw] ${i === 2 ? 'bg-[#1f1b3a] text-white' : 'bg-[#1f1b3a]/8 bg-black/5'}`}>
              {b}
            </span>
          ))}
        </div>
        <p className="mt-[1.6cqw] text-center text-[1.4cqw] text-[#1f1b3a]/50">Android app · Capacitor</p>
      </div>
    </div>
  )
}
