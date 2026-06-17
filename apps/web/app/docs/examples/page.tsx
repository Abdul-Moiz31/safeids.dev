export const metadata = {
  title: 'Examples — safeids docs',
}

export default function ExamplesPage() {
  return (
    <article>
      <Eyebrow>Guides</Eyebrow>
      <H1>Examples & Patterns</H1>
      <Lead>
        Copy-paste patterns for the most common safeids use cases: databases, API routes,
        React, tRPC, and more.
      </Lead>

      {/* ── 1 ── */}
      <H2>1. Define all IDs in one file</H2>
      <p className="text-white/50 mb-4 text-sm leading-relaxed">
        Keep all branded types and generators in a single <Code>src/types/ids.ts</Code>. Import
        from there everywhere — no circular deps, easy to audit.
      </p>
      <CodeBlock filename="src/types/ids.ts">{`import { brand, createId } from 'safeids'
import { zodBrand } from 'safeids/zod'

// ── Types ────────────────────────────────────────────────────
export type UserId    = brand<string, 'UserId'>
export type OrderId   = brand<string, 'OrderId'>
export type ProductId = brand<string, 'ProductId'>
export type InvoiceId = brand<string, 'InvoiceId'>

// ── Generators ───────────────────────────────────────────────
export const newUserId    = () => createId<UserId>('usr')
export const newOrderId   = () => createId<OrderId>('ord')
export const newProductId = () => createId<ProductId>('prd')
export const newInvoiceId = () => createId<InvoiceId>('inv')

// ── Zod schemas ──────────────────────────────────────────────
export const userIdSchema    = zodBrand<UserId>('usr')
export const orderIdSchema   = zodBrand<OrderId>('ord')
export const productIdSchema = zodBrand<ProductId>('prd')
export const invoiceIdSchema = zodBrand<InvoiceId>('inv')`}</CodeBlock>

      {/* ── 2 ── */}
      <H2>2. Database queries with Prisma</H2>
      <p className="text-white/50 mb-4 text-sm leading-relaxed">
        Branded IDs work seamlessly with Prisma. TypeScript prevents you from passing the
        wrong ID to the wrong query — even across deeply nested function calls.
      </p>
      <CodeBlock filename="src/services/orders.ts">{`import { prisma } from '@/lib/prisma'
import { fromString } from 'safeids'
import type { UserId, OrderId } from '@/types/ids'

export async function getOrdersForUser(userId: UserId) {
  return prisma.order.findMany({ where: { userId } })
}

export async function getOrder(orderId: OrderId) {
  return prisma.order.findUniqueOrThrow({ where: { id: orderId } })
}

// Usage — TypeScript enforces the correct ID at every call site
await getOrder(userId)
// ✗ Error: Argument of type 'UserId' is not assignable to 'OrderId'`}</CodeBlock>

      {/* ── 3 ── */}
      <H2>3. Next.js App Router — route params</H2>
      <p className="text-white/50 mb-4 text-sm leading-relaxed">
        URL params arrive as plain strings. Cast them to branded types at the route boundary
        using <Code>fromString</Code> or a Zod schema — then the rest of the route is type-safe.
      </p>
      <CodeBlock filename="app/orders/[orderId]/page.tsx">{`import { fromString } from 'safeids'
import { orderIdSchema } from '@/types/ids'
import { getOrder } from '@/services/orders'

interface Props {
  params: { orderId: string }
}

export default async function OrderPage({ params }: Props) {
  // Option A: fromString (throws on invalid input)
  const orderId = fromString<OrderId>(params.orderId, 'ord')

  // Option B: Zod (structured error)
  const orderId = orderIdSchema.parse(params.orderId)

  const order = await getOrder(orderId) // orderId is OrderId ✓
  return <div>{order.id}</div>
}`}</CodeBlock>

      {/* ── 4 ── */}
      <H2>4. Next.js App Router — API route</H2>
      <CodeBlock filename="app/api/orders/route.ts">{`import { z } from 'zod'
import { userIdSchema, productIdSchema } from '@/types/ids'
import { createOrder } from '@/services/orders'

const Body = z.object({
  userId:     userIdSchema,
  productIds: z.array(productIdSchema).min(1),
})

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json())
  if (!parsed.success) {
    return Response.json({ error: parsed.error.format() }, { status: 422 })
  }

  const { userId, productIds } = parsed.data
  // userId: UserId, productIds: ProductId[] — fully typed
  const order = await createOrder(userId, productIds)
  return Response.json(order, { status: 201 })
}`}</CodeBlock>

      {/* ── 5 ── */}
      <H2>5. React component props</H2>
      <p className="text-white/50 mb-4 text-sm leading-relaxed">
        Pass branded IDs as component props to carry type safety into the UI layer.
      </p>
      <CodeBlock>{`import type { UserId, OrderId } from '@/types/ids'

interface OrderCardProps {
  orderId:  OrderId
  userId:   UserId
  onDelete: (id: OrderId) => void
}

export function OrderCard({ orderId, userId, onDelete }: OrderCardProps) {
  return (
    <div>
      <button onClick={() => onDelete(orderId)}>Delete</button>
      {/* onDelete(userId) would be a compile error here */}
    </div>
  )
}`}</CodeBlock>

      {/* ── 6 ── */}
      <H2>6. tRPC procedures</H2>
      <CodeBlock filename="server/routers/order.ts">{`import { z } from 'zod'
import { router, protectedProcedure } from '@/server/trpc'
import { orderIdSchema, userIdSchema } from '@/types/ids'
import { getOrder, getOrdersForUser } from '@/services/orders'

export const orderRouter = router({
  byId: protectedProcedure
    .input(z.object({ orderId: orderIdSchema }))
    .query(({ input }) => getOrder(input.orderId)),
    // input.orderId is OrderId — not string

  byUser: protectedProcedure
    .input(z.object({ userId: userIdSchema }))
    .query(({ input }) => getOrdersForUser(input.userId)),
})`}</CodeBlock>

      {/* ── 7 ── */}
      <H2>7. Migrating an existing codebase</H2>
      <p className="text-white/50 mb-4 text-sm leading-relaxed">
        You don't have to migrate everything at once. Start with the most error-prone ID
        pairs, fix the type errors, and expand incrementally.
      </p>
      <CodeBlock>{`// Step 1: define the branded type alongside the old one
type UserId = brand<string, 'UserId'>

// Step 2: update the service that owns the entity
export async function getUser(id: UserId) { /* ... */ }

// Step 3: fix call sites one by one
// Old: getUser(someString)
// New: getUser(fromString<UserId>(someString, 'usr'))

// Step 4: update generators — replace crypto.randomUUID() with createId
const userId = createId<UserId>('usr')   // was: crypto.randomUUID()

// Step 5: repeat for the next entity`}</CodeBlock>

      <div className="mt-10 flex gap-4">
        <NavCard href="/docs/api" title="← API Reference" desc="Full reference for all exports." />
        <NavCard href="/docs/zod" title="← Zod Integration" desc="Runtime validation patterns." />
      </div>
    </article>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-2">{children}</p>
}
function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">{children}</h1>
}
function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-2xl">{children}</p>
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold text-white mt-12 mb-3 pt-8 border-t border-white/[0.06] first:border-0 first:pt-0 first:mt-0">{children}</h2>
}
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-white/[0.07] border border-white/[0.08] text-violet-300 text-[0.85em] font-mono">
      {children}
    </code>
  )
}
function CodeBlock({ children, filename }: { children: React.ReactNode; filename?: string }) {
  return (
    <div className="mb-6 rounded-xl border border-white/[0.08] overflow-hidden">
      {filename && (
        <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
          <span className="text-xs text-white/30 font-mono">{filename}</span>
        </div>
      )}
      <pre className="bg-black/60 p-5 overflow-x-auto text-xs leading-relaxed font-mono text-white/70">
        <code>{children}</code>
      </pre>
    </div>
  )
}
function NavCard({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <a
      href={href}
      className="flex-1 block rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all"
    >
      <p className="text-sm font-semibold text-violet-400 mb-1.5">{title}</p>
      <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
    </a>
  )
}
