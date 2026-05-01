const cards = [
  {
    icon: '🧠',
    title: 'Holding the History',
    body: 'Caregivers carry the full medical memory across conditions, specialists, and years. What happens between appointments has had nowhere to go.',
  },
  {
    icon: '📋',
    title: 'Tracking Symptoms',
    body: "Parents search 2,000+ times a year about their child's health. 1 in 3 already use ChatGPT — but general AI answers the moment. It can't hold the story.",
  },
  {
    icon: '👨‍👩‍👧',
    title: 'The Care Network',
    body: 'Families coordinate across pediatricians, schools, co-parents and carers. Without structure, fragmented recall repeats across every handover.',
  },
]

export default function Burden() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-kido-purple uppercase tracking-widest mb-3">
            The signal exists
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-kido-navy tracking-tight leading-tight mb-4">
            It's just never been structured.
          </h2>
          <p className="text-sm text-kido-muted leading-relaxed max-w-lg mx-auto">
            Parents already hold everything a clinician needs. The problem isn't missing
            information — it's missing infrastructure.
          </p>
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-kido-purple-tint border border-kido-purple-border-light rounded-card p-5"
            >
              <div className="text-2xl mb-3">{card.icon}</div>
              <h3 className="text-sm font-bold text-kido-navy mb-2 leading-snug">{card.title}</h3>
              <p className="text-xs text-kido-muted leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div className="bg-kido-navy rounded-xl px-6 py-4 text-center">
          <p className="text-sm font-bold text-[#F0EEFF] leading-relaxed">
            "Pediatricians see a snapshot.{' '}
            <span className="text-kido-coral">Families live the story.</span>"
          </p>
        </div>

      </div>
    </section>
  )
}
