'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/admin/app-usage', label: 'App usage' },
  { href: '/admin/android-requests', label: 'Android requests' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const current = pathname.startsWith('/admin/app-usage') ? 'App usage' : links.find((link) => link.href === pathname)?.label ?? 'Administration'

  async function signOut() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    window.location.assign('/admin')
  }

  const navigation = (
    <>
      <nav aria-label="Admin sections" className="space-y-1">
        {links.map((link) => (
          <a key={link.href} href={link.href} aria-current={pathname === link.href || (link.href === '/admin/app-usage' && pathname.startsWith('/admin/app-usage/')) ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
            className={`flex min-h-12 items-center rounded-control px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kt-teal ${pathname === link.href || (link.href === '/admin/app-usage' && pathname.startsWith('/admin/app-usage/')) ? 'bg-kt-teal text-white' : 'text-kt-secondary hover:bg-kt-cream-deep hover:text-kt-ink'}`}>
            {link.label}
          </a>
        ))}
      </nav>
      <button type="button" onClick={signOut} className="mt-auto min-h-12 rounded-control px-4 text-left text-sm font-semibold text-kt-secondary hover:bg-kt-cream-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-kt-teal">Sign out</button>
    </>
  )

  return (
    <div className="min-h-screen bg-kt-canvas text-kt-ink lg:flex">
      <aside className="hidden w-60 shrink-0 border-r border-kt-ink/10 bg-kt-cream px-4 py-7 lg:flex lg:min-h-screen lg:flex-col">
        <a href="/admin/app-usage" className="mb-10 px-4 text-xl font-bold tracking-[-0.04em]">Kidture</a>
        {navigation}
      </aside>
      <div className="border-b border-kt-ink/10 bg-kt-cream px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div><p className="text-base font-bold">Kidture</p><p className="text-sm text-kt-secondary">{current}</p></div>
          <button type="button" aria-expanded={menuOpen} aria-controls="mobile-admin-menu" onClick={() => setMenuOpen(!menuOpen)} className="min-h-11 min-w-11 rounded-control border border-kt-ink/20 px-4 text-sm font-semibold">Menu</button>
        </div>
        {menuOpen && <div id="mobile-admin-menu" className="mt-4 flex flex-col border-t border-kt-ink/10 pt-4">{navigation}</div>}
      </div>
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-9 lg:px-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  )
}
