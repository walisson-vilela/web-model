import { GenericObject } from '@mw-kit/mw-ui/types'

import { isObject } from '../../utils/validators'

import { Role } from './types'

export const changeIndex = <T>(arr: T[], from: number, to: number): T[] => {
  const newArr = [...arr]
  const [e] = newArr.splice(from, 1)
  newArr.splice(to, 0, e)
  return newArr
}

export const addIndex = <T>(arr: T[], i: number, e: T): T[] => {
  const newArr = [...arr]
  newArr.splice(i, 0, e)
  return newArr
}

export const removeIndex = <T>(arr: T[], i: number): T => {
  const [e] = arr.splice(i, 1)
  return e
}

export const getLevelFromId = (id: string): number | null => {
  const prefix = 'levels-'
  if (!id.startsWith(prefix)) {
    return null
  }
  const level = Number(id.slice(prefix.length))
  return isNaN(level) ? null : level
}

export const getRoleStatus = (
  e: GenericObject,
  hierarchy_id: number,
): Role['status'] => {
  if (e.deleted_at !== null) return 'DELETED'

  if (e.status !== 'A') return 'STATUS'

  if (e.internal_access !== false) return 'INTERNAL_ACCESS'

  return (Array.isArray(e.roles_hierarchies) ? e.roles_hierarchies : []).some(
    (e) => {
      return isObject(e) && e.hierarchy_id === hierarchy_id
    },
  )
    ? undefined
    : 'HIERARCHY'
}
