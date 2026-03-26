import React, { useContext } from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import CollDetails from '../../ColDetails'
import DetailsContext from '../../DetailsProvider'

import { dataFirstAttendence, dataSecondAttendence } from './utils'

const RowHistory = () => {
  const useDetailsContext = useContext(DetailsContext)

  const { display } = useDetailsContext

  const { planned, performed, percent, attendances } = display.history

  const infoHistory = (
    <React.Fragment>
      <div>
        Total de visitas programadas {planned}, sendo {performed} realizadas{' '}
        <b>({percent.toFixed(2)}%)</b>
      </div>
      <div>{dataFirstAttendence(attendances.first)}</div>
      <div>{dataSecondAttendence(attendances.last)}</div>
    </React.Fragment>
  )

  return (
    <MwGrid.Row>
      <CollDetails width='4'>
        <strong>Histórico de visita:</strong>
      </CollDetails>
      <CollDetails width='8'>
        <div>{infoHistory}</div>
      </CollDetails>
    </MwGrid.Row>
  )
}

export default RowHistory
