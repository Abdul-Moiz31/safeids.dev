'use client'

import { useState } from 'react'
import type { Entity, CodeTab } from '@/lib/types'
import { generateTypesCode, generateZodCode, generateMigrationGuide } from '@/lib/codegen'

interface CodeOutputProps {
  entities: Entity[]
}

export function CodeOutput({ entities }: CodeOutputProps) {
  const [activeTab, setActiveTab] = useState<CodeTab>('types')
  const [copied, setCopied] = useState(false)

  const getCode = () => {
    switch (activeTab) {
      case 'types': return generateTypesCode(entities)
      case 'zod': return generateZodCode(entities)
      case 'migration': return generateMigrationGuide(entities)
    }
  }

  const code = getCode()

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tabs: { key: CodeTab; label: string }[] = [
    { key: 'types', label: 'Types' },
    { key: 'zod', label: 'Zod' },
    { key: 'migration', label: 'Guide' },
  ]

  return (
    <div className="h-full flex flex-col p-5">
      <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-4">
        Generated Code
      </p>

      {/* tabs */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === key
                ? 'bg-white/[0.10] text-white shadow-sm'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* code area */}
      <div className="flex-1 overflow-y-auto rounded-xl bg-black/50 border border-white/[0.06] p-4 mb-4">
        <pre className="text-xs leading-relaxed font-mono text-white/70 whitespace-pre-wrap break-words">
          {code}
        </pre>
      </div>

      <button
        onClick={handleCopy}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        {copied ? '✓ Copied!' : 'Copy code'}
      </button>
    </div>
  )
}
