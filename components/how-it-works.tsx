import React from 'react'
import Image from 'next/image'

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
    <section id="how-it-works" className="bg-[#FAFBFF] px-6 py-24">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-xs font-bold text-kido-purple uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-kido-navy tracking-tight leading-tight">
            From moment to insight —<br className="hidden sm:block" /> in under 60 seconds.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center text-center">
                {/* Phone mockup */}
                <div className="mb-6 relative">
                  <Image
                    src="/phone-placeholder.svg"
                    alt={`Kido app screen — ${step.title}`}
                    width={120}
                    height={220}
                    className="drop-shadow-sm"
                  />
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-kido-purple rounded-full flex items-center justify-center text-lg shadow-lg">
                    {step.emoji}
                  </div>
                </div>

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
