import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../../services/Axios'

// Essa função irá fazer a requisição ou extração dos dados.
export const getData = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  extract: boolean = false,
): Promise<any> => {
  const params: any = { page }

  if (search) params.q = search

  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))

  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const { data } = await axios.get(
    `/v1/tr/widgets/details/roadmap-coverage${extract ? '.xlsx' : ''}`,
    { params },
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
): Promise<any> => {
  const { success, data } = await getData(
    appliedFilters,
    search,
    sort,
    page,
    true,
  )

  success && axios.file(data.url)
}
