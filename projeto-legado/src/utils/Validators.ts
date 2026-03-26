import { GenericObject } from '@mw-kit/mw-ui/types'
import { AnyObjectSchema } from 'yup'

import { stripAccents } from './Formatters'

export const notEmptyString = (value: any): value is string => {
  return typeof value === 'string' && value.trim() !== ''
}

export function isNumber(value: any): value is number {
  return typeof value === 'number'
}

export const isNumeric = (value: any): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

export const isObject = <T extends GenericObject = GenericObject>(
  value: unknown,
): value is T => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export const isArray = (value: any): value is any[] => {
  return Array.isArray(value)
}

export const isBoolean = (value: any): value is boolean => {
  return typeof value === 'boolean'
}

export const isNumericString = (value: any): value is string => {
  return notEmptyString(value) && isNumeric(value)
}

export const isString = (value: any): value is string => {
  return typeof value === 'string'
}

export const isDateInstance = (value: any): boolean => {
  return value instanceof Date && !isNaN(value.valueOf())
}

export const strCmp = (
  x: string,
  y: string,
  options: {
    ignoreAccents?: boolean
    ignoreCase?: boolean
    trim?: boolean
    contain?: boolean
  } = {},
): boolean => {
  options = {
    ignoreAccents: true,
    ignoreCase: true,
    trim: true,
    contain: false,
    ...options,
  }

  if (options.trim) {
    x = x.trim()
    y = y.trim()
  }

  if (options.ignoreCase) {
    x = x.toUpperCase()
    y = y.toUpperCase()
  }

  if (options.ignoreAccents) {
    x = stripAccents(x)
    y = stripAccents(y)
  }

  return options.contain ? x.includes(y) : x === y
}

export const isValidEmail = (value: unknown): boolean => {
  if (typeof value !== 'string') return false

  const emailRegex =
    /^[\p{L}0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[\p{L}0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[_\p{L}0-9][-_\p{L}0-9]*\.)*(?:[\p{L}0-9][-\p{L}0-9]{0,62})\.(?:(?:[a-z]{2}\.)?[a-z]{2,})$/iu
  return emailRegex.test(value)
}

export const isKeyOf = <T>(
  object: T,
  key: string | number | symbol,
): key is keyof T => {
  return Object.prototype.hasOwnProperty.call(object, key)
}

/**
 * returns if a field is required based on the validation schema
 *
 * NOTE: this will work only for fields which has it's required state static,
 * those which it is dynamic (like when it depends on when() clauses),
 * will not be detected
 */
export const isRequired = <T extends AnyObjectSchema>(
  schema: T,
  field: keyof T['fields'],
): boolean => {
  const description = schema.describe().fields[field as string]
  return (
    ('optional' in description && !description.optional) ||
    ('tests' in description &&
      description.tests.some((test) => test.name === 'required'))
  )
}

export const mimeType = (mime: string, allowed: string[]): boolean => {
  const [prefix1] = mime.split('/')
  return allowed.some((e) => {
    const [prefix2, sufix] = e.split('/')
    return sufix === '*' ? prefix1 === prefix2 : mime === e
  })
}

export const isOneOf = <X extends string | number, Y extends X>(
  key: X,
  keys: Y[],
): key is Y => {
  return (keys as unknown[]).includes(key)
}

export const isHTMLElement = <T extends keyof HTMLElementTagNameMap>(
  value: unknown,
  tagName: T,
): value is HTMLElementTagNameMap[T] => {
  const element = document.createElement(tagName)
  const types = [
    Object.prototype.toString.call(value),
    Object.prototype.toString.call(element),
  ] as const
  element.remove()
  return types[0] === types[1]
}

export const arrayEquals = <T extends unknown[]>(
  x: T,
  y: T,
  comparator?: (x: T[number], y: T[number]) => boolean,
): boolean => {
  if (x.length !== y.length) return false

  if (!comparator) comparator = (x, y) => x == y

  let buffer = [...y]

  for (let i = 0; i < x.length; i++) {
    const a = x[i]
    const idx = buffer.findIndex((b) => comparator(a, b))
    if (idx < 0) return false
    buffer.splice(idx, 1)
  }

  return true
}

type SetStateFunction<T> = (prevState: T) => T
export const isSetStateFunction = <T>(
  state: React.SetStateAction<T>,
): state is SetStateFunction<T> => {
  return typeof state === 'function'
}
