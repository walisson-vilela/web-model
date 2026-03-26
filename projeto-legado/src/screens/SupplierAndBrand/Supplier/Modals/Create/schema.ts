import * as yup from 'yup'

import { notEmptyStringOrDefault } from '../../../../../utils/Formatters'
import { BodyInterface } from '../../interfaces'

import { FormInterface } from './interfaces'

const getSchema = () => {
  return yup.object({
    name: yup.string().required('O nome é obrigatório.'),
    code: yup
      .string()
      .matches(/^\d*$/, 'O campo de código aceita apenas numeros'),
  })
}

export const getDefaultValues = (data?: BodyInterface) => {
  const defaultValues: FormInterface = {
    name: '',
    code: '',
  }

  if (data) {
    defaultValues.name = notEmptyStringOrDefault(data.name, '')
    defaultValues.code = notEmptyStringOrDefault(data.code, '')
  }

  return defaultValues
}

export default getSchema
