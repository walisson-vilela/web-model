import { SortState } from '@mw-kit/mw-manager'

import axios from '../../../../services/Axios'
import { cepFormatter } from '../../../../standardized/utils/formatters'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'

import { BodyInterface } from './interfaces'

interface getParamsArgs {
  segment_id: number
  region_id?: number
  search: string
  sort: SortState | null
  page?: number
}

const getStoresParams = (args: getParamsArgs): any => {
  const { segment_id, search, sort, page } = { ...args }

  let params = {
    page,
    segment_id,
    contain: 'Typologies',
    ...(search
      ? {
          q: search,
        }
      : {}),
  }

  if (sort) params = { ...params, ...sort }

  return params
}

const parsedStores = (data: unknown[]): BodyInterface[] => {
  const parsed = data.reduce<BodyInterface[]>((parser, data) => {
    if (!isObject(data)) return parser

    const id = numberOrDefault(data.id)
    const address = isObject(data.address)
    const pdv = isObject(data.stores_contractor)
    const typology = isObject(data.stores_contractor.typology)

    if (!id || !address || !pdv) return parser

    const store: BodyInterface = {
      id,
      formatted_address: `${notEmptyStringOrDefault(
        data.address.formatted,
        '-',
      )} - ${cepFormatter(data.address.postal_code)}`,
      name: notEmptyStringOrDefault(data.stores_contractor.nickname, '-'),
      ...(typology
        ? {
            typology_name: notEmptyStringOrDefault(
              data.stores_contractor.typology.name,
              '-',
            ),
          }
        : { typology_name: '-' }),
    }

    return [...parser, store]
  }, [] as BodyInterface[])

  return parsed
}

export const getStores = async (
  segment_id: number,
  search: string,
  sort: SortState | null,
  page: number,
  region_id?: number,
): Promise<{
  data: BodyInterface[]
  pagination: { has_next_page: boolean; count: number }
}> => {
  const params = getStoresParams({ segment_id, search, sort, page, region_id })

  const { data: response } = await axios.get('/v1/tr/stores', { params })

  if (!isObject(response)) throw new Error('Invalid Response')

  if (!Array.isArray(response.data)) throw new Error('Invalid Response')

  return {
    data: parsedStores(response.data),
    pagination: {
      count: 0,
      has_next_page: false,
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

export const extractData = async (
  segment_id: number,
  search: string,
  sort: SortState | null,
  region_id?: number,
): Promise<any> => {
  let params = getStoresParams({ segment_id, search, sort, region_id })
  params.type_export = 'typologies'

  const { data } = await axios.get('/v1/tr/stores.xlsx', { params })

  return data
}
