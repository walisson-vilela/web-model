import { MwInput } from '@mw-kit/mw-ui'
import * as yup from 'yup'

import { isValidEmail } from '../../../../../utils/Validators'
import {
  isString,
  isValidCNPJ,
  notEmptyString,
} from '../../../../utils/validators'

import { ContactRecipient, Form } from './interfaces'

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
    if (val === undefined) return false

    const details = MwInput.getPhoneDetails(val)
    return required
      ? details !== null && details.valid
      : !details || !details.value || details.valid
  })

  return required ? schema.required() : schema
}

const contactRecipientSchema = yup
  .object({
    name: yup
      .string()
      .when(['phone_1', 'phone_2', 'email'] as (keyof ContactRecipient)[], {
        is: (
          phone_1: ContactRecipient['phone_1'],
          phone_2: ContactRecipient['phone_2'],
          email: ContactRecipient['email'],
        ) => [phone_1, phone_2, email].some((e) => notEmptyString(e)),
        then: (schema) => schema.required(),
      }),

    phone_1: phoneValidator(),
    phone_2: phoneValidator(),
    email: yup
      .string()
      .nullable()
      .test('email', (v) => !v || isValidEmail(v)),
  })
  .test('atLeastOne', 'Pelo menos 1 contato é obrigatório', (value) =>
    notEmptyString(value.name)
      ? (['phone_1', 'phone_2', 'email'] as (keyof ContactRecipient)[]).some(
          (f) => notEmptyString(value[f]),
        )
      : true,
  )

const buildSchema = (originals: Form) =>
  yup.object().shape({
    id: yup.number().nullable(),
    status: yup.boolean().required(),
    document: ((schema) =>
      originals.document ? schema.required() : schema.nullable())(
      yup
        .string()
        .test(
          'CNPJ',
          'Digite um CNPJ correto',
          (value) => !value || (isString(value) && isValidCNPJ(value)),
        ),
    ),
    fantasy_name: yup.string().nullable(),
    company_name: yup.string().nullable(),
    situation_name: yup.string().nullable(),
    source_status: yup
      .string()
      .oneOf(['VALID', 'UNKNOWN', 'INVALID', 'UPDATED'])
      .nullable()
      .test({
        name: 'IS_INVALID',
        test: (value) => value !== 'INVALID',
        message:
          'O Endereço do CNPJ inserido é incompatível com o endereço do cadastro. \nNão é possível salvar PDVs com incompatibilidade de Endereço.',
      }),
    code: yup
      .string()
      .nullable()
      .matches(/^\d*$/, 'O campo code deve conter apenas dígitos numéricos'),
    nickname: yup.string().required(),
    segment: yup
      .object<Form['segment']>({
        id: yup.number().required(),
      })
      .required(),
    market_flag: yup
      .object<Form['market_flag']>({
        id: yup.number().required(),
      })
      .nullable(),
    typology: yup
      .object<Form['typology']>({
        id: yup.number().required(),
      })
      .nullable(),
    classification: yup
      .object<Form['classification']>({
        id: yup.number().required(),
      })
      .nullable(),
    checkout: yup
      .string()
      .nullable()
      .matches(
        /^\d+(,\d+)?$/,
        'O campo checkout deve conter um único dígito numérico ou dois dígitos numéricos separados por vírgula',
      ),
    postal_code: yup
      .string()
      .required('O campo CEP é obrigatório')
      .matches(/^\d{5}-\d{3}$/, 'CEP inválido. O formato correto é XXXXX-XXX'),
    street_type: yup
      .string()
      .required('O campo Tipo de Logradouro é obrigatório'),
    street_address: yup.string().required('O campo Logradouro é obrigatório'),
    street_number: yup.string().required('O campo Número é obrigatório'),
    complement: yup.string().nullable(),
    sublocality: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    address_lat: yup.number(),
    address_lng: yup.number(),
    lat: yup.number().required(),
    lng: yup.number().required(),
    radius: yup.number().required(),
    geolocation_tolerance: yup
      .number()
      .integer('O campo geolocation_tolerance deve ser um número inteiro')
      .min(
        1,
        'O campo geolocation_tolerance deve ser um número inteiro positivo',
      ),
    geolocation_status: yup.boolean().nullable(),
    geolocation_at: yup.date().nullable(),
    geolocation_by_id: yup
      .number()
      .nullable()
      .integer('O campo geolocation_tolerance deve ser um número inteiro')
      .min(
        1,
        'O campo geolocation_tolerance deve ser um número inteiro positivo',
      ),
    geolocation_by_name: yup.string().nullable(),
    phone: phoneValidator(),
    email: yup
      .string()
      .test('email', (v) => !v || isValidEmail(v))
      .nullable(),
    manager_contact: contactRecipientSchema,
    person_in_charge_1_contact: contactRecipientSchema,
    person_in_charge_2_contact: contactRecipientSchema,
  })

export default buildSchema
