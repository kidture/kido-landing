import type { UsageRange } from './usage-range'

export const USAGE_SECTIONS = {
  overview: { path: '/admin/app-usage', label: 'Overview' },
  value: { path: '/admin/app-usage/value', label: 'Where value happens' },
  activity: { path: '/admin/app-usage/activity', label: 'Activity' },
  retention: { path: '/admin/app-usage/retention', label: 'Coming back' },
  timing: { path: '/admin/app-usage/timing', label: 'Local time' },
} as const

export type UsageSection = keyof typeof USAGE_SECTIONS

export function usageHref(section: UsageSection, range: UsageRange): string {
  const query = new URLSearchParams({ window: range.window })
  if (range.window === 'custom') {
    query.set('start', range.start)
    query.set('end', range.end)
  }
  return `${USAGE_SECTIONS[section].path}?${query}`
}
