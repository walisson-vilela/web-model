import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'

import { BodyInterface, DataInterface } from './interfaces'
import { weekDays } from './options'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    let parsed: BodyInterface = {
      id: numberOrDefault(e.id),
      store_name: notEmptyStringOrDefault(e.store_name),
      segment_name: notEmptyStringOrDefault(e.segment_name),
      route_name: notEmptyStringOrDefault(e.route_name),
      people_name: e.people_name,
      supervisor: notEmptyStringOrDefault(e.supervisor),
      week_day: numberOrDefault(e.week_day),
      week_day_jsx: null,
      justify_name: e.justify_name,
    }
    parsed.week_day_jsx = weekDays[parsed.week_day]
    return parsed
  })
}

export default parser
