import React from 'react'

import Bullet from '../../../../components/Bullet'
import { notEmptyStringOrDefault } from '../../../../utils/Formatters'

import { BodyInterface, DataInterface } from './interfaces'
import { status as statusLabels } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const item: BodyInterface = {
      people_name: notEmptyStringOrDefault(e.people_name),
      role_name: notEmptyStringOrDefault(e.role_name),
      active: notEmptyStringOrDefault(e.active),
      active_jsx: null,
      supervisor_name: notEmptyStringOrDefault(e.supervisor_name),
      supervisor_hierarchy: notEmptyStringOrDefault(e.supervisor_hierarchy),
      attendance_started: notEmptyStringOrDefault(e.attendance_started),
      last_connection: notEmptyStringOrDefault(e.last_connection),
      disconnected_time: notEmptyStringOrDefault(e.disconnected_time),
      classification: notEmptyStringOrDefault(e.classification),
    }
    item.active_jsx = (
      <Bullet
        content={statusLabels[item.active].name}
        color={statusLabels[item.active].color}
      />
    )
    return item
  })
}

export default parser
