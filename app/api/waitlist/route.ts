import { NextRequest, NextResponse } from 'next/server'
import { saveEmail } from '@/lib/sheets'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email =
    typeof body === 'object' && body !== null && 'email' in body
      ? String((body as { email: unknown }).email).trim().toLowerCase()
      : ''

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  try {
    await saveEmail(email)
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[waitlist] Sheets error:', err)
    return NextResponse.json({ error: 'Failed to save email' }, { status: 500 })
  }
}
