'use client'

import { useState } from 'react'
import type { Entity } from '@/lib/types'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { EntityBuilder } from '@/components/EntityBuilder'
import { CodeOutput } from '@/components/CodeOutput'
import { Playground } from '@/components/Playground'
import { Check, Zap, Target } from 'lucide-react'

const STARTER_ENTITIES: Entity[] = [
  { id: '1', name: 'User', fieldName: 'userId', prefix: 'usr' },
  { id: '2', name: 'Order', fieldName: 'orderId', prefix: 'ord' },
  { id: '3', name: 'Product', fieldName: 'productId', prefix: 'prd' },
]

export default function Home() {
  const [entities, setEntities] = useState<Entity[]>(STARTER_ENTITIES)

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Nav />

      <main className="flex flex-col">
        {/* Hero */}
        <Hero />

        {/* Features Section */}
        <section className="w-full py-20 px-6 bg-neutral-50 dark:bg-neutral-950 border-y border-neutral-200 dark:border-neutral-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black dark:bg-white">
                    <Zap className="h-6 w-6 text-white dark:text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Zero Runtime Cost</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">Brands compile away completely. No overhead to your bundle.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black dark:bg-white">
                    <Target className="h-6 w-6 text-white dark:text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Type Safe</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">Pass the wrong ID type anywhere. TypeScript catches it immediately.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black dark:bg-white">
                    <Check className="h-6 w-6 text-white dark:text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Zod Integrated</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">Optional Zod support for runtime validation in APIs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Tool Section */}
        <section className="w-full py-20 px-6 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4">Try it now</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
                Define your entities, generate types, and see type errors in real time.
              </p>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid grid-cols-[320px_1fr_480px] gap-6 h-[700px]">
              {/* Left */}
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col">
                <EntityBuilder entities={entities} onEntitiesChange={setEntities} />
              </div>

              {/* Middle */}
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col">
                <CodeOutput entities={entities} />
              </div>

              {/* Right */}
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col">
                <Playground entities={entities} />
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-6">
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
                <EntityBuilder entities={entities} onEntitiesChange={setEntities} />
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
                <CodeOutput entities={entities} />
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
                <Playground entities={entities} />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-20 px-6 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">How it works</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl">Three simple steps to type-safe IDs</p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -top-6 left-0 w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center font-bold text-white dark:text-black">
                  1
                </div>
                <div className="pt-8 border-l-2 border-neutral-200 dark:border-neutral-800 pl-6">
                  <h3 className="font-semibold text-lg mb-2">Define Domain</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">Tell safeids what entities exist in your app.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -top-6 left-0 w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center font-bold text-white dark:text-black">
                  2
                </div>
                <div className="pt-8 border-l-2 border-neutral-200 dark:border-neutral-800 pl-6">
                  <h3 className="font-semibold text-lg mb-2">Generate Types</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">Copy the generated types to your codebase.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -top-6 left-0 w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center font-bold text-white dark:text-black">
                  3
                </div>
                <div className="pt-8 border-l-2 border-neutral-200 dark:border-neutral-800 pl-6">
                  <h3 className="font-semibold text-lg mb-2">Type Safe</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">TypeScript prevents ID mixups automatically.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Install */}
        <section className="w-full py-20 px-6 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Get started</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">Zero dependencies. Full TypeScript support.</p>

            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-800 space-y-3 font-mono text-sm text-left mb-8">
              <code className="block text-neutral-900 dark:text-neutral-100">npm install safeids</code>
              <code className="block text-neutral-600 dark:text-neutral-400">pnpm add safeids</code>
              <code className="block text-neutral-600 dark:text-neutral-400">yarn add safeids</code>
            </div>

            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Read the{' '}
              <a href="https://github.com/Abdul-Moiz31/safeids.dev" className="font-semibold hover:underline">
                full documentation
              </a>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-12 px-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
          <div className="max-w-6xl mx-auto text-center text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              Built with TypeScript •{' '}
              <a href="https://github.com/Abdul-Moiz31/safeids.dev" className="hover:text-neutral-900 dark:hover:text-neutral-100">
                Open source
              </a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
