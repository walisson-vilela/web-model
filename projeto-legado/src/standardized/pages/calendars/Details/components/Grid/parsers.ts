import {
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../utils/Formatters'
import { isObject } from '../../../../../../utils/Validators'

import type { UserEvents, UserOptions } from './types'

export const parseUserEvent = (data: unknown[]): UserEvents[] => {
  const content = data.reduce<UserEvents[]>((acc, item) => {
    if (
      !isObject(item) ||
      !isObject(item.user) ||
      !isObject(item.user.person) ||
      !isObject(item.role)
    ) {
      return acc
    }

    const interruptedAt = dateOrDefault(
      item.interrupted_at,
      null,
      'YYYY-DD-MM HH:mm:ss',
    )
    const obj: UserEvents = {
      hierarchy_count: numberOrDefault(item.hierarchy_count, 0),
      interrupted_at: interruptedAt ? new Date(interruptedAt) : null,
      user: {
        id: numberOrDefault(item.user.id, 0),
        name: notEmptyStringOrDefault(item.user.name, ''),
        person: {
          id: numberOrDefault(item.user.person.id, 0),
          registration: notEmptyStringOrDefault(
            item.user.person.registration,
            '',
          ),
        },
      },
      role: {
        id: numberOrDefault(item.role.id, 0),
        name: notEmptyStringOrDefault(item.role.name, ''),
      },
    }

    acc.push(obj)
    return acc
  }, [])

  return content
}

export const parseUserOptions = (data: unknown[]) => {
  return data.reduce<UserOptions[]>((acc, item) => {
    if (!isObject(item)) return acc

    const id = numberOrDefault(item.id)
    const starts_at = dateOrDefault(item.starts_at, null, 'YYYY-MM-DD HH:mm:ss')
    const ends_at = dateOrDefault(item.ends_at, null, 'YYYY-MM-DD HH:mm:ss')
    if (!id || !starts_at || !ends_at) return acc

    acc.push({
      id,
      name: notEmptyStringOrDefault(item.name, ''),
      starts_at,
      ends_at,
    })

    return acc
  }, [])
}
