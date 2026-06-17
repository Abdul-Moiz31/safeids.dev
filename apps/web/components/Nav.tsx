'use client'

export function Nav() {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-6">
      <nav className="relative flex items-center justify-between gap-8 px-5 h-12 rounded-2xl border border-white/[0.10] bg-black/70 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)] w-full max-w-2xl">
        {/* logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-glow-sm">
            <span className="text-white font-bold text-[10px] leading-none">id</span>
          </div>
          <span className="font-semibold text-white text-sm tracking-tight">safeids</span>
        </div>

        {/* links */}
        <div className="flex items-center gap-5 text-sm text-white/50">
          <a href="/docs" className="hover:text-white transition-colors">
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
            className="px-3.5 py-1 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors"
          >
            npm install
          </a>
        </div>
      </nav>
    </div>
  )
}
