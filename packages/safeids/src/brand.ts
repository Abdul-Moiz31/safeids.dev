// The core branded type. Uses a phantom type — no runtime cost.
// Brand<T, Name> creates a type that is structurally identical to T
// but cannot be assigned where a different Brand<T, OtherName> is expected.
declare const __brand: unique symbol
export type Brand<T, TBrand extends string> = T & { readonly [__brand]: TBrand }

// Convenience alias
export type brand<T, TBrand extends string> = Brand<T, TBrand>
