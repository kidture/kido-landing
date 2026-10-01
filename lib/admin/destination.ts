const REQUEST_STATUSES = new Set(['requested', 'play_access_pending', 'play_access_granted', 'invited', 'removed'])
const USAGE_PATHS = new Set([
  '/admin/app-usage', '/admin/app-usage/value', '/admin/app-usage/activity',
  '/admin/app-usage/retention', '/admin/app-usage/timing',
])

/** One allowlisted admin path, with only approved view filters retained. */
export function safeAdminDestination(value: unknown): string {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return '/admin/app-usage'
  let url: URL
  try {
    url = new URL(value, 'https://kidture.health')
  } catch {
    return '/admin/app-usage'
  }
  if (url.origin !== 'https://kidture.health') return '/admin/app-usage'
  if (url.pathname === '/admin/android-requests') {
    const status = url.searchParams.get('status')
    return status && REQUEST_STATUSES.has(status) ? `/admin/android-requests?status=${status}` : '/admin/android-requests'
  }
  if (USAGE_PATHS.has(url.pathname)) {
    const window = url.searchParams.get('window')
    if (window === '7' || window === '30' || window === '90') return `${url.pathname}?window=${window}`
    const start = url.searchParams.get('start')
    const end = url.searchParams.get('end')
    if (window === 'custom' && start && end && /^\d{4}-\d{2}-\d{2}$/.test(start) && /^\d{4}-\d{2}-\d{2}$/.test(end)) {
      return `${url.pathname}?window=custom&start=${start}&end=${end}`
    }
    return url.pathname
  }
  return '/admin/app-usage'
}
