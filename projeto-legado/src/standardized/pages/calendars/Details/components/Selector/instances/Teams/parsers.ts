import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../utils/Formatters'
import { isArray, isObject } from '../../../../../../../../utils/Validators'

import type { Team } from './types'

export const parseTeams = (data: unknown[]): Team[] => {
  if (!isArray(data)) return []

  const content = data.reduce<Team[]>((data, e) => {
    if (!isObject(e)) return data
    const id = numberOrDefault(e.id)
    if (!id) return data

    const parsed: Team = {
      id,
      name: notEmptyStringOrDefault(e.name, ''),
      role: null,
      hierarchy: {
        id: numberOrDefault(e.hierarchy.id, 0),
        name: notEmptyStringOrDefault(e.hierarchy.name, ''),
      },
      user: null,
      child_count: numberOrDefault(e.child_count, 0),
    }

    if (isObject(e.user)) {
      parsed.user = {
        id: numberOrDefault(e.user.id, 0),
        name: notEmptyStringOrDefault(e.user.name, ''),
      }

      if (isObject(e.user.role)) {
        parsed.role = {
          id: numberOrDefault(e.user.role.id, 0),
          name: notEmptyStringOrDefault(e.user.role.name, ''),
        }
      }
    }

    data.push(parsed)
    return data
  }, [])

  return content
}
