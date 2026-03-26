import {
  booleanOrDefault,
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isObject } from '../../../../utils/validators'
import { WeekdayType, WorkShift } from '../../types'

export const workShiftParser = (e: unknown): WorkShift | null => {
  if (!isObject(e)) return null

  const id = numberOrDefault(e.id)
  if (!id) return null

  const weekdays = (Array.isArray(e.weekdays) ? e.weekdays : []).reduce<
    WeekdayType[]
  >((acc, item) => {
    if (!isObject(item)) return acc

    const weekday = numberOrDefault(item.weekday)
    const starts_at = dateOrDefault(
      item.starts_at,
      null,
      'HH:mm',
      'YYYY-MM-DDTHH:mm:ss',
    )
    const ends_at = dateOrDefault(
      item.ends_at,
      null,
      'HH:mm',
      'YYYY-MM-DDTHH:mm:ss',
    )

    if (weekday === null || starts_at === null || ends_at === null) {
      return acc
    }

    const weekdayAux: WeekdayType = {
      weekday,
      weekday_label: notEmptyStringOrDefault(item.weekday_label, ''),
      starts_at,
      ends_at,
      flag: booleanOrDefault(item.flag, false),
    }

    return [...acc, weekdayAux]
  }, [])

  const workShift: WorkShift = {
    id,

    active: booleanOrDefault(e.active, false),
    active_label: notEmptyStringOrDefault(e.active_label, ''),

    electronic_point: booleanOrDefault(e.electronic_point, false),
    electronic_point_label: notEmptyStringOrDefault(
      e.electronic_point_label,
      '',
    ),

    weekdays,

    workload: numberOrDefault(e.workload, 0),
    workload_label: notEmptyStringOrDefault(e.workload_label, ''),

    average_interval: numberOrDefault(e.average_interval, 0),
    average_interval_label: notEmptyStringOrDefault(e.average_interval_label),

    user_count: numberOrDefault(e.user_count, 0),
  }

  return workShift
}

const workShiftsParser = (data: unknown[]): WorkShift[] => {
  return data.reduce<WorkShift[]>((data, e) => {
    const workShift = workShiftParser(e)
    return workShift ? [...data, workShift] : data
  }, [])
}

export default workShiftsParser
