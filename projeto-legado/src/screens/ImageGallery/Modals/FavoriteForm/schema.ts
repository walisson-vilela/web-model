import { yupResolver } from '@hookform/resolvers/yup'
import { Resolver } from 'react-hook-form'
import * as yup from 'yup'

import { FormData } from './interfaces'

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().notRequired(),
})

const resolver = yupResolver(schema) as Resolver<FormData>

export default resolver
