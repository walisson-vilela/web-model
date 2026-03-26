import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../services/Axios'
import { download } from '../../../utils/DownloadFile'
import { booleanOrDefault, numberOrDefault } from '../../../utils/Formatters'
import { isObject } from '../../../utils/Validators'

import { BodyInterface } from './interfaces'
import productParser from './parser'

const request = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page?: number,
  ids?: number[],
  extract?: boolean,
) => {
  const params = {
    ...(page ? { page: page } : { limit: 200 }),
    ...appliedFilters.reduce((filter, e) => {
      return { ...filter, [e.name]: e.value }
    }, {}),
    ...(sort ? sort : {}),
    ...(search ? { q: search } : {}),
    ...(ids && ids.length > 0 ? { id: ids.join(',') } : {}),
  }

  const data = await axios.get(`/v1/tr/products${extract ? '.xlsx' : ''}`, {
    params,
  })

  return data
}

export const getProducts = async (
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
  const { data: response } = await request(appliedFilters, search, sort, page)
  if (!Array.isArray(response.data)) throw new Error('invalid response')

  return {
    data: productParser(response.data),
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

export const extractData = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[],
): Promise<any> => {
  const {
    data: { success, data },
  } = await request(appliedFilters, search, sort, page, ids, true)

  success && download(data.url)
}

export const toggleStatus = async (
  status: boolean,
  ids: number[],
): Promise<void> => {
  await axios.put('/v1/tr/products/toggle-status', {
    ids,
    status,
  })
}

export const deleteMultiple = async (ids: number[]): Promise<void> => {
  await axios.delete('/v1/tr/products/delete-ids', {
    data: { ids },
  })
}
