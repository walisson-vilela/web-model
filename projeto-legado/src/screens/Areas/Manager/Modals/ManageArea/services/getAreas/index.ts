import axios from '../../../../../../../services/Axios/instance'
import { notEmptyStringOrDefault } from '../../../../../../../standardized/utils/formatters'
import { isObject } from '../../../../../../../standardized/utils/validators'
import { numberOrDefault } from '../../../../../../../utils/Formatters'
import { Selected } from '../../interface'

const parseState = (e: unknown): Selected['states'][number] | null => {
  if (!isObject(e) || !isObject(e.state)) return null

  const id = numberOrDefault(e.id)
  const foreign_id = numberOrDefault(e.state.id)
  if (!id || !foreign_id) return null

  return {
    id,
    foreign_id,
    name: notEmptyStringOrDefault(e.state.name),
    name_short: notEmptyStringOrDefault(e.state.name_short),
  }
}

const parseCity = (e: unknown): Selected['cities'][number] | null => {
  if (!isObject(e) || !isObject(e.city)) return null

  const id = numberOrDefault(e.id)
  const foreign_id = numberOrDefault(e.city.id)
  if (!id || !foreign_id) return null

  return {
    id,
    foreign_id,
    name: notEmptyStringOrDefault(e.city.name),
    ...(isObject(e.city.state)
      ? {
          state_name: notEmptyStringOrDefault(e.city.state.name),
        }
      : {
          state_name: null,
        }),
  }
}

const parseSublocality = (
  e: unknown,
): Selected['sublocalities'][number] | null => {
  if (!isObject(e) || !isObject(e.sublocality)) return null

  const id = numberOrDefault(e.id)
  const foreign_id = numberOrDefault(e.sublocality.id)
  if (!id || !foreign_id) return null

  return {
    id,
    foreign_id,
    name: notEmptyStringOrDefault(e.sublocality.name),
    ...(isObject(e.sublocality.city)
      ? {
          city_name: notEmptyStringOrDefault(e.sublocality.city.name),
          ...(isObject(e.sublocality.city.state)
            ? {
                state_name: notEmptyStringOrDefault(
                  e.sublocality.city.state.name,
                ),
              }
            : {
                state_name: null,
              }),
        }
      : {
          city_name: null,
          state_name: null,
        }),
  }
}

const getAreas = async (id: number): Promise<Selected> => {
  const params = {
    contain: ['RegionStates', 'RegionCities', 'RegionSublocalities'].join(','),
  }

  const { data: res } = await axios.get(`/v1/tr/regions/${id}`, { params })

  if (!isObject(res)) {
    throw new Error('Invalid response')
  }

  if (!res.success || !isObject(res.data) || !isObject(res.data.details)) {
    throw new Error('Invalid value response')
  }

  const parsed = {
    states: (Array.isArray(res.data.details.states)
      ? res.data.details.states
      : []
    ).reduce<Selected['states']>((parsed, e) => {
      const state = parseState(e)
      return state ? [...parsed, state] : parsed
    }, []),

    cities: (Array.isArray(res.data.details.cities)
      ? res.data.details.cities
      : []
    ).reduce<Selected['cities']>((parsed, e) => {
      const city = parseCity(e)
      return city ? [...parsed, city] : parsed
    }, []),

    sublocalities: (Array.isArray(res.data.details.sublocalities)
      ? res.data.details.sublocalities
      : []
    ).reduce<Selected['sublocalities']>((parsed, e) => {
      const sublocality = parseSublocality(e)
      return sublocality ? [...parsed, sublocality] : parsed
    }, []),
  }

  return parsed
}

export default getAreas
