import { NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin/guard'
import { listBetaRequests } from '@/lib/admin/sheets'

export async function GET() {
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    return NextResponse.json({ requests: await listBetaRequests() })
  } catch (error) {
    console.error('[admin requests] Unable to load beta requests:', error)
    return NextResponse.json({ error: 'We could not load beta requests.' }, { status: 500 })
  }
}
