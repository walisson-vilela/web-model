import * as yup from 'yup'

import { keys } from '../../../../utils/Formatters'
import { notEmptyStringOrDefault } from '../../../utils/formatters'
import { PERSON_STATUS, TRAVEL_MODE } from '../labels'

import { Form } from './interfaces'

const schema = yup.object({
  status: yup.string().oneOf(keys(PERSON_STATUS)).required(),

  replace: yup
    .object({
      user: yup.object().required(),
      items: yup.array().required(),
    })
    .nullable()
    .when('status', {
      is: PERSON_STATUS.PC.value,
      otherwise: (schema) =>
        schema.test(
          'canReplace',
          `Status diferente de ${PERSON_STATUS.PC.label}`,
          (v) => v === null,
        ),
    }),

  role: yup.object().required(),

  password: yup
    .string()
    .test('length', 'Invalid length', (v) => {
      const str = notEmptyStringOrDefault(v)
      return !str || str.length > 3
    })
    .when('status', {
      is: PERSON_STATUS.PC.value,
      then: (schema) => schema.required(),
    }),

  hierarchies: yup
    .array()
    .of(
      yup.object({
        regions: yup.array().min(1).required(),
      }),
    )
    .required()
    .when('role', {
      is: (role: Form['role']) => !role || role.internal_access,
      then: (schema) =>
        schema.test(
          'empty',
          'A função possui atributos internos',
          (value) => !Array.isArray(value) || value.length === 0,
        ),
      otherwise: (schema) => schema.min(1),
    }),

  route_contractor: yup
    .object({
      id: yup.number().required(),
      nickname: yup.string().required(),
    })
    .nullable()
    .when('role', {
      is: (role: Form['role']) => !role || role.internal_access,
      then: (schema) =>
        schema.test(
          'empty',
          'A função possui atributos internos',
          (value) => !value,
        ),
    }),

  personal_mobile: yup.boolean().required(),

  imei: yup.string().min(1).nullable(),

  travel_mode: yup.string().when('role', {
    is: (role: Form['role']) => !role || !role.internal_access,
    then: (schema) => schema.required(),
  }),

  less_walking: yup
    .number()
    .min(0)
    .when('travel_mode', {
      is: TRAVEL_MODE.PUBLIC,
      then: (schema) => schema.required(),
    }),

  host_city: yup
    .object({
      id: yup.number().required(),
      name: yup.string().required(),
      state: yup.object({
        id: yup.number().required(),
        name: yup.string().required(),
      }),
      country: yup.object({
        id: yup.number().required(),
        name: yup.string().required(),
      }),
    })
    .nullable()
    .optional(),
  work_shift: yup
    .object({
      id: yup.number(),
      electronic_point: yup.boolean(),
    })
    .when('role', {
      is: (role: Form['role']) => role && !role.internal_access,

      then: (schema) => schema.required(),
      otherwise: (schema) => schema.nullable(),
    }),
})

export default schema
