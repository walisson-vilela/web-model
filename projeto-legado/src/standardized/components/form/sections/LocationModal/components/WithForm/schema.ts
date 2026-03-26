import { yupResolver } from '@hookform/resolvers/yup'
import { Resolver } from 'react-hook-form'
import * as yup from 'yup'

import { Form } from '../../interface'

const schemaToSearch = yup.object({
  postal_code: yup
    .string()
    .matches(/^[0-9]{5}-[0-9]{3}$/i, { excludeEmptyString: true }),
  street_type: yup.string().required(),
  street_address: yup.string().required(),
  street_number: yup.string().required(),
  sublocality: yup.string().required(),

  city: yup.string().required(),
  state: yup.string().required(),
})

export const schemaToConfirm = yup.object({
  postal_code: yup
    .string()
    .matches(/^[0-9]{5}-[0-9]{3}$/i)
    .required(),
  street_type: yup.string().required(),
  street_address: yup.string().required(),
  street_number: yup.string().required(),
  sublocality: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
})

const resolver = yupResolver(schemaToSearch) as never as Resolver<Form>

export default resolver
