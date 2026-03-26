import React, { useContext } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'

import SystemAccessTimeContext from '../../../../context'

const TimeLimitLock = () => {
  const {
    workDate: {
      state: [workDate, setWorkDate],
      isInvalid,
    },
  } = useContext(SystemAccessTimeContext)

  return (
    workDate.type === 'I' && (
      <MwGrid.Col width='auto'>
        <MwInput
          type='time'
          label='Hora Limite'
          setValue={(time_limit_lock) =>
            setWorkDate((prev) => {
              if (prev.type !== 'I') return prev
              return { ...prev, time_limit_lock }
            })
          }
          value={workDate.time_limit_lock}
          invalid={isInvalid('time_limit_lock')}
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
  )
}

export default TimeLimitLock
