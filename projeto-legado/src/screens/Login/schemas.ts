import * as yup from 'yup'

import { isString, isValidCPF } from '../../standardized/utils/validators'
import { cpf as formatCPF } from '../../utils/Formatters'

import { LoginForm } from './interfaces'

const usernameSchema: {
  [K in 'document' | 'people_id' | 're']: (
    schema: yup.StringSchema<string, yup.AnyObject, undefined, ''>,
  ) => yup.StringSchema<string, yup.AnyObject, undefined, ''>
} = {
  document: (schema) => {
    return schema.test({
      test: (value: string) => isString(value) && isValidCPF(value),
    })
  },
  people_id: (schema) => {
    return schema.matches(/^[0-9]{6}$/)
  },
  re: (schema) => {
    return schema
  },
}

export const usernameMask: {
  [K in 'document' | 'people_id' | 're']: (value: string) => string
} = {
  document: formatCPF,
  people_id: (value) => {
    let masked = value

    masked = value.replace(/[^0-9]/g, '').substring(0, 6)

    return masked
  },
  re: (value) => value,
}

export const formSchema = (loginType: string | null) => {
  const spec = {
    account: yup.string().required(' '),
    username: yup.string().required(),
    password: yup.string().required(),
    terms: yup.boolean().required(),
    keep: yup.boolean().notRequired(),
  }

  if (loginType in usernameSchema) {
    spec.username = usernameSchema[loginType](spec.username)
  }

  return yup.object(spec)
}

export const defaultData = (): LoginForm => ({
  account: localStorage.getItem('keep_account') || '',
  username: localStorage.getItem('keep_user') || '',
  password: '',
  terms: true,
  keep: false,
})
