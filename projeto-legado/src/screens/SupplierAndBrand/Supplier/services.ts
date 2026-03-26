import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../services/Axios/instance'
import { isObject } from '../../../standardized/utils/validators'

export const getAllSuppliers = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[] = [],
  extract: boolean = false,
): Promise<any> => {
  const params = {
    page,
    ...(sort ? { sort: sort.sort, direction: sort.direction } : {}),
    ...(search ? { q: search } : {}),
    ...(extract && ids.length > 0 ? { ids: ids.join(',') } : {}),
    ...appliedFilters.reduce((params, filter) => {
      return { ...params, [filter.name]: filter.value ? 1 : 0 }
    }, {}),
  }

  const { data } = await axios.get(
    `/v1/tr/suppliers${extract ? '.xlsx' : ''}`,
    { params },
  )
  if (!data.success) throw new Error('Invalid Request')
  return data
}

export const deleteSuppliers = async (ids: number[]): Promise<void> => {
  const { data: response } = await axios.delete('/v1/tr/suppliers/delete-ids', {
    data: { ids },
  })

  if (!isObject(response) || response.success !== true) {
    throw new Error('Request Failed', { cause: response })
  }
}

export const toggleStatus = async (
  status: boolean,
  ids: number[],
): Promise<void> => {
  const { data: response } = await axios.put('/v1/tr/suppliers/toggle-status', {
    ids,
    status,
  })

  if (!isObject(response) || response.success !== true) {
    throw new Error('Request Failed', { cause: response })
  }
}
