import { renderUsagePage } from '@/components/admin/usage-page'

export const metadata = { title: 'Coming back · Kidture' }

export default function RetentionPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return renderUsagePage('retention', searchParams)
}
