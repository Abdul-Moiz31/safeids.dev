'use client'

import { useState } from 'react'
import { Copy, ExternalLink } from 'lucide-react'

export function Hero() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install safeids')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="w-full py-20 md:py-32 px-6 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto text-center">
        {/* Overline */}
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-6 uppercase tracking-wide">
          Type-Safe ID Generation
        </p>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Stop passing the wrong ID
        </h1>

        {/* Subheading */}
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          userId where orderId belongs. It compiles. It ships. It breaks in production.
          <br className="hidden sm:block" />
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">safeids catches these mistakes at compile time.</span>
        </p>

        {/* Code Example Box */}
        <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-8 mb-12 max-w-2xl mx-auto">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 uppercase tracking-wide font-medium">
            Before safeids
          </p>
          <pre className="text-sm text-left overflow-x-auto mb-4">
            <code className="text-neutral-900 dark:text-neutral-100">{`function processOrder(userId: string, orderId: string) {
  // Easy to mix up — no error
  await db.orders.findOne({ id: userId })
}

processOrder(order.id, user.id)  // Bug: silent failure ❌`}</code>
          </pre>

          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 mt-4">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 uppercase tracking-wide font-medium">
              After safeids
            </p>
            <pre className="text-sm text-left overflow-x-auto">
              <code className="text-neutral-900 dark:text-neutral-100">{`function processOrder(userId: UserId, orderId: OrderId) {
  await db.orders.findOne({ id: orderId })  // Correct
}

processOrder(order.id, user.id)
// Type Error ✓ Caught at compile time`}</code>
            </pre>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleCopy}
            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors font-medium flex items-center gap-2 active:scale-95"
          >
            <Copy size={18} />
            {copied ? 'Copied!' : 'npm install safeids'}
          </button>

          <a
            href="https://github.com/Abdul-Moiz31/safeids.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors font-medium flex items-center gap-2"
          >
            <ExternalLink size={18} />
            View on GitHub
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="text-2xl font-bold">0 bytes</div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">Runtime overhead</p>
          </div>
          <div>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">Type safe</p>
          </div>
          <div>
            <div className="text-2xl font-bold">20+</div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">Tests passing</p>
          </div>
        </div>
      </div>
    </section>
  )
}
