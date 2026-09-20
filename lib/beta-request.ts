const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type BetaRequest = {
  email: string
}

export function parseBetaRequest(input: unknown): BetaRequest | null {
  if (typeof input !== 'object' || input === null || !('email' in input)) {
    return null
  }

  const email = String(input.email).trim().toLowerCase()
  return EMAIL_REGEX.test(email) ? { email } : null
}
