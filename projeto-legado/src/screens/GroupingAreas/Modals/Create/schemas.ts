import * as yup from 'yup'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import yupValidators from '../../../../utils/YupValidators'

import { CreateProps, Form } from './interfaces'

export const create = yup.object({
  name: yup.string().required('O nome é obrigatório!'),
  country_id: yupValidators.numberOrEmptyString(),
})

export const getDefaultData = (data: CreateProps['data']): Form => {
  const form: Form = {
    name: '',
    country_id: 1,
  }

  if (!data) return form

  form.name = notEmptyStringOrDefault(data.name, '')
  form.country_id = numberOrDefault(data.country_id, '')

  return form
}
