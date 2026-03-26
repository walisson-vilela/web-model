import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'
import { GenericObject } from '@mw-kit/mw-ui/types'
import { isObject } from 'lodash'

import axios from '../../../../services/Axios'
import { download } from '../../../../utils/DownloadFile'

// Essa função irá fazer a requisição ou extração dos dados.
export const getClassifications = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[] = [],
  extract = false,
): Promise<GenericObject> => {
  const params = {
    page: page,
    limit: 200,

    ...appliedFilters.reduce(
      (params, e) => ({
        ...params,
        [e.name]: e.value,
      }),
      {},
    ),

    ...(extract && ids.length > 0 ? { id: ids.join(',') } : {}),

    ...(search ? { q: search } : {}),

    ...(search ? { q: search } : {}),

    ...(sort || {}),
  }

  const { data: response } = await axios.get(
    `/v1/classifications${extract ? '.xlsx' : ''}`,
    { params },
  )

  if (!isObject(response)) {
    throw new Error('Invalid response')
  }

  // Retornando o conteúdo do body da requisição
  return response
}

// Essa função irá fazer a requisição para extração dos dados
export const extractData = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[],
): Promise<void> => {
  const { success, data } = await getClassifications(
    appliedFilters,
    search,
    sort,
    page,
    ids,
    true,
  )

  success && download(data.url)
}

export const toggleStatus = async (
  active: 1 | 0,
  ids: number[],
): Promise<boolean> => {
  const {
    data: { success },
  } = await axios.put('/v1/classifications/toggle-status', { ids, active })

  return success
}

export const deleteMultiple = async (ids: number[]): Promise<boolean> => {
  const {
    data: { success },
  } = await axios.delete('/v1/classifications/delete-multiple', {
    data: { ids },
  })

  return success
}
