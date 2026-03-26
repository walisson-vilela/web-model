import axios from '../../../../../../../../../services/Axios/instance'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../utils/validators'
import { parseUser } from '../../../../../../services'
import { HierarchyUser } from '../../types'

const parseUsers = (data: unknown[]): HierarchyUser[] => {
  return data.reduce<HierarchyUser[]>((users, e) => {
    const parsed = parseUser(e)
    return parsed ? [...users, parsed] : users
  }, [])
}

export const getSuperiors = async (
  hierarchyId: number,
  level: number,
  userIds: number[],
  search: string,
  page: number,
  except?: number,
) => {
  const params = {
    level,
    user_ids: userIds.join(','),
    ...(search ? { q: search } : {}),
    page,
    ...(except ? { except } : {}),
  }

  const { data: response } = await axios.get(
    `v1/tr/hierarchies/${hierarchyId}/superiors`,
    { params },
  )

  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('Invalid response')
  }

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
