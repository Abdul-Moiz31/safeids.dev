// Generates a prefixed, random ID and casts it to the branded type.
// The cast is safe because we control the production of the value.
import type { Brand } from './brand'

function randomSegment(): string {
  const bytes = typeof crypto !== 'undefined' && crypto.getRandomValues
    ? crypto.getRandomValues(new Uint8Array(6))
    : (() => {
        try {
          // eslint-disable-next-line global-require,@typescript-eslint/no-require-imports
          const cryptoModule = require('crypto')
          return cryptoModule.randomBytes(6)
        } catch {
          throw new Error('crypto module not available')
        }
      })()

  return Array.from(bytes as Uint8Array)
    .map((b: number) => b.toString(36))
    .join('')
    .slice(0, 8)
}

export function createId<T extends Brand<string, string>>(prefix?: string): T {
  const segment = randomSegment()
  const id = prefix ? `${prefix}_${segment}` : segment
  return id as unknown as T
}
