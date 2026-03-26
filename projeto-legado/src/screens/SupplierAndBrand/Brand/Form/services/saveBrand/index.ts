import axios from '../../../../../../services/Axios'
import { base64ToFile } from '../../../../../../utils/FileFormatter'
import { numberOrDefault } from '../../../../../../utils/Formatters'
import { isObject } from '../../../../../../utils/Validators'
import { Form } from '../../interfaces'

const saveBrand = async (
  form: Form,
  dirtyFields: (keyof Form)[],
  editId: number | null = null,
): Promise<number> => {
  const isDirty = editId
    ? (field: keyof Form) => dirtyFields.includes(field)
    : () => true

  const payload = {
    ...(isDirty('status') ? { status: form.status ? 1 : 0 } : {}),
    ...(isDirty('file')
      ? {
          file:
            form.file && !form.file.startsWith('http')
              ? { file: await base64ToFile(form.file) }
              : null,
        }
      : {}),
    ...(isDirty('type') || isDirty('code') ? { type: form.type } : {}),
    ...(isDirty('supplier_id') ? { supplier_id: form.supplier_id } : {}),
    ...(isDirty('code') ? { code: form.code } : {}),
    ...(isDirty('name') ? { name: form.name } : {}),
    ...(isDirty('classification_id')
      ? { classification_id: form.classification_id }
      : {}),
    ...(isDirty('countries')
      ? {
          brands_countries: form.countries.map((country) => ({
            ...(country.id
              ? { id: country.id }
              : { country_id: country.country_id }),

            states_rule: country.states_rule || 'ONLY',
            cities_rule: country.cities_rule || 'ONLY',
            segments_rule: country.segments_rule || 'ONLY',
            market_flags_rule: country.market_flags_rule || 'ONLY',

            links: ['states', 'cities', 'segments', 'market_flags'].reduce(
              (links, foreign_table) => {
                return [
                  ...links,
                  ...country[foreign_table].map((e) => ({
                    ...(e.id
                      ? { id: e.id }
                      : { foreign_id: e.foreign_id, foreign_table }),
                  })),
                ]
              },
              [],
            ),
          })),
        }
      : {}),
  }

  const { data } = await axios.post(
    `v1/tr/brands${editId ? `/edit/${editId}` : ''}`,
    payload,
    {
      ...(payload.file
        ? {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        : {}),
    },
  )

  if (!data.success) throw new Error('Request returned no sucess!')

  if (editId) return editId

  if (!isObject(data.data)) throw new Error('Request returned an invalid data!')

  const id = numberOrDefault(data.data.id)
  if (id === null) throw new Error('Request returned an invalid id!')

  return id
}

export default saveBrand
