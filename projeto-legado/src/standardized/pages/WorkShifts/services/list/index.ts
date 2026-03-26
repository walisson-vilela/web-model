import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../services/Axios/instance'
import { download } from '../../../../../utils/DownloadFile'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isObject } from '../../../../utils/validators'
import { WorkShift } from '../../types'

import workShiftsParser from './parser'

type Options = {
  search?: string
  sort?: SortState | null
  appliedFilters?: FiltersInterfaces.AppliedFilter[]
  active?: boolean
  electronic_point?: boolean
}

const request = async (
  options: Options &
    (
      | {
          extract?: false
          page?: number
        }
      | {
          extract: true
          ids?: number[]
        }
    ),
) => {
  const { search, sort, appliedFilters, extract, active, electronic_point } =
    options

  const params = {
    ...(() => {
      if (!extract) {
        return options.page ? { page: options.page } : {}
      }

      return options.ids ? { ids: options.ids } : {}
    })(),

    ...(search ? { q: search } : {}),

    ...(active !== undefined ? { active: active ? 1 : 0 } : {}),
    ...(electronic_point !== undefined
      ? { electronic_point: electronic_point ? 1 : 0 }
      : {}),

    ...appliedFilters?.reduce(
      (params, filter) => ({ ...params, [filter.name]: filter.value }),
      {},
    ),

    ...(sort || {}),
  }

  const { data } = await axios.get(
    `v1/tr/work-shifts${extract ? '.xlsx' : ''}`,
    {
      params,
    },
  )

  if (!isObject(data)) {
    throw new Error('Request returned an invalid data')
  }

  if (!data.success) {
    throw new Error('Request returned no success')
  }

  // Retornando o conteúdo do body da requisição
  return data
}

export const getWorkShifts = async (
  options: Options & { page: number },
): Promise<{
  data: WorkShift[]
  pagination: {
    has_next_page: boolean
    count: number
    page: number
  }
}> => {
  const response = await request(options)

  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('Invalid response')
  }

  if (!response.success) throw new Error('Response failed')

  return {
    data: workShiftsParser(response.data),
    pagination: {
      has_next_page: false,
      count: 0,
      page: 1,

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

export const extractWorkShifts = async (
  options: Options & { ids?: number[] },
): Promise<void> => {
  const response = await request({
    extract: true,
    ...options,
  })

  if (!isObject(response) || !isObject(response.data)) {
    throw new Error('Request returned an invalid data')
  }

  const url = notEmptyStringOrDefault(response.data.url)

  if (!url) {
    throw new Error('Request returned an invalid data')
  }

  download(response.data.url)
}
