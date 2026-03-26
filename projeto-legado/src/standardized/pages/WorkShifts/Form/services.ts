import moment from 'moment'

import axios from '../../../../services/Axios/instance'
import { isObject } from '../../../../utils/Validators'
import { isValidIntervalTime } from '../../calendars/Details/modals/Form/steps/EventsStep/functions'

import type {
  AuxForm,
  Errors,
  Intervals,
  MainForm,
  Weekdays,
} from './interfaces'
import { formParser } from './parsers'

export const getWorkShitById = async (id: number): Promise<MainForm> => {
  const { data: response } = await axios.get(`v1/tr/work-shifts/${id}`)

  if (!isObject(response)) {
    throw new Error('Request returned an invalid data!')
  }
  if (!response.success) {
    throw new Error('Request returned no success!')
  }

  if (!isObject(response.data)) {
    throw new Error('Request returned an invalid data!')
  }

  return formParser(response.data)
}

export const saveWorkShit = async (content: MainForm, id?: number) => {
  if (id) {
    await axios.put(`v1/tr/work-shifts/${id}`, content)
  } else {
    await axios.post('v1/tr/work-shifts', content)
  }
}

export const getMinMaxInterval = (interval: Intervals[]) => {
  const min = interval.reduce((min, w) => {
    const wStart = moment(w.starts_at, 'HH:mm')

    if (wStart.isBefore(min)) {
      return wStart
    }

    return min
  }, moment('23:59', 'HH:mm'))

  const max = interval.reduce((max, w) => {
    const wEndsAt = moment(w.ends_at, 'HH:mm')

    if (wEndsAt.isAfter(max)) {
      return wEndsAt
    }

    return max
  }, moment('00:00', 'HH:mm'))

  return { min, max }
}

export const getMinMaxWeekDays = (weekdays: Weekdays[]) => {
  const min = weekdays.reduce((min, w) => {
    const wStart = moment(w.starts_at, 'HH:mm')

    if (wStart.isBefore(min)) {
      return wStart
    }

    return min
  }, moment('23:59', 'HH:mm'))

  const max = weekdays.reduce((max, w) => {
    const wEndsAt = moment(w.ends_at, 'HH:mm')

    if (wEndsAt.isAfter(max)) {
      return wEndsAt
    }

    return max
  }, moment('00:00', 'HH:mm'))

  return { min, max }
}

export const checkValidIntervalTime = (
  interval: boolean,
  startTime: string,
  endTime: string,
  formWeekdays: MainForm['weekdays'],
  weekdays: number[],
) => {
  if (endTime.length === 0 || startTime.length === 0) {
    return {
      valid: true,
      errors: {},
    }
  }

  if (endTime.length !== 5) {
    return {
      valid: false,
      errors: {
        ends_at: {
          code: 'INVALID_LENGTH',
          message: 'ends_at invalid length',
        },
      },
    }
  }

  if (startTime.length !== 5) {
    return {
      valid: false,
      errors: {
        starts_at: {
          code: 'INVALID_LENGTH',
          message: 'start_at invalid length',
        },
      },
    }
  }

  const valid = isValidIntervalTime([null, null], startTime, endTime)
  let check = true

  const start = moment(startTime, 'HH:mm')
  const end = moment(endTime, 'HH:mm')
  const minutes = moment.duration(end.diff(start)).asMinutes()

  // minimo 1 hora || máximo 2 horas.
  if (minutes < 60 || minutes > 120) {
    check = false
  }

  let errors: Errors<AuxForm> = {}

  if (interval ? !check || !valid : !valid) {
    errors = {
      starts_at: {
        code: 'INVALID',
        message: 'start_at invalid',
      },
      ends_at: {
        code: 'INVALID',
        message: 'ends_at invalid',
      },
    }
  }

  if (!interval) {
    return { valid, errors }
  }

  let boundaries = true
  const { min, max } = getMinMaxWeekDays(formWeekdays)

  for (const el of formWeekdays) {
    if (!weekdays.includes(el.weekday)) {
      continue
    }
    if (min.format('HH:mm') === '00:00' && max.format('HH:mm') === '23:59') {
      continue
    }
    if (start.isBefore(min) || end.isAfter(max)) {
      boundaries = false
      errors = {
        starts_at: {
          code: 'INVALID_BOUNDARIES',
          message: 'start_at outside boundaries',
        },
        ends_at: {
          code: 'INVALID_BOUNDARIES',
          message: 'ends_at outside boundaries',
        },
      }
      break
    }
  }

  return { valid: check && valid && boundaries, errors }
}

export const checkIntervalIntersection = (
  auxFormValues: AuxForm,
  weekdays: Weekdays[],
) => {
  const auxFormStartsAt = moment(auxFormValues.starts_at, 'HH:mm')
  const auxFormEndsAt = moment(auxFormValues.ends_at, 'HH:mm')

  return weekdays.some((w) => {
    const weekday = auxFormValues.weekdays.find((x) => x === w.weekday)
    if (!weekday) return false
    if (w.intervals.length === 0) return false

    return w.intervals.some((interval) => {
      const weekdayStartsAt = moment(interval.starts_at, 'HH:mm')
      const weekdayEndsAt = moment(interval.ends_at, 'HH:mm')

      return (
        auxFormStartsAt.isBetween(weekdayStartsAt, weekdayEndsAt) ||
        auxFormEndsAt.isBetween(weekdayStartsAt, weekdayEndsAt) ||
        auxFormStartsAt.isSame(weekdayStartsAt) ||
        auxFormEndsAt.isSame(weekdayEndsAt)
      )
    })
  })
}

export const checkOutsideBoundaries = (
  auxFormValues: AuxForm,
  weekdays: Weekdays[],
) => {
  const auxFormStartsAt = moment(auxFormValues.starts_at, 'HH:mm')
  const auxFormEndsAt = moment(auxFormValues.ends_at, 'HH:mm')
  let boundaries = false

  for (const el of weekdays) {
    if (!auxFormValues.weekdays.includes(el.weekday)) continue

    const min = moment(el.starts_at, 'HH:mm')
    const max = moment(el.ends_at, 'HH:mm')

    if (min.format('HH:mm') === '00:00' && max.format('HH:mm') === '23:59') {
      continue
    }

    if (auxFormStartsAt.isBefore(min) || auxFormEndsAt.isAfter(max)) {
      boundaries = true
      break
    }
  }
  return boundaries
}
