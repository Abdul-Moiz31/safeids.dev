# safeids

Branded ID types for TypeScript — make ID domain mixups a compile error.

## Overview

`safeids` provides a lightweight utility for creating branded types in TypeScript. It ensures that IDs of different domains (e.g., `UserId` and `OrderId`) cannot be accidentally mixed up, catching mistakes at compile time rather than runtime.

## Features

- **Zero runtime cost**: Brands are phantom types — they compile away completely
- **Type safety**: IDs of different domains are structurally incompatible at the type level
- **Prefix validation**: Optional runtime validation for ID prefixes
- **Zod integration**: Optional built-in support for schema validation
- **No dependencies**: Depends only on TypeScript (and optionally Zod)

## Installation

```bash
npm install safeids
# or
pnpm add safeids
# or
yarn add safeids
```

## Usage

### Creating Branded ID Types

```typescript
import type { Brand } from 'safeids'

type UserId = Brand<string, 'UserId'>
type OrderId = Brand<string, 'OrderId'>
```

### Generating IDs

```typescript
import { createId } from 'safeids'

const userId = createId<UserId>('user')    // e.g., "user_a1b2c3d4"
const orderId = createId<OrderId>('order') // e.g., "order_x9y8z7w6"
```

### Type Safety in Action

```typescript
function processUser(id: UserId) {
  // ...
}

const userId = createId<UserId>('user')
const orderId = createId<OrderId>('order')

processUser(userId)   // ✓ OK
processUser(orderId)  // ✗ Type error: OrderId is not assignable to UserId
```

### Runtime Validation

```typescript
import { fromString, isId } from 'safeids'

// Throws if prefix doesn't match
const userId = fromString<UserId>('user_123', 'user') // ✓
const invalid = fromString<UserId>('order_123', 'user') // ✗ Throws

// Returns boolean for conditional checks
if (isId<UserId>(value, 'user')) {
  processUser(value)
}
```

### Zod Integration (Optional)

```typescript
import { zodBrand } from 'safeids/zod'

const userIdSchema = zodBrand<UserId>('user')
const result = userIdSchema.parse('user_123') // ✓ Returns UserId
const invalid = userIdSchema.parse('order_123') // ✗ Throws validation error
```

## API

### `Brand<T, TBrand>`

A phantom type that marks a value of type `T` as having been validated for use case `TBrand`.

```typescript
type UserId = Brand<string, 'UserId'>
```

### `createId<T>(prefix?: string): T`

Generates a random prefixed ID and casts it to the branded type.

```typescript
const id = createId<UserId>('user') // "user_abc123de"
```

### `fromString<T>(value: string, prefix?: string): T`

Validates that a string matches the expected prefix, then casts to the branded type. Throws if validation fails.

```typescript
const id = fromString<UserId>('user_123', 'user') // ✓
const bad = fromString<UserId>('order_123', 'user') // ✗ Throws
```

### `isId<T>(val: unknown, prefix?: string): val is T`

Type guard that narrows `unknown` to a branded ID type.

```typescript
if (isId<UserId>(value, 'user')) {
  // value is now UserId
}
```

### `zodBrand<T>(prefix?: string): ZodType<T>`

Creates a Zod schema that validates branded IDs. Requires `zod` to be installed.

```typescript
import { zodBrand } from 'safeids/zod'

const schema = zodBrand<UserId>('user')
const id = schema.parse('user_123') // UserId
```

## License

MIT
