import { renderUsagePage } from '@/components/admin/usage-page'

export const metadata = { title: 'Where value happens · Kidture' }

export default function ValuePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return renderUsagePage('value', searchParams)
}
