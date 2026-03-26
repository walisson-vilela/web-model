import { MwInput } from '@mw-kit/mw-ui'
import moment from 'moment'
import * as yup from 'yup'

import { dateOrDefault } from '../../../../utils/Formatters'
import { isValidEmail } from '../../../../utils/Validators'
import { isValidCPF, isValidPIS } from '../../../utils/validators'

export const getMaxBirthdate = () => {
  const max = new Date()
  max.setFullYear(max.getFullYear() - 16)
  return max
}

const phoneValidator = (
  options: {
    name?: string
    message?: string
    required?: true
  } = {},
) => {
  const { name, message, required } = {
    name: 'phone',
    message: 'invalid phone format',
    required: false,
    ...options,
  }

  const schema = yup.string().test(name, message, (val) => {
    const details = MwInput.getPhoneDetails(val || '')
    return required
      ? details !== null && details.valid
      : details === null || !details.value || details.valid
  })

  return required ? schema.required() : schema
}

export const dateValidator = (
  options: {
    name?: string
    message?: string
    required?: true
  } = {},
) => {
  const { name, message, required } = {
    name: 'date',
    message: 'invalid date format',
    required: false,
    ...options,
  }

  const schema = yup.string().test(name, message, (value) => {
    if (!required && !value) return true
    if (typeof value !== 'string') return false
    const date = moment(value, 'DD/MM/YYYY', true)
    return date.isValid()
  })

  return required ? schema.required() : schema
}

const schema = (registrationRequired: boolean, pisRequired: boolean) => {
  return yup.object({
    avatar: yup.string().nullable(),

    name: yup.string().max(120).required(),
    birthdate: yup.string().test('date', 'invalid date', (v) => {
      if (typeof v !== 'string') return false

      const parsed = dateOrDefault(v, null, 'YYYY-MM-DD', 'DD/MM/YYYY')

      if (!parsed) return false

      const d = new Date(parsed)
      const max = getMaxBirthdate()

      return d.getTime() <= max.getTime()
    }),
    document: yup
      .string()
      .test(
        'valid-cpf',
        'CPF inválido',
        (v) => typeof v !== 'string' || !v || isValidCPF(v),
      )
      .required(),
    registration: ((schema) =>
      registrationRequired ? schema.required() : schema)(yup.string().max(60)),
    admission: dateValidator(),
    pis: ((schema) =>
      pisRequired ? schema.required('PIS obrigatório') : schema)(
      yup
        .string()
        .test(
          'valid-pis',
          'PIS inválido',
          (v) => typeof v !== 'string' || !v || isValidPIS(v),
        ),
    ),
    sector: yup.string().max(60),

    phone: phoneValidator({ required: true }),
    phone_2: phoneValidator(),

    email: yup.string().test('email', (v) => !v || isValidEmail(v)),

    note: yup.string(),

    postal_code: yup
      .string()
      .matches(/^\d{5}-\d{3}$/i, 'Formato inválido')
      .required(),
    street_type: yup.string().max(20).required(),
    street_address: yup.string().max(150).required(),
    street_number: yup.string().max(20).required(),
    complement: yup.string().max(150),
    sublocality: yup.string().max(150).required(),
    city: yup.string().max(150).required(),
    state: yup
      .string()
      .matches(/^([A-Z]{2})$/, 'Deve ser UF')
      .required(),

    lat: yup.number().required(),
    lng: yup.number().required(),
    radius: yup.number().min(0).required(),
    geolocation_at: yup.date().nullable(),
    geolocation_by_id: yup.number().nullable(),
    geolocation_by_name: yup.string().nullable(),
  })
}

export default schema
