export const BETA_REQUEST_STATUSES = [
  'requested',
  'play_access_pending',
  'play_access_granted',
  'invited',
  'removed',
] as const

export type BetaRequestStatus = (typeof BETA_REQUEST_STATUSES)[number]

export type BetaRequest = {
  id: string
  submittedAt: string
  email: string
  status: BetaRequestStatus
  playAccessGrantedAt: string
  invitationEmailedAt: string
  notes: string
}

export type RequestUpdate = Pick<BetaRequest, 'status' | 'notes'>

const ACTIVE_STATUSES = new Set<BetaRequestStatus>([
  'play_access_pending',
  'play_access_granted',
  'invited',
])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function normalizeEmail(value: string): string | null {
  const email = value.trim().toLowerCase()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null
}

function isStatus(value: unknown): value is BetaRequestStatus {
  return isString(value) && BETA_REQUEST_STATUSES.includes(value as BetaRequestStatus)
}

export function parseStatusFilter(value: unknown): 'all' | BetaRequestStatus {
  return isStatus(value) ? value : 'all'
}

export function parseBetaRequestRow(value: unknown): BetaRequest | null {
  if (!isRecord(value)) return null

  const id = isString(value.id) ? value.id.trim() : ''
  const submittedAt = isString(value.submittedAt) ? value.submittedAt.trim() : ''
  const email = isString(value.email) ? normalizeEmail(value.email) : null
  const status = value.status

  if (!id || !submittedAt || !email || !isStatus(status)) return null

  return {
    id,
    submittedAt,
    email,
    status,
    playAccessGrantedAt: isString(value.playAccessGrantedAt) ? value.playAccessGrantedAt.trim() : '',
    invitationEmailedAt: isString(value.invitationEmailedAt) ? value.invitationEmailedAt.trim() : '',
    notes: isString(value.notes) ? value.notes.trim() : '',
  }
}

export function isValidRequestUpdate(value: unknown): value is RequestUpdate {
  return (
    isRecord(value) &&
    isStatus(value.status) &&
    isString(value.notes) &&
    value.notes.trim().length <= 2_000
  )
}

export function canInvite(request: BetaRequest): boolean {
  return request.status === 'play_access_granted' || request.status === 'invited'
}

export function buildActiveTesterCsv(requests: BetaRequest[]): string {
  const emails = new Set(
    requests
      .filter((request) => ACTIVE_STATUSES.has(request.status))
      .map((request) => request.email.trim().toLowerCase())
  )

  return [...emails]
    .sort((left, right) => left.localeCompare(right))
    .map((email) => `${email}\n`)
    .join('')
}

export function createActiveTesterCsvResponse(requests: BetaRequest[]): Response {
  return new Response(buildActiveTesterCsv(requests), {
    headers: {
      'Content-Disposition': 'attachment; filename="kidture-android-beta-testers.csv"',
      'Content-Type': 'text/csv; charset=utf-8',
    },
  })
}
