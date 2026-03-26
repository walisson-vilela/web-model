import React, { useContext } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'

import SystemAccessTimeContext from '../../../../context'

const Type = () => {
  const {
    workDate: {
      state: [workDate, setWorkDate],
      isInvalid,
    },
    systemAccessTime: {
      state: [{ electronic_point }],
    },
  } = useContext(SystemAccessTimeContext)

  return (
    electronic_point && (
      <MwGrid.Col width='auto'>
        <MwInput
          type='select'
          label='Tipo'
          loader={async () => [
            { label: 'Jornada', value: 'J', data: {} },
            { label: 'Intervalo', value: 'I', data: {} },
          ]}
          setValue={(type) =>
            setWorkDate((prev) => {
              if (type === '' || type === prev.type) return prev

              const common = prev
              if (common.type === 'I') {
                delete common.label
                delete common.time_limit_lock
                delete common.pre_marked
              }

              return {
                ...common,
                ...(type === 'I'
                  ? {
                      type,
                      label: '',
                      time_limit_lock: '',
                      pre_marked: false,
                    }
                  : {
                      type: 'J',
                    }),
              }
            })
          }
          value={workDate.type}
          invalid={isInvalid('type')}
          inputWidth='130px'
        />
      </MwGrid.Col>
    )
  )
}

export default Type
