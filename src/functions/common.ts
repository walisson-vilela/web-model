import type { GenericObject } from '../interfaces'

export const stripAccents = (value: string): string => {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export const isKeyOf = <T>(
  object: T,
  key: string | number | symbol,
): key is keyof T => {
  return Object.prototype.hasOwnProperty.call(object, key)
}

export const isObject = <T = unknown>(value: unknown): value is T => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export const dateToIsoString = (
  date: Date,
  time = false,
  fullYear = true,
  pattern: 'us' | 'br' = 'br',
): string => {
  const dateData = [
    date.getDate().toString().padStart(2, '0'),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getFullYear().toString().padStart(4, '0'),
  ]

  if (fullYear === false) dateData[2] = dateData[2].substring(2, 4)

  let dateStr = dateData.join('/')

  if (pattern === 'us') {
    const tmp = dateData[0]
    dateData[0] = dateData[2]
    dateData[2] = tmp
    dateStr = dateData.join('-')
  }

  if (!time) return dateStr

  const timeStr = [
    date.getHours().toString().padStart(2, '0'),
    date.getMinutes().toString().padStart(2, '0'),
    date.getSeconds().toString().padStart(2, '0'),
  ].join(':')

  return [dateStr, timeStr].join(' ')
}

export const keys = <T extends GenericObject>(value: T): (keyof T)[] => {
  return Object.keys(value)
}
