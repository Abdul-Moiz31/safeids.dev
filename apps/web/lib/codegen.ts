import type { Entity } from './types'

export function generateTypesCode(entities: Entity[]): string {
  if (entities.length === 0) {
    return `import { brand, createId } from 'safeids'

// No entities defined yet`
  }

  const typeLines = entities
    .map((e) => `type ${e.fieldName.replace(/Id$/, '')}${e.fieldName.endsWith('Id') ? 'Id' : 'Id'}  = brand<string, '${e.fieldName.replace(/Id$/, '')}${e.fieldName.endsWith('Id') ? 'Id' : 'Id'}'>`)

  const idLines = entities
    .map((e) => {
      const typeName = e.fieldName.replace(/Id$/, '') + (e.fieldName.endsWith('Id') ? 'Id' : 'Id')
      return `const ${e.fieldName.replace(/([A-Z])/g, '_$1').toLowerCase().slice(1)} = createId<${typeName}>('${e.prefix}')`
    })

  return `import { brand, createId } from 'safeids'

// Branded types — ID domain mixups are now compile errors
${typeLines.join('\n')}

// ID generators — typed and prefixed
${idLines.join('\n')}`
}

export function generateZodCode(entities: Entity[]): string {
  if (entities.length === 0) {
    return `import { zodBrand } from 'safeids/zod'
import { z } from 'zod'

// No entities defined yet`
  }

  const schemaLines = entities
    .map((e) => {
      const typeName = e.fieldName.replace(/Id$/, '') + (e.fieldName.endsWith('Id') ? 'Id' : 'Id')
      return `const ${e.fieldName.replace(/([A-Z])/g, '_$1').toLowerCase().slice(1)}Schema = zodBrand<${typeName}>('${e.prefix}')`
    })

  const exampleSchema = `
// Usage in API route validation:
const CreateRequestSchema = z.object({
${entities.map((e) => `  ${e.fieldName}: ${e.fieldName.replace(/([A-Z])/g, '_$1').toLowerCase().slice(1)}Schema`).join(',\n')}
})`

  return `import { zodBrand } from 'safeids/zod'
import { z } from 'zod'

${schemaLines.join('\n')}
${exampleSchema}`
}

export function generateMigrationGuide(entities: Entity[]): string {
  if (entities.length === 0) {
    return `# Migration Guide

Add entities to get started.`
  }

  const steps = [
    `## Step 1: Install safeids

\`\`\`bash
npm install safeids
\`\`\``,

    `## Step 2: Create a types file

Create \`src/types/ids.ts\` with your branded ID types:

\`\`\`typescript
${generateTypesCode(entities)}
\`\`\``,

    `## Step 3: Replace string types

Before:
\`\`\`typescript
${entities.map((e) => `function get${e.name}(id: string) { /* ... */ }`).join('\n')}
\`\`\`

After:
\`\`\`typescript
${entities.map((e) => {
      const typeName = e.fieldName.replace(/Id$/, '') + (e.fieldName.endsWith('Id') ? 'Id' : 'Id')
      return `function get${e.name}(id: ${typeName}) { /* ... */ }`
    }).join('\n')}
\`\`\``,

    `## Step 4: Update function signatures

All your existing functions now have type-safe ID parameters.
The compiler will catch any ID domain mixups.`,

    `## Step 5: Validate at API boundaries

Use Zod schemas to validate IDs in your API routes:

\`\`\`typescript
${generateZodCode(entities)}
\`\`\``,
  ]

  return steps.join('\n\n')
}
