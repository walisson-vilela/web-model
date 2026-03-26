import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../services/Axios'
import { booleanOrDefault, numberOrDefault } from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'

import { Filter, Mode, Pagination } from './interfaces'

type Response = {
  data: GenericObject[]
  unread: number
  pagination: Pagination
}

// Essa função irá fazer a requisição ou extração dos dados.
export const getMessages = async (
  mode: Mode,
  filter: Filter,
  search: string,
  page: number,
): Promise<Response> => {
  const params: any = {
    limit: 10,
    page,
  }

  if (search) params.q = search

  if (filter === 'read') {
    params['visualized'] = '1'
  } else if (filter === 'unread') {
    params['visualized'] = '0'
  } else if (filter === 'only_messages') {
    params['type'] = 'M'
  } else if (filter === 'only_post') {
    params['type'] = 'P'
  }

  params['mode'] = mode === 'sent' ? 'sent' : 'inbox'

  if (mode === 'is_important') {
    params['is_important'] = '1'
  }

  const { data } = await axios.get('/v1/tr/messages', { params })

  if (!isObject(data)) {
    throw new Error('Request returned an invalid data')
  }

  if (!data.success) {
    throw new Error('Request returned no success')
  }

  if (!Array.isArray(data.data) || !isObject(data.pagination)) {
    throw new Error('Request returned an invalid data')
  }

  const limit = numberOrDefault(data.pagination.limit, 1)
  const current_page = numberOrDefault(data.pagination.current_page, 1)
  const count = numberOrDefault(data.pagination.count, 0)
  const end = current_page * limit

  const response: Response = {
    data: data.data.filter((e: unknown) => isObject(e)),
    unread: numberOrDefault(data.unread_count),
    pagination: {
      has_next_page: booleanOrDefault(data.pagination.has_next_page, false),
      ...(count < 1
        ? {
            count: 0,
            start: 0,
            end: 0,
          }
        : {
            count,
            start: end - (limit - 1),
            end: end > count ? count : end,
          }),
    },
  }

  return response
}

export const toggleImportant = async (
  is_important: boolean,
  ids: number[],
): Promise<boolean> => {
  const {
    data: { success },
  } = await axios.put('/v1/tr/messages/toggle-important', {
    is_important,
    ids,
  })

  return success
}
