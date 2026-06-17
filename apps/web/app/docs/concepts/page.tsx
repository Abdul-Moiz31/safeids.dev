export const metadata = {
  title: 'Concepts — safeids docs',
}

export default function ConceptsPage() {
  return (
    <article>
      <Eyebrow>Core</Eyebrow>
      <H1>Concepts</H1>
      <Lead>
        How branded types work in TypeScript — and why they give you compile-time ID safety
        with zero runtime cost.
      </Lead>

      <H2>The structural typing problem</H2>
      <p className="text-white/50 mb-4 text-sm leading-relaxed">
        TypeScript uses <em className="text-white/70">structural typing</em>: two types are
        compatible if they have the same shape. A <Code>string</Code> is always compatible with
        another <Code>string</Code>, no matter what you call it:
      </p>
      <CodeBlock>{`type UserId  = string
type OrderId = string

function getUser(id: UserId) { /* ... */ }

const orderId: OrderId = 'ord_abc123'
getUser(orderId) // ✓ no error — both are just string`}</CodeBlock>

      <p className="text-white/50 mb-6 text-sm">
        Renaming a type alias to <Code>UserId</Code> doesn't create a new type — it's still{' '}
        <Code>string</Code> under the hood. TypeScript happily accepts any string in its place.
      </p>

      <H2>Branded types (nominal typing)</H2>
      <p className="text-white/50 mb-4 text-sm leading-relaxed">
        The trick is to attach a unique, invisible property to the type — one that can never
        exist at runtime. TypeScript uses this property to distinguish the types structurally,
        even though at runtime the value is still a plain string.
      </p>
      <CodeBlock>{`// The raw Brand utility type (what safeids uses internally)
declare const __brand: unique symbol

type Brand<T, TBrand extends string> =
  T & { readonly [__brand]: TBrand }

// Now UserId and OrderId are structurally different types
type UserId  = Brand<string, 'UserId'>
type OrderId = Brand<string, 'OrderId'>`}</CodeBlock>

      <Callout color="violet">
        <strong className="text-white">Key insight:</strong> <Code>unique symbol</Code> creates a
        type-level symbol that can never be re-declared. The <Code>[__brand]</Code> property
        never exists on the actual runtime object — it only exists in the type system.
      </Callout>

      <H2>Why this works</H2>
      <p className="text-white/50 mb-4 text-sm leading-relaxed">
        After branding, TypeScript sees <Code>UserId</Code> and <Code>OrderId</Code> as
        structurally different — because they have different <Code>[__brand]</Code> values. Even
        though both carry a plain string at runtime:
      </p>
      <CodeBlock>{`import { brand, createId } from 'safeids'

type UserId  = brand<string, 'UserId'>
type OrderId = brand<string, 'OrderId'>

const userId:  UserId  = createId<UserId>('usr')  // → "usr_k2p9xm"
const orderId: OrderId = createId<OrderId>('ord') // → "ord_f7qrn1"

// At runtime, both values are plain strings.
// TypeScript treats them as incompatible types:
function getUser(id: UserId) {}

getUser(userId)   // ✓
getUser(orderId)  // ✗ Error: Argument of type 'OrderId' is not
                  //   assignable to parameter of type 'UserId'`}</CodeBlock>

      <H2>Zero runtime overhead</H2>
      <p className="text-white/50 mb-4 text-sm leading-relaxed">
        The brand is a TypeScript-only construct. After compilation, <Code>UserId</Code> and{' '}
        <Code>OrderId</Code> are just <Code>string</Code>. There is no runtime wrapper, no
        object, no extra memory — just a plain string value with compile-time type safety layered
        on top.
      </p>
      <CodeBlock>{`// TypeScript source
const userId: UserId = createId<UserId>('usr')

// Compiled JavaScript output
const userId = createId('usr')
// → exactly "usr_k2p9xm" — a plain string`}</CodeBlock>

      <H2>Casting — getting values in and out</H2>
      <p className="text-white/50 mb-4 text-sm leading-relaxed">
        Because brands don't exist at runtime, you can't create a branded value from a plain
        string without an explicit cast. safeids provides two helpers for this:
      </p>
      <CodeBlock>{`import { fromString, isId } from 'safeids'
import type { UserId } from '@/types/ids'

// fromString: cast a validated string to a branded type
// Throws if the string is empty or prefix doesn't match
const id = fromString<UserId>('usr_abc123', 'usr')

// isId: type guard — returns true if value looks like the ID
if (isId<UserId>(maybeId, 'usr')) {
  // maybeId is now narrowed to UserId here
  await getUser(maybeId)
}`}</CodeBlock>

      <H2>Widening back to string</H2>
      <p className="text-white/50 mb-4 text-sm leading-relaxed">
        A branded ID is a subtype of <Code>string</Code>, so you can always widen it back to a
        plain string — for example when passing to a third-party library or JSON serialization:
      </p>
      <CodeBlock>{`const userId: UserId = createId<UserId>('usr')

// UserId extends string, so this is always safe
const raw: string = userId

JSON.stringify({ id: userId }) // works — it's just a string`}</CodeBlock>

      <div className="mt-10 flex gap-4">
        <NavCard href="/docs/api" title="API Reference →" desc="Full reference for every function." />
        <NavCard href="/docs/examples" title="Examples →" desc="Real patterns you can copy." />
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
function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="mb-6 rounded-xl border border-white/[0.08] bg-black/60 p-5 overflow-x-auto text-xs leading-relaxed font-mono text-white/70">
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
