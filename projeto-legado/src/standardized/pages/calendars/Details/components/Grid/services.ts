import type { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

import axios from '../../../../../../services/Axios'
import { download } from '../../../../../../utils/DownloadFile'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../utils/Formatters'
import { isObject } from '../../../../../../utils/Validators'
import {
  type PaginationObjType,
  parsePaginationObj,
} from '../../../../../services/parsers/pagination'
import { notEmptyStringOrDefault } from '../../../../../utils/formatters'

import { parseUserEvent, parseUserOptions } from './parsers'
import type { UserEvents, UserOptions } from './types'

const getUserEventRequest = async (
  type: 'in' | 'out',
  cardId: number,
  page?: number,
  search?: string,
  sort?: SortState,
  filters?: FiltersInterfaces.AppliedFilter[],
  suffix?: string,
) => {
  const params: any = { type, page, ...sort }

  if (search) {
    params.q = search
  }

  if (filters && filters.length > 0) {
    for (const f of filters) {
      params[f.name] = f.value
    }
  }

  return await axios.get(`v1/tr/user-events/${cardId}/users${suffix || ''}`, {
    params: params,
  })
}

export const getUserEvent = async (
  type: 'in' | 'out',
  cardId: number,
  page: number,
  search?: string,
  sort?: SortState,
  filters?: FiltersInterfaces.AppliedFilter[],
): Promise<{
  data: UserEvents[]
  pagination: { count: number; has_next_page: boolean; page: number }
}> => {
  try {
    const { data: response } = await getUserEventRequest(
      type,
      cardId,
      page,
      search,
      sort,
      filters,
    )
    if (!isObject(response) || !Array.isArray(response.data)) {
      throw new Error('Request returned an invalid data!')
    }

    return {
      data: parseUserEvent(response.data),
      pagination: {
        has_next_page: false,
        page: 1,
        count: 0,
        ...(isObject(response.pagination)
          ? {
              has_next_page: booleanOrDefault(
                response.pagination.has_next_page,
                false,
              ),
              count: numberOrDefault(response.pagination.count, 0),
              page: numberOrDefault(response.pagination.current_page, 1),
            }
          : {}),
      },
    }
  } catch (e) {
    console.error(e)
    throw new Error('Request returned no success!')
  }
}

export const getUserEventXlsx = async (
  type: 'in' | 'out',
  cardId: number,
  page?: number,
  search?: string,
  sort?: SortState,
): Promise<void> => {
  try {
    const { data: response } = await getUserEventRequest(
      type,
      cardId,
      page,
      search,
      sort,
      [],
      '.xlsx',
    )
    if (!isObject(response) || !isObject(response.data)) {
      throw new Error('Invalid Response')
    }

    const url = notEmptyStringOrDefault(response.data.url)

    if (!url) {
      throw new Error('Empty url')
    }

    download(url)
  } catch (e) {
    console.error(e)
    throw new Error('Request returned no success!')
  }
}

export const getUserEventOptions = async (
  type: string,
  ignore: number,
  search?: string,
  page?: number,
): Promise<{ data: UserOptions[]; paginationObj: PaginationObjType }> => {
  try {
    const { data: response } = await axios.get('v1/tr/user-events/options', {
      params: {
        type,
        ignore,
        ...(search ? { q: search } : {}),
        ...(page ? { page } : {}),
      },
    })
    if (!isObject(response) || !Array.isArray(response.data)) {
      throw new Error('Request returned an invalid data!')
    }

    return {
      paginationObj: parsePaginationObj(
        response.pagination,
        response.data.length,
      ),
      data: parseUserOptions(response.data),
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}
