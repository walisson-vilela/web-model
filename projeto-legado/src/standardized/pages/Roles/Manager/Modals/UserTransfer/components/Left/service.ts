import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../../services/Axios/instance'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../utils/Validators'
import { User } from '../../interfaces'

const parseUsers = (data: unknown[]): User[] => {
  const parsed = data.reduce<User[]>((parsed, e): User[] => {
    if (!isObject(e) || !isObject(e.person)) return parsed

    const id = numberOrDefault(e.id)
    if (!id) return parsed

    const item: User = {
      id,
      name: notEmptyStringOrDefault(e.name),
      registration: notEmptyStringOrDefault(e.person.registration),
    }
    return [...parsed, item]
  }, [])

  return parsed
}

export const getUsers = async (
  search: string,
  role_id: number,

  page: number,
): Promise<{ data: User[]; pagination: { has_next_page: boolean } }> => {
  const params: GenericObject = {
    ...(search
      ? {
          q: search,
        }
      : {}),
    page,
    role_id,
  }

  const { data: response } = await axios.get('v1/tr/users/options', {
    params,
  })

  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('Invalid response')
  }
  if (!response.success) throw new Error('Response failed')

  return {
    data: parseUsers(response.data),
    pagination: {
      has_next_page: false,
      ...(isObject(response.pagination)
        ? {
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
          }
        : {}),
    },
  }
}
