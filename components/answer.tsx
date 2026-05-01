export default function Answer() {
  return (
    <section className="relative overflow-hidden bg-kido-navy px-6 py-24 text-center">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-kido-purple/30 blur-3xl animate-glow-breathe" />
      <div className="pointer-events-none absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-kido-coral/20 blur-3xl animate-glow-breathe" />
      <div className="max-w-3xl mx-auto relative">
        <p className="text-xs font-bold text-kido-purple-muted uppercase tracking-[0.2em] mb-6">
          The answer
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-kido-off-white leading-tight tracking-tight mb-6">
          Kido turns your daily observations into structured health intelligence —{' '}
          <span className="text-kido-coral">
            ready for any clinician, any appointment, any moment.
          </span>
        </h2>
        <p className="text-sm text-kido-purple-muted leading-relaxed max-w-lg mx-auto">
          Not another notes app. Not a symptom checker. The infrastructure that connects the
          family&apos;s continuous story to the clinical system that needs it.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/50 mb-2">Before</p>
            <p className="text-xs text-kido-off-white/80">Scattered notes, fragmented memory, repeated handovers.</p>
          </div>
          <div className="rounded-xl border border-kido-coral/40 bg-kido-coral/10 px-4 py-3 backdrop-blur">
            <p className="text-[10px] uppercase tracking-[0.16em] text-kido-coral mb-2">After</p>
            <p className="text-xs text-kido-off-white">Structured timeline, patterns surfaced, clinician-ready context.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
