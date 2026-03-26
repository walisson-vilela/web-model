import { AppliedFilter, GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../services/Axios/instance'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import { User } from '../../interfaces'

const parsePDVS = (data: unknown[]): User[] => {
  return data.reduce<User[]>((parsed, e): User[] => {
    if (!isObject(e)) return parsed

    const id = numberOrDefault(e.id)
    if (!id) return parsed

    const item: User = {
      id,
      name: notEmptyStringOrDefault(e.name),
      role_name: isObject(e.role) ? notEmptyStringOrDefault(e.role.name) : null,
    }
    return [...parsed, item]
  }, [])
}

export const getUsers = async (
  search: string,
  id: number,
  filters: AppliedFilter[],
  page: number,
): Promise<{ data: User[]; pagination: { has_next_page: boolean } }> => {
  const params: GenericObject = {
    ...filters.reduce(
      (params, filter) => ({
        ...params,
        [filter.name]: filter.value,
      }),
      {},
    ),
    ...(search
      ? {
          q: search,
        }
      : {}),
    page,
  }

  const { data: response } = await axios.get(`v1/tr/users/by/region/${id}`, {
    params,
  })

  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('Invalid response')
  }
  if (!response.success) throw new Error('Response failed')

  return {
    data: parsePDVS(response.data),
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
