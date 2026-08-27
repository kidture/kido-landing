const cards = [
  {
    title: 'Holding the history',
    body: 'Caregivers carry the full medical memory across conditions, specialists, and years. What happens between appointments has had nowhere to go.',
  },
  {
    title: 'Tracking symptoms',
    body: "Parents search 2,000+ times a year about their child's health. 1 in 3 already use ChatGPT, but general AI answers the moment. It can't hold the story.",
  },
  {
    title: 'The care network',
    body: 'Families coordinate across pediatricians, schools, co-parents and carers. Without structure, fragmented recall repeats across every handover.',
  },
]

export default function Burden() {
  return (
    <section className="bg-kt-cream-deep px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-page">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-[-0.03em] leading-tight text-kt-ink sm:text-4xl">
            The signal exists. It&apos;s just never been structured.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-kt-signpost">
            Parents already hold everything a clinician needs. The problem isn&apos;t missing
            information. It&apos;s missing infrastructure.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-0 border-t border-black/10 md:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className={`border-black/10 py-8 md:border-l md:px-8 md:py-10 ${
                index === 0 ? 'md:border-l-0 md:pl-0' : ''
              } border-b md:border-b-0`}
            >
              <h3 className="text-lg font-semibold text-kt-ink">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-kt-signpost">{card.body}</p>
            </div>
          ))}
        </div>

        <blockquote className="mt-12 rounded-card bg-kt-charcoal px-6 py-6 text-center shadow-lift sm:px-10">
          <p className="text-base font-medium leading-relaxed text-kt-fog sm:text-lg">
            &ldquo;Pediatricians see a snapshot.{' '}
            <span className="text-kt-teal">Families live the story.</span>&rdquo;
          </p>
        </blockquote>
      </div>
    </section>
  )
}
