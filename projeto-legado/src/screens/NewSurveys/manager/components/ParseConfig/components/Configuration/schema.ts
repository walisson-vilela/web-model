import * as yup from 'yup'

import { DataInterface, FormData } from './interface'

export const formSchema = yup.object({
  name: yup.string().required('O campo é obrigatorio'),
  type: yup.string().required('O campo é obrigatorio'),
  frequency: yup.string().required('O campo é obrigatorio'),
  validity: yup.string().required('O campo é obrigatorio'),
})

export const getDefaultValues = (data: DataInterface): FormData => ({
  name: data ? data.name : '',
  frequency: data ? data.frequency : '',
  type: data && data.type === 'R' ? true : false,
  validity: '',
})
