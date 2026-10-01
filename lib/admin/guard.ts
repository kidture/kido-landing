import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_SESSION_COOKIE, hasValidAdminSession } from '@/lib/admin/auth'
import { safeAdminDestination } from '@/lib/admin/destination'

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies()
  return hasValidAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)
}

export async function requireAdmin(destination = '/admin/app-usage'): Promise<void> {
  if (!(await isAuthenticatedAdmin())) {
    redirect(`/admin?next=${encodeURIComponent(safeAdminDestination(destination))}`)
  }
}
