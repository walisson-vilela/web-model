import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../utils/Validators'
import { loader } from '../functions'

import type { City, Config } from './types'

export const getCities: Config['loader'] = async (
  by_user,
  internal_access,
  config,
) => {
  return loader(
    '/v1/region-cities',
    {
      ...config,
      params: {
        by_user,
        internal_access,
        contain: 'RegionStates,RegionCountries',
        sort: 'name',
      },
    },
    (data: unknown[]): City[] => {
      return data.reduce<City[]>((data, e) => {
        if (!isObject(e) || !isObject(e.state) || !isObject(e.country)) {
          return data
        }

        const id = numberOrDefault(e.id)
        if (!id) return data

        const state_id = numberOrDefault(e.state.id)
        if (!state_id) return data

        const country_id = numberOrDefault(e.country.id)
        if (!country_id) return data

        const parsed: City = {
          id,
          name: notEmptyStringOrDefault(e.name, ''),
          state: {
            id: state_id,
            name: notEmptyStringOrDefault(e.state.name, ''),
            short_name: notEmptyStringOrDefault(e.state.name_short, ''),
          },
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
