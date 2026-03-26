import { FormState } from 'react-hook-form'

import { Form } from '../../interfaces'

const saveParser = (
  form: Form,
  dirtyFields: FormState<Form>['dirtyFields'],
  mode: 'create' | 'edit',
) => {
  const isDirty =
    mode === 'create' ? () => true : (field: keyof Form) => field in dirtyFields

  const payload = {
    ...(isDirty('status') ? { status: form.status ? 1 : 0 } : {}),

    ...(isDirty('type') ? { type: form.type } : {}),
    ...(isDirty('code') ? { code: form.code } : {}),
    ...(isDirty('name') ? { name: form.name } : {}),
    ...(isDirty('product_line_id')
      ? { product_line_id: form.product_line_id }
      : {}),
    ...(isDirty('brand_id') ? { brand_id: form.brand_id } : {}),

    ...(isDirty('ean_13') ? { ean_13: form.ean_13 } : {}),
    ...(isDirty('classification_id')
      ? { classification_id: form.classification_id }
      : {}),
    ...(isDirty('notify_price')
      ? {
          notify_price:
            form.notify_price === null ? null : form.notify_price ? 1 : 0,
        }
      : {}),
    ...(isDirty('price_min') ? { price_min: form.price_min } : {}),
    ...(isDirty('price_max') ? { price_max: form.price_max } : {}),
    ...(isDirty('measurement_unit')
      ? { measurement_unit: form.measurement_unit }
      : {}),
    ...(isDirty('measurement') ? { measurement: form.measurement } : {}),

    ...(isDirty('description') ? { description: form.description } : {}),

    ...(isDirty('files')
      ? {
          files: form.files.reduce<({ file: File } | { id: number })[]>(
            (files, file) => {
              return [
                ...files,
                file instanceof File ? { file } : { id: file.id },
              ]
            },
            [],
          ),
        }
      : {}),
  }

  return payload
}

export default saveParser
