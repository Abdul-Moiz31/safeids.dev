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

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    label: 'Zero runtime',
    value: '0 bytes',
    desc: 'Brands are erased at compile time. No overhead to your bundle.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    label: 'Compile-time safety',
    value: '100%',
    desc: 'Pass the wrong ID type anywhere and TypeScript catches it instantly.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    label: 'Zod integration',
    value: 'Built-in',
    desc: 'Optional Zod schemas for runtime validation at API boundaries.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    label: 'Prefixed IDs',
    value: 'usr_…',
    desc: 'Human-readable prefixes like usr_, ord_, prd_ for instant ID recognition.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    label: 'Test coverage',
    value: '20+ tests',
    desc: 'Thoroughly tested edge cases, including Zod and string validation.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    label: 'ESM + CJS',
    value: 'Dual build',
    desc: 'Ships both ESM and CommonJS builds with TypeScript declarations.',
  },
]

const STEPS = [
  { n: '01', title: 'Install', desc: 'One command. No peer deps.' },
  { n: '02', title: 'Define your domain', desc: 'Create branded types for each ID entity.' },
  { n: '03', title: 'Generate & copy', desc: 'Use the builder or write types manually.' },
  { n: '04', title: 'TypeScript enforces', desc: 'Wrong IDs are compile errors from now on.' },
]

export default function Home() {
  const [entities, setEntities] = useState<Entity[]>(STARTER_ENTITIES)

  return (
    <div className="bg-black min-h-screen text-white">
      <Nav />

      {/* ── Hero ── */}
      <Hero />

      {/* ── Features bento grid ── */}
      <section className="relative py-28 px-6">
        {/* subtle glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-violet-950/10 to-black" />
        <div className="relative max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Why safeids</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Everything you need
              <br />
              <span className="text-white/40">to ship type-safe IDs</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  {f.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{f.value}</div>
                <div className="text-sm font-semibold text-white/80 mb-2">{f.label}</div>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Tool ── */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-glow-violet opacity-60" />
        <div className="relative max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Interactive</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Try it live</h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Define entities, generate typed code, and watch type errors appear in real time.
            </p>
          </div>

          {/* tool window */}
          <div className="rounded-3xl border border-white/[0.10] bg-white/[0.02] shadow-glow backdrop-blur-sm overflow-hidden">
            {/* window chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-4 text-xs text-white/25 font-mono">safeids — type-safe ID builder</span>
            </div>

            {/* desktop 3-panel */}
            <div className="hidden lg:grid grid-cols-[280px_1fr_380px] divide-x divide-white/[0.06] h-[640px]">
              <EntityBuilder entities={entities} onEntitiesChange={setEntities} />
              <CodeOutput entities={entities} />
              <Playground entities={entities} />
            </div>

            {/* mobile stacked */}
            <div className="lg:hidden divide-y divide-white/[0.06]">
              <div className="min-h-[320px]">
                <EntityBuilder entities={entities} onEntitiesChange={setEntities} />
              </div>
              <div className="min-h-[320px]">
                <CodeOutput entities={entities} />
              </div>
              <div className="min-h-[420px]">
                <Playground entities={entities} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Process</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">How it works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* connecting line desktop */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative mb-6 w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center font-mono text-xl font-bold text-gradient">
                  {step.n}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Install CTA ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-glow-violet opacity-80" />
        <div className="pointer-events-none absolute inset-0 bg-glow-cyan opacity-60" />

        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-4">Get started</p>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="text-gradient">One command.</span>
            <br />
            Zero bugs.
          </h2>
          <p className="text-white/40 mb-10 max-w-lg mx-auto">
            Drop safeids into any TypeScript project. No config, no schema files, no runtime cost.
          </p>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 mb-8 text-left font-mono text-sm space-y-2.5">
            <p className="text-white">
              <span className="text-white/30 select-none">$ </span>npm install safeids
            </p>
            <p className="text-white/40">
              <span className="text-white/20 select-none">$ </span>pnpm add safeids
            </p>
            <p className="text-white/30">
              <span className="text-white/15 select-none">$ </span>yarn add safeids
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://github.com/Abdul-Moiz31/safeids.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-glow"
            >
              Read the docs
            </a>
            <a
              href="https://www.npmjs.com/package/safeids"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.04] text-white/80 hover:bg-white/[0.08] transition-all text-sm font-medium"
            >
              View on npm
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/25">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">id</span>
            </div>
            <span>safeids</span>
          </div>
          <p>Built with TypeScript. MIT licensed.</p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/Abdul-Moiz31/safeids.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              GitHub
            </a>
            <a href="https://www.npmjs.com/package/safeids" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              npm
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
