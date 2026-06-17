export const metadata = {
  title: 'Zod Integration — safeids docs',
}

export default function ZodPage() {
  return (
    <article>
      <Eyebrow>Integrations</Eyebrow>
      <H1>Zod Integration</H1>
      <Lead>
        Validate branded IDs at runtime using Zod schemas — perfect for API routes, form
        handlers, and any external input you don't fully trust.
      </Lead>

      <H2>Install Zod</H2>
      <p className="text-white/50 mb-4 text-sm">
        Zod is a peer dependency — install it alongside safeids:
      </p>
      <CodeBlock>{`npm install safeids zod`}</CodeBlock>

      <Callout>
        The Zod integration lives in a separate subpath export —{' '}
        <Code>safeids/zod</Code> — so that projects not using Zod pay no import cost.
      </Callout>

      <H2>zodBrand</H2>
      <TypeSignature>{`function zodBrand<T extends Brand<string, string>>(prefix?: string): z.ZodEffects<z.ZodString, T>`}</TypeSignature>
      <p className="text-white/50 mb-4 text-sm leading-relaxed">
        Returns a Zod schema that validates a string, optionally checks the prefix, and refines
        it to the branded type <Code>T</Code>. On success, Zod infers <Code>T</Code> as the
        output type.
      </p>
      <Params
        rows={[
          { name: 'prefix', type: 'string (optional)', desc: 'If provided, validation fails if the string doesn\'t start with "prefix_".' },
        ]}
      />
      <Returns>A Zod schema with output type <Code>T</Code>.</Returns>

      <H2>Basic usage</H2>
      <CodeBlock filename="src/types/ids.ts">{`import { brand } from 'safeids'
import { zodBrand } from 'safeids/zod'

export type UserId  = brand<string, 'UserId'>
export type OrderId = brand<string, 'OrderId'>

// Zod schemas — validate AND cast to branded type
export const userIdSchema  = zodBrand<UserId>('usr')
export const orderIdSchema = zodBrand<OrderId>('ord')`}</CodeBlock>

      <H2>Validating API route inputs</H2>
      <p className="text-white/50 mb-4 text-sm">
        Use the schemas in your request handlers to validate params or bodies once at the
        boundary — after that, your code works with fully-typed branded IDs throughout.
      </p>
      <CodeBlock filename="app/api/orders/[orderId]/route.ts">{`import { z } from 'zod'
import { orderIdSchema, userIdSchema } from '@/types/ids'

const ParamsSchema = z.object({
  orderId: orderIdSchema,
})

const BodySchema = z.object({
  userId: userIdSchema,
  note:   z.string().min(1).max(500),
})

export async function POST(req: Request, { params }: { params: { orderId: string } }) {
  // validate URL param
  const { orderId } = ParamsSchema.parse(params)
  // orderId is now OrderId — not just string

  // validate request body
  const { userId, note } = BodySchema.parse(await req.json())
  // userId is now UserId

  return addNoteToOrder(orderId, userId, note)
}`}</CodeBlock>

      <H2>Composing into larger schemas</H2>
      <CodeBlock>{`import { z } from 'zod'
import { userIdSchema, orderIdSchema, productIdSchema } from '@/types/ids'

const CreateOrderSchema = z.object({
  userId:     userIdSchema,
  productIds: z.array(productIdSchema).min(1),
  couponCode: z.string().optional(),
})

type CreateOrderInput = z.infer<typeof CreateOrderSchema>
// {
//   userId:     UserId
//   productIds: ProductId[]
//   couponCode: string | undefined
// }`}</CodeBlock>

      <H2>Safe parsing (no-throw)</H2>
      <CodeBlock>{`const result = userIdSchema.safeParse(req.query.userId)

if (!result.success) {
  return Response.json(
    { error: 'Invalid userId', details: result.error.format() },
    { status: 400 }
  )
}

// result.data is UserId
await getUser(result.data)`}</CodeBlock>

      <H2>Handling validation errors</H2>
      <p className="text-white/50 mb-4 text-sm">
        When a branded schema fails, Zod returns a structured error. You can surface this
        directly or map it to your API error format:
      </p>
      <CodeBlock>{`import { ZodError } from 'zod'

try {
  const id = userIdSchema.parse('ord_wrong_prefix')
} catch (err) {
  if (err instanceof ZodError) {
    console.error(err.errors)
    // [{ code: 'custom', message: 'Expected prefix "usr_"', path: [] }]
  }
}`}</CodeBlock>

      <div className="mt-10 flex gap-4">
        <NavCard href="/docs/api" title="← API Reference" desc="Full reference for createId, fromString, isId." />
        <NavCard href="/docs/examples" title="Examples →" desc="Real-world usage patterns." />
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
  return <h2 className="text-xl font-semibold text-white mt-10 mb-3">{children}</h2>
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
function TypeSignature({ children }: { children: React.ReactNode }) {
  return (
    <pre className="mb-4 px-4 py-3 rounded-lg bg-violet-950/30 border border-violet-500/20 text-sm font-mono text-violet-300 overflow-x-auto">
      <code>{children}</code>
    </pre>
  )
}
function Params({ rows }: { rows: { name: string; type: string; desc: string }[] }) {
  return (
    <div className="mb-4 rounded-xl border border-white/[0.08] overflow-hidden text-sm">
      <div className="grid grid-cols-[120px_160px_1fr] px-4 py-2 bg-white/[0.03] border-b border-white/[0.06] text-[10px] uppercase tracking-wider text-white/30">
        <span>Parameter</span><span>Type</span><span>Description</span>
      </div>
      {rows.map((r) => (
        <div key={r.name} className="grid grid-cols-[120px_160px_1fr] px-4 py-3 border-b border-white/[0.04] last:border-0">
          <code className="text-violet-300 text-xs">{r.name}</code>
          <code className="text-cyan-400/70 text-xs">{r.type}</code>
          <span className="text-white/40 text-xs">{r.desc}</span>
        </div>
      ))}
    </div>
  )
}
function Returns({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-white/50 mb-4">
      <span className="text-white/30 font-semibold text-xs uppercase tracking-wider mr-2">Returns</span>
      {children}
    </p>
  )
}
function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-violet-500/20 bg-violet-500/[0.07] p-4 mb-8 text-sm text-white/60 leading-relaxed">
      {children}
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
