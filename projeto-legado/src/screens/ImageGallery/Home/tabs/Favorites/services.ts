import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../services/Axios'
import { download } from '../../../../../utils/DownloadFile'
import { notEmptyStringOrDefault } from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'

interface QueryParams {
  appliedFilters: FiltersInterfaces.AppliedFilter[]
  search: string
  sort: SortState | null
  dateInterval: [string, string]
  page: number
  ids?: number[]
}

type ReturnType = { [key: string | number | symbol]: any } & { success: true }

// Essa função irá fazer a requisição dos dados.
const listFavoritesRequest = async (
  queryParams: QueryParams,
  extract: boolean = false,
): Promise<ReturnType> => {
  const { appliedFilters, search, sort, dateInterval, page } = queryParams

  const ids = queryParams.ids || []

  const params: any = {
    created_at: dateInterval,
    page: page,
    contain: 'FileFavoritePermissions',
  }

  if (appliedFilters.length > 0)
    appliedFilters.map((e) => (params[e.name] = e.value))
  if (search) params.q = search
  if (ids.length > 0) params.id = ids.join(',')
  if (sort) {
    params.sort = sort.sort
    params.direction = sort.direction
  }

  const { data } = await axios.get(
    `v1/tr/image-gallery/file-favorites/index${extract ? '.xlsx' : ''}`,
    { params },
  )

  if (!isObject(data)) {
    throw new Error('Request return an invalid data')
  }

  if (data.success !== true) {
    throw new Error('Request return no success')
  }

  // Retornando o conteúdo do body da requisição
  return data as ReturnType
}

// Essa função irá fazer a requisição para extração dos dados
export const listFavorites = async (
  queryParams: QueryParams,
): Promise<ReturnType & { data: any[] }> => {
  const response = await listFavoritesRequest(queryParams)

  const { data } = response

  if (!Array.isArray(data)) {
    throw new Error('Request return an invalid data')
  }

  return { ...response, data }
}

// Essa função irá fazer a requisição para extração dos dados
export const extractFavorites = async (
  queryParams: QueryParams,
): Promise<void> => {
  const { data } = await listFavoritesRequest(queryParams, true)

  if (!isObject(data)) {
    throw new Error('Request return an invalid data')
  }

  const url = notEmptyStringOrDefault(data.url)
  if (url === null) {
    throw new Error('Request return an invalid data')
  }

  download(data.url)
}

export const deleteMultiple = async (ids: number[]): Promise<boolean> => {
  const {
    data: { success },
  } = await axios.delete(
    '/v1/tr/image-gallery/file-favorites/delete-multiple',
    { data: { ids } },
  )

  return success
}

export const clearMultiple = async (ids: number[]): Promise<boolean> => {
  const {
    data: { success },
  } = await axios.delete('/v1/tr/image-gallery/file-favorites/clear-list', {
    data: { ids },
  })

  return success
}
