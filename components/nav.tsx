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
          ? 'bg-kt-charcoal/95 backdrop-blur-xl border-kt-cream/10 shadow-lift'
          : 'bg-kt-charcoal border-transparent'
      }`,
    [isScrolled]
  )

  useEffect(() => {
    const syncNavigationState = () => {
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
        <div className="h-[2px] bg-kt-cream/10">
          <div
            className="h-full bg-kt-teal transition-[width] duration-150"
            style={{ width: `${scrollProgress}%` }}
            aria-hidden="true"
          />
        </div>
        <div
          className={`mx-auto flex max-w-page items-center justify-between px-6 transition-all duration-300 ${
            isScrolled ? 'py-3' : 'py-3.5'
          }`}
        >
          <a href="#" className="flex items-center" aria-label="Kidture home">
            <Image
              src="/brand/wordmark-nav-white.png"
              alt="Kidture"
              width={140}
              height={36}
              className={`w-auto origin-left transition-all duration-300 ${
                isScrolled ? 'h-7' : 'h-8'
              }`}
              priority
            />
          </a>

          <div className="hidden items-center gap-1 sm:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeHref === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-kt-cream/12 text-kt-fog'
                      : 'text-kt-mist hover:bg-kt-cream/8 hover:text-kt-fog'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
            <a
              href="#waitlist"
              className="ml-2 rounded-control bg-kt-teal px-5 py-2.5 text-sm font-semibold text-kt-cream shadow-glow transition-colors hover:bg-kt-olive-teal"
            >
              Join waitlist
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-kt-cream/20 text-kt-fog sm:hidden"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="text-lg leading-none">{isMenuOpen ? '×' : '☰'}</span>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-kt-charcoal/70 px-6 pb-6 pt-24 backdrop-blur-[2px] sm:hidden">
          <div className="space-y-2 rounded-card border border-kt-cream/10 bg-kt-charcoal-mid p-4 shadow-lift">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-control px-4 py-3 text-sm font-semibold transition-colors ${
                  activeHref === item.href
                    ? 'bg-kt-cream/12 text-kt-fog'
                    : 'text-kt-mist hover:bg-kt-cream/8 hover:text-kt-fog'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 block rounded-control bg-kt-teal px-5 py-3 text-center text-sm font-semibold text-kt-cream transition-colors hover:bg-kt-olive-teal"
            >
              Join waitlist
            </a>
          </div>
        </div>
      )}
    </>
  )
}
