import { describe, it, expect } from 'vitest'
import { fromString } from '../src/fromString'
import type { Brand } from '../src/brand'

describe('fromString', () => {
  it('returns the string value on correct prefix', () => {
    type UserId = Brand<string, 'UserId'>
    const id = fromString<UserId>('user_123', 'user')
    expect(id).toBe('user_123')
  })

  it('throws on wrong prefix', () => {
    type UserId = Brand<string, 'UserId'>
    expect(() => {
      fromString<UserId>('order_123', 'user')
    }).toThrow('Expected ID with prefix "user_" but got: "order_123"')
  })

  it('throws on empty string', () => {
    type UserId = Brand<string, 'UserId'>
    expect(() => {
      fromString<UserId>('', 'user')
    }).toThrow('Expected a non-empty string')
  })

  it('throws on whitespace-only string', () => {
    type UserId = Brand<string, 'UserId'>
    expect(() => {
      fromString<UserId>('  ', 'user')
    }).toThrow('Expected a non-empty string')
  })

  it('works without prefix validation', () => {
    type GenericId = Brand<string, 'GenericId'>
    const id = fromString<GenericId>('anything')
    expect(id).toBe('anything')
  })

  it('validates non-empty without prefix', () => {
    type GenericId = Brand<string, 'GenericId'>
    expect(() => {
      fromString<GenericId>('')
    }).toThrow('Expected a non-empty string')
  })
})
