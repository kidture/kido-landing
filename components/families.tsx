const families = [
  {
    name: 'Priya, 7',
    conditions: 'Autism · sensory · sleep',
    headerBg: 'bg-kido-purple',
    headerText: 'text-purple-100',
    conditionText: 'text-purple-300',
    parentMsg: '"Bad meltdown again tonight, no idea why. Third time this week."',
    kidoFinds: 'Meltdowns correlate with <5h sleep the night before — 87% of the time over 4 months.',
    outcome: 'Sleep referral raised. OT adjusts sensory plan.',
    bubbleBg: 'bg-kido-purple-tint',
    kidoBubbleBg: 'bg-kido-purple-border-light',
    kidoLabel: 'text-kido-purple',
  },
  {
    name: 'Luca, 4',
    conditions: 'Asthma · food reactions',
    headerBg: 'bg-kido-coral',
    headerText: 'text-orange-50',
    conditionText: 'text-orange-200',
    parentMsg: '"Coughing again after breakfast, used the inhaler twice."',
    kidoFinds: 'Coughing events cluster on mornings after dairy — appearing 11 times across 6 weeks.',
    outcome: 'Allergist investigates dairy-triggered airway response.',
    bubbleBg: 'bg-orange-50',
    kidoBubbleBg: 'bg-yellow-50',
    kidoLabel: 'text-yellow-700',
  },
  {
    name: 'Ella, 9',
    conditions: 'ADHD · anxiety · medication',
    headerBg: 'bg-kido-navy',
    headerText: 'text-purple-100',
    conditionText: 'text-kido-purple-muted',
    parentMsg: '"She\'s really struggling after school — can\'t focus, really anxious."',
    kidoFinds: 'After-school anxiety spikes began 3 weeks after dosage increase — unnoticed until the pattern emerged.',
    outcome: 'Psychiatrist adjusts dose timing. Symptoms ease.',
    bubbleBg: 'bg-kido-purple-tint',
    kidoBubbleBg: 'bg-kido-purple-border-light',
    kidoLabel: 'text-kido-purple',
  },
]

export default function Families() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-xs font-bold text-kido-purple uppercase tracking-widest mb-3">
            Families like yours
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-kido-navy tracking-tight leading-tight mb-3">
            The patterns no appointment ever caught.
          </h2>
          <p className="text-xs text-kido-purple-muted">
            Illustrative scenarios based on real pediatric care patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {families.map((f) => (
            <div key={f.name} className="bg-white border border-kido-purple-border-light rounded-card overflow-hidden shadow-sm">

              {/* Card header */}
              <div className={`${f.headerBg} px-4 py-3`}>
                <p className={`text-xs font-bold ${f.headerText}`}>{f.name}</p>
                <p className={`text-xs ${f.conditionText}`}>{f.conditions}</p>
              </div>

              {/* Card body */}
              <div className="p-4 space-y-3">
                {/* Parent bubble */}
                <div className={`${f.bubbleBg} rounded-lg p-3`}>
                  <p className="text-xs text-kido-muted mb-1">Parent</p>
                  <p className="text-xs text-kido-navy leading-relaxed">{f.parentMsg}</p>
                </div>

                {/* Kido surfaces bubble */}
                <div className={`${f.kidoBubbleBg} rounded-lg p-3`}>
                  <p className={`text-xs font-semibold ${f.kidoLabel} mb-1`}>Kido surfaces</p>
                  <p className="text-xs text-kido-navy leading-relaxed">{f.kidoFinds}</p>
                </div>

                {/* Outcome */}
                <p className="text-xs font-semibold text-emerald-600 leading-relaxed">→ {f.outcome}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
