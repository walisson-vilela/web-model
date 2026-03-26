import { AppliedFilter } from '@mw-kit/mw-ui/types'

import axios from '../../../../../services/Axios'
import { cepFormatter } from '../../../../../standardized/utils/formatters'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'

import { Store } from './interfaces'

const parser = (data: unknown[]): Store[] => {
  const parsed = data.reduce<Store[]>((parse, data) => {
    if (!isObject(data)) return parse

    const id = numberOrDefault(data.id)
    if (!id) return parse

    const address = isObject(data.address)
    const storeName = isObject(data.stores_contractor)

    if (!address || !storeName) return parse

    const store: Store = {
      id,
      formatted_address: `${notEmptyStringOrDefault(
        data.address.formatted,
        '-',
      )} - ${notEmptyStringOrDefault(cepFormatter(data.address.postal_code))}`,
      name: notEmptyStringOrDefault(data.stores_contractor.nickname, '-'),
    }
    return [...parse, store]
  }, [] as Store[])
  return parsed
}

// Essa função irá fazer a requisição dos dados.
export const getSegmentStores = async (
  segment_id: number,
  search: string,
  page: number,
  filters: AppliedFilter[],
): Promise<{
  data: Store[]
  pagination: { has_next_page: boolean }
}> => {
  const params = {
    segment_id,
    page,
    ...filters.reduce(
      (params, filter) => ({
        ...params,
        [filter.name]: filter.value,
      }),
      {},
    ),
    ...(search ? { q: search } : {}),
  }

  const { data: response } = await axios.get('/v1/tr/stores', { params })

  if (!isObject(response) || !Array.isArray(response.data))
    throw new Error('Invalid response')

  // Retornando o conteúdo do body da requisição
  return {
    data: parser(response.data),
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
