const stats = [
  {
    value: '25M',
    label: 'US children living with a chronic condition',
  },
  {
    value: '<60s',
    label: 'to log anything, no forms ever',
  },
  {
    value: '296',
    label: 'hours a year of invisible work made to count',
  },
]

export default function ProofStrip() {
  return (
    <section className="border-b border-black/5 bg-kt-cream px-6 py-12 sm:py-14">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
        {stats.map((stat) => (
          <div key={stat.value} className="text-center sm:text-left">
            <p className="text-3xl font-bold tracking-tight text-kt-teal sm:text-4xl">{stat.value}</p>
            <p className="mt-2 text-sm leading-relaxed text-kt-signpost">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
