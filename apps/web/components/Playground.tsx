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
// Hover over the red underline below to see the error
getUser(orderId)
//      ^^^^^^^ Argument of type 'OrderId' is not assignable to parameter of type 'UserId'

// This is correct:
getUser(userId)
`

const BUG_FIX_CODE = `import { brand, createId } from 'safeids'

type UserId  = brand<string, 'UserId'>
type OrderId = brand<string, 'OrderId'>

const userId  = createId<UserId>('usr')
const orderId = createId<OrderId>('ord')

// This function expects a UserId
function getUser(id: UserId): void {
  console.log('Getting user:', id)
}

// FIXED: passing userId where it's expected
getUser(userId)
//      ^^^^^^ ✓ Type-safe

// OrderId stays with the correct function
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

  // Update type errors when code or entities change
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

    // Configure Monaco theme
    monaco.editor.defineTheme('safeids-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#09090B',
        'editor.foreground': '#FAFAFA',
        'editorLineNumber.foreground': '#52525B',
        'editorCursor.foreground': '#6366F1',
        'editor.selectionBackground': '#3F3F4633',
        'editorError.foreground': '#EF4444',
        'editorError.squigglyLineBackground': '#EF444433',
      },
    })

    monaco.editor.setTheme('safeids-dark')

    // Add safeids types as a library
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
    // Reset the snippet after a brief delay for visual feedback
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
    <div className="h-full flex flex-col bg-surface rounded-lg p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold">Playground</h2>

        <div className="flex items-center gap-2">
          <label className="text-xs uppercase tracking-wider text-tertiary">Snippet:</label>
          <select
            value={selectedSnippet}
            onChange={(e) => handleSnippetChange(e.target.value as (typeof SAMPLE_SNIPPETS)[number])}
            className="text-xs px-2 py-1 bg-black/50 border border-surface rounded text-secondary hover:text-primary cursor-pointer"
          >
            {SAMPLE_SNIPPETS.map((snippet) => (
              <option key={snippet} value={snippet}>
                {snippet}
              </option>
            ))}
          </select>

          <button
            onClick={handleFixBug}
            className="ml-2 text-xs px-3 py-1.5 bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors font-medium"
          >
            Fix the bug
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-0 rounded-lg overflow-hidden border border-surface mb-4">
        <Editor
          height="100%"
          language="typescript"
          value={code}
          onChange={handleCodeChange}
          onMount={handleEditorMount}
          theme="safeids-dark"
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
      <div className="border-t border-surface pt-4">
        {errors.length === 0 ? (
          <div className="flex items-center gap-2">
            <div className="text-xs px-2.5 py-1 bg-green-950 text-green-400 rounded-full font-mono font-medium">
              ✓ No type errors
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-xs text-tertiary font-medium mb-2">
              <span className="inline-block px-2 py-1 bg-red-950 text-red-400 rounded font-mono font-semibold">
                {errors.length} {errors.length === 1 ? 'error' : 'errors'}
              </span>
            </div>

            <div className="space-y-1 max-h-40 overflow-y-auto">
              {errors.map((error, idx) => (
                <button
                  key={idx}
                  onClick={() => goToError(error.line)}
                  className="w-full flex items-start gap-3 px-3 py-2 bg-black/30 hover:bg-black/50 rounded transition-colors text-left group cursor-pointer"
                >
                  <span className="text-xs font-mono font-bold text-accent mt-0.5 flex-shrink-0">
                    {error.line}
                  </span>
                  <span className="text-xs text-secondary group-hover:text-primary transition-colors flex-1 break-words">
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
