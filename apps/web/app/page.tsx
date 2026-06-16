'use client'

import { useState } from 'react'
import type { Entity } from '@/lib/types'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { EntityBuilder } from '@/components/EntityBuilder'
import { CodeOutput } from '@/components/CodeOutput'
import { Playground } from '@/components/Playground'

const STARTER_ENTITIES: Entity[] = [
  { id: '1', name: 'User', fieldName: 'userId', prefix: 'usr' },
  { id: '2', name: 'Order', fieldName: 'orderId', prefix: 'ord' },
  { id: '3', name: 'Product', fieldName: 'productId', prefix: 'prd' },
]

export default function Home() {
  const [entities, setEntities] = useState<Entity[]>(STARTER_ENTITIES)

  return (
    <div className="min-h-screen bg-black">
      <Nav />

      <main className="flex flex-col">
        {/* Hero Section */}
        <Hero />

        {/* Tool Section */}
        <section className="flex-1 py-12 px-6 border-t border-surface">
          <div className="max-w-7xl mx-auto">
            {/* Desktop: 3-column layout */}
            <div className="hidden lg:grid grid-cols-[280px_1fr_480px] gap-6 h-[600px]">
              {/* Left Panel: Entity Builder */}
              <div className="bg-surface rounded-lg p-6 overflow-hidden flex flex-col">
                <EntityBuilder entities={entities} onEntitiesChange={setEntities} />
              </div>

              {/* Middle Panel: Code Output */}
              <div className="bg-surface rounded-lg p-6 overflow-hidden flex flex-col">
                <CodeOutput entities={entities} />
              </div>

              {/* Right Panel: Playground */}
              <div className="bg-surface rounded-lg p-6 overflow-hidden flex flex-col">
                <Playground entities={entities} />
              </div>
            </div>

            {/* Mobile: Stack view */}
            <div className="lg:hidden space-y-6">
              <div className="bg-surface rounded-lg p-6">
                <EntityBuilder entities={entities} onEntitiesChange={setEntities} />
              </div>
              <div className="bg-surface rounded-lg p-6">
                <CodeOutput entities={entities} />
              </div>
              <div className="bg-surface rounded-lg p-6">
                <Playground entities={entities} />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-6 border-t border-surface">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">How it works</h2>
            <p className="text-center text-secondary max-w-2xl mx-auto mb-16">Three simple steps to type-safe IDs</p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-surface rounded-lg p-8 border border-surface/50">
                <div className="text-4xl font-bold text-accent mb-4">01</div>
                <h3 className="text-lg font-semibold text-primary mb-3">Define your domain</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Tell safeids what entities you have. User, Order, Product — whatever your app needs.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-surface rounded-lg p-8 border border-surface/50">
                <div className="text-4xl font-bold text-accent mb-4">02</div>
                <h3 className="text-lg font-semibold text-primary mb-3">Generate your types</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Get branded types and ID generators with the right prefix. One file, copy and paste.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-surface rounded-lg p-8 border border-surface/50">
                <div className="text-4xl font-bold text-accent mb-4">03</div>
                <h3 className="text-lg font-semibold text-primary mb-3">TypeScript does the rest</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Pass the wrong ID anywhere in your codebase. TypeScript catches it at compile time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Gets Caught Section */}
        <section className="py-20 px-6 border-t border-surface bg-black/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">What gets caught</h2>
            <p className="text-center text-secondary max-w-2xl mx-auto mb-16">Before and after — the difference that saves your production</p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Before */}
              <div className="bg-surface rounded-lg overflow-hidden border border-red-900/50">
                <div className="bg-red-950 px-4 py-3 border-b border-red-900">
                  <p className="text-xs uppercase tracking-wider font-semibold text-red-400">
                    ❌ Before — compiles, breaks at runtime
                  </p>
                </div>
                <pre className="p-4 text-xs overflow-x-auto">
                  <code className="text-red-300">{`function processOrder(
  userId: string,
  orderId: string
) {
  // Silent bug — nobody notices
  await db.orders.findOne({
    id: userId  // wrong ID
  })
}

processOrder(order.id, user.id)
// args swapped, no error`}</code>
                </pre>
              </div>

              {/* After */}
              <div className="bg-surface rounded-lg overflow-hidden border border-green-900/50">
                <div className="bg-green-950 px-4 py-3 border-b border-green-900">
                  <p className="text-xs uppercase tracking-wider font-semibold text-green-400">
                    ✅ After — caught at compile time
                  </p>
                </div>
                <pre className="p-4 text-xs overflow-x-auto">
                  <code className="text-green-300">{`function processOrder(
  userId: UserId,
  orderId: OrderId
) {
  await db.orders.findOne({
    id: orderId  // correct
  })
}

processOrder(order.id, user.id)
// Type error — caught before ship`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Install Section */}
        <section className="py-20 px-6 border-t border-surface">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">Ready to install?</h2>

            <div className="bg-surface rounded-lg p-8 border border-surface/50 mb-6">
              <div className="space-y-3">
                <p className="text-sm text-tertiary uppercase tracking-wider">Choose your package manager:</p>
                <div className="space-y-2">
                  <p className="font-mono text-sm text-secondary bg-black/50 p-3 rounded border border-surface/50">
                    npm install safeids
                  </p>
                  <p className="font-mono text-sm text-secondary bg-black/50 p-3 rounded border border-surface/50">
                    pnpm add safeids
                  </p>
                  <p className="font-mono text-sm text-secondary bg-black/50 p-3 rounded border border-surface/50">
                    yarn add safeids
                  </p>
                </div>
              </div>
            </div>

            <p className="text-secondary text-sm">
              Zero runtime dependencies. Full TypeScript support. ESM + CJS.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-surface py-8 px-6">
          <div className="max-w-6xl mx-auto text-center text-tertiary text-sm">
            <p>
              safeids is open source.{' '}
              <a href="https://github.com/Abdul-Moiz31/safeids.dev" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                View on GitHub
              </a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
