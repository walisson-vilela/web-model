import React, { useContext } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'

import SystemAccessTimeContext from '../../../context'

const EndTime = () => {
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
        label='Hora de Término'
        setValue={(end_time) => setWorkDate((prev) => ({ ...prev, end_time }))}
        value={workDate.end_time}
        invalid={isInvalid('end_time')}
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

export default EndTime
