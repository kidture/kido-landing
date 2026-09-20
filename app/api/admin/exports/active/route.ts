import { NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin/guard'
import { createActiveTesterCsvResponse } from '@/lib/admin/requests'
import { listBetaRequests } from '@/lib/admin/sheets'

export async function GET() {
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    return createActiveTesterCsvResponse(await listBetaRequests())
  } catch (error) {
    console.error('[admin export] Unable to export active testers:', error)
    return NextResponse.json({ error: 'We could not create the tester CSV.' }, { status: 500 })
  }
}
