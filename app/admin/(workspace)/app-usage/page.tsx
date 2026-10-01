import { renderUsagePage } from '@/components/admin/usage-page'

export const metadata = { title: 'App usage · Kidture' }

export default async function AppUsagePage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  return renderUsagePage('overview', searchParams)
}
