'use client'

import { useEffect, useState } from 'react'

interface IdPillProps {
  label: string
  prefix: string
  accentColor?: 'indigo' | 'zinc'
}

export function IdPill({ label, prefix, accentColor = 'indigo' }: IdPillProps) {
  const [id, setId] = useState('')

  useEffect(() => {
    const generateRandomId = () => {
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
      let result = ''
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return result
    }

    setId(`${prefix}_${generateRandomId()}`)

    const interval = setInterval(() => {
      setId(`${prefix}_${generateRandomId()}`)
    }, 3000)

    return () => clearInterval(interval)
  }, [prefix])

  const bgClass = accentColor === 'indigo' ? 'bg-indigo-950 border-indigo-900' : 'bg-zinc-900 border-zinc-800'
  const textClass = accentColor === 'indigo' ? 'text-indigo-300' : 'text-zinc-300'

  return (
    <div className={`inline-flex flex-col items-start gap-1.5 px-4 py-3 rounded-lg border ${bgClass}`}>
      <span className="text-xs font-medium text-tertiary uppercase tracking-wider">{label}</span>
      <span className={`font-mono text-sm font-medium ${textClass}`}>{id}</span>
    </div>
  )
}
