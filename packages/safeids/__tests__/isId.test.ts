import { describe, it, expect } from 'vitest'
import { isId } from '../src/isId'
import type { Brand } from '../src/brand'

describe('isId', () => {
  type UserId = Brand<string, 'UserId'>

  it('returns true for valid ID with correct prefix', () => {
    const result = isId<UserId>('user_123', 'user')
    expect(result).toBe(true)
  })

  it('returns false for ID with wrong prefix', () => {
    const result = isId<UserId>('order_123', 'user')
    expect(result).toBe(false)
  })

  it('returns false for empty string', () => {
    const result = isId<UserId>('', 'user')
    expect(result).toBe(false)
  })

  it('returns false for whitespace-only string', () => {
    const result = isId<UserId>('  ', 'user')
    expect(result).toBe(false)
  })

  it('returns false for null', () => {
    const result = isId<UserId>(null, 'user')
    expect(result).toBe(false)
  })

  it('returns false for undefined', () => {
    const result = isId<UserId>(undefined, 'user')
    expect(result).toBe(false)
  })

  it('returns false for non-string values', () => {
    const result1 = isId<UserId>(123, 'user')
    const result2 = isId<UserId>({}, 'user')
    const result3 = isId<UserId>([], 'user')
    expect(result1).toBe(false)
    expect(result2).toBe(false)
    expect(result3).toBe(false)
  })

  it('validates without prefix requirement', () => {
    type GenericId = Brand<string, 'GenericId'>
    const result = isId<GenericId>('anything')
    expect(result).toBe(true)
  })

  it('rejects empty string without prefix', () => {
    type GenericId = Brand<string, 'GenericId'>
    const result = isId<GenericId>('')
    expect(result).toBe(false)
  })
})
