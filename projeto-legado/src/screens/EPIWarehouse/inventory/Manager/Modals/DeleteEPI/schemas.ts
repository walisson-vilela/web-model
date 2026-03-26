import * as yup from 'yup'

import { BodyInterface } from '../../interfaces'

import { Form } from './interfaces'

export const create = yup.object({
  name: yup.string().required('O nome é obrigatório!'),
  size_type: yup.string().required('O tipo de tamanho é obrigatório!'),
})

export const getDefaultData = (data: BodyInterface | undefined): Form => {
  if (!data) {
    return {
      name: '',
      size_type: 'acronym',
      status: 'ativo',
      sizes: [],
    }
  }

  return {
    name: data.name || '',
    size_type: data.size || 'acronym',
    status: 'ativo',
    sizes: [],
  }
}
