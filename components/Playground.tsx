'use client'

import { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import type { Monaco } from '@monaco-editor/react'
import { Wand2, AlertCircle } from 'lucide-react'
import {
  setupTypeScriptEnvironment,
  getTypeErrors,
  getSampleCode,
  SAMPLE_SNIPPETS,
} from '@/lib/typescript-setup'
import { generateTypesCode } from '@/lib/codegen'
import type { Entity } from '@/lib/types'

interface PlaygroundProps {
  entities: Entity[]
}

const DEFAULT_CODE = `import { brand, createId } from 'safeids'

type UserId  = brand<string, 'UserId'>
type OrderId = brand<string, 'OrderId'>

const userId  = createId<UserId>('usr')
const orderId = createId<OrderId>('ord')

function getUser(id: UserId): void {
  console.log('Getting user:', id)
}

// Type error: OrderId not assignable to UserId
getUser(orderId)

// Correct usage
getUser(userId)
`

const BUG_FIX_CODE = `import { brand, createId } from 'safeids'

type UserId  = brand<string, 'UserId'>
type OrderId = brand<string, 'OrderId'>

const userId  = createId<UserId>('usr')
const orderId = createId<OrderId>('ord')

function getUser(id: UserId): void {
  console.log('Getting user:', id)
}

function getOrder(id: OrderId): void {
  console.log('Getting order:', id)
}

getUser(userId)
getOrder(orderId)
`

export function Playground({ entities }: PlaygroundProps) {
  const [code, setCode] = useState(DEFAULT_CODE)
  const [errors, setErrors] = useState<Array<{ line: number; message: string }>>([])
  const [selectedSnippet, setSelectedSnippet] =
    useState<(typeof SAMPLE_SNIPPETS)[number]>('Basic ID mixup')
  const editorRef = useRef<any>(null)

  const generatedTypes = generateTypesCode(entities)

  useEffect(() => {
    try {
      const env = setupTypeScriptEnvironment(code, generatedTypes)
      const typeErrors = getTypeErrors(env)
      setErrors(typeErrors)
    } catch (err) {
      console.error('Type checking error:', err)
    }
  }, [code, generatedTypes])

  const handleEditorMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor

    monaco.editor.defineTheme('clean', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#0a0a0a',
        'editorError.foreground': '#dc2626',
      },
    })

    monaco.editor.defineTheme('clean-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#0a0a0a',
        'editor.foreground': '#ffffff',
        'editorError.foreground': '#ef4444',
      },
    })

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    monaco.editor.setTheme(prefersDark ? 'clean-dark' : 'clean')

    const libSource = [
      'declare const __brand: unique symbol',
      'export type Brand<T, TBrand extends string> = T & { readonly [__brand]: TBrand }',
      'export type brand<T, TBrand extends string> = Brand<T, TBrand>',
      'export function createId<T extends Brand<string, string>>(prefix?: string): T',
    ].join('\n')

    monaco.languages.typescript.typescriptDefaults.addExtraLib(libSource, 'node_modules/safeids/index.d.ts')
  }

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  const handleSnippetChange = (snippet: (typeof SAMPLE_SNIPPETS)[number]) => {
    setSelectedSnippet(snippet)
    setCode(getSampleCode(snippet))
  }

  const handleFixBug = () => {
    setCode(BUG_FIX_CODE)
  }

  const goToError = (line: number) => {
    if (editorRef.current) {
      editorRef.current.revealLineInCenter(line)
      editorRef.current.setPosition({ lineNumber: line, column: 1 })
      editorRef.current.focus()
    }
  }

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-sm mb-1">Live Editor</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Click errors to navigate</p>
        </div>

        <select
          value={selectedSnippet}
          onChange={(e) => handleSnippetChange(e.target.value as (typeof SAMPLE_SNIPPETS)[number])}
          className="px-3 py-1.5 text-xs border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-black hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer"
        >
          {SAMPLE_SNIPPETS.map((snippet) => (
            <option key={snippet} value={snippet}>
              {snippet}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-h-0 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 mb-4">
        <Editor
          height="100%"
          language="typescript"
          value={code}
          onChange={handleCodeChange}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollbar: { useShadows: false },
            fontSize: 13,
            fontFamily: "'Geist Mono', monospace",
            lineHeight: 1.6,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>

      {/* Errors */}
      <div>
        {errors.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
            No errors
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
              <AlertCircle size={14} />
              {errors.length} error{errors.length !== 1 ? 's' : ''}
            </div>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {errors.map((error, idx) => (
                <button
                  key={idx}
                  onClick={() => goToError(error.line)}
                  className="w-full text-left flex items-start gap-3 px-2 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded text-xs"
                >
                  <span className="text-neutral-500 dark:text-neutral-400 flex-shrink-0">Line {error.line}</span>
                  <span className="text-neutral-700 dark:text-neutral-300">{error.message}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleFixBug}
        className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2 border border-neutral-200 dark:border-neutral-800 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-sm font-medium"
      >
        <Wand2 size={16} />
        Fix the bug
      </button>
    </div>
  )
}
