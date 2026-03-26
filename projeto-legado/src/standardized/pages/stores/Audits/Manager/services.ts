import { FiltersInterfaces } from '@mw-kit/mw-manager'

import axios from '../../../../../services/Axios'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isObject } from '../../../../utils/validators'

import parser from './parser'

// Essa função irá fazer a requisição dos dados.
export const getStoreAudits = async (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  page: number,
) => {
  const params = {
    page,
    limit: 200,

    ...appliedFilters.reduce(
      (params, e) => ({ ...params, [e.name]: e.value }),
      {},
    ),

    ...(search ? { q: search } : {}),
  }

  const { data: response } = await axios.get('/v1/tr/store-audits', {
    params,
  })

  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('invalid response')
  }

  if (!response.success) throw new Error('Request failed')

  // Retornando o conteúdo do body da requisição
  return {
    data: parser(response.data, page),
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
