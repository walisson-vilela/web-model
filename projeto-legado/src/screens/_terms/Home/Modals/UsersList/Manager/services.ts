import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../../services/Axios'

// Essa função irá fazer a requisição ou extração dos dados.
export const getData = async (
  id: number,
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
): Promise<any> => {
  const params: any = { page, term_id: id }

  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))

  if (search) params.q = search
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const { data } = await axios.get(`/v1/tr/contractor-terms/peoples/index`, {
    params,
  })

  // Retornando o conteúdo do body da requisição
  return data
}
