import { Rule } from '../../../../../../components/GridSelector/interfaces'
import axios from '../../../../../../services/Axios'
import { notEmptyStringOrDefault } from '../../../../../../standardized/utils/formatters'
import {
  booleanOrDefault,
  dateOrDefault,
  numberOrDefault,
} from '../../../../../../utils/Formatters'
import { isObject, isOneOf } from '../../../../../../utils/Validators'
import { Data } from '../../interfaces'

const ruleOrDefault = (e: unknown): Rule => {
  const value = notEmptyStringOrDefault(e, '')
  return isOneOf(value, ['ONLY', 'EXCEPT'] as Rule[]) ? value : ''
}

const parsers: {
  [K in 'states' | 'cities' | 'segments' | 'market_flags']: (
    e: unknown,
  ) => Data['countries'][number][K][number] | null
} = {
  states: (e) => {
    if (!isObject(e)) return null

    const id = numberOrDefault(e.id)
    const foreign_id = numberOrDefault(e.foreign_id)
    if (!id || !foreign_id || !isObject(e.region_state)) return null

    return {
      id,
      foreign_id,
      name: notEmptyStringOrDefault(e.region_state.name, ''),
      name_short: notEmptyStringOrDefault(e.region_state.name_short, ''),
    }
  },
  cities: (e) => {
    if (!isObject(e)) return null

    const id = numberOrDefault(e.id)
    const foreign_id = numberOrDefault(e.foreign_id)
    if (!id || !foreign_id || !isObject(e.region_city)) return null

    return {
      id,
      foreign_id,
      name: notEmptyStringOrDefault(e.region_city.name, ''),
      state: isObject(e.region_city.state)
        ? {
            name: notEmptyStringOrDefault(e.region_city.state.name, ''),
            name_short: notEmptyStringOrDefault(
              e.region_city.state.name_short,
              '',
            ),
          }
        : {
            name: '',
            name_short: '',
          },
    }
  },
  segments: (e) => {
    if (!isObject(e)) return null

    const id = numberOrDefault(e.id)
    const foreign_id = numberOrDefault(e.foreign_id)
    if (!id || !foreign_id || !isObject(e.segment)) return null

    return {
      id,
      foreign_id,
      name: notEmptyStringOrDefault(e.segment.name, ''),
    }
  },
  market_flags: (e) => {
    if (!isObject(e)) return null

    const id = numberOrDefault(e.id)
    const foreign_id = numberOrDefault(e.foreign_id)
    if (!id || !foreign_id || !isObject(e.market_flag)) return null

    return {
      id,
      foreign_id,
      name: notEmptyStringOrDefault(e.market_flag.name, ''),
      network: isObject(e.market_flag.network)
        ? {
            name: notEmptyStringOrDefault(e.market_flag.network.name, ''),
            group: isObject(e.market_flag.network.group)
              ? {
                  name: notEmptyStringOrDefault(
                    e.market_flag.network.group.name,
                    '',
                  ),
                }
              : {
                  name: '',
                },
          }
        : {
            name: '',
            group: {
              name: '',
            },
          },
    }
  },
}

const getBrand = async (brand_id: number): Promise<Data> => {
  const { data: response } = await axios.get(`/v1/tr/brands/${brand_id}`)

  if (!isObject(response) || !isObject(response.data)) {
    throw new Error('Invalid response')
  }

  if (!response.success) throw new Error('Request returned no sucess!')

  const type = notEmptyStringOrDefault(response.data.type)
  if (!isOneOf(type, ['OWN', 'COMPETITOR'] as Data['type'][])) {
    throw new Error('Invalid response')
  }

  const data: Data = {
    id: numberOrDefault(response.data.id, brand_id),
    code: notEmptyStringOrDefault(response.data.code),
    name: notEmptyStringOrDefault(response.data.name, ''),
    type,
    classification: (() => {
      if (!isObject(response.data.classification)) return null

      const id = numberOrDefault(response.data.classification.id)
      if (!id) return null

      return {
        id,
        name: notEmptyStringOrDefault(response.data.classification.name, ''),
      }
    })(),
    status: booleanOrDefault(response.data.status, false),
    products_count: numberOrDefault(response.data.products_count, 0),

    countries: (Array.isArray(response.data.brands_countries)
      ? response.data.brands_countries
      : []
    ).reduce<Data['countries']>((countries, response) => {
      if (!isObject(response)) return countries

      const id = numberOrDefault(response.id)
      const country_id = numberOrDefault(response.country_id)
      if (!id || !country_id) return countries

      const country: Data['countries'][number] = {
        id,
        country_id,
        name: notEmptyStringOrDefault(response.name, ''),
        occupation: 'NATIONAL',
        states_rule: ruleOrDefault(response.states_rule),
        cities_rule: ruleOrDefault(response.cities_rule),
        segments_rule: ruleOrDefault(response.segments_rule),
        market_flags_rule: ruleOrDefault(response.market_flags_rule),

        ...(isObject(response.links)
          ? Object.entries(parsers).reduce(
              (parsed, [key, parser]) => {
                return {
                  ...parsed,
                  [key]: (
                    (Array.isArray(response.links[key])
                      ? response.links[key]
                      : []) as unknown[]
                  ).reduce<Data['countries'][number][keyof typeof parsers]>(
                    (values, e) => {
                      const parsed = parser(e)

                      return parsed ? [...values, parsed] : values
                    },
                    [],
                  ),
                }
              },
              {
                states: [],
                cities: [],
                segments: [],
                market_flags: [],
              },
            )
          : {
              states: [],
              cities: [],
              segments: [],
              market_flags: [],
            }),
      }

      if (country.states.length > 0 || country.cities.length > 0) {
        country.occupation = 'REGIONAL'
      }

      if (country.states.length === 0) country.states_rule = ''
      if (country.cities.length === 0) country.cities_rule = ''
      if (country.segments.length === 0) country.segments_rule = ''
      if (country.market_flags.length === 0) country.market_flags_rule = ''

      return [...countries, country]
    }, []),

    file: ((response: unknown) => {
      if (!isObject(response)) return null

      const id = numberOrDefault(response.id)
      const url = notEmptyStringOrDefault(response.url)
      if (!id || !url) return null

      return {
        id,
        url,
        extension: notEmptyStringOrDefault(response.extension, ''),
      }
    })(response.data.file),

    supplier: ((response: unknown) => {
      if (!isObject(response)) return null

      const id = numberOrDefault(response.id)
      if (!id) return null

      return {
        id,
      }
    })(response.data.supplier),

    modifier: {
      ...(isObject(response.data.modifier)
        ? {
            ...(response.data.modifier.id
              ? { id: numberOrDefault(response.data.modifier.id) }
              : {}),
            name: notEmptyStringOrDefault(response.data.modifier.name),
          }
        : {
            name: null,
          }),

      at: dateOrDefault(response.data.modified_at, null, 'YYYY-MM-DD HH:mm:ss'),
    },
  }

  return data
}

export default getBrand
