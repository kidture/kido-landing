import React from 'react'

const steps = [
  {
    number: '01',
    emoji: '🎙️',
    title: 'Capture',
    subtitle: 'Talk, type, or voice-memo',
    body: 'No forms, no category selection. Just tell Kido what happened.',
  },
  {
    number: '02',
    emoji: '🧩',
    title: 'Structure',
    subtitle: 'AI maps it automatically',
    body: 'Every observation is tagged across 12 health categories — sleep, food, behaviour, sensory, meds, pain and more.',
  },
  {
    number: '03',
    emoji: '📊',
    title: 'Share',
    subtitle: 'Ready for any appointment',
    body: 'A structured summary your care team can read in seconds. Not a screenshot — a signal.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-kido-bg-soft px-6 py-24 scroll-mt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-kido-purple/10 to-transparent" />
      <div className="max-w-5xl mx-auto relative">

        <div className="text-center mb-16">
          <p className="text-xs font-bold text-kido-purple uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-kido-navy tracking-tight leading-tight">
            From moment to insight —<br className="hidden sm:block" /> in under 60 seconds.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center text-center">
                {/* <div className="mb-6 relative w-full max-w-[220px] rounded-3xl border border-kido-purple-border-light bg-white px-4 pt-4 pb-3 shadow-[0_20px_40px_rgba(26,14,48,0.09)]">
                  <div className="rounded-2xl bg-gradient-to-b from-white to-kido-purple-tint border border-kido-purple-border-light p-3 text-left">
                    <div className="h-1.5 w-10 bg-kido-purple/30 rounded-full mb-2" />
                    <div className="h-1.5 w-16 bg-kido-purple/25 rounded-full mb-3" />
                    <div className="space-y-1.5">
                      <div className="h-2 bg-kido-purple/20 rounded-full" />
                      <div className="h-2 bg-kido-purple/20 rounded-full w-4/5" />
                      <div className="h-2 bg-kido-coral/30 rounded-full w-3/5" />
                    </div>
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-kido-purple rounded-full flex items-center justify-center text-lg shadow-lg">
                    {step.emoji}
                  </div>
                </div> */}

                <div className="text-xs font-bold text-kido-purple-muted uppercase tracking-widest mb-1">
                  Step {step.number}
                </div>
                <h3 className="text-lg font-black text-kido-navy mb-1">{step.title}</h3>
                <p className="text-xs font-semibold text-kido-purple mb-3">{step.subtitle}</p>
                <p className="text-sm text-kido-muted leading-relaxed">{step.body}</p>
              </div>

              {step.number !== '03' && (
                <div className="flex justify-center sm:hidden text-kido-purple-muted text-2xl">↓</div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  )
}
