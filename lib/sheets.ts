export async function saveEmail(email: string): Promise<void> {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL

  if (!webhookUrl) {
    throw new Error('Missing SHEETS_WEBHOOK_URL environment variable')
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, submittedAt: new Date().toISOString() }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Sheets webhook error ${res.status}: ${body}`)
  }
}
