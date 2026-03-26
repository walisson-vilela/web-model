import { GenericObject } from '@mw-kit/mw-ui/types'

import {
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../utils/validators'
import { Data, IFormStores } from '../../interfaces'

const parseModified = (data: GenericObject, parsed: Data) => {
  if (!isObject(data.modifier)) {
    throw new Error('Invalid data!')
  }

  parsed.modifier = {
    ...(isObject(data.modifier)
      ? {
          ...(data.modifier.id
            ? { id: numberOrDefault(data.modifier.id) }
            : {}),
          name: notEmptyStringOrDefault(data.modifier.name),
        }
      : {
          name: null,
        }),

    at: dateOrDefault(data.modified_at, null, 'YYYY-MM-DD HH:mm:ss'),
  }

  return parsed
}

const dataParser = (data: GenericObject, mode: IFormStores['mode']) => {
  let parsed: Data = {
    id: numberOrDefault(data.id),
    modifier: null,
    audits: [],
  }

  let unified_log = false

  if (mode === 'stores') {
    if (!isObject(data.stores_contractor)) throw new Error('Invalid data!')
    parsed = parseModified(data.stores_contractor, parsed)
    unified_log = isObject(data.stores_contractor.unified_log)
  } else {
    parsed = parseModified(data, parsed)
  }

  parsed.audits = (Array.isArray(data.audits) ? data.audits : []).reduce<
    Data['audits']
  >((audits, e) => {
    if (
      !isObject(e) ||
      !isObject(e.coordinate) ||
      !isObject(e.created_by_person)
    ) {
      return audits
    }

    const created_at = dateOrDefault(e.created_at, null, 'YYYY-MM-DD HH:mm:ss')
    if (!created_at) return audits

    const parsed: Data['audits'][number] = {
      created_by: '',
      created_at: new Date(created_at),
      lat: numberOrDefault(e.coordinate.lat, 0),
      lng: numberOrDefault(e.coordinate.lng, 0),
      radius: numberOrDefault(e.coordinate.radius, 0),
    }

    if ('name' in e.created_by_person) {
      parsed.created_by = notEmptyStringOrDefault(e.created_by_person.name)
    } else if (isObject(e.created_by_person.contractor)) {
      parsed.created_by = notEmptyStringOrDefault(
        e.created_by_person.contractor.nickname,
      )
    }

    return [...audits, parsed]
  }, [])

  return { data: parsed, unified_log }
}

export default dataParser
