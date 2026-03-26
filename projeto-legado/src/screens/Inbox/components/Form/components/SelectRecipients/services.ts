import { AppliedFilter, GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../services/Axios'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../utils/Formatters'
import { isObject } from '../../../../../../utils/Validators'

type Response = {
  data: {
    id: number
    name: string
    subtitle: string
    formatted_address?: string
  }[]
  pagination: {
    has_next_page: boolean
  }
}

const common = async (
  request: {
    url: string
    search: string
    page: number
    aditional?: GenericObject
  },
  parser: (e: GenericObject) => Response['data'][number] | null,
): Promise<Response> => {
  const { url, search, page, aditional } = request

  const params: GenericObject = { page, ...(aditional || {}) }

  if (search) params.q = search

  const { data } = await axios.get(url, { params })

  if (!isObject(data)) {
    throw new Error('Request return an invalid data')
  }

  if (data.success !== true) {
    throw new Error('Request return no success')
  }

  if (!Array.isArray(data.data)) {
    throw new Error('Request return an invalid data')
  }

  const response: Response = {
    data: data.data.reduce<Response['data']>((prev, e: unknown) => {
      if (!isObject(e)) return prev

      const parsed = parser(e)
      if (!parsed) return prev

      return [...prev, parsed]
    }, []),
    pagination: isObject(data.pagination)
      ? {
          has_next_page: booleanOrDefault(data.pagination.has_next_page, false),
        }
      : {
          has_next_page: false,
        },
  }

  return response
}

export const getPeoples = async (
  search: string,
  page: number,
  filters: AppliedFilter[],
): Promise<Response> => {
  const params: Record<string | number | symbol, any> = {}

  filters.forEach((filter) => (params[filter.name] = filter.value))

  return common(
    {
      url: '/v1/tr/peoples',
      search,
      page,
      aditional: {
        ...params,
      },
    },
    (e) => {
      const id = numberOrDefault(e.id)
      if (!id) return null

      const parsed: Response['data'][number] = {
        id,
        name: notEmptyStringOrDefault(e.name, '-'),
        subtitle: `${id} | ${
          isObject(e.role) ? notEmptyStringOrDefault(e.role.name, '-') : '-'
        }`,
      }

      return parsed.id ? parsed : null
    },
  )
}

export const getStores = async (
  search: string,
  page: number,
  filters: AppliedFilter[],
): Promise<Response> => {
  const params: Record<string | number | symbol, any> = {}

  filters.forEach((filter) => (params[filter.name] = filter.value))

  return common(
    {
      url: '/v1/stores',
      search,
      page,
      aditional: {
        contain: 'Segments',
        ...params,
      },
    },
    (e) => {
      const id = numberOrDefault(e.id)
      if (!id) return null

      const parsed: Response['data'][number] = {
        id,
        name: notEmptyStringOrDefault(e.name, '-'),
        subtitle: `${id} | ${
          isObject(e.segment)
            ? notEmptyStringOrDefault(e.segment.name, '-')
            : '-'
        }`,
        formatted_address: notEmptyStringOrDefault(e.formatted_address, ''),
      }

      return parsed.id ? parsed : null
    },
  )
}
