import { renderUsagePage } from '@/components/admin/usage-page'

export const metadata = { title: 'Local time · Kidture' }

export default function TimingPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return renderUsagePage('timing', searchParams)
}
