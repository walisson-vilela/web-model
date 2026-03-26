import * as yup from 'yup'

import { formType } from './interfaces'

export const create = yup.object({
  id: yup.number().integer().positive().nullable(),
  parent_id: yup.string().required('Selecione uma rede!'),
  grandparent_id: yup.string().required('Selecione um grupo!'),
  name: yup
    .string()
    .required('Para prosseguir é necessário informar o nome para a bandeira'),
  active: yup.boolean(),
  level: yup.number(),
})

export const getDefaultData = (data: formType): formType => {
  return {
    id: data && data.id ? data.id : null,
    name: data && data.name ? data.name : '',
    active: (data && data.active) || true,
    parent_id: data && data.parent_id ? data.parent_id.toString() : '',
    grandparent_id:
      data && data.grandparent_id ? data.grandparent_id.toString() : '',
    level: 3,
  }
}
