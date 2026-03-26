import React from 'react'

import Bullet from '../../../../../../components/Bullet'
import ManagerColumnPopup from '../../../../../../components/ManagerColumnPopup'
import { statusLabels } from '../../labels'

import { ComponentProps } from './interface'
import * as S from './styles'

export function StatusNotification({ data }: ComponentProps) {
  const { attendance_status, justify_at, people_justify_name, reason } = data
  return attendance_status === 'Recusado' ||
    attendance_status === 'Justificado' ? (
    <ManagerColumnPopup
      inverted
      position='right center'
      trigger={
        <Bullet
          content={statusLabels[attendance_status].name}
          color={statusLabels[attendance_status].color}
        />
      }
      getContent={async () => (
        <S.Container>
          <span> Realizado em: {justify_at} </span>
          <span>
            {' '}
            Por: <strong> {people_justify_name} </strong>
          </span>
          <strong>Motivo: {reason}</strong>
        </S.Container>
      )}
    />
  ) : (
    <Bullet
      content={statusLabels[attendance_status].name}
      color={statusLabels[attendance_status].color}
    />
  )
}
