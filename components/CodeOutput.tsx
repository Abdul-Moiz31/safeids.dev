'use client'

import { useState } from 'react'
import { Copy, ExternalLink } from 'lucide-react'
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

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-sm mb-4">Generated Code</h3>

        <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800">
          {(['types', 'zod', 'migration'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-black dark:border-white text-neutral-900 dark:text-white'
                  : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              {tab === 'types' && 'Types'}
              {tab === 'zod' && 'Zod'}
              {tab === 'migration' && 'Guide'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-6">
        {isMigration ? (
          <div className="text-sm whitespace-pre-wrap font-mono text-neutral-700 dark:text-neutral-300">
            {code}
          </div>
        ) : (
          <pre className="text-xs overflow-x-auto">
            <code className="text-neutral-900 dark:text-neutral-100">{code}</code>
          </pre>
        )}
      </div>

      <button
        onClick={handleCopy}
        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors font-medium text-sm"
      >
        <Copy size={16} />
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}
