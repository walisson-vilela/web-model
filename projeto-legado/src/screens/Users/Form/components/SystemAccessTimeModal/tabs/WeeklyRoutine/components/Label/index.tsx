import React, { useContext } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'

import SystemAccessTimeContext from '../../../../context'

const Label = () => {
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
          type='text'
          label='Nome do Intervalo'
          placeholder='Ex. Almoço'
          setValue={(label) =>
            setWorkDate((prev) => {
              if (prev.type !== 'I') return prev
              return { ...prev, label }
            })
          }
          value={workDate.label}
          invalid={isInvalid('label')}
          inputWidth='130px'
        />
      </MwGrid.Col>
    )
  )
}

export default Label
