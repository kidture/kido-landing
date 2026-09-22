import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildActiveTesterCsv,
  canInvite,
  createActiveTesterCsvResponse,
  parseBetaRequestRow,
  type BetaRequest,
} from '../lib/admin/requests.ts'
import * as requests from '../lib/admin/requests.ts'

test('accepts each shareable status filter and falls back to all for invalid queries', () => {
  for (const status of ['requested', 'play_access_pending', 'play_access_granted', 'invited', 'removed']) {
    assert.equal(requests.parseStatusFilter(status), status)
  }
  for (const value of [undefined, null, '', 'all', 'unknown', ['requested', 'invited']]) {
    assert.equal(requests.parseStatusFilter(value), 'all')
  }
})

function request(overrides: Partial<BetaRequest> = {}): BetaRequest {
  return {
    id: '2',
    submittedAt: '2026-09-20T10:00:00.000Z',
    email: 'parent@example.com',
    status: 'requested',
    playAccessGrantedAt: '',
    invitationEmailedAt: '',
    notes: '',
    ...overrides,
  }
}

test('exports one normalized active address per line and excludes removed requests', () => {
  const csv = buildActiveTesterCsv([
    request({ email: 'Parent@Example.com', status: 'play_access_pending' }),
    request({ id: '3', email: 'parent@example.com', status: 'invited' }),
    request({ id: '4', email: 'removed@example.com', status: 'removed' }),
  ])

  assert.equal(csv, 'parent@example.com\n')
})

test('only Play-approved requests are invitation eligible', () => {
  assert.equal(canInvite(request({ status: 'requested' })), false)
  assert.equal(canInvite(request({ status: 'play_access_pending' })), false)
  assert.equal(canInvite(request({ status: 'play_access_granted' })), true)
  assert.equal(canInvite(request({ status: 'invited' })), true)
})

test('parses only complete Sheet response rows', () => {
  assert.deepEqual(
    parseBetaRequestRow({
      id: '12',
      submittedAt: '2026-09-20T10:00:00.000Z',
      email: 'Parent@Example.com',
      status: 'play_access_granted',
      playAccessGrantedAt: '2026-09-20T11:00:00.000Z',
      invitationEmailedAt: '',
      notes: 'Confirmed in Play',
    }),
    request({
      id: '12',
      email: 'parent@example.com',
      status: 'play_access_granted',
      playAccessGrantedAt: '2026-09-20T11:00:00.000Z',
      notes: 'Confirmed in Play',
    })
  )
  assert.equal(parseBetaRequestRow({ id: '12', email: 'not-an-email' }), null)
})

test('builds an attachment response for all active tester emails', () => {
  const response = createActiveTesterCsvResponse([request({ status: 'invited' })])

  assert.equal(response.headers.get('content-type'), 'text/csv; charset=utf-8')
  assert.match(response.headers.get('content-disposition') ?? '', /kidture-android-beta-testers\.csv/)
})
