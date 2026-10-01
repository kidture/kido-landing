import { redirect } from 'next/navigation'
import LoginForm from '@/components/admin/login-form'
import { isAuthenticatedAdmin } from '@/lib/admin/guard'
import { safeAdminDestination } from '@/lib/admin/destination'
import { parseStatusFilter } from '@/lib/admin/requests'

export const metadata = { title: 'Kidture administration' }

export default async function AdminPage({ searchParams }: {
  searchParams: Promise<{ next?: string | string[]; status?: string | string[] }>
}) {
  const params = await searchParams
  const status = parseStatusFilter(params.status)
  if (typeof params.status === 'string') {
    redirect(status === 'all' ? '/admin/android-requests' : `/admin/android-requests?status=${status}`)
  }
  const destination = safeAdminDestination(params.next)
  if (await isAuthenticatedAdmin()) redirect(destination)

  return (
    <main className="min-h-screen bg-kt-canvas px-5 py-5 text-kt-ink sm:px-8 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-lg flex-col justify-center rounded-[24px] border border-kt-ink/10 bg-kt-cream px-6 py-12 shadow-soft sm:min-h-[calc(100vh-4rem)] sm:px-10">
        <p className="text-lg font-bold tracking-[-0.04em]">Kidture</p>
        <p className="mt-10 text-sm font-semibold text-kt-olive-teal">Private workspace</p>
        <h1 className="mt-3 text-4xl font-bold tracking-[-0.05em]">Administration</h1>
        <p className="mt-4 text-base leading-7 text-kt-secondary">Sign in to view aggregate app usage and manage Android beta access.</p>
        <LoginForm destination={destination} />
      </div>
    </main>
  )
}
