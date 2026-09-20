'use client'

import { type BetaRequest } from '@/lib/admin/requests'

type Props = {
  requests: BetaRequest[]
  sending: boolean
  results: { email: string; ok: boolean; error?: string }[] | null
  onCancel: () => void
  onConfirm: () => void
}

export default function InvitationDialog({ requests, sending, results, onCancel, onConfirm }: Props) {
  return (
    <section aria-labelledby="invite-preview-heading" className="mt-5 rounded-card border border-kt-teal/35 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-kt-olive-teal">Invitation preview</p>
          <h2 id="invite-preview-heading" className="mt-1 text-xl font-bold tracking-[-0.025em] text-kt-ink">Send Android beta invitations</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-kt-secondary">
            Each email contains the secure Play Store link. Only testers whose Play access has been granted will receive it.
          </p>
        </div>
        <button type="button" onClick={onCancel} disabled={sending} className="min-h-11 rounded-control border border-kt-ink/15 px-4 text-sm font-semibold text-kt-ink transition-colors hover:bg-kt-cream-muted disabled:opacity-60">
          Cancel
        </button>
      </div>
      <ul className="mt-4 divide-y divide-kt-ink/10 rounded-control border border-kt-ink/10 bg-kt-cream-deep px-4" aria-label="Selected recipients">
        {requests.map((request) => <li key={request.id} className="py-3 text-sm text-kt-secondary">{request.email}</li>)}
      </ul>
      {results && (
        <div className="mt-4 rounded-control border border-kt-ink/10 bg-kt-cream-deep px-4 py-3" role="status">
          {results.map((result) => (
            <p key={result.email} className="text-sm leading-6 text-kt-secondary">
              <span className="font-semibold text-kt-ink">{result.email}:</span> {result.ok ? 'sent' : result.error}
            </p>
          ))}
        </div>
      )}
      <button type="button" onClick={onConfirm} disabled={sending || results !== null} className="mt-5 inline-flex min-h-12 items-center justify-center rounded-control bg-kt-teal px-5 text-sm font-semibold text-kt-cream shadow-glow transition-colors hover:bg-kt-olive-teal disabled:cursor-not-allowed disabled:opacity-60">
        {sending ? 'Sending invitations…' : 'Send invitations'}
      </button>
    </section>
  )
}
