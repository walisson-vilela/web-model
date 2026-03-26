import moment from 'moment'
import * as yup from 'yup'

import yupValidators from '../../../../../utils/YupValidators'

import { SystemAccessTimeForm, WorkDateForm } from './interfaces'

type Schema<T extends string> = Record<T, yup.ObjectShape[string]>

const timeValidator = () =>
  yup.string().test((value: string) => {
    if (!value) return true
    const converted = moment(value, 'HH:mm', true)
    return converted.isValid()
  })

const dateValidator = () =>
  yup.date().transform((v, o) => {
    if (!o) return null
    return o.length === 10 ? moment(o, 'DD/MM/YYYY', true).toDate() : o
  })

export const workDateSchema = yup
  .object()
  .shape<Schema<keyof WorkDateForm['errors']>>(
    {
      days: yup
        .array()
        .min(1)
        .max(7)
        .of(yup.number().min(1).max(7))
        .when('start_date', {
          is: null,
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.notRequired(),
        }),
      start_date: dateValidator().when('days', {
        is: null,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
      end_date: dateValidator()
        .when('days', {
          is: null,
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.notRequired(),
        })
        .test(
          'date_interval',
          'Start should be less then end',
          (_v, { parent: context }) => {
            const min = context.start_date as Date | undefined
            const max = context.end_date as Date | undefined

            return !max || !min || max.getTime() === min.getTime() || max > min
          },
        ),
      start_time: timeValidator().required(),
      end_time: timeValidator()
        .test(
          'time_interval',
          'Start should be less then end',
          (_v, { parent: context }) => {
            const createDate = (time: string): Date => {
              const config = time.split(':').map((e) => parseInt(e))
              const date = new Date()
              date.setHours(
                ...([...config, 0, 0, 0, 0].slice(0, 4) as [
                  number,
                  number,
                  number,
                  number,
                ]),
              )
              return date
            }

            const min = createDate(context['start_time'])
            const max = createDate(context['end_time'])

            return max.getTime() === min.getTime() || max > min
          },
        )
        .required(),
      type: yup.string().oneOf(['J', 'I']).required(),

      label: yup.string().when('type', {
        is: 'I',
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
      time_limit_lock: timeValidator().when('type', {
        is: 'I',
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
      pre_marked: yup.boolean().when('type', {
        is: 'I',
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
    },
    [['days', 'start_date']],
  )

export const systemAccessTimeSchema = yup
  .object()
  .shape<Schema<keyof SystemAccessTimeForm['errors']>>({
    electronic_point: yup.boolean().required(),
    tolerance_min: yupValidators.numberOrEmptyString({
      number: (schema) => schema.min(0),
      general: (schema) =>
        schema.when('electronic_point', {
          is: true,
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.notRequired(),
        }),
    }),
    tolerance_max: yupValidators.numberOrEmptyString({
      number: (schema) => schema.min(0),
      general: (schema) =>
        schema
          .when('electronic_point', {
            is: true,
            then: (schema) => schema.required(),
            otherwise: (schema) => schema.notRequired(),
          })
          .test(
            'tolerance_interval',
            'Min should be less then max',
            (_v, { parent: context }) => {
              const min = (context.tolerance_min as number) || 0
              const max = (context.tolerance_max as number) || 0

              return max === min || max > min
            },
          ),
    }),
  })
