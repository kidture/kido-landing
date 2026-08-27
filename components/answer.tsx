export default function Answer() {
  return (
    <section className="bg-kt-charcoal-mesh px-6 py-24 text-center sm:py-28">
      <div className="relative mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold tracking-[-0.03em] leading-tight text-kt-fog sm:text-4xl">
          Kidture turns your daily observations into structured health intelligence,{' '}
          <span className="text-kt-teal">
            ready for any clinician, any appointment, any moment.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-kt-mist sm:text-base">
          Not another notes app. Not a symptom checker. The infrastructure that connects the
          family&apos;s continuous story to the clinical system that needs it.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
          <div className="rounded-card border border-kt-cream/10 bg-kt-cream/[0.05] px-5 py-4">
            <p className="mb-2 text-xs font-semibold text-kt-mist">Before</p>
            <p className="text-sm leading-relaxed text-kt-fog/85">
              Scattered notes, fragmented memory, repeated handovers.
            </p>
          </div>
          <div className="rounded-card border border-kt-teal/35 bg-kt-teal/10 px-5 py-4">
            <p className="mb-2 text-xs font-semibold text-kt-teal">After</p>
            <p className="text-sm leading-relaxed text-kt-fog">
              Structured timeline, patterns surfaced, clinician-ready context.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
