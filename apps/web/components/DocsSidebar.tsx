'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SECTIONS = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '/docs' },
      { label: 'Installation', href: '/docs/getting-started' },
    ],
  },
  {
    title: 'Core',
    items: [
      { label: 'Concepts', href: '/docs/concepts' },
      { label: 'API Reference', href: '/docs/api' },
    ],
  },
  {
    title: 'Integrations',
    items: [
      { label: 'Zod Schemas', href: '/docs/zod' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { label: 'Examples & Patterns', href: '/docs/examples' },
    ],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 flex-shrink-0">
      <div className="sticky top-20 space-y-6">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="text-[10px] uppercase tracking-widest text-white/25 font-semibold mb-2 px-3">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        active
                          ? 'bg-violet-500/15 text-violet-300 font-medium'
                          : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}
