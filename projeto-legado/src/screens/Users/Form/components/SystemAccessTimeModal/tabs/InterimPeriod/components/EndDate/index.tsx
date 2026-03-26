import React, { useContext } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'

import SystemAccessTimeContext from '../../../../context'

const EndDate = () => {
  const {
    workDate: {
      state: [workDate, setWorkDate],
      isInvalid,
    },
  } = useContext(SystemAccessTimeContext)

  return (
    'end_date' in workDate && (
      <MwGrid.Col width='auto'>
        <MwInput
          type='date'
          label='Data de Término'
          setValue={(end_date) =>
            setWorkDate((prev) => ({ ...prev, end_date }))
          }
          value={workDate.end_date}
          invalid={isInvalid('end_date')}
          picker
          inputWidth='130px'
        />
      </MwGrid.Col>
    )
  )
}

export default EndDate
