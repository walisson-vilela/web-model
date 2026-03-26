import { AppliedFilter } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../../../services/Axios/instance'
import { isObject } from '../../../../../../../../../standardized/utils/validators'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../../utils/Formatters'
import { HierarchyUser } from '../../../../../../types'

const parserOptions = (data: unknown[]): HierarchyUser[] => {
  const parsed = data.reduce<HierarchyUser[]>((acc, item) => {
    if (!isObject(item) || !isObject(item.role) || !isObject(item.person)) {
      return acc
    }

    const userId = numberOrDefault(item.id)

    if (!userId) {
      return acc
    }

    const hierarchyUser: HierarchyUser = {
      id: null,
      user: {
        id: userId,
        name: notEmptyStringOrDefault(item.name),
        role: {
          id: numberOrDefault(item.role.id, 0),
          name: notEmptyStringOrDefault(item.role.name, ''),
        },
        avatar: null,
        person: {
          registration: notEmptyStringOrDefault(item.person.registration, ''),
        },
      },
    }

    if (isObject(item.avatar)) {
      const url = notEmptyStringOrDefault(item.avatar.url)
      if (url) {
        hierarchyUser.user.avatar = {
          url,
          name: notEmptyStringOrDefault(item.avatar.name),
        }
      }
    }

    return [...acc, hierarchyUser]
  }, [] as HierarchyUser[])
  return parsed
}

export const getOptions = async (
  search: string,
  appliedFilters: AppliedFilter[],
  page: number,
  hierarchy_id: number | undefined,
): Promise<{
  data: HierarchyUser[]
  pagination: { has_next_page: boolean }
}> => {
  const params = {
    page,
    ...(search ? { q: search } : {}),
    ...appliedFilters.reduce((params, filter) => {
      return { ...params, [filter.name]: filter.value }
    }, {}),
    ...(hierarchy_id !== undefined ? { hierarchy_id } : {}),
    internal_access: 1,
    master: 0,
  }

  const { data: res } = await axios.get('v1/tr/users/options', { params })

  if (!isObject(res)) {
    throw new Error('Invalid response')
  }

  if (!res.success || !Array.isArray(res.data)) {
    throw new Error('Invalid value response')
  }

  return {
    data: parserOptions(res.data),
    pagination: {
      has_next_page: false,
      ...(isObject(res.pagination)
        ? {
            has_next_page: booleanOrDefault(
              res.pagination.has_next_page,
              false,
            ),
          }
        : {}),
    },
  }
}
