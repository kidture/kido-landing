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
    const handleOutsideClick = (event: MouseEvent) => {
      if (!countryMenuRef.current) return
      if (!countryMenuRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
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
    <section id="waitlist" className="scroll-mt-28 bg-kt-charcoal-mesh px-6 py-24 sm:py-28">
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="rounded-card border border-kt-cream/10 bg-kt-cream/[0.04] px-5 py-10 shadow-lift backdrop-blur-md sm:px-10">
          <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
            <p className="text-sm font-medium text-kt-teal">Launching Soon in</p>
            <div className="flex items-center gap-2">
              <img
                src="/brand/app-store.svg"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <img
                src="/brand/google-play.png"
                alt="Get it on Google Play"
                width={135}
                height={40}
                className="h-[58px] w-auto -my-2"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-[-0.03em] leading-tight text-kt-fog sm:text-4xl">
            Be the first to give your child&apos;s health story a home.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-kt-mist">
            Early access families will shape the product. Limited spots.
          </p>

          {state === 'success' ? (
            <div className="mt-8 rounded-control border border-kt-sage/40 bg-kt-sage/15 px-6 py-5 text-sm font-semibold text-kt-sage">
              You&apos;re on the list. We&apos;ll be in touch before beta opens.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-[minmax(0,1fr)_12rem_auto] md:items-stretch"
            >
              <div className="text-left">
                <label htmlFor="waitlist-email" className="mb-1.5 block text-xs font-medium text-kt-mist">
                  Email
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full min-w-0 rounded-control border border-kt-cream/20 bg-kt-cream/[0.08] px-4 text-sm text-kt-cream placeholder:text-kt-cream/35 transition-colors focus:border-kt-teal focus:outline-none"
                />
              </div>
              <div className="relative text-left" ref={countryMenuRef}>
                <span className="mb-1.5 block text-xs font-medium text-kt-mist">Country</span>
                <div className="relative">
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isCountryOpen}
                    aria-label="Country"
                    onClick={() => setIsCountryOpen((prev) => !prev)}
                    className="h-12 w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-control border border-kt-cream/20 bg-kt-cream/[0.08] px-4 pr-11 text-left text-sm text-kt-cream transition-colors focus:border-kt-teal focus:outline-none"
                  >
                    {COUNTRIES.find((item) => item.code === country)?.label}
                  </button>
                  <svg
                    className={`pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-kt-cream/70 transition-transform ${
                      isCountryOpen ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {isCountryOpen && (
                  <div
                    role="listbox"
                    className="absolute z-20 mt-2 w-full overflow-hidden rounded-control border border-kt-cream/15 bg-kt-charcoal-mid shadow-lift"
                  >
                    {COUNTRIES.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setCountry(item.code)
                          setIsCountryOpen(false)
                        }}
                        className="flex w-full items-center justify-between whitespace-nowrap px-4 py-3 text-sm text-kt-cream transition-colors hover:bg-kt-cream/10"
                      >
                        <span>{item.label}</span>
                        {country === item.code && (
                          <svg
                            className="h-4 w-4 text-kt-teal"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M4.5 10.5L8 14L15.5 6.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-end sm:col-span-2 md:col-span-1">
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="h-12 whitespace-nowrap rounded-control bg-kt-teal px-6 text-sm font-semibold text-kt-cream shadow-glow transition-colors hover:bg-kt-olive-teal disabled:opacity-60 active:scale-[0.98]"
                >
                  {state === 'loading' ? 'Sending…' : 'Get early access'}
                </button>
              </div>
            </form>
          )}

          {state === 'error' && (
            <p className="mt-4 text-xs text-kt-coral">Something went wrong. Please try again.</p>
          )}

          <p className="mt-6 text-xs text-kt-cream/35">No spam. We&apos;ll reach out when beta opens.</p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex">
              {[
                { color: 'bg-kt-violet', initial: 'A' },
                { color: 'bg-kt-rose', initial: 'S' },
                { color: 'bg-kt-blue', initial: 'E' },
              ].map((avatar, i) => (
                <div
                  key={avatar.initial}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border border-kt-cream/25 text-[10px] font-bold text-kt-cream ${avatar.color} ${
                    i > 0 ? '-ml-2' : ''
                  }`}
                  aria-hidden="true"
                >
                  {avatar.initial}
                </div>
              ))}
            </div>
            <p className="text-xs text-kt-cream/45">Join families already on the list</p>
          </div>
        </div>
      </div>
    </section>
  )
}
