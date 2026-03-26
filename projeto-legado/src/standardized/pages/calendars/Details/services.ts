import type { AppliedFilter, GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../services/Axios'
import { notEmptyStringOrDefault } from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'

type GetEvents = <
  T extends {
    types: string[]
    year: number
    appliedFilters: AppliedFilter[]
    search: string
  } & ({ extract: true; card_ids: number[] } | {}),
>(
  config: T,
) => Promise<T extends { extract: true } ? string : unknown[]>

export const getEvents: GetEvents = async (config) => {
  const [sufix, params, parse] =
    'extract' in config
      ? [
          '.xlsx',
          {
            ...(config.card_ids.length > 0
              ? { id: config.card_ids.join(',') }
              : {}),
          },
          (response: GenericObject) => {
            if (!isObject(response.data)) {
              throw new Error('Request returned an invalid data!')
            }

            const url = notEmptyStringOrDefault(response.data.url)
            if (!url) {
              throw new Error('Request returned an invalid data!')
            }

            return url
          },
        ]
      : [
          '',
          {},
          (response: GenericObject) => {
            if (!Array.isArray(response.data)) {
              throw new Error('Request returned an invalid data!')
            }

            return [...response.data] as unknown[]
          },
        ]

  const { data: response } = await axios.get(`/v1/tr/user-events${sufix}`, {
    params: {
      type: config.types.join(','),
      year: config.year,
      ...params,
      ...(config.search ? { q: config.search } : {}),
      ...config.appliedFilters.reduce((params, filter) => {
        params[filter.name] = filter.value
        return params
      }, {} as GenericObject),
    },
  })

  if (!isObject(response)) throw new Error('Request returned an invalid data!')
  if (!response.success) throw new Error('Request returned no success!')
  return parse(response) as never
}

export const toggleStatus = async (
  ids: number[],
  status: string,
): Promise<void> => {
  const { data: response } = await axios.put(
    '/v1/tr/calendar-event-details/toggle-status-national-holiday',
    {
      status,
      ids,
    },
  )

  if (!isObject(response)) throw new Error('Request returned an invalid data!')
  if (!response.success) throw new Error('Request returned no success!')
}

export const deleteEvents = async (ids: number[]) => {
  const { data: response } = await axios.delete(
    '/v1/tr/user-events/delete-ids',
    {
      data: { ids: ids },
    },
  )

  if (!isObject(response)) throw new Error('Request returned an invalid data!')
  if (!response.success) throw new Error('Request returned no success!')
}
