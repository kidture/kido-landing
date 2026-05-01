import { NextRequest, NextResponse } from 'next/server'
import { saveEmail } from '@/lib/sheets'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SUPPORTED_COUNTRIES = new Set(['US', 'UK'])

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
  const countryRaw =
    typeof body === 'object' && body !== null && 'country' in body
      ? String((body as { country: unknown }).country).trim().toUpperCase()
      : ''

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }
  if (!SUPPORTED_COUNTRIES.has(countryRaw)) {
    return NextResponse.json({ error: 'Country must be US or UK' }, { status: 400 })
  }

  try {
    await saveEmail(email, countryRaw as 'US' | 'UK')
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[waitlist] Sheets error:', err)
    return NextResponse.json({ error: 'Failed to save email' }, { status: 500 })
  }
}
