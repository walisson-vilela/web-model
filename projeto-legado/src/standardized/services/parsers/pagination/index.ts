import type { GenericObject } from '@mw-kit/mw-ui/types'

import { booleanOrDefault, numberOrDefault } from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'

export type PaginationType = {
  page_count: number
  current_page: number
  has_next_page: boolean
  has_prev_page: boolean
  count: number
  limit: number | null
}

export type PaginationObjType = {
  last_page: boolean
  total: number
  page: number
}

export const parsePagination = (pagination: GenericObject): PaginationType => {
  return {
    page_count: numberOrDefault(pagination.page_count, 1),
    current_page: numberOrDefault(pagination.current_page, 1),
    has_next_page: booleanOrDefault(pagination.has_next_page, false),
    has_prev_page: booleanOrDefault(pagination.has_prev_page, false),
    count: numberOrDefault(pagination.count, 1),
    limit: numberOrDefault(pagination.limit),
  }
}

export const parsePaginationObj = (
  pagination: GenericObject,
  dataLength: number,
): PaginationObjType => {
  return {
    page: numberOrDefault(pagination.current_page, 1),
    last_page: true,
    total: dataLength,
    ...(isObject(pagination)
      ? {
          last_page: !booleanOrDefault(pagination.has_next_page, false),
          total: numberOrDefault(pagination.count, dataLength),
        }
      : {}),
  }
}
