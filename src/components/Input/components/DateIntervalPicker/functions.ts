import {
  dateToIsoString,
  getFirstWeek,
  getLastWeek,
  getMonthName,
  getWeekNumber,
} from '../../../../functions/formatters'
import { dateCompare } from '../../../../functions/validators'
import type { Value } from '../../../Calendar/components/Interval/interfaces'

import type { IntervalType, IntervalTypes } from './interfaces'

export const validate: (value: Value, min?: Date, max?: Date) => boolean = (
  [start, end],
  min,
  max,
) => {
  if (start === null || end === null) return true
  if (min && dateCompare(start, min, 'lt')) return false
  if (max && dateCompare(end, max, 'gt')) return false
  return true
}

export const intervalTypes: IntervalTypes = {
  day: {
    label: (prev) => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (dateCompare(today, prev[0], 'eq', false)) return 'Hoje'
      return dateToIsoString(prev[0], false, false)
    },
    initial: (base) => {
      if (!base) base = new Date()

      const start = new Date(base)
      start.setHours(0, 0, 0, 0)

      const end = new Date(base)
      end.setHours(23, 59, 59, 999)

      return [start, end]
    },
    increment: (prev) => {
      return prev.map((d) => {
        const tmp = new Date(d)
        tmp.setDate(tmp.getDate() + 1)
        return tmp
      }) as [Date, Date]
    },
    decrement: (prev) => {
      return prev.map((d) => {
        const tmp = new Date(d)
        tmp.setDate(tmp.getDate() - 1)
        return tmp
      }) as [Date, Date]
    },
  },
  week: {
    label: (prev) => {
      const [weekNumber] = getWeekNumber(prev[0])
      return `${weekNumber}ª Semana`
    },
    initial: (base) => {
      if (!base) base = new Date()

      const start = new Date(base)
      start.setDate(start.getDate() - start.getUTCDay())
      start.setHours(0, 0, 0, 0)

      const end = new Date(start)
      end.setDate(start.getDate() + 6)
      end.setHours(23, 59, 59, 999)

      return [start, end]
    },
    increment: (prev) => {
      return prev.map((d) => {
        const tmp = new Date(d)
        tmp.setDate(tmp.getDate() + 7)
        return tmp
      }) as [Date, Date]
    },
    decrement: (prev) => {
      return prev.map((d) => {
        const tmp = new Date(d)
        tmp.setDate(tmp.getDate() - 7)
        return tmp
      }) as [Date, Date]
    },
    getMinMax: (min, max) => {
      const firstWeek = getFirstWeek()
      const lastWeek = getLastWeek()

      if (!min || min < firstWeek) min = firstWeek
      if (!max || max > lastWeek) max = lastWeek

      return {
        min,
        max,
      }
    },
  },
  month: {
    label: (prev) => {
      const monthName = getMonthName(prev[0])
      const year = prev[0].getFullYear()

      return `${monthName}/${year}`
    },
    initial: (base) => {
      if (!base) base = new Date()

      const start = new Date(base)
      start.setDate(1)
      start.setHours(0, 0, 0, 0)

      const end = new Date(start)
      end.setMonth(end.getMonth() + 1)
      end.setDate(0)
      end.setHours(23, 59, 59, 999)

      return [start, end]
    },
    increment: (prev) => {
      const start = new Date(prev[0])
      start.setDate(1)
      start.setMonth(start.getMonth() + 1)

      const end = new Date(start)
      end.setMonth(end.getMonth() + 1)
      end.setDate(0)
      end.setHours(23, 59, 59, 999)

      return [start, end]
    },
    decrement: (prev) => {
      const start = new Date(prev[0])
      start.setDate(1)
      start.setMonth(start.getMonth() - 1)

      const end = new Date(start)
      end.setMonth(end.getMonth() + 1)
      end.setDate(0)
      end.setHours(23, 59, 59, 999)

      return [start, end]
    },
  },
  custom: {
    label: (prev) => {
      const start = dateToIsoString(prev[0], true, false)
        .substring(0, 14)
        .split(' ')
      const end = dateToIsoString(prev[1], true, false)
        .substring(0, 14)
        .split(' ')

      if (start[1] === '00:00' && end[1] === '23:59') {
        start.pop()
        end.pop()
      } else {
        start[1] = `(${start[1]})`
        end[1] = `(${end[1]})`
      }

      return `${start.join(' ')} à ${end.join(' ')}`
    },
    initial: (base) => {
      if (!base) base = new Date()
      return [base, base]
    },
  },
}

export const identify = (value: Value): IntervalType => {
  const [start, end] = value

  if (start === null || end === null) return 'custom'

  if (dateCompare(start, end, 'eq', false)) {
    const [expectedStart, expectedEnd] = intervalTypes.day.initial(start)

    if (
      dateCompare(start, expectedStart, 'eq') &&
      dateCompare(end, expectedEnd, 'eq')
    ) {
      return 'day'
    }
  }

  if (start.getUTCDay() === 0) {
    const [expectedStart, expectedEnd] = intervalTypes.week.initial(start)
    if (
      dateCompare(start, expectedStart, 'eq') &&
      dateCompare(end, expectedEnd, 'eq')
    ) {
      return 'week'
    }
  }

  if (start.getDate() === 1) {
    const [expectedStart, expectedEnd] = intervalTypes.month.initial(start)
    if (
      dateCompare(start, expectedStart, 'eq') &&
      dateCompare(end, expectedEnd, 'eq')
    ) {
      return 'month'
    }
  }

  return 'custom'
}

export const parse = (value: [string, string]): [Date | null, Date | null] =>
  value.map((v) => (v ? new Date(v) : null)) as [Date | null, Date | null]
