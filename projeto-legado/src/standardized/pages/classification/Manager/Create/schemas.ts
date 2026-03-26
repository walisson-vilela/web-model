import * as yup from 'yup'

import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import yupValidators from '../../../../../utils/YupValidators'
import { BodyInterface } from '../interfaces'

import { Form, Scenery } from './interfaces'

export const create = (scenery: Scenery) =>
  yup.object({
    name: yup.string().required('O nome é obrigatório!'),
    scenery_id: yupValidators.numberOrEmptyString({
      general: (schema) => schema.required('Selecione um cenário!'),
    }),
    temporary: ((schema) => {
      return scenery.temporary
        ? schema.required('Selecione um comportamento!')
        : schema.nullable()
    })(
      yup
        .boolean()
        .typeError('Selecione um comportamento!')
        .transform((v) => v),
    ),
  })

export const getDefaultData = (data: BodyInterface): Form => {
  return {
    name: notEmptyStringOrDefault(data.name, ''),
    scenery_id: numberOrDefault(data.scenery_id, ''),
    temporary:
      data && data.scenery_temporary ? booleanOrDefault(data.temporary) : null,
    required_file: booleanOrDefault(data.required_file, false),
  }
}
