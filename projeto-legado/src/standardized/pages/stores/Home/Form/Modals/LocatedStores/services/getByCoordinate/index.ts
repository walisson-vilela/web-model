import { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'
import { GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../../../services/Axios/instance'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../utils/validators'
import { GetByCoordinateResponse } from '../../types'

import parseBody from './parser'

const getByCoordinate = async (
  lat: number,
  lng: number,
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  search: string,
  sort: SortState | null,
  page: number,
): Promise<GetByCoordinateResponse> => {
  const params = {
    lat,
    lng,

    ...appliedFilters.reduce(
      (params, filter) => ({ ...params, [filter.name]: filter.value }),
      {},
    ),

    ...(search ? { q: search } : {}),
    ...(sort || {}),

    page,
  }

  const { data: response }: GenericObject = await axios.get(
    'v1/tr/stores/by-coordinate',
    { params },
  )

  if (!isObject(response) || !response.success) {
    throw new Error('Invalid response')
  }

  if (!Array.isArray(response.data)) {
    throw new Error('Missing data')
  }

  const data = parseBody(response.data)

  return {
    data,
    pagination: {
      has_next_page: false,
      count: data.length,

      ...(isObject(response.pagination)
        ? {
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
            count: numberOrDefault(response.pagination.count, data.length),
          }
        : {}),
    },
  }
}

export default getByCoordinate
