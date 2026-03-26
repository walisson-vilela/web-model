import { keys, stripAccents } from './common'

export const notEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim() !== ''
}

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && isFinite(value)
}

export const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

export const isNumeric = (value: unknown): value is number | string => {
  if (isNumber(value)) return true

  if (!isString(value)) return false

  return !isNaN(parseFloat(value))
}

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean'
}

export const isNumericString = (value: unknown): value is string => {
  return notEmptyString(value) && isNumeric(value)
}

export const isDateInstance = (value: unknown): value is Date => {
  return value instanceof Date && !isNaN(value.valueOf())
}

export const isDate = (value: unknown): boolean => {
  return (
    (isNumeric(value) || isDateInstance(value)) &&
    isDateInstance(new Date(value))
  )
}

type Operations = 'eq' | 'gt' | 'gte' | 'lt' | 'lte'

export const dateCompare = (
  a: Date,
  b: Date,
  operation: Operations,
  time: boolean | Partial<{ [key in 'h' | 'm' | 's' | 'ms']: true }> = {
    h: true,
    m: true,
    s: true,
  },
): boolean => {
  const operations: { [key in Operations]: (a: Date, b: Date) => boolean } = {
    eq: (a, b) => a.getTime() === b.getTime(),
    gt: (a, b) => a > b,
    gte(a, b) {
      return this.gt(a, b) || this.eq(a, b)
    },
    lt: (a, b) => a < b,
    lte(a, b) {
      return this.lt(a, b) || this.eq(a, b)
    },
  }

  a = new Date(a)
  b = new Date(b)

  if (time === false) {
    a.setHours(0, 0, 0, 0)
    b.setHours(0, 0, 0, 0)
  } else if (time !== true) {
    const methods = {
      h: 'setHours',
      m: 'setMinutes',
      s: 'setSeconds',
      ms: 'setMilliseconds',
    } as const

    keys(methods).forEach((k) => {
      if (time[k]) return
      const method = methods[k]
      a[method](0)
      b[method](0)
    })
  }

  return operations[operation](a, b)
}

type Formats = 'h' | 'm' | 's'
type Mode = 'required' | 'optional'

export const isValidTime = (
  time: string,
  format: Partial<{ [key in Formats]: Mode }> = {
    h: 'required',
    m: 'required',
  },
): boolean => {
  const c = {
    h: '(([0-1][0-9])|(2[0-3]))',
    m: '([0-5][0-9])',
    s: '([0-5][0-9])',
  }

  let sep = ''

  const conditions = (Object.keys(format) as Formats[])
    .map((f) => {
      const content = `(${sep}${c[f]})`
      sep = ':'
      return format[f] === 'required' ? content : `${content}?`
    })
    .join('')

  // /(([0-1][0-9])|(2[0-3])):([0-5][0-9])(:([0-5][0-9]))?$/
  const re = new RegExp(`${conditions}$`)

  return time.match(re) !== null
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

export const isValidEmail = (value: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

  return emailRegex.test(value)
}

export { isObject, isKeyOf } from './common'
