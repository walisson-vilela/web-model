import React from 'react'

import Bullet from '../../../../../components/Bullet'
import { ModalState } from '../../../../../components/MwModal'
import { activity } from '../../Manager/labels'
import History from '../modals/History'

import * as S from './styles'

interface Props {
  deviceId: number
  activityStatus: string
  openModal: (s: ModalState) => void
}

const ActivityStatus = ({ activityStatus, openModal, deviceId }: Props) => {
  return (
    <S.Container
      onClick={() =>
        openModal(<History deviceId={deviceId} close={() => openModal(null)} />)
      }
    >
      <S.Text>{activityStatus}</S.Text>
      <Bullet color={activity[activityStatus].color} content=' ' />
    </S.Container>
  )
}

export default ActivityStatus
