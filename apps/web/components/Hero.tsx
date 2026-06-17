'use client'

import { useState } from 'react'

export function Hero() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install safeids')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-12 overflow-hidden">
      {/* glow layers */}
      <div className="pointer-events-none absolute inset-0 bg-glow-violet" />
      <div className="pointer-events-none absolute inset-0 bg-glow-cyan" />

      {/* grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%,black 40%,transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%,black 40%,transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Zero runtime overhead · Full TypeScript support
        </div>

        {/* headline */}
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
          <span className="text-gradient">Stop passing</span>
          <br />
          the wrong ID
        </h1>

        <p className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-10">
          Branded TypeScript IDs that make{' '}
          <span className="text-white/80">userId where orderId belongs</span> a compile
          error — not a production incident.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 text-white font-semibold shadow-glow hover:opacity-90 transition-opacity text-sm"
          >
            <svg className="w-4 h-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copied ? '✓ Copied!' : 'npm install safeids'}
          </button>

          <a
            href="https://github.com/Abdul-Moiz31/safeids.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.04] text-white/80 hover:bg-white/[0.08] hover:text-white transition-all text-sm font-medium backdrop-blur-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View source
          </a>
        </div>

        {/* Before/After code card */}
        <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden text-left">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-xs text-white/30 font-mono">types.ts</span>
          </div>
          <div className="p-5 font-mono text-xs leading-relaxed">
            <p className="text-white/30 uppercase tracking-widest text-[10px] font-sans mb-3">Before</p>
            <p className="text-white/50">{`function processOrder(userId: string, orderId: string) {`}</p>
            <p className="text-white/50 pl-4">{`await db.orders.findOne({ id: userId }) `}<span className="text-red-400">{'// silent bug ❌'}</span></p>
            <p className="text-white/50">{`}`}</p>
            <p className="text-white/40 mt-1">{`processOrder(order.id, user.id) `}<span className="text-white/25">{'// compiles fine'}</span></p>

            <div className="my-4 h-px bg-white/[0.06]" />

            <p className="text-white/30 uppercase tracking-widest text-[10px] font-sans mb-3">After safeids</p>
            <p className="text-white/70">{`function processOrder(`}<span className="text-violet-400">userId: UserId</span>{`, `}<span className="text-cyan-400">orderId: OrderId</span>{`) {`}</p>
            <p className="text-white/70 pl-4">{`await db.orders.findOne({ id: orderId }) `}<span className="text-emerald-400">{'// safe ✓'}</span></p>
            <p className="text-white/70">{`}`}</p>
            <p className="text-white/70 mt-1">{`processOrder(order.id, user.id)`}</p>
            <p className="text-red-400">{`// Type Error: OrderId ≠ UserId — caught at compile time ✓`}</p>
          </div>
        </div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}
