const steps = [
  {
    title: 'Capture',
    subtitle: 'Talk, type, or voice-memo',
    body: 'No forms, no category selection. Just tell Kidture what happened.',
  },
  {
    title: 'Structure',
    subtitle: 'AI maps it automatically',
    body: 'Every observation is tagged across 12 health categories: sleep, food, behaviour, sensory, meds, pain and more.',
  },
  {
    title: 'Share',
    subtitle: 'Ready for any appointment',
    body: 'A structured summary your care team can read in seconds. Not a screenshot. A signal.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-28 bg-kt-cream px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-page">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-[-0.03em] leading-tight text-kt-ink sm:text-4xl">
            From moment to insight in under 60 seconds.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-kt-teal text-sm font-bold text-kt-cream">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-kt-ink">{step.title}</h3>
              <p className="mt-1 text-sm font-medium text-kt-teal">{step.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-kt-signpost">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
