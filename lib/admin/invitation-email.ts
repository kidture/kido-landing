type BrandedEmail = {
  subject: string
  html: string
  text: string
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }
    return entities[character]
  })
}

function getRequiredEnv(name: 'RESEND_API_KEY' | 'MAIL_FROM' | 'BETA_PLAY_OPT_IN_URL'): string {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing ${name} environment variable`)
  return value
}

function renderEmailShell(content: string): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;color:#0E0B20;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
    <div style="background:#fff8f0;padding:48px 16px">
      <div style="max-width:480px;margin:0 auto">
        <div style="text-align:center;padding-bottom:24px">
          <img src="https://kidture.health/brand/png/wordmark-ink-h128.png" alt="Kidture" height="32" style="height:32px;width:auto" />
        </div>
        <section style="background:#ffffff;border-top:3px solid #3FA9A0;border-radius:16px;padding:32px;color:#0E0B20;font-size:15px;line-height:1.6">
${content}
        </section>
        <p style="text-align:center;color:#8B6B55;font-size:12px;margin-top:24px">Kidture &middot; support@kidture.health &middot; &copy; ${new Date().getUTCFullYear()}</p>
      </div>
    </div>
  </body>
</html>`
}

export function renderAndroidInvitation(email: string, playOptInUrl: string): BrandedEmail {
  const safeEmail = escapeHtml(email)
  const safeUrl = escapeHtml(playOptInUrl)
  const subject = 'Your Kidture Android beta is ready'

  return {
    subject,
    text: `Hi,

You can now install the Kidture Android beta.

Open this link on your Android phone while signed in to the Google Play account you gave us (${email}):
${playOptInUrl}

Tap Become a tester, then Download test app. Google Play will install the test version normally—there is no developer account or special phone setup required.

If the link says you are not eligible, make sure the Play Store is signed in to ${email}.

Thanks for helping us improve Kidture.`,
    html: renderEmailShell(`        <h1 style="margin:0;font-size:26px;line-height:1.2">Your Android beta is ready</h1>
        <p style="margin:20px 0 0">Hi,</p>
        <p>You can now install the Kidture Android beta using the Google Play account you gave us: <strong>${safeEmail}</strong>.</p>
        <p style="margin:28px 0">
          <a href="${safeUrl}" style="display:inline-block;background:#3fa9a0;border-radius:12px;color:#fff8f0;font-weight:700;padding:14px 20px;text-decoration:none">Open Android beta</a>
        </p>
        <ol style="padding-left:22px">
          <li>Open the button on your Android phone.</li>
          <li>Tap <strong>Become a tester</strong>.</li>
          <li>Tap <strong>Download test app</strong>.</li>
        </ol>
        <p>Google Play installs the beta normally. You do not need a developer account or any special phone setup.</p>
        <p style="margin-bottom:0">If the link says you are not eligible, make sure the Play Store is signed in to <strong>${safeEmail}</strong>.</p>`),
  }
}

export function renderAndroidRequestNotification(email: string): BrandedEmail {
  const dashboardUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/admin?status=requested'
    : 'https://kidture.health/admin?status=requested'

  return {
    subject: 'Request for Android Acesss',
    text: `${email} has requested Android access through beta-testing.

Please review their request in the Kidture beta dashboard:
${dashboardUrl}`,
    html: renderEmailShell(`
        <h1 style="margin:0;font-size:26px;line-height:1.2">Android access requested</h1>
        <p style="margin:20px 0 0"><strong>${escapeHtml(email)}</strong> has requested Android access through beta-testing.</p>
        <p style="margin-bottom:0">Please review their request in the <a href="${dashboardUrl}" style="color:#3FA9A0;text-decoration:underline">Kidture beta dashboard</a>.</p>`),
  }
}

export async function sendAndroidInvitation(email: string): Promise<void> {
  await sendEmail([email], renderAndroidInvitation(email, getRequiredEnv('BETA_PLAY_OPT_IN_URL')))
}

export async function sendAndroidRequestNotification(email: string): Promise<void> {
  await sendEmail([
    'support@kidture.health',
    'vijaytha92.vm@gmail.com',
    'abhinavbharadwaj00@gmail.com',
  ], renderAndroidRequestNotification(email))
}

async function sendEmail(to: string[], content: BrandedEmail): Promise<void> {
  const abortController = new AbortController()
  const timeout = setTimeout(() => abortController.abort(), 10_000)

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getRequiredEnv('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: getRequiredEnv('MAIL_FROM'),
        to,
        subject: content.subject,
        html: content.html,
        text: content.text,
      }),
      signal: abortController.signal,
    })

    if (!response.ok) {
      throw new Error(`Resend email send failed with ${response.status}`)
    }
  } finally {
    clearTimeout(timeout)
  }
}
