'use client'

import { useState } from 'react'
import type { Entity } from '@/lib/types'

interface EntityBuilderProps {
  entities: Entity[]
  onEntitiesChange: (entities: Entity[]) => void
}

function suggestFieldName(entityName: string): string {
  return entityName.charAt(0).toLowerCase() + entityName.slice(1) + 'Id'
}

function suggestPrefix(entityName: string): string {
  return entityName.slice(0, 3).toLowerCase()
}

export function EntityBuilder({ entities, onEntitiesChange }: EntityBuilderProps) {
  const handleEntityChange = (
    id: string,
    field: keyof Entity,
    value: string,
  ) => {
    const updated = entities.map((e) => {
      if (e.id !== id) return e
      const updated = { ...e, [field]: value }

      if (field === 'name') {
        updated.fieldName = suggestFieldName(value)
        updated.prefix = suggestPrefix(value)
      }

      return updated
    })
    onEntitiesChange(updated)
  }

  const handleRemove = (id: string) => {
    onEntitiesChange(entities.filter((e) => e.id !== id))
  }

  const handleAdd = () => {
    const newEntity: Entity = {
      id: Date.now().toString(),
      name: '',
      fieldName: '',
      prefix: '',
    }
    onEntitiesChange([...entities, newEntity])
  }

  return (
    <div className="h-full flex flex-col">
      <div className="pb-4 mb-4 border-b border-surface">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold">Define your domain</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {entities.map((entity) => (
          <div key={entity.id} className="bg-surface rounded-lg p-4 space-y-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-tertiary mb-1.5">Entity name</label>
              <input
                type="text"
                value={entity.name}
                onChange={(e) => handleEntityChange(entity.id, 'name', e.target.value)}
                placeholder="e.g. User"
                className="w-full px-3 py-2 bg-black/50 border border-surface rounded-md text-primary placeholder-tertiary focus-visible:outline-accent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-tertiary mb-1.5">ID field name</label>
              <input
                type="text"
                value={entity.fieldName}
                onChange={(e) => handleEntityChange(entity.id, 'fieldName', e.target.value)}
                placeholder="e.g. userId"
                className="w-full px-3 py-2 bg-black/50 border border-surface rounded-md text-primary placeholder-tertiary focus-visible:outline-accent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-tertiary mb-1.5">Prefix</label>
              <input
                type="text"
                value={entity.prefix}
                onChange={(e) => handleEntityChange(entity.id, 'prefix', e.target.value)}
                placeholder="e.g. usr"
                className="w-full px-3 py-2 bg-black/50 border border-surface rounded-md text-primary placeholder-tertiary focus-visible:outline-accent text-sm"
              />
            </div>

            <button
              onClick={() => handleRemove(entity.id)}
              className="w-full text-left px-3 py-1.5 text-sm text-red-400 hover:bg-red-950/30 rounded transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleAdd}
        className="mt-4 pt-4 border-t border-surface w-full px-4 py-2.5 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium"
      >
        + Add entity
      </button>
    </div>
  )
}
