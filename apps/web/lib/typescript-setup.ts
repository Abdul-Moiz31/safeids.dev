import ts from 'typescript'
import { createSystem, createVirtualTypeScriptEnvironment } from '@typescript/vfs'

// safeids library type definitions
const SAFEIDS_TYPES = `
declare const __brand: unique symbol

export type Brand<T, TBrand extends string> = T & { readonly [__brand]: TBrand }
export type brand<T, TBrand extends string> = Brand<T, TBrand>

export function createId<T extends Brand<string, string>>(prefix?: string): T
export function fromString<T extends Brand<string, string>>(
  value: string,
  prefix?: string
): T
export function isId<T extends Brand<string, string>>(
  val: unknown,
  prefix?: string
): val is T

export function zodBrand<T extends Brand<string, string>>(prefix?: string): any
`

const SAMPLE_CODE_SNIPPETS = {
  'Basic ID mixup': `import { brand, createId } from 'safeids'

type UserId  = brand<string, 'UserId'>
type OrderId = brand<string, 'OrderId'>

const userId  = createId<UserId>('usr')
const orderId = createId<OrderId>('ord')

// This function expects a UserId
function getUser(id: UserId): void {
  console.log('Getting user:', id)
}

// BUG: passing orderId where userId is expected
getUser(orderId)
//      ^^^^^^^ Type error — see the red underline

// This is correct:
getUser(userId)
`,
  'API route validation': `import { zodBrand } from 'safeids/zod'
import { z } from 'zod'
import { brand } from 'safeids'

type UserId = brand<string, 'UserId'>
type OrderId = brand<string, 'OrderId'>

const UserIdSchema = zodBrand<UserId>('usr')
const OrderIdSchema = zodBrand<OrderId>('ord')

const CreateOrderSchema = z.object({
  userId: UserIdSchema,
  orderId: OrderIdSchema,
})

// Valid request
const validRequest = {
  userId: 'usr_123',
  orderId: 'ord_456',
}

// This passes validation and is type-safe:
const order = CreateOrderSchema.parse(validRequest)

// BUG: swapped IDs in the request
const buggyRequest = {
  userId: 'ord_456',
  orderId: 'usr_123',
}

// This will fail at parse time
const buggyOrder = CreateOrderSchema.parse(buggyRequest)
`,
  'Database query': `import { brand, createId } from 'safeids'

type UserId = brand<string, 'UserId'>
type PostId = brand<string, 'PostId'>

// Repository pattern with branded IDs
const UserRepository = {
  findById(id: UserId) {
    console.log('SELECT * FROM users WHERE id = ?', id)
    return { id, name: 'John' }
  },
}

const PostRepository = {
  findById(id: PostId) {
    console.log('SELECT * FROM posts WHERE id = ?', id)
    return { id, title: 'My Post' }
  },
}

const userId = createId<UserId>('usr')
const postId = createId<PostId>('post')

// Correct: querying users table with UserId
const user = UserRepository.findById(userId)

// BUG: querying posts table with UserId
const post = PostRepository.findById(userId)
//                          ^^^^^^ Type error — PostId expected
`,
}

export function setupTypeScriptEnvironment(userCode: string, generatedTypes: string) {
  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ES2020,
    lib: ['ES2020', 'DOM'],
    jsx: ts.JsxEmit.React,
    strict: true,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
  }

  const files = new Map<string, string>([
    ['node_modules/safeids/index.d.ts', SAFEIDS_TYPES],
    ['playground.ts', userCode],
    ['safeids-types.ts', generatedTypes],
  ])

  const system = createSystem(files)
  const env = createVirtualTypeScriptEnvironment(system, ['playground.ts'], ts, compilerOptions)

  return env
}

export function getTypeErrors(env: any): Array<{ line: number; message: string }> {
  const diagnostics = ts.getPreEmitDiagnostics(env.languageService.getProgram())

  return diagnostics
    .filter((diag) => {
      // Only show errors in playground.ts
      const fileName = diag.file?.fileName
      return fileName === 'playground.ts'
    })
    .map((diag) => {
      const { line } = diag.file!.getLineAndCharacterOfPosition(diag.start!)
      const message = ts.flattenDiagnosticMessageText(diag.messageText, '\n')
      return {
        line: line + 1,
        message,
      }
    })
}

export function getSampleCode(snippet: keyof typeof SAMPLE_CODE_SNIPPETS): string {
  return SAMPLE_CODE_SNIPPETS[snippet]
}

export const SAMPLE_SNIPPETS = Object.keys(SAMPLE_CODE_SNIPPETS) as Array<
  keyof typeof SAMPLE_CODE_SNIPPETS
>
