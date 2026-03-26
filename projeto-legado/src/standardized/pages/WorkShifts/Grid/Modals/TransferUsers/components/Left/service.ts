import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../../services/Axios'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../utils/Validators'
import { User } from '../../interfaces'

const parseUsers = (data: unknown[]): User[] => {
  const parsed = data.reduce<User[]>((parsed, e): User[] => {
    if (!isObject(e) || !isObject(e.person) || !isObject(e.role)) return parsed

    const id = numberOrDefault(e.id)
    if (!id) return parsed

    const role: User['role'] = {
      id: numberOrDefault(e.role.id),
      name: notEmptyStringOrDefault(e.role.name),
    }

    const person: User['person'] = {
      registration: notEmptyStringOrDefault(e.person.registration),
      pis: notEmptyStringOrDefault(e.person.pis),
    }

    const item: User = {
      id,
      name: notEmptyStringOrDefault(e.name),
      role,
      person,
    }
    return [...parsed, item]
  }, [])

  return parsed
}

export const getUsers = async (
  id: number,
  search: string,

  page: number,
): Promise<{
  data: User[]
  pagination: { has_next_page: boolean; page: number; count: number }
}> => {
  const params: GenericObject = {
    ...(search
      ? {
          q: search,
        }
      : {}),
    page,
  }

  const { data: response } = await axios.get(
    `v1/tr/users/by/work-shift/${id}`,
    {
      params,
    },
  )

  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('Invalid response')
  }
  if (!response.success) throw new Error('Response failed')

  return {
    data: parseUsers(response.data),
    pagination: {
      has_next_page: false,
      page: 1,
      count: 0,
      ...(isObject(response.pagination)
        ? {
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
            count: numberOrDefault(response.pagination.count, 0),
            page: numberOrDefault(response.pagination.current_page, 1),
          }
        : {}),
    },
  }
}
