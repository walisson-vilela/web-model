import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../services/Axios'
import { download } from '../../../utils/DownloadFile'

export const getContractors = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[] = [],
  extract: boolean = false,
): Promise<any> => {
  const params: any = {
    page: page,
  }

  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))
  if (extract && ids.length > 0) params.id = ids.join(',')
  if (search) params.q = search
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const { data } = await axios.get(
    `/v1/file-processes${extract ? '.xlsx' : ''}`,
    { params },
  )

  if (!data.success) throw new Error('Request returned no sucess!')

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
  const { success, data } = await getContractors(
    appliedFilters,
    search,
    sort,
    page,
    ids,
    true,
  )

  success && download(data.url)
}

export const deleteMultiple = async (ids: number[]): Promise<void> => {
  const params = { ids }

  const { data } = await axios.delete(`/v1/file-processes/delete-multiple`, {
    data: params,
  })

  if (!data.success) throw new Error('Request returned no sucess!')
}

export const toggleStatus = async (
  ids: number[],
  status: string,
): Promise<void> => {
  const params = { ids, status }

  const { data } = await axios.put(`/v1/file-processes/toggle-status`, params)

  if (!data.success) throw new Error('Request returned no sucess!')
}
