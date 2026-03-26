import type { Permissions } from '../types'

export const PERMISSIONS: Permissions = {
  BREAK: { label: 'Interromper', value: 'BREAK' },
  REMOVE: { label: 'Remover', value: 'REMOVE' },
  NONE: { label: '', value: 'NONE' },
} as const
