'use client'

export function Nav() {
  return (
    <nav className="sticky top-0 h-16 bg-black/95 backdrop-blur border-b border-surface z-50">
      <div className="h-full max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">id</span>
          </div>
          <span className="font-semibold text-lg text-primary">safeids</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/anthropics/safeids"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-primary transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/safeids"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-md bg-accent text-white text-sm font-medium hover:bg-indigo-600 transition-colors"
          >
            View on npm
          </a>
        </div>
      </div>
    </nav>
  )
}
