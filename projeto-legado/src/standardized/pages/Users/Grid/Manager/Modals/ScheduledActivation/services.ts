import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../../../services/Axios'
import { download } from '../../../../../../../utils/DownloadFile'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import { BodyInterface } from '../../interfaces'
import parseUser from '../../parser'

// Essa função irá fazer a requisição ou extração dos dados.
const listUsers = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[] = [],
  extract = false,
): Promise<unknown> => {
  const params = {
    page,
    status: ['AP', 'T'].join(','),
    ...appliedFilters.reduce(
      (params, { name, value }) => ({ ...params, [name]: value }),
      {},
    ),

    ...(search ? { q: search } : {}),
    ...(sort || {}),
    ...(ids.length > 0 ? { id: ids.join() } : {}),
  }

  const { data } = await axios.get(`/v1/tr/persons${extract ? '.xlsx' : ''}`, {
    params,
  })

  // Retornando o conteúdo do body da requisição
  return data
}

// Essa função irá fazer a requisição para extração dos dados
export const getUsers = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
): Promise<{
  data: BodyInterface[]
  pagination: {
    has_next_page: boolean
    count: number
  }
}> => {
  const response = await listUsers(appliedFilters, search, sort, page)

  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('Invalid response')
  }

  const data = parseUser(response.data)

  return {
    data: data,
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
export const extractUsers = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
  ids: number[],
): Promise<void> => {
  const response = await listUsers(
    appliedFilters,
    search,
    sort,
    page,
    ids,
    true,
  )

  if (!isObject(response) || !isObject(response.data)) {
    throw new Error('Request returned an invalid data')
  }

  download(response.data.url || '')
}

export const onActivate = async (ids: BodyInterface['id'][]): Promise<void> => {
  await axios.put('v1/tr/users/interrupt-ids', {
    ids: ids,
  })
}
