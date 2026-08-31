export const metadata = {
  title: 'Delete Your Account - Kidture',
}

export default function DeleteAccount() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-black text-kt-ink mb-2">Delete Your Account</h1>
      <p className="text-sm text-kt-signpost mb-10">
        You can delete your Kidture account and all associated data at any time, whether or not
        you still have the app installed.
      </p>

      <Section title="Option 1: Delete in the app">
        <p>
          Open Kidture and go to <strong className="text-kt-ink">Profile → Settings → Delete
          Account</strong>. You&rsquo;ll be asked to confirm, by typing your account email if you
          signed up with a password, or by signing in again with Google/Apple if you used one of
          those. Deletion happens immediately once confirmed and cannot be undone.
        </p>
      </Section>

      <Section title="Option 2: Request deletion by email">
        <p>
          If you no longer have the app installed, or can&rsquo;t sign in, email{' '}
          <a href="mailto:support@kidture.health?subject=Account%20deletion%20request" className="text-kt-teal underline">
            support@kidture.health
          </a>{' '}
          from the address your account is registered under, with the subject line
          &ldquo;Account deletion request.&rdquo; We verify the request against that email address
          before deleting anything.
        </p>
      </Section>

      <Section title="Deleting specific data without deleting your account">
        <p>
          You don&rsquo;t have to delete your whole account to remove data. Inside the app, you
          can delete an individual child&rsquo;s profile. Removing that child&rsquo;s medical
          history, logged entries, reminders, and reports while keeping the rest of your
          account intact. This is available from{' '}
          <strong className="text-kt-ink">that child&rsquo;s profile → Delete Child</strong>.
        </p>
        <p className="mt-4">
          For anything not covered by that (for example, a specific logged entry), email{' '}
          <a href="mailto:support@kidture.health?subject=Data%20deletion%20request" className="text-kt-teal underline">
            support@kidture.health
          </a>{' '}
          describing what you&rsquo;d like removed and we&rsquo;ll handle it without deleting your
          account.
        </p>
      </Section>

      <Section title="What gets deleted">
        <p>
          Deleting your account is a permanent, account-wide erasure, not just a deactivation.
          It removes:
        </p>
        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>Your account and profile information</li>
          <li>Every child profile linked to your account, including medical history, conditions, and medications</li>
          <li>All logged entries, symptoms, food, sleep, mood, injuries, and general notes</li>
          <li>Reminders, schedules, and clinician reports</li>
          <li>Chat and voice-capture session data, and any insights generated from it</li>
        </ul>
        <p className="mt-4">
          We keep a minimal internal record that an account was deleted (a timestamp and a row
          count, for our own audit trail). It contains no personal information and cannot be
          used to identify you or reconstruct anything that was deleted.
        </p>
      </Section>

      <Section title="Questions">
        <p>
          See our{' '}
          <a href="/privacy" className="text-kt-teal underline">
            Privacy Policy
          </a>{' '}
          for more on how we handle your data, or contact{' '}
          <a href="mailto:privacy@kidture.health" className="text-kt-teal underline">
            privacy@kidture.health
          </a>
          .
        </p>
      </Section>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-kt-ink mb-3">{title}</h2>
      <div className="text-kt-signpost leading-relaxed">{children}</div>
    </section>
  )
}
