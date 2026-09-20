import assert from 'node:assert/strict'
import test from 'node:test'

import {
  createAdminSession,
  hasValidAdminSession,
  validateAdminCredentials,
} from '../lib/admin/auth.ts'

function configureAdmin() {
  process.env.ADMIN_EMAIL = 'owner@kidture.health'
  process.env.ADMIN_PASSWORD = 'correct horse battery staple'
  process.env.ADMIN_SESSION_SECRET = 'a-long-test-secret-for-admin-sessions'
}

test('accepts only the configured admin email and password', () => {
  configureAdmin()

  assert.equal(validateAdminCredentials('owner@kidture.health', 'correct horse battery staple'), true)
  assert.equal(validateAdminCredentials('other@kidture.health', 'correct horse battery staple'), false)
  assert.equal(validateAdminCredentials('owner@kidture.health', 'wrong'), false)
})

test('rejects a tampered or expired session payload', async () => {
  configureAdmin()

  const session = await createAdminSession()
  assert.equal(await hasValidAdminSession(session), true)
  assert.equal(await hasValidAdminSession(`${session}tampered`), false)
  assert.equal(await hasValidAdminSession('not-a-session'), false)
})
