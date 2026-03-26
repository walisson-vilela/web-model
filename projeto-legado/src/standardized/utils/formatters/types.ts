import { GenericObject } from '@mw-kit/mw-ui/types'

import { keys } from '../../../utils/Formatters'
import { isNumber, notEmptyString } from '../validators'

export const notEmptyStringOrDefault = <T = null>(
  value: unknown,
  defaultValue: any = null,
): string | T => {
  if (notEmptyString(value)) return value.trim()

  if (isNumber(value)) return value.toString()

  return defaultValue
}

type FilterType<T extends GenericObject, R extends GenericObject> = {
  [K in keyof Required<T>]: K extends keyof R
    ? R[K] extends T[K]
      ? never
      : K
    : K
}[keyof T]

export const filterObject = <T extends GenericObject, R extends GenericObject>(
  object: T,
  /** properties that exist in T but not in R (be sure to list all of them) */
  remove: FilterType<T, R>[],
  initial = {} as Partial<R>,
): R => {
  const r = keys(object).reduce((r, key) => {
    return {
      ...r,
      ...(remove.includes(key as never) ? {} : { [key]: object[key] }),
    }
  }, initial as R)
  return r
}

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
