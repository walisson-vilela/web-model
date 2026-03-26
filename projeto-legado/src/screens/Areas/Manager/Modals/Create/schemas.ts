import * as yup from 'yup'

import yupValidators from '../../../../../utils/YupValidators'
import { BodyInterface } from '../../interfaces'

import { Form } from './interfaces'

export const create = yup.object({
  name: yup.string().required('O nome é obrigatório!'),
  country_id: yupValidators.numberOrEmptyString(),
})

export const getDefaultData = (data: BodyInterface | undefined): Form => {
  const form: Form = {
    name: '',
    country_id: 1,
  }

  if (!data) return form

  form.name = data.name
  form.country_id = data.country_id

  return form
}
