import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'

import { BodyInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: unknown[]): BodyInterface[] => {
  return data.reduce<BodyInterface[]>((parsed, e) => {
    if (!isObject(e)) return parsed

    const id = numberOrDefault(e.id)
    if (!id) return parsed

    const item: BodyInterface = {
      id,
      code: notEmptyStringOrDefault(e.code),
      name: notEmptyStringOrDefault(e.name),
      category_name: null,
      subcategory_name: null,
      product_line_name: null,
      type_label: notEmptyStringOrDefault(e.type_label),
      brand_name: null,
    }

    if (isObject(e.category)) {
      item.category_name = notEmptyStringOrDefault(e.category.name)
    }

    if (isObject(e.subcategory)) {
      item.subcategory_name = notEmptyStringOrDefault(e.subcategory.name)
    }

    if (isObject(e.product_line)) {
      item.product_line_name = notEmptyStringOrDefault(e.product_line.name)
    }

    if (isObject(e.brand)) {
      item.brand_name = notEmptyStringOrDefault(e.brand.name)
    }

    return [...parsed, item]
  }, [])
}

export default parser
