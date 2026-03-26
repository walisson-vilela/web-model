import { notEmptyStringOrDefault } from '../../../../../../utils/Formatters'
import { isObject } from '../../../../../../utils/Validators'

import { Data, Form } from './interfaces'

export const dataParser = (data: any): Data => {
  const parsed: Data = {
    type: null,
    type_label: null,
    name: null,
  }

  if (!isObject(data)) return parsed

  parsed.type = notEmptyStringOrDefault(data.type)
  parsed.type_label = notEmptyStringOrDefault(data.type_label)
  parsed.name = notEmptyStringOrDefault(data.name)

  return parsed
}

export const formParser = (data: Data): Form => {
  const parsed: Form = {
    name: '',
  }

  if (data === null) return parsed

  parsed.name = notEmptyStringOrDefault(data.name, '')

  return parsed
}
