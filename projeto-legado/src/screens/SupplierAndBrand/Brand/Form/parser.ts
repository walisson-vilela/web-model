import { isObject } from '../../../../utils/Validators'

import { Data, Form } from './interfaces'

export const formParser = (data: Data | null): Form => {
  const form: Form = {
    status: true,
    file: '',
    type: 'OWN',
    supplier_id: '',
    code: '',
    name: '',
    classification_id: '',
    countries: [
      {
        id: null,
        country_id: 1,
        name: 'Brasil',
        occupation: 'NATIONAL',
        cities: [],
        cities_rule: '',
        states: [],
        states_rule: '',
        segments: [],
        segments_rule: '',
        market_flags: [],
        market_flags_rule: '',
      },
    ],
  }

  if (!isObject(data)) return form

  form.status = data.status

  if (data.file) {
    form.file = data.file.url
  }

  form.type = data.type

  if (data.supplier) {
    form.supplier_id = data.supplier.id
  }

  form.code = data.code
  form.name = data.name

  if (data.classification) {
    form.classification_id = data.classification.id
  }

  form.countries = [...data.countries]

  return form
}
