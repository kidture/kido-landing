import assert from 'node:assert/strict'
import test from 'node:test'

import { parseBetaRequest } from '../lib/beta-request.ts'

test('accepts and normalizes a Google Play account email', () => {
  assert.deepEqual(parseBetaRequest({ email: '  Parent.Name@Example.COM ' }), {
    email: 'parent.name@example.com',
  })
})

test('rejects a malformed Android beta email request', () => {
  assert.equal(parseBetaRequest({ email: 'not-an-email' }), null)
})

test('rejects a beta request without an email', () => {
  assert.equal(parseBetaRequest({}), null)
})
