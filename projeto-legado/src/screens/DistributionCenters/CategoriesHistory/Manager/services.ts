import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../../services/Axios'

interface getParamsArgs {
  search: string
  appliedFilters: FiltersInterfaces.AppliedFilter[]
  sort: SortState
  page?: number
}

const getParams = (args: getParamsArgs): any => {
  const { search, appliedFilters, sort, page } = { ...args }

  let params: any = {
    limit: 200,
  }

  if (page) params.page = page

  if (search) {
    params.q = search
  }
  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))
  if (sort) params = { ...params, ...sort }
  else params = { ...params, sort: 'reference', direction: 'DESC' }

  return params
}

export const getHistory = async (
  distribution_center_id: number,
  search: string,
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  sort: SortState,
  page: number,
): Promise<any> => {
  const params = getParams({ search, appliedFilters, sort, page })

  const { data } = await axios.get(
    `/v1/distribution-centers/${distribution_center_id}/historics`,
    { params },
  )

  return data
}

export const extractData = async (
  distribution_center_id: number,
  search: string,
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  sort: SortState,
): Promise<any> => {
  const params = getParams({ search, appliedFilters, sort })

  const { data } = await axios.get(
    `/v1/distribution-centers/${distribution_center_id}/historics.xlsx`,
    { params },
  )

  return data
}

export const updateHistory = async (
  distribution_center_id: number,
  distribution_center_historic_id: number,
  history: {
    name?: string
    active?: number
    store_id?: number
    apportionment?: number
  },
) => {
  const { data } = await axios.put(
    `/v1/distribution-centers/${distribution_center_id}/historics/${distribution_center_historic_id}`,
    history,
  )

  return data
}
