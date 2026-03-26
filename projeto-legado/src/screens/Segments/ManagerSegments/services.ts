import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../services/Axios'
import { download } from '../../../utils/DownloadFile'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { isObject } from '../../../utils/Validators'

import { Segment } from './Modals/PDVTransfer/interfaces'

// Essa função irá fazer a requisição dos dados.
export const getSegments = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[] = [],
  extract: boolean = false,
): Promise<any> => {
  const params: any = {
    page: page,
  }

  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))
  if (extract && ids.length > 0) params.id = ids.join(',')
  if (search) params.q = search
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const { data } = await axios.get(`/v1/tr/segments${extract ? '.xlsx' : ''}`, {
    params,
  })

  // Retornando o conteúdo do body da requisição
  return data
}

const parserSegment = (data: unknown[]): Segment[] => {
  const parsed = data.reduce<Segment[]>((parse, data) => {
    if (!isObject(data)) return parse

    const id = numberOrDefault(data.id)
    if (!id) return parse
    const segment: Segment = {
      id,
      name: notEmptyStringOrDefault(data.name, '-'),
    }

    return [...parse, segment]
  }, [] as Segment[])
  return parsed
}

export const getSegmentStores = async (
  search: string,
  page: number,
): Promise<{ data: Segment[]; pagination: { has_next_page: boolean } }> => {
  const params = {
    ...(search ? { q: search } : {}),
    page,
  }

  const { data: response } = await axios.get('/v1/tr/segments', { params })

  if (!isObject(response) && !Array.isArray(response.data)) {
    throw new Error('Invalid Response')
  }
  // Retornando o conteúdo do body da requisição
  return {
    data: parserSegment(response.data),
    pagination: {
      has_next_page: false,
      ...(isObject(response.pagination)
        ? {
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
          }
        : {}),
    },
  }
}

export const toggleStatus = async (
  status: boolean,
  ids: number[],
): Promise<void> => {
  await axios.put('/v1/tr/segments/toggle-status', {
    status,
    ids,
  })
}

export const deleteMultiple = async (ids: number[]): Promise<void> => {
  await axios.delete('/v1/tr/segments/delete-ids', {
    data: { ids },
  })
}

export const transferPDVs = async (
  segment_id: number,
  ids: number[],
): Promise<boolean> => {
  try {
    const res = await axios.post(`v1/tr/segments/${segment_id}/stores`, { ids })

    return res.data.success
  } catch (e) {}

  return false
}

// Essa função irá fazer a requisição para extração dos dados
export const extractData = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[],
): Promise<any> => {
  const { success, data } = await getSegments(
    appliedFilters,
    search,
    sort,
    page,
    ids,
    true,
  )

  success && download(data.url)
}
