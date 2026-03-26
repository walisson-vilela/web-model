import { GenericObject } from '@mw-kit/mw-ui/types'
import moment from 'moment'

import { getDefaultExtension } from './FileFormatter'
import {
  isBoolean,
  isNumber,
  isNumericString,
  isObject,
  notEmptyString,
} from './Validators'

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
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

export const cpf = (value: string) => {
  return value
    .replace(/\D/g, '')
    .substring(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
}

export const pis = (value: string) => {
  return value
    .replace(/\D/g, '')
    .substring(0, 11)
    .replace(/(\d{1,3})?(\d{1,5})?(\d{1,2})?(\d)?/, (...args) => {
      const x = (args.slice(1, 5) as string[]).filter((e) => e)
      return [x.slice(0, 3).join('.'), ...x.slice(3)].join('-')
    })
}

export const cep = (value: string) => {
  return value
    .replace(/\D/g, '')
    .substring(0, 8)
    .replace(/^(\d{5})(\d)/, '$1-$2')
}

/**
 *
 * @param value valor a ser formatado
 * @param format formato (moment)
 * @returns
 */
export const date = (
  value: string,
  outputFormat?: string,
  inputFormat?: string,
): string => {
  if (outputFormat === undefined) outputFormat = 'YYYY/MM/DD HH:mm:ss'

  // const today = moment()
  const date = moment(value, inputFormat)

  // verificando se a data e valida
  if (!date.isValid()) return value

  return date.isValid() ? date.format(outputFormat) : value
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
    Object.keys(labels).forEach((key) => (l[key] = labels[key]))
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

export const boolToInt = (value: boolean): 1 | 0 => {
  const values = {
    true: 1,
    false: 0,
  }

  return values[value.toString()]
}

export const numberOrDefault = <T = null>(
  value: any,
  defaultValue: T = null,
): number | T => {
  if (isNumber(value)) return value
  if (isNumericString(value)) return parseFloat(value)
  return defaultValue
}

export const booleanOrDefault = <T = null>(
  value: any,
  defaultValue: T = null,
): boolean | T => {
  if (isBoolean(value)) return value

  if (isNumber(value)) return value > 0
  if (isNumericString(value)) return parseInt(value) > 0

  return defaultValue
}

export const notEmptyStringOrDefault = <T = null>(
  value: any,
  defaultValue: T = null,
): string | T => {
  if (notEmptyString(value)) return value.trim()
  if (isNumber(value)) return value.toString()
  return defaultValue
}

export const dateOrDefault = <T = null>(
  value: any,
  defaultValue: T = null,
  outputFormat?: string,
  inputFormat?: string,
): string | T => {
  if (notEmptyString(value)) return date(value, outputFormat, inputFormat)
  return defaultValue
}

export const capitalize = (value: string): string => {
  return value
    .split(' ')
    .map((word) =>
      word.length < 2
        ? word
        : `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`,
    )
    .join(' ')
}

export const trimAll = (value: string): string => {
  return value.replace(/\s+/g, ' ')
}

export const stripAccents = (value: string): string => {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/** @deprecated By setting the "Content-Type" header in the axios request it will automatically convert the objects to FormData */
export const objectToFormData = (
  object: { [key: string | number]: any } | any[],
  formData: FormData = new FormData(),
  prefix: string = '',
): FormData => {
  const getFormDataKey = prefix
    ? (key: string | number): string => `${prefix}[${key}]`
    : (key: string | number): string => `${key}`

  Object.keys(object).forEach((key) => {
    const formDatakey = getFormDataKey(key)

    const value = object[key]

    if (isObject(value) || Array.isArray(value)) {
      formData = objectToFormData(value, formData, formDatakey)
    } else {
      if (value instanceof File) {
        const filename = value.name.split('.')
        if (filename.length < 2) filename.push(getDefaultExtension(value.type))
        formData.append(formDatakey, value, filename.join('.'))
      } else {
        formData.append(
          formDatakey,
          value === null || value === undefined ? '' : value,
        )
      }
    }
  })

  return formData
}

export const currencyMask = (
  value: string,
  currency: Intl.NumberFormatOptions['currency'] = 'BRL',
  locale: string = 'pt-BR',
): string => {
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, '')

  // Verifica se há algum valor numérico
  if (numericValue.length === 0) {
    return ''
  }

  // Formata o valor adicionando separador de milhar e casas decimais
  const number = Number(numericValue) / 100 // Divide por 100 para considerar os centavos

  return number.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
  })
}

export const humanFileSize = (
  bytes: number,
): `${number} ${'B' | 'KB' | 'MB' | 'GB' | 'TB'}` => {
  const index = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${Number((bytes / Math.pow(1024, index)).toFixed(2)) * 1} ${
    (['B', 'KB', 'MB', 'GB', 'TB'] as const)[index]
  }`
}

type Unit = 'kb' | 'mb' | 'gb' | 'tb'
type FileSize = { unit: Unit; size: number; formatted: string }
type FileSizeResponse = { [key in Unit | 'preference']: FileSize }
export const formatFileSize = (
  bytes: number,
  decimals = 2,
): FileSizeResponse => {
  const UNIT = 1024

  const precision = Math.pow(10, decimals)

  const parsed = ['kb', 'mb', 'gb', 'tb'].reduce((prev, unit, i) => {
    const divisor = Math.pow(UNIT, i + 1)
    const size = Math.round((bytes / divisor) * precision) / precision
    return {
      ...prev,
      [unit]: {
        unit,
        size,
        formatted: `${size}${unit[0].toUpperCase()}${unit.slice(1)}`,
      },
    }
  }, {} as Omit<FileSizeResponse, 'preference'>)

  const preference =
    parsed[
      (Object.keys(parsed) as Unit[]).find((k) => parsed[k].size < UNIT) || 'tb'
    ]

  const response: FileSizeResponse = { ...parsed, preference }

  return response
}

export const clearHTMLFromString = (text: string): string => {
  const div = document.createElement('div')
  div.innerHTML = text
  div.style.width = '0'
  div.style.height = '0'
  div.style.overflow = 'hidden'
  document.body.appendChild(div)

  const content = div.innerText
    .split('\n')
    .map((e) => notEmptyStringOrDefault(e))
    .filter((e) => e !== null)
    .join('\n')

  return content
}

export const keys = <T extends GenericObject>(value: T): (keyof T)[] => {
  return Object.keys(value)
}
