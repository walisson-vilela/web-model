import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../services/Axios'

export const getProcesses = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
): Promise<any> => {
  const params: any = {
    page: page,
    limit: 200,
    contain: ['Users'].join(','),
  }
  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))
  if (search) params.q = search
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const { data } = await axios.get('/v1/export-processes', { params })
  return data
}

export const createProcesses = async (params: {}): Promise<any> => {
  const { data } = await axios.post('/v1/export-processes/add', params)
  return data
}
