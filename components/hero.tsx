import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <Image
        src="/care-moment-1.jpg"
        alt="Parent supporting a child with care at home"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-kt-cream via-kt-cream/92 to-kt-cream/15"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-kt-cream via-transparent to-kt-cream/40 sm:to-kt-cream/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-page flex-col justify-end px-6 pb-16 pt-24 sm:justify-center sm:pb-20 sm:pt-20">
        <div className="max-w-xl animate-reveal">
          <Image
            src="/brand/wordmark-nav-ink.png"
            alt="Kidture"
            width={220}
            height={56}
            className="mb-8 h-10 w-auto sm:h-12"
            priority
          />

          <h1 className="mb-5 text-3xl font-semibold tracking-[-0.025em] leading-[1.08] text-kt-ink sm:text-4xl lg:text-5xl">
            Healthcare sees moments.
            <span className="mt-1 block text-kt-teal">Families live the pattern.</span>
          </h1>

          <p className="mb-8 max-w-md text-base font-medium leading-relaxed text-kt-ink sm:text-lg">
            What happens between appointments has had nowhere to go. Kidture turns daily
            observations into structured signals your care team can act on.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#waitlist"
              className="rounded-control bg-kt-teal px-6 py-3.5 text-sm font-semibold text-kt-cream shadow-glow transition-transform hover:bg-kt-olive-teal active:scale-[0.98]"
            >
              Get early access
            </a>
            <a
              href="#how-it-works"
              className="rounded-control border border-kt-ink/15 bg-kt-cream/70 px-6 py-3.5 text-sm font-semibold text-kt-ink transition-colors hover:bg-kt-cream"
            >
              See how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
