import axios from '../../../../../../../services/Axios'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'

import { BrandListProps } from './interface'

const parser = (data: unknown[]): BrandListProps[] => {
  const parsed = data.reduce<BrandListProps[]>((parse, data) => {
    if (!isObject(data)) return parse
    const id = numberOrDefault(data.id)
    if (!id) return parse

    const brand: BrandListProps = {
      id,
      name: notEmptyStringOrDefault(data.name),
      file: ((response: unknown) => {
        if (!isObject(response)) return null

        const id = numberOrDefault(response.id)
        if (!id) return null

        return {
          id,
          hash: notEmptyStringOrDefault(response.hash),
          url: notEmptyStringOrDefault(response.url),
        }
      })(data.file),
    }
    return [...parse, brand]
  }, [] as BrandListProps[])

  return parsed
}

export const brandsCount = async (
  search: string,
  supplier_id: number,
  page: number,
): Promise<{
  data: BrandListProps[]
  pagination: { has_next_page: boolean }
}> => {
  const params = {
    supplier_id,
    page,
    contain: 'Files',
    ...(search ? { q: search } : {}),
  }

  const { data: response } = await axios.get('/v1/tr/brands/options', {
    params,
  })

  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('Invalid response')
  }

  return {
    data: parser(response.data),
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
