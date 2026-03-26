import React from 'react'

import Bullet from '../../../../components/Bullet'
import { notEmptyStringOrDefault } from '../../../../utils/Formatters'

import { BodyInterface, DataInterface } from './interfaces'
import { status as statusLabels } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] =>
  data.map((e) => ({
    people_name: notEmptyStringOrDefault(e.people_name),
    role_name: notEmptyStringOrDefault(e.role_name),
    active: notEmptyStringOrDefault(e.active) as BodyInterface['active'],
    inactivation_reason_name: notEmptyStringOrDefault(
      e.inactivation_reason_name,
    ),
    supervisor_name: notEmptyStringOrDefault(e.supervisor_name),
    route_name: notEmptyStringOrDefault(e.route_name),
    has_customer_list: notEmptyStringOrDefault(e.has_customer_list),
    has_planned: notEmptyStringOrDefault(e.has_planned),

    active_jsx: statusLabels[e.active] ? (
      <Bullet content={e.active} color={statusLabels[e.active].color} />
    ) : null,
  }))

export default parser
