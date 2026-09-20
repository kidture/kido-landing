'use client'

import { type FormEvent, useEffect, useId, useRef, useState } from 'react'

export default function LoginForm() {
  const emailId = useId()
  const passwordId = useId()
  const errorRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    if (state === 'error') errorRef.current?.focus()
  }, [state])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'loading') return

    setState('loading')
    setError('')

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const body: unknown = await response.json()
      if (!response.ok) {
        throw new Error(
          typeof body === 'object' && body !== null && 'error' in body
            ? String(body.error)
            : 'We could not sign you in.'
        )
      }
      window.location.assign('/admin')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'We could not sign you in.')
      setState('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
      {state === 'error' && (
        <div ref={errorRef} tabIndex={-1} role="alert" className="rounded-control border border-kt-coral/50 bg-kt-coral/10 px-4 py-3 text-sm leading-6 text-kt-ink">
          {error}
        </div>
      )}
      <div>
        <label htmlFor={emailId} className="block text-sm font-semibold text-kt-ink">Email</label>
        <input
          id={emailId}
          type="email"
          autoComplete="username"
          inputMode="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 h-12 w-full rounded-control border border-kt-ink/20 bg-kt-cream px-4 text-base text-kt-ink placeholder:text-kt-signpost/70 focus:border-kt-teal focus:outline-none"
          required
        />
      </div>
      <div>
        <label htmlFor={passwordId} className="block text-sm font-semibold text-kt-ink">Password</label>
        <input
          id={passwordId}
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 h-12 w-full rounded-control border border-kt-ink/20 bg-kt-cream px-4 text-base text-kt-ink focus:border-kt-teal focus:outline-none"
          required
        />
      </div>
      <button type="submit" disabled={state === 'loading'} className="inline-flex min-h-12 w-full items-center justify-center rounded-control bg-kt-teal px-5 text-sm font-semibold text-kt-cream shadow-glow transition-colors hover:bg-kt-olive-teal disabled:cursor-not-allowed disabled:opacity-60">
        {state === 'loading' ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
