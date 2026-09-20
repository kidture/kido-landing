import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin/guard'
import { isValidRequestUpdate } from '@/lib/admin/requests'
import { updateBetaRequest } from '@/lib/admin/sheets'

type Context = { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, context: Context) {
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Enter a valid status and note.' }, { status: 400 })
  }

  if (!isValidRequestUpdate(body)) {
    return NextResponse.json({ error: 'Enter a valid status and note.' }, { status: 400 })
  }

  const { id } = await context.params
  try {
    return NextResponse.json({ request: await updateBetaRequest(id, body) })
  } catch (error) {
    console.error('[admin requests] Unable to update beta request:', error)
    return NextResponse.json({ error: 'We could not save this request.' }, { status: 500 })
  }
}
