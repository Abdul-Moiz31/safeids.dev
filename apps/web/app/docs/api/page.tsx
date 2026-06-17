export const metadata = {
  title: 'API Reference — safeids docs',
}

export default function ApiPage() {
  return (
    <article>
      <Eyebrow>Core</Eyebrow>
      <H1>API Reference</H1>
      <Lead>Complete reference for every export in the safeids package.</Lead>

      {/* ── Types ──────────────────────────────────────── */}
      <Section id="Brand">
        <TypeSignature>{`type Brand<T, TBrand extends string> = T & { readonly [__brand]: TBrand }`}</TypeSignature>
        <p className="text-white/50 text-sm leading-relaxed mb-4">
          The core branded type utility. Intersects <Code>T</Code> with an invisible phantom
          property keyed by a unique symbol. <Code>T</Code> is typically <Code>string</Code> for
          IDs, but can be any type.
        </p>
        <Params
          rows={[
            { name: 'T', type: 'any', desc: 'The base type to brand (usually string).' },
            { name: 'TBrand', type: 'string', desc: 'A string literal that uniquely identifies this brand.' },
          ]}
        />
        <CodeBlock>{`import type { Brand } from 'safeids'

type UserId  = Brand<string, 'UserId'>
type OrderId = Brand<string, 'OrderId'>
type Dollars = Brand<number, 'Dollars'>`}</CodeBlock>
      </Section>

      <Section id="brand">
        <TypeSignature>{`type brand<T, TBrand extends string> = Brand<T, TBrand>`}</TypeSignature>
        <p className="text-white/50 text-sm leading-relaxed mb-4">
          Lowercase alias for <Code>Brand</Code>. Reads more naturally in type declarations and
          is the recommended form for everyday use.
        </p>
        <CodeBlock>{`import { brand } from 'safeids'

type UserId = brand<string, 'UserId'>  // same as Brand<string, 'UserId'>`}</CodeBlock>
      </Section>

      {/* ── Functions ──────────────────────────────────── */}
      <Section id="createId">
        <TypeSignature>{`function createId<T extends Brand<string, string>>(prefix?: string): T`}</TypeSignature>
        <p className="text-white/50 text-sm leading-relaxed mb-4">
          Generates a cryptographically random ID string and casts it to the branded type{' '}
          <Code>T</Code>. Uses <Code>crypto.getRandomValues</Code> in browsers and{' '}
          <Code>crypto.randomBytes</Code> in Node.js, producing a 6-character base-36 string.
        </p>
        <Params
          rows={[
            { name: 'prefix', type: 'string (optional)', desc: 'A short prefix prepended with an underscore. e.g. "usr" → "usr_k2p9xm"' },
          ]}
        />
        <Returns>The branded string ID.</Returns>
        <CodeBlock>{`import { createId } from 'safeids'
import type { UserId, OrderId } from '@/types/ids'

const userId  = createId<UserId>('usr')   // "usr_k2p9xm"
const orderId = createId<OrderId>('ord')  // "ord_f7qrn1"
const anon    = createId<UserId>()        // "a8mn2q" (no prefix)`}</CodeBlock>
      </Section>

      <Section id="fromString">
        <TypeSignature>{`function fromString<T extends Brand<string, string>>(
  value: string,
  prefix?: string
): T`}</TypeSignature>
        <p className="text-white/50 text-sm leading-relaxed mb-4">
          Validates and casts a plain string to a branded type. Use this at trust boundaries —
          for example, when reading an ID from a URL param, request body, or database result.
        </p>
        <Params
          rows={[
            { name: 'value', type: 'string', desc: 'The string to validate and cast.' },
            { name: 'prefix', type: 'string (optional)', desc: 'If provided, throws if value does not start with "prefix_".' },
          ]}
        />
        <Returns>The branded string if validation passes.</Returns>
        <Throws>
          <Code>Error</Code> if <Code>value</Code> is not a non-empty string, or if it doesn't
          match the expected prefix.
        </Throws>
        <CodeBlock>{`import { fromString } from 'safeids'
import type { UserId } from '@/types/ids'

// From URL param in Next.js
const userId = fromString<UserId>(params.userId, 'usr')

// fromString validates before casting
fromString<UserId>('')           // throws: Expected a non-empty string
fromString<UserId>('ord_abc', 'usr') // throws: Expected prefix "usr_"`}</CodeBlock>
      </Section>

      <Section id="isId">
        <TypeSignature>{`function isId<T extends Brand<string, string>>(
  val: unknown,
  prefix?: string
): val is T`}</TypeSignature>
        <p className="text-white/50 text-sm leading-relaxed mb-4">
          Type guard that returns <Code>true</Code> if <Code>val</Code> is a non-empty string
          and (optionally) starts with the given prefix. Narrows the type of <Code>val</Code>{' '}
          to <Code>T</Code> inside the true branch.
        </p>
        <Params
          rows={[
            { name: 'val', type: 'unknown', desc: 'The value to check — can be anything.' },
            { name: 'prefix', type: 'string (optional)', desc: 'If provided, also checks that val starts with "prefix_".' },
          ]}
        />
        <Returns><Code>true</Code> if valid, with type narrowed to <Code>T</Code>.</Returns>
        <CodeBlock>{`import { isId } from 'safeids'
import type { UserId } from '@/types/ids'

function handleRequest(body: unknown) {
  if (!isId<UserId>(body, 'usr')) {
    return Response.json({ error: 'invalid userId' }, { status: 400 })
  }
  // body is now narrowed to UserId
  return getUser(body)
}

isId<UserId>('usr_abc123', 'usr') // true
isId<UserId>('ord_abc123', 'usr') // false (wrong prefix)
isId<UserId>('', 'usr')           // false (empty string)
isId<UserId>(null, 'usr')         // false (not a string)`}</CodeBlock>
      </Section>

      <div className="mt-10 flex gap-4">
        <NavCard href="/docs/zod" title="Zod Integration →" desc="Runtime validation with zodBrand." />
        <NavCard href="/docs/examples" title="Examples →" desc="Real-world patterns and snippets." />
      </div>
    </article>
  )
}

/* ── layout helpers ─────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-2">{children}</p>
}
function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">{children}</h1>
}
function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-2xl">{children}</p>
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
    <pre className="mb-5 rounded-xl border border-white/[0.08] bg-black/60 p-5 overflow-x-auto text-xs leading-relaxed font-mono text-white/70">
      <code>{children}</code>
    </pre>
  )
}
function TypeSignature({ children }: { children: React.ReactNode }) {
  return (
    <pre className="mb-4 px-4 py-3 rounded-lg bg-violet-950/30 border border-violet-500/20 text-sm font-mono text-violet-300 overflow-x-auto">
      <code>{children}</code>
    </pre>
  )
}
function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12 pt-8 border-t border-white/[0.06] first:border-0 first:pt-0 first:mt-0">
      <h2 className="text-xl font-semibold text-white mb-4 font-mono">{id}</h2>
      {children}
    </section>
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
    <p className="text-sm text-white/50 mb-3">
      <span className="text-white/30 font-semibold text-xs uppercase tracking-wider mr-2">Returns</span>
      {children}
    </p>
  )
}
function Throws({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-white/50 mb-4">
      <span className="text-red-400/70 font-semibold text-xs uppercase tracking-wider mr-2">Throws</span>
      {children}
    </p>
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
