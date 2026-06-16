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
      {/* Header */}
      <div className="pb-6 mb-6 border-b border-border-subtle">
        <h3 className="text-sm uppercase tracking-widest font-bold text-text-primary mb-4">Generated Code</h3>

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {(['types', 'zod', 'migration'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs uppercase tracking-wider px-3 py-2 rounded transition-all whitespace-nowrap font-medium ${
                activeTab === tab
                  ? 'bg-accent-primary text-white'
                  : 'text-text-tertiary hover:text-text-secondary border border-border-subtle'
              }`}
            >
              {tab === 'types' && 'Types + IDs'}
              {tab === 'zod' && 'Zod Schemas'}
              {tab === 'migration' && 'Migration guide'}
            </button>
          ))}
        </div>
      </div>

      {/* Code Block */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {isMigration ? (
            <div className="prose prose-invert text-sm space-y-4 pr-4">
              <div className="text-text-secondary whitespace-pre-wrap font-mono text-xs leading-relaxed">
                {code}
              </div>
            </div>
          ) : (
            <pre className="bg-bg-tertiary p-4 rounded-lg overflow-x-auto text-xs leading-relaxed border border-border-subtle">
              <code className="text-accent-light font-mono">{code}</code>
            </pre>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-6 pt-6 border-t border-border-subtle">
        <button
          onClick={handleCopy}
          className="flex-1 px-3 py-2 bg-accent-primary hover:bg-accent-dark text-white text-sm font-semibold rounded-lg transition-all active:scale-95"
        >
          {copied ? '✓ Copied!' : 'Copy Code'}
        </button>
        {!isMigration && (
          <button
            onClick={handleStackBlitz}
            className="flex-1 px-3 py-2 bg-bg-tertiary hover:bg-bg-hover text-text-primary text-sm font-semibold rounded-lg transition-all border border-border-subtle"
          >
            StackBlitz ↗
          </button>
        )}
      </div>
    </div>
  )
}
