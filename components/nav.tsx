export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-0.5">
          <span className="text-2xl font-black text-kido-navy tracking-tight">kido</span>
          <span className="text-2xl font-black text-kido-coral">!</span>
        </a>

        <div className="flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-kido-muted font-medium hover:text-kido-navy transition-colors hidden sm:block">
            How it works
          </a>
          <a href="#our-story" className="text-sm text-kido-muted font-medium hover:text-kido-navy transition-colors hidden sm:block">
            Our story
          </a>
          <a
            href="#waitlist"
            className="bg-kido-purple text-white text-sm font-bold px-5 py-2.5 rounded-pill hover:bg-purple-700 transition-colors"
          >
            Join waitlist
          </a>
        </div>
      </div>
    </nav>
  )
}
