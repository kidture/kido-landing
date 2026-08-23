import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-kido-near-black px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Top row */}
        <div className="flex flex-wrap justify-between items-center gap-6 mb-6">
          <Link href="/" className="flex items-center gap-0.5">
            <Image
              src="/kido-logo.png"
              alt="Kidture logo"
              width={100}
              height={40}
              className="h-10 w-auto scale-[1.9] origin-left"
            />
          </Link>
          <nav className="flex flex-wrap gap-6">
            {[
              { label: 'How it works', href: '#how-it-works' },
              { label: 'Our story', href: '#our-story' },
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-gray-500 hover:text-gray-400 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/5 pt-6 flex flex-wrap justify-between items-center gap-3">
          <p className="text-xs text-gray-600">© 2026 Kidture Health · Patent Pending</p>
          <p className="text-xs text-gray-600">Built for families. Built with clinicians.</p>
        </div>

      </div>
    </footer>
  )
}
