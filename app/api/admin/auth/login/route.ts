import { NextRequest, NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSession,
  validateAdminCredentials,
} from '@/lib/admin/auth'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Enter your email and password.' }, { status: 400 })
  }

  const email = typeof body === 'object' && body !== null && 'email' in body ? String(body.email) : ''
  const password = typeof body === 'object' && body !== null && 'password' in body ? String(body.password) : ''

  if (!validateAdminCredentials(email, password)) {
    return NextResponse.json({ error: 'That email or password is not correct.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: await createAdminSession(),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE,
  })
  return response
}
