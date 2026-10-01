import { renderUsagePage } from '@/components/admin/usage-page'

export const metadata = { title: 'Activity · Kidture' }

export default function ActivityPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return renderUsagePage('activity', searchParams)
}
