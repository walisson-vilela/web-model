import React from 'react'

import {
  simpleTime as formatTime,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { isNumber } from '../../../utils/Validators'
import AssociatedPDVs from '../AssociatedPDVs'
import WarningText from '../WarningText'
import * as S from '../styled'

import Particularities from './Particularities'
import { BodyInterface, DataInterface, DurationGoal } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (
  data: DataInterface[],
  setModal: Function,
  setDurationGoals: Function,
): BodyInterface[] => {
  const parsed = data.map((e) => {
    const item: BodyInterface = {
      id: e.id,
      name: notEmptyStringOrDefault(e.name),
      status: notEmptyStringOrDefault(e.status),
      store_count: numberOrDefault(e.store_count),
      store_count_jsx: null,
      duration_average: numberOrDefault(e.duration_average),
      duration_average_txt: null,
      duration_goal: numberOrDefault(e.duration_goal),
      duration_goal_jsx: null,
      store_goal_count: numberOrDefault(e.store_goal_count),
      store_goal_count_txt: null,
      store_percentage: numberOrDefault(e.store_percentage),
      store_percentage_txt: null,
      particularities: numberOrDefault(e.particularities),
      region_particularities: numberOrDefault(e.region_particularities),
      store_particularities: numberOrDefault(e.store_particularities),
      role_particularities: numberOrDefault(e.role_particularities),
      particularities_jsx: null,
      recalculate: numberOrDefault(e.recalculate),
      store_statistic_attendance_id: numberOrDefault(
        e.store_statistic_attendance_id,
      ),
    }

    if (isNumber(item.store_count)) {
      item.store_count_jsx =
        item.store_count === 0 ? (
          <React.Fragment>-</React.Fragment>
        ) : (
          <S.Link
            onClick={() =>
              setModal(
                <AssociatedPDVs
                  item={{
                    segment_id: item.id,
                    name: item.name,
                    store_count: item.store_count,
                  }}
                  title={
                    <React.Fragment>
                      Canal:{' '}
                      <b>
                        {item.name} - {item.store_count} PDVs associados
                      </b>
                    </React.Fragment>
                  }
                  closeModal={() => setModal(null)}
                />,
              )
            }
          >
            {item.store_count}
          </S.Link>
        )
    }

    let store_goal_count_txt = '-'
    let store_percentage_txt = '-'

    if (isNumber(item.store_percentage))
      store_percentage_txt =
        item.store_percentage_txt = `${item.store_percentage}%`
    if (isNumber(item.store_goal_count))
      store_goal_count_txt =
        item.store_goal_count_txt = `${item.store_goal_count}%`
    if (isNumber(item.recalculate) && item.recalculate !== 0)
      item.store_goal_count_txt = <WarningText content={store_goal_count_txt} />

    item.duration_average_txt = formatTime(
      isNumber(item.duration_average) ? item.duration_average : 0,
    )

    if (isNumber(item.particularities)) {
      item.particularities_jsx =
        item.particularities > 0 ? (
          <S.Link
            onClick={() =>
              setModal(
                <Particularities
                  item={item}
                  title={
                    <React.Fragment>
                      Canal: <b>{item.name}</b> - Tempo Médio Canal:{' '}
                      <b>{formatTime(item.duration_average)}</b> | Meta por
                      Canal: <b>{formatTime(item.duration_goal)}</b>
                    </React.Fragment>
                  }
                  closeModal={() => setModal(null)}
                />,
              )
            }
          >
            Sim
          </S.Link>
        ) : (
          '-'
        )
    }

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
