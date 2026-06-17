'use client'

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16">
      {/* glass blur bar */}
      <div className="absolute inset-0 border-b border-white/[0.06] bg-black/70 backdrop-blur-xl" />

      <div className="relative flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-glow-sm">
          <span className="text-white font-bold text-xs leading-none">id</span>
        </div>
        <span className="font-semibold text-white tracking-tight">safeids</span>
      </div>

      <div className="relative flex items-center gap-6 text-sm text-white/50">
        <a
          href="/docs"
          className="hover:text-white transition-colors"
        >
          Docs
        </a>
        <a
          href="https://github.com/Abdul-Moiz31/safeids.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.npmjs.com/package/safeids"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
        >
          npm install
        </a>
      </div>
    </nav>
  )
}
