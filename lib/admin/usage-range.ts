export type UsageWindow = '7' | '30' | '90' | 'custom'
export type UsageRange = { window: UsageWindow; start: string; end: string }

function utcDay(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const parsed = new Date(`${value}T00:00:00.000Z`)
  return Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value ? null : parsed
}

export function parseUsageRange(params: { window?: unknown; start?: unknown; end?: unknown }, now = new Date()): UsageRange {
  const today = now.toISOString().slice(0, 10)
  const window = params.window
  if (window === 'custom' && typeof params.start === 'string' && typeof params.end === 'string') {
    const startDate = utcDay(params.start)
    const endDate = utcDay(params.end)
    if (startDate && endDate && startDate <= endDate && endDate <= utcDay(today)! &&
        (endDate.valueOf() - startDate.valueOf()) / 86_400_000 <= 365) {
      return { window: 'custom', start: params.start, end: params.end }
    }
  }
  const days = window === '7' ? 7 : window === '90' ? 90 : 30
  const start = new Date(now)
  start.setUTCHours(0, 0, 0, 0)
  start.setUTCDate(start.getUTCDate() - days + 1)
  return { window: String(days) as UsageWindow, start: start.toISOString().slice(0, 10), end: today }
}
