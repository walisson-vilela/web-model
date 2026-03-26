import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../utils/Validators'
import { loader } from '../functions'

import type { Config, State } from './types'

export const getStates: Config['loader'] = async (
  by_user,
  internal_access,
  config,
) => {
  return loader(
    '/v1/region-states',
    {
      ...config,
      params: {
        by_user,
        internal_access,
        contain: 'RegionCountries',
        sort: 'name',
      },
    },
    (data: unknown[]): State[] => {
      return data.reduce<State[]>((data, e) => {
        if (!isObject(e) || !isObject(e.country)) {
          return data
        }

        const id = numberOrDefault(e.id)
        if (!id) return data

        const country_id = numberOrDefault(e.country.id)
        if (!country_id) return data

        const parsed: State = {
          id,
          name: notEmptyStringOrDefault(e.name, ''),
          short_name: notEmptyStringOrDefault(e.name_short, ''),
          country: {
            id: country_id,
            name: notEmptyStringOrDefault(e.country.name, ''),
          },
        }
        data.push(parsed)
        return data
      }, [])
    },
  )
}
