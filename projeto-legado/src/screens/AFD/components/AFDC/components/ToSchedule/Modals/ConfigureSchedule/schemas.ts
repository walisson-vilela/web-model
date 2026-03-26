import { yupResolver } from '@hookform/resolvers/yup'
import { Resolver } from 'react-hook-form'
import * as yup from 'yup'

import { SingleScheduleProps } from '../../../../../../interfaces'

import { Form } from './interface'

const schemas = yup.object({
  deliverySchedule: yup.string().required(),
  frequency: yup.string().nullable(),
  emails: yup.array().min(1).required(),
})

export const resolver = yupResolver(schemas) as Resolver<Form>

export const getDefaultData = (data: SingleScheduleProps): Form => {
  return {
    deliverySchedule:
      data && data.deliverySchedule && data.deliverySchedule.value
        ? data.deliverySchedule.value
        : '',
    frequency:
      data && data.frequency && data.frequency.value
        ? data.frequency.value
        : '',
    emails: data && data.emails ? data.emails : [],
  }
}
