import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../services/Axios'

import { BodyInterface } from './interfaces'

interface getParamsArgs {
  segment_id: number
  appliedFilters: FiltersInterfaces.AppliedFilter[]
  search: string
  sort: SortState | null
  page?: number
  checkeds?: BodyInterface[]
}

const getParams = (args: getParamsArgs): any => {
  const { segment_id, appliedFilters, search, sort, page, checkeds } = {
    ...args,
  }

  let params: any = {
    segment_id,
    limit: 200,
  }

  if (page) params.page = page

  if (checkeds) params.id = checkeds.map((checked) => checked.id).join()

  if (search) {
    params.q = search
  }
  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))
  if (sort) params = { ...params, ...sort }

  return params
}

export const getRoles = async (
  segment_id: number,
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
): Promise<any> => {
  const params = getParams({ segment_id, appliedFilters, search, sort, page })

  const { data } = await axios.get('/v1/roles/roles-time', { params })

  return data
}

export const extractData = async (
  segment_id: number,
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  checkeds: BodyInterface[],
): Promise<any> => {
  const params = getParams({
    segment_id,
    appliedFilters,
    search,
    sort,
    checkeds,
  })

  const { data } = await axios.get('/v1/roles/roles-time.xlsx', { params })

  return data
}
