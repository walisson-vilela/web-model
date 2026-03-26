import { Event } from '../../types'

export type Permission = 'BREAK' | 'REMOVE' | 'NONE'

export type Permissions = {
  [key in Permission]: {
    label: string
    value: Permission
  }
}

export type FilterValues = {
  permission: Permissions[Permission]
  entire_day: number
}

export type Row = { event: Event } & FilterValues & {
    id: number
    label: string
  }

export type { Event }
