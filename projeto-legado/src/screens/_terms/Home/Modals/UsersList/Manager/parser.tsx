import React from 'react'

import { AiOutlineFilePdf } from 'react-icons/ai'

import Bullet from '../../../../../../components/Bullet'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../utils/Formatters'

import { BodyInterface, DataInterface } from './interfaces'
import { labels } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((item) => {
    let parsed: BodyInterface = {
      id: numberOrDefault(item.id),
      active: notEmptyStringOrDefault(item.Users.active),
      user_name: notEmptyStringOrDefault(item.name),
      user_name_jsx: null,
      role: notEmptyStringOrDefault(item.role.name),
      created_at: notEmptyStringOrDefault(item.created_at),
      accepted: notEmptyStringOrDefault(item.accepted),
      access: notEmptyStringOrDefault(item.access),
      download_jsx: <AiOutlineFilePdf size={18} color='#000' />,
    }

    parsed.user_name_jsx = (
      <Bullet
        color={labels[parsed.active].color}
        content={parsed.user_name || '-'}
      />
    )
    return parsed
  })
}

export default parser
