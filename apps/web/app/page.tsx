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
    <div className="min-h-screen bg-bg-primary">
      <Nav />

      <main className="flex flex-col">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <section className="py-20 px-6 border-t border-border-subtle bg-bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Feature 1 */}
              <div className="p-8 rounded-xl bg-bg-secondary border border-border-subtle hover:border-border-muted transition-all group">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Zero Runtime Cost</h3>
                <p className="text-text-secondary">Branded types are phantom types — they compile away completely, adding zero overhead to your bundle.</p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-xl bg-bg-secondary border border-border-subtle hover:border-border-muted transition-all group">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Type Safe by Default</h3>
                <p className="text-text-secondary">Pass the wrong ID type anywhere in your codebase. TypeScript catches it at compile time, not in production.</p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-xl bg-bg-secondary border border-border-subtle hover:border-border-muted transition-all group">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Zod Integrated</h3>
                <p className="text-text-secondary">Optional Zod integration for runtime validation in API routes and data pipelines.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tool Section */}
        <section className="py-20 px-6 border-t border-border-subtle">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-text-primary mb-4 text-center">Interactive Playground</h2>
            <p className="text-center text-text-secondary max-w-2xl mx-auto mb-16">Define your entities, see the generated types, and test them live with type checking.</p>

            {/* Desktop: 3-column layout */}
            <div className="hidden lg:grid grid-cols-[300px_1fr_500px] gap-6 h-[700px]">
              {/* Left Panel */}
              <div className="bg-bg-secondary rounded-xl p-6 border border-border-subtle overflow-hidden flex flex-col shadow-md">
                <EntityBuilder entities={entities} onEntitiesChange={setEntities} />
              </div>

              {/* Middle Panel */}
              <div className="bg-bg-secondary rounded-xl p-6 border border-border-subtle overflow-hidden flex flex-col shadow-md">
                <CodeOutput entities={entities} />
              </div>

              {/* Right Panel */}
              <div className="bg-bg-secondary rounded-xl p-6 border border-border-subtle overflow-hidden flex flex-col shadow-md">
                <Playground entities={entities} />
              </div>
            </div>

            {/* Mobile: Stack view */}
            <div className="lg:hidden space-y-6">
              <div className="bg-bg-secondary rounded-xl p-6 border border-border-subtle">
                <EntityBuilder entities={entities} onEntitiesChange={setEntities} />
              </div>
              <div className="bg-bg-secondary rounded-xl p-6 border border-border-subtle">
                <CodeOutput entities={entities} />
              </div>
              <div className="bg-bg-secondary rounded-xl p-6 border border-border-subtle">
                <Playground entities={entities} />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-6 border-t border-border-subtle bg-bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-text-primary mb-4 text-center">How It Works</h2>
            <p className="text-center text-text-secondary max-w-2xl mx-auto mb-16">Three simple steps to type-safe IDs</p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-accent-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent-primary">1</span>
                </div>
                <div className="p-8 rounded-xl bg-bg-secondary border border-border-subtle mt-8">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Define Your Domain</h3>
                  <p className="text-text-secondary">Tell safeids what entities you have. User, Order, Product — whatever your app needs.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-accent-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent-primary">2</span>
                </div>
                <div className="p-8 rounded-xl bg-bg-secondary border border-border-subtle mt-8">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Generate Your Types</h3>
                  <p className="text-text-secondary">Get branded types and ID generators with the right prefix. One file, copy and paste.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-accent-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent-primary">3</span>
                </div>
                <div className="p-8 rounded-xl bg-bg-secondary border border-border-subtle mt-8">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">TypeScript Does The Rest</h3>
                  <p className="text-text-secondary">Pass the wrong ID anywhere in your codebase. TypeScript catches it at compile time.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Section */}
        <section className="py-20 px-6 border-t border-border-subtle">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-text-primary mb-4 text-center">What Gets Caught</h2>
            <p className="text-center text-text-secondary max-w-2xl mx-auto mb-16">The difference between runtime bugs and compile-time errors</p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Before */}
              <div className="rounded-xl overflow-hidden border border-error/50 bg-error/5">
                <div className="bg-error/10 px-6 py-4 border-b border-error/50">
                  <p className="text-sm uppercase tracking-wider font-bold text-error">❌ Before — Silent Bug</p>
                </div>
                <pre className="p-6 text-sm overflow-x-auto bg-bg-secondary">
                  <code className="text-error">{`function processOrder(
  userId: string,
  orderId: string
) {
  // Silent bug — args swapped
  await db.orders.findOne({
    id: userId  // wrong ID!
  })
}

processOrder(order.id, user.id)
// No error, ships to production ❌`}</code>
                </pre>
              </div>

              {/* After */}
              <div className="rounded-xl overflow-hidden border border-success/50 bg-success/5">
                <div className="bg-success/10 px-6 py-4 border-b border-success/50">
                  <p className="text-sm uppercase tracking-wider font-bold text-success">✅ After — Caught at Compile</p>
                </div>
                <pre className="p-6 text-sm overflow-x-auto bg-bg-secondary">
                  <code className="text-success">{`function processOrder(
  userId: UserId,
  orderId: OrderId
) {
  await db.orders.findOne({
    id: orderId  // correct
  })
}

processOrder(order.id, user.id)
// Type error — caught before ship ✅`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Install Section */}
        <section className="py-20 px-6 border-t border-border-subtle bg-bg-secondary/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Get Started Now</h2>
            <p className="text-text-secondary mb-12 text-lg">Zero dependencies. Full TypeScript support. ESM + CJS.</p>

            <div className="space-y-4 bg-bg-secondary rounded-xl p-8 border border-border-subtle">
              <p className="text-sm uppercase tracking-wider text-text-tertiary font-semibold">Choose your package manager:</p>
              <div className="space-y-3">
                <code className="block bg-bg-tertiary p-4 rounded-lg text-accent-light text-sm border border-border-subtle">
                  npm install safeids
                </code>
                <code className="block bg-bg-tertiary p-4 rounded-lg text-accent-light text-sm border border-border-subtle">
                  pnpm add safeids
                </code>
                <code className="block bg-bg-tertiary p-4 rounded-lg text-accent-light text-sm border border-border-subtle">
                  yarn add safeids
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border-subtle py-12 px-6 bg-bg-secondary/50">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-text-secondary text-sm">
              Built with TypeScript • Open source •
              <a href="https://github.com/Abdul-Moiz31/safeids.dev" target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:text-accent-light ml-2">
                View on GitHub →
              </a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
