import { AppliedFilter } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../../../../../../../../../../services/Axios/instance'
import { notEmptyStringOrDefault } from '../../../../../../../../../../../../../../../../standardized/utils/formatters'
import { isObject } from '../../../../../../../../../../../../../../../../standardized/utils/validators'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../../../../../../../../../../../utils/Formatters'
import { City } from '../../../../interface'

export const getOptions = async (
  search: string,
  appliedFilters: AppliedFilter[],
  page: number,
): Promise<{ data: City[]; pagination: { has_next_page: boolean } }> => {
  const params = {
    page,
    ...(search ? { q: search } : {}),
    ...appliedFilters.reduce((params, filter) => {
      return { ...params, [filter.name]: filter.value }
    }, {}),
    contain: ['RegionStates'].join(','),
  }

  const { data: res } = await axios.get(`/v1/region-cities`, { params })

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

    const data: City = {
      foreign_id,
      name: notEmptyStringOrDefault(e.name),
      ...(isObject(e.state)
        ? {
            state_name: notEmptyStringOrDefault(e.state.name),
            state_name_short: notEmptyStringOrDefault(e.state.name_short),
          }
        : {
            state_name: null,
            state_name_short: null,
          }),
    }
    return [...parsed, data]
  }, [] as City[])

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
