import { isObject } from 'lodash'
import moment from 'moment'

import axios from '../../../../services/Axios'
import { RangeProps, SchedulesProps } from '../../interfaces'

export const createFileProccess = async (
  range: RangeProps | 'current_day' | 'current_week' | 'current_month',
): Promise<any> => {
  const params: any = {
    type: 'AFD',
    options: {
      interval:
        typeof range !== 'string'
          ? {
              start: moment(range[0].startDate).format('YYYY-MM-DD'),
              end: moment(range[0].endDate).format('YYYY-MM-DD'),
            }
          : range,
    },
  }

  const { data } = await axios.post('/v1/file-processes/add', params)

  if (!data.success) throw new Error('Request returned no sucess!')
  if (!isObject(data.data)) throw new Error('Request returned an invalid data!')

  return data
}

export const getSchedules = async (): Promise<any> => {
  const { data } = await axios.get('/v1/afd-schedules')

  if (!data.success) throw new Error('Request returned no sucess!')
  if (!isObject(data.data)) throw new Error('Request returned an invalid data!')

  return data
}

export const replaceSchedules = async (
  schedules: SchedulesProps,
): Promise<any> => {
  const { data } = await axios.post(
    '/v1/afd-schedules/replace',
    schedules.map((schedule) => ({
      frequency: schedule.deliverySchedule.value,
      update_frequency: schedule.frequency.value,
      recipients: schedule.emails.map((email) => ({ email })),
    })),
  )

  if (!data.success) throw new Error('Request returned no sucess!')

  return data
}
