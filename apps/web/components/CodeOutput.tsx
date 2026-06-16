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
      case 'types':
        return generateTypesCode(entities)
      case 'zod':
        return generateZodCode(entities)
      case 'migration':
        return generateMigrationGuide(entities)
    }
  }

  const code = getCode()
  const isMigration = activeTab === 'migration'

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleStackBlitz = () => {
    const codesnippet = encodeURIComponent(generateTypesCode(entities))
    window.open(
      `https://stackblitz.com/edit/nextjs-14-typescript?file=app%2Fpage.tsx&embedded=1&hideExplorer=true&preset=node&devToolsHeight=0`,
      '_blank',
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-surface overflow-x-auto">
        {(['types', 'zod', 'migration'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs uppercase tracking-wider px-3 py-1.5 rounded transition-all whitespace-nowrap font-medium ${
              activeTab === tab
                ? 'bg-accent text-white'
                : 'text-secondary hover:text-primary'
            }`}
          >
            {tab === 'types' && 'Types + IDs'}
            {tab === 'zod' && 'Zod Schemas'}
            {tab === 'migration' && 'Migration guide'}
          </button>
        ))}
      </div>

      {/* Code Block */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {isMigration ? (
            <div className="prose prose-invert text-sm space-y-4 pr-4">
              <div className="text-secondary whitespace-pre-wrap font-mono text-xs leading-relaxed">
                {code}
              </div>
            </div>
          ) : (
            <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed">
              <code className="text-primary font-mono">{code}</code>
            </pre>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-surface">
        <button
          onClick={handleCopy}
          className="flex-1 px-3 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors active:scale-95"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
        {!isMigration && (
          <button
            onClick={handleStackBlitz}
            className="flex-1 px-3 py-2 bg-surface text-primary text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors border border-surface"
          >
            StackBlitz
          </button>
        )}
      </div>
    </div>
  )
}
