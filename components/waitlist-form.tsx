'use client'

import { useState } from 'react'

type State = 'idle' | 'loading' | 'success' | 'error'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || state === 'loading') return

    setState('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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
      className="px-6 py-24 text-center"
      style={{ background: 'linear-gradient(160deg, #1A0E30 0%, #2D1B69 100%)' }}
    >
      <div className="max-w-xl mx-auto">

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
          <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl px-6 py-5 text-emerald-300 font-semibold text-sm">
            You&apos;re on the list. We&apos;ll be in touch before beta opens. 🎉
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/[0.08] border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
            />
            <button
              type="submit"
              disabled={state === 'loading'}
              className="bg-kido-coral text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-[0_4px_14px_rgba(232,120,74,0.4)] hover:bg-orange-500 disabled:opacity-60 transition-colors whitespace-nowrap"
            >
              {state === 'loading' ? 'Sending…' : 'Get early access →'}
            </button>
          </form>
        )}

        {state === 'error' && (
          <p className="text-red-400 text-xs mb-3">Something went wrong — please try again.</p>
        )}

        <p className="text-xs text-white/30 mb-8">No spam. We&apos;ll reach out when beta opens.</p>

        {/* Social proof avatars */}
        <div className="flex justify-center items-center gap-3">
          <div className="flex">
            {['bg-kido-purple', 'bg-kido-coral', 'bg-kido-purple-muted'].map((color, i) => (
              <div
                key={color}
                className={`w-7 h-7 ${color} rounded-full border-2 border-kido-navy ${i > 0 ? '-ml-2' : ''}`}
              />
            ))}
          </div>
          <p className="text-xs text-white/40">Join families already on the list</p>
        </div>

      </div>
    </section>
  )
}
