'use client'

import type { Entity } from '@/lib/types'

interface PlaygroundProps {
  entities: Entity[]
}

export function Playground({ entities }: PlaygroundProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="pb-4 mb-4 border-b border-surface">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold">Type definitions</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        <p className="text-tertiary text-sm">
          As you define entities on the left, the generated type definitions appear here.
        </p>

        {entities.length === 0 ? (
          <div className="py-8 text-center text-tertiary">
            <p className="text-sm">Add entities to generate type definitions</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-secondary font-semibold mb-3">Defined types:</div>
            {entities.map((entity) => (
              <div key={entity.id} className="bg-surface rounded-lg p-3">
                <div className="font-mono text-xs text-accent">
                  {entity.fieldName}
                </div>
                <div className="text-xs text-tertiary mt-1">
                  Prefix: <span className="text-secondary font-mono">{entity.prefix}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-4 mt-6 border-t border-surface">
          <div className="text-xs uppercase tracking-wider text-secondary font-semibold mb-3">Quick reference</div>
          <div className="bg-surface rounded-lg p-3 space-y-2 text-xs text-tertiary">
            <p>
              <span className="text-secondary">Brand:</span> A phantom type that marks domain
            </p>
            <p>
              <span className="text-secondary">createId:</span> Generates prefixed random IDs
            </p>
            <p>
              <span className="text-secondary">fromString:</span> Validates & casts strings
            </p>
            <p>
              <span className="text-secondary">isId:</span> Runtime type guard
            </p>
            <p>
              <span className="text-secondary">zodBrand:</span> Zod schema builder
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
