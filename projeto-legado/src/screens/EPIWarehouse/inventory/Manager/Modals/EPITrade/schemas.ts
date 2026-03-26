import * as yup from 'yup'

import { BodyInterface } from '../../interfaces'

import { Form } from './interfaces'

export const create = yup.object<Form>({
  name: yup.string().required('O nome é obrigatório!'),
  size_type: yup.string().required('O tipo de tamanho é obrigatório!'),
  status: yup.string().required('O status é obrigatório!'),
  sizes: yup.array().of(yup.string()),
  reason: yup.number().required('EPI Devolvido é obrigatório!'),
  reasonReturned: yup.number().required('EPI Retirado é obrigatório!'),
  quantity_decrease: yup.number().required('Quantidade é obrigatória!'),
})

export const getDefaultData = (data: BodyInterface | undefined): Form => {
  const quantity = data?.inventory_count ?? 0;

  return {
    name: data?.name || '',
    size_type: data?.size || 'acronym',
    status: 'ativo',
    sizes: [],
    reason: 0,
    reasonReturned: 0,
    quantity_decrease: quantity,
    quantity_increase: quantity,
  }
}
