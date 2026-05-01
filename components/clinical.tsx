export default function Clinical() {
  return (
    <section id="clinical" className="relative overflow-hidden bg-kido-bg-soft px-6 py-24 scroll-mt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-kido-purple/10 to-transparent" />
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-xs font-bold text-kido-purple uppercase tracking-widest mb-3">
            Built with clinicians
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-kido-navy tracking-tight">
            What doctors wish they had.
          </h2>
        </div>

        {/* Quote block */}
        <div className="bg-kido-navy rounded-2xl px-8 py-8 mb-4 shadow-[0_18px_48px_rgba(26,14,48,0.35)]">
          <div className="text-4xl text-kido-coral font-black leading-none mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            &quot;
          </div>
          <p className="text-base font-medium text-kido-off-white leading-relaxed mb-6">
            For parents this provides a lot of peace. You have all the information captured in
            there — and you have this as an{' '}
            <span className="text-kido-coral font-bold">armor to bring to the care team.</span>{' '}
            I would have needed this for my son for the moments I felt very alone in my thoughts.
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-kido-purple rounded-full flex items-center justify-center text-white font-black text-base flex-shrink-0">
              D
            </div>
            <div>
              <p className="text-sm font-bold text-kido-off-white">Dr. Megan Marie Delegas</p>
              <p className="text-xs text-kido-purple-muted">Women & Wellness Physiotherapist</p>
            </div>
          </div>
        </div>

        {/* AAP policy block */}
        <div className="bg-kido-purple-tint border border-kido-purple-border-light rounded-card px-5 py-4 flex gap-4 items-start shadow-[0_10px_24px_rgba(26,14,48,0.07)]">
          <div className="bg-kido-purple rounded-lg px-2.5 py-1.5 flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold text-white uppercase tracking-wide">AAP</span>
          </div>
          <div>
            <p className="text-xs font-bold text-kido-navy mb-1">American Academy of Pediatrics, 2023</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Structured caregiver-reported outcome collection is now recommended as part of
              standard pediatric care for children with chronic or complex conditions — the gap
              Kido is built to fill.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
