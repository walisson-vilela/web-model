import { SortState } from '@mw-kit/mw-manager'
import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../services/Axios'
import { isObject } from '../../../../../standardized/utils/validators'
import { download } from '../../../../../utils/DownloadFile'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'

import { BodyInterface } from './interfaces'
import parser from './parser'

// Essa função irá fazer a requisição ou extração dos dados.
const list = async (
  id: number,
  search: string,
  sort: SortState | null,
  extract: boolean = false,
): Promise<GenericObject> => {
  const params = {
    limit: 200,
    ...(search ? { q: search } : {}),
    ...(sort ? sort : {}),
  }

  const { data: response } = await axios.get(
    `/v1/tr/regions/${id}/stores${extract ? '.xlsx' : ''}`,
    { params },
  )

  if (!isObject(response)) throw new Error('Invalid response')
  if (!response.success) throw new Error('Request failed')

  // Retornando o conteúdo do body da requisição
  return response
}

export const getStores = async (
  id: number,
  search: string,
  sort: SortState | null,
): Promise<{
  data: BodyInterface[]
  pagination: {
    has_next_page: boolean
    count: number
  }
}> => {
  const response = await list(id, search, sort)

  if (!Array.isArray(response.data)) throw new Error('Invalid response data')

  return {
    data: parser(response.data),
    pagination: {
      has_next_page: false,
      count: 0,
      ...(isObject(response.pagination)
        ? {
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
            count: numberOrDefault(response.pagination.count, 0),
          }
        : {}),
    },
  }
}

// Essa função irá fazer a requisição para extração dos dados
export const extractData = async (
  id: number,
  search: string,
  sort: SortState | null,
): Promise<void> => {
  const { data } = await list(id, search, sort, true)

  if (!isObject(data)) throw new Error('Invalid response data')
  const url = notEmptyStringOrDefault(data.url)
  if (!url) throw new Error('Could not get download url')

  download(url)
}
