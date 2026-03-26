import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../services/Axios/instance'

export const getJustifies = async (
  tabId: number,
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[] = [],
  extract: boolean = false,
): Promise<any> => {
  let params: any = { page: page, limit: 200, audited: tabId === 1 ? 0 : 1 }
  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))
  if (extract && ids.length > 0) params.id = ids.join(',')
  if (search) params.q = search
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }
  const { data } = await axios.get(
    `/v1/tr/justifies${extract ? '.xlsx' : ''}`,
    { params },
  )
  return data
}

export const toggleStatus = async (
  tabId: number,
  ids: number[] = [],
  status,
) => {
  const {
    data: { success },
  } = await axios.put('/v1/tr/justifies/toggle-audit', { ids, status })
  return success
}
