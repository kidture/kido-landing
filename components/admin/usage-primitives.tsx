import type { Count } from '@/lib/admin/usage-server'

export function number(value: number): string { return new Intl.NumberFormat('en-US').format(value) }
export function countDetail(value: Count): string { return `${number(value.households)} households · ${number(value.actions)} actions` }

export function Bar({ label, count, max, detail }: { label: string; count: number; max: number; detail: string }) {
  return <div className="grid gap-1 py-2 sm:grid-cols-[minmax(9rem,14rem)_1fr_auto] sm:items-center sm:gap-4" aria-label={`${label}: ${detail}`}>
    <span className="text-sm font-semibold text-kt-ink">{label}</span>
    <div className="h-3 overflow-hidden rounded-full bg-kt-cream-deep" aria-hidden="true">
      <div className="h-full rounded-full bg-kt-teal" style={{ width: count ? `${Math.max(3, count / Math.max(max, 1) * 100)}%` : '0%' }} />
    </div>
    <span className="text-sm tabular-nums text-kt-secondary">{detail}</span>
  </div>
}

export function Metric({ label, value, note }: { label: string; value: string | number; note?: string }) {
  return <div className="rounded-card border border-kt-ink/10 bg-white p-5 shadow-soft">
    <p className="text-sm font-medium text-kt-secondary">{label}</p>
    <p className="mt-2 text-3xl font-bold tracking-[-0.05em] tabular-nums">{value}</p>
    {note && <p className="mt-1 text-xs leading-5 text-kt-signpost">{note}</p>}
  </div>
}

export function switchClass(selected: boolean): string {
  return `inline-flex min-h-11 items-center rounded-control border px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-kt-teal ${selected ? 'border-kt-teal bg-kt-teal text-white' : 'border-kt-ink/15 bg-white text-kt-secondary hover:border-kt-teal'}`
}
