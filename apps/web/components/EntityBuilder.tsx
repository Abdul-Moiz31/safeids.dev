'use client'

import type { Entity } from '@/lib/types'

interface EntityBuilderProps {
  entities: Entity[]
  onEntitiesChange: (entities: Entity[]) => void
}

function suggestFieldName(name: string) {
  return name.charAt(0).toLowerCase() + name.slice(1) + 'Id'
}
function suggestPrefix(name: string) {
  return name.slice(0, 3).toLowerCase()
}

export function EntityBuilder({ entities, onEntitiesChange }: EntityBuilderProps) {
  const handleChange = (id: string, field: keyof Entity, value: string) => {
    onEntitiesChange(
      entities.map((e) => {
        if (e.id !== id) return e
        const next = { ...e, [field]: value }
        if (field === 'name') {
          next.fieldName = suggestFieldName(value)
          next.prefix = suggestPrefix(value)
        }
        return next
      }),
    )
  }

  const handleRemove = (id: string) => onEntitiesChange(entities.filter((e) => e.id !== id))

  const handleAdd = () =>
    onEntitiesChange([
      ...entities,
      { id: Date.now().toString(), name: '', fieldName: '', prefix: '' },
    ])

  return (
    <div className="h-full flex flex-col p-5">
      <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-4">
        Define Domain
      </p>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {entities.map((entity) => (
          <div
            key={entity.id}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 space-y-3"
          >
            {(['name', 'fieldName', 'prefix'] as const).map((field) => (
              <div key={field}>
                <label className="block text-[10px] uppercase tracking-wider text-white/30 mb-1.5">
                  {field === 'name' ? 'Entity name' : field === 'fieldName' ? 'ID field' : 'Prefix'}
                </label>
                <input
                  type="text"
                  value={entity[field]}
                  onChange={(e) => handleChange(entity.id, field, e.target.value)}
                  placeholder={
                    field === 'name' ? 'User' : field === 'fieldName' ? 'userId' : 'usr'
                  }
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/[0.08] text-white/80 placeholder-white/20 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
            ))}
            <button
              onClick={() => handleRemove(entity.id)}
              className="w-full text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/10 py-1.5 rounded-lg transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleAdd}
        className="mt-4 w-full py-2.5 rounded-xl border border-dashed border-white/[0.12] text-white/40 hover:text-white/70 hover:border-white/25 text-sm transition-colors"
      >
        + Add entity
      </button>
    </div>
  )
}
