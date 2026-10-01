import Dashboard from '@/components/admin/dashboard'
import { requireAdmin } from '@/lib/admin/guard'
import { listBetaRequests } from '@/lib/admin/sheets'
import { parseStatusFilter } from '@/lib/admin/requests'

export const metadata = { title: 'Android requests · Kidture' }

export default async function AndroidRequestsPage({ searchParams }: {
  searchParams: Promise<{ status?: string | string[] }>
}) {
  const status = parseStatusFilter((await searchParams).status)
  await requireAdmin(status === 'all' ? '/admin/android-requests' : `/admin/android-requests?status=${status}`)
  let requests
  try {
    requests = await listBetaRequests()
  } catch {
    return (
      <section className="rounded-card border border-kt-coral/40 bg-kt-cream p-8 shadow-soft">
        <p className="text-sm font-semibold text-kt-coral">Android requests</p>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em]">The request list is not connected yet.</h1>
        <p className="mt-4 leading-7 text-kt-secondary">Check the private Sheet gateway settings, then reload this page.</p>
      </section>
    )
  }
  return <Dashboard initialRequests={requests} />
}
