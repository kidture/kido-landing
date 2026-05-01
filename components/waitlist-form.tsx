'use client'

import { useEffect, useRef, useState } from 'react'

type State = 'idle' | 'loading' | 'success' | 'error'
type Country = 'US' | 'UK'
const COUNTRIES: Array<{ code: Country; label: string }> = [
  { code: 'US', label: 'United States' },
  { code: 'UK', label: 'United Kingdom' },
]

function toSupportedCountry(code: string): Country | null {
  const normalized = code.trim().toUpperCase()
  if (normalized === 'US') return 'US'
  if (normalized === 'UK' || normalized === 'GB') return 'UK'
  return null
}

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState<Country>('US')
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [state, setState] = useState<State>('idle')
  const countryMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isMounted = true

    async function detectCountry() {
      try {
        const res = await fetch('https://ipapi.co/country/')
        if (!res.ok) return
        const code = await res.text()
        const detected = toSupportedCountry(code)
        if (detected && isMounted) {
          setCountry(detected)
        }
      } catch {
        // Keep default country when geolocation is unavailable.
      }
    }

    void detectCountry()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!countryMenuRef.current) return
      if (!countryMenuRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || state === 'loading') return

    setState('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, country }),
      })
      if (!res.ok) throw new Error('Failed')
      setState('success')
      setEmail('')
    } catch {
      setState('error')
    }
  }

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden px-6 py-24 text-center scroll-mt-28"
      style={{ background: 'linear-gradient(160deg, #1A0E30 0%, #2D1B69 58%, #251550 100%)' }}
    >
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-kido-purple/25 blur-3xl animate-glow-breathe" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-kido-coral/20 blur-3xl animate-glow-breathe" />
      <div className="max-w-xl mx-auto relative">
        <div className="rounded-3xl border border-white/15 bg-white/[0.05] backdrop-blur-md px-5 py-10 sm:px-8 shadow-[0_22px_55px_rgba(5,2,16,0.45)]">

        <p className="text-xs font-bold text-kido-purple-muted uppercase tracking-[0.2em] mb-5">
          Beta launching Summer 2026
        </p>

        <h2 className="text-3xl sm:text-4xl font-black text-kido-off-white leading-tight tracking-tight mb-4">
          Be the first to give your child&apos;s health story a home.
        </h2>

        <p className="text-sm text-kido-purple-muted leading-relaxed mb-10">
          Early access families will shape the product. Limited spots.
        </p>

        {state === 'success' ? (
          <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl px-6 py-5 text-emerald-300 font-semibold text-sm mb-4">
            You&apos;re on the list. We&apos;ll be in touch before beta opens. 🎉
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 mb-4">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-white/[0.08] border border-white/20 rounded-xl px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
            />
            <div className="relative sm:w-48" ref={countryMenuRef}>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isCountryOpen}
                aria-label="Country"
                onClick={() => setIsCountryOpen((prev) => !prev)}
                className="w-full h-12 bg-white/[0.08] border border-white/20 rounded-xl px-4 pr-11 text-sm text-white focus:outline-none focus:border-white/40 transition-colors text-left"
              >
                {COUNTRIES.find((item) => item.code === country)?.label}
              </button>
              <svg
                className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {isCountryOpen && (
                <div
                  role="listbox"
                  className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/20 bg-[#26164f] shadow-[0_16px_30px_rgba(0,0,0,0.28)] backdrop-blur"
                >
                  {COUNTRIES.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => {
                        setCountry(item.code)
                        setIsCountryOpen(false)
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors"
                    >
                      <span>{item.label}</span>
                      {country === item.code && (
                        <svg
                          className="w-4 h-4 text-kido-coral"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path d="M4.5 10.5L8 14L15.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={state === 'loading'}
              className="h-12 bg-kido-coral text-white font-bold px-6 rounded-xl text-sm shadow-[0_8px_22px_rgba(232,120,74,0.4)] hover:bg-orange-500 disabled:opacity-60 transition-colors whitespace-nowrap"
            >
              {state === 'loading' ? 'Sending…' : 'Get early access →'}
            </button>
          </form>
        )}

        {state === 'error' && (
          <p className="text-red-400 text-xs mb-4">Something went wrong — please try again.</p>
        )}

        <p className="text-xs text-white/30 mb-6">No spam. We&apos;ll reach out when beta opens.</p>

        {/* Social proof avatars */}
        <div className="flex justify-center items-center gap-3 pb-1">
          <div className="flex">
            {[
              { color: 'bg-kido-purple', initial: 'A' },
              { color: 'bg-kido-coral', initial: 'S' },
              { color: 'bg-kido-purple-muted', initial: 'E' },
            ].map((avatar, i) => (
              <div
                key={avatar.initial}
                className={`w-7 h-7 ${avatar.color} rounded-full border border-white/25 ${i > 0 ? '-ml-2' : ''} text-[10px] font-bold text-white flex items-center justify-center`}
                aria-hidden="true"
              >
                {avatar.initial}
              </div>
            ))}
          </div>
          <p className="text-xs text-white/40">Join families already on the list</p>
        </div>
        </div>

      </div>
    </section>
  )
}
