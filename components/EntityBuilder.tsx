'use client'

import { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
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
    <div className="h-full flex flex-col p-6">
      <h3 className="font-semibold text-sm mb-2">Define Domain</h3>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">Create your entity types</p>

      <div className="flex-1 overflow-y-auto space-y-4 mb-6">
        {entities.map((entity) => (
          <div key={entity.id} className="space-y-2 p-4 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <div>
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1">Name</label>
              <input
                type="text"
                value={entity.name}
                onChange={(e) => handleEntityChange(entity.id, 'name', e.target.value)}
                placeholder="User"
                className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1">Field</label>
              <input
                type="text"
                value={entity.fieldName}
                onChange={(e) => handleEntityChange(entity.id, 'fieldName', e.target.value)}
                placeholder="userId"
                className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1">Prefix</label>
              <input
                type="text"
                value={entity.prefix}
                onChange={(e) => handleEntityChange(entity.id, 'prefix', e.target.value)}
                placeholder="usr"
                className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>

            <button
              onClick={() => handleRemove(entity.id)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition-colors"
            >
              <Trash2 size={14} />
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleAdd}
        className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-neutral-200 dark:border-neutral-800 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors font-medium text-sm"
      >
        <Plus size={16} />
        Add entity
      </button>
    </div>
  )
}
