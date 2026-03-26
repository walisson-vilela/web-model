import React from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import { StatusData } from '../../../interface'

import * as S from './style'

interface StatusModalProps {
  statusData: StatusData
  setOpenPopup: () => void
}

const StatusModal = (props: StatusModalProps) => {
  const { setOpenPopup, statusData } = props

  const result = ['Pendente', 'Aprovado', 'Reprovado']

  return (
    <S.Container>
      <S.Header>
        <strong>Status:{result[statusData ? statusData.value : 0]}</strong>
        <span>
          {statusData.reason.description
            ? statusData.reason.description
            : 'Não informado'}
        </span>
      </S.Header>
      <S.Observation>
        <span>Observação</span>
        <S.Content>
          <p>{statusData.notes}</p>
        </S.Content>
      </S.Observation>
      <S.Footer>
        <MwButton
          appearance='solid'
          content='Ok'
          onClick={() => setOpenPopup()}
        />
      </S.Footer>
    </S.Container>
  )
}

export default StatusModal
