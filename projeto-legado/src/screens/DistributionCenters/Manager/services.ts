import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../services/Axios'

import { BodyInterface } from './interfaces'

interface getParamsArgs {
  appliedFilters: FiltersInterfaces.AppliedFilter[]
  search: string
  sort: SortState | null
  page?: number
  checkeds?: BodyInterface[]
}

const getParams = (args: getParamsArgs): any => {
  const { appliedFilters, search, sort, page, checkeds } = { ...args }

  let params: any = {
    limit: 200,
    contain: ['StoresOne'].join(),
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

export const getDistributionCenters = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
): Promise<any> => {
  const params = getParams({ appliedFilters, search, sort, page })

  const { data } = await axios.get('/v1/distribution-centers', { params })

  return data
}

export const extractData = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  checkeds: BodyInterface[],
): Promise<any> => {
  const params = getParams({ appliedFilters, search, sort, checkeds })

  const { data } = await axios.get('/v1/distribution-centers.xlsx', { params })

  return data
}

export const toggleStatus = async (
  active: boolean,
  ids: number[],
): Promise<boolean> => {
  try {
    const res = await axios.put('/v1/distribution-centers/toggle-status', {
      active,
      ids,
    })

    return res.data.success
  } catch (e) {}

  return false
}

export const deleteMultiple = async (ids: number[]): Promise<boolean> => {
  try {
    const res = await axios.delete('/v1/distribution-centers/delete-multiple', {
      data: { ids },
    })

    return res.data.success
  } catch (e) {}

  return false
}
