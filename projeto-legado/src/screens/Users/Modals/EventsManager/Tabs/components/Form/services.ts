import { GenericObject } from '@mw-kit/mw-ui/types'
import moment from 'moment'

import axios from '../../../../../../../services/Axios/instance'
import { ValidationError } from '../../../../../../../standardized/components/form/modals'
import { isObject } from '../../../../../../../standardized/utils/validators'
import { dateOrDefault } from '../../../../../../../utils/Formatters'

import { FormInterface } from './interfaces'

export const save = async (
  value: FormInterface,
  user_id: number,
): Promise<{ success: true } | { success: false; errors: GenericObject }> => {
  const start = moment(value.start, 'DD/MM/YYYY HH:mm', true)
  const end = moment(value.end, 'DD/MM/YYYY HH:mm', true)

  const payload = {
    starts_at: start.isValid() ? start.format('YYYY-MM-DD HH:mm:ss') : null,
    ...(value.type === 'T'
      ? {
          ends_at: end.isValid() ? end.format('YYYY-MM-DD HH:mm:ss') : null,
        }
      : { ends_at: null }),
    ...(value.classification
      ? { classification_id: value.classification?.id }
      : {}),
    ...(value.file ? { file: { file: value.file } } : {}),
  }

  const { data: response } = await ValidationError.handler(
    async () =>
      await axios.post(`v1/tr/users/${user_id}/events`, payload, {
        ...('file' in payload
          ? { headers: { 'Content-Type': 'multipart/form-data' } }
          : {}),
      }),
  )

  if (!isObject(response)) throw new Error('Invalid Response')

  if (response.success === true) return { success: true }

  if (!isObject(response.errors)) throw new Error('Missing Errors')
  return { success: false, errors: response.errors }
}

export const getDaysWithEventsByMonth = async (
  user_id: number,
  year: number,
  month: number,
): Promise<Date[]> => {
  const params = {
    user_id,
    year,
    month,
  }
  const { data: response } = await axios.get('v1/tr/user-events/dates', {
    params,
  })

  if (!response.success) throw new Error('Request returned no success')

  if (!Array.isArray(response.data))
    throw new Error('Request returned an invalid data')

  return response.data.reduce((dates, e) => {
    const d = dateOrDefault(e, null, 'YYYY-MM-DD')
    return d ? [...dates, new Date(`${d} 00:00:00`)] : dates
  }, [] as Date[])
}
