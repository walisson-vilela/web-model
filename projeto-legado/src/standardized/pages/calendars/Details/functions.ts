import moment from 'moment'

import { date as formatDate } from '../../../../utils/Formatters'

import { Card } from './components/types'

const formatStartEnd = (date: string, mode: 'start' | 'end'): string => {
  const sufix = {
    start: '00:00',
    end: '23:59',
  }
  const parsed = [formatDate(date, 'DD/MM/YYYY'), formatDate(date, 'HH:mm')]
  return parsed[1] === sufix[mode] ? parsed[0] : parsed.join(' ')
}

export const formatInterval = (start: string, end: string): string => {
  const dates = [start, end].map((d) => formatDate(d, 'DD/MM/YYYY'))
  const times = [start, end].map((d) => formatDate(d, 'HH:mm'))

  if (dates[0] === dates[1]) {
    return times[0] === '00:00' && times[1] === '23:59'
      ? dates[0]
      : `${dates[0]} ${times[0]} às ${times[1]}`
  }

  return [
    [dates[0], ...(times[0] === '00:00' ? [] : [times[0]])],
    [dates[1], ...(times[1] === '23:59' ? [] : [times[1]])],
  ]
    .map((d) => d.join(' '))
    .join(' à ')
}

export const formatIntervalDate = (start: string, end: string): string => {
  const parsed = [
    formatDate(start, 'DD/MM/YYYY'),
    formatDate(end, 'DD/MM/YYYY'),
  ]
  return parsed[0] === parsed[1] ? parsed[0] : parsed.join(' à ')
}

export const getIsFuture = (card: Card): boolean => {
  const limit = moment().add(1, 'hours')
  return moment(card.starts_at).isAfter(limit)
}

export const checkEventTime = (date: Date): number => {
  const today = moment()
  const momentDate = moment(date)

  if (momentDate.isBefore(today)) return -1
  if (momentDate.isAfter(today)) return 1

  return 0
}
