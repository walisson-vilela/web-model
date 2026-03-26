import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../../services/Axios'
import { download } from '../../../../utils/DownloadFile'
import { booleanOrDefault, numberOrDefault } from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'
import { notEmptyStringOrDefault } from '../../../utils/formatters'

import { BodyInterface } from './interfaces'
import { parsePerson } from './parser'

const request = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  extract = false,
) => {
  const params = {
    ...(extract ? {} : { page: page }),

    ...(search ? { q: search } : {}),

    ...appliedFilters.reduce((params, filter) => {
      return { ...params, [filter.name]: filter.value }
    }, {}),

    ...(sort ? { sort: sort.sort, direction: sort.direction } : {}),
  }

  const { data } = await axios.get(`/v1/tr/persons${extract ? '.xlsx' : ''}`, {
    params,
  })

  if (!isObject(data)) {
    throw new Error('Request returned an invalid data')
  }

  if (!data.success) {
    throw new Error('Request returned no success')
  }

  // Retornando o conteúdo do body da requisição
  return data
}

export const list = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
): Promise<{
  data: BodyInterface[]
  pagination: {
    has_next_page: boolean
    count: number
  }
}> => {
  const response = await request(appliedFilters, search, sort, page)
  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('Invalid response')
  }

  if (!response.success) throw new Error('Response failed')

  const data = parsePerson(response.data)

  return {
    data: data,
    pagination: {
      has_next_page: false,
      count: 0,
      ...(isObject(response.pagination)
        ? {
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
            count: numberOrDefault(response.pagination.count, 0),
          }
        : {}),
    },
  }
}

export const extract = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
): Promise<void> => {
  const response = await request(appliedFilters, search, sort, page, true)

  if (!isObject(response) || !isObject(response.data)) {
    throw new Error('Request returned an invalid data')
  }

  const url = notEmptyStringOrDefault(response.data.url)

  if (!url) {
    throw new Error('Request returned an invalid data')
  }

  download(response.data.url)
}
