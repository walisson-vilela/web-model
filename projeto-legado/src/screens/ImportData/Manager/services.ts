import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../services/Axios'
import { FormTypes } from '../interfaces'

// Essa função irá fazer a requisição ou extração dos dados.
export const getFiles = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  type: FormTypes,
  ids: number[] = [],
  extract: boolean = false,
): Promise<any> => {
  const params: any = { page, type, contain: 'Files' }

  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))
  if (extract && ids.length > 0) params.id = ids.join(',')
  if (search) params.q = search
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const { data } = await axios.get('/v1/file-imports', { params })

  // Retornando o conteúdo do body da requisição
  return data
}
