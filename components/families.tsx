const families = [
  {
    name: 'Priya, 7',
    conditions: 'Autism, sensory, sleep',
    chip: 'bg-kt-violet',
    tile: 'bg-[#F3EEFF]',
    parentMsg: '"Bad meltdown again tonight, no idea why. Third time this week."',
    finds:
      'Meltdowns correlate with under 5h sleep the night before, 87% of the time over 4 months.',
    outcome: 'Sleep referral raised. OT adjusts sensory plan.',
  },
  {
    name: 'Luca, 4',
    conditions: 'Asthma, food reactions',
    chip: 'bg-kt-rose',
    tile: 'bg-[#FFF0F2]',
    parentMsg: '"Coughing again after breakfast, used the inhaler twice."',
    finds: 'Coughing events cluster on mornings after dairy, appearing 11 times across 6 weeks.',
    outcome: 'Allergist investigates dairy-triggered airway response.',
  },
  {
    name: 'Ella, 9',
    conditions: 'ADHD, anxiety, medication',
    chip: 'bg-kt-blue',
    tile: 'bg-[#EEF7FF]',
    parentMsg: '"She\'s really struggling after school. Can\'t focus, really anxious."',
    finds:
      'After-school anxiety spikes began 3 weeks after dosage increase, unnoticed until the pattern emerged.',
    outcome: 'Psychiatrist adjusts dose timing. Symptoms ease.',
  },
]

export default function Families() {
  return (
    <section id="families" className="scroll-mt-28 bg-kt-cream-muted px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-page">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-[-0.03em] leading-tight text-kt-ink sm:text-4xl">
            The patterns no appointment ever caught.
          </h2>
          <p className="mt-3 text-sm text-kt-signpost">
            Illustrative scenarios based on real pediatric care patterns.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {families.map((f) => (
            <article
              key={f.name}
              className="overflow-hidden rounded-card border border-black/5 bg-kt-cream shadow-soft"
            >
              <div className={`${f.chip} flex items-center gap-3 px-5 py-4`}>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-kt-cream/20 text-sm font-bold text-kt-cream"
                  aria-hidden="true"
                >
                  {f.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-kt-cream">{f.name}</p>
                  <p className="text-xs text-kt-cream/75">{f.conditions}</p>
                </div>
              </div>

              <div className="space-y-3 p-5">
                <div className={`${f.tile} rounded-control p-3`}>
                  <p className="mb-1 text-xs font-medium text-kt-signpost">Parent</p>
                  <p className="text-sm leading-relaxed text-kt-ink">{f.parentMsg}</p>
                </div>

                <div className="rounded-control border border-kt-teal/20 bg-kt-cream p-3">
                  <p className="mb-1 text-xs font-semibold text-kt-teal">Kidture surfaces</p>
                  <p className="text-sm leading-relaxed text-kt-ink">{f.finds}</p>
                </div>

                <p className="text-sm font-medium leading-relaxed text-kt-emerald">
                  → {f.outcome}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
