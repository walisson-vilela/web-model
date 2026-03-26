import React from 'react'

import Bullet from '../../../../components/Bullet'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    let parsed: BodyInterface = {
      status: numberOrDefault(e.status),
      status_jsx: null,
      people_name: notEmptyStringOrDefault(e.people_name),
      supervisor: notEmptyStringOrDefault(e.supervisor),
      route_name: notEmptyStringOrDefault(e.route_name),
      attendances_count: numberOrDefault(e.attendances_count),
      added: numberOrDefault(e.added),
      realized: numberOrDefault(e.realized),
      distance_travel_planned: numberOrDefault(e.distance_travel_planned),
      distance_travel_planned_jsx: null,
      distance_travel: numberOrDefault(e.distance_travel),
      distance_travel_jsx: null,
    }

    parsed.status_jsx = (
      <Bullet
        content={parsed.status === 1 ? 'Dentro' : 'Fora'}
        color={parsed.status === 1 ? '#66BB6A' : '#EF5350'}
      />
    )

    parsed.distance_travel_jsx =
      parsed.distance_travel === 0
        ? `${parsed.distance_travel} km`
        : `${Number(parsed.distance_travel / 1000).toFixed(1)} km`

    parsed.distance_travel_planned_jsx =
      parsed.distance_travel_planned === 0
        ? `${parsed.distance_travel_planned} km`
        : `${Number(parsed.distance_travel_planned / 1000).toFixed(1)} km`

    return parsed
  })
}

export default parser
