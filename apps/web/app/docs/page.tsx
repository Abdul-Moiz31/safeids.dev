import Link from 'next/link'

export const metadata = {
  title: 'Introduction — safeids docs',
}

const CARDS = [
  {
    href: '/docs/getting-started',
    label: 'Installation →',
    desc: 'Install safeids and create your first branded ID in under two minutes.',
  },
  {
    href: '/docs/concepts',
    label: 'Concepts →',
    desc: "Understand how phantom types work and why string isn't always string.",
  },
  {
    href: '/docs/api',
    label: 'API Reference →',
    desc: 'Full reference for createId, fromString, isId, brand, and Brand.',
  },
  {
    href: '/docs/zod',
    label: 'Zod Integration →',
    desc: 'Validate branded IDs at runtime using zodBrand and Zod schemas.',
  },
]

export default function DocsPage() {
  return (
    <article className="prose-docs">
      <div className="mb-2">
        <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">Introduction</span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">safeids</h1>
      <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-2xl">
        A tiny TypeScript library that turns your plain <Code>string</Code> IDs into distinct
        branded types — so passing a <Code>userId</Code> where an <Code>orderId</Code> belongs
        is a compile error, not a production bug.
      </p>

      <Callout color="violet">
        <strong className="text-white">Zero runtime overhead.</strong> Brands are TypeScript-only
        constructs. They compile away completely — your bundle is identical to using plain strings.
      </Callout>

      <H2>The problem</H2>
      <p className="text-white/50 mb-4">
        TypeScript treats all <Code>string</Code> IDs as interchangeable. This compiles without
        error:
      </p>
      <CodeBlock>{`function getOrder(userId: string, orderId: string) {
  return db.orders.findOne({ id: userId }) // oops — wrong ID, no error
}

getOrder(order.id, user.id) // args swapped — still compiles ✓`}</CodeBlock>

      <p className="text-white/50 mb-4">The bug ships. It fails silently at runtime.</p>

      <H2>The solution</H2>
      <p className="text-white/50 mb-4">
        safeids gives each ID type a unique brand. TypeScript now treats <Code>UserId</Code> and{' '}
        <Code>OrderId</Code> as incompatible — even though both are strings at runtime.
      </p>
      <CodeBlock>{`import { brand, createId } from 'safeids'

type UserId  = brand<string, 'UserId'>
type OrderId = brand<string, 'OrderId'>

function getOrder(userId: UserId, orderId: OrderId) {
  return db.orders.findOne({ id: orderId }) // forced to use the right ID
}

const userId  = createId<UserId>('usr')
const orderId = createId<OrderId>('ord')

getOrder(orderId, userId)
//       ^^^^^^^ Error: Argument of type 'OrderId' is not assignable to 'UserId'`}</CodeBlock>

      <H2>Quick start</H2>
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="block rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all group"
          >
            <p className="text-sm font-semibold text-violet-400 mb-1.5 group-hover:text-violet-300">
              {card.label}
            </p>
            <p className="text-sm text-white/40 leading-relaxed">{card.desc}</p>
          </Link>
        ))}
      </div>
    </article>
  )
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

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="rounded-xl border border-white/[0.08] bg-black/60 p-5 overflow-x-auto text-xs leading-relaxed font-mono text-white/70 mb-6">
      <code>{children}</code>
    </pre>
  )
}

function Callout({ children, color = 'violet' }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="rounded-xl border border-violet-500/20 bg-violet-500/[0.07] p-4 mb-8 text-sm text-white/60 leading-relaxed">
      {children}
    </div>
  )
}
