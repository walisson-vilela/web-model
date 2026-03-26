import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../services/Axios/instance'

export const getData = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[] = [],
  extract: boolean = false,
) => {
  const params: any = { page }

  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))
  if (extract && ids.length > 0) params.id = ids.join(',')
  if (search) params.q = search
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const { data } = await axios.get(`/v1/tr/surveys${extract ? '.xlsx' : ''}`, {
    params,
  })

  if (!data.success) throw new Error('Invalid Request')

  return data
}
