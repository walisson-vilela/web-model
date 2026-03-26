import * as yup from 'yup'

import { BodyInterface } from '../../interfaces'

import { formType } from './interfaces'

export const formSchema = yup.object({
  id: yup.number().integer().positive().nullable(),
  name: yup
    .string()
    .typeError('O nome é obrigatório!')
    .required('O nome é obrigatório!'),
  category: yup
    .mixed()
    .oneOf(['category', 'sublevel'])
    .typeError('Definir o tipo de categoria é obrigatório!')
    .required('Definir o tipo de categoria é obrigatório!'),
  parent_id: yup
    .string()
    .nullable()
    .when('category', {
      is: 'sublevel',
      then: (schema) =>
        schema
          .typeError('Selecionar o nível é obrigatório!')
          .required('Selecionar o nível é obrigatório!'),
    }),
})

export const defaultData = (editData: BodyInterface): formType => ({
  id: editData && editData.id ? editData.id : null,
  name: editData && editData.name ? editData.name : '',
  parent_id:
    editData && editData.parent_id ? editData.parent_id.toString() : '',
  category: editData && editData.level > 0 ? 'sublevel' : 'category',
})
