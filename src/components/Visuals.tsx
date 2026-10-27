// Designed visuals for projects without public screenshots. Sized with container units,
// so they look the same in a small card and in the full case study.

export function CorpMindVisual() {
  const agents = ['HR', 'Finance', 'IT', 'Legal']
  return (
    <div className="@container absolute inset-0 overflow-hidden bg-[#16213a] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:6cqw_6cqw]" />
      <div className="absolute left-[-10%] top-[-20%] h-[70%] w-[60%] rounded-full bg-[#4f46e5]/35 blur-[8cqw]" />
      <div className="absolute bottom-[-25%] right-[-10%] h-[70%] w-[55%] rounded-full bg-[#06b6d4]/25 blur-[8cqw]" />

      {/* Question */}
      <div className="absolute left-[6%] top-[12%] max-w-[38%] rounded-[2cqw] rounded-bl-[0.5cqw] bg-white px-[2.4cqw] py-[1.8cqw] text-[2.2cqw] font-medium leading-snug text-[#16213a] shadow-xl">
        How many leave days do I have left this year?
        <span className="mt-[1cqw] block text-[1.6cqw] text-[#16213a]/50">Sara · Lahore branch · Employee</span>
      </div>

      {/* Orchestrator and agents */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 75" preserveAspectRatio="none" aria-hidden="true">
        {[22, 34, 46, 58].map((y, i) => (
          <path key={y} d={`M50 40 C 62 40, 64 ${y}, 74 ${y}`} fill="none" stroke={i === 0 ? '#22d3ee' : 'rgba(255,255,255,0.22)'} strokeWidth={i === 0 ? 0.5 : 0.3} strokeDasharray={i === 0 ? '0' : '1 1'} />
        ))}
        <path d="M30 22 C 40 22, 38 40, 46 40" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.3" />
      </svg>
      <div className="absolute left-[50%] top-[53%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[1cqw]">
        <div className="flex h-[11cqw] w-[11cqw] items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_0_6cqw_rgba(79,70,229,0.7)] backdrop-blur">
          <span className="h-[4cqw] w-[4cqw] rounded-full bg-gradient-to-br from-[#818cf8] to-[#22d3ee]" />
        </div>
        <span className="text-[1.7cqw] font-semibold uppercase tracking-[0.2em] text-white/70">Orchestrator</span>
      </div>
      <ul className="absolute right-[6%] top-[22%] flex flex-col gap-[2.4cqw]">
        {agents.map((a, i) => (
          <li
            key={a}
            className={`flex items-center gap-[1.2cqw] rounded-full px-[2.2cqw] py-[1cqw] text-[2cqw] font-semibold ${
              i === 0 ? 'bg-[#22d3ee] text-[#16213a] shadow-[0_0_4cqw_rgba(34,211,238,0.6)]' : 'border border-white/15 bg-white/5 text-white/70'
            }`}
          >
            <span className={`h-[1.2cqw] w-[1.2cqw] rounded-full ${i === 0 ? 'bg-[#16213a]' : 'bg-white/40'}`} />
            {a} agent
          </li>
        ))}
      </ul>

      {/* Grounded answer */}
      <div className="absolute bottom-[9%] left-[6%] max-w-[50%] rounded-[2cqw] rounded-tl-[0.5cqw] border border-white/10 bg-white/10 px-[2.4cqw] py-[1.8cqw] text-[2.1cqw] leading-snug backdrop-blur">
        You have <b>9 of 24</b> annual leave days left. Want me to draft a request?
        <span className="mt-[1.2cqw] inline-flex items-center gap-[0.8cqw] rounded-full bg-white/15 px-[1.4cqw] py-[0.5cqw] text-[1.6cqw] text-[#a5f3fc]">
          [1] Leave Policy 2026 · p.3
        </span>
      </div>
    </div>
  )
}

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
