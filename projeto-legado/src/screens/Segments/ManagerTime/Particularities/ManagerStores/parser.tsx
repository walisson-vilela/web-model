import { isNumber } from 'lodash'

import {
  simpleTime as formatTime,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const item: BodyInterface = {
      id: numberOrDefault(e.id),
      name: notEmptyStringOrDefault(e.name),
      formatted_address: notEmptyStringOrDefault(e.formatted_address),
      typologie: notEmptyStringOrDefault(e.typologie),
      duration_average: numberOrDefault(e.duration_average),
      duration_average_txt: null,
      duration_goal: numberOrDefault(e.duration_goal),
      duration_goal_txt: null,
    }

    item.duration_average_txt = formatTime(
      isNumber(item.duration_average) ? item.duration_average : 0,
    )
    item.duration_goal_txt = formatTime(
      isNumber(item.duration_goal) ? item.duration_goal : 0,
    )

    return item
  })
}

export default parser
