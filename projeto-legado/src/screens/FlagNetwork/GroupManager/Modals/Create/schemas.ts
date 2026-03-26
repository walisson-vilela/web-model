import * as yup from 'yup'

import { formType } from './interfaces'

export const create = yup.object({
  id: yup.number().integer().positive().nullable(),
  name: yup
    .string()
    .trim()
    .required('Para prosseguir é necessário informar o nome para o grupo'),
  active: yup.boolean(),
  level: yup.number(),
})

export const getDefaultData = (data: formType): formType => {
  return {
    id: data && data.id ? data.id : null,
    name: data && data.name ? data.name : '',
    active: (data && data.active) || false,
    level: 1,
  }
}
