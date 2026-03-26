import React, { useContext } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'

import SystemAccessTimeContext from '../../../../context'

const StartDate = () => {
  const {
    workDate: {
      state: [workDate, setWorkDate],
      isInvalid,
    },
  } = useContext(SystemAccessTimeContext)

  return (
    'start_date' in workDate && (
      <MwGrid.Col width='auto'>
        <MwInput
          type='date'
          label='Data de Início'
          setValue={(start_date) =>
            setWorkDate((prev) => ({ ...prev, start_date }))
          }
          value={workDate.start_date}
          invalid={isInvalid('start_date')}
          picker
          inputWidth='130px'
        />
      </MwGrid.Col>
    )
  )
}

export default StartDate
