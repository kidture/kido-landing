import {
  type BetaRequest,
  isValidRequestUpdate,
  parseBetaRequestRow,
  type RequestUpdate,
} from '@/lib/admin/requests'

type SheetResponse = {
  ok?: unknown
  error?: unknown
  request?: unknown
  requests?: unknown
}

function getRequiredEnv(name: 'BETA_ADMIN_WEBHOOK_URL' | 'BETA_ADMIN_WEBHOOK_TOKEN'): string {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing ${name} environment variable`)
  return value
}

async function callAdminSheet<T>(action: string, values: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(getRequiredEnv('BETA_ADMIN_WEBHOOK_URL'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'admin',
      token: getRequiredEnv('BETA_ADMIN_WEBHOOK_TOKEN'),
      action,
      ...values,
    }),
    cache: 'no-store',
  })

  if (!response.ok) throw new Error(`Beta admin sheet request failed with ${response.status}`)

  let body: SheetResponse
  try {
    body = (await response.json()) as SheetResponse
  } catch {
    throw new Error('Beta admin sheet returned an invalid response')
  }

  if (body.ok !== true) {
    throw new Error(typeof body.error === 'string' ? body.error : 'Beta admin sheet request was rejected')
  }

  return body as T
}

function parseSingleRequest(value: unknown): BetaRequest {
  const request = parseBetaRequestRow(value)
  if (!request) throw new Error('Beta admin sheet returned an invalid request row')
  return request
}

export async function listBetaRequests(): Promise<BetaRequest[]> {
  const body = await callAdminSheet<{ requests?: unknown }>('listRequests')
  if (!Array.isArray(body.requests)) throw new Error('Beta admin sheet did not return a request list')

  return body.requests
    .map(parseBetaRequestRow)
    .filter((request): request is BetaRequest => request !== null)
    .sort((left, right) => right.submittedAt.localeCompare(left.submittedAt))
}

export async function updateBetaRequest(id: string, update: RequestUpdate): Promise<BetaRequest> {
  if (!id.trim() || !isValidRequestUpdate(update)) throw new Error('Invalid beta request update')
  const body = await callAdminSheet<{ request?: unknown }>('updateRequest', { id, update })
  return parseSingleRequest(body.request)
}

export async function recordInvitation(id: string): Promise<BetaRequest> {
  if (!id.trim()) throw new Error('Invalid beta request ID')
  const body = await callAdminSheet<{ request?: unknown }>('recordInvitation', { id })
  return parseSingleRequest(body.request)
}
