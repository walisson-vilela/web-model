import { AppliedFilter, GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../services/Axios'
import { download } from '../../../../utils/DownloadFile'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'

import { parserEvent } from './components/Grid/parser'
import { Event } from './interfaces'

const _getEvents = async (
  user_id: number,

  mode: 'future' | 'history',
  filters: AppliedFilter[],
  search: string,
  page?: number,
  extract?: boolean,
) => {
  const params: GenericObject = {
    mode,
    ...(page ? { page } : {}),
    ...(search ? { q: search } : {}),
    ...filters.reduce((params, filter) => {
      return { ...params, [filter.name]: filter.value }
    }, {}),
  }

  if (filters.length > 0) filters.forEach((e) => (params[e.name] = e.value))
  if (search) params.q = search

  const { data: response } = await axios.get(
    `v1/tr/users/${user_id}/events${extract ? '.xlsx' : ''}`,
    { params },
  )

  if (!isObject(response) || response.success !== true)
    throw new Error('Request returned no success')

  return response
}

export const getEvents = async (
  user_id: number,

  mode: 'future' | 'history',
  filters: AppliedFilter[],
  search: string,
  page: number,
): Promise<{
  data: Event[]
  pagination: {
    has_next_page: boolean
    count: number
  }
}> => {
  const response = await _getEvents(
    user_id,

    mode,
    filters,
    search,
    page,
  )

  if (!Array.isArray(response.data))
    throw new Error('Request returned an invalid data')

  return {
    data: parserEvent(response.data),
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

export const downloadEventData = async (
  user_id: number,

  mode: 'future' | 'history',
  filters: AppliedFilter[],
  search: string,
): Promise<void> => {
  const response = await _getEvents(
    user_id,

    mode,
    filters,
    search,
    undefined,
    true,
  )

  if (!isObject(response.data))
    throw new Error('Request returned an invalid data')

  const url = notEmptyStringOrDefault(response.data.url)
  if (!url) throw new Error('Request returned an invalid data')

  download(url)
}
