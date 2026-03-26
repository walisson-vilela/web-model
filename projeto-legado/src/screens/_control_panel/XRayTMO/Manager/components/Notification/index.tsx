import React from 'react'

import { date } from '../../../../../../utils/Formatters'

import { NotificationProps } from './interfaces'

const Notification = (props: NotificationProps): JSX.Element => {
  const { day, attendences, attendenceDate } = props.data
  return (
    <React.Fragment>
      <>
        <p>
          {day}
          <span style={{ paddingLeft: 8 }}>
            {attendenceDate !== null ? date(attendenceDate, 'DD/MM/YYYY') : '-'}
          </span>
        </p>
        <p>
          Quantidade de Atendimentos <br /> Previstos:{' '}
          {attendences !== null ? attendences : '-'}
        </p>
      </>
    </React.Fragment>
  )
}

export default Notification
