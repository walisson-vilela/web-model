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
      active_status: notEmptyStringOrDefault(e.active_status),
      supervisor_name: notEmptyStringOrDefault(e.supervisor_name),
      supervisor_hierarchy: notEmptyStringOrDefault(e.supervisor_hierarchy),
      route_name: notEmptyStringOrDefault(e.route_name),
      has_customer_list: notEmptyStringOrDefault(e.has_customer_list),
      has_planned: notEmptyStringOrDefault(e.has_planned),
      active_jsx: null,
    }

    item.active_jsx = (
      <Bullet
        color={statusLabels[item.active_status]}
        content={item.active_status}
      />
    )
    return item
  })
}

export default parser
