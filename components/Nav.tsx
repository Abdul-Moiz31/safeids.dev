'use client'

export function Nav() {
  return (
    <nav className="sticky top-0 h-20 bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle z-50">
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 font-bold text-xl hover:opacity-80 transition-opacity">
          <div className="w-9 h-9 bg-gradient-to-br from-accent-primary to-accent-dark rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-lg">id</span>
          </div>
          <span className="text-text-primary hidden sm:inline">safeids</span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Abdul-Moiz31/safeids.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium flex items-center gap-2"
          >
            GitHub
            <span>→</span>
          </a>

          <a
            href="https://www.npmjs.com/package/safeids"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-accent-primary hover:bg-accent-dark text-white text-sm font-semibold transition-all"
          >
            npm Package
          </a>
        </div>
      </div>
    </nav>
  )
}
