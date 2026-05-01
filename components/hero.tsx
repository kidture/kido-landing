import Image from 'next/image'

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-kido-bg-soft to-white px-6 py-24 text-center">
      <div className="max-w-3xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-kido-purple-tint text-kido-purple text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-pill mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-kido-purple animate-pulse-dot" />
          Beta launching Summer 2026 · Patent Pending
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-tight mb-6">
          <span className="text-kido-navy block">Healthcare sees moments.</span>
          <span className="text-kido-purple block">Families live the pattern.</span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-kido-muted leading-relaxed max-w-xl mx-auto mb-10">
          What happens between appointments has had nowhere to go — until now.
          Kido turns your daily observations into structured signals your care team can finally act on.
        </p>

        {/* Caregiving moments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-kido-purple-border-light shadow-[0_16px_35px_rgba(26,14,48,0.12)]">
            <Image
              src="/care-moment-1.jpg"
              alt="Parent supporting child with care at home"
              width={1024}
              height={1024}
              className="w-full h-52 sm:h-64 object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-kido-navy/25 to-transparent" />
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-kido-purple-border-light shadow-[0_16px_35px_rgba(26,14,48,0.12)] sm:translate-y-6">
            <Image
              src="/care-moment-2.jpg"
              alt="Parent and child sharing a healthy joyful moment"
              width={768}
              height={1024}
              className="w-full h-52 sm:h-64 object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-kido-navy/20 to-transparent" />
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <a
            href="#waitlist"
            className="bg-kido-purple text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-[0_4px_14px_rgba(124,58,237,0.35)] hover:bg-purple-700 transition-colors"
          >
            Get early access →
          </a>
          <a
            href="#how-it-works"
            className="border-2 border-kido-purple-border text-kido-purple font-semibold px-6 py-3.5 rounded-xl text-sm hover:bg-kido-purple-tint transition-colors"
          >
            See how it works ↓
          </a>
        </div>

        {/* Stats strip */}
        <div className="bg-kido-purple-tint border border-kido-purple-border-light rounded-[14px] px-6 py-5 flex flex-col sm:flex-row justify-around items-center gap-6 max-w-xl mx-auto">
          <Stat value="25M" label={<>US children living with<br />a chronic condition</>} />
          <div className="hidden sm:block w-px h-10 bg-kido-purple-border" />
          <Stat value="<90s" label={<>to log anything <br />no forms, ever</>} />
          <div className="hidden sm:block w-px h-10 bg-kido-purple-border" />
          <Stat value="296" label={<>hours a year, the invisible<br />work Kido makes count</>} />
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
