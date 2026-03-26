import {
  simpleTime as formatTime,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isNumber } from '../../../../../utils/Validators'
import { DurationGoal } from '../../interfaces'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (
  data: DataInterface[],
  setDurationGoals: Function,
): BodyInterface[] => {
  const parsed = data.map((e) => {
    const item: BodyInterface = {
      id: numberOrDefault(e.id),
      name: notEmptyStringOrDefault(e.name),
      duration_average: numberOrDefault(e.duration_average),
      duration_average_txt: formatTime(0),
      duration_goal: numberOrDefault(e.duration_goal),
      duration_goal_jsx: null,
      store_goal_count: numberOrDefault(e.store_goal_count),
      recalculate: numberOrDefault(e.recalculate),
      store_statistic_attendance_id: numberOrDefault(
        e.store_statistic_attendance_id,
      ),
    }

    if (isNumber(item.duration_average))
      item.duration_average_txt = formatTime(item.duration_average)

    return item
  })

  const obj: DurationGoal = {}
  for (let i = 0; i < parsed.length; i++) {
    const item = parsed[i]
    const key = item.id
    const value = item.duration_goal
    obj[key] = value === null ? '' : formatTime(value)
  }

  setDurationGoals(obj)

  return parsed
}

export default parser
