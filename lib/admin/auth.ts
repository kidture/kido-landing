import { timingSafeEqual } from 'node:crypto'

const SESSION_LIFETIME_SECONDS = 60 * 60 * 24 * 7

type SessionPayload = {
  expiresAt: number
}

function getRequiredEnv(name: 'ADMIN_EMAIL' | 'ADMIN_PASSWORD' | 'ADMIN_SESSION_SECRET'): string {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing ${name} environment variable`)
  return value
}

function toBase64Url(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url')
}

function fromBase64Url(value: string): string | null {
  try {
    return Buffer.from(value, 'base64url').toString('utf8')
  } catch {
    return null
  }
}

async function sign(value: string): Promise<string> {
  const secret = getRequiredEnv('ADMIN_SESSION_SECRET')
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))
  return Buffer.from(signature).toString('base64url')
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

export function validateAdminCredentials(email: string, password: string): boolean {
  try {
    return (
      safeEqual(email.trim().toLowerCase(), getRequiredEnv('ADMIN_EMAIL').toLowerCase()) &&
      safeEqual(password, getRequiredEnv('ADMIN_PASSWORD'))
    )
  } catch {
    return false
  }
}

export async function createAdminSession(now = Date.now()): Promise<string> {
  const payload = toBase64Url(JSON.stringify({ expiresAt: now + SESSION_LIFETIME_SECONDS * 1_000 } satisfies SessionPayload))
  const signature = await sign(payload)
  return `${payload}.${signature}`
}

export async function hasValidAdminSession(value: string | undefined, now = Date.now()): Promise<boolean> {
  if (!value) return false

  const [payload, signature, extra] = value.split('.')
  if (!payload || !signature || extra) return false

  try {
    const expectedSignature = await sign(payload)
    if (!safeEqual(signature, expectedSignature)) return false

    const decoded = fromBase64Url(payload)
    if (!decoded) return false
    const session = JSON.parse(decoded) as Partial<SessionPayload>
    return typeof session.expiresAt === 'number' && session.expiresAt > now
  } catch {
    return false
  }
}

export const ADMIN_SESSION_COOKIE = 'kidture_admin'
export const ADMIN_SESSION_MAX_AGE = SESSION_LIFETIME_SECONDS
