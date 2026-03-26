import { GenericObject } from '@mw-kit/mw-ui/types'
import moment from 'moment'

export const dataFirstAttendence = (attendence: GenericObject | null) => {
  const info = '1° visita: '

  if (attendence && attendence.first) {
    const date = moment(attendence.check_in).format('DD/MM/YYYY [às] HH:mm:ss')
    const people = attendence.first?.people?.name

    return info + `${date} - ${people}`
  }

  return info + '-'
}

export const dataSecondAttendence = (attendence: GenericObject | null) => {
  const info = 'Ultima visita: '
  if (attendence && attendence.last) {
    const date = moment(attendence.check_in).format('DD/MM/YYYY [às] HH:mm:ss')
    const people = attendence.last?.people?.name

    return info + `${date} - ${people}`
  }
  return info + '-'
}
