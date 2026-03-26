/* eslint-disable indent */
import moment from 'moment'

import {
  booleanOrDefault,
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'

import { mainFormConstant } from './constants'
import type { Intervals, MainForm } from './interfaces'

const dataFormat = (date: string, defaultValue = '') =>
  date
    ? dateOrDefault(moment(date).format('HH:mm'), '', 'HH:mm')
    : defaultValue
    ? dateOrDefault(moment(defaultValue).format('HH:mm'), '', 'HH:mm')
    : '-'

export const parseIntervals = (content: unknown) => {
  if (!Array.isArray(content) || content.length === 0) return []

  const intervals = content.reduce<Intervals[]>((acc, item) => {
    if (!isObject(item)) return acc

    const obj: Intervals = {
      starts_at: dataFormat(item.starts_at),
      ends_at: dataFormat(item.ends_at),
      name: notEmptyStringOrDefault(item.name, '-'),
      start_limit: dataFormat(item.start_limit, item.starts_at),
      flag: booleanOrDefault(item.flag, false),
    }
    acc.push(obj)
    return acc
  }, [])

  return intervals
}

export const parseWeekDays = (content: unknown) => {
  if (!Array.isArray(content) || content.length === 0) return []

  const weekDays = content.reduce<MainForm['weekdays']>((acc, item) => {
    if (!isObject(item)) return acc

    const interval: MainForm['weekdays'][0] = {
      weekday: numberOrDefault(item.weekday, 0),
      weekday_label: notEmptyStringOrDefault(item.weekday_label, ''),
      starts_at: dataFormat(item.starts_at),
      ends_at: dataFormat(item.ends_at),
      intervals: [],
    }

    interval.intervals = parseIntervals(item.intervals)

    acc.push(interval)
    return acc
  }, [])

  return weekDays
}

export const formParser = (data: unknown): MainForm => {
  if (!isObject(data)) return mainFormConstant

  const parsed: MainForm = {
    id: numberOrDefault(data.id, undefined),
    electronic_point: booleanOrDefault(
      data.electronic_point,
      mainFormConstant.electronic_point,
    ),
    tolerance_before: numberOrDefault(
      data.tolerance_before,
      mainFormConstant.tolerance_before,
    ),
    tolerance_after: numberOrDefault(
      data.tolerance_after,
      mainFormConstant.tolerance_after,
    ),
    weekdays: [],
  }
  if (data.weekdays) {
    parsed.weekdays = parseWeekDays(data.weekdays)
  }

  return parsed
}
