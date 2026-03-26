import moment from 'moment'

import { PERMISSIONS } from './Right/constants'
import type { Event, Permission, Permissions } from './types'

export const getPermission = (event: Event): Permissions[Permission] => {
  const now = new Date()
  const start = new Date(event.start)
  const end = new Date(event.end)

  if (now.getTime() < start.getTime()) return PERMISSIONS.REMOVE
  return now.getTime() > end.getTime() ? PERMISSIONS.NONE : PERMISSIONS.BREAK
}

export const isAllDay = (event: Event): boolean => {
  const start = new Date(event.start)
  const end = new Date(event.end)
  return (
    start.getHours() === 0 &&
    start.getMinutes() === 0 &&
    end.getHours() === 23 &&
    end.getMinutes() === 59
  )
}

export const getEventByDay = (day: Date, events: Event[]) => {
  const event = events.find((event) => {
    const start = moment(event.start).startOf('day')
    const end = moment(event.end).endOf('day')
    return moment(day).isSameOrAfter(start) && moment(day).isSameOrBefore(end)
  })

  return event
}

export const getRange = (
  interval: [Date | null, Date | null],
  type: 'days' | 'hours',
) => {
  const fromDate = moment(interval[0])
  const toDate = moment(interval[1] || interval[0])
  const diff = toDate.diff(fromDate, type)
  const range = []
  for (let i = 0; i <= diff; i++) {
    range.push(moment(interval[0]).add(i, type))
  }
  return range
}

export const isValidIntervalTime = (
  interval: [Date | null, Date | null],
  start: string,
  end: string,
) => {
  if (interval[0] && interval[1]) {
    const s = moment(interval[0])
    const e = moment(interval[1])
    if (s.isValid() && e.isValid()) {
      const days = e.diff(s, 'days', true)
      if (days >= 1) return true
    }
  }

  const m = [start, end].map((e) => moment(e, 'HH:mm', true))
  if (m.some((v) => !v.isValid())) return false

  const minutes = m[1].diff(m[0], 'minutes')
  return minutes >= 60
}

export const splitTime = (v: string) => {
  const [h, m] = v
    .split(':')
    .map((e) => parseInt(e))
    .slice(0, 2) as [number, number]

  return [h, m, ...(m === 59 ? [59, 999] : [0, 0])] as [
    number,
    number,
    number,
    number,
  ]
}
