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

function getUser(id: UserId): void {
  console.log('Getting user:', id)
}

// BUG: passing orderId where userId is expected
getUser(orderId)
//      ^^^^^^^ hover to see the type error

getUser(userId) // correct
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

getUser(userId)   // ✓
getOrder(orderId) // ✓
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
      setErrors(getTypeErrors(env))
    } catch {
      // silent
    }
  }, [code, generatedTypes])

  const handleEditorMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor

    monaco.editor.defineTheme('crypton', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: 'a78bfa' },
        { token: 'string', foreground: '34d399' },
        { token: 'comment', foreground: '4b5563', fontStyle: 'italic' },
        { token: 'number', foreground: 'f9a8d4' },
        { token: 'type', foreground: '67e8f9' },
      ],
      colors: {
        'editor.background': '#050508',
        'editor.foreground': '#e5e7eb',
        'editorLineNumber.foreground': '#374151',
        'editorCursor.foreground': '#7c5cfc',
        'editor.selectionBackground': '#7c5cfc22',
        'editorError.foreground': '#f87171',
        'editorError.squigglyLineBackground': '#f8717133',
        'editor.lineHighlightBackground': '#ffffff05',
      },
    })
    monaco.editor.setTheme('crypton')

    const libSource = [
      'declare const __brand: unique symbol',
      'export type Brand<T, TBrand extends string> = T & { readonly [__brand]: TBrand }',
      'export type brand<T, TBrand extends string> = Brand<T, TBrand>',
      'export function createId<T extends Brand<string, string>>(prefix?: string): T',
      'export function fromString<T extends Brand<string, string>>(value: string, prefix?: string): T',
      'export function isId<T extends Brand<string, string>>(val: unknown, prefix?: string): val is T',
    ].join('\n')

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      libSource,
      'node_modules/safeids/index.d.ts',
    )
  }

  const goToError = (line: number) => {
    if (editorRef.current) {
      editorRef.current.revealLineInCenter(line)
      editorRef.current.setPosition({ lineNumber: line, column: 1 })
      editorRef.current.focus()
    }
  }

  return (
    <div className="h-full flex flex-col p-5">
      {/* header row */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">
          Live Playground
        </p>
        <div className="flex items-center gap-2">
          <select
            value={selectedSnippet}
            onChange={(e) => {
              const s = e.target.value as (typeof SAMPLE_SNIPPETS)[number]
              setSelectedSnippet(s)
              setCode(getSampleCode(s))
            }}
            className="text-xs px-2 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white/80 cursor-pointer"
          >
            {SAMPLE_SNIPPETS.map((s) => (
              <option key={s} value={s} className="bg-zinc-900">
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={() => setCode(BUG_FIX_CODE)}
            className="text-xs px-3 py-1 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors font-medium border border-violet-500/20"
          >
            Fix bug
          </button>
        </div>
      </div>

      {/* editor */}
      <div className="flex-1 min-h-0 rounded-xl overflow-hidden border border-white/[0.08] mb-3">
        <Editor
          height="100%"
          language="typescript"
          value={code}
          onChange={(v) => v !== undefined && setCode(v)}
          onMount={handleEditorMount}
          theme="crypton"
          options={{
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollbar: { useShadows: false },
            fontSize: 12,
            fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
            lineHeight: 1.7,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            padding: { top: 14, bottom: 14 },
            scrollBeyondLastLine: false,
            renderLineHighlight: 'line',
          }}
        />
      </div>

      {/* errors panel */}
      <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3 max-h-28 overflow-y-auto">
        {errors.length === 0 ? (
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            No type errors
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">
              {errors.length} {errors.length === 1 ? 'error' : 'errors'}
            </p>
            {errors.map((err, i) => (
              <button
                key={i}
                onClick={() => goToError(err.line)}
                className="w-full flex items-start gap-3 text-left px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors"
              >
                <span className="text-[10px] font-mono text-violet-400 flex-shrink-0 mt-0.5">
                  L{err.line}
                </span>
                <span className="text-xs text-white/50">{err.message}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
