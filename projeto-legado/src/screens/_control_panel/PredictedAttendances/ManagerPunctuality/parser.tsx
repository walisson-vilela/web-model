import React from 'react'

import Bullet from '../../../../components/Bullet'
import { notEmptyStringOrDefault } from '../../../../utils/Formatters'

import { BodyInterface, DataInterface } from './interfaces'
import { status as statusLabels } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const item: BodyInterface = {
      punctuality_status: notEmptyStringOrDefault(e.punctuality_status),
      punctuality_status_jsx: null,
      store_name: notEmptyStringOrDefault(e.store_name),
      segment_name: notEmptyStringOrDefault(e.segment_name),
      route_name: notEmptyStringOrDefault(e.route_name),
      people_name: notEmptyStringOrDefault(e.people_name),
      supervisor_name: notEmptyStringOrDefault(e.supervisor_name),
      planned_time: notEmptyStringOrDefault(e.planned_time),
      realized_time: notEmptyStringOrDefault(e.realized_time),
    }

    item.punctuality_status_jsx = (
      <Bullet
        content={statusLabels[item.punctuality_status || 'Inativo'].name}
        color={statusLabels[item.punctuality_status].color}
      />
    )

    console.log(item)
    return item
  })
}

export default parser
