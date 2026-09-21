'use client'

import { useMemo, useState } from 'react'
import InvitationDialog from '@/components/admin/invitation-dialog'
import RequestTable from '@/components/admin/request-table'
import { BETA_REQUEST_STATUSES, type BetaRequest, type BetaRequestStatus, type RequestUpdate } from '@/lib/admin/requests'

type Props = { initialRequests: BetaRequest[] }

type SendResult = { email: string; ok: boolean; error?: string }

function countLabel(count: number, singular: string): string {
  return `${count} ${count === 1 ? singular : `${singular}s`}`
}

export default function Dashboard({ initialRequests }: Props) {
  const [requests, setRequests] = useState(initialRequests)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'all' | BetaRequestStatus>('all')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set())
  const [bulkStatus, setBulkStatus] = useState<BetaRequestStatus | ''>('')
  const [bulkSaving, setBulkSaving] = useState(false)
  const [showInvitePreview, setShowInvitePreview] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendResults, setSendResults] = useState<SendResult[] | null>(null)
  const [notice, setNotice] = useState('')

  const visibleRequests = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    return requests.filter((request) => {
      const matchesSearch = !normalizedSearch || `${request.email} ${request.notes}`.toLowerCase().includes(normalizedSearch)
      return matchesSearch && (status === 'all' || request.status === status)
    })
  }, [requests, search, status])

  const selectedRequests = useMemo(
    () => requests.filter((request) => selectedIds.has(request.id)),
    [requests, selectedIds]
  )

  const counts = useMemo(
    () => Object.fromEntries(BETA_REQUEST_STATUSES.map((item) => [item, requests.filter((request) => request.status === item).length])) as Record<BetaRequestStatus, number>,
    [requests]
  )

  const allVisibleSelected = visibleRequests.length > 0 && visibleRequests.every((request) => selectedIds.has(request.id))

  function toggleSelected(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    setSendResults(null)
  }

  function toggleVisibleSelection() {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (allVisibleSelected) visibleRequests.forEach((request) => next.delete(request.id))
      else visibleRequests.forEach((request) => next.add(request.id))
      return next
    })
    setSendResults(null)
  }

  async function saveRequest(id: string, update: RequestUpdate) {
    setSavingIds((current) => new Set(current).add(id))
    setNotice('')
    try {
      const response = await fetch(`/api/admin/requests/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
      })
      const body: unknown = await response.json()
      if (!response.ok || typeof body !== 'object' || body === null || !('request' in body)) {
        throw new Error(typeof body === 'object' && body !== null && 'error' in body ? String(body.error) : 'We could not save this request.')
      }
      const updated = body.request as BetaRequest
      setRequests((current) => current.map((request) => request.id === updated.id ? updated : request))
      setNotice(`${updated.email} saved.`)
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'We could not save this request.')
    } finally {
      setSavingIds((current) => {
        const next = new Set(current)
        next.delete(id)
        return next
      })
    }
  }

  async function bulkUpdateStatus() {
    if (selectedRequests.length < 2 || !bulkStatus) return

    setBulkSaving(true)
    setNotice('')
    setSavingIds((current) => new Set([...current, ...selectedRequests.map((request) => request.id)]))

    const results = await Promise.all(selectedRequests.map(async (request) => {
      try {
        const response = await fetch(`/api/admin/requests/${encodeURIComponent(request.id)}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: bulkStatus, notes: request.notes }),
        })
        const body: unknown = await response.json()
        if (!response.ok || typeof body !== 'object' || body === null || !('request' in body)) {
          throw new Error(typeof body === 'object' && body !== null && 'error' in body ? String(body.error) : 'We could not save this request.')
        }
        return { updated: body.request as BetaRequest }
      } catch (error) {
        return { id: request.id, error: error instanceof Error ? error.message : 'We could not save this request.' }
      }
    }))

    const updatedRequests = results.filter((result): result is { updated: BetaRequest } => 'updated' in result).map((result) => result.updated)
    const updatedIds = new Set(updatedRequests.map((request) => request.id))

    if (updatedRequests.length > 0) {
      setRequests((current) => current.map((request) => updatedRequests.find((updated) => updated.id === request.id) ?? request))
      setSelectedIds((current) => new Set([...current].filter((id) => !updatedIds.has(id))))
    }

    const failed = results.length - updatedRequests.length
    setNotice(`${countLabel(updatedRequests.length, 'request')} updated.${failed > 0 ? ` ${countLabel(failed, 'request')} could not be updated.` : ''}`)
    setBulkStatus('')
    setBulkSaving(false)
    setSavingIds((current) => {
      const next = new Set(current)
      selectedRequests.forEach((request) => next.delete(request.id))
      return next
    })
  }

  async function sendInvitations() {
    setSending(true)
    setNotice('')
    try {
      const response = await fetch('/api/admin/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedRequests.map((request) => request.id) }),
      })
      const body: unknown = await response.json()
      if (!response.ok || typeof body !== 'object' || body === null || !('results' in body) || !Array.isArray(body.results)) {
        throw new Error(typeof body === 'object' && body !== null && 'error' in body ? String(body.error) : 'We could not send invitations.')
      }
      const results = body.results as SendResult[]
      setSendResults(results)
      const sentEmails = new Set(results.filter((result) => result.ok).map((result) => result.email))
      if (sentEmails.size > 0) {
        setRequests((current) => current.map((request) => sentEmails.has(request.email) ? { ...request, status: 'invited' as const, invitationEmailedAt: new Date().toISOString() } : request))
        setSelectedIds(new Set())
      }
      setNotice(`${countLabel(sentEmails.size, 'invitation')} sent.`)
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'We could not send invitations.')
    } finally {
      setSending(false)
    }
  }

  async function logout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    window.location.assign('/admin/login')
  }

  return (
    <main className="min-h-screen bg-kt-canvas px-4 py-4 text-kt-ink sm:px-8 sm:py-8">
      <div className="mx-auto min-h-[calc(100vh-2rem)] max-w-page rounded-[24px] border border-kt-ink/10 bg-kt-cream shadow-soft sm:min-h-[calc(100vh-4rem)]">
        <header className="flex flex-col gap-5 border-b border-kt-ink/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-9">
          <div><p className="text-lg font-bold tracking-[-0.04em] text-kt-ink">Kidture</p><p className="mt-1 text-sm text-kt-signpost">Beta testing operations</p></div>
          <div className="flex flex-wrap gap-3"><a href="/api/admin/exports/active" className="inline-flex min-h-11 items-center justify-center rounded-control border border-kt-ink/15 bg-white px-4 text-sm font-semibold text-kt-ink transition-colors hover:bg-kt-cream-muted">Download active testers CSV</a><button type="button" onClick={logout} className="min-h-11 rounded-control px-4 text-sm font-semibold text-kt-secondary transition-colors hover:bg-kt-cream-muted hover:text-kt-ink">Sign out</button></div>
        </header>
        <section className="px-6 py-8 sm:px-9 sm:py-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-sm font-semibold text-kt-olive-teal">Android beta</p><h1 className="mt-2 text-balance text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Manage beta access with confidence.</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-kt-secondary sm:text-base">Review requests, prepare the complete Play Console list, and send the secure installation email once access is granted.</p></div><p className="rounded-control bg-kt-cream-deep px-4 py-3 text-sm font-semibold text-kt-secondary">{countLabel(requests.length, 'request')}</p></div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-label="Request status summary">
            {BETA_REQUEST_STATUSES.map((item) => <button key={item} type="button" onClick={() => setStatus(item)} className={`min-h-20 rounded-card border p-4 text-left transition-colors hover:border-kt-teal/55 ${status === item ? 'border-kt-teal bg-kt-teal/10' : 'border-kt-ink/10 bg-white'}`}><span className="block text-2xl font-bold tracking-[-0.04em]">{counts[item]}</span><span className="mt-1 block text-sm text-kt-secondary">{item.replaceAll('_', ' ')}</span></button>)}
          </div>

          <section aria-label="Request filters" className="mt-8 rounded-card border border-kt-ink/10 bg-white p-4 shadow-soft sm:p-5"><div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_15rem_auto]"><label className="block text-sm font-semibold text-kt-ink">Search testers<input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Email or note" className="mt-2 h-12 w-full rounded-control border border-kt-ink/20 bg-kt-cream px-4 font-normal text-kt-ink placeholder:text-kt-signpost/70 focus:border-kt-teal focus:outline-none" /></label><label className="block text-sm font-semibold text-kt-ink">Status<select value={status} onChange={(event) => setStatus(event.target.value as 'all' | BetaRequestStatus)} className="mt-2 h-12 w-full rounded-control border border-kt-ink/20 bg-kt-cream px-4 font-normal text-kt-ink focus:border-kt-teal focus:outline-none"><option value="all">All statuses</option>{BETA_REQUEST_STATUSES.map((item) => <option key={item} value={item}>{item.replaceAll('_', ' ')}</option>)}</select></label><div className="flex items-end"><button type="button" onClick={() => { setSearch(''); setStatus('all') }} className="min-h-12 w-full rounded-control border border-kt-ink/15 px-4 text-sm font-semibold transition-colors hover:bg-kt-cream-muted">Clear filters</button></div></div></section>

          {notice && <p role="status" className="mt-4 rounded-control border border-kt-ink/10 bg-kt-cream-deep px-4 py-3 text-sm leading-6 text-kt-secondary">{notice}</p>}

          <div className="mt-6 flex flex-col gap-4"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-kt-signpost">{countLabel(visibleRequests.length, 'visible request')} · {countLabel(selectedRequests.length, 'tester selected')}</p><div className="flex flex-wrap gap-3"><button type="button" onClick={toggleVisibleSelection} disabled={visibleRequests.length === 0 || bulkSaving} className="inline-flex min-h-12 items-center justify-center rounded-control border border-kt-ink/15 bg-white px-5 text-sm font-semibold text-kt-ink transition-colors hover:bg-kt-cream-muted disabled:cursor-not-allowed disabled:opacity-60">{allVisibleSelected ? 'Clear visible selection' : 'Select all visible'}</button><button type="button" onClick={() => { setShowInvitePreview(true); setSendResults(null) }} disabled={selectedRequests.length === 0 || bulkSaving} className="inline-flex min-h-12 items-center justify-center rounded-control bg-kt-teal px-5 text-sm font-semibold text-kt-cream shadow-glow transition-colors hover:bg-kt-olive-teal disabled:cursor-not-allowed disabled:opacity-60">Review invitations</button></div></div>
            <section aria-label="Bulk status update" className="flex flex-col gap-3 rounded-card border border-kt-ink/10 bg-white p-4 shadow-soft sm:flex-row sm:items-end sm:justify-between"><label className="block text-sm font-semibold text-kt-ink">Update status for selected testers<select aria-label="Bulk status" value={bulkStatus} onChange={(event) => setBulkStatus(event.target.value as BetaRequestStatus | '')} disabled={bulkSaving} className="mt-2 h-11 w-full min-w-56 rounded-control border border-kt-ink/20 bg-kt-cream px-3 font-normal text-kt-ink focus:border-kt-teal focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"><option value="">Choose a status</option>{BETA_REQUEST_STATUSES.map((item) => <option key={item} value={item}>{item.replaceAll('_', ' ')}</option>)}</select></label><button type="button" onClick={bulkUpdateStatus} disabled={selectedRequests.length < 2 || !bulkStatus || bulkSaving} className="min-h-11 rounded-control border border-kt-ink/15 px-5 text-sm font-semibold text-kt-ink transition-colors hover:bg-kt-cream-muted disabled:cursor-not-allowed disabled:opacity-60">{bulkSaving ? 'Updating…' : 'Update selected'}</button></section>
          </div>

          {showInvitePreview && <InvitationDialog requests={selectedRequests} sending={sending} results={sendResults} onCancel={() => { setShowInvitePreview(false); setSendResults(null) }} onConfirm={sendInvitations} />}
          <div className="mt-6"><RequestTable requests={visibleRequests} selectedIds={selectedIds} savingIds={savingIds} onToggleSelected={toggleSelected} onSave={saveRequest} /></div>
        </section>
      </div>
    </main>
  )
}
