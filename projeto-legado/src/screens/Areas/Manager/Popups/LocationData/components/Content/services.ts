import axios from '../../../../../../../services/Axios'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import { Rows } from '../../interfaces'

const parsers: {
  [k in keyof Rows]: (data: unknown) => Rows[k] | null
} = {
  cities: (response) => {
    if (!isObject(response)) {
      return null
    }

    const id = numberOrDefault(response.id)
    if (!id) return null

    const state = parsers.states(response.state)
    if (!state) return null

    const row: Rows['cities'] = {
      id,
      name: notEmptyStringOrDefault(response.name),
      state,
    }

    return row
  },
  states: (response) => {
    if (!isObject(response)) {
      return null
    }

    const id = numberOrDefault(response.id)
    if (!id) return null

    const row: Rows['states'] = {
      id,
      name: notEmptyStringOrDefault(response.name),
      name_short: notEmptyStringOrDefault(response.name_short),
    }

    return row
  },
  sublocalities: (response) => {
    if (!isObject(response)) {
      return null
    }

    const id = numberOrDefault(response.id)
    if (!id) return null

    const city = parsers.cities(response.city)
    if (!city) return null

    const row: Rows['sublocalities'] = {
      id,
      name: notEmptyStringOrDefault(response.name),

      city,
    }

    return row
  },
}

export const getRows = async <T extends keyof Rows>(
  id: number,
  search: string,
  page: number,
  type: T,
): Promise<{
  data: Rows[T][]
  pagination: {
    count: number
    has_next_page: boolean
  }
}> => {
  const params = {
    foreign_table: type,
    page,
    ...(search ? { q: search } : {}),
  }

  const { data: response } = await axios.get(`/v1/tr/regions/${id}/details`, {
    params,
  })

  if (!isObject(response)) throw new Error('Invalid Response')
  if (!Array.isArray(response.data)) throw new Error('Invalid Response')

  const rows = response.data.reduce<Rows[T][]>((rows, response) => {
    const row = parsers[type](response)
    return row ? [...rows, row] : rows
  }, [])

  return {
    data: rows,
    pagination: {
      count: rows.length,
      has_next_page: false,
      ...(isObject(response.pagination)
        ? {
            count: numberOrDefault(response.pagination.count, rows.length),
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
          }
        : {}),
    },
  }
}
