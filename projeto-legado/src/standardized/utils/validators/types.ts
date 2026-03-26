import { GenericObject } from '@mw-kit/mw-ui/types'

export const isString = (value: unknown): value is string =>
  /* Verifica se o tipo é uma string */
  typeof value === 'string'

export const isNumber = (value: unknown): value is number =>
  /* Verifica se o tipo é um número */
  typeof value === 'number'

export const isBoolean = (value: unknown): value is boolean =>
  /* Verifica se o tipo é um booleano */
  typeof value === 'boolean'

export const isObject = (value: unknown): value is GenericObject =>
  typeof value === 'object' && value !== null

export const isArray = (value: unknown): value is (typeof value)[] =>
  /* Verifica se o tipo é um array */
  Array.isArray(value)

export const notEmptyString = (value: unknown): value is string =>
  /* Verifica se o tipo é uma string e se ela não está vazia */
  isString(value) && value.trim() !== ''
