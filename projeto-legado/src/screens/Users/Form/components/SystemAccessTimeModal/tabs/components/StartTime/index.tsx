import React, { useContext } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'

import SystemAccessTimeContext from '../../../context'

const StartTime = () => {
  const {
    workDate: {
      state: [workDate, setWorkDate],
      isInvalid,
    },
  } = useContext(SystemAccessTimeContext)

  return (
    <MwGrid.Col width='auto'>
      <MwInput
        type='time'
        label='Hora de Início'
        setValue={(start_time) =>
          setWorkDate((prev) => ({ ...prev, start_time }))
        }
        value={workDate.start_time}
        invalid={isInvalid('start_time')}
        icon={{
          icon: {
            type: 'feather',
            icon: 'clock',
          },
        }}
        inputWidth='130px'
      />
    </MwGrid.Col>
  )
}

export default StartTime
