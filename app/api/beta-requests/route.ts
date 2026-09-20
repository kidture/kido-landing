import { NextRequest, NextResponse } from 'next/server'
import { parseBetaRequest } from '@/lib/beta-request'
import { saveBetaRequest } from '@/lib/sheets'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const request = parseBetaRequest(body)
  if (!request) {
    return NextResponse.json({ error: 'Enter a valid email address' }, { status: 400 })
  }

  try {
    await saveBetaRequest(request.email)
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error('[beta-requests] Unable to save request:', error)
    return NextResponse.json({ error: 'We could not save your request. Please try again.' }, { status: 500 })
  }
}
