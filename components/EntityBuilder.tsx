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
      {/* Header */}
      <div className="pb-6 mb-6 border-b border-border-subtle">
        <h3 className="text-sm uppercase tracking-widest font-bold text-text-primary mb-2">Define Your Domain</h3>
        <p className="text-xs text-text-tertiary">Create branded types for your entities</p>
      </div>

      {/* Entities List */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {entities.map((entity) => (
          <div key={entity.id} className="p-4 rounded-lg bg-bg-secondary border border-border-subtle hover:border-border-muted transition-all">
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-text-tertiary font-semibold mb-2">Entity Name</label>
                <input
                  type="text"
                  value={entity.name}
                  onChange={(e) => handleEntityChange(entity.id, 'name', e.target.value)}
                  placeholder="e.g. User"
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-subtle rounded-md text-text-primary placeholder-text-muted text-sm hover:border-border-muted focus:border-accent-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-text-tertiary font-semibold mb-2">ID Field Name</label>
                <input
                  type="text"
                  value={entity.fieldName}
                  onChange={(e) => handleEntityChange(entity.id, 'fieldName', e.target.value)}
                  placeholder="e.g. userId"
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-subtle rounded-md text-text-primary placeholder-text-muted text-sm hover:border-border-muted focus:border-accent-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-text-tertiary font-semibold mb-2">Prefix</label>
                <input
                  type="text"
                  value={entity.prefix}
                  onChange={(e) => handleEntityChange(entity.id, 'prefix', e.target.value)}
                  placeholder="e.g. usr"
                  className="w-full px-3 py-2 bg-bg-tertiary border border-border-subtle rounded-md text-text-primary placeholder-text-muted text-sm hover:border-border-muted focus:border-accent-primary transition-colors"
                />
              </div>

              <button
                onClick={() => handleRemove(entity.id)}
                className="w-full px-3 py-2 text-sm text-error hover:bg-error/10 rounded transition-colors font-medium"
              >
                ✕ Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={handleAdd}
        className="mt-6 pt-6 border-t border-border-subtle w-full px-4 py-3 bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary rounded-lg transition-colors text-sm font-semibold"
      >
        + Add Entity
      </button>
    </div>
  )
}
