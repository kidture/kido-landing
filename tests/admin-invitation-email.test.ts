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

test('wraps an Android invitation in the Kidture branded email shell', () => {
  const email = renderAndroidInvitation(
    'parent@example.com',
    'https://play.google.com/apps/testing/com.kidture.health'
  )

  assert.match(email.html, /src="https:\/\/kidture\.health\/brand\/png\/wordmark-ink-h128\.png"/)
  assert.match(email.html, /background:#ffffff;border-top:3px solid #3FA9A0/)
  assert.match(email.html, /Kidture &middot; support@kidture\.health/)
})

test('uses an email-safe wrapper to leave breathing room above the invitation wordmark', () => {
  const email = renderAndroidInvitation(
    'parent@example.com',
    'https://play.google.com/apps/testing/com.kidture.health'
  )

  assert.match(email.html, /<div style="background:#fff8f0;padding:48px 16px/)
})
