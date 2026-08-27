export default function Clinical() {
  return (
    <section id="clinical" className="scroll-mt-28 bg-kt-cream px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-3xl font-bold tracking-[-0.03em] text-kt-ink sm:text-4xl">
          What doctors wish they had.
        </h2>

        <figure className="mt-12 rounded-card bg-kt-charcoal px-7 py-8 shadow-lift sm:px-9">
          <blockquote>
            <p className="text-base font-medium leading-relaxed text-kt-fog sm:text-lg">
              For parents this provides a lot of peace. You have all the information captured in
              there, and you have this as an{' '}
              <span className="font-semibold text-kt-teal">armor to bring to the care team.</span>{' '}
              I would have needed this for my son for the moments I felt very alone in my thoughts.
            </p>
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-kt-teal text-base font-bold text-kt-cream"
              aria-hidden="true"
            >
              D
            </div>
            <div>
              <p className="text-sm font-semibold text-kt-fog">Dr. Megan Marie Delegas</p>
              <p className="text-xs text-kt-mist">Women & Wellness Physiotherapist</p>
            </div>
          </figcaption>
        </figure>

        <div className="mt-4 flex items-start gap-4 rounded-card border border-black/5 bg-kt-cream-muted px-5 py-4 shadow-soft">
          <div className="mt-0.5 flex-shrink-0 rounded-control bg-kt-teal px-2.5 py-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-kt-cream">AAP</span>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold text-kt-ink">
              American Academy of Pediatrics, 2023
            </p>
            <p className="text-xs leading-relaxed text-kt-signpost">
              Structured caregiver-reported outcome collection is now recommended as part of
              standard pediatric care for children with chronic or complex conditions. The gap
              Kidture is built to fill.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
