import moment from 'moment'
import * as yup from 'yup'

import { isObject, mimeType } from '../../../../../../../utils/Validators'

import { FILE_TYPES, TYPES, getMaxDate, getMinDate } from './constants'
import { Classification } from './interfaces'

const getSchema = () => {
  return yup
    .object({
      type: yup
        .string()
        .oneOf(Object.keys(TYPES).map((k) => TYPES[k]))
        .required(),
      classification: yup
        .object({
          id: yup.number().required(),
          name: yup.string(),
          require_file: yup.boolean().required(),
        })
        .required(),
      start: yup.string().test('minmax', (value, context) => {
        if (!value) return true
        const v = moment(value, 'DD/MM/YYYY HH:mm', true)
        if (!v.isValid()) return false
        const dv = v.toDate()
        dv.setSeconds(0, 0)

        const min = getMinDate(context.parent.type)
        const max = getMaxDate()

        return dv.getTime() >= min.getTime() && dv.getTime() <= max.getTime()
      }),

      end: yup
        .string()
        .test('minmax', (value, context) => {
          if (!value) return true

          const v = moment(value, 'DD/MM/YYYY HH:mm', true)
          if (!v.isValid()) return false
          const dv = v.toDate()
          dv.setSeconds(0, 0)

          const min = getMinDate(context.parent.type)
          const max = getMaxDate()

          return dv.getTime() >= min.getTime() && dv.getTime() <= max.getTime()
        })
        .when('type', {
          is: TYPES.TEMPORARY,
          then: (schema) =>
            schema
              .required('Obrigatório')
              .test(
                'min-diff',
                'O intervalo deve ter pelo menos 1 hora.',
                function (value) {
                  const v = moment(value, 'DD/MM/YYYY HH:mm:ss', true)
                  if (!v.isValid()) return true

                  const { start } = this.parent
                  if (!start) return true
                  return (
                    v.toDate().getTime() - start.getTime() >= 60 * 60 * 1000
                  )
                },
              ),
          otherwise: (schema) => schema.nullable(),
        }),

      file: yup.mixed().when('classification', {
        is: (classification: Classification | null) =>
          !isObject(classification) || classification.require_file !== false,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.nullable(),
      }),
    })
    .test('fileType', 'Invalid File Type', (value) => {
      return (
        !(value.file instanceof File) ||
        mimeType(value.file.type, FILE_TYPES as unknown as string[])
      )
    })
}

export default getSchema
