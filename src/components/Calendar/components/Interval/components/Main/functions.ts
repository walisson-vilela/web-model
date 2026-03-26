import { dateCompare } from '../../../../../../functions/validators'
import { getCalendar, isDateBetween } from '../../../../functions'
import type { CalendarInterface } from '../../../Basic/interfaces'
import type { InputTimeProps, Value } from '../../interfaces'

import type { MainProps } from './interfaces'

export const getValue = (dates: (Date | null)[], min?: Date, max?: Date) => {
  const n = [
    ...dates
      .filter((d) => d && !isNaN(d.getTime()) && isDateBetween(d, min, max))
      .sort((a, b) => {
        if (dateCompare(a as Date, b as Date, 'eq')) return 0
        return dateCompare(a as Date, b as Date, 'lt') ? -1 : 1
      }),
    null,
    null,
  ]
  return n.slice(0, 2) as Value
}

export const getCalendar2 = (
  calendar1: CalendarInterface,
): CalendarInterface => {
  const date = new Date()
  date.setFullYear(calendar1.year)
  date.setMonth(calendar1.month + 1)
  date.setDate(1)
  date.setHours(0, 0, 0, 0)
  return getCalendar(date)
}

export const getTimeProps = (
  time: MainProps['time'],
  value: Value,
): [InputTimeProps | undefined, InputTimeProps | undefined] => {
  if (time === true) return [{}, {}]
  if (!time) return [undefined, undefined]
  return time.map((e, i) => {
    return typeof e === 'function' ? e(value[i]) : e
  }) as [InputTimeProps | undefined, InputTimeProps | undefined]
}
