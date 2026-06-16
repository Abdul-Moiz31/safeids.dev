export interface Entity {
  id: string
  name: string
  fieldName: string
  prefix: string
}

export type CodeTab = 'types' | 'zod' | 'migration'
