import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../utils/Formatters'
import { isArray, isObject } from '../../../../../../../../utils/Validators'

import type { User } from './types'

export const parseUsers = (data: unknown[]): User[] => {
  if (!isArray(data)) return []

  const users = data.reduce<User[]>((acc, item) => {
    if (!isObject(item)) return acc

    acc.push({
      id: numberOrDefault(item.id),
      name: notEmptyStringOrDefault(item.name),
      role: {
        id: numberOrDefault(item.role.id),
        name: notEmptyStringOrDefault(item.role.name),
      },
      person: {
        registration: notEmptyStringOrDefault(item.person.registration),
      },
    })

    return acc
  }, [])

  return users
}
