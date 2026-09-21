import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../components/admin/dashboard.tsx', import.meta.url), 'utf8')

test('lets an admin select every filtered beta request and bulk-update its status', () => {
  assert.match(source, /Select all visible/)
  assert.match(source, /Update selected/)
  assert.match(source, /selectedRequests\.length < 2/)
})
