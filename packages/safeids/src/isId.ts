// Type guard — narrows unknown to a branded ID type.
import type { Brand } from './brand'

export function isId<T extends Brand<string, string>>(
  val: unknown,
  prefix?: string
): val is T {
  if (typeof val !== 'string' || val.trim() === '') return false
  if (prefix && !val.startsWith(`${prefix}_`)) return false
  return true
}
