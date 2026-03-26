import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../../services/Axios'

interface getParamsArgs {
  appliedFilters: FiltersInterfaces.AppliedFilter[]
  search: string
  sort: SortState | null
  page?: number
}

const getParams = (args: getParamsArgs): any => {
  const { appliedFilters, search, sort, page } = { ...args }

  let params: any = {
    limit: 200,
    'no-paginate': 1,
    tab: 1,
  }

  if (page) params.page = page

  if (search) {
    params.q = search
  }
  if (appliedFilters.length > 0) {
    // adicionando os filtros na lista de parametros
    appliedFilters.forEach((e) => {
      params[e.name] = e.value
    })
  }
  if (sort) params = { ...params, ...sort }

  return params
}

export const getData = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  extract: boolean = false,
): Promise<any> => {
  const params = getParams({ appliedFilters, search, sort, page })

  const { data } = await axios.get(
    `/v1/tr/widgets/details/data-pending-transmission${extract ? '.xlsx' : ''}`,
    { params },
  )

  return data
}
