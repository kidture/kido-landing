import assert from 'node:assert/strict'
import test, { beforeEach } from 'node:test'

import * as emails from '../lib/admin/invitation-email.ts'

beforeEach((t) => {
  const originalEnv = { ...process.env }
  t.after(() => { process.env = originalEnv })
})

for (const [environment, dashboardUrl] of [
  ['production', 'https://kidture.health/admin?status=requested'],
  ['development', 'http://localhost:3000/admin?status=requested'],
] as const) {
  test(`links to the ${environment} dashboard in HTML and plain-text notifications`, () => {
    process.env = { ...process.env, NODE_ENV: environment }
    const email = emails.renderAndroidRequestNotification('parent@example.com')

    assert.ok(email.text.includes(dashboardUrl))
    assert.ok(email.html.includes(`href="${dashboardUrl}"`))
  })
}

test('renders a branded Android access notification identifying the requester safely', () => {
  const email = emails.renderAndroidRequestNotification('parent<test>@example.com')

  assert.equal(email.subject, 'Request for Android Acesss')
  assert.match(email.text, /parent<test>@example\.com has requested Android access/)
  assert.match(email.html, /parent&lt;test&gt;@example\.com/)
  assert.doesNotMatch(email.html, /parent<test>/)
  assert.match(email.html, /wordmark-ink-h128\.png/)
  assert.match(email.html, /background:#ffffff;border-top:3px solid #3FA9A0/)
  assert.match(email.html, /Kidture &middot; support@kidture\.health/)
})

test('sends Android access notifications to all three team recipients using the existing sender', async (t) => {
  process.env.RESEND_API_KEY = 'test-key'
  process.env.MAIL_FROM = 'Kidture <noreply@kidture.health>'
  process.env.BETA_PLAY_OPT_IN_URL = ''
  let payload: Record<string, unknown> | undefined
  t.mock.method(globalThis, 'fetch', async (url: string, options: RequestInit) => {
    assert.equal(url, 'https://api.resend.com/emails')
    assert.equal(options.method, 'POST')
    assert.equal(new Headers(options.headers).get('Authorization'), 'Bearer test-key')
    payload = JSON.parse(String(options.body))
    return new Response(JSON.stringify({ id: 'notification-1' }), { status: 200 })
  })

  await emails.sendAndroidRequestNotification('parent@example.com')

  assert.ok(payload)
  assert.equal(payload.from, 'Kidture <noreply@kidture.health>')
  assert.deepEqual(payload.to, [
    'support@kidture.health',
    'vijaytha92.vm@gmail.com',
    'abhinavbharadwaj00@gmail.com',
  ])
  assert.equal(payload.subject, 'Request for Android Acesss')
  assert.match(String(payload.text), /parent@example\.com has requested Android access/)
  assert.match(String(payload.html), /parent@example\.com/)
})

test('reports a notification delivery failure so the background handler can log it', async (t) => {
  process.env.RESEND_API_KEY = 'test-key'
  process.env.MAIL_FROM = 'Kidture <noreply@kidture.health>'
  t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 503 }))

  await assert.rejects(emails.sendAndroidRequestNotification('parent@example.com'), /503/)
})

test('keeps beta invitation delivery addressed to the tester with their Play link', async (t) => {
  process.env.RESEND_API_KEY = 'test-key'
  process.env.MAIL_FROM = 'Kidture <noreply@kidture.health>'
  process.env.BETA_PLAY_OPT_IN_URL = 'https://play.google.com/apps/testing/com.kidture.health'
  let payload: Record<string, unknown> | undefined
  t.mock.method(globalThis, 'fetch', async (_url: string, options: RequestInit) => {
    payload = JSON.parse(String(options.body))
    return new Response(JSON.stringify({ id: 'invitation-1' }), { status: 200 })
  })

  await emails.sendAndroidInvitation('parent@example.com')

  assert.ok(payload)
  assert.deepEqual(payload.to, ['parent@example.com'])
  assert.equal(payload.subject, 'Your Kidture Android beta is ready')
  assert.match(String(payload.html), /https:\/\/play\.google\.com\/apps\/testing\/com\.kidture\.health/)
})
