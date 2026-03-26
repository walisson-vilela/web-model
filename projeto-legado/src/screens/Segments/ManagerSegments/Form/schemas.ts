import * as yup from 'yup'

import { formType } from './interfaces'

export const create = yup.object({
  id: yup.number().integer().positive(),
  name: yup
    .string()
    .required('Para prosseguir é necessário informar o nome para tipologia.'),
})

export const getDefaultData = (data: formType): formType => {
  return {
    id: data.id ? data.id : null,
    name: data.name ? data.name : '',
  }
}
