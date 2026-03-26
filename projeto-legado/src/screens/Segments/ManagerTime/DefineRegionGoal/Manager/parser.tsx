import React from 'react'

import {
  booleanOrDefault,
  simpleTime as formatTime,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isNumber } from '../../../../../utils/Validators'
import AssociatedPDVs from '../../../AssociatedPDVs'
import { Link } from '../../../styled'
import { DurationGoal } from '../../interfaces'

import { BodyInterface, DataInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (
  data: DataInterface[],
  segment_id: number,
  setModal: Function,
  setDurationGoals: Function,
): BodyInterface[] => {
  const parsed = data.map((e) => {
    const item: BodyInterface = {
      id: numberOrDefault(e.id),
      name: notEmptyStringOrDefault(e.name),
      active: booleanOrDefault(e.active),
      store_count: numberOrDefault(e.store_count),
      store_count_jsx: null,
      duration_average: numberOrDefault(e.duration_average),
      duration_average_txt: null,
      duration_goal: numberOrDefault(e.duration_goal),
      duration_goal_jsx: null,
      store_goal_count: numberOrDefault(e.store_goal_count),
      store_percentage: numberOrDefault(e.store_percentage),
      store_percentage_jsx: null,
      recalculate: numberOrDefault(e.recalculate),
      store_statistic_attendance_id: numberOrDefault(
        e.store_statistic_attendance_id,
      ),
    }

    item.store_count_jsx =
      isNumber(item.store_count) && item.store_count > 0
        ? (item.store_count_jsx = (
            <Link
              onClick={() =>
                setModal(
                  <AssociatedPDVs
                    item={{
                      segment_id: segment_id,
                      region_id: item.id,
                      name: item.name,
                      store_count: item.store_count,
                    }}
                    title={
                      <React.Fragment>
                        Área:{' '}
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
            </Link>
          ))
        : item.store_count

    item.duration_average_txt = formatTime(
      isNumber(item.duration_average) ? item.duration_average : 0,
    )

    let store_percentage_jsx = '-'

    if (isNumber(item.store_percentage))
      store_percentage_jsx =
        item.store_percentage_jsx = `${item.store_percentage}%`

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
