import React from 'react'

import Bullet from '../../../../components/Bullet'
import { convertMinutesToHoursAndMinutes } from '../../../../utils/FormatDate'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'

import { BodyInterface, DataInterface } from './interfaces'
import * as S from './styles'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    let parsed: BodyInterface = {
      status: (
        <Bullet
          content={e.status === 0 ? 'Fora' : 'Dentro'}
          color={e.status === 0 ? '#EF5350' : '#66BB6A'}
        />
      ),
      people_name: notEmptyStringOrDefault(e.people_name),
      supervisor: notEmptyStringOrDefault(e.supervisor),
      route_name: notEmptyStringOrDefault(e.route_name),
      displacement_count: numberOrDefault(e.displacement_count),
      distance_travel_planned: numberOrDefault(e.distance_travel_planned),
      distance_travel_planned_jsx:
        e.distance_travel_planned === 0
          ? '-'
          : `${Number(e.distance_travel_planned / 1000)
              .toFixed(1)
              .replace('.', ',')}KM`,
      distance_travel: numberOrDefault(e.distance_travel),
      distance_travel_jsx: null,
      duration_planned: numberOrDefault(e.duration_planned),
      duration_planned_jsx: null,
      speed_planned: numberOrDefault(e.speed_planned),
      speed_planned_jsx: null,
      speed: numberOrDefault(e.speed),
      speed_jsx: null,
    }

    parsed.duration_planned_jsx =
      parsed.duration_planned > 0
        ? convertMinutesToHoursAndMinutes(parsed.duration_planned)
        : '-'

    parsed.speed_planned_jsx =
      parsed.speed_planned === 0
        ? '-'
        : `${String(parsed.speed_planned.toFixed(2)).replace('.', ',')}Km/h`

    parsed.speed_jsx =
      parsed.speed > 0 ? <S.Label>{parsed.speed.toFixed(2)}Km/h</S.Label> : '- '

    return parsed
  })
}

export default parser
