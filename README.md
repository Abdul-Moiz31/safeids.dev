# safeids

> Stop passing the wrong ID. Branded ID types for TypeScript — make ID domain mixups a compile error.

[![npm version](https://img.shields.io/npm/v/safeids)](https://www.npmjs.com/package/safeids)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

**safeids** is a lightweight TypeScript utility for creating branded types that prevent ID domain mixups at compile time. Pass a `UserId` where an `OrderId` is expected? The TypeScript compiler catches it before it ships.

- **Zero runtime overhead** — brands are phantom types that compile away completely
- **Type-safe ID generation** — create and validate IDs with automatic prefix support
- **Optional Zod integration** — validate IDs in API routes and data pipelines
- **No dependencies** — depends only on TypeScript (and optionally Zod)

## Why safeids?

```typescript
// ❌ Without safeids — easy to mix up IDs
function getUser(id: string) { /* ... */ }
function getOrder(id: string) { /* ... */ }

// These compile fine but are probably bugs:
getUser(orderId)   // oops
getOrder(userId)   // oops
```

```typescript
// ✅ With safeids — compile-time safety
type UserId = Brand<string, 'UserId'>
type OrderId = Brand<string, 'OrderId'>

function getUser(id: UserId) { /* ... */ }
function getOrder(id: OrderId) { /* ... */ }

// Type errors! Caught before it ships.
getUser(orderId)   // TS2345: OrderId is not assignable to UserId
getOrder(userId)   // TS2345: UserId is not assignable to OrderId
```

## Quick Start

### Installation

```bash
npm install safeids
# or
pnpm add safeids
# or
yarn add safeids
```

### Define Your Branded IDs

```typescript
import type { Brand } from 'safeids'

type UserId = Brand<string, 'UserId'>
type OrderId = Brand<string, 'OrderId'>
type ProductId = Brand<string, 'ProductId'>
```

### Generate IDs

```typescript
import { createId } from 'safeids'

const userId = createId<UserId>('usr')       // "usr_a1b2c3d4"
const orderId = createId<OrderId>('ord')     // "ord_x9y8z7w6"
const productId = createId<ProductId>('prd') // "prd_r8w1lz9q"
```

### Validate IDs

```typescript
import { fromString, isId } from 'safeids'

// Explicit validation with error handling
const userId = fromString<UserId>('usr_123', 'usr') // ✓
const invalid = fromString<UserId>('ord_123', 'usr') // ✗ Throws

// Type guard for conditional logic
if (isId<UserId>(value, 'usr')) {
  processUser(value) // value is now UserId
}
```

### API Validation (Zod)

```typescript
import { zodBrand } from 'safeids/zod'
import { z } from 'zod'

const UserIdSchema = zodBrand<UserId>('usr')
const OrderIdSchema = zodBrand<OrderId>('ord')

const CreateOrderSchema = z.object({
  userId: UserIdSchema,
  orderId: OrderIdSchema,
})

// In your API route:
const result = CreateOrderSchema.parse(request.body)
// result.userId is now UserId, result.orderId is OrderId
```

## API Reference

### `Brand<T, TBrand>`

A phantom type that marks a value of type `T` as belonging to domain `TBrand`.

```typescript
type UserId = Brand<string, 'UserId'>
type Token = Brand<string, 'ApiToken'>
```

### `createId<T>(prefix?: string): T`

Generates a random ID and casts it to the branded type.

**Signature:**
```typescript
function createId<T extends Brand<string, string>>(prefix?: string): T
```

**Returns:** A string in the format `prefix_randomchars` (or just `randomchars` if no prefix)

**Example:**
```typescript
const id = createId<UserId>('usr') // "usr_k2m9pa"
```

### `fromString<T>(value: string, prefix?: string): T`

Validates that a string matches the expected prefix, then casts to the branded type.

**Signature:**
```typescript
function fromString<T extends Brand<string, string>>(
  value: string,
  prefix?: string
): T
```

**Throws:** If the string is empty, whitespace-only, or doesn't match the prefix

**Example:**
```typescript
const id = fromString<UserId>('usr_123', 'usr') // ✓ Returns UserId
const bad = fromString<UserId>('ord_123', 'usr') // ✗ Throws error
```

### `isId<T>(val: unknown, prefix?: string): val is T`

Type guard that narrows `unknown` to a branded ID type.

**Signature:**
```typescript
function isId<T extends Brand<string, string>>(
  val: unknown,
  prefix?: string
): val is T
```

**Returns:** `true` if `val` is a non-empty string matching the prefix (if provided)

**Example:**
```typescript
if (isId<UserId>(value, 'usr')) {
  // value is UserId here
  processUser(value)
}
```

### `zodBrand<T>(prefix?: string): ZodType<T>`

Creates a Zod schema that validates branded IDs. (Requires `zod` to be installed)

**Signature:**
```typescript
function zodBrand<T extends Brand<string, string>>(prefix?: string): ZodType<T>
```

**Returns:** A Zod schema that refines string validation

**Example:**
```typescript
import { zodBrand } from 'safeids/zod'

const UserIdSchema = zodBrand<UserId>('usr')
const parsed = UserIdSchema.parse('usr_123') // UserId
```

## Monorepo Structure

```
safeids.dev/
├── packages/
│   └── safeids/              # npm library
│       ├── src/              # TypeScript source
│       ├── __tests__/         # Vitest suites (20 tests)
│       ├── dist/              # Compiled outputs (CJS + ESM + types)
│       └── package.json       # Library config
├── apps/
│   └── web/                  # Next.js 14 frontend
│       ├── app/              # App Router pages
│       ├── components/        # React components
│       ├── lib/              # Utilities & code generators
│       └── package.json       # Web config
└── pnpm-workspace.yaml       # Monorepo config
```

## Development

### Install Dependencies

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

Starts the Next.js app on `http://localhost:3000` (or next available port).

### Build

```bash
pnpm build
```

- Builds the npm library (`packages/safeids/dist/`)
- Builds the web app (Next.js production)

### Test

```bash
pnpm test
```

Runs Vitest for the safeids library (20 tests across 4 suites).

## Examples

### Type-Safe Database Queries

```typescript
type UserId = Brand<string, 'UserId'>

async function getUser(id: UserId) {
  return db.users.findUnique({ where: { id } })
}

// This won't compile:
const id = 'some_random_string'
getUser(id) // TS2345: string is not assignable to UserId
```

### API Route Validation

```typescript
// pages/api/users/[id].ts
import { zodBrand } from 'safeids/zod'

const UserIdSchema = zodBrand<UserId>('usr')

export default async function handler(req, res) {
  const { id } = req.query
  
  // Parse and validate before use
  const userId = UserIdSchema.parse(id)
  
  const user = await getUser(userId)
  res.json(user)
}
```

### Migration from `string` IDs

**Before:**
```typescript
function createOrder(userId: string, productId: string) {
  // Easy to pass them in wrong order
}
```

**After:**
```typescript
type UserId = Brand<string, 'UserId'>
type ProductId = Brand<string, 'ProductId'>

function createOrder(userId: UserId, productId: ProductId) {
  // Now impossible to get the order wrong
}
```

## Performance

- **Zero runtime cost** — brands are compile-time only, no execution overhead
- **Type-safe generation** — `createId` uses Web Crypto API (or Node's crypto module)
- **Minimal bundle impact** — utility functions are tree-shakeable

## Browser & Node Support

- **Node.js:** 18.x and later (uses `crypto.getRandomValues` or `crypto.randomBytes`)
- **Browsers:** All modern browsers with Web Crypto API support
- **TypeScript:** 4.9.x and later (for `satisfies` keyword in patterns)

## Testing

The library includes 20 comprehensive tests covering:
- Type safety (mutual exclusion of different brands)
- ID generation (randomness, prefix prepending)
- String parsing (validation, error handling)
- Type guards (edge cases: null, undefined, empty, whitespace)

Run tests with:
```bash
cd packages/safeids
pnpm test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT © 2024 Abdul Moiz

## See Also

- [safeids on npm](https://www.npmjs.com/package/safeids)
- [GitHub Repository](https://github.com/Abdul-Moiz31/safeids.dev)
- [Live Demo](https://safeids.dev)

---

**Made with TypeScript ✨**
