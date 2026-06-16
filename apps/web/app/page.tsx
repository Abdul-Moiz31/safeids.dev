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

        {/* Footer */}
        <footer className="border-t border-surface py-8 px-6">
          <div className="max-w-6xl mx-auto text-center text-tertiary text-sm">
            <p>
              safeids is open source.{' '}
              <a href="https://github.com/anthropics/safeids" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                View on GitHub
              </a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
