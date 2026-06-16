// Optional Zod integration. Only import if zod is in the user's project.
// Users import from 'safeids/zod' — never from the main bundle.
import { z } from 'zod'
import type { Brand } from './brand'
import { isId } from './isId'

export function zodBrand<T extends Brand<string, string>>(prefix?: string) {
  return z.string().refine(
    (val): val is T => isId<T>(val, prefix),
    { message: prefix ? `Must be a valid ${prefix} ID` : 'Must be a valid branded ID' }
  ) as unknown as z.ZodType<T>
}
