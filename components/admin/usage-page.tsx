import 'server-only'

import UsageFrame from '@/components/admin/usage-frame'
import UsageOverview from '@/components/admin/usage-overview'
import UsageValue from '@/components/admin/usage-value'
import UsageActivity from '@/components/admin/usage-activity'
import UsageRetention from '@/components/admin/usage-retention'
import UsageTiming from '@/components/admin/usage-timing'
import { requireAdmin } from '@/lib/admin/guard'
import { safeAdminDestination } from '@/lib/admin/destination'
import { USAGE_SECTIONS, type UsageSection } from '@/lib/admin/usage-navigation'
import { parseUsageRange } from '@/lib/admin/usage-range'
import { loadUsageSection, type UsageSectionResponse } from '@/lib/admin/usage-server'

type Params = Promise<Record<string, string | string[] | undefined>>

function sectionView(report: UsageSectionResponse) {
  switch (report.section) {
    case 'overview': return <UsageOverview overview={report.overview} />
    case 'value': return <UsageValue actions={report.actions} subjects={report.subjects} methods={report.methods}
      wellness_checkins={report.wellness_checkins} device_state={report.device_state} />
    case 'activity': return <UsageActivity series={report.series} />
    case 'retention': return <UsageRetention cohorts={report.cohorts} account_age={report.account_age} />
    case 'timing': return <UsageTiming local_hours={report.local_hours} />
  }
}

export async function renderUsagePage(section: UsageSection, searchParams: Params) {
  const params = await searchParams
  const requested = new URLSearchParams()
  for (const key of ['window', 'start', 'end']) {
    if (typeof params[key] === 'string') requested.set(key, params[key])
  }
  const path = USAGE_SECTIONS[section].path
  await requireAdmin(safeAdminDestination(`${path}${requested.size ? `?${requested}` : ''}`))
  const range = parseUsageRange(params)
  const report = await loadUsageSection(section, range.start, range.end)
  return <UsageFrame section={section} range={range} generatedAt={report?.generated_at} version={report?.version} coverage={report?.coverage}>
    {report && sectionView(report)}
  </UsageFrame>
}
