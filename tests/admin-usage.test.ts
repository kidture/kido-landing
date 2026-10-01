import assert from 'node:assert/strict'
import test from 'node:test'

import { safeAdminDestination } from '../lib/admin/destination.ts'
import { parseUsageRange } from '../lib/admin/usage-range.ts'
import { usageHref } from '../lib/admin/usage-navigation.ts'

test('admin return destinations permit only the two internal pages and known filters', () => {
  assert.equal(safeAdminDestination('/admin/android-requests?status=invited'), '/admin/android-requests?status=invited')
  assert.equal(safeAdminDestination('/admin/app-usage?window=90'), '/admin/app-usage?window=90')
  assert.equal(safeAdminDestination('//outside.example/admin'), '/admin/app-usage')
  assert.equal(safeAdminDestination('/admin/android-requests?status=bad'), '/admin/android-requests')
  assert.equal(safeAdminDestination('/admin/app-usage?next=https://evil.example'), '/admin/app-usage')
})

test('usage section deep links return to the requested view after sign-in', () => {
  for (const section of ['value', 'activity', 'retention', 'timing']) {
    assert.equal(
      safeAdminDestination(`/admin/app-usage/${section}?window=custom&start=2026-09-10&end=2026-09-20`),
      `/admin/app-usage/${section}?window=custom&start=2026-09-10&end=2026-09-20`
    )
  }
  assert.equal(safeAdminDestination('/admin/app-usage/private?window=30'), '/admin/app-usage')
})

test('usage window dates are inclusive and malformed custom dates reset to last 30', () => {
  const now = new Date('2026-09-30T12:00:00.000Z')
  assert.deepEqual(parseUsageRange({}, now), { window: '30', start: '2026-09-01', end: '2026-09-30' })
  assert.deepEqual(parseUsageRange({ window: '7' }, now), { window: '7', start: '2026-09-24', end: '2026-09-30' })
  assert.deepEqual(parseUsageRange({ window: 'custom', start: '2026-09-10', end: '2026-09-20' }, now), { window: 'custom', start: '2026-09-10', end: '2026-09-20' })
  assert.deepEqual(parseUsageRange({ window: 'custom', start: '2026-02-30', end: '2026-09-20' }, now), { window: '30', start: '2026-09-01', end: '2026-09-30' })
  assert.deepEqual(parseUsageRange({ window: 'custom', start: '2026-09-20', end: '2026-09-10' }, now), { window: '30', start: '2026-09-01', end: '2026-09-30' })
})

test('section links keep the selected local date range', () => {
  assert.equal(usageHref('timing', { window: 'custom', start: '2026-09-10', end: '2026-09-20' }),
    '/admin/app-usage/timing?window=custom&start=2026-09-10&end=2026-09-20')
  assert.equal(usageHref('value', { window: '7', start: '2026-09-24', end: '2026-09-30' }),
    '/admin/app-usage/value?window=7')
})
