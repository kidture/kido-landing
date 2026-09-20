'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type FormEvent, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { type BetaPlatform, getSuggestedPlatform } from '@/lib/beta-platform'

type FormState = 'idle' | 'loading' | 'success' | 'error'

type Props = {
  testFlightUrl: string
}

function subscribeToDeviceChanges() {
  return () => undefined
}

function getBrowserSuggestedPlatform(): BetaPlatform {
  return getSuggestedPlatform(window.navigator.userAgent)
}

function getServerSuggestedPlatform(): BetaPlatform {
  return 'other'
}

function StoreBadge({ platform }: { platform: Exclude<BetaPlatform, 'other'> }) {
  const isIos = platform === 'ios'
  return (
    <Image
      src={isIos ? '/brand/app-store.svg' : '/brand/google-play.png'}
      alt=""
      aria-hidden="true"
      width={120}
      height={40}
      className="h-10 w-auto shrink-0"
    />
  )
}

export default function BetaAccess({ testFlightUrl }: Props) {
  const detectedPlatform = useSyncExternalStore(
    subscribeToDeviceChanges,
    getBrowserSuggestedPlatform,
    getServerSuggestedPlatform
  )
  const [chosenPlatform, setChosenPlatform] = useState<BetaPlatform | null>(null)
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [formError, setFormError] = useState('')
  const errorRef = useRef<HTMLDivElement>(null)
  const emailId = useId()

  useEffect(() => {
    if (formState === 'error') errorRef.current?.focus()
  }, [formState])

  async function handleAndroidSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (formState === 'loading') return

    setFormState('loading')
    setFormError('')

    try {
      const response = await fetch('/api/beta-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const body: unknown = await response.json()

      if (!response.ok) {
        const message =
          typeof body === 'object' && body !== null && 'error' in body
            ? String(body.error)
            : 'We could not save your request. Please try again.'
        throw new Error(message)
      }

      setFormState('success')
      setEmail('')
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'We could not save your request. Please try again.')
      setFormState('error')
    }
  }

  const platform = chosenPlatform ?? detectedPlatform
  const currentPanel = platform === 'other' ? null : platform

  return (
    <main className="min-h-screen bg-kt-canvas px-5 py-5 text-kt-ink sm:px-8 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-page flex-col rounded-[24px] border border-kt-ink/10 bg-kt-cream shadow-soft sm:min-h-[calc(100vh-4rem)]">
        <header className="flex items-center justify-between px-6 py-5 sm:px-9">
          <Link href="/" className="text-lg font-bold tracking-[-0.04em] text-kt-ink">
            Kidture
          </Link>
          <Link href="/" className="text-sm font-medium text-kt-signpost transition-colors hover:text-kt-ink">
            Back to site
          </Link>
        </header>

        <section className="mx-auto w-full max-w-3xl px-6 pb-12 pt-12 sm:px-9 sm:pb-20 sm:pt-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-kt-olive-teal">Kidture Beta Program</p>
            <h1 className="mt-4 text-balance text-4xl font-bold tracking-[-0.05em] text-kt-ink sm:text-5xl">
              Get the beta on the phone you use every day.
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-kt-secondary sm:text-lg">
              Choose your device below. iPhone and Android use different test programs, but both install the Kidture beta safely.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="Choose your device">
            {([
              { id: 'ios', label: 'iPhone or iPad', detail: 'Use Apple TestFlight' },
              { id: 'android', label: 'Android phone', detail: 'Request Play Store access' },
            ] as const).map((option) => {
              const selected = platform === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setChosenPlatform(option.id)}
                  className={`flex min-h-24 items-center gap-4 rounded-card border p-5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-kt-teal focus-visible:ring-offset-2 ${
                    selected
                      ? 'border-kt-teal bg-kt-teal/10 shadow-soft'
                      : 'border-kt-ink/10 bg-white hover:border-kt-teal/55 hover:bg-kt-cream-muted'
                  }`}
                >
                  <StoreBadge platform={option.id} />
                  <span>
                    <span className="block text-base font-semibold text-kt-ink">{option.label}</span>
                    <span className="mt-1 block text-sm text-kt-signpost">{option.detail}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {currentPanel === 'ios' && (
            <section className="mt-6 rounded-card border border-kt-teal/35 bg-white p-6 shadow-soft sm:p-8" aria-labelledby="ios-beta-heading">
              <div className="flex items-start gap-4">
                <StoreBadge platform="ios" />
                <div>
                  <h2 id="ios-beta-heading" className="text-xl font-bold tracking-[-0.025em] text-kt-ink">
                    Install with TestFlight
                  </h2>
                  <p className="mt-2 max-w-xl leading-7 text-kt-secondary">
                    Open this on your iPhone or iPad. Apple may ask you to install TestFlight and sign in with your Apple ID before you install the beta.
                  </p>
                </div>
              </div>
              {testFlightUrl ? (
                <a
                  href={testFlightUrl}
                  className="mt-7 inline-flex min-h-12 items-center justify-center rounded-control bg-kt-teal px-6 text-sm font-semibold text-kt-cream shadow-glow transition-colors hover:bg-kt-olive-teal"
                >
                  Open TestFlight
                </a>
              ) : (
                <p className="mt-7 rounded-control bg-kt-cream-deep px-4 py-3 text-sm leading-6 text-kt-secondary">
                  TestFlight enrollment is being prepared. Please check back shortly.
                </p>
              )}
            </section>
          )}

          {currentPanel === 'android' && (
            <section className="mt-6 rounded-card border border-kt-teal/35 bg-white p-6 shadow-soft sm:p-8" aria-labelledby="android-beta-heading">
              <div className="flex items-start gap-4">
                <StoreBadge platform="android" />
                <div>
                  <h2 id="android-beta-heading" className="text-xl font-bold tracking-[-0.025em] text-kt-ink">
                    Request Android access
                  </h2>
                  <p className="mt-2 max-w-xl leading-7 text-kt-secondary">
                    Enter the Google account that is signed in to the Google Play Store on this phone. It can be a Gmail or Google Workspace address, and it may be different from your usual email.
                  </p>
                </div>
              </div>

              {formState === 'success' ? (
                <div className="mt-7 rounded-control border border-kt-sage/60 bg-kt-sage/15 px-5 py-4" role="status">
                  <p className="font-semibold text-kt-ink">Your request is in.</p>
                  <p className="mt-1 text-sm leading-6 text-kt-secondary">
                    We&apos;ll email this address after it has been added to the Kidture Android test. That email will contain the secure Play Store install link.
                  </p>
                </div>
              ) : (
                <form className="mt-7 max-w-xl" onSubmit={handleAndroidSubmit} noValidate>
                  {formState === 'error' && (
                    <div ref={errorRef} tabIndex={-1} role="alert" className="mb-4 rounded-control border border-kt-coral/45 bg-kt-coral/10 px-4 py-3 text-sm text-kt-ink">
                      {formError}
                    </div>
                  )}
                  <label htmlFor={emailId} className="block text-sm font-semibold text-kt-ink">
                    Google Play account email
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@gmail.com"
                    aria-describedby={`${emailId}-hint`}
                    className="mt-2 h-12 w-full rounded-control border border-kt-ink/20 bg-kt-cream px-4 text-base text-kt-ink placeholder:text-kt-signpost/70 focus:border-kt-teal focus:outline-none"
                    required
                  />
                  <p id={`${emailId}-hint`} className="mt-2 text-sm leading-6 text-kt-signpost">
                    We use this only to add you to the Android beta and send your invitation.
                  </p>
                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="mt-5 inline-flex min-h-12 items-center justify-center rounded-control bg-kt-teal px-6 text-sm font-semibold text-kt-cream shadow-glow transition-colors hover:bg-kt-olive-teal disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {formState === 'loading' ? 'Requesting access…' : 'Request Android access'}
                  </button>
                </form>
              )}
            </section>
          )}

          {!currentPanel && (
            <p className="mt-6 text-sm leading-6 text-kt-signpost">
              Not on the phone you&apos;ll use? Choose the device above to get the right instructions.
            </p>
          )}

          <p className="mt-10 text-sm leading-6 text-kt-signpost">
            Questions about beta access? Email us at{' '}
            <a href="mailto:support@kidture.health" className="font-semibold text-kt-olive-teal underline underline-offset-2 hover:text-kt-ink">
              support@kidture.health
            </a>
            . Read our{' '}
            <Link href="/privacy" className="font-semibold text-kt-olive-teal underline underline-offset-2 hover:text-kt-ink">
              privacy policy
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
