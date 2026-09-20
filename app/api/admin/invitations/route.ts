import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin/guard'
import { canInvite } from '@/lib/admin/requests'
import { sendAndroidInvitation } from '@/lib/admin/invitation-email'
import { listBetaRequests, recordInvitation } from '@/lib/admin/sheets'

type InvitationResult = {
  id: string
  email: string
  ok: boolean
  error?: string
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Choose at least one tester.' }, { status: 400 })
  }

  const ids =
    typeof body === 'object' && body !== null && 'ids' in body && Array.isArray(body.ids)
      ? [...new Set(body.ids.filter((id): id is string => typeof id === 'string' && id.trim().length > 0))]
      : []

  if (ids.length === 0) {
    return NextResponse.json({ error: 'Choose at least one tester.' }, { status: 400 })
  }

  try {
    const requests = await listBetaRequests()
    const selected = ids.map((id) => requests.find((item) => item.id === id)).filter(Boolean)
    const results: InvitationResult[] = []

    for (const item of selected) {
      if (!item || !canInvite(item)) {
        results.push({ id: item?.id ?? '', email: item?.email ?? '', ok: false, error: 'Grant Play access before sending an invitation.' })
        continue
      }

      try {
        await sendAndroidInvitation(item.email)
        await recordInvitation(item.id)
        results.push({ id: item.id, email: item.email, ok: true })
      } catch (error) {
        console.error('[admin invitations] Unable to invite beta tester:', error)
        results.push({ id: item.id, email: item.email, ok: false, error: 'Email could not be sent.' })
      }
    }

    return NextResponse.json({ results })
  } catch (error) {
    console.error('[admin invitations] Unable to prepare beta invitations:', error)
    return NextResponse.json({ error: 'We could not prepare invitations.' }, { status: 500 })
  }
}
