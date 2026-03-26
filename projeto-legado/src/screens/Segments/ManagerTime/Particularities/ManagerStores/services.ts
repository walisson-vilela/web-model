import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../services/Axios'
import { ExtractDataFunction } from '../interfaces'

import { BodyInterface } from './interfaces'

interface getParamsArgs {
  appliedFilters?: FiltersInterfaces.AppliedFilter[]
  search: string
  sort: SortState | null
  page?: number
  checkeds?: BodyInterface[]
}

const getParams = (args: getParamsArgs): any => {
  const { appliedFilters, search, sort, page, checkeds } = { ...args }

  let params: any = {
    limit: 200,
  }

  if (page) params.page = page

  if (checkeds) params.id = checkeds.map((checked) => checked.id).join()

  if (search) {
    params.q = search
    params.q_options = [
      'Stores.name',
      'Stores.formatted_address',
      'Typologies.name',
    ].join()
  }
  if (appliedFilters && appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))
  if (sort) params = { ...params, ...sort }

  return params
}

export const getRegions = async (
  segment_id: number,
  search: string,
  sort: SortState | null,
  page: number,
): Promise<any> => {
  const params = getParams({ search, sort, page })

  const { data } = await axios.get(`/v1/segments/${segment_id}/stores`, {
    params,
  })

  return data
}

export const extractData: ExtractDataFunction = async (
  segment_id: number,
  search: string,
  sort: SortState | null,
): Promise<any> => {
  const params = getParams({ search, sort })

  const { data } = await axios.get(`/v1/segments/${segment_id}/stores.xlsx`, {
    params,
  })

  return data
}
