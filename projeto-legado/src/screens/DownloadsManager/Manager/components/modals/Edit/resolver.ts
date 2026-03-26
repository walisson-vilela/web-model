import { yupResolver } from '@hookform/resolvers/yup'
import { Resolver } from 'react-hook-form'
import * as yup from 'yup'

import { Form } from './interfaces'

const schema = yup.object({
  name: yup
    .string()
    .required()
    .matches(/^[\w-]+$/g),
})

const resolver = yupResolver(schema) as Resolver<Form>

export default resolver
