import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../services/Axios'
import { download } from '../../../utils/DownloadFile'

// Essa função irá fazer a requisição ou extração dos dados.
export const getTypologies = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[] = [],
  extract: boolean = false,
): Promise<any> => {
  const params: any = { page: page, limit: 200 }

  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))
  if (search) params.q = search
  if (extract && ids.length > 0) params.id = ids.join(',')
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const { data } = await axios.get(
    `/v1/tr/typologies${extract ? '.xlsx' : ''}`,
    {
      params,
    },
  )

  // Retornando o conteúdo do body da requisição
  return data
}

// Essa função irá fazer a requisição para extração dos dados
export const extractData = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[],
): Promise<any> => {
  const { success, data } = await getTypologies(
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
  } = await axios.put('/v1/tr/typologies/toggle-status', {
    active,
    ids,
  })

  return success
}

export const deleteMultiple = async (ids: number[]): Promise<boolean> => {
  const {
    data: { success },
  } = await axios.delete('/v1/tr/typologies/delete-ids', {
    data: { ids },
  })

  return success
}
