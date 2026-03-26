import * as yup from 'yup'

import { isString } from '../../../../../utils/Validators'
import { addressSchema } from '../../../../components/form/sections/Address/schema'
import { isValidCNPJ } from '../../../../utils/validators'

const getSchema = () => {
  return addressSchema.shape({
    // status
    active: yup.number().min(0).max(1),

    // avatar
    avatar: yup.string().nullable(),

    // basic data
    document: yup
      .string()
      .required()
      .test({
        test: (value: string) => isString(value) && isValidCNPJ(value),
      }), // cnpj
    name: yup.string().required(), // nome
    occupationArea: yup.array().of(yup.number()).min(1).required(), // area de atuacao
    sharedModel: yup.boolean().required(),
    allocated_users: yup.string(),
    subdomain: yup
      .string()
      .required()
      .matches(/^[\w-]+$/g, {
        message: 'Não pode conter caracteres especiais',
      }), // subdominio
  })
}

export default getSchema
