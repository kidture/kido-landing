import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-kido-mesh px-6 py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-kido-purple/20 blur-3xl animate-glow-breathe" />
      <div className="pointer-events-none absolute -right-24 bottom-6 h-80 w-80 rounded-full bg-kido-coral/15 blur-3xl animate-glow-breathe" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/85 backdrop-blur border border-kido-purple-border-light text-kido-purple text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-pill mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-kido-purple animate-pulse-dot" />
            Beta launching Summer 2026 · Patent Pending
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.98] mb-6">
            <span className="text-kido-navy block">Healthcare sees moments.</span>
            <span className="text-kido-purple block">Families live the pattern.</span>
          </h1>

          <p className="text-base sm:text-lg text-kido-muted leading-relaxed max-w-xl mb-9">
            What happens between appointments has had nowhere to go — until now.
            Kido turns daily observations into structured signals your care team can finally act on.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="#waitlist"
              className="bg-kido-purple text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-[0_8px_22px_rgba(124,58,237,0.35)] hover:bg-purple-700 transition-colors"
            >
              Get early access →
            </a>
            <a
              href="#how-it-works"
              className="border border-kido-purple-border bg-white/75 backdrop-blur text-kido-purple font-semibold px-6 py-3.5 rounded-xl text-sm hover:bg-kido-purple-tint transition-colors"
            >
              See how it works ↓
            </a>
          </div>

          <div className="bg-white/85 backdrop-blur border border-kido-purple-border-light rounded-2xl px-6 py-5 flex flex-col sm:flex-row justify-around items-center gap-6 max-w-xl shadow-[0_18px_45px_rgba(26,14,48,0.09)]">
            <Stat value="25M" label={<>US children living with<br />a chronic condition</>} />
            <div className="hidden sm:block w-px h-10 bg-kido-purple-border" />
            <Stat value="<60s" label={<>to log anything <br />no forms, ever</>} />
            <div className="hidden sm:block w-px h-10 bg-kido-purple-border" />
            <Stat value="296" label={<>hours a year, the invisible<br />work Kido makes count</>} />
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-[28px] border border-kido-purple-border-light bg-white/75 backdrop-blur-sm p-4 shadow-[0_24px_60px_rgba(26,14,48,0.16)] kido-noise">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/care-moment-1.jpg"
                alt="Parent supporting child with care at home"
                width={1200}
                height={1200}
                className="w-full h-[420px] object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-kido-navy/30 via-kido-navy/5 to-transparent" />
            </div>
            <div className="absolute left-8 bottom-8 rounded-xl bg-white/90 backdrop-blur px-4 py-3 border border-kido-purple-border-light shadow-lg max-w-[300px]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-kido-purple-muted font-bold mb-1">Signal surfaced</p>
              <p className="text-xs font-semibold text-kido-navy leading-relaxed">
                Sleep disruption appears before behavioural spikes in 4 out of 5 logged episodes.
              </p>
            </div>
          </div>

          <div className="hidden sm:block absolute -right-10 -bottom-8 w-52 rounded-2xl border border-kido-purple-border-light bg-white p-3 shadow-[0_18px_40px_rgba(26,14,48,0.2)] animate-float-slow">
            <Image
              src="/care-moment-2.jpg"
              alt="Parent and child sharing a healthy joyful moment"
              width={560}
              height={760}
              className="w-full h-40 object-cover rounded-xl mb-3"
              priority
            />
            <p className="text-[11px] text-kido-purple-muted font-semibold uppercase tracking-wider mb-1">Story to signal</p>
            <p className="text-xs text-kido-navy leading-relaxed">From daily memory to structured summary in seconds.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: React.ReactNode }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-black text-kido-purple tracking-tight leading-none">{value}</div>
      <div className="text-xs text-kido-purple-muted leading-relaxed mt-1">{label}</div>
    </div>
  )
}
