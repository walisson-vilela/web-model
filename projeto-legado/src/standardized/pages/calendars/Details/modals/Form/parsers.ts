import type { GenericObject } from '@mw-kit/mw-ui/types'

import {
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../utils/Formatters'
import { isObject } from '../../../../../../utils/Validators'
import { cepFormatter } from '../../../../../utils/formatters'

import { defaultValue } from './constants'
import { sortEvents } from './functions'
import type { AddressValue, FormGeolocation, Value } from './types'

const parseTimeEvent = (starts_at: string, ends_at: string, id?: number) => {
  const start = dateOrDefault(starts_at, '', 'YYYY-MM-DD HH:mm:ss')
  const end = dateOrDefault(ends_at, '', 'YYYY-MM-DD HH:mm:ss')
  if (!start || !end) return null

  const dstart = new Date(starts_at)
  const dend = new Date(ends_at)
  if (Number.isNaN(dstart.getTime()) || Number.isNaN(dend.getTime())) {
    return null
  }

  return {
    id: numberOrDefault(id, undefined),
    start: dstart.toISOString(),
    end: dend.toISOString(),
  }
}

export const parseEvents = (data: unknown): Value['events'] => {
  if (data === null || !isObject(data)) {
    return []
  }
  const mainEvent = parseTimeEvent(data.starts_at, data.ends_at, data.id)
  if (mainEvent === null) return []

  if (
    data.children === null ||
    !Array.isArray(data.children) ||
    data.children.length === 0
  ) {
    return [mainEvent]
  }

  const events = data.children.reduce<Value['events']>((groups, group) => {
    if (!isObject(group)) {
      return groups
    }

    const parsed = parseTimeEvent(group.starts_at, group.ends_at, group.id)
    if (parsed === null) return groups

    groups.push(parsed)
    return groups
  }, [])

  events.push(mainEvent)
  return sortEvents(events)
}

export const parseLinks = (links: GenericObject, type: 'in' | 'out') => {
  return {
    cities: (links.cities || []).reduce(
      (cities: Value['cities'], city: unknown) => {
        if (
          !isObject(city) ||
          !isObject(city.region_city) ||
          !isObject(city.region_city.state) ||
          !isObject(city.region_city.country)
        ) {
          return cities
        }

        const id = numberOrDefault(city.foreign_id)
        const city_id = numberOrDefault(city.id)

        if (!id || !city_id) return cities
        if (type !== city.type) return cities

        cities.push({
          id,
          city_id,
          name: notEmptyStringOrDefault(city.region_city.name),
          state: {
            id: numberOrDefault(city.region_city.state.id),
            state_id: numberOrDefault(city.region_city.state.id),
            name: notEmptyStringOrDefault(city.region_city.state.name),
            short_name: notEmptyStringOrDefault(
              city.region_city.state.short_name,
            ),
          },
          country: {
            id: numberOrDefault(city.region_city.country.id),
            name: notEmptyStringOrDefault(city.region_city.country.name),
          },
        } satisfies Value['cities'][number])

        return cities
      },
      [],
    ) as Value['cities'],
    states: (links.states || []).reduce(
      (states: Value['states'], item: unknown) => {
        if (
          !isObject(item) ||
          !isObject(item.region_state) ||
          !isObject(item.region_state.country)
        ) {
          return states
        }

        const id = numberOrDefault(item.foreign_id)
        const state_id = numberOrDefault(item.id)

        if (!id || !state_id) return states
        if (type !== item.type) return states
        states.push({
          id,
          state_id,
          name: notEmptyStringOrDefault(item.region_state.name),
          short_name: notEmptyStringOrDefault(item.region_state.name_short),
          country: {
            id: numberOrDefault(item.region_state.country.id),
            name: notEmptyStringOrDefault(item.region_state.country.name),
          },
        } satisfies Value['states'][number])

        return states
      },
      [],
    ) as Value['states'],
    users: (links.users || []).reduce(
      (users: Value['users'], item: unknown) => {
        if (
          !isObject(item) ||
          !isObject(item.user) ||
          !isObject(item.user.role) ||
          !isObject(item.user.person)
        ) {
          return users
        }

        const id = numberOrDefault(item.foreign_id)
        const user_id = numberOrDefault(item.id)

        if (!id || !user_id) return users
        if (type !== item.type) return users

        users.push({
          id,
          user_id,
          name: notEmptyStringOrDefault(item.user.name),
          role: {
            id: numberOrDefault(item.user.role.id),
            name: notEmptyStringOrDefault(item.user.role.name),
          },
          person: {
            registration: notEmptyStringOrDefault(
              item.user.person.registration,
            ),
          },
        } satisfies Value['users'][number])

        return users
      },
      [],
    ) as Value['users'],
    teams: (links.hierarchy_elements || []).reduce(
      (acc: Value['teams'], item: unknown) => {
        if (
          !isObject(item) ||
          !isObject(item.hierarchy_element) ||
          !isObject(item.hierarchy_element.hierarchy)
        ) {
          return acc
        }

        if (type !== item.type) return acc

        const id = numberOrDefault(item.foreign_id)
        const team_id = numberOrDefault(item.id)

        if (!id || !team_id) return acc

        const team: Value['teams'][number] = {
          id,
          team_id,
          name: notEmptyStringOrDefault(item.hierarchy_element.name, ''),
          child_count: 0,
          hierarchy: {
            id: numberOrDefault(item.hierarchy_element.hierarchy.id, 0),
            name: notEmptyStringOrDefault(
              item.hierarchy_element.hierarchy.name,
              '',
            ),
          },
          user: null,
          role: null,
        }

        if (isObject(item.hierarchy_element.user)) {
          team.user = {
            id: numberOrDefault(item.hierarchy_element.user.id),
            name: notEmptyStringOrDefault(item.hierarchy_element.user.name, ''),
          }

          if (isObject(item.hierarchy_element.user.role)) {
            team.role = {
              id: numberOrDefault(item.hierarchy_element.user.role.id, 0),
              name: notEmptyStringOrDefault(
                item.hierarchy_element.user.role.name,
                '',
              ),
            }
          }
        }

        acc.push(team)
        return acc
      },
      [],
    ) as Value['teams'],
  }
}

export const parseGeolocation = (data: GenericObject): FormGeolocation => {
  const parsed: FormGeolocation = {
    geolocation_at: defaultValue.geolocation_at,
    geolocation_by_id: defaultValue.geolocation_by_id,
    geolocation_by_name: defaultValue.geolocation_by_name,
    lat: defaultValue.lat,
    lng: defaultValue.lng,
    radius: defaultValue.radius,
  }

  if (!isObject(data)) return parsed

  parsed.lat = numberOrDefault(data.lat, defaultValue.lat)
  parsed.lng = numberOrDefault(data.lng, defaultValue.lng)
  parsed.radius = numberOrDefault(data.radius, defaultValue.radius)

  if (isObject(data.modifier)) {
    parsed.geolocation_by_id = numberOrDefault(
      data.modifier.id,
      defaultValue.geolocation_by_id,
    )
    parsed.geolocation_by_name = notEmptyStringOrDefault(
      data.modifier.name,
      defaultValue.geolocation_by_name,
    )
    parsed.geolocation_at = dateOrDefault(
      data.modified_at,
      defaultValue.geolocation_at,
      'YYYY-MM-DD HH:mm:ss',
    )
  }

  return parsed
}

export const parseAddress = (
  data: unknown,
): Omit<AddressValue, keyof FormGeolocation> => {
  const parsed: Omit<AddressValue, keyof FormGeolocation> = {
    postal_code: defaultValue.postal_code,
    street_type: defaultValue.street_type,
    street_address: defaultValue.street_address,
    street_number: defaultValue.street_number,
    complement: defaultValue.complement,
    sublocality: defaultValue.sublocality,
    city: defaultValue.city,
    state: defaultValue.state,
  }

  if (!isObject(data)) {
    return parsed
  }

  parsed.postal_code = cepFormatter(
    notEmptyStringOrDefault(data.postal_code, defaultValue.postal_code),
  )
  parsed.street_type = notEmptyStringOrDefault(
    data.street_type,
    defaultValue.street_type,
  )
  parsed.street_address = notEmptyStringOrDefault(
    data.street_name,
    defaultValue.street_address,
  )
  parsed.street_number = notEmptyStringOrDefault(
    data.street_number,
    defaultValue.street_number,
  )
  parsed.complement = notEmptyStringOrDefault(
    data.complement,
    defaultValue.complement,
  )
  parsed.sublocality = notEmptyStringOrDefault(
    data.sublocality_name,
    defaultValue.sublocality,
  )
  parsed.city = notEmptyStringOrDefault(data.city_name, defaultValue.city)
  parsed.state = notEmptyStringOrDefault(data.state_code, defaultValue.state)

  return parsed
}
