export const metadata = {
  title: 'Privacy Policy — Kidture',
}

export default function Privacy() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-black text-kt-ink mb-2">Privacy Policy</h1>
      <p className="text-sm text-kt-signpost mb-1">Effective date: August 22, 2026</p>
      <p className="text-sm text-kt-signpost mb-10">
        Interim policy, published for TestFlight beta testing. A more detailed policy will
        replace this one before general availability.
      </p>

      <Section title="Who we are">
        <p>
          Kidture (&ldquo;Kidture,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) is a service of{' '}
          <strong className="text-kt-ink">Kidture Health</strong>, a Delaware C-Corporation
          based in New Castle, DE. Kidture makes the Kidture app, which helps parents and
          caregivers track their child&rsquo;s health, development, and daily wellbeing. Kidture
          is not a medical device and is not intended to diagnose, treat, cure, or prevent any
          disease or condition. It does not replace advice from a qualified healthcare
          professional.
        </p>
        <p className="mt-4">
          <strong className="text-kt-ink">UK representative:</strong> For users in the United
          Kingdom, our Article 27 UK GDPR representative is Kadambi Muralidharan. Contact them via{' '}
          <a href="mailto:privacy@kidture.health" className="text-kt-teal underline">
            privacy@kidture.health
          </a>
          .
        </p>
      </Section>

      <Section title="Information we collect">
        <p>When you use Kidture, we may collect:</p>
        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>
            <strong className="text-kt-ink">Account information</strong>: name, email address,
            and login credentials.
          </li>
          <li>
            <strong className="text-kt-ink">Child profile information</strong>: name, date of
            birth, and information you choose to add about your child (e.g., growth, symptoms,
            medications, allergies, developmental milestones, moods, and notes).
          </li>
          <li>
            <strong className="text-kt-ink">Content you provide</strong>: text, voice
            recordings and their transcripts, and photos you submit while logging entries or
            talking with the app.
          </li>
          <li>
            <strong className="text-kt-ink">Usage data</strong>: how you interact with the
            app, device type, and app version, used to keep the app working and to improve it.
          </li>
        </ul>
        <p className="mt-4">
          We only collect what&rsquo;s needed to provide the app&rsquo;s core features. We do not
          sell your data.
        </p>
      </Section>

      <Section title="How we use your information">
        <ul className="list-disc pl-5 space-y-2">
          <li>To provide the app&rsquo;s core functionality: logging, timelines, reminders, and summaries for your child.</li>
          <li>
            To generate AI-assisted insights and summaries. Some of your entries (including text
            and voice transcripts) are sent to Anthropic, our AI service provider, to power
            features like chat-based logging and pattern insights. Anthropic processes this data
            to return a response to you and does not use it to train their models. See{' '}
            <a
              href="https://www.anthropic.com/legal/privacy"
              className="text-kt-teal underline"
            >
              anthropic.com/legal/privacy
            </a>{' '}
            for how Anthropic handles data it processes on our behalf.
          </li>
          <li>To send you reminders, notifications, and service-related communications you&rsquo;ve opted into.</li>
          <li>To maintain the security and reliability of the app.</li>
        </ul>
      </Section>

      <Section title="Children's data">
        <p>
          Kidture is designed for use <strong className="text-kt-ink">by parents and
          caregivers</strong>, not by children directly. Information about your child is
          provided by you, the account holder, and is treated as sensitive personal data. We do
          not knowingly allow children to create their own accounts or interact directly with the
          app.
        </p>
      </Section>

      <Section title="How we store and protect your information">
        <p>
          Data is encrypted in transit and at rest. Access is limited to what&rsquo;s needed to
          operate the service. We retain your data for as long as your account is active, and you
          can request deletion at any time (see &ldquo;Your rights&rdquo; below).
        </p>
      </Section>

      <Section title="Your rights">
        <p>You can:</p>
        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>Access, correct, or export the information associated with your account.</li>
          <li>Delete your account and associated data at any time by contacting us.</li>
          <li>Withdraw consent for AI-assisted processing, which may limit some features.</li>
        </ul>
        <p className="mt-4">
          To exercise any of these rights, contact us at{' '}
          <a href="mailto:privacy@kidture.health" className="text-kt-teal underline">
            privacy@kidture.health
          </a>
          .
        </p>
      </Section>

      <Section title="Third-party service providers">
        <p>
          We use a small number of service providers to operate the app (e.g., cloud hosting and
          AI processing via Anthropic). These providers are contractually bound to use your data
          only to provide services to us, not for their own purposes.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          We&rsquo;ll update this page as the app evolves. Material changes will be reflected here
          with a new effective date.
        </p>
      </Section>

      <Section title="Contact us">
        <p>
          Questions about this policy or your data:{' '}
          <a href="mailto:privacy@kidture.health" className="text-kt-teal underline">
            privacy@kidture.health
          </a>
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
