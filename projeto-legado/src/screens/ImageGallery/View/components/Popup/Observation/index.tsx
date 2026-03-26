import React, { useState } from 'react'

import { FiArrowLeft } from 'react-icons/fi'

import { StatusData } from '../SelectConfirmation/interface'

import * as S from './styles'

interface ObservationProps {
  name: string
  statusData: StatusData
  setStatusData: React.Dispatch<React.SetStateAction<StatusData>>
  handleResetData: () => void
}
const Observation = (props: ObservationProps): JSX.Element => {
  const { handleResetData, statusData, setStatusData } = props

  const [observationValue, setObservationValue] = useState<string>('')

  const handleSaveNotification = (e: string) => {
    setStatusData({
      ids: statusData.ids,
      status: statusData.status,
      reason_id: statusData.reason_id,
      notes: e,
    })
  }

  return (
    <React.Fragment>
      <S.Header>
        <FiArrowLeft size={20} onClick={handleResetData} />
        <strong>{props.name} </strong>
      </S.Header>
      <S.Content>
        <p> Caso julgue necessário, acresente uma observação na sua analise.</p>
        <textarea
          placeholder='Digite sua observação'
          onBlur={(e) => handleSaveNotification(e.target.value)}
        ></textarea>
      </S.Content>
    </React.Fragment>
  )
}

export default Observation
