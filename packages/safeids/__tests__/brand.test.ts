import { describe, it, expectTypeOf } from 'vitest'
import type { Brand } from '../src/brand'

describe('Brand', () => {
  it('creates distinct types that are not mutually assignable', () => {
    type UserId = Brand<string, 'UserId'>
    type OrderId = Brand<string, 'OrderId'>

    const userId: UserId = 'user_123' as UserId
    const orderId: OrderId = 'order_456' as OrderId

    // Type-level check: these should not be assignable to each other
    // @ts-expect-error UserId should not be assignable to OrderId
    const _invalid1: OrderId = userId

    // @ts-expect-error OrderId should not be assignable to UserId
    const _invalid2: UserId = orderId

    // But they're both strings at runtime
    expectTypeOf(userId).toMatchTypeOf<string>()
    expectTypeOf(orderId).toMatchTypeOf<string>()
  })
})
