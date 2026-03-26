/* eslint-disable indent */
import type { AppliedFilter, GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../services/Axios/instance'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'

export const loader: <T>(
  url: string,
  config: {
    appliedFilters: AppliedFilter[]
    search: string
    page: number
    params?: GenericObject
  },
  parser: (data: unknown[]) => T[],
) => Promise<{
  data: T[]
  has_next_page: boolean
  total_registries: number
}> = async (url, config, parser) => {
  const { data: response } = await axios.get(url, {
    params: {
      page: config.page,
      ...(config.search ? { q: config.search } : {}),
      ...(config.params || {}),
      ...(config.appliedFilters
        ? config.appliedFilters.reduce((params, filter) => {
            params[filter.name] = filter.value
            return params
          }, {} as GenericObject)
        : {}),
    },
  })

  if (!isObject(response)) throw new Error('Request returned an invalid data!')
  if (!response.success) throw new Error('Request returned no success!')

  if (!Array.isArray(response.data)) {
    throw new Error('Request returned an invalid data!')
  }

  return {
    data: parser(response.data),
    has_next_page: false,
    total_registries: 0,
    ...(isObject(response.pagination)
      ? {
          has_next_page: booleanOrDefault(
            response.pagination.has_next_page,
            false,
          ),
          total_registries: numberOrDefault(response.pagination.count, 0),
        }
      : {}),
  }
}
