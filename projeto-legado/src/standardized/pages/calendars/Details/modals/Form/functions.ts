import { cloneDeep } from 'lodash'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../utils/Formatters'
import { isObject } from '../../../../../../utils/Validators'

import { defaultValue } from './constants'
import {
  parseAddress,
  parseEvents,
  parseGeolocation,
  parseLinks,
} from './parsers'
import type { Events, FormType, Value } from './types'

export const sortEvents = (events: Value['events']): Value['events'] => {
  const dates = events.sort((x, y) => {
    const a = {
      start: new Date(x.start),
      end: new Date(x.end),
    }

    const b = {
      start: new Date(y.start),
      end: new Date(y.end),
    }

    if (a.start.getTime() < b.start.getTime()) return -1
    if (a.start.getTime() > b.start.getTime()) return 1

    if (a.end.getTime() < b.end.getTime()) return -1
    if (a.end.getTime() > b.end.getTime()) return 1

    return 0
  })

  const sorted = dates.slice(1).reduce((sorted, event) => {
    const getDate = (d: string) => {
      const date = new Date(d)
      return [date.getFullYear(), date.getMonth(), date.getDate()].join('')
    }

    if (getDate(event.start) === getDate(sorted[sorted.length - 1].start)) {
      return sorted
    }

    sorted.push(event)
    return sorted
  }, dates.slice(0, 1))

  return sorted
}

export const parseValue = async (
  data: unknown,
  type: 'in' | 'out',
  tab: Value['type'],
): Promise<Events[] | Value> => {
  if (type === 'in') {
    if (!isObject(data)) return { ...cloneDeep(defaultValue), type: tab }

    const value: Value = {
      // Step1
      name: notEmptyStringOrDefault(data.name, defaultValue.name),
      type: notEmptyStringOrDefault(data.type, tab) as FormType,
      check_in_required: false,
      ...parseAddress(data.address),
      ...parseGeolocation(data.coordinate),

      // Step2
      events: parseEvents(data),
      // Step3
      ...parseLinks(data.links, type),
      regions: [],
    }

    if (data.address !== null) {
      value.check_in_required = true
    }

    return value
  }

  if (!isObject(data)) return [] as Events[]
  const events = [data, ...(data.children || [])].reduce<Events[]>(
    (acc, item) => {
      if (!isObject(item)) return acc
      const id = numberOrDefault(item.id)
      if (!id) return acc

      const event: Events = {
        id,
        start: new Date(item.starts_at),
        end: new Date(item.ends_at),
        ...parseLinks(data.links, type),
      }

      acc.push(event)
      return acc
    },
    [] as Events[],
  )

  return events as Events[]
}
