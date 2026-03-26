import { yupResolver } from '@hookform/resolvers/yup'
import { Resolver } from 'react-hook-form'
import * as yup from 'yup'

import { CreateSurveyFormData } from './interface'

const createFormSchema = yup.object({
  pilar: yup.string().required('O campo é obrigatorio'),
  name: yup.string().required('O campo é obrigatorio'),
  behavior: yup.string().required('O campo é obrigatorio'),
  status: yup.string().required('O campo é obrigatorio'),
  mandatory: yup.string().required('O campo é obrigatorio'),
  frequency: yup.string().required('O campo é obrigatorio'),
  validity: yup.string().required('O campo é obrigatorio'),
})

export const resolver = yupResolver(
  createFormSchema,
) as never as Resolver<CreateSurveyFormData>
