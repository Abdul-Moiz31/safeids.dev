'use client'

import { useState } from 'react'
import { IdPill } from './IdPill'

export function Hero() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install safeids')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative py-16 px-6 bg-gradient-to-b from-black via-black to-transparent">
      {/* Subtle radial glow behind headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 800px 400px at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
          Stop passing the wrong ID.
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-secondary max-w-2xl mb-12 leading-relaxed">
          userId where orderId belongs. It compiles. It ships. It breaks in production.
          <br />
          safeids makes ID domain mixups a TypeScript error.
        </p>

        {/* Demo Pills */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
          <IdPill label="userId" prefix="usr" accentColor="indigo" />

          <div className="flex items-center gap-3">
            <div className="w-6 h-0.5 bg-red-500/60" />
            <span className="text-xs font-medium text-red-500 uppercase">Type error</span>
          </div>

          <IdPill label="orderId" prefix="ord" accentColor="zinc" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleCopy}
            className="px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-indigo-600 transition-all active:scale-95"
          >
            {copied ? '✓ Copied!' : 'Install safeids'}
          </button>
          <a
            href="https://github.com/anthropics/safeids"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-surface text-primary font-medium rounded-lg hover:bg-zinc-800 transition-all border border-surface"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
