'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

type NavItem = {
  href: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#families', label: 'For families' },
  { href: '#clinical', label: 'Clinical trust' },
]

export default function Nav() {
  const [activeHref, setActiveHref] = useState<string>(NAV_ITEMS[0].href)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const navClass = useMemo(
    () =>
      `sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-kido-purple-border-light shadow-[0_8px_30px_rgba(26,14,48,0.08)]'
          : 'bg-white/95 backdrop-blur border-gray-100'
      }`,
    [isScrolled]
  )

  useEffect(() => {
    function syncNavigationState() {
      const y = window.scrollY
      setIsScrolled(y > 24)

      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const progress = scrollable <= 0 ? 0 : Math.min(100, Math.max(0, (y / scrollable) * 100))
      setScrollProgress(progress)

      const sections = NAV_ITEMS.map((item) => {
        const id = item.href.replace('#', '')
        return document.getElementById(id)
      }).filter((element): element is HTMLElement => Boolean(element))

      let nextActive = NAV_ITEMS[0].href
      for (const section of sections) {
        if (section.offsetTop - 140 <= y) {
          nextActive = `#${section.id}`
        }
      }
      setActiveHref(nextActive)
    }

    syncNavigationState()
    window.addEventListener('scroll', syncNavigationState, { passive: true })
    window.addEventListener('resize', syncNavigationState)
    return () => {
      window.removeEventListener('scroll', syncNavigationState)
      window.removeEventListener('resize', syncNavigationState)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <nav className={navClass}>
        <div className="h-[2px] bg-kido-purple/10">
          <div
            className="h-full bg-kido-purple transition-[width] duration-150"
            style={{ width: `${scrollProgress}%` }}
            aria-hidden="true"
          />
        </div>
        <div className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`}>
          <a href="#" className="flex items-center gap-0.5" aria-label="Kido home">
            <Image
              src="/kido-logo.png"
              alt="Kido logo"
              width={110}
              height={44}
              className={`w-auto origin-left transition-all duration-300 ${isScrolled ? 'h-9 scale-[1.9]' : 'h-11 scale-[2.1]'}`}
              priority
            />
          </a>

          <div className="hidden sm:flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeHref === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium px-3 py-2 rounded-full transition-all ${
                    isActive
                      ? 'text-kido-navy bg-kido-purple-tint'
                      : 'text-kido-muted hover:text-kido-navy hover:bg-kido-purple-tint/70'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
            <a
              href="#waitlist"
              className="ml-2 bg-kido-purple text-white text-sm font-bold px-5 py-2.5 rounded-pill hover:bg-purple-700 transition-colors"
            >
              Join waitlist
            </a>
          </div>

          <button
            type="button"
            className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-kido-purple-border text-kido-navy"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="text-lg leading-none">{isMenuOpen ? '×' : '☰'}</span>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="sm:hidden fixed inset-0 z-40 bg-kido-navy/35 backdrop-blur-[2px] px-6 pt-24 pb-6">
          <div className="bg-white rounded-2xl border border-kido-purple-border-light shadow-xl p-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  activeHref === item.href
                    ? 'bg-kido-purple-tint text-kido-navy'
                    : 'text-kido-muted hover:bg-kido-purple-tint/60 hover:text-kido-navy'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 block text-center bg-kido-purple text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-purple-700 transition-colors"
            >
              Join waitlist
            </a>
          </div>
        </div>
      )}
    </>
  )
}
