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
    <section className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-bg-secondary via-bg-primary to-bg-primary overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent-primary/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-8 inline-block">
          <span className="px-4 py-2 rounded-full bg-bg-secondary border border-border-subtle text-xs uppercase tracking-widest font-semibold text-accent-primary">
            ✨ Type-Safe ID Generation
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-5xl md:text-7xl font-bold bg-gradient-to-r from-text-primary to-accent-light bg-clip-text text-transparent leading-tight">
          Stop Passing the Wrong ID
        </h1>

        {/* Subheading */}
        <p className="mx-auto mb-12 text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed">
          userId where orderId belongs. It compiles. It ships. It breaks in production.
          <br />
          <span className="font-semibold text-text-primary">safeids makes ID domain mixups a TypeScript error.</span>
        </p>

        {/* Demo Section */}
        <div className="mx-auto mb-16 max-w-2xl">
          <div className="p-8 rounded-2xl bg-bg-secondary border border-border-subtle shadow-lg">
            <p className="text-xs uppercase tracking-widest text-text-tertiary font-semibold mb-6">Live Type Checking Demo</p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
              <IdPill label="userId" prefix="usr" accentColor="indigo" />

              <div className="flex items-center gap-3">
                <div className="w-12 h-0.5 bg-error/50"></div>
                <span className="text-xs font-bold text-error uppercase">Type Error</span>
              </div>

              <IdPill label="orderId" prefix="ord" accentColor="zinc" />
            </div>

            <code className="text-sm text-error">
              Argument of type 'OrderId' is not assignable to parameter of type 'UserId'
            </code>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleCopy}
            className="px-8 py-3.5 rounded-lg bg-accent-primary hover:bg-accent-dark text-white font-semibold transition-all active:scale-95 shadow-lg hover:shadow-lg flex items-center gap-2"
          >
            {copied ? '✓ Copied!' : 'npm install safeids'}
          </button>

          <a
            href="https://github.com/Abdul-Moiz31/safeids.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-lg bg-bg-secondary hover:bg-bg-tertiary border border-border-subtle text-text-primary font-semibold transition-all"
          >
            View on GitHub →
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 pt-12 border-t border-border-subtle flex flex-wrap justify-center gap-12">
          <div>
            <div className="text-3xl font-bold text-accent-primary">0 bytes</div>
            <p className="text-text-tertiary text-sm mt-2">Runtime overhead</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent-primary">100%</div>
            <p className="text-text-tertiary text-sm mt-2">Type safety</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent-primary">20</div>
            <p className="text-text-tertiary text-sm mt-2">Tests passing</p>
          </div>
        </div>
      </div>
    </section>
  )
}
