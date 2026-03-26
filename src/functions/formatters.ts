import type {
  Border,
  Borders,
  GenericObject,
  SpacingOrZero,
  Spacings,
} from '../interfaces'
import { spacings } from '../theme/constants'

import { isKeyOf, isObject, keys } from './common'
import {
  isBoolean,
  isNumber,
  isNumericString,
  notEmptyString,
} from './validators'

export const filterObject = <T extends GenericObject, R extends GenericObject>(
  object: T,
  remove: (keyof T)[],
  inital = {} as Partial<R>,
): R => {
  const r = keys(object)
    .filter((key) => !remove.includes(key))
    .reduce(
      (prev, key) => ({
        ...prev,
        [key]: object[key],
      }),
      inital as R,
    )

  return r
}

export const phone = (value: string) => {
  let masked = value

  if (value.startsWith('+55')) {
    masked = value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{2})(\d)/, '+$1 ($2) $3')
      .replace(/(\d{5})(\d{4})$/, '$1-$2')
      .replace(/(\d{4})(\d{4})/, '$1-$2')
  }

  return masked
}

export const cnpj = (value: string) => {
  return value
    .replace(/\D/g, '')
    .substring(0, 14)
    .replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, '$1.$2.$3/$4-$5')
}

export const cpf = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{3})(\d{3})?(\d{3})?(\d{2})?/, '$1.$2.$3-$4')
}

export const cep = (value: string) => {
  return value
    .replace(/\D/g, '')
    .substring(0, 8)
    .replace(/^(\d{5})(\d{3})/, '$1-$2')
}

interface TimeLabels {
  hour?: string
  minute?: string
  join?: string
}

export const time = (value: number, labels?: TimeLabels): string => {
  const l: TimeLabels = {
    hour: 'h',
    minute: 'm',
    join: 'e',
  }

  if (labels) {
    const k = keys(labels)
    k.forEach((key) => (l[key] = labels[key]))
  }

  const hours = Math.floor(value / 60)
  const minutes = value % 60

  const result = []
  if (hours > 0) result.push(`${hours}${l.hour}`)
  result.push(`${minutes}${l.minute}`)

  return result.join(l.join)
}

export const simpleTime = (value: number) => {
  return [Math.floor(value / 60), value % 60]
    .map((num) => num.toString().padStart(2, '0'))
    .join(':')
}

export const reverseSimpleTime = (value: string) => {
  const t = value.replace(/\D/g, '')

  if (t.length === 0) return 0

  const h = parseInt(t.substring(0, 2).padEnd(2, '0'))

  if (t.length < 3) return h * 60

  const m = parseInt(t.substring(2, 4).padEnd(2, '0'))

  return h * 60 + m
}

export const intToBool = (value: 1 | 0): boolean => {
  const values = {
    1: true,
    0: false,
  }

  return values[value]
}

export const boolToInt = (value: boolean): 1 | 0 => {
  return value ? 1 : 0
}

export const numberOrDefault = <T = unknown>(
  value: unknown,
  defaultValue: T,
): number | T => {
  if (isNumber(value)) return value
  if (isNumericString(value)) return parseFloat(value)
  return defaultValue
}

export const booleanOrDefault = <T = unknown>(
  value: unknown,
  defaultValue: T,
): boolean | T => {
  if (isBoolean(value)) return value

  if (isNumber(value)) return value > 0
  if (isNumericString(value)) return parseInt(value) > 0

  return defaultValue
}

export const notEmptyStringOrDefault = <T = unknown>(
  value: unknown,
  defaultValue: T,
): string | T => {
  if (notEmptyString(value)) return value.trim()
  return defaultValue
}

export const capitalize = (value: string): string => {
  return value
    .split(' ')
    .map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(' ')
}

export const isoStringToDate = (value: string): Date | null => {
  const [d, t = '00:00:00'] = value.split(' ')

  const date = new Date(
    d.split('/').reverse().join('-') +
      ' ' +
      [...t.split(':'), '0', '0', '0']
        .slice(0, 3)
        .map((s) => s.padEnd(2, '0'))
        .join(':'),
  )
  return isNaN(date.getTime()) ? null : date
}

export const getWeekNumber = (value: Date): [number, number] => {
  // cloning date
  const weekSunday = new Date(value)
  // reset time
  weekSunday.setHours(0, 0, 0, 0)
  // set date to week sunday
  weekSunday.setDate(weekSunday.getDate() - weekSunday.getUTCDay())
  // get first day of year
  const yearStart = new Date(Date.UTC(weekSunday.getUTCFullYear(), 0, 1))
  // calculate full weeks to the target week
  const weekNumber = Math.ceil(
    ((weekSunday.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  )
  // return array of year and week number
  return [weekNumber, weekSunday.getUTCFullYear()]
}

export const getMonthName = (value: Date): string => {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  const monthName = months[value.getMonth()]
  return monthName
}

export const getFirstWeek = (year?: number) => {
  const today = new Date()

  if (year !== undefined) today.setFullYear(year)
  else year = today.getFullYear()

  // jumping to last day of year
  const week = new Date(`${year}-01-01 00:00:00`)
  // jumping to week sunday
  week.setDate(week.getDate() - week.getUTCDay() - 7)
  week.setHours(0, 0, 0, 0)

  let [, weekYear] = getWeekNumber(week)

  while (weekYear !== year) {
    // jumping to next sunday
    week.setDate(week.getDate() + 7)
    ;[, weekYear] = getWeekNumber(week)
  }

  return week
}

export const getLastWeek = (year?: number) => {
  const today = new Date()

  if (year !== undefined) today.setFullYear(year)
  else year = today.getFullYear()

  // jumping to last day of year
  const week = new Date(`${year}-12-31 00:00:00`)
  // jumping to week saturday
  week.setDate(week.getDate() - week.getUTCDay() + 6)
  week.setHours(23, 59, 59, 0)

  let [, weekYear] = getWeekNumber(week)

  while (weekYear !== year) {
    // jumping to previous saturday
    week.setDate(week.getDate() - 7)
    ;[, weekYear] = getWeekNumber(week)
  }

  return week
}

export { stripAccents, dateToIsoString, keys } from './common'

export const getSpacings = (
  value: SpacingOrZero | Spacings,
  defaults?: SpacingOrZero | Spacings,
) => {
  let d = {
    top: 's1',
    left: 's1',
    bottom: 's1',
    right: 's1',
  }

  if (defaults) {
    if (typeof defaults === 'string') {
      d.top = defaults
      d.left = defaults
      d.bottom = defaults
      d.right = defaults
    } else {
      d = {
        ...d,
        ...defaults,
      }
    }
  }

  const spacing =
    typeof value === 'string'
      ? {
          top: value,
          left: value,
          bottom: value,
          right: value,
        }
      : {
          ...d,
          ...value,
        }

  const values = {
    top: isKeyOf(spacings, spacing.top) ? spacings[spacing.top] : spacing.top,
    left: isKeyOf(spacings, spacing.left)
      ? spacings[spacing.left]
      : spacing.left,
    bottom: isKeyOf(spacings, spacing.bottom)
      ? spacings[spacing.bottom]
      : spacing.bottom,
    right: isKeyOf(spacings, spacing.right)
      ? spacings[spacing.right]
      : spacing.right,
  }

  return `${values.top} ${values.right} ${values.bottom} ${values.left}`
}

export const getBorder = (config: Borders): Exclude<Borders, Border> => {
  return 'color' in config
    ? {
        top: config,
        left: config,
        bottom: config,
        right: config,
      }
    : config
}

export const clone = <T>(value: T): T => {
  if (Array.isArray(value)) {
    const r = value.map(clone) as unknown as T
    return r
  }

  if (isObject<GenericObject>(value)) {
    const r = keys(value).reduce((prev, key) => {
      const v = clone(value[key])
      return { ...prev, [key]: v }
    }, {} as T)
    return r
  }

  return value
}

export const unique = <T>(
  value: T[],
  callback: (item: T, arr: T[]) => boolean = (item, arr) => arr.includes(item),
): T[] => {
  return value.filter((v, _i, self) => callback(v, self))
}
