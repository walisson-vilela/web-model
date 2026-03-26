import { AppliedFilter } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../../../../../../../../../services/Axios/instance'
import { notEmptyStringOrDefault } from '../../../../../../../../../../../../../../../standardized/utils/formatters'
import { isObject } from '../../../../../../../../../../../../../../../standardized/utils/validators'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../../../../../../../../../../utils/Formatters'
import { Flags } from '../../../../interface'

export const getOptions = async (
  search: string,
  appliedFilters: AppliedFilter[],
  page: number,
): Promise<{ data: Flags[]; pagination: { has_next_page: boolean } }> => {
  const params = {
    page,
    ...(search ? { q: search } : {}),
    ...appliedFilters.reduce((params, filter) => {
      return { ...params, [filter.name]: filter.value }
    }, {}),
    level: 3,
    contain: 'NetworkFlag',
  }

  const { data: res } = await axios.get(`/v1/tr/markets/options`, {
    params,
  })

  if (!isObject(res)) {
    throw new Error('Invalid response')
  }

  if (!res.success || !Array.isArray(res.data)) {
    throw new Error('Invalid value response')
  }

  const parsed = res.data.reduce((parsed, e) => {
    if (!isObject(e)) return parsed

    const foreign_id = numberOrDefault(e.id)

    if (!foreign_id) return parsed

    const data: Flags = {
      foreign_id,
      name: notEmptyStringOrDefault(e.name),

      ...(isObject(e.network)
        ? {
            chain: notEmptyStringOrDefault(e.network.name),

            ...(isObject(e.network.group)
              ? {
                  group: notEmptyStringOrDefault(e.network.group.name),
                }
              : {
                  group: null,
                }),
          }
        : {
            chain: null,
            group: null,
          }),
    }
    return [...parsed, data]
  }, [] as Flags[])

  return {
    data: parsed,
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
