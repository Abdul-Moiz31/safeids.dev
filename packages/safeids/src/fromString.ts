// Runtime-validates that a plain string matches the expected prefix,
// then casts it to the branded type. Throws on mismatch.
import type { Brand } from './brand'

export function fromString<T extends Brand<string, string>>(
  value: string,
  prefix?: string
): T {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Expected a non-empty string, got: ${JSON.stringify(value)}`)
  }
  if (prefix && !value.startsWith(`${prefix}_`)) {
    throw new Error(
      `Expected ID with prefix "${prefix}_" but got: "${value}"`
    )
  }
  return value as unknown as T
}
