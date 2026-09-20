import { type BetaRequestStatus } from '@/lib/admin/requests'

const labels: Record<BetaRequestStatus, string> = {
  requested: 'Requested',
  play_access_pending: 'Play access pending',
  play_access_granted: 'Play access granted',
  invited: 'Invited',
  removed: 'Removed',
}

const classes: Record<BetaRequestStatus, string> = {
  requested: 'border-kt-blue/25 bg-kt-blue/10 text-kt-ink',
  play_access_pending: 'border-kt-amber/50 bg-kt-amber/20 text-kt-ink',
  play_access_granted: 'border-kt-teal/35 bg-kt-teal/15 text-kt-ink',
  invited: 'border-kt-sage/55 bg-kt-sage/20 text-kt-ink',
  removed: 'border-kt-ink/15 bg-kt-fog text-kt-secondary',
}

export function statusLabel(status: BetaRequestStatus): string {
  return labels[status]
}

export default function StatusBadge({ status }: { status: BetaRequestStatus }) {
  return (
    <span className={`inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${classes[status]}`}>
      {labels[status]}
    </span>
  )
}
