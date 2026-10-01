import Link from 'next/link'
import { USAGE_SECTIONS, usageHref, type UsageSection } from '@/lib/admin/usage-navigation'
import type { UsageRange } from '@/lib/admin/usage-range'
import type { UsageReport } from '@/lib/admin/usage-server'
import { number, switchClass } from '@/components/admin/usage-primitives'

type Props = {
  section: UsageSection
  range: UsageRange
  generatedAt?: string
  version?: string
  coverage?: UsageReport['coverage']
  children?: React.ReactNode
}

export default function UsageFrame({ section, range, generatedAt, version, coverage, children }: Props) {
  const path = USAGE_SECTIONS[section].path
  return <div className="space-y-7">
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-kt-olive-teal">Internal · read only</p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">App usage</h1>
        <p className="mt-2 text-sm leading-6 text-kt-secondary">Aggregate saved activity across active households.</p>
      </div>
      {generatedAt && <p className="text-xs text-kt-signpost">Generated {generatedAt.replace('T', ' ').replace('Z', ' UTC').slice(0, 23)} · {version}</p>}
    </header>

    <nav aria-label="App usage views" className="flex flex-wrap gap-2 rounded-card border border-kt-ink/10 bg-kt-cream p-2 shadow-soft">
      {(Object.entries(USAGE_SECTIONS) as Array<[UsageSection, { path: string; label: string }]>).map(([key, item]) =>
        <Link key={key} href={usageHref(key, range)} prefetch={false} aria-current={section === key ? 'page' : undefined}
          className={switchClass(section === key)}>{item.label}</Link>)}
    </nav>

    <section aria-label="Date range" className="rounded-card border border-kt-ink/10 bg-kt-cream p-4 shadow-soft">
      <div className="flex flex-wrap gap-2">
        {(['7', '30', '90'] as const).map((window) => <Link key={window} href={usageHref(section, { ...range, window })} prefetch={false}
          aria-current={range.window === window ? 'true' : undefined} className={switchClass(range.window === window)}>Last {window} days</Link>)}
      </div>
      <form method="get" action={path} className="mt-3 flex flex-wrap items-end gap-2">
        <input type="hidden" name="window" value="custom" />
        <label className="text-xs font-semibold text-kt-secondary">From<input name="start" type="date" defaultValue={range.start} required className="mt-1 block min-h-11 rounded-control border border-kt-ink/20 bg-white px-3 text-sm text-kt-ink" /></label>
        <label className="text-xs font-semibold text-kt-secondary">Through<input name="end" type="date" defaultValue={range.end} required className="mt-1 block min-h-11 rounded-control border border-kt-ink/20 bg-white px-3 text-sm text-kt-ink" /></label>
        <button type="submit" className={switchClass(range.window === 'custom')}>Apply range</button>
      </form>
      <p className="mt-3 text-xs text-kt-signpost">Selected local dates: {range.start} through {range.end}.</p>
    </section>

    {!generatedAt ? <section role="alert" className="rounded-card border border-kt-coral/40 bg-kt-cream p-7 shadow-soft">
      <h2 className="text-xl font-bold">Usage data is not connected</h2>
      <p className="mt-2 text-sm leading-6 text-kt-secondary">The live aggregate report could not be loaded. Check the private backend connection, then reload this view.</p>
      <Link href={usageHref(section, range)} prefetch={false} className="mt-4 inline-flex min-h-11 items-center rounded-control bg-kt-teal px-5 text-sm font-semibold text-white">Retry</Link>
    </section> : children}

    {coverage && <details className="rounded-card border border-kt-ink/10 bg-kt-cream p-5 text-sm text-kt-secondary shadow-soft">
      <summary className="cursor-pointer font-semibold text-kt-ink">How these numbers are counted</summary>
      <div className="mt-3 space-y-2 leading-6">
        <p>Only saved caregiver actions from currently active households count. Today and this week are partial periods. A connected wellness device is current state, not activity.</p>
        <p>Calendar dates and hours use each user’s current timezone. If it is missing or invalid, UTC is used ({number(coverage.timezone_fallback_households)} active households). Repeated daylight-saving hours share a bucket. A timezone change can shift historical buckets.</p>
        <p>Clinician report history before {coverage.clinician_reports_before} is unavailable, not zero. Deleted moments and schedules can change historical totals.</p>
        <p>These records do not measure literal app opens, page visits, or time spent. Cohorts use full account-age weeks; incomplete weeks have no return rate.</p>
      </div>
    </details>}
  </div>
}
