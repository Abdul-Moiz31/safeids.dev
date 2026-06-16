import { describe, it, expect } from 'vitest'
import { createId } from '../src/createId'
import type { Brand } from '../src/brand'

describe('createId', () => {
  it('returns a string', () => {
    type UserId = Brand<string, 'UserId'>
    const id = createId<UserId>('user')
    expect(typeof id).toBe('string')
  })

  it('prepends prefix with underscore', () => {
    type OrderId = Brand<string, 'OrderId'>
    const id = createId<OrderId>('order')
    expect(id.startsWith('order_')).toBe(true)
  })

  it('generates random IDs when no prefix is provided', () => {
    type GenericId = Brand<string, 'GenericId'>
    const id1 = createId<GenericId>()
    const id2 = createId<GenericId>()
    expect(typeof id1).toBe('string')
    expect(typeof id2).toBe('string')
    expect(id1).not.toBe(id2)
  })

  it('generates different values on each call', () => {
    type UserId = Brand<string, 'UserId'>
    const id1 = createId<UserId>('user')
    const id2 = createId<UserId>('user')
    expect(id1).not.toBe(id2)
    expect(id1.startsWith('user_')).toBe(true)
    expect(id2.startsWith('user_')).toBe(true)
  })
})
