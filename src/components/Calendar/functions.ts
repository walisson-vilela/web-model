import { dateCompare, isValidTime } from '../../functions/validators'

import type { CalendarInterface } from './components/Basic/interfaces'

export const getCalendar = (d: Date): CalendarInterface => {
  const date = new Date(d.getTime())
  date.setHours(0, 0, 0, 0)
  const month = date.getMonth()
  const year = date.getFullYear()

  const days: Date[] = []

  date.setDate(1)
  date.setDate(date.getDate() - 1)

  while (date.getDay() !== 6 || days.length === 0) {
    const copy = new Date(date.getTime())
    days.unshift(copy)
    date.setDate(date.getDate() - 1)
  }

  date.setDate(date.getDate() + days.length + 1)

  while (month === date.getMonth()) {
    const copy = new Date(date.getTime())
    days.push(copy)
    date.setDate(date.getDate() + 1)
  }

  while (days.length < 42) {
    const copy = new Date(date.getTime())
    days.push(copy)
    date.setDate(date.getDate() + 1)
  }

  const weeks: Date[][] = []
  let week: Date[] = [days[0]]

  for (let i = 1; i < days.length; i++) {
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
    week.push(days[i])
  }
  weeks.push(week)

  return { month, year, weeks }
}

export const getMiddle = (min?: Date, max?: Date): Date => {
  const today = new Date()

  if (!max) {
    if (!min) return today

    // se nao tem maximo e tem minimo, se dia de hoje for maior que minimo, usa o dia de hoje, se nao usa o dia minimo
    return dateCompare(today, min, 'gte', false) ? today : min
  }

  if (!min) {
    if (!max) return today

    // se nao tem minimo e tem maximo, se dia de hoje for menor que maximo, usa o dia de hoje, se nao usa o dia maximo
    return dateCompare(today, max, 'lte', false) ? today : max
  }

  // se o dia atual esta entre o intervalo, usa o dia atual
  if (
    dateCompare(today, min, 'gte', false) &&
    dateCompare(today, max, 'lte', false)
  ) {
    return today
  }

  // se nao, usa o dia medio do intervalo
  const days = Math.ceil(
    Math.abs(max.getTime() - min.getTime()) / (1000 * 60 * 60 * 24) / 2,
  )
  const result = new Date(min)
  result.setDate(result.getDate() + days)

  return result
}

export const getFullDate = (date: Date, time: string, end?: true): Date => {
  const v = new Date(date)

  const hours: [number, number, number, number] = end
    ? [23, 59, 59, 999]
    : [0, 0, 0, 0]

  time.split(':').forEach((v, i) => {
    const parsed = parseInt(v)
    if (isNaN(parsed)) return
    hours[i] = parsed
  })

  v.setHours(...hours)

  return v
}

export const isDateBetween = (date: Date, min?: Date, max?: Date): boolean => {
  if (!max) {
    if (!min) return true
    return dateCompare(date, min, 'gte')
  }

  if (!min) {
    if (!max) return true
    return dateCompare(date, max, 'lte')
  }

  return dateCompare(date, min, 'gte') && dateCompare(date, max, 'lte')
}

export const getTimeFromDate = (date: Date | null): string => {
  if (!date) return ''
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()

  return [h, m, s].map((v) => v.toString().padStart(2, '0')).join(':')
}

export const isInvalid = (
  value: Date | null,
  time: string,
  timeOptions?: { required?: boolean; seconds?: boolean },
  min?: Date,
  max?: Date,
): boolean => {
  if (!value) {
    return false
  }

  if (timeOptions) {
    if (time.length === 0) {
      if (timeOptions.required) {
        return true
      }
    } else if (
      !isValidTime(time, {
        h: 'required',
        m: 'required',
        s: timeOptions.seconds ? 'required' : 'optional',
      })
    ) {
      return true
    }
  }

  const date = getFullDate(value, time)

  return (
    (min !== undefined && dateCompare(date, min, 'lt')) ||
    (max !== undefined && dateCompare(date, max, 'gt'))
  )
}

export const getInitialCalendar = (date?: Date, min?: Date, max?: Date) => {
  return getCalendar(
    date && !isNaN(date.getTime()) && isDateBetween(date, min, max)
      ? date
      : getMiddle(min, max),
  )
}
