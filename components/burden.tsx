const cards = [
  {
    icon: 'history',
    title: 'Holding the History',
    body: 'Caregivers carry the full medical memory across conditions, specialists, and years. What happens between appointments has had nowhere to go.',
  },
  {
    icon: 'tracking',
    title: 'Tracking Symptoms',
    body: "Parents search 2,000+ times a year about their child's health. 1 in 3 already use ChatGPT, but general AI answers the moment. It can't hold the story.",
  },
  {
    icon: 'network',
    title: 'The Care Network',
    body: 'Families coordinate across pediatricians, schools, co-parents and carers. Without structure, fragmented recall repeats across every handover.',
  },
]

export default function Burden() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-kido-purple/5 to-transparent" />
      <div className="max-w-5xl mx-auto relative">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-kido-purple uppercase tracking-widest mb-3">
            The signal exists
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-kido-navy tracking-tight leading-tight mb-4">
            It&apos;s just never been structured.
          </h2>
          <p className="text-sm text-kido-muted leading-relaxed max-w-lg mx-auto">
            Parents already hold everything a clinician needs. The problem isn&apos;t missing
            information — it&apos;s missing infrastructure.
          </p>
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-gradient-to-b from-kido-purple-tint to-white border border-kido-purple-border-light rounded-card p-5 shadow-[0_14px_30px_rgba(26,14,48,0.06)]"
            >
              <div className="mb-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-kido-purple-border bg-white shadow-sm shadow-kido-purple/10">
                  <CardIcon icon={card.icon} />
                </span>
              </div>
              <h3 className="text-sm font-bold text-kido-navy mb-2 leading-snug">{card.title}</h3>
              <p className="text-xs text-kido-muted leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div className="bg-kido-navy rounded-xl px-6 py-4 text-center shadow-[0_16px_45px_rgba(26,14,48,0.34)]">
          <p className="text-sm font-bold text-kido-off-white leading-relaxed">
            &quot;Pediatricians see a snapshot.{' '}
            <span className="text-kido-coral">Families live the story.</span>&quot;
          </p>
        </div>

      </div>
    </section>
  )
}

function CardIcon({ icon }: { icon: string }) {
  if (icon === 'history') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-kido-purple" fill="none" aria-hidden="true">
        <path d="M7 9.5A5 5 0 0 1 12 4.5C14.2 4.5 16.1 5.92 16.78 7.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 4.5V8.5H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.98 9.8V13.2L14.4 14.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.8 12.2A5.2 5.2 0 1 0 12 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (icon === 'tracking') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-kido-purple" fill="none" aria-hidden="true">
        <rect x="6.5" y="4.5" width="11" height="15" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.2 8.5H14.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9.2 12H14.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9.2 15.5H12.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-kido-purple" fill="none" aria-hidden="true">
      <circle cx="7.2" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.8" cy="8.3" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="16.2" r="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.9 8.8L10.6 11.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15.1 9.6L13.3 11.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.8 14.8L8.4 13.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13.3 14.7L15.8 12.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
