import * as yup from 'yup'

import yupValidators from '../../../../utils/YupValidators'

const getSchema = () => {
  return yup.object({
    //status
    status: yup.boolean(),

    // file
    file: yup.string().nullable().notRequired(),

    // basic data
    type: yup.string().oneOf(['OWN', 'COMPETITOR']),
    supplier_id: yup.string().required(),
    code: yup
      .string()
      .matches(/^\d*$/)
      .when('type', {
        is: 'OWN',
        then: (schema) => schema.min(1).required(),
        otherwise: (schema) => schema.nullable(),
      }),

    name: yup.string().required(),

    classification_id: yupValidators.numberOrEmptyString(),

    // countries
    countries: yup.array(
      yup.object({
        id: yup.number().nullable(),
        country_id: yup.number().required(),
        name: yup.string(),
        occupation: yup
          .string()
          .oneOf(['NATIONAL', 'REGIONAL'])
          .test(
            'has-area',
            'Necessário informar dados de região',
            (value, context) => {
              return (
                value !== 'REGIONAL' ||
                [
                  context.parent.cities.length,
                  context.parent.states.length,
                ].some((e) => e > 0)
              )
            },
          ),
        states_rule: yup.string().oneOf(['ONLY', 'EXCEPT', '']),
        cities_rule: yup.string().oneOf(['ONLY', 'EXCEPT', '']),
        segments_rule: yup.string().oneOf(['ONLY', 'EXCEPT', '']),
        market_flags_rule: yup.string().oneOf(['ONLY', 'EXCEPT', '']),
        states: yup.array(
          yup.object({
            id: yup.number().nullable(),
            foreign_id: yup.number().required(),
            name: yup.string(),
            name_short: yup.string(),
          }),
        ),
        cities: yup.array(
          yup.object({
            id: yup.number().nullable(),
            foreign_id: yup.number().required(),
            name: yup.string(),
            state: yup.object({
              name: yup.string(),
              name_short: yup.string(),
            }),
          }),
        ),
        segments: yup.array(
          yup.object({
            id: yup.number().nullable(),
            foreign_id: yup.number().required(),
            name: yup.string(),
          }),
        ),
        market_flags: yup.array(
          yup.object({
            id: yup.number().nullable(),
            foreign_id: yup.number().required(),
            name: yup.string(),
            network: yup.object({
              name: yup.string(),
              group: yup.object({
                name: yup.string(),
              }),
            }),
          }),
        ),
      }),
    ),
  })
}

export default getSchema
