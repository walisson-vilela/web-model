import { isObject } from '../../../../../standardized/utils/validators'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isOneOf } from '../../../../../utils/Validators'
import { Form } from '../../interfaces'

const formParser = (data?: unknown): Form => {
  const product: Form = {
    status: true,

    type: 'OWN',
    code: '',
    name: '',
    product_line_id: null,
    brand_id: null,

    ean_13: '',
    classification_id: null,
    notify_price: null,
    price_min: null,
    price_max: null,
    measurement_unit: null,
    measurement: null,

    description: '',

    files: [],
  }

  if (!isObject(data)) return product

  const id = numberOrDefault(data.id)

  if (!id) return product

  product.status = booleanOrDefault(data.status, product.status)

  const type = notEmptyStringOrDefault(data.type)
  if (type && isOneOf(type, ['OWN', 'COMPETITOR'])) {
    product.type = type
  }

  product.code = notEmptyStringOrDefault(data.code, product.code)

  product.name = notEmptyStringOrDefault(data.name, product.name)

  if (isObject(data.product_line)) {
    product.product_line_id = numberOrDefault(
      data.product_line.id,
      product.product_line_id,
    )
  }

  if (isObject(data.brand)) {
    product.brand_id = numberOrDefault(data.brand.id, product.brand_id)
  }

  product.ean_13 = notEmptyStringOrDefault(data.ean_13, product.ean_13)

  if (isObject(data.classification)) {
    product.classification_id = numberOrDefault(
      data.classification.id,
      product.classification_id,
    )
  }

  product.notify_price = booleanOrDefault(
    data.notify_price,
    product.notify_price,
  )
  product.price_min = numberOrDefault(data.price_min, product.price_min)
  product.price_max = numberOrDefault(data.price_max, product.price_max)

  const measurement_unit = notEmptyStringOrDefault(data.measurement_unit)
  if (
    measurement_unit &&
    isOneOf(measurement_unit, ['KG', 'LITRO', 'UNID', 'PACOTE'])
  ) {
    product.measurement_unit = measurement_unit
  }

  product.measurement = numberOrDefault(data.measurement, product.measurement)

  product.description = notEmptyStringOrDefault(
    data.description,
    product.description,
  )

  product.files = (Array.isArray(data.files) ? data.files : []).reduce(
    (files, e) => {
      if (!isObject(e)) return files

      const id = numberOrDefault(e.id)
      const url = notEmptyStringOrDefault(e.url)
      if (!id || !url) return files

      const file: Exclude<Form['files'][number], File> = {
        id,
        url,
        name: notEmptyStringOrDefault(e.name, ''),
        size: numberOrDefault(e.size, 0),
      }

      return [...files, file]
    },
    [],
  )

  return product
}

export default formParser
