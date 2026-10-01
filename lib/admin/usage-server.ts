import 'server-only'
import type { UsageSection } from '@/lib/admin/usage-navigation'

export type Count = { actions: number; households: number }
export type UsageReport = {
  version: 'usage_metrics_v1'
  generated_at: string
  range: { start: string; end: string }
  overview: {
    eligible_households: number
    saved_activity_today: number
    saved_activity_yesterday: number
    saved_activity_this_week: number
    actions_this_week: number
    active_households: number
    total_actions: number
    actions_per_active_household: number
  }
  actions: Record<string, Count>
  subjects: Record<string, Count>
  methods: Record<string, Count>
  wellness_checkins: Count
  schedule_event_kinds: Record<string, Count>
  device_state: { households: number; providers: Record<string, number> }
  series: { daily: Array<Count & { date: string }>; weekly: Array<Count & { week_start: string }> }
  cohorts: Array<{ signup_week: string; households: number; weeks: Array<{ week: number; eligible: number; returned: number; rate: number | null; actions: number }> }>
  account_age: Record<string, { eligible_households: number; today: Count; yesterday: Count; this_week: Count; selected_period: Count }>
  local_hours: Array<Count & { hour: number }>
  coverage: {
    saved_actions_only: boolean
    no_visit_or_duration_tracking: boolean
    current_timezone_applied_to_history: boolean
    mutable_source_history: boolean
    timezone_fallback_households: number
    clinician_reports_before: string
    clinician_history_complete: boolean
    device_connection_is_current_state: boolean
  }
}

type BaseResponse = Pick<UsageReport, 'version' | 'generated_at' | 'range' | 'coverage'>
type SectionPayloads = {
  overview: Pick<UsageReport, 'overview'>
  value: Pick<UsageReport, 'actions' | 'subjects' | 'methods' | 'wellness_checkins' | 'schedule_event_kinds' | 'device_state'>
  activity: Pick<UsageReport, 'series'>
  retention: Pick<UsageReport, 'cohorts' | 'account_age'>
  timing: Pick<UsageReport, 'local_hours'>
}
export type UsageSectionResponse = {
  [S in UsageSection]: BaseResponse & { section: S } & SectionPayloads[S]
}[UsageSection]

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isCount(value: unknown): value is Count {
  return record(value) && typeof value.actions === 'number' && typeof value.households === 'number'
}

function isSectionResponse(value: unknown, section: UsageSection): value is UsageSectionResponse {
  if (!record(value) || value.section !== section || value.version !== 'usage_metrics_v1' ||
      typeof value.generated_at !== 'string' || !record(value.range) || !record(value.coverage)) return false
  if (section === 'overview') return record(value.overview) && typeof value.overview.eligible_households === 'number'
  if (section === 'value') return record(value.actions) && record(value.subjects) && record(value.methods) &&
    isCount(value.wellness_checkins) && record(value.device_state)
  if (section === 'activity') return record(value.series) && Array.isArray(value.series.daily) && Array.isArray(value.series.weekly)
  if (section === 'retention') return Array.isArray(value.cohorts) && record(value.account_age)
  return Array.isArray(value.local_hours) && value.local_hours.length === 24
}

export async function loadUsageSection(section: UsageSection, start: string, end: string): Promise<UsageSectionResponse | null> {
  const baseUrl = process.env.KIDO_BACKEND_URL?.trim()
  const key = process.env.KIDO_ANALYTICS_API_KEY?.trim()
  if (!baseUrl || !key) return null
  try {
    const url = new URL(`/api/v1/internal/usage-analytics/${section}`, baseUrl)
    if (!['http:', 'https:'].includes(url.protocol)) return null
    url.searchParams.set('start', start)
    url.searchParams.set('end', end)
    const response = await fetch(url, { headers: { 'X-Analytics-Key': key }, cache: 'no-store', signal: AbortSignal.timeout(15_000) })
    if (!response.ok) return null
    const body: unknown = await response.json()
    return isSectionResponse(body, section) ? body : null
  } catch {
    return null
  }
}
