'use client'

import { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import type { Monaco } from '@monaco-editor/react'
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

// This function expects a UserId
function getUser(id: UserId): void {
  console.log('Getting user:', id)
}

// BUG: passing orderId where userId is expected
getUser(orderId)
//      ^^^^^^^ Type error here

// This is correct:
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

// FIXED: passing userId correctly
getUser(userId)
//      ^^^^^^ ✓ Type-safe

function getOrder(id: OrderId): void {
  console.log('Getting order:', id)
}

getOrder(orderId)
`

export function Playground({ entities }: PlaygroundProps) {
  const [code, setCode] = useState(DEFAULT_CODE)
  const [errors, setErrors] = useState<Array<{ line: number; message: string }>>([])
  const [selectedSnippet, setSelectedSnippet] =
    useState<(typeof SAMPLE_SNIPPETS)[number]>('Basic ID mixup')
  const editorRef = useRef<any>(null)
  const monacoRef = useRef<Monaco | null>(null)

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
    monacoRef.current = monaco

    monaco.editor.defineTheme('safeids-modern', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#252d3d',
        'editor.foreground': '#f8f9fa',
        'editorLineNumber.foreground': '#6b7280',
        'editorCursor.foreground': '#6366f1',
        'editor.selectionBackground': '#6366f133',
        'editorError.foreground': '#ef4444',
        'editorError.squigglyLineBackground': '#ef444433',
      },
    })

    monaco.editor.setTheme('safeids-modern')

    const libSource = [
      'declare const __brand: unique symbol',
      'export type Brand<T, TBrand extends string> = T & { readonly [__brand]: TBrand }',
      'export type brand<T, TBrand extends string> = Brand<T, TBrand>',
      'export function createId<T extends Brand<string, string>>(prefix?: string): T',
      'export function fromString<T extends Brand<string, string>>(value: string, prefix?: string): T',
      'export function isId<T extends Brand<string, string>>(val: unknown, prefix?: string): val is T',
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
    const snippetCode = getSampleCode(snippet)
    setCode(snippetCode)
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.layout()
      }
    }, 100)
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
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="pb-6 mb-6 border-b border-border-subtle flex items-center justify-between">
        <div>
          <h3 className="text-sm uppercase tracking-widest font-bold text-text-primary mb-2">Playground</h3>
          <p className="text-xs text-text-tertiary">Live type checking with Monaco</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedSnippet}
            onChange={(e) => handleSnippetChange(e.target.value as (typeof SAMPLE_SNIPPETS)[number])}
            className="text-xs px-3 py-2 bg-bg-tertiary border border-border-subtle rounded text-text-secondary hover:text-text-primary cursor-pointer transition-all"
          >
            {SAMPLE_SNIPPETS.map((snippet) => (
              <option key={snippet} value={snippet}>
                {snippet}
              </option>
            ))}
          </select>

          <button
            onClick={handleFixBug}
            className="text-xs px-3 py-2 bg-accent-primary/10 text-accent-primary rounded hover:bg-accent-primary/20 transition-colors font-medium border border-accent-primary/20"
          >
            Fix Bug
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-0 rounded-lg overflow-hidden border border-border-subtle mb-4 shadow-md">
        <Editor
          height="100%"
          language="typescript"
          value={code}
          onChange={handleCodeChange}
          onMount={handleEditorMount}
          theme="safeids-modern"
          options={{
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollbar: { useShadows: false, verticalHasArrows: false },
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.6,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      {/* Errors Panel */}
      <div className="border-t border-border-subtle pt-4">
        {errors.length === 0 ? (
          <div className="flex items-center gap-2">
            <div className="text-xs px-3 py-1.5 bg-success/20 text-success rounded-full font-mono font-semibold">
              ✓ No type errors
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-xs text-text-tertiary font-semibold mb-2">
              <span className="inline-block px-2 py-1 bg-error/20 text-error rounded font-mono">
                {errors.length} {errors.length === 1 ? 'error' : 'errors'}
              </span>
            </div>

            <div className="space-y-1 max-h-40 overflow-y-auto">
              {errors.map((error, idx) => (
                <button
                  key={idx}
                  onClick={() => goToError(error.line)}
                  className="w-full flex items-start gap-3 px-3 py-2 bg-bg-tertiary hover:bg-bg-hover rounded transition-colors text-left group cursor-pointer border border-border-subtle"
                >
                  <span className="text-xs font-mono font-bold text-accent-primary mt-0.5 flex-shrink-0">
                    {error.line}
                  </span>
                  <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors flex-1 break-words">
                    {error.message}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
