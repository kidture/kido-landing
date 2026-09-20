import assert from 'node:assert/strict'
import test from 'node:test'

import { renderAndroidInvitation } from '../lib/admin/invitation-email.ts'

test('renders an Android invitation with recipient and Play opt-in link', () => {
  const email = renderAndroidInvitation(
    'parent@example.com',
    'https://play.google.com/apps/testing/com.kidture.health'
  )

  assert.equal(email.subject, 'Your Kidture Android beta is ready')
  assert.match(email.text, /parent@example\.com/)
  assert.match(email.text, /Become a tester/)
  assert.match(email.html, /https:\/\/play\.google\.com\/apps\/testing\/com\.kidture\.health/)
  assert.match(email.html, /Kidture/)
})
