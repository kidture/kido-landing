'use client'

import { useState } from 'react'
import { BETA_REQUEST_STATUSES, type BetaRequest, type RequestUpdate } from '@/lib/admin/requests'
import StatusBadge, { statusLabel } from '@/components/admin/status-badge'

type Props = {
  requests: BetaRequest[]
  selectedIds: Set<string>
  savingIds: Set<string>
  onToggleSelected: (id: string) => void
  onSave: (id: string, update: RequestUpdate) => void
}

type Draft = RequestUpdate

function dateLabel(value: string): string {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function RequestEditor({ request, saving, onSave }: { request: BetaRequest; saving: boolean; onSave: (update: RequestUpdate) => void }) {
  const [draft, setDraft] = useState<Draft>({ status: request.status, notes: request.notes })

  return (
    <div className="grid gap-3 sm:grid-cols-[minmax(11rem,1fr)_minmax(13rem,1.5fr)_auto] sm:items-end">
      <label className="block text-xs font-semibold text-kt-secondary">
        Status
        <select value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value as BetaRequest['status'] }))} className="mt-1 h-11 w-full rounded-control border border-kt-ink/20 bg-kt-cream px-3 text-sm text-kt-ink focus:border-kt-teal focus:outline-none" disabled={saving}>
          {BETA_REQUEST_STATUSES.map((status) => <option key={status} value={status}>{statusLabel(status)}</option>)}
        </select>
      </label>
      <label className="block text-xs font-semibold text-kt-secondary">
        Notes
        <textarea value={draft.notes} onChange={(event) => setDraft((current) => ({ ...current, notes: event.target.value }))} maxLength={2000} rows={2} className="mt-1 w-full resize-y rounded-control border border-kt-ink/20 bg-kt-cream px-3 py-2 text-sm text-kt-ink focus:border-kt-teal focus:outline-none" disabled={saving} />
      </label>
      <button type="button" onClick={() => onSave(draft)} disabled={saving} className="min-h-11 rounded-control border border-kt-ink/15 px-4 text-sm font-semibold text-kt-ink transition-colors hover:bg-kt-cream-muted disabled:cursor-not-allowed disabled:opacity-60">
        {saving ? 'Saving…' : 'Save'}
      </button>
    </div>
  )
}

function SelectionControl({ request, checked, onToggle }: { request: BetaRequest; checked: boolean; onToggle: () => void }) {
  return (
    <label className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-kt-ink">
      <input type="checkbox" checked={checked} onChange={onToggle} className="h-4 w-4 accent-kt-teal" aria-label={`Select ${request.email} for invitation`} />
      Select
    </label>
  )
}

export default function RequestTable({ requests, selectedIds, savingIds, onToggleSelected, onSave }: Props) {
  if (requests.length === 0) {
    return <div className="rounded-card border border-dashed border-kt-ink/20 bg-white px-6 py-12 text-center text-sm leading-6 text-kt-secondary">No beta requests match this view.</div>
  }

  return (
    <>
      <div className="hidden overflow-x-auto rounded-card border border-kt-ink/10 bg-white shadow-soft md:block">
        <table className="min-w-[980px] w-full border-collapse text-left text-sm">
          <thead className="bg-kt-cream-deep text-xs uppercase tracking-[0.08em] text-kt-signpost">
            <tr>
              <th scope="col" className="px-5 py-4 font-semibold">Tester</th>
              <th scope="col" className="px-5 py-4 font-semibold">Status</th>
              <th scope="col" className="px-5 py-4 font-semibold">Requested</th>
              <th scope="col" className="px-5 py-4 font-semibold">Play access</th>
              <th scope="col" className="px-5 py-4 font-semibold">Invited</th>
              <th scope="col" className="px-5 py-4 font-semibold">Manage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-kt-ink/10">
            {requests.map((request) => (
              <tr key={request.id} className="align-top">
                <td className="px-5 py-5"><p className="font-semibold text-kt-ink">{request.email}</p><SelectionControl request={request} checked={selectedIds.has(request.id)} onToggle={() => onToggleSelected(request.id)} /></td>
                <td className="px-5 py-5"><StatusBadge status={request.status} /></td>
                <td className="px-5 py-5 text-kt-secondary">{dateLabel(request.submittedAt)}</td>
                <td className="px-5 py-5 text-kt-secondary">{dateLabel(request.playAccessGrantedAt)}</td>
                <td className="px-5 py-5 text-kt-secondary">{dateLabel(request.invitationEmailedAt)}</td>
                <td className="min-w-[360px] px-5 py-5"><RequestEditor request={request} saving={savingIds.has(request.id)} onSave={(update) => onSave(request.id, update)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 md:hidden">
        {requests.map((request) => (
          <article key={request.id} className="rounded-card border border-kt-ink/10 bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between gap-4"><div><h3 className="break-all font-semibold text-kt-ink">{request.email}</h3><p className="mt-1 text-sm text-kt-signpost">Requested {dateLabel(request.submittedAt)}</p></div><StatusBadge status={request.status} /></div>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm"><div><dt className="font-semibold text-kt-signpost">Play access</dt><dd className="mt-1 text-kt-secondary">{dateLabel(request.playAccessGrantedAt)}</dd></div><div><dt className="font-semibold text-kt-signpost">Invited</dt><dd className="mt-1 text-kt-secondary">{dateLabel(request.invitationEmailedAt)}</dd></div></dl>
            <div className="mt-4"><SelectionControl request={request} checked={selectedIds.has(request.id)} onToggle={() => onToggleSelected(request.id)} /></div>
            <div className="mt-4 border-t border-kt-ink/10 pt-4"><RequestEditor request={request} saving={savingIds.has(request.id)} onSave={(update) => onSave(request.id, update)} /></div>
          </article>
        ))}
      </div>
    </>
  )
}
