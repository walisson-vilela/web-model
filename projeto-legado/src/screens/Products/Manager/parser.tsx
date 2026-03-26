import Bullet from '../../../components/Bullet'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { isObject } from '../../../utils/Validators'

import { BodyInterface } from './interfaces'
import { status as statusLabels } from './labels'

const parser = (data: unknown[]): BodyInterface[] => {
  const parse = data.reduce<BodyInterface[]>((parse, item) => {
    if (!isObject(item)) return parse

    const id = numberOrDefault(item.id)

    if (!id) return parse

    const product: BodyInterface = {
      id,
      status: booleanOrDefault(item.status, false),
      status_jsx: (
        <Bullet
          content={statusLabels[item.status ? 1 : 0].name}
          color={statusLabels[item.status ? 1 : 0].color}
        />
      ),
      brand_name: null,
      category_name: null,
      code: notEmptyStringOrDefault(item.code),
      name: notEmptyStringOrDefault(item.name),
      product_line_path_label: null,
      type_label: notEmptyStringOrDefault(item.type_label),
    }
    if (isObject(item.category)) {
      product.category_name = notEmptyStringOrDefault(
        item.category.name,
        product.category_name,
      )
    }

    if (isObject(item.product_line)) {
      product.product_line_path_label = notEmptyStringOrDefault(
        item.product_line.name,
        product.product_line_path_label,
      )
    }

    if (isObject(item.brand)) {
      product.brand_name = notEmptyStringOrDefault(
        item.brand.name,
        product.brand_name,
      )
    }

    return [...parse, product]
  }, [] as BodyInterface[])

  return parse
}

export default parser
