import { redirect } from 'next/navigation'
import { safeAdminDestination } from '@/lib/admin/destination'
import { parseStatusFilter } from '@/lib/admin/requests'

export default async function LegacyAdminLogin({ searchParams }: {
  searchParams: Promise<{ next?: string | string[]; status?: string | string[] }>
}) {
  const params = await searchParams
  const status = parseStatusFilter(params.status)
  const destination = typeof params.status === 'string'
    ? status === 'all' ? '/admin/android-requests' : `/admin/android-requests?status=${status}`
    : safeAdminDestination(params.next)
  redirect(`/admin?next=${encodeURIComponent(destination)}`)
}
