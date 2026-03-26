import axios from '../../../../../services/Axios/instance'
import {
  booleanOrDefault,
  dateOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { notEmptyStringOrDefault } from '../../../../utils/formatters'
import { isObject } from '../../../../utils/validators'

import { UserQueue } from './types'

const parseUserQueues = (data: unknown[]): UserQueue[] => {
  return data.reduce<UserQueue[]>((users, e) => {
    if (!isObject(e) || !isObject(e.user) || !isObject(e.user.role)) {
      return users
    }

    const created = dateOrDefault(e.created, null, 'YYYY-MM-DD HH:mm:ss')
    const priority = numberOrDefault(e.priority, null)
    if (!created || !priority) return users

    const resp: UserQueue = {
      created,
      priority,
      user: {
        id: numberOrDefault(e.user.id, 0),
        name: notEmptyStringOrDefault(e.user.name),
        region_count: numberOrDefault(e.user.region_count, 0),
        role: {
          id: numberOrDefault(e.user.role.id, 0),
          name: notEmptyStringOrDefault(e.user.role.name),
        },
        person: {
          id: numberOrDefault(e.user.person.id, 0),
          registration: notEmptyStringOrDefault(e.user.person.registration),
        },
        avatar: isObject(e.user.avatar)
          ? {
              url: notEmptyStringOrDefault(e.user.avatar.url),
              name: notEmptyStringOrDefault(e.user.avatar.name),
            }
          : null,
      },
    }

    return [...users, resp]
  }, [])
}

export const getUserQueues = async (hierarchyId: number, page: number) => {
  const params = { page }

  const { data: response } = await axios.get(
    `v1/tr/hierarchies/${hierarchyId}/elements/queue`,
    {
      params,
    },
  )

  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('Invalid Response')
  }

  return {
    data: parseUserQueues(response.data),
    pagination: {
      last: true,
      page: 1,
      count: 0,
      ...(isObject(response.pagination)
        ? {
            last: !booleanOrDefault(response.pagination.has_next_page, false),
            count: numberOrDefault(response.pagination.count, 0),
            page: numberOrDefault(response.pagination.current_page, 1),
          }
        : {}),
    },
  }
}
