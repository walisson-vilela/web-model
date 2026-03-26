import React from 'react'

import Bullet from '../../../../../../../components/Bullet'
import { notEmptyStringOrDefault } from '../../../../../../../utils/Formatters'

import { BodyInterface, DataInterface } from './interfaces'
import { statusLabel } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.

const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const item: BodyInterface = {
      store_name: notEmptyStringOrDefault(e.store_name),
      schedule: notEmptyStringOrDefault(e.schedule),
      status: notEmptyStringOrDefault(e.status),
      status_jsx: null,
      window_performed: notEmptyStringOrDefault(e.window_performed),
      window_planned: notEmptyStringOrDefault(e.window_planned),
    }

    item.status_jsx = (
      <Bullet color={statusLabel[item.status].color} content={item.status} />
    )
    return item
  })
}

export default parser
