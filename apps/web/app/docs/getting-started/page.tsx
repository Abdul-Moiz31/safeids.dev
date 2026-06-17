export const metadata = {
  title: 'Installation — safeids docs',
}

export default function GettingStartedPage() {
  return (
    <article>
      <Eyebrow>Getting Started</Eyebrow>
      <H1>Installation</H1>
      <Lead>Get safeids into your TypeScript project in under two minutes.</Lead>

      <H2>Install the package</H2>
      <p className="text-white/50 mb-4 text-sm">
        safeids has no runtime dependencies. It works with any TypeScript project — Next.js,
        Remix, Node, tRPC, Prisma, you name it.
      </p>

      <TabGroup
        tabs={[
          { label: 'npm', code: 'npm install safeids' },
          { label: 'pnpm', code: 'pnpm add safeids' },
          { label: 'yarn', code: 'yarn add safeids' },
          { label: 'bun', code: 'bun add safeids' },
        ]}
      />

      <Callout>
        Requires <Code>TypeScript 4.7+</Code> and <Code>strict: true</Code> in your tsconfig.
        The strict flag is what makes branded types incompatible with each other.
      </Callout>

      <H2>Your first branded ID</H2>
      <p className="text-white/50 mb-4 text-sm">
        Create a <Code>src/types/ids.ts</Code> file and define your domain entities:
      </p>
      <CodeBlock filename="src/types/ids.ts">{`import { brand, createId } from 'safeids'

// 1. Declare the branded type
export type UserId  = brand<string, 'UserId'>
export type OrderId = brand<string, 'OrderId'>

// 2. Create a typed ID generator for each entity
export const newUserId  = () => createId<UserId>('usr')
export const newOrderId = () => createId<OrderId>('ord')`}</CodeBlock>

      <H2>Use it everywhere</H2>
      <CodeBlock filename="src/services/user.ts">{`import type { UserId } from '@/types/ids'

// Functions that need a UserId now say so explicitly
export async function getUser(id: UserId) {
  return db.users.findOne({ id })
}

export async function deleteUser(id: UserId) {
  await db.users.delete({ id })
}`}</CodeBlock>

      <H2>Watch TypeScript catch mistakes</H2>
      <CodeBlock>{`import { newUserId, newOrderId } from '@/types/ids'
import { getUser } from '@/services/user'

const userId  = newUserId()   // type: UserId
const orderId = newOrderId()  // type: OrderId

await getUser(userId)   // ✓ fine
await getUser(orderId)  // ✗ Error: Argument of type 'OrderId' is not
                        //   assignable to parameter of type 'UserId'`}</CodeBlock>

      <H2>What the IDs look like at runtime</H2>
      <p className="text-white/50 mb-4 text-sm">
        safeids generates human-readable prefixed IDs using <Code>crypto.randomUUID()</Code> or{' '}
        <Code>crypto.getRandomValues</Code>. The prefix is optional but highly recommended — it
        makes IDs instantly recognisable in logs, databases, and error messages.
      </p>
      <CodeBlock>{`import { createId } from 'safeids'
import type { UserId, OrderId } from '@/types/ids'

const userId  = createId<UserId>('usr')   // → "usr_k2p9xm"
const orderId = createId<OrderId>('ord')  // → "ord_f7qrn1"

// Without a prefix (still typed, just no prefix)
const anon = createId<UserId>()           // → "a8mn2q"`}</CodeBlock>

      <H2>Next steps</H2>
      <div className="grid sm:grid-cols-2 gap-4 mt-2">
        <NavCard href="/docs/concepts" title="Core Concepts →" desc="Learn how branded types work under the hood." />
        <NavCard href="/docs/api" title="API Reference →" desc="Full reference for every export in safeids." />
      </div>
    </article>
  )
}

/* ── shared sub-components ─────────────────────────────────────────── */

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
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
          <span className="text-xs text-white/30 font-mono">{filename}</span>
        </div>
      )}
      <pre className="bg-black/60 p-5 overflow-x-auto text-xs leading-relaxed font-mono text-white/70">
        <code>{children}</code>
      </pre>
    </div>
  )
}
function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4 mb-8 text-sm text-white/60 leading-relaxed">
      ⚠️ {children}
    </div>
  )
}
function NavCard({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <a
      href={href}
      className="block rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all"
    >
      <p className="text-sm font-semibold text-violet-400 mb-1.5">{title}</p>
      <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
    </a>
  )
}
function TabGroup({ tabs }: { tabs: { label: string; code: string }[] }) {
  return (
    <div className="mb-6 rounded-xl border border-white/[0.08] overflow-hidden">
      <div className="flex border-b border-white/[0.06] bg-white/[0.02]">
        {tabs.map((t) => (
          <span key={t.label} className="px-4 py-2.5 text-xs text-white/30 font-mono first:text-white/60 first:border-b-2 first:border-violet-500 first:text-white">
            {t.label}
          </span>
        ))}
      </div>
      <pre className="bg-black/60 p-5 text-sm font-mono text-white/70">
        <code>{tabs[0].code}</code>
      </pre>
    </div>
  )
}
