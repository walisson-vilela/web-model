import * as yup from 'yup'

import { EANCode } from '../../../standardized/services/validators'

import { Form } from './interfaces'

const fileSchema = yup.object({
  id: yup.number().nullable(),
  url: yup.string().required(),
  name: yup.string().required(),
  size: yup.number().required(),
})

export const schema = yup.object<Form>({
  status: yup.boolean().required(),
  type: yup.string().oneOf(['OWN', 'COMPETITOR']).required(),
  code: yup
    .string()
    .matches(/^\d*$/)
    .when('type', {
      is: 'OWN',
      then: (schema) => schema.min(1).required(),
      otherwise: (schema) => schema.nullable(),
    }),
  name: yup.string().required(),
  product_line_id: yup.number().nullable().required(),
  brand_id: yup.number().nullable().required(),
  ean_13: yup
    .string()
    .test({
      name: 'EAN',
      test: EANCode,
      message: 'Código EAN inválido',
    })
    .when('type', {
      is: 'OWN',
      then: (schema) => schema.min(13).required(),
    }),
  classification_id: yup.number().nullable(),
  notify_price: yup.boolean().nullable(),

  price_min: yup
    .number()
    .nullable()

    .min(0, 'O preço mínimo deve ser maior ou igual a 0')
    .test(
      'is-less-than-price-max',
      'O preço mínimo deve ser menor ou igual ao preço máximo',
      function (value) {
        const { price_max } = this.parent
        return value === null || price_max === null || value <= price_max
      },
    ),
  price_max: yup
    .number()
    .nullable()

    .min(0, 'O preço máximo deve ser maior ou igual a 0')
    .test(
      'is-greater-than-price-min',
      'O preço máximo deve ser maior ou igual ao preço mínimo',
      function (value) {
        const { price_min } = this.parent
        return value === null || price_min === null || value >= price_min
      },
    ),

  measurement: yup
    .number()
    .nullable()
    .min(0, 'O valor de measurement deve ser maior ou igual a zero'),
  measurement_unit: yup
    .string()
    .oneOf(['KG', 'LITRO', 'UNID', 'PACOTE'])
    .nullable()
    .when('measurement', {
      is: (measurement: number | null) => measurement !== null,
      then: (schema) => schema.min(0).required(),
    }),
  description: yup.string().nullable(),

  files: yup
    .array()
    .of(
      yup.mixed().test('is-valid-file', 'Arquivo inválido', (value) => {
        if (value instanceof File) {
          return true
        }
        return fileSchema.isValidSync(value)
      }),
    )
    .max(4, 'Deve ser enviado até 4 arquivos'),
})
