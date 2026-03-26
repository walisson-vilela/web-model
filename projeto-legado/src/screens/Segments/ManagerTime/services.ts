import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../services/Axios'
import { download } from '../../../utils/DownloadFile'

import { SegmentGoal } from './interfaces'

// Essa função irá fazer a requisição dos dados.
export const getSegmentsTime = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[] = [],
  extract: boolean = false,
): Promise<any> => {
  const params: any = {
    page: page,
    limit: 200,
  }

  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))
  if (extract && ids.length > 0) params.id = ids.join(',')
  if (search) params.q = search
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const { data } = await axios.get(
    `/v1/tr/segments/segment-time${extract ? '.xlsx' : ''}`,
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
  ids: number[],
): Promise<any> => {
  const { success, data } = await getSegmentsTime(
    appliedFilters,
    search,
    sort,
    page,
    ids,
    true,
  )

  success && download(data.url)
}

export const editGoal = async (
  segmentGoals: SegmentGoal[],
): Promise<boolean> => {
  try {
    const res = await axios.post('/v1/tr/segments/edit-goal', segmentGoals)

    return res.data.success
  } catch (e) {}

  return false
}
