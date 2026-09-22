import Dashboard from '@/components/admin/dashboard'
import { requireAdmin } from '@/lib/admin/guard'
import { listBetaRequests } from '@/lib/admin/sheets'
import { parseStatusFilter } from '@/lib/admin/requests'

async function loadRequests() {
  try {
    return { requests: await listBetaRequests(), loadError: false }
  } catch (error) {
    console.error('[admin page] Unable to load beta requests:', error)
    return { requests: [], loadError: true }
  }
}

export const metadata = { title: 'Kidture beta administration' }

export default async function AdminPage({ searchParams }: {
  searchParams: Promise<{ status?: string | string[] }>
}) {
  const status = parseStatusFilter((await searchParams).status)
  await requireAdmin(status)
  const { requests, loadError } = await loadRequests()

  if (loadError) {
    return (
      <main className="min-h-screen bg-kt-canvas px-5 py-5 text-kt-ink sm:px-8 sm:py-8">
        <section className="mx-auto max-w-2xl rounded-card border border-kt-coral/40 bg-kt-cream p-8 shadow-soft">
          <p className="text-sm font-semibold text-kt-coral">Beta administration</p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em]">The request list is not connected yet.</h1>
          <p className="mt-4 leading-7 text-kt-secondary">Check the private Sheet gateway settings in Vercel, then reload this page. No tester information is shown until the connection succeeds.</p>
        </section>
      </main>
    )
  }

  return <Dashboard initialRequests={requests} />
}
