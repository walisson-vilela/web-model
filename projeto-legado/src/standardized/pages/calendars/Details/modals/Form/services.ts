import type { GenericObject } from '@mw-kit/mw-ui/types'
import moment from 'moment'

import axios from '../../../../../../services/Axios'
import {
  booleanOrDefault,
  numberOrDefault,
} from '../../../../../../utils/Formatters'
import { isObject } from '../../../../../../utils/Validators'
import { ValidationError } from '../../../../../components/form/modals'

import { parseValue } from './functions'
import type { Events, Value } from './types'

const parsePayload = (value: Value) => {
  const payload: GenericObject = {
    name: value.name,
    type: value.type,
  }

  if (value.check_in_required) {
    payload.address = {
      postal_code: value.postal_code,
      street_type: value.street_type,
      street_name: value.street_address,
      street_number: value.street_number,
      complement: value.complement,
      sublocality_name: value.sublocality,
      city_name: value.city,
      state_code: value.state,
      country_name: 'Brasil',
    }

    payload.coordinate = {
      lat: value.lat,
      lng: value.lng,
      radius: value.radius,
    }
  }

  if (value.events.length > 0) {
    payload.starts_at = moment(value.events[0].start).format(
      'YYYY-MM-DD HH:mm:ss',
    )
    payload.ends_at = moment(value.events[0].end).format('YYYY-MM-DD HH:mm:ss')
    payload.children = value.events.slice(1).map((event) => {
      if (event.id) {
        return { id: event.id }
      }
      return {
        starts_at: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
        ends_at: moment(event.end).format('YYYY-MM-DD HH:mm:ss'),
      }
    })
  }

  type Link =
    | { id: number }
    | {
        foreign_table: string
        foreign_id: number
      }

  payload.links_in = (
    [
      ['cities', 'cities', 'city_id'],
      ['states', 'states', 'state_id'],
      ['users', 'users', 'user_id'],
      ['teams', 'hierarchy_elements', 'team_id'],
    ] as const
  ).reduce<Link[]>((links, [key, foreign_table, id]) => {
    const currentValue = value[key]
    if (!currentValue) return links

    if (!Array.isArray(currentValue)) {
      return links
    }

    const newLinks = currentValue.map<Link>((e) => {
      if ((e as never)[id]) {
        return { id: (e as never)[id] as number }
      }

      return {
        foreign_table,
        foreign_id: e.id,
      }
    })

    return links.concat(newLinks)
  }, [])

  return payload
}

export const saveCard = async (
  value: Value,
  dirty?: (keyof Value)[],
  card_id?: number,
): Promise<
  { success: true; id: number } | { success: false; errors: GenericObject }
> => {
  const payload = {
    ...parsePayload(value),
  }

  const { data: response } = await ValidationError.handler(
    card_id
      ? async () => await axios.put(`/v1/tr/user-events/${card_id}`, payload)
      : async () => await axios.post('/v1/tr/user-events', payload),
  )

  if (!isObject(response)) throw new Error('Request returned an invalid data!')

  const success = booleanOrDefault(response.success)
  if (success === null) {
    throw new Error('Missing success status')
  }

  if (success === false) {
    if (!isObject(response.errors)) throw new Error('Missing errors')
    return { success, errors: response.errors }
  }

  const id = (() => {
    if (card_id) return card_id
    if (!isObject(response.data)) throw new Error('Missing data')
    const id = numberOrDefault(response.data.id)
    if (!id) throw new Error('Missing id')

    return id
  })()

  return { success, id }
}

export const getCard = async (
  card_id: number,
  type: 'in' | 'out',
  tab: Value['type'],
): Promise<Value | Events[]> => {
  try {
    const { data: response } = await axios.get(`v1/tr/user-events/${card_id}`)

    if (!isObject(response) || !isObject(response.data)) {
      throw new Error('Request returned an invalid data!')
    }

    const data = await parseValue(response.data, type, tab)
    if (Array.isArray(data)) {
      return data as Events[]
    }
    return data as Value
  } catch (e) {
    console.error(e)
    throw new Error('Request returned no success!')
  }
}
