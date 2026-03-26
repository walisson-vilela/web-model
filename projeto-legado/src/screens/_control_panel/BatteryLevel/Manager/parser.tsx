import React from 'react'

import Bullet from '../../../../components/Bullet'
import { ModalState } from '../../../../components/MwModal'
import { notEmptyStringOrDefault } from '../../../../utils/Formatters'
import ActivityStatus from '../components/ActivityStatus'

import { BodyInterface, DataInterface } from './interfaces'
import { status as statusLabels } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.

const parser = (
  data: DataInterface[],
  setModal: (s: ModalState) => void,
): BodyInterface[] => {
  return data.map((e) => {
    let item: BodyInterface = {
      people_name: notEmptyStringOrDefault(e.people_name),
      active_status_jsx: null,
      role_name: notEmptyStringOrDefault(e.role_name),
      active_status: notEmptyStringOrDefault(e.active_status),
      supervisor_name: notEmptyStringOrDefault(e.supervisor_name),
      supervisor_hierarchy: notEmptyStringOrDefault(e.supervisor_hierarchy),
      first_battery_day: notEmptyStringOrDefault(e.first_battery_day),
      last_battery_day: notEmptyStringOrDefault(e.last_battery_day),
      average_consumption_avg: notEmptyStringOrDefault(
        e.average_consumption_avg,
      ),
      activity_status_srt: notEmptyStringOrDefault(e.activity_status_srt),
      activity_status_srt_jsx: notEmptyStringOrDefault(
        e.activity_status_srt,
      ) ? (
        <ActivityStatus
          activityStatus={e.activity_status_srt}
          openModal={setModal}
          deviceId={3}
        />
      ) : null,
    }
    item.active_status_jsx = (
      <Bullet
        color={statusLabels[item.active_status].color}
        content={statusLabels[item.active_status].name}
      />
    )
    return item
  })
}

export default parser
