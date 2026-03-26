import { AppliedFilter, GenericObject } from '@mw-kit/mw-ui/types'

import axios from '../../../../../../../services/Axios/instance'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import { Product } from '../../interfaces'

const parseProducts = (data: unknown[]): Product[] => {
  return data.reduce<Product[]>((parsed, e): Product[] => {
    if (!isObject(e)) return parsed

    const id = numberOrDefault(e.id)
    if (!id) return parsed

    const item: Product = {
      id,
      name: notEmptyStringOrDefault(e.name),
      category_name: null,
      product_line_name: null,
    }

    if (isObject(e.category)) {
      item.category_name = notEmptyStringOrDefault(e.category.name)
    }

    if (isObject(e.product_line)) {
      item.product_line_name = notEmptyStringOrDefault(e.product_line.name)
    }

    return [...parsed, item]
  }, [])
}

export const getProducts = async (
  search: string,
  id: number,
  filters: AppliedFilter[],
  page: number,
): Promise<{ data: Product[]; pagination: { has_next_page: boolean } }> => {
  const params: GenericObject = {
    brand_id: id,

    ...filters.reduce(
      (params, filter) => ({
        ...params,
        [filter.name]: filter.value,
      }),
      {},
    ),
    ...(search
      ? {
          q: search,
        }
      : {}),
    page,
  }

  const { data: response } = await axios.get(`/v1/tr/products`, {
    params,
  })

  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('Invalid response')
  }
  if (!response.success) throw new Error('Response failed')

  return {
    data: parseProducts(response.data),
    pagination: {
      has_next_page: false,
      ...(isObject(response.pagination)
        ? {
            has_next_page: booleanOrDefault(
              response.pagination.has_next_page,
              false,
            ),
          }
        : {}),
    },
  }
}
