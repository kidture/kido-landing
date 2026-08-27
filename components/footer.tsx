import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-kt-charcoal px-6 py-12">
      <div className="mx-auto max-w-page">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
          <Link href="/" className="flex items-center" aria-label="Kidture home">
            <Image
              src="/brand/wordmark-nav-white.png"
              alt="Kidture"
              width={120}
              height={32}
              className="h-7 w-auto"
            />
          </Link>
          <nav className="flex flex-wrap gap-6" aria-label="Footer">
            {[
              { label: 'How it works', href: '#how-it-works' },
              { label: 'For families', href: '#families' },
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-kt-mist transition-colors hover:text-kt-fog"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-kt-cream/10 pt-6">
          <p className="text-xs text-kt-cream/40">© 2026 Kidture Health · Patent Pending</p>
          <p className="text-xs text-kt-cream/40">Built for families. Built with clinicians.</p>
        </div>
      </div>
    </footer>
  )
}
