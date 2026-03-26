import axios from '../../../../../../../../services/Axios'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../../../utils/Formatters'
import { notEmptyStringOrDefault } from '../../../../../../../utils/formatters'
import { isObject } from '../../../../../../../utils/validators'

import { CountData } from './interfaces'

const parser = (data: unknown[]): CountData[] => {
  const parse = data.reduce<CountData[]>((parse, item) => {
    if (!isObject(item)) return parse

    const data: CountData = {
      image: isObject(item.avatar)
        ? notEmptyStringOrDefault(item.avatar.url)
        : null,
      name: notEmptyStringOrDefault(item.nickname),
    }

    return [...parse, data]
  }, [])

  return parse
}

export const getContractors = async (
  id: number,
  search: string,
  page: number,
): Promise<{
  data: CountData[]
  pagination: {
    page: number
    count: number
    has_next_page: boolean
  }
}> => {
  const params = {
    store_id: id,
    contain: 'Avatars',
    page,

    ...(search ? { q: search } : {}),
  }

  const { data: response } = await axios.get('/v1/tr/contractors/options', {
    params,
  })

  if (!isObject(response)) throw new Error('Invalid Response')
  if (!Array.isArray(response.data)) throw new Error('Invalid Response')

  return {
    data: parser(response.data),
    pagination: {
      page,
      count: response.length,
      has_next_page: false,
      ...(isObject(response.pagination)
        ? {
            count: numberOrDefault(
              response.pagination.count,
              response.data.length,
            ),
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
          }
        : {}),
    },
  }
}
